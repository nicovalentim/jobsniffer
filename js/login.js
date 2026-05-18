import "./loginTela.js";
import { erroTreme, validarFormatoLogin } from "./loginValidacoes.js";

const btnEntrar = document.getElementById("btnEntrar");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const cadastro = document.getElementById("cadastro");
const menuUsuario = document.getElementById("menuUsuario");

if (localStorage.getItem("logado") === "true") {
    btnLogin.style.display = cadastro.style.display = "none";
    menuUsuario.style.display = "flex";
} else {
    btnLogin.style.display = cadastro.style.display = "flex";
    menuUsuario.style.display = "none";
}

let loginNome = document.getElementById("loginNome");
loginNome.textContent = localStorage.getItem("nome") || "Usuário";

btnEntrar.addEventListener("click", (e) => {
    e.preventDefault();
    btnEntrarClick();
});

btnLogout.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

async function btnEntrarClick() {
    const email = document.getElementById("login_email");
    const senha = document.getElementById("login_senha");

    if (!validarFormatoLogin(email, senha)) return;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email.value, senha: senha.value })
        });

        if (response.ok) {
            const dados = await response.json();

            localStorage.setItem("logado", "true");
            localStorage.setItem("nome", dados.nome);
            localStorage.setItem("email", dados.email);
            localStorage.setItem("senha", dados.senha);
            localStorage.setItem("nascimento", dados.nascimento);
            localStorage.setItem("telefone", dados.telefone);
            localStorage.setItem("cep", dados.cep);
            localStorage.setItem("linkedin", dados.linkedin);
            localStorage.setItem("folio", dados.folio || "Não enviado");

            location.reload();
        } else {
            document.getElementById("erroLoginSenha").textContent = "Usuário ou senha incorretos.";
            erroTreme(email);
            erroTreme(senha);
        }

    } catch (erro) {
        console.error("Erro no login:", erro);
        document.getElementById("erroLoginSenha").textContent = "Erro ao conectar com o servidor.";
    }
}