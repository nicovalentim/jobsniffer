// ARRUMAR E COMENTAR ISSO AQUI







// importa a função de filtrar de outro arquivo (pra facilitar não ter que colocar dois script no html)
import "./filtros.js";

// seleciona o lugar aonde vai jogar os posts (aonde as vagas vão aparecer)
const container = document.getElementById("posts")

// carrega a URL do DB, "/vagas" na verdade é re-roteado via python para o diretório correto
export async function carregar(url = "/vagas") {

    const dados = await buscarVagas(url);

    container.innerHTML = ''

    dados.vagas.forEach(vaga => {

        const tiposPresenca = ["Presencial", "Híbrido", "100% remoto"]
        const tiposTempo = ["Meio-período", "Período Integral"]

        let descricao = vaga.descricao
        if (descricao.length > 360) {
            descricao = descricao.substring(0, 360) + " (...)"
        }

//const nomeDaArea = <class="areaVaga">

//switch (nomeDaArea) {
//  case "Administrativo":
//      document.getElementbyClass("nomeDaArea").style.filter = "filter: hue-rotate(0deg)";
//      break;
//  case "Marketing":
//      document.getElementbyClass("nomeDaArea").style.filter = "filter: hue-rotate(72deg)";
//      break;
//  case "Comercial / Vendas":
//      document.getElementbyClass("nomeDaArea").style.filter = "filter: hue-rotate(144deg)";
//      break;
//  case "Logística":
//      document.getElementbyClass("nomeDaArea").style.filter = "filter: hue-rotate(216deg)";
//      break;
//  case "Engenharia":
//      document.getElementbyClass("nomeDaArea").style.filter = "filter: hue-rotate(288deg)";
//      break;
//  default:
//      document.getElementbyClass("nomeDaArea").style.filter = "filter: saturate(0)";
//}

    container.innerHTML += `
        <section class="vaga">
        <section class="tituloVaga">
        
            <p class="areaVaga"></p>


            <h1>${vaga.nome}</h1>
        </section>

        <section class="textoVaga">
            Empresa: ${vaga.empresa}<br /><br />
            ${descricao}
        </section>

        <hr />
        <button class="naVaga">${tiposPresenca[vaga.presenca]}</button>
        <button class="naVaga">Meio Período</button>
        </section>
        `
    })

    filtrarVagas();
}

carregar();