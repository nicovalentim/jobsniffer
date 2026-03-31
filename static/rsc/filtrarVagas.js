// valores iniciais das variáveis dentro de um array
let filtroAtual = {
    localizacao: [],
    regime: [],
    area: []
};

// função de filtrar
export function filtrarVagas() {
    // buscar a ID da barra de busca
    const busca = document.getElementById("buscarVaga");

    // transforma o texto digitado em lowercase
    const texto = busca.value.toLowerCase().trim();
    // pesquisa dentro de tudo com classe/id ("")
    const vagas = document.querySelectorAll(".vaga");

    // loopa pelas vagas procurando data-set igual ao conteúdo
    vagas.forEach(vaga => {
        const localizacao = vaga.dataset.localizacao;
        const regime = vaga.dataset.regime;
        const area = vaga.dataset.area;
        const conteudo = vaga.textContent.toLowerCase();
        let visivel = true;

        // esconde conteúdo diferente (!) do que foi pesquisado
        if (!conteudo.includes(texto)) {
            visivel = false;
        }

        // esconde conteúdo (!) que NÃO inclua o dataset da categoria
            if (filtroAtual.localizacao.length > 0 && !filtroAtual.localizacao.includes(localizacao)) { // filtra por presença
                    visivel = false;
                }
            if (filtroAtual.regime.length > 0 && !filtroAtual.regime.includes(regime)) { // filtra por tempo de trabalho 
                    visivel = false;
                }
            if (filtroAtual.area.length > 0 && !filtroAtual.area.includes(area)) { // filtr por área da vaga
                    visivel = false;
                }

        // se falhar qualquer um desses "ifs", esconde na tela
        vaga.style.display = visivel ? "block" : "none";
    });
}

// seleciona o elemento com id "buscarVaga" no html
const buscaInput = document.getElementById("buscarVaga");

if (buscaInput) {
    // faz o evento "filtrarVagas" acontecer quando há um input dentro da barra de pesquisa
    buscaInput.addEventListener("input", filtrarVagas);
}

// função para fazer o botão "Ver Todos" ficar com ou sem a classe "selecionado" dependendo dos outros botões na página
function atualizarTodosBotoes() {
    // seleciona botão com o atributo dentro de ('[]')
    const botaoTodos = document.querySelector('[data-filtro="todos"]');
    // seleciona botão sem o atributo class filtro dentro da tag button dentro da class selecionado (que não for o botão acima)
    const selecionados = document.querySelectorAll('.filtro button.selecionado:not([data-filtro="todos"])');

    // se não houverem botões com essa classe (=== 0)
    if (selecionados.length === 0) {
        botaoTodos.classList.add("selecionado");
    // se houverem
    } else {
        botaoTodos.classList.remove("selecionado");
    }
}

// quando um clique acontece no documento, executa a função inteira
document.addEventListener("click", (e) => {
    // "botao" é a variável que está na tag "button" dentro da classe "menu"
    const botao = e.target.closest(".filtro button");

    // se o clique não foi em um botão de filtro, ignora o restante do código
    if (!botao) return;

    // reseta os filtros se clicar no "Ver tudo"
    if (botao.dataset.filtro === "todos") {

        // esvazia as variáveis
        filtroAtual.localizacao = [];
        filtroAtual.regime = [];
        filtroAtual.area = [];

        // seleciona os botões (<button>) na classe "filtro"
        document.querySelectorAll(".filtro button").
            // loopa entre todos os botões dessa classe pra remover a classe "selecionado"
            forEach(b => b.classList.remove("selecionado"));
        // adiciona a classe "selecionado" pro botão clicado
        botao.classList.add("selecionado");
    } else {
        const botaoTodos = document.querySelector('[data-filtro="todos"]');
        // se clicar outro botão, o "ver tudo", remove classe "selecionado" dele
        if (botaoTodos) botaoTodos.classList.remove("selecionado");

        // tira/coloca a classe "selecionado" quando clicar no botão
        botao.classList.toggle("selecionado");

        // adiciona ou remove ("""") dos botões
        // pega a lista de filtros ativos e o botão que foi clicado
        // ex: toggleFiltro(filtros ativos,filtros do botão clicado) {
        function toggleFiltro(array, conteudo) {
            // confirma se o filtro já foi clicado
            if (array.includes(conteudo)) {
                // remove o filtro se já foi clicado
                return array.filter(v => v !== conteudo);
            } else {
                // adiciona o filtro clicado pra lista de filtros ativos
                return array.concat(conteudo);
            }
        }

    // Filtros
        // afeta elementos dentro da tag definida acima com "data-localizacao"
        if (botao.dataset.localizacao) {
            // pega o conteudo escrito em "data-localizacao", deixa em minúscula e grava como filtro
            const conteudo = botao.dataset.localizacao.toLowerCase();
            filtroAtual.localizacao = toggleFiltro(filtroAtual.localizacao, conteudo);
        // afeta elementos dentro da tag definida acima com "data-regime"
        } else if (botao.dataset.regime) {
            const conteudo = botao.dataset.regime.toLowerCase();
            filtroAtual.regime = toggleFiltro(filtroAtual.regime, conteudo);
        // afeta elementos dentro da tag definida acima com "data-area"
        } else if (botao.dataset.area) {
            const conteudo = botao.dataset.area.toLowerCase();
            filtroAtual.area = toggleFiltro(filtroAtual.area, conteudo);
        }
    }
    atualizarTodosBotoes();
    filtrarVagas();
});