from flask import Flask, jsonify, request, render_template
import sqlite3  # The lightweight, file-based database engine
import re       # Regular Expressions (used here if we needed complex text swaps)

# Initialize the Flask application
app = Flask(__name__)

# --- THE BRIDGE: This mimics the MySQL connection behavior ---
# We create this class so we don't have to rewrite our MySQL-style code.
class SQLiteBridge:
    def __init__(self):
        # In MySQL, we call 'mysql.connection'. This line makes 'mysql.connection' return itself.
        self.connection = self

    def cursor(self):
        # Whenever we need a 'cursor', we open a brand new connection to our .db file.
        conn = sqlite3.connect('my_database.db')
        
        # This tells SQLite to return data as 'Rows' (which act like Dictionaries).
        # This is what allows you to type vaga['nome'] instead of vaga[0].
        conn.row_factory = sqlite3.Row
        
        # We return our custom SQLiteCursor class instead of the standard one.
        return SQLiteCursor(conn)

    def commit(self):
        # MySQL requires a manual commit on the connection; SQLite handles it in our cursor.close().
        pass 

# This class "wraps" the standard SQLite cursor to make it act like a MySQL cursor.
class SQLiteCursor:
    def __init__(self, conn):
        self.conn = conn        # Store the connection so we can close it later
        self.cur = conn.cursor() # Create the actual SQLite cursor

    def execute(self, query, params=None):
        # THE TRANSLATOR: MySQL uses %s for variables, but SQLite uses ?.
        # This line automatically swaps them so your queries don't break!
        query = query.replace('%s', '?')
        
        # If we have parameters (like an ID), we send them; otherwise, we just run the query.
        if params:
            self.cur.execute(query, params)
        else:
            self.cur.execute(query)

    def fetchall(self):
        # Fetches all results and converts them into a list of real Python dictionaries.
        # This is exactly what 'jsonify' needs to send data to your JS frontend.
        return [dict(row) for row in self.cur.fetchall()]

    def fetchone(self):
        # Fetches just one result (like for a specific ID).
        row = self.cur.fetchone()
        # If the row exists, convert to dict; if not, return None.
        return dict(row) if row else None

    def close(self):
        # When we close the cursor, we save (commit) the data and close the file connection.
        self.conn.commit()
        self.conn.close()

# We replace the 'mysql = MySQL(app)' variable with our fake 'Bridge' version.
# Now, any code calling 'mysql.connection.cursor()' will use our SQLite logic!
mysql = SQLiteBridge()

# --- ROUTES FOR PAGES (The HTML view) ---

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home_content():
    return render_template("home.html")

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")

@app.route("/contato")
def contato():
    return render_template("contato.html")

@app.route("/vagas")
def vagas():
    return render_template("vagas.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

# --- ROUTES FOR DATA (The API/JSON view) ---

@app.route("/api/vagas")
def get_vagas_data():
    # Capture filter parameters from the URL (e.g., /api/vagas?regime=Remoto)
    localizacao_filtro = request.args.get("localizacao")
    regime_filtro = request.args.get("regime")

    # Start the DB connection via our Bridge
    cursor = mysql.connection.cursor()
    
    # Run the query (Note: This is standard SQL)
    cursor.execute("SELECT * FROM banco_de_vagas")
    lista = cursor.fetchall()
    cursor.close()

    resultado = []
    # Loop through every job found in the database
    for vaga in lista:
        # If a location filter is active, skip any job that doesn't match it
        if localizacao_filtro and str(vaga.get("localizacao")) != localizacao_filtro:
            continue
        # If a regime filter is active, skip any job that doesn't match it
        if regime_filtro and str(vaga.get("regime")) != regime_filtro:
            continue
        
        # If it passes the filters, add it to our final list
        resultado.append(vaga)

    # Return the final list as a JSON object for the JavaScript to read
    return jsonify({"vagas": resultado})

@app.route("/vaga/<int:id>")
def vaga(id):
    # Fetch a single specific job by its ID
    cursor = mysql.connection.cursor()
    # Our Bridge will swap this %s for a ? automatically!
    cursor.execute("SELECT * FROM banco_de_vagas WHERE id = %s", (id,))
    vaga_selecionada = cursor.fetchone()
    cursor.close()

    # If the job exists, return it; otherwise, return a 404 Error
    if vaga_selecionada:
        return jsonify(vaga_selecionada)
    return jsonify({"erro": "Não encontrado"}), 404

# Only run the app if this specific file is executed
if __name__ == "__main__":
    # debug=True allows the server to auto-restart when you save changes
    app.run(debug=True)