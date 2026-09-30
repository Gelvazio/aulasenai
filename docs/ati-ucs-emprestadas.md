# Assistente Técnico em TI: detalhar as 2 UCs pendentes com outras ementas

- **Criado em:** 2026-09-25
- **Concluído em:** 2026-09-25
- **Tempo decorrido:** ~15 minutos

## Objetivo
Pesquisar nos arquivos Markdown do projeto as 2 UCs sem detalhamento do curso Assistente Técnico
em TI e, com a escolha do usuário, completar a ementa do curso e os `EMENTA-CHALKIE-AI.md`.

## Decisão do usuário

| UC | CH no curso | Fonte escolhida | CH na fonte |
|----|-------------|-----------------|-------------|
| Montagem e Manutenção de Microcomputadores e Redes Locais | 120h | Assistente em Processos de Gestão e Suporte de TI | 80h |
| Programação de Aplicativos | 100h | Técnico em Desenvolvimento de Sistemas | 100h |

## Passos

| # | Ação | Arquivo | Status |
|---|------|---------|--------|
| 1 | Pesquisar as UCs nos `.md` | `MATERIAIS/**/*.md` | ✅ Concluído |
| 2 | Inserir as 2 UCs na seção 10, com aviso de origem e CH do curso; seção 10.1, 11 e 12 atualizadas | `EMENTA-PRINCIPAL-ASSISTENTE-TECNICO-TECNOLOGIA-INFORMACAO-860HORAS.md` | ✅ Concluído |
| 3 | Refazer os 2 `EMENTA-CHALKIE-AI.md` | pastas das 2 UCs | ✅ Concluído |
| 4 | Commit local | — | ✅ Concluído |

## Resultado
As 2 UCs estão detalhadas com aviso de "detalhamento emprestado". Não restam UCs com detalhamento
pendente nas ementas de matéria. O `.docx` do curso não foi alterado (pesquisa só em Markdown).
