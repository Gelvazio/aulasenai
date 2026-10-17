## Etapa 320-c3289a94 — Voltar como estava antes da tabela `aula_turma` (mantendo o bloqueio de atividade)

**Tarefa:** #193-c3289a94-14ea-4442-8df7-7410bc01d242 · **Pedido em:** 2026-10-16 10:01 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "REMOVA A TABELA AULA_TURMA,AINDA N FUNCIONOU" e, às 10:05, "QUERO QUE VOLTE COMO
ESTAVA ANTES DE CRIAR A TABELA AULA_TURMA,PESQUISE NAS VERSOES E FACA ISSO, COM A REGRA DE BLOQUO
DE ATIVIDADE"
**Objetivo:** desfazer tudo o que as tarefas #185 a #188 criaram em volta da tabela `aula_turma`
(datas e bloqueio da aula por turma), no código e no banco, e manter o bloqueio de atividade por
turma (ON/OFF de cada atividade, regra de 2026-10-05, com a correção da #190).

### Escopo

**O que as versões mostram (Git):** a `aula_turma` nasceu na #185 (`b8e37ece`); a #186
(`77167473`) pôs o bloqueio da aula por turma e o gatilho; a #187 (`7877270b`) gravou as datas
do calendário; a #188 (`1f56c8e6`) passou o índice e o "Editar aula" a ler e gravar nela. O
estado anterior é o commit `95bf1974`. Os arquivos de código dessas tarefas não foram mexidos
por nenhuma tarefa depois, exceto `docs/regras/atividades.md` (#191.3, outra parte do arquivo).

**Entra:**
- Código volta ao `95bf1974`: `assets/js/progresso-turma-global.js`,
  `assets/js/atividades-crud-modal.js`, `assets/js/indice-aula-data.js` e
  `assets/js/indice-aula-modal.js` (a "Data da aula" volta a ser `aulas.data_planejada`).
- Apagar `assets/js/datas-aulas-turma.js`, `assets/css/datas-aulas-turma.css` e
  `assets/js/aula-turma-repositorio.js`.
- `assets/js/indice-turma-favorita.js`: **fica** o aviso `turma-indice-alterada` ao trocar a turma
  do combo, porque a #190 usa esse aviso para remontar o ON/OFF das atividades na turma
  escolhida (regra do bloqueio de atividade); só os comentários deixam de citar as datas.
- Documentação: tirar a `aula_turma` de `docs/regras/atividades.md` e de `docs/database.md`
  (fica registro da remoção).
- Banco: SQL `database/2026-10-16-remover-aula-turma.sql` que apaga o gatilho
  `aula_turma_bloqueio_propaga_atividades_trg`, a função `aula_turma_bloqueio_propaga_atividades()`
  e a tabela `aula_turma` (38 linhas de datas; 0 aulas bloqueadas, conferido às 10:05).

**Não entra (fica como está):**
- Bloqueio de atividade por turma (`atividade.bloqueio`, `definir_bloqueio_turma`,
  `atividade_liberada_para_usuario`, `database/2026-10-05-bloqueio-atividade-por-turma.sql`) e a
  correção da #190 (`assets/js/indice-atividades-bloqueio.js`).
- Bloqueio da aula inteira (`aulas.ativo`, `indice-aula-bloqueio.js`).
- #189, #191 e #192 (atividade de sala 16-10 e o link da Aula 04).
- Os SQLs antigos da #185 a #187 ficam no Git como histórico (o registro de seeds aponta para
  eles); o SQL novo desfaz o que eles criaram.

**Critério de pronto:** nenhum código lê ou grava `aula_turma`; o ON/OFF de cada atividade
continua valendo para a turma do combo do índice; a tabela, o gatilho e a função saem do banco.

### Riscos

- **Perder as datas por turma (38 linhas):** é o pedido. Plano B: as datas do calendário estão no
  Git (`database/2026-10-16-aula-turma-calendario-itic.sql` e o `CALENDARIO AULAS ITIC.txt`).
- **Apagar tabela pelo conector é bloqueado** (`security-banco.md`): o usuário roda o SQL no SQL
  Editor; depois o Claude Code local confere e registra.
- **Bloqueio de atividade parar ao voltar o código:** evitado mantendo o aviso de troca de turma
  do combo (`indice-turma-favorita.js`), que a #190 escuta.

### Decisões

- 2026-10-16 10:05 — **Aprovação:** o usuário mandou fazer ("PESQUISE NAS VERSOES E FACA
  ISSO"); o plano acima é exatamente o pedido. O único passo que apaga dados (SQL) é rodado pelo
  próprio usuário. Registrado por Claude Code (Opus 5.5) (local · main · s6).

### #193.1 — Plano na etapa e aprovação do usuário

**Próximo passo:** — (entregue).

- **Nível:** PESADO — banco (apagar tabela com dados), várias partes do código.
- **Entrega:** esta etapa (escopo, riscos e subtarefas). **Verificação:** `git log -S aula_turma`,
  `git show --stat` de cada commit e consulta ao banco (38 linhas, 0 bloqueadas, 1 gatilho, nada
  depende da tabela).

### #193.2 — Voltar o código ao estado de antes da `aula_turma`

**Próximo passo:** — (entregue).

- **Nível:** PESADO — mais de 3 arquivos ligados (índice, modal, progresso, bloqueio).
- **Critérios de aceitação:** `grep aula_turma` sem resultado no código; ON/OFF da #190 intacto.
- **Causa provável do "ainda não funcionou":** a #188 declarou a constante global
  `EVENTO_TURMA_ESCOLHIDA_INDICE` em `indice-aula-data.js` **e** em `indice-turma-favorita.js`,
  que são carregados na mesma página do índice. O segundo a carregar quebrava inteiro ("Identifier
  has already been declared"): ou sumia o combo "Turma:" (e o ON/OFF ficava sem turma), ou sumiam
  as datas e botões dos cards. Com a reversão a constante fica só no `indice-turma-favorita.js`.
- **Entrega:** restaurados do `95bf1974` `progresso-turma-global.js`, `atividades-crud-modal.js`,
  `indice-aula-data.js` e `indice-aula-modal.js`; apagados `datas-aulas-turma.js`,
  `datas-aulas-turma.css` e `aula-turma-repositorio.js`; `indice-turma-favorita.js` só com
  comentários novos (o aviso de troca de turma fica, para o ON/OFF da #190);
  `docs/regras/atividades.md` e `docs/database.md` sem a `aula_turma`.
- **Verificação:** `node --check` nos 6 JS do índice; `grep` sem nenhuma referência à
  `aula_turma` no código; varredura das constantes globais dos scripts carregados no índice (nenhuma
  repetida agora; antes, `EVENTO_TURMA_ESCOLHIDA_INDICE` repetida). A verificação completa
  (reversão, ON/OFF de ponta a ponta e banco) ficou na tarefa #194, a pedido do usuário. Sem
  navegador: o clique só o usuário confirma (#193.5).

### #193.3 — SQL que apaga a `aula_turma` do banco

**Próximo passo:** — (entregue; rodar na #193.4).

- **Nível:** PESADO — banco (apagar tabela, gatilho e função).
- **Entrega:** `database/2026-10-16-remover-aula-turma.sql` (`drop table if exists` + `drop function
  if exists`, sem `cascade`, com a conferência no fim) e a linha PENDENTE em
  `database/SEEDS-APLICADOS.md`.
- **Verificação:** catálogo do banco (só leitura, 2026-10-16 10:14): nada depende da tabela além
  do próprio gatilho, das políticas e do índice (que saem com ela); a função só é usada pelo
  gatilho; a tabela não está em publicação de tempo real.

### #193.4 — Rodar o SQL no SQL Editor e conferir

**Próximo passo:** ⛔ CANCELADA em 2026-10-16 a pedido do usuário. A tarefa #206 (etapa 333) recria
a `aula_turma`; apagar a tabela agora quebraria a #206. O SQL `database/2026-10-16-remover-aula-turma.sql`
não deve ser rodado.

- **Nível:** PESADO — banco; a parte de rodar é do usuário (`security-banco.md`).

### #193.5 — Aceite do usuário

**Próximo passo:** 👀 o usuário abre o índice de ATIVIDADES da ITIC como professor, escolhe a
turma no combo e liga/desliga o ON/OFF de uma atividade.

- **Nível:** LEVE — conferência do usuário.
- **Modelo:** Usuário — nenhuma IA executa (#247)
