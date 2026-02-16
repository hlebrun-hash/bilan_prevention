
import { Mistral } from '@mistralai/mistralai';

// Utiliser VITE_MISTRAL_API_KEY
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

if (!apiKey) {
    console.error("VITE_MISTRAL_API_KEY is missing!");
}

const client = new Mistral({ apiKey: apiKey });

/**
 * Génère l'analyse pharmacien à partir des réponses du patient
 * @param {Object} answers - Objet contenant les réponses { q1: "Oui", ... }
 * @param {Array} questions - Tableau des questions avec le texte
 * @param {Object} userInfo - Infos utilisateur { firstName, lastName, ageRange }
 * @returns {Promise<string>} - Le conseil généré par Mistral
 */
export async function generatePharmacistAnalysis(answers, questions, userInfo) {
    try {
        // 1. Formater les données pour le prompt
        let patientDataText = `Patient: ${userInfo.firstName} ${userInfo.lastName}, Tranche d'âge: ${userInfo.ageRange}\n\n`;

        // Créer une map pour retrouver facilement le texte des questions
        // On suppose que 'questions' contient tous les objets questions avec 'id' et 'text'
        questions.forEach(q => {
            const answer = answers[q.id];
            if (answer) {
                // Si c'est un tableau (choix multiples), on joint par des virgules
                const answerText = Array.isArray(answer) ? answer.join(", ") : answer;
                patientDataText += `- Question: "${q.text}"\n  Réponse: "${answerText}"\n`;
            }
        });

        // 2. Construire le prompt (copié depuis la version Python validée)
        const promptTemplate = `### RÔLE
Tu es un pharmacien expert et bienveillant en France. Ta mission est d'analyser les réponses d'un patient à un questionnaire de santé et de lui fournir des conseils préventifs personnalisés, basés EXCLUSIVEMENT sur des recommandations officielles (Haute Autorité de Santé, Ameli, Santé Publique France). Tu ne dois jamais inventer d'informations médicales.

### INPUT (DONNÉES)
Voici les réponses au questionnaire du patient :
${patientDataText}

### CONSIGNES DE RÉDACTION
1. **Analyse ciblée :** Identifie les points d'attention dans les réponses concernant :
   - Vaccins, dépistages et santé sexuelle.
   - Conduites addictives (alcool, tabac, substances).
   - Les priorités du patient (Arrêt tabac/alcool, Bien-être mental/stress, Ménopause, Dépistages liés à l'âge).

2. **Conseil Actionnable :** Pour chaque point identifié, formule un conseil pratique et immédiat (style "Conseil pharmacien"). Utilise un ton professionnel, empathique et direct.

3. **Format et Longueur :**
   - La réponse totale doit faire **MOINS DE 200 MOTS**.
   - Structure ta réponse sous forme de liste à puces ou de courts paragraphes.
   - Si tout va bien sur un sujet, ne le mentionne pas pour économiser des mots. Concentre-toi sur les zones d'amélioration.

### EXEMPLE DE FORMAT ATTENDU (Style)
*Si le patient répond "NON" à une question sur l'audition :*
**Conseil pharmacien :** Pour protéger votre audition, pensez à baisser le volume (TV, écouteurs), portez des bouchons lors d'activités bruyantes et accordez-vous des pauses de silence.

### TA RÉPONSE
Analyse les réponses fournies ci-dessus et génère les conseils pharmaciens correspondants (max 200 mots, sources gouvernementales uniquement).`;

        // 3. Appeler Mistral
        const chatResponse = await client.chat.complete({
            model: "mistral-large-latest",
            messages: [{ role: 'user', content: promptTemplate }],
        });

        return chatResponse.choices[0].message.content;

    } catch (error) {
        console.error("Erreur lors de la génération de l'analyse Mistral:", error);
        return "L'analyse automatique n'a pas pu être générée pour le moment. Votre pharmacien pourra compléter ce bilan lors de votre rendez-vous.";
    }
}
