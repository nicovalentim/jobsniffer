from flask import Flask, request, jsonify
import smtplib
from email.message import emailMSG

app = Flask(__name__)

@app.route('/send-email', methods=['POST'])
def enviar_email():
    data = request.json

    msg = emailMSG()
    msg.set_content(data.get('message'))
    msg['Subject'] = request.form.get('contatoNome')
    msg['From'] = request.form.get('contatoEmail')
    msg['To'] = '209572026@eniac.edu.br'

    # estudar isso aqui
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login('your-email@gmail.com', 'your-app-password')
            smtp.send_message(msg)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500