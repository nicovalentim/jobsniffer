export function gerarHtmlVagas(listaVagas, limiteDesc) {
    let conteudoHTML = "";

    for (const vaga of listaVagas) {
        let descricaoCurta = vaga.descricao;
        if (descricaoCurta.length > limiteDesc) {
            descricaoCurta = `${descricaoCurta.slice(0, limiteDesc)} (...)`;
        }

        const requisitos = vaga.requisitos.split(', ')
        let reqs = ""
        for (let i = 0; i < requisitos.length; i++) {
            reqs += `<p class="requisitos">#${requisitos[i]}</p>`
        }

        const infoVaga = criarInfoVaga(vaga, reqs);
        const cardVaga = criarVagaCard(vaga, descricaoCurta, reqs);

        conteudoHTML += cardVaga + infoVaga;
    }
    
    return conteudoHTML;
}

export function criarVagaCard(vaga, descricao, reqs) {
    return `
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

                    <span class="textoVaga">${descricao}</span>
                    <hr />
                    <span class="reqs">${reqs}</span>
                    <span class="naVaga">${vaga.localizacao}</span>
                    <span class="naVaga">${vaga.regime}</span>
            </section>
            `
}

export function criarInfoVaga(vaga, reqs) {
    return `
        <div class="infoVaga" id="infoVaga_${vaga.id}">
            <span class="tituloVaga">
                <p class="areaVaga" data-area="${vaga.area.toLowerCase()}">${vaga.area}</p>
            </span>
            <h1>${vaga.titulo}</h1>
            <span class="textoVaga">${vaga.descricao}</span>
            <section>
                <span class="naVaga">${vaga.localizacao}</span>
                <span class="naVaga">${vaga.regime}</span>
            </section>
            <span class="reqs">${reqs}</span>
            <button class="">Candidatar-se!</button>
        </div>
    `
}