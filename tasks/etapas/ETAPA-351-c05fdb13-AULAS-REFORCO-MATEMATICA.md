## Etapa 351-c05fdb13 — Aulas de Reforço de Matemática e Raciocínio Lógico (Rio do Sul Mais Tech)

**Tarefa:** #224-c05fdb13-e858-4067-adbf-ab5f10659f5b · **Pedido em:** 2026-10-16 21:20 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a26b3c0e-1ljztf)
**Pedido:** "gerar as aulas de Reforço de Matemática"
**Objetivo:** escrever as aulas da matéria Reforço de Matemática e Raciocínio Lógico em `CONTEUDO/` (1 aula = 4 h), que hoje não tem nenhuma.

### Escopo

- **Entra:** 16 aulas em `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` (63 h = 15 aulas de 4 h + 1 aula de
  3 h), na divisão de horas por módulo que já está em `AULAS/STATUS-AULAS.md` (a aula pode fechar um
  módulo e abrir o seguinte); `DOCUMENTACAO/PLANO-AULAS.md` (resumo); coluna "Aula em `CONTEUDO/`"
  do `AULAS/STATUS-AULAS.md` e `STATUS_MATERIA.md` regerado pelo script.
- **Cada aula** segue `docs/regras/materias.md` §3: cabeçalho (matéria · curso, horas,
  conhecimentos 1–7 da UC 8 da ementa do curso, capacidades C1–C6, estratégias), indicadores
  (os "Critérios Específicos de Avaliação" do módulo), objetivos, roteiro com tempos (240 min, ou
  180 min na aula 16, com intervalo), conteúdo em seções com exemplos resolvidos e tabelas, exemplo
  no contexto do curso, **pelo menos 1 dinâmica**, situação-problema e entrega, verificação e
  recursos. Formato de referência: `REFORCO_LINGUAGENS/CONTEUDO/` (mesmo curso).
- **Contexto:** "você, como aluno consultor" (sem empresa fictícia), com situações do dia a dia de
  alunos de 8º e 9º ano (compras, mesada, receitas, mapas, energia, dados de clima e esportes).
- **Não entra:** `materia.json`, atividades (objetiva e prática), seeds e banco, slides, apostila;
  ajuste do tamanho da ementa (15.534 caracteres, fora da faixa 14.800–14.950); os 7 módulos HTML
  antigos de `AULAS/` continuam como estão (material de apoio).
- **Pronto quando:** 16 arquivos em `CONTEUDO/` com as 10 partes, soma das horas = 63 h, só
  conteúdo da ementa desta UC, status atualizados e aceite do usuário.

### Riscos

| Risco | Plano B |
|---|---|
| Ementa sem numeração oficial de indicadores | Usar os critérios de avaliação de cada módulo, na ordem da ementa |
| Aulas longas demais para revisar de uma vez | Entregar em blocos (01–05, 06–10, 11–16), se o usuário preferir |

### #224.1 — Plano das aulas (tarefa grande)

**Próximo passo:** aprovação do plano pelo usuário.

- **Nível:** MEDIO — leitura da ementa e plano em `.md` de várias aulas.

### #224.2 — Aulas em `CONTEUDO/`

**Próximo passo:** esperar a aprovação do plano.

- **Nível:** MEDIO — conteúdo didático conferido com a ementa.

### #224.3 — Status da matéria

**Próximo passo:** esperar a #224.2.

- **Nível:** LEVE — atualizar `STATUS-AULAS.md` e `STATUS_MATERIA.md`.

### #224.4 — Aceite do usuário

- **Nível:** LEVE — aceite.
