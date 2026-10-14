## Etapa 256-5db69b64 — "Suspeita de Cópia" nas discursivas (Progresso da Turma + alerta na questão)

**Tarefa:** #129-5db69b64-150d-40d9 · **Pedido em:** 2026-10-14 13:55 · **Executor:** — (livre; tem parte de banco → só o Claude Code local)
**Pedido:** "Em progresso da Turma, adicione 1 coluna de nome Suspeita de Copia, onde que a IA, ao corrigir deve comparar com todas as outras respostas dos demais alunos para a mesma resposta e verificar se foi copiado ou nao, assinale la embaixo na questao tambem, com um alerta vermelho na questao toda, piscando e chamando a atencao *SUSPEITA DE COPIA!PROFESSOR PRECISA VALIDAR!*"
**Objetivo:** na correção por IA das discursivas, cada resposta é comparada com as dos outros alunos no mesmo item/tópico; a suspeita fica gravada e aparece (1) numa coluna nova **Suspeita de Cópia** no Progresso da Turma e (2) na questão do aluno, com a questão inteira em vermelho piscando: **SUSPEITA DE CÓPIA! PROFESSOR PRECISA VALIDAR!**
**Próximo passo:** 256.1 — pedir ao usuário os detalhes (perguntas abaixo) e escrever o plano nesta etapa.

**Tarefa grande** (banco + correção por IA + várias partes): plano nesta etapa + aprovação antes de executar.

### Escopo (rascunho, a confirmar)

- Entra: discursivas (gravam em `resposta_discursiva` / `correcao_discursiva`); coluna no `progresso-turma-global.js` (+ `progresso-turma-fontes.js`); alerta na questão para o professor ao escolher o aluno (`avaliacao-discursiva.js` + CSS); onde a IA corrige hoje (`correcao-discursiva-ia.js` / nota parcial da IA em `correcao_discursiva`); coluna(s) novas no banco com RLS (só professor lê).
- Não entra (a confirmar): objetivas; punição automática na nota (a suspeita só avisa; quem decide é o professor).

### Perguntas ao usuário (antes do plano)

1. Vale só para as discursivas ou também para as práticas/objetivas?
2. O aluno pode ver a suspeita, ou só o professor?
3. Como o professor "valida": botão "Não é cópia / É cópia" que apaga o alerta? Muda a nota?
4. A comparação é só entre alunos da mesma turma ou de todas as turmas da atividade?
5. A coluna mostra só "⚠️ Sim/—" ou também com quem a resposta parece (nome do outro aluno e a questão)?

### Riscos

- Respostas curtas ou muito técnicas ficam parecidas sem cópia (falso positivo) → a IA deve comparar o texto todo, e o professor sempre valida.
- Dados pessoais: o nome do aluno não vai para a IA (regra de `correcao-discursiva-ia.js`); comparar por id.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 256.1 | Respostas do usuário às perguntas acima | 👀 Aguardando o usuário | — | — |
| 256.2 | Plano completo nesta etapa (banco, IA, Progresso, alerta na questão) + aprovação do usuário | ⬜ Pendente | — | Aprovação registrada aqui |
| 256.3 | Banco: coluna(s) da suspeita + RLS (SQL idempotente) | ⬜ Pendente | — | Consulta ao banco |
| 256.4 | IA: comparar cada resposta com as dos outros alunos no mesmo item/tópico e gravar a suspeita | ⬜ Pendente | — | — |
| 256.5 | Progresso da Turma: coluna "Suspeita de Cópia" | ⬜ Pendente | — | `node --check` + leitura |
| 256.6 | Questão: alerta vermelho piscando "SUSPEITA DE CÓPIA! PROFESSOR PRECISA VALIDAR!" | ⬜ Pendente | — | `node --check` + leitura |
| 256.7 | Aceite do usuário | ⬜ Pendente | — | — |
