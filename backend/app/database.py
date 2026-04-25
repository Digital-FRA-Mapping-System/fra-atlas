import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="fra_db",
        user="postgres",
        password="mysql"
    )
    return conn