import { bancoSalvarVaga, bancoCriarVaga, bancoDeletarVaga } from "./bancoAPI.js";
import { editarTexto } from "./editar.js";
import { limparAlteracoes } from "./editarDOM.js";
import { popUp } from "./globalPopups.js";
import { vagas_carregarBanco } from "./vagasBanco.js";
import { inicializarCandidatura } from "./vagasCandidatar.js";
import { vagas_filtrar } from "./vagasFiltros.js";
import { vaga_gerarHTML, vaga_gerarTemplateCriacao } from "./vagasTemplate.js";

export async function vagas_carregar(url = "/api/vagas") {
    const container = document.getElementById("posts");
    const admin = localStorage.getItem("tipo") === "admin";

    let tipoPagina = "";
    if (document.getElementsByClassName("vagasPerfil").length > 0) tipoPagina = "perfil";
    else if (document.getElementsByClassName("vagasPagina").length > 0) tipoPagina = "pagina";
    else if (document.getElementsByClassName("vagasHomePage").length > 0) tipoPagina = "home";
        if (tipoPagina === "perfil") url = "/api/vagas/inscritas";

    const usuarioEmail = localStorage.getItem('email');
    const urlComFiltro = usuarioEmail ? `${url}?email=${encodeURIComponent(usuarioEmail)}` : url;
    const dados = await vagas_carregarBanco(urlComFiltro);
        dados.vagas.sort((a, b) => new Date(b.data_de_criacao).getTime() - new Date(a.data_de_criacao).getTime());

    let conteudo = "";

    switch (tipoPagina) {
        case "pagina":
            conteudo = vaga_gerarHTML(dados.vagas, 169);
            break;
        case "home":
            const vagasEmDestaque = dados.vagas.slice(0, 4);
            conteudo = vaga_gerarHTML(vagasEmDestaque, 69);
            break;
        case "perfil":
            if (dados.vagas.length > 0) {
                const titulo = document.createElement("h1");
                titulo.id = "tituloCandidaturas";
                titulo.innerText = "Candidaturas feitas:";
                container.parentNode.insertBefore(titulo, container);
            }
            conteudo = vaga_gerarHTML(dados.vagas, 69);
            break;
    }

    if (admin && tipoPagina === "pagina") conteudo = vaga_gerarTemplateCriacao() + conteudo;
    container.innerHTML = conteudo;

    if (tipoPagina === "perfil") {
        container.style.display = "contents";
    } else {
        document.querySelectorAll('.vagaBtn').forEach((btn) => {
            if (btn.id === "btnSalvarNovaVaga") return; 
            const clone = btn.cloneNode(true);
            btn.replaceWith(clone);
            clone.addEventListener('click', async () => {
                const infoVaga = clone.closest('.infoVaga');
                await bancoSalvarVaga(infoVaga);
                clone.classList.remove('ativo');
                if (!document.querySelector('.vagaBtn.ativo')) limparAlteracoes();
            });
        });
    }

    if (admin) {
        document.querySelectorAll('.vagaBtnDeletar').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                await bancoDeletarVaga(btn.dataset.vagaId);
            });
        });
        editarTexto(document.querySelectorAll('.editavelVaga'))
        const cardNovo = document.getElementById("vaga_nova");
        const cardGrandeNovo = document.getElementById("infoVaga_nova");
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
                await bancoCriarVaga(infoVaga);
            });
        }

    if (document.getElementsByClassName("vaga").length > 0) {
        dados.vagas.forEach((vaga) => {
            const card = document.getElementById(`vaga_${vaga.id}`);
            const cardGrande = document.getElementById(`infoVaga_${vaga.id}`);
                if (card && cardGrande) {
                    popUp(cardGrande, card);
                    inicializarCandidatura(cardGrande);
                }
        });
    }

    const barraPesquisa = document.getElementById("vaga_barraPesquisa");
        if (barraPesquisa) barraPesquisa.addEventListener("input", vagas_filtrar);

    vagas_filtrar();
}