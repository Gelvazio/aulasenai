## Etapa 497-b8f4c6d0 — CORRECAO-IA-PAINEL: Painel "Executar correção de IA" no quadro de progresso

**Tarefa:** CORRECAO-IA-PAINEL · **Pedido em:** 2026-10-24 14:00 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s497)
**Pedido:** "NO QUADRO DE PROGRESSO DAS ATIVIDADES, crie 1 quadro dentro dele em cima conforme mostrado, que tem 1 botao que dispara a tarefa de correcao do Claude, abaixo deve ter a quantidade de atividades entregues e a quantidade de questoes corrigidas. A cada execucao da tarefa, so pode corrigir a questao que ainda nao foi corrigida, e so deve corrigir atividades com status = ENTREGUE" (imagem: caixa vermelha "EXECUTAR CORRECAO DE IA AGORA" à direita dos filtros, acima da tabela)
**Objetivo:** o professor dispara, no próprio quadro de progresso, a correção por IA (Claude) das atividades entregues, e vê quantas atividades foram entregues e quantas questões já foram corrigidas.

**Jev:** classificou o pedido como PESADO (confiança 0,98; sinais: banco, segredo, mais de 3 arquivos). É tarefa **grande**: plano abaixo, executar só depois do "sim" do usuário.

### Achados (leitura, 2026-10-24)

- Hoje **não existe correção automática por Claude** no site: a IA é manual (copiar prompt → IA externa → colar a resposta), sem chave nem endpoint (`assets/js/correcao-discursiva-ia.js:1-5`, `docs/regras/atividades.md:179-184`). Chave de IA **não pode** ficar no navegador.
- **Não existe `status = ENTREGUE`.** "Entregue" = linha em `entrega_atividade` para (aluno, atividade, tentativa); no quadro é o booleano `aluno.entregue` (`progresso-turma-fontes.js`, `progresso-turma-global.js:445-447`).
- **Questão corrigida pela IA** = `correcao_discursiva.nota_ia IS NOT NULL` (marcador `nota_ia_em`); uma linha por (aluno, atividade, tentativa, item, tópico). Objetiva não tem "correção": a nota é automática pelo gabarito → a correção por IA vale só para **discursiva**.
- RLS: professor lê/insere/atualiza `correcao_discursiva` (`eh_professor() AND professor_pode_ver_aluno`); trigger limita a nota aos pontos do tópico; `nota_professor` nunca é tocada pela IA.
- Quadro: `progresso-turma-global.js` está com 978 linhas (limite 1000) → painel em **arquivo novo** (`assets/js/correcao-ia-progresso.js` + CSS), plugado por `carregarScriptProgressoGlobal` e atualizado a cada 5 s a partir de `estadoProgressoGlobal.ultimosAlunos`.

### Escopo

- **Entra:** painel no topo do quadro (botão + contagens + estado do último pedido); tabela de fila `pedido_correcao_ia` com RLS; rotina de correção executada pelo Claude Code local; docs/regras.
- **Não entra:** correção de objetivas (já automática); chave de IA no site; alterar `nota_professor`; alterar atividades já corrigidas pelo professor.

### Decisão de desenho (a aprovar)

**Opção A (recomendada) — fila + Claude Code local.** O botão grava um pedido na tabela `pedido_correcao_ia` (RLS só professor). Uma rotina do Claude Code local (comando/skill do projeto) lê os pedidos pendentes, corrige **somente** tópicos de atividades entregues que ainda não têm `nota_ia`, grava `nota_ia` + `nota_ia_em` (upsert sem enviar `nota_professor` nem `comentario`) e marca o pedido como concluído. Sem chave no site, sem custo de API extra, segue a regra "banco só pelo Claude Code local". Limite: a correção só roda quando o professor abre o Claude Code e executa a rotina.

**Opção B — função serverless na Vercel** com `ANTHROPIC_API_KEY` em variável de ambiente: o botão chama a função, que corrige na hora. Exige criar `api/`, configurar a chave na Vercel e aceitar custo de API; foge do padrão atual do projeto.

