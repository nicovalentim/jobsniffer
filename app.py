import os       # permite abrir caminhos/arquivos no sistema
import re       # expressões regulares como manipular strings
import sqlite3  # permite usar o banco de dados do sqlite

# converte um arquivo do mySQL para SQLite
def clean_mysql_to_sqlite(sql_content):
    sql_content = re.sub(r'/\*.*?\*/', '', sql_content, flags=re.DOTALL)    # remove comentários com /* */
    sql_content = re.sub(r'--.*?\n', '\n', sql_content)                     # remove comentários com --
    sql_content = sql_content.replace("AUTO_INCREMENT", "AUTOINCREMENT")    # substitui AUTO_INCREMENT (mySQL) por AUTOINCREMENT (sqlite)
    
    # Ajusta tipos INT com autoincremento para padrão SQLite
    sql_content = re.sub(r'int\(\d+\) NOT NULL AUTOINCREMENT', 'INTEGER PRIMARY KEY AUTOINCREMENT', sql_content, flags=re.IGNORECASE)
    sql_content = re.sub(r'INT NOT NULL AUTOINCREMENT', 'INTEGER PRIMARY KEY AUTOINCREMENT', sql_content, flags=re.IGNORECASE)

    raw_commands = sql_content.split(';')                                   # divide o sql em comandos separados por ";"
    
    clean_commands = []

    # percorre cada comando
    for cmd in raw_commands:
        c = cmd.strip()  # remove espaços extras
        if not c: 
            continue  # ignora comandos vazios
        
        upper_c = c.upper()
        
        # só mantém comandos CREATE TABLE ou INSERT INTO
        if upper_c.startswith("CREATE TABLE") or upper_c.startswith("INSERT INTO"):
            c = c.replace('`', '')                                                          # remove crases (`) usadas no mySQL
            c = re.sub(r'ENGINE=.*$', '', c, flags=re.IGNORECASE | re.MULTILINE)            # remove ENGINE=... (não existe no sqlite)
            c = re.sub(r'DEFAULT CHARSET=.*$', '', c, flags=re.IGNORECASE | re.MULTILINE)   # remove DEFAULT CHARSET=... (não usado no sqlite)

            # se já tiver PRIMARY KEY definida no campo
            if "INTEGER PRIMARY KEY" in c:
                lines = c.split('\n')
                filtered_lines = []
                
                # eemove duplicações de PRIMARY KEY (ID)
                for line in lines:
                    if "PRIMARY KEY (ID)" in line.upper() or "PRIMARY KEY (ID)" in line.upper():
                        continue
                    filtered_lines.append(line)

                content = "\n".join(filtered_lines)                                         # junta novamente o conteúdo
                content = content.replace(",\n)", "\n)").replace(", )", ")")                # corrige vírgulas sobrando antes do fechamento

                c = content
            clean_commands.append(c.strip()) # adiciona comando limpo à lista
    return clean_commands

# inicializa o banco de dados
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
            except:
                os.remove(db_path)

        # se o banco não existir, cria um novo
        if not os.path.exists(db_path):
            print("Iniciando o banco de dados pelo arquivo SQL...")
            
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            try:
                with open(sql_path, 'r', encoding='utf-8') as f:
                    sql_commands = clean_mysql_to_sqlite(f.read())      # converte para SQLite

                    for command in sql_commands:
                        cursor.execute(command)

                conn.commit()
                print("Banco de dados iniciado com sucesso!")

            except Exception as e:
                print(f"Erro na initialização: {e}")
                conn.close()

                if os.path.exists(db_path): 
                    os.remove(db_path)
            
            finally:
                if 'conn' in locals(): 
                    conn.close()

from flask import Flask, jsonify, request, render_template
from static.rsc.chatbot import responder_usuario

app = Flask(__name__)

DB_PATH = os.path.join(os.getcwd(), 'db', 'jobsniffer.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row     
    return conn

# rotas
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home_content():
    return render_template("home.html")

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")

@app.route("/contato")
def contato():
    return render_template("contato.html")

@app.route("/vagas")
def vagas():
    return render_template("vagas.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

# retorna todas as vagas
@app.route("/api/vagas")
def get_vagas_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM banco_de_vagas")      # busca as vagas    
    lista = [dict(row) for row in cursor.fetchall()]    # converte resultados para lista de dicionários
    conn.close()

    return jsonify({"vagas": lista})                    # retorna JSON

# retorna vaga específica pelo ID
@app.route("/vaga/<int:id>")
def vaga(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM banco_de_vagas WHERE id = ?", (id,))      # Busca vaga pelo ID
    row = cursor.fetchone()
    vaga_selecionada = dict(row) if row else None                           # converte para dicionário
    conn.close()
    
    # retorna vaga ou erro
    if vaga_selecionada:
        return jsonify(vaga_selecionada)
    return jsonify({"erro": "Vaga não encontrada"}), 404

# login
@app.route("/login", methods=["POST"])
def login():
    dados = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    # verifica usuário e senha
    cursor.execute(
        "SELECT * FROM cadastro WHERE email = ? AND senha = ?", 
        (dados.get("email"), dados.get("senha"))
    )
    
    usuario = cursor.fetchone()
    conn.close()
    
    # retorna status
    return jsonify({"status": "ok" if usuario else "erro"})

@app.route('/cadastro', methods=['POST'])
def cadastro_data():
    # variável python = ...('name no html')
    nome = request.form.get('nome')
    email = request.form.get('email')
    senha = request.form.get('senha')
    nasc = request.form.get('nasc')
    telefone = request.form.get('tel')
    cidade = request.form.get('cidade')
    estado = request.form.get('estado')
    linkedin = request.form.get('linkedin')
    folio = request.form.get('folio')

    conn = get_db_connection()                          # conecta ao banco de dados
    cursor = conn.cursor()                              # cria cursor para executar comandos SQL

    try:
        cursor.execute(                                 # primeira linha é o nome das colunas do SQLite
                                                        # segunda linha deixa ? como valor temporário para evitar SQL injection (segurança)
            """INSERT INTO cadastro 
               (Nome, Email, Senha, Data_Nascimento, Telefone, Cidade, Estado, LinkedIn_url, Folio_url)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""", 
            (nome, email, senha, nasc, telefone, cidade, estado, linkedin, folio)
        )
        conn.commit()
        return "Cadastro realizado com sucesso!"        # usado em testes
    except Exception as e:
        return f"Erro ao cadastrar: {e}", 500           # usado em testes
    finally:
        conn.close()                                    # fecha conexão com o banco de dados

# chatbot
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    return jsonify({"resposta": responder_usuario(data["mensagem"])})   # usa função externa para responder

if __name__ == "__main__":
    init_db(app)
    app.run(debug=True)