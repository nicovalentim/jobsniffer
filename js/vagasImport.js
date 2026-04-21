import { filtrarVagas } from "./vagasFiltros.js";
import { abreFecha } from "./globalPopups.js";

export async function buscarVagas(url) {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao buscar vagas:", erro);
        return { vagas: [] };
    }
}

export async function carregarVagas(url = "/api/vagas") {
    const container = document.getElementById("posts")
    const dados = await buscarVagas(url);

    // reordenar
    dados.vagas.sort(function(a, b) {
        return new Date(b.data_de_criacao).getTime() - new Date(a.data_de_criacao).getTime();
    });

    let conteudo = "";
    container.innerHTML = ''

    if (document.getElementsByClassName("vagasPagina").length > 0) {

    for (const vaga of dados.vagas) {

        let descricao = vaga.descricao
        if (descricao.length > 360) {
            descricao = descricao.substring(0, 360) + " (...)"
        }
        
        const requisitos = vaga.requisitos.split(', ')
        let reqs = ""
        for (let i = 0; i < requisitos.length; i++) {
            reqs += `<p class="requisitos">#${requisitos[i]}</p>`
        }


        const infoVaga = `
                <div class="infoVaga" id="infoVaga_${vaga.id}">
                    <span class="tituloVaga">
                    <p class="areaVaga" data-area="${vaga.area.toLowerCase()}">${vaga.area}</p>
                    </span>
                        <h1>${vaga.titulo}</h1>
                    <span class="textoVaga">
                        ${vaga.descricao}
                    </span>
                    <section>
                        <span class="naVaga">${vaga.localizacao}</span>
                        <span class="naVaga">${vaga.regime}</span>
                    </section>
                    <span class="reqs">${reqs}</span>
                    <button class="">Candidatar-se!</button>
                </div>
                `

        conteudo += `
            <section
                href="#"
                class="vaga"
                id="vaga_${vaga.id}"
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
                ` + infoVaga
}};

    if (document.getElementsByClassName("vagasNaHomePage").length > 0) {

        let vagasEmDestaque = dados.vagas.slice(0, 4);

        for (let i = 0; i < vagasEmDestaque.length; i++) {
            const vaga = dados.vagas[i];
            const requisitos = vaga.requisitos.split(', ')
            let reqs = ""
            for (let i = 0; i < requisitos.length; i++) {
                reqs += `<p class="requisitos">#${requisitos[i]}</p>`
            }
        
            conteudo += `
                <section
                    href="#"
                    class="vaga"
                    id="vaga_${vaga.id}"
                    data-localizacao="${vaga.localizacao.toLowerCase()}"
                    data-regime="${vaga.regime.toLowerCase()}"
                    data-area="${vaga.area.toLowerCase()}">
                    <span class="tituloVaga">
                        <p class="areaVaga" data-area="${vaga.area.toLowerCase()}">${vaga.area}</p>
                        <h1>${vaga.titulo}</h1>
                    </span>
                    <hr />
                    <span class="reqs">${reqs}</span>
                    <span class="naVaga">${vaga.localizacao}</span>
                    <span class="naVaga">${vaga.regime}</span>
                </section>
                `
        }
}

    container.innerHTML = conteudo

    const barraPesquisa = document.getElementById("buscarVaga");
    if (barraPesquisa) {
        barraPesquisa.addEventListener("input", filtrarVagas);
    }

    if (document.getElementsByClassName("vagasPagina").length > 0) {
        dados.vagas.forEach(function(vaga) {
            const card = document.getElementById(`vaga_${vaga.id}`);
            const cardGrande = document.getElementById(`infoVaga_${vaga.id}`);

            if (card && cardGrande) {
                abreFecha(cardGrande, card);
            }
        });
    }

    filtrarVagas();
}