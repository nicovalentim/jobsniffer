const backToTopBtn = document.getElementById("irAoTopo");

// faz o botão aparecer ou sumir dependendo de quanto o usuário scrollou
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { // Aparece depois de 300px scrollados
        backToTopBtn.classList.add("visible");
    } else {
        backToTopBtn.classList.remove("visible");
    }
});

// Joga pro topo devagarzinho (o smooth pra isso)
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});