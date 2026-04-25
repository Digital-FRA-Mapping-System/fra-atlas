from app.database import get_db_connection


def save_fra_claim(fields, file_path):
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1️⃣ Ensure STATE exists (optional: default)
    state_name = "Madhya Pradesh"  # you can later extract from OCR

    cursor.execute("SELECT id FROM states WHERE state_name = %s", (state_name,))
    state = cursor.fetchone()

    if not state:
        cursor.execute(
            "INSERT INTO states (state_name) VALUES (%s) RETURNING id",
            (state_name,)
        )
        state_id = cursor.fetchone()[0]
    else:
        state_id = state[0]

    # 2️⃣ Ensure DISTRICT exists
    cursor.execute(
        "SELECT id FROM districts WHERE district_name = %s AND state_id = %s",
        (fields["district"], state_id)
    )
    district = cursor.fetchone()

    if not district:
        cursor.execute(
            "INSERT INTO districts (district_name, state_id) VALUES (%s, %s) RETURNING id",
            (fields["district"], state_id)
        )
        district_id = cursor.fetchone()[0]
    else:
        district_id = district[0]

    # 3️⃣ Ensure VILLAGE exists
    cursor.execute(
        "SELECT id FROM villages WHERE village_name = %s AND district_id = %s",
        (fields["village"], district_id)
    )
    village = cursor.fetchone()

    if not village:
        cursor.execute(
            "INSERT INTO villages (village_name, district_id) VALUES (%s, %s) RETURNING id",
            (fields["village"], district_id)
        )
        village_id = cursor.fetchone()[0]
    else:
        village_id = village[0]

    # 4️⃣ Clean area
    area = None
    if fields["cultivation_extent"]:
        try:
            area = float(fields["cultivation_extent"].replace(" acres", "").strip())
        except:
            area = None

    # 5️⃣ Insert into fra_claims
    cursor.execute("""
        INSERT INTO fra_claims (
            claimant_name,
            fra_type,
            village_id,
            area_claimed
        )
        VALUES (%s, %s, %s, %s)
        RETURNING id
    """, (
        fields["claimant_name"],
        "IFR",
        village_id,
        area
    ))

    claim_id = cursor.fetchone()[0]

    # 6️⃣ Save document
    cursor.execute("""
        INSERT INTO claim_documents (
            claim_id,
            document_type,
            file_path
        )
        VALUES (%s, %s, %s)
    """, (
        claim_id,
        "FRA_FORM",
        file_path
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return claim_id