## Etapa 319-99a74b06 — Botão de bloqueio de atividade não funciona (depois da #190)

**Tarefa:** #192-99a74b06-7a5d-4aa3-a7ec-19782c07ee2e · **Pedido em:** 2026-10-16 09:56 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "BOTAO DE BLOQUEIO DE ATIVIDADE N ESTA FUNCIONANDO"
**Objetivo:** achar e corrigir por que o botão de bloquear/liberar atividade ainda não funciona,
mesmo depois da correção da #190 (etapa 317-63a0d7ac).

### #192.1 — Diagnosticar e corrigir o botão de bloqueio de atividade

**Próximo passo:** — (entregue; aceite na #192.2).

- **Nível:** MEDIO — código JS com lógica (bug), até 3 arquivos; leitura do banco.
- **Critérios de aceitação:** clicar no botão bloqueia e libera a atividade para a turma escolhida.
- **Causa:** o ON/OFF só aparece ao lado dos links do card que existem no `index.html` (fixo) e
  batem com `atividade.pagina`. A atividade nova da #191 (id 152, "Atividade de Sala 16/10 —
  Discursivas", aula 24, `ativo = false`) foi para o banco, mas o card da Aula 04 do índice da
  ITIC não tinha o link dela: sem link, não havia botão para liberar. Banco conferido: a função
  `definir_bloqueio_turma` está certa (liberar uma atividade com `ativo = false` a liga só para a
  turma escolhida) e as outras atividades da ITIC têm `bloqueio` por turma coerente.
- **Entrega:** `INTRODUCAO-TIC/ATIVIDADES/index.html` — link "✍️ Atividade de Sala 16/10" no card
  da Aula 04 (o ON/OFF e o nome do banco entram sozinhos pelos scripts do índice).
- **Verificação:** leitura de `assets/js/indice-atividades-bloqueio.js` (monta o botão pelos
  links do card), consulta ao banco (atividade 152 e bloqueios da matéria 25) e definição da
  função e dos gatilhos de bloqueio. Sem navegador (regra do projeto): o clique só o usuário
  confirma.

### #192.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário, como professor, abre o índice de ATIVIDADES da ITIC, escolhe a turma no combo e liga o ON da "Atividade de Sala 16/10" na Aula 04 (e testa o ON/OFF de outra atividade); se o botão que falha for outro, dizer qual.

- **Nível:** LEVE — conferência do usuário.
