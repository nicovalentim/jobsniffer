import os
import sqlite3
from py.rota._sqliteSQL import mysqlParaSqlite

def init_db(app):
    with app.app_context():
        db_dir = os.path.join(os.getcwd(), 'db')
        db_path = os.path.join(db_dir, 'jobsniffer.db')
        sql_path = os.path.join(os.getcwd(), 'db', 'jobsniffer.sql')

        if not os.path.exists(db_dir):
            os.makedirs(db_dir)

        if os.path.exists(db_path):
            try:
                conn = sqlite3.connect(db_path)
                cursor = conn.cursor()
                cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='banco_de_vagas'")

                if not cursor.fetchone():
                    conn.close()
                    os.remove(db_path)
                else:
                    conn.close()
            except Exception:
                if 'conn' in locals(): conn.close()
                os.remove(db_path)

        if not os.path.exists(db_path):
            print("Iniciando o banco de dados pelo arquivo SQL...")
            
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            try:
                with open(sql_path, 'r', encoding='utf-8') as f:
                    sql_commands = mysqlParaSqlite(f.read()) 

                    for command in sql_commands:
                            cursor.execute(command)

                conn.commit()
                print("Banco de dados iniciado com sucesso!")

            except Exception as e:
                print(f"Erro na inicialização: {e}")
                conn.close()
                if os.path.exists(db_path): 
                    os.remove(db_path)
            
            finally:
                if 'conn' in locals(): 
                    conn.close()