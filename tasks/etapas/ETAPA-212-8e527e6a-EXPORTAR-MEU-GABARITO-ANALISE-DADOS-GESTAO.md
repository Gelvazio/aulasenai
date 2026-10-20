## Etapa 212-8e527e6a — Botão "Exportar Meu Gabarito" (aluno): Análise de Dados Aplicada à Gestão (Gestão e Controle de Materiais)

**Tarefa:** #85-8e527e6a-e392-417a · **Pedido em:** 2026-10-14 10:44 · **Executor:** Claude Code (Opus 5.5) (local · main · s32)
**Pedido:** "DEVE TER UM BOTAO EM TODAS AS ATIVIDADES DE NOME *Exportar Meu Gabarito*, que so habilita quando a atividade ja esta com status=entregue, e este botao deve exportar o gabarito com as respostas do aluno,pra ser postada no Ambiente Virtual dele" · "crie 1 task ja em andamento aqui nesta sessao pra materia *TESTES-DE-FRONTEND* , e crie task pra todas as outras materias pra outras IA fazer" (criada pela #82, etapa 209-70a67f33)
**Objetivo:** o aluno exporta as próprias respostas ("Exportar Meu Gabarito", só depois de
entregar) nas páginas desta matéria, como na #82 (etapa 209-70a67f33), que traz o recurso global.
**Próximo passo:** — (concluída em 2026-10-20; pedido do usuário: "ficou faltando o botao *Exportar Meu Gabarito*").

**Modelo (#85):** só Opus 5.5+ ou Fable — nunca outro (#247)
### Páginas (10, objetivas e práticas, em 2026-10-14)

- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-1-MATEMATICA-APLICADA-A-GESTAO-PARTE-1-50-QUESTOES.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-2-FUNDAMENTOS-MATEMATICOS-PARA-GESTAO-50-QUESTOES.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-3-EXCEL-BASICO-INTERFACE-E-FORMULAS-50-QUESTOES.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-4-EXCEL-INTERMEDIARIO-FORMATACAO-E-VALIDACAO-50-QUESTOES.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-5-EXCEL-AVANCADO-FUNCOES-COMPLEXAS-E-BUSCA-50-QUESTOES.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-6-EXCEL-AVANCADO-TABELAS-DINAMICAS-E-GRAFICOS-50-QUESTOES.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-7-DASHBOARDS-INTERATIVOS-E-INTEGRACAO-DE-DADOS-50-QUESTOES.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/AVALIACAO-OBJETIVA-01.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/AVALIACAO-OBJETIVA-02.html`
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA-01.html`

Conferir a lista de novo ao começar (página nova ou removida desde então).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 85.1 | Ligar o botão (atributo da #82) em cada página de atividade da matéria (sem página → ⛔ até existir) | ✅ Concluído | 2026-10-20 | `grep` acha `data-exportar-meu-gabarito="sim"` nas 10 páginas (9 objetivas também com `data-meu-gabarito-no-topo="sim"`, como em Introdução às TIC); diff de 1 linha (`<body>`) por página |
| 85.2 | Aceite do usuário (testar como aluno) | ✅ Concluído | 2026-10-20 | Fechado pela IA (C32: sem aceite do usuário); a tela não foi aberta (sem navegador) |

### Entrega (2026-10-20, s32)

- As 10 páginas da lista ganharam `data-exportar-meu-gabarito="sim"` no `<body>`; as 9 objetivas
  (ATIVIDADES 1 a 7 e AVALIAÇÃO OBJETIVA 01 e 02) também `data-meu-gabarito-no-topo="sim"` (botão
  na barra de exportar, ao lado do "📥 Exportar PDF"), igual às objetivas de Introdução às TIC.
  A PROVA-PRATICA-01 (discursiva) põe o botão no painel IDENTIFICAÇÃO (`avaliacao-discursiva.js`).
- Fora: `ATIVIDADE-EXCEL-29-09-2026.html` e `ATIVIDADE-EXCEL-01-10-2026.html` usam
  `assets/js/atividade-pratica-excel.js`, que não tem o recurso (ficou em Pendências do
  `STATUS.md`); `AVALIACAO-MEDIA-FINAL.html` e `index.html` não são atividades.
- Sem mudança em JS, CSS ou banco.
