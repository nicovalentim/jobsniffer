# Sobre

É uma plataforma centralizada de oportunidades de carreira. O objetivo do projeto é conectar candidatos a uma curadoria de vagas selecionadas, oferecendo uma interface limpa para visualização e, futuramente, um painel administrativo completo para gestão de conteúdo.

## O Projeto

Diferente de um simples buscador, também funciona como um portal onde:
- *Clientes (Candidatos):* Podem navegar por um banco de dados de vagas pré-existentes e encontrar sua próxima oportunidade.
- *Administradores (Em breve):* Terão um sistema de login exclusivo para cadastrar, editar e remover vagas diretamente pela interface.

## Funcionalidades Atuais

### Funcionalidade de Aplicação em página única: [*](https://github.com/nicovalentim/jobsniffer/blob/main/js/globalRotas.js)
O site inteiro funciona com uma página só, apenas carregando o conteúdo essencial.

- rotearPagina()<sup>JS</sup>: switch case para escolher qual arquivo HTML a carregar;
- carregarConteudo()<sup>JS</sup>: lógica de if/else para carregar o javascript necessário apenas em certas páginas;
- navbar com ouvinte<sup>JS</sup> para identficar quais links reagem com a lógica de página única, e evitar mudanças de URL;
- documento com ouvinte<sup>JS</sup> para carregar a página "Home.html" sempre que o site é carregado da primeira vez.

### Visualização de Vagas:
Listagem fluida de oportunidades armazenadas no banco de dados.

- vagas_carregarBanco()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/vagasBanco.js), conexao()[*](https://github.com/nicovalentim/jobsniffer/blob/main/py/conectarBanco.py)<sup>PY</sup>,  get_vagas_data()[*](https://github.com/nicovalentim/jobsniffer/blob/main/py/rota/vagas.py) e init_db()[*](https://github.com/nicovalentim/jobsniffer/blob/main/py/iniciarBanco.py): cria uma conexão com o banco de dados em python;
- mysqlParaSqlite(conteudo_sql)<sup>PY</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/py/sqliteSQL.py): modifica o banco de dados de SQL para SQLite (para criar um banco de dados de testes mais simplificado);
- vaga_gerarHTML (listaVagas, limiteDesc)<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/vagasTemplate.js): usa o código HTML gerado nas funções vaga_info()<sup>JS</sup> e vaga_infoOnClick()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/vagasTemplate.js) para criar elementos em HTML a serem adicionados na página; 
- vagas_carregar()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/vagasImport.js): reorganiza as vagas em ordem de criação (mais novas primeiro), e adiciona os elementos em HTML na página;
- popUp()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/globalPopups.js): usado não apenas na seção de vagas, mas como uma função global que entre outros usos, permite mostrar dados mais específicos sobre cada vaga na página.

### Filtros de Busca: [*](https://github.com/nicovalentim/jobsniffer/blob/main/js/vagasFiltros.js)
Permite a localização de vagas por área ou regime de trabalho.

- vagas_filtrar()<sup>JS</sup>: modifica a query buscada por uma versão em letras minúsculas, e usa querySelectors para buscar datasets para filtrar vagas exibidas tanto pelo texto contido nelas (na barra de pesquisa com um ouvinte<sup>JS</sup> para isso) quanto por filtros padrões de área e regime da vaga pesquisada (por botões com os datasets identificados);
- vaga_verTodosFiltros()<sup>JS</sup>: remove todos os filtros e mostra todas as vagas na página, além de desmarcar os botões não selecionados.

### Cadastro de Usuários:
Criação de usuários novos com adição ao banco de dados.

- cadastro_arqAtualiza()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosReceberArquivo.js): permite modificar o valor do nome do arquivo adicionado no cadastro, como uma forma de feedback;
- ouvinte em cadastro_arqRecebido<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosReceberArquivo.js) para conseguir receber o arquivo do usuário;
- ouvinte em cadastro_arqApaga<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosReceberArquivo.js) para apagar o arquivo recebido;
- ouvintes em usuario_CEP, usuario_nascimento e usuario_telefone<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosAutoformatar.js) para formatar o texto digitado pelo usuário;
- validarRegras()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosValidacoes.js): identifica regras para a criação de uma senha nova (como caracteres maiúsculos e minúsculos) dependendo do que foi digitado;
- senhaValida()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosValidacoes.js): verifica se a senha é válida;
- mostrarErro()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosValidacoes.js): mostra um erro visual em caso de erro de validação da senha;
- cadastro_regrasSenha()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosValidacoes.js): mostra ou esconde visualmente as regras dependendo do que foi digitado;
- senhasIguais()<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formulariosValidacoes.js): cofnrima que a senha e a verificação dela são iguais;
- ouvinte em cadastro_formulario<sup>JS</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/js/formularios.js) para enviar os dados ao banco.
- cadastro_data()<sup>PY</sup>[*](https://github.com/nicovalentim/jobsniffer/blob/main/py/rota/cadastro.py): envia os dados ao banco de dados.

## Próximos Passos

- *Sistema de Autenticação:* Implementação de login seguro para administradores.
- *Painel Administrativo:* Interface para criação, edição e exclusão de vagas (CRUD).
- *Dashboards:* Métricas de visualização para cada vaga postada.
- *Favoritos:* Permitir que o candidato salve vagas de interesse.

## Como rodar o projeto

1. Clone o repositório.
2. Use o comando `py app.py` dentro do terminal do VSCode.