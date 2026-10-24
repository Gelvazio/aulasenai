## Etapa 523-2d18d485 — Confirmar média do aluno (`media_finalizada`) no card "Notas e média"

**Tarefa:** #374-2d18d485 · **Pedido em:** 2026-10-24 19:41 · **Criada por:** Devin (SWE-2) (local · main)
**Pedido:** "AO SELECIONAR O ALUNO, DEVE CARREGAR AS NOTAS DE TODAS AS ATIVIDADES RESPECTIVAS DO
ALUNO NO QUADRO ABAIXO, DEVE TER UM BOTAO DE NOME *Confirmar Media Aluno*, so aparece pro
professor, se ele marcar deve gravar 1 valor numa nova coluna de nome media_finalizada=1 na tabela
da materia do banco de dados e o aluno nao deve mais ser carregado na lista de alunos de forma
inicial, deve ter um botao de nome *listar todos* do tipo on/off, se ligado, dai sim, lista ate os
alunos com Media Confirmada, senao no combo deve vir apenas os alunos com a Media Nao Confirmada.
Use varios agentes pra fazer isso" (print do índice de atividades de Introdução à TIC, card
"Notas e média").
**Objetivo:** o professor confirma a média final de um aluno na matéria; o aluno confirmado sai do
combo Aluno do card (o interruptor "Listar todos" o traz de volta).

### Escopo

- **Entra:** tabela `media_finalizada` no banco (aluno × matéria) com RLS; repositório
  (`assets/js/card-notas-media-repositorio.js`): id da matéria da página, listar e gravar o flag;
  visão (`assets/js/card-notas-media.js` + `assets/css/card-notas-media.css`): interruptor
  **"Confirmar Media Aluno"** (só professor; ON grava `true`, OFF grava `false`), interruptor
  **"Listar todos"** (OFF = combo só com alunos de média **não** confirmada; ON = todos) e combo
  Aluno filtrado; documentação em `docs/database.md` e no relatório HTML.
- **Não entra:** mudar notas, média ou correções; `AVALIACAO-MEDIA-FINAL.html`; outros índices
  (o card já é global — `atividades-crud-modal.js` o carrega em todos).

### Requisitos (EARS)

- QUANDO o professor seleciona um aluno no combo, O SISTEMA DEVE carregar na tabela as notas de
  todas as atividades do índice daquele aluno. Verificação: leitura (`escolherAlunoNotas` +
  `buscarNotasParaProfessor`) e conferência do usuário na tela.
- QUANDO o professor liga "Confirmar Media Aluno" com um aluno selecionado, O SISTEMA DEVE gravar
  `media_finalizada = true` no par (aluno, matéria da página). Verificação: consulta ao banco.
- QUANDO o professor desliga o interruptor, O SISTEMA DEVE gravar `media_finalizada = false` e o
  aluno volta a aparecer no combo. Verificação: consulta ao banco.
- ENQUANTO "Listar todos" estiver OFF, o combo Aluno DEVE listar somente alunos sem média
  confirmada na matéria da página. Verificação: leitura do filtro + consulta.
- ENQUANTO "Listar todos" estiver ON, o combo DEVE listar também os alunos com média confirmada
  (marcados no texto da opção). Verificação: leitura.
- O SISTEMA DEVE mostrar "Confirmar Media Aluno" e "Listar todos" somente com perfil PROFESSOR
  logado. Verificação: leitura (`estadoNotas.ehProfessor`) + policies.
- O SISTEMA DEVE recusar gravação de `media_finalizada` por aluno ou visitante (RLS: insert/update
  só professor da turma). Verificação: consulta das policies.

### Invariantes

- Para todo (aluno, matéria) há no máximo 1 linha em `media_finalizada` — PK
  `(aluno_id, materia_id)`. Conferir: definição da PK no SQL.
- `media_finalizada = true` só por professor da turma (`eh_professor()` e
  `professor_tem_turma(turma_codigo)`); `anon` sem acesso. Conferir: policies.
- Aluno logado nunca recebe os controles do professor no card. Conferir: leitura do gate
  `ehProfessor`.
- Sem linha na tabela = média não confirmada (aluno aparece no combo). Conferir: leitura do filtro.

### Perguntas abertas

- **"Tabela da matéria":** não existe tabela aluno × matéria no schema. **Proposta:** tabela nova
  `media_finalizada(aluno_id, materia_id, turma_codigo, media_finalizada, atualizado_por,
  atualizado_em)`, PK `(aluno_id, materia_id)` — a "nova coluna" `media_finalizada` fica nela.
  Alternativa descartada: coluna em `turmaaluno` esconderia o aluno em **todas** as matérias da
  turma. → confirmar no aceite.
- **Desmarcar:** OFF volta a `false` e o aluno reaparece. → confirmar no aceite.
- **Granularidade:** por matéria (o card é por matéria), `turma_codigo` gravado para o RLS.
  → confirmar no aceite.

