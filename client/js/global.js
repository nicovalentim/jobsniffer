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

document.addEventListener("DOMContentLoaded", () => {
    const btnHamburger = document.getElementById("btnHamburger");
    const navMenu = document.getElementById("navMenu");

    if (btnHamburger && navMenu) {
        btnHamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("ativo");
        });
    }
});