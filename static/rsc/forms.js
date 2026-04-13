import { abreFecha } from "./scripts.js";

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

// chama a tela de validação de usuário/senha (testa se senha repete e etc)
const cadastro = document.getElementById('cadastro');
const cadastroMenu = document.getElementById('cadastroMenu');

abreFecha(cadastro, cadastroMenu, function() {
    setTimeout(function() {
        document.getElementsByName("email").focus();
    }, 50);
});

// autoformatar data
let campoDeDatas = document.getElementsByName("nasc")[0];

campoDeDatas.addEventListener('input', function(e) {
        var valor = e.target.value.replace(/\D/g, '');
        var formatado = '';

        if (valor.length > 0) {
            //dia
            formatado = valor.substring(0,2)
        } if (valor.length > 2) {
            //mês
            formatado += ' / ' + valor.substring(2,4)
        } if (valor.length > 4) {
            //ano
            formatado += ' / ' + valor.substring(4,8);
        }

    e.target.value = formatado;
});

// autoformatar telefone
let campoDeTelefone = document.getElementsByName("tel")[0];

campoDeTelefone.addEventListener('input', function(e) {
        var valor = e.target.value.replace(/\D/g, '');
        var formatado = '';

        if (valor.length > 0) {
            //ddd
            formatado = "(" + valor.substring(0,2)
        } if (valor.length > 2) {
            formatado += ') ' + valor.substring(2,6)
        } if (valor.length > 6 && valor.length < 11) {
            formatado += '-' + valor.substring(6,10);
        } else if (valor.length >= 11) {
            formatado = "(" + valor.substring(0,2)+ ") " + valor.substring(2,7) + "-" + valor.substring(7,11);
        }

    e.target.value = formatado;
});

/*
// autoformatar cpf
let campoDeCPF = document.getElementsByName("cpf")[0];

campoDeCPF.addEventListener('input', function(e) {
        var valor = e.target.value.replace(/\D/g, '');
        var formatado = '';

        if (valor.length > 0) {
            formatado = valor.substring(0,3)
        } if (valor.length > 3) {
            formatado += '.' + valor.substring(3,6)
        } if (valor.length > 6) {
            formatado += '.' + valor.substring(6,9);
        } if (valor.length > 9) {
            formatado += '- ' + valor.substring(9,11);
        }

    e.target.value = formatado;
}); */