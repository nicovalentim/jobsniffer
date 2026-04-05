// importa a função de filtrar de outro arquivo (pra facilitar não ter que colocar dois script no html)
import "./filtrarVagas.js";

// seleciona o lugar aonde vai jogar os posts (aonde as vagas vão aparecer)
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
    const container = document.getElementById("posts")

    const dados = await buscarVagas(url);

    // reordena as vagas para mostrar as mais recentes primeiro
    dados.vagas.sort(function(a, b) {
        return new Date(b.data_de_criacao).getTime() - new Date(a.data_de_criacao).getTime();
    });

    let conteudo = "";
    container.innerHTML = ''

    if (document.getElementsByClassName("vagasPagina").length > 0) {

    // loopa cada elemento no banco de dados para procurar informações das vagas
    for (const vaga of dados.vagas) {

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
        for (let i = 0; i < requisitos.length; i++) {
            reqs += `<p class="requisitos">#${requisitos[i]}</p>`
        }

    // cria o conteúdo com o layout da página
    conteudo += `
        <section class="vaga"
            data-localizacao="${vaga.localizacao.toLowerCase()}"
            data-regime="${vaga.regime.toLowerCase()}"
            data-area="${vaga.area.toLowerCase()}">
                <span class="tituloVaga">
                    <p class="areaVaga" data-area="${vaga.area.toLowerCase()}">${vaga.area}</p>
                    <h1>${vaga.titulo}</h1>
                </span>

                <span class="textoVaga">
                    ${descricao}
                </span>
                <hr />
                <span class="reqs">${reqs}</span>
                <span class="naVaga">${vaga.localizacao}</span>
                <span class="naVaga">${vaga.regime}</span>
        </section>
            `
}};
    if (document.getElementsByClassName("vagasDestaque").length > 0) {
        let vagasEmDestaque = dados.vagas.slice(0, 3);

    // loopa cada elemento no banco de dados para procurar informações das vagas
    for (let i =0; i < vagasEmDestaque.length; i++) {
        const vaga = dados.vagas[i];

        // transformar reqs em array
        const requisitos = vaga.requisitos.split(', ')

        // listar as vagas na página
        // variável pra postar no html
        let reqs = ""
        for (let i = 0; i < requisitos.length; i++) {
            reqs += `<p class="requisitos">#${requisitos[i]}</p>`
        }
    
        conteudo += `
        <section class="vaga"
            data-localizacao="${vaga.localizacao.toLowerCase()}"
            data-regime="${vaga.regime.toLowerCase()}"
            data-area="${vaga.area.toLowerCase()}">
            <span class="tituloVaga">
                <p class="areaVaga" data-area="${vaga.area.toLowerCase()}">${vaga.area}</p>
                <h1>${vaga.titulo}</h1>
            </span>
            <hr />
            <span class="reqs">${reqs}</span>
        </section>
            `
    }
};


    // adiciona todo o conteúdo criado para a página html de uma vez só
    container.innerHTML = conteudo

    filtrarVagas();
}