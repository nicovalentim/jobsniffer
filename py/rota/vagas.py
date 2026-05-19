from flask import Blueprint, jsonify, request
from py.conectarBanco import conexao

rota_vagas = Blueprint('vagas', __name__)

@rota_vagas.route('/api/vagas')
def get_vagas_data():
    email_usuario = request.args.get('email')
    
    conn = conexao()
    cursor = conn.cursor()

    if email_usuario:
        query = """
            SELECT 
                v.*,
                CASE WHEN c.id IS NOT NULL THEN 1 ELSE 0 END AS ja_candidatado
            FROM banco_de_vagas v
            LEFT JOIN candidaturas c ON v.id = c.vaga_id AND c.usuario_id = (
                SELECT id FROM cadastro WHERE Email = ?
            )
        """
        cursor.execute(query, (email_usuario,))
    else:
        query = """
            SELECT 
                *,
                0 AS ja_candidatado
            FROM banco_de_vagas
        """
        cursor.execute(query)
        
    lista = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return jsonify({"vagas": lista})