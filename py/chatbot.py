from flask import Flask, request, jsonify
import random

app = Flask(__name__)

def responder_usuario(msg):
    msg = msg.lower()

    if any(p in msg for p in ["oi", "olá", "ola", "eae", "opa"]):
        return random.choice([
            "Olá! 😊 Posso te ajudar a encontrar vagas, enviar currículo ou entender o processo seletivo.\n\nO que você gostaria de saber?",
            "Oi! 👋 Quer ajuda com vagas, currículo ou entrevistas?"
        ])

    elif "vaga" in msg or "emprego" in msg:
        return "Temos várias vagas disponíveis 👍\n\nAcesse a aba *Vagas* e escolha a melhor pra você 😉"

    elif "home office" in msg or "presencial"  in msg or "híbrida" in msg:
        return "Sim! 💻 Temos vagas presenciais, híbridas e home office."

    elif "perto" in msg:
        return "Você pode filtrar por localização na página de vagas 📍"

    elif "jovem aprendiz" in msg:
        return "Sim! Temos vagas para jovem aprendiz 🚀"

    elif "experiência" in msg or "experiencia" in msg:
        return "Temos vagas com e sem experiência 😉"

    elif "curriculo" in msg or "currículo" in msg:
        return "Você pode enviar seu currículo direto pelo site, na parte de login 📄"

    elif "pdf" in msg:
        return "Sim, aceitamos PDF 👍"

    elif "entrevista" in msg:
        return "Algumas vagas possuem entrevistas online ou presenciais 🧑‍💼"

    elif "tempo" in msg:
        return "Normalmente leva alguns dias ⏳"

    elif "cadastro" in msg:
        return "Você precisa criar uma conta para se candidatar 📝"

    elif "senha" in msg:
        return "Use a opção 'esqueci minha senha' 🔑"

    elif "taxa" in msg or "pagar" in msg:
        return "Não cobramos nada ❌💰"

    else:
        return "Posso te ajudar com:\n\n• Vagas 💼\n• Currículo 📄\n• Cadastro 📝\n• Processo seletivo 🎯"

# rota do chatbot
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    msg = data.get("mensagem", "")

    resposta = responder_usuario(msg)

    return jsonify({"resposta": resposta})


if __name__ == "__main__":
    app.run(debug=True)