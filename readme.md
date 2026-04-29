resumo de duas frases do que é o projeto (pitch de venda)

categorizar as linguagens e arquiteturas usadas

funções chave e o que foi pivotado durante o projeto (coisas como: foi de estático para dinâmico, foi de dinâmico para estático, etc)

esquematização do banco de dados / fluxogramas aqui

pré-requisitos para fazer o projeto rodar

screenshots da dashboard/partes do projeto rodando

# funções:
    carregarConteudo
    rotearPagina
    popUp

    cadastro_arqAtualiza
    vagas_carregar
    vagas_carregarBanco
    vagas_filtrar
    vaga_gerarHTML(listaVagas, limiteDesc)
    vaga_info & vaga_infoOnClick
    vaga_verTodosFiltros

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
