## Etapa 517-4c8d1f35 — "Gabarito da avaliação" deve usar a turma escolhida no Progresso da turma

**Tarefa:** #368-4c8d1f35 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "DEVIA TER PEGO A TURMA DALI" (combo "Turma" do Progresso da turma, ex.: AI AOPL 2026/2 M1 (135080)); o combo "Turma" do "Gabarito da avaliação" mostrava outra turma (122552).
**Objetivo:** o combo de turma do "Liberar gabaritos" abre já na turma escolhida (favorita) no Progresso da turma e acompanha a mudança dela.

### #368.1 — Combo de turma do Gabarito segue o combo do Progresso da turma

**Próximo passo:** achar o código dos dois combos e ligá-los.

- **Nível:** MEDIO — JS com lógica, poucos arquivos (Jev, confiança 0,85)
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/alunos-da-turma-progresso.js` (expõe `lerTurmaEscolhidaProgresso()` e dispara `relatorio-professor:turma`), `assets/js/liberacao-respostas-discursiva.js` (select do gabarito abre na turma do Progresso e a acompanha), `assets/js/respostas-atividade-professor.js` (objetivas/práticas: abas de turma do relatório), `docs/regras/atividades.md`, anotação no gerador. Regra GLOBAL (discursivas, práticas e objetivas). Feito por 3 agentes + revisão.
- **Verificação:** `node --check` ok; revisão por agente. Motivo do pedido: o gabarito da avaliação 36 estava liberado só para a turma 122552 e o aluno da 135080 não via a nota. Conferir na tela: o usuário.
- **Correção da revisão:** objetivas/práticas só aplicam a turma do Progresso na primeira montagem do relatório (as remontagens mantêm a aba que o professor escolheu).
