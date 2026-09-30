# Regra: carga horária obrigatória no EMENTA-CHALKIE-AI.md

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** < 10 minutos

## Objetivo
Incluir no `CLAUDE.md` do projeto, na regra "EMENTA-CHALKIE-AI.md obrigatório", a exigência de
que toda ementa informe a **carga horária** da matéria.

## Escopo
- Somente o `CLAUDE.md` (fonte única de regras). As ementas existentes não serão alteradas nesta
  tarefa.

## Arquivos previstos
- `CLAUDE.md`

## Riscos e dependências
- Ementas que ainda não têm a carga horária passam a ficar fora do padrão.
- Nenhuma dependência.

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Adicionar o item **CARGA HORÁRIA** ao "Checklist de Conteúdo" (logo após NOME DA DISCIPLINA) | `CLAUDE.md` | Grep por `CARGA HORÁRIA` | ✅ Concluído |
| 2 | Adicionar a carga horária ao "Checklist ao criar EMENTA-CHALKIE-AI.md" | `CLAUDE.md` | Grep por `carga horária` | ✅ Concluído |
| 3 | Commit local (sem push) | — | Hash do commit | ✅ Concluído |

## Resultado
Carga horária adicionada em 3 pontos da regra no `CLAUDE.md`: Checklist de Conteúdo,
"O que deve estar documentado" e "Checklist ao criar EMENTA-CHALKIE-AI.md".
Regras novas são sempre registradas no `CLAUDE.md` do projeto.
