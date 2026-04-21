var receberArquivo = document.getElementById("receberArquivo");
var arquivoRecebido = document.getElementById("arquivoRecebido");
var nomeAparece = receberArquivo.querySelector(".nomeAparece");
var texto = receberArquivo.querySelector(".texto");
var apagarCV = document.getElementById("apagarCV");

// clicar para abrir o explorador de arquivos
receberArquivo.addEventListener("click", function() {
    arquivoRecebido.click();
});

// só adiciona o primeiro arquivo de um grupo/array
arquivoRecebido.addEventListener("change", function() {
    if (arquivoRecebido.files.length > 0) {
        updateUI(arquivoRecebido.files[0]);
    }
});

// arrastar o arquvio na tela
receberArquivo.addEventListener("dragover", function(e) {
    e.preventDefault();
});

receberArquivo.addEventListener("drop", function(e) {
    e.preventDefault();

    var file = e.dataTransfer.files[0];
    if (file) {
        arquivoRecebido.files = e.dataTransfer.files;
        updateUI(file);
    }
});

// trocar o texto na tela pro nome do arquivo
function updateUI(file) {
    texto.style.display = "none";
    nomeAparece.textContent = file.name;
}

// limpar o nome do arquivo e colocar o texto padrão de volta
apagarCV.addEventListener("click", function() {
    arquivoRecebido.value = "";
    nomeAparece.textContent = "";
    texto.style.display = "inline";
});