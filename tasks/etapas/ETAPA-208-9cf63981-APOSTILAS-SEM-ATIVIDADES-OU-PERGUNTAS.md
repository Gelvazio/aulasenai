## Etapa 208-9cf63981 — Apostilas sem atividades ou perguntas (regra global) + Testes de Front-End sem exercícios e vídeos

**Tarefa:** #81-9cf63981-df1e-4f36 · **Pedido em:** 2026-10-14 10:40 · **Executor:** Claude Code (local · main)
**Pedido:** "REMOVA AS PERGUNTAS DA APOSTILA (Testes de Front-End), PRIMEIRO NO MARKDOWN E DEPOIS NA APOSTILA" · "SALVE ESTA REGRA NO GERADOR GLOBAL DE APOSTILAS, AS APOSTILAS NAO DEVEM TER ATIVIDADES OU PERGUNTAS" · "1-B, 2-REMOVA ESTAS CITACOES TAMBEM"
**Objetivo:** nenhuma apostila tem atividades/perguntas (o gerador recusa); a de Testes de Front-End sai sem exercícios e sem vídeos (opção B) e sem as citações a eles na introdução.
**Próximo passo:** 208-9cf63981.1 — regra em `.claude/rules/apostilas.md` e `docs/regras/apostilas.md`.

### Escopo

- **Entra:** regra global (rules + docs + histórico); gerador `assets/gerador-apostilas/` (seção `## Exercícios` proibida; Vídeos continuam opcionais pela opção que já existe); apostila de Testes de Front-End (Markdown primeiro, depois HTML, versão 1.1).
- **Não entra:** outras apostilas já geradas (ITIC, Rio do Sul Mais Tech) — o HTML delas fica como está; ao regerar, o gerador vai exigir tirar os exercícios (pendência no STATUS). `assets/js/apostila.js` e o CSS dos exercícios ficam (as apostilas antigas ainda usam).

### Riscos

| Risco | Plano B |
|---|---|
| Conferência com a ementa (`--conferir`) cair abaixo de 100% sem os exercícios | Conferir antes do HTML; se cair, ajustar a teoria (a conferência não lê exercícios nem vídeos) |
| Regerar outras apostilas falhar | Mensagem clara do gerador; pendência registrada |

### Decisões

| Quando | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-14 | Apostila nunca tem exercícios/perguntas/atividades; gerador recusa `## Exercícios` | Usuário | Pedido "AS APOSTILAS NAO DEVEM TER ATIVIDADES OU PERGUNTAS" |
| 2026-10-14 | Testes de Front-End também sem vídeos (`apostila_sem_videos_e_exercicios`) | Usuário | Resposta "1-B" |

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 208-9cf63981.0 | Aprovação do usuário (pedido explícito + respostas "1-B, 2-remova") | ✅ Concluído | 2026-10-14 10:33 | Mensagens do usuário em 2026-10-14 |
| 208-9cf63981.1 | Regra: `.claude/rules/apostilas.md`, `docs/regras/apostilas.md`, `docs/HISTORICO-REGRAS.md` | ⬜ Pendente | — | — |
| 208-9cf63981.2 | Gerador: `## Exercícios` proibida; remover leitura/HTML/sumário de exercícios | ⬜ Pendente | — | — |
| 208-9cf63981.3 | Testes de Front-End — Markdown: tirar Vídeos e Exercícios dos `CAPITULO-NN.md` e do `APOSTILA-TESTES-DE-FRONTEND.md`, citações na introdução; `materia.json` (opção + versão 1.1) | ⬜ Pendente | — | — |
| 208-9cf63981.4 | Testes de Front-End — HTML gerado + `STATUS-APOSTILA.md` | ⬜ Pendente | — | — |
| 208-9cf63981.5 | Aceite do usuário | ⬜ Pendente | — | — |
