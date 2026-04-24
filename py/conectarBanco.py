import sqlite3, os

DB_PATH = os.path.join(os.getcwd(), 'db', 'jobsniffer.db')

def conexao():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn