> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 53 — Bug: professor via respostas dos alunos nos campos da atividade (tarefa pequena — correção de bug, 2026-10-07)

Causa: as leituras de `resposta_discursiva`, `resposta_atividade`, `entrega_atividade` e `liberacao_atividade` filtravam só atividade e tentativa; como o RLS deixa o professor ler os alunos das turmas dele, as respostas dos alunos (ex.: 2 entregas na discursiva id 81) caíam nos campos da página do professor.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 53.1 | Filtrar por `aluno_id` do usuário logado em `assets/js/respostas-discursivas-banco.js` (tentativa, respostas, entrega, conferência) | ✅ Concluído | 2026-10-07 | `node --check` ok |
| 53.2 | Mesmo filtro em `assets/js/respostas-atividade-banco.js` (objetivas) | ✅ Concluído | 2026-10-07 | `node --check` ok; grep sem leituras sem `aluno_id` (o índice "Fez atividade?" só roda para aluno) |
| 53.3 | Aceite do usuário (abrir como professor e ver os campos vazios) | ⬜ Pendente | — | — |
