## Etapa 256-5db69b64 — "Suspeita de Cópia" nas discursivas (Progresso da Turma + alerta na questão)

**Tarefa:** #129-5db69b64-150d-40d9 · **Pedido em:** 2026-10-14 13:55 · **Executor:** Claude Code (local · main)
**Pedido:** "Em progresso da Turma, adicione 1 coluna de nome Suspeita de Copia, onde que a IA, ao corrigir deve comparar com todas as outras respostas dos demais alunos para a mesma resposta e verificar se foi copiado ou nao, assinale la embaixo na questao tambem, com um alerta vermelho na questao toda, piscando e chamando a atencao *SUSPEITA DE COPIA!PROFESSOR PRECISA VALIDAR!*"
**Objetivo:** na correção por IA das discursivas, cada resposta é comparada com as dos outros alunos no mesmo item/tópico; a suspeita fica gravada e aparece (1) numa coluna nova **Suspeita de Cópia** no Progresso da Turma e (2) na questão do aluno, com a questão inteira em vermelho piscando: **SUSPEITA DE CÓPIA! PROFESSOR PRECISA VALIDAR!**
**Próximo passo:** 256.2 — aguardar a aprovação do plano abaixo.
**Executor (desde 2026-10-14 14:06):** Claude Code (local · main)

**Tarefa grande** (banco + correção por IA + várias partes): plano nesta etapa + aprovação antes de executar.

### Respostas do usuário (2026-10-14 14:06)

1. Só **discursivas**. 2. Só o **professor** vê. 3. Botões **"Não é cópia"** e **"É cópia"**; **É cópia zera a resposta daquela pergunta**.
4. Comparar só com alunos da **mesma turma**. 5. Mostrar **com quem parece**; ao passar o mouse, **nome e resposta do outro aluno**.

### Plano

**A. Banco** (`database/2026-10-14-suspeita-copia-discursiva.sql`, idempotente, sem apagar dados)
- Tabela nova `suspeita_copia_discursiva`: `atividade_id`, `aluno_id`, `tentativa`, `item`, `topico`,
  `aluno_parecido_id`, `semelhanca` (0 a 1), `motivo` (texto curto da IA, sem nomes),
  `situacao` (`pendente` · `nao_copia` · `copia`), `detectado_em`, `validado_por`, `validado_em`.
  Chave: atividade + aluno + tentativa + item + tópico.
- RLS: **só professor** lê (`eh_professor()` + `professor_pode_ver_aluno`); aluno não lê nada.
  Ninguém grava direto pelo site.
- Função `validar_suspeita_copia(atividade, aluno, tentativa, item, topico, e_copia)` (security
  definer, só professor): grava `situacao`, `validado_por/em`; se **É cópia**, grava
  `nota_professor = 0` naquele tópico em `correcao_discursiva` (a nota do professor fica travada,
  regra de 2026-10-08). Se a nota do professor já estava confirmada, a função recusa e avisa.
- Extensão `pg_trgm` (semelhança de textos) para achar os pares candidatos.
- `docs/database.md` + `docs/relatorio_verificacao_database.html` atualizados.

**B. IA** (procedimento + rotina da #130)
- SQL dos candidatos: no mesmo item/tópico, pares de alunos **da mesma turma** com textos
  parecidos (semelhança ≥ 0,6 e texto com pelo menos ~40 caracteres).
- A IA lê os dois textos e decide se é **suspeita** (mesmas frases, mesma ordem, mesmos erros) ou
  coincidência normal (resposta curta/técnica igual à apostila). Suspeita → grava a linha
  `pendente` (não mexe em linha já validada pelo professor). Sem nomes para a IA (só `aluno_id`).
- Procedimento escrito em `docs/regras/suspeita-copia-discursiva.md`; a tarefa agendada
  `correcao-ia-atividade-81` (#130) passa a rodar esse passo depois da correção.

**C. Progresso da Turma** (`progresso-turma-global.js` + `progresso-turma-fontes.js`, módulo novo
`assets/js/suspeita-copia-discursiva.js` + `assets/css/suspeita-copia.css`)
- Coluna **Suspeita de Cópia** (só discursivas): `—` ou `⚠️ N` com a lista "Q03 ≈ <nome do
  outro aluno>"; **ao passar o mouse**: nome e resposta do outro aluno. Validada como "não é
  cópia" some; "é cópia" fica `❌ Cópia (Q03)`.

**D. Questão do aluno** (`avaliacao-discursiva.js`, ao escolher o aluno no combo)
- A questão inteira fica com **fundo/borda vermelhos piscando** e o aviso
  **SUSPEITA DE CÓPIA! PROFESSOR PRECISA VALIDAR!**, com "Parece com: <nome>" (mouse: resposta
  do outro aluno) e os botões **✅ Não é cópia** / **❌ É cópia** (pede confirmação no popup).
  Depois de validar, o alerta para de piscar (some no "não é cópia"; fica "Cópia confirmada — nota
  zerada" no "é cópia").

### Não entra
Objetivas e práticas; o aluno ver a suspeita; zerar sem o professor validar.

### Riscos (plano B)
- Falso positivo em respostas curtas/iguais à apostila → mínimo de caracteres + a IA lê os dois
  textos + o professor sempre valida.
- Nota do professor já confirmada (travada) → "É cópia" não consegue zerar: a função avisa e o
  professor decide (não destravar automaticamente).
- Arquivos perto do limite (avaliacao-discursiva.js 803 linhas) → lógica nova em módulo próprio.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 256.1 | Respostas do usuário às perguntas acima | ✅ Concluído | 2026-10-14 14:06 | Registradas em "Respostas do usuário" |
| 256.2 | Plano completo nesta etapa (banco, IA, Progresso, alerta na questão) + aprovação do usuário | 👀 Aguardando o usuário | — | Aprovação registrada aqui |
| 256.3 | Banco: coluna(s) da suspeita + RLS (SQL idempotente) | ⬜ Pendente | — | Consulta ao banco |
| 256.4 | IA: procedimento + SQL dos candidatos; rotina #130 atualizada para rodar a verificação | ⬜ Pendente | — | — |
| 256.5 | Progresso da Turma: coluna "Suspeita de Cópia" | ⬜ Pendente | — | `node --check` + leitura |
| 256.6 | Questão: alerta vermelho piscando "SUSPEITA DE CÓPIA! PROFESSOR PRECISA VALIDAR!" | ⬜ Pendente | — | `node --check` + leitura |
| 256.7 | Aceite do usuário | ⬜ Pendente | — | — |
