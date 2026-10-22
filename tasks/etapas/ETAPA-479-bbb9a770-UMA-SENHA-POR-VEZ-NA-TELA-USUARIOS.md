## Etapa 479-bbb9a770 — Mostrar uma senha por vez na tela USUARIOS online

**Tarefa:** #350-bbb9a770-d52e-40b8-82c7-c4211a76c7b9 · **Pedido em:** 2026-10-22 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "aqui, n tem opção de mostrar apenas 1 senha por vez,
https://aulasenai.vercel.app/scripts/criarUsuariosBancoDados.html"
**Objetivo:** no modo banco (site), o professor mostra a senha de um aluno só, sem revelar as
outras da turma.

### #350.1 — Botão por linha para mostrar/ocultar a senha do aluno

**Próximo passo:** em `assets/js/criar-usuarios-tabela.js`, linha do modo banco com controle
próprio de mostrar/ocultar a senha; o "Mostrar senhas" da turma continua mostrando todas.

- **Nível:** MEDIO — código de tela, 1 a 2 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** cada linha mostra/oculta só a própria senha; o interruptor da
  turma liga/desliga todas; modo local sem mudança; `node --check` limpo.
- **Entrega:** — · **Verificação:** —
