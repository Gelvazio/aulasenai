## Etapa 287-8c65539e — Depois de entregar, o aluno não vê mais as próprias respostas até o gabarito ser liberado (regra global das práticas)

**Tarefa:** #160-8c65539e-c505-44d3-8e5a · **Pedido em:** 2026-10-14 20:11 · **Executor:** Claude Code (local · main)
**Pedido:** "apos 1 aluno entregar, ele nao deve mais ver a resposta da pergunta dele, na prova pratica, so pode voltar a ver apos o professor liberar o gabarito" + "e nas atividades praticas, anote esta regra de forma global"
**Objetivo:** na prova prática, o aluno que já entregou deixa de ver as respostas dele e só volta a vê-las depois que o professor liberar o gabarito; a regra fica anotada como regra global das atividades práticas.
**Próximo passo:** 287.4 — usuário entrar como aluno que já entregou, em uma prática sem gabarito liberado, e conferir que as respostas não aparecem.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 287.1 | Já existia, só em páginas com o campo "Ocultar respostas após entrega"; a regra pedida é para todas | ✅ Concluído | 2026-10-14 20:13 | leitura de `respostas-discursivas-banco.js` e `avaliacao-discursiva.js` |
| 287.2 | Regra global: sem depender do campo, o aluno que entregou e sem gabarito liberado não tem as respostas lidas nem mostradas (`respostas-discursivas-banco.js`, `avaliacao-discursiva.js`). Escopo: avaliações discursivas; é regra de tela (o RLS não muda) | ✅ Concluído | 2026-10-14 20:13 | `node --check`; revisão do código (sem navegador) |
| 287.3 | Regra global anotada em `docs/regras/atividades.md`, `docs/REGRAS-ATIVIDADE-PRATICA.md`, `.claude/rules/atividades-banco.md`, histórico e visualizador | ✅ Concluído | 2026-10-14 20:13 | arquivos atualizados |
| 287.4 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
