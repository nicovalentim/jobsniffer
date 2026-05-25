from flask import Blueprint, jsonify, request
from py.conectarBanco import conexao
from werkzeug.security import generate_password_hash, check_password_hash

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
    email = dados.get("email")
    senha_digitada = dados.get("senha")

    conn = conexao()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM cadastro WHERE Email = ?",
        (email,)
    )

    loginID = cursor.fetchone()
    conn.close()

    if loginID and check_password_hash(loginID[4], senha_digitada):
        return jsonify({
            "status": "ok",
            "mensagem": "Login realizado com sucesso",
            "tipo": loginID[1],
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
def atualizarCadastro():
    dados = request.json
    email = dados.get("email")
    alteracoes = dados.get("alteracoes")

    if not alteracoes:
        return jsonify({"status": "erro", "mensagem": "Nenhuma alteração enviada."}), 400

    conn = conexao()
    cursor = conn.cursor()

    try:
        valores = []
        partes_query = []

        for campo_id, texto_novo in alteracoes.items():
            coluna_banco = CAMPOS.get(campo_id)
            if coluna_banco:
                if campo_id == 'usuarioSenha':
                    texto_novo = generate_password_hash(texto_novo)
                    
                partes_query.append(f"{coluna_banco} = ?")
                valores.append(texto_novo)
                
        valores.append(email)
        query_final = f"UPDATE cadastro SET {', '.join(partes_query)} WHERE Email = ?"

        cursor.execute(query_final, tuple(valores))
        conn.commit()
    
        return jsonify({
            "status": "ok", 
            "mensagem": "Cadastro updated em lote com sucesso!"
        }), 200

    except Exception as e:
        print(f"Erro ao atualizar banco em lote: {e}")
        return jsonify({"status": "erro", "mensagem": "Erro interno do servidor"}), 500
        
    finally:
        conn.close()