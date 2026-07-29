import { graficosBarra, graficosLinha, graficosPizza, graficosRosca } from "./dashboardGraficos.js";
import { dashboardBanco, dashboardDados } from "./dashboardBanco.js";

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

    const vagasTotal = document.getElementById("vagasTotal");
        vagasTotal.innerText = dados.vagas.length;
    const usuariosTotal = document.getElementById("usuariosTotal");
        usuariosTotal.innerText = dados.usuarios.length + "*";
    const vagasAreaPop = document.getElementById("vagasAreaPop");
        const dadosArea = dashboardDados(dados.vagas, 'area');
            let indiceMaisPopular = 0;
            let maxVagas = 0;
        dadosArea.valores.forEach((quantidade, index) => {
            if (quantidade > maxVagas) {
                maxVagas = quantidade;
                indiceMaisPopular = index;
            }
        });
        const vagasPopSigla = dadosArea.rotulos[indiceMaisPopular];
        let vagasPop;
            switch (vagasPopSigla) {
                case "ADM":
                    vagasPop = "Administração";
                    break;
                case "COM":
                    vagasPop = "Comércio";
                    break;
                case "ENG":
                    vagasPop = "Engenharia";
                    break;
                case "LOG":
                    vagasPop = "Logística";
                    break;
                case "MKT":
                    vagasPop = "Marketing";
                    break;
                case "TI":
                    vagasPop = "Tecnologia da Informação";
                    break;
                default:
                    vagasPop = "Não definido.";
            }
        vagasAreaPop.innerText = `${vagasPop} \n (${maxVagas} vagas)`;

    const vagaAreasRosca = document.getElementById("graficoVagasAreas");
    if (vagaAreasRosca) {
        const dadosArea = dashboardDados(dados.vagas, 'area');
            graficosRosca(
                dadosArea.valores, 
                vagaAreasRosca,
                dadosArea.rotulos
            );
    }
        const vagaRegimePizza = document.getElementById("graficoVagasRegime");
        if (vagaRegimePizza) {
            const dadosRegime = dashboardDados(dados.vagas, 'regime');
            graficosRosca(
                dadosRegime.valores, 
                vagaRegimePizza,
                dadosRegime.rotulos
            );
        }
        const vagasLocalizacaoPizza = document.getElementById("graficoVagasLocalizacao");
        if (vagasLocalizacaoPizza) {
            const dadosPresenca = dashboardDados(dados.vagas, 'localizacao');
                graficosRosca(
                    dadosPresenca.valores, 
                    vagasLocalizacaoPizza,
                    dadosPresenca.rotulos
                );
        }

        const teste = await dashboardBanco(email);
        if (!teste) return;
        
        // ADICIONE ESTE LOG PARA INSPECIONAR OS CAMPOS DA VAGA:
        console.log("Exemplo do servidor:", dados.usuarios[0]);

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
}