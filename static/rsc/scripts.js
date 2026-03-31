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

// Login
const loginBtn = document.getElementById("loginBtn");
const menu = document.getElementById("loginMenu");

const telaLogin = document.getElementById("telaLogin");
const telaSenha = document.getElementById("telaSenha");
const telaCadastro = document.getElementById("telaCadastro");

const voltarBtn = document.getElementById("voltarBtn");

const esqueceu = document.getElementById("esqueceu");
const cadastrar = document.getElementById("cadastrar");

const entrarBtn = document.getElementById("entrarBtn");
const cadastrarBtn = document.getElementById("cadastrarBtn");
const alterarBtn = document.getElementById("alterarBtn");

const loginEmail = document.getElementById("loginEmail");
const loginSenha = document.getElementById("loginSenha");

const cadEmail = document.getElementById("cadEmail");
const senhaCadastro = document.getElementById("senhaCadastro");
const novaSenha = document.getElementById("novaSenha");

const erroEmail = document.getElementById("erroEmail");

/* erro visual */
function mostrarErro(input){
  input.classList.remove("erro");
  void input.offsetWidth;
  input.classList.add("erro");

  setTimeout(() => input.classList.remove("erro"), 500);
}

/* abrir menu */
loginBtn.onclick = (e) => {
  e.stopPropagation();
  menu.style.display = "block";
  loginBtn.classList.add("ativo");

  voltarBtn.style.display = "none";

  telaLogin.style.display = "flex";
  telaSenha.style.display = "none";
  telaCadastro.style.display = "none";

  loginEmail.value = "";
  loginSenha.value = "";
};

/* fechar menu */
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && e.target !== loginBtn){
    menu.style.display = "none";
    loginBtn.classList.remove("ativo");
  }
});

/* trocar telas */
esqueceu.onclick = () => {
  telaLogin.style.display = "none";
  telaSenha.style.display = "flex";
  voltarBtn.style.display = "block";
};

cadastrar.onclick = () => {
  telaLogin.style.display = "none";
  telaCadastro.style.display = "flex";
  voltarBtn.style.display = "block";
};

voltarBtn.onclick = () => {
  telaSenha.style.display = "none";
  telaCadastro.style.display = "none";
  telaLogin.style.display = "flex";
  voltarBtn.style.display = "none";
};

/* validação senha */
function senhaValida(s){
  if (s.length < 6) return false;
  if (!/[A-Z]/.test(s)) return false;
  if (!/[a-z]/.test(s)) return false;
  if (!/[0-9]/.test(s)) return false;
  return true;
}

/* regras ficam verde quando certas */
function validarRegras(senha, ids){
  const regras = [
    senha.length >= 6,
    /[A-Z]/.test(senha),
    /[a-z]/.test(senha),
    /[0-9]/.test(senha)
  ];

  regras.forEach((ok, i) => {
    const el = document.getElementById(ids[i]);
    if(ok){
      el.classList.add("valido");
    } else {
      el.classList.remove("valido");
    }
  });
}

/* cadastro */
cadastrarBtn.onclick = () => {
  const emailSalvo = localStorage.getItem("email");

  if(!cadEmail.value || !senhaCadastro.value){
    mostrarErro(cadEmail);
    mostrarErro(senhaCadastro);
    return;
  }

  if(cadEmail.value === emailSalvo){
    mostrarErro(cadEmail);
    erroEmail.style.display = "block";
    return;
  } else {
    erroEmail.style.display = "none";
  }

  if(!senhaValida(senhaCadastro.value)){
    mostrarErro(senhaCadastro);
    return;
  }

  localStorage.setItem("email", cadEmail.value);
  localStorage.setItem("senha", senhaCadastro.value);

  alert("Cadastro realizado!");
  telaCadastro.style.display = "none";
  telaLogin.style.display = "flex";
  voltarBtn.style.display = "none";
};

/*  login */
entrarBtn.onclick = () => {
  const emailSalvo = localStorage.getItem("email");
  const senhaSalva = localStorage.getItem("senha");

  if(loginEmail.value === emailSalvo && loginSenha.value === senhaSalva){
    alert("Login realizado!");
    menu.style.display = "none";
    loginBtn.classList.remove("ativo");
    loginEmail.value = "";
    loginSenha.value = "";
  } else {
    mostrarErro(loginEmail);
    mostrarErro(loginSenha);
  }
};

/* alterar senha */
alterarBtn.onclick = () => {
  if(!novaSenha.value){
    mostrarErro(novaSenha);
    return;
  }

  if(!senhaValida(novaSenha.value)){
    alert("Senha inválida");
    mostrarErro(novaSenha);
    return;
  }

  localStorage.setItem("senha", novaSenha.value);
  alert("Senha alterada!");
  telaSenha.style.display = "none";
  telaLogin.style.display = "flex";
  voltarBtn.style.display = "none";
};

/* regras dinâmicas */
document.addEventListener("input", (e) => {
  if(e.target.id === "senhaCadastro"){
    validarRegras(e.target.value, ["r1","r2","r3","r4"]);
  }

  if(e.target.id === "novaSenha"){
    validarRegras(e.target.value, ["a1","a2","a3","a4"]);
  }

  if(e.target.id === "cadEmail"){
    erroEmail.style.display = "none";
  }
});

// função extra pra funcionar com a tecla "enter" também
menu.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Vê qual tela está aparecendo pro enter não fazer as 3 ao mesmo tempo
    if (telaLogin.style.display === "flex") {
      entrarBtn.click();
    } else if (telaSenha.style.display === "flex") {
      alterarBtn.click();
    } else if (telaCadastro.style.display === "flex") {
      cadastrarBtn.click();
    }
  }
});