## Etapa 338-3c6cc913 — #211: Vincular turmas às matérias

**Tarefa:** #211-3c6cc913-7d2d-4eac-bbc3-88094817cc2d · **Pedido em:** 2026-10-16 19:15 ·
**Criada por:** Claude Code (Opus 5.5) (local · main · s15)
**Pedido:** "http://127.0.0.1:5501/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html,
aqui, deve ser listado no combo de turma, apenas a turma da materia ITIC, crie em turmas.html, um
menu aqui de nome Materias, e 1 tabela no banco de dados que eu possa vincular a turma a materia,
e desta forma, na materia so deve listar a turma da materia e nao todas" (com print do cabeçalho
de `turmas.html`, marcando o espaço à direita do título para o botão "Matérias").
**Objetivo:** cada matéria mostrar no combo de turma só as turmas vinculadas a ela, com o vínculo
cadastrado pelo professor administrador em `turmas.html`.

### Escopo

- **Entra:**
  1. Tabela nova `turma_materia` (`id`, `turma_codigo` → `turma.codigo`, `materia_id` →
     `materia.id`, `criado_em`, `criado_por`; único por turma + matéria), com RLS: todo usuário
     logado lê; só o Professor Administrador (`eh_professor_administrador()`) grava e apaga — o
     mesmo padrão da `turmaprofessor`. SQL idempotente em `database/` + `docs/database.md`.
  2. Vínculo inicial: ITIC (`materia.id` 25) com as turmas 135080 (AOPL M1) e 135081 (AOPL V1).
  3. `turmas.html`: botão **📚 Matérias** no cabeçalho azul (lugar marcado no print). Abre um modal:
     escolher a matéria → lista das turmas vinculadas (com botão remover) → combo "Vincular turma"
     (só as que ainda não estão) → Vincular. Mesmo jeito do modal "Professores".
  4. Combo **Turma:** do `ATIVIDADES/index.html` de **todas as matérias**
     (`assets/js/indice-turma-favorita.js`): mostra só as turmas vinculadas à matéria da página
     (e, para professor não administrador, só as dele entre essas).
- **Não entra:** outras telas com lista de turmas (progresso, correção etc.).

### Decisões

- **Aprovação:** plano, D1 e D2 aprovados pelo usuário em 2026-10-16 19:18 ("Sim, aprovo o
  plano da #211 com D1 e D2 como estão").


- **D1 — Matéria sem nenhum vínculo:** o combo continua mostrando **todas** as turmas (como hoje),
  para não esvaziar as outras matérias até você vincular. Com 1 vínculo ou mais, só as vinculadas.
- **D2 — Matéria da página:** pelo nome da pasta (`.../<MATERIA>/ATIVIDADES/`), do mesmo jeito que o
  `indice-aula-data.js` já faz.

### Riscos

- Turma favorita fora da matéria → o combo abre na primeira turma vinculada (plano B: nenhum
  dado muda; só a escolha inicial).
- Pasta com nome diferente do `materia.descricao` → não acha a matéria e cai no D1 (todas).

### Subtarefas planejadas (depois da aprovação)

- #211.2 — Tabela `turma_materia` + RLS + vínculo ITIC + `docs/database.md` (PESADO — banco)
- #211.3 — Botão e modal "Matérias" em `turmas.html` (MEDIO — tela)
- #211.4 — Filtro do combo "Turma:" pela matéria (MEDIO — JS)
- #211.5 — Aceite do usuário

### #211.1 — Levantamento e plano (tarefa grande: banco + tela)

**Próximo passo:** — (concluída)

- **Nível:** PESADO — banco (tabela nova + RLS) e várias partes ligadas
- **Descrição:** plano da tabela de vínculo, do botão "Matérias" em `turmas.html` e do filtro do
  combo de turma nas páginas de matéria.
- **Critérios de aceitação:** plano escrito nesta etapa e aprovado pelo usuário.
- **Entrega:** plano nesta etapa · **Verificação:** aprovação registrada em Decisões.

### #211.2 — Tabela `turma_materia` + RLS + vínculo ITIC

**Próximo passo:** — (concluída)

- **Nível:** PESADO — tabela nova e RLS no banco
- **Entrega:** `database/2026-10-16-turma-materia.sql` aplicado pelo conector (migração
  `turma_materia`), `docs/database.md` e `docs/relatorio_verificacao_database.html`.
- **Verificação:** consulta no banco — RLS ligado, 3 políticas (select, insert_admin,
  delete_admin), `anon` sem privilégio, 2 vínculos (25 × 135080 e 135081); simulação em transação
  desfeita: professor não administrador tem o insert recusado e lê as 2 linhas.

### #211.3 — Botão e modal "Matérias" em `turmas.html`

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — tela (HTML + JS), até 3 arquivos
- **Entrega:** `turmas.html` (botão 📚 Matérias no cabeçalho + modal), novo
  `assets/js/turmas-materias-modal.js`, `assets/js/turmas-professor-repositorio.js` (listar,
  vincular e desvincular na `turma_materia`), `assets/js/turmas-professor-pagina.js` (carrega
  matérias e vínculos, mostra o botão só ao administrador) e `assets/css/turmas-professor.css`.
- **Verificação:** `node --check` nos 3 JS; linhas novas ≤ 100 caracteres; consulta no banco:
  `materia_select` libera a leitura e `materia.curso_id` tem FK para o `curso` (join do nome).
  Visual no navegador: fica para o aceite do usuário (sem navegador por regra).

### #211.4 — Combo "Turma:" filtrado pela matéria

**Próximo passo:** filtrar `listarTurmasVisiveisFavorita` pela `turma_materia` da matéria da pasta.

- **Nível:** MEDIO — JS de 1 arquivo (`assets/js/indice-turma-favorita.js`)

### #211.5 — Aceite do usuário

**Próximo passo:** usuário conferir `turmas.html` (botão Matérias) e o combo do índice ITIC.

- **Nível:** LEVE — conferência do usuário
