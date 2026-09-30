# Renomear as EMENTA-PRINCIPAL das pastas de Assistente em maiúsculas

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** < 5 minutos

## Objetivo
As pastas passaram para maiúsculas no disco; os arquivos foram renomeados para o nome exato da
pasta (regra `EMENTA-PRINCIPAL-<CURSO>.md` do `CLAUDE.md`), a pedido do usuário.

| De | Para |
|----|------|
| `EMENTA-PRINCIPAL-Assistente-Processos-Gestao-Suporte-TI-860-HORAS.md` | `EMENTA-PRINCIPAL-ASSISTENTE-PROCESSOS-GESTAO-SUPORTE-TI-860-HORAS.md` |
| `EMENTA-PRINCIPAL-Assistente-Tecnico-Tecnologia-Informacao-860horas.md` | `EMENTA-PRINCIPAL-ASSISTENTE-TECNICO-TECNOLOGIA-INFORMACAO-860HORAS.md` |

## Passos

| # | Ação | Verificação | Status |
|---|------|-------------|--------|
| 1 | `git mv` em duas etapas (troca só de maiúsculas no Windows) | Arquivos novos no disco | ✅ Concluído |
| 2 | Commit local (sem push) | Hash do commit | ✅ Concluído |

## Observação
O Git ainda registra as duas **pastas** com o nome antigo (misto), porque a troca foi feita fora
do Git e o repositório ignora diferença de maiúsculas (`core.ignorecase=true`).
