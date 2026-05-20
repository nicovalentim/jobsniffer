import { popUp } from "./global.js";
import { limparErros } from "./loginValidacoes.js";

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
        campos.email.focus();
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
    document.getElementById("btnRecuperar").onclick = function(e) {
        e.preventDefault();
        submeterRecuperacao();
    };
    loginMenu.onkeydown = function(e) {
        if (e.key === "Enter") {
            if (telas.senha.style.display !== "none") {
                submeterRecuperacao();
            }
        }
    };

/*
function submeterRecuperacao() {}
*/