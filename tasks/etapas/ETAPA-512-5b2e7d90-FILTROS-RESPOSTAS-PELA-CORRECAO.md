## Etapa 512-5b2e7d90 — Filtros "Respostas dos alunos" pela correção (IA até o professor confirmar)

**Tarefa:** #363-5b2e7d90 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "ESTES FILTROS (Falta Corrigir?, Mostrar Certas, Mostrar Meia Certas, Mostrar Erradas) DEVEM PEGAR PELA SUGESTAO DE IA, SO QD O PROFESSOR AINDA NAO CONFIRMOU; SE JA CONFIRMOU, BUSQUE CERTA, MEIA CERTA E ERRADA DA CORRECAO DO PROFESSOR. ESTA REGRA DEVE SER GLOBAL"
**Objetivo:** em toda atividade, a classificação certa/meia certa/errada vem da IA enquanto o professor não confirmou, e da correção do professor depois que confirmou.

### #363.1 — Classificar certa/meia/errada pela nota do professor quando confirmada

**Próximo passo:** achar o código dos filtros "Respostas dos alunos" e aplicar a regra.

- **Nível:** MEDIO — JS com lógica, poucos arquivos (Jev, confiança 0,53; matriz)
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/mostrar-certas-discursiva.js` (categoria certa/meia/errada pela sugestão da IA até o professor confirmar todos os tópicos respondidos; depois, pela correção dele); `docs/regras/atividades.md`. A tela do aluno já usava só a nota confirmada do professor. Revisão por agente (revisor-codigo): sem achados.
- **Verificação:** `node --check` ok; linhas ≤ 100. Conferir na tela: o usuário.
