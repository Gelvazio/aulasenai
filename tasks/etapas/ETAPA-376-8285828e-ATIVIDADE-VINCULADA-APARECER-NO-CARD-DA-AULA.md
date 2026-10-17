## Etapa 376-8285828e — #249: Atividade vinculada pelo banco aparecer no card da aula

**Tarefa:** #249-8285828e-f6f4-47da-ac64-453172249d65 · **Pedido em:** 2026-10-17 09:59 · **Criada por:** Claude Code (Opus 5.5) (local · main · s18)
**Pedido:** "APOS EU VINCULAR A ATIVIDADE 20 NA AULA 10, ELA NAO APARECEU NA AULA 10"
**Objetivo:** depois de vincular uma atividade a uma aula pelo "🔗 Gerenciar atividades" (#213),
o card da aula no índice de atividades da matéria passa a mostrar o botão dessa atividade.

**Diagnóstico (Claude Code Opus 5.5, s18, 2026-10-17 09:59):**
- Banco: a atividade 20 ("Avaliação Objetiva 02", `AVALIACAO-OBJETIVA-02.html`) está com
  `aula_id = 30` (Aula 10 — Editor de Apresentações e TIC, matéria 25). O vínculo foi gravado.
- Tela: os botões dos cards de `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html`
  são fixos no HTML. O "Gerenciar atividades" só grava `atividade.aula_id` e, pela decisão da #213
  (cabeçalho de `assets/js/indice-aula-modal-vinculo.js`), "vincular não cria link novo no card".
  Por isso a atividade não aparece no card da Aula 10.

### #249.1 — Card da aula mostra as atividades vinculadas pelo banco

**Próximo passo:** executor-medio implementar; líder conferir e entregar.

- **Nível:** MEDIO — código JS com lógica em 1 a 3 arquivos, sem SQL, RLS ou segurança.
- **Modelo:** só Sonnet — nunca outro (executa o `executor-medio`, líder Opus 5.5).
- **Descrição:** ao montar os cards de aula do índice de atividades, ler no banco as atividades
  ativas com `aula_id` da aula do card e acrescentar um botão para cada uma cuja `pagina` ainda
  não tem link no card. Vale para todas as matérias que usam os cards de aula (código global em
  `assets/js/`), sem editar HTML de matéria. Atualizar o comentário da #213 no cabeçalho do modal
  de vínculo.
- **Critérios de aceitação:** atividade 20 aparece no card da Aula 10 da ITIC; atividade que já tem
  link no card não fica repetida; atividade inativa não aparece; `node --check` passa nos arquivos
  alterados; regras de código (função ≤ 45 linhas, JSDoc, nomes em português).
- **Entrega:** — · **Verificação:** —
