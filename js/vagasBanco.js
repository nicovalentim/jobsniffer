export async function vagas_carregarBanco(url) {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao buscar vagas:", erro);
        return { vagas: [] };
    }
}