# Criar Exercício HTML — Quiz Revisão Aulas 1-9

**Objetivo:** Gerar um arquivo HTML de exercícios (padrão SENAI, com exportação PDF) a partir das 30 questões de múltipla escolha contidas em `26-Quiz-Revisao-Aulas-1-9.gs`, salvo na mesma pasta do script.

**Tech Stack:** HTML5 + CSS3 + JavaScript (html2pdf.js, jsPDF, jsPDF-AutoTable) — padrão da skill `EXERCICIOS`

**Criado em:** 2026-09-22
**Concluído em:** 2026-09-22

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Extrair as 30 questões (título, alternativas, resposta correta) do `.gs` | ✅ Concluído | 2026-09-22 | 2026-09-22 | — |
| 2 | Montar HTML no padrão `exercicio-box` (CAPACIDADE=Bloco, Contexto=Aula, Comando=Pergunta, Resposta=alternativas A–D) | ✅ Concluído | 2026-09-22 | 2026-09-22 | — |
| 3 | Aplicar CSS + botão de exportação PDF da skill EXERCICIOS | ✅ Concluído | 2026-09-22 | 2026-09-22 | — |
| 4 | Salvar `26-Quiz-Revisao-Aulas-1-9.html` na pasta `FORMULARIOS-SEPARADOS/` | ✅ Concluído | 2026-09-22 | 2026-09-22 | — |
| 5 | Commit | ⬜ Pendente | 2026-09-22 | | |

---

### Passo 1: Extrair questões do `.gs`

**Status:** ⬜ Pendente

**Arquivo:** Leitura de `C:\Users\gelva\projetos\Scripts-Comunicacao\FORMULARIOS-SEPARADOS\26-Quiz-Revisao-Aulas-1-9.gs`

**Ação:** Já lido — 30 questões organizadas em 3 blocos (Aulas 1-3, 4-6, 7-9), cada uma com 4 alternativas e 1 correta.

---

### Passo 2-4: Gerar HTML

**Status:** ⬜ Pendente

**Arquivo:** Criar `C:\Users\gelva\projetos\Scripts-Comunicacao\FORMULARIOS-SEPARADOS\26-Quiz-Revisao-Aulas-1-9.html`

**Ação:** Estrutura por bloco (`.aula`), cada questão em `.exercicio-box`:
- **CAPACIDADE:** nome do bloco temático
- **Contexto:** referência da aula (ex: "Aula 1")
- **Comando:** enunciado da questão
- **Resposta:** as 4 alternativas (A–D), sem indicar a correta no material do aluno; gabarito separado ao final do documento (visível/professor)

Botão de exportação PDF por módulo, seguindo função `exportarPDFExercicios()` da skill.

**Verificação:** Abrir o arquivo no navegador e conferir as 30 questões + gabarito.

---

### Passo 5: Commit

**Status:** ⬜ Pendente

**Ação:** `git add` + `git commit` no repositório `Scripts-Comunicacao` (após 20 interações, conforme regra global, ou se o usuário pedir commit explícito).

---
