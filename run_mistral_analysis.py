
import os
from dotenv import load_dotenv
from mistralai import Mistral

# Load environment variables
load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")

if not api_key:
    print("Erreur: MISTRAL_API_KEY n'est pas définie dans le fichier .env.")
    exit(1)

client = Mistral(api_key=api_key)

def generate_pharmacist_advice(patient_data):
    """
    Génère des conseils pharmaciens personnalisés à partir des données du patient
    en utilisant le prompt structuré.
    """
    
    # Le prompt structuré fourni pour le rôle de pharmacien
    prompt_template = """### RÔLE
Tu es un pharmacien expert et bienveillant en France. Ta mission est d'analyser les réponses d'un patient à un questionnaire de santé et de lui fournir des conseils préventifs personnalisés, basés EXCLUSIVEMENT sur des recommandations officielles (Haute Autorité de Santé, Ameli, Santé Publique France). Tu ne dois jamais inventer d'informations médicales.

### INPUT (DONNÉES)
Voici les réponses au questionnaire du patient :
{patient_responses}

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
Analyse les réponses fournies ci-dessus et génère les conseils pharmaciens correspondants (max 200 mots, sources gouvernementales uniquement)."""

    # Insertion des données du patient dans le template
    final_prompt = prompt_template.format(patient_responses=patient_data)
    
    print("Envoi du prompt à Mistral...")
    
    try:
        chat_response = client.chat.complete(
            model="mistral-large-latest",
            messages=[
                {
                    "role": "user",
                    "content": final_prompt,
                },
            ]
        )
        return chat_response.choices[0].message.content
    except Exception as e:
        return f"Une erreur est survenue lors de l'appel à l'API Mistral: {e}"

# Exemple d'utilisation
if __name__ == "__main__":
    # Données simulées pour le test (à remplacer par les vraies réponses)
    sample_patient_data = """
    - Age: 45 ans
    - Sexe: Homme
    - Tabac: Fumeur quotidien (10 cigarettes/jour)
    - Alcool: Occasionnel
    - Activité physique: 1 fois par semaine
    - Sommeil: Correct
    - Vaccinations: À jour (déclaré)
    - Dépistages: Jamais fait de dépistage cancer colorectal
    """
    
    print("\n--- Test du script run_mistral_analysis.py ---\n")
    advice = generate_pharmacist_advice(sample_patient_data)
    
    print("\n--- Réponse de Mistral (Conseils Pharmacien) ---\n")
    print(advice)
