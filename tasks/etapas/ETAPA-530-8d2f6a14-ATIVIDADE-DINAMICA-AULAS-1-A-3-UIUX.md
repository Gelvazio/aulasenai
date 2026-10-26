# ETAPA 530 — Atividade Dinâmica nas aulas 1 a 3 de Fundamentos de UI / UX (piloto)

- **TASK:** #381 (pedida em 2026-10-26)
- **Nível/Modelo:** de cada subtarefa = **a classificar pelo Jev** (regra C52: nenhuma IA escolhe).
  Neste projeto nunca Opus (`PESADO` fica com Sonnet).
- **Tipo:** tarefa **grande** (banco + gerador + várias partes). Plano aprovado pelo usuário em
  2026-10-26 (plano: `C:\Users\gelva\.claude\plans\gleaming-sleeping-perlis.md`).

## Pedido

"Crie mais 1 etapa nos geradores de atividades de nome ATIVIDADE DINAMICA: uma atividade do tipo
dinâmica na sala de aula." Abrir 1 tarefa para as **3 primeiras aulas** de
`MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX`, com o máximo de subtarefas; depois a
tarefa #382 aplica em todas as matérias.

## Objetivo

Cada aula ganha uma etapa extra, a **Atividade Dinâmica** (em sala), com roteiro do professor, ficha do
aluno/grupo, tempo e materiais, card na aula e **nota lançada pelo professor**.

## Escopo

**Entra:** formatos individual, duplas, grupos (3–5) e turma toda (o professor escolhe na hora); estilos
jogo/competição, role-play e mão na massa; nota do professor por aluno ou grupo, que entra na média;
contexto "Você como aluno consultor" (sem empresa fictícia).
**Não entra:** estudo de caso como estilo; aplicar nas demais matérias/aulas (é a #382); conteúdo de aula
(vem do Markdown do usuário; a IA não gera).

## Riscos

Mexer em `notas_media_final` pode alterar notas existentes → só acrescentar ramo e comparar antes/depois.
SQL de produção: só o Claude Code local.

## Decisões

- 2026-10-26 — usuário respondeu o perfil (4 formatos; jogo, role-play, mão na massa; nota do professor;
  roteiro + ficha + tempo/materiais + card).

## Subtarefas

| Item | Descrição | Depende de | Status |
|---|---|---|---|
| 381.1 | Modelo da fonte `ATIVIDADE-DINAMICA-AULA-NN.md` (campos, critérios que somam 10) em `docs/regras/atividades.md` | — | 🔄 |
| 381.2 | Ler os Markdown das aulas 01, 02 e 03 de `CONTEUDO/` e anotar tema e capacidades de cada uma | — | ⬜ |
| 381.3 | Fonte da dinâmica da Aula 01 (`CONTEUDO/ATIVIDADE-DINAMICA-AULA-01.md`) | 381.1, 381.2 | ⬜ |
| 381.4 | Fonte da dinâmica da Aula 02 | 381.1, 381.2 | ⬜ |
| 381.5 | Fonte da dinâmica da Aula 03 | 381.1, 381.2 | ⬜ |
| 381.6 | Gerador `assets/gerador-atividade-dinamica/` (leitura da fonte, ficha, roteiro só professor, tempo/materiais) | 381.1 | ⬜ |
| 381.7 | Template HTML e CSS da página da dinâmica (tokens `:root`, sem estilo inline) | 381.6 | ⬜ |
| 381.8 | Card/ícone 🎯 da dinâmica no `gerar_indices.py` | 381.6 | ⬜ |
| 381.9 | SQL `nota_dinamica` (tabela, RLS, JWT, idempotente) | 381.1 | ⬜ |
| 381.10 | Aplicar o SQL no Supabase e conferir as políticas (só Claude Code local) | 381.9 | ⬜ |
| 381.11 | Repositório JS de notas da dinâmica (ler/gravar por aluno ou grupo) | 381.10 | ⬜ |
| 381.12 | Tela do professor: lista da turma, formato, grupos e lançar nota | 381.11, 381.7 | ⬜ |
| 381.13 | Visão do aluno: ver a própria nota depois de lançada | 381.11, 381.7 | ⬜ |
| 381.14 | Entrada da nota da dinâmica em `notas_media_final` e no card "Notas e média" | 381.10 | ⬜ |
| 381.15 | Gerar as 3 páginas HTML (aulas 01–03) e regravar os índices | 381.3–381.8 | ⬜ |
| 381.16 | Documentação: `docs/database.md` + relatório HTML + `.claude/rules/atividades-banco.md` + histórico | 381.10 | ⬜ |
| 381.17 | Verificação: `py_compile`, `node --check`, leitura dos HTML, consulta das políticas; avisar o usuário para testar na tela | 381.15, 381.16 | ⬜ |

**Próximo passo:** 381.1 (modelo da fonte e docs).
