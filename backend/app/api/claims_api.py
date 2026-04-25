from fastapi import APIRouter
from app.database import get_db_connection

router = APIRouter()



router = APIRouter()


@router.get("/claims")
def get_all_claims():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            c.id,
            c.claimant_name,
            c.fra_type,
            v.village_name,
            d.district_name,
            c.area_claimed,
            c.status,
            c.rejection_reason   -- ✅ ADD THIS
        FROM fra_claims c
        LEFT JOIN villages v ON c.village_id = v.id
        LEFT JOIN districts d ON v.district_id = d.id
    """)

    rows = cursor.fetchall()

    claims = []
    for row in rows:
        claims.append({
            "id": row[0],
            "claimant_name": row[1],
            "fra_type": row[2],
            "village": row[3],
            "district": row[4],
            "area_claimed": str(row[5]) if row[5] else None,
            "status": row[6],
            "rejection_reason": row[7]
        })

    cursor.close()
    conn.close()

    return {"claims": claims}
# @router.get("/claims")
# def get_all_claims():

#     conn = get_db_connection()
#     cursor = conn.cursor()

#     cursor.execute("SELECT * FROM claims")

#     rows = cursor.fetchall()

#     claims = []

#     for row in rows:
#         claims.append({
#             "id": row[0],
#             "claimant_name": row[1],
#             "spouse_name": row[2],
#             "parent_name": row[3],
#             "address": row[4],
#             "village": row[5],
#             "gram_panchayat": row[6],
#             "tehsil": row[7],
#             "district": row[8],
#             "habitation_extent": row[9],
#             "cultivation_extent": row[10],
#             "evidence": row[11],
#             "other_information": row[12]
#         })

#     cursor.close()
#     conn.close()

#     return {"claims": claims}



@router.put("/update-claim-status/{claim_id}")
def update_claim_status(claim_id: int, status: str, reason: str = None):

    conn = get_db_connection()
    cursor = conn.cursor()

    # ✅ 1. Update claim status
    if status == "rejected":
        cursor.execute("""
            UPDATE fra_claims
            SET status = %s, rejection_reason = %s
            WHERE id = %s
        """, (status, reason, claim_id))
    else:
        cursor.execute("""
            UPDATE fra_claims
            SET status = %s, rejection_reason = NULL
            WHERE id = %s
        """, (status, claim_id))

    # ✅ 2. INSERT INTO WORKFLOW TABLE
    cursor.execute("""
        INSERT INTO claim_workflow (claim_id, stage_name, action_taken, remarks)
        VALUES (%s, %s, %s, %s)
    """, (
        claim_id,
        "review",              # stage_name
        status,                # action_taken (approved/rejected)
        reason if status == "rejected" else "Approved by officer"
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": f"Claim {status} successfully"}

# @router.put("/update-claim-status/{claim_id}")
# def update_claim_status(claim_id: int, status: str, reason: str = None):

#     conn = get_db_connection()
#     cursor = conn.cursor()

#     if status == "rejected":
#         cursor.execute("""
#             UPDATE fra_claims
#             SET status = %s, rejection_reason = %s
#             WHERE id = %s
#         """, (status, reason, claim_id))
#     else:
#         cursor.execute("""
#             UPDATE fra_claims
#             SET status = %s, rejection_reason = NULL
#             WHERE id = %s
#         """, (status, claim_id))

#     conn.commit()
#     cursor.close()
#     conn.close()

#     return {"message": f"Claim {status} successfully"}




@router.get("/claim-workflow/{claim_id}")
def get_claim_workflow(claim_id: int):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT stage_name, action_taken, remarks, action_timestamp
        FROM claim_workflow
        WHERE claim_id = %s
        ORDER BY action_timestamp DESC
    """, (claim_id,))

    rows = cursor.fetchall()

    history = []
    for row in rows:
        history.append({
            "stage": row[0],
            "action": row[1],
            "remarks": row[2],
            "time": str(row[3])
        })

    cursor.close()
    conn.close()

    return {"history": history}