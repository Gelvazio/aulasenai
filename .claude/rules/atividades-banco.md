# 🗃️ Atividades — Banco, Layout Global, Sem HTML

**Desde 2026-10-11. Migração em tarefa #25.**

## A Regra

| Antes | Agora |
|-------|-------|
| Questões em `.md` | **Só no banco** |
| HTML para cada aula | **Layout global** |
| Pasta com muitos `.html` | Pasta tem **só Markdown** |

---

## Questões Só no Banco

Enunciado, alternativas, gabarito, tópicos = banco.

Página busca pelo id e monta dinamicamente.

**NUNCA:**
- ❌ Questão em arquivo
- ❌ localStorage
- ❌ Gabarito pro aluno

---

## Layout Global

Uma página para todas as atividades de um tipo:
- `atividade-objetiva.html`
- `atividade-pratica.html`

Recebe o **id da atividade** e faz o resto.

---

## Pasta da Matéria — Só Markdown

```
MATERIAIS/<CURSO>/<MATERIA>/
├── CONTEUDO/
│   └── AULA-*.md
├── ATIVIDADES/
│   ├── STATUS-ATIVIDADES.md
│   └── (sem HTML)
└── APOSTILA/
    ├── APOSTILA-*.md
    └── (sem HTML)
```

Índice gerado por script do banco.

---

## Recursos Automáticos

Toda atividade tem:
- ✅ Progresso da turma
- ✅ Gráficos
- ✅ Cálculo nota
- ✅ Mínimo de questões
- ✅ Correção IA (discursiva)
- ✅ Gabarito por turma
- ✅ PDF SENAI

**Sem replicar em cada matéria.**

---

**Ver também:** `docs/regras/atividades.md`
