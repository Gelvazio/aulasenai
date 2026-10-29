## Etapa 578-3f8a2d61 — #431: Link do PDF Scratch na aula 07 de FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO

**Tarefa:** #431-3f8a2d61 · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "acesse, C:\fontes\aulasenai\MATERIAIS\RIO_DO_SUL_MAIS_TECH\FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO\APOSTILA, e coloque o link Scratch-jeito_divertido_de_programar.pdf, na aula 12"
**Objetivo:** pôr o link do PDF "Scratch-jeito_divertido_de_programar.pdf" na aula de Scratch da apostila.

### Escopo
- Entra: link do PDF (que já está em `APOSTILA/`) na Aula 07 do `APOSTILA-FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO.md` e no `APOSTILA/CONTEUDO/CAPITULO-07.md`.
- Não entra: HTML da apostila, outras aulas, PDF (não é criado nem movido), `.vercelignore`.

### Riscos
- A apostila não tem "aula 12" (só capítulos 01 a 09). Decisão do usuário (2026-10-29, pergunta no chat): usar a Aula 07, que é a "aula nº 12" do sistema e trata de Scratch.
- `.vercelignore` tem `*.pdf`: o link não abre no site publicado. Não alterado nesta tarefa (fora do escopo).

### Verificação
- Leitura das duas linhas inseridas; o arquivo do PDF existe em `APOSTILA/`; nenhuma outra parte alterada.

### Decisões
- 2026-10-29 — Usuário escolheu "Aula 07" na pergunta do chat (a alternativa AULAS/AULA-12.md foi descartada).

### #431.1 — Inserir o link do PDF na Aula 07

**Próximo passo:** inserir o link no Markdown completo e no capítulo 07, conferir, mover a tarefa para `task_complete.md` e fazer commit + push.

- **Nível:** LEVE — só Markdown, uma linha de link (sinais: `.md` apenas)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Descrição:** adicionar a linha "Material de apoio" com o link relativo `Scratch-jeito_divertido_de_programar.pdf` na Aula 07 (completo) e uma seção "Material de apoio" no CAPITULO-07.md.
- **Critérios de aceitação:** o link aparece nos dois arquivos; nenhuma outra linha mudou.
- **Entrega:** commit desta tarefa (ver histórico da `main`) · **Verificação:** leitura das duas linhas do link e existência de `APOSTILA/Scratch-jeito_divertido_de_programar.pdf` (Glob); nenhuma outra linha alterada.
