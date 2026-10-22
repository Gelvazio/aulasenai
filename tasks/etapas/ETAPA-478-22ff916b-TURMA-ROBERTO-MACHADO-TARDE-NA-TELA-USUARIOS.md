## Etapa 478-22ff916b — Turma "Roberto Machado tarde" faltando na tela USUARIOS online

**Tarefa:** #349-22ff916b-7dd4-43ee-bc0e-c17abef6b037 · **Pedido em:** 2026-10-22 16:24 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "esta faltando a turma roberto machado tarde"
**Objetivo:** a turma Roberto Machado (tarde) aparece na tela USUARIOS online com os alunos e
as senhas, como as demais (#345).

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-22 16:25 | Banco pela nuvem (consulta e, se preciso, cadastro), mesma exceção autorizada na #345 | Claude Code (Opus 5.5) | continuação da #345, autorizada pelo usuário |

### #349.1 — Achar por que a turma não aparece e corrigir

**Próximo passo:** — (concluída)

- **Levantamento (2026-10-22 16:35):** no banco a turma existe e está completa — `124403`
  "QA LBTSN 2026/1 V1", Tarde, unidade 4 "ROBERTO MACHADO" (leitura liberada), 10 vínculos em
  `turmaaluno`, 10 contas em `usuario`, 10 senhas; a RPC `listar_usuarios_senhas()` como professor
  devolve as 10 linhas (sem desistentes). O código agrupa por turma e a aba sai como
  "ROBERTO MACHADO TARDE / QA LBTSN 2026/1 V1 (10)". Nenhuma causa achada por leitura; sem
  navegador não dá para ver a tela. A turma `124401` (QA LBTSN 2026/1 M1, CEPLAS manhã, 6 alunos
  na lista) **não** tem alunos no banco — fora do pedido.
- **2026-10-22 16:50 (usuário: "nao aparece"):** a RPC simulada com o JWT real do professor
  (Gelvazio, PROFESSOR + administrador) devolve a 124403 com 10 alunos. Diferença achada: a 124403
  era a **única turma sem professor** em `turmaprofessor` (as telas que filtram por
  `professor_tem_turma` não a mostravam). Corrigido: vínculo `turmaprofessor` (124403, Gelvazio)
  inserido pelo conector (só acrescenta). Falta o usuário confirmar na tela qual lista não mostra.

- **Nível:** PESADO — banco (consulta e cadastro de turma/alunos), senhas
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** a RPC `listar_usuarios_senhas()` devolve os alunos da turma.
- **Entrega:** diagnóstico + vínculo `turmaprofessor` (124403, Gelvazio) · **Verificação:** consulta: 124403 com 1 professor; RPC com o JWT do professor devolve as 7 turmas

- **2026-10-22 17:00:** o usuário mandou o print (só o cartão da 124403) e respondeu "Só essa turma
  aparece". Causa: a 124403 é a turma **favorita** (`turma.favorito`), a tela abre só o cartão da
  aba favorita e esconde os outros; as abas do modo banco não têm UC nem turno e passam
  despercebidas.

### #349.2 — Modo banco mostra todas as turmas de uma vez, com turno e UC

**Próximo passo:** em `assets/js/criar-usuarios-pagina.js`, no modo banco, mostrar todos os
cartões (favorita primeiro), aba = atalho que rola até o cartão; título e aba com UC e turno lidos
da tabela `turma`.

- **Nível:** MEDIO — 1 arquivo JS de tela
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** todas as turmas visíveis na página sem clicar; título "NOME (código:
  X) - UNIDADE TURNO"; modo local sem mudança; `node --check` limpo.
- **Entrega:** — · **Verificação:** —
