## Etapa 161-7aee2d7e — Criar as tarefas "questões até o mínimo" das demais matérias

**Tarefa:** #34-7aee2d7e-1445-47ed · **Pedido em:** 2026-10-14 09:45 · **Executor:** Claude Code (local · main)
**Pedido:** "DEIXA AS DEMAIS MATERIAS EM TASKS PRA OUTRAS IA FAZER, DEIXE 1 TAREFA QUE VAI CRIAR
TODAS AS TASKS TAMBEM NO QUADRO DE TASKS"
**Objetivo:** abrir no quadro uma tarefa por matéria para ligar a tela e o PDF "questões 1 até o
mínimo" (feito na #33, etapa 160-d7ade403) nas atividades objetivas de cada uma.
**Próximo passo:** 34.9 — usuário conferir as tarefas #36 a #43 no quadro e dar o aceite.

### Decisões

- 2026-10-14 09:53 — o usuário pediu "faça a task #34 e #35" com a #33 ainda aguardando
  aceite: as tarefas foram criadas já, e cada uma depende da #33 (só começa depois do aceite dela).

### Como fazer cada tarefa de matéria (modelo)

1. Em cada página objetiva da matéria que carrega `assets/js/respostas-atividade-banco.js`, pôr
   `data-questoes-ate-minimo="sim"` no `<body>` (o código comum já está pronto na #33).
2. Conferir que a página usa `.aula-card.questao` em ordem (ITEM 01, 02...) e o botão
   `#btnExportarPDF`; página fora desse padrão → ajustar ou registrar ⛔ com motivo.
3. Usuário testa como professor e aluno e dá o aceite.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 34.1 | Criar etapa + linha no quadro: Testes de Front-End — demais aulas (4 páginas) | ✅ Concluído | 2026-10-14 09:58 | #36 e etapa 163-6b8cbe04 no `STATUS.md` (4 páginas listadas) |
| 34.2 | Criar etapa + linha: Banco de Dados (TII, 20 páginas) | ✅ Concluído | 2026-10-14 09:58 | #37 e etapa 164-3086760c no `STATUS.md` (20 páginas listadas) |
| 34.3 | Criar etapa + linha: Introdução às TIC (Assistente de Operações Logísticas, 15 páginas) | ✅ Concluído | 2026-10-14 09:58 | #38 e etapa 165-27872376 no `STATUS.md` (15 páginas listadas) |
| 34.4 | Criar etapa + linha: Análise de Dados Aplicada à Gestão (Gestão e Controle de Materiais, 9 páginas) | ✅ Concluído | 2026-10-14 09:58 | #39 e etapa 166-22e38c34 no `STATUS.md` (9 páginas listadas) |
| 34.5 | Criar etapa + linha: Fundamentos de Automação e Instrumentação (Operador de Produção Industrial, 15 páginas) | ✅ Concluído | 2026-10-14 09:58 | #40 e etapa 167-c614c1e9 no `STATUS.md` (15 páginas listadas) |
| 34.6 | Criar etapa + linha: Fundamentos da Tecnologia e Programação (Rio do Sul Mais Tech, 14 páginas) | ✅ Concluído | 2026-10-14 09:58 | #41 e etapa 168-a04e0049 no `STATUS.md` (14 páginas listadas) |
| 34.7 | Criar etapa + linha: Introdução à Comunicação Oral e Escrita (Rio do Sul Mais Tech, 2 páginas) | ✅ Concluído | 2026-10-14 09:58 | #42 e etapa 169-b4cc900a no `STATUS.md` (2 páginas listadas) |
| 34.8 | Criar etapa + linha: Reforço de Linguagens (Rio do Sul Mais Tech, 10 páginas) | ✅ Concluído | 2026-10-14 09:58 | #43 e etapa 170-25be3d4d no `STATUS.md` (10 páginas listadas) |
| 34.9 | Aceite do usuário | 👀 Aguardando o usuário | — | — |

Contagem de páginas: arquivos `.html` em `MATERIAIS/` que carregam
`respostas-atividade-banco.js` (2026-10-14); conferir de novo ao criar cada tarefa.
