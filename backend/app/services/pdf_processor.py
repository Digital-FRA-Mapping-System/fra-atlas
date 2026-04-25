from pdf2image import convert_from_path
import os

POPPLER_PATH = r"C:\Users\samiksha\Downloads\Release-25.12.0-0\poppler-25.12.0\Library\bin"

OUTPUT_FOLDER = "uploads/processed_images"

def convert_pdf_to_images(pdf_path):
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    images = convert_from_path(
        pdf_path,
        poppler_path=POPPLER_PATH
    )

    image_paths = []

    for i, image in enumerate(images):
        image_path = f"{OUTPUT_FOLDER}/page_{i}.png"
        image.save(image_path, "PNG")
        image_paths.append(image_path)

    return image_paths