# 📝 STATUS DAS ATIVIDADES — FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO

> Regra "1 ATIVIDADE OBJETIVA DE 50 QUESTÕES POR AULA" do `CLAUDE.md` da raiz: cada aula tem
> `ATIVIDADES-AULA-NN-50-QUESTOES.html` com **exatamente 50 questões**, fonte em `CONTEUDO/`,
> folha de respostas no banco e cadastro em `atividade` + `gabarito`. Gerar uma aula por vez,
> completa, e atualizar este arquivo a cada atividade.
> Legenda: `⬜ Pendente` · `🔄 Em progresso / falta banco` · `⚠️ Incompleta` · `✅ Concluída`.

**Levantamento:** 2026-10-03 (páginas da pasta, contagem de questões no HTML e atividades do banco).
**Plano antigo:** 16 aulas, 5 atividades publicadas (as demais ficaram substituídas pelas 9 aulas da ementa).
**Aulas da ementa (2026-10-07):** 9 · **Páginas geradas:** 9 · **No banco:** 9 (aplicado em 2026-10-08).

## Aulas da ementa em `CONTEUDO/` (9 aulas: 8 × 4 h + 1 h) — 2026-10-07

Uma atividade objetiva de 50 questões por aula, lida de `../CONTEUDO/AULA-NN-*.md` (regra "AULAS
EXTRAÍDAS DA EMENTA"). Gabarito equilibrado (13 A, 13 B, 12 C, 12 D) com posição sorteada;
distratores revisados para a resposta certa não se destacar pelo tamanho. Seed:
`database/2026-10-07-fundamentos-tecnologia-seed-atividades.sql` (fora do Git), gerado com
`scripts/gerar-seed-atividades.py --so=... --saida=...`; aplicado no Supabase em 2026-10-08 a pedido do usuário. Como a
tabela `aulas` tem número único por matéria e as aulas antigas usam 1 a 5, as 9 aulas novas têm
`numero` 6 a 14 e `rotulo_card` "AULA 01" a "AULA 09" (decisão do usuário).

| Aula | Tema | Página | Questões | Fonte (`.md`) | Banco | Status |
|---|---|---|---|---|---|---|
| 01 | Tecnologia, Dispositivos Digitais e Cidadania Digital | `ATIVIDADES-AULA-01-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md` | ✅ atividade 86 (aula nº 6, card "AULA 01") | ✅ Concluída |
| 02 | Segurança Online, Fake News e Hardware × Software | `ATIVIDADES-AULA-02-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-02-50-QUESTOES.md` | ✅ atividade 87 (aula nº 7, card "AULA 02") | ✅ Concluída |
| 03 | Sistemas Operacionais, Arquivos e Pastas | `ATIVIDADES-AULA-03-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-03-50-QUESTOES.md` | ✅ atividade 88 (aula nº 8, card "AULA 03") | ✅ Concluída |
| 04 | Atalhos de Teclado, Editor de Texto e Apresentações | `ATIVIDADES-AULA-04-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-04-50-QUESTOES.md` | ✅ atividade 89 (aula nº 9, card "AULA 04") | ✅ Concluída |
| 05 | Planilhas Simples e Boas Práticas de Pesquisa | `ATIVIDADES-AULA-05-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-05-50-QUESTOES.md` | ✅ atividade 90 (aula nº 10, card "AULA 05") | ✅ Concluída |
| 06 | Internet Segura e Pensamento Computacional | `ATIVIDADES-AULA-06-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-06-50-QUESTOES.md` | ✅ atividade 91 (aula nº 11, card "AULA 06") | ✅ Concluída |
| 07 | Algoritmos, Fluxogramas e Primeiros Passos no Scratch | `ATIVIDADES-AULA-07-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-07-50-QUESTOES.md` | ✅ atividade 92 (aula nº 12, card "AULA 07") | ✅ Concluída |
| 08 | Scratch: Condições, Repetições, Variáveis e Projeto Autoral | `ATIVIDADES-AULA-08-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-08-50-QUESTOES.md` | ✅ atividade 93 (aula nº 13, card "AULA 08") | ✅ Concluída |
| 09 | Avaliação Final: Prova Conceitual e Apresentação do Projeto | `ATIVIDADES-AULA-09-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-09-50-QUESTOES.md` | ✅ atividade 94 (aula nº 14, card "AULA 09") | ✅ Concluída |

## Atividades do plano antigo de 16 aulas (`AULAS/AULA-NN.md`)

| Aula | Tema | Página | Questões | Fonte (`.md`) | Banco | Status |
|---|---|---|---|---|---|---|
| 01 | Introdução à Tecnologia e Dispositivos Digitais | `ATIVIDADES-AULA-29-09-2026-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-29-09-2026-50-QUESTOES.md` | ✅ liberada | ✅ Concluída |
| 02 | Cidadania Digital e Segurança Online | `ATIVIDADES-AULA-06-10-2026-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-06-10-2026-50-QUESTOES.md` | ✅ liberada | ✅ Concluída |
| 03 | Ferramentas de Produtividade | `ATIVIDADES-AULA-27-10-2026-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-27-10-2026-50-QUESTOES.md` | ✅ liberada | ✅ Concluída |
| 04 | Ferramentas de Apresentação e Pesquisa Online | `ATIVIDADES-AULA-03-11-2026-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-03-11-2026-50-QUESTOES.md` | ✅ liberada | ✅ Concluída |
| 05 | Introdução aos Algoritmos | `ATIVIDADES-AULA-10-11-2026-50-QUESTOES.html` | 50 | ✅ `CONTEUDO/ATIVIDADES-AULA-10-11-2026-50-QUESTOES.md` | ✅ liberada | ✅ Concluída |
| 06 | Produtividade Digital: Apresentações (Google Slides/PowerPoint) | ⬜ `ATIVIDADES-AULA-06-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 07 | Produtividade Digital: Planilhas Eletrônicas (Excel/Google Sheets) | ⬜ `ATIVIDADES-AULA-07-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 08 | Internet: Navegadores e Boas Práticas de Pesquisa | ⬜ `ATIVIDADES-AULA-08-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 09 | Segurança na Internet: Senhas, Vírus e Privacidade | ⬜ `ATIVIDADES-AULA-09-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 10 | Pensamento Computacional: Decomposição e Padrões | ⬜ `ATIVIDADES-AULA-10-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 11 | Algoritmos: Sequência, Decisão e Repetição | ⬜ `ATIVIDADES-AULA-11-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 12 | Fluxogramas e Representação Visual de Algoritmos | ⬜ `ATIVIDADES-AULA-12-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 13 | Introdução a Programação: Conceitos Básicos | ⬜ `ATIVIDADES-AULA-13-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 14 | Scratch: Primeiros Projetos e Movimentação | ⬜ `ATIVIDADES-AULA-14-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 15 | Scratch: Condições, Variáveis e Lógica | ⬜ `ATIVIDADES-AULA-15-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |
| 16 | Scratch: Projetos Criativos Finais e Apresentação | ⬜ `ATIVIDADES-AULA-16-50-QUESTOES.html` | — | ⬜ | ⬜ | ⬜ Pendente |

## Demais atividades da pasta (adicionais)

| Página | Tipo | Banco |
|---|---|---|
| — | Nenhuma | — |
