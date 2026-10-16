## Etapa 333-e75bddc3 — Voltar a tabela `aula_turma` (data e bloqueio da aula pela turma do combo)

**Tarefa:** #206-e75bddc3-5b1c-4f0e-9a3d-7c2b8d41a6f9 · **Pedido em:** 2026-10-16 15:25 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "ERA OUTRO ERRO, QUE EU ACHEI QUE ERA ESSE, E JA RESOLVI, ENTAO PODE VOLTAR ESTA DAQUI" e
"A AULA_TURMA, DEVE ESTAR LIGADA A CHAVE DA AULA [AULA.ID], CHAVE DA MATERIA, CHAVE DA TURMA,
BLOQUEIO DE ATIVIDADE, DEVE TER, DATA DE AULA, E BLOQUEIO DA AULA MESMO; AS CONFIGURACOES, DEVEM SER
PEGAR PELA TURMA SELECIONADA NO COMBOBOX ACIMA [combo "Turma:" do índice]; ESTE COMBO DE TURMA, DEVE
POR PADRAO VIR SELECIONADO A TURMA FAVORITA. AGORA SO CRIE A TAREFA E PUBLIQUE NO QUADRO"
**Objetivo:** recriar a `aula_turma` (removida na #193, que foi pedida por engano: o erro era outro,
já resolvido) ligada à aula, à matéria e à turma, com data da aula e bloqueio da aula por turma, e
ligar tudo à turma escolhida no combo "Turma:" do índice (padrão: a turma favorita).

