# Converter slides AULAS-CHALKIE-AI-COLORIDA para Markdown

**Objetivo:** Extrair o conteúdo textual dos 7 arquivos `.pptx` da pasta
`MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA`
e salvar um `.md` equivalente (mesmo nome) na mesma pasta.

**Tech Stack:** Python 3.14 (`C:\Python314\python.exe`) + `python-pptx` (já instalado)

**Criado em:** 2026-09-24
**Concluído em:** 2026-09-24
**Tempo decorrido:** < 1 hora

## Escopo

| Entrada (.pptx) | Saída (.md) |
|---|---|
| 1-Matemática-Aplicada-à-Gestão-Parte-1.pptx | 1-Matemática-Aplicada-à-Gestão-Parte-1.md |
| 2-Fundamentos-Matemáticos-para-Gestão.pptx | 2-Fundamentos-Matemáticos-para-Gestão.md |
| 3-Excel-Básico-Interface-e-Fórmulas.pptx | 3-Excel-Básico-Interface-e-Fórmulas.md |
| 4-Excel-Intermediário-Formatação-e-Validação.pptx | 4-Excel-Intermediário-Formatação-e-Validação.md |
| 5-Excel-Avançado-Funções-Complexas-e-Busca.pptx | 5-Excel-Avançado-Funções-Complexas-e-Busca.md |
| 6-Excel-Avançado-Tabelas-Dinâmicas-e-Gráficos.pptx | 6-Excel-Avançado-Tabelas-Dinâmicas-e-Gráficos.md |
| 7-Dashboards-Interativos-e-Integração-de-Dados.pptx | 7-Dashboards-Interativos-e-Integração-de-Dados.md |

**Formato de cada .md:**
- `# Título da aula` (nome do arquivo)
- `## Slide N — <título do slide>`
- Textos em tópicos (respeitando nível de indentação dos bullets)
- Tabelas do slide convertidas em tabelas Markdown
- Notas do apresentador em bloco `> **Notas:**` (se existirem)
- Imagens/gráficos **não** são exportados (apenas texto)

**Arquivos previstos:**
- Script temporário no scratchpad da sessão (não versionado)
- 7 novos `.md` na pasta das aulas
- Este documento

**Riscos / dependências:**
- Texto dentro de imagens não é extraído
- Caixas de texto sem ordem lógica podem sair na ordem de posição (cima→baixo, esquerda→direita)
- Os `.pptx` originais **não** serão alterados

## Status Geral

| # | Passo | Status |
|---|-------|--------|
| 1 | Criar script de extração (python-pptx) | ✅ Concluído |
| 2 | Gerar os 7 arquivos .md | ✅ Concluído |
| 3 | Conferir contagem de slides .pptx × seções .md | ✅ Concluído |
| 4 | Commit | ⛔ Aguardando ciclo de 20 chats (CLAUDE.md do projeto) |

## Passos

### 1. Criar script de extração — ✅ Concluído
Script lê cada slide, ordena shapes por posição, extrai título, parágrafos
(com nível), tabelas e notas. **Verificação:** execução sem erros.

### 2. Gerar os 7 arquivos .md — ✅ Concluído
Saída na própria pasta `AULAS-CHALKIE-AI-COLORIDA/`.
**Verificação:** 7 arquivos `.md` existentes.

### 3. Conferir contagem — ✅ Concluído
Nº de `## Slide` em cada `.md` = nº de slides do `.pptx`.

### 4. Commit — ⛔ Aguardando ciclo de 20 chats
Arquivos já em `git add`; commit local conforme regra do CLAUDE.md do projeto (sem push).

## Resultado Final

7 `.md` gerados; slides por arquivo: 41, 41, 41, 41, 40, 41, 40 (iguais aos `.pptx`).

## Auditoria contra `EMENTA-CHALKIE-AI.md` (2026-09-24)

Mapeamento dos 7 decks nas 4 aulas de 8h da ementa: decks 1–2 → Aula 1 · 3–4 → Aula 2 ·
5–6 → Aula 3 · 7 → Aula 4.

| Aula | Conhecimentos da ementa | Situação |
|---|---|---|
| 1 | 1.1 conjuntos, 1.2 razão/proporção, 1.3 regra de três, 1.5 porcentagem, 1.7 progressões, 1.8 estatística | ✅ |
| 1 | **1.4 conversão de unidades** | ❌ sem conteúdo |
| 1 | **1.6 área, volume e peso** (paletes/galpão) | ❌ só citado, sem cálculo |
| 2 | 2.1 interface, fórmulas, SOMA, MÉDIA, CONT.VALORES, SE, referências $, 2.2.1, congelar, 2.2.5 | ✅ |
| 2 | **MÁXIMO e MÍNIMO** (indicador 6) | ❌ ausentes |
| 3 | PROCV/PROCH, ÍNDICE/CORRESP, SEERRO, SE aninhado, CONT.SE, SOMASE, tabela dinâmica, filtros, gráficos dinâmicos | ✅ |
| 3 | 2.2.6 proteção de células | ✅ antecipada no deck 4 |
| 4 | dashboard, KPIs, segmentação, hierarquia visual, apresentação à gerência | ✅ |

**Regras para IA:**
- Regra 3 (contexto de gestão de materiais): ⚠️ decks 3–7 usam folha de pagamento, vendas e lojas;
  quase não há estoque, compras ou fornecedores; as 9 situações-problema da ementa não aparecem.
- Regra 4 (Excel ou LibreOffice Calc): ⚠️ só Excel.
- Deck 3, slide 20: falta o nome da função em "Enquanto a função  computa apenas dígitos" (CONT.NÚM).
