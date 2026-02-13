
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

# Placeholder pour le prompt de l'utilisateur
# Vous pouvez coller votre prompt ci-dessous.
USER_PROMPT = """
[COLLER VOTRE PROMPT ICI]
"""

if not USER_PROMPT or "COLLER VOTRE PROMPT ICI" in USER_PROMPT:
    print("Veuillez remplacer le texte '[COLLER VOTRE PROMPT ICI]' dans ce script par votre prompt réel.")
else:
    print("Analyse en cours avec Mistral...")
    try:
        chat_response = client.chat.complete(
            model="mistral-large-latest",
            messages=[
                {
                    "role": "user",
                    "content": USER_PROMPT,
                },
            ]
        )
        print("\n--- Réponse de Mistral ---\n")
        print(chat_response.choices[0].message.content)
    except Exception as e:
        print(f"Une erreur est survenue lors de l'appel à l'API Mistral: {e}")
