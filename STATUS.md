# STATUS — Aulas SENAI

**Objetivo:** registrar, item por item, cada tarefa do projeto para que qualquer pessoa ou IA
retome o trabalho de onde parou.
**Partes interessadas:** Professor Gelvazio (decide, aprova e usa) · alunos (usam os materiais)
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · [Tarefas](TASKS.md)
**Próximo passo:** aguardar o próximo pedido do usuário (Técnico em Informática para Internet).

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
