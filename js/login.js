import "./loginTela.js";
import "./loginValidacoes.js";

const btnEntrar = document.getElementById("btnEntrar");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

if (localStorage.getItem("logado") === "true") {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
} else {
    btnLogin.style.display = "flex";
    btnLogout.style.display = "none";
}

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
            localStorage.setItem("logado", "true");
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