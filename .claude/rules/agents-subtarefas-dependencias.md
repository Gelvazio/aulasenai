# Subdivisão em subtarefas e dependências (seção 2)

> 📎 **Origem:** `AGENTS.md` (linhas 244–256 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Ao criar ou subdividir tarefas no quadro.

---

## 🧩 2. SUBDIVISÃO EM SUBTAREFAS E CONTROLE DE DEPENDÊNCIAS

1. **Subdivisão Contínua (Granularidade Máxima):**
   - Qualquer tarefa ou subtarefa pode ser subdividida em tarefas menores (ex: `SUB-01.1`, `SUB-01.2`, `SUB-01.3`) caso o agente identifique etapas independentes.
   - Isso permite que qualquer IA assuma uma fração clara e objetiva do trabalho sem perder contexto.

2. **Declaração Obrigatória de Dependências e Subtarefas:**
   - Toda tarefa em [`task-principal.md`](task-principal.md) deve conter obrigatoriamente:
     - **`Depende de:`** Código das tasks que precisam estar `concluido` antes de iniciar (ex: `SUB-01` ou `Nenhuma`).
     - **`Subtarefas:`** Lista de subtarefas filhas em que ela se divide (ou `Nenhuma (atômica)`).
     - **`Prioridade:`** `MAXIMA`, `ALTA`, `MEDIA` ou `BAIXA` (seção 1.2).
   - ⛔ **REGRA DE BLOQUEIO POR DEPENDÊNCIA:** Nenhuma IA pode assumir uma tarefa cujas dependências ainda não estejam 100% `concluido`.
