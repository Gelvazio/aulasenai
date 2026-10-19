## Etapa 419-fef2fcf2 — #290: Atividade duplicada para o aluno no índice de atividades

**Tarefa:** #290-fef2fcf2-dd34-4028-8ebc-5fecef4e7308 · **Pedido em:** 2026-10-19 06:18 · **Criada por:** Claude Code (Opus 5.5) (local · main · s24, sessão lateral aberta pela s23)
**Pedido:** "esta aparecendo duplicada atividade pro aluno" (com print do índice de atividades na
visão do aluno: no card "AULA 01 — Comunicação Profissional e Seus Fundamentos" aparecem
"Atividade", "Atividade Prática", "Slides (PDF)", "Atividade Objetiva" e "Atividade Prática — Aula
01"; no card "AULA 02 — Hardware, Periféricos e Sistemas Operacionais", o mesmo padrão).
**Objetivo:** cada atividade aparece **uma vez só** no card de aula do aluno, em todos os índices,
sem quebrar a visão do professor (regra 15 do `AGENTS.md`: cards e atividades vêm só do banco).

### Decisões

| Quando | Quem | O quê | Por quê |
|---|---|---|---|
| 2026-10-19 06:18 | Claude Code (Opus 5.5, líder s24) | Correção de bug pequena (tela, JS) com 1 subtarefa `MEDIO`; se a causa estiver no banco (linhas repetidas na tabela `atividade`), reclassificar para `PESADO` antes de mexer | Sem chave do Jev e Laya fora do ar: decidido pelos sinais (código com lógica em 1 a 3 arquivos, sem banco) |

### #290.1 — Achar a causa da duplicata e mostrar cada atividade uma vez só

**Próximo passo:** líder diagnostica a causa (quem monta os botões dos cards) e delega a correção
ao executor-medio.

- **Nível:** MEDIO — código com lógica em 1 a 3 arquivos JS, sem banco nem RLS (Jev sem chave, Laya
  fora do ar; decidido pelos sinais)
- **Modelo:** só Sonnet — nunca outro (#247); executor-medio, líder Opus 5.5 (s24)
- **Effort:** medium
- **Descrição:** achar onde o botão de cada atividade é montado duas vezes no card de aula (nome
  curto "Atividade"/"Atividade Prática" e nome do banco "Atividade Objetiva"/"Atividade Prática —
  Aula NN") e corrigir para sair só o botão da atividade do banco, ligado pelo `aula_id`.
- **Critérios de aceitação:** causa registrada nesta etapa; nenhum card de aula mostra a mesma
  atividade duas vezes ao aluno, em todos os índices; a visão do professor continua igual (sem
  perder botão); `node --check` OK; nada de banco.
- **Entrega:** — · **Verificação:** —
