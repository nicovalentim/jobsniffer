var menu = document.getElementById("loginMenu");
var overlay = document.getElementById("overlay");
var voltarBtn = document.getElementById("voltarBtn");
var loginBtn = document.getElementById("loginBtn");

var telas = {
    login: document.getElementById("telaLogin"),
    senha: document.getElementById("telaSenha")
};

var campos = {
    lEmail: document.getElementById("loginEmail"),
    lSenha: document.getElementById("loginSenha"),
    rEmail: document.getElementById("recEmail")
};

// mostra o menu se clicar no botão login
loginBtn.onclick = function(e) {
    e.stopPropagation();                             // não deixa acontecer em outros elementos da página
    menu.classList.add("ativo");
    overlay.classList.add("ativo");
    alternarTela('login');
    campos.lEmail.value = campos.lSenha.value = campos.rEmail.value = "";
    document.getElementById("loginEmail").focus();  // deixa o menu de "e-mail" pré-clicado
};

// alterna entre as telas do menu
function alternarTela(tela) {
    limparErros();
    telas.login.style.display = (tela === 'login') ? "flex" : "none";
    telas.senha.style.display = (tela === 'senha') ? "flex" : "none";
    voltarBtn.style.display = (tela === 'senha') ? "inline" : "none";
}
    voltarBtn.onclick = function() {
        alternarTela('login');
    };
    document.getElementById("esqueceuSenha").onclick = function() {
        alternarTela('senha');
    };

// fechar a janela
function fechar() {
    menu.classList.remove("ativo");
    overlay.classList.remove("ativo");
}
    // fecha ao clicar fora do menu de login
    overlay.onclick = fechar;
    document.onclick = function(e) {
        if (!menu.contains(e.target) && e.target !== loginBtn) fechar();
    };
    menu.onclick = function(e) { e.stopPropagation(); }; // não deixa acontecer em outros elementos da página
    menu.oninput = function() { limparErros(); };
    // fecha com tecla ESC
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") fechar();
    });
    // fecha no X no topo da tela
    const fecharBtn = document.getElementById("fecharBtn");
    fecharBtn.addEventListener("click", fechar);

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
        var spans = menu.querySelectorAll(".erro");
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
    menu.onkeydown = function(e) {
        if (e.key === "Enter") {
            // para tela de login
            if (telas.login.style.display !== "none") {
                submeterLogin();
            } 
            // para tela de recuperação
            else if (telas.senha.style.display !== "none") {
                submeterRecuperacao();
            }
        }
    };