import os
from flask import Flask, render_template
from server.py.iniciarBanco import init_db

app = Flask(__name__,
            template_folder='client',
            static_folder='client',
            static_url_path='')

DB_PATH = os.path.join(os.getcwd(), 'server/db', 'db.db')

@app.route("/")
def index():
    return render_template("/index.html")

from server.py.rota.cadastro import rota_cadastro
from server.py.rota.candidatura import rota_candidatar
from server.py.rota.chatbot import rota_chatbot
from server.py.rota.login import rota_login
from server.py.rota.vagas import rota_vagas
from server.py.rota.dashboard import rota_dashboard

blueprints = [rota_cadastro, rota_candidatar, rota_dashboard, rota_login, rota_vagas, rota_chatbot]
for diagrama in blueprints:
    app.register_blueprint(diagrama)

if __name__ == "__main__":
    init_db(app)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)