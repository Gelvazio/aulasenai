# Ajustar EMENTA-CHALKIE-AI.md — Fundamentos da Tecnologia e Programação

**Criado em:** 2026-09-29 | **Conclusão:** pendente | **Tempo decorrido:** —
**Status geral:** ✅ Executado (2026-09-29); commit aguardando liberação do .gitignore

## Objetivo
Reescrever as partes genéricas ou vazias da `EMENTA-CHALKIE-AI.md` para que reflitam a **UC 2 da
ementa do curso** (fonte da verdade), mantendo o arquivo entre **14.800 e 14.950 caracteres**.

## Escopo
- Alterar somente: `MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/EMENTA-CHALKIE-AI.md`.
- Atualizar (regra do CLAUDE.md): `STATUS-EMENTAS.md` da matéria e `MATERIAIS/STATUS-EMENTAS-CURSOS.md`.
- Fora do escopo: ementa do curso, aulas, slides, atividades, `aulas-lecionadas.json`.
- Matérias semelhantes de outros cursos **não** são alteradas; ao final, avisar quais existem
  (`docs/materias-semelhantes-entre-cursos.md`).
- Permissão: curso RIO_DO_SUL_MAIS_TECH está em `VERIFICAR` ✅.

## Fontes
1. `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md` (UC 2, linhas 128–157).
2. `CONTEUDO/CONTEUDO-JA-PASSADO-CEPLAS-MANHA.md` (o que já foi lecionado).

## Pendências a corrigir (levantadas em 2026-09-29)
| # | Pendência | Seção | Ação prevista |
|---|-----------|-------|---------------|
| 1 | Conteúdos programáticos vazios | III | Escrever 8 módulos com os 11 conhecimentos da UC 2 |
| 2 | Sequência de aulas genérica (8 aulas, 10h) | VI | Trocar por cronograma real de 33h por módulo |
| 3 | Só 6 capacidades, sem indicadores | II | Levar a 10, com indicador mensurável, sobre a UC 2 |
| 4 | Exemplos de empreendedorismo | IX | Trocar por casos de tecnologia, segurança e Scratch |
| 5 | Carga de 36h e trilha de 8 módulos | XII | Corrigir para 33h e alinhar aos módulos novos |
| 6 | Integração entre UCs errada | VIII | Corrigir nomes conforme a ementa do curso |
| 7 | FAQ cortada | XIII | Completar a última resposta |
| 8 | Faltam BNCC e prompts para Chalkie AI | novas | Adicionar mapeamento BNCC e prompts por módulo |
| 9 | Público "8º-9º ano" | cabeçalho | Trocar para "alunos de 15 a 17 anos" |
| 10 | Checklist e status | XI e STATUS | Ajustar e atualizar |

## Decisões que preciso de você (antes de escrever)
1. **Horas:** o CEPLAS manhã tem 32h na agenda e a UC tem 33h. Registrar a diferença de 1h como
   "reserva/avaliação"?
2. **Aulas já dadas:** marcar no cronograma o que já foi passado (Segurança, História, Hardware e
   SO, Introdução à Programação, Planilhas 12h) ou manter a ementa neutra, sem datas de turma?
   *Sugestão: neutra (a ementa serve a qualquer turma); o controle fica em `CONTEUDO/`.*
3. **Planilhas:** a ementa do curso pede "planilhas simples". Manter como está na ementa (carga
   menor) e só registrar em `CONTEUDO/` que a turma fez 12h?

## Proposta de módulos (33h)
| Módulo | Tema | Horas |
|--------|------|-------|
| 1 | Tecnologia e dispositivos digitais; evolução dos computadores | 3h |
| 2 | Cidadania digital e segurança na internet | 3h |
| 3 | Hardware, software e sistemas operacionais | 4h |
| 4 | Arquivos, pastas, digitação e atalhos | 3h |
| 5 | Editor de texto, apresentações e planilhas simples | 6h |
| 6 | Navegadores, pesquisa e uso seguro da internet | 2h |
| 7 | Pensamento computacional, algoritmos e fluxogramas | 5h |
| 8 | Programação em blocos (Scratch) e projeto final | 7h |

## Passos
| # | Estado | Ação | Arquivo | Verificação |
|---|--------|------|---------|-------------|
| 1 | ✅ Concluído | Ler a ementa e levantar pendências | `EMENTA-CHALKIE-AI.md` | 14.843 caracteres, 11 pendências |
| 2 | ✅ Concluído | Confirmar as 3 decisões acima | este documento | Resposta do professor |
| 3 | ✅ Concluído | Reescrever III, VI, II e cabeçalho | `.../EMENTA-CHALKIE-AI.md` | Conteúdos batem com a UC 2 |
| 4 | ✅ Concluído | Reescrever IX, VIII, XII; completar XIII; ajustar XI | mesmo arquivo | Sem termos de empreendedorismo; 33h |
| 5 | ✅ Concluído | Adicionar mapeamento BNCC e prompts Chalkie; enxugar seções genéricas (VII) para caber | mesmo arquivo | Existem as seções |
| 6 | ✅ Concluído | Medir o tamanho e ajustar | mesmo arquivo | `len(texto)` entre 14.800 e 14.950 |
| 7 | ✅ Concluído | Atualizar STATUS | `.../STATUS-EMENTAS.md`, `MATERIAIS/STATUS-EMENTAS-CURSOS.md` (via `criar-status-ementas.py` e `criar-status-cursos.py`) | Tamanho e fase novos |
| 8 | ⛔ Bloqueado |  | Commit; liberar no `.gitignore` os `.md` alterados se preciso | — | `git diff --cached --name-only` |
| 9 | ⬜ Pendente | Avisar matérias semelhantes de outros cursos | — | Lista mostrada ao professor |

## Riscos
- Estourar 14.950 caracteres: mitigado cortando seções genéricas (VII, parte de X e XI).
- `.gitignore` bloqueia `*.md`: a ementa já é versionada, mas o `.gitignore` pode exigir `-f`.
- Divergência com o que a turma já viu (planilhas 12h): tratada na decisão 3.

## Resultado final
Ementa reescrita com 14.807 caracteres (decisões: 1h = avaliação final; ementa neutra; planilhas simples). `criar-status-ementas.py` falha (caminho antigo `aulas-senai`); STATUS da matéria atualizado à mão; `STATUS-EMENTAS-CURSOS.md` regenerado. Nenhum destes `.md` é versionado (`*.md` no `.gitignore`).
