## Etapa 412-cca9f896 — #283: Cores nos botões das atividades (feita / pendente / não feita)

**Tarefa:** #283 · **Pedido em:** 2026-10-18 19:38 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "cada botao de atividade,deve ter o seguinte comportamento,em todas as atividades, Se a
atividade foi feita por completo, Deixe ele na cor de fundo leve Verde, Se tiver algo pendente, cor
de fundo que nem hoje amarelo;se nao foi feito,deixe em vermelho fraco e piscando(efeitos de css)"
**Objetivo:** no índice de atividades, o aluno logado vê cada botão de atividade pintado pelo
andamento dele: **verde claro** (atividade entregue por completo), **amarelo** (como hoje —
começou e tem algo pendente) ou **vermelho fraco piscando** (não fez nada). As cores vêm do banco
(tabelas `resposta_atividade` e `entrega_atividade`, que o RLS já limita às respostas do próprio
aluno); nada muda para professor e visitante.

### Escopo

- **Entra:** `assets/js/indice-atividades-feitas.js` (que já marca "Fez Atividade?"), com o estado
  por atividade, e `assets/css/indice-atividades-feitas.css` (as 3 cores, com a animação e o
  respeito a `prefers-reduced-motion`); regra nova em `docs/regras/atividades.md`.
- **Não entra:** banco (nenhuma tabela, RLS ou função muda), o ON/OFF e o bloqueio, o visual do
  professor e do visitante, e o filtro "Fez Atividade?" (continua igual).
- **Pronto quando:** no índice, cada botão de atividade do aluno tem uma das 3 cores certas;
  "feita por completo" = aluno entregou a atividade (`entrega_atividade`); "algo pendente" = tem
  resposta e ainda não entregou; "não feita" = nenhuma resposta e nenhuma entrega; a cor é refeita
  quando os cards são remontados; sem erro de JS.
- ⚠️ Sem navegador: a conferência na tela é do usuário.

### #283.1 — Estado por atividade e as 3 cores no botão

**Próximo passo:** ler o módulo das "feitas" e o CSS e aplicar o estado por link.

- **Nível:** MEDIO — tela: 1 JS + 1 CSS e a regra em `docs/`; só leitura das tabelas do aluno
  (RLS existente), sem mudar banco.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** (1) `indice-atividades-feitas.js`: novo `buscarEstadosFeitas` que devolve, por
  página de atividade, se o aluno **entregou** (`entrega_atividade`) e se **respondeu algo**
  (`resposta_atividade`, consulta que já existia); para cada link `a.btn.principal` do card, põe a
  classe `atividade--feita`, `atividade--pendente` ou `atividade--nao-feita`; usa o
  `data-href-bloqueado` quando o bloqueio já tirou o `href` (ordem de execução dos módulos); o
  filtro "Fez Atividade?" e a marca do card ficam como estão; (2) `indice-atividades-feitas.css`:
  fundo verde claro para `atividade--feita`, amarelo atual para `atividade--pendente` (sem regra
  nova) e fundo vermelho fraco com animação de piscar para `atividade--nao-feita`, com
  `@media (prefers-reduced-motion: reduce)` desligando a animação; (3) `docs/regras/atividades.md`:
  regra das cores.
- **Critérios de aceitação:** cada botão do aluno com a cor certa; verde só quando entregue;
  vermelho piscando só quando não fez nada; cores refeitas no evento `cards-aula-montados`;
  professor e visitante sem cor; `node --check` no JS.
- **Verificação:** `node --check`; leitura do CSS e da regra; conferir que as consultas usam as
  tabelas e colunas certas (`atividade.id,pagina`, `resposta_atividade.atividade_id`,
  `entrega_atividade.atividade_id`) e que o RLS não muda; sem banco e sem navegador.
- **Entrega:** — · **Anotação:** —
