## Etapa 577-12380dd8 — #430: Ajustar AULA-04 de TESTES-DE-FRONTEND e criar AULA-04.html em slides

**Tarefa:** #430-12380dd8 · **Pedido em:** 2026-10-29 09:34 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "ajuste o arquivo e crie um arquivo de nome AULA-04.html, aplicando em forma de slides o conteúdo desta aula e coloque em `MATERIAIS\TECNICO-INFORMATICA-INTERNET\TESTES-DE-FRONTEND\AULAS`". O "arquivo" é `CONTEUDO/AULA-04-TESTES-DE-INTEGRACAO-COM-TESTING-LIBRARY.md`, revisado antes com 12 inconsistências.
**Objetivo:** corrigir a AULA-04 de TESTES-DE-FRONTEND e gerar a versão em slides HTML na pasta `AULAS/`, ao lado de `AULA-04-SLIDES.pdf`.

### Escopo
- Entra: as correções 1 a 12 da análise de 2026-10-29 no `CONTEUDO/AULA-04-TESTES-DE-INTEGRACAO-COM-TESTING-LIBRARY.md`.
- Entra: `AULAS/AULA-04.html` (slides em HTML, sem navegador para validar).
- Não entra: outras aulas, banco, `link_aula` (#428), o `AULA-04-SLIDES.pdf` existente, a atividade prática.

### Riscos
- Regra do projeto: a IA não gera nem reescreve `CONTEUDO/AULA-NN-*.md` (`materias-global.md`) e não gera slides (regra #244.9). O usuário autorizou **esta vez** no chat (2026-10-29), registrado nas Decisões.
- Haiku pega só `LEVE` (C22 / regra maior). Esta etapa é `MEDIO` ou mais: quem executa é o Sonnet.
- Árvore de trabalho com mudanças de outras frentes (`CONTEUDO-AULAS/*-SLIDES.md` deletados e `ETAPA-573` modificada). Commits só com `git add` pelo caminho dos arquivos desta etapa.

### Verificação
- `CONTEUDO/AULA-04…md`: conferir as 12 correções item a item (leitura).
- `AULAS/AULA-04.html`: abre por leitura do código; tags balanceadas; links relativos existem (`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md`, `AULA-04-SLIDES.pdf`); sem navegador e sem testes automatizados.

### Decisões
- 2026-10-29 — Usuário pediu no chat as correções e o HTML em slides. Pela regra do projeto, a IA pediu autorização; o usuário respondeu "Autorizo esta vez" (vale só para esta tarefa).
- 2026-10-29 — Haiku (esta sessão) criou a etapa e a linha, e parou: as subtarefas são `MEDIO` ou acima e não podem ser pegas por Haiku. Ficam livres para Sonnet, classificadas pelo Jev.

### #430.1 — Aplicar as correções 1 a 12 no CONTEUDO/AULA-04

**Próximo passo:** reservar a subtarefa (Sonnet), aplicar as 12 correções no Markdown da aula e conferir cada uma.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Effort:** a classificar pelo Jev
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** (1) desafio "O fluxo perfeito" descrito; (2) os 4 testes do formulário listados; (3) qual teste falha no exemplo e o que o aluno faz; (4) senha de exemplo única (6 mínimo); (5) ligação com a SA 1 sem "plano de autenticação" e "tipo I" sem explicação; (6) botão "Seguir" com nome fixo e `aria-pressed`, testado com `pressed: true`; (7) React: instalar `@testing-library/dom` junto e citar o plugin React; (8) trocar a afirmação do leitor de tela por "pode indicar"; (9) conferir a data prevista 22/10; (10) apresentar a pirâmide de testes ou remeter às aulas 3 e 6; (11) indicar versões testadas; (12) confirmar o "Passo 0" na atividade prática.
- **Critérios de aceitação:** as 12 correções feitas; nenhuma outra parte da aula alterada; roteiro continua somando 240 min.
- **Entrega:** — · **Verificação:** —

### #430.2 — Criar AULAS/AULA-04.html em formato de slides

**Próximo passo:** depois da #430.1, gerar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/AULA-04.html` com os slides da aula corrigida.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Effort:** a classificar pelo Jev
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** HTML único, sem dependências externas além do que já existir no projeto; um slide por seção (objetivos, roteiro, conteúdos 1 a 7, exemplo, dinâmica, entrega, verificação, recursos); navegação por teclado; blocos de código e tabelas legíveis; sem gabarito de atividade; links relativos para a prática e o PDF.
- **Critérios de aceitação:** arquivo `AULA-04.html` na pasta `AULAS/`; todo conteúdo da aula corrigida aparece; nenhum script inline com dados do banco; sem `style=""` inline (regra SOLID do projeto, salvo o CSS do próprio arquivo).
- **Entrega:** — · **Verificação:** —

### #430.3 — Validar e entregar

**Próximo passo:** depois da #430.2, conferir links, tags e o `node --check` do que for JS; depois commit + push só dos arquivos desta etapa.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Effort:** a classificar pelo Jev
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** validação por leitura e comandos; commit com `git add` pelo caminho de `CONTEUDO/AULA-04…md`, `AULAS/AULA-04.html` e este arquivo de etapa, mais o `tasks/STATUS.md`; push na `main`.
- **Critérios de aceitação:** links relativos existem; commit único da tarefa; quadro com #430 ✅ e movido para `task_complete.md`.
- **Entrega:** — · **Verificação:** —
