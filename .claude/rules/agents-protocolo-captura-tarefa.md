# Protocolo de captura de tarefa (lock em 3 partes)

> 📎 **Origem:** `AGENTS.md` (linhas 25–102 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Antes de assumir, executar ou concluir qualquer tarefa do quadro.

---

## 🔒 1. PROTOCOLO OBRIGATÓRIO DE CAPTURA DE TAREFA (LOCK EM 3 PARTES) E CONCORRÊNCIA

Todo e qualquer agente de IA (Claude, Gemini, Grok, Copilot, Antigravity, etc.) que chegar à fila de tarefas **DEVE SEGUIR RIGOROSAMENTE O FLUXO EM 3 PARTES ANTES DE MEXER NO CÓDIGO DA TAREFA**:

**CHECKLIST OBRIGATÓRIO ANTES DE ASSUMIR QUALQUER TAREFA:**
☐ [ ] Instalei os hooks de sincronização (`git config core.hooksPath .githooks`, seção 1.3)?
☐ [ ] Fiz `git fetch --all --prune` para atualizar a referência `origin/main`?
☐ [ ] Fiz `git pull --rebase origin main` **PRIMEIRO** (depois do fetch)?
☐ [ ] Li o arquivo ATUALIZADO (task-principal.md)?
☐ [ ] Verifiquei que a trava está LIVRE ou que minha task não conflita?
☐ [ ] Confirmei que todas as dependências estão `concluido`?
☐ [ ] Escolhi o item livre de **maior prioridade** (`MAXIMA` → `ALTA` → `MEDIA` → `BAIXA`, seção 1.2)?
☐ [ ] Não tenho nenhum outro item travado (máximo 1 subtarefa ou 1 tarefa atômica por agente)?
☐ [ ] O item é uma subtarefa ou tarefa atômica (não uma tarefa-mãe com subtarefas)?
☐ [ ] Vou fazer commit + push do lock IMEDIATAMENTE antes de codificar?

⛔ **Se NÃO marcou todos os ☐ acima, NÃO assuma a tarefa.**

---

### 🔹 PARTE 1 — LER O QUADRO E IDENTIFICAR A TAREFA PENDENTE

⚠️ **ORDEM OBRIGATÓRIA DE EXECUÇÃO (NÃO PULAR PASSOS):**

✅ **PASSO 1 (CRÍTICO — PRIMEIRO):** Executar `git fetch --all --prune` e, **só depois**, `git pull --rebase origin main`, para garantir o estado mais recente do repositório.
   - ⛔ **NUNCA** confie em `git status` / `git log` antes do `fetch`: eles comparam com a referência **local** `origin/main`, que envelhece. Um `## main...origin/main` sem `ahead`/`behind` **não** significa "estou atualizado".
   - ⛔ **NÃO** ler nenhum arquivo local antes destes comandos
   - ⛔ **NÃO** assumir nenhuma tarefa sem garantir que está no estado mais recente
   - Se o `fetch` indicar que `origin/main` andou, **releia o quadro** mesmo quando o pull for fast-forward
   - Os hooks da seção 1.3 automatizam o `fetch` no push e na troca de branch, mas **não substituem** este PASSO 1
   - Se houver conflito no rebase, resolver antes de prosseguir

✅ **PASSO 2 (SÓ DEPOIS DO GIT PULL):** Ler obrigatoriamente o arquivo ATUALIZADO:
   - 📄 [`task-principal.md`](task-principal.md)

✅ **PASSO 3:** Conferir a seção **"🔒 TRAVA ATIVA NO MOMENTO"** em `task-principal.md`:
   - ⛔ **PROIBIÇÃO TOTAL DE CONFLITO:** Se já existir uma task com trava ativa (tabela principal ou bloco `### 🔒 TRAVA ADICIONAL`) ou status `em_execucao` associada a outro agente, **NENHUMA OUTRA IA PODE ASSUMIR AQUELA MESMA TAREFA**.

✅ **PASSO 4:** Localizar a próxima sub-task com status `pendente`, **pela prioridade** (seção 1.2):
   - Verificar se todas as dependências da sub-task estão com status `concluido`
   - Entre os itens livres, pegar o de **maior prioridade** (`MAXIMA` → `ALTA` → `MEDIA` → `BAIXA`); na mesma prioridade, o primeiro na ordem do quadro
   - ⛔ **NÃO** assumir uma tarefa cujas dependências não estejam 100% concluídas

---

### ⚠️ ERROS COMUNS A EVITAR (CAUSAM CONFLITOS)

❌ **CONFIAR NO `git status` SEM `git fetch`:** a referência `origin/main` é local e envelhece; sem o fetch você pode jurar que está sincronizado com um remoto vários commits à frente.
❌ **LER ARQUIVOS LOCAIS ANTES DE GIT PULL:** Os arquivos podem estar desatualizados. Sempre fazer `git fetch --all` e `git pull` primeiro.
❌ **ASSUMIR TAREFA SEM VERIFICAR TRAVAS:** Pode resultar em múltiplos agentes trabalhando na mesma tarefa.
❌ **IGNORAR DEPENDÊNCIAS:** Uma tarefa só pode ser assumida se todas as suas dependências estiverem `concluido`.
❌ **NÃO FAZER COMMIT/PUSH DO LOCK:** O lock não é válido até ser commitado e pushed para o remoto.

---

### 🔹 PARTE 2 — GRAVAR O BLOQUEIO NO QUADRO, FAZER COMMIT E PUSH IMEDIATOS
1. Gravar a tarefa como bloqueada no quadro para que nenhuma outra IA a pegue:
   - Em `task-principal.md`: mudar o status da sub-task para `em_execucao` e registrar o executor.
2. **Executar COMMIT e PUSH do bloqueio IMEDIATAMENTE (antes de criar código da tarefa):**
   ```bash
   git add task-principal.md
   git commit -m "lock: assumindo sub-task SUB-XX por [Nome do Agente]"
   git push origin main
   ```
   *Dessa forma, a main remota no GitHub é atualizada na hora, impedindo colisões de outros agentes.*

---

### 🔹 PARTE 3 — EXECUÇÃO, FINALIZAÇÃO, COMMIT E PUSH DA ENTREGA
1. Executar e validar o código da mini-task com qualidade.
2. Atualizar `task-principal.md`: alterar status para `concluido` e registrar a anotação técnica detalhada; em seguida **mover o bloco concluído** (inteiro, com commit, anotação e confirmação) para o fim da fase correspondente em `task_complete.md`. Na lista `Subtarefas:` da tarefa-mãe fica só a referência `(concluido, <sha>)`. Se a tarefa-mãe for fechada, o bloco dela também vai para o `task_complete.md`.
3. **Executar COMMIT e PUSH da conclusão IMEDIATAMENTE:**
   ```bash
   git add <arquivos da tarefa> task-principal.md task_complete.md
   git commit -m "feat(SUB-XX): descrição do que foi implementado"
   git push origin main
   ```
