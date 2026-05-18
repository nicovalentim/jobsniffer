from flask import Blueprint, request, jsonify
from py.conectarBanco import conexao

rota_candidatar = Blueprint('candidatar', __name__)

@rota_candidatar.route('/candidatura', methods=['POST'])
def candidatar_data():
    dados = request.json

    vaga_id = dados.get('vaga.id')
    email = dados.get('email')

    if not vaga_id or not email:
        return jsonify({
            "status": "erro",
            "mensagem": "Dados insuficientes para concluir a candidatura."
        }), 400

    conn = conexao()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT id FROM cadastro WHERE Email = ?", (email,))
        usuario = cursor.fetchone()

        if not usuario:
            return jsonify({
                "status": "erro",
                "mensagem": "Usuário não cadastrado ou não encontrado no sistema!"
            }), 404
        
        usuario_id = usuario[0]

        cursor.execute(
            """INSERT INTO candidaturas (usuario_id, vaga_id)
            VALUES (?, ?)""",
            (usuario_id, vaga_id)
        )
        conn.commit()

        return jsonify({
            "status": "ok",
            "mensagem": "Candidatura registrada com sucesso!"
        }), 200

    except Exception as e:
        erro_str = str(e)
        if "Duplicate entry" in erro_str or "1062" in erro_str:
            return jsonify({
                "status": "erro",
                "mensagem": "Você já enviou uma candidatura para esta vaga!"
            }), 400

        return jsonify({
            "status": "erro",
            "mensagem": f"Erro interno no servidor: {e}"
        }), 500
    finally:
        conn.close()