import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_from_images(image_paths):
    extracted_text = ""

    for image_path in image_paths:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        extracted_text += text

    return extracted_text

