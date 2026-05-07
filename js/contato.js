document.getElementById('contato').addEventListener('submit', async (e) => {
        e.preventDefault();

        const contatoBtn = document.getElementsByName("enviarEmail");
        const mensagem = document.getElementsByName("contatoMensagem").value;
        const sucesso = document.getElementById("contatoSucesso");

        contatoBtn.disabled = true;
        contatoBtn.innerText = "Enviando...";

        try {
            const resposta = await fetch('send-email', {
                method: 'POST',
                headers: { 'Content-type': 'application.json' },
                body: JSON.stringify ({ message: mensagem })
            });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    sucesso.innerHTML = "Mensagem enviada!";
                    document.getElementById("contato").reset();
                } else {
                    sucesso.innerHTML = `Ocorreu um erro.<br> Erro: ${resultado.message}`;
                }

            } catch (error) {
                sucesso.innerHTML = "Erro ao enviar."
            } finally {
                contatoBtn.disabled = false;
                contatoBtn.innerText = "Enviar email";
            }
});