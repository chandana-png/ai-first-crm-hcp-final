# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) system designed for Healthcare Professionals (HCPs). This application enables pharmaceutical sales representatives to efficiently log, manage, search, summarize, and update HCP interactions using both a structured form and an AI-powered conversational interface.

---

## Repository

GitHub Repository:
https://github.com/chandana-png/ai-first-crm-hcp-final.git

---

# Features

## Manual Interaction Logging

Log HCP interactions through a structured form by capturing:

- Doctor Name
- Hospital
- Specialty
- Interaction Type
- Products Discussed
- Summary
- Follow-up Date

---

## AI Chat Assistant

- Log interactions using natural language.
- Automatically extracts interaction details using a Large Language Model (LLM).
- Stores structured data directly into PostgreSQL.
- Generates intelligent summaries and follow-up recommendations.

---

## Recent Interactions

- View all previously logged interactions.
- Displays:
  - Doctor Name
  - Hospital
  - Interaction Type
  - Products Discussed
  - Summary
  - Follow-up Date

---

# LangGraph AI Agent

The application uses a **LangGraph AI Agent** to understand user intent and intelligently route requests to different tools.

### Implemented AI Tools

### 1. Log Interaction
- Extracts structured information from natural language.
- Captures doctor name, hospital, products discussed, summary, and follow-up date.
- Saves interactions into PostgreSQL.

### 2. Edit Interaction
- Updates existing interactions using natural language.
- Supports modification of summaries, products, hospitals, and follow-up dates.

### 3. Search Interaction
- Searches interactions by:
  - Doctor Name
  - Hospital
  - Product
- Returns matching interaction records.

### 4. Interaction Summary
- Generates an AI-powered summary of previous HCP interactions.
- Highlights discussion points and important insights.

### 5. Follow-up Suggestions
- Analyzes previous interactions.
- Recommends suitable next actions for future engagement.

---

# Tech Stack

## Frontend

- React
- Redux Toolkit
- Tailwind CSS
- Axios
- Vite

## Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

## AI Technologies

- LangGraph
- LangChain
- Groq LLM (Llama 3.3 70B Versatile)

---

# Project Structure

```
ai-first-crm-hcp/
│
├── backend/
│   ├── app/
│   │   ├── agent/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tools/
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/chandana-png/ai-first-crm-hcp-final.git
```

```bash
cd ai-first-crm-hcp-final
```

---

# Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment (Windows):

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
```

Run the backend server:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# AI Workflow

```
User Input
      │
      ▼
LangGraph Router
      │
      ▼
Intent Detection
      │
      ▼
───────────────────────────────────────
│ Log Interaction Tool                │
│ Edit Interaction Tool               │
│ Search Interaction Tool             │
│ Interaction Summary Tool            │
│ Follow-up Suggestion Tool           │
───────────────────────────────────────
      │
      ▼
PostgreSQL Database
      │
      ▼
AI Response
```

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/interaction/chat` | AI Chat |
| POST | `/interaction/manual` | Manual Interaction Logging |
| GET | `/interaction/all` | Retrieve All Interactions |

---

# Sample AI Commands

### Log Interaction

```
I met Dr Meera Nair at Manipal Hospital. We discussed NeuroCure. The doctor requested clinical trial reports. Follow up next Wednesday.
```

### Edit Interaction

```
Update Dr Meera Nair's summary to Doctor requested additional clinical trial documents.
```

### Search Interaction

```
Search Dr Meera Nair
```

### Generate Summary

```
Summarize Dr Meera Nair
```

### Follow-up Suggestions

```
Suggest follow up for Dr Meera Nair
```

---

# Future Enhancements

- Voice-to-text interaction logging
- Authentication and user management
- Dashboard analytics
- Email reminders
- Calendar integration
- Advanced interaction filtering
- AI-powered meeting preparation
- Notification system

---

# Author

**Chandana SM**

Electronics and Communication Engineering

---

# License

This project is intended for educational, learning, and portfolio purposes.