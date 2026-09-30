# Realinhar atividades de Testes de Front-End aos slides

**Criado em:** 2026-09-27 17:40 · **Concluído em:** 2026-09-27 18:15 · **Tempo decorrido:** ~35 min
**Pasta:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES DE FRONTEND/ATIVIDADES/`
**Autorização:** pedido explícito do usuário no chat ("SIM, PODE REALINHAR AS ATIVIDADES AOS SLIDES").

## Objetivo

Reescrever `ATIVIDADE-AULA-01..10.md`, que seguiam uma sequência antiga de blocos (ex.: aula 02 =
"Configuração de ambiente"), para que cada atividade corresponda ao PDF de slides da mesma aula
em `AULAS-CHALKIE-AI/` e à Seção IV do `EMENTA-CHALKIE-AI.md` (a ementa vence).

## Fontes

- Slides das 10 aulas (práticas, desafios e missões extraídos de cada PDF).
- `EMENTA-CHALKIE-AI.md`: capacidades C1–C5, S1–S2, conhecimentos 1–7, entregas por aula, avaliação (nota mínima 7,0).
- Atividades antigas: trechos reaproveitáveis (setup do Vitest, troubleshooting) — o Git guarda as versões antigas.

## Mapeamento

| Aula | Slides | Práticas da atividade |
|---|---|---|
| 01 | Fundamentos de Testes | Mapa erro/defeito/falha · classificar 10 cenários na pirâmide · pirâmide de 2 apps · missão Spotify Web |
| 02 | Planejamento, V&V e Casos | V×V · plano de testes (SA 1) · 3 casos de login + 7 de carrinho/checkout · refinamento BDD |
| 03 | Vitest | Setup · 5 funções utilitárias · mock de API de autenticação |
| 04 | Testing Library | FollowButton com estados · formulário de cadastro · ordem do fluxo |
| 05 | Integração avançada e MSW | Login com MSW + token · erro 500 e latência · carrinho no localStorage |
| 06 | E2E Cypress/Playwright | Login sucesso/falha · checkout completo · caça ao flaky |
| 07 | Métricas e cobertura | Mapear gaps (60%) · cupom expirado e valor mínimo → 85% · thresholds |
| 08 | TDD e debugging | Validador de CPF em 4 ciclos · filtro de produtos · breakpoint e watch |
| 09 | Qualidade, A11y, CI/CD | `ci.yml` com bloqueio de merge · axe-core + Lighthouse · badges (SA 2) |
| 10 | Projeto integrador | Suíte em duplas (= avaliação prática) · avaliação objetiva · code review |

## Passos

| # | Ação | Verificação | Estado |
|---|---|---|---|
| 1 | Reescrever as 10 atividades no mesmo modelo (cabeçalho com slides, capacidades, conhecimentos, tempos; práticas; entrega; rubrica 4 níveis) | título de cada `.md` = título do slide | ✅ Concluído |
| 2 | Ajustar a coluna "Entrega" da ementa (aulas 4 e 6) e marcar o item do checklist, mantendo 14.800–14.950 caracteres | tamanho medido | ✅ Concluído |
| 3 | Regenerar índice de atividades e `STATUS-EMENTAS-CURSOS.md` | scripts sem erro | ✅ Concluído |
| 4 | Commit local | `git log -1` | ✅ Concluído |

## Riscos

- Os slides citam um "repositório de exercícios do SENAI" que não está na pasta: as atividades
  trazem o código-base necessário no próprio `.md`.
- Sem testes automatizados novos no projeto (regra do CLAUDE.md): o código de teste aparece só
  como conteúdo didático das atividades.

## Resultado

- 10 atividades reescritas, cada uma com o título do slide, tempos que somam 4h, capacidades, conhecimentos, práticas dos slides e rubrica em 4 níveis.
- Ementa: entregas das aulas 4 e 6 ajustadas e checklist marcado; 14.810 caracteres (✅ Conforme).
- Aula 10: projeto integrador = avaliação prática (cobertura mínima 70%, meta 80% dos slides); nota mínima 7,0.
- Pendência: o índice `ATIVIDADES/index.html` só lista atividades em HTML, então mostra "0 arquivos"; converter os `.md` em HTML é outra tarefa.
