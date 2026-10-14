## Etapa 293-089e5b09 — Garantir que a nota sugerida pela IA nunca aparece para o aluno

**Tarefa:** #166-089e5b09-40d6-421d-be9c · **Pedido em:** 2026-10-14 20:50 · **Executor:** Claude Code (local · main)
**Pedido:** "nota sugerida pela IA, nao deve aparecer para o aluno, me garanta isso"
**Objetivo:** auditar tela, funções e banco e garantir que o aluno nunca recebe a `nota_ia`.
**Próximo passo:** 293.2 — usuário aprovar o plano abaixo (responder "sim").

### Resultado da auditoria (2026-10-14 20:53)

- **Telas do aluno:** nenhuma lê ou mostra a `nota_ia`. `resultado-aluno-discursiva.js` lê só `nota_professor` e `comentario`; "Meu progresso" (`progresso-do-aluno.js`) não lê notas; o histórico mostra só notas do professor; `notas_media_final` devolve só a nota do professor.
- **Funções e views do banco:** nenhuma função de uso do aluno e nenhuma view devolve `nota_ia` (só o trigger de validação).
- **Brecha (só pelo banco, sem tela):** o aluno tem `SELECT` na tabela `correcao_discursiva` (política: as próprias linhas com nota do professor), e as colunas `nota_ia` e `comentario` vêm junto. Quem abrir as ferramentas do navegador e consultar a API consegue ler a `nota_ia` das próprias questões já confirmadas. Das questões ainda não confirmadas não consegue (a linha inteira some).

### Plano (tarefa grande: segurança/banco — precisa de aprovação)

**Entra:** (1) view `correcao_discursiva_aluno` só com as colunas que o aluno pode ver (chave da alternativa, `nota_professor`, `comentario`, `justificativa_mudanca`), filtrada por `aluno_id = auth.uid()` e `nota_professor is not null`; (2) a política de leitura da tabela `correcao_discursiva` passa a valer só para o professor das turmas dele (o aluno deixa de ler a tabela); (3) `resultado-aluno-discursiva.js` passa a ler a view. **Não entra:** mudar o que o professor vê; apagar a `nota_ia`.

**Riscos:** esquecer um leitor do aluno na tabela (conferido: só o `resultado-aluno-discursiva.js`). Plano B: recriar a política antiga (`correcao_discursiva_select`) e voltar a leitura para a tabela.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 293.1 | Auditoria de telas, funções, views e permissões | ✅ Concluído | 2026-10-14 20:53 | `grep` das telas; consultas ao banco (funções, views, privilégios de coluna) |
| 293.2 | Aprovação do plano pelo usuário | 👀 Aguardando o usuário | — | — |
| 293.3 | SQL idempotente em `database/` (view + política) e aplicar no Supabase | ⬜ Pendente | — | consulta ao banco |
| 293.4 | `resultado-aluno-discursiva.js` lê a view | ⬜ Pendente | — | `node --check` |
| 293.5 | Conferir como aluno: sem `nota_ia` pela API | ⬜ Pendente | — | consulta ao banco |
| 293.6 | Docs, histórico e visualizador | ⬜ Pendente | — | — |
| 293.7 | Aceite do usuário | ⬜ Pendente | — | — |
