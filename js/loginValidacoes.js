export function validar(tipo, valor) {
    if (tipo === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }
    return valor.length >= 6;
}

export function validarFormatoLogin(email, senha) {
    limparErros();

    const emailValido = validar('email', email.value);
    const senhaValida = validar('senha', senha.value);
        if (!emailValido) {
            document.getElementById("erroLoginEmail").textContent = "Email inválido";
            erroTreme(email);
            return false;
        }
        if (!senhaValida) {
            document.getElementById("erroLoginSenha").textContent = "Senha muito curta!";
            erroTreme(senha);
            return false;
        }

    return true;
}
    export function erroTreme(input) {
        if (!input) return;
        input.classList.remove("erro-shake");
        void input.offsetWidth;
        input.classList.add("erro-shake");
        setTimeout(() => {
            input.classList.remove("erro-shake");
        }, 500);
    }
    export function limparErros() {
        const loginMenu = document.getElementById("loginMenu");
        if (loginMenu) {
            var spans = loginMenu.querySelectorAll(".erro");
            for (var i = 0; i < spans.length; i++) {
                spans[i].textContent = "";
            }
        }
    }