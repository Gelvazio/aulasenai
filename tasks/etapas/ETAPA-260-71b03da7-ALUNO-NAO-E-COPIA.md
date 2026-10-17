## Etapa 260-71b03da7 — Botão "Não é cópia" no aluno (sai da comparação na atividade)

**Tarefa:** #133-71b03da7-fd6c-405b · **Pedido em:** 2026-10-14 14:38 · **Executor:** Claude Code (local · main)
**Pedido:** "coloque um botao ao lado de cada aluno, pra marcar o aluno mesmo como NAO E COPIA, assim todas as respostas dele nao devem ser comparadas com outros alunos"
**Respostas:** só **esta atividade**; some **dos dois lados** (as dele e as dos outros que apontam para ele); as suspeitas pendentes já existentes **viram "não é cópia"** (validadas, nada apagado).
**Objetivo:** o professor libera um aluno da comparação de cópia numa atividade discursiva, com um botão na linha dele no Progresso da Turma.
**Próximo passo:** 133.5 — aceite do usuário.

**Tarefa grande** (banco + segurança): plano nesta etapa + aprovação.

### Plano

**A. Banco** (`database/2026-10-14-aluno-liberado-copia.sql`, idempotente)
- Tabela `aluno_liberado_copia` (`atividade_id`, `aluno_id`, `liberado_por`, `liberado_em`; chave atividade + aluno). RLS: só professor do aluno lê; ninguém grava direto pelo site.
- Função `liberar_aluno_copia(p_atividade, p_aluno, p_liberar)` (security definer, só professor do aluno):
  - liberar → grava a linha e muda para `nao_copia` (com `validado_por/em`) todas as suspeitas **pendentes** da atividade em que o aluno aparece (como aluno ou como parecido); notas não mudam;
  - desfazer → tira a linha (o aluno volta a ser comparado nas próximas rodadas; as suspeitas já validadas ficam como estão).
- `docs/database.md` + relatório HTML.

**B. IA**: o SQL dos candidatos (`docs/regras/suspeita-copia-discursiva.md`, usado pela rotina #130) ignora alunos de `aluno_liberado_copia` dos dois lados.

**C. Tela** (`assets/js/suspeita-copia-discursiva.js` + CSS): na coluna "Suspeita de Cópia" de cada aluno, botão **🛡️ Não é cópia** (com confirmação no popup); aluno liberado mostra **🛡️ Liberado** e o botão **↩️ Voltar a comparar**.

### Riscos
- Liberar por engano apaga da tela as suspeitas do par → confirmação no popup e "Voltar a comparar"; as suspeitas viram `nao_copia`, não são apagadas (dá para conferir no banco).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 133.1 | Aprovação do plano | ✅ Concluído | 2026-10-14 14:41 | Aprovado pelo usuário: "sim, pode executar" |
| 133.2 | Banco: tabela `aluno_liberado_copia` + RLS + função `liberar_aluno_copia` (`database/2026-10-14-aluno-liberado-copia.sql`, aplicado pelo conector); `docs/database.md` + relatório HTML | ✅ Concluído | 2026-10-14 14:41 | Teste em transação desfeita (aluno com 40 suspeitas pendentes): liberar validou 40, professor vê 1 liberado, desfazer volta a 0, aluno não consegue chamar; depois: 0 liberados, 75 pendentes |
| 133.3 | IA: SQL dos candidatos ignora os alunos liberados (`docs/regras/suspeita-copia-discursiva.md`, seguido pela rotina #130) | ✅ Concluído | 2026-10-14 14:41 | SQL rodado na 81 sem erro |
| 133.4 | Tela: botão 🛡️ Não é cópia / 🛡️ Liberado + ↩️ Voltar a comparar na coluna "Suspeita de Cópia" (`suspeita-copia-discursiva.js`, `suspeita-copia.css`; o painel passa `aoMudar` para a coluna em `progresso-turma-global.js`) | ✅ Concluído | 2026-10-14 14:41 | `node --check` nos 2 JS; confirmação no popup antes de gravar |
| 133.5 | Aceite do usuário (testar o botão logado como professor) | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
