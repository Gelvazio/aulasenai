## Etapa 328-d0739bde — CRUD de turmas com modal de edição e botão Professores

**Tarefa:** #201-d0739bde-aadc-4b89-84b0-16de29658ab2 · **Pedido em:** 2026-10-16 12:11 · **Criada por:** Claude Code (Opus 5.5) (local · main · s7)
**Pedido:** "NA TELA DE TURMA, http://127.0.0.1:5501/turmas.html, DEVE SER UM CRUD DA TABELA CRUD,
E O VINCULO TURMA PROFESSOR, DEVE VIRAR 1 ACAO NA LINHA DA TURMA, DEVE SER UM CRUD, COM CONSULTA
E ABRE MODAL PRA EDITAR TURMA, E PROFESSORES VINCULADOS NUM BOTAO DE NOME PROFESSORES"
**Objetivo:** `turmas.html` vira um CRUD da tabela `turma` (consulta + criar, editar no modal,
excluir) e o vínculo turma × professor vira o botão **Professores** na linha da turma.

### Escopo

- **Entra:**
  - **Banco** (SQL idempotente `database/2026-10-16-turma-crud-administrador.sql`, aplicado pelo
    conector): políticas `turma_insert_admin`, `turma_update_admin` e `turma_delete_admin` na
    `turma`, todas com `eh_professor_administrador()`; o **excluir** só aceita turma **vazia**
    (sem `turmaaluno`, sem `aluno.turma_codigo` e sem `equipe`), para não apagar alunos e equipes
    em cascata (os vínculos de professor saem junto); revogar `TRUNCATE` da `turma` para
    `authenticated` e `anon` e todos os privilégios de `anon` (hoje `anon` tem tudo). A leitura
    continua como está (`turma_select`).
  - **Tela `turmas.html`** (só Professor Administrador, como hoje): consulta das turmas (busca por
    código, nome, unidade, curso ou professor) e botão **➕ Nova turma**; cada linha com as ações
    **✏️ Editar**, **👥 Professores** e **🗑️ Excluir**; colunas Turma, Unidade, Curso,
    Turno/horário, Bloquear horário e Professores (quantidade).
  - **Modal da turma** (criar/editar): Código (só no cadastro), Nome, Turno, Horário (texto),
    Hora início, Hora fim, UC, Unidade, Curso e o ON/OFF **Bloquear horário**.
  - **Botão Professores**: o modal atual de vínculo vira a gestão dos professores da turma —
    lista, vincular (só quem ainda não está) e desvincular. O modal "editar vínculo" (trocar a
    turma) sai: trocar = desvincular e vincular.
  - Arquivos: `turmas.html`, `assets/js/turmas-professor-repositorio.js`,
    `assets/js/turmas-professor-pagina.js`, `assets/js/turmas-professor-modais.js`, novo
    `assets/js/turmas-dados-modal.js`, `assets/css/turmas-professor.css`; `docs/database.md`,
    `docs/relatorio_verificacao_database.html`, `docs/crud-turmas-administrador.md` e a regra em
    `docs/regras/usuarios-turmas-paginas-professor.md`.
- **Não entra:** líder da turma e favorito (têm telas próprias); turmas para professor comum
  (a página continua só do administrador; os demais professores seguem vendo só as turmas deles
  nas outras telas); mudar o código de uma turma existente.
- **Critério de pronto:** a página lista e busca as turmas; criar, editar e excluir gravam no
  banco; o botão Professores lista, vincula e desvincula; o banco recusa quem não é o
  administrador e a exclusão de turma com alunos/equipes; docs atualizados; `node --check`
  limpo; 1 commit + push; aceite do usuário.

### Riscos

- **Excluir turma apaga dados em cascata.** Plano B: a política só deixa excluir turma vazia;
  com alunos, a tela avisa "tire os alunos antes" (o banco recusa).
- **Outro professor gravar turma.** Plano B: as três políticas exigem
  `eh_professor_administrador()`; conferido por simulação em transação desfeita.
- **Revogar o `anon` quebrar alguma página pública.** Plano B: conferir antes no código se alguma
  página lê `turma` sem login; se ler, manter só o `SELECT` do `anon` (a política já exige
  `authenticated`, então hoje o `anon` não lê nada mesmo).

### Decisões

| Data | Decisão | Quem | Por quê |
|------|---------|------|---------|
| 2026-10-16 12:49 | Plano aprovado, inclusive o banco já aplicado ("Sim, eu aprovo o plano da #201 (etapa 328). Pode executar tudo, inclusive o banco já aplicado.") | Usuário (nesta sessão) | Aprovação exigida para tarefa grande |

### #201.1 — Plano na etapa e aprovação do usuário

**Próximo passo:** — (aprovado).

- **Nível:** PESADO — banco/RLS e permissões de professor
- **Descrição:** plano (escopo, riscos, subtarefas) e "sim" do usuário.
- **Entrega:** plano nesta etapa · **Verificação:** aprovação em 2026-10-16 12:49 (Decisões)

### #201.2 — Banco e tela do CRUD de turmas com o botão Professores

**Próximo passo:** — (entregue).

- **Nível:** PESADO — banco (RLS) e permissões do administrador
- **Descrição:** escopo acima (SQL, tela, modal, botão Professores, docs).
- **Entrega:** SQL `database/2026-10-16-turma-crud-administrador.sql` (migração
  `turma_crud_administrador_201`, aplicada pelo conector); `turmas.html`,
  `assets/js/turmas-dados-modal.js` (novo), `turmas-professor-pagina.js`, `-modais.js`,
  `-repositorio.js`, `assets/css/turmas-professor.css`; `docs/database.md`,
  `docs/relatorio_verificacao_database.html`, `docs/crud-turmas-administrador.md`,
  `docs/regras/usuarios-turmas-paginas-professor.md`, `docs/HISTORICO-REGRAS.md` (commit da entrega).
- **Verificação:** `pg_policies` com as 4 políticas da `turma`; privilégios: `anon` sem nada e
  `authenticated` sem TRUNCATE; simulação em transação desfeita (outro professor: insert
  recusado, update 0 linhas; administrador: insert ok, update 1, delete de turma com alunos 0,
  delete de turma vazia 1; TRUNCATE recusado); `node --check` nos 4 JS. Sem navegador: o
  professor testa a tela (2026-10-16 12:54).

### #201.3 — Aceite do usuário

**Próximo passo:** o professor testar a tela `turmas.html` e dar o aceite.

- **Nível:** LEVE — conferência do usuário

### #201.4 — Coluna Ações no lado direito

**Pedido em:** 2026-10-16 12:56 · **Pedido:** "AQUI,http://127.0.0.1:5501/turmas.html,AS ACOES,DEVEM FICAR DO
LADO DIREITO"

**Próximo passo:** — (entregue; aceite junto com a #201.3).

- **Nível:** MEDIO — JS de tela + HTML, 2 arquivos
- **Descrição:** na consulta de turmas, a coluna Ações (Editar, Professores, Excluir) passa da
  primeira para a última coluna.
- **Entrega:** `turmas.html` (cabeçalho) e `assets/js/turmas-professor-pagina.js`
  (`criarLinhaTurmaTp`) · **Verificação:** `node --check` limpo; cabeçalho e células na mesma
  ordem (Turma, Curso, Turno/horário, Bloquear horário, Professores, Ações). Sem navegador (2026-10-16 12:57).
