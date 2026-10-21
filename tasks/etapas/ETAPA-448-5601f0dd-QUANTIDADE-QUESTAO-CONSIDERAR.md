## Etapa 448-5601f0dd — Campo "Quantidade Questão Considerar" por aluno (nota)

**Tarefa:** #319-5601f0dd-d00a-42de-af88-ff8d648479e1 · **Pedido em:** 2026-10-21 10:14 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "aqui abaixo do campo *Faltou*, adicione um campo de nome *Quantidade Questão Considerar*, este campo deve ser o campo que valida a quantidade de questão do aluno pra dar a nota, se nao houver nada, pega a quantidade do outro campo como faz hoje, senão pega deste campo, permitindo mudar a quantidade de questão por alunos" (com print da lista de alunos: "Quantidade Mínima de Questões: 30/30", "Confirmar Todas", "Faltou?")
**Objetivo:** o professor define, por aluno, quantas questões contam para a nota; vazio = usa a "Quantidade Mínima de Questões" como hoje.

### Escopo

- **Hoje:** o "🎯 Quantidade Mínima de Questões" (tabela `minimo_questoes_aluno`, senão
  `atividade.minimo_questoes_entrega`, senão todas — função `minimo_questoes_para_entregar`)
  serve para duas coisas: liberar a entrega e dividir a nota (`nota × total ÷ mínimo`, máx. 10).
- **Entra:** campo **"Quantidade Questão Considerar"** por aluno, abaixo do "Faltou?" no Progresso
  da turma. Preenchido → a **nota** usa esse número; vazio → usa o mínimo, como hoje. O mínimo
  para **entregar** não muda.
- **Banco:** tabela nova `questoes_nota_aluno` (atividade_id, aluno_id, quantidade, definido_por,
  definido_em; RLS igual à `minimo_questoes_aluno`: professor só alunos das turmas dele, aluno só
  lê o próprio) + função `questoes_para_nota(atividade, aluno)` = quantidade do aluno, senão
  `minimo_questoes_para_entregar`; `notas_media_final` passa a usar a função nova.
- **Telas:** Progresso da turma (campo + nota parcial, IA e professor), página do aluno da
  objetiva (`respostas-atividade.js`) e da discursiva (`avaliacao-discursiva.js`): nota pela
  função nova.
- **Não entra:** mudar o botão "Cálculo Nota" e o mínimo de entrega; mudar notas já confirmadas.
- **Critério de pronto:** com o campo vazio, toda nota igual à de hoje; preenchido, nota =
  soma × total ÷ quantidade (máx. 10) no Progresso, na Média Final e na página do aluno.

### Riscos

- Banco de produção → seed idempotente pelo ciclo de `seeds.md`; só cria tabela e função (não
  apaga nada). Plano B: sem a tabela, as telas seguem com o mínimo (como hoje).
- Nota diferente entre telas → todas leem a mesma função `questoes_para_nota`.

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 | Plano aguardando aprovação (banco: frente local ou exceção desta sessão) | — |

### #319.1 — Levantar o funcionamento atual e escrever o plano (para aprovação)

**Próximo passo:** aprovação do plano pelo usuário.

- **Nível:** PESADO — banco (coluna/função da nota), regra de nota e mais de 3 arquivos ligados
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** plano com escopo, arquivos, banco, riscos e verificação.
- **Critérios de aceitação:** plano escrito nesta etapa e mostrado ao usuário.
- **Entrega:** — · **Verificação:** —

### #319.2 — Banco: tabela `questoes_nota_aluno`, função `questoes_para_nota` e Média Final

**Próximo passo:** esperar a aprovação do plano.

- **Nível:** PESADO — banco (tabela, RLS, função, seed)
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro
- **Critérios de aceitação:** seed idempotente CONCLUÍDO (md5); RLS conferida; função devolve o
  mínimo quando não há quantidade.
- **Entrega:** — · **Verificação:** —

### #319.3 — Progresso da turma: campo abaixo do "Faltou?" e nota pela quantidade

**Próximo passo:** esperar a #319.2.

- **Nível:** MEDIO — tela com lógica, módulo novo + `progresso-turma-global.js` e fontes
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** campo grava/limpa por aluno; nota parcial, IA e professor usam a
  quantidade; `node --check` ok; conferir na tela pelo professor.
- **Entrega:** — · **Verificação:** —

### #319.4 — Páginas do aluno (objetiva e discursiva): nota pela função nova

**Próximo passo:** esperar a #319.2.

- **Nível:** MEDIO — `respostas-atividade.js` e `avaliacao-discursiva.js`
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** nota mostrada ao aluno igual à do Progresso; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #319.5 — Documentação (`docs/regras/atividades.md`, `docs/database.md`)

**Próximo passo:** esperar a #319.3 e a #319.4.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
