from flask import Blueprint, jsonify
from py.conectarBanco import conexao

rota_vagas = Blueprint('vagas', __name__)

@rota_vagas.route('/api/vagas')
def get_vagas_data():
    conn = conexao()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM banco_de_vagas")
    lista = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return jsonify({"vagas": lista})