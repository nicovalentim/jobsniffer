import "./loginTela.js";
import "./loginValidar.js";

const btnEntrar = document.getElementById("btnEntrar");

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

        const data = await response.json();
        alert(data.mensagem);

        if (response.ok) {
            console.log("programa funcionando");
            sessionStorage.setItem("usuarioLogado", "true");
            sessionStorage.setItem("nomeUsuario", Nome);
        }

    } catch (erro) {
        console.error("Erro no login:", erro);
    }
});
    const logout = "";

    logout.addEventListener("click", () => {
        sessionStorage.clear();

        alert("Você saiu do sistema!");
    });