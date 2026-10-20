## Etapa 442-9b4e7c58 — #313: Botão de equipe para os alunos em todos os índices de atividades

**Tarefa:** #313 · **Pedido em:** 2026-10-20 16:20 · **Criada por:** Claude Code (Opus 5.5) (local · main · s31)
**Pedido:** "e mais outra tarefa pra fazer isso em todas as demais atividades [...] a outra deixe no
quadro pra outra IA fazer".
**Objetivo:** repetir nas demais matérias o botão "👥 Minha equipe" feito na #312.

### Escopo (plano)

- **Entra:** os outros 32 `MATERIAIS/*/*/ATIVIDADES/index.html` (lista por
  `ls MATERIAIS/*/*/ATIVIDADES/index.html`, menos o de ANALISE_DADOS_APLICADA_GESTAO): incluir a
  mesma tag `<script>` do `assets/js/botao-equipes-materia.js` (caminho relativo certo para a pasta,
  com `defer`), no mesmo lugar em que a #312 pôs. Se houver gerador de índice
  (`assets/gerador-menu/tags_header.py` ou similar), incluir a tag nele também.
- **Não entra:** mudar o script da #312.
- **Pronto quando:** `grep -L botao-equipes-materia.js MATERIAIS/*/*/ATIVIDADES/index.html` volta vazio.
- **Risco:** caminho relativo errado em pasta com espaço (`DIGITAL SKILLS`) → conferir com grep.
- **Aprovação:** pedido explícito do professor em 2026-10-20 16:20 (plano = este escopo).

### #313.1 — Incluir o botão "👥 Minha equipe" nos demais 32 índices de atividades

**Próximo passo:** depois da #312.1, incluir a tag nos 32 índices.

- **Nível:** PESADO — mudança em massa (32 páginas)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** ver Escopo.
- **Entrega:** — · **Verificação:** —
