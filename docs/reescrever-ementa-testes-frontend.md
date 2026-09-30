# Reescrever EMENTA-CHALKIE-AI.md — Testes de Front-End

**Criado em:** 2026-09-27 17:05 · **Concluído em:** 2026-09-27 17:30 · **Tempo decorrido:** ~25 min
**Arquivo:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES DE FRONTEND/EMENTA-CHALKIE-AI.md`
**Curso:** TECNICO-INFORMATICA-INTERNET (STATUS-PERMISSAO-EMENTA = VERIFICAR)

## Objetivo

Trocar a ementa genérica atual (modelo "Técnico em Informática — Internet", 45h, capacidades
genéricas) por uma ementa **específica da UC Testes de Front-End**, derivada da ementa do curso.

## Fontes (ordem de precedência)

1. **Fonte da verdade:** `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md` → seção
   "Testes de Front-End (40h)": Módulo Específico I, Função 1, objetivo geral, 7 conhecimentos,
   5 capacidades básicas, 2 socioemocionais, recursos. Tudo isso entra **literal** e marcado `[oficial]`.
2. `planoEnsino.pdf` (T TIIN 2026/1 M1, Rio do Sul, docente Gelvazio): 2 SAs — SA Bloco 01
   (plano e documentação de testes de e-commerce) e SA Bloco 02 (pipeline CI/CD e dashboard).
3. `AULAS-CHALKIE-AI/` (10 PDFs de slides) + `HORARIO.txt` (10 datas) → **10 aulas × 4h = 40h**.
4. `ATIVIDADES/ATIVIDADE-AULA-01..10.md`, `ESTRUTURACAO-PLANO-ENSINO/` (blocos e SAs),
   `EMENTA-TESTES-FRONT-END.md` (avaliação e referências) — detalhamento didático.
5. Modelo de estrutura: ementas conformes de `INTRODUCAO-TIC` e `ANALISE_DADOS_APLICADA_GESTAO`.

## Estrutura da nova ementa (12 seções, padrão das ementas conformes)

| Seção | Conteúdo |
|---|---|
| Cabeçalho | UC Testes de Front-End · Módulo Específico I · Técnico em Informática para Internet · **40h (10 aulas × 4h)** · Presencial · nota de fontes e marca `[oficial]` |
| I. Contexto | Justificativa, Função 1 [oficial], Objetivo geral [oficial] |
| II. Capacidades | 5 básicas [oficial] + 2 socioemocionais [oficial] + indicadores de desempenho (10+ indicadores mensuráveis ligados às capacidades) |
| III. Conhecimentos [oficial] | Os 7 blocos com subitens, literal |
| IV. Sequência de aulas (40h) | Tabela das 10 aulas (abaixo) + as 2 situações de aprendizagem do plano de ensino |
| V. Avaliação | Instrumentos (atividades por aula, SAs, avaliação prática e objetiva), pesos, rubrica em 4 níveis |
| VI. Mapeamento BNCC | Didático (competências gerais × aulas) |
| VII. Recursos e ambientes | Recursos [oficial] + ferramentas (Node.js, Vitest, Testing Library, Cypress/Playwright, GitHub Actions) + `REFERENCIA-TESTES-DE-SISTEMAS/` |
| VIII. Prompts para Chalkie AI | Prompts prontos por tipo (aula, atividade, questões, SA) |
| IX. Regras para IA | Ementa do curso vence; não inventar conteúdo fora dos 7 conhecimentos |
| X. Capacidades × Conhecimentos | Matriz |
| XI. Glossário | Caixa preta/branca, verificação × validação, suíte, caso de teste, mock, cobertura, E2E, TDD, CI |
| XII. Checklist e métricas | Checklist de implementação e metas |

## Sequência de aulas proposta (dos slides existentes)

| Aula | Tema (slides) | Conhecimentos da ementa do curso |
|---|---|---|
| 01 | Fundamentos de Testes de Software | 5 Verificação/Validação · 4 Tipos · 1 Autogestão |
| 02 | Planejamento, Verificação, Validação e Casos de Teste | 6 Planejamento client-side · 7.1–7.2 · 3 Caixa preta/branca |
| 03 | Testes Unitários com Vitest | 2 Automação (definição, frameworks, aplicação) · 3.2 |
| 04 | Testes de Integração com DOM (Testing Library) | 2.3 · 3.1 · 4.1 Funcionalidade |
| 05 | Integração Avançada e Mock de APIs | 2.3 · 4.3 Confiabilidade · 7.3 |
| 06 | Testes E2E com Cypress e Playwright | 2.2–2.3 · 3.1 · 4.2 Usabilidade |
| 07 | Métricas e Cobertura de Testes | 7.4 Monitoração e controle · 7.5 · 4.5 Manutenibilidade |
| 08 | TDD e Debugging no Front-End | 2.3 · 3.2 · 1.1 Responsabilidade |
| 09 | Qualidade, Performance, Acessibilidade e CI/CD | 4.2 · 4.4 Desempenho · 2.4 Interação com equipe |
| 10 | Projeto Integrador: Suíte de Testes + avaliação | 7 Processo completo · 6.3 Suíte · 2.4 |

## Passos

| # | Ação | Arquivo | Verificação | Estado |
|---|---|---|---|---|
| 1 | Escrever a nova `EMENTA-CHALKIE-AI.md` nas 12 seções acima | `TESTES DE FRONTEND/EMENTA-CHALKIE-AI.md` | leitura; seções `[oficial]` batem com a ementa do curso | ✅ Concluído |
| 2 | Ajustar o tamanho para **14.800–14.950 caracteres** | idem | `python -c "len(open(...).read())"` | ✅ Concluído |
| 3 | Conferir: nome da UC, 40h, 7 conhecimentos, 5+2 capacidades, sem a marca genérica "Reconhecer conceitos" | idem | `grep` | ✅ Concluído |
| 4 | Regenerar `STATUS-EMENTAS-CURSOS.md` (e STATUS-EMENTAS da matéria, se existir) | `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | matéria ✅ Conforme | ✅ Concluído |
| 5 | Commit local | — | `git log -1` | ✅ Concluído |

