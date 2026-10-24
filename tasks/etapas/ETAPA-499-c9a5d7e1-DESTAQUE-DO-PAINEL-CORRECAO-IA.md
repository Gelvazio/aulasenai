## Etapa 499-c9a5d7e1 — PAINEL-IA-DESTAQUE: Painel de correção de IA centralizado, com ícones, piscando e id lido do HTML

**Tarefa:** PAINEL-IA-DESTAQUE · **Pedido em:** 2026-10-24 14:55 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s497)
**Pedido:** "CENTRALIZE MELHOR E DESTAQUE COM ICONES E PISCANDO, E O ID DA ATIVIDADE DEVE PEGAR DESTE HTML MESMO" (imagem: painel Executar correção de IA agora com 31 entregues e 1755 de 1891 questões)
**Objetivo:** o painel fica centralizado e chamativo (ícones e animação piscando) e usa o id da atividade da própria página HTML (o mesmo id mostrado no título, achado por `atividade.pagina`).

### PAINEL-IA-DESTAQUE.1 — Centralizar, destacar e ler o id da página

**Próximo passo:** executar.

- **Nível:** MEDIO — Jev (mensagem do pedido, confiança 0,83)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0,83)
- **Descrição:** `assets/css/correcao-ia-progresso.css` (centralizado, ícones, piscando, respeita `prefers-reduced-motion`), `assets/js/correcao-ia-progresso.js` (ícones nas linhas; id vindo do selo do título) e `assets/js/atividade-id-titulo.js` (expõe os ids da página no selo).
- **Critérios de Aceitação:** painel centralizado; ícones e piscar; id lido do HTML da página; `node --check` passa; sem `!important`.
