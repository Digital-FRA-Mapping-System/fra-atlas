from fastapi import APIRouter

router = APIRouter()

@router.get("/gpi")
def get_gpi_data():
    return {"message": "GPI data endpoint"}