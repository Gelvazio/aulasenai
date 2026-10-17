## Etapa 154-58b81f3e — Duração dos vídeos da apostila de Fundamentos da Tecnologia (local)

**Tarefa:** #12 · **Pedido em:** 2026-10-08 · **Executor:** —
**Pedido:** A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/APOSTILA/` foi gerada **sem vídeos** (cada capítulo tem só a anotação "⏳ Vídeos pendentes"): o ambiente de nuvem bloqueia `www.youtube.com` e a duração não pôde ser conferida nos metadados (nada de duração inventada; máximo 15:00).
**Objetivo:** Vídeos reais, com duração conferida, em todos os capítulos.
**Próximo passo:** 12.1 — para cada capítulo (01 a 09), escolher de 1 a 4 vídeos em português, de canais educacionais
**Modelo (#12):** só Sonnet — nunca outro (#247)

> Etapa criada em 2026-10-13 na migração do quadro para fonte única (antes: bloco #12 do `TASKS.md`; texto do pedido sem alteração).

📌 Candidatos já levantados para o capítulo 01 (duração a conferir): SNABaP2iORg (História e evolução dos computadores), yMGm7cPCh6o (Evolução dos Computadores — Linha do Tempo), fYJl-7jRzuw (Manual do Mundo — Por onde vem a internet?), XHFfXJglFhY (Entenda... Cidadania Digital). Fazer na máquina local, com acesso ao YouTube.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 12.1 | Para cada capítulo (01 a 09), escolher de 1 a 4 vídeos em português, de canais educacionais | ⬜ Pendente | — | — |
| 12.2 | Conferir localmente título, canal e duração (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), descartando os de mais de 15:00 | ⬜ Pendente | — | — |
| 12.3 | Em `APOSTILA/CONTEUDO/CAPITULO-NN.md`, trocar "⏳ Vídeos pendentes" da seção `## Vídeos` pelos vídeos no formato `- [título exato](url) — mm:ss — canal` | ⬜ Pendente | — | — |
| 12.4 | Aumentar `versao_apostila` no `materia.json`, rodar `gerar_apostila.py <pasta da matéria> --markdown --forcar` e depois o HTML (conferência 100%) | ⬜ Pendente | — | — |
| 12.5 | Atualizar a coluna "Vídeos" do `APOSTILA/STATUS-APOSTILA.md` | ⬜ Pendente | — | — |
| 12.6 | Aceite do usuário | ⬜ Pendente | — | — |
