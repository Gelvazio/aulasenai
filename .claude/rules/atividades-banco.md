# 🗃️ Atividades — Banco, layout global, sem HTML

Detalhes: `docs/regras/atividades.md`.

## ⚠️ Situação: alvo da migração #25 (ainda pendente)

O modelo abaixo foi decidido em 2026-10-11 e é o **alvo** da tarefa #25 (Etapa 143-d30a9c4d),
que ainda não foi feita. **Até a migração terminar, vale o jeito atual** descrito em
`docs/regras/atividades.md` (páginas e fontes por aula). ⛔ Não criar página nova por aula fora do
plano da #25.

## Alvo: questões só no banco

Enunciado, alternativas, gabarito e tópicos ficam **só no banco**. A página busca pelo id da
atividade e monta tudo na hora. Nada de questão em arquivo (`.md`, `.html`, `.json`) nem em
`localStorage`. Onde o gabarito pode estar: `security-banco.md`.

## Alvo: layout global

Uma página por tipo, para todas as matérias, que recebe o **id da atividade** (ex.:
`atividade-objetiva.html` e `atividade-pratica.html`, criadas na #25).

Recursos que toda atividade já tem (não replicar por matéria): progresso da turma, gráficos,
cálculo de nota, mínimo de questões, correção por IA (discursiva), gabarito por turma, PDF SENAI.

## Alvo: pasta da matéria só com Markdown

```
MATERIAIS/<CURSO>/<MATERIA>/ATIVIDADES/
└── STATUS-ATIVIDADES.md      (sem HTML; índice gerado por script a partir do banco)
```

## Tamanho padrão (vale já)

| Tipo | Tamanho |
|------|---------|
| Objetiva | 50 questões |
| Prática | 10 questões × 3 tópicos |
| Avaliação | Conforme a ementa |

## Contexto: "Você como aluno consultor" (2026-10-08, vale já)

Vale para **toda atividade** (objetiva, prática, discursiva, avaliação, situação-problema, Excel,
Word…).

- ⛔ **Não criar empresa fictícia** ("a empresa X Ltda.", "a Distribuidora Y"…).
- ✅ O enunciado coloca o aluno como **consultor** que analisa a situação e resolve o problema:
  "Você, como aluno consultor, foi chamado para organizar o controle de estoque de um
  almoxarifado…".
- ✅ O contexto profissional do curso continua (almoxarifado, logística, escritório…), sem nome de
  empresa inventada.
