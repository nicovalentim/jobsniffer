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
botaoAoTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});