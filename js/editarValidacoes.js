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
    const input = document.createElement("input");
    input.value = textoAnterior;

    if (campoId === "usuarioEmail") {
        input.type = "email";
        input.placeholder = "nome@exemplo.com";
    }

    if (campoId === "usuarioLinkedin" || campoId === "usuarioFolio") {
        input.type = "url";
        input.placeholder = "https://jobsniffer.com"; 

        const textosPadrao = ["Não enviado", "Perfil não associado.", "Link não enviado."];
        if (textosPadrao.includes(textoAnterior)) {
            input.value = "";
        }
    }

    input.addEventListener('input', function(e) {
        if (campoId === "usuarioCEP") e.target.value = formatarCEPTexto(e.target.value);
        if (campoId === "usuarioNascimento") e.target.value = formatarNascimentoTexto(e.target.value);
        if (campoId === "usuarioTelefone") e.target.value = formatarTelefoneTexto(e.target.value);
    });

    return input;
}