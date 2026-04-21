import "./formulariosAutoformatar.js"
import "./formulariosReceberArquivo.js"
import "./formulariosValidacoes.js"

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // impede sair da página ou recarregar

    // coleta os dados do formulátrio, incluindo o arquivo
    const formData = new FormData(form);

    const response = await fetch('/cadastro', {
        method: 'POST',
        body: formData
    });

    alert (await response.text());
});