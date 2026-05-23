export function validarRegrasSenha(senhaTexto) {
    const regrasSenha = document.getElementById("cadastro_regrasSenha");
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
            if (passou) {
                elemento.classList.add("valido");
            } else {
                elemento.classList.remove("valido");
            }
        }
    });

    const todasOk = regras.every(t => t === true);
    if (regrasSenha) {
        if (todasOk) {
            regrasSenha.classList.add("inativo");
        } else {
            regrasSenha.classList.remove("inativo");
        }
    }
    return todasOk;
}

export function verificarSenhas() {
    const senha = document.getElementById("cadastro_senha");
    const confirmaSenha = document.getElementById("cadastro_confirmaSenha");
    const senhasDiferentes = document.getElementById("cadastro_senhasDiferentes");

    if (confirmaSenha && senha && confirmaSenha.value !== "" && senha.value !== confirmaSenha.value) {
        if (senhasDiferentes) senhasDiferentes.classList.add("ativo");
        return false;
    } else {
        if (senhasDiferentes) senhasDiferentes.classList.remove("ativo");
        return true;
    }
}

document.addEventListener("input", (e) => {
    if (e.target && e.target.id === "cadastro_senha") {
        validarRegrasSenha(e.target.value);
        verificarSenhas();
    }
    if (e.target && e.target.id === "cadastro_confirmaSenha") {
        verificarSenhas();
    }
});

document.addEventListener("change", (e) => {
    if (e.target && e.target.id === "cadastro_aceitar") {
        const botaoEnviar = document.getElementById("cadastro_enviar");
        if (botaoEnviar) {
            if (e.target.checked) {
                botaoEnviar.disabled = false;
                botaoEnviar.type = "submit";
                botaoEnviar.classList.add("ativo");
            } else {
                botaoEnviar.disabled = true;
                botaoEnviar.type = "button";
                botaoEnviar.classList.remove("ativo");
            }
        }
    }
});