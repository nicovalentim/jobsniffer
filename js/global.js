export { popUp } from "./globalPopups.js";

import "./globalPopups.js";
import "./globalAoTopo.js";
import "./globalRotas.js";
import "./chatbot.js";
import "./login.js";

import { temAlteracoesPendentes, limparAlteracoes } from "./editarDOM.js";

document.querySelectorAll(".navbar a, .links").forEach(link => {
    link.addEventListener("click", function(e) {
        if (temAlteracoesPendentes()) {
            const confirmarSaida = confirm("Você possui modificações não salvas no seu perfil. Deseja descartá-las e mudar de página?");
            if (!confirmarSaida) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            } else {
                limparAlteracoes();
            }
        }
    });
});

/*
const admin = localStorage.getItem("tipo") === "admin";
const usuario = localStorage.getItem("tipo") === "usuario";
let nomeLogado = document.getElementById("nomeLogado")

admin ?
    nomeLogado.innerHTML ="admin"
    : null;
usuario ?
    nomeLogado.innerHTML = "<a href="#" id="usuarioNome" class="perfil">Usuário</a>";
    : null;
    */