> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 87 — Nova turma Roberto Machado (QA LBTSN 2026/1 V1, código 124403) e usuários dos alunos (tarefa pequena, 2026-10-08)

Fonte: `MATERIAL-PADRAO-PROVAS-SENAI/Turma Roberto Machado - T5 Vespertino.pdf` (lista de presença, pedido do usuário). CPFs não copiados.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 87.1 | `scripts/LISTA-PRESENCA-ROBERTO-MACHADO-T5-TARDE.js` (fora do Git, LGPD): 10 alunos, e-mail `nome.sobrenome@senai.local`, senha inicial de 6 caracteres; local ROBERTO MACHADO, turno Tarde | ✅ Concluído | 2026-10-08 | `node --check`; `git check-ignore` confirma fora do Git; e-mails sem repetição nas outras listas e no `auth.users` (consulta de leitura); turma 124403 ainda não existe no banco |
| 87.2 | Lista carregada em `scripts/criarUsuariosBancoDados.html` | ✅ Concluído | 2026-10-08 | Leitura do HTML |
| 87.3 | Usuário grava no banco pela página (aba QA LBTSN 2026/1 V1 → Marcar todos → Gravar): cria turma, contas no Auth, `usuario`, `aluno` e `turmaaluno` | ⬜ Pendente | — | — |
