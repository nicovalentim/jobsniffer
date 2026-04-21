const conteudoPagina = document.getElementById("pagina");
const navbar = document.querySelector(".navbar"); // Target ONLY the navbar

async function routeHandler(caminho) {
    switch (caminho) {
        case "":
        case "home":
            await carregarConteudo("/html/home.html", "home");
            break;
        case "sobre":
            await carregarConteudo("/html/sobre.html", "sobre");
            break;
        case "contato":
            await carregarConteudo("/html/contato.html", "contato");
            break;
        case "vagas":
            await carregarConteudo("/html/vagas.html", "vagas");
            break;
        case "cadastro":
            await carregarConteudo("/html/cadastro.html", "cadastro");
            break;
        default:
            console.log("Rota não mapeada:", caminho);
    }
}

async function carregarConteudo(fileUrl, type) {
    const resposta = await fetch(fileUrl);
    conteudoPagina.innerHTML = await resposta.text();

    const existeCSSVagas = document.querySelector('link[href="../css/vagas.css"]');

    if (type === "vagas" || type === "home") {
        const modulo = await import("./vagasImport.js");
        modulo.carregarVagas();

        if (!existeCSSVagas) {
            const estiloVagas = document.createElement('link');
            estiloVagas.rel = 'stylesheet';
            estiloVagas.href = '../css/vagas.css';

            document.head.appendChild(estiloVagas);
        }
    } else {
        existeCSSVagas?.remove();
    }

    // if (type === "cadastro" || type === "contato")
}

navbar.addEventListener("click", (e) => {
    const link = e.target.closest(".links");
    e.preventDefault();

    const path = link.getAttribute("href");
    routeHandler(path);
});

document.addEventListener("DOMContentLoaded", () => routeHandler("home"));