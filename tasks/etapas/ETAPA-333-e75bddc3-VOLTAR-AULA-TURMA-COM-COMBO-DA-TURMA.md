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

> ⚠️ **Só criada e publicada.** Nada foi executado: nem banco, nem código. Falta o plano ser
> aprovado (#206.1) e a tarefa ser assumida por uma frente.

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
  tarefa e publicar no quadro**. Aprovação do plano: **pendente** (#206.1).

### #206.1 — Aprovação do plano pelo usuário

**Próximo passo:** 👀 o usuário lê o escopo acima, corrige o que quiser e responde "sim".

- **Nível:** LEVE — conferência do usuário (a aprovação é do usuário, não de IA).
- **Critérios de aceitação:** "sim" claro registrado em Decisões, com data e hora.

### #206.2 — SQL: recriar a `aula_turma` com as 3 chaves, data, bloqueio da aula e RLS

**Próximo passo:** ler `database/2026-10-16-aula-turma.sql` e `...-bloqueio.sql`, conferir no banco
se a tabela existe e escrever o SQL novo (idempotente) com `materia_id`.

- **Nível:** PESADO — banco (tabela, chaves, RLS, gatilho).
- **Critérios de aceitação:** `aula_id`, `materia_id` e `turma_codigo` com chave estrangeira;
  `data_aula` aceita vazio; `bloqueio` padrão `false`; gatilho propaga o bloqueio às atividades;
  RLS + JWT (`security-banco.md`).

### #206.3 — Rodar o SQL e recarregar as datas do calendário ITIC

**Próximo passo:** depende da #206.2; rodar pelo conector (só `create`/`insert`, sem apagar dados)
e registrar em `database/SEEDS-APLICADOS.md`.

- **Nível:** PESADO — banco de produção, só o Claude Code local.
- **Critérios de aceitação:** tabela com 38 linhas de data para as 2 turmas; conferência por
  consulta; seed registrado como CONCLUÍDO.

### #206.4 — Combo "Turma:" abre na turma favorita e comanda data, bloqueio da aula e atividades

**Próximo passo:** depende da #206.3; ler `indice-turma-favorita.js`, `indice-aula-data.js`,
`indice-aula-bloqueio.js` e `indice-atividades-bloqueio.js`.

- **Nível:** PESADO — mais de 3 arquivos ligados e segurança (quem vê a aula bloqueada).
- **Critérios de aceitação:** combo sempre abre na favorita; trocar a turma remonta data, botão
  "Aula liberada/bloqueada" e ON/OFF das atividades; aluno sem acesso à aula bloqueada na turma
  dele; sem constante global repetida entre os scripts do índice.

### #206.5 — "Editar aula": data e bloqueio da aula na turma do combo

**Próximo passo:** depende da #206.4; ler `indice-aula-modal.js` e `indice-aula-repositorio.js`.

- **Nível:** MEDIO — código com lógica em até 3 arquivos.
- **Critérios de aceitação:** o modal lê e grava `aula_turma` da turma do combo.

### #206.6 — Documentação

**Próximo passo:** depende da #206.5; atualizar `docs/database.md` e `docs/regras/atividades.md`.

- **Nível:** LEVE — só `.md`.

### #206.7 — Aceite do usuário

**Próximo passo:** 👀 depois das entregas, o usuário abre o índice como professor, troca a turma no
combo e confere data, bloqueio da aula e ON/OFF das atividades.

- **Nível:** LEVE — conferência do usuário.
