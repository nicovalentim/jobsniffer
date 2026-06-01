export function formatarCEPTexto(valor) {
    var numero = valor.replace(/\D/g, '');
    var formatado = '';
    if (numero.length <= 5) formatado = numero;
    if (numero.length > 5) formatado = numero.substring(0, 5) + "-" + numero.substring(5, 8);
    return formatado;
}

export function formatarNascimentoTexto(valor) {
    var numero = valor.replace(/\D/g, '');
    var formatado = '';
    if (numero.length > 0) formatado = numero.substring(0, 2);
    if (numero.length > 2) formatado += ' / ' + numero.substring(2, 4);
    if (numero.length > 4) formatado += ' / ' + numero.substring(4, 8);
    return formatado;
}

export function formatarTelefoneTexto(valor) {
    var numero = valor.replace(/\D/g, '');
    var formatado = '';
    if (numero.length > 0) formatado = "(" + numero.substring(0, 2);
    if (numero.length > 2) formatado += ') ' + numero.substring(2, 7);
    if (numero.length > 7) formatado += '-' + numero.substring(7, 11);
    return formatado;
}

export function validarCampoFormatado(campoId, textoNovo, validarRegrasSenha) {
    switch (campoId) {
        case "usuarioSenha":
            if (!validarRegrasSenha(textoNovo)) {
                alert(`A senha não atende aos requisitos mínimos de segurança:
                    \n- seis caracteres, incluindo pelo menos:\n- uma maiúscula,\n- uma minúscula e\n- um número.`);
                return false;
            }
            break;
        case "usuarioCEP":
            if (textoNovo.replace(/\D/g, '').length !== 8) {
                alert("Por favor, insira um CEP válido com 8 dígitos.");
                return false;
            }
            break;
        case "usuarioNascimento":
            if (textoNovo.replace(/\D/g, '').length !== 8) {
                alert("Por favor, insira a data de nascimento completa.");
                return false;
            }
            break;
        case "usuarioTelefone":
            const qtdNumeros = textoNovo.replace(/\D/g, '').length;
            if (qtdNumeros < 10 || qtdNumeros > 11) {
                alert("Por favor, insira um telefone válido com DDD (10 ou 11 dígitos).");
                return false;
            }
            break;
    }
    return true;
}

export function inicializarFormatarEventos() {
    let usuarioCEP = document.getElementsByName("usuario_CEP")[0];
    if (usuarioCEP) {
        usuarioCEP.addEventListener('input', function(e) {
            e.target.value = formatarCEPTexto(e.target.value);
        });
    }

    let usuarioNascimento = document.getElementsByName("usuario_nascimento")[0];
    if (usuarioNascimento) {
        usuarioNascimento.addEventListener('input', function(e) {
            e.target.value = formatarNascimentoTexto(e.target.value);
        });
    }

    let usuarioTelefone = document.getElementsByName("usuario_telefone")[0];
    if (usuarioTelefone) {
        usuarioTelefone.addEventListener('input', function(e) {
            e.target.value = formatarTelefoneTexto(e.target.value);
        });
    }
}