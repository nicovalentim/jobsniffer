/* let cadastro_usuarioCEP = document.getElementsByName("usuario_CEP")[0];

cadastro_usuarioCEP.addEventListener('input', function(e) {
        var valor = e.target.value.replace(/\D/g, '');
        var formatado = '';

        if (valor.length > 0) {
            formatado = valor.substring(0,5)
        } if (valor.length <= 8) {
            formatado = "-" + valor.substring(5,8);
        }

    e.target.value = formatado;
}); */

let cadastro_usuarioNascimento = document.getElementsByName("usuario_nascimento")[0];

cadastro_usuarioNascimento.addEventListener('input', function(e) {
        var valor = e.target.value.replace(/\D/g, '');
        var formatado = '';

        if (valor.length > 0) {
            formatado = valor.substring(0,2)                //dia
        } if (valor.length > 2) {
            formatado += ' / ' + valor.substring(2,4)       //mês
        } if (valor.length > 4) {
            formatado += ' / ' + valor.substring(4,8);      //ano
        }

    e.target.value = formatado;
});

let cadastro_usuarioTelefone = document.getElementsByName("usuario_telefone")[0];

cadastro_usuarioTelefone.addEventListener('input', function(e) {
        var valor = e.target.value.replace(/\D/g, '');
        var formatado = '';

        if (valor.length > 0) {
            formatado = "(" + valor.substring(0,2)          //ddd
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
let cadastro_usuarioCPF = document.getElementsByName("cadastro_usuarioCPF")[0];

cadastro_usuarioCPF.addEventListener('input', function(e) {
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
});
*/