## Divergências encontradas (a ementa do curso vence)

- **Capacidades técnicas:** o plano de ensino e as SAs usam "Elaborar/Executar/Documentar plano de
  testes de interface para web", que na ementa do curso são da UC **Projeto de Front-End (90h)**.
  A UC Testes de Front-End tem só capacidades **básicas** e socioemocionais. A nova ementa usa as
  da ementa do curso; as do plano ficam citadas apenas como ligação com Projeto de Front-End.
- **Carga:** a ementa atual diz 45h; `EMENTA-TESTES-FRONT-END.md` soma blocos acima de 40h e tem
  quadro-resumo diferente dos slides. Vale **40h = 10 aulas × 4h** (ementa do curso + slides + horário).
- **Nota mínima:** a ementa do curso não define. Definida pelo usuário: **nota final ≥ 7,0** (
  contínua 60% + prática 25% + objetiva 15%). Confirme se é esse o critério.

## Fora do escopo

- Não altero slides, atividades, planos nem `EMENTA-TESTES-FRONT-END.md` (e sua cópia duplicada).
- Não renomeio a pasta `TESTES DE FRONTEND`.
- Matérias semelhantes em outros cursos (ex.: Testes de Front-End no TECNICO-DESENVOLVIMENTO-SISTEMAS,
  hoje fora de `MATERIAIS/`) não são atualizadas.

## Riscos

- Limite de 150 caracteres de margem exige compactação cuidadosa sem perder itens `[oficial]`.

## Resultado

- Nova ementa: 14.808 caracteres, 12 seções, itens `[oficial]` literais da ementa do curso.
- Nota mínima **7,0** (decisão do usuário), presença 75%; pesos 60/25/15.
- `STATUS-EMENTAS-CURSOS.md`: TESTES DE FRONTEND ✅ Conforme.
- Pendência registrada na ementa: `ATIVIDADES/ATIVIDADE-AULA-01..10.md` seguem outra sequência de blocos e precisam ser realinhadas aos slides.
