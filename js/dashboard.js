import { graficosBarra, graficosLinha, graficosPizza, graficosRosca } from "./dashboardGraficos.js";

const barraLocal = document.querySelectorAll('.graficoBarra');
graficosBarra (
    [10, 10, 50, 80, 95, 2, 100],
    ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
    barraLocal,
    {
        padding: { bottom: 65, left: 50 },
        rotacionarX: 45
    }
);

const linhaLocal = document.querySelectorAll('.graficoLinha');
graficosLinha (
    [30, 20, 10, 40, 50, 80, 70],
    ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'],
    linhaLocal,
    {
        padding: { top: 30, bottom: 50 },
        rotacionarX: 0
    }
);

const pizzaLocal = document.querySelectorAll('.graficoPizza');
graficosPizza (
    [10, 20, 30, 40],
    pizzaLocal
);

const roscaLocal = document.querySelectorAll('.graficoRosca');
graficosRosca (
    [10, 20, 30],
    roscaLocal
);