## Etapa 485-a7d3f9c1 — REGRA-ATIVIDADES-APOS-MD: Atividades só depois dos Markdown dos slides

**Tarefa:** REGRA-ATIVIDADES-APOS-MD · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s485)
**Pedido:** "leia STATUS-CONTEUDO-AULAS.md e coloque como regra global no projeto aulasenai, a orientação deve ser: Aguardar ter os arquivos em markdown, pra gerar as atividades com base nestes arquivos"
**Objetivo:** registrar nas regras do projeto que as atividades de uma aula só são geradas depois que os Markdown (extração dos slides do Chalkie AI) existirem na pasta `CONTEUDO/` da matéria.

**Fonte lida:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/STATUS-CONTEUDO-AULAS.md` — diz que a pasta recebe os slides do Chalkie AI em 4 versões: PDF, Google Slides, PowerPoint e Extração em Markdown.

### REGRA-ATIVIDADES-APOS-MD.1 — Escrever a regra em `.claude/rules/` e ligar ao `AGENTS.md`

**Próximo passo:** acrescentar a seção "Atividades só depois dos Markdown" em `.claude/rules/materias-global.md` e uma linha na regra "Fontes do conteúdo"; listar no `AGENTS.md` (regras que valem SEMPRE) e registrar em `docs/HISTORICO-REGRAS.md`.

- **Nível:** LEVE — classificado (jev (confiança 0.86))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **Fonte:** jev (confiança 0.86)
- **Descrição:** regra global das matérias: antes de gerar atividades (objetiva, prática, discursiva, avaliação) de uma aula, conferir se existe o Markdown dela (extração dos slides) na pasta `CONTEUDO/`; sem o arquivo, aguardar e avisar o usuário, sem gerar com base em PDF, PPTX, Google Slides ou memória. Com o Markdown, as atividades usam esse arquivo como base.
- **Critérios de Aceitação:** regra escrita em `materias-global.md` (≤ 5 KB no arquivo), citada no `AGENTS.md` e no `docs/HISTORICO-REGRAS.md`; sem regenerar o `index.html` das regras.
- **Entrega:** a preencher · **Verificação:** a preencher
- **JEV-AI-SUGGESTION:** SIM
