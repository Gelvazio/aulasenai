## Etapa 286-c6fd402f — Filtros "Mostrar Certas", "Mostrar Meia Certas" e "Mostrar Erradas" (professor e aluno)

**Tarefa:** #159-c6fd402f-3037-4a53-9dc1 · **Pedido em:** 2026-10-14 20:09 · **Executor:** Claude Code (local · main)
**Pedido:** "crie mais 1 de nome *Mostrar Meia Certas* - so mostra meia certa, e mais 1 de nome *Mostrar Erradas*, se todos desmarcados, mostra todas, senao vai combinando os filtros, e todos devem usar localstorage" + "e liberados aos alunos estes 3 filtros"
**Objetivo:** três ON/OFF (Mostrar Certas, Mostrar Meia Certas, Mostrar Erradas) no painel do professor e na prova corrigida do aluno; todos desmarcados mostra todas as perguntas; marcados combinam (mostra as perguntas de qualquer categoria marcada); as escolhas ficam no localStorage.
**Próximo passo:** 286.1 — módulo compartilhado de categorias e ligação no professor e no aluno.

### Decisões

- 2026-10-14 20:09 — **muda o padrão do "Mostrar Certas"**: antes, desligado escondia as certas; agora todos desmarcados = mostra tudo (pedido do usuário). Chaves novas no localStorage (`respostas-aluno:categoria-*` e `resultado-aluno:categoria-*`); a escolha antiga do "Mostrar Certas" é ignorada.
- Categoria da pergunta: **certa** = todos os tópicos com nota cheia; **errada** = todos com nota zero; **meia certa** = o resto. Nota que vale no tópico: a do professor; sem ela, a da IA (volta a regra original: o professor manda). Pergunta ainda sem nota nunca é escondida. Aluno: só vê nota confirmada do professor.
- O "Falta Corrigir?" do professor continua separado e combina com os três (as duas condições valem juntas).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 286.1 | Módulo compartilhado `categorias-pergunta-discursiva.js` (classificar pergunta, combinar escolhas, criar os 3 ON/OFF com localStorage) | 🔄 Em progresso | — | — |
| 286.2 | Professor: usar os 3 filtros em `mostrar-certas-discursiva.js` | ⬜ Pendente | — | — |
| 286.3 | Aluno: usar os 3 filtros em `mostrar-certas-aluno-discursiva.js` | ⬜ Pendente | — | — |
| 286.4 | Regra em `docs/regras/atividades.md`, histórico de regras e visualizador | ⬜ Pendente | — | — |
| 286.5 | Aceite do usuário | ⬜ Pendente | — | — |