### Plano (tarefa grande: banco + vários arquivos — aguarda o "sim" do usuário)

1. **Banco** (SQL idempotente, `database/2026-10-24-media-finalizada.sql`): tabela nova + RLS
   (select: professor da turma ou o próprio aluno; insert/update: só professor da turma; sem
   delete; `anon` fora) + trigger de carimbo (`atualizado_por`/`atualizado_em`).
2. **Repositório:** `lerMateriaIdDaPagina` (pasta → `materia.descricao` → id, como
   `indice-turma-favorita.js`), `listarMediaFinalizadaDaMateria(materiaId)` → Set de `aluno_id`,
   `gravarMediaFinalizada({alunoId, materiaId, turma, finalizada})` (upsert pelo PostgREST).
3. **Visão:** interruptores "Listar todos" e "Confirmar Media Aluno" na área de seleção (só
   professor); combo Aluno filtrado; ao confirmar, a lista recarrega e o aluno sai (se "Listar
   todos" OFF).
4. **Documentação:** `docs/database.md` + `docs/relatorio_verificacao_database.html`.

### Riscos

- Aluno confirmado some do combo → "Listar todos" o traz de volta; ou OFF no interruptor.
- Banco de produção: só com o "sim"; SQL idempotente, sem apagar dados.
- **Exceções por pedido direto do usuário:** (a) "banco só Claude Code local" — esta sessão é
  Devin local com o conector Supabase (já aplicou seeds por RPC; precedente análogo: decisão do
  usuário de 2026-10-21 para a #333.2); (b) matriz de níveis — Devin consta só em `LEVE`, e a
  tarefa é `PESADO`: executada por pedido direto (precedente #343.2).

### Decisões

- **Aprovado pelo usuário em 2026-10-24** ("ponto critico-crie a tabela necessaria"): tabela nova
  `media_finalizada` (aluno × matéria), flag por matéria, OFF volta a `false`. Exceções aceitas:
  Devin executa PESADO e aplica o banco pelo conector Supabase desta sessão (pedido direto).

### #374.1 — SQL: tabela `media_finalizada` (aluno × matéria) com RLS + aplicar no banco

**Próximo passo:** ✅ Entregue em 2026-10-24 — `database/2026-10-24-media-finalizada.sql` criado
e aplicado pelo `database/aplicar_seed.js` (RPC `exec_sql`; o conector MCP está em modo
somente-leitura).

- **Nível:** PESADO — banco/RLS (Jev: PESADO, confiança 1,00; sinal: banco, mais_de_3_arquivos)
- **Modelo:** PESADO · só Sonnet — executada pelo Devin (pedido direto do usuário)
- **Effort:** high · **JEV-AI-SUGGESTION:** NAO
- **Verificação:** consulta ao banco — 6 colunas, RLS ativo, 3 policies
  (`media_finalizada_select/insert/update`), trigger `media_finalizada_auditar_trg` ✅

### #374.2 — Repositório do card: matéria da página + ler/gravar `media_finalizada`

**Próximo passo:** ✅ Entregue em 2026-10-24 pelo agente Devin — `lerMateriaIdDaPagina`,
`listarMediaFinalizadaDaMateria` e `gravarMediaFinalizada` em
`assets/js/card-notas-media-repositorio.js`.

- **Nível:** PESADO — consultas ao banco + RLS sensível (mesma classificação da #371.2)
- **Modelo:** PESADO · só Sonnet — pedido direto do usuário (agente Devin)
- **Effort:** high · **JEV-AI-SUGGESTION:** NAO
- **Verificação:** `node --check` ✅; leitura das 3 funções (ilike da matéria, upsert
  `on_conflict=aluno_id,materia_id`, validações) ✅

### #374.3 — Visão do card: "Confirmar Media Aluno" + "Listar todos" + combo filtrado

**Próximo passo:** ✅ Entregue em 2026-10-24 pelo agente Devin — interruptores em
`card-notas-media.js` (+ classe `__chave` no CSS) e combo Aluno filtrado; só no fluxo do
professor.

- **Nível:** MEDIO — JS/DOM + CSS, 2 arquivos (Jev da mãe: PESADO por banco; esta parte é tela)
- **Modelo:** MEDIO · só Sonnet — pedido direto do usuário (agente Devin)
- **Effort:** medium · **JEV-AI-SUGGESTION:** NAO
- **Verificação:** `node --check` ✅; leitura (gate `ehProfessor`, filtro do combo, reversão em
  falha de gravação) ✅; conferência visual na tela fica com o usuário.

### #374.4 — Documentação (`docs/database.md` + relatório HTML)

**Próximo passo:** ✅ Entregue em 2026-10-24 pelo Devin — seção "media_finalizada" nos dois
arquivos.

- **Nível:** LEVE — só .md e .html de documentação
- **Modelo:** LEVE · só Haiku — pedido direto do usuário (Devin)
- **Effort:** low · **JEV-AI-SUGGESTION:** NAO
- **Verificação:** leitura da seção nova ✅
