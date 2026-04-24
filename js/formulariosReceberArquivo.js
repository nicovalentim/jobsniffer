const cadastro_arqReceber = document.getElementById("cadastro_arqReceber");
const cadastro_arqRecebido = document.getElementById("cadastro_arqRecebido");
const cadastro_arqNome = cadastro_arqReceber.querySelector(".cadastro_arqNome");
const cadastro_arqNomePadrao = cadastro_arqReceber.querySelector(".cadastro_arqNomePadrao");
const cadastro_arqApaga = document.getElementById("cadastro_arqApaga");

function cadastro_arqAtualiza(file) {
    cadastro_arqNomePadrao.style.display = "none";
    cadastro_arqNome.textContent = file.name;
}

cadastro_arqRecebido.addEventListener("change", function() {
    if (cadastro_arqRecebido.files.length > 0) {
        cadastro_arqAtualiza(cadastro_arqRecebido.files[0]);
    }
});
    cadastro_arqReceber.addEventListener("click", function() {
        cadastro_arqRecebido.click();
    });

    cadastro_arqReceber.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    cadastro_arqReceber.addEventListener("drop", function(e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        if (file) {
            cadastro_arqRecebido.files = e.dataTransfer.files;
            cadastro_arqAtualiza(file);
        }
    });

cadastro_arqApaga.addEventListener("click", function() {
    cadastro_arqRecebido.value = "";
    cadastro_arqNome.textContent = "";
    cadastro_arqNomePadrao.style.display = "inline";
});