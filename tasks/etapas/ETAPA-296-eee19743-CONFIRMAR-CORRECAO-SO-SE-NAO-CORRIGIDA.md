## Etapa 296-eee19743 — Botão "Confirmar Correção" só quando ainda não corrigida

**Tarefa:** #169-eee19743-b7a8-421d-aa70-e0273d86cc6b · **Pedido em:** 2026-10-14 21:26 · **Executor:** Claude Code (nuvem · lucid-cannon-whxrn1)
**Pedido:** (1) "botao Confirmar Correcao,so deve aparecer ao professor,se ainda nao foi corrigido,senao mostre apenas 1 mensagem de nome *Prova Já Corrigida!*, para professor, aluno mantenha a mensagem dele." (2) "apos professor, clicar em Confirmar Correcao, deve atualizar tb o combo de alunos pendente de correcao"
**Objetivo:** para o professor, o botão "Confirmar Correção" aparece só se a prova do aluno ainda não foi corrigida; se já foi, aparece só a mensagem "Prova Já Corrigida!". Depois de confirmar, o combo "Pendente Correcao" é atualizado. O aluno continua com a mensagem atual.
**Próximo passo:** 169.4 — professor abrir uma discursiva, escolher aluno corrigido (ver a mensagem) e um pendente (confirmar e ver o combo atualizar).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 169.1 | Botão em `finalizar-atividade-professor.js` (só carregado para o professor); "corrigida" = entregue e com `nota_professor` em todas as respondidas (mesma regra de `corrigidos-discursiva.js`) | ✅ Concluído | 2026-10-14 21:27 | leitura do código |
| 169.2 | Professor: prova corrigida → só a mensagem "Prova Já Corrigida!" (também logo após confirmar); não corrigida → botão. Aluno sem mudança. JS + CSS + `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 21:28 | `node --check`; revisão do código (sem navegador) |
| 169.3 | Depois de confirmar: relê os corrigidos e, com "Pendente Correcao" ligado, o aluno sai do combo (a prova dele fica na tela). `respostas-aluno-professor.js` (`window.atualizarPendenteCorrecao`) | ✅ Concluído | 2026-10-14 21:28 | `node --check`; revisão do código (sem navegador) |
| 169.4 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
