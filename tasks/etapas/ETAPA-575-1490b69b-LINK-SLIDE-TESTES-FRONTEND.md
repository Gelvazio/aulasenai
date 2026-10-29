## Etapa 575-1490b69b — #428: Link "SLIDE AULA NN" ao lado de cada aula em TESTES-DE-FRONTEND

**Tarefa:** #428-1490b69b · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "nas matérias, crie um link ao lado do nome Aula 01, Aula 02, Aula 03, com o link pra baixar o slide da aula, com o nome SLIDE AULA 01, SLIDE AULA 02, etc.; os slides estão em `MATERIAIS\TECNICO-INFORMATICA-INTERNET\TESTES-DE-FRONTEND\AULAS`. Para guardar o caminho do link do slide, crie um campo `link_aula` do tipo text na tabela `aula`."
**Objetivo:** cada aula de TESTES-DE-FRONTEND mostra o botão "SLIDE AULA NN" ao lado do nome, com o caminho do PDF guardado no banco (`aula.link_aula`).

### Escopo
- Entra: coluna `link_aula text` na tabela `aula` (SQL idempotente, com backup antes).
- Entra: preencher `link_aula` das aulas 01 a 10 de TESTES-DE-FRONTEND com o caminho de `AULAS/AULA-NN-SLIDES.pdf`.
- Entra: o índice ATIVIDADES de TESTES-DE-FRONTEND mostra o link "SLIDE AULA NN" ao lado de "Aula NN", lendo o banco (a aula aparece só se estiver na tabela `aulas`).
- Não entra: outras matérias (#429), upload dos PDFs, mudança nos slides.

### Riscos
- `.vercelignore` tem `*.pdf`: os slides **não vão ao ar** no site. Por isso o link é o do PDF no GitHub (decisão do usuário).
- O repositório é **PRIVATE**: o link do GitHub só abre para quem tem acesso ao repositório. Para o aluno abrir, é preciso um lugar público para os PDFs (decisão pendente do usuário).
- Mudança de schema no banco = tarefa grande: só com "sim" do usuário.

### Verificação
- Consulta de leitura: `select numero, link_aula from aula where materia = TESTES-DE-FRONTEND` devolve 10 linhas preenchidas.
- Sem navegador e sem testes automatizados (regra do projeto).

### Decisões
- 2026-10-29 — Usuário pediu a tarefa no chat, com o campo `link_aula` text em `aula`. Execução aguarda "sim" (tarefa grande).
- 2026-10-29 — Usuário decidiu: `link_aula` guarda o **link do PDF no GitHub** (`https://github.com/Gelvazio/aulasenai/blob/main/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/AULA-NN-SLIDES.pdf`), não o caminho local.
- 2026-10-29 (Sonnet 5.5) — O usuário mandou "execute a tarefa 428 inteira agora" no chat: vale como o "sim" da tarefa grande. Sonnet executa a 428.1 a 428.3 (PESADO); a 428.4 (LEVE) fica para Haiku ou DeepSeek.
- 2026-10-29 (Sonnet 5.5) — Correção de nome: a tabela das aulas do banco se chama **`aulas`** (não existe `aula`); a coluna `link_aula text` entra em `aulas`. As 10 aulas de TESTES DE FRONTEND (`materia_id` da matéria "TESTES DE FRONTEND", curso 4) têm os ids 93, 94, 95, 124, 126, 127, 128, 129, 130 e 131 (números 1 a 10).
- 2026-10-29 (Sonnet 5.5) — Backup antes do ALTER: cópia `aulas_backup_20261029` (com RLS ligado e sem política, ninguém lê pela API) feita na mesma migração.
- 2026-10-29 — Verificado: o repositório `Gelvazio/aulasenai` é **PRIVATE**. Sem login com acesso ao repositório, o link do GitHub não abre para o aluno. Tornar o repositório público **não** é opção sem antes tirar do Git os gabaritos e seeds (o `.vercelignore` só protege o site). Pendente: decisão do usuário sobre onde o PDF fica público.

### #428.1 — Coluna link_aula na tabela aula (SQL com backup)

**Próximo passo:** aguardar o "sim" do usuário; depois fazer backup da tabela `aula` e aplicar o SQL idempotente.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** `alter table aula add column if not exists link_aula text;` com RLS já existente da tabela sem mudança.
- **Critérios de aceitação:** coluna existe; nenhuma linha apagada; `docs/database.md` e o relatório HTML atualizados.
- **Entrega:** — · **Verificação:** — (consulta de information_schema)

### #428.2 — Preencher link_aula das aulas 01 a 10 de TESTES-DE-FRONTEND

**Próximo passo:** depois da #428.1, gravar `AULAS/AULA-NN-SLIDES.pdf` em `link_aula` das 10 aulas.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** update por `aula.id` (matéria TESTES-DE-FRONTEND), um link do GitHub por aula (`https://github.com/Gelvazio/aulasenai/blob/main/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/AULA-NN-SLIDES.pdf`).
- **Critérios de aceitação:** 10 linhas com `link_aula` preenchido; nenhuma outra linha alterada.
- **Entrega:** — · **Verificação:** — (select de leitura)

### #428.3 — Link "SLIDE AULA NN" ao lado de "Aula NN" no índice de atividades

**Próximo passo:** depois da #428.2, ler `link_aula` do banco no índice e mostrar o botão ao lado do nome da aula.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** o botão "SLIDE AULA NN" abre o PDF em nova aba; o texto é fixo, o caminho vem do banco.
- **Critérios de aceitação:** 10 botões visíveis; sem `link_aula` não aparece botão; aula fora da tabela `aulas` continua fora.
- **Entrega:** — · **Verificação:** — (leitura do código e node --check)

### #428.4 — Documentação e conferência

**Próximo passo:** depois da #428.3, atualizar `docs/database.md` e conferir o quadro.

- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Descrição:** registrar a coluna e o padrão do link em `docs/`.
- **Critérios de aceitação:** docs atualizados; quadro sem divergência.
- **Entrega:** — · **Verificação:** —
