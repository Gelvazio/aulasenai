## Etapa 503-1278024c — Hook do ai-memory falhando no Devin Desktop

**Tarefa:** #354-1278024c-8c93-4a36-8d83-1d2f36f9110c · **Pedido em:** 2026-10-24 19:55 · **Criada por:** Devin (local · main)
**Pedido:** "HOOK FALHANDO" — print com `Hook failed: C:\Users\gelva\AppData\Local\Programs\ai-memory\ai-memory.exe: Command exited with code 127` a cada chamada de ferramenta.
**Objetivo:** corrigir o comando do hook do ai-memory em `.claude/settings.json` para o Devin conseguir executá-lo, mantendo o Claude Code funcionando.

### Diagnóstico

- O Devin importa hooks do provedor Claude (`hooks discovery ... by_provider=[claude=9]`): 2 globais + 7 do projeto.
- As entradas do ai-memory em `.claude/settings.json` usam `command` = caminho do `.exe` com barras invertidas e `args` separado. No bash do Devin, `C:\Users\...` vira `C:Users...` (barras comem o caractere seguinte) → comando não encontrado → exit 127.
- O binário funciona: `ai-memory.exe ... hook --event post-tool-use` responde `{}` e sai com 0 quando chamado com o caminho certo.
- Correção: juntar comando + argumentos numa string só, com o caminho entre aspas (funciona em cmd e bash), e tirar o campo `args`.

### #354.1 — Corrigir os hooks do ai-memory no `.claude/settings.json`

**Próximo passo:** reescrever `command` das entradas de `SessionStart` e `PostToolUse` com o caminho do `.exe` entre aspas e os argumentos na mesma string; commit + push na main.

- **Nível:** LEVE — ajuste pontual de 1 arquivo de configuração, sem banco/RLS (Jev sugeriu LEVE, confiança 0,22; revisão humana recomendada; mesma situação da #353.1 executada pelo Devin)
- **Modelo:** LEVE · só Haiku — executada pelo Devin por pedido direto do usuário nesta sessão (precedente: #353.1)
- **Descrição:** `.claude/settings.json`, hooks `session-start` e `post-tool-use` do ai-memory: `command` vira `"C:\Users\gelva\AppData\Local\Programs\ai-memory\ai-memory.exe" --data-dir "C:\Users\gelva\AppData\Local\ai-memory" hook --event <evento> --agent claude-code --server-url "http://127.0.0.1:49374"`; remover `args`.
- **Critérios de aceitação:** sem `Hook failed ... code 127` no Devin; `ai-memory.exe` chamado à mão com a nova string sai com 0; Claude Code continua rodando o mesmo hook.
- **Entrega:** `.claude/settings.json` — `command` das entradas do ai-memory em `SessionStart` e `PostToolUse` agora traz o caminho do `.exe` entre aspas e os argumentos na mesma string; campo `args` removido. Commit na `main`.
- **Verificação:** `node -e require(...settings.json)` confirma JSON válido e a nova string; `bash -c '"C:\...\ai-memory.exe" --data-dir "..." hook --event post-tool-use ...'` retorna `{}` e exit 0. O próximo uso do Devin deve sair sem `Hook failed ... 127`.
