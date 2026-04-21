import { abreFecha } from "./globalPopups.js";
import { dadosBanco } from "./vagasBanco.js";
import { filtrarVagas } from "./vagasFiltros.js";
import { gerarHtmlVagas } from "./vagasTemplate.js";

await dadosBanco();

export async function carregarVagas(url = "/api/vagas") {
    const container = document.getElementById("posts");
    const dados = await dadosBanco(url);

    dados.vagas.sort(function(a, b) {
        return new Date(b.data_de_criacao).getTime() - new Date(a.data_de_criacao).getTime();
    });

    let conteudo = "";

    if (document.getElementsByClassName("vagasPagina").length > 0) {
        conteudo = gerarHtmlVagas(dados.vagas, 169);
    }

    if (document.getElementsByClassName("vagasNaHomePage").length > 0) {
        const vagasEmDestaque = dados.vagas.slice(0, 4);
        conteudo = gerarHtmlVagas(vagasEmDestaque, 69);
    }

    container.innerHTML = conteudo;

    const barraPesquisa = document.getElementById("dadosBanco");
    if (barraPesquisa) {
        barraPesquisa.addEventListener("input", filtrarVagas);
    }

    if (document.getElementsByClassName("vaga").length > 0) {
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