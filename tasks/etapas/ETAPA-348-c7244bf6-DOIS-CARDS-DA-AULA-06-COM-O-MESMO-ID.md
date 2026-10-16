## Etapa 348-c7244bf6 — Dois cards da Aula 06 editam a mesma aula

**Tarefa:** #221-c7244bf6-9b58-4d1a-866c-f20d325e287a · **Pedido em:** 2026-10-16 20:12 · **Criada por:** Claude Code (Opus 5.5) (local · main · s16)
**Pedido:** "2 cards, estao ficando com mesmo id,pois ao editar a aula de 1,edita a aula de outro
tb,verifique" (print: no índice da ITIC aparecem dois cards "AULA 06 — Editor de Textos:
Formatação e Estruturação-old", um com a atividade ID 19 e outro com as atividades ID 08 e ID 102).
**Objetivo:** cada card do índice da ITIC voltar a ter a sua aula (regra "1 card = 1 aula", etapas
47 e 48) e o "🔗 Gerenciar atividades" não deixar juntar dois cards na mesma aula de novo.

### Escopo

- **Entra:** a atividade 19 volta para a aula 69 (como estava até 2026-10-16 20:09); trava no
  "🔗 Gerenciar atividades" para não vincular a atividade de um link de **outro card** do índice;
  aviso no "✏️ Editar aula" quando a aula também é a de outro card; documentação.
- **Não entra:** nomes, rótulos e títulos das aulas 26 e 69 (o "-old" e o "TEXTOS TÉCNICOS…" ficam
  como o usuário gravou); o HTML do índice (tem alteração local do usuário); o CADASTRAR
  ATIVIDADES.
- **Pronto quando:** a atividade 19 está na aula 69; os dois cards abrem aulas diferentes no
  "Editar aula"; vincular a atividade de outro card é recusado com explicação.

### Riscos

- `UPDATE` na linha errada → só com `WHERE id = 19 AND aula_id = 26`; volta: `aula_id = 26`.
- O usuário queria mesmo a Avaliação 01 na aula 26 → então o card "AVALIAÇÃO 01" do HTML é que
  sobra (dois cards para uma aula); plano B: manter a aula 26 e tirar o card do índice (outra
  tarefa).

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|

### #221.1 — Investigar por que os dois cards editam a mesma aula

**Próximo passo:** — (entregue).

- **Nível:** PESADO — consultas no banco de produção e nos logs do Supabase.
- **Achado (2026-10-16 20:25):** cada card pega a aula pela atividade do 1º link
  (`indice-aula-data.js`, `encontrarAulaPelasPaginas`). No banco, a atividade **19** (Avaliação
  Objetiva 01, link do card "AVALIAÇÃO 01" do HTML) está na aula **26** — a mesma das atividades
  **8** e **102** do card "AULA 06". Por isso os dois cards abrem a aula 26 e editar um muda o
  outro.
- **Como aconteceu:** às 15:00 (#203, etapa 330) a atividade 19 estava na aula **69** (só ela).
  O log do Supabase mostra às **20:09:53** um `PATCH atividade?id=eq.19` de 14 bytes
  (`{"aula_id":26}`), do navegador do professor (127.0.0.1:5501). Só o "🔗 Gerenciar atividades"
  (#213, `definirAulaDaAtividadeCard`) grava só o `aula_id`: a atividade 19 foi vinculada à
  aula 26 por ele. Às 20:10:34 veio o `PATCH aulas?id=eq.26` (o "-old"). A aula 69 ficou sem
  atividade (nenhum card a usa).
- **Por que o sistema deixou:** o "Gerenciar atividades" não confere se a atividade é o link de
  outro card; o aviso de "aula compartilhada" do "Editar aula" (commit `ace3ba0f`) saiu em
  `0bdf6c58`, quando as aulas compartilhadas foram separadas. A confirmação dizia "está na
  Aula 12 — Aula 06 - Editor de Textos…" (título da aula 69 quase igual ao da 26).
- **Entrega:** diagnóstico nesta seção. **Verificação:** consultas em `atividade` e `aulas`
  (matéria 25) e em `edge_logs` do Supabase (método, tamanho do corpo, horário).

### #221.2 — Voltar a atividade 19 para a aula 69 no banco

**Próximo passo:** 👀 esperar o "sim" do usuário para o `UPDATE`.

- **Nível:** PESADO — `UPDATE` no banco de produção.
- **Descrição:** `UPDATE atividade SET aula_id = 69 WHERE id = 19 AND aula_id = 26 RETURNING
  id, aula_id;` (volta: `SET aula_id = 26 WHERE id = 19`).
- **Critérios de aceitação:** consulta depois do `UPDATE` mostra a atividade 19 na aula 69 e as
  atividades 8 e 102 na aula 26.

### #221.3 — Trava no "Gerenciar atividades" e aviso no "Editar aula"

**Próximo passo:** depois da #221.2, mudar `indice-aula-modal-vinculo.js` e
`indice-aula-modal.js`.

- **Nível:** MEDIO — código com lógica em 2 arquivos de `assets/js`, sem banco.
- **Descrição:** o "Editar aula" passa os cards do índice ao "Gerenciar atividades"; vincular
  uma atividade que é link de outro card (com outra aula) é recusado com a explicação. Ao abrir o
  "Editar aula" de uma aula que também é a de outro card, aparece o aviso com o nome do outro card.
- **Critérios de aceitação:** `node --check`; leitura do fluxo (sem navegador).

### #221.4 — Aceite do usuário

**Próximo passo:** 👀 o usuário edita um dos cards da Aula 06 e confere que o outro não muda.

- **Nível:** LEVE — conferência do usuário.
