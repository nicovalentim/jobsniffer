export { popUp } from "./globalPopups.js";

import "./globalPopups.js";
import "./globalAoTopo.js";
import "./globalRotas.js";
import "./chatbot.js";
import "./login.js";

import { temAlteracoesPendentes } from "./editarEstado.js";

// Supondo que você use um listener genérico para os links da navbar/redirecionamentos:
document.querySelectorAll(".navbar a, .links").forEach(link => {
    link.addEventListener("click", function(e) {
        // Se houver alterações pendentes no perfil, barra a troca de página interna
        if (temAlteracoesPendentes()) {
            const confirmarSaida = confirm("Você possui modificações não salvas no seu perfil. Deseja descartá-las e mudar de página?");
            if (!confirmarSaida) {
                e.preventDefault(); // Cancela o clique e mantém o usuário no perfil
                return false;
            }
        }
    });
});