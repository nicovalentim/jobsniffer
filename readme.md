## Sobre
É uma plataforma centralizada de oportunidades de carreira. O objetivo do projeto é conectar candidatos a uma curadoria de vagas selecionadas, oferecendo uma interface limpa para visualização e, futuramente, um painel administrativo completo para gestão de conteúdo.

## O projeto

Diferente de um simples buscador, também funciona como um portal onde:
- *Clientes (Candidatos):* Podem navegar por um banco de dados de vagas pré-existentes e encontrar sua próxima oportunidade.
- *Administradores (Em breve):* Terão um sistema de login exclusivo para cadastrar, editar e remover vagas diretamente pela interface.

# Funcionalidades Atuais

## Navegação SPA (Single Page Application)

Permite que o site funcione como uma aplicação de página única, carregando apenas o conteúdo necessário sem recarregar toda a interface.

### Responsabilidades

- Carregamento dinâmico de páginas
- Controle de rotas internas
- Interceptação de navegação
- Inicialização automática da Home
- Carregamento condicional de scripts

### Funções

| Função | Descrição | Arquivo |
|---|---|---|
| `rotearPagina()` | Define qual página HTML deve ser carregada através de lógica `switch/case`. | [`js/router.js`](./js/router.js) |
| `carregarConteudo()` | Carrega scripts específicos dependendo da página ativa. | [`js/router.js`](./js/router.js) |
| `navbar listeners` | Intercepta cliques do menu para evitar reload e mudança de URL. | [`js/router.js`](./js/router.js) |
| `DOMContentLoaded listener` | Inicializa automaticamente a página Home ao abrir o sistema. | [`js/router.js`](./js/router.js) |

## Sistema de Visualização de Vagas

Responsável por buscar vagas no banco de dados e renderizá-las dinamicamente na interface.

### Recursos

- Busca automática no banco
- Ordenação das vagas
- Renderização dinâmica em HTML
- Exibição detalhada via popup
- Integração Python ↔ JavaScript

### Funções

| Função | Descrição | Arquivo |
|---|---|---|
| `vagas_carregarBanco()` | Solicita os dados de vagas ao backend. | [`js/vagas.js`](./js/vagas.js) |
| `conexao()` | Cria conexão com o banco SQLite. | [`py/database.py`](./py/database.py) |
| `get_vagas_data()` | Retorna os dados das vagas armazenadas. | [`py/database.py`](./py/database.py) |
| `init_db()` | Inicializa o banco de dados. | [`py/database.py`](./py/database.py) |
| `mysqlParaSqlite(conteudo_sql)` | Converte scripts MySQL para SQLite para ambiente simplificado de testes. | [`py/mysqlParaSqlite.py`](./py/mysqlParaSqlite.py) |
| `vaga_gerarHTML(listaVagas, limiteDesc)` | Gera os elementos HTML das vagas dinamicamente. | [`js/vagas.js`](./js/vagas.js) |
| `vaga_info()` | Cria estrutura visual resumida da vaga. | [`js/vagas.js`](./js/vagas.js) |
| `vaga_infoOnClick()` | Exibe detalhes completos da vaga ao clicar. | [`js/vagas.js`](./js/vagas.js) |
| `vagas_carregar()` | Ordena e renderiza vagas da mais recente para a mais antiga. | [`js/vagas.js`](./js/vagas.js) |
| `popUp()` | Sistema global de popup reutilizável em diferentes áreas do sistema. | [`js/popup.js`](./js/popup.js) |

## Sistema de Busca e Filtros

Permite localizar vagas dinamicamente através de texto, área de atuação e regime de trabalho.

### Recursos

- Busca em tempo real
- Filtro por datasets HTML
- Filtros por área
- Filtros por regime
- Limpeza de filtros

### Funções

| Função | Descrição | Arquivo |
|---|---|---|
| `vagas_filtrar()` | Filtra vagas utilizando texto digitado e datasets dos elementos HTML. | [`js/filtros.js`](./js/filtros.js) |
| `vaga_verTodosFiltros()` | Remove filtros ativos e exibe todas as vagas novamente. | [`js/filtros.js`](./js/filtros.js) |
| `search listeners` | Atualiza os filtros em tempo real conforme o usuário digita. | [`js/filtros.js`](./js/filtros.js) |
| `filter buttons listeners` | Ativa filtros por categoria e regime. | [`js/filtros.js`](./js/filtros.js) |

