import { editarTexto, salvarDadosNoBanco } from "./editar.js"; // Importando a nova função

export function atualizarUsuario() {
    // ... todo o seu preenchimento de textContent original continua igual aqui ...
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

    // --- NOVA LÓGICA DO BOTÃO ---
    const btnSalvar = document.getElementById("btnSalvarPerfil");
    if (btnSalvar) {
        // Remove ouvintes antigos para evitar duplicações caso a função seja chamada mais de uma vez
        btnSalvar.replaceWith(btnSalvar.cloneNode(true)); 
        const novoBtnSalvar = document.getElementById("btnSalvarPerfil");
        
        novoBtnSalvar.addEventListener("click", salvarDadosNoBanco);
    }
}