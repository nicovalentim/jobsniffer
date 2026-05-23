import { obterAlteracoes, limparAlteracoes } from "./editarEstado.js";

export async function salvarDadosNoBanco() {
    const alteracoes = obterAlteracoes();
    if (Object.keys(alteracoes).length === 0) return;

    const emailAtual = localStorage.getItem("email");
    const btnSalvar = document.getElementById("btnSalvarPerfil");

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

            // Atualiza o LocalStorage com os dados recém-confirmados
            Object.keys(alteracoes).forEach(campoId => {
                const textoNovo = alteracoes[campoId];

                if (campoId === "usuarioEmail") {
                    localStorage.setItem("email", textoNovo.toLowerCase());
                }

                const chaveLocal = campoId.replace("usuario", "").replace("perfil", "").toLowerCase();
                localStorage.setItem(chaveLocal, textoNovo);
            });

            // Sincroniza visualmente o nome na navbar
            const novoNome = alteracoes["usuarioNome"] || alteracoes["perfilNome"];
            if (novoNome) {
                const elUsuarioNomeNavbar = document.getElementById("usuarioNome");
                if (elUsuarioNomeNavbar) elUsuarioNomeNavbar.textContent = novoNome;
            }

            // Reseta o estado global e oculta o botão
            limparAlteracoes();
            if (btnSalvar) btnSalvar.style.display = "none";
            
        } else {
            alert('Erro ao salvar dados no banco. Recarregue a página para reverter.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
}