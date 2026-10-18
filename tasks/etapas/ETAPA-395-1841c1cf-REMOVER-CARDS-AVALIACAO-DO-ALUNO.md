## Etapa 395-1841c1cf — #268: Ocultar as três avaliações da lista do aluno

**Tarefa:** #268 · **Pedido em:** 2026-10-17 21:14 · **Criada por:** Codex (GPT-6) (local · main)
**Pedido:** “remova os 3 agora” — referência aos três cards de avaliação que aparecem para o aluno.
**Objetivo:** retirar os três cards da lista do aluno e manter o acesso do professor.

### #268.1 — Ocultar os três cards de avaliação para o aluno

**Próximo passo:** concluído; cards ocultos para aluno e liberados para professor.

- **Nível:** MEDIO — ajuste de exibição com lógica em até três arquivos, sem alterar autenticação ou permissões.
- **Modelo:** só Codex — nunca outro
- **Descrição:** ocultar para o aluno os cards Avaliação Objetiva 01, Avaliação Objetiva 02 e Avaliação Prática. · **Critérios de aceitação:** os três cards não aparecem na lista do aluno; o professor mantém acesso a eles; as demais aulas continuam como estão.
- **Entrega:** ocultação dos três cards por padrão e liberação no perfil de professor.
- **Verificação:** `node --check assets/js/indice-atividades-bloqueio.js`, `git diff --check` nos arquivos da tarefa e conferência estática dos três marcadores; sem navegador.
