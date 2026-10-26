# ETAPA 547 — Bloco "INSTRUÇÕES / Como Responder" visível só para alunos

- **TASK:** #402 (pedida em 2026-10-26)
- **Nível/Modelo:** PESADO · effort high (Jev, conf. 0,40 — sinal "segredo"; valendo a matriz; revisão humana recomendada). Elegíveis: Claude Code (Sonnet/Opus 5.5+/Fable — neste projeto nunca Opus), DeepSeek, OpenCode (deepseek-v4-pro). ⛔ Devin não executa (só LEVE).
- **Tipo:** mudança de visibilidade por perfil (professor × aluno) em todas as atividades discursivas/práticas.
- **Aprovação:** pedido direto do usuário ("estas instruções devem aparecer apenas aos alunos").

## Pedido

O bloco **INSTRUÇÕES — "Como Responder"** das páginas de atividade prática/discursiva (badge `INSTRUÇÕES`, com INFORMAÇÕES GERAIS, CAPACIDADES, CONTEXTO DO CURSO, PRODUTO DA AULA e COMO RESPONDER) **só aparece para alunos**; o professor não o vê.

## Onde está o bloco

- Primeira `<section class="aula-card">` do `<main>` das páginas práticas/discursivas, antes de `#painel-discursivo`. Badge `INSTRUÇÕES` + `<h2 class="aula-title">Como Responder</h2>`.
- Gerada por `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` a partir dos `.md` — **191 arquivos** em `MATERIAIS/` contêm "Como Responder" (todas as matérias, não só UI/UX).
- O perfil já é conhecido em `assets/js/avaliacao-discursiva.js` (`dados.ehProfessor`, painel `#painel-discursivo`).

## Decisões em aberto

- Esconder via JS compartilhado (`avaliacao-discursiva.js`/`atividade.js`) — sem mexer nos 191 HTML — ou marcar a seção no gerador + CSS. O aluno continua vendo; sem login/fora do perfil, decidir o comportamento (mais seguro: esconder até saber que é aluno? Ou mostrar e esconder ao confirmar professor — decidir na execução).

## Subtarefas

### 402.1 — Esconder o bloco INSTRUÇÕES do professor em todas as atividades discursivas

- **Nível:** PESADO · **Status:** ⬜ Pendente (livre)
- **Descrição:** quando `dados.ehProfessor`, o bloco INSTRUÇÕES/"Como Responder" não aparece (JS compartilhado preferível, cobrindo as 191 páginas); aluno continua vendo. Atualizar `docs/regras/atividades.md`.
- **Próximo passo:** pegar a subtarefa (modelo elegível), implementar, verificar.
- **Verificação:** `node --check` + grep + releitura; sem navegador.
