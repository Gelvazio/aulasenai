## Etapa 477-e7bfc968 — Erro "SENHA_OCULTA já declarada" na tela USUARIOS online

**Tarefa:** #348-e7bfc968-0c6d-4ba9-b06c-f3f85718dd32 · **Pedido em:** 2026-10-22 16:20 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** erro no console da tela USUARIOS online: "criar-usuarios-tabela.js:1 Uncaught
SyntaxError: Identifier 'SENHA_OCULTA' has already been declared" e "criarTabelaSenhasBancoGuia is
not defined" (criar-usuarios-pagina.js:558). Os 404 de `LISTAPRESENCA.js` e `variaveis.js` são
esperados no site.
**Objetivo:** a tela USUARIOS online volta a carregar a lista de alunos e senhas (#345).

### Causa

A #345.4 criou `const SENHA_OCULTA` em `assets/js/criar-usuarios-api.js`, e
`assets/js/criar-usuarios-tabela.js` já tinha uma constante global com o mesmo nome. Os dois
scripts dividem o escopo global da página: o segundo falha inteiro e as funções dele somem.

### #348.1 — Renomear a constante do `criar-usuarios-api.js`

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — 1 arquivo JS
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** nenhuma constante global repetida entre os scripts da página;
  `node --check` limpo.
- **Entrega:** `SENHA_OCULTA` → `SENHA_OCULTA_LOG` em `assets/js/criar-usuarios-api.js` (executor-medio) · **Verificação:** `node --check` no arquivo e nos 9 scripts da página juntos num arquivo só (sem declaração repetida); o erro `criarTabelaSenhasBancoGuia is not defined` era consequência (a função existe em `criar-usuarios-tabela.js`, que não carregava); conferir na tela (usuário)
