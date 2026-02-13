
import os
from dotenv import load_dotenv
from mistralai import Mistral

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")

if not api_key:
    print("Erreur: MISTRAL_API_KEY non trouvée.")
    exit(1)

try:
    client = Mistral(api_key=api_key)
    # Simple call to list models to verify auth
    models_response = client.models.list()
    print("Connexion réussie ! L'API Mistral est accessible.")
    print(f"Nombre de modèles disponibles: {len(models_response.data)}")
except Exception as e:
    print(f"Erreur de connexion à l'API Mistral: {e}")
