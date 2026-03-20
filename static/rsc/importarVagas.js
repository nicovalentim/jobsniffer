// importa a função de filtrar de outro arquivo (pra facilitar não ter que colocar dois script no html)
import "./filtrarVagas.js";

// seleciona o lugar aonde vai jogar os posts (aonde as vagas vão aparecer)
const container = document.getElementById("posts")

// carrega a URL do DB, "/vagas" na verdade é re-roteado via python para o diretório correto
export async function carregar(url = "/vagas") {

    const dados = await buscarVagas(url);

    let conteudo = "";
    container.innerHTML = ''

    // loopa cada elemento no banco de dados para procurar informações das vagas
    dados.vagas.forEach(vaga => {
        // transforma variáveis inteiras em texto para ser exibido
        const tiposPresenca = ["Presencial", "Híbrido", "100% remoto"]
        const tiposTempo = ["Meio-período", "Período Integral"]

        // reduz a quantidade de caracteres na tela (pra não mostrar tudo da vaga na página de ver todas elas)
        let descricao = vaga.descricao
        if (descricao.length > 360) {
            descricao = descricao.substring(0, 360) + " (...)"
        }

    // cria o conteúdo com o layout da página
    conteudo += `
    <section class="vaga"
        data-presenca="${vaga.presenca}"
        data-tempo="${vaga.tempo}"
        data-area="${vaga.area}">
            <section class="tituloVaga">
                <!-- essa data-area dentro do p ajuda o CSS a criar image de fundo -->
                <p class="areaVaga" data-area="${vaga.area}">${vaga.area}</p>
                <h1>${vaga.nome}</h1>
            </section>

            <section class="textoVaga">
                Empresa: ${vaga.empresa}<br><br>
                ${descricao}
            </section>
            <hr />
            <button class="naVaga">${tiposPresenca[vaga.presenca]}</button>
            <button class="naVaga">${tiposTempo[vaga.tempo]}</button>
    </section>
        `
    });

    // adiciona todo o conteúdo criado para a página html de uma vez só
    container.innerHTML = conteudo

    filtrarVagas();
}
carregar();