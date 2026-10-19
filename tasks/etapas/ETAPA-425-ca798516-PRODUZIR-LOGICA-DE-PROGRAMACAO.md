## Etapa 425-ca798516 — #296: produzir por completo a matéria LOGICA-DE-PROGRAMACAO

**Tarefa:** #296-ca798516-1e7f-44ae-8644-b50420589885 · **Pedido em:** 2026-10-19 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "CRIE 1 TAREFA PRA FAZER POR COMPLETO A AULA DA PASTA `MATERIAIS/TECNICO-INFORMATICA-INTERNET/LOGICA-DE-PROGRAMACAO`"
**Objetivo:** produzir a matéria LOGICA-DE-PROGRAMACAO (32 aulas de 4 h = 128 h) com todas as peças
do padrão: `materia.json`, aulas em `CONTEUDO/`, atividades no banco, apostila e os status.

> **Leitura do pedido:** "a aula" foi lido como **a matéria inteira**, porque a pasta ainda não tem
> nenhuma aula pronta (`AULAS/STATUS-AULAS.md` mostra 32 aulas ⬜). Se o usuário quis só **uma**
> aula, esta etapa deve ser reduzida antes do "sim".

### Escopo
- **Entra:** a ementa ao padrão de tamanho; `materia.json`; 32 aulas em `CONTEUDO/`; atividades
  (objetiva de 50 questões e prática de 10 questões × 3 tópicos por aula) no banco; apostila em
  Markdown completo e HTML; status da matéria e quadro.
- **Não entra:** slides (regra 11 do `AGENTS.md`: a IA não gera slides de aula); navegador e
  testes automatizados (`testes-validacao.md`); PDF da apostila (sai só com pedido).
- **Critério de pronto:** as 5 peças da matéria ✅ no `STATUS_MATERIA.md` (regerado pelo script),
  aulas 01–32 com a linha ✅ em `AULAS/STATUS-AULAS.md`, seeds CONCLUÍDO e commit + push na `main`.

### Riscos
- **Ementa fora do padrão** (`STATUS-EMENTAS.md`: 5.913 caracteres, o padrão é 14.800–14.950):
  expandir antes de gerar as aulas. Plano B: pedir ao usuário o texto que falta.
- **Volume:** 32 aulas, 32 objetivas e 32 práticas. Por isso cada aula sai numa subtarefa própria
  na etapa de execução, uma por vez, com validação do usuário antes da próxima.
- **Conteúdo sem revisão de professor** (checklist do `STATUS-EMENTAS.md`): fica como pendência.

### Decisões
- 2026-10-19 — Claude Code (Haiku 5.5): tarefa grande (banco, várias partes, mudança em massa) →
  plano nesta etapa e aguarda o "sim" do usuário. Nenhuma subtarefa é executada antes disso.
- 2026-10-19 14:37 — Gelvazio (usuário): "Sim, aprovo o plano da #296." Plano aprovado como está,
  com a leitura de "a aula" = matéria inteira. Próximo passo: #296.1 (PESADO, só Opus 5.5+/Fable).

### #296.1 — Expandir a ementa ao padrão e criar o `materia.json`

**Próximo passo:** ler a `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md` e expandir a
`EMENTA-CHALKIE-AI.md` até 14.800–14.950 caracteres, depois montar o `materia.json` (capacidades,
conhecimentos e plano das 32 aulas).

- **Nível:** PESADO — mais de 3 arquivos ligados e mudança em massa (32 aulas no plano).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** expandir a ementa; criar `materia.json` com o plano de aulas (1 aula = 1 capítulo)
  seguindo `apostilas.md`.
- **Critérios de aceitação:** ementa dentro do padrão; `materia.json` com 32 aulas, cada uma com
  tema, domínios, capacidades, indicadores e atividade; `node --check` e leitura do JSON.
- **Entrega:** — · **Verificação:** —

### #296.2 — Gerar as 32 aulas em `CONTEUDO/`

**Próximo passo:** depois do #296.1, gerar a aula 01 em `CONTEUDO/AULA-01-<DESCRICAO>.md`, pedir a
validação do usuário e só então seguir para a 02.

- **Nível:** PESADO — mudança em massa (32 arquivos) e validação por aula.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** uma aula por vez, seguindo `materias-global.md` (1 aula = 4 h) e `docs-antes-de-editar.md`.
- **Critérios de aceitação:** 32 arquivos em `CONTEUDO/`; linha ✅ de cada aula em `AULAS/STATUS-AULAS.md`.
- **Entrega:** — · **Verificação:** —

### #296.3 — Atividades no banco: objetiva e prática de cada aula

**Próximo passo:** depois do #296.2, montar as atividades da aula 01 (objetiva 50 questões e
prática 10 × 3), aplicar o seed no Supabase, conferir o md5 e registrar em `database/SEEDS-APLICADOS.md`.

- **Nível:** PESADO — banco (seeds, RLS) e gabarito fora do site.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** atividades por aula, sem empresa fictícia ("Você como aluno consultor").
- **Critérios de aceitação:** seeds CONCLUÍDO em `SEEDS-APLICADOS.md` para as 32 aulas; gabarito só no banco.
- **Entrega:** — · **Verificação:** —

### #296.4 — Apostila (Markdown completo e HTML)

**Próximo passo:** depois dos #296.2 e #296.3, montar a apostila a partir das aulas, em
`APOSTILA/APOSTILA-LOGICA-DE-PROGRAMACAO.md` e depois o HTML.

- **Nível:** PESADO — apostila de 32 capítulos, sem atividades nem perguntas (`apostilas.md`).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** Markdown completo primeiro; HTML só no final; identificação com autor e versão.
- **Critérios de aceitação:** `APOSTILA/APOSTILA-*.md` e `.html` presentes; `STATUS-APOSTILA.md` ✅.
- **Entrega:** — · **Verificação:** —

### #296.5 — Fechamento: status, quadro e commit + push

**Próximo passo:** depois dos #296.1 a #296.4, regerar `STATUS_MATERIA.md` pelo script
`scripts/status-materias/gerar_status_materia.py`, atualizar `STATUS-EMENTAS.md`, o quadro e o
visualizador, e fazer commit + push na `main`.

- **Nível:** LEVE — só `.md` e a saída de script, sem lógica nova.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** fechar a matéria, sem mudar o conteúdo já aprovado.
- **Critérios de aceitação:** `STATUS_MATERIA.md` com as peças ✅; quadro com a mãe ✅ movida
  para `task_complete.md`; commit + push feitos.
- **Entrega:** — · **Verificação:** —
