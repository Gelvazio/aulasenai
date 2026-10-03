# Arquivo único de dados da matéria: `materia.json` (opção B)

**Objetivo:** substituir `ATIVIDADES/atividades.json` e `APOSTILA/apostila.json` por um único
`<MATERIA>/materia.json` por matéria, lido por todos os geradores, sem dados repetidos.

**Tech Stack:** Python 3.14 (geradores em `assets/`), JSON.

**Criado em:** 2026-10-03 15:20
**Concluído em:** 2026-10-03 15:50
**Tempo decorrido:** 30:00

**Regra:** `CLAUDE.md` → REGRAS APOSTILAS → "`materia.json`: ARQUIVO ÚNICO de dados de cada matéria".

---

## Levantamento (2026-10-03)

| Matéria | Curso (permissão) | Hoje | Conteúdo atual |
|---|---|---|---|
| INTRODUCAO-TIC | ASSISTENTE-DE-OPERACOES-LOGISTICAS (VERIFICAR) | `atividades.json` + `apostila.json` | Completo (ementa inteira) |
| ANALISE_DADOS_APLICADA_GESTAO | GESTAO_E_CONTROLE_MATERIAIS (VERIFICAR) | `atividades.json` | uc, curso, docente, 2 capacidades |
| FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO | OPERADOR_PRODUCAO_INDUSTRIAL (VERIFICAR) | `atividades.json` | uc, curso, docente, 4 capacidades |
| FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO | RIO_DO_SUL_MAIS_TECH (VERIFICAR) | `atividades.json` | uc, curso, docente, 7 capacidades |

**Quem lê hoje:** `assets/gerador-atividades/gerar_atividades.py`,
`assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`,
`assets/gerador-avaliacao-media-final/gerar_avaliacao_media_final.py`,
`assets/gerador-apostilas/gerar_apostila.py` (+ `markdown_apostila.py`),
`assets/gerador-capacidades/capacidades.py` (mensagens) e `scripts/extrair-atividades-docx.py`
(cria o arquivo quando não existe).

## Riscos e decisões

- ⚠️ As páginas HTML já publicadas **não mudam** (são estáticas); só mudam quando forem geradas de
  novo. Nenhuma página de atividade será regenerada nesta tarefa.
- ⚠️ ITIC: o texto das capacidades passou a ser o da ementa do curso; ao regenerar atividades da
  ITIC no futuro, o quadro de capacidades mostrará o texto novo.
- ✅ Sem banco de dados, sem segurança/RLS. Sem testes automatizados (regra global); verificação
  por `py_compile` e leitura dos dados de cada matéria, sem gravar páginas.
- ⛔ Fora do escopo: completar socioemocionais e conhecimentos das outras 3 matérias a partir das
  ementas (passo 6, opcional — só se o usuário pedir agora; senão fica para quando cada matéria
  for trabalhada).

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|---|---|---|---|---|---|
| 1 | Regra no `CLAUDE.md` (REGRAS APOSTILAS) | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:20 | 01:00 |
| 2 | Módulo `assets/gerador-materia/materia.py` (localizar e ler o `materia.json`) | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:28 | 08:00 |
| 3 | ITIC: juntar `atividades.json` + `apostila.json` em `INTRODUCAO-TIC/materia.json` e remover os dois | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:32 | 04:00 |
| 4 | Outras 3 matérias: mover o conteúdo do `atividades.json` para `<MATERIA>/materia.json` e remover o antigo | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:32 | 00:30 |
| 5 | Geradores e script passam a ler o `materia.json` | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:42 | 10:00 |
| 6 | (Opcional) completar socioemocionais e conhecimentos das outras 3 matérias pela ementa | ⛔ Fora do escopo | 2026-10-03 15:20 | — | — |
| 7 | Atualizar as demais menções a `atividades.json`/`apostila.json` no `CLAUDE.md` (projeto e global) | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:48 | 03:00 |
| 8 | Conferência (`py_compile`, leitura dos 4 `materia.json`, Markdown e HTML da apostila da ITIC) | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:45 | 03:00 |
| 9 | Commit local (sem push), junto com o gerador de apostilas, que depende do `materia.json` | ✅ Concluído | 2026-10-03 15:20 | 2026-10-03 15:50 | 02:00 |

