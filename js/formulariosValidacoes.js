const senha = document.getElementById("cadastro_senha");
const confirmaSenha = document.getElementById("cadastro_confirmaSenha");
const regrasSenha = document.getElementById("cadastro_regrasSenha");
const senhasDiferentes = document.getElementById("cadastro_senhasDiferentes");

export function validarRegrasSenha(senhaTexto) {
    const ids = ["r1", "r2", "r3", "r4"];
    const regras = [
        senhaTexto.length >= 6,           // Regra 1: Pelo menos 6 caracteres
        /[A-Z]/.test(senhaTexto),         // Regra 2: Pelo menos uma letra maiúscula
        /[a-z]/.test(senhaTexto),         // Regra 3: Pelo menos uma letra minúscula
        /[0-9]/.test(senhaTexto)          // Regra 4: Pelo menos um número
    ];

    regras.forEach((passou, i) => {
        const elemento = document.getElementById(ids[i]);
        if (elemento) {
            passou ? elemento.classList.add("valido") : elemento.classList.remove("valido");
        }
    });

    const todasOk = regras.every(t => t === true);
    if (regrasSenha) {
        todasOk ? regrasSenha.classList.add("inativo") : regrasSenha.classList.remove("inativo");
    }
    
    return todasOk;
}

export function verificarSenhas() {
    if (confirmaSenha.value !== "" && senha.value !== confirmaSenha.value) {
        senhasDiferentes.classList.add("ativo");
        return false;
    } else {
        senhasDiferentes.classList.remove("ativo");
        return true;
    }
}

senha.addEventListener("input", (e) => {
    validarRegrasSenha(e.target.value);
    verificarSenhas();
});
confirmaSenha.addEventListener("input", verificarSenhas);

let botaoEnviar = document.getElementById("cadastro_enviar");
let checkboxAceitar = document.getElementById("cadastro_aceitar");

checkboxAceitar.addEventListener("change", function() {
    if (checkboxAceitar.checked) {
        botaoEnviar.disabled = false;
        botaoEnviar.type = "submit";
        botaoEnviar.classList.add("ativo");
    } else {
        botaoEnviar.disabled = true;
        botaoEnviar.type = "button";
        botaoEnviar.classList.remove("ativo");
    }
});