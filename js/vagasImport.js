import { popUp } from "./globalPopups.js";
import { vagas_carregarBanco } from "./vagasBanco.js";
import { vagas_filtrar } from "./vagasFiltros.js";
import { vaga_gerarHTML } from "./vagasTemplate.js";

await vagas_carregarBanco();

export async function vagas_carregar(url = "/api/vagas") {
    const container = document.getElementById("posts");
    const dados = await vagas_carregarBanco(url);

    dados.vagas.sort(function(a, b) {
        return new Date(b.data_de_criacao).getTime() - new Date(a.data_de_criacao).getTime();
    });

    let conteudo = "";

    if (document.getElementsByClassName("vagasPagina").length > 0) {
        conteudo = vaga_gerarHTML(dados.vagas, 169);
    }

    if (document.getElementsByClassName("vagasNaHomePage").length > 0) {
        const vagasEmDestaque = dados.vagas.slice(0, 4);
        conteudo = vaga_gerarHTML(vagasEmDestaque, 69);
    }

    container.innerHTML = conteudo;

    const barraPesquisa = document.getElementById("vaga_barraPesquisa");
    if (barraPesquisa) {
        barraPesquisa.addEventListener("input", vagas_filtrar);
    }

    if (document.getElementsByClassName("vaga").length > 0) {
        dados.vagas.forEach(function(vaga) {
            const card = document.getElementById(`vaga_${vaga.id}`);
            const cardGrande = document.getElementById(`infoVaga_${vaga.id}`);

            if (card && cardGrande) {
                popUp(cardGrande, card);
            }
        });
    }

    vagas_filtrar();
}