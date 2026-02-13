import PyPDF2
import json
import re

def extract_pdf_text(pdf_path):
    """Extrait le texte complet d'un PDF"""
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text

def analyze_questionnaire(text, age_range):
    """Analyse le contenu du questionnaire pour extraire les sections et questions"""
    
    # Diviser en sections
    sections = []
    
    # Patterns pour identifier les sections principales
    section_patterns = [
        r"Situation personnelle",
        r"Mode de vie",
        r"Antécédents",
        r"Santé mentale",
        r"Vaccinations",
        r"Dépistages",
        r"Prévention"
    ]
    
    # Extraire les questions (généralement suivies de Oui/Non ou de cases à cocher)
    questions = re.findall(r'([^\n]+(?:Oui|Non|□))', text)
    
    return {
        "age_range": age_range,
        "raw_text_length": len(text),
        "questions_found": len(questions),
        "sample_questions": questions[:10] if questions else [],
        "full_text_preview": text[:2000]  # Premier 2000 caractères
    }

if __name__ == "__main__":
    questionnaires = {
        "18-25ans": "Mon-bilan-prevention-autoquestionnaire-18-25ans.pdf",
        "45-50ans": "Mon-bilan-prevention-autoquestionnaire-45-50ans.pdf",
        "60-65ans": "Mon-bilan-prevention-autoquestionnaire-60-65ans.pdf",
        "70-75ans": "Mon-bilan-prevention-autoquestionnaire-70-75ans.pdf"
    }
    
    results = {}
    
    for age_range, pdf_file in questionnaires.items():
        print(f"\n{'='*60}")
        print(f"Analyse: {age_range}")
        print(f"{'='*60}")
        
        try:
            text = extract_pdf_text(pdf_file)
            analysis = analyze_questionnaire(text, age_range)
            results[age_range] = analysis
            
            print(f"Longueur du texte: {analysis['raw_text_length']} caractères")
            print(f"Questions trouvées: {analysis['questions_found']}")
            print(f"\nAperçu du contenu:")
            print(analysis['full_text_preview'])
            print(f"\n{'='*60}\n")
            
        except Exception as e:
            print(f"Erreur: {e}")
            results[age_range] = {"error": str(e)}
    
    # Sauvegarder les résultats
    with open('questionnaires_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print("\n✓ Analyse sauvegardée dans questionnaires_analysis.json")
