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

**JobSniffer** is a full-stack platform for job searching, management, and application tracking planned, built and tested by myself, [nicovalentim](https://github.com/nicovalentim).

The project combines a lightweight Single Page Application (SPA) Front-end architecture with a Python/Flask backend server modularized using Blueprints, alongside an SQLite database for persistence.

The solution serves two main fronts:
* **Candidates:** Job exploration with instant filters, quick application process, virtual assistant (Chatbot), and application tracking directly through the user profile.
* **Administrators:** An interactive Dashboard featuring visual metrics and charts to analyze opportunities and user registrations.

#### **Live Demo:** [jobsniffer.onrender.com](https://jobsniffer.onrender.com/)

---

## Architecture and Features

### 1. SPA Navigation and Routing
Ensures continuous navigation without page reloads, managing dynamic content injection and the lifecycle of scripts for each view.

| File | Responsibility |
|---|---|
| `js/globalRotas.js` | Manages dynamic screen swapping and link event interception. |
| `js/globalPopups.js` | Global utility for UI modals and system alert popups. |
| `js/globalAoTopo.js` | Handles smooth scrolling control and interface interactions. |

---

### 2. Job Listings, Filters, and Applications
Module focused on the responsive display of job opportunities, allowing real-time searching and application submissions.
The mock database creation in SQL (which was converted to SQLite during execution) was entirely built by [Rods](https://github.com/Rodsmont).

| File / Module | Responsibility |
|---|---|
| `js/vagas.js` / `js/vagasBanco.js` | Job data fetching, sorting, and rendering. |
| `js/vagasFiltros.js` | Search algorithms filtering by text, field of work, and contract type. |
| `js/vagasCandidatar.js` | Manages the candidate application flow for a specific job. |
| `py/rota/vagas.py` | REST endpoints for querying and listing jobs. |
| `py/rota/candidatura.py` | Route for handling and persisting job applications. |

---

### 3. Administrative Dashboard and Metrics
Area focused on statistical data analysis with support for chart components.

| File / Module | Responsibility |
|---|---|
| `js/dashboard.js` | Main initialization logic and dashboard data handling. |
| `js/dashboardGraficos.js` | Visual rendering of charts and statistical reports. |
| `js/dashboardBanco.js` | Communication with backend metrics APIs. |
| `py/rota/dashboard.py` | Endpoint responsible for consolidating metrics for the admin area. |

---

### 4. Authentication, User Profile, and Forms
Real-time front-end validation of input data and secure server-side processing.

| File / Module | Responsibility |
|---|---|
| `js/login.js` / `js/loginValidacoes.js` | User authentication control and session management. |
| `js/formulariosValidacoes.js` | Validation for passwords, emails, and input rules. |
| `js/formulariosAutoformatar.js` | Dynamic input masking (ZIP code, phone numbers, Tax IDs). |
| `js/perfil.js` / `js/editar.js` | User profile data viewing and updating. |
| `py/rota/login.py` / `py/rota/cadastro.py` | Backend endpoints for authentication and user registration in SQLite. |

---

### 5. Chatbot and Auxiliary Services

| File / Module | Responsibility |
|---|---|
| `js/chatbot.js` / `py/rota/chatbot.py` | Interactive assistant to answer quick questions about jobs and processes.* |
| `js/email.js` / `py/email.py` | Integration for sending notifications and confirmation emails. |
| `py/iniciarBanco.py` / `py/sqliteSQL.py` | Scripts for database schema setup, initialization, and SQLite connection. |
* Entirely developed by [rocharlia](https://github.com/rocharlia).

---

## How to Run Locally

### Prerequisites
* Python 3.10 or higher
* Git

### Step by Step

1. **Clone the repository:**
    ```bash
    git clone [https://github.com/nicovalentim/jobsniffer.git](https://github.com/nicovalentim/jobsniffer.git)
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