> ✅ **Concluída** em 2026-10-16 18:39 com o aceite do usuário (#206.7).

### Escopo (proposta, para aprovação)

**Entra:**
- **Banco:** tabela `aula_turma` com uma linha por aula × turma:
  - `aula_id` → `aulas.id` (a chave da aula);
  - `materia_id` → `materia.id` (a chave da matéria; redundante com a aula, mas pedida — conferir
    por restrição que a matéria bate com a da aula);
  - `turma_codigo` → `turma.codigo` (a chave da turma; mesma ligação da versão anterior);
  - `data_aula` (pode ficar vazia) e `bloqueio` (boolean, padrão `false`) = bloqueio **da aula**
    nessa turma;
  - único por (`aula_id`, `turma_codigo`); RLS com JWT (aluno lê as da própria turma; professor lê
    e grava).
- **Bloqueio de atividade:** continua em `atividade.bloqueio` (por turma, regra de 2026-10-05).
  Ao bloquear a aula na turma, o gatilho põe o código da turma nas atividades ativas da aula (como
  na #186); desbloquear não mexe nas atividades.
- **Combo "Turma:" do índice:** abre **sempre com a turma favorita** selecionada; data da aula,
  bloqueio da aula e ON/OFF das atividades passam a valer para a turma do combo (o aviso
  `turma-indice-alterada` já existe e a #190 já o usa).
- **Telas:** o card do índice e o "Editar aula" leem e gravam data e bloqueio da aula na turma do
  combo (nas matérias com o bloqueio da aula ligado, `indice-bloqueio-aula-config.js`).
- **Dados:** recarregar as datas do calendário ITIC nas 2 turmas
  (`database/2026-10-16-aula-turma-calendario-itic.sql`, 38 linhas).
- Documentação: `docs/database.md` e `docs/regras/atividades.md`.

**Não entra:** o ON/OFF das atividades como está (#190), o bloqueio da aula inteira por
`aulas.ativo` (global), e as tarefas #189, #191 e #192. Sem testes automatizados e sem navegador.

**Critério de pronto:** tabela criada com as 3 chaves, `data_aula` e `bloqueio`; combo abre na
turma favorita; trocar a turma no combo troca a data, o bloqueio da aula e o ON/OFF das atividades;
aluno de uma turma não vê a aula bloqueada para ela; o usuário aceita.

**Ponto a decidir na aprovação:** a #185–#188 (versão anterior) está no Git e pode ser a base
(commits `b8e37ece`, `77167473`, `7877270b`, `1f56c8e6`, e `a8e76428` que a removeu). A #193.2
apagou do código `datas-aulas-turma.js`, `datas-aulas-turma.css` e `aula-turma-repositorio.js`;
os SQLs antigos ainda existem em `database/`. Reaproveitar ou refazer só o necessário.

### Riscos

- **Mexe em banco de produção e em segurança (RLS):** é tarefa grande; só o Claude Code local
  pega as partes de banco (`multiplas-ias.md`). Plano B: o SQL antigo de `database/` (idempotente).
- **O `DROP TABLE` da #193.4 pode ter rodado ou não** (o usuário rodava no SQL Editor): conferir no
  banco se `public.aula_turma` existe antes de criar (o SQL usa `create table if not exists`).
- **Voltar o código antigo pode repetir o erro da #188** (`EVENTO_TURMA_ESCOLHIDA_INDICE` declarada
  duas vezes e quebrando o índice): conferir as constantes globais dos scripts carregados no índice.
  O usuário disse que o erro que parecia ser desta tarefa era outro e já está resolvido.
- **Conflito com a #190** (ON/OFF por turma do combo): reaproveitar o mesmo aviso de troca de turma.

### Decisões

- 2026-10-16 15:25 — **Pedido:** o usuário mandou voltar a regra e pediu, por ora, **só criar a
  tarefa e publicar no quadro**.
- 2026-10-16 15:20 — **Aprovação do plano:** o usuário respondeu "Sim, aprovo o plano da #206".
  Escopo aprovado como está acima. Registrado por Claude Code (Sonnet 5.5) (local · main).
- 2026-10-16 15:20 — **#206.2 não foi assumida por esta frente:** é nível PESADO (banco) e esta
  sessão é Sonnet 5.5; `niveis.md` reserva PESADO a Opus 5.5+ ou Fable. Aguarda o usuário decidir
  (abrir a sessão com Opus/Fable ou autorizar expressamente esta).
- 2026-10-16 15:23 — **Exceção de nível autorizada pelo usuário:** "Autorizo expressamente esta
  sessão (Sonnet 5.5) a assumir a #206.2, mesmo sendo PESADO." Vale só para a #206.2 e só para
  esta sessão (`niveis.md`: a tabela é do usuário). Registrado por Claude Code (Sonnet 5.5)
  (local · main · s12).
- 2026-10-16 15:52 — **#206.3:** o usuário pediu "assuma a #206.3 e aplique o SQL
  2026-10-16-aula-turma-materia.sql no banco pelo conector, conferindo depois" (autoriza aplicar
  esse SQL em produção e estende a exceção de nível à #206.3). Registrado por Claude Code
  (Sonnet 5.5) (local · main · s12).
- 2026-10-16 15:58 — **#206.4:** o usuário mandou assumir e disse "A exceção de nível vale para ela". Registrado por Claude Code (Sonnet 5.5) (local · main · s12).
- 2026-10-16 18:11 — **#206.4 a #206.6 passam para a frente s14:** o usuário pediu "termine a tarefa 206". A s12 não tinha commit nem arquivo alterado desde a reserva (15:58). Registrado por Claude Code (Opus 5.5) (local · main · s14).

### #206.1 — Aprovação do plano pelo usuário

**Próximo passo:** — (entregue).

- **Nível:** LEVE — conferência do usuário (a aprovação é do usuário, não de IA).
- **Critérios de aceitação:** "sim" claro registrado em Decisões, com data e hora.
- **Entrega:** aprovação de 2026-10-16 15:20 registrada em Decisões. **Verificação:** resposta do
  usuário no chat.

### #206.2 — SQL: recriar a `aula_turma` com as 3 chaves, data, bloqueio da aula e RLS

**Próximo passo:** — (entregue; aplicar na #206.3).

- **Nível:** PESADO — banco (tabela, chaves, RLS, gatilho).
- **Critérios de aceitação:** `aula_id`, `materia_id` e `turma_codigo` com chave estrangeira;
  `data_aula` aceita vazio; `bloqueio` padrão `false`; gatilho propaga o bloqueio às atividades;
  RLS + JWT (`security-banco.md`).
- **Descoberta (consulta só de leitura, 2026-10-16 15:30):** a #193 **nunca foi aplicada**: a
  `aula_turma` continua no banco com 38 linhas (2 turmas, 0 bloqueadas), colunas `aula_id`,
  `turma_codigo`, `data_aula` (aceita vazio) e `bloqueio`, 4 chaves/restrições (PK, única, FK da
  aula, FK da turma), o gatilho do bloqueio e as 4 políticas de RLS. Por isso **não se recria a
  tabela**: só falta a chave da matéria.
- **Entrega:** `database/2026-10-16-aula-turma-materia.sql` (idempotente, sem apagar dados):
  coluna `materia_id` preenchida pela aula, `not null`, FK para `materia.id`, gatilho que copia
  sempre a matéria da aula e índice `(turma_codigo, materia_id)`. Registrado como **PENDENTE** em
  `database/SEEDS-APLICADOS.md`; o `2026-10-16-remover-aula-turma.sql` virou **SUBSTITUÍDO** (nunca
  rodou e não vai rodar) e a #193.4 ficou obsoleta (recado para a frente s6 em `RECADOS.md`).
- **Verificação:** consultas de leitura ao banco (existência, colunas, restrições, gatilho,
  políticas, tipos de `materia.id`/`turma.codigo`/`aulas.materia_id`); SQL conferido por leitura.
  Ainda **não executado** (é a #206.3).

### #206.3 — Rodar o SQL e recarregar as datas do calendário ITIC

**Próximo passo:** — (entregue; a #206.4 é a próxima).

- **Nível:** PESADO — banco de produção, só o Claude Code local.
- **Critérios de aceitação:** tabela com 38 linhas de data para as 2 turmas; conferência por
  consulta; seed registrado como CONCLUÍDO.
- **Ajuste de escopo:** como a tabela já tinha as 38 datas (a #193 nunca rodou), **não** foi
  preciso recarregar o calendário ITIC; só se aplicou o SQL da matéria.
- **Entrega:** `database/2026-10-16-aula-turma-materia.sql` aplicado pelo conector em 2026-10-16
  15:55; seed **CONCLUÍDO** em `database/SEEDS-APLICADOS.md`.
- **Verificação (banco real):** 38 linhas, 0 sem matéria, 0 com matéria diferente da aula;
  `materia_id` not null; FK `aula_turma_materia_id_fkey`, índice `aula_turma_turma_materia_idx`,
  gatilhos de matéria e de bloqueio e 4 políticas de RLS presentes; `authenticated` não executa a
  função do gatilho; teste em transação desfeita: gravar matéria errada (certa + 999) ficou com a
  matéria da aula (25).

### #206.4 — Combo "Turma:" abre na turma favorita e comanda data, bloqueio da aula e atividades

**Próximo passo:** — (entregue).

- **Nível:** PESADO — mais de 3 arquivos ligados e segurança (quem vê a aula bloqueada).
- **Critérios de aceitação:** combo sempre abre na favorita; trocar a turma remonta data, botão
  "Aula liberada/bloqueada" e ON/OFF das atividades; aluno sem acesso à aula bloqueada na turma
  dele; sem constante global repetida entre os scripts do índice.
- **Entrega (2026-10-16 18:18, Claude Code (Opus 5.5) (local · main · s14)):** `assets/js/aula-turma-repositorio.js`
  (novo: lê as linhas da turma, as aulas bloqueadas nas turmas e as turmas do aluno; grava a linha);
  `indice-aula-bloqueio.js` (bloqueio = `aulas.ativo = false` **ou** `aula_turma.bloqueio` da
  turma lida; o botão grava na turma do combo; sem turma, grava `aulas.ativo` como antes);
  `indice-aula-data.js` (lê a turma ao desenhar e ouve `turma-indice-alterada` para redesenhar);
  `atividades-crud-modal.js` (carrega o repositório); comentário em `indice-turma-favorita.js`.
  O combo já abria na favorita (`lista.value = favorita`) e o ON/OFF das atividades já seguia o
  combo (#190): não precisaram mudar.
- **Decisão (Opus 5.5, 2026-10-16 18:18):** liberar no índice uma aula com `aulas.ativo = false` (hoje as aulas
  124 e 126 de Testes de Front-End) grava `bloqueio = true` nas **outras** turmas do combo, faz
  `ativo = true` e libera só a turma escolhida (sem isso, liberar uma turma liberaria todas).
  Aluno: perde a aula só se ela estiver bloqueada em todas as turmas dele (igual ao RLS das
  atividades).
- **Verificação:** `node --check` nos 5 scripts; linhas novas até 100 caracteres; nenhuma
  constante ou função nova repetida em `assets/js` e `js`; consultas de leitura ao banco
  (colunas, gatilhos BEFORE/AFTER, 4 políticas, 0 linhas bloqueadas). Sem navegador: o teste na
  tela é o aceite (#206.7).

### #206.5 — "Editar aula": data e bloqueio da aula na turma do combo

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código com lógica em até 3 arquivos.
- **Critérios de aceitação:** o modal lê e grava `aula_turma` da turma do combo.
- **Entrega (2026-10-16 18:18, Opus 5.5, s14):** `assets/js/indice-aula-modal-turma.js` (novo): campos "Data da
  aula (turma X)" e "Aula bloqueada nesta turma" (só nas matérias com o bloqueio da aula ligado e
  quando o bloqueio já leu a mesma turma), lidos do banco ao abrir; sem turma, desabilitados. Salvar
  grava primeiro a tabela `aulas` e depois só o que mudou na turma. `indice-aula-modal.js` usa o
  novo arquivo e deixa de mostrar `aulas.data_planejada`; CSS do campo oculto em
  `assets/css/indice-aula-data.css`.
- **Verificação:** `node --check`; leitura do fluxo (a data gravada pelo modal é registrada no
  estado do bloqueio para não duplicar a linha; sem linha lida, relê antes de criar).

### #206.6 — Documentação

**Próximo passo:** — (entregue).

- **Nível:** LEVE — só `.md`.
- **Entrega (2026-10-16 18:18, Opus 5.5, s14):** `docs/database.md` (seção da `aula_turma` no lugar da
  "removida (#193)", que nunca rodou), `docs/relatorio_verificacao_database.html` (mesma seção) e
  `docs/regras/atividades.md` (bloqueio da aula por turma). **Verificação:** conferido com o
  banco e com `database/SEEDS-APLICADOS.md`.

### #206.7 — Aceite do usuário

**Próximo passo:** — (entregue).

- **Nível:** LEVE — conferência do usuário.
- **Entrega:** aceite do usuário em 2026-10-16 18:39 ("206-aceita"). **Verificação:** resposta do usuário no chat.