## Cadastro de Usuários

Módulo responsável pelo registro de candidatos e envio dos dados ao banco de dados.

### Recursos

- Upload de currículo
- Máscaras automáticas
- Validação de senha
- Validação de confirmação
- Feedback visual de erros
- Envio dos dados ao backend

### Funções

| Função | Descrição | Arquivo |
|---|---|---|
| `cadastro_arqAtualiza()` | Atualiza visualmente o nome do arquivo enviado pelo usuário. | [`js/cadastro.js`](./js/cadastro.js) |
| `cadastro_arqRecebido listener` | Detecta recebimento de arquivo. | [`js/cadastro.js`](./js/cadastro.js) |
| `cadastro_arqApaga listener` | Remove o arquivo enviado. | [`js/cadastro.js`](./js/cadastro.js) |
| `usuario_CEP listener` | Formata automaticamente o CEP. | [`js/cadastro.js`](./js/cadastro.js) |
| `usuario_nascimento listener` | Formata automaticamente a data de nascimento. | [`js/cadastro.js`](./js/cadastro.js) |
| `usuario_telefone listener` | Formata automaticamente o telefone. | [`js/cadastro.js`](./js/cadastro.js) |
| `validarRegras()` | Verifica requisitos mínimos de senha. | [`js/validacao.js`](./js/validacao.js) |
| `senhaValida()` | Valida a senha inserida. | [`js/validacao.js`](./js/validacao.js) |
| `mostrarErro()` | Exibe erros visuais de validação. | [`js/validacao.js`](./js/validacao.js) |
| `cadastro_regrasSenha()` | Mostra e oculta regras de senha dinamicamente. | [`js/validacao.js`](./js/validacao.js) |
| `senhasIguais()` | Confirma se as duas senhas digitadas coincidem. | [`js/validacao.js`](./js/validacao.js) |
| `cadastro_formulario listener` | Envia os dados do formulário ao backend. | [`js/cadastro.js`](./js/cadastro.js) |
| `cadastro_data()` | Persiste os dados do usuário no banco de dados. | [`py/cadastro.py`](./py/cadastro.py) |

## Sistema Backend em Python

Camada responsável pelo gerenciamento de dados e comunicação com o banco.

### Recursos

- Conexão com banco SQLite
- Inicialização automática do banco
- CRUD de vagas
- Persistência de usuários
- Conversão de scripts SQL

### Arquivos Principais

| Arquivo | Responsabilidade |
|---|---|
| [`app.py`](./app.py) | Inicialização da aplicação principal. |
| [`py/database.py`](./py/database.py) | Conexão, leitura e gerenciamento de vagas. |
| [`py/cadastro.py`](./py/cadastro.py) | Persistência de dados de usuários. |
| [`py/mysqlParaSqlite.py`](./py/mysqlParaSqlite.py) | Conversão de scripts MySQL para SQLite. |
| [`db/`](./db/) | Arquivos do banco de dados e scripts SQL. |

## Interface e Estrutura Visual

Responsável pela experiência visual da plataforma.

# Funcionalidades Futuras

## Sistema Administrativo

Painel de gerenciamento completo para administradores.

### Planejado

- *Readme editado à mão:* a versão atual do readme.md foi criada por uma ferramenta de IA, o que vai ser removido futuramente, para um texto mais interessante, conciso e humano.
- *Layout da página inicial:* A linguagem visual está diferente na homepage e em outras páginas e isso é intencional - ela atualmente serve como uma página de testes de funcionalidades do site.
- *Painel Administrativo:* Interface para criação, edição e exclusão de vagas (CRUD).
- *Hashes para Segurança das Senhas:* Criptografia para as senhas salvas no banco de dados.
- *Separação Visual de Vagas:* Separar elas em páginas diferentes, ao invés de mostrar todas as vagas disponíveis de uma vez.

## Como rodar o projeto

1. Clone o repositório.
2. Use o comando `py app.py` dentro do terminal do VSCode.
