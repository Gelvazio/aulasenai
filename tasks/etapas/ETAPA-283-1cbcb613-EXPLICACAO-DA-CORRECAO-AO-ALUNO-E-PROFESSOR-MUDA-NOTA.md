## Etapa 283-1cbcb613 — Explicação da correção visível ao aluno e professor podendo mudar a opção

**Tarefa:** #156-1cbcb613-1423-4389-a6fa · **Pedido em:** 2026-10-14 19:39 · **Executor:** Claude Code (local · main)
**Pedido:** "se a pergunta for marcada como errada ou meia certa, deixe abaixo dela a explicação de IA do por que disso, visivel ao aluno, permita ao professor tambem poder mudar de opção, apos analise, pode ser que mude de errada pra meia certa, ou de meia certa pra certa" + "mas ao aluno, nao mostre que foi IA que corrigiu"
**Objetivo:** pergunta errada ou meia certa mostra abaixo a explicação do porquê (visível ao aluno, sem dizer que foi a IA); o professor pode trocar a opção depois de analisar (errada → meia certa, meia certa → certa).
**Próximo passo:** 283.2 — usuário aprovar o plano (responder "sim").

### Escopo

**Entra:**
- Banco: colunas novas em `correcao_discursiva` (`nota_anterior`, `justificativa_mudanca`, `mudada_em`, `mudada_por`) e a trava do trigger `correcao_discursiva_validar` passa a aceitar a mudança da `nota_professor` **somente com justificativa preenchida** (para cima ou para baixo); apagar a nota continua proibido.
- Professor: ao clicar em outra opção (Certa / Meia certa / Errada) numa alternativa já confirmada, abre um **modal "Justificativa de mudança da nota na Pergunta"** (texto obrigatório, com a justificativa apresentada pelo aluno); grava a nova nota e a justificativa na alternativa.
- Aluno (só depois de entregar, de o professor confirmar a nota e do gabarito liberado): **abaixo de cada pergunta errada ou meia certa** aparece a explicação do porquê, em texto visível (não mais só no balão), **sem dizer que foi IA** (some também o texto "observação da IA" da dica). Se a nota foi mudada, aparece em seguida: "Esta alternativa estava <anterior> e foi considerada <nova> pelo motivo: <justificativa>."

**Não entra:** histórico completo de várias mudanças (fica só a última: anterior, nova, justificativa); mudança em outras atividades que não sejam discursivas; o professor editar o texto da explicação.

### Riscos

- A trava de nota definitiva é regra do usuário (2026-10-08); a mudança só passa com justificativa. Plano B: se o trigger novo falhar na conferência, reaplicar o SQL anterior (`database/2026-10-08-correcao-discursiva-nota-professor-travada.sql`).
- Explicação não pode vazar o gabarito: o aluno só lê o que o RLS já deixa (nota confirmada e gabarito liberado); conferir a política no Supabase antes de liberar a leitura das colunas novas.
- Banco só pelo Claude Code local (`multiplas-ias.md`); SQL idempotente em `database/` + `docs/database.md` + `docs/relatorio_verificacao_database.html` sincronizados.

### Decisões

- 2026-10-14 — usuário: a mudança exige justificativa gravada na pergunta; pode subir ou descer; o aluno vê a explicação e depois a justificativa; só depois da prova corrigida e confirmada; não mostrar que foi IA.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 283.1 | Detalhes pedidos ao usuário e plano escrito nesta etapa | ✅ Concluído | 2026-10-14 19:43 | respostas do usuário registradas em Decisões |
| 283.2 | Aprovação do plano pelo usuário | 👀 Aguardando o usuário | — | — |
| 283.3 | SQL idempotente em `database/` (colunas + trigger com justificativa) | ⬜ Pendente | — | — |
| 283.4 | Aplicar no Supabase e conferir (colunas, trigger, RLS do aluno) | ⬜ Pendente | — | consulta ao banco |
| 283.5 | Professor: modal "Justificativa de mudança da nota na Pergunta" em `confirmar-nota-professor-discursiva.js` + CSS | ⬜ Pendente | — | `node --check` |
| 283.6 | Aluno: explicação visível abaixo da pergunta (sem citar IA) + justificativa em `resultado-aluno-discursiva.js` + CSS | ⬜ Pendente | — | `node --check` |
| 283.7 | `docs/database.md`, `relatorio_verificacao_database.html`, `docs/regras/atividades.md`, histórico de regras e visualizador | ⬜ Pendente | — | — |
| 283.8 | Aceite do usuário | ⬜ Pendente | — | — |
