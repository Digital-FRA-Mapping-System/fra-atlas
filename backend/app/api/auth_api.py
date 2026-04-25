from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import get_db_connection

router = APIRouter()

# -------------------- MODELS --------------------

class LoginRequest(BaseModel):
    phone: str
    password: str

class ComplaintRequest(BaseModel):
    user_id: int
    claim_id: int
    description: str

# -------------------- LOGIN --------------------

@router.post("/login")
def login(data: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, full_name, role_id 
        FROM users 
        WHERE email = %s AND password_hash = %s
    """, (data.phone, data.password))

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return {
            "user_id": user[0],
            "name": user[1],
            "role": user[2]
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# -------------------- USER CLAIMS --------------------

@router.get("/my-claims/{user_id}")
def get_user_claims(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT c.id, c.claimant_name, c.status
        FROM fra_claims c
        JOIN users u ON u.village_id = c.village_id
        WHERE u.id = %s
    """, (user_id,))

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {"id": row[0], "claimant_name": row[1], "status": row[2]} 
        for row in rows
    ]

# -------------------- RAISE COMPLAINT --------------------

@router.post("/raise-complaint")
def raise_complaint(data: ComplaintRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO complaints (claim_id, raised_by, description)
        VALUES (%s, %s, %s)
    """, (data.claim_id, data.user_id, data.description))

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Complaint submitted"}

# -------------------- GET COMPLAINTS --------------------

@router.get("/complaints")
def get_complaints():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT c.id, u.full_name, c.description, c.status
        FROM complaints c
        JOIN users u ON c.raised_by = u.id
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data

# -------------------- UPDATE CLAIM --------------------

@router.put("/update-claim/{claim_id}")
def update_claim(claim_id: int, status: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE fra_claims
        SET status = %s
        WHERE id = %s
    """, (status, claim_id))

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Updated"}