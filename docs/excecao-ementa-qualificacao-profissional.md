# Exceção de ementas: pasta QUALIFICACAO-PROFISSIONAL

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** < 5 minutos

## Objetivo
Registrar no `CLAUDE.md` do projeto que `MATERIAIS/QUALIFICACAO-PROFISSIONAL/` é exceção às
regras de ementa de curso:
- não tem `EMENTA-PRINCIPAL-<CURSO>.md`;
- cada matéria tem a própria ementa, atualizada **diretamente e somente pelo professor**;
- nenhum outro arquivo ou local é origem da ementa das matérias dessa pasta.

## Escopo
- Somente o `CLAUDE.md`, na seção "EMENTA-PRINCIPAL-<CURSO>.md em cada pasta de curso".
- Nenhum arquivo dentro de `QUALIFICACAO-PROFISSIONAL/` é alterado.

## Riscos e dependências
- As outras regras de ementa (tamanho, status, geração) passam a não valer para as ementas dessa
  pasta: a IA só lê, nunca escreve.

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Adicionar a exceção na seção da regra EMENTA-PRINCIPAL | `CLAUDE.md` | Grep por `QUALIFICACAO-PROFISSIONAL` | ✅ Concluído |
| 2 | Commit local (sem push) | — | Hash do commit | ✅ Concluído |

## Resultado
Exceção adicionada ao `CLAUDE.md` como subseção "EXCEÇÃO — MATERIAIS/QUALIFICACAO-PROFISSIONAL/"
da regra EMENTA-PRINCIPAL.
