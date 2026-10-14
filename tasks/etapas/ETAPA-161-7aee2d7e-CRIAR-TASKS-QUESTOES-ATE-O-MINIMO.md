## Etapa 161-7aee2d7e — Criar as tarefas "questões até o mínimo" das demais matérias

**Tarefa:** #34-7aee2d7e-1445-47ed · **Pedido em:** 2026-10-14 09:45 · **Executor:** — (livre para qualquer IA)
**Pedido:** "DEIXA AS DEMAIS MATERIAS EM TASKS PRA OUTRAS IA FAZER, DEIXE 1 TAREFA QUE VAI CRIAR
TODAS AS TASKS TAMBEM NO QUADRO DE TASKS"
**Objetivo:** abrir no quadro uma tarefa por matéria para ligar a tela e o PDF "questões 1 até o
mínimo" (feito na #33, etapa 160-d7ade403) nas atividades objetivas de cada uma.
**Próximo passo:** 161.1 — depois do aceite da #33, criar as tarefas por matéria.

### Como fazer cada tarefa de matéria (modelo)

1. Em cada página objetiva da matéria que carrega `assets/js/respostas-atividade-banco.js`, pôr
   `data-questoes-ate-minimo="sim"` no `<body>` (o código comum já está pronto na #33).
2. Conferir que a página usa `.aula-card.questao` em ordem (ITEM 01, 02...) e o botão
   `#btnExportarPDF`; página fora desse padrão → ajustar ou registrar ⛔ com motivo.
3. Usuário testa como professor e aluno e dá o aceite.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 161.1 | Criar etapa + linha no quadro: Testes de Front-End — demais aulas (4 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.2 | Criar etapa + linha: Banco de Dados (TII, 20 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.3 | Criar etapa + linha: Introdução às TIC (Assistente de Operações Logísticas, 15 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.4 | Criar etapa + linha: Análise de Dados Aplicada à Gestão (Gestão e Controle de Materiais, 9 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.5 | Criar etapa + linha: Fundamentos de Automação e Instrumentação (Operador de Produção Industrial, 15 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.6 | Criar etapa + linha: Fundamentos da Tecnologia e Programação (Rio do Sul Mais Tech, 14 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.7 | Criar etapa + linha: Introdução à Comunicação Oral e Escrita (Rio do Sul Mais Tech, 2 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.8 | Criar etapa + linha: Reforço de Linguagens (Rio do Sul Mais Tech, 10 páginas) | ⬜ Pendente | — | Linha no `STATUS.md` |
| 161.9 | Aceite do usuário | ⬜ Pendente | — | — |

Contagem de páginas: arquivos `.html` em `MATERIAIS/` que carregam
`respostas-atividade-banco.js` (2026-10-14); conferir de novo ao criar cada tarefa.
