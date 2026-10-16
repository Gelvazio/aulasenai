## Etapa 155-e3d89d81 — Duração dos vídeos da apostila de Exploração de Carreiras (local)

**Tarefa:** #14 · **Pedido em:** 2026-10-08 · **Executor:** —
**Pedido:** A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/APOSTILA/` (9 capítulos) tem **28 vídeos com a duração `a conferir`**: a sessão em nuvem não acessa o YouTube e o usuário pediu para seguir e conferir depois, localmente.
**Objetivo:** Duração conferida de todos os vídeos (ou vídeo trocado).
**Próximo passo:** 14.1 — conferir cada vídeo de `APOSTILA/RASCUNHOS/VIDEOS-A-CONFERIR.md` pelos metadados (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), sem navegador

> Etapa criada em 2026-10-13 na migração do quadro para fonte única (antes: bloco #14 do `TASKS.md`; texto do pedido sem alteração).

Fazer na máquina local, com acesso ao YouTube (registrada na branch de origem como #11).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 14.1 | Conferir cada vídeo de `APOSTILA/RASCUNHOS/VIDEOS-A-CONFERIR.md` pelos metadados (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), sem navegador | ⬜ Pendente | — | — |
| 14.2 | Nos `APOSTILA/CONTEUDO/CAPITULO-NN.md`, trocar `a conferir` pela duração (`mm:ss`) e acrescentar ` — <canal>` no fim da linha | ⬜ Pendente | — | — |
| 14.3 | Apagar os vídeos com mais de 15:00 ou fora do tema (cada capítulo precisa de ao menos 1) | ⬜ Pendente | — | — |
| 14.4 | Aumentar `versao_apostila` no `materia.json` (1.0 → 1.1), rodar `gerar_apostila.py <pasta> --markdown --forcar` e depois o HTML (conferência 100%) | ⬜ Pendente | — | — |
| 14.5 | Atualizar `APOSTILA/STATUS-APOSTILA.md` | ⬜ Pendente | — | — |
| 14.6 | Aceite do usuário | ⬜ Pendente | — | — |
