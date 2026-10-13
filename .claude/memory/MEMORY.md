# 📚 Memória do Projeto Aulas SENAI (arquivo único)

**Última atualização:** 2026-10-13
Regras rápidas em `.claude/rules/`; referência completa em `docs/regras/`.

---

## 1. Ao iniciar a sessão

1. `git fetch origin main` (trazer atualizações)
2. Ler `tasks/STATUS.md`: sua frente em "🧭 Frentes de trabalho" (local = `local · main`; nuvem =
   `nuvem · <branch-da-sessao>`), coluna "Em uso por" em "📌 Tarefas" e "⏳ Aguardando o usuário"
3. Ler `tasks/RECADOS.md` (recados abertos para sua frente)
4. Conferir `database/SEEDS-APLICADOS.md` — todos CONCLUÍDO antes de tarefa nova
5. Só então começar; depois ver `.claude/rules/status-flow.md` e `.claude/rules/INDEX.md`

`tasks/STATUS.md` é a verdade: o que não está lá não aconteceu. Manter na sua linha o próximo passo
exato.

## 2. Como cada tarefa é conduzida

- **Toda tarefa é uma TASK** (pedido do usuário, 2026-10-13): abrir etapa em `tasks/etapas/` + linha
  em `tasks/STATUS.md` + bloco em `tasks/TASKS.md`, e **pedir detalhes ao solicitante** numa única
  mensagem (objetivo, escopo, arquivos/matéria, critério de pronto — sem perguntar o que já está no
  pedido) antes de executar. Regra completa: `.claude/rules/toda-tarefa-e-task.md`.
- **Tarefa pequena** (ajuste pontual até ~3 arquivos, sem banco/segurança/estrutura nova) não precisa
  de `docs/<tarefa>.md` nem de aprovação; a grande precisa.
- **Final de tarefa concluída:** responder só `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?`, sem tabela
  nem resumo. Perguntas e bloqueios têm resposta normal.
- **Sem sugestões** (2026-10-08, "PARE DE SUGERIR"): responder só o pedido, sem opções, "quer que
  eu...?" ou próximos passos; se o usuário afirma algo, aceitar sem conferir.

## 3. Commit e push

- **Um commit local por tarefa concluída**, com `git add` só dos arquivos dela e `Co-Authored-By`.
  Sem `git add .`, `--force`, `pull` ou mudança de remotos.
- Não commitar tarefa incompleta nem proibidos: gabaritos, `*QUESTOES.md`, listas/dados de alunos,
  `__pycache__` (não usar `-f` em ignorados; `*QUESTOES.md` no Windows pega nomes terminados em
  "questoes.md"). `*.md` e `*.py` são versionados.
- **Push:** em 2026-10-01 o professor mandou "NUNCA FAZER PUSH, EU FAREI O PUSH LOCALMENTE"; local =
  nunca, nuvem = sempre (branch + PR). ⚠️ Em 2026-10-13 ele pediu "faça commit e push" e o push foi
  feito — a regra de "nunca push" local está em conflito; confirmar com o usuário qual vale.

## 4. Validação e banco

- **Nunca abrir navegador** (preview, Browser pane, computer-use) nem subir servidor; validar por
  código, `node`, banco e terminal.
- **RLS + JWT** obrigatórios em toda tabela/página.
- **Banco:** só alterar quando o professor pedir. Apagar linhas/tabelas/colunas em massa é bloqueado
  pelo classificador do Claude Code — preparar o SQL e deixar o professor executar; o que não apaga
  dados pode ir pelo conector do Supabase.
