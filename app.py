import os, subprocess, sys

def init_db(app, mysql):
    with app.app_context():
        # conecta ao MySQL sem especificar o banco para criar o DB se necessário
        cursor = mysql.connection.cursor()
        
        # cria o banco de dados se não existir
        cursor.execute("CREATE DATABASE IF NOT EXISTS banco_de_vagas")
        
        # usa o banco de dados criado ou existente
        cursor.execute("USE banco_de_vagas")
        
        # checa se as tabelas existem
        cursor.execute("SHOW TABLES LIKE 'banco_de_vagas'")
        result = cursor.fetchone()
        
        if not result:
            print("Database tables not found. Initializing from SQL file...")
            sql_path = os.path.join(os.getcwd(), 'db', 'banco_de_vagas.sql')
            
            try:
                with open(sql_path, 'r', encoding='utf-8') as f:
                    sql_commands = f.read().split(';')
                    
                    for command in sql_commands:
                        clean_command = command.strip()
                        if clean_command:
                            cursor.execute(clean_command)
                
                mysql.connection.commit()
                print("Database initialized successfully!")
            except Exception as e:
                print(f"Error: {e}")
        
        cursor.close()

def install_dependencies():
    try:
        import flask_mysqldb
    # se não houver a lib, baixa ela
    except ImportError:
        print("Library 'flask_mysqldb' not found. Installing now...")
        # roda o pip install caso não houver essa lib
        subprocess.check_call([sys.executable, "-m", "pip", "install", "flask-mysqldb"])
        print("Installation complete! Restarting app...")

# checa se tá instalada
install_dependencies()

from flask import Flask, jsonify, request, render_template
from flask_mysqldb import MySQL
from static.rsc.chatbot import responder_usuario

app = Flask(__name__)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_DB'] = 'banco_de_vagas'

mysql = MySQL(app)

# caminho das páginas
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

# rota das vagas agora com filtro
@app.route("/api/vagas")
def get_vagas_data():

    localizacao_filtro = request.args.get("localizacao")   # presenca
    regime_filtro = request.args.get("regime")             # tempo

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM banco_de_vagas")
    lista = cursor.fetchall()                              # lista = dados["banco_de_vagas"]
    cursor.close()

    resultado = []

    for vaga in lista:
        if localizacao_filtro and str(vaga.get("localizacao")) != localizacao_filtro:
            continue

        if regime_filtro and str(vaga.get("regime")) != regime_filtro:
            continue

        if vaga.get('salario'):
            vaga['salario'] = float(vaga['salario'])

        resultado.append(vaga)

    return jsonify({"vagas": resultado})

# ver vaga específica
@app.route("/vaga/<int:id>")
def vaga(id):

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM banco_de_vagas WHERE id = %s", (id,))
    vaga_selecionada = cursor.fetchone()
    cursor.close()

    if vaga_selecionada:
        if vaga_selecionada['salario']:
            vaga_selecionada['salario'] = float(vaga_selecionada['salario'])
        return jsonify(vaga_selecionada)
    
    return jsonify({"erro": "Vaga não encontrada"}), 404

# candidatar
@app.route("/candidatar", methods=["POST"])
def candidatar():
    dados = request.json
    
    cursor = mysql.connection.cursor()

    cursor.execute(
        "INSERT INTO candidaturas (email, vaga_id) VALUES (%s, %s)", 
        (dados.get("email"), dados.get("vaga_id"))
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"status": "ok"})

# login 
@app.route("/login", methods=["POST"])
def login():
    dados = request.json

    email = dados.get("email")
    senha = dados.get("senha")

    cursor = mysql.connection.cursor()

    cursor.execute(
        "SELECT * FROM login WHERE email = %s AND senha = %s",
        (email, senha)
    )

    usuario = cursor.fetchone()
    cursor.close()
    
    if usuario:
        return jsonify({"status": "ok"})
    else:
        return jsonify({"status": "erro"})

# chatbot
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    mensagem = data["mensagem"]

    resposta = responder_usuario(mensagem)

    return jsonify({
        "resposta": resposta
    })

if __name__ == "__main__":
    init_db(app, mysql)
    app.run(debug=True)