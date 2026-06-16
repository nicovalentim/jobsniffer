export async function dadosDashboard(email) {
    try {
        const resposta = await fetch(`/dashboard?emailSolicitante=${encodeURIComponent(email)}`);
        const dados = await resposta.json();
            if (!dados.success) {
                console.error("Erro do servidor:", dados.erro);
                alert(`Não foi possível carregar o painel: ${dados.erro}`);
                return null;
            }
        return dados;
    } catch (erro) {
        console.error("Erro na requisição HTTP:", erro);
        return null;
    }
}