## Etapa 370-73eb24d3 — Atividades de Reforço de Matemática e Raciocínio Lógico (Rio do Sul Mais Tech)

**Tarefa:** #243-73eb24d3-8ffb-4e05-bb3a-5423a73208e3 · **Pedido em:** 2026-10-16 21:39 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a26b3c0e-1ljztf)
**Pedido:** "gerar as atividades de Reforço de Matemática"
**Objetivo:** gerar as atividades das 16 aulas da matéria (aceitas na #224), lidas das aulas em `CONTEUDO/`.

### Escopo

- **Entra, por aula (01 a 16), uma aula por vez e completa** (regra "uma aula por vez" de
  `docs/regras/atividades.md`):
  - **Objetiva:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` (50 questões A–D, gabarito
    equilibrado 13/13/12/12, capacidade `Cn` em cada item) → página
    `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` pelo `gerar_atividades.py`.
  - **Prática:** `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` + `-GABARITO.md` (10 questões ×
    3 tópicos = 10 pontos, "você, como aluno consultor") → página pelo
    `gerar_avaliacao_discursiva.py` (gera também o seed dos tópicos).
  - **Seeds** `database/*.sql` gerados pelos scripts, registrados como **PENDENTE** em
    `database/SEEDS-APLICADOS.md`; `ATIVIDADES/index.html`, `STATUS-ATIVIDADES.md` e
    `AULAS/STATUS-AULAS.md` atualizados a cada aula.
- **Antes das aulas:** `materia.json` da matéria (o gerador lê dele as capacidades C1–C6 e os dados
  da UC) e o grupo "Reforço Matemática e Raciocínio Lógico" no `scripts/gerar-seed-atividades.py`.
- **Não entra:** aplicar os seeds no banco (só o Claude Code local, #243.5); avaliações objetivas
  01/02, avaliação prática e média final (só se o usuário pedir); apostila; mudar as aulas aceitas.
- **Pronto quando:** 16 objetivas com 50 itens e 16 práticas com 10 questões/30 tópicos/10 pontos,
  gabarito ausente de todo HTML, seeds PENDENTE registrados, status em dia e aceite do usuário.

### Riscos

| Risco | Plano B |
|---|---|
| 800 questões objetivas + 160 práticas é muito volume para uma sessão | Entregar em dois blocos (01–08 e 09–16), cada aula com commit próprio; quem retomar lê o `STATUS-AULAS.md` |
| Matéria ou aulas ainda não cadastradas no banco | O seed já cria curso, matéria e aulas de forma idempotente; a frente local confere ao aplicar |
| Gabarito vazar para o site | Conferir o HTML de cada aula; fontes `CONTEUDO/` ficam fora do site pelo `.vercelignore` |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|

### #243.1 — Plano das atividades (tarefa grande)

**Próximo passo:** aprovação do plano pelo usuário.

- **Nível:** MEDIO — leitura de regras e plano em `.md`.

### #243.2 — `materia.json` e grupo no gerador de seeds

**Próximo passo:** esperar a aprovação do plano.

- **Nível:** MEDIO — dados da ementa em JSON e uma lista no script Python.

### #243.3 — Atividades das aulas 01 a 08 (objetiva + prática + seeds PENDENTE)

**Próximo passo:** esperar a #243.2.

- **Nível:** PESADO — questões com gabarito.

### #243.4 — Atividades das aulas 09 a 16 (objetiva + prática + seeds PENDENTE)

**Próximo passo:** esperar a #243.3.

- **Nível:** PESADO — questões com gabarito.

### #243.5 — Aplicar os seeds no banco

**Próximo passo:** esperar a #243.4.

- **Nível:** PESADO — banco (só o Claude Code local).

### #243.6 — Aceite do usuário

- **Nível:** LEVE — aceite.
