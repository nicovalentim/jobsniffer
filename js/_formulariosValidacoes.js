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