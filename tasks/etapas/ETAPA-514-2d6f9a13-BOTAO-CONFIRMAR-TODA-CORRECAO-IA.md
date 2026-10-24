## Etapa 514-2d6f9a13 — Botão "CONFIRMAR TODA CORREÇÃO DE IA" no Progresso da turma

**Tarefa:** #365-2d6f9a13 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "CRIE UM BOTAO EM CIMA DE NOME *CONFIRMAR TODA CORRECAO DE IA*, DEVE EXECUTAR EM CADA ALUNO A FUNCAO DO BOTAO *CONFIRMAR TODAS*"
**Objetivo:** o professor confirma de uma vez a correção da IA de todos os alunos listados, como se clicasse "Confirmar Todas" em cada um.
**Escopo:** botão no topo do quadro (só professor), que chama em cada aluno a mesma função do "Confirmar Todas", com popup de confirmação antes (grava nota do professor em massa). Não entra: mudar a regra do "Confirmar Todas".

### #365.1 — Botão "Confirmar toda correção de IA"

**Próximo passo:** ler o código do "Confirmar Todas" e criar o botão.

- **Nível:** PESADO — escrita em massa no banco pelo professor (Jev, sinal de massa)
- **Modelo:** só Sonnet (neste projeto, nunca Opus)
- **Entrega:** `assets/js/confirmar-toda-correcao-ia-progresso.js` (novo; roda em cada aluno listado a mesma lógica do "Confirmar Todas", com um popup de resumo antes; aluno sem nota da IA, não entregue ou com suspeita de cópia pendente fica de fora); `assets/js/progresso-turma-global.js` (carrega e põe o botão acima da coluna Aluno, só discursivas, global); `assets/css/progresso-turma-global.css`; `docs/regras/atividades.md`; `.claude/rules/atividades-banco.md`; anotação no gerador `gerar_avaliacao_discursiva.py`. Feito por 3 agentes (módulo, ligação/CSS/docs, revisão).
- **Verificação:** `node --check` dos JS e `py_compile` ok; revisão por agente sem bug bloqueante (aplicado o aviso "Verificando..."). Só existe "Confirmar Todas" nas discursivas; objetivas não têm esse botão. Conferir na tela: o usuário.
