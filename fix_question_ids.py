import json

# Charger le questionnaire
with open('src/data/questionnaire_60_65.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Renuméroter toutes les questions de 1 à 31 (car on a ajouté une question)
counter = 1
for section in data['sections']:
    for question in section['questions']:
        question['id'] = f'q{counter}'
        counter += 1

# Mettre à jour le total de questions
data['metadata']['totalQuestions'] = counter - 1

# Sauvegarder
with open('src/data/questionnaire_60_65.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ Questionnaire mis à jour avec {counter - 1} questions")
print(f"✓ Q1 = {data['sections'][0]['questions'][0]['text']}")
