# 🕸️ Graphify

Segue a regra global `C:/fontes/rules-ai/regras/graphify.md` (decisão C11, 2026-10-16); substitui
o "só quando o usuário pedir" de 2026-10-09.

- Skill: `.claude/skills/graphify/SKILL.md`. Gatilho `/graphify`: invocar a skill antes de
  qualquer outra coisa. Python: sempre `C:\Python314\python.exe`.
- ✅ **Uma única vez no início de cada conversa nova**, antes do primeiro pedido: atualizar o
  grafo (`C:\Python314\python.exe -m graphify update .` na raiz), sem perguntar. Depois **ler e
  analisar** `graphify-out/GRAPH_REPORT.md` antes de responder (citar o arquivo de origem; dizer o
  que o grafo não cobre).
- ⛔ Não rodar de novo nos pedidos seguintes da mesma conversa, nem ao finalizar tarefas, nem
  depois de commits. Conversa já em andamento quando a regra mudou: esperar a próxima.
- `graphify-out/` fica fora do Git. Se o update falhar, avisar o usuário e seguir sem o relatório.
