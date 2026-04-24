import os
from flask import Flask, render_template
from py.iniciarBanco import init_db

app = Flask(__name__, 
            template_folder='', 
            static_folder='',
            static_url_path='')

DB_PATH = os.path.join(os.getcwd(), 'db', 'jobsniffer.db')

@app.route("/")
def index():
    return render_template("index.html")

from py.rota.cadastro import rota_cadastro
from py.rota.chatbot import rota_chatbot
from py.rota.login import rota_login
from py.rota.vagas import rota_vagas

blueprints = [rota_cadastro, rota_login, rota_vagas, rota_chatbot]
for diagrama in blueprints:
    app.register_blueprint(diagrama)

if __name__ == "__main__":
    init_db(app)
    app.run(debug=True)