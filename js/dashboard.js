import { graficosBarra, graficosLinha, graficosPizza, graficosRosca } from "./dashboardGraficos.js";
import { dashboardBanco } from "./dashboardBanco.js";
import { dashboardDados } from "./dashboardDados.js";

export async function graficos() {
    const admin = localStorage.getItem("tipo") === "admin";
        if (!admin) {
            alert("Acesso negado. Esta página é restrita para administradores.");
            window.location.href = "login.html";
            return;
        }
    const email = localStorage.getItem('email'); 
    const dados = await dashboardBanco(email);
    if (!dados) return;

    const barraLocal = document.querySelectorAll('.graficoBarra');
    if (barraLocal.length > 0) {
        graficosBarra (
            [10, 10, 50, 80, 95, 2],
            ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            barraLocal,
            {
                padding: { bottom: 65, left: 50 },
                rotacionarX: 45
            }
        );
    }

    const linhaLocal = document.querySelectorAll('.graficoLinha');
    if (linhaLocal.length > 0) {
        graficosLinha (
            [30, 20, 10, 40, 50, 80, 70],
            ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'],
            linhaLocal,
            {
                padding: { top: 30, bottom: 50 },
                rotacionarX: 0
            }
        );
    }

    const pizzaLocal = document.querySelectorAll('.graficoPizza');
    if (pizzaLocal.length > 0) {
        graficosPizza (
            [10, 20, 30, 40, 10, 20, 50],
            pizzaLocal,
            ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"]
        );
    }

    const roscaLocal = document.querySelectorAll('.graficoRosca');
    if (roscaLocal.length > 0) {
        graficosRosca (
            [10, 20, 30],
            roscaLocal
        );
    }

    const areasRosca = document.getElementById("areas");
    if (areasRosca) {
        const dadosArea = dashboardDados(dados.vagas, 'area');
            graficosRosca(
                dadosArea.valores, 
                areasRosca, 
                dadosArea.rotulos
            );
    }
}