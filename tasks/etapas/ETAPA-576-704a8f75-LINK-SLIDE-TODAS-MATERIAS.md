## Etapa 576-704a8f75 — #429: Aplicar o link "SLIDE AULA NN" em todas as matérias de todos os cursos

**Tarefa:** #429-704a8f75 · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "crie mais 1 tarefa pra aplicar esta regra em todas as matérias de todos os demais cursos" (a regra da #428: link "SLIDE AULA NN" ao lado de cada aula, com o caminho em `aula.link_aula`).
**Objetivo:** todas as matérias de todos os cursos mostram o link do slide ao lado de cada aula, com o caminho guardado em `aula.link_aula`.

### Escopo
- Entra: inventário das pastas `AULAS/` (slides) de cada matéria de cada curso.
- Entra: preencher `link_aula` das aulas que têm slide, com o link do PDF no GitHub (decisão do usuário em 2026-10-29, igual à #428).
- Entra: o índice ATIVIDADES de cada matéria mostra "SLIDE AULA NN" lendo o banco (mesmo padrão da #428).
- Não entra: criar slides, mudar a tela da #428 além do padrão, mexer em aula sem slide.

### Riscos
- `.vercelignore` tem `*.pdf` e o repositório é PRIVATE: o link do GitHub só abre com acesso ao repositório. Mesma decisão pendente da #428 antes desta tarefa.
- Mudança em massa no banco: exige backup e conferência por matéria.
- Depende da #428 (coluna e padrão). Sem ela, não começa.

### Verificação
- Consulta de leitura: contagem de aulas com `link_aula` por matéria × número de PDFs em `AULAS/`.
- Sem navegador e sem testes automatizados.

### Decisões
- 2026-10-29 — Usuário pediu a tarefa no chat. Tarefa grande: aguarda "sim" e a #428 concluída.

### #429.1 — Inventário de slides por matéria e curso

**Próximo passo:** depois da #428.4, listar as pastas `AULAS/` de cada matéria e cruzar com a tabela `aula`.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** lista de matéria × aulas × PDF encontrado, sem alterar arquivo nem banco.
- **Critérios de aceitação:** tabela completa na etapa, com as aulas sem PDF marcadas.
- **Entrega:** — · **Verificação:** —

### #429.2 — Preencher link_aula de todas as matérias

**Próximo passo:** depois da #429.1 e com backup, gravar `link_aula` das aulas que têm PDF.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** update em massa por `aula.id`, uma matéria por vez.
- **Critérios de aceitação:** toda aula com PDF tem `link_aula`; nenhuma outra linha alterada.
- **Entrega:** — · **Verificação:** —

### #429.3 — Botão "SLIDE AULA NN" no índice de atividades de todas as matérias

**Próximo passo:** depois da #429.2, aplicar o padrão da #428.3 no gerador e nos índices.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** o gerador de índices passa a mostrar o botão, lendo `link_aula` do banco.
- **Critérios de aceitação:** botão em toda matéria com `link_aula`; sem `link_aula`, sem botão.
- **Entrega:** — · **Verificação:** —

### #429.4 — Documentação e conferência

**Próximo passo:** depois da #429.3, atualizar `docs/` e conferir o quadro.
- **Nível:** LEVE — classificado (jev (confiança 0.98))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** registrar o padrão e as matérias sem slide.
- **Critérios de aceitação:** docs atualizados; quadro sem divergência.
- **Entrega:** — · **Verificação:** —
