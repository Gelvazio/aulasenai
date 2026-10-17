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

**Próximo passo:** — (entregue em 2026-10-17 10:25).

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
- **Entrega:** commit "feat(indice): atividade vinculada pelo banco aparece no card da aula (#249.1)".
  Arquivo novo `assets/js/indice-aula-atividades-vinculadas.js`; alterados
  `indice-aula-repositorio.js` (consulta única `buscarAtividadesDasAulasCard`), `indice-aula-data.js`
  (acrescenta os botões antes do bloqueio da aula e remonta os ON/OFF), `atividades-crud-modal.js`
  (carrega o script novo; refaz os botões ao salvar/excluir no CADASTRAR), `indice-aula-modal.js`
  (refaz ao fechar o Gerenciar atividades e ao excluir no Editar aula), `indice-aula-modal-vinculo.js`
  (cabeçalho) e `docs/index-indice-atividades.md`.
- **Executor:** `executor-medio` (Sonnet 5.5), num fluxo com 3 revisões em paralelo (correção, regras
  de código, segurança): 12 achados, 10 corrigidos; 2 não procedem (identificação dos cards vem da
  #213; a queda para a chave anon sem sessão é do `supabase.js`, anterior). Líder: Opus 5.5.
- **Verificação:** banco — atividade 20 com `aula_id = 30` (Aula 10, matéria 25); `node --check` nos
  6 `.js`; linhas ≤ 100 caracteres e funções ≤ 15 linhas no arquivo novo (conferido pelo líder);
  href só da mesma origem (`ehPaginaDoMesmoSite`), texto por `textContent` (sem XSS); consulta por
  `sbGet` (JWT, sem service_role). **Conferir na tela:** abrir
  `INTRODUCAO-TIC/ATIVIDADES/index.html` e ver "📝 Avaliação Objetiva 02" no card "AULA 10".
- **Anotação:** o card "AVALIAÇÃO 02" também é identificado como a aula 10 (o link fixo dele é da
  atividade 20) e aparece com o rótulo "AULA 10" — comportamento da #213, mesmo caso da #221
  (cancelada pelo usuário em 2026-10-17). Registrado em Pendências do `STATUS.md`.
