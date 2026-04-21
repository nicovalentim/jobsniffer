export async function dadosBanco(url) {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao buscar vagas:", erro);
        return { vagas: [] };
    }
}