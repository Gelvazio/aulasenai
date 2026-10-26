# ETAPA 549 — Regra global: Devin (e Copilot) passa a pegar subtarefa MEDIO

- **TASK:** #404 (pedida em 2026-10-26)
- **Nível/Modelo:** LEVE · effort low (Jev, conf. 0,59; valendo a matriz). Executada pelo Devin a pedido do usuário ("mude a regra global... permitindo o devin pegar medio tambem").
- **Tipo:** mudança de regra global (matriz ferramenta × modelo × nível).
- **Aprovação:** pedido direto do usuário.

## Pedido

Na matriz de `C:\fontes\rules-ai` (`regras/niveis-e-modelos.md`), a linha **Devin / Copilot** passa de `✅ / ⛔ / ⛔` para `✅ / ✅ / ⛔` — MEDIO liberado.

## Cópias da matriz a alinhar

- `C:\fontes\rules-ai\regras\niveis-e-modelos.md` (fonte) — linha Devin/Copilot.
- `C:\fontes\rules-ai\scripts\jev\modelos.mjs` — espelho em código do Jev (MEDIO ganha Devin e Copilot).
- `C:\fontes\rules-ai\dist\REGRAS-GLOBAIS.md` + `VERSAO.md` — regerados por `scripts/sincronizar.mjs` **sem** `--aplicar` (o `--aplicar`, que regrava os arquivos globais das IAs, fica para ordem do usuário).
- `C:\Users\gelva\.agents\skills\classificar-tarefa\SKILL.md` — matriz da skill global.
- `C:\fontes\aulasenai\.claude\rules\niveis.md` — matriz do projeto.
- `C:\fontes\aulasenai\rules-local\` — regerada por `node rules-local/sessao.mjs`.
- Quadros: `rules-ai/tasks/STATUS.md` (tarefa NIVEL-DEVIN + decisão) e aqui (#404 + Registro de decisões).

## Subtarefas

### 404.1 — Liberar MEDIO para Devin/Copilot na matriz global e nas cópias

- **Nível:** LEVE (Jev, conf. 0,59) · **Status:** ✅ Concluído
- **Entrega:** `regras/niveis-e-modelos.md` e `scripts/jev/modelos.mjs` (rules-ai, commits `4bb8ef3`/`0f58f2d`), `dist/REGRAS-GLOBAIS.md` + `VERSAO.md` regerados (sem `--aplicar`), skill `classificar-tarefa` alinhada, `.claude/rules/niveis.md` e `rules-local/` do projeto atualizados (versão `2026-10-26-06f7c1a8`); decisão C54 nos dois quadros. No rules-ai: tarefa `NIVEL-DEVIN` (etapa 056) ✅.
- **Próximo passo:** nenhum — task fechada. O `--aplicar` (regravar os arquivos globais das IAs, ex.: `~/.config/devin/AGENTS.md`) fica para ordem do usuário — regra já vale pelos quadros/regras dos projetos.
- **Verificação:** `node --check modelos.mjs` OK; grep "Devin" em `dist/`, `rules-local/` e `.claude/rules/niveis.md` mostra `✅ ✅ ⛔`.
