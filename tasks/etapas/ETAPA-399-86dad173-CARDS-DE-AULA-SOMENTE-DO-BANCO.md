## Etapa 399-86dad173 — #272: Cards de aula somente do banco

**Tarefa:** #272 · **Pedido em:** 2026-10-17 21:55 · **Criada por:** Codex (GPT-6) (local · main)
**Pedido:** “O banco de dados sempre deve ser a única fonte da lista de cards de aulas, sempre deve vir da tabela `AULAS`; adicione esta regra de forma global neste projeto `aulasenai`.”
**Objetivo:** registrar e aplicar a regra de que somente os registros da tabela `AULAS` determinam os cards exibidos.

### Escopo
- **Entra:** regra global no projeto; refatorar a lista para carregar aulas da tabela `AULAS`; associar conteúdo e atividades existentes ao card pelo ID da aula; retirar geração/seleção de cards com base em artigos HTML, inclusive a correção provisória da #271.
- **Não entra:** alterar registros ou schema do banco; remover HTMLs de conteúdo; mudar regras de bloqueio de atividades.
- **Critério de pronto:** cada card corresponde a um registro da tabela `AULAS`; fontes HTML não criam, duplicam, selecionam nem ocultam cards; a regra fica documentada e no visualizador.
- **Premissas:** quando o banco falhar, não usar HTML como fallback para montar cards; informar o erro de carregamento. HTMLs podem continuar como conteúdo/link associados a uma aula cadastrada.

### Riscos
- Índices atuais podem depender de metadados existentes apenas nos artigos HTML. Mitigação: manter esses artigos somente como conteúdo associado à aula do banco; mapear incompatibilidades antes de removê-los da composição dos cards.
- Falha ou indisponibilidade do banco pode deixar a lista vazia. Plano B: estado explícito de erro/carregamento, sem recorrer a uma lista de cards derivada dos HTMLs.

### Decisões
- A tabela `AULAS` é a fonte única de existência e identidade dos cards, em todas as matérias e páginas de lista. A associação de atividades usa `aula_id` do banco.
- O plano aguarda aprovação explícita antes da execução, conforme `.claude/rules/tasks/ciclo-da-task.md`.
- **Plano aprovado** pelo usuário em 2026-10-17 21:58 (“SIM, ASSUMA TUDO E FAÇA POR AQUI AGORA”).
  A tarefa passa da frente Codex (GPT-6) para `Claude Code (Opus 5.5) (local · main)`, por ordem
  do usuário; #272.1 é delegada ao `executor-leve` (Haiku) e #272.2 fica com o Opus.

### #272.1 — Registrar a regra global da fonte única de cards
**Próximo passo:** — (entregue).
- **Nível:** LEVE — alteração de documentação e visualizador gerado.
- **Modelo:** só Haiku — nunca outro
- **Descrição:** deixar inequívoco que a tabela `AULAS` define todos os cards, sem origem ou fallback por arquivo HTML.
- **Critérios de Aceitação:** a regra está em um lugar de referência do projeto, listada no índice e registrada no histórico; visualizador regenerado.
- **Executor:** Claude Code (Haiku 5.5 · executor-leve; líder Opus 5.5) (local · main).
- **Entrega:** seção "Cards de aula só da tabela `aulas`" em `.claude/rules/materias-global.md`; regra 15 do `AGENTS.md`; assunto no `INDEX.md`; linha em `docs/HISTORICO-REGRAS.md`; visualizador regenerado.
- **Verificação:** o líder leu o diff dos 4 arquivos; `materias-global.md` com 3150 bytes (≤ 5 KB); gerador saiu com código 0.

### #272.2 — Fazer a lista do aluno ser carregada exclusivamente de `AULAS`
**Próximo passo:** — (entregue).
- **Nível:** PESADO — mudança arquitetural da origem da lista e possível alcance entre várias páginas.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** retirar os HTMLs como fonte de criação, escolha, deduplicação ou fallback de cards; manter o registro do banco como autoridade e adaptar a correção provisória da #271.
- **Critérios de Aceitação:** todas as listas de cards cobertas usam somente `AULAS`; duplicidade de artigos não duplica card; falha no banco mostra erro sem fallback HTML; atividades se ligam ao card via `aula_id`; nenhum dado ou schema do banco é alterado.
- **Executor:** Claude Code (Opus 5.5) (local · main).
- **Entrega:** `assets/js/indice-aula-grade-banco.js` (substitui o `indice-gerenciar-aulas-cards.js`) monta a grade com um card por registro de `aulas` da matéria (ordem `numero`, depois `id`; sem excluídas; `visivel_alunos = false` só para professor). Os artigos do HTML só dão links à aula a que se ligam (atividade → `aula_id`; sem ela, nome/rótulo); vários artigos da mesma aula entram no mesmo card, sem link repetido; artigo sem aula da matéria sai; erro no banco mostra aviso, sem plano B. `indice-aula-data.js` usa a grade nova, perdeu a ordenação pelo HTML e escolhe a matéria pela mais frequente; `indice-aula-atividades-vinculadas.js` perdeu o "card dono" e a ocultação da #271; CSS esconde `article.aula` sem `data-aula-id` (`indice--grade-do-banco`); evento `cards-aula-montados` refaz o bloqueio do aluno e o "Fez Atividade?". A lista de aulas em `js/aulas.js` já vinha só do banco. Documentado em `docs/regras/atividades.md`.
- **Verificação:** leitura do fluxo completo (artigos → banco → cards → bloqueio, CRUD, vinculadas, feitas); `node --check` nos 8 JS alterados; `git diff --check` limpo nos arquivos da tarefa; sem banco alterado e sem navegador. Conferir na tela: índice ITIC (aula 27 em um card só).
