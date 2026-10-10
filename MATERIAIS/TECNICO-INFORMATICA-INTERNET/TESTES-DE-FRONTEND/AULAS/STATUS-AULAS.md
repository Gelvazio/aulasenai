# 📊 STATUS DAS AULAS — TESTES-DE-FRONTEND

> Controle da regra "GERAR E GRAVAR UMA AULA POR VEZ" do `CLAUDE.md` da raiz: uma aula só passa
> para a próxima quando todas as peças dela estão ✅ (ou ⛔ não se aplica).
> Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `⛔ Não se aplica`.

**Levantamento inicial:** 2026-10-03 (conferência de todas as matérias; arquivos da pasta + atividades
cadastradas no banco). **Aulas encontradas:** 10 (slides `AULAS/AULA-NN-SLIDES.pdf`, movidos de `AULAS-CHALKIE-AI/` na padronização de 2026-10-03).
**`DOCUMENTACAO/PLANO-AULAS.md`:** ⬜ em geração (Etapa 102 do `STATUS.md`; plano `docs/aulas-conteudo-testes-de-frontend.md`).

| Aula | Tema | Aula (fonte) | Aula em `CONTEUDO/` | Página HTML da aula | Atividade 50 questões | Prática | Banco |
|---|---|---|---|---|---|---|---|
| 01 | Fundamentos de Testes de Software | ✅ `AULA-01-SLIDES.pdf` | ✅ `CONTEUDO/AULA-01-FUNDAMENTOS-DE-TESTES-DE-SOFTWARE.md` | ⛔ | ✅ `ATIVIDADES-AULA-01-50-QUESTOES.html` | ✅ `ATIVIDADE-PRATICA-AULA-01.html` | ✅ ids 96 e 99 |
| 02 | Planejamento, Verificação, Validação e Casos de Teste | ✅ `AULA-02-SLIDES.pdf` | ✅ `CONTEUDO/AULA-02-PLANEJAMENTO-VERIFICACAO-VALIDACAO-E-CASOS-DE-TESTE.md` | ⛔ | ✅ `ATIVIDADES-AULA-02-50-QUESTOES.html` | ✅ `ATIVIDADE-PRATICA-AULA-02.html` | ✅ ids 97 e 100 |
| 03 | Testes Unitários no Frontend com Vitest | ✅ `AULA-03-SLIDES.pdf` | ✅ `CONTEUDO/AULA-03-TESTES-UNITARIOS-COM-VITEST.md` | ⛔ | ✅ `ATIVIDADES-AULA-03-50-QUESTOES.html` | ✅ `ATIVIDADE-PRATICA-AULA-03.html` | ✅ ids 98 e 101 |
| 04 | Testes de Integração com DOM usando Testing Library | ✅ `AULA-04-SLIDES.pdf` | ✅ `CONTEUDO/AULA-04-TESTES-DE-INTEGRACAO-COM-TESTING-LIBRARY.md` | ⛔ | ✅ `ATIVIDADES-AULA-04-50-QUESTOES.html` | ✅ `ATIVIDADE-PRATICA-AULA-04.html` | ⬜ seeds gerados, não aplicados |
| 05 | Testes de Integração Avançados e Mock de APIs | ✅ `AULA-05-SLIDES.pdf` | ✅ `CONTEUDO/AULA-05-INTEGRACAO-AVANCADA-E-MOCK-DE-APIS.md` | ⛔ | ⬜ | ⛔ | ⬜ |
| 06 | Testes End to End com Cypress e Playwright | ✅ `AULA-06-SLIDES.pdf` | ✅ `CONTEUDO/AULA-06-TESTES-END-TO-END-COM-CYPRESS-E-PLAYWRIGHT.md` | ⛔ | ⬜ | ⛔ | ⬜ |
| 07 | Métricas e Cobertura de Testes | ✅ `AULA-07-SLIDES.pdf` | ✅ `CONTEUDO/AULA-07-METRICAS-E-COBERTURA-DE-TESTES.md` | ⛔ | ⬜ | ⛔ | ⬜ |
| 08 | TDD e Debugging Moderno no Frontend | ✅ `AULA-08-SLIDES.pdf` | ✅ `CONTEUDO/AULA-08-TDD-E-DEBUGGING-NO-FRONT-END.md` | ⛔ | ⬜ | ⛔ | ⬜ |
| 09 | Qualidade, Performance, Acessibilidade e CI CD | ✅ `AULA-09-SLIDES.pdf` | ✅ `CONTEUDO/AULA-09-QUALIDADE-PERFORMANCE-ACESSIBILIDADE-E-CI-CD.md` | ⛔ | ⬜ | ⛔ | ⬜ |
| 10 | Projeto Prático Integrador Suíte de Testes | ✅ `AULA-10-SLIDES.pdf` | ✅ `CONTEUDO/AULA-10-PROJETO-INTEGRADOR-SUITE-DE-TESTES.md` | ⛔ | ⬜ | ⛔ | ⬜ |

## Observações

- Aulas só em PDF (`AULA-NN-SLIDES.pdf`); nenhuma atividade HTML nem cadastro no banco.
- Apoio da Aula 01 nesta pasta: `AULA-01-GUIA-LABORATORIO.md`, `AULA-01-EXERCICIO-01.md`, `AULA-01-EXERCICIO-02.md` (gabarito em `AULA-01-GABARITO-EXERCICIOS.md`, fora do Git).
- Aulas a gerar ou completar seguem a regra: uma por vez, completa, atualizando esta tabela.
- "Banco" = atividade cadastrada na tabela `atividade` (liberada/bloqueada pelo professor no índice).
