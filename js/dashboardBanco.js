export async function dashboardBanco(email) {
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

export function dashboardDados(array, propriedade) {
    const contagem = {};
    array.forEach(item => {
        const valor = item[propriedade];
        contagem[valor] ?
            contagem[valor]++ :
            contagem[valor] = 1;
    });

    return {
        rotulos: Object.keys(contagem),
        valores: Object.values(contagem)
    };
}

export function dashboardMediaArea(vagas) {
    const acumulador = {};

    vagas.forEach(vaga => {
        const area = vaga.area;
        const salario = Number(vaga.salario);

        if (salario > 0) {
            if (!acumulador[area]) {
                acumulador[area] = { soma: 0, quantidade: 0 };
            }
            acumulador[area].soma += salario;
            acumulador[area].quantidade += 1;
        }
    });

    const rotulos = Object.keys(acumulador);
    const valores = rotulos.map(area => {
        const media = acumulador[area].soma / acumulador[area].quantidade;
        return Number(media.toFixed(2));
    });

    return { rotulos, valores };
}

export function dashboardCandidaturasArea(candidaturas, vagas) {
    const contagem = {};
    const vagaAreaMap = {};
    vagas.forEach(vaga => {
        vagaAreaMap[vaga.id] = vaga.area;
    });

    candidaturas.forEach(candidatura => {
        const area = vagaAreaMap[candidatura.vaga_id] || "Não definida";
        contagem[area] = (contagem[area] || 0) + 1;
    });

    return {
        rotulos: Object.keys(contagem),
        valores: Object.values(contagem)
    };
}