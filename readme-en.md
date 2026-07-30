# JobSniffer

[![pt-br](https://img.shields.io/badge/lang-Português-green.svg)](./readme.md)

<p>
  <a href="https://jobsniffer.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Access_Live_Application-Render-6f42c1?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo" />
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

## About the Project

**JobSniffer** is a full-stack platform for job searching, management, and application tracking.

The project combines a lightweight Single Page Application (SPA) Front-end architecture with a Python/Flask backend server modularized using Blueprints, alongside SQLite for persistence.

It provides features for two main user groups::
* **Candidates:** Job exploration with instant filters, quick job applications, a simple chatbot, and application tracking directly through the user profile.
* **Administrators:** An interactive Dashboard to analyze opportunities and user registrations.

#### **Live Demo:** [jobsniffer.onrender.com](https://jobsniffer.onrender.com/)

INSERT GIF HERE

---

## Architecture and Features

### 1. Challenges

- SPA navigation without frameworks;
<img src="_gifs/spa.gif" width="500" />
- Dynamic script loading;
<img src="_gifs/filtros.gif" width="500" />
- Modular Flask Blueprints;
- REST API organization;
- Authentication flow;;
<img src="_gifs/valida.gif" width="500" />
- Dashboard statistics and more!
<img src="_gifs/admin.gif" width="500" />

### 2. Technologies

- Flask
- SQLite
- Vanilla JavaScript
- HTML
- CSS

### 3. SPA Navigation and Routing
Ensures continuous navigation without page reloads, managing dynamic content injection and the lifecycle of scripts for each view.

| File | Responsibility |
|---|---|
| `js/globalRotas.js` | Manages dynamic screen swapping and link event interception. |
| `js/globalPopups.js` | Global utility for UI modals and system alert popups. |
| `js/globalAoTopo.js` | Handles smooth scrolling control and interface interactions. |

---

### 4. Job Listings, Filters, and Applications
Module focused on the display of job opportunities, allowing real-time searching and application submissions.

| File / Module | Responsibility |
|---|---|
| `js/vagas.js` / `js/vagasBanco.js` | Job data fetching, sorting, and rendering. |
| `js/vagasFiltros.js` | Search algorithms filtering by keyword, field of work, and contract type. |
| `js/vagasCandidatar.js` | Manages the candidate application flow for a specific job. |
| `py/rota/vagas.py` | REST routes for querying and listing jobs. |
| `py/rota/candidatura.py` | Route for handling and persisting job applications. |

---

### 5. Administrative Dashboard
Area focused on statistical data analysis with interactive charts.

| File / Module | Responsibility |
|---|---|
| `js/dashboard.js` | Main initialization logic and dashboard data handling. |
| `js/dashboardGraficos.js` | Visual rendering of charts and statistical reports. |
| `js/dashboardBanco.js` | Communication with backend metrics APIs. |
| `py/rota/dashboard.py` | Route responsible for consolidating metrics for the admin area. |

---

### 6. Authentication, User Profile, and Forms
Real-time frontend validation of input data and secure server-side processing.

| File / Module | Responsibility |
|---|---|
| `js/login.js` / `js/loginValidacoes.js` | User authentication control and session management. |
| `js/formulariosValidacoes.js` | Validation for passwords, emails, and input rules. |
| `js/formulariosAutoformatar.js` | Dynamic input masking (ZIP code, phone numbers, Tax IDs). |
| `js/perfil.js` / `js/editar.js` | User profile data viewing and updating. |
| `py/rota/login.py` / `py/rota/cadastro.py` | Backend routes for authentication and user registration in SQLite. |

---

### 7. Chatbot and Auxiliary Services

| File / Module | Responsibility |
|---|---|
| `js/chatbot.js` / `py/rota/chatbot.py` | Interactive assistant to answer quick questions about jobs and processes. |
| `js/email.js` / `py/email.py` | Integration for sending notifications and confirmation emails. |
| `py/iniciarBanco.py` / `py/sqliteSQL.py` | Scripts for database schema setup, initialization, and SQLite connection. |

---

## How to Run Locally

### Prerequisites
* Python 3.10 or higher
* Git

### Step by Step

1. **Clone the repository:**
    ```bash
    git clone https://github.com/nicovalentim/jobsniffer.git
    cd jobsniffer
    ```

2. **Create and activate the virtual environment:**

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

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the server:**
    ```bash
    python app.py
    ```

5. **Open in browser:** `http://127.0.0.1:5000`

## Acknowledgements

Although JobSniffer was primarily planned, developed and maintained by me, I'd like to thank:

- [Rods](https://github.com/Rodsmont) for creating the original mock SQL dataset used during development.
- [Rocharlia](https://github.com/rocharlia) for developing the chatbot module.
