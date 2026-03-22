from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)

# abre a página principal
@app.route("/")
def home():
    return render_template("index.html")

# abre a página de vagas
@app.route("/vagas")
def vagas():
    return render_template("vagas.html")

# rota das vagas agora com filtrro
@app.route("/api/vagas")
def get_vagas_data():
    tipo = request.args.get("tipo")   # presenca
    tempo = request.args.get("tempo") # tempo

    with open("db/banco_de_vagas.json", encoding="utf-8") as f:
        dados = json.load(f)

    lista = dados["banco_de_vagas"]
    resultado = []

    for vaga in lista:

        # filtro por presença
        if tipo:
            if str(vaga.get("localizacao")) != tipo:
                continue

        # filtro por tempo 
        if tempo:
            if str(vaga.get("tempo")) != tempo:
                continue

        resultado.append(vaga)

    return jsonify({"vagas": resultado})

# ver vaga específica
@app.route("/vaga/<int:id>")
def vaga(id):
    with open("db/vagas.json", encoding="utf-8") as f:
        dados = json.load(f)

    return jsonify(dados["vagas"][id])


# candidatar
@app.route("/candidatar", methods=["POST"])
def candidatar():
    dados = request.json

    with open("db/candidaturas.json", encoding="utf-8") as f:
        banco = json.load(f)

    banco["candidaturas"].append(dados)

    with open("db/candidaturas.json", "w", encoding="utf-8") as f:
        json.dump(banco, f, indent=4, ensure_ascii=False)

    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True)