---

### Passo 2: módulo único de leitura

**Arquivo:** criar `assets/gerador-materia/materia.py`

**Ação:** `ARQUIVO_MATERIA = "materia.json"`; `localizar_materia(pasta)` sobe de `pasta` até a
raiz do projeto procurando `materia.json`; `ler_materia(pasta, campos_obrigatorios)` lê o JSON e
para com erro claro se faltar o arquivo ou algum campo (`uc`, `uc_curta`, `curso`, `docente`,
`capacidades`). Funções curtas, documentadas, nomes em português.

**Verificação:** `C:\Python314\python.exe -m py_compile assets\gerador-materia\materia.py`

### Passo 3: ITIC

**Arquivos:** criar `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/materia.json`;
remover `INTRODUCAO-TIC/ATIVIDADES/atividades.json` (versionado → `git rm`) e
`INTRODUCAO-TIC/APOSTILA/apostila.json` (ainda não versionado).

**Ação:** juntar os dois: identificação + `capacidades` (básicas) + socioemocionais +
conhecimentos + `horas_por_aula` + `aulas` (hoje `capitulos` do `apostila.json`) + demais seções
da ementa. Nada repetido.

**Verificação:** ler o JSON e conferir as chaves e as 10 aulas × 4 h = 40 h.

### Passo 4: outras 3 matérias

**Arquivos:** criar `materia.json` na raiz de `ANALISE_DADOS_APLICADA_GESTAO`,
`FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO` e `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`, com o mesmo
conteúdo atual; `git rm` do `ATIVIDADES/atividades.json` de cada uma.

**Verificação:** conteúdo idêntico ao arquivo antigo (comparação por script).

### Passo 5: geradores

**Arquivos:** `assets/gerador-atividades/gerar_atividades.py`,
`assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`,
`assets/gerador-avaliacao-media-final/gerar_avaliacao_media_final.py`,
`assets/gerador-apostilas/gerar_apostila.py`, `assets/gerador-apostilas/markdown_apostila.py`,
`assets/gerador-capacidades/capacidades.py` (textos/mensagens), `scripts/extrair-atividades-docx.py`
(passa a criar `materia.json` na raiz da matéria quando não existir).

**Ação:** trocar a leitura de `atividades.json`/`apostila.json` pelo `materia.ler_materia(...)`;
o gerador de apostilas usa `aulas` e `horas_por_aula`.

**Verificação:** `py_compile` de todos; chamar só a função de leitura de dados de cada gerador
para as 4 matérias (sem gravar páginas).

### Passo 7: referências

**Arquivos:** `CLAUDE.md` (mapa de `assets/`, gerador de atividades, média final, capacidades,
seções da apostila) e `C:\Users\gelva\.claude\CLAUDE.md` (seção APOSTILAS).

### Passo 8: conferência final

`py_compile`; leitura dos 4 `materia.json`; `gerar_apostila.py <ITIC> --markdown` (preservado) e
HTML da apostila sem erro; `git status` mostra os 4 `atividades.json` removidos e os 4
`materia.json` novos.

### Passo 9: commit

`git add` só dos arquivos da tarefa (conferir `git diff --cached --name-only` contra "O QUE NUNCA É
PUBLICADO"); inclui o gerador de apostilas e a apostila piloto da ITIC (capítulo 01), que dependem
do `materia.json`. Sem push.

---

## Resultado

- 4 `materia.json` criados; 4 `atividades.json` e o `apostila.json` removidos (nenhum dado perdido:
  os dados repetidos da ITIC eram iguais e todos os campos foram migrados — conferido por script).
- Os 4 geradores, o `capacidades.py` e o `scripts/extrair-atividades-docx.py` leem o `materia.json`
  por `assets/gerador-materia/materia.py`; conferido nas 4 matérias sem gravar páginas.
- Apostila da ITIC: Markdown completo preservado e HTML gerado sem erro.
- Pendência (fora do escopo, decisão do usuário): completar socioemocionais e conhecimentos das
  outras 3 matérias quando cada uma for trabalhada.
