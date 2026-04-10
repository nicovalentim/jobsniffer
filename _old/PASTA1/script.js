// Busca de vagas
const busca = document.getElementById("buscarVaga");

if (busca) {
    busca.addEventListener("keyup", function () {
        const texto = busca.value.toLowerCase();
        const vagas = document.querySelectorAll(".vaga");

        vagas.forEach(vaga => {
            const conteudo = vaga.textContent.toLowerCase();
            vaga.style.display = conteudo.includes(texto) ? "block" : "none";
        });
    });
}

// Botão candidatar
const botoes = document.querySelectorAll('.candidatar');

if (botoes.length > 0) {
    botoes.forEach(botao => {
        botao.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.add('clicado');
            this.textContent = "Candidatura enviada";
        });
    });
}