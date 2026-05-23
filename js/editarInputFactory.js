import { formatarCEPTexto, formatarNascimentoTexto, formatarTelefoneTexto } from "./formulariosAutoformatar.js";

/**
 * Cria e configura dinamicamente o elemento input para substituição no DOM.
 */
export function criarInputConfigurado(campoId, textoAnterior) {
    const input = document.createElement("input");
    input.value = textoAnterior;

    // Configuração de links de redes/portfólio
    if (campoId === "usuarioLinkedin" || campoId === "usuarioFolio") {
        input.type = "url";
        input.placeholder = "https://jobsniffer.com"; 

        const textosPadrao = ["Não enviado", "Perfil não associado.", "Link não enviado."];
        if (textosPadrao.includes(textoAnterior)) {
            input.value = "";
        }
    }

    // Aplicação das máscaras em tempo de digitação
    input.addEventListener('input', function(e) {
        if (campoId === "usuarioCEP") e.target.value = formatarCEPTexto(e.target.value);
        if (campoId === "usuarioNascimento") e.target.value = formatarNascimentoTexto(e.target.value);
        if (campoId === "usuarioTelefone") e.target.value = formatarTelefoneTexto(e.target.value);
    });

    return input;
}