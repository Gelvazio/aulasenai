## Etapa 283-1cbcb613 — Explicação da correção visível ao aluno e professor podendo mudar a opção

**Tarefa:** #156-1cbcb613-1423-4389-a6fa · **Pedido em:** 2026-10-14 19:39 · **Executor:** Claude Code (local · main)
**Pedido:** "se a pergunta for marcada como errada ou meia certa, deixe abaixo dela a explicação de IA do por que disso, visivel ao aluno, permita ao professor tambem poder mudar de opção, apos analise, pode ser que mude de errada pra meia certa, ou de meia certa pra certa" + "mas ao aluno, nao mostre que foi IA que corrigiu"
**Objetivo:** pergunta errada ou meia certa mostra abaixo a explicação do porquê (visível ao aluno, sem dizer que foi a IA); o professor pode trocar a opção depois de analisar (errada → meia certa, meia certa → certa).
**Próximo passo:** 283.9 — usuário testar: mudar uma nota com justificativa, abrir o "Histórico" e ver a tela do aluno.

### Escopo (revisado em 2026-10-14 19:48 — inclui a tabela de histórico e o modal "Histórico")

**Entra:**
- **Banco — alternativa:** a trava do trigger `correcao_discursiva_validar` passa a aceitar a mudança da `nota_professor` **somente com justificativa preenchida** (coluna nova `justificativa_mudanca` em `correcao_discursiva`, que leva o texto do navegador até o trigger); para cima ou para baixo; apagar a nota continua proibido.
- **Banco — histórico (tabela nova `correcao_discursiva_historico`):** uma linha por **evento** de cada alternativa, na ordem: `confirmacao` (1ª nota do professor) e `mudanca` (cada troca). Colunas: id, `aluno_id`, `atividade_id`, `tentativa`, `item`, `topico`, `tipo`, `nota_anterior`, `nota_nova`, `justificativa`, `feito_por`, `feito_em`. Quem grava é o **trigger** (ninguém grava direto: sem insert/update/delete pelo navegador). RLS: o professor vê os alunos das turmas dele; o aluno vê só os dele, e só depois de entregar, de o professor confirmar e do gabarito liberado. Seed do histórico: as alternativas já confirmadas hoje ganham o evento `confirmacao` com a data de `corrigido_em`.
- **Professor — mudar a opção:** ao clicar em outra opção numa alternativa já confirmada, abre o modal **"Justificativa de mudança da nota na Pergunta"** (texto obrigatório, com a justificativa apresentada pelo aluno); grava a nova nota e a justificativa.
- **Botão "🕒 Histórico"** logo **depois do botão "Errada"** (professor) e ao lado do resultado da alternativa (aluno); **em ambos só habilitado se houver eventos; sem eventos aparece desabilitado** (ajuste do usuário em 2026-10-14 19:49): abre o **modal "Histórico"**, visível ao aluno e ao professor, em **linha do tempo** vertical parecida com a imagem enviada: data e hora de cada evento em sequência, com o marcador, a seta "Meia certa → Certa", a justificativa e quem fez (só "Professor", nunca IA).
- **Aluno — explicação:** só depois de entregar, de o professor confirmar a nota e do gabarito liberado, **abaixo de cada pergunta errada ou meia certa** aparece a explicação do porquê, em texto visível (não só no balão), **sem dizer que foi IA** (some também "observação da IA" da dica da página); se a nota mudou, em seguida: "Esta alternativa estava <anterior> e foi considerada <nova> pelo motivo: <justificativa>."

**Não entra:** mudança em atividades que não sejam discursivas; o professor editar o texto da explicação; apagar eventos do histórico.

### Riscos

- A trava de nota definitiva é regra do usuário (2026-10-08); a mudança só passa com justificativa e deixa evento no histórico. Plano B: se o trigger novo falhar na conferência, reaplicar o SQL anterior (`database/2026-10-08-correcao-discursiva-nota-professor-travada.sql`) e não usar a tabela nova.
- A explicação e o histórico não podem vazar o gabarito: o aluno só lê o que o RLS deixa (próprio aluno, nota confirmada, gabarito liberado); conferir as políticas no Supabase antes de liberar a leitura.
- Banco só pelo Claude Code local (`multiplas-ias.md`); SQL idempotente em `database/` + `docs/database.md` + `docs/relatorio_verificacao_database.html` sincronizados.

### Decisões

- 2026-10-14 — usuário: a mudança exige justificativa gravada na pergunta; pode subir ou descer; o aluno vê a explicação e depois a justificativa; só depois da prova corrigida e confirmada; não mostrar que foi IA.
- 2026-10-14 19:48 — usuário: em vez de guardar só a última mudança, **tabela de histórico em forma de eventos** + **modal "Histórico"** (botão depois de "Errada"), visível ao aluno e ao professor, em linha do tempo com data e hora.
- 2026-10-14 19:49 — usuário aprovou o plano ("No mais, tudo certo"); ajuste: o botão "Histórico" do professor também só fica habilitado com eventos, senão aparece desabilitado.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 283.1 | Detalhes pedidos ao usuário e plano escrito nesta etapa | ✅ Concluído | 2026-10-14 19:48 | respostas do usuário registradas em Decisões |
| 283.2 | Aprovação do plano revisado pelo usuário | ✅ Concluído | 2026-10-14 19:49 | usuário: "O botão Histórico do professor também só deve aparecer se tiver eventos, senão mostre desabilitado. No mais, tudo certo" |
| 283.3 | SQL idempotente `database/2026-10-14-historico-mudanca-nota-discursiva.sql` (coluna `justificativa_mudanca`, tabela `correcao_discursiva_historico`, trigger de validação com justificativa, trigger do histórico, RLS, seed dos eventos de hoje) | ✅ Concluído | 2026-10-14 19:51 | arquivo criado |
| 283.4 | Aplicado no Supabase (projeto AULAS SENAI) e conferido | ✅ Concluído | 2026-10-14 19:51 | consulta: 33 eventos = 33 notas confirmadas; coluna 1; trigger 1; RLS ligado; 1 política de select; só `SELECT` para `authenticated` |
| 283.5 | Professor: modal "Justificativa de mudança da nota na Pergunta" (`justificativa-mudanca-nota.js`, `modal-nota-discursiva.js` + CSS) ligado em `confirmar-nota-professor-discursiva.js` (opções livres; mudar exige justificativa) | ✅ Concluído | 2026-10-14 19:56 | `node --check` |
| 283.6 | Modal "Histórico" em linha do tempo + botão "🕒 Histórico" depois de "Errada" (professor; desabilitado sem eventos) e junto ao resultado (aluno; só com eventos): `historico-nota-discursiva.js` + `modal-nota-discursiva.css` | ✅ Concluído | 2026-10-14 19:56 | `node --check` |
| 283.7 | Aluno: explicação abaixo da alternativa errada/meia certa (sem citar IA) + justificativa da mudança em `resultado-aluno-discursiva.js` + CSS (balão removido) | ✅ Concluído | 2026-10-14 19:56 | `node --check`; sem "IA" nos textos do aluno |
| 283.8 | `docs/database.md`, `relatorio_verificacao_database.html`, `docs/regras/atividades.md`, histórico de regras e visualizador | ✅ Concluído | 2026-10-14 19:56 | arquivos atualizados |
| 283.9 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
