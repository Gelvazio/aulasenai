## Etapa 297-d2466a5b — Aplicar a estrutura de projeto do Claude Code (infográfico) no aulasenai

**Tarefa:** #170-d2466a5b-e5bb-4668-a23d-08ec57222049 · **Pedido em:** 2026-10-14 22:41 · **Executor:** Claude Code (nuvem · session_01TWwZ3R)
**Pedido:** "Aplique tudo dele no aulasenai" — "ele" = infográfico "Claude Code Project Structure" (Brij Kishore Pandey), enviado como print do Instagram.
**Objetivo:** levar para o repositório as partes do infográfico que ainda faltam (comandos, subagentes, hooks, settings local, modelo de variáveis), adaptadas às regras do projeto.
**Próximo passo:** 170.8 — aceite do usuário (abrir uma sessão do Claude Code no repositório e ver os comandos `/revisar`, `/entregar`… e o checklist do início).

### Escopo

**O projeto já tem** (do infográfico): `CLAUDE.md` curto (aponta para o `AGENTS.md`, com stack,
convenções, git, segurança e validação), `.claude/settings.json` com permissões, `.claude/skills/`
(5 skills), `docs/` com orientações. Ficam como estão.

**Entra** (adaptado):

| Parte do infográfico | Como fica no aulasenai |
|---|---|
| `.claude/commands/` | `/revisar` (diff contra SOLID, limites, RLS/JWT, gabarito), `/entregar` (encerrar a TASK: quadro, visualizador, 1 commit + push na `main`), `/validar` (no lugar de `/test-all`: `node --check` dos JS alterados), `/nova-materia` (no lugar de `/bootstrap`: pastas e 5 status de `materias-global.md`), `/documentar` (atualizar `docs/ORIENTACAO_JS_*.md` do módulo alterado), `/refatorar` (aplicar `codigo-limites-nomes.md` no arquivo indicado) |
| `.claude/agents/` | Subagentes `revisor-codigo`, `auditor-seguranca` (RLS, JWT, gabarito, chaves) e `auditor-quadro` (STATUS × etapas). Formato real do Claude Code: `.md` com cabeçalho, não `.yml` como no infográfico |
| `.claude/skills/` | Skills `revisao-codigo` e `auditoria-seguranca` (com `SKILL.md`, `references/` apontando para as regras) |
| Hooks (`settings.json`) | **PreToolUse:** bloquear `git add .`/`-A`, criar `*.test.js`/`*.spec.js`/`test_*.py`, editar à mão `.claude/rules/index.html`, abrir navegador. **PostToolUse:** `node --check` em `.js` gravado. **SessionStart:** mostrar o checklist de `essentials.md`. **Antes do commit:** procurar chave (`service_role`, `sk-`, JWT) no que vai ser commitado e bloquear |
| Scripts dos hooks | `scripts/claude-hooks/*.js` em Node (funciona no Windows local e na nuvem), com JSDoc e limites do projeto |
| `settings.local.json` | Entra no `.gitignore` (configuração pessoal, fora do Git) |
| `.env.example` | `scripts/variaveis.example.js` — modelo vazio do `variaveis.js` (conferir `.vercelignore`) |
| Documentação | Regra nova `.claude/rules/claude-code.md` (comandos, subagentes, hooks, contexto: `/compact`, `/clear`, `/cost`), `INDEX.md`, `docs/HISTORICO-REGRAS.md`, visualizador regenerado |

**Não entra** (conflita com regra do projeto ou não existe aqui):

