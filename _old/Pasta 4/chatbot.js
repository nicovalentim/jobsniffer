// abrir e fechar chat
function toggleChat() {
    let chat = document.getElementById("chat");
    if (chat.style.display === "none" || chat.style.display === "") {
        chat.style.display = "flex";
    } else {
        chat.style.display = "none";
    }
}

// enviar mensagem
async function sendMessage() {
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