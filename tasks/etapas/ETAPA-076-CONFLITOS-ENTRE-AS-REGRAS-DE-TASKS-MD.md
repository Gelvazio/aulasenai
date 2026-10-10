> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 76 — Conflitos entre as regras de TASKS.md, documentação e sessões (pedida em 2026-10-08)

Levantamento feito no chat (6 conflitos); correção **um por vez, com confirmação do usuário**.
Arquivos globais (`C:\Users\gelva\.claude\...`, skill `documentacao-padrao`) ficam fora do Git do projeto.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 76.1 | Exceção das tarefas pequenas também no `CLAUDE-DOCS-BEFORE-EVERY-TASK.md` e na skill `documentacao-padrao` (antes: "sem exceção") | ✅ Concluído | 2026-10-08 08:09 | `grep` mostra "TAREFA GRANDE" e a exceção nos dois arquivos |
| 76.2 | Testes e navegador nas regras de documentação → verificação por leitura/`node`/banco/terminal | ✅ Concluído | 2026-10-08 08:10 | `grep` sem "Testar no navegador" nem "testadas"; skill sem "como testar" |
| 76.3 | Fonte única: `STATUS.md` × `TASKS.md` × `SESSOES-CLAUDE/` — escolha do usuário: "STATUS.md manda; os outros apontam" | ✅ Concluído | 2026-10-08 08:11 | Regra no CLAUDE.md, seção "📌 Tarefas do TASKS.md" no STATUS.md com as 8 tarefas, aviso no topo do TASKS.md |
| 76.4 | Log da sessão: obrigatório × só com SIM — escolha do usuário: "Só com SIM" | ✅ Concluído | 2026-10-08 08:14 | CLAUDE.md sem a obrigação de gravar a cada pedido |
| 76.5 | Frase final da tarefa (global) × pergunta do log (projeto) | ✅ Concluído | 2026-10-08 08:14 | CLAUDE.md global com a exceção nas 2 seções (fora do Git) |
| 76.6 | Confirmação antes de comando mutável × Git sem perguntar | ✅ Concluído | 2026-10-08 08:14 | Item 9 do CLAUDE.md global com a exceção (fora do Git) |
| 76.7 | Aceite do usuário | 👀 Aguardando validação | — | — |
