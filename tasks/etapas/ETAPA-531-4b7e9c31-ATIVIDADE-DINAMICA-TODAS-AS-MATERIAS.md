# ETAPA 531 — Aplicar a Atividade Dinâmica em todas as matérias

- **TASK:** #382 (pedida em 2026-10-26) · **Depende de:** #381 concluída (gerador, SQL e tela prontos)
- **Nível/Modelo:** de cada subtarefa = **a classificar pelo Jev** (regra C52). Nunca Opus neste projeto.
- **Tipo:** tarefa **grande** (mudança em massa) → plano e **aprovação do usuário** antes de executar.

## Pedido

"Depois crie mais 1 tarefa para aplicar em todas as matérias" a Atividade Dinâmica criada na #381.

## Objetivo

Toda aula de toda matéria ter a etapa Atividade Dinâmica (fonte, página, card e nota), usando o gerador
da #381.

## Escopo

**Entra:** UI/UX aulas 04–19 e as matérias que já têm `CONTEUDO/AULA-NN-*.md`: BANCO-DE-DADOS,
TESTES-DE-FRONTEND, INTRODUCAO-A-TECNOLOGIA-DA-INFORMACAO-E-COMUNICACAO, e em RIO_DO_SUL_MAIS_TECH:
REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO, REFORCO_LINGUAGENS, INTRODUCAO_COMUNICACAO_ORAL_ESCRITA,
FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO.
**Fica esperando (regra "atividades só depois do Markdown"):** matérias sem Markdown de aula; o usuário
coloca o `.md` e a dinâmica da aula é gerada depois.

## Riscos

Mudança em massa: gerar por matéria, um commit por matéria; não regravar índices de matérias não tocadas.

## Subtarefas

| Item | Descrição | Depende de | Status |
|---|---|---|---|
| 382.1 | Inventário: matérias e aulas com Markdown × sem Markdown (lista para o usuário) | #381 | ⬜ |
| 382.2 | Plano e aprovação do usuário (ordem das matérias, aulas por matéria) | 382.1 | ⬜ |
| 382.3 | Fundamentos de UI/UX — aulas 04 a 19 (fontes + páginas) | 382.2 | ⬜ |
| 382.4 | BANCO-DE-DADOS — fontes + páginas | 382.2 | ⬜ |
| 382.5 | TESTES-DE-FRONTEND — fontes + páginas | 382.2 | ⬜ |
| 382.6 | INTRODUCAO-A-TECNOLOGIA-DA-INFORMACAO-E-COMUNICACAO — fontes + páginas | 382.2 | ⬜ |
| 382.7 | REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO — fontes + páginas | 382.2 | ⬜ |
| 382.8 | REFORCO_LINGUAGENS — fontes + páginas | 382.2 | ⬜ |
| 382.9 | INTRODUCAO_COMUNICACAO_ORAL_ESCRITA — fontes + páginas | 382.2 | ⬜ |
| 382.10 | FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO — fontes + páginas | 382.2 | ⬜ |
| 382.11 | Regravar os índices de atividades das matérias tocadas (card 🎯) | 382.3–382.10 | ⬜ |
| 382.12 | Matérias sem Markdown: avisar o usuário a lista de aulas aguardando (👀) | 382.1 | ⬜ |
| 382.13 | Documentação final (histórico de regras, `STATUS-ATIVIDADES.md` das matérias) | 382.11 | ⬜ |
| 382.14 | Verificação geral (`py_compile`, leitura dos HTML, conferência dos cards) | 382.13 | ⬜ |

**Próximo passo:** aguardar a conclusão da #381.

## Classificação do Jev (2026-10-26)

Feita com `node C:ontesules-ai\scripts\jev.mjs mensagem` sobre a descrição de cada subtarefa (o `classificar --gravar` não lê o formato deste quadro). `jev` = decidiu com confiança ≥ 0,80; `matriz` = abaixo disso, vale o nível mais restritivo e pede revisão humana.

| Item | Nível | Effort | Decisão | Confiança | Executor neste projeto |
|---|---|---|---|---|---|
| 382.1 | LEVE | low | jev | 0.85 | Haiku |
| 382.2 | PESADO | high | matriz | 0.27 | Sonnet (sem Opus neste projeto) |
| 382.3 | PESADO | high | matriz | 0.62 | Sonnet (sem Opus neste projeto) |
| 382.4 | PESADO | high | matriz | 0.95 | Sonnet (sem Opus neste projeto) |
| 382.5 | PESADO | high | matriz | 0.43 | Sonnet (sem Opus neste projeto) |
| 382.6 | LEVE | low | jev | 0.98 | Haiku |
| 382.7 | LEVE | low | jev | 0.94 | Haiku |
| 382.8 | LEVE | low | matriz | 0.79 | Haiku |
| 382.9 | LEVE | low | jev | 0.98 | Haiku |
| 382.10 | LEVE | low | jev | 0.98 | Haiku |
| 382.11 | PESADO | high | matriz | 0.62 | Sonnet (sem Opus neste projeto) |
| 382.12 | LEVE | low | matriz | 0.4 | Haiku |
| 382.13 | LEVE | low | jev | 0.97 | Haiku |
| 382.14 | PESADO | high | matriz | 0.25 | Sonnet (sem Opus neste projeto) |
