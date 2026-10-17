## Etapa 307-cd79916d — ITIC: "Exportar Meu Gabarito" no topo, ao lado de "Exportar PDF da Atividade"

**Tarefa:** #180-cd79916d-539d-4dfc-a519-7f0cde9029cb · **Pedido em:** 2026-10-15 15:58 · **Executor:** Claude Code (Opus 5.5) (local · main · s3)
**Pedido:** "coloque o botao *Exportar Meu Gabarito* em cima ao lado de Exportar PDF da Atividade"
(alcance escolhido pelo usuário: só a matéria Introdução às TIC)
**Objetivo:** nas atividades de Introdução às TIC, o aluno achar o botão "📄 Exportar Meu
Gabarito" no topo, junto do "Exportar PDF da Atividade".
**Próximo passo:** 180.3 — 👀 o usuário, logado como aluno, abre uma objetiva de ITIC e confere
o "📄 Exportar Meu Gabarito" no topo, ao lado do "📥 Exportar PDF (atividade completa)".

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 180.1 | Levantar onde os dois botões ficam hoje nas páginas de ITIC | ✅ Concluído | 2026-10-15 | Objetivas: "Meu Gabarito" na `.folha-respostas` (fim) e "Exportar PDF" na `.export-bar` (topo) — 15 páginas. Práticas/discursivas: barra criada por `exportar-pdf-discursiva.js` e botão no painel, que é refeito na entrega; ficaram de fora (risco de o botão ficar desativado depois de entregar) |
| 180.2 | Mover o "Exportar Meu Gabarito" para o topo, ao lado do "Exportar PDF da Atividade" (só ITIC) | ✅ Concluído | 2026-10-15 | `respostas-atividade.js` (`obterDestinoMeuGabarito`, por `data-meu-gabarito-no-topo="sim"`), CSS em `minhas-respostas.css`, atributo nas 15 objetivas de ITIC, regra em `docs/regras/atividades.md`; `node --check` ok; `exportar-word.js` só duplica botões por ID (não pega o novo); sem navegador (regra) |
| 180.3 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
