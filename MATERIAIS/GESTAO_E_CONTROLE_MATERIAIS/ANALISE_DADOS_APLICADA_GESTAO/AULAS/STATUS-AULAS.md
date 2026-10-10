# 📊 STATUS DAS AULAS — ANALISE_DADOS_APLICADA_GESTAO

> Controle da regra "GERAR E GRAVAR UMA AULA POR VEZ" do `CLAUDE.md` da raiz: uma aula só passa
> para a próxima quando todas as peças dela estão ✅ (ou ⛔ não se aplica).
> Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `⛔ Não se aplica`.

**Levantamento inicial:** 2026-10-03 (conferência de todas as matérias; arquivos da pasta + atividades
cadastradas no banco). **Aulas encontradas:** 7 em `AULAS-CHALKIE-AI-COLORIDA/`.
**Carga horária da ementa:** 32 h (4 encontros de 8 h) → **8 aulas de 4 h** (regra "1 aula a cada 4 h,
arredondando para cima"): cada encontro da Seção IV da ementa = 2 aulas — encontro 1 = aulas 01–02,
encontro 2 = 03–04, encontro 3 = 05–06, encontro 4 = 07–08. **Corrigido em:** 2026-10-10 16:22
(acrescentada a aula 08, que faltava: segunda metade do encontro 4, Projeto Final).
**`DOCUMENTACAO/PLANO-AULAS.md`:** ⬜ não existe (exigido pela regra da pasta AULAS antes de gerar novas aulas).

| Aula | Tema | Aula (fonte) | Página HTML da aula | Atividade 50 questões | Prática | Banco |
|---|---|---|---|---|---|---|
| 01 | Matemática Aplicada à Gestão Parte 1 | ✅ `AULAS-CHALKIE-AI-COLORIDA/1-Matemática-Aplicada-à-Gestão-Parte-1.pptx` | ⛔ | ✅ `ATIVIDADES-1-MATEMATICA-APLICADA-A-GESTAO-PARTE-1-50-QUESTOES.html` | ⛔ | ✅ bloqueada |
| 02 | Fundamentos Matemáticos para Gestão | ✅ `AULAS-CHALKIE-AI-COLORIDA/2-Fundamentos-Matemáticos-para-Gestão.pptx` | ⛔ | ✅ `ATIVIDADES-2-FUNDAMENTOS-MATEMATICOS-PARA-GESTAO-50-QUESTOES.html` | ⛔ | ✅ bloqueada |
| 03 | Excel Básico Interface e Fórmulas | ✅ `AULAS-CHALKIE-AI-COLORIDA/3-Excel-Básico-Interface-e-Fórmulas.pptx` | ⛔ | ✅ `ATIVIDADES-3-EXCEL-BASICO-INTERFACE-E-FORMULAS-50-QUESTOES.html` | ⛔ | ✅ bloqueada |
| 04 | Excel Intermediário Formatação e Validação | ✅ `AULAS-CHALKIE-AI-COLORIDA/4-Excel-Intermediário-Formatação-e-Validação.pptx` | ⛔ | ✅ `ATIVIDADES-4-EXCEL-INTERMEDIARIO-FORMATACAO-E-VALIDACAO-50-QUESTOES.html` | ⛔ | ✅ liberada |
| 05 | Excel Avançado Funções Complexas e Busca | ✅ `AULAS-CHALKIE-AI-COLORIDA/5-Excel-Avançado-Funções-Complexas-e-Busca.pptx` | ⛔ | ✅ `ATIVIDADES-5-EXCEL-AVANCADO-FUNCOES-COMPLEXAS-E-BUSCA-50-QUESTOES.html` | ⛔ | ✅ liberada |
| 06 | Excel Avançado Tabelas Dinâmicas e Gráficos | ✅ `AULAS-CHALKIE-AI-COLORIDA/6-Excel-Avançado-Tabelas-Dinâmicas-e-Gráficos.pptx` | ⛔ | ✅ `ATIVIDADES-6-EXCEL-AVANCADO-TABELAS-DINAMICAS-E-GRAFICOS-50-QUESTOES.html` | ⛔ | ✅ bloqueada |
| 07 | Dashboards Interativos e Integração de Dados | ✅ `AULAS-CHALKIE-AI-COLORIDA/7-Dashboards-Interativos-e-Integração-de-Dados.pptx` | ⛔ | ✅ `ATIVIDADES-7-DASHBOARDS-INTERATIVOS-E-INTEGRACAO-DE-DADOS-50-QUESTOES.html` | ⛔ | ✅ bloqueada |
| 08 | Dashboards Executivos e Projeto Final (encontro 4, 2ª metade; avaliações da Seção V) | ⬜ | ⛔ | ⬜ | ⛔ | ⬜ |

## Observações

- As aulas estão em `AULAS-CHALKIE-AI-COLORIDA/` (pptx 1 a 7) e o plano em `PLANO-AULAS-ANALISE-DADOS-APLICADA-GESTAO.md` (raiz da matéria), fora do padrão `DOCUMENTACAO/PLANO-AULAS.md`.
- No banco, as aulas são numeradas de 1 a 6 (duas apresentações por aula) e há também `ATIVIDADES-AULA-01..04` (12 a 14 questões), `AVALIACAO-OBJETIVA-01/02`, `PROVA-PRATICA` e `ATIVIDADE-EXCEL-29-09-2026` / `ATIVIDADE-EXCEL-01-10-2026`.
- Aula 08: a avaliação prática da média final já existe (`PROVA-PRATICA-01.html`, id 82, aulas 01 a 07); falta só a aula (fonte) e a objetiva dela.
- Aulas a gerar ou completar seguem a regra: uma por vez, completa, atualizando esta tabela.
- "Banco" = atividade cadastrada na tabela `atividade` (liberada/bloqueada pelo professor no índice).
