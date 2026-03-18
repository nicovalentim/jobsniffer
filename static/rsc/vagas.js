// menu popup
const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

botaoMenu.onclick = () => {
    menu.classList.toggle("menuClicado");
};

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

const container = document.getElementById("vaga")

// carrega a URL do DB, "/vagas" na verdade é re-roteado via python para o diretório correto
async function carregar(url = "/vagas") {

    const res = await fetch(url)
    const dados = await res.json()

    container.innerHTML = ''

    dados.vagas.forEach(vaga => {

        const tiposPresenca = ["Presencial", "Híbrido", "100% remoto"]
        const tiposTempo = ["Meio-período", "Período Integral"]

        let descricao = vaga.descricao
        if (descricao.length > 1000) {
            descricao = descricao.substring(0, 1000) + "(...)"
        }

        container.innerHTML += `
        <section class="tituloVaga">
            <h1>${vaga.nome}</h1>
        </section>

        <section class="textoVaga">
            Empresa: ${vaga.empresa}<br />
            Local: ${tiposPresenca[vaga.presenca]}<br /><br />
            ${descricao}
        </section>

        <hr />
        `
    })
}

document.querySelectorAll(".filtro").forEach(botao => {

    botao.onclick = () => {

        let url = "/vagas"

        if (botao.dataset.presenca) {
            url = "/vagas?tipo=" + botao.dataset.presenca
        }

        if (botao.dataset.tempo) {
            url = "/vagas?tempo=" + botao.dataset.tempo
        }

        if (botao.dataset.filtro === "todos") {
            url = "/vagas"
        }

        carregar(url)
    }
})

carregar()