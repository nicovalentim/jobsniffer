const irAoTopo = document.getElementById("irAoTopo");

window.addEventListener("scroll", () => {
    (window.scrollY > 300) ?
        irAoTopo.classList.add("visible") :
        irAoTopo.classList.remove("visible");
});

irAoTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});