from flask import Blueprint, request
from py.conectarBanco import conexao

rota_cadastro = Blueprint('cadastro', __name__)

@rota_cadastro.route('/cadastro', methods=['POST'])
def cadastro_data():
    # variável python = ...('name no html')
    nome = request.form.get('usuario_nome')
    email = request.form.get('usuario_email')
    senha = request.form.get('usuario_senha')
    nascimento = request.form.get('usuario_nascimento')
    telefone = request.form.get('usuario_telefone')
    cep = request.form.get("usuario_cep")
    linkedin = request.form.get('usuario_linkedin')
    folio = request.form.get('usuario_folio')

    conn = conexao()                          # conecta ao banco de dados
    cursor = conn.cursor()                              # cria cursor para executar comandos SQL

    try:
        cursor.execute(                                 # primeira linha é o nome das colunas do SQLite
                                                        # segunda linha deixa ? como valor temporário para evitar SQL injection (segurança)
            """INSERT INTO cadastro 
            (Nome, Email, Senha, Nascimento, Telefone, CEP, LinkedIn_url, Folio_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)""", 
            (nome, email, senha, nascimento, telefone, cep, linkedin, folio)
        )
        conn.commit()
        return "Cadastro realizado com sucesso!"        # usado em testes
    except Exception as e:
        return f"Erro ao cadastrar: {e}", 500           # usado em testes
    finally:
        conn.close()                                    # fecha conexão com o banco de dados