# Plano — Colaboração entre sessões e licenças pelo `tasks/STATUS.md`

- **Tarefa:** #21-eeefc710-3e74-4928 · **Etapa:** 135-eeefc710 (`tasks/etapas/ETAPA-135-eeefc710-COLABORACAO-ENTRE-SESSOES.md`)
- **Pedido:** 2026-10-09 15:22:41 — "execute todas as suas sugestões" (as 7 sugestões para melhorar a
  "conversa" entre sessões de contas diferentes do Claude, que só se falam pelo repositório)
- **Aprovação:** o próprio pedido do usuário (ele leu as 7 sugestões e mandou executar todas)
- **Criado em:** 2026-10-09 15:22:41 · **Concluído em:** — · **Tempo decorrido:** —

## Objetivo

Duas licenças do Claude Code (contas diferentes) e outras IAs trabalham no mesmo repositório sem
se falar diretamente. O objetivo é que uma sessão saiba **o que a outra está fazendo**, **não
pegue a mesma tarefa**, **deixe recados** e **não gere conflitos** de merge no `STATUS.md`.

## Problemas vistos em 2026-10-09

- A `main` e a branch da nuvem criaram as **mesmas Etapas 125 a 127** → renumeração no merge.
- Um só **"Próximo passo"** para todos → cada sessão sobrescrevia o da outra.
- A `main` andou 6 commits sem a sessão saber.
- O `STATUS.md` passou de **1.700 linhas** → quase todo merge dava conflito nele.
- Arquivos gerados (`ANALISE-MATERIAS-RELATORIO.json`, `STATUS-EMENTAS-CURSOS.md`) com conflito.

## Escopo

- **Entra:** as 7 sugestões — (1) etapa com UUID; (2) reserva da tarefa; (3) próximo passo por
  frente de trabalho; (4) `tasks/RECADOS.md`; (5) trazer a `main` no início e no fim; (6) arquivo
  gerado em conflito = regerar; (7) uma etapa por arquivo em `tasks/etapas/`.
- **Não entra:** mudar o conteúdo das etapas antigas (só são movidas, sem editar o texto); a
  máquina local do usuário (`~/.claude/CLAUDE.md`) — fica como aceite/ação dele.

## Arquivos

| Arquivo | O que muda |
|---|---|
| `tasks/STATUS.md` | Vira o **índice**: cabeçalho, "🧭 Frentes de trabalho" (próximo passo por frente), "📌 Tarefas" (com a coluna **Em uso por**), "⏳ Aguardando o usuário", escopo, riscos, bloqueios, decisões, pendências, lições e a tabela **"🗂️ Etapas"** com o link de cada arquivo |
| `tasks/etapas/ETAPA-NNN[-uuid]-ASSUNTO.md` | **Novo:** uma etapa por arquivo (texto movido sem alteração) |
| `tasks/RECADOS.md` | **Novo:** recados entre sessões (só se acrescentam linhas) |
| `CLAUDE.md` | Seção nova "CONVERSA ENTRE SESSÕES E LICENÇAS"; mapa dos arquivos de status; inicialização; versão e histórico |
| `docs/HISTORICO-REGRAS.md` | Linha da versão nova |
| `tasks/TASKS.md` | Bloco da tarefa #21 |

## Riscos

| Risco | Plano B |
|---|---|
| A outra licença edita uma etapa antiga no `STATUS.md` antigo enquanto ele é dividido | No merge, aplicar a mudança dela no arquivo da etapa em `tasks/etapas/` (regra escrita no `CLAUDE.md`) |
| Links "Etapa N do `STATUS.md`" em outros arquivos | Continuam válidos: o índice do `STATUS.md` leva ao arquivo da etapa |
| Duas etapas antigas com o mesmo número (ex.: duas "Etapa 13") | Nome do arquivo ganha `-b` na segunda |

## Passos

| # | Ação | Caminho | Verificação | Status |
|---|---|---|---|---|
| 1 | Plano | `docs/colaboracao-entre-sessoes.md` | Leitura | ✅ 2026-10-09 15:24 |
| 2 | Recados | `tasks/RECADOS.md` | Leitura | ✅ 2026-10-09 15:24 |
| 3 | Dividir as etapas (script no scratchpad, sem editar o texto) | `tasks/etapas/` + `tasks/STATUS.md` | Soma das linhas movidas = linhas das etapas; nenhuma etapa perdida (contagem dos títulos) | ⬜ |
| 4 | Índice: frentes de trabalho, coluna "Em uso por", tabela de etapas | `tasks/STATUS.md` | Leitura; cada link aponta para arquivo existente | ⬜ |
| 5 | Regras (1 a 7) | `CLAUDE.md`, `docs/HISTORICO-REGRAS.md` | Linha de versão no formato do `regras-modal.js` | ⬜ |
| 6 | Tarefa #21 no `TASKS.md` e etapa 135 | `tasks/TASKS.md`, `tasks/etapas/` | Leitura | ⬜ |
| 7 | Aceite do usuário | — | — | ⬜ |
