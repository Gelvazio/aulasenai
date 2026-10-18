## Etapa 414-f64948db — #285: Atividade liberada mostrando "Aula Bloqueada!" ao aluno

**Tarefa:** #285 · **Pedido em:** 2026-10-18 19:58 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "mesmo a aula estando desbloqueada, ao aluno abrir a atividade
*materiais/assistente-de-operacoes-logisticas/introducao-tic/atividades/atividades-aula-01-50-questoes*
e id = 2, aparece pra ele a mensagem *Aula Bloqueada! Esta aula ou atividade está bloqueada pelo
professor. Volte ao índice e aguarde a liberação.*"
**Objetivo:** com a aula liberada no índice, o aluno consegue abrir e responder a atividade da
AULA 01 da ITIC (AOPL, atividade id 2) — a mensagem "🔒 Aula Bloqueada!" só aparece quando a aula
ou a atividade está mesmo bloqueada para as turmas dele.

### Escopo

- **Entra:** diagnóstico e correção da checagem da página da atividade
  (`assets/js/atividade-bloqueio-aula.js`), só JavaScript/leitura; o índice e o visual não mudam.
- **Não entra:** mudar RLS, trigger ou dados do banco; mudar o bloqueio por turma no índice.
- **Pronto quando:** atividade liberada abre e funciona; bloqueada de verdade continua mostrando o
  aviso; sem erro de JS.
- ⚠️ Sem navegador: a conferência final é do usuário; a checagem é por leitura do código e das
  consultas.

### #285.1 — Corrigir a checagem de bloqueio na página da atividade

**Próximo passo:** ler `atividade-bloqueio-aula.js` e comparar a checagem com a do índice
(`indice-aula-bloqueio.js` e `aula-turma-repositorio.js`).

- **Nível:** MEDIO — bug em 1 JS de tela, com leitura de dados; sem mudar banco.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** achar por que a página da atividade id 2 mostra o aviso com a aula liberada (ex.:
  checagem que olha `aulas.ativo` e não o bloqueio por turma, ou que considera bloqueada quando não
  há bloqueio cadastrado; ou leitura que falha e cai no aviso) e corrigir; a página de uma atividade
  bloqueada de verdade continua com o aviso.
- **Critérios de aceitação:** atividade liberada abre; bloqueada continua avisando; sem banco.
- **Verificação:** leitura do código, `node --check`, e conferência das consultas com as tabelas
  usadas pelo índice; sem navegador.
- **Entrega:** — · **Anotação:** —
