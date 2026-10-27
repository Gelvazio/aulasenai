# 🧰 Claude Code — comandos, subagentes, skills e hooks

Estrutura do Claude Code neste projeto (tarefa #170, adaptada do infográfico "Claude Code Project
Structure"). Vale para o Claude Code local e de nuvem; as outras IAs seguem as mesmas regras pelo
`AGENTS.md`.

## Onde fica cada coisa

| Parte | Onde | Para quê |
|-------|------|----------|
| Memória do projeto | `CLAUDE.md` → `AGENTS.md` | Regras de todas as IAs (fonte única) |
| Permissões e hooks | `.claude/settings.json` (no Git) | Vale para todos |
| Configuração pessoal | `.claude/settings.local.json` (no `.gitignore`) | Só da sua máquina |
| Comandos | `.claude/commands/*.md` | Atalhos `/nome` (abaixo) |
| Subagentes | `.claude/agents/*.md` | Revisões isoladas, só de leitura |
| Skills | `.claude/skills/<nome>/SKILL.md` | Passo a passo carregado quando o assunto aparece |
| Scripts dos hooks | `scripts/claude-hooks/*.js` | Node, funcionam no Windows e na nuvem |
| Modelo de variáveis | `scripts/variaveis.example.js` | Copiar para `variaveis.js` (fora do Git) |

## Comandos

| Comando | O que faz |
|---------|-----------|
| `/revisar` | Revisa o diff (SOLID, limites, RLS/JWT, gabarito) |
| `/entregar` | Encerra a TASK: quadro, 1 commit + push na `main` |
| `/validar` | `node --check`, JSON e Python — sem navegador e sem testes |
| `/nova-materia <CURSO>/<MATERIA>` | Pastas e 5 status de `materias-global.md` |
| `/documentar` | Atualiza a orientação em `docs/` dos arquivos alterados |
| `/refatorar <arquivo>` | Aplica `codigo-limites-nomes.md` sem mudar o comportamento |
| `/verify [tudo]` | Verificação do quadro: conflitos e entregas aplicadas; coluna Verificado (`tasks/verificacao.md`) |

Subagentes: `revisor-codigo`, `auditor-seguranca`, `auditor-quadro`. Skills novas:
`revisao-codigo`, `auditoria-seguranca` (a auditoria de tarefa é da #168);
`atividade-dinamica-3d` (Atividade Dinâmica no PC, Modo digital-3d).
Equipe por nível (#182, `niveis.md`): skills `classificar-tarefa` e `liderar-equipe`; subagentes
`classificador-tarefas`, `executor-leve` (Haiku), `executor-medio` (Sonnet), `executor-pesado` (Opus).

## Hooks (em `.claude/settings.json`)

| Evento | Script | Efeito |
|--------|--------|--------|
| SessionStart | `inicio-da-sessao.js` | Põe no contexto o checklist do `essentials.md` |
| PreToolUse | `antes-da-ferramenta.js` | **Bloqueia:** `git add .`/`-A`; commit com chave (`service_role`, `sb_secret_`, `sk-`, chave privada — a anon pública passa); reserva no `tasks/STATUS.md` de modelo que não é o do nível (#247); editar à mão `.claude/rules/index.html`; criar teste automatizado; navegador |
| PostToolUse | `depois-de-gravar.js` | `node --check` em todo `.js` gravado; erro volta para corrigir |

- Teste de **bug** (exceção de `testes-validacao.md`): o caminho precisa ter `bug`
  (ex.: `bugs/bug-nota.test.js`).
- Regra nova de bloqueio = função nova na lista `REGRAS_BLOQUEIO` de `regras-bloqueio.js`.
- Sem `node` no PATH, o hook falha sem bloquear.

## Fora de propósito (decidido na #170)

`.mcp.json` com banco (banco só pelo Claude Code local — `multiplas-ias.md`); MCP Playwright e
testes (`testes-validacao.md`); `src/`, `package.json`, `Dockerfile` (site estático); `/deploy`
(o deploy é o push na `main`, pela Vercel); plugins e hooks de Slack.

## Contexto e custo

`/context` mostra o uso; perto de 70% → `/compact`; tarefa nova sem relação → `/clear` (o quadro
guarda o estado). `/cost` mostra o custo da sessão; `claude --resume` retoma uma sessão.
