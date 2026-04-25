import re

def extract_fra_fields(text):

    data = {}

    # Claimant Name
    match = re.search(r"Name of the claimant:\s*(.*)", text)
    data["claimant_name"] = match.group(1).strip() if match else None

    # Spouse Name
    match = re.search(r"Name of the spouse:\s*(.*)", text)
    data["spouse_name"] = match.group(1).strip() if match else None

    # Father or Mother Name
    match = re.search(r"Name of the father\/mother:\s*(.*)", text)
    data["parent_name"] = match.group(1).strip() if match else None

    # Address
    match = re.search(r"Address:\s*(.*)", text)
    data["address"] = match.group(1).strip() if match else None

    # Village
    match = re.search(r"Village:\s*(.*)", text)
    data["village"] = match.group(1).strip() if match else None

    # Gram Panchayat
    match = re.search(r"Gram Panchayat:\s*(.*)", text)
    data["gram_panchayat"] = match.group(1).strip() if match else None

    # Tehsil / Taluka
    match = re.search(r"Tehsil\/Taluka:\s*(.*)", text)
    data["tehsil"] = match.group(1).strip() if match else None

    # District
    match = re.search(r"District:\s*(.*)", text)
    data["district"] = match.group(1).strip() if match else None

    # Extent for habitation
    match = re.search(r"Extent for habitation:\s*(.*)", text)
    data["habitation_extent"] = match.group(1).strip() if match else None

    # Extent for cultivation
    match = re.search(r"Extent for self-cultivation:\s*(.*)", text)
    data["cultivation_extent"] = match.group(1).strip() if match else None

    # Disputed lands
    match = re.search(r"Disputed lands:\s*(.*)", text)
    data["disputed_lands"] = match.group(1).strip() if match else None

    # Patta / lease
    match = re.search(r"Patta \/ leases grants:\s*(.*)", text)
    data["patta_leases"] = match.group(1).strip() if match else None

    # Traditional rights
    match = re.search(r"Other tradiional right:\s*(.*)", text)
    data["traditional_rights"] = match.group(1).strip() if match else None

    # Evidence
    match = re.search(r"Evidence:\s*(.*)", text)
    data["evidence"] = match.group(1).strip() if match else None

    # Other information
    match = re.search(r"Other information:\s*(.*)", text)
    data["other_information"] = match.group(1).strip() if match else None

    return data