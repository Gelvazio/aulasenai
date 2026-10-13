# Reestruturar `.claude/rules/` (sem duplicações, nada acima de 5 KB)

**Data de criação:** 2026-10-13 12:44 · **Executor:** Claude Code (local · main)
**Tarefa:** #27-042b2fe8-a9f7-4726 · **Etapa:** 146-042b2fe8
**Status geral:** ✅ Concluído em 2026-10-13 12:49 (aguardando aceite)

## Objetivo
Deixar as regras de `.claude/rules/` sem repetição, sem contradição, sem referências a arquivos
inexistentes e com **todo arquivo ≤ 5 KB** (bytes UTF-8), criando arquivos novos quando preciso.

## Diagnóstico (leitura dos 22 arquivos)

### Acima de 5 KB
| Arquivo | Tamanho | Problema |
|---|---|---|
| `regras-gerais.md` | 41,3 KB | Junta 15 assuntos (cópia do CLAUDE.md global) |
| `agents-cerebro-memoria-mcp.md` | 8,3 KB | Plano de outro projeto (DashboardAI) |
| `agents-concorrencia.md` | 7,7 KB | Idem |
| `agents-protocolo-captura-tarefa.md` | 5,6 KB | Idem |
| `documentar-antes-de-cada-tarefa.md` | 5,3 KB | Repete `regras-gerais` e `agents-plano-docs` |

### Duplicações
- Plano em `docs/` está em 3 lugares: `regras-gerais` (2 seções), `documentar-antes-de-cada-tarefa`,
  `agents-plano-docs`.
- Commit/git em 3: `regras-gerais`, `git-quick`, `agents-concorrencia` (item 8).
- STATUS.md em 2: `regras-gerais` e `status-flow`.
- "Fonte única / branch main / fetch" repetido em `agents-avisos-gerais` e no `AGENTS.md`.

### Contradições
1. **Push:** `regras-gerais` diz "nunca push automático"; `essentials`/`git-quick` (2026-10-13,
   mais nova) dizem "commit + push + quadro". → vale a mais nova.
2. **Nuvem:** `git-quick`/`status-flow` = "branch + PR"; `agents-avisos-gerais` = "só main, nunca PR".
3. **Quadro de tarefas:** `agents-*` usam `task-principal.md`/`task_complete.md`; o projeto usa
   `tasks/STATUS.md` + `tasks/TASKS.md` + `tasks/etapas/`.
4. **`documentar-antes`:** lista "corrigir bug" e "criar documentação" como "sempre exigem docs/",
   contrariando a exceção de tarefa pequena do mesmo arquivo.
5. **Co-Authored-By** fixo em "Claude Haiku 4.5" (deve ser o modelo em uso).
6. **Git Worktree** (`regras-gerais`) manda fazer merge de branches — conflita com "nunca merge".

### Sem sentido / referências quebradas
- `agents-*` citam `task-principal.md`, `task_complete.md`, `.githooks/`, `api/mcp.ts`,
  `database/tests/`, `scripts/espelhar_quadro_eventos.py` — **nada disso existe** neste projeto.
- `regras-gerais` cita `C:\fontes\projeto-ativo\CLAUDE.md` e manda "ler este arquivo" sobre si mesmo.
- `INDEX.md` lista arquivos inexistentes: `professor-admin`, `colaboracao-sessoes`, `codigo-solid`,
  `tarefas-agendadas`, `docs-index`, `tabelas-banco`.
- `seeds.md` usa `python3` (no Windows é `C:\Python314\python.exe`) e tabela-exemplo com dados falsos.

## Nova estrutura proposta (todos ≤ 5 KB)
| Grupo | Arquivo | Conteúdo (origem) |
|---|---|---|
| Início | `INDEX.md` | Índice único |
| Início | `essentials.md` | Checklist de início + precedência dos arquivos |
| Tarefas | `status-flow.md` | Ciclo da TASK em `tasks/` + frase de finalização |
| Tarefas | `status-modelo.md` | Modelo do STATUS.md + 23 regras de gestão |
| Tarefas | `toda-tarefa-e-task.md` | Mantido |
| Tarefas | `plano-docs.md` | Junta os 3 textos de plano em `docs/` (sem contradição) |
| Tarefas | `docs-antes-de-editar.md` | Ler `docs/ORIENTACAO_*` antes de editar |
| Tarefas | `multiplas-ias.md` | O que vale do protocolo de agentes, adaptado a `tasks/STATUS.md` |
| Git | `git-quick.md` | Commit, push, sem `git status`, sem `add .`, sem worktree/force |
| Código | `codigo-solid.md` | SOLID + aplicação por tecnologia |
| Código | `codigo-limites-nomes.md` | Limites, nomes em português, legibilidade, exemplos |
| Código | `testes-validacao.md` | Sem navegador, sem testes |
| Conteúdo | `materias-global.md`, `atividades-banco.md` | Mantidos (+ "aluno consultor") |
| Conteúdo | `apostilas.md` | Regras de apostila / `materia.json` |
| ~~Conteúdo~~ | ~~`infograficos.md`~~ | Removido a pedido do usuário (2026-10-13): sem regra de infográficos |
| Conteúdo | `faixa-materias-ensalado.md` | Botões SOMENTE ENSALADO / ON-OFF |
| Banco | `security-banco.md`, `seeds.md` | Mantidos (corrigir Python e exemplo) |
| Outros | `graphify.md` | Graphify só quando pedido |

Saem: `regras-gerais.md`, `documentar-antes-de-cada-tarefa.md`, `agents-*.md` (11 arquivos) —
conforme decisão do usuário.

## Passos
| # | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Criar os arquivos novos a partir de `regras-gerais` | `.claude/rules/*.md` | `wc -c` ≤ 5120 | ✅ |
| 2 | Juntar os textos de plano em `plano-docs.md` | idem | sem trecho repetido (grep) | ✅ |
| 3 | Tratar os `agents-*` conforme decisão | idem | nenhuma ref. a arquivo inexistente | ✅ |
| 4 | Corrigir contradições (push, nuvem, Co-Authored-By, worktree) | idem | grep | ✅ |
| 5 | Refazer `INDEX.md` e apontar `AGENTS.md`/`CLAUDE.md` para ele | `INDEX.md`, `AGENTS.md`, `CLAUDE.md` | todo link existe | ✅ |
| 6 | Apagar arquivos substituídos; STATUS + commit + push | — | `wc -c` final | ✅ |

## Riscos
| Risco | Plano B |
|---|---|
| Perder alguma regra na divisão | Conferir cada seção do antigo contra o novo antes de apagar; o Git guarda o original |
| Tarefa #26 copia regras para o banco | Depois do commit, rodar de novo `sincronizar_regras.py` (fica como pendência da #26) |
| Outras frentes leem `agents-*`/`regras-gerais` | `INDEX.md` e `AGENTS.md` passam a apontar os novos nomes |

## Conclusão
- Aprovado em 2026-10-13 12:50 (agents-* adaptar; nuvem só main; ajustar AGENTS.md e CLAUDE.md).
- Mudança de escopo aprovada pelo usuário durante a execução: **remover a regra de infográficos de
  tudo** (`.claude/rules/infograficos.md` não criado e `docs/regras/infograficos.md` apagado).
- Resultado: 22 → 19 arquivos; total 101 KB → 35 KB; maior arquivo 3,3 KB.
- Pendência: a tarefa #26 precisa rodar de novo `scripts/regras/sincronizar_regras.py` para a cópia
  das regras no banco refletir os novos arquivos.
- Concluído em 2026-10-13 12:49 (≈ 25 min).
