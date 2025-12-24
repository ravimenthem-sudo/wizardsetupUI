# 🎯 TalentOps - AI-Powered HR Management System

An enterprise-grade HR operations platform with an intelligent AI assistant that routes queries between a fine-tuned SLM (Small Language Model) and LLM (Large Language Model).

## 📁 Project Structure

```
Talent Ops/
├── frontend/                    # React/Vite Frontend
│   ├── components/
│   │   ├── employee/           # Employee Dashboard
│   │   ├── manager/            # Manager Dashboard
│   │   ├── teamlead/           # Team Lead Dashboard
│   │   └── executive/          # Executive Dashboard
│   └── lib/                    # Shared utilities
│
├── modalgateway/               # Model Gateway - AI Backend Services
│   ├── llm-backend/            # LLM Gateway (Port 8000)
│   │   ├── main.py             # Flask API + Model Gateway
│   │   ├── model_gateway.py    # SLM-first routing logic
│   │   └── requirements.txt
│   │
│   ├── slm-backend/            # SLM Service (Port 8035)
│   │   ├── server.py           # FastAPI + Fine-tuned Llama
│   │   └── requirements.txt
│   │
│   └── docs/                   # API Documentation
│
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Supabase account
- Together AI API key
- OpenAI API key

### 1. Clone & Setup

```bash
cd "Talent Ops"
python -m venv .venv
.venv\Scripts\activate       # Windows
source .venv/bin/activate    # Linux/Mac
```

### 2. Install Dependencies

```bash
# Backend - LLM Gateway
cd modalgateway/llm-backend
pip install -r requirements.txt

# Backend - SLM Service
cd ../slm-backend
pip install -r requirements.txt

# Frontend
cd ../../frontend
npm install
```

### 3. Configure Environment

Create `.env` files in both backend folders:

**modalgateway/llm-backend/.env**
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-key
SLM_ENDPOINT=http://localhost:8035/chat
SLM_ENABLED=true
```

**modalgateway/slm-backend/.env**
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
TOGETHER_API_KEY=your-together-key
```

### 4. Run the Application

```bash
# Terminal 1: SLM Backend
cd modalgateway/slm-backend
python server.py

# Terminal 2: LLM Gateway
cd modalgateway/llm-backend
python main.py

# Terminal 3: Frontend
cd frontend
npm run dev
```

Access at: http://localhost:5173

## 🤖 Model Gateway Architecture

```
User Query
    │
    ▼
┌─────────────────────────┐
│   Model Gateway (8000)  │
│   ┌─────────────────┐   │
│   │ Check LLM-only? │───┼─── Yes ──▶ LLM (GPT-4o-mini)
│   └────────┬────────┘   │
│            │ No         │
│   ┌────────▼────────┐   │
│   │   Try SLM First │───┼─── Success ──▶ Return Response
│   └────────┬────────┘   │
│            │ Fail       │
│   ┌────────▼────────┐   │
│   │  Escalate to LLM│   │
│   └─────────────────┘   │
└─────────────────────────┘
```

**SLM Handles:** Clock in/out, Tasks, Leaves, Timesheets, Announcements
**LLM Handles:** Complex analysis, Comparisons, Recommendations, Escalations

## 🔐 Role-Based Access

| Role | Permissions |
|------|-------------|
| Employee | Own tasks, leaves, attendance |
| Team Lead | Team tasks, own attendance |
| Manager | Team management, leave approval |
| Executive | Full access, analytics |

## 📦 Tech Stack

- **Frontend:** React + Vite + Supabase Client
- **LLM Backend:** Flask + OpenAI GPT-4o-mini
- **SLM Backend:** FastAPI + Together AI (Llama 3.1)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth

## 📝 License

MIT License - See LICENSE file for details.

