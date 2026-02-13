import PyPDF2
import re

def extract_text_from_pdf(pdf_path):
    """Extrait tout le texte d'un PDF"""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text

# Extraire le texte du PDF 60-65 ans
print("Extraction du PDF 60-65 ans...")
text = extract_text_from_pdf("Mon-bilan-prevention-autoquestionnaire-60-65ans.pdf")

# Afficher les 3000 premiers caractères pour voir la structure
print("\n" + "="*80)
print("APERÇU DU CONTENU (3000 premiers caractères):")
print("="*80)
print(text[:3000])

# Sauvegarder tout le texte dans un fichier
with open("pdf_60_65_extracted.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("\n" + "="*80)
print("✓ Texte complet sauvegardé dans: pdf_60_65_extracted.txt")
print(f"✓ Longueur totale: {len(text)} caractères")
print("="*80)
