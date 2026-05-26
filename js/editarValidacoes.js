import { formatarCEPTexto, formatarNascimentoTexto, formatarTelefoneTexto, validarCampoFormatado } from "./formulariosAutoformatar.js";
import { validarRegrasSenha } from "./formulariosValidacoes.js"; 

export function editarValidacaoEntrada(campoId, input) {
    const textoNovo = input.value.trim();

    if (!textoNovo && campoId !== "usuarioLinkedin" && campoId !== "usuarioFolio") return "cancelar";

    if (input.required && !textoNovo) {
        alert("Este campo é obrigatório.");
        return false;
    }

    if (!input.checkValidity()) {
        if (input.type === "email") {
            alert("Por favor, insira um endereço de e-mail válido (Ex: nome@exemplo.com).");
        } else {
            alert("Por favor, insira um formato válido para este campo.");
        }
        return false;
    }

    if (!validarCampoFormatado(campoId, textoNovo, validarRegrasSenha)) return false;

    return true;
}

export function criarInputConfigurado(campoId, textoAnterior) {
    let input;
        if (campoId === "descricao") {
            input = document.createElement("textarea");
        } else if (campoId === "area") {
            input = document.createElement("select");
            const opcoes = [
                { valor: "ADM", texto: "Administração" },
                { valor: "COM", texto: "Comércio" },
                { valor: "ENG", texto: "Engenharia" },
                { valor: "LOG", texto: "Logística" },
                { valor: "MKT", texto: "Marketing" },
                { valor: "TI", texto: "Tecnologia da Informação" }
            ];
            opcoes.forEach(opcaoInfo => {
                const option = document.createElement("option");
                option.value = opcaoInfo.valor;
                option.textContent = opcaoInfo.texto;

                input.appendChild(option);
            });
        } else if (campoId === "localizacao") {
            input = document.createElement("select");
            const opcoes = [
                { valor: "Presencial", texto: "Presencial" },
                { valor: "Híbrido", texto: "Híbrido" },
                { valor: "Remoto", texto: "Remoto" }
            ];
            opcoes.forEach(opcaoInfo => {
                const option = document.createElement("option");
                option.value = opcaoInfo.valor;
                option.textContent = opcaoInfo.texto;

                input.appendChild(option);
            });
        } else if (campoId === "regime") {
            input = document.createElement("select");
            const opcoes = [
                { valor: "Meio período", texto: "Meio período" },
                { valor: "Período Integral", texto: "Período Integral" }
            ];
            opcoes.forEach(opcaoInfo => {
                const option = document.createElement("option");
                option.value = opcaoInfo.valor;
                option.textContent = opcaoInfo.texto;

                input.appendChild(option);
            });
        } else {
            input = document.createElement("input");
        }

    input.value = textoAnterior;

    if (campoId === "usuarioEmail") {
        input.type = "email";
        input.placeholder = "nome@exemplo.com";
    }
    
    if (campoId === "usuarioSenha") input.type = "password";

    if (campoId === "salario") input.type = "number";

    if (campoId === "usuarioLinkedin" || campoId === "usuarioFolio") {
        input.type = "url";
        input.placeholder = "https://jobsniffer.com"; 

        const textosPadrao = ["Não enviado", "Perfil não associado.", "Link não enviado."];
        if (textosPadrao.includes(textoAnterior)) input.value = "";
    }

    input.addEventListener('input', function(e) {
        if (campoId === "usuarioCEP") e.target.value = formatarCEPTexto(e.target.value);
        if (campoId === "usuarioNascimento") e.target.value = formatarNascimentoTexto(e.target.value);
        if (campoId === "usuarioTelefone") e.target.value = formatarTelefoneTexto(e.target.value);
    });

    return input;
}