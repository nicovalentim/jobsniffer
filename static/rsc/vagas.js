const container = document.getElementById("vaga")

async function carregar(url = "/db/vagas") {

    const res = await fetch(url)
    const dados = await res.json()

    container.innerHTML = ""

    dados.vagas.forEach(vaga => {

        const tiposPresenca = ["Presencial", "Híbrido", "100% remoto"]
        const tiposTempo = ["Meio-período", "Período Integral"]

        let descricao = vaga.descricao
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + "(...)"
        }

        container.innerHTML += `
        <hr>
        <h2>${vaga.nome}</h2>
        <p>${vaga.empresa}</p>
        <p>${tiposPresenca[vaga.presenca]}</p>
        <p>${tiposTempo[vaga.tempo]}</p>
        <p>${descricao}</p>
        `
    })
}

document.querySelectorAll(".filtro").forEach(botao => {

    botao.onclick = () => {

        let url = "/db/vagas"

        if (botao.dataset.presenca) {
            url = "/db/vagas?tipo=" + botao.dataset.presenca
        }

        if (botao.dataset.tempo) {
            url = "/db/vagas?tempo=" + botao.dataset.tempo
        }

        if (botao.dataset.filtro === "todos") {
            url = "/db/vagas"
        }

        carregar(url)
    }
})

carregar()