// função de ler o json
async function carregarJSON() { // descobri, o async/await espera terminar de executar a linha antes de ir pra próxima, então não retorna vazio
    const fetchJSON = await fetch("https://nicovalentim.github.io/teste/vagas.json"); // não tava carregando arquivo local, não sei pq
    const dados = await fetchJSON.json(); // converter de json pra objeto no javascript
    return dados.vagas; //pra pegar os dados do objeto e transformar em arrays
}

const vagas = await carregarJSON(); // guardar as arrays em uma variável

// função de listar e contar dados da array (pra ter um limite de quanto carrega)
let vagasMostradas = 0

// função de traduzir esses dados pra html
// função de importar esses dados no html da página
vagasMostradas++ // depois de carregar os dados de uma vaga

// função de parar de importar caso não haja mais vagas
if (vagasMostradas >= vagas.length) {
    console.log("Não há mais vagas para carregar")
}

//debug das linhas acima
console.log(vagas[0].descricao); // pegar a descrição da primeira vaga na lista
console.log(vagas.length); // ver quantas vagas estão cadastradas