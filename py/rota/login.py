from flask import Blueprint, jsonify, request
from py.conectarBanco import conexao

rota_login = Blueprint('login', __name__)

@rota_login.route('/login', methods=['POST'])
def login():
    dados = request.json
    conn = conexao()
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