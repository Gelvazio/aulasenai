## Etapa 300-036ea1c3 — Esconder o card "Avaliação — Média Final"

**Tarefa:** #173-036ea1c3-6ccf-47a1-bb3a-54af7e6fccf3 · **Pedido em:** 2026-10-15 13:40 · **Executor:** Claude Code (local · main)
**Pedido:** "neste card, esconda ele por enquanto, apenas hide" (imagem do card MÉDIA FINAL — "Avaliação — Média Final (100 pontos)", com "Ver composição da nota" e "CADASTRAR ATIVIDADES").
**Objetivo:** ocultar o card da Média Final na tela, sem apagar o código nem os dados, para poder mostrá-lo de novo depois.
**Próximo passo:** 173.6 — aguardar o aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 173.1 | Criar a TASK e a etapa no quadro (commit + push) | ✅ Concluído | 2026-10-15 13:40 | commit "criar #173" no remoto |
| 173.2 | Reservar a tarefa para a frente local · main (commit + push) | ✅ Concluído | 2026-10-15 13:40 | "Em uso por" preenchido no remoto |
| 173.3 | Localizar onde o card é montado (página e script) | ✅ Concluído | 2026-10-15 13:42 | card escrito à mão em `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html` (texto "10 atividades (30) · 2 provas objetivas (40) · prova prática (30)" igual ao da imagem); nenhum gerador `.py` escreve esse card |
| 173.4 | Esconder o card (só ocultar, sem apagar código nem dados) | ✅ Concluído | 2026-10-15 13:42 | atributo `hidden` no `<article>` + comentário; `assets/css/indice-atividades.css` já tem `.grade > article[hidden] { display: none; }` (vence o `display: flex` de `.aula`); nenhum script da página tira o `hidden` dos cards; sem JS alterado (sem `node --check`); sem navegador (regra do projeto) |
| 173.5 | Encerrar: quadro, visualizador, 1 commit + push na `main` | ✅ Concluído | 2026-10-15 13:42 | `git push` sem erro |
| 173.6 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
