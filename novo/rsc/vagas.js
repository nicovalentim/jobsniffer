async function iniciar() {

    // função de ler o json
    async function carregarJSON() {
        const fetchJSON = await fetch("/vagas");
        const objJSON = await fetchJSON.json();
        return objJSON.vagas;
    }

    const arraysJSON = await carregarJSON();

    let contadorVaga = 0;

    do {

        let presenca = ""
        if (arraysJSON[contadorVaga].presenca == 0) {
            presenca = "Presencial"
        } else if (arraysJSON[contadorVaga].presenca == 1) {
            presenca = "Híbrido"
        } else if (arraysJSON[contadorVaga].presenca == 2) {
            presenca = "100% remoto"
        } else {
            presenca = "Tipo de presença não registrada no banco de dados."
        }

        let tempoDeTrabalho = ""
        if (arraysJSON[contadorVaga].tempo == 0) {
            tempoDeTrabalho = "Meio-período"
        } else if (arraysJSON[contadorVaga].tempo == 1) {
            tempoDeTrabalho = "Período Integral"
        } else {
            tempoDeTrabalho = "Não foi cadastrado o período dessa vaga."
        }

        const textoHTML = `
        <hr />

        <section class="tituloVaga">
            <h1>${arraysJSON[contadorVaga].nome}</h1>
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
            Empresa: ${arraysJSON[contadorVaga].empresa}<br />
            Local: ${arraysJSON[contadorVaga].local}<br />
            Salário: R$ ${arraysJSON[contadorVaga].salario}<br /><br />
            ${arraysJSON[contadorVaga].descricao}
        </section>

        <section class="botadoCandidatar">
            <a>
            Quero me candidatar!
            </a>
        </section>`;

        document.getElementById("vaga").innerHTML += textoHTML;

        contadorVaga += 1

    } while (arraysJSON.length > contadorVaga)

}

iniciar();
