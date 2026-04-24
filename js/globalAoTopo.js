const irAoTopo = document.getElementById("irAoTopo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        irAoTopo.classList.add("visible");
    } else {
        irAoTopo.classList.remove("visible");
    }
});

irAoTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});