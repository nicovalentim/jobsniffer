// Seletores de interface
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

// Centralizador de erros
function limparErros() {
    var spans = menu.querySelectorAll(".erro");
    for (var i = 0; i < spans.length; i++) spans[i].textContent = "";
}

// Alternar entre as telas do menu
function alternarTela(tela) {
    limparErros();
    telas.login.style.display = (tela === 'login') ? "flex" : "none";
    telas.senha.style.display = (tela === 'senha') ? "flex" : "none";
    voltarBtn.style.display = (tela === 'senha') ? "block" : "none";
}

function fechar() {
    menu.classList.remove("ativo");
    overlay.classList.remove("ativo");
}

function validar(tipo, valor) {
    if (tipo === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }
    return valor.length >= 6;
}

// --- LÓGICA DE SUBMISSÃO (Encapsulada para reuso) ---

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

// --- EVENTOS DE INTERFACE E TECLADO ---

loginBtn.onclick = function(e) {
    e.stopPropagation();
    menu.classList.add("ativo");
    overlay.classList.add("ativo");
    alternarTela('login');
    campos.lEmail.value = campos.lSenha.value = campos.rEmail.value = "";
    document.getElementById("loginEmail").focus();
};

overlay.onclick = fechar;
voltarBtn.onclick = function() { alternarTela('login'); };
document.getElementById("esqueceuSenha").onclick = function() { alternarTela('senha'); };

// Fecha ao clicar fora e impede propagação interna
document.onclick = function(e) {
    if (!menu.contains(e.target) && e.target !== loginBtn) fechar();
};
menu.onclick = function(e) { e.stopPropagation(); };
menu.oninput = function() { limparErros(); };

// Adiciona suporte ao "Enter" nos campos de input
menu.onkeydown = function(e) {
    if (e.key === "Enter") {
        // Se a tela de login estiver visível, tenta logar
        if (telas.login.style.display !== "none") {
            submeterLogin();
        } 
        // Se a tela de recuperação estiver visível, tenta recuperar
        else if (telas.senha.style.display !== "none") {
            submeterRecuperacao();
        }
    }
};

// Mantém os cliques nos botões chamando as mesmas funções
document.getElementById("btnEntrar").onclick = function(e) {
    e.preventDefault();
    submeterLogin();
};

document.getElementById("btnRecuperar").onclick = function(e) {
    e.preventDefault();
    submeterRecuperacao();
};

// fecha com tecla ESC
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") fechar();
});

const fecharBtn = document.getElementById("fecharBtn");

fecharBtn.addEventListener("click", fechar);