import "./formulariosAutoformatar.js"
import "./formulariosReceberArquivo.js"
// import "./formulariosValidacoes.js"
import { popUp } from "./globalPopups.js"

const cadastroBtn = document.getElementById('cadastroBtn');
const cadastroMenu = document.getElementById('cadastroMenu');

if (cadastroBtn && cadastroMenu) {
    popUp(cadastroMenu, cadastroBtn);
}

const cadastro_formulario = document.querySelector('form');

cadastro_formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // impede sair da página ou recarregar

    const formData = new FormData(cadastro_formulario);
    const response = await fetch('/cadastro', {
        method: 'POST',
        body: formData
    });

    alert (await response.text());
});