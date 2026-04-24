
let filtroAtual = {
    localizacao: [],
    regime: [],
    area: []
};

export function vagas_filtrar() {
    const busca = document.getElementById("vaga_barraPesquisa");
    const pequisa = busca ? busca.value.toLowerCase().trim(): "";
    const vagas = document.querySelectorAll(".vaga");

    vagas.forEach(vaga => {
        const localizacao = vaga.dataset.localizacao;
        const regime = vaga.dataset.regime;
        const area = vaga.dataset.area;
        const conteudo = vaga.textContent.toLowerCase();
        let visivel = true;

        if (
            pequisa !== ""
            && !conteudo.includes(pequisa)) {
            visivel = false;
        }

        if (filtroAtual.localizacao.length > 0 && !filtroAtual.localizacao.includes(localizacao)) {
            visivel = false;
        }
        if (filtroAtual.regime.length > 0 && !filtroAtual.regime.includes(regime)) {
            visivel = false;
        }
        if (filtroAtual.area.length > 0 && !filtroAtual.area.includes(area)) {
            visivel = false;
        }

        vaga.style.display = visivel ? "block" : "none";
    });
}

function vaga_verTodosFiltros() {
    const botaoTodos = document.querySelector('[data-filtro="todos"]');
    const selecionados = document.querySelectorAll('.filtro button.selecionado:not([data-filtro="todos"])');

    if (selecionados.length === 0) {
        botaoTodos.classList.add("selecionado");
    } else {
        botaoTodos.classList.remove("selecionado");
    }
}

document.addEventListener("click", (e) => {
    const botao = e.target.closest(".filtro button");

    if (!botao) return;

    if (botao.dataset.filtro === "todos") {
        filtroAtual.localizacao = [];
        filtroAtual.regime = [];
        filtroAtual.area = [];

        document.querySelectorAll(".filtro button").
            forEach(b => b.classList.remove("selecionado"));
        botao.classList.add("selecionado");

    } else {

        const botaoTodos = document.querySelector('[data-filtro="todos"]');
        if (botaoTodos) botaoTodos.classList.remove("selecionado");
        botao.classList.toggle("selecionado");

        function toggleFiltro(array, conteudo) {
            if (array.includes(conteudo)) {
                return array.filter(v => v !== conteudo);
            } else {
                return array.concat(conteudo);
            }
        }

    // Filtros
        if (botao.dataset.localizacao) {
            const conteudo = botao.dataset.localizacao.toLowerCase();
            filtroAtual.localizacao = toggleFiltro(filtroAtual.localizacao, conteudo);
        } else if (botao.dataset.regime) {
            const conteudo = botao.dataset.regime.toLowerCase();
            filtroAtual.regime = toggleFiltro(filtroAtual.regime, conteudo);
        } else if (botao.dataset.area) {
            const conteudo = botao.dataset.area.toLowerCase();
            filtroAtual.area = toggleFiltro(filtroAtual.area, conteudo);
        }
    }
    vaga_verTodosFiltros();
    vagas_filtrar();
});