# Extrair "Excel Básico.pdf" (páginas 1–20) para Markdown explicativo

**Objetivo:** Criar um script Python que lê as páginas 1 a 20 de `OFFICE FACIL/Excel Básico.pdf` e salva um Markdown detalhado e explicativo com o conteúdo de cada página.

**Tech Stack:** Python 3.14 (`C:\Python314\python.exe`), PyMuPDF (`pymupdf`, já instalado), OCR nativo do Windows (`Windows.Media.Ocr`, idioma `pt-BR`) acionado via PowerShell.

**Criado em:** 22/09/2026 16:53:29
**Concluído em:** 22/09/2026 17:06
**Tempo decorrido:** 12:30

---

## Contexto e decisões técnicas

- O PDF tem **100 páginas** e é **escaneado**: nenhuma página possui camada de texto (`get_text()` retorna vazio). Por isso é obrigatório usar **OCR**.
- `pytesseract` está instalado, mas o executável **Tesseract não existe** na máquina. O OCR nativo do Windows com **pt-BR** está disponível → sem instalar nada.
- Cada página é uma ficha didática ("Office Fácil") com: número/título, explicação, "Onde encontrar", exemplo prático, dica e exercício/atividade.
- O script vai combinar:
  1. **Texto extraído por OCR** (fiel ao PDF);
  2. **Notas explicativas** escritas a partir da leitura visual de cada página (dicionário `EXPLICACOES` no script), para deixar o Markdown didático;
  3. **Imagem da página** salva em JPEG e referenciada no Markdown.
- Somente páginas **1 a 20** (constantes `PAGINA_INICIAL`/`PAGINA_FINAL`).

## Arquivos previstos

| Arquivo | Ação |
|---|---|
| `GERADOR-AULAS/OFFICE FACIL/extrair_excel_basico.py` | Criar — script principal |
| `GERADOR-AULAS/OFFICE FACIL/explicacoes_excel_basico.py` | Criar — notas explicativas das 20 páginas (importado pelo script) |
| `GERADOR-AULAS/OFFICE FACIL/Excel-Basico-paginas-01-20.md` | Gerado pelo script |
| `GERADOR-AULAS/OFFICE FACIL/excel-basico-paginas/pagina-01.jpg` … `pagina-20.jpg` (JPEG, ~7 MB) | Gerado pelo script |
| `GERADOR-AULAS/docs/extrair-excel-basico-pdf-markdown.md` | Este plano (status) |

## Riscos e dependências

- OCR pode errar acentos/símbolos em áreas pequenas (menus, capturas de tela) → mitigado com renderização em 200 DPI (limite de dimensão do OCR do Windows) e com as notas explicativas curadas.
- OCR do Windows depende do pacote de idioma pt-BR (confirmado disponível).
- Nenhum teste automatizado será criado (regra do CLAUDE.md global).

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Ler visualmente as páginas 1–20 e redigir notas explicativas | ✅ Concluído | 22/09/2026 16:53 | 22/09/2026 17:00 | — |
| 2 | Criar `extrair_excel_basico.py` (render + OCR + Markdown) | ✅ Concluído | 22/09/2026 16:53 | 22/09/2026 17:00 | — |
| 3 | Executar o script e gerar o Markdown + imagens | ✅ Concluído | 22/09/2026 16:53 | 22/09/2026 17:05 | — |
| 4 | Conferir o Markdown gerado (20 seções, texto presente) | ✅ Concluído | 22/09/2026 16:53 | 22/09/2026 17:05 | — |
| 5 | Commit + graphify na raiz | ✅ Concluído | 22/09/2026 16:53 | 22/09/2026 17:06 | — |

---

### Passo 1: Notas explicativas por página

**Status:** ✅ Concluído

**Ação:** Visualizar as 20 páginas e escrever, para cada uma, título, tema e resumo explicativo (o que é, para que serve, como fazer, atalhos, exercício).

**Verificação:** dicionário `EXPLICACOES` com chaves 1..20 no script.

---

### Passo 2: Script Python

**Status:** ✅ Concluído

**Arquivo:** Criar `C:\fontes\aulas-senai\GERADOR-AULAS\OFFICE FACIL\extrair_excel_basico.py`

**Ação:**
- Renderizar páginas 1–20 em JPEG (200 DPI) com PyMuPDF;
- Chamar o OCR do Windows via `powershell` (subprocess) e capturar o texto linha a linha;
- Montar o Markdown: cabeçalho, sumário com links, e para cada página → título, explicação detalhada, texto extraído (OCR), imagem da página;
- Salvar em UTF-8.

**Verificação:**

```powershell
C:\Python314\python.exe "C:\fontes\aulas-senai\GERADOR-AULAS\OFFICE FACIL\extrair_excel_basico.py"
```

Esperado: mensagem com o caminho do `.md` e 20 páginas processadas.

---

### Passo 3: Executar

**Status:** ✅ Concluído

**Verificação:** existem `Excel-Basico-paginas-01-20.md` e 20 JPEGs em `excel-basico-paginas/`.

---

### Passo 4: Conferência

**Status:** ✅ Concluído

**Verificação:**

```powershell
Select-String -Path "C:\fontes\aulas-senai\GERADOR-AULAS\OFFICE FACIL\Excel-Basico-paginas-01-20.md" -Pattern "^## Página" | Measure-Object
```

Esperado: `Count = 20`.

---

### Passo 5: Commit

**Status:** ✅ Concluído

```powershell
git -C C:\fontes\aulas-senai add "GERADOR-AULAS/OFFICE FACIL" "GERADOR-AULAS/docs/extrair-excel-basico-pdf-markdown.md"
git -C C:\fontes\aulas-senai commit -m "feat: script para extrair Excel Básico (pág. 1-20) em Markdown"
```

---

## Resultado final

- Script `OFFICE FACIL/extrair_excel_basico.py` + módulo `explicacoes_excel_basico.py`.
- Markdown `OFFICE FACIL/Excel-Basico-paginas-01-20.md` com 20 seções (explicação, passo a passo, atalhos, exercício, texto OCR e imagem).
- 20 imagens JPEG em `OFFICE FACIL/excel-basico-paginas/`.
- Observações registradas no Markdown: pág. 1 cita Ctrl+S para salvar (atalho do Excel em inglês; em português é Ctrl+B); pág. 17 tem textos corrompidos na própria arte; pág. 20 tem percentuais do gráfico de pizza que não batem com a tabela.
- Commit apenas dos arquivos desta tarefa (o repositório tinha outras alterações não relacionadas, que não foram incluídas).
