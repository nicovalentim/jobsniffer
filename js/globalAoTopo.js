const botaoAoTopo = document.getElementById("irAoTopo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        botaoAoTopo.classList.add("visible");
    } else {
        botaoAoTopo.classList.remove("visible");
    }
});

botaoAoTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});