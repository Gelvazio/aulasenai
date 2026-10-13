> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 67 — Vídeos na apostila de Reforço de Linguagens + identificação (tarefa pequena, 2026-10-07)

**Tarefa:** #11 (conferir a duração dos vídeos na máquina local)
**Próximo passo:** 67.4 — conferir a duração dos 29 vídeos na máquina local (passos no fim desta etapa).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 67.1 | 29 vídeos reais (busca na web; 2 a 3 por capítulo) com duração "a conferir" (YouTube bloqueado na nuvem; decisão do usuário) | ✅ Concluído | 2026-10-07 20:50 | HTML com 29 caixas de vídeo e o aviso "duração a conferir pelo professor" |
| 67.2 | Gerador aceita `a conferir` e não junta mais a linha seguinte ao canal de vídeo sem canal | ✅ Concluído | 2026-10-07 20:50 | ITIC e TF continuam lendo os mesmos vídeos |
| 67.3 | Merge da `main` (sem conflitos) e identificação da apostila: Gelvazio Camargo · versão 1.0 · data e hora | ✅ Concluído | 2026-10-07 20:50 | Conferência 100% · `main` em `e5972a9` |
| 67.4 | Aceite do usuário: conferir a duração de cada vídeo (trocar `a conferir` por `mm:ss` até 15 min ou apagar a linha) | ⬜ Pendente | — | — |
| 67.5 | Anotação "⏳ CONFERIR LOCALMENTE" nas seções de vídeos (capítulos e Markdown completo, fora do HTML) e tarefa #11 no `TASKS.md` para conferir a duração no ambiente local | ✅ Concluído | 2026-10-08 | Conferência 138/138; HTML sem a anotação |

### Pedido e descrição (vindos do `TASKS.md` em 2026-10-13, sem alteração)

**Adicionada em:** 2026-10-08

A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/APOSTILA/` tem **29 vídeos** (2 a 3
por capítulo) com a duração `a conferir`: na nuvem o YouTube estava bloqueado e a duração não pôde
ser lida. Cada seção "Vídeos" tem a anotação "⏳ CONFERIR LOCALMENTE (TASKS.md #11)".

- [ ] Para cada vídeo de `APOSTILA/CONTEUDO/CAPITULO-01.md` a `CAPITULO-10.md`, ler a duração
  pelos metadados (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), sem navegador.
- [ ] Até 15:00 → trocar `a conferir` por `mm:ss` (e completar o canal, se faltar); acima de
  15:00 ou vídeo indisponível → apagar a linha (e, se o capítulo ficar sem vídeo, buscar outro).
- [ ] Remover a anotação "⏳ CONFERIR LOCALMENTE" dos capítulos e do Markdown completo.
- [ ] Aumentar `versao_apostila` no `materia.json` (1.0 → 1.1), rodar
  `gerar_apostila.py <pasta> --markdown --forcar` e depois o HTML (conferência 100%).
- [ ] Atualizar `APOSTILA/STATUS-APOSTILA.md` (coluna Vídeos) e o `STATUS.md` (item 67.4).
- [ ] Commit (no local, o push é do usuário).
