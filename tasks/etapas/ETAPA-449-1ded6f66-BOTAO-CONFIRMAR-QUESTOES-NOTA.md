## Etapa 449-1ded6f66 — Botão "Confirmar" no campo "Quantidade Questão Considerar"

**Tarefa:** #320-1ded6f66-de9c-475d-a80c-840485bade1b · **Pedido em:** 2026-10-21 10:55 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "aqui, coloque 1 botao de nome Confirmar, que ao clicar mostra 1 modal, *Deseja alterar a quantidade de questoes a considerar para este aluno?*, se clicar em sim, efetua a alteração e grava a regra pra este aluno" (print: ao lado do campo "Quantidade Questão Considerar" de um aluno no Progresso da turma)
**Objetivo:** a quantidade só é gravada depois de o professor clicar em "Confirmar" e responder "Sim" no modal (hoje grava sozinha ao sair do campo).

### #320.1 — Botão "Confirmar" + modal de confirmação antes de gravar

**Próximo passo:** executor-medio fazer a mudança em `assets/js/questoes-nota-aluno-progresso.js`.

- **Nível:** MEDIO — tela com lógica (JS + CSS), até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** botão "Confirmar" ao lado do campo; clique → `confirmarPopup` com "Deseja alterar a
  quantidade de questoes a considerar para este aluno?" (Sim/Não); Sim → grava (vazio apaga);
  Não → volta o valor gravado. O campo não grava mais sozinho; a atualização automática da lista
  espera enquanto há valor digitado e ainda não confirmado.
- **Critérios de aceitação:** `node --check` ok; linhas ≤ 100; conferir na tela.
- **Entrega:** — · **Verificação:** —
