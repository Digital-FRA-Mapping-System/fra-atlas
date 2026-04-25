from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload_api import router as upload_router
from app.api.auth_api import router as auth_router   # ✅ FIXED
from app.api.claims_api import router as claims_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FRA Atlas API is running"}

# REGISTER ROUTES
app.include_router(upload_router)
app.include_router(auth_router)   # ✅ IMPORTANT
app.include_router(claims_router)