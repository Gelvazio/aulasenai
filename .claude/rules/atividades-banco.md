# 🗃️ Atividades — Banco, layout global, sem HTML

**Desde 2026-10-11** (migração na tarefa #25). Detalhes: `docs/regras/atividades.md`.

## Questões só no banco

Enunciado, alternativas, gabarito e tópicos ficam **só no banco**. A página busca pelo id da
atividade e monta tudo na hora.

- ❌ Questão em arquivo (`.md`, `.html`, `.json`)
- ❌ `localStorage`
- ❌ Gabarito visível para o aluno (`security-banco.md`)

## Layout global

Uma página por tipo, para todas as matérias — recebe o **id da atividade**:
- `atividade-objetiva.html`
- `atividade-pratica.html`

Recursos que toda atividade já tem (não replicar por matéria): progresso da turma, gráficos,
cálculo de nota, mínimo de questões, correção por IA (discursiva), gabarito por turma, PDF SENAI.

## Pasta da matéria — só Markdown

```
MATERIAIS/<CURSO>/<MATERIA>/ATIVIDADES/
└── STATUS-ATIVIDADES.md      (sem HTML; índice gerado por script a partir do banco)
```

## Tamanho padrão

| Tipo | Tamanho |
|------|---------|
| Objetiva | 50 questões |
| Prática | 10 × 3 tópicos |
| Avaliação | Conforme a ementa |

## Contexto: "Você como aluno consultor" (2026-10-08)

Vale para **toda atividade** (objetiva, prática, discursiva, avaliação, situação-problema, Excel,
Word…).

- ⛔ **Não criar empresa fictícia** ("a empresa X Ltda.", "a Distribuidora Y"…).
- ✅ O enunciado coloca o aluno como **consultor** que analisa a situação e resolve o problema:
  "Você, como aluno consultor, foi chamado para organizar o controle de estoque de um
  almoxarifado…".
- ✅ O contexto profissional do curso continua (almoxarifado, logística, escritório…), sem nome de
  empresa inventada.
