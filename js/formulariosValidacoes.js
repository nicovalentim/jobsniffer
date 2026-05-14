// Seleciona os campos de senha e os elementos de feedback visual
const senha = document.getElementById("cadastro_senha");
const confirmaSenha = document.getElementById("cadastro_confirmaSenha");
const regrasSenha = document.getElementById("cadastro_regrasSenha");
const senhasDiferentes = document.getElementById("cadastro_senhasDiferentes");

function validarcadastro_regrasSenha(senha) {
    const ids = ["r1", "r2", "r3", "r4"];
    const regras = [
        senha.length >= 6,           // Regra 1: Pelo menos 6 caracteres
        /[A-Z]/.test(senha),         // Regra 2: Pelo menos uma letra maiúscula
        /[a-z]/.test(senha),         // Regra 3: Pelo menos uma letra minúscula
        /[0-9]/.test(senha)          // Regra 4: Pelo menos um número
    ];

    regras.forEach((passou, i) => {
        const elemento = document.getElementById(ids[i]);
        passou ?
            elemento.classList.add("valido") :
            elemento.classList.remove("valido");
    });

    const todasOk = regras.every(t => t === true);
    todasOk ?
        regrasSenha.classList.add("inativo") :
        regrasSenha.classList.remove("inativo");
    
    return todasOk;
}

function verificarIgualdade() {
    if (confirmaSenha.value !== "" && senha.value !== confirmaSenha.value) {
        senhasDiferentes.classList.add("ativo");
        return false;
    } else {
        senhasDiferentes.classList.remove("ativo");
        return true;
    }
}
    senha.addEventListener("input", (e) => {
        validarcadastro_regrasSenha(e.target.value);
        verificarIgualdade();
    });
    confirmaSenha.addEventListener("input", verificarIgualdade);

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    const senhaValida = validarcadastro_regrasSenha(senha.value);
    const senhasIguais = verificarIgualdade();

    if (!senhaValida || !senhasIguais) {
        e.preventDefault();
        alert("Por favor, verifique os requisitos de senha.");
    }
});

let botaoEnviar = document.getElementById("cadastro_enviar");
let checkboxAceitar = document.getElementById("cadastro_aceitar");

    checkboxAceitar.addEventListener("change", function() {
        if (checkboxAceitar.checked) {
            botaoEnviar.disabled = false;
            botaoEnviar.type = "submit";
            botaoEnviar.classList.add("ativo");
        } else {
            botaoEnviar.disabled = true;
            botaoEnviar.type = "";
            botaoEnviar.classList.remove("ativo");
        }
    }
);