// importa a função de filtrar de outro arquivo (pra facilitar não ter que colocar dois script no html)
import "./filtrarVagas.js";

// seleciona o lugar aonde vai jogar os posts (aonde as vagas vão aparecer)
const container = document.getElementById("posts")

async function buscarVagas(url) {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao buscar vagas:", erro);
        return { vagas: [] };
    }
}

// carrega a URL do DB, "/vagas" na verdade é re-roteado via python para o diretório correto
export async function carregar(url = "/api/vagas") {

    const dados = await buscarVagas(url);

    let conteudo = "";
    container.innerHTML = ''

    // loopa cada elemento no banco de dados para procurar informações das vagas
    dados.vagas.forEach(vaga => {
        // transforma variáveis inteiras em texto para ser exibido

        // reduz a quantidade de caracteres na tela (pra não mostrar tudo da vaga na página de ver todas elas)
        let descricao = vaga.descricao
        if (descricao.length > 360) {
            descricao = descricao.substring(0, 360) + " (...)"
        }

        // transformar reqs em array
        const requisitos = vaga.requisitos.split(', ')

        // listar as vagas na página
        // variável pra postar no html
        let reqs = ""
        function listaReqs () {
            for (let i = 0; i < requisitos.length; i++) {
                reqs += `<p class="requisitos">#${requisitos[i]}</p>`
            }
        }

        listaReqs();

    // cria o conteúdo com o layout da página
    conteudo += `
    <section class="vaga"
        data-localizacao="${vaga.localizacao.toLowerCase()}"
        data-presenca="${vaga.presenca.toLowerCase()}"
        data-area="${vaga.area.toLowerCase()}">
            <section class="tituloVaga">
                <p class="areaVaga" data-area="${vaga.area.toLowerCase()}">${vaga.area}</p>
                <h1>${vaga.titulo}</h1>
            </section>

            <section class="textoVaga">
<!--                Empresa: ${vaga.empresa}<br><br> -->
                ${descricao}
            </section>
            <hr />
            <section class="reqs">${reqs}</section>
            <button class="naVaga">${vaga.localizacao}</button>
            <button class="naVaga">${vaga.presenca}</button>
    </section>
        `
    });

    // adiciona todo o conteúdo criado para a página html de uma vez só
    container.innerHTML = conteudo

    filtrarVagas();
}
carregar();

console.log(reqs)