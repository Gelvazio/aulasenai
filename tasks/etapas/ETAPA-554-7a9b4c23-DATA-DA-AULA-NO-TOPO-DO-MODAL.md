# ETAPA 554 — "Editar aula": campo "Data da aula" no topo do formulário

- **TASK:** #407 (pedida em 2026-10-27) · **Criada por:** Claude Code (Sonnet 5.5) (local · main)

## Pedido

"COLOQUE O CAMPO DA DATA DA AULA ALI EM CIMA" — logo depois de "Sequência" (3ª coluna da 2ª linha de campos), em vez de no fim do formulário.

### #407.1 — Mover o campo Data da aula para depois de Sequência

**Próximo passo:** em `assets/js/indice-aula-modal.js` (`montarFormularioModalAula`), inserir o 1º campo da turma (data) depois do campo `sequencia`; o campo de bloqueio fica no fim.

- **Nível:** LEVE — troca de ordem de campos, 1 arquivo
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** a data (`criarCamposTurmaModalAula()[0]`) vira o 6º campo; leitura e gravação não mudam (acham o campo pelo nome).
- **Entrega:** `indice-aula-modal.js`: `obterPosicaoCamposTurmaModalAula` e `montarFormularioModalAula` inserem o campo Data da aula logo após Sequência; o bloqueio fica no fim (executor-leve, Haiku). · **Verificação:** diff conferido pelo líder; `node --check` OK; posição na grade só confirmável na tela (sem navegador).
