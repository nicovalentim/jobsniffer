from flask import Blueprint, jsonify, request
from py.conectarBanco import conexao

rota_login = Blueprint('login', __name__)

@rota_login.route('/login', methods=['POST'])
def login():
    dados = request.json
    conn = conexao()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT Nome, Email FROM cadastro WHERE Email = ? AND Senha = ?",
        (dados.get("Email"), dados.get("Senha"))
    )

    loginID = cursor.fetchone()
    conn.close()

    if loginID:
        return jsonify({
            "status": "ok",
            "mensagem": "Login realizado com sucesso"
        }), 200

    return jsonify({
        "status": "erro",
        "mensagem": "Email ou senha inválidos"
    }), 401