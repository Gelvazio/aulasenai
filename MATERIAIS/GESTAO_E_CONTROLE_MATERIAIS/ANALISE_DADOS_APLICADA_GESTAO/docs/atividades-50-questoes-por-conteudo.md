# Atividades de 50 questões por arquivo de conteúdo + correção das atividades 01 a 04

**Objetivo:** criar, na pasta `ATIVIDADES/`, uma atividade de 50 questões para cada um dos 7 arquivos
de `CONTEUDO/` (com o nome do arquivo) e corrigir os erros de conteúdo das 4 atividades existentes.

**Tech Stack:** Markdown (fonte das questões) · Python (`assets/gerador-atividades/gerar_atividades.py`)
· Supabase (tabelas `atividade` e `gabarito`).

**Criado em:** 30/09/2026 20:41
**Concluído em:** 30/09/2026 21:05
**Tempo decorrido:** 24:00 (minutos:segundos ≈ 24 min)

---

## Escopo

- **Fonte da verdade:** `../EMENTA-CHALKIE-AI.md` (a ementa vence) + os 7 arquivos de `CONTEUDO/`.
  Cada atividade cobre **somente** o conteúdo do seu arquivo (inclusive os slides complementares `N.x`).
- **Contexto das questões:** gestão de materiais (almoxarifado, estoque, compras, fornecedores),
  empresa fictícia, como nos slides.
- **Formato:** o mesmo das atividades atuais — ITEM, capacidade, Contexto, Comando, alternativas
  A a E, 1 alternativa certa, `Folha de respostas: sim` (grava no banco, sem gabarito na página).
- **Qualidade:** o contexto **não** entrega a resposta; cálculos conferidos um a um; nomes das funções
  e erros do Excel em português (`CORRESP`, `#VALOR!`, `VERDADEIRO`, `;`, `0,05`); sem alternativas
  do tipo "b + c"; distribuição equilibrada das letras certas (≈10 por letra).
- ❌ Não serão escritos testes automatizados.

### As 7 atividades novas

| # | Arquivo de conteúdo | Atividade (HTML em `ATIVIDADES/`) | Aula no banco |
|---|---|---|---|
| 1 | `1-Matemática-Aplicada-à-Gestão-Parte-1.md` | `ATIVIDADES-1-MATEMATICA-APLICADA-A-GESTAO-PARTE-1-50-QUESTOES.html` | 37 (Aula 1) |
| 2 | `2-Fundamentos-Matemáticos-para-Gestão.md` | `ATIVIDADES-2-FUNDAMENTOS-MATEMATICOS-PARA-GESTAO-50-QUESTOES.html` | 37 (Aula 1) |
| 3 | `3-Excel-Básico-Interface-e-Fórmulas.md` | `ATIVIDADES-3-EXCEL-BASICO-INTERFACE-E-FORMULAS-50-QUESTOES.html` | 38 (Aula 2) |
| 4 | `4-Excel-Intermediário-Formatação-e-Validação.md` | `ATIVIDADES-4-EXCEL-INTERMEDIARIO-FORMATACAO-E-VALIDACAO-50-QUESTOES.html` | 38 (Aula 2) |
| 5 | `5-Excel-Avançado-Funções-Complexas-e-Busca.md` | `ATIVIDADES-5-EXCEL-AVANCADO-FUNCOES-COMPLEXAS-E-BUSCA-50-QUESTOES.html` | 39 (Aula 3) |
| 6 | `6-Excel-Avançado-Tabelas-Dinâmicas-e-Gráficos.md` | `ATIVIDADES-6-EXCEL-AVANCADO-TABELAS-DINAMICAS-E-GRAFICOS-50-QUESTOES.html` | 39 (Aula 3) |
| 7 | `7-Dashboards-Interativos-e-Integração-de-Dados.md` | `ATIVIDADES-7-DASHBOARDS-INTERATIVOS-E-INTEGRACAO-DE-DADOS-50-QUESTOES.html` | 40 (Aula 4) |

Nome = o do arquivo de conteúdo em maiúsculas, **sem acentos** (acentos quebram links no
navegador e na Vercel). A fonte de cada uma é o `.md` de mesmo nome em `ATIVIDADES/CONTEUDO/`
(termina em `QUESTOES.md` → fica fora do Git, pois traz o gabarito).

