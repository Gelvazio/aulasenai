## Etapa 456-51c88f54 — "Exportar Meu Gabarito" com os integrantes da equipe

**Tarefa:** #327-51c88f54-bb47-4189-a7ab-18f95ac15103 · **Pedido em:** 2026-10-21 13:57 · **Criada por:** Claude Code (Opus 5.5) (nuvem · elegant-planck-ul8ac1)
**Pedido:** "CRIE 1 TAREFA PRA QUANDO A ATIVIDADE ESTA NUMA EQUIPE, AO EXPORTAR MEU GABARITO,DEVE
CONSTAR O NOME DOS INTEGRANTES DA EQUIPE"
**Objetivo:** quando a atividade é feita em equipe, o arquivo do "Exportar Meu Gabarito" mostra
o nome de todos os integrantes da equipe do aluno.

### #327.1 — Levantamento e plano: integrantes da equipe no "Exportar Meu Gabarito"

**Próximo passo:** achar como a atividade sabe que é em equipe e qual a equipe do aluno
(`assets/js/equipes-*.js`), se o RLS deixa o aluno ler o nome dos colegas da equipe, e onde o
gabarito é exportado (`assets/js/pdf-minhas-respostas.js`, `botao-minhas-respostas.js`,
`minhas-respostas-*.js`); escrever o plano nesta etapa.

- **Nível:** PESADO — dados de outros alunos (nomes dos colegas) e RLS; na dúvida sobe
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** levantamento e plano nesta etapa; o aluno vê só os nomes da
  **própria** equipe; se precisar de banco, a parte de banco vira subtarefa do Claude Code local.
- **Entrega:** — · **Verificação:** —

### #327.2 — Nomes dos integrantes no arquivo do "Exportar Meu Gabarito"

**Próximo passo:** esperar a #327.1.

- **Nível:** MEDIO — JS de tela/PDF, até 3 arquivos (reclassificar na #327.1 se precisar de banco)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** atividade em equipe → o arquivo exportado traz "Equipe:" com o
  nome de todos os integrantes; atividade individual → igual a hoje; `node --check` ok;
  conferir na tela (usuário).
- **Entrega:** — · **Verificação:** —

### #327.3 — Documentação dos integrantes no "Exportar Meu Gabarito"

**Próximo passo:** esperar a #327.2.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
