from flask import Blueprint, request, jsonify
from py.conectarBanco import conexao

rota_cadastro = Blueprint('cadastro', __name__)

@rota_cadastro.route('/cadastro', methods=['POST'])
def cadastro_data():
    dados = request.json
    
    # variavel pithon = dados.get('variavel_html')
    nome = dados.get('usuario_nome')
    email = dados.get('usuario_email')
    senha = dados.get('usuario_senha')
    nascimento = dados.get('usuario_nascimento')
    telefone = dados.get('usuario_telefone')
    cep = dados.get('usuario_CEP')
    linkedin = dados.get('usuario_linkedin')
    folio = dados.get('usuario_folio')

    conn = conexao()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT Email FROM cadastro WHERE Email = ?", (email,))
        usuario_existente = cursor.fetchone()

        if usuario_existente:
            return jsonify({
                "status": "erro",
                "mensagem": "Este e-mail já está cadastrado!"
        }), 400

        cursor.execute(
            """INSERT INTO cadastro
            (Nome, Email, Senha, Nascimento, Telefone, CEP, LinkedIn_url, Folio_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (nome, email, senha, nascimento, telefone, cep, linkedin, folio)
        )
        conn.commit()
        
        return jsonify({
            "status": "ok",
            "mensagem": "Cadastro realizado com sucesso!"
        }), 200
        
    except Exception as e:
        return jsonify({
            "status": "erro",
            "mensagem": f"Erro: {e}"
        }), 500
    finally:
        conn.close()