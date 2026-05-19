import { popUp } from "./globalPopups.js";

export function inicializarCandidatura(formularioVaga) {
    if (!formularioVaga) return;

    formularioVaga.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usuarioEmail = localStorage.getItem('email');

        if (!usuarioEmail) {
            alert('Você precisa estar logado para se candidatar a uma vaga!');
            return;
        }

        const vagaId = event.target.getAttribute('data-vaga-id');

        const dadosCandidatura = {
            "vaga_id": Number(vagaId),
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
                const candidatarSucesso = document.getElementById("candidatarSucesso");
                popUp(candidatarSucesso, null);

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