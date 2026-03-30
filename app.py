from flask import Flask, jsonify, request, render_template
from flask_mysqldb import MySQL

app = Flask(__name__)

# copiei do google, não sei pq que isso é necessário ainda, perguntar pro jota
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'login'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

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

    # renomeado pra como tá no SQL
    localizacao_filtro = request.args.get("localizacao")   # presenca
    regime_filtro = request.args.get("regime")             # tempo

    # antigo

    #   with open("db/banco_de_vagas.json", encoding="utf-8") as f:
    #       dados = json.load(f)

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM banco_de_vagas")
    lista = cursor.fetchall()                              # lista = dados["banco_de_vagas"]
    cursor.close()

    resultado = []

    for vaga in lista:

        # filtro por presença
        if localizacao_filtro:
            if str(vaga.get("localizacao")) != localizacao_filtro:
                continue

        # filtro por tempo
        if regime_filtro:
            if str(vaga.get("regime")) != regime_filtro:
                continue

        resultado.append(vaga)

    return jsonify({"vagas": resultado})

# ver vaga específica
@app.route("/vaga/<int:id>")
def vaga(id):

    # antigo

    #   with open("db/vagas.json", encoding="utf-8") as f:
    #   dados = json.load(f)
    #
    #   return jsonify(dados["vagas"][id])

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

    #   antigo:
    #
    #   with open("db/candidaturas.json", encoding="utf-8") as f:
    #       banco = json.load(f)
    #
    #   banco["candidaturas"].append(dados)
    #
    #   with open("db/candidaturas.json", "w", encoding="utf-8") as f:
    #       json.dump(banco, f, indent=4, ensure_ascii=False)

    cursor.execute(
        "INSERT INTO candidaturas (email, vaga_id) VALUES (%s, %s)", 
        (dados.get("email"), dados.get("vaga_id"))
    )
    mysql.connection.commit()
    cursor.close()

    # mesmo do antigo
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


if __name__ == "__main__":
    app.run(debug=True)