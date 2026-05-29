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
                CASE
                    WHEN c.id IS NOT NULL THEN 1
                    ELSE 0
                END AS ja_candidatado
            FROM banco_de_vagas v
            LEFT JOIN candidaturas c
                ON v.id = c.vaga_id
                AND c.usuario_id = (
                    SELECT id
                    FROM cadastro
                    WHERE Email = ?
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

    cursor.close()
    conn.close()

    return jsonify({
        "vagas": lista
    })

@rota_vagas.route('/api/vagas/inscritas')
def get_vagas_inscritas():
    email_usuario = request.args.get('email')
    if not email_usuario:
        return jsonify({
            "vagas": [],
            "mensagem": "E-mail não fornecido"
        }), 400

    conn = conexao()
    cursor = conn.cursor()

    query = """
        SELECT
            v.*,
            1 AS ja_candidatado

        FROM banco_de_vagas v

        INNER JOIN candidaturas c
            ON v.id = c.vaga_id

        WHERE c.usuario_id = (
            SELECT id
            FROM cadastro
            WHERE Email = ?
        )
    """

    cursor.execute(query, (email_usuario,))
    lista = [dict(row) for row in cursor.fetchall()]

    cursor.close()
    conn.close()

    return jsonify({
        "vagas": lista
    })

@rota_vagas.route('/editarVaga', methods=['POST'])
def editar_vaga():
    dados = request.json
    vaga_id = dados.get('id')
    email_solicitante = dados.get('emailSolicitante')

    if not vaga_id:
        return jsonify({'success': False, 'erro': 'ID da vaga não enviado'}), 400

    conn = conexao()
    cursor = conn.cursor()

    try:
        if not email_solicitante:
            return jsonify({'success': False, 'erro': 'Usuário não identificado.'}), 401

        cursor.execute("SELECT tipo FROM cadastro WHERE Email = ?", (email_solicitante,))
        usuario = cursor.fetchone()

        if not usuario or usuario[0] != 'admin':
            return jsonify({'success': False, 'erro': 'Acesso negado. Apenas administradores.'}), 403
    except Exception as e:
        print(f"Erro na autenticação: {e}")
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'erro': 'Erro ao validar permissões.'}), 500

    campos = []
    valores = []
    campos_validos = [
        'titulo',
        'descricao',
        'area',
        'localizacao',
        'regime',
        'salario',
        'requisitos'
    ]

    for campo in campos_validos:
        if campo not in dados: continue
        valor = dados.get(campo)
        if valor is None: continue
        if campo == 'salario':
            valor = str(valor)
            valor = (valor
                .replace('R$', '')
                .replace('.', '')
                .replace(',00', '')
                .replace(',', '.')
                .strip()
            )
            if valor == "":
                valor = 0
        campos.append(f"{campo} = ?")
        valores.append(valor)

    if len(campos) == 0:
        cursor.close()
        conn.close()

        return jsonify({
            'success': False,
            'erro': 'Nenhum campo enviado'
        }), 400

    valores.append(vaga_id)
    query = f"""
        UPDATE banco_de_vagas
        SET {', '.join(campos)}
        WHERE id = ?
    """

    try:
        cursor.execute(query, valores)
        conn.commit()
        return jsonify({
            'success': True
        })

    except Exception as erro:
        print(erro)
        return jsonify({
            'success': False,
            'erro': str(erro)
        }), 500

    finally:
        cursor.close()
        conn.close()

@rota_vagas.route('/criarVaga', methods=['POST'])
def criar_vaga():
    dados = request.json
    email_solicitante = dados.get('emailSolicitante')

    conn = conexao()
    cursor = conn.cursor()

    try:
        if not email_solicitante:
            return jsonify({'success': False, 'erro': 'Usuário não identificado.'}), 401

        cursor.execute("SELECT tipo FROM cadastro WHERE Email = ?", (email_solicitante,))
        usuario = cursor.fetchone()
        if not usuario or usuario[0] != 'admin':
            return jsonify({'success': False, 'erro': 'Acesso negado.'}), 403

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'erro': 'Erro ao validar permissões.'}), 500

    campos_validos = ['titulo', 'descricao', 'area', 'localizacao', 'regime', 'salario', 'requisitos']
    campos = []
    valores = []

    for campo in campos_validos:
        valor = dados.get(campo, '')

        if campo == 'salario':
            valor = str(valor).replace('R$', '').replace('.', '').replace(',00', '').replace(',', '.').strip()
            valor = 0 if valor == "" else valor

        campos.append(campo)
        valores.append(valor)

    if not dados.get('titulo'):
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'erro': 'O título é obrigatório.'}), 400

    placeholders = ', '.join(['?'] * len(campos))
    query = f"INSERT INTO banco_de_vagas ({', '.join(campos)}) VALUES ({placeholders})"

    try:
        cursor.execute(query, valores)
        conn.commit()
        return jsonify({'success': True})

    except Exception as erro:
        print(erro)
        return jsonify({'success': False, 'erro': str(erro)}), 500

    finally:
        cursor.close()
        conn.close()

@rota_vagas.route('/deletarVaga', methods=['POST'])
def deletar_vaga():
    dados = request.json
    vaga_id = dados.get('id')
    email_solicitante = dados.get('emailSolicitante')

    if not vaga_id:
        return jsonify({'success': False, 'erro': 'ID da vaga não fornecido.'}), 400

    conn = conexao()
    cursor = conn.cursor()

    try:
        if not email_solicitante:
            return jsonify({'success': False, 'erro': 'Usuário não identificado.'}), 401

        cursor.execute("SELECT tipo FROM cadastro WHERE Email = ?", (email_solicitante,))
        usuario = cursor.fetchone()
        if not usuario or usuario[0] != 'admin':
            return jsonify({'success': False, 'erro': 'Acesso negado. Apenas administradores.'}), 403

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'erro': 'Erro ao validar permissões.'}), 500

    try:
        cursor.execute("DELETE FROM candidaturas WHERE vaga_id = ?", (vaga_id,))

        cursor.execute("DELETE FROM banco_de_vagas WHERE id = ?", (vaga_id,))
        conn.commit()

        return jsonify({'success': True})

    except Exception as erro:
        print(erro)
        return jsonify({'success': False, 'erro': str(erro)}), 500

    finally:
        cursor.close()
        conn.close()