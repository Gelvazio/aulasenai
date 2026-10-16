## Etapa 317-63a0d7ac — Botões de bloquear atividade com problema

**Tarefa:** #190-63a0d7ac-5496-49bf-a67b-a53e6074225c · **Pedido em:** 2026-10-16 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s5)
**Pedido:** "OS BOTOES DE BLOQUEAR ATIVIDDE ESTAO COM PROBLEMA"
**Objetivo:** descobrir e corrigir o problema dos botões de bloquear/liberar atividade.

### #190.1 — Diagnosticar e corrigir os botões de bloquear atividade

**Próximo passo:** 👀 o usuário, como professor, escolhe a turma 135080 no combo "Turma:" do índice de ATIVIDADES da ITIC, clica no ON de uma atividade e confere que libera.

- **Nível:** MEDIO — código JS com lógica, até 3 arquivos
- **Descrição:** botões de bloqueio de atividade (ON/OFF no card e/ou 🔒/🔓 por turma) com defeito.
- **Critérios de aceitação:** os botões bloqueiam e liberam como esperado.
- **Causa:** o ON/OFF gravava o bloqueio só na turma **favorita**; ao escolher 135080 no combo (sem ser a
  favorita) o clique mexia em outra turma e a atividade seguia bloqueada para a 135080. Dados e função
  `definir_bloqueio_turma` do banco conferidos: corretos.
- **Entrega:** `assets/js/indice-atividades-bloqueio.js` — a turma do bloqueio é a do combo "Turma:"
  (sem combo, a favorita); trocar o combo remonta os botões (evento `turma-indice-alterada`); a remoção
  dos botões velhos passou para depois da leitura, evitando botões duplicados.
- **Verificação:** `node --check` OK; só confirmável no navegador (usuário).
