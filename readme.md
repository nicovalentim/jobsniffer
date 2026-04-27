# funções:
    carregarConteudo
    rotearPagina
    popUp

    cadastro_arqAtualiza
    vagas_carregar
    vagas_carregarBanco
    vagas_filtrar

## Gerador de Vagas

###### vaga_gerarHTML(listaVagas, limiteDesc)
- Define o conteúdo da página como vazio (para evitar erros);
    let conteudoHTML = "";

- Para cada vaga no banco de dados (definida pela variável listaVagas)
    for (const vaga of listaVagas) {

- Reduz o tamanho da descrição mostrada na página (definida pela variável limiteDesc) 
        let descricaoCurta = vaga.descricao;
        if (descricaoCurta.length > limiteDesc) {
            descricaoCurta = `${descricaoCurta.slice(0, limiteDesc)} (...)`;
        }

- 
        const requisitos = vaga.requisitos.split(', ')
        let reqs = ""
        for (let i = 0; i < requisitos.length; i++) {
            reqs += `<p class="requisitos">#${requisitos[i]}</p>`
        }

        const infoVaga = vaga_infoOnClick(vaga, reqs);
        const cardVaga = vaga_info(vaga, descricaoCurta, reqs);

        conteudoHTML += cardVaga + infoVaga;
    }
    
    return conteudoHTML;



###### vaga_info & vaga_infoOnClick
- Retornam o código em HTML de cada card de vaga na página.


    ### vaga_verTodosFiltros

ouvintes:
    document                    > carregar home no index
    navbar                      > para trocar páginas
    irAoTopo

    cadastro_arqApaga
    cadastro_arqNome
    cadastro_arqRecebido
    cadastro_arqReceber
    cadastro_formulario
    cadastro_usuarioCEP
    cadastro_usuarioCPF         > depreciado
    cadastro_usuarioNascimento
    cadastro_usuarioTelefone