### Riscos

| Risco | Plano B |
|-------|---------|
| Correção sobrescrever nota do professor | upsert só de `nota_ia`/`nota_ia_em`; trigger já protege `nota_professor` |
| Corrigir atividade não entregue | rotina filtra por `entrega_atividade` (tentativa vigente) |
| Corrigir de novo questão já corrigida | filtro `nota_ia IS NULL` |
| Aluno ver nota IA | view `correcao_discursiva_aluno` não expõe `nota_ia` (sem mudança) |

### Decisões

- (pendente) Aprovação do plano e escolha A/B pelo usuário.

### CORRECAO-IA-PAINEL.1 — Tabela `pedido_correcao_ia` com RLS (SQL)

**Próximo passo:** executar (usuário mandou "FAÇA AGORA"; opção A).

- **Nível:** PESADO — Jev (mensagem do pedido, confiança 0,98 e 0,82)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro (neste projeto, Sonnet)
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `database/2026-10-24-pedido-correcao-ia.sql` idempotente: tabela (atividade_id, solicitado_por, solicitado_em, estado PENDENTE/CONCLUIDO, concluido_em, total_corrigidas), RLS (professor insere/lê pedidos dos alunos das suas turmas; sem delete; anon revogado). Aplicação só pelo Claude Code local (`seeds.md`/`multiplas-ias.md`), com autorização do usuário; atualizar `docs/database.md` e `relatorio_verificacao_database.html`.
- **Critérios de Aceitação:** SQL idempotente aplicado; RLS ativa; `docs/database.md` sincronizado.

### CORRECAO-IA-PAINEL.2 — Painel e botão no quadro de progresso

**Próximo passo:** depende de CORRECAO-IA-PAINEL.1.

- **Nível:** PESADO — Jev (mensagem do pedido, confiança 0,98 e 0,82)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro (neste projeto, Sonnet)
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `assets/js/correcao-ia-progresso.js` + `assets/css/correcao-ia-progresso.css`: caixa à direita dos filtros com o botão "Executar correção de IA agora" (só professor), contagem "atividades entregues" (alunos com `entregue` no quadro) e "questões corrigidas" (tópicos com `nota_ia`/total), estado do último pedido; atualiza a cada 5 s. Plug em `progresso-turma-global.js` com poucas linhas (sem passar de 1000).
- **Critérios de Aceitação:** botão só para PROFESSOR; grava o pedido via `sbPost` com JWT; contagens batem com o banco; `node --check` passa; só discursiva mostra o painel.

### CORRECAO-IA-PAINEL.3 — Rotina de correção pelo Claude Code local

**Próximo passo:** depende de CORRECAO-IA-PAINEL.1.

- **Nível:** PESADO — Jev (mensagem do pedido, confiança 0,98 e 0,82)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro (neste projeto, Sonnet)
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** comando `.claude/commands/corrigir-ia.md` (+ skill se couber): lê pedidos PENDENTE, para cada atividade corrige só tópicos de entregas sem `nota_ia`, com `topico_discursivo` (enunciado, pontos, resposta esperada, critérios) e `resposta_discursiva`; grava `nota_ia`+`nota_ia_em` (upsert só dessas colunas, nota ≤ pontos) e fecha o pedido com o total.
- **Critérios de Aceitação:** nunca grava `nota_professor`/`comentario`; segunda execução não corrige nada de novo; só atividades entregues.

### CORRECAO-IA-PAINEL.4 — Documentação e regra

**Próximo passo:** depende de .2 e .3.

- **Nível:** PESADO — Jev (mensagem do pedido, confiança 0,98 e 0,82)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro (neste projeto, Sonnet)
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** registrar o painel em `docs/progresso-global-atividades.md`, `docs/regras/atividades.md`, `.claude/rules/atividades-banco.md` e `docs/HISTORICO-REGRAS.md`.
- **Critérios de Aceitação:** regra e docs descrevem o painel, a fila e o filtro "só entregues / só sem `nota_ia`".