| Parte | Motivo |
|---|---|
| `test-writer`, `/test-all`, pasta `tests/` | Regra 6: nunca escrever testes automatizados |
| `.mcp.json` com Supabase/Postgres | Regra 8: banco só pelo Claude Code local (com o conector da máquina); no repositório, toda sessão de nuvem teria acesso |
| MCP Playwright, hook que abre navegador | Regra 6: sem navegador |
| `src/`, `package.json`, `tsconfig.json`, `Dockerfile` | Site estático HTML/JS + Supabase, sem build |
| `/deploy` para staging, agente `devops-sre` | Deploy é o push na `main` (Vercel); vira o `/entregar` |
| Agent Teams, `plugins/` com `manifest.json` | Coordenação já é pelo quadro; plugin serve para distribuir a outros projetos |
| Hook Notification (Slack/webhook) e SessionEnd | Sem Slack nem webhook configurado |

### Critério de pronto

Arquivos criados, `node --check` nos scripts dos hooks, JSON do `settings.json` válido, hooks
conferidos rodando cada script com entrada de exemplo no terminal, visualizador regenerado,
1 commit + push na `main`.

### Riscos

| Risco | Plano B |
|---|---|
| Hook bloquear trabalho legítimo de outra frente (ex.: teste de bug, permitido pela regra 6) | Bloqueio com mensagem clara; arquivo de teste liberado se a etapa for de bug — senão, remover só aquele bloqueio |
| `node` fora do PATH em alguma máquina | Hook sai sem bloquear (avisa e deixa passar) |
| Sobreposição com a #168 (skill de auditoria independente, reservada por outra frente) | `auditoria-seguranca` só cobre RLS/JWT/gabarito/chaves; a #168 segue com a auditoria de tarefa |

### Decisões

- 2026-10-14 23:00 (Claude Code): o hook bloqueou um comando desta própria tarefa porque o texto do
  histórico citava "Playwright". As regras de `git add` e de navegador passaram a valer só no
  **início de um comando** (começo de linha ou depois de `;`, `&&`, `|`); palavra dentro de texto
  (heredoc, mensagem de commit) não bloqueia mais. Conferido com 10 casos de exemplo.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 170.1 | Plano nesta etapa (tarefa grande: estrutura nova + configuração de segurança) | ✅ Concluído | 2026-10-14 22:46 | leitura das regras e do repositório |
| 170.2 | Aprovação do usuário | ✅ Concluído | 2026-10-14 22:46 | "Sim" do usuário (Gelvazio) no chat, 2026-10-14 22:46 |
| 170.3 | Scripts dos hooks em `scripts/claude-hooks/` + hooks no `settings.json` | ✅ Concluído | 2026-10-14 22:47 | `node --check` nos 6 scripts; JSON do settings válido; 14 entradas de exemplo (bloqueia git add ., teste, index.html, navegador, JS quebrado, JWT service_role, sk-; libera anon, teste de bug, git add de arquivos) |
| 170.4 | `.claude/commands/` (6 comandos) | ✅ Concluído | 2026-10-14 22:48 | leitura dos 6 arquivos (cabeçalho `description` em cada um; `/revisar`, `/entregar`, `/validar`, `/nova-materia`, `/documentar`, `/refatorar`) |
| 170.5 | `.claude/agents/` (3 subagentes) e `.claude/skills/` (2 skills) | ✅ Concluído | 2026-10-14 22:49 | leitura do cabeçalho (`name`, `description`, `tools` só de leitura) dos 3 subagentes e das 2 skills; `references/` só aponta para as regras |
| 170.6 | `.gitignore` (`settings.local.json`) e `scripts/variaveis.example.js` (+ `.vercelignore`) | ✅ Concluído | 2026-10-14 22:49 | `git check-ignore`: `settings.local.json` e `variaveis.js` ignorados, `variaveis.example.js` não; modelo sem chave (vazio), pode ir ao site sem risco — `.vercelignore` sem mudança |
| 170.7 | Regra `claude-code.md`, `INDEX.md`, histórico e visualizador | ✅ Concluído | 2026-10-14 23:04 | `claude-code.md` com 3 KB (≤ 5 KB); listado no `INDEX.md`; histórico com a linha; gerador sem erro (98 seções, regra aparece no `index.html`) |
| 170.8 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
