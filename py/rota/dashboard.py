from flask import Blueprint, jsonify, request
from py.conectarBanco import conexao

rota_dashboard = Blueprint('dashboard', __name__)

@rota_dashboard.route('/dashboard', methods=['GET'])
def get_dashboard_data():
    email_solicitante = request.args.get('emailSolicitante')

    if not email_solicitante:
        return jsonify({'success': False, 'erro': 'Usuário não identificado no servidor.'}), 401

    conn = conexao()
    cursor = conn.cursor()

    try:
        email_limpo = email_solicitante.strip().lower()

        cursor.execute("SELECT LOWER(tipo) FROM cadastro WHERE LOWER(Email) = ?", (email_limpo,))
        usuario = cursor.fetchone()

        if not usuario or usuario[0] != 'admin':
            return jsonify({'success': False, 'erro': 'Acesso negado. Apenas administradores podem acessar estes dados.'}), 403

        cursor.execute("""
            SELECT v.id, v.titulo, v.area, v.salario, COUNT(c.id) AS total_candidatos
            FROM banco_de_vagas v
            LEFT JOIN candidaturas c ON v.id = c.vaga_id
            GROUP BY v.id
        """)

        vagas = []
        for row in cursor.fetchall():
            vagas.append({
                'id': row[0],
                'titulo': row[1],
                'area': row[2],
                'salario': row[3],
                'total_candidatos': row[4]
            })

        cursor.execute("""
            SELECT id, tipo, Nome, Email, Nascimento, Telefone, CEP, LinkedIn_url 
            FROM cadastro
        """)
        
        usuarios = []
        for row in cursor.fetchall():
            usuarios.append({
                'id': row[0],
                'tipo': row[1],
                'nome': row[2],
                'email': row[3],
                'nascimento': row[4],
                'telefone': row[5],
                'cep': row[6],
                'linkedin_url': row[7]
            })

        cursor.execute("""
            SELECT c.id, c.usuario_id, cad.Nome, c.vaga_id, v.titulo, v.area, c.data_candidatura
            FROM candidaturas c
            INNER JOIN cadastro cad ON c.usuario_id = cad.id
            INNER JOIN banco_de_vagas v ON c.vaga_id = v.id
            ORDER BY c.data_candidatura DESC
        """)

        candidaturas = []
        for row in cursor.fetchall():
            data_raw = row[6]

            if data_raw:
                data_formatada = data_raw.strftime('%Y-%m-%d %H:%M:%S') if hasattr(data_raw, 'strftime') else str(data_raw)
            else:
                data_formatada = None

            candidaturas.append({
                'id': row[0],
                'usuario_id': row[1],
                'nome_candidato': row[2],
                'vaga_id': row[3],
                'titulo_vaga': row[4],
                'area_vaga': row[5],
                'data_candidatura': data_formatada
            })

        return jsonify({
            'success': True,
            'vagas': vagas,
            'usuarios': usuarios,
            'candidaturas': candidaturas
        })

    except Exception as e:
        print(f"Erro ao carregar dados do dashboard: {e}")
        return jsonify({'success': False, 'erro': 'Erro interno ao carregar dados.'}), 500

    finally:
        cursor.close()
        conn.close()