### Correções nas 4 atividades existentes (mantêm 12, 12, 13 e 14 questões)

| Atividade | Item | Correção |
|---|---|---|
| 01 | 02 | Lista ordenada com 15 valores (faltava um "10") |
| 01 | 10 e 12 | Diferença de preço coerente: R$ 4,00 × R$ 4,20 = ~4,8% (tirar "3%") |
| 01 | 10 | Alternativa D reescrita (hoje equivale à B) |
| 01 | 03, 04, 05, 07, 08 | Contexto deixa de trazer o resultado pronto |
| 02 | 04 | Cópia da fórmula de % para E3…E6 (não D3…D6) |
| 02 | 06 | Ordem correta das receitas no contexto (e sem entregar a resposta) |
| 02 | 08 | 56,73% (e percentuais dos distratores recalculados) |
| 02 | 05, 07, 10 | Contexto deixa de trazer o resultado pronto |
| 03 | 07 | `CORRESP`; tipo 1 = maior valor **menor ou igual**, lista crescente |
| 03 | 04, 05, 08, 09 | `#VALOR!`, `VERDADEIRO/FALSO`, `0,03`, `;` |
| 03 | 01, 13 | Alternativas com uma única resposta certa; item 13 reescrito |
| 03 | — | Turma preenchida: `AI AIAC 2026/2 V1 (133933)` |
| 04 | 06, 11 | Sem alternativas "b + c"; uma única resposta certa |
| 04 | 03, 04 | Contexto deixa de trazer a resposta |
| 04 | 14 | `HOJE()`/`AGORA()` = data do sistema; a data de atualização é digitada/registrada |
| 04 | — | Turma preenchida: `AI AIAC 2026/2 V1 (133933)` |

## Arquivos previstos

- Criar: `ATIVIDADES/CONTEUDO/ATIVIDADES-<N>-<NOME>-50-QUESTOES.md` (7, fora do Git)
- Criar: `ATIVIDADES/ATIVIDADES-<N>-<NOME>-50-QUESTOES.html` (7, gerados)
- Modificar: `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-0N-1x-QUESTOES.md` (4, fora do Git) e os 4 HTML
- Modificar: `ATIVIDADES/CONTEUDO/GABARITO-ATIVIDADES-AULA-0N-*.md` (fora do Git)
- Modificar: `ATIVIDADES/index.html` (cards das 7 novas) e `ATIVIDADES/MENU-ATIVIDADES.js`
- Criar: `C:\fontes\aulasenai\database\2026-09-30-analise-dados-seed-atividades.sql` (fora do Git)

## Autorização do usuário (30/09/2026 20:45)

- ✅ Gravar os gabaritos no banco **pelo MCP do Supabase** (para o aluno ver a nota ao entregar).
- ✅ Ao final: **commit e push**.

## Riscos e dependências

- **Banco:** as páginas só gravam respostas se a atividade e o gabarito estiverem cadastrados.
  Hoje existem as atividades 21 a 24 (inativas, **0 respostas e 0 entregas**). O SQL insere as 7 novas
  (`ativo = false`, o professor libera no índice) e atualiza o gabarito das 21 a 24.
  **Só aplico no Supabase se você autorizar**; senão, deixo o SQL para rodar no SQL Editor.
- **Volume:** 350 questões novas; cada cálculo será conferido no Python antes de gerar o HTML.
- Atividades 25 e 26 (Excel 29/09 e 01/10) no banco apontam para `AULAS-CHALKIE-AI-COLORIDA/`,
  pasta que foi movida — fora deste escopo (aviso).
- Validação sem navegador: contagem de itens, gabarito por letra e ausência de gabarito no HTML.

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Corrigir as 4 atividades existentes (.md + gabarito) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 2 | Escrever atividade 1 (50 questões) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 3 | Escrever atividade 2 (50 questões) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 4 | Escrever atividade 3 (50 questões) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 5 | Escrever atividade 4 (50 questões) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 6 | Escrever atividade 5 (50 questões) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 7 | Escrever atividade 6 (50 questões) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 8 | Escrever atividade 7 (50 questões) | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 9 | Conferir cálculos, letras e nomes das funções | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 10 | Gerar os 11 HTML, índice e menu | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 11 | Gerar o SQL (7 atividades + gabaritos) e aplicar se autorizado | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |
| 12 | Commit | ✅ Concluído | 30/09/2026 20:41 | 30/09/2026 21:05 | — |

