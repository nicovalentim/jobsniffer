import { popUp } from "./global.js";

const loginMenu = document.getElementById("loginMenu");
const btnVoltar = document.getElementById("btnVoltar");
const btnLogin = document.getElementById("btnLogin");

const telas = {
    login: document.getElementById("login_telaEntrada"),
    senha: document.getElementById("login_telaRecuperacao")
};

const campos = {
    email: document.getElementById("login_email"),
    senha: document.getElementById("login_senha"),
    emailRec: document.getElementById("login_emailRec")
};

    popUp(loginMenu, btnLogin, function() {
        login_trocarTelas('login');
        campos.email.value = campos.senha.value = campos.emailRec.value = "";

        setTimeout(function() {
            document.getElementById("login_email").focus();
        }, 50);
    });

    function login_trocarTelas(nomeTela) {
        limparErros();
        telas.login.style.display = (nomeTela === 'login') ? "flex" : "none";
        telas.senha.style.display = (nomeTela === 'senha') ? "flex" : "none";
        btnVoltar.style.display = (nomeTela === 'senha') ? "inline" : "none";
    }
        btnVoltar.onclick = function() {
            login_trocarTelas('login');
        };
        document.getElementById("login_esqueceuSenha").onclick = function() {
            login_trocarTelas('senha');
        };

function validar(usuario, senha) {
    if (usuario === 'email')
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senha);
    return senha.length >= 6;
}
    function submeterLogin() {
        limparErros();
        var vEmail = validar('email', campos.email.value);
        var vSenha = validar('senha', campos.senha.value);

        if (!vEmail) {
            document.getElementById("erroLoginEmail").textContent = "Email inválido";
            erroTreme(campos.email);
        }
        if (vEmail && !vSenha) {
            document.getElementById("erroLoginSenha").textContent = "Senha muito curta!";
            erroTreme(campos.senha);
        }

        if (vEmail && vSenha) console.log("Login OK");
    }
    function submeterRecuperacao() {
        limparErros();
        if (validar('email', campos.emailRec.value)) {
            console.log("Recuperação OK");
        } else {
            document.getElementById("erroRecuperacao").textContent = "Email inválido";
            erroTreme(campos.emailRec);
        }
    }
    // erros
    function limparErros() {
        var spans = loginMenu.querySelectorAll(".erro");
        for (var i = 0; i < spans.length; i++) spans[i].textContent = "";   // limpa todos os elementos com a classe erro
    }

    // enviar os dados
    document.getElementById("btnEntrar").onclick = function(e) {
        e.preventDefault();
        submeterLogin();
    };
    document.getElementById("btnRecuperar").onclick = function(e) {
        e.preventDefault();
        submeterRecuperacao();
    };
    loginMenu.onkeydown = function(e) {
        if (e.key === "Enter") {
            if (telas.login.style.display !== "none") {
                submeterLogin();
            }
            else if (telas.senha.style.display !== "none") {
                submeterRecuperacao();
            }
        }
    };

function erroTreme(input) {
    input.classList.remove("erro-shake");
    void input.offsetWidth; 
    input.classList.add("erro-shake");
    setTimeout(() => {
        input.classList.remove("erro-shake");
    }, 500);
}