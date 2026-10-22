## Etapa 470-1ef1d267 — Visualizador só com pedido explícito e só no local

**Tarefa:** #341-1ef1d267-a678-427a-a6e6-1d3b70cced36 · **Pedido em:** 2026-10-22 07:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s35)
**Pedido:** "adicione 1 regra que proiba de ser gerado este arquivo *.claude/rules/index.html*,
apenas com pedido explicito e no claude local, nunca em nuvem" (regra global C45 no `rules-ai`,
tarefa VISUALIZADOR-SO-PEDIDO)
**Objetivo:** o `.claude/rules/index.html` deixa de ser regenerado a cada commit (cada um virava
um deploy de ~51 MB na Vercel); só com pedido explícito do usuário, no Claude Code local.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-22 07:10 | Pedido explícito de escopo fechado vale como aprovação; a regra é global (C45) e aqui só se alinha | Usuário (registrado por Claude Code (Opus 5.5)) | mensagens do pedido |
| 2026-10-22 07:20 | O `index.html` **não** é regenerado nesta entrega, embora `.claude/rules/` mude | Claude Code (Opus 5.5) | a própria regra nova: só com pedido explícito |

### #341.1 — Alinhar as regras e comandos do projeto à C45

**Próximo passo:** — (concluída)

- **Nível:** PESADO — regra em mais de 3 arquivos ligados (regras, comandos, skills, hook)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** `AGENTS.md` (regra 9), `visualizador-regras.md`, `git-quick.md`, `INDEX.md`,
  `claude-code.md`, `tasks/frentes-e-reserva.md`, `tasks/verificacao.md`, comandos `/entregar` e
  `/verify`, skills `liderar-equipe` e `source-command-entregar` (`.claude` e `.agents`),
  mensagem do hook `regras-bloqueio.js`, `docs/HISTORICO-REGRAS.md`; `rules-local/` atualizado.
- **Critérios de aceitação:** nenhuma regra ou comando manda regenerar por conta própria;
  `node --check` do hook ok.
- **Entrega:** regras, comandos, skills (`.claude` e `.agents`) e mensagem do hook sem ordem de
  regenerar; `docs/HISTORICO-REGRAS.md`; `rules-local/` em `2026-10-22-00769678` (traz
  `visualizador-gerado.md`) — 2026-10-22 07:25
- **Verificação:** `grep -rnE "regenerad|gerar_visualizador"` nas regras, comandos e skills = só
  o bloco "Quando pedido" e a tabela do gerador em `visualizador-regras.md`; `node --check` do
  hook ok; regras ≤ 5 KB. `index.html` não regenerado (a própria regra).

### Sincronização de tasks do rules-local (C36)

| Situação | Arquivo | Código anterior | Código novo | Avaliação |
|---|---|---|---|---|
| mudado | INDEX.md | 75c72606d2c8c7a6 | de179c52c17ca671 | sem ajuste — só lista a regra nova |
| adicionado | visualizador-gerado.md | — | bced4974cd78dc89 | exige ajuste → #341 (feito nesta tarefa) |
