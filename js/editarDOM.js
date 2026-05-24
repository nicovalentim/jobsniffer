let alteracoesPendentes = {};

function avisarAntesDeSair(event) {
    if (temAlteracoesPendentes()) {
        event.preventDefault();
        event.returnValue = "Você possui alterações não salvas no seu perfil.\n\n Deseja realmente sair?";
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
    
    window.removeEventListener("beforeunload", avisarAntesDeSair);
    window.addEventListener("beforeunload", avisarAntesDeSair);
}

export function limparAlteracoes() {
    alteracoesPendentes = {};
    window.removeEventListener("beforeunload", avisarAntesDeSair);
}