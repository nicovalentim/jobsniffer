import { popUp } from "./global.js";

var loginMenu = document.getElementById("loginMenu");
var voltarBtn = document.getElementById("voltarBtn");
var loginBtn = document.getElementById("loginBtn");

var usuario_telefoneas = {
    login: document.getElementById("usuario_telefoneaLogin"),
    senha: document.getElementById("usuario_telefoneaSenha")
};

var campos = {
    lEmail: document.getElementById("loginEmail"),
    lSenha: document.getElementById("loginSenha"),
    rEmail: document.getElementById("recEmail")
};

// chama o menu de login
popUp(loginMenu, loginBtn, function() {
    alternarusuario_telefonea('login');
    campos.lEmail.value = campos.lSenha.value = campos.rEmail.value = "";

    setTimeout(function() {
        document.getElementById("loginEmail").focus();
    }, 50);
});

// alterna entre as usuario_telefoneas do menu
function alternarusuario_telefonea(usuario_telefonea) {
    limparErros();
    usuario_telefoneas.login.style.display = (usuario_telefonea === 'login') ? "flex" : "none";
    usuario_telefoneas.senha.style.display = (usuario_telefonea === 'senha') ? "flex" : "none";
    voltarBtn.style.display = (usuario_telefonea === 'senha') ? "inline" : "none";
}
    voltarBtn.onclick = function() {
        alternarusuario_telefonea('login');
    };
    document.getElementById("esqueceuSenha").onclick = function() {
        alternarusuario_telefonea('senha');
    };

// validar dados
function validar(tipo, valor) {
    if (tipo === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }
    return valor.length >= 6;
}
    function submeterLogin() {
        limparErros();
        var vEmail = validar('email', campos.lEmail.value);
        var vSenha = validar('senha', campos.lSenha.value);

        if (!vEmail) document.getElementById("erroLoginEmail").textContent = "Email inválido";
        if (!vSenha) document.getElementById("erroLoginSenha").textContent = "Senha curta (min 6)";

        if (vEmail && vSenha) console.log("Login OK");
    }
    function submeterRecuperacao() {
        limparErros();
        if (validar('email', campos.rEmail.value)) {
            console.log("Recuperação OK");
        } else {
            document.getElementById("erroRecuperacao").textContent = "Email inválido";
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
    // envia com enter
    loginMenu.onkeydown = function(e) {
        if (e.key === "Enter") {
            // para usuario_telefonea de login
            if (usuario_telefoneas.login.style.display !== "none") {
                submeterLogin();
            } 
            // para usuario_telefonea de recuperação
            else if (usuario_telefoneas.senha.style.display !== "none") {
                submeterRecuperacao();
            }
        }
    };