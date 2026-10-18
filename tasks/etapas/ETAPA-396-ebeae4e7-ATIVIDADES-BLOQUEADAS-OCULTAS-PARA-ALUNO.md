## Etapa 396-ebeae4e7 — #269: Atividades bloqueadas não aparecem para o aluno

**Tarefa:** #269-ebeae4e7-14d5-452e-bee4-fb59e0c989fd · **Pedido em:** 2026-10-17 21:17 ·
**Criada por:** Qoder (local · main)
**Pedido:** "as aulas bloqueadas, nao devem ser listadas para os usuarios com perfil=ALUNO" e "as
tarefas bloqueadas tambem nao devem ser listadas para os usuarios com perfil=ALUNO"
**Objetivo:** no índice de atividades, o aluno não vê as atividades bloqueadas (hoje elas aparecem
com cadeado "🔒" e o aviso "Atividade Bloqueada!"); a parte das aulas bloqueadas já foi feita na
#266 (etapa 393-b933b796).

### #269.1 — Ocultar do aluno as atividades bloqueadas no índice

**Próximo passo:** reservar e trocar, no `assets/js/indice-atividades-bloqueio.js`, o cadeado do
aluno por ocultar o link (e o card inteiro, quando todas as atividades dele estão bloqueadas).

- **Nível:** MEDIO — lógica de exibição em 2 arquivos (JS + CSS); não muda login, papéis, RLS nem
  banco (a RLS já não entrega ao aluno a atividade bloqueada).
- **Modelo:** só Qoder — nunca outro
- **Descrição:** em `bloquearLinksAluno()` (`assets/js/indice-atividades-bloqueio.js`), o link
  bloqueado do aluno passa a ficar oculto (continua sem `href` e com o endereço guardado em
  `data-href-bloqueado`, que o `indice-aula-data.js` usa); quando todas as atividades do card estão
  bloqueadas e a matéria não usa o bloqueio da aula, o card inteiro fica oculto (classe
  `aula--oculta-para-aluno` da #266). O professor continua vendo tudo, com o ON/OFF.
- **Critérios de aceitação:** aluno não vê atividade bloqueada nem card com todas bloqueadas;
  atividades liberadas continuam aparecendo; professor sem mudança; nada de banco, login ou RLS.
- **Entrega:** — · **Verificação:** —
