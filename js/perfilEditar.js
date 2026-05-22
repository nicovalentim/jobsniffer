const elementosTexto = document.querySelectorAll(".dadosUsuario > table > td");
elementosTexto.forEach(texto => {
    texto.addEventListener('click', function() {
        const textoAnterior = texto.innerHTML;

        const input = document.createElement("input");
        input.value = texto.innerHTML.trim();
        input.addEventListener('blur', confirmarDigitado);
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') { input.blur() };
                if (event.key === 'Escape') { cancelarDigitado() };
            })
            function confirmarDigitado() {
                texto.innerHTML = input.value;
                texto.style.display = "";
                input.remove();
            }
            function cancelarDigitado() {
                input.removeEventListener('blur', confirmarDigitado);
                input.value = textoAnterior;
                texto.style.display = "";
                input.remove()
            }

        texto.style.display = "none";
        texto.parentNode.insertBefore(input, texto);
        input.focus();
    });
});