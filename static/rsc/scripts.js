// importa as funções de login
import "./login.js";

// seleciona a parte aonde o conteúdo vai ser carregado
let conteudoPagina = document.getElementById("pagina");

// seleciona a navbar
const navbar = document.querySelector(".navbar");

// adiciona um evento de clique
navbar.addEventListener("click", function (e) {
  // verifica se o clique foi em um elemento com a classe "links"
  const link = e.target.closest(".links");

  if (link) {
    e.preventDefault();
    const targetUrl = link.getAttribute("href");

    // atualiza a URL no navegador sem recarregar a página inteira
    // window.history.pushState({}, "", targetUrl);

    carregarPagina(targetUrl);
  }
});

// carrega home.html da primeira vez
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "/") {
        carregarPagina("/home");
    } else {
        carregarPagina(window.location.pathname);
    }
});

async function carregarPagina(url) {
  const response = await fetch(url);
  const conteudoCarregado = await response.text();
  conteudoPagina.innerHTML = conteudoCarregado;

  // carregar o js caso seja a página de vagas
  if (url.includes("vagas")) {

    // importar o css de vagas se a url for pra vagas
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/static/rsc/vagas.css";
  
    document.head.appendChild(link);

    // importar o js de vagas se a url for pra vagas
    const modulo = await import("./importarVagas.js");
    modulo.carregar();
  }

// carregar js/css em caso de páginas de formulários
  if (url.includes("cadastro") || url.includes("contato") ) {
    // importar o css de formulário
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/static/rsc/forms.css";
  
    document.head.appendChild(link);

    // importar o js de formularios
    await import("./forms.js");
  }
}

const botaoAoTopo = document.getElementById("irAoTopo");

// faz o botão aparecer ou sumir dependendo de quanto o usuário scrollou
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) { // Aparece depois de 400px scrollados
        botaoAoTopo.classList.add("visible");
    } else {
        botaoAoTopo.classList.remove("visible"); // remove se o usuário subir
    }
});

// Joga pro topo devagarzinho (o smooth pra isso)
botaoAoTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});