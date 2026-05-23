// Memória temporária das alterações feitas pelo usuário
let alteracoesPendentes = {};

// Função para interceptar o fechamento da aba, F5 ou recarregamento
function avisarAntesDeSair(event) {
    if (temAlteracoesPendentes()) {
        event.preventDefault();
        event.returnValue = "Você possui alterações não salvas no seu perfil. Deseja realmente sair?";
        return event.returnValue;
    }
}

export function temAlteracoesPendentes() {
    return Object.keys(alteracoesPendentes).length > 0;
}

export function obterAlteracoes() {
    return alteracoesPendentes;
}

export function registrarAlteracao(campoId, valorNovo) {
    alteracoesPendentes[campoId] = valorNovo;
    
    // Ativa a proteção nativa contra fechamento de aba
    window.removeEventListener("beforeunload", avisarAntesDeSair);
    window.addEventListener("beforeunload", avisarAntesDeSair);
}

export function limparAlteracoes() {
    alteracoesPendentes = {};
    window.removeEventListener("beforeunload", avisarAntesDeSair);
}