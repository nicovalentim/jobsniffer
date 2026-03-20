// valores iniciais das variáveis dentro de um array
let filtroAtual = {
    presenca: [],
    tempo: [],
    area: []
};

// barra de pesquisa
    // seleciona a barra de pesquisa dentro do documento HTML
    const busca = document.getElementById("buscarVaga");

    // roda a função filtrarVagas() quando algo (input) acontece com a barra de pesquisa (busca)
    if (busca) {
        busca.addEventListener("input", filtrarVagas);
    }

function atualizarBotaoTodos() {
    const botaoTodos = document.querySelector('[data-filtro="todos"]');
    const selecionados = document.querySelectorAll('.menu button.selecionado:not([data-filtro="todos"])');
    if (!botaoTodos) return;

    if (selecionados.length === 0) {
        botaoTodos.classList.add("selecionado");
    } else {
        botaoTodos.classList.remove("selecionado");
    }
}

// quando um clique acontece no documento, executa a função inteira
document.addEventListener("click", (e) => {
    // "botao" é a variável que está na tag "button" dentro da classe "menu"
    const botao = e.target.closest(".menu button");
    if (!botao) return;

    // reseta os filtros se clicar no "Ver tudo"
    if (botao.dataset.filtro === "todos") {
        filtroAtual.presenca = [];
        filtroAtual.tempo = [];
        filtroAtual.area = [];

        // remove seleção visual de todos
        document.querySelectorAll(".menu button").forEach(btn => btn.classList.remove("selecionado"));
        botao.classList.add("selecionado");
        filtrarVagas();
        return;
    }

    // tira a classe "selecionado" do botão  "Ver tudo"
    const botaoTodos = document.querySelector('[data-filtro="todos"]');
    if (botaoTodos) botaoTodos.classList.remove("selecionado");

    // tira/coloca a classe "selecionado" quando clicar no botão
    botao.classList.toggle("selecionado");

    // função para lidar com os arrys que eu criei
    function toggleFiltro(array, conteudo) {
        if (array.includes(conteudo)) {
            return array.filter(v => v !== conteudo);
        } else {
            return [...array, conteudo];
        }
    }

// Filtros
    // afeta elementos dentro da tag definida acima com "data-presenca"
    if (botao.dataset.presenca) {
        // pega o conteudo escrito em "data-presenca", deixa em minúscula e grava como filtro
        const conteudo = botao.dataset.presenca.toLowerCase();
        filtroAtual.presenca = toggleFiltro(filtroAtual.presenca, conteudo);
    // afeta elementos dentro da tag definida acima com "data-tempo"
    } else if (botao.dataset.tempo) {
        const conteudo = botao.dataset.tempo.toLowerCase();
        filtroAtual.tempo = toggleFiltro(filtroAtual.tempo, conteudo);
    // afeta elementos dentro da tag definida acima com "data-area"
    } else if (botao.dataset.area) {
        const conteudo = botao.dataset.area.toLowerCase();
        filtroAtual.area = toggleFiltro(filtroAtual.area, conteudo);
    }

    // executa o filtro das coisas na tela 
    filtrarVagas();
    // executa a função de pintar o botão "ver tudo" quando nada está selecionado
    atualizarBotaoTodos();
});

// função de filtrar
function filtrarVagas() {
    // buscar a ID da barra de busca
    const busca = document.getElementById("buscarVaga");
    // transforma o texto digitado em lowercase
    const texto = busca.value.toLowerCase().trim();
    // pesquisa dentro de tudo com classe/id ("")
    const vagas = document.querySelectorAll(".vaga");

    // loopa pelas vagas procurando data-set igual ao conteúdo
    vagas.forEach(vaga => {
        const presenca = vaga.dataset.presenca;
        const tempo = vaga.dataset.tempo;
        const area = vaga.dataset.area;
        const conteudo = vaga.textContent.toLowerCase(); // 🔥 FIX
        let visivel = true;

        // esconde conteúdo diferente (!) do que foi pesquisado
        if (!conteudo.includes(texto)) { // 🔥 FIX
            visivel = false;
        }

        // esconde conteúdo (!) que NÃO inclua o dataset da categoria
        if (filtroAtual.presenca.length > 0) {
            if (!filtroAtual.presenca.includes(presenca)) {  // filtra por presença
                visivel = false;
            }
        }
        if (filtroAtual.tempo.length > 0) {
            if (!filtroAtual.tempo.includes(tempo)) { // filtra por tempo de trabalho 
                visivel = false;
            }
        }
        if (filtroAtual.area.length > 0) { // filtr por área da vaga
            if (!filtroAtual.area.includes(area)) {
                visivel = false;
            }
        }

        // muda o estilo de "display" das vagas para escondê-las
        vaga.style.display = visivel ? "" : "none";
    });
}