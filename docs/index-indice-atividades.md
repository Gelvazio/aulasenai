# Índice de Atividades em 3 níveis (raiz → curso → matéria)

**Objetivo:** Navegação por atividades em três níveis:

1. `index.html` (raiz) — um card por **curso** (nome do curso) → abre `MATERIAIS/<CURSO>/index.html`.
2. `MATERIAIS/<CURSO>/index.html` — um card por **matéria** do curso → abre o índice de
   atividades da matéria.
3. `MATERIAIS/<CURSO>/<MATERIA>/ATIVIDADES/index.html` — índice das atividades da matéria.

**Tech Stack:** Python 3 (gerador) + HTML5 + CSS reutilizado de `assets/css/indice-atividades.css`

**Criado em:** 2026-09-27
**Revisado em:** 2026-09-27 (escopo ampliado a pedido do usuário: 3 níveis)
**Concluído em:** 2026-09-27
**Tempo decorrido:** ~30 min

---

## Escopo

- ✅ Gerador reutilizável **`assets/gerador-indices/gerar_indices.py`** (são 16 cursos e ~300
  matérias; fazer à mão é inviável). Rodar de novo sempre que surgir curso, matéria ou atividade:
  `C:\Python314\python.exe assets\gerador-indices\gerar_indices.py`
- ✅ **Cursos:** toda pasta de `MATERIAIS/` exceto `MATERIAS-GERAIS/`.
- ✅ **Matérias:** subpastas do curso, exceto auxiliares (`docs`, `scripts`, `.claude`,
  `graphify-out`).
- ✅ **Nome exibido:** nome da pasta legível (`_`/`-` viram espaço).
- ✅ **Atividades de uma matéria:** arquivos `.html`, `.pdf`, `.docx` no primeiro nível de
  qualquer pasta `ATIVIDADES/` dentro da matéria (ex.: também
  `AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/`), ignorando `index.html`, `README.md`, `CLAUDE.md`,
  `GABARITO*` e temporários `~$*`.
- ✅ **Cards:** curso mostra nº de matérias e nº de matérias com atividades; matéria mostra nº de
  atividades ou "Sem atividades" (botão desativado visualmente, mas o índice existe).
- ✅ **Índice da matéria já existente e feito à mão/por outro gerador NÃO é sobrescrito**
  (`INTRODUCAO-TIC/ATIVIDADES/index.html` — gerado por `gerar_atividades.py` — e
  `ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/index.html`). Os índices criados por este gerador
  levam `<meta name="gerador" content="gerador-indices">` e só esses são regravados.
- ✅ Matéria sem pasta `ATIVIDADES/`: a pasta é criada só com o `index.html`.
- ✅ Regra de `assets/`: sem `<style>`, `<script>` ou `style=""`; reutiliza
  `assets/css/indice-atividades.css` (`.container`, `.resumo`, `.grade`, `.aula`, `.btn`,
  `.btn.off`). Nenhum CSS novo.
- ✅ Registrar o gerador na regra de `assets/` do `CLAUDE.md`.

## Riscos

- Saem do `index.html` raiz os cards de ementa, estatísticas, FAQ e botão de tema.
- Cria ~300 arquivos `index.html` (e pastas `ATIVIDADES/` vazias onde não existem).
- O índice feito à mão de Análise de Dados não lista a atividade prática de Excel
  (`AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/`); por isso ele é preservado e a prática aparece
  apenas se o usuário pedir para regenerar esse índice.
- `STATUS-PERMISSAO-EMENTA`: os índices são só navegação (não leem nem alteram ementas), então
  são gerados para todos os cursos.
- `QUALIFICACAO-PROFISSIONAL/`: só recebe arquivos de índice; ementas não são tocadas.

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar `assets/gerador-indices/gerar_indices.py` | ✅ Concluído |
| 2 | Rodar o gerador (raiz + cursos + matérias) | ✅ Concluído |
| 3 | Verificar links, índices preservados e ausência de `<style>/<script>` | ✅ Concluído |
| 4 | Registrar o gerador no `CLAUDE.md` | ✅ Concluído |
| 5 | Commit local (sem push) | ✅ Concluído |

---

### Passo 1: Gerador

**Arquivo:** Criar `C:\fontes\aulas-senai\assets\gerador-indices\gerar_indices.py`

**Ação:** funções curtas (≤ 45 linhas, docstring, nomes em português): listar cursos, listar
matérias, listar atividades, montar card, montar página, gravar índice (respeitando o marcador).

### Passo 2: Execução

`C:\Python314\python.exe assets\gerador-indices\gerar_indices.py` → imprime quantos índices foram
criados, regravados e preservados.

### Passo 3: Verificação

- Todo `href` dos índices gerados aponta para arquivo existente (checagem por script).
- `INTRODUCAO-TIC/ATIVIDADES/index.html` e `ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/index.html`
  sem alteração (`git diff --stat`).
- Nenhum `<style`, `<script` ou `style="` nos arquivos gerados.

### Passo 4: CLAUDE.md

Adicionar `gerador-indices/` ao bloco de `assets/` da regra "CSS E JS GENÉRICOS EM `assets/`".

### Passo 5: Commit

`git add` do gerador, `index.html` raiz, índices gerados, `CLAUDE.md` e este plano;
`git commit` local. Sem push.

---

## Resultado (2026-09-27)

- Gerador executado com `--forcar` na pasta `ATIVIDADES/` de Análise de Dados (pedido do usuário):
  298 índices criados, 2 regravados (raiz e Análise de Dados), 1 preservado (Introdução à TIC).
- Verificação: 300 arquivos gerados, 0 links quebrados, 0 `<style>`/`<script>`/`style=""`.
- `.md` ficou fora da lista de atividades (são fontes/planos do professor, não atividades do aluno).
- Índice de Análise de Dados passou a listar a atividade prática de Excel de 29/09.
