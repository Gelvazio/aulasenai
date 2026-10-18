## Etapa 396-ebeae4e7 — #269: Atividades bloqueadas não aparecem para o aluno

**Tarefa:** #269-ebeae4e7-14d5-452e-bee4-fb59e0c989fd · **Pedido em:** 2026-10-17 21:17 ·
**Criada por:** Qoder (local · main)
**Pedido:** "as aulas bloqueadas, nao devem ser listadas para os usuarios com perfil=ALUNO" e "as
tarefas bloqueadas tambem nao devem ser listadas para os usuarios com perfil=ALUNO"
**Objetivo:** no índice de atividades, o aluno não vê as atividades bloqueadas (hoje elas aparecem
com cadeado "🔒" e o aviso "Atividade Bloqueada!"); a parte das aulas bloqueadas já foi feita na
#266 (etapa 393-b933b796).

### #269.1 — Ocultar do aluno as atividades bloqueadas no índice

**Próximo passo:** — (concluída; o teste no aparelho/navegador é do usuário).

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
- **Entrega:** `assets/js/indice-atividades-bloqueio.js` — `ocultarLinkAluno()` (guarda o endereço
  em `data-href-bloqueado`, tira o `href` e aplica `atividade--oculta-para-aluno`) e
  `ocultarAtividadesBloqueadasAluno()` (oculta os links bloqueados e, se todos estiverem bloqueados
  e a matéria não usar o bloqueio da aula, aplica `aula--atividades-ocultas-para-aluno` ao card);
  saíram o cadeado "🔒", o aviso "Atividade Bloqueada!" e o card travado do aluno, que só serviam
  a esse caminho. `assets/css/indice-atividades-bloquear.css` — as duas classes com
  `display: none`. Classes próprias, separadas da `aula--oculta-para-aluno` da #266, para o
  `indice-aula-bloqueio.js` não desfazer a ocultação ao ligar/desligar a dele.
- **Verificação:** `node --check` no JS; `git diff --check`; nenhuma linha nova > 100; busca sem
  referência órfã às funções e constantes removidas; nenhum outro script usa o "🔒" nem a classe
  `off` do aluno; o CSS é carregado para todos os perfis (`carregarMarcacaoFeitas()` em
  `atividades-crud-modal.js`); a regra nova (peso 0,3,1) vence o `a.btn` do `celular.css` (0,1,1).
  Professor: caminho intocado (`montarInterruptoresBloquear`). ⚠️ Sem navegador (regra do
  projeto): conferir com um login de aluno.
