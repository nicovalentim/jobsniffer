function renderRequisitos(requisitosString) {
    return requisitosString
        .split(', ')
        .map(req => `<p class="requisitos">#${req}</p>`)
        .join('');
}

export function templateVagaCompleta(vaga) {
    const tamanhoDesc = 169;
    const descricaoCurta = vaga.descricao.length > tamanhoDesc 
        ? vaga.descricao.substring(0, tamanhoDesc) + "(...)" 
        : vaga.descricao;
    
    const reqs = renderRequisitos(vaga.requisitos);

    const infoVaga = `
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
            <button>Candidatar-se!</button>
        </div>
        `;

    const cardVaga = `
        <section class="vaga" id="vaga_${vaga.id}"
            data-localizacao="${vaga.localizacao.toLowerCase()}"
            data-regime="${vaga.regime.toLowerCase()}"
            data-area="${vaga.area.toLowerCase()}">
            <span class="tituloVaga">
                <p class="areaVaga" data-area="${vaga.area.toLowerCase()}">${vaga.area}</p>
                <h1>${vaga.titulo}</h1>
            </span>
            <span class="textoVaga">${descricaoCurta}</span>
            <hr />
            <span class="reqs">${reqs}</span>
            <span class="naVaga">${vaga.localizacao}</span>
            <span class="naVaga">${vaga.regime}</span>
        </section>
        `;

    return cardVaga + infoVaga;
}

export function templateVagaHome(vaga) {
    const reqs = renderRequisitos(vaga.requisitos);
    return `
        <section class="vaga" id="vaga_${vaga.id}"
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
        `;
}