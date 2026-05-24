import { editarTexto, salvarBanco } from "./editar.js";

export function atualizarUsuario() {
    let usuarioNome = document.getElementById("perfilNome");
    usuarioNome.textContent = localStorage.getItem("nome") || "Usuário";
    
    let usuarioEmail = document.getElementById("usuarioEmail");
    usuarioEmail.textContent = localStorage.getItem("email") || "usuário@exemplo.com";

    let usuarioSenha = document.getElementById("usuarioSenha");
    usuarioSenha.textContent = localStorage.getItem("senha") || "••••••••";

    let usuarioNascimento = document.getElementById("usuarioNascimento");
    usuarioNascimento.textContent = localStorage.getItem("nascimento") || "00/00/0000";

    let usuarioTelefone = document.getElementById("usuarioTelefone");
    usuarioTelefone.textContent = localStorage.getItem("telefone") || "(00) 00000-0000";

    let usuarioCEP = document.getElementById("usuarioCEP");
    usuarioCEP.textContent = localStorage.getItem("cep") || "00000-000";

    let usuarioLinkedin = document.getElementById("usuarioLinkedin");
    usuarioLinkedin.textContent = localStorage.getItem("linkedin") || "Não enviado";

    let usuarioFolio = document.getElementById("usuarioFolio");
    usuarioFolio.textContent = localStorage.getItem("folio") || "Não enviado";

    const dadosUsuario = document.querySelectorAll(".dadosUsuario table td");
    editarTexto(dadosUsuario);

    const perfilBtn = document.getElementById("perfilBtn");
    if (perfilBtn) {
        perfilBtn.replaceWith(perfilBtn.cloneNode(true)); 
        const novoperfilBtn = document.getElementById("perfilBtn");

        novoperfilBtn.addEventListener("click", salvarBanco);
    }
}