# 🕸️ Graphify

Segue a regra global `C:/fontes/rules-ai/regras/graphify.md` (C25, 2026-10-17, que substituiu a
C11): ler o `graphify-out/GRAPH_REPORT.md` **antes de criar** e **antes de executar** cada
tarefa, e rodar o update **no início da conversa** e **ao fim de cada tarefa concluída e retirada
do quadro** (linha da mãe movida para `tasks/task_complete.md`, depois do commit + push). Aqui só
fica o que é deste projeto.

- Skill: `.claude/skills/graphify/SKILL.md`. Gatilho `/graphify`: invocar a skill antes de
  qualquer outra coisa.
- Comando do update, na raiz: `C:\Python314\python.exe -m graphify update .` (na nuvem,
  `python3 -m graphify update .`). Sem perguntar.
- O grafo passa de 5.000 nós: o update não gera o `graph.html` (normal); vale o `graph.json` e o
  `GRAPH_REPORT.md`.
- `graphify-out/` fica fora do Git. Se o update falhar, avisar o usuário e seguir sem o relatório.
