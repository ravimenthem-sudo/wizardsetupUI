# 🤖 TalentOps Model Gateway

An intelligent **Model Gateway Router** that routes chatbot queries between:
- **SLM (Small Language Model)** - Fine-tuned Llama 3.1 for HR operations
- **LLM (Large Language Model)** - GPT-4o-mini for complex reasoning

---

## 📁 Folder Structure

```
modalgateway/
├── llm-backend/          # LLM Backend (OpenAI GPT-4o-mini)
│   ├── main.py           # Flask server (port 5000)
│   ├── model_gateway.py  # Gateway router
│   ├── llm_service.py    # OpenAI integration
│   ├── sql_agent.py      # SQL/Action generation
│   ├── guardrails.py     # Security & validation
│   └── ...
│
├── slm-backend/          # SLM Backend (Fine-tuned Llama 3.1)
│   ├── server.py         # FastAPI server (port 8035)
│   ├── sql_gen.py        # SQL generation
│   ├── guardrails.py     # Security & validation
│   └── ...
│
├── shared/               # Shared utilities (future)
│
├── docs/                 # Documentation
│   ├── agent_routing_guide.md
│   └── model_gateway_merge_guide.md
│
└── README.md             # This file
```

---

## 🔀 Routing Logic

```
User Query → Model Gateway
    │
    ├─► SLM Backend (port 8035)
    │       │
    │       ├─ Success → Return response
    │       │
    │       └─ Uncertain/Failed → Escalate
    │                               │
    └───────────────────────────────► LLM Backend → Return response
```

---

## 🚀 Quick Start

### 1. Start SLM Backend (Primary)
```bash
cd slm-backend
python server.py
# Runs on http://localhost:8035
```

### 2. Start LLM Gateway (Secondary)
```bash
cd llm-backend
python main.py
# Runs on http://localhost:5000
```

### 3. Frontend connects to `http://localhost:5000/chat`

---

## ⚙️ Environment Configuration

Add to `llm-backend/.env`:
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-key

# OpenAI (LLM)
OPENAI_API_KEY=sk-xxxx

# SLM Gateway
SLM_ENDPOINT=http://localhost:8035/chat
SLM_ENABLED=true
```

---

## 📊 Task Distribution

| Task Type | Model | Why |
|-----------|-------|-----|
| Clock In/Out | **SLM** | Fine-tuned |
| Task Creation | **SLM** | Fine-tuned |
| Timesheet Ops | **SLM** | Fine-tuned |
| Leave Requests | **SLM** | Fine-tuned |
| Data Fetching | **SLM** | Fine-tuned |
| **Complex Comparisons** | LLM | Multi-step reasoning |
| **Ambiguous Queries** | LLM | Needs clarification |
| **SLM Failures** | LLM | Automatic escalation |

---

## 📖 Documentation

- [Agent Routing Guide](docs/agent_routing_guide.md) - Which agent handles what
- [Merge Guide](docs/model_gateway_merge_guide.md) - How to merge SLM/LLM projects
