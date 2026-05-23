import { formatarCEPTexto, formatarNascimentoTexto, formatarTelefoneTexto, validarCampoFormatado } from "./formulariosAutoformatar.js";

export function editarTexto(grupoTexto) {
    grupoTexto.forEach(texto => {
        texto.addEventListener('click', function() {
            if (texto.style.display === "none") return;

            const textoAnterior = texto.innerHTML.trim();

            const input = document.createElement("input");
            input.value = textoAnterior;

            const campoId = texto.id;

                if (campoId === "usuarioEmail") {
                    localStorage.setItem("email", textoNovo.toLowerCase());
                } else if (campoId === "usuarioLinkedin" || campoId === "usuarioFolio") {
                input.type = "url";
                input.placeholder = "https://jobsniffer.com"; 

                if (textoAnterior === "Não enviado" || textoAnterior === "Perfil não associado." || textoAnterior === "Link não enviado.") {
                    input.value = "";
                }
            }

            input.addEventListener('input', function(e) {
                if (campoId === "usuarioCEP") e.target.value = formatarCEPTexto(e.target.value);
                if (campoId === "usuarioNascimento") e.target.value = formatarNascimentoTexto(e.target.value);
                if (campoId === "usuarioTelefone") e.target.value = formatarTelefoneTexto(e.target.value);
            });

            input.addEventListener('blur', confirmarDigitado);
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') { input.blur(); }
                if (event.key === 'Escape') { cancelarDigitado(); }
            });

            function cancelarDigitado() {
                input.removeEventListener('blur', confirmarDigitado);
                input.value = textoAnterior;
                texto.style.display = "";
                input.remove();
            }

            async function confirmarDigitado() {
                const textoNovo = input.value.trim();

                if (textoNovo === textoAnterior) {
                    cancelarDigitado();
                    return;
                }

                if (input.required && !textoNovo) {
                    input.removeEventListener('blur', confirmarDigitado);
                    alert("Este campo é obrigatório.");

                    setTimeout(() => {
                        input.addEventListener('blur', confirmarDigitado);
                        input.focus();
                    }, 0);
                    return;
                }

    if (input.checkValidity && !input.checkValidity()) {
        input.removeEventListener('blur', confirmarDigitado);
        alert("Por favor, insira um formato válido para este campo.");

        setTimeout(() => {
            input.addEventListener('blur', confirmarDigitado);
            input.focus();
        }, 0);
        return;
    }

    if (!validarCampoFormatado(campoId, textoNovo, () => true)) {
        input.removeEventListener('blur', confirmarDigitado);
        setTimeout(() => {
            input.addEventListener('blur', confirmarDigitado);
            input.focus();
        }, 0);
        return;
    }

    input.removeEventListener('blur', confirmarDigitado);

    const email = localStorage.getItem("email");

    try {
        const response = await fetch('/atualizarCadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                campo: campoId,
                email: email,
                textoNovo: textoNovo
            })
        });

        if (response.ok) {
            if (campoId === "usuarioEmail") {
                localStorage.setItem("email", textoNovo.toLowerCase());
            }

            texto.textContent = textoNovo || "Não enviado";

            const chaveLocal = campoId.replace("usuario", "").replace("perfil", "").toLowerCase();
            localStorage.setItem(chaveLocal, textoNovo || "Não enviado");

            if (campoId === "usuarioNome" || campoId === "perfilNome") {
                const elementosNome = document.querySelectorAll("#perfilNome, #usuarioNome");
                elementosNome.forEach(el => {
                    el.textContent = textoNovo;
                });
            }
        } else {
            alert('Erro ao salvar dados no banco.');
            texto.textContent = textoAnterior;
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro de conexão. Tente novamente mais tarde.');
        texto.textContent = textoAnterior;
    }

    texto.style.display = "";
    input.remove();
}

            texto.style.display = "none";
            texto.parentNode.insertBefore(input, texto);
            input.focus();
        });
    });
}