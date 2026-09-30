# INFORMATICA-BASICA.md — roteiro de slides a partir da Aula 2 (Hardware, Periféricos e SO)

**Objetivo:** Criar `AULAS-CHALKIE-AI/INFORMATICA-BASICA.md`, um Markdown detalhado para ser usado em uma IA que monta slides, com base no PDF `2-Hardware,-Periféricos-e-Sistemas-Operacionais.pdf` (41 slides) e no domínio 4.7 da ementa.

**Tech Stack:** Markdown; leitura do PDF com PyMuPDF (`C:\Python314\python.exe`).

**Criado em:** 23/09/2026 08:10
**Concluído em:** 23/09/2026 08:30
**Tempo decorrido:** ~20:00

> **Mudança de escopo:** o plano inicial (script de extração slide a slide) foi substituído, a pedido do usuário, pela criação direta de `INFORMATICA-BASICA.md` pronto para IA de slides.

---

## Diagnóstico do PDF

- 41 slides com camada de texto (sem OCR).
- Perguntas repetidas com a resposta revelada: 5/6, 14/15, 18/19, 31/32, 37/38, 39/40.
- Slide 24 contém só um vídeo: `https://www.youtube.com/watch?v=LrAXqg6Xn_U`.
- Exemplos em branco no próprio PDF (slides 25, 26 e 28) → completados e sinalizados como complemento.

## Arquivos

| Arquivo | Ação |
|---|---|
| `INTRODUCAO-TIC/AULAS-CHALKIE-AI/INFORMATICA-BASICA.md` | Criado |
| `INTRODUCAO-TIC/docs/extrair-aula-2-hardware-markdown.md` | Este documento |

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Ler o PDF (texto dos 41 slides + imagens dos slides com lacunas) | ✅ Concluído | 23/09/2026 08:10 | 23/09/2026 08:12 | 02:00 |
| 2 | Consultar a ementa (domínio 4.7 e socioemocionais) | ✅ Concluído | 23/09/2026 08:16 | 23/09/2026 08:17 | 01:00 |
| 3 | Criar `INFORMATICA-BASICA.md` (prompt para IA, objetivos, glossário, 44 slides, gabarito, questões extras) | ✅ Concluído | 23/09/2026 08:17 | 23/09/2026 08:28 | 11:00 |
| 4 | Commit dos arquivos da tarefa + graphify na raiz | ✅ Concluído | 23/09/2026 08:28 | 23/09/2026 08:30 | 02:00 |
| 5 | Ajustar tamanho para 14.500–14.900 caracteres (versão compacta, 44 slides mantidos) | ✅ Concluído | 23/09/2026 | 23/09/2026 | — |

---

### Passo 3: Estrutura do `INFORMATICA-BASICA.md`

**Status:** ✅ Concluído

0. Como a IA deve usar o arquivo (prompt pronto + regras de geração)
1. Identificação da aula (vínculo com a ementa)
2. Objetivos de aprendizagem
3. Glossário
4. Roteiro slide a slide (44 slides em 8 partes; cada slide com conteúdo na tela, visual sugerido e fala do professor)
5. Gabarito consolidado
6. Questões extras para quiz
7. Notas sobre a fonte (o que é complemento e o que é original)

**Verificação:**

```powershell
Select-String -Path "C:\fontes\aulas-senai\MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\INTRODUCAO-TIC\AULAS-CHALKIE-AI\INFORMATICA-BASICA.md" -Pattern "^#### Slide" | Measure-Object
```

Esperado: `Count = 44`.

---

### Passo 4: Commit

**Status:** ✅ Concluído

```powershell
git -C C:\fontes\aulas-senai add "MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/AULAS-CHALKIE-AI/INFORMATICA-BASICA.md" "MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/docs/extrair-aula-2-hardware-markdown.md"
git -C C:\fontes\aulas-senai commit -m "docs: INFORMATICA-BASICA.md para geração de slides (aula 2 ITIC)"
```

---

## Resultado final

- **Tamanho final:** 14706 caracteres (limite pedido: 14.500 a 14.900). Formato compacto: cada slide com tópicos, *Visual* e *Notas*.

- `INFORMATICA-BASICA.md` com 44 slides (41 do PDF reorganizados + 3 complementos da ementa: utilização de periféricos, tipos de SO, barra de ferramentas/atalhos).
- Lacunas do PDF completadas e declaradas na seção 7 do arquivo.
- Commit apenas dos arquivos desta tarefa (há outras alterações não relacionadas no repositório).
