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
        switch (campoId) {
            case "usuarioEmail":
                input = document.createElement("input");
                input.type = "email";
                input.placeholder = "nome@exemplo.com";
                break;
            case "usuarioSenha":
                input = document.createElement("input");
                input.type = "password";
                break;
            case "usuarioLinkedin":
            case "usuarioFolio":
                input = document.createElement("input");
                input.type = "url";
                input.placeholder = "https://jobsniffer.com";
                break;

            case "vagaArea":
                input = document.createElement("select");
                const areas = [
                    { valor: "ADM", texto: "Administração" },
                    { valor: "COM", texto: "Comércio" },
                    { valor: "ENG", texto: "Engenharia" },
                    { valor: "LOG", texto: "Logística" },
                    { valor: "MKT", texto: "Marketing" },
                    { valor: "TI", texto: "Tecnologia da Informação" }
                ];
                areas.forEach(opcaoInfo => {
                    const option = document.createElement("option");
                    option.value = opcaoInfo.valor;
                    option.textContent = opcaoInfo.texto;

                    input.appendChild(option);
                });
                break;
            case "vagaDescricao":
                input = document.createElement("textarea");
                break;
            case "vagaLocalizacao":
                input = document.createElement("select");
                const locais = [
                    { valor: "Presencial", texto: "Presencial" },
                    { valor: "Híbrido", texto: "Híbrido" },
                    { valor: "Remoto", texto: "Remoto" }
                ];
                locais.forEach(opcaoInfo => {
                    const option = document.createElement("option");
                    option.value = opcaoInfo.valor;
                    option.textContent = opcaoInfo.texto;

                    input.appendChild(option);
                });
                break;
            case "vagaRegime":
                input = document.createElement("select");
                const regimes = [
                    { valor: "Meio período", texto: "Meio período" },
                    { valor: "Período Integral", texto: "Período Integral" }
                ];
                regimes.forEach(opcaoInfo => {
                    const option = document.createElement("option");
                    option.value = opcaoInfo.valor;
                    option.textContent = opcaoInfo.texto;

                    input.appendChild(option);
                });
                break;
            case "vagaSalario":
                input = document.createElement("input");
                input.type = "number";
                break;

            default:
                input = document.createElement("input");
        }

    input.value = textoAnterior;
    const textosPadrao = ["Não enviado", "Perfil não associado.", "Link não enviado."];
    if (textosPadrao.includes(textoAnterior)) input.value = "";

    input.addEventListener('input', function(e) {
        switch (campoId) {
            case "usuarioCEP":
                e.target.value = formatarCEPTexto(e.target.value);
                break;
            case "usuarioNascimento":
                e.target.value = formatarNascimentoTexto(e.target.value);
                break;
            case "usuarioTelefone":
                e.target.value = formatarTelefoneTexto(e.target.value);
                break;
        }
    });

    return input;
}