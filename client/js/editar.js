export { bancoSalvarPerfil as salvarBancoPerfil } from "./bancoAPI.js";
import { registrarAlteracao } from "./editarDOM.js";
import { editarValidacaoEntrada, criarInputConfigurado } from "./editarValidacoes.js";

export function editarTexto(grupoTexto) {
    grupoTexto.forEach(texto => {
        texto.addEventListener('click', function() {
            if (texto.style.display === "none") return;

            const textoAnterior = texto.innerHTML.trim();
            const campoId = texto.id || texto.dataset.campo;
            const input = criarInputConfigurado(campoId, textoAnterior);
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
                const resultadoValidacao = editarValidacaoEntrada(campoId, input);

                if (resultadoValidacao === "cancelar") {
                    cancelarDigitado();
                    return;
                }

                if (!resultadoValidacao) {
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

                texto.textContent = textoNovo;
                    if (campoId === "usuarioNome" || campoId === "perfilNome") {
                        const elPerfilNome = document.getElementById("perfilNome");
                        if (elPerfilNome) elPerfilNome.textContent = textoNovo;
                    }

                const infoVaga = texto.closest('.infoVaga');

                if (infoVaga) {
                    const infoVaga = texto.closest('.infoVaga');
                    registrarAlteracao(`vaga_${infoVaga.dataset.vagaId}_${campoId}`, textoNovo);

                    const vagaBtn = infoVaga.querySelector('.vagaBtn');
                    if (vagaBtn) vagaBtn.classList.add("ativo");
                } else {
                    registrarAlteracao(campoId, textoNovo);
                    const btnSalvar = document.getElementById("perfilBtn");
                    if (btnSalvar) btnSalvar.classList.add("ativo");
                }

                texto.style.display = "";
                input.remove();
            }

            texto.style.display = "none";
            texto.parentNode.insertBefore(input, texto);
            input.focus();
        });
    });
}