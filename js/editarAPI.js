import { obterAlteracoes, limparAlteracoes } from "./editarDOM.js";

export async function salvarBanco() {
    const alteracoes = obterAlteracoes();
    if (Object.keys(alteracoes).length === 0) return;

    const emailAtual = localStorage.getItem("email");
    const perfilBtn = document.getElementById("perfilBtn");

    try {
        const response = await fetch('/atualizarCadastroLote', {
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
            const btnSalvar = document.getElementById("perfilBtn");
            if (btnSalvar) btnSalvar.classList.remove("ativo");
            
        } else {
            alert('Erro ao salvar dados no banco. Recarregue a página para reverter.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
}