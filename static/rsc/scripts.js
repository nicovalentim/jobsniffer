// menu popup
const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementByClass("menu");

botaoMenu.onclick = () => {
    menu.classList.toggle("menuClicado");
};

// botão que volta ao topo
