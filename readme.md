# JobSniffer

[![en](https://img.shields.io/badge/lang-English-blue.svg)](./README-EN.md)

<p>
  <a href="https://jobsniffer.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Acessar_Aplicação_ao_Vivo-Render-6f42c1?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo" />
  </a>
</p><p>
  <img src="https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</p>

---

## Sobre o Projeto

O **JobSniffer** é uma plataforma fullstack para busca, gestão de vagas e acompanhamento de candidaturas, feita, programada e testada por eu mesmo, [nicovalentim](https://github.com/nicovalentim).

O projeto combina uma arquitetura leve no Front-end baseada em Single Page Application (SPA) com um servidor Python/Flask modularizado via Blueprints e persistência em banco SQLite.

A solução atende a duas frentes principais:
* **Candidatos:** Exploração de vagas com filtros instantâneos, candidatura rápida, assistente virtual (Chatbot) e acompanhamento pelo perfil do usuário.
* **Administradores:** Painel (Dashboard) interativo com métricas visuais e gráficos para análise das oportunidades e cadastros.

#### **Demonstração do site:** [jobsniffer.onrender.com](https://jobsniffer.onrender.com/)

---

## Arquitetura e Funcionalidades

### 1. Navegação e Roteamento SPA
Garante navegação contínua e sem recarregamento de página, gerenciando a injeção dinâmica de conteúdo e o ciclo de vida dos scripts de cada tela.

| Arquivo | Responsabilidade |
|---|---|
| `js/globalRotas.js` | Gerencia a troca dinâmica de telas e a interceptação dos eventos de link. |
| `js/globalPopups.js` | Utilitário global para modais e alertas visuais do sistema. |
| `js/globalAoTopo.js` | Controle de rolagem suave e interações de interface. |

---

### 2. Vagas, Filtros e Candidatura
Módulo focado na exibição responsiva das oportunidades de trabalho, permitindo busca em tempo real e envio de inscrições.
A criação do banco de dados fictício em SQL (que foi convertida para SQLite na execução) foi inteiramente feita por [Rods](https://github.com/Rodsmont).

| Arquivo / Módulo | Responsabilidade |
|---|---|
| `js/vagas.js` / `js/vagasBanco.js` | Requisição, ordenação e renderização dos dados de vagas. |
| `js/vagasFiltros.js` | Algoritmos de busca por texto, área de atuação e tipo de contrato. |
| `js/vagasCandidatar.js` | Gerencia o processo de inscrição do candidato em uma vaga específica. |
| `py/rota/vagas.py` | Endpoints REST para consulta e listagem de vagas. |
| `py/rota/candidatura.py` | Rota para processamento e persistência de candidaturas. |

---

### 3. Painel Administrativo e Métricas (Dashboard)
Área voltada para análise estatística dos dados com suporte a componentes gráficos.

| Arquivo / Módulo | Responsabilidade |
|---|---|
| `js/dashboard.js` | Lógica principal de inicialização e dados do painel. |
| `js/dashboardGraficos.js` | Renderização visual de gráficos e relatórios estatísticos. |
| `js/dashboardBanco.js` | Comunicação com as APIs de métricas do backend. |
| `py/rota/dashboard.py` | Endpoint responsável por consolidar estatísticas para a área administrativa. |

---

### 4. Autenticação, Perfil e Formulários
Validação em tempo real dos dados de entrada no front-end e tratamento seguro no servidor.

| Arquivo / Módulo | Responsabilidade |
|---|---|
| `js/login.js` / `js/loginValidacoes.js` | Controle de autenticação de usuários e tratamento de sessão. |
| `js/formulariosValidacoes.js` | Validação de senhas, e-mails e regras de preenchimento. |
| `js/formulariosAutoformatar.js` | Aplicação dinâmica de máscaras (CEP, telefone, CPF/CNPJ). |
| `js/perfil.js` / `js/editar.js` | Visualização e edição dos dados cadastrais do usuário. |
| `py/rota/login.py` / `py/rota/cadastro.py` | Endpoints backend para autenticação e registro no SQLite. |

---

### 5. Chatbot e Serviços Auxiliares

| Arquivo / Módulo | Responsabilidade |
|---|---|
| `js/chatbot.js` / `py/rota/chatbot.py` | Assistente interativo para tirar dúvidas rápidas sobre vagas e processos.* |
| `js/email.js` / `py/email.py` | Integração para envio de notificações e e-mails de confirmação. |
| `py/iniciarBanco.py` / `py/sqliteSQL.py` | Scripts de estruturação, inicialização e conexão com a base SQLite. |
* Inteiramente desenvolvido por [rocharlia](https://github.com/rocharlia).

---

## Como Rodar o Projeto Localmente

### Pré-requisitos
* Python 3.10 ou superior
* Git

### Passo a Passo

1. **Clone o repositório:**
    ```bash
    git clone [https://github.com/nicovalentim/jobsniffer.git](https://github.com/nicovalentim/jobsniffer.git)
    cd jobsniffer
    ```

2. **Crie e ative o ambiente virtual:**

    #### Windows
    ```cmd
    python -m venv venv
    .\venv\Scripts\activate
    ```

    #### Linux/macOS
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Execute o servidor:**
    ```bash
    python app.py
    ```

5. **Acesse no navegador:** `http://127.0.0.1:5000`
