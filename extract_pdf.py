import PyPDF2
import sys

def extract_pdf_text(pdf_path):
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page_num, page in enumerate(reader.pages):
            text += f"\n\n=== PAGE {page_num + 1} ===\n\n"
            text += page.extract_text()
        return text

if __name__ == "__main__":
    pdf_files = [
        "Mon-bilan-prevention-autoquestionnaire-18-25ans.pdf",
        "Mon-bilan-prevention-autoquestionnaire-45-50ans.pdf",
        "Mon-bilan-prevention-autoquestionnaire-60-65ans.pdf",
        "Mon-bilan-prevention-autoquestionnaire-70-75ans.pdf"
    ]
    
    for pdf_file in pdf_files:
        print(f"\n\n{'='*80}")
        print(f"FICHIER: {pdf_file}")
        print(f"{'='*80}\n")
        try:
            text = extract_pdf_text(pdf_file)
            print(text)
        except Exception as e:
            print(f"Erreur lors de l'extraction de {pdf_file}: {e}")
