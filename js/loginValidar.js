const campos = {
    email: document.getElementById("login_email"),
    senha: document.getElementById("login_senha"),
    emailRec: document.getElementById("login_emailRec")
};

export function validar(usuario, senha) {
    if (usuario === 'email')
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senha);
    return senha.length >= 6;
}

    export function limparErros() {
        var spans = loginMenu.querySelectorAll(".erro");
        for (var i = 0; i < spans.length; i++) spans[i].textContent = "";   // limpa todos os elementos com a classe erro
    }

    export function erroTreme(input) {
        input.classList.remove("erro-shake");
        void input.offsetWidth;
        input.classList.add("erro-shake");
        setTimeout(() => {
            input.classList.remove("erro-shake")
        }, 500);
    }