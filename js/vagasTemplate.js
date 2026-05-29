export function vaga_info(vaga, descricao, reqs) {
    const area = vaga.area || "";
    const localizacao = vaga.localizacao || "";
    const regime = vaga.regime || "";
    const titulo = vaga.titulo || "";

    return `<section
            href="#"
            class="vaga"
            id="vaga_${vaga.id}"
            data-localizacao="${localizacao.toLowerCase()}"
            data-regime="${regime.toLowerCase()}"
            data-area="${area.toLowerCase()}">
                <span class="tituloVaga">
                    <p class="areaVaga" data-area="${area.toLowerCase()}">${area}</p>
                    <h1>${titulo}</h1>
                </span>
                <span class="textoVaga">${descricao}</span>
                <hr />
                <span class="reqs">${reqs}</span>
                <span class="naVaga">${localizacao}</span>
                <span class="naVaga">${regime}</span>
            </section>`;
}

export function vaga_infoOnClick(vaga, reqs) {
    const area = vaga.area || "";
    const localizacao = vaga.localizacao || "";
    const regime = vaga.regime || "";
    const titulo = vaga.titulo || "";
    const descricao = vaga.descricao || "";

    let salario = Number(vaga.salario || 0);
        salario = salario.toLocaleString('pt-BR');
        salario = "R$ " + salario + ",00";

    const jaCandidatado = vaga.ja_candidatado === 1;
        const textoBotao = jaCandidatado ? "Já Candidatado" : "Quero me candidatar!";
        const estiloBotao = jaCandidatado ? 'style="background-color: gray;"' : '';
        const atributoDisabled = jaCandidatado ? 'disabled' : '';

    const admin = localStorage.getItem("tipo") == "admin";
        const classeEditavel = admin ? "editavelVaga" : "";
        let botoesAdmin = "";
        if (admin) {
            botoesAdmin = `
                <div class="botoesAdmin">
                    <button type="button" class="vagaBtn enviar">Salvar Alterações</button>
                    <button type="button" class="vagaBtn enviar" style="display:flex" data-vaga-id="${vaga.id}">Excluir Vaga</button>
                </div>
            `;
        }

        return `<form
                class="infoVaga"
                id="infoVaga_${vaga.id}"
                data-vaga-id="${vaga.id}">
                    <span class="tituloVaga">
                        <p class="areaVaga ${classeEditavel}" data-campo="area" data-area="${area.toLowerCase()}">${area}</p>
                    </span>
                    <h1 class="${classeEditavel}" data-campo="titulo">${titulo}</h1>
                    <span class="textoVaga ${classeEditavel}" data-campo="descricao">${descricao}</span>
                    <span class="detalhesVaga">
                        <span class="naVaga ${classeEditavel}" data-campo="localizacao">${localizacao}</span>
                        <span class="naVaga ${classeEditavel}" data-campo="regime">${regime}</span>
                        <span class="naVaga ${classeEditavel}" data-campo="salario">${salario}</span>
                    </span>
                    <span class="reqs">${reqs}</span>
                    ${botoesAdmin}
                    <button type="submit" class="vagasCandidatarSe" ${atributoDisabled} ${estiloBotao}>${textoBotao}</button>
                </form>`;
}

export function vaga_gerarTemplateCriacao() {
    const cardCriacao = `
        <section class="vaga" id="vaga_nova">
            <div>
                +
            </div>
        </section>
    `;

    const formularioCriacao = `
        <form class="infoVaga" id="infoVaga_nova" data-vaga-id="nova">
            <span class="tituloVaga">
                <p class="areaVaga editavelVaga" data-campo="area" data-area="">Clique para definir a Área</p>
            </span>
            <h1 class="editavelVaga" data-campo="titulo">Clique para definir o Título</h1>
            <span class="textoVaga editavelVaga" data-campo="descricao">Clique para definir a Descrição da vaga...</span>
            <span class="detalhesVaga">
                <span class="naVaga editavelVaga" data-campo="localizacao">Definir Localização</span>
                <span class="naVaga editavelVaga" data-campo="regime">Definir Regime</span>
                <span class="naVaga editavelVaga" data-campo="salario">Definir Salário (Apenas números)</span>
            </span>
            <span class="reqs">
                <p class="requisitos editavelVaga" data-campo="requisitos">Clique para adicionar Requisitos (separados por vírgula)</p>
            </span>
            <button type="button" class="vagaBtn enviar" id="btnSalvarNovaVaga">Criar Vaga</button>
        </form>
    `;

    return cardCriacao + formularioCriacao;
}

export function vaga_gerarHTML(listaVagas, limiteDesc) {

    let conteudoHTML = "";
    const admin = localStorage.getItem("tipo") == "admin";
        const classeEditavel = admin ? "editavelVaga" : "";

    for (const vaga of listaVagas) {
        let descricaoCurta = vaga.descricao || "";
        if (descricaoCurta.length > limiteDesc)
            descricaoCurta = `${descricaoCurta.slice(0, limiteDesc)} (...)`;

        const requisitos = (vaga.requisitos || "").split(', ')
        let reqs = ""
        for (let i = 0; i < requisitos.length; i++)
            reqs += `<p class="requisitos ${classeEditavel}" data-campo="requisitos">#${requisitos[i]}</p>`;

        const infoVaga = vaga_infoOnClick(vaga, reqs);
        const cardVaga = vaga_info(vaga, descricaoCurta, reqs);

        conteudoHTML += cardVaga + infoVaga;
    }

    return conteudoHTML;
}