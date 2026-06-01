import { salvarVagaBanco, criarVagaBanco, deletarVagaBanco } from "./bancoAPI.js";
import { editarTexto } from "./editar.js";
import { limparAlteracoes } from "./editarDOM.js";
import { popUp } from "./globalPopups.js";
import { vagas_carregarBanco } from "./vagasBanco.js";
import { inicializarCandidatura } from "./vagasCandidatar.js";
import { vagas_filtrar } from "./vagasFiltros.js";
import { vaga_gerarHTML, vaga_gerarTemplateCriacao } from "./vagasTemplate.js";

export async function vagas_carregar(url = "/api/vagas") {
    const container = document.getElementById("posts");
    const usuarioEmail = localStorage.getItem('email');
    const urlComFiltro = usuarioEmail ? `${url}?email=${encodeURIComponent(usuarioEmail)}` : url;

    const dados = await vagas_carregarBanco(urlComFiltro);
        dados.vagas.sort(function(a, b) {
            return new Date(b.data_de_criacao).getTime() - new Date(a.data_de_criacao).getTime();
        });

    let conteudo = "";
        if (!(document.getElementsByClassName("vagasPerfil").length > 0)) {
            document.querySelectorAll('.btnSalvarAlteracoes').forEach((btn) => {
                const clone = btn.cloneNode(true);
                btn.replaceWith(clone);
                clone.addEventListener('click', async () => {
                    const infoVaga = clone.closest('.infoVaga');
                    await salvarVagaBanco(infoVaga);
                    clone.classList.remove('ativo');
                    if (!document.querySelector('.btnSalvarAlteracoes.ativo')) limparAlteracoes();
                });
            });
        }
        if (document.getElementsByClassName("vagasPerfil").length > 0) {
            url = "/api/vagas/inscritas"
            const vagasInscritas = dados.vagas;
                if (vagasInscritas.length > 0) {
                    const posts = document.getElementById("posts");
                    const titulo = document.createElement("h1");
                    titulo.id = "tituloCandidaturas";
                    titulo.innerText = "Candidaturas feitas:";
                    posts.parentNode.insertBefore(titulo, posts);
                }
            conteudo = vaga_gerarHTML(vagasInscritas, 69);
            container.style.display = "contents"
        }
        if (document.getElementsByClassName("vagasPagina").length > 0) conteudo = vaga_gerarHTML(dados.vagas, 169);
        if (document.getElementsByClassName("vagasHomePage").length > 0) {
            const vagasEmDestaque = dados.vagas.slice(0, 4);
            conteudo = vaga_gerarHTML(vagasEmDestaque, 69);
        }

    const admin = localStorage.getItem("tipo") == "admin";
        if (admin && document.getElementsByClassName("vagasPagina").length > 0) conteudo = vaga_gerarTemplateCriacao() + conteudo;

    container.innerHTML = conteudo;

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

    if (localStorage.getItem("tipo") == "admin") {
        document.querySelectorAll('.vagaBtnDeletar').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const vagaId = btn.dataset.vagaId;
                await deletarVagaBanco(vagaId);
            });
        });

        const cardNovo = document.getElementById("vaga_nova");
        const cardGrandeNovo = document.getElementById("infoVaga_nova");
        editarTexto(document.querySelectorAll('.editavelVaga'))
        if (cardNovo && cardGrandeNovo) {
            popUp(cardGrandeNovo, cardNovo);
            const btnCandidatar = cardGrandeNovo.querySelector(".vagasCandidatarSe");
            if (btnCandidatar) btnCandidatar.remove();
        }
    }
        const btnCriarVaga = document.getElementById("btnSalvarNovaVaga");
        if (btnCriarVaga) {
            btnCriarVaga.addEventListener('click', async () => {
                const infoVaga = btnCriarVaga.closest('.infoVaga');
                await criarVagaBanco(infoVaga);
            });
        }

    const barraPesquisa = document.getElementById("vaga_barraPesquisa");
        if (barraPesquisa) barraPesquisa.addEventListener("input", vagas_filtrar);

    vagas_filtrar();
}