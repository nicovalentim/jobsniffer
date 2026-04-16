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
const cadastroBtn = document.getElementById('cadastroBtn');
const cadastroMenu = document.getElementById('cadastroMenu');

if (cadastroBtn && cadastroMenu) {
    abreFecha(cadastroMenu, cadastroBtn);
}

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

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // impede sair da página ou recarregar

    // coleta os dados do formulátrio, incluindo o arquivo
    const formData = new FormData(form);

    const response = await fetch('/cadastro', {
        method: 'POST',
        body: formData
    });

    alert (await response.text());
});


































































/* validações */
    /* regras ficam verdes quando certas */
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

    /* validação senha */
    function senhaValida(senha){
        if (senha.length < 6) return false;
        if (!/[A-Z]/.test(senha)) return false;
        if (!/[a-z]/.test(senha)) return false;
        if (!/[0-9]/.test(senha)) return false;
        return true;
    }

    /* erro visual */
/*    function mostrarErro(input){
        input.classList.remove("erro");
        void input.offsetWidth;
        input.classList.add("erro");
    
        setTimeout(() => input.classList.remove("erro"), 500);
    }
/*        if (!senhaValida(senhaCadastro.value)) {
            mostrarErro(senhaCadastro);
            return;
        }

    /* ativa as regras */
    document.addEventListener("input", (e) => {
        if (e.target.id === "senha") {
            validarRegras(e.target.value, ["r1","r2","r3","r4"]);
        }
    });

    /* esconde texto se todas as regras forem verdadeiras */
    let senha = document.getElementById("senha")    

    function regrasSenha() {
        if (
            !document.getElementById("r1").classList.contains("valido") || 
            !document.getElementById("r2").classList.contains("valido") || 
            !document.getElementById("r3").classList.contains("valido") || 
            !document.getElementById("r4").classList.contains("valido")
        ) {
            document.getElementById("regrasSenha").classList.remove("inativo")
        } else {
            document.getElementById("regrasSenha").classList.add("inativo")
        }
    }

    senha.addEventListener("input",regrasSenha);

    // confirma que as duas senhas digitadas são iguais
    let confirmaSenha = document.getElementById("confirmaSenha")

    function senhasIguais() {
        if (
            confirmaSenha.value != "" &&
            senha.value != "" &&
            senha.value != confirmaSenha.value
        ) {
            document.getElementById("erroConfirmaSenha").classList.add("ativo")
        } else {
            document.getElementById("erroConfirmaSenha").classList.remove("ativo")
        }
    }

    senha.addEventListener("input", senhasIguais);
    confirmaSenha.addEventListener("input", senhasIguais);

/*  if(e.target.id === "cadEmail"){
    erroEmail.style.display = "none";
  } */
