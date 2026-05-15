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
            localStorage.setItem("logado", true);
            let logado = localStorage.getItem("logado");
            console.log(localStorage.getItem("logado"));

            localStorage.setItem("nome", data.nome);
            let nome = localStorage.getItem("nome");
            console.log(localStorage.getItem("nome"));
        }

    } catch (erro) {
        console.error("Erro no login:", erro);
    }
});
    const logout = "";

    logout.addEventListener("click", () => {
        localStorage.clear();

        alert("Você saiu do sistema!");
    });