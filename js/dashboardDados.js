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