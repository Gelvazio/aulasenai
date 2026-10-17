## Etapa 245-0af6f282 — Pasta ATIVIDADE-SEXTA-FEIRA da ITIC só com as 3 páginas

**Tarefa:** #118-0af6f282-65b9-4872 · **Pedido em:** 2026-10-14 13:01 · **Executor:** Claude Code (local · main)
**Pedido:** "MAS DEVE TER APENAS ESTES 3 ARQUIVOS AQUI: ...\ATIVIDADES\ATIVIDADE-SEXTA-FEIRA" — respostas: ficam as 3 páginas HTML; o que sair é movido (não apagado).
**Objetivo:** a pasta `ATIVIDADE-SEXTA-FEIRA/` fica só com as 3 páginas HTML; as fontes (questões e gabarito da discursiva) vão para `ATIVIDADES/CONTEUDO/`, junto das fontes das outras atividades.
**Próximo passo:** 118.3 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 118.1 | `git mv` dos 4 Markdowns de `ATIVIDADE-SEXTA-FEIRA/CONTEUDO/` para `ATIVIDADES/CONTEUDO/` (sem nome repetido) e remoção da pasta vazia | ✅ Concluído | 2026-10-14 13:01 | `ls` da pasta: só os 3 HTML. Gabarito e `*QUESTOES.md` continuam fora do site (`.vercelignore` vale para qualquer pasta) |
| 118.2 | Caminhos atualizados em `scripts/gerar-seed-atividades.py`, `STATUS-ATIVIDADES.md` e `STATUS_MATERIA.md` (etapas e docs antigos ficam como histórico) | ✅ Concluído | 2026-10-14 13:01 | Busca: nenhum caminho antigo nesses arquivos |
| 118.3 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
