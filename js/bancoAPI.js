import { obterAlteracoes, limparAlteracoes } from "./editarDOM.js";

async function enviarRequisicao(url, payload) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const dadosErro = await response.json().catch(() => ({}));
        throw new Error(dadosErro.erro || `Erro HTTP: ${response.status}`);
    }
    return response;
}
    function extrairAlteracoesVaga(vagaId, alteracoes) {
        const payloadCampos = {};
        const prefixo = `vaga_${vagaId}_`;

        Object.entries(alteracoes).forEach(([chave, valor]) => {
            if (chave.startsWith(prefixo)) {
                const campo = chave.replace(prefixo, '');
                payloadCampos[campo] = valor;
            }
        });

        return payloadCampos;
    }
    function limparAlteracoesEspecificas(vagaId, alteracoes) {
        const prefixo = `vaga_${vagaId}_`;
        Object.keys(alteracoes).forEach((chave) => {
            if (chave.startsWith(prefixo)) delete alteracoes[chave];
        });
    }

export async function bancoSalvarPerfil() {
    const emailAtual = localStorage.getItem("email");
    const perfilBtn = document.getElementById("perfilBtn");
    const alteracoes = obterAlteracoes();
    
    if (Object.keys(alteracoes).length === 0) return;

    try {
        await enviarRequisicao('/atualizarCadastro', { email: emailAtual, alteracoes });
        alert('Alterações salvas com sucesso!');

        Object.keys(alteracoes).forEach(campoId => {
            const textoNovo = alteracoes[campoId];
            if (campoId === "usuarioEmail") localStorage.setItem("email", textoNovo.toLowerCase());
            
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
    } catch (erro) {
        console.error('Erro no perfil:', erro);
        alert('Erro ao salvar dados no banco. Recarregue a página para reverter.');
    }
}

export async function bancoSalvarVaga(infoVaga) {
    const vagaId = infoVaga.dataset.vagaId;
    const alteracoes = obterAlteracoes();
    const camposVaga = extrairAlteracoesVaga(vagaId, alteracoes);
    
    const payload = { 
        id: vagaId, 
        emailSolicitante: localStorage.getItem("email"),
        ...camposVaga 
    };

    try {
        await enviarRequisicao('/editarVaga', payload);
        limparAlteracoesEspecificas(vagaId, alteracoes);
        alert('Vaga atualizada com sucesso!');
    } catch (erro) {
        console.error(erro);
        alert('Erro ao salvar vaga ou erro de conexão.');
    }
}

export async function bancoCriarVaga() {
    const vagaId = 'nova';
    const alteracoes = obterAlteracoes();
    const camposVaga = extrairAlteracoesVaga(vagaId, alteracoes);

    const payload = { 
        emailSolicitante: localStorage.getItem("email"),
        ...camposVaga 
    };

    try {
        await enviarRequisicao('/criarVaga', payload);
        limparAlteracoesEspecificas(vagaId, alteracoes);
        alert('Nova vaga criada com sucesso!');
        window.location.reload();
    } catch (erro) {
        console.error(erro);
        alert(`Erro ao criar vaga: ${erro.message}`);
    }
}

export async function bancoDeletarVaga(vagaId) {
    if (!confirm("Tem certeza de que deseja apagar permanentemente esta vaga? Esta ação não pode ser desfeita.")) return;

    try {
        await enviarRequisicao('/deletarVaga', { id: vagaId, emailSolicitante: localStorage.getItem("email") });
        alert('Vaga excluída com sucesso!');
        window.location.reload();
    } catch (erro) {
        console.error(erro);
        alert(`Erro ao excluir vaga: ${erro.message}`);
    }
}