# model_gateway.py - SLM-First Gateway with LLM Escalation
"""
Model Gateway that routes queries to SLM first (fine-tuned Llama 3.1)
and escalates to LLM (GPT-4o-mini) only when SLM fails or is uncertain.
"""

import os
import requests
from dotenv import load_dotenv
from llm_service import call_llm

load_dotenv()

# Configuration
SLM_ENDPOINT = os.getenv("SLM_ENDPOINT", "http://localhost:8035/chat")
SLM_ENABLED = os.getenv("SLM_ENABLED", "true").lower() == "true"

# Escalation trigger phrases - if SLM response contains these, escalate to LLM
ESCALATION_TRIGGERS = [
    "i don't know",
    "i'm not sure",
    "cannot help",
    "unable to",
    "i don't understand",
    "please clarify",
    "not trained",
    "out of scope",
    "need more context",
    "system error",
]

# Query patterns that should bypass SLM and go directly to LLM
LLM_ONLY_PATTERNS = [
    "compare",
    "analyze", 
    "summarize",
    "what if",
    "should i",
    "recommend",
    "help me decide",
    "what do you think",
    "explain why",
    "how does this work",
]


def call_slm(message: str, role: str, user_id: str, team_id: str = None) -> dict:
    """
    Call the SLM backend (ai_backend/server.py).
    Returns dict with 'response' key or None on failure.
    """
    try:
        payload = {
            "message": message,
            "role": role,
            "user_id": user_id,
        }
        if team_id:
            payload["team_id"] = team_id
            
        response = requests.post(
            SLM_ENDPOINT,
            json=payload,
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.ConnectionError:
        print(f"[GATEWAY] SLM server not reachable at {SLM_ENDPOINT}")
        return None
    except requests.exceptions.Timeout:
        print(f"[GATEWAY] SLM request timed out")
        return None
    except Exception as e:
        print(f"[GATEWAY] SLM error: {e}")
        return None


def needs_escalation(slm_response: dict) -> bool:
    """
    Check if SLM response indicates it needs LLM help.
    """
    if not slm_response:
        return True
    
    response_text = slm_response.get("response", "")
    if not response_text or len(response_text.strip()) < 5:
        return True
    
    response_lower = response_text.lower()
    return any(trigger in response_lower for trigger in ESCALATION_TRIGGERS)


def should_bypass_slm(query: str) -> bool:
    """
    Check if query should go directly to LLM (skip SLM).
    """
    query_lower = query.lower()
    return any(pattern in query_lower for pattern in LLM_ONLY_PATTERNS)


def route_query(message: str, role: str, user_id: str, team_id: str = None) -> dict:
    """
    Main Gateway: SLM-first with automatic LLM escalation.
    
    Flow:
    1. Check if SLM is enabled
    2. Check if query needs LLM directly
    3. Try SLM first
    4. If SLM fails/uncertain → escalate to LLM
    
    Returns dict with:
    - 'response': The AI response
    - 'model': 'slm' or 'llm' (for frontend indicator)
    - 'escalated': True if we fell back to LLM
    """
    
    # Step 0: If SLM is disabled, go straight to LLM
    if not SLM_ENABLED:
        print(f"[GATEWAY] SLM disabled → using LLM")
        llm_response = _call_llm_with_context(message, role, user_id, team_id)
        return {
            "response": llm_response,
            "model": "llm",
            "escalated": False
        }
    
    # Step 1: Check for LLM-only queries
    if should_bypass_slm(message):
        print(f"[GATEWAY] Query requires LLM → routing directly")
        llm_response = _call_llm_with_context(message, role, user_id, team_id)
        return {
            "response": f"🧠 *Advanced AI Response:*\n\n{llm_response}",
            "model": "llm",
            "escalated": False
        }
    
    # Step 2: Try SLM first
    print(f"[GATEWAY] Trying SLM first...")
    slm_result = call_slm(message, role, user_id, team_id)
    
    # Step 3: Check if escalation needed
    if needs_escalation(slm_result):
        print(f"[GATEWAY] SLM uncertain/failed → escalating to LLM")
        llm_response = _call_llm_with_context(message, role, user_id, team_id)
        return {
            "response": f"🧠 *Escalated to Advanced AI:*\n\n{llm_response}",
            "model": "llm",
            "escalated": True
        }
    
    print(f"[GATEWAY] SLM handled successfully")
    return {
        "response": slm_result.get("response", ""),
        "model": "slm",
        "escalated": False
    }


def _call_llm_with_context(message: str, role: str, user_id: str, team_id: str = None) -> str:
    """
    Call LLM with full context prompt.
    """
    from sql_agent import generate_sql
    
    # Use existing sql_agent to generate response
    sql_or_action = generate_sql(role, user_id, team_id, message)
    
    # If it's a simple action JSON or SQL, we need to process it
    # For now, return the raw response
    return sql_or_action
