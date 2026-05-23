import { validarCampoFormatado } from "./formulariosAutoformatar.js";

/**
 * Valida o valor digitado no input com base nas regras do negócio.
 * @returns {boolean} true se o valor for válido.
 */
export function validarEntradaUsuario(campoId, input) {
    const textoNovo = input.value.trim();

    if (input.required && !textoNovo) {
        alert("Este campo é obrigatório.");
        return false;
    }

    if (input.checkValidity && !input.checkValidity()) {
        alert("Por favor, insira um formato válido para este campo.");
        return false;
    }

    if (!validarCampoFormatado(campoId, textoNovo, () => true)) {
        return false;
    }

    return true;
}