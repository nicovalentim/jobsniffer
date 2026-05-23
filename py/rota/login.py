from flask import Blueprint, jsonify, request
from py.conectarBanco import conexao

rota_login = Blueprint('login', __name__)

CAMPOS = {
    'usuarioEmail': 'Email',
    'usuarioSenha': 'Senha',
    'usuarioNome': 'Nome',
    'perfilNome': 'Nome',
    'usuarioNascimento': 'Nascimento',
    'usuarioTelefone': 'Telefone',
    'usuarioCEP': 'CEP',
    'usuarioLinkedin': 'LinkedIn_url',
    'usuarioFolio': 'Folio_url'
}

@rota_login.route('/login', methods=['POST'])
def login():
    dados = request.json
    conn = conexao()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM cadastro WHERE Email = ? AND Senha = ?",
        (dados.get("email"), dados.get("senha"))
    )

    loginID = cursor.fetchone()
    conn.close()

    if loginID:
        return jsonify({
            "status": "ok",
            "mensagem": "Login realizado com sucesso",
            "nome": loginID[2],
            "email": loginID[3],
            "senha": loginID[4],
            "nascimento": loginID[5],
            "telefone": loginID[6],
            "cep": loginID[7],
            "linkedin": loginID[8],
            "folio": loginID[9]
        }), 200

    return jsonify({
        "status": "erro",
        "mensagem": "Email ou senha inválidos"
    }), 401

@rota_login.route('/atualizarCadastro', methods=['POST'])
def atualizar_cadastro():
    dados = request.json

    conn = conexao()
    cursor = conn.cursor()

    email = dados.get("email")

    colunaBanco = CAMPOS.get(dados.get("campo"))
    textoNovo = dados.get("textoNovo")

    try:
        cursor.execute(
            f"UPDATE cadastro SET {colunaBanco} = ? WHERE Email = ?",
            (textoNovo, email)
        )
        conn.commit()
    
        return jsonify({
            "status": "ok", 
            "mensagem": f"{colunaBanco} atualizado com sucesso!"
        }), 200

    except Exception as e:
        print(f"Erro ao atualizar banco: {e}")
        return jsonify({"status": "erro", "mensagem": "Erro interno do servidor"}), 500
        
    finally:
        conn.close()