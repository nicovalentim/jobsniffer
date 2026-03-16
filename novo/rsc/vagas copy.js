// função de ler o json
async function carregarJSON() {
    const fetchJSON = await fetch("rsc/vagas.json");
    const objJSON = await fetchJSON.json(); // json pra objeto no javascript
    return objJSON.vagas; // objeto para arrays
}

const arraysJSON = await carregarJSON(); // guardar as arrays em uma variável

// contador de vagas
let contadorVaga = 0

// converte número para valor em texto
const tiposPresenca = [
    "Presencial",
    "Híbrido",
    "100% remoto"
];

const tiposTempo = [
    "Meio-período",
    "Período Integral"
];

while (arraysJSON.length > contadorVaga) {
    const vaga = arraysJSON[contadorVaga];

    let presenca = tiposPresenca[vaga.presenca] ?? "Tipo de presença não registrado.";
    let tempoDeTrabalho = tiposTempo[vaga.tempo] ?? "Período não cadastrado.";

    let descNaPagina = vaga.descricao
    if (descNaPagina.length > 300) {
        descNaPagina = descNaPagina.substring(0,300) + "(...)";
    }

    // traduzir esses dados pra html
    const textoHTML = `
    <hr />

    <section class="tituloVaga">
        <h1>${vaga.nome}</h1>
        <button class="filtro">
        <img src="icon/mapa.png" />
        ${presenca}
        </button>
        <button class="filtro">
        <img src="icon/relogio.png" />
        ${tempoDeTrabalho}
        </button>
    </section>

    <section class="textoVaga">
        Empresa: ${vaga.empresa}<br />
        Local: ${vaga.local}<br />
        Salário: R$ ${vaga.salario}<br /><br />
        ${descNaPagina}
    </section>

    <section class="botadoCandidatar">
        <a>
        Quero me candidatar!
        </a>
    </section>`;

    // função para importar as vagas na página
        document.getElementById("vaga").innerHTML += textoHTML;
        contadorVaga += 1
}