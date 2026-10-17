## Etapa 377-2680fc00 — #250: Botão "Gerenciar Aulas" (CRUD de aulas em modal)

**Tarefa:** #250-2680fc00-427c-43ed-a301-a4ce4c83b4e0 · **Pedido em:** 2026-10-17 10:05 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o)
**Pedido:** "coloque um botao ali de nome Gerenciar Aulas, que deve abrir um modal, que seja um CRUD
de aulas, listando as aulas e com opção de editar, excluir, inserir, ao clicar nas acoes deve abrir
novo modal com a opção completa do CRUD" (imagem: barra com "Turma:" e "Turma favorita"; o botão
vai no espaço vazio à esquerda)
**Objetivo:** o professor gerencia as aulas da matéria (listar, inserir, editar, excluir) sem sair
do índice das atividades.

> ⚠️ **Tarefa grande** (banco e permissões do professor, várias partes): plano na #250.1 e
> **"sim"** do usuário antes da #250.2.

### Riscos

| Risco | Plano B |
|---|---|
| A #249.1 (frente local · main · s18) mexe no card da aula do mesmo índice | Arquivos próprios para o CRUD; pull antes de cada commit |
| RLS da tabela `aulas` pode não deixar o professor inserir/excluir | Subtarefa de banco separada, só para o Claude Code local |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 10:30 | Plano aprovado. **Q1 = sim:** excluir é lógico (`excluido = 1`, só o Professor Administrador). **Q2 = não:** a aula nova entra no banco **e já aparece como card no índice** na hora, mesmo sem atividade; depois o professor põe atividade ou link de slide nela | Usuário | "1-sim, 2-nao, entra no banco e no card…" |
| 2026-10-17 10:31 | Escopo da #250.2 cresce com a Q2: card das aulas do banco sem página no índice (com 🗂️ atividades e ✏️ editar) e campo **"Link dos slides"** no formulário (grava `aulas.conteudo.slides`, JSONB que já existe — sem mudar o banco); o card mostra "📕 Slides" quando o link existe | Claude Code (Opus 5.5) | Decorre da Q2 |

### #250.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** — (entregue; plano aprovado em 2026-10-17 10:30).

- **Nível:** PESADO — permissões do professor (RLS/JWT) e várias partes ligadas.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o).

**Levantamento (2026-10-17 10:15):**

| Onde | O que tem |
|---|---|
| Barra da imagem | `assets/js/indice-turma-favorita.js` monta "Turma:" + "⭐ Turma favorita" em todo `ATIVIDADES/index.html`, só para o professor; é carregada pelo `atividades-crud-modal.js` (que já entra em todos os índices — nenhum HTML precisa ser regerado) |
| "✏️ Editar aula" (por card) | `indice-aula-modal.js`: todos os campos de `aulas` (`CAMPOS_MODAL_AULA`), grava por `gravarAulaCard` (update); o "🗑️ Excluir aula" saiu dele na #219 |
| Excluir aula no banco | **lógico**: `aulas.excluido = 1` pela função `excluir_aula(p_aula)`, só Professor Administrador (`database/2026-10-06-aulas-excluido.sql`); o card some do índice |
| Inserir aula | a tela antiga `js/aulas.js` faz `sbPost("aulas")`; no repositório **não há** o SQL da política de insert de `aulas` — só dá para confirmar no banco (frente local) |
| Matéria da página | `descobrirMateriaDoIndice` (`indice-aula-data.js`) e `listarAulasDaMateriaCard` (`indice-aula-repositorio.js`) |