---

### Passo 1: Corrigir as 4 atividades existentes

**Status:** ✅ Concluído
**Arquivos:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-12-QUESTOES.md` … `-04-14-QUESTOES.md`
**Ação:** aplicar a tabela de correções acima; sincronizar os `GABARITO-*.md`.
**Verificação:**

```powershell
C:\Python314\python.exe -c "import sys; sys.path.insert(0,'assets/gerador-atividades'); from gerar_atividades import ler_questoes; from pathlib import Path; [print(p.name, len(ler_questoes(p)[1])) for p in Path('MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/CONTEUDO').glob('ATIVIDADES-AULA-*-QUESTOES.md')]"
```

Esperado: 12, 12, 13 e 14 itens.

### Passos 2 a 8: Escrever cada atividade de 50 questões

**Status:** ✅ Concluído
**Arquivo:** `ATIVIDADES/CONTEUDO/ATIVIDADES-<N>-<NOME>-50-QUESTOES.md`
**Ação:** cabeçalho igual ao das atividades atuais (Aula, Tema, Ícone, Duração 100 min,
Total 50, Folha de respostas: sim, Exportar PDF com gabarito: sim, Turma) e 50 itens cobrindo,
em ordem, todos os tópicos do arquivo de conteúdo; linha `**Gabarito:**` em cada item.
**Verificação:** mesmo comando do passo 1 → 50 itens em cada arquivo.

### Passo 9: Conferência

**Status:** ✅ Concluído
**Ação:** script no scratchpad que confere: 50 itens, 5 alternativas, 1 gabarito A–E, distribuição
das letras, ausência de `CORRESPONDÊNCIA(`, `#VALUE!`, `TRUE`, `FALSE` e "b + c"; recalcular os
itens numéricos.

### Passo 10: Gerar HTML, índice e menu

**Status:** ✅ Concluído

```powershell
C:\Python314\python.exe assets\gerador-atividades\gerar_atividades.py MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\ATIVIDADES --so=CONTEUDO\<arquivo>.md
```

Depois, mover o HTML para `ATIVIDADES/` (como faz `scripts/extrair-atividades-docx.py`),
acrescentar os 7 cards no `index.html` e os itens no `MENU-ATIVIDADES.js`.
**Verificação:** `grep -c 'ITEM ' <html>` = 50 e nenhuma linha `Gabarito:` no HTML.

### Passo 11: SQL no banco

**Status:** ✅ Concluído
**Arquivo:** `database/2026-09-30-analise-dados-seed-atividades.sql` (idempotente, fora do Git)
**Ação:** inserir as 7 atividades (`aula_id` da tabela acima, `ativo = false`, `total_itens = 50`) e os
gabaritos; atualizar o gabarito das atividades 21 a 24. Aplicar pelo Supabase **só com autorização**.
**Verificação:** `select pagina, count(*) from atividade a join gabarito g on g.atividade_id = a.id ...`
→ 50 por atividade nova.

### Passo 12: Commit

**Status:** ✅ Concluído
**Ação:** `git add` só dos HTML, índice, menu e este plano; conferir
`git diff --cached --name-only` (nenhum `*QUESTOES.md`, gabarito ou seed).

---

## Resultado final (30/09/2026 21:05)

- ✅ 7 atividades de 50 questões criadas (fontes em `ATIVIDADES/CONTEUDO/`, páginas em `ATIVIDADES/`),
  com 10 respostas certas por letra (A–E) e cálculos conferidos.
- ✅ Atividades 01 a 04 corrigidas (12, 12, 13 e 14 questões mantidas).
- ✅ Banco (MCP Supabase): atividades novas ids 27 a 33 (`ativo = false`, liberar pelo interruptor
  do índice) e 401 linhas de gabarito (350 novas + 51 das atividades 21 a 24), conferidas letra a letra.
- ✅ Índice com 7 cards novos; menu com os grupos "por conteúdo" e "por aula"; links das atividades de
  Excel ajustados para a pasta `ATIVIDADES/`.
- ✅ Atividades 25 e 26 (Excel 29/09 e 01/10): `pagina` corrigida no banco para a pasta
  `ATIVIDADES/` (30/09/2026, a pedido do usuário).
