let chat = document.getElementById("chat");
let chatbotBtn = document.getElementById("chatbot");

// abrir e fechar chat
export function toggleChat() {
    if (chat.style.display === "none" || chat.style.display === "") {
        chat.style.display = "flex";
        chatbotBtn.classList.add("ativo");
    } else {
        chat.style.display = "none";
        chatbotBtn.classList.remove("ativo");
    }
}
    // fecha se clicar fora da janela
    window.addEventListener("click", function(event) {
        if (chat.style.display === "flex") {
            if (!chat.contains(event.target) && !chatbotBtn.contains(event.target)) {
                chat.style.display = "none";
                chatbotBtn.classList.remove("ativo");
            }
        }
    });

// enviar mensagem
export async function sendMessage() {
    let input = document.getElementById("text");
    let message = input.value.trim();
    if (message === "") return;
    let messages = document.getElementById("messages");

    // mensagem do usuário
    let userMessage = document.createElement("div");
    userMessage.className = "user";
    userMessage.innerText = message;
    messages.appendChild(userMessage);

    input.value = "";

    // resposta do Python
    try {
        let response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagem: message }) // ⚠ aqui foi corrigido
        });
        let data = await response.json();

        // mensagem do bot
        let botMessage = document.createElement("div");
        botMessage.className = "bot";
        botMessage.innerText = data.resposta; // ⚠ aqui também foi corrigido
        messages.appendChild(botMessage);

        messages.scrollTop = messages.scrollHeight;

    } catch (error) {
        let botMessage = document.createElement("div");
        botMessage.className = "bot";
        botMessage.innerText = "Erro ao conectar com o servidor.";
        messages.appendChild(botMessage);
    }
}

// enviar com ENTER
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