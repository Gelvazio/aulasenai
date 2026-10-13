# 📚 Memória do Projeto Aulas SENAI (arquivo único)

**Última atualização:** 2026-10-13
Regras rápidas em `.claude/rules/`; referência completa em `docs/regras/`.

---

## ⚡ Essentials — checklist de 30 segundos (ao iniciar sessão)

1. `git fetch origin main` (trazer atualizações)
2. Ler `tasks/STATUS.md`: sua frente em "🧭 Frentes de trabalho", coluna "Em uso por" em
   "📌 Tarefas" e seção "⏳ Aguardando o usuário"
3. Ler `tasks/RECADOS.md` (recados abertos para sua frente)
4. Conferir `database/SEEDS-APLICADOS.md` — todos CONCLUÍDO?
5. Só então começar a tarefa

**Frente:** local = `local · main`; nuvem = `nuvem · <branch-da-sessao>` (manter a linha com o
próximo passo exato).

| Regra | Ação |
|-------|------|
| 1 commit / tarefa | Concluir → commit |
| Push por ambiente | Local: nunca. Nuvem: sempre |
| STATUS.md é verdade | Tudo que não está lá não aconteceu |
| Seeds CONCLUÍDO antes | Antes de tarefa nova |
| Sem navegador | Ler código, node, banco — nunca preview |
| RLS + JWT | Obrigatório em toda tabela |

Links: `.claude/rules/INDEX.md` · `tasks/STATUS.md` · `database/SEEDS-APLICADOS.md` ·
`docs/regras/` · próximo: `.claude/rules/status-flow.md`.

---

## 🔀 Commit por tarefa (feedback)

Sempre **um commit local ao concluir cada tarefa** (cada pedido atendido), em todos os projetos.
**NUNCA fazer `git push`**, nem quando o usuário pedir "faça push": o push é feito só por ele,
localmente.

- **Why:** em 2026-09-30 o professor pediu commit por tarefa; em 2026-10-01 pediu "NUNCA FAZER PUSH,
  EU FAREI O PUSH LOCALMENTE" e mandou anotar no `CLAUDE.md` da raiz.
- **How to apply:** ao terminar e conferir, `git add` só dos arquivos da tarefa + `git commit` com
  mensagem descritiva e o `Co-Authored-By`. Sem `git push`, `pull`, `--force` ou mudança de remotos;
  se ele pedir push, avisar que o commit está pronto para ele enviar. Não commitar tarefa incompleta
  nem arquivos proibidos (gabaritos, listas de alunos, `__pycache__`); não usar `-f` em arquivos
  ignorados (ex.: `*QUESTOES.md`, que no Windows também pega nomes terminados em "questoes.md").
- ⚠️ **Divergência (2026-10-13):** neste dia o usuário pediu "faça commit e push" e o push foi feito.
  Esta regra ainda diz "nunca push" — confirmar com o usuário qual vale.

---

## 🛠️ Regras de trabalho (feedback, definidas em 2026-09-30)

- **Final de tarefa:** responder só `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?` (sem tabela nem
  resumo). Só ao encerrar tarefa concluída; perguntas e bloqueios têm resposta normal.
- **Tarefas pequenas** (ajuste pontual, sem banco/segurança/estrutura nova, até ~3 arquivos) não
  precisam de `docs/<tarefa>.md` nem de aprovação; as grandes precisam.
- **Nunca abrir navegador** (preview, Browser pane, computer-use) nem subir servidor para validar;
  validar por código, `node`, banco e terminal.
- **Banco de dados:** só alterar quando ele pedir; apagar linhas/tabelas/colunas em massa foi
  bloqueado pelo classificador do Claude Code — preparar o SQL e deixar o professor executar (o que
  não apaga dados pode ser aplicado pelo conector do Supabase).
- `*.md` e `*.py` são versionados, mas nunca `*gabarito*`, `*QUESTOES.md` nem dados de alunos.

---

## 🤐 Sem sugestões (feedback)

Responder só o que foi perguntado ou pedido, sem listas de opções, "quer que eu...?" ou próximos
passos sugeridos. Se o usuário afirma algo (ex.: "a prova já está liberada"), aceitar sem conferir.

- **Why:** em 2026-10-08 ele interrompeu com "PARE DE SUGERIR" após várias respostas com ofertas.
- **How to apply:** respostas curtas e diretas; executar e encerrar com a frase final acima.

---

## 🎫 Toda tarefa é uma TASK (feedback, 2026-10-13)

Toda tarefa pedida à IA vira uma **TASK** (etapa em `tasks/etapas/` + linha em `tasks/STATUS.md` +
bloco em `tasks/TASKS.md`) e a IA **pede detalhes ao solicitante** antes de executar.

- **How to apply:** abrir a TASK, perguntar numa única mensagem objetivo, escopo, arquivos/matéria e
  critério de pronto (sem perguntar o que já está no pedido) e só então executar. Regra completa em
  `.claude/rules/toda-tarefa-e-task.md`.
