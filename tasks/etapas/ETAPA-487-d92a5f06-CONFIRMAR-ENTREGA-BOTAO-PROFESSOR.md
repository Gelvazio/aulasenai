## Etapa 487-d92a5f06 — CONFIRMAR-ENTREGA-BOTAO: Botão "Confirmar Entrega" no Progresso da turma (professor)

**Tarefa:** CONFIRMAR-ENTREGA-BOTAO · **Pedido em:** 2026-10-24 12:40 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s487)
**Pedido:** "execute ela agora, REGRA-CONFIRMAR-ENTREGA ... com mais agentes" (implementar o botão da regra anotada na etapa 486: ao lado de Confirmar Todas, só o professor vê, entrega a atividade como está)
**Objetivo:** implementar no código compartilhado do Progresso da turma o botão "Confirmar Entrega", visível só ao professor, que entrega a atividade do aluno mesmo incompleta.

### CONFIRMAR-ENTREGA-BOTAO.1 — Levantar o código e escrever o plano

**Próximo passo:** subagentes leem `assets/js/progresso-turma-global.js`, `assets/js/confirmar-todas-professor.js`, como a entrega é gravada hoje (aluno) e as políticas RLS; resumir no plano da etapa e pedir o "sim".

- **Descrição:** levantamento só de leitura; plano (escopo, arquivos, riscos, verificações) escrito nesta etapa. Tarefa grande (envolve gravação no banco e RLS): execução só após o "sim" do usuário.
- **Critérios de Aceitação:** plano na etapa com arquivos, como a entrega é gravada, RLS necessária e verificação.
- **Entrega:** plano abaixo (aprovado pelo usuário em 2026-10-24) · **Verificação:** 3 agentes de leitura; relatórios conferidos

### Plano (levantamento por 3 agentes de leitura, 2026-10-24 12:50)

**Achados:**
- O quadro de cada aluno é montado em `assets/js/progresso-turma-global.js` (`montarCelulaNomeDoAlunoGlobal`, l.386-406); os botões ao lado do nome vêm de `BOTOES_NOME_POR_TIPO_GLOBAL` (l.66-68). Hoje só a **discursiva** (práticas e discursivas) tem "Confirmar Todas"; a **objetiva** tem o quadro sem ele.
- Só o professor monta o quadro (quem chama confere `ehProfessor`: `avaliacao-discursiva.js` l.349 e `respostas-atividade.js` l.885); o aluno nunca o vê. RLS continua valendo.
- A RPC `professor_marcar_entregue(p_aluno, p_atividade)` **já existe** (`database/2026-10-14-professor-marca-entregue.sql`): `security definer`, exige `eh_professor()` + `professor_pode_ver_aluno`, grava `entregue_por`, **não exige mínimo nem horário**, recusa se a tentativa já foi entregue. O professor não escreve respostas pelo aluno (regra "professor não assina"), então a atividade é entregue **como está**.
- Já existe `assets/js/marcar-entregue-professor.js` (botões "Marcar como entregue"/"Desfazer entrega" na situação do aluno), mas só em páginas com `<body data-marcar-entregue="sim">`.

**Escopo (entra):** botão **Confirmar Entrega** ao lado do aluno, em **discursiva e objetiva**, em todas as atividades (sem depender do `data-marcar-entregue`), usando a RPC existente; pede confirmação ("Entregar como está?"); some/fica desativado se o aluno já entregou; ao concluir, atualiza o quadro. Novo arquivo `assets/js/confirmar-entrega-professor.js` (um só propósito) e registro nos dois tipos em `progresso-turma-global.js`.
**Não entra:** SQL novo, mudança de RLS, preencher respostas pelo aluno, regenerar as 154 páginas (o botão vem do JS compartilhado), desfazer entrega (já existe).

**Riscos:** (1) ficar duplicado com "Marcar como entregue" nas páginas com `data-marcar-entregue` → plano B: nelas o novo botão não aparece; (2) tentativa já entregue → a RPC recusa, o botão mostra a mensagem. Sem mudança de banco, não há risco de dados.

**Subtarefas:** `.2` criar `confirmar-entrega-professor.js` (módulo + RPC + confirmação); `.3` ligar nos dois tipos em `progresso-turma-global.js` e atualizar `docs/regras/atividades.md`/`docs/ORIENTACAO` correspondente. Verificação: `node --check`, leitura do código, grep do registro; botão visível só pode ser conferido na tela pelo usuário (sem navegador).

**Aprovação:** ✅ "sim, execute o plano da etapa 487" — usuário, 2026-10-24 (tarefa grande).

### CONFIRMAR-ENTREGA-BOTAO.2 — Criar `assets/js/confirmar-entrega-professor.js`

**Próximo passo:** criar o módulo com `criarBotaoConfirmarEntrega({atividadeId, aluno, aoMudar})` (confirmação, RPC `professor_marcar_entregue`, mensagem de erro) e expor em `window`.

- **Nível:** MEDIO — classificado (jev (confiança 0.98))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Fonte:** jev (confiança 0.98)
- **Descrição:** módulo único do botão "Confirmar Entrega" (só professor, entrega como está); desativado se `aluno.entregue`; usa a RPC existente, sem SQL novo.
- **Critérios de Aceitação:** `node --check` ok; função ≤ 45 linhas, JSDoc, constantes nomeadas; sem alterar banco.
- **Entrega:** — · **Verificação:** —
- **JEV-AI-SUGGESTION:** SIM

### CONFIRMAR-ENTREGA-BOTAO.3 — Ligar nos dois tipos e documentar

**Próximo passo:** registrar o módulo em `BOTAO_NOME_POR_TIPO` (discursiva e objetiva) de `progresso-turma-global.js`, sem aparecer onde `data-marcar-entregue="sim"`; atualizar `docs/regras/atividades.md` e a orientação do módulo.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Fonte:** sinais
- **Descrição:** ligação no quadro compartilhado e documentação.
- **Critérios de Aceitação:** `node --check` ok; grep mostra o registro nos dois tipos; docs atualizadas; sem regenerar `index.html`.
- **Entrega:** — · **Verificação:** —
- **JEV-AI-SUGGESTION:** NAO
