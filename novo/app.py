from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route("/vagas")
def vagas():
    with open("vagas.json", encoding="utf-8") as f:
        dados = json.load(f)
    return jsonify(dados)


@app.route("/vaga/<int:id>")
def vaga(id):
    with open("vagas.json", encoding="utf-8") as f:
        dados = json.load(f)

    return jsonify(dados["vagas"][id])


@app.route("/candidatar", methods=["POST"])
def candidatar():

    dados = request.json

    with open("candidaturas.json", encoding="utf-8") as f:
        banco = json.load(f)

    banco["candidaturas"].append(dados)

    with open("candidaturas.json", "w", encoding="utf-8") as f:
        json.dump(banco, f, indent=4, ensure_ascii=False)

    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True)
