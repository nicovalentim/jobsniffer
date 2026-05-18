import "./loginTela.js";
import "./loginValidacoes.js";

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

// onkeydwon para o enter
btnEntrar.addEventListener("click", async () => {
    const Email = document.getElementById("login_email").value;
    const Senha = document.getElementById("login_senha").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Email, Senha })
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
        }

    } catch (erro) {
        console.error("Erro no login:", erro);
    }
});

    btnLogout.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });