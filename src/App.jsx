import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft, Check, CheckCircle, Stethoscope, User, Loader2, Calendar } from 'lucide-react';
import { AnimatedInput } from './components/ui/AnimatedInput';
import { supabase } from './lib/supabase';
import { generatePharmacistAnalysis } from './lib/mistral';

// Lazy load des questionnaires pour réduire le bundle initial
const loadQuestionnaire = (ageRange) => {
    switch (ageRange) {
        case '18-25':
            return import('./data/questionnaire_18_25.json');
        case '45-50':
            return import('./data/questionnaire_45_50.json');
        case '60-65':
            return import('./data/questionnaire_60_65.json');
        case '70-75':
            return import('./data/questionnaire_70_75.json');
        default:
            return Promise.reject(new Error('Invalid age range'));
    }
};


const ageRanges = [
    { id: '18-25', label: '18-25 ans' },
    { id: '45-50', label: '45-50 ans' },
    { id: '60-65', label: '60-65 ans' },
    { id: '70-75', label: '70-75 ans' }
];

function App() {
    const [selectedAge, setSelectedAge] = useState(null);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', gender: '' });
    const [currentScreen, setCurrentScreen] = useState('home');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    const [isLoadingQuestionnaire, setIsLoadingQuestionnaire] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    // Charger le questionnaire quand l'âge est sélectionné
    useEffect(() => {
        if (selectedAge) {
            setIsLoadingQuestionnaire(true);
            setLoadingError(null);
            setAllQuestions([]); // Reset questions pendant chargement

            loadQuestionnaire(selectedAge)
                .then(module => {
                    const questionnaire = module.default;
                    setCurrentQuestionnaire(questionnaire);

                    // Aplatir toutes les questions
                    const questions = [];
                    if (questionnaire && questionnaire.sections) {
                        questionnaire.sections.forEach(section => {
                            section.questions.forEach(question => {
                                questions.push({
                                    ...question,
                                    sectionTitle: section.title
                                });
                            });
                        });
                        setAllQuestions(questions);
                    } else {
                        throw new Error("Structure du questionnaire invalide");
                    }
                    setIsLoadingQuestionnaire(false);
                })
                .catch(error => {
                    console.error('Erreur lors du chargement du questionnaire:', error);
                    setLoadingError(`Impossible de charger le questionnaire ${selectedAge}. Veuillez réessayer.`);
                    setIsLoadingQuestionnaire(false);
                });
        }
    }, [selectedAge]);


    // Helper pour vérifier si une question doit être affichée
    const isQuestionVisible = (question, currentAnswers) => {
        // Filtrage par sexe : on ne filtre que si un genre binaire est défini
        // Si "Autre" ou non défini, on affiche toutes les questions par prudence
        if (question.gender && userInfo.gender && userInfo.gender !== 'Autre' && question.gender !== userInfo.gender) {
            return false;
        }

        if (!question.condition) return true;

        const dependentAnswer = currentAnswers[question.condition.questionId];

        // Si la question dépendante n'a pas encore de réponse, on cache par défaut
        // (Sauf si on veut une logique différente, mais pour un flux séquentiel c'est mieux)
        if (dependentAnswer === undefined) return false;

        // Gérer les réponses multiples (tableau) ou simples (string/boolean)
        if (Array.isArray(dependentAnswer)) {
            return dependentAnswer.includes(question.condition.value);
        }
        return dependentAnswer === question.condition.value;
    };

    const handleStartQuestionnaire = () => {
        if (!selectedAge || !userInfo.firstName || !userInfo.lastName) return;

        if (allQuestions.length === 0) {
            console.error("Tentative de démarrage mais aucune question chargée.");
            setLoadingError("Erreur : le questionnaire n'est pas chargé. Veuillez rafraîchir la page.");
            return;
        }

        setCurrentScreen('questionnaire');
        // S'assurer de commencer sur une question visible
        let startIndex = 0;
        while (startIndex < allQuestions.length && !isQuestionVisible(allQuestions[startIndex], {})) {
            startIndex++;
        }
        setCurrentQuestionIndex(startIndex);
    };

    const handleAnswer = (questionId, answer) => {
        const newAnswers = { ...answers, [questionId]: answer };
        setAnswers(newAnswers);

        // Mise à jour automatique du genre si la question est Q1 ou concerne le sexe
        if (questionId === 'q1' || questionId === 'sex' || questionId === 'gender') {
            let detectedGender = '';
            // Simplification et support de "Autre"
            const ansStr = Array.isArray(answer) ? answer.join(' ') : String(answer);
            const ansLower = ansStr.toLowerCase();

            if (ansLower.includes('femme')) detectedGender = 'Femme';
            else if (ansLower.includes('homme')) detectedGender = 'Homme';
            else if (ansLower.includes('autre')) detectedGender = 'Autre';

            if (detectedGender) {
                console.log("Genre détecté et mis à jour :", detectedGender);
                setUserInfo(prev => ({ ...prev, gender: detectedGender }));
            }
        }

        // Passer à la question suivante après un court délai
        setTimeout(() => {
            let nextIndex = currentQuestionIndex + 1;
            // Trouver la prochaine question visible
            // Note: On utilise newAnswers, mais pour le genre il faut utiliser detectedGender ou attendre le state update
            // Comme le state update est asynchrone, on va passer le genre explicitement à isQuestionVisible si besoin, 
            // ou mieux, on recalcule le genre localement pour le filtre

            let tempUserInfo = { ...userInfo };
            if (questionId === 'q1' || questionId === 'sex') {
                const ansStr = Array.isArray(answer) ? answer.join(' ') : String(answer);
                if (ansStr.toLowerCase().includes('femme')) tempUserInfo.gender = 'Femme';
                else if (ansStr.toLowerCase().includes('homme')) tempUserInfo.gender = 'Homme';
                else if (ansStr.toLowerCase().includes('autre')) tempUserInfo.gender = 'Autre';
            }

            // Fonction locale pour vérifier la visibilité avec le genre mis à jour instantanément
            const checkVisibility = (q) => {
                if (q.gender && tempUserInfo.gender && tempUserInfo.gender !== 'Autre' && q.gender !== tempUserInfo.gender) return false;
                // Reste de la logique isQuestionVisible...
                if (!q.condition) return true;
                const depAnswer = newAnswers[q.condition.questionId];
                if (depAnswer === undefined) return false;
                if (Array.isArray(depAnswer)) return depAnswer.includes(q.condition.value);
                return depAnswer === q.condition.value;
            };

            while (nextIndex < allQuestions.length && !checkVisibility(allQuestions[nextIndex])) {
                nextIndex++;
            }

            if (nextIndex < allQuestions.length) {
                setCurrentQuestionIndex(nextIndex);
            } else {
                // Toutes les questions sont répondues
                setCurrentScreen('completion');
            }
        }, 300);
    };

    const handlePrevious = () => {
        let prevIndex = currentQuestionIndex - 1;
        // Trouver la question précédente visible
        while (prevIndex >= 0 && !isQuestionVisible(allQuestions[prevIndex], answers)) {
            prevIndex--;
        }

        if (prevIndex >= 0) {
            setCurrentQuestionIndex(prevIndex);
        }
    };

    if (allQuestions.length === 0 && currentScreen === 'questionnaire') {
        return <div className="container">Chargement du questionnaire...</div>;
    }

    const currentQuestion = allQuestions[currentQuestionIndex];

    // Calcul de progression dynamique
    const visibleQuestionsCount = allQuestions.filter(q => isQuestionVisible(q, answers)).length;

    // On doit calculer combien de questions visibles on a passé ou est dessus
    const currentVisibleIndex = allQuestions
        .slice(0, currentQuestionIndex + 1)
        .filter(q => isQuestionVisible(q, answers))
        .length;

    const progress = visibleQuestionsCount > 0 ? Math.round((currentVisibleIndex / visibleQuestionsCount) * 100) : 0;

    // Écran de complétion
    if (currentScreen === 'completion') {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <CheckCircle size={80} color="var(--color-accent-success)" />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-accent-success)' }}>
                        Questionnaire Complété !
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                        Bravo <strong>{userInfo.firstName} {userInfo.lastName}</strong>,
                    </p>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                        Vous avez répondu à toutes les {allQuestions.length} questions.
                    </p>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                        Tranche d'âge : <strong>{currentQuestionnaire?.title}</strong>
                    </p>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                        Votre bilan de prévention est maintenant prêt à être transmis à votre pharmacien.
                    </p>

                    <button
                        className="button button-primary"
                        style={{ maxWidth: '400px', margin: '0 auto' }}
                        onClick={async () => {
                            if (isSending || sendSuccess) return;

                            setIsSending(true);
                            try {
                                // 1. ENREGISTRER D'ABORD dans Supabase (rapide, ~100-300ms)
                                const { data, error } = await supabase
                                    .from('bilans')
                                    .insert({
                                        first_name: userInfo.firstName,
                                        last_name: userInfo.lastName,
                                        age_range: currentQuestionnaire?.title,
                                        answers: answers,
                                        analysis: null // On mettra à jour plus tard
                                    })
                                    .select();

                                if (error) throw error;

                                // 2. Afficher immédiatement le succès à l'utilisateur
                                setSendSuccess(true);
                                setIsSending(false);
                                alert("Votre bilan a bien été enregistré !");

                                // 3. Générer l'analyse Mistral EN ARRIÈRE-PLAN (non bloquant)
                                // L'utilisateur n'a pas besoin d'attendre
                                if (data && data[0]) {
                                    const bilanId = data[0].id;

                                    // Lancer l'analyse en arrière-plan sans bloquer
                                    generatePharmacistAnalysis(answers, allQuestions, {
                                        firstName: userInfo.firstName,
                                        lastName: userInfo.lastName,
                                        ageRange: currentQuestionnaire?.title,
                                        gender: userInfo.gender
                                    })
                                        .then(analysisResult => {
                                            console.log("📝 Analyse générée, mise à jour dans Supabase...", {
                                                bilanId: bilanId,
                                                analysisLength: analysisResult.length
                                            });
                                            // Mettre à jour le bilan avec l'analyse générée
                                            return supabase
                                                .from('bilans')
                                                .update({ analysis: analysisResult })
                                                .eq('id', bilanId);
                                        })
                                        .then((updateResult) => {
                                            console.log("📊 Résultat de la mise à jour Supabase:", updateResult);
                                            if (updateResult.error) {
                                                throw new Error(`Erreur Supabase update: ${updateResult.error.message}`);
                                            }
                                            console.log("✅ Analyse Mistral générée et sauvegardée avec succès");
                                        })
                                        .catch(mistralError => {
                                            console.error("❌ Erreur lors de la génération/sauvegarde de l'analyse Mistral:", mistralError);
                                            alert("⚠️ Votre bilan a été enregistré, mais l'analyse automatique n'a pas pu être générée. Le pharmacien pourra quand même consulter vos réponses.");
                                        });
                                }

                            } catch (error) {
                                console.error('Erreur lors de l\'envoi:', error);
                                alert(`Une erreur est survenue lors de l'envoi: ${error.message || error.details || JSON.stringify(error)}. Veuillez vérifier votre connexion et vos identifiants.`);
                                setIsSending(false);
                            }
                        }}
                    >
                        Envoyer mon bilan
                    </button>

                    {isSending && (
                        <div style={{ marginTop: '1rem', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Loader2 className="animate-spin" size={20} /> Envoi en cours...
                        </div>
                    )}

                    {sendSuccess && (
                        <div style={{ marginTop: '1rem', color: 'var(--color-accent-success)', fontWeight: 500 }}>
                            Bilan envoyé avec succès !
                        </div>
                    )}

                    <div style={{ marginTop: '2rem' }}>
                        <button
                            className="button-secondary"
                            style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
                            onClick={() => {
                                setCurrentScreen('home');
                                setCurrentQuestionIndex(0);
                                setAnswers({});
                                setSelectedAge(null);
                                setAllQuestions([]);
                                setCurrentQuestionnaire(null);
                                setUserInfo({ firstName: '', lastName: '', gender: '' });
                            }}
                        >
                            Recommencer
                        </button>
                    </div>
                </motion.div>
            </div >
        );
    }

    // Écran du questionnaire
    if (currentScreen === 'questionnaire' && currentQuestion) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                {/* Barre de progression */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    background: 'var(--color-bg-primary)',
                    padding: '1rem',
                    zIndex: 10,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        maxWidth: '640px',
                        margin: '0 auto'
                    }}>
                        <div style={{
                            flex: 1,
                            height: '8px',
                            background: '#E5E5E5',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #B8956A 0%, #D4A574 100%)',
                                    borderRadius: '4px'
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                        </div>
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'var(--color-text-secondary)',
                            minWidth: '45px'
                        }}>
                            {progress}%
                        </span>
                    </div>
                </div>

                {/* Question */}
                <div className="container" style={{ flex: 1 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'var(--color-accent-success)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {currentQuestion.sectionTitle}
                                </span>
                            </div>

                            <div className="card">
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: currentQuestion.helpText ? '0.5rem' : '2rem',
                                    lineHeight: 1.4
                                }}>
                                    {currentQuestion.text}
                                </h3>

                                {currentQuestion.helpText && (
                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.9rem',
                                        marginBottom: '2rem'
                                    }}>
                                        {currentQuestion.helpText}
                                    </p>
                                )}

                                {/* Questions avec options (choix multiples) */}
                                {currentQuestion.options && currentQuestion.options.length > 0 ? (
                                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                                        {currentQuestion.options.map((option) => (
                                            <button
                                                key={option}
                                                className="button-secondary"
                                                style={{
                                                    textAlign: 'left',
                                                    padding: '1.25rem',
                                                    fontSize: '1.1rem',
                                                    borderColor: answers[currentQuestion.id] === option
                                                        ? 'var(--color-accent-success)'
                                                        : '#E5E5E5',
                                                    backgroundColor: answers[currentQuestion.id] === option
                                                        ? 'rgba(124, 152, 133, 0.1)'
                                                        : 'white',
                                                    color: answers[currentQuestion.id] === option
                                                        ? 'var(--color-accent-success)'
                                                        : 'var(--color-text-primary)'
                                                }}
                                                onClick={() => handleAnswer(currentQuestion.id, option)}
                                            >
                                                {option}
                                                {answers[currentQuestion.id] === option && (
                                                    <Check size={20} style={{ marginLeft: '0.5rem' }} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    /* Questions de type texte (saisie libre) */
                                    <div>
                                        <AnimatedInput
                                            label={currentQuestion.text}
                                            value={answers[currentQuestion.id] || ''}
                                            type={currentQuestion.inputType || "text"}
                                            max={currentQuestion.max}
                                            unit={currentQuestion.unit}
                                            onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                                        />
                                        <button
                                            className="button button-primary"
                                            style={{ marginTop: '1.5rem', width: '100%' }}
                                            onClick={() => {
                                                // Passer à la question suivante
                                                if (currentQuestionIndex < allQuestions.length - 1) {
                                                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                                                } else {
                                                    setCurrentScreen('completion');
                                                }
                                            }}
                                        >
                                            Continuer <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Navigation */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '1.5rem'
                            }}>
                                <button
                                    className="button-secondary"
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIndex === 0}
                                    style={{
                                        width: 'auto',
                                        padding: '0.75rem 1.5rem',
                                        opacity: currentQuestionIndex === 0 ? 0.3 : 1
                                    }}
                                >
                                    <ChevronLeft size={20} style={{ marginRight: '0.5rem' }} />
                                    Retour
                                </button>

                                <span style={{
                                    color: 'var(--color-text-tertiary)',
                                    fontSize: '0.875rem',
                                    alignSelf: 'center'
                                }}>
                                    Question {currentQuestionIndex + 1} sur {allQuestions.length}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    // Écran d'accueil
    return (
        <div className="container">
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'rgba(124, 152, 133, 0.1)',
                    color: 'var(--color-accent-success)',
                    borderRadius: '20px',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                }}>
                    Prendre soin de soi est important
                </span>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <Stethoscope size={40} color="var(--color-accent-success)" />
                    Bilan Prévention
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                    Aidez votre pharmacien à mieux vous accompagner.
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', maxWidth: '500px', margin: '0 auto' }}>
                    Questionnaire officiel établi par le <strong>Ministère du Travail, de la Santé et des Solidarités</strong>.
                </p>
            </header>

            <main>
                <div className="card">
                    {/* Section Informations Personnelles */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={20} color="var(--color-accent-success)" />
                            Qui êtes-vous ?
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <AnimatedInput
                                label="Prénom *"
                                value={userInfo.firstName}
                                onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                            />
                            <AnimatedInput
                                label="Nom *"
                                value={userInfo.lastName}
                                onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                            />
                        </div>

                        {/* Sélecteur de Genre supprimé à la demande de l'utilisateur */}
                    </div>


                    {/* Section Sélection Âge */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={20} color="var(--color-accent-success)" />
                            Quel est votre âge ?
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                            {ageRanges.map((range) => (
                                <button
                                    key={range.id}
                                    className="button-secondary"
                                    style={{
                                        textAlign: 'left',
                                        padding: '1.25rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderColor: selectedAge === range.id ? 'var(--color-accent-success)' : 'var(--color-text-tertiary)',
                                        backgroundColor: selectedAge === range.id ? 'rgba(124, 152, 133, 0.1)' : 'transparent',
                                        color: selectedAge === range.id ? 'var(--color-accent-success)' : 'var(--color-text-primary)'
                                    }}
                                    onClick={() => setSelectedAge(range.id)}
                                >
                                    <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{range.label}</span>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: '2px solid currentColor',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {selectedAge === range.id && (
                                            <div style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: 'currentColor'
                                            }} />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>


                    {loadingError && (
                        <div style={{ color: 'var(--color-accent-error)', marginBottom: '1rem', textAlign: 'center' }}>
                            {loadingError}
                        </div>
                    )}

                    <button
                        className="button button-primary"
                        disabled={!selectedAge || !userInfo.firstName || !userInfo.lastName || isLoadingQuestionnaire || !!loadingError}
                        style={{
                            opacity: (selectedAge && userInfo.firstName && userInfo.lastName && !isLoadingQuestionnaire && !loadingError) ? 1 : 0.5,
                            cursor: (selectedAge && userInfo.firstName && userInfo.lastName && !isLoadingQuestionnaire && !loadingError) ? 'pointer' : 'not-allowed'
                        }}
                        onClick={handleStartQuestionnaire}
                    >
                        {isLoadingQuestionnaire ? (
                            <span>Chargement du questionnaire...</span>
                        ) : (
                            <>Commencer mon bilan <ChevronRight style={{ marginLeft: '0.5rem' }} /></>
                        )}
                    </button>
                </div>

                <section style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: 'var(--color-text-tertiary)',
                    fontSize: '0.9rem'
                }}>
                    <Shield size={16} />
                    <span>Vos données sont sécurisées et confidentielles</span>
                </section>
            </main>

            <footer style={{ marginTop: 'auto', paddingTop: '3rem', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>Source : Ministère du Travail, de la Santé et des Solidarités</p>
                © 2026 - Assistant Digital Pharmacien
            </footer>
        </div>
    );
}

export default App;
