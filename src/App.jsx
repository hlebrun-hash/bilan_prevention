import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft, Check, CheckCircle, Stethoscope, User } from 'lucide-react';
import { AnimatedInput } from './components/ui/AnimatedInput';

// Import de tous les questionnaires
import questionnaire_18_25 from './data/questionnaire_18_25.json';
// ... reste inchangé ...
import questionnaire_45_50 from './data/questionnaire_45_50.json';
import questionnaire_60_65 from './data/questionnaire_60_65.json';
import questionnaire_70_75 from './data/questionnaire_70_75.json';

const ageRanges = [
    { id: '18-25', label: '18-25 ans', questionnaire: questionnaire_18_25 },
    { id: '45-50', label: '45-50 ans', questionnaire: questionnaire_45_50 },
    { id: '60-65', label: '60-65 ans', questionnaire: questionnaire_60_65 },
    { id: '70-75', label: '70-75 ans', questionnaire: questionnaire_70_75 }
];

function App() {
    const [selectedAge, setSelectedAge] = useState(null);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
    const [currentScreen, setCurrentScreen] = useState('home');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null);

    // Charger le questionnaire quand l'âge est sélectionné
    useEffect(() => {
        if (selectedAge) {
            const ageRange = ageRanges.find(range => range.id === selectedAge);
            if (ageRange) {
                setCurrentQuestionnaire(ageRange.questionnaire);

                // Aplatir toutes les questions
                const questions = [];
                ageRange.questionnaire.sections.forEach(section => {
                    section.questions.forEach(question => {
                        questions.push({
                            ...question,
                            sectionTitle: section.title
                        });
                    });
                });
                setAllQuestions(questions);
            }
        }
    }, [selectedAge]);

    const handleStartQuestionnaire = () => {
        if (selectedAge && userInfo.firstName && userInfo.lastName && allQuestions.length > 0) {
            setCurrentScreen('questionnaire');
        }
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });

        // Passer à la question suivante après un court délai
        setTimeout(() => {
            if (currentQuestionIndex < allQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Toutes les questions sont répondues
                setCurrentScreen('completion');
            }
        }, 300);
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    if (allQuestions.length === 0 && currentScreen === 'questionnaire') {
        return <div className="container">Chargement du questionnaire...</div>;
    }

    const currentQuestion = allQuestions[currentQuestionIndex];
    const progress = allQuestions.length > 0 ? Math.round(((currentQuestionIndex + 1) / allQuestions.length) * 100) : 0;

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
                        onClick={() => {
                            console.log('Utilisateur:', userInfo);
                            console.log('Réponses:', answers);
                            console.log('Questionnaire:', currentQuestionnaire?.title);
                            alert('Fonctionnalité d\'envoi à venir (intégration Mistral AI)');
                        }}
                    >
                        Envoyer mon bilan
                    </button>

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
                                setUserInfo({ firstName: '', lastName: '' });
                            }}
                        >
                            Recommencer
                        </button>
                    </div>
                </motion.div>
            </div>
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
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <Stethoscope size={40} color="var(--color-accent-success)" />
                    Bilan Prévention
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>
                    Aidez votre pharmacien à mieux vous accompagner.
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
                    </div>



                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Sélectionnez votre tranche d'âge :</h2>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
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

                    <button
                        className="button button-primary"
                        disabled={!selectedAge || !userInfo.firstName || !userInfo.lastName}
                        style={{
                            opacity: (selectedAge && userInfo.firstName && userInfo.lastName) ? 1 : 0.5,
                            cursor: (selectedAge && userInfo.firstName && userInfo.lastName) ? 'pointer' : 'not-allowed'
                        }}
                        onClick={handleStartQuestionnaire}
                    >
                        Commencer mon bilan <ChevronRight style={{ marginLeft: '0.5rem' }} />
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
                © 2026 - Assistant Digital Pharmacien
            </footer>
        </div>
    );
}

export default App;
