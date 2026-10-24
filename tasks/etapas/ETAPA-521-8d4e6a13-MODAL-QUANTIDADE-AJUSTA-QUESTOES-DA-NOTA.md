## Etapa 521-8d4e6a13 — Modal "Quantidade Mínima de Questões" ajusta a quantidade de questões da nota do aluno

**Tarefa:** #372-8d4e6a13 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "AO CONFIRMAR NESTE MODAL, DEVE AJUSTAR A QUANTIDADE DE QUESTOES PRA ESTA ATIVIDADE PARA ESTE ALUNO" e "ESTA REGRA DEVE SER GLOBAL" (aluno Fagner Roberto da Silva, atividade 36: o modal mostrava 30, mas a nota usa `questoes_nota_aluno.quantidade = 20`).
**Objetivo:** o modal abre com a quantidade que vale na nota e, ao salvar, grava essa quantidade para o aluno nesta atividade (e o mínimo para entregar, mantendo os dois iguais); "Voltar ao padrão" apaga as duas. Vale em todo Progresso da turma (discursivas, práticas e objetivas).

### #372.1 — Modal grava a quantidade de questões da nota (global)

**Próximo passo:** implementar o modal e conferir a leitura da quantidade nas objetivas.

- **Nível:** MEDIO — JS com lógica; escrita em `questoes_nota_aluno` já protegida por RLS (Jev, confiança 0,28; matriz)
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/minimo-questoes-discursiva.js` (o modal lê do banco, ao abrir, a quantidade do aluno na atividade: `questoes_nota_aluno`, senão `minimo_questoes_aluno`, senão o padrão; Salvar grava o mesmo N nas duas tabelas; Voltar ao padrão apaga as duas; valor limitado ao total; gravação parcial avisa o painel), `assets/js/progresso-turma-global.js` (passa `questoesNota` e marca "próprio" com qualquer das duas), `docs/regras/atividades.md`, anotação no gerador. As objetivas já liam as duas quantidades. Feito por 2 agentes + revisor.
- **Verificação:** `node --check` ok; revisão por agente (aplicados: limite ao total, gravação parcial, JSDoc). Conferir na tela: o usuário (Fagner, atividade 36, deve abrir com 20).
