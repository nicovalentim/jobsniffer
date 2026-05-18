export function inicializarCandidatura(formularioVaga, vagaId) {
    if (!formularioVaga) return;

    formularioVaga.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const usuarioEmail = localStorage.getItem('email');

        if (!usuarioEmail) {
            alert('Você precisa estar logado para se candidatar a uma vaga!');
            return;
        }

        const dadosCandidatura = {
            "vaga.id": vagaId,
            "email": usuarioEmail
        };

        try {
            const resposta = await fetch('/candidatura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosCandidatura)
            });

            const resultado = await resposta.json();

            if (resposta.ok && resultado.status === "ok") {
                alert('Parabéns! Sua candidatura foi registrada com sucesso.');
                
                const botao = formularioVaga.querySelector('button');
                if (botao) {
                    botao.textContent = "Já Candidatado";
                    botao.disabled = true;
                    botao.style.backgroundColor = "gray";
                }
            } else {
                alert(`Erro: ${resultado.mensagem}`);
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        }
    });
}