**Plano proposto:**
1. **#250.2 (PESADO, nuvem):** arquivos novos, sem mexer nos da #249.1:
   `assets/js/indice-gerenciar-aulas-repositorio.js` (listar as aulas da matéria sem as excluídas,
   inserir, atualizar, excluir pela `excluir_aula`), `assets/js/indice-gerenciar-aulas.js` (botão
   **📚 Gerenciar Aulas** no início da barra da turma, só professor; **modal 1** = lista com Nº,
   título, ativa, visível e ações ✏️ Editar · 🗑️ Excluir + **➕ Nova aula**; **modal 2** = formulário
   completo com os mesmos campos do "Editar aula", nos modos Inserir / Editar / Excluir (mostra os
   dados e pede confirmação)), `assets/css/indice-gerenciar-aulas.css` (tokens); carregar os 2 JS
   e o CSS pelo `atividades-crud-modal.js`; avisos por `popup.js`; documentação em `docs/regras/`.
   Depois de gravar: a lista recarrega e os cards do índice são redesenhados.
2. **#250.3 (PESADO, só Claude Code local):** conferir no banco a política de insert de `aulas`
   para o professor; se faltar, criar (SQL idempotente) e testar inserir/excluir com professor e
   administrador.

**Perguntas (Q1–Q2):**
- **Q1 Excluir:** lógico, como hoje (`excluido = 1`, só o Professor Administrador; os outros
  professores veem o 🗑️ desligado), recomendado — ou apagar a linha de verdade (as atividades da
  aula ficariam sem aula)?
- **Q2 Aula nova:** entra no banco na hora, mas só ganha card no índice quando tiver atividade
  com página nesta pasta (o índice é montado pelas páginas). Está certo assim?

### #250.2 — Botão e modais do CRUD de aulas

**Próximo passo:** — (entregue).

- **Nível:** PESADO — tela ligada a permissões do professor, mais de 3 arquivos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o).
- **Entrega:** arquivos novos `assets/js/indice-gerenciar-aulas-repositorio.js` (listar sem as
  excluídas, inserir, editar, excluir pela `excluir_aula`, conferir administrador),
  `indice-gerenciar-aulas.js` (botão "📚 Gerenciar Aulas" no começo da barra "Turma:", só
  professor; modal 1 com a lista, ✏️ Editar, 🗑️ Excluir — desligado para quem não é
  administrador — e ➕ Nova aula; fechar depois de mudar recarrega a página),
  `indice-gerenciar-aulas-formulario.js` (modal 2: campos do "✏️ Editar aula" + "Link dos slides"
  em `aulas.conteudo.slides`, modos Inserir/Editar/Excluir; aula nova nasce ativa e visível),
  `indice-gerenciar-aulas-cards.js` (aula só do banco vira card na hora, com borda tracejada, e
  entra no fluxo do "✏️ Editar aula", bloqueio e atividades vinculadas; botão "📕 Slides" em
  qualquer card com link) e `assets/css/indice-gerenciar-aulas.css`. Alterados: `indice-aula-data.js`
  (chama os cards do banco e desenha o botão dos slides; índice sem card do HTML também mostra as
  aulas do banco) e `atividades-crud-modal.js` (carrega os arquivos novos na ordem certa).
  Regra em `docs/regras/atividades.md` (índices); histórico.
- **Verificação:** `node --check` nos 6 JS; linhas ≤ 100 e funções ≤ 45 nos arquivos novos;
  leitura do fluxo (ordem de carga, eventos da barra da turma, RLS/JWT pelo `sbH` com o token do
  usuário, `excluir_aula` devolve `boolean`). ⚠️ **Sem navegador:** conferir na tela (botão,
  modais, card novo); inserir depende da política de insert da `aulas` (#250.3, frente local).

### #250.3 — Política de insert da `aulas` no banco (só local)

**Próximo passo:** Claude Code local: consultar as políticas de `aulas` (`pg_policies`); se não
houver insert para o professor, criar SQL idempotente em `database/` (professor insere; aluno e
anon não), aplicar e testar inserir pelo "📚 Gerenciar Aulas" com professor e excluir com o
administrador; registrar em `docs/database.md`.

- **Nível:** PESADO — banco (RLS); só o Claude Code local (`multiplas-ias.md`).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
