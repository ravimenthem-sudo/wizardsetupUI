# 🧠 Agent Routing Guide: SLM vs LLM

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    USER QUERY                           │
└─────────────────────┬───────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────┐
│              MODEL GATEWAY (Router)                     │
│  • Sends ALL queries to SLM first                       │
│  • Escalates to LLM only on SLM failure/uncertainty     │
└─────────────────────┬───────────────────────────────────┘
                      ▼
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌───────────────────┐     ┌───────────────────┐
│   SLM (Primary)   │     │  LLM (Escalation) │
│ Fine-tuned Model  │ ──► │    GPT-4o-mini    │
│  ~90% of queries  │     │  ~10% of queries  │
└───────────────────┘     └───────────────────┘
```

---

## 📊 Complete Routing Matrix

### SLM Handles (Fine-Tuned Actions)

| Category | Action | Example Query |
|----------|--------|---------------|
| **Attendance** | `clock_in` | "Clock me in" |
| | `clock_out` | "Clock out" |
| | `get_attendance` | "Show my attendance" |
| | `view_team_attendance` | "Team attendance today" |
| **Tasks** | `create_task` | "Create task for John: Review docs" |
| | `view_my_tasks` | "Show my tasks" |
| | `view_team_tasks` | "Show team tasks" |
| **Leaves** | `apply_leave` | "Apply leave from Dec 26-28" |
| | `manager_approve_leave` | "Approve John's leave" |
| | `reject_leave` | "Reject the pending leave" |
| **Announcements** | `post_announcement` | "Announce holiday on Friday" |
| **General** | Greetings | "Hi", "Hello", "Thanks" |
| | Status checks | "My leave balance" |

---

### LLM Handles (Escalation Only)

| Category | When Used | Example |
|----------|-----------|---------|
| **SLM Failure** | SLM says "I don't know" | Auto-escalation |
| **Complex Reasoning** | Multi-step analysis | "Compare this month vs last month" |
| **Ambiguous Queries** | Unclear intent | "What should I do about..." |
| **Hypotheticals** | "What if" scenarios | "What if I take leave on..." |
| **Recommendations** | Advice needed | "Should I approve this leave?" |
| **Explanations** | Why/How questions | "Why was my leave rejected?" |

---

## 🔀 Routing Decision Flow

```
1. User sends query
       │
       ▼
2. Gateway receives query
       │
       ▼
3. Is it a "LLM-only" pattern?
   (compare, analyze, what if, recommend)
       │
   ┌───┴───┐
   │ YES   │ NO
   ▼       ▼
4. LLM    5. Send to SLM
   │           │
   │           ▼
   │      6. Did SLM respond with confidence?
   │           │
   │       ┌───┴───┐
   │       │ YES   │ NO (uncertain/error)
   │       ▼       ▼
   │   7. Return  8. Escalate to LLM
   │      SLM        │
   │      response   │
   ▼                 ▼
   Return LLM response
```

---

## 📋 Escalation Trigger Phrases

SLM responses containing these → **Auto-escalate to LLM**:

```python
ESCALATION_TRIGGERS = [
    "i don't know",
    "i'm not sure",
    "cannot help",
    "unable to",
    "please clarify",
    "not trained for",
    "out of scope",
]
```

---

## 🎯 Summary

| Model | Role | % Traffic | Handles |
|-------|------|-----------|---------|
| **SLM** | Primary | ~90% | All trained HR operations |
| **LLM** | Fallback | ~10% | Edge cases, complex reasoning, SLM failures |

> **Key Principle**: SLM-first approach. LLM is backup only.
