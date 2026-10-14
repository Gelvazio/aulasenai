## Etapa 171-ee2de431 — Slides das aulas de Testes de Front-End em Markdown

**Tarefa:** #44-ee2de431-6821-41c3 · **Pedido em:** 2026-10-14 09:59 · **Executor:** Claude Code (local · main)
**Pedido:** "LEIA *C:\fontes\aulasenai\MATERIAIS\TECNICO-INFORMATICA-INTERNET\TESTES-DE-FRONTEND\AULAS*
E EXTRAIA O CONTEUDO PARA MARKDOWN, E MOVA PRA ESTA PASTA:
C:\fontes\aulasenai\MATERIAIS\TECNICO-INFORMATICA-INTERNET\TESTES-DE-FRONTEND\AULAS\CONTEUDO-AULAS"
**Objetivo:** ter o texto dos slides de cada aula (`AULA-NN-SLIDES.pdf`) em Markdown, um arquivo
por aula, na pasta `AULAS/CONTEUDO-AULAS/`.
**Próximo passo:** 171.1 — aguardar a aprovação do plano e as respostas do usuário.

### Escopo

- **Entra:** os 10 PDFs `AULAS/AULA-01-SLIDES.pdf` a `AULA-10-SLIDES.pdf` (38 a 42 slides cada,
  texto extraível); 10 arquivos `AULAS/CONTEUDO-AULAS/AULA-NN-SLIDES.md`, com um título por slide
  (`## Slide N`) e o texto do slide; script de extração na pasta temporária da sessão (não vai
  para o repositório).
- **Não entra:** imagens dos slides (só texto); mudança nos Markdowns de `CONTEUDO/` (o conteúdo
  da aula pela ementa continua lá); banco; atividades.

### Riscos

- Os PDFs não estão no Git (`.gitignore` tem `*.pdf`); os Markdowns vão para o Git e para o site.
  Plano B: pôr `CONTEUDO-AULAS/` no `.vercelignore` se o usuário não quiser no site.
- A regra "nunca ler de PDF" (`materias-global.md`) trata das fontes do conteúdo das aulas; aqui
  a leitura do PDF é o próprio pedido do usuário (conversão), e o Markdown gerado não substitui a
  ementa como fonte.
- Texto do slide pode sair com quebras de linha fora de lugar. Plano B: juntar as linhas de cada
  bloco de texto no script.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 171.1 | Aprovação do plano e respostas do usuário (PDFs ficam ou vão para a pasta nova) | 👀 Aguardando o usuário | — | Resposta no chat |
| 171.2 | Extrair o texto dos 10 PDFs para `AULAS/CONTEUDO-AULAS/AULA-NN-SLIDES.md` | ⬜ Pendente | — | 10 arquivos, nº de seções `## Slide` = nº de páginas do PDF |
| 171.3 | Atualizar `AULAS/STATUS-AULAS.md` com a pasta nova | ⬜ Pendente | — | Leitura do arquivo |
| 171.4 | Aceite do usuário | ⬜ Pendente | — | — |
