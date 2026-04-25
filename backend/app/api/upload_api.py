from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.field_extractor import extract_fra_fields
from app.services.pdf_processor import convert_pdf_to_images
from app.services.ocr_service import extract_text_from_images
from app.services.db_service import save_fra_claim

router = APIRouter()

UPLOAD_FOLDER = "backend/uploads/fra_documents"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-fra-document")
async def upload_document(file: UploadFile = File(...)):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    images = convert_pdf_to_images(file_path)
    text = extract_text_from_images(images)
    fields = extract_fra_fields(text)

    claim_id = save_fra_claim(fields, file_path)

    return {
        "message": "File uploaded and processed",
        "claim_id": claim_id,
        "structured_data": fields
    }







# from fastapi import APIRouter, UploadFile, File
# import shutil
# import os

# from app.database import get_db_connection
# from app.services.field_extractor import extract_fra_fields
# from app.services.pdf_processor import convert_pdf_to_images
# from app.services.ocr_service import extract_text_from_images

# router = APIRouter()

# UPLOAD_FOLDER = "backend/uploads/fra_documents"

# os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# @router.post("/upload-fra-document")
# async def upload_document(file: UploadFile = File(...)):

#     file_path = f"{UPLOAD_FOLDER}/{file.filename}"

#     # Save uploaded file
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # Convert PDF to images
#     images = convert_pdf_to_images(file_path)

#     # Run OCR
#     text = extract_text_from_images(images)

#     # Extract fields
#     fields = extract_fra_fields(text)

#     # Save extracted fields to database
#     conn = get_db_connection()
#     cursor = conn.cursor()

#     cursor.execute("""
#     INSERT INTO claims (
#         claimant_name,
#         spouse_name,
#         parent_name,
#         address,
#         village,
#         gram_panchayat,
#         tehsil,
#         district,
#         habitation_extent,
#         cultivation_extent,
#         evidence,
#         other_information
#     )
#     VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
#     """, (
#         fields["claimant_name"],
#         fields["spouse_name"],
#         fields["parent_name"],
#         fields["address"],
#         fields["village"],
#         fields["gram_panchayat"],
#         fields["tehsil"],
#         fields["district"],
#         fields["habitation_extent"],
#         fields["cultivation_extent"],
#         fields["evidence"],
#         fields["other_information"]
#     ))

#     conn.commit()
#     cursor.close()
#     conn.close()

#     return {
#         "message": "File uploaded and processed",
#         "extracted_text": text,
#         "structured_data": fields
#     }