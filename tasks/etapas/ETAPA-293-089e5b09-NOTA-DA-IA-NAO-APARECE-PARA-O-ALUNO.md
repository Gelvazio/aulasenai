## Etapa 293-089e5b09 — Garantir que a nota sugerida pela IA nunca aparece para o aluno

**Tarefa:** #166-089e5b09-40d6-421d-be9c · **Pedido em:** 2026-10-14 20:50 · **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-04d42f6c-y5d6iz), desde 2026-10-16 21:41 — itens 166.4 e 166.6 (sem banco); 166.5 fica com a frente local
**Pedido:** "nota sugerida pela IA, nao deve aparecer para o aluno, me garanta isso"
**Objetivo:** auditar tela, funções e banco e garantir que o aluno nunca recebe a `nota_ia`.
**Próximo passo:** 166.5 — Claude Code local: conferir como aluno que a tabela `correcao_discursiva` não devolve nada e que a view `correcao_discursiva_aluno` não traz `nota_ia` (e que a prova corrigida do aluno volta a mostrar as notas); depois 166.7 (aceite).

### Estado para quem assumir (liberada em 2026-10-14 20:56 por Claude Code, local · main)

> ⚠️ **URGENTE — a tela de resultado do aluno está sem dados até o item 166.4 ser feito.** O banco já foi alterado (a tabela `correcao_discursiva` deixou de ser legível pelo aluno), mas `assets/js/resultado-aluno-discursiva.js` ainda lê a tabela e recebe lista vazia: o aluno com gabarito liberado vê tudo como "aguardando correção", sem explicação nem histórico das notas. O professor não é afetado.

**Já feito (não refazer):**
- Aprovação do plano pelo usuário ("sim", 2026-10-14 20:56).
- Auditoria (item 166.1): nenhuma tela, função ou view do aluno usava a `nota_ia`; a brecha era o aluno ler a tabela pela API.
- SQL `database/2026-10-14-correcao-discursiva-visao-do-aluno.sql` (view `correcao_discursiva_aluno` com `aluno_id, atividade_id, tentativa, item, topico, nota_professor, comentario, justificativa_mudanca`, filtrada por `auth.uid()` e nota do professor; política `correcao_discursiva_select` agora só do professor), **aplicado no Supabase (projeto AULAS SENAI)** e conferido: a view não tem `nota_ia`, só `authenticated` tem `SELECT`, e a política da tabela é só de professor. Conferido também que só `notas_media_final`, `professor_desmarcar_entregue` e `validar_suspeita_copia` leem a tabela e as três são `security definer` (continuam funcionando).

**Falta fazer:**
- 166.4: em `resultado-aluno-discursiva.js` (função `lerResultadoDoAluno`) trocar `sbGet('correcao_discursiva', ...)` por `sbGet('correcao_discursiva_aluno', ...)`. As colunas que a tela usa (`item, topico, nota_professor, comentario`) existem na view.
- 166.5: conferir como aluno que a tabela não devolve mais nada e que a view não traz `nota_ia`.
- 166.6: atualizar `docs/database.md` e `docs/relatorio_verificacao_database.html` (view nova e política), `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` e regenerar o visualizador.
- Plano B, se algo quebrar: recriar a política antiga (comando no comentário do arquivo SQL) e voltar a leitura para a tabela.

**Commits com algo desta tarefa:** `bbe5e47` (registro), `e933436` (auditoria e plano) e o commit desta liberação (SQL + etapa + quadro).

### Resultado da auditoria (2026-10-14 20:53)

- **Telas do aluno:** nenhuma lê ou mostra a `nota_ia`. `resultado-aluno-discursiva.js` lê só `nota_professor` e `comentario`; "Meu progresso" (`progresso-do-aluno.js`) não lê notas; o histórico mostra só notas do professor; `notas_media_final` devolve só a nota do professor.
- **Funções e views do banco:** nenhuma função de uso do aluno e nenhuma view devolve `nota_ia` (só o trigger de validação).
- **Brecha (só pelo banco, sem tela):** o aluno tem `SELECT` na tabela `correcao_discursiva` (política: as próprias linhas com nota do professor), e as colunas `nota_ia` e `comentario` vêm junto. Quem abrir as ferramentas do navegador e consultar a API consegue ler a `nota_ia` das próprias questões já confirmadas. Das questões ainda não confirmadas não consegue (a linha inteira some).

### Plano (tarefa grande: segurança/banco — precisa de aprovação)

**Entra:** (1) view `correcao_discursiva_aluno` só com as colunas que o aluno pode ver (chave da alternativa, `nota_professor`, `comentario`, `justificativa_mudanca`), filtrada por `aluno_id = auth.uid()` e `nota_professor is not null`; (2) a política de leitura da tabela `correcao_discursiva` passa a valer só para o professor das turmas dele (o aluno deixa de ler a tabela); (3) `resultado-aluno-discursiva.js` passa a ler a view. **Não entra:** mudar o que o professor vê; apagar a `nota_ia`.

**Riscos:** esquecer um leitor do aluno na tabela (conferido: só o `resultado-aluno-discursiva.js`). Plano B: recriar a política antiga (`correcao_discursiva_select`) e voltar a leitura para a tabela.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 166.1 | Auditoria de telas, funções, views e permissões | ✅ Concluído | 2026-10-14 20:53 | `grep` das telas; consultas ao banco (funções, views, privilégios de coluna) |
| 166.2 | Aprovação do plano pelo usuário | ✅ Concluído | 2026-10-14 20:56 | usuário: "sim" |
| 166.3 | SQL idempotente em `database/2026-10-14-correcao-discursiva-visao-do-aluno.sql` (view + política) aplicado no Supabase | ✅ Concluído | 2026-10-14 20:56 | consulta: colunas da view sem `nota_ia`; só `SELECT` para `authenticated`; política da tabela só de professor |
| 166.4 | `resultado-aluno-discursiva.js` lê a view | ✅ Concluído | 2026-10-16 21:43 | `node --check` ok; constante `VIEW_CORRECAO_RESULTADO = 'correcao_discursiva_aluno'` no `lerResultadoDoAluno`; colunas lidas (`item, topico, nota_professor, comentario`) existem na view; o histórico (`correcao_discursiva_historico`) só guarda notas do professor (conferido no SQL do trigger) |
| 166.5 | Conferir como aluno: sem `nota_ia` pela API | ⬜ Pendente | — | consulta ao banco |
| 166.6 | Docs, histórico e visualizador | ✅ Concluído | 2026-10-16 21:43 | `docs/database.md` e `docs/relatorio_verificacao_database.html` (view nova e política só do professor), `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md`; visualizador regenerado |
| 166.7 | Aceite do usuário | ⬜ Pendente | — | — |

### Observação da frente nuvem · ccr-04d42f6c-y5d6iz (2026-10-16 21:43)

- Outras leituras da tabela no front-end (`progresso-turma-fontes.js`, `mostrar-certas-discursiva.js`,
  `corrigidos-discursiva.js`, `finalizar-atividade-professor.js`, `nota-ia-respostas-discursiva.js`) são
  do professor. O Progresso da turma também aparece para o aluno (#141): para ele, a leitura da
  `correcao_discursiva` agora vem vazia (antes trazia a própria `nota_ia`) — é o efeito pedido; conferir
  no 166.5 se a tela do aluno continua sem erro.
