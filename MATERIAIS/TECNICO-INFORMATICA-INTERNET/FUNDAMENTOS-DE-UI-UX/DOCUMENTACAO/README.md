# 📚 Mapa da matéria — Fundamentos de UI / UX

Guia para navegar os materiais da UC **Fundamentos de UI / UX** (76 h, 19 aulas de 4 h) do curso
Técnico em Informática para Internet. A matéria segue o padrão da **Introdução à TIC**
(`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/`), que é a referência de estrutura,
atividades e geradores.

## 🗂️ Estrutura

| Caminho | Conteúdo |
|---|---|
| `../EMENTA-CHALKIE-AI.md` | Ementa da matéria (fonte da verdade; segue a ementa do curso) |
| `../materia.json` | Arquivo único de dados da matéria (lido pelos geradores) |
| `../STATUS-EMENTAS.md` | Status da ementa |
| `../STATUS_MATERIA.md` | Status geral da matéria (peças: aulas, atividades, avaliações, apostila) |
| `../CONTEUDO/` | Conteúdo das 19 aulas `AULA-NN-*.md` (10 partes, dos slides do Chalkie.AI) + `*.pdf` dos slides + `STATUS-CONTEUDO-AULAS.md` |
| `../AULAS/` | `STATUS-AULAS.md` (situação de cada aula: conteúdo, slides, objetiva, prática, banco) |
| `../ATIVIDADES/` | Páginas HTML geradas + `index.html` + `STATUS-ATIVIDADES.md` |
| `../ATIVIDADES/CONTEUDO/` | Fontes: `ATIVIDADES-AULA-NN-50-QUESTOES.md` (objetiva, com gabarito), `ATIVIDADE-PRATICA-AULA-NN.md` (discursiva), `-GABARITO.md` (padrão de resposta) e `RESPOSTAS-PROVAVEIS-AULA-NN.md` — os três últimos fora do site (`.vercelignore`) |
| `../ATIVIDADES/FICHAS-DETRABALHO/` | Fichas de trabalho em PDF |
| `../APOSTILA/` | `STATUS-APOSTILA.md` (apostila em Markdown + HTML) |
| `../DOCUMENTACAO/` | `PLANO-AULAS.md` (19 aulas), este `README.md` e `EXCECOES.md` |

## 🧭 Padrões

- **Fonte única do conteúdo:** `EMENTA-CHALKIE-AI.md` + `materia.json` + `CONTEUDO/`. Nunca PDF nem outra UC.
- **Atividades:** 1 objetiva de **50 questões** (gabarito 13 A · 13 B · 12 C · 12 D) e 1 discursiva de
  **20 questões × 3 tópicos** por aula. Padrão da ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/`).
- **Geradores:** `assets/gerador-atividades/gerar_atividades.py` (objetiva) e
  `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` (discursiva + seed dos tópicos).
- **Gabarito e respostas prováveis:** só no Git, **fora do site** (`.vercelignore`); o aluno nunca lê.
- **Aluno consultor:** contexto "Você, como aluno consultor…", no curso, sem empresa fictícia.
- **Sem navegador e sem testes automatizados:** conferência por leitura, `node --check` e geradores.
- **Nome em português, sem `<script>`/`<style>` nas páginas**, JS/CSS reutilizáveis em `assets/`.

---

**Status:** 🔄 Matéria em construção (19 aulas, atividades, avaliações, apostila e análise do JEV-AI)
| **Atualizado em:** 2026-10-24
