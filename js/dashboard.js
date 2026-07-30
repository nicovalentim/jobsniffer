import { graficosBarra, graficosLinha, graficosPizza, graficosRosca } from "./dashboardGraficos.js";
import { dashboardBanco, dashboardCandidaturasArea, dashboardDados, dashboardMediaArea } from "./dashboardBanco.js";

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

    const usuariosTotal = document.getElementById("usuariosTotal");
        usuariosTotal.innerText = dados.usuarios.length + "²";
    const mediaSalarial = document.getElementById("mediaSalarial");
        const salarios = dados.vagas.map(vaga => vaga.salario).filter(salario => salario > 0);
        const media = salarios.reduce((acc, curr) => acc + curr, 0) / salarios.length;
        mediaSalarial.innerText = `R$ ${media.toFixed(2)}`;
    const folhaPagamento = document.getElementById("folhaPagamento");
        const folha = salarios.reduce((acc, curr) => acc + curr, 0);
        folhaPagamento.innerText = `R$ ${folha.toFixed(2)}`;
    const graficoSalario = document.getElementById("graficoSalario");
    if (graficoSalario) {
        const dadosSalarioArea = dashboardMediaArea(dados.vagas);
        graficosLinha(
            dadosSalarioArea.valores,
            dadosSalarioArea.rotulos,
            graficoSalario,
            {
                padding: { top: 30, bottom: 65, left: 50, right: 20 },
                rotacionarX: 45
            }
        );
    }

    const candidaturasRealizadas = document.getElementById("candidaturasRealizadas");
        candidaturasRealizadas.innerText = dados.candidaturas.length;
    const candidaturasMesPassado = document.getElementById("candidaturasMesPassado");
        const mesPassado = new Date();
        mesPassado.setMonth(mesPassado.getMonth() - 1);
        const candidaturasMesAnterior = dados.candidaturas.filter(candidatura => {
            const dataCandidatura = new Date(candidatura.data);
            return dataCandidatura.getMonth() === mesPassado.getMonth() && dataCandidatura.getFullYear() === mesPassado.getFullYear();
        });
        candidaturasMesPassado.innerText = candidaturasMesAnterior.length;
    const vagasMesPassado = document.getElementById("vagasMesPassado");
        const vagasMesAnterior = dados.vagas.filter(vaga => {
            const dataVaga = new Date(vaga.data);
            return dataVaga.getMonth() === mesPassado.getMonth() && dataVaga.getFullYear() === mesPassado.getFullYear();
        });
        vagasMesPassado.innerText = vagasMesAnterior.length;
    const graficoCandidaturasArea = document.getElementById("graficoCandidaturasArea");
    if (graficoCandidaturasArea) {
        const dadosCandidaturasArea = dashboardCandidaturasArea(
            dados.candidaturas, 
            dados.vagas
        );
        graficosRosca(
            dadosCandidaturasArea.valores,
            graficoCandidaturasArea,
            dadosCandidaturasArea.rotulos
        );
    }

        const teste = await dashboardBanco(email);
        if (!teste) return;
        console.log("Exemplo do servidor:", dados.vagas.salario);
}