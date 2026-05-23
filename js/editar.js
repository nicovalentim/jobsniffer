import { registrarAlteracao } from "./editarEstado.js";
import { criarInputConfigurado } from "./editarInputFactory.js";
import { validarEntradaUsuario } from "./editarValidador.js";

export { salvarDadosNoBanco } from "./editarAPI.js";

export function editarTexto(grupoTexto) {
    grupoTexto.forEach(texto => {
        texto.addEventListener('click', function() {
            if (texto.style.display === "none") return;

            const textoAnterior = texto.innerHTML.trim();
            const campoId = texto.id;
            
            // 1. Cria o elemento usando a nossa fábrica
            const input = criarInputConfigurado(campoId, textoAnterior);

            // 2. Mapeia os eventos do teclado e foco
            input.addEventListener('blur', confirmarDigitado);
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') input.blur();
                if (event.key === 'Escape') cancelarDigitado();
            });

            function cancelarDigitado() {
                input.removeEventListener('blur', confirmarDigitado);
                texto.style.display = "";
                input.remove();
            }

            function confirmarDigitado() {
                // 3. Valida usando o nosso validador isolado
                if (!validarEntradaUsuario(campoId, input)) {
                    input.removeEventListener('blur', confirmarDigitado);
                    setTimeout(() => { input.addEventListener('blur', confirmarDigitado); input.focus(); }, 0);
                    return;
                }

                input.removeEventListener('blur', confirmarDigitado);
                const textoNovo = input.value.trim() || "Não enviado";

                if (textoNovo === textoAnterior) {
                    cancelarDigitado();
                    return;
                }

                // 4. Aplica as atualizações visuais no DOM local
                texto.textContent = textoNovo;
                if (campoId === "usuarioNome" || campoId === "perfilNome") {
                    const elPerfilNome = document.getElementById("perfilNome");
                    if (elPerfilNome) elPerfilNome.textContent = textoNovo;
                }

                // 5. Registra o estado e exibe o botão global de salvar
                registrarAlteracao(campoId, textoNovo);
                const btnSalvar = document.getElementById("btnSalvarPerfil");
                if (btnSalvar) btnSalvar.style.display = "block";

                texto.style.display = "";
                input.remove();
            }

            // Substituição visual na tabela
            texto.style.display = "none";
            texto.parentNode.insertBefore(input, texto);
            input.focus();
        });
    });
}