import { editarTexto } from "./editar.js";
import { salvarVagaBanco } from "./editarAPI.js";
import { limparAlteracoes } from "./editarDOM.js";

import { popUp } from "./globalPopups.js";

import { vagas_carregarBanco } from "./vagasBanco.js";
import { inicializarCandidatura } from "./vagasCandidatar.js";
import { vagas_filtrar } from "./vagasFiltros.js";
import { vaga_gerarHTML } from "./vagasTemplate.js";

export async function vagas_carregar(url = "/api/vagas") {
    const container = document.getElementById("posts");

    if (document.getElementsByClassName("vagasPerfil").length > 0) {
        url = "/api/vagas/inscritas";
    }

    const usuarioEmail = localStorage.getItem('email');
        const urlComFiltro = usuarioEmail ? `${url}?email=${encodeURIComponent(usuarioEmail)}` : url;

    const dados = await vagas_carregarBanco(urlComFiltro);

    dados.vagas.sort(function(a, b) {
        return new Date(b.data_de_criacao).getTime() - new Date(a.data_de_criacao).getTime();
    });

    let conteudo = "";

    if (document.getElementsByClassName("vagasPagina").length > 0) {
        conteudo = vaga_gerarHTML(dados.vagas, 169);
    }

    if (document.getElementsByClassName("vagasHomePage").length > 0) {
        const vagasEmDestaque = dados.vagas.slice(0, 4);
        conteudo = vaga_gerarHTML(vagasEmDestaque, 69);
    }

    if (document.getElementsByClassName("vagasPerfil").length > 0) {
        const vagasInscritas = dados.vagas;

        if (vagasInscritas.length > 0) {
            const posts = document.getElementById("posts");
            const titulo = document.createElement("h1");
                titulo.id = "tituloCandidaturas";
                titulo.innerText = "Candidaturas feitas:";

            posts.parentNode.insertBefore(titulo, posts);
        }

        conteudo = vaga_gerarHTML(vagasInscritas, 69);
    }

    if (document.getElementsByClassName("vagasPerfil").length > 0) {
        container.innerHTML = conteudo;
        container.style.display = "contents";
    } else {
        container.innerHTML = conteudo;
        document.querySelectorAll('.vagaBtn').forEach((btn) => {
            const clone = btn.cloneNode(true);
            btn.replaceWith(clone);
            clone.addEventListener('click', async () => {
                const infoVaga = clone.closest('.infoVaga');
                await salvarVagaBanco(infoVaga);
                clone.classList.remove('ativo');
                if (!document.querySelector('.vagaBtn.ativo')) limparAlteracoes();
            }
        );
        });
    }

    const barraPesquisa = document.getElementById("vaga_barraPesquisa");
    if (barraPesquisa)
        barraPesquisa.addEventListener("input", vagas_filtrar);

    if (document.getElementsByClassName("vaga").length > 0) {
        dados.vagas.forEach(function(vaga) {
            const card = document.getElementById(`vaga_${vaga.id}`);
            const cardGrande = document.getElementById(`infoVaga_${vaga.id}`);

            if (card && cardGrande) {
                popUp(cardGrande, card);
                const formularioVaga = document.getElementById(`infoVaga_${vaga.id}`);
                inicializarCandidatura(formularioVaga);
            }
        });
    }

//    if (localStorage.getItem("tipo") == "admin")
        editarTexto(document.querySelectorAll('.editavelVaga'));
    vagas_filtrar();
}