let chat = document.getElementById("chat");
let chatbotBtn = document.getElementById("chatbot");

/* reset */
function resetChat() {
    let messages = document.getElementById("messages");
    let sugestoes = document.getElementById("sugestoes");

    // remove todas as mensagens depois das sugestões
    while (messages.children.length > 2) {
        messages.removeChild(messages.lastChild);
    }

    /* traz perguntas de volta */
    if (sugestoes) {
        sugestoes.style.position = "static";
        sugestoes.style.pointerEvents = "auto";
        sugestoes.style.opacity = "1";
    }
}

/* abre e fecha chat */
export function toggleChat() {
    if (chat.style.display === "none" || chat.style.display === "") {
        chat.style.display = "flex";
        chatbotBtn.classList.add("ativo");
    } else {
        chat.style.display = "none";
        chatbotBtn.classList.remove("ativo");
        resetChat();
    }
}

/* fechar clicando fora */
window.addEventListener("click", function (event) {
    if (chat.style.display === "flex") {
        if (!chat.contains(event.target) && !chatbotBtn.contains(event.target)) {
            chat.style.display = "none";
            chatbotBtn.classList.remove("ativo");
            resetChat();
        }
    }
});

/* sugestões */
function enviarSugestao(texto) {
    let input = document.getElementById("text");
    let sugestoes = document.getElementById("sugestoes");

    input.value = texto;

    if (sugestoes) {
        sugestoes.style.position = "absolute";
        sugestoes.style.pointerEvents = "none";
        sugestoes.style.opacity = "0";
    }

    sendMessage();
}

window.enviarSugestao = enviarSugestao;

/* envia mensagem */
export async function sendMessage() {
    let input = document.getElementById("text");
    let message = input.value.trim();
    if (message === "") return;

    let messages = document.getElementById("messages");

    let sugestoes = document.getElementById("sugestoes");
    if (sugestoes) {
        sugestoes.style.position = "absolute";
        sugestoes.style.pointerEvents = "none";
        sugestoes.style.opacity = "0";
    }

    /* mensagem do usuário */
    let userMessage = document.createElement("div");
    userMessage.className = "user";
    userMessage.innerText = message;
    messages.appendChild(userMessage);

    input.value = "";

    messages.scrollTop = messages.scrollHeight;

    /* 🔥 DIGITANDO (CORRIGIDO COM ANIMAÇÃO) */
    let botTyping = document.createElement("div");
    botTyping.className = "bot typing";

    botTyping.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;

    messages.appendChild(botTyping);
    messages.scrollTop = messages.scrollHeight;

    try {
        let response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagem: message })
        });

        let data = await response.json();

        botTyping.remove();

        let botMessage = document.createElement("div");
        botMessage.className = "bot";
        botMessage.innerText = data.resposta;
        messages.appendChild(botMessage);

        messages.scrollTop = messages.scrollHeight;

    } catch (error) {
        botTyping.remove();

        let botMessage = document.createElement("div");
        botMessage.className = "bot";
        botMessage.innerText = "Erro ao conectar com o servidor.";
        messages.appendChild(botMessage);
    }
}

/* enter envia mensagem */
document.addEventListener("DOMContentLoaded", function () {
    let input = document.getElementById("text");

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});

window.toggleChat = toggleChat;
window.sendMessage = sendMessage;