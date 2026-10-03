# Gerar a atividade objetiva de 50 questões de cada aula — todas as matérias

**Objetivo:** cumprir a regra "1 ATIVIDADE OBJETIVA DE 50 QUESTÕES POR AULA" (`CLAUDE.md` da raiz)
nas matérias onde falta, a partir do levantamento dos `ATIVIDADES/STATUS-ATIVIDADES.md` (2026-10-03).
**Criado em:** 2026-10-03 · **Status:** ⏳ aguardando aprovação

**Método (por aula, uma por vez, completa):** ler a aula (`AULAS/`) e o `EMENTA-CHALKIE-AI.md` →
escrever `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` (50 questões A–D, contexto do curso,
capacidade, gabarito equilibrado e sorteado) → gerar o HTML com `gerar_atividades.py` → conferir
(50 itens, 200 alternativas, sem gabarito, `data-login="sim"`) → índice da matéria → entrada no seed →
atualizar `STATUS-ATIVIDADES.md` e `AULAS/STATUS-AULAS.md`. Um commit por matéria concluída.

**Pré-requisito por matéria:** `ATIVIDADES/atividades.json` (disciplina, curso, capacidades) — só
existe em Automação, TIC, Análise de Dados e Fundamentos da Tecnologia; criar nas demais a partir da
ementa.

## Fila proposta (89 atividades ≈ 4.450 questões)

| # | Matéria | Pendentes | Observação | Status |
|---|---|---|---|---|
| 1 | Introdução à TIC | 2 | Completar aula 03 (25/50, sem fonte `.md`) e aula 11 (25/50) | ⬜ |
| 2 | Fundamentos de Automação/Instrumentação | 1 | Aula 15 é avaliação integradora — confirmar se recebe atividade | ⬜ |
| 3 | Fundamentos da Tecnologia e Programação | 11 | Aulas 06–16 (as 01–05 com data no nome) | ⬜ |
| 4 | Testes de Frontend | 10 | Aulas em PDF + `ATIVIDADE-AULA-NN.md` (práticas) como fonte | ⬜ |
| 5 | Reforço de Linguagens | 16 | — | ⬜ |
| 6 | Competências Socioemocionais e Empreendedorismo | 9 | — | ⬜ |
| 7 | Exploração de Carreiras | 9 | — | ⬜ |
| 8 | Noções de Eletricidade | 9 | Aula 09 é avaliação prática — confirmar | ⬜ |
| 9 | Oficinas de Impressão 3D e Robótica | 9 | — | ⬜ |
| 10 | Reforço de Matemática e Raciocínio Lógico | 7 | "Aulas" = 7 módulos da apostila | ⬜ |
| 11 | Introdução ao Lean Manufacturing | 6 | Qualificação: ementa só do professor (apenas leitura) | ⬜ |
| — | Canvas / Digital Skills | — | Sem aulas definidas: aguardando o professor | ⛔ |

**Banco:** seeds gerados por matéria (fora do Git); aplicar no Supabase só com pedido.
**Riscos:** volume muito grande (várias sessões) — retomar sempre pelo `STATUS-ATIVIDADES.md`;
matérias sem cadastro de curso/matéria no banco (Rio do Sul, Testes, Lean) precisam do bloco de
curso/matéria no seed; vazamento de gabarito — conferir o staged contra o `.gitignore`.
