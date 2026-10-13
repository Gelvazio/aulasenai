# Identificação obrigatória da IA executora (seção 3)

> 📎 **Origem:** `AGENTS.md` (linhas 259–268 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Ao travar uma tarefa, commitar o lock ou a entrega.

---

## 🏷️ 3. IDENTIFICAÇÃO OBRIGATÓRIA DA IA EXECUTORA

Sempre que uma IA assumir uma sub-task, deve identificar explicitamente seu nome/modelo em todos os registros:
- **Exemplos de identificação:** `Claude Code`, `xAI (Grok)`, `Gemini (Antigravity)`, `Copilot / OpenAI`.
- **Onde registrar o nome da IA:**
  - 1. No campo `Executor:` em [`task-principal.md`](task-principal.md).
  - 2. No campo `Agente Responsável:` da Trava Ativa e na tabela em `task-principal.md`.
  - 3. Na mensagem de commit do lock: `git commit -m "lock: assumindo sub-task SUB-XX por [Nome da IA]"`.
  - 4. Na anotação do bloco e no commit da entrega final.
