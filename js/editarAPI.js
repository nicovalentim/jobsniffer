import { obterAlteracoes, limparAlteracoes } from "./editarDOM.js";

export async function salvarBanco() {
    const alteracoes = obterAlteracoes();
    if (Object.keys(alteracoes).length === 0) return;

    const emailAtual = localStorage.getItem("email");
    const perfilBtn = document.getElementById("perfilBtn");

    try {
        const response = await fetch('/atualizarCadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailAtual,
                alteracoes: alteracoes
            })
        });

        if (response.ok) {
            alert('Alterações salvas com sucesso!');

            Object.keys(alteracoes).forEach(campoId => {
                const textoNovo = alteracoes[campoId];

                if (campoId === "usuarioEmail") 
                    localStorage.setItem("email", textoNovo.toLowerCase());

                const chaveLocal = campoId.replace("usuario", "").replace("perfil", "").toLowerCase();
                localStorage.setItem(chaveLocal, textoNovo);
            });

            const novoNome = alteracoes["usuarioNome"] || alteracoes["perfilNome"];
            if (novoNome) {
                const elUsuarioNomeNavbar = document.getElementById("usuarioNome");
                if (elUsuarioNomeNavbar) elUsuarioNomeNavbar.textContent = novoNome;
            }

            limparAlteracoes();
            if (perfilBtn) perfilBtn.classList.remove("ativo");
            
        } else {
            alert('Erro ao salvar dados no banco. Recarregue a página para reverter.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
}

export async function salvarVagaBanco(infoVaga) {
    const vagaId = infoVaga.dataset.vagaId;
    const alteracoes = obterAlteracoes();
    const emailAtual = localStorage.getItem("email");
    const payload = { id: vagaId, emailSolicitante: emailAtual };

    Object.entries(alteracoes).forEach(([chave, valor]) => {
        if (chave.startsWith(`vaga_${vagaId}_`)) {
            const campo = chave.replace(`vaga_${vagaId}_`,'');
            payload[campo] = valor;
            }
        });

    try {
        const response = await fetch('/editarVaga', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );

        if (response.ok) {
            Object.keys(alteracoes).forEach((chave) => {
                if (chave.startsWith(`vaga_${vagaId}_`))delete alteracoes[chave];
            });
            alert('Vaga atualizada com sucesso!');
        } else {
            const dadosErro = await response.json();
            alert('Erro ao salvar vaga.');
        }
    } catch (erro) {
        console.error(erro);
        alert('Erro de conexão.');
    }
}