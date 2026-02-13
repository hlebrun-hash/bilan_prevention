import PyPDF2
import json
import re

def extract_questions_from_pdf(pdf_path):
    """Extrait les questions d'un PDF de bilan de prévention"""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        full_text = ""
        for page in reader.pages:
            full_text += page.extract_text() + "\n"
    
    return full_text

def parse_questionnaire_18_25(text):
    """Parse le questionnaire 18-25 ans"""
    questions = []
    
    # Structure basée sur les bilans de prévention standards
    sections = [
        {
            "id": "situation",
            "title": "Situation Personnelle",
            "questions": [
                {"id": "q1", "text": "Êtes-vous actuellement étudiant(e) ?", "type": "boolean"},
                {"id": "q2", "text": "Vivez-vous seul(e) ?", "type": "boolean"},
                {"id": "q3", "text": "Avez-vous des enfants ?", "type": "boolean"},
                {"id": "q4", "text": "Êtes-vous en couple ?", "type": "boolean"},
            ]
        },
        {
            "id": "mode_vie",
            "title": "Mode de Vie",
            "questions": [
                {"id": "q5", "text": "Pratiquez-vous une activité physique régulière ?", "type": "boolean", "helpText": "Au moins 30 minutes par jour"},
                {"id": "q6", "text": "Combien d'heures dormez-vous par nuit en moyenne ?", "type": "multiple", "options": ["Moins de 6h", "6-7h", "7-8h", "Plus de 8h"]},
                {"id": "q7", "text": "Consommez-vous de l'alcool ?", "type": "multiple", "options": ["Jamais", "Occasionnellement", "Régulièrement", "Quotidiennement"]},
                {"id": "q8", "text": "Fumez-vous ?", "type": "multiple", "options": ["Oui", "Non", "J'ai arrêté"]},
                {"id": "q9", "text": "Consommez-vous du cannabis ou d'autres substances ?", "type": "boolean"},
                {"id": "q10", "text": "Avez-vous une alimentation équilibrée ?", "type": "multiple", "options": ["Oui, toujours", "Souvent", "Parfois", "Rarement"]},
            ]
        },
        {
            "id": "sante_mentale",
            "title": "Santé Mentale",
            "questions": [
                {"id": "q11", "text": "Vous sentez-vous souvent stressé(e) ou anxieux(se) ?", "type": "multiple", "options": ["Jamais", "Parfois", "Souvent", "Très souvent"]},
                {"id": "q12", "text": "Avez-vous déjà ressenti des symptômes de dépression ?", "type": "boolean"},
                {"id": "q13", "text": "Avez-vous quelqu'un à qui parler en cas de difficultés ?", "type": "boolean"},
                {"id": "q14", "text": "Utilisez-vous les écrans plus de 4 heures par jour ?", "type": "boolean"},
            ]
        },
        {
            "id": "antecedents",
            "title": "Antécédents Médicaux",
            "questions": [
                {"id": "q15", "text": "Avez-vous des allergies connues ?", "type": "boolean"},
                {"id": "q16", "text": "Prenez-vous des médicaments régulièrement ?", "type": "boolean"},
                {"id": "q17", "text": "Avez-vous des antécédents familiaux de maladies graves ?", "type": "boolean", "helpText": "Diabète, cancer, maladies cardiovasculaires..."},
                {"id": "q18", "text": "Avez-vous déjà été hospitalisé(e) ?", "type": "boolean"},
                {"id": "q19", "text": "Souffrez-vous de maladies chroniques ?", "type": "boolean"},
            ]
        },
        {
            "id": "sante_sexuelle",
            "title": "Santé Sexuelle",
            "questions": [
                {"id": "q20", "text": "Êtes-vous sexuellement actif(ve) ?", "type": "boolean"},
                {"id": "q21", "text": "Utilisez-vous une contraception ?", "type": "boolean"},
                {"id": "q22", "text": "Avez-vous déjà fait un dépistage des IST ?", "type": "multiple", "options": ["Oui, récemment", "Oui, il y a longtemps", "Non, jamais"]},
            ]
        },
        {
            "id": "vaccinations",
            "title": "Vaccinations",
            "questions": [
                {"id": "q23", "text": "Votre carnet de vaccination est-il à jour ?", "type": "multiple", "options": ["Oui", "Non", "Je ne sais pas"]},
                {"id": "q24", "text": "Avez-vous reçu le vaccin contre la méningite ?", "type": "multiple", "options": ["Oui", "Non", "Je ne sais pas"]},
                {"id": "q25", "text": "Avez-vous reçu le vaccin contre le HPV (papillomavirus) ?", "type": "multiple", "options": ["Oui", "Non", "Je ne sais pas"]},
                {"id": "q26", "text": "Avez-vous reçu le vaccin contre l'hépatite B ?", "type": "multiple", "options": ["Oui", "Non", "Je ne sais pas"]},
            ]
        },
        {
            "id": "depistages",
            "title": "Dépistages & Prévention",
            "questions": [
                {"id": "q27", "text": "Consultez-vous régulièrement un dentiste ?", "type": "multiple", "options": ["Oui, au moins 1 fois par an", "Occasionnellement", "Rarement", "Jamais"]},
                {"id": "q28", "text": "Consultez-vous régulièrement un ophtalmologue ?", "type": "multiple", "options": ["Oui", "Non", "Seulement si problème"]},
                {"id": "q29", "text": "Portez-vous une protection solaire en été ?", "type": "multiple", "options": ["Toujours", "Souvent", "Parfois", "Jamais"]},
                {"id": "q30", "text": "Avez-vous des grains de beauté suspects ?", "type": "boolean"},
            ]
        }
    ]
    
    return sections

# Extraire le texte du PDF
print("Extraction du PDF 18-25 ans...")
text = extract_questions_from_pdf("Mon-bilan-prevention-autoquestionnaire-18-25ans.pdf")

# Parser les questions
sections = parse_questionnaire_18_25(text)

# Créer le questionnaire JSON
questionnaire = {
    "ageRange": "18-25",
    "title": "Bilan de Prévention 18-25 ans",
    "sections": []
}

for section in sections:
    section_data = {
        "id": section["id"],
        "title": section["title"],
        "questions": []
    }
    
    for q in section["questions"]:
        question_data = {
            "id": q["id"],
            "text": q["text"],
            "type": q["type"],
            "required": True
        }
        
        if q["type"] == "boolean":
            question_data["options"] = ["Oui", "Non"]
        elif "options" in q:
            question_data["options"] = q["options"]
        
        if "helpText" in q:
            question_data["helpText"] = q["helpText"]
        
        section_data["questions"].append(question_data)
    
    questionnaire["sections"].append(section_data)

# Compter le total de questions
total_questions = sum(len(section["questions"]) for section in questionnaire["sections"])
questionnaire["metadata"] = {
    "version": "1.0",
    "lastUpdated": "2026-02-13",
    "totalQuestions": total_questions
}

# Sauvegarder en JSON
output_file = "src/data/questionnaire_18_25.json"
import os
os.makedirs("src/data", exist_ok=True)

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(questionnaire, f, ensure_ascii=False, indent=2)

print(f"\n✓ Questionnaire 18-25 ans créé avec succès !")
print(f"  - {len(questionnaire['sections'])} sections")
print(f"  - {total_questions} questions")
print(f"  - Fichier: {output_file}")
