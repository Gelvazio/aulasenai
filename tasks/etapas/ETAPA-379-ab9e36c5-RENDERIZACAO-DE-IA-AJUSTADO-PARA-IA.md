## Etapa 379-ab9e36c5 — #252: `RENDERIZACAO-DE-IA.md` ajustado para a IA

**Tarefa:** #252-ab9e36c5-f79d-4cd3-98af-f87d748e95ad · **Pedido em:** 2026-10-17 10:58 · **Criada por:** Claude Code (Opus 5.5) (local · main · s19)
**Pedido:** "leia, RENDERIZACAO-DE-IA.md e deixe ajustado pra ia"
**Objetivo:** transformar a lista solta de bibliotecas e ferramentas de `tasks/RENDERIZACAO-DE-IA.md`
num documento de referência que uma IA consiga ler e usar: propósito claro, estrutura padronizada
por ferramenta e quando usar (ou não) cada uma.

### #252.1 — Reorganizar o `RENDERIZACAO-DE-IA.md` como referência para a IA

**Próximo passo:** — (entregue em 2026-10-17 11:05).

- **Nível:** LEVE — só um arquivo `.md`, sem código, banco ou segurança.
- **Modelo:** só Haiku — nunca outro (executa o `executor-leve`, líder Opus 5.5).
- **Descrição:** manter todo o conteúdo atual (8 ferramentas em 2 grupos) e reorganizar: título,
  "Para que serve este documento" (orientar a IA na escolha da ferramenta), "Como a IA deve usar",
  e uma tabela por grupo com Ferramenta · Linguagem/plataforma · Para que serve · Quando usar ·
  Quando não usar. Português correto, linhas ≤ 100 caracteres, sem inventar versões, preços ou
  recursos que não estejam no texto original (só o que é conhecimento geral e seguro).
- **Critérios de aceitação:** as 8 ferramentas continuam no arquivo; estrutura acima presente;
  Markdown válido; sem empresa fictícia.
- **Entrega:** commit "docs(tasks): RENDERIZACAO-DE-IA.md ajustado para a IA (#252.1)" — arquivo
  reescrito com "Para que serve", "Como a IA deve usar", duas tabelas (Ferramenta · Linguagem ·
  Para que serve · Quando usar · Quando não usar) e "Resumo rápido de escolha".
- **Executor:** `executor-leve` (Haiku 5.5); líder Opus 5.5 encurtou uma linha do resumo (> 100).
- **Verificação:** leitura do arquivo pelo líder: as 8 ferramentas presentes (CrewAI, LangChain,
  AutoGen, Vercel AI SDK, Stable Diffusion/diffusers, Veras AI, Magnific AI, PromeAI); sem preços
  nem versões inventados; Markdown válido.
