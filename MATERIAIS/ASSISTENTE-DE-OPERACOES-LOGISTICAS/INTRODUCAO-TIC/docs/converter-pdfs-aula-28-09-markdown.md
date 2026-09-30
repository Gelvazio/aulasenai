# Converter os PDFs da pasta ATIVIDADES-AULA-28-09-2026 para Markdown

**Objetivo:** Criar uma versão Markdown (`.md`) de cada arquivo da pasta
`INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-28-09-2026/` que ainda não tem uma, no mesmo padrão
do `3-O Ciclo do Feedback na Comunicação.md` (título, subtítulo, fonte e uma seção por slide).

**Escopo:** Os 5 PDFs da pasta. O `.pptx` do Ciclo do Feedback já tem o `.md` e fica como está.
Os PDFs e o `.pptx` originais **não** são alterados nem apagados.

**Tech Stack:** Markdown; extração do texto com PyMuPDF (`C:\Python314\python.exe`), com o
texto bruto só no scratchpad. Os `.md` são escritos e organizados à mão.

**Criado em:** 28/09/2026
**Concluído em:** 28/09/2026
**Tempo decorrido:** ~40 min

---

## Diagnóstico

| PDF | Slides | Texto |
|-----|--------|-------|
| `3-Navegação-na-Web-e-Pesquisa-Acadêmica.pdf` | 41 | Tem camada de texto (sem OCR) |
| `4-Comunicação-Digital-e-Colaboração-em-Nuvem.pdf` | 42 | Tem camada de texto |
| `5-Segurança-da-Informação-e-Proteção-de-Dados.pdf` | 41 | Tem camada de texto |
| `6-Editor-de-Textos-Formatação-e-Estruturação.pdf` | 41 | Tem camada de texto |
| `7-Textos-Técnicos-e-Redação-Empresarial.pdf` | 43 | Tem camada de texto |

## Arquivos

| Arquivo (em `ATIVIDADES/ATIVIDADES-AULA-28-09-2026/`) | Ação |
|---|---|
| `3-Navegação-na-Web-e-Pesquisa-Acadêmica.md` | Criar |
| `4-Comunicação-Digital-e-Colaboração-em-Nuvem.md` | Criar |
| `5-Segurança-da-Informação-e-Proteção-de-Dados.md` | Criar |
| `6-Editor-de-Textos-Formatação-e-Estruturação.md` | Criar |
| `7-Textos-Técnicos-e-Redação-Empresarial.md` | Criar |
| `INTRODUCAO-TIC/docs/converter-pdfs-aula-28-09-markdown.md` | Este documento |

## Padrão de cada `.md`

- `# Título` da apresentação, `> subtítulo` e a linha **Fonte:** (arquivo, nº de slides,
  matéria, curso e data da aula).
- Uma seção `## Slide N — Título` por slide. Slides repetidos (pergunta e depois a resposta)
  viram uma seção só: `## Slides N e M — Título`.
- Tabelas em Markdown, listas numeradas ou com marcadores, termos em **negrito**.
- Links e vídeos dos slides mantidos como links.
- Conteúdo fiel ao PDF. Nada é inventado; texto quebrado pela extração é corrigido.

## Riscos

- Texto de slide em caixas soltas pode sair fora de ordem na extração. A ordem é revisada à mão.
- Imagens e diagramas sem texto não são convertidos; quando forem importantes, entra uma nota
  curta descrevendo a imagem.

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Extrair o texto dos 5 PDFs para o scratchpad e fazer o diagnóstico | ✅ Concluído |
| 2 | Criar `3-Navegação-na-Web-e-Pesquisa-Acadêmica.md` | ✅ Concluído |
| 3 | Criar `4-Comunicação-Digital-e-Colaboração-em-Nuvem.md` | ✅ Concluído |
| 4 | Criar `5-Segurança-da-Informação-e-Proteção-de-Dados.md` | ✅ Concluído |
| 5 | Criar `6-Editor-de-Textos-Formatação-e-Estruturação.md` | ✅ Concluído |
| 6 | Criar `7-Textos-Técnicos-e-Redação-Empresarial.md` | ✅ Concluído |
| 7 | Conferir cada `.md` (nº de slides cobertos e links) e fazer o commit local | ✅ Concluído |

**Verificação:** contar as seções `## Slide` de cada `.md` e comparar com o número de slides do
PDF. Nenhum servidor nem navegador é aberto.

---

## Resultado

- 5 arquivos `.md` criados; todos cobrem do slide 2 ao último (o slide 1 vira o título e o
  subtítulo), com os 5 vídeos do YouTube mantidos como links.
- Lacunas que já estão em branco no próprio PDF (texto que era código na apresentação) foram
  completadas e sinalizadas como *Complemento*: aula 3 (slides 17 e 23) e aula 4 (slides 10, 15,
  21 e 28).
- Aula 5, slide 35: o texto original diz "engenharia reversa"; foi mantido, com uma observação de
  que "engenharia social" seria o termo adequado.
- **Commit:** os `.md` não entram no git porque o `.gitignore` do projeto ignora `*.md` (linha 9).
  O commit local `b83a513`, pedido durante a tarefa, levou apenas as alterações que já estavam
  pendentes na árvore (atividade de 50 questões e `respostas-atividade`). Nenhum push foi feito.
