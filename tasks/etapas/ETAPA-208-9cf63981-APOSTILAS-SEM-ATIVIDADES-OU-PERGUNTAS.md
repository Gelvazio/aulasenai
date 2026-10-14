## Etapa 208-9cf63981 — Apostilas sem atividades ou perguntas (regra global) + Testes de Front-End sem exercícios e vídeos

**Tarefa:** #81-9cf63981-df1e-4f36 · **Pedido em:** 2026-10-14 10:40 · **Executor:** — (liberada em 2026-10-14 20:25 para outra IA assumir; ver "Estado para quem assumir")
**Pedido:** "REMOVA AS PERGUNTAS DA APOSTILA (Testes de Front-End), PRIMEIRO NO MARKDOWN E DEPOIS NA APOSTILA" · "SALVE ESTA REGRA NO GERADOR GLOBAL DE APOSTILAS, AS APOSTILAS NAO DEVEM TER ATIVIDADES OU PERGUNTAS" · "1-B, 2-REMOVA ESTAS CITACOES TAMBEM"
**Objetivo:** nenhuma apostila tem atividades/perguntas (o gerador recusa); a de Testes de Front-End sai sem exercícios e sem vídeos (opção B) e sem as citações a eles na introdução.
**Próximo passo:** 208-9cf63981.2 — gerador sem exercícios (nada do gerador foi alterado ainda).

### Estado para quem assumir (liberada em 2026-10-14 20:25 por Claude Code, local · main)

**Já feito (não refazer):**
- Regra global das apostilas (item .1): `.claude/rules/apostilas.md` (regra 2 "Sem atividades nem perguntas") e `docs/regras/apostilas.md` — commit `e6f79b6`.
- Linha da #81 no histórico das regras (`docs/HISTORICO-REGRAS.md`, 2026-10-14 10:50) — entrou no commit `d3922b4`.
- Exercícios da aula 01 de Testes de Front-End removidos (`TESTES-DE-FRONTEND/AULAS/AULA-01-EXERCICIO-01.md`, `AULA-01-EXERCICIO-02.md`, `AULA-01-GABARITO-EXERCICIOS.md`, `AULA-01-GUIA-LABORATORIO.md`) — commit `e6f79b6`.
- Abertura e reserva da tarefa: commit `e68a5c0`.

**Todos os commits que têm algo desta tarefa:** `e68a5c0` (abertura/reserva), `d3922b4` (linha do histórico), `e6f79b6` (regra + exercícios removidos) e o commit desta liberação (etapa + quadro).

**Falta fazer:** itens .2 a .5. O gerador (`assets/gerador-apostilas/`) **não foi alterado**: ainda exige 5 exercícios por capítulo (`QUANTIDADE_MINIMA_EXERCICIOS`) e monta a parte de exercícios. A apostila de Testes de Front-End (Markdown e HTML) ainda tem Vídeos e Exercícios.

**Atenção:** há 4 arquivos apagados e não commitados em `GERADOR-AULAS/` (`GERADOR-INFOGRAFICOS/PROMPT-INFOGRAFICO-EXEMPLO.md`, `infografico-de-exemplo.png`, `infografico.css` e `MATERIAL-ESTUDO-PROFESSOR/VIDEOS-IA-NA-EDUCACAO.txt`) que não deu para ligar a esta tarefa; ficaram de fora. Existe também um `git stash` ("On main: autostash", 14/10 12:51) com o mesmo conjunto de alterações da #81; não foi mexido.

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
| 208-9cf63981.1 | Regra: `.claude/rules/apostilas.md`, `docs/regras/apostilas.md`, `docs/HISTORICO-REGRAS.md` | ✅ Concluído | 2026-10-14 10:34 | Regra 2 do fluxo em `apostilas.md` (2386 bytes ≤ 5 KB); `docs/regras/apostilas.md` sem exigência de exercícios; linha no histórico |
| 208-9cf63981.2 | Gerador: `## Exercícios` proibida; remover leitura/HTML/sumário de exercícios | ⬜ Pendente | — | não iniciado no código (ver "Estado para quem assumir") |
| 208-9cf63981.3 | Testes de Front-End — Markdown: tirar Vídeos e Exercícios dos `CAPITULO-NN.md` e do `APOSTILA-TESTES-DE-FRONTEND.md`, citações na introdução; `materia.json` (opção + versão 1.1) | ⬜ Pendente | — | — |
| 208-9cf63981.4 | Testes de Front-End — HTML gerado + `STATUS-APOSTILA.md` | ⬜ Pendente | — | — |
| 208-9cf63981.5 | Aceite do usuário | ⬜ Pendente | — | — |
