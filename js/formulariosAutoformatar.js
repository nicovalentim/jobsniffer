let campoDeDatas = document.getElementsByName("nasc")[0];

campoDeDatas.addEventListener('input', function(e) {
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

let campoDeTelefone = document.getElementsByName("tel")[0];

campoDeTelefone.addEventListener('input', function(e) {
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
});
*/