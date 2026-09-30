# Regra: a ementa do curso é a fonte da verdade do EMENTA-CHALKIE-AI.md

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** ~10 minutos

## Objetivo
Alterar no `CLAUDE.md` a regra "A REGRA OFICIAL VEM DO EMENTA-CHALKIE-AI.md" para que a **fonte
da verdade** de cada `EMENTA-CHALKIE-AI.md` de matéria seja a **ementa do curso**
(`EMENTA-PRINCIPAL-<CURSO>.md`), exceto em `QUALIFICACAO-PROFISSIONAL/`, que não tem ementa de curso.

## Nova hierarquia
1. `EMENTA-PRINCIPAL-<CURSO>.md` (ementa do curso): fonte da verdade.
2. `EMENTA-CHALKIE-AI.md` da matéria: deriva da ementa do curso; em divergência, a do curso vence
   e o usuário é avisado.
3. Aulas, slides, atividades, avaliações e demais materiais: seguem o `EMENTA-CHALKIE-AI.md`.

Exceção: em `QUALIFICACAO-PROFISSIONAL/` a ementa de cada matéria é a própria fonte, atualizada só
pelo professor (regra já existente).

## Escopo
- `CLAUDE.md`: reescrever a seção da regra oficial e ajustar a menção na regra EMENTA-PRINCIPAL.
- As 9 ementas principais geradas hoje trazem a frase "a ementa da matéria vence nos detalhes da
  UC". Ela passa a contradizer a regra e será trocada por "a ementa do curso é a fonte da
  verdade".
- Não altera nenhum `EMENTA-CHALKIE-AI.md` agora (conciliar cada um com a ementa do curso é
  tarefa separada, se o usuário quiser).

## Arquivos previstos
- `CLAUDE.md`
- `MATERIAIS/*/EMENTA-PRINCIPAL-*.md` gerados em 2026-09-25 (frase de hierarquia)

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Reescrever a regra oficial com a nova hierarquia e a exceção | `CLAUDE.md` | Grep por `fonte da verdade` | ✅ Concluído |
| 2 | Trocar a frase de hierarquia nas ementas principais geradas | `MATERIAIS/*/EMENTA-PRINCIPAL-*.md` | Grep sem "ementa da matéria vence" | ✅ Concluído |
| 3 | Commit local (sem push) | — | Hash do commit | ✅ Concluído |

## Resultado
Regra reescrita no `CLAUDE.md` ("A FONTE DA VERDADE É A EMENTA DO CURSO"), com hierarquia e
exceção de QUALIFICACAO-PROFISSIONAL. Frase de hierarquia trocada em 7 ementas principais; os
geradores da tarefa #10 também foram ajustados.
