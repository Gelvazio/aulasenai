# STATUS — Aulas SENAI

**Objetivo:** registrar, item por item, cada tarefa do projeto para que qualquer pessoa ou IA
retome o trabalho de onde parou.
**Partes interessadas:** Professor Gelvazio (decide, aprova e usa) · alunos (usam os materiais)
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · [Tarefas](TASKS.md)
**Próximo passo:** Etapa 2, item 2.10 — Testes de Frontend: ler as ementas e montar o materia.json.

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## Escopo
- **Entra:** todas as tarefas pedidas pelo usuário neste repositório, a partir de 2026-10-03.
- **Não entra:** histórico anterior (está no Git, em `TASKS.md` e em `docs/`).
- **Critério de pronto:** item verificado, commit local feito e aceite do usuário.
- **Premissas e restrições:** regras do `CLAUDE.md` (sem navegador, sem push, um commit por tarefa).

## Etapa 1 — Atualizar `ANALISE-GERACAO-AULAS.md` do Técnico em Informática para Internet (pedida em 2026-10-03)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 1.1 | Levantar situação real das 20 pastas (ementa, `materia.json`, aulas, atividades, permissão) | ✅ Concluído | 2026-10-03 18:30 | Listagem das pastas + `STATUS-EMENTAS-CURSOS.md` |
| 1.2 | Reescrever `MATERIAIS/TECNICO-INFORMATICA-INTERNET/ANALISE-GERACAO-AULAS.md` conforme a ementa do curso | ✅ Concluído | 2026-10-03 18:30 | CH por UC conferida com a seção 5 da ementa (soma 1000 h) |
| 1.3 | Commit local | ✅ Concluído | 2026-10-03 18:31 | `git commit` |
| 1.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 2 — Apostila da ITIC (capítulos 02 a 10) e apostila de Testes de Frontend (pedida em 2026-10-03)

Plano: [docs/gerador-apostilas.md](docs/gerador-apostilas.md) · Regras: `CLAUDE.md` → REGRAS APOSTILAS ·
Status por capítulo: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/APOSTILA/STATUS-APOSTILA.md`
e `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/APOSTILA/STATUS-APOSTILA.md`.
Cada capítulo: fonte `CAPITULO-NN.md` → `--markdown` (conferência 100%) → HTML → status → commit.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 2.1 | ITIC — capítulo 02 (Hardware, Periféricos e SO) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `6919907` |
| 2.2 | ITIC — capítulo 03 (Navegação na Web e Pesquisa) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `c5abef5` |
| 2.3 | ITIC — capítulo 04 (Comunicação Digital e Nuvem) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `31572b0` |
| 2.4 | ITIC — capítulo 05 (Segurança da Informação) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `8845c55` |
| 2.5 | ITIC — capítulo 06 (Editor de Textos) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `6ed60df` |
| 2.6 | ITIC — capítulo 07 (Textos Técnicos) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `ffcd0f7` |
| 2.7 | ITIC — capítulo 08 (Planilhas: Organização e Fórmulas) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `0b55ea4` |
| 2.8 | ITIC — capítulo 09 (Planilhas: Análise Visual e Gráficos) | ✅ Concluído | 2026-10-03 18:54 | Conferência 201/201 · sem avisos · HTML gerado |
| 2.9 | ITIC — capítulo 10 (Editor de Apresentações e TIC + Avaliação) | ✅ Concluído | 2026-10-03 18:56 | Conferência 201/201 · sem avisos · 10/10 capítulos no plano |
| 2.10 | Testes de Frontend — ler a ementa da matéria e a UC na ementa do curso; `materia.json` completo e literal | 🔄 Em progresso | — | — |
| 2.11 | Testes de Frontend — `INTRODUCAO.md`, Markdown completo e conferência 100% | ⬜ Pendente | — | — |
| 2.12 | Testes de Frontend — capítulos 01 a 10 (um por vez, com commit e status a cada um) | ⬜ Pendente | — | — |
| 2.13 | Testes de Frontend — item "Apostila" no menu, status final | ⬜ Pendente | — | — |
| 2.14 | Aceite do usuário (as duas apostilas) | ⬜ Pendente | — | — |

## Riscos
| Risco | Chance | Impacto | Plano B | Situação |
|-------|--------|---------|---------|----------|

## Bloqueios
| Data | Item | Motivo | O que destrava | Resolvido em |
|------|------|--------|----------------|--------------|

## Registro de decisões
| Data | Decisão | Quem | Por quê |
|------|---------|------|---------|
| 2026-10-03 | Criar este `STATUS.md` na raiz | Claude (regra global) | Regra "STATUS.md em toda tarefa" |

## Pendências (ficou para depois)
| Item | Motivo | Quando retomar |
|------|--------|----------------|
| Destino da pasta `Testes de Sistemas-EXISTENTES` (não é UC do curso) | Decisão do usuário | Quando o usuário decidir |
| Renomear `BANCO_DE_DADOS` e `TESTES-DE-FRONTEND` para o padrão | Só a pedido do usuário | Quando o usuário pedir |

## Lições aprendidas
| Data | O que aconteceu | Lição / nova regra |
|------|-----------------|--------------------|
| 2026-10-03 | A análise de 2026-09-08 dizia ITIC presencial e Banco de Dados "completo" | Conferir sempre a ementa do curso e as pastas reais antes de afirmar situação |
