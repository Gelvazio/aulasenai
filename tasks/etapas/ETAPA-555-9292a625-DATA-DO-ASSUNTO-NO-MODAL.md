## Etapa 555-9292a625 — #408: Campo "Data do assunto" no modal Editar aula

**Tarefa:** #408-9292a625 · **Pedido em:** 2026-10-27 10:44 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "data do assunto deve ficar ali" (print do modal "Editar aula", no espaço vazio ao lado de "Data da aula (turma 124519)").
**Objetivo:** o modal "Editar aula" mostra e grava `aula_turma.data_assunto` (data efetiva de passagem do assunto) da turma escolhida no combo, como já faz com `data_aula`.

### Escopo

- **Entra:** campo `Data do assunto (turma X)` no modal, na posição ao lado de "Data da aula"; leitura do valor atual da linha da turma; gravação só quando mudar; mesma regra de turma desabilitada sem turma no combo.
- **Não entra:** outras colunas, card do índice (já feito na #403), banco (a coluna já existe).

### Critério de pronto

- Ao abrir o modal com uma turma no combo, o campo mostra o `data_assunto` dessa turma (vazio se `null`).
- Salvar grava `data_assunto` na linha da turma; sem mudança, não grava.
- Sem turma no combo, o campo fica desabilitado, como "Data da aula".

### Riscos

- Mudar a lógica de gravação de `data_aula` por engano. A função atual compara só `data_aula`; a nova compara os dois campos.

### Decisões

- 2026-10-27 (usuário): pediu o campo no modal, no lugar indicado no print.

### Aprovação

- ✅ Pedido direto do usuário (pequena: 1 arquivo JS).

---

### #408.1 — Campo "Data do assunto" no modal (ler e gravar por turma)

**Próximo passo:** em `assets/js/indice-aula-modal-turma.js`, acrescentar o campo `data_assunto_turma` após o de data da aula, preencher com `linha.data_assunto` e gravar junto com `data_aula`, só quando mudar.

- **Nível:** LEVE · effort low
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** 1 arquivo, sem banco, sem lógica nova de tela além de um campo igual ao de data da aula.
- **Critérios de aceitação:** campo aparece ao lado de "Data da aula"; valor lido e gravado por turma; `node --check` ok.
- **Entrega:** — · **Verificação:** —
