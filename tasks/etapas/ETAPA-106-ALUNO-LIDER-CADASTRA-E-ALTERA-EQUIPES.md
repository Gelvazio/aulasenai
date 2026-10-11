> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 106 — Aluno líder (`usuario.lider` 1/0) cadastra e altera equipes (tarefa grande, aprovada em 2026-10-08 23:53)

Plano: [docs/aluno-lider-cadastra-equipes.md](docs/aluno-lider-cadastra-equipes.md). Decisões D1–D3 aprovadas como propostas.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 106.1 | SQL versionado `database/2026-10-08-usuario-lider-equipes.sql` | ✅ Concluído | 2026-10-08 23:53 | 7 políticas no arquivo |
| 106.2 | Aplicar pelo conector e conferir | ✅ Concluído | 2026-10-08 23:54 | 132 usuários com lider = 0; 7 políticas *_lider; 3 funções sem execução para anon |
| 106.3 | `docs/database.md` + relatório HTML | ✅ Concluído | 2026-10-08 23:54 | grep "lider" nos dois arquivos |
| 106.4 | Tela ALUNOS: coluna Líder (1/0) (`turmas-aluno-lider.js` novo, repositório, página, sugestões, `alunos.html`, CSS) + correção do CSS do formulário que se sobrepunha (`turmas-professor.css`, pedido do usuário) + `grant select (lider)` que faltava (erro "permission denied for table usuario" relatado pelo usuário) | ✅ Concluído | 2026-10-08 23:58:03 | `node --check`; grant conferido em `column_privileges` |
| 106.5 | Header: menu 👥 EQUIPES só para professor e aluno líder | ✅ Concluído | 2026-10-08 23:58:03 | `node --check js/header-usuario.js` |
| 106.6 | Modal/repositório de equipes no modo líder (turmas do aluno, alunos pelo RPC, sem 🗑️ de equipe) | ✅ Concluído | 2026-10-08 23:58:03 | `node --check` nos 3 JS; trigger `equipe_membro_preparar` é security definer |
| 106.7 | Regra no `CLAUDE.md` do projeto (`docs/regras/usuarios-turmas-paginas-professor.md`, versão + históricos) | ✅ Concluído | 2026-10-08 23:58:03 | grep "lider" na regra |
| 106.8 | Commits d3f40b5 (código, banco e regra) + complementar (SQL do grant, STATUS e plano) | ✅ Concluído | 2026-10-08 23:58:03 | git log |
| 106.10 | Pedido do usuário (2026-10-08 23:58:54): coluna Líder da tela ALUNOS vira interruptor ON/OFF (`.guia-interruptor` + texto ON/OFF) no lugar da lista 1/0 | ✅ Concluído | 2026-10-08 23:58:54 | `node --check`; leitura do código |
| 106.11 | Pedido do usuário (2026-10-08 23:59:44): **1 líder por turma** — `definir_lider_usuario` recusa ligar o líder se alguma turma do aluno já tem outro (SQL `database/2026-10-09-lider-unico-por-turma.sql`, aplicado pelo conector); regra, `docs/database.md` e relatório HTML | ✅ Concluído | 2026-10-08 23:59:44 | trava conferida no código da função; 0 turmas com mais de 1 líder; anon sem execução |
| 106.12 | Correção relatada pelo usuário (2026-10-09 00:01:37): "menu de equipes sumiu, mesmo sendo professor" — o botão só aparecia em página de matéria (e a barra de menu das atividades foi desligada na Etapa 104). Agora o **professor sempre vê 👥 EQUIPES** (header em todas as páginas); fora de uma matéria (ou matéria sem atividade no banco) o modal mostra a lista **Matéria**; o líder continua só em página de matéria (`js/header-usuario.js`, `menu-acao-equipes.js`, `equipes-modal.js`, `equipes-repositorio.js`; regra e histórico) | ✅ Concluído | 2026-10-09 00:01:37 | `node --check` nos 4 JS; leitura do código (sem navegador) |
| 106.9 | Aceite do usuário | ⬜ Pendente | — | — |
