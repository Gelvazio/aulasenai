## Etapa 387-4d7a91c2 — Ligar as atividades sem ID à tabela `atividade` e à aula

**Tarefa:** #260-4d7a91c2-8e35-4b60-a1f4-5c92d0b7e316 · **Pedido em:** 2026-10-17 17:51 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "TEM ATIVIDADE SEM ID, COMO A ATIVIDADE = ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html" ·
"1-SIM ID NA TABELA ATIVIDADE, E LIGADO A AULA; 2-FAÇA OS LIGAMENTOS; 3-TODAS AS ATIVIDADES QUE NAO
TIVEREM ID, RELACIONADO"
**Objetivo:** toda atividade de `MATERIAIS` passa a ter um registro (id) na tabela `atividade`,
ligado à sua aula, e a página da atividade usa esse id.

### Diagnóstico (#260.1, 2026-10-17 18:05, consultas de leitura ao banco)

- **Como a página acha o id:** pela coluna `atividade.pagina` = `location.pathname`
  (`assets/js/respostas-atividade-banco.js:46`, `atividade-bloqueio-aula.js:56`). O HTML não
  guarda id: ligar = ter a linha em `atividade` com a `pagina` certa e o `aula_id`.
- **A página do pedido já tem id:** `ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html` = atividade
  **80** (aula 72, "Comunicação Técnica no CD", 40 itens). Nada a fazer nela.
- **Comparação disco × banco** (157 páginas de `MATERIAIS/**/ATIVIDADES/`, sem `index.html` e
  sem as `QUESTAO-NN` das Excel, × 145 linhas com `pagina`): **17 páginas sem id**.

| Grupo | Páginas sem id | Aula de destino | Como ligar |
|---|---|---|---|
| A — Testes de Front-End (matéria 48) | `ATIVIDADES-AULA-06..10-50-QUESTOES` e `ATIVIDADE-PRATICA-AULA-06..10` (10) | aulas 6 a 10 (ainda não existem; o seed cria pelo título) | 10 seeds **PENDENTE** já gerados (`database/2026-10-17-testes-frontend-*-aula-0[6-9]/10-*.sql`, item 22.8 da #22, frente local, sem reserva) |
| B — Comunicação Oral e Escrita (matéria 50) | `ATIVIDADES-AULA-01-50-QUESTOES` e `-02-` (2) | aula 104 (nº 1) e 105 (nº 2) — as mesmas das práticas 118/119 | sem seed: falta o grupo no `scripts/gerar-seed-atividades.py` (fonte `CONTEUDO/*.md`, 50 gabaritos cada) |
| Fora (não são atividade) | `AVALIACAO-MEDIA-FINAL` da ITIC, Banco de Dados e Análise de Dados (3); `ATIVIDADE-GRANDE/brainstorming` e `TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-SIMPLES` (2) | — | não ligar: a média final só calcula notas; as 2 da ATIVIDADE-GRANDE são apoio/resumo sem card (etapa 013) |

- **Achados sem mudança (só relatar):** 5 linhas apontam para página que não existe mais
  (21–24, `ATIVIDADES-AULA-0N-1x-QUESTOES` de Análise de Dados; 84, `ATIVIDADE-GRANDE-02/...`)
  e a 1 ("QUALIDADE") não tem página nem aula. Apagar exige pedido do usuário e backup
  (`security-banco.md`) — fica fora desta tarefa.

### Escopo

- **Entra:** ligar as 12 páginas dos grupos A e B (linha em `atividade` + aula + gabarito pelo
  seed); grupo da Comunicação Oral no gerador; documentação.
- **Não entra:** as 5 páginas "Fora"; apagar as linhas órfãs (21–24, 84, 1); mudar questões,
  gabaritos ou notas das atividades que já têm id; HTML das páginas (não guarda id); a migração
  #25.

### Riscos

- **Banco de produção:** `insert` em `atividade`. Plano B: o SQL de cópia/reversão em `database/`
  (idempotente, `security-banco.md`) e conferência por consulta antes e depois.
- **Aula errada / aula duplicada:** o seed acha a aula pelo `titulo` dentro da matéria; título
  diferente criaria aula nova. Plano B: no grupo B usar exatamente os títulos das aulas 104/105
  e conferir depois que nenhuma aula nova foi criada na matéria 50.
- **Gabarito:** vai só para a tabela `gabarito` (RLS); o HTML não muda (`security-banco.md`).
- **Seed da #22:** os 10 seeds do grupo A são o item 22.8 da #22 (sem reserva, marcado para a
  frente local); aplicá-los aqui também fecha esse item — anotado na #22 só pelo
  `SEEDS-APLICADOS.md`.

### Decisões

- **Pedido confirmado pelo usuário em 2026-10-17:** o id é o da tabela `atividade`, ligado à
  aula; abrange todas as atividades sem id.
- **Plano ainda não aprovado** (tarefa grande: banco + mudança em massa). A #260.1 (Opus 5.5+ ou
  Fable) faz o diagnóstico, completa o plano e pede o "sim" do usuário.
- **2026-10-17 18:05 (Opus 5.5, s20):** o HTML não guarda id, então a antiga #260.3 ("ligar as
  páginas ao id") virou o grupo da Comunicação Oral no gerador; nova #260.5 aplica esse seed.

- **Plano aprovado** pelo usuário em 2026-10-17 18:01 ("sim").

### #260.1 — Diagnóstico e plano com aprovação

**Próximo passo:** — (entregue; plano aprovado em 2026-10-17 18:01).

- **Entrega:** diagnóstico e plano nesta etapa (commit `a9d052dc`).
- **Verificação:** consultas de leitura ao banco (145 linhas com `pagina`) × 157 páginas do
  disco; diferença conferida pela mesma codificação dos caminhos nos dois lados.

- **Nível:** PESADO — banco (consulta) e plano de mudança em massa.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** lista completa das atividades sem id, aula de destino de cada uma,
  casos ambíguos marcados, aprovação do usuário registrada nas Decisões.

### #260.2 — Grupo A: aplicar os 10 seeds de Testes de Front-End (só local)

**Próximo passo:** — (entregue em 2026-10-17 18:12).

- **Entrega (Opus 5.5, s20):** aulas 6–10 da matéria 48 criadas (ids **127–131**, títulos e
  datas dos seeds; `insert ... where not exists`), porque o lote do `dividir_seed.py` não cria aula
  que falta; depois os 10 lotes: objetivas **153–157** (50 gabaritos cada) e práticas
  **158–162** (bloqueadas, 30 tópicos cada), uma por aula 127→131. Os 10 seeds viraram
  **CONCLUÍDO** no `SEEDS-APLICADOS.md` (fecha o item 22.8 da #22).
- **Verificação:** `comparar_md5.py` → 10 de 10 batem; cada lote devolveu atividade, aula e
  itens esperados.

- **Nível:** PESADO — seeds no banco de produção (aulas 6–10, atividades e gabaritos).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** os 10 seeds aplicados pelo ciclo de `seeds.md` (lotes + md5) e
  **CONCLUÍDO** no `SEEDS-APLICADOS.md`; consulta: as 10 páginas com id e `aula_id` das aulas 6–10
  da matéria 48.

### #260.3 — Grupo B: Comunicação Oral no gerador de seeds

**Próximo passo:** — (entregue em 2026-10-17 18:21).

- **Entrega (Sonnet · executor-medio; líder Opus 5.5, s20):** `PASTA_COMUNICACAO_ORAL`,
  `ATIVIDADES_COMUNICACAO_ORAL` (aulas 1 e 2, títulos das aulas 104/105) e o grupo em `GRUPOS`;
  seed `database/2026-10-17-comunicacao-oral-objetivas-aulas-01-02-seed-atividades.sql` gerado
  com `--so`; linha PENDENTE no `SEEDS-APLICADOS.md` posta pelo líder (o `registrar_seed.py` só
  atualiza linha que já existe).
- **Verificação (líder):** `py_compile` passou; diff só no gerador; o SQL acha curso "Rio do Sul
  Mais Tech", matéria e aulas pelos nomes exatos do banco; 50 gabaritos em cada atividade.

- **Nível:** MEDIO — gerador Python, 1 arquivo, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** em `scripts/gerar-seed-atividades.py`, lista `ATIVIDADES_COMUNICACAO_ORAL` com
  as aulas 1 ("Fundamentos da Comunicação no Mundo do Trabalho") e 2 ("Comunicação Interpessoal
  e Trabalho em Equipe"), fontes `CONTEUDO/ATIVIDADES-AULA-0N-50-QUESTOES.md`, e o grupo
  ("Rio do Sul Mais Tech", "Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho");
  gerar `database/2026-10-17-comunicacao-oral-objetivas-aulas-01-02-seed-atividades.sql` com
  `--so=` e registrar PENDENTE.
- **Critérios de aceitação:** `py_compile` passa; o SQL tem 2 atividades com 50 gabaritos cada e
  os títulos exatos das aulas 104/105.

### #260.5 — Grupo B: aplicar o seed da Comunicação Oral (só local)

**Próximo passo:** aguarda a #260.3.

- **Nível:** PESADO — seed no banco de produção.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** seed **CONCLUÍDO** (md5); as 2 páginas com id e `aula_id` 104/105;
  nenhuma aula nova na matéria 50.

### #260.6 — ID do banco em todos os botões de atividade do card

**Próximo passo:** — (entregue em 2026-10-17 18:17; conferir na tela: aula 27 da ITIC).

- **Entrega (Sonnet · executor-medio; líder Opus 5.5, s20):** `atividades-crud-modal.js` escuta
  `aula-bloqueio-alterado` (constante própria `EVENTO_CARDS_REFEITOS_CRUD`) e, só para professor
  (`crudProfessorAtivo`), coleta de novo as páginas e refaz as etiquetas pelo banco
  (`atualizarIdsAposCardsRefeitos`); consulta mais recente vence (`consultaIdsCardsCrud`), sem
  etiqueta duplicada.
- **Verificação (líder):** diff só no arquivo da lista; `node --check` passou; 742 linhas; a
  coleta e o registro do evento ficam sem `await` no meio (sem corrida com os botões do banco);
  o evento é disparado depois dos botões e dos nomes (`indice-aula-data.js:399-402`), e
  `renderizarNomesDasAtividades` preserva a etiqueta (`indice-aula-data.js:298`). Sem navegador.

- **Nível:** MEDIO — JS de tela, 1 arquivo, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Pedido (2026-10-17 18:20):** "a aula id=27, lista atividades, que não mostram seu id" ·
  "deve sempre vir do banco de dados, em todas as atividades".
- **Causa (líder, leitura do código):** a etiqueta "ID NN" é posta por `mostrarIdsNosCards`
  (`atividades-crud-modal.js:589`) só para as páginas de `estadoCrud.paginas`, coletadas **uma
  vez** em `iniciarCrudAtividades` (linha 604). Os botões "📝" das atividades vinculadas pelo
  banco (`indice-aula-atividades-vinculadas.js`; ex.: 80, 81, 84 e 36, hoje na aula 27) chegam
  **depois** e nunca recebem a etiqueta nem o ✏️. Nenhum id está escrito no HTML.
- **Descrição:** sempre que os botões vinculados forem (re)feitos — evento
  `aula-bloqueio-alterado` (`EVENTO_BLOQUEIO_ALTERADO_CARDS_AULA`, disparado por
  `indice-aula-data.js`) —, coletar de novo as páginas do índice e refazer as etiquetas pelo
  banco (`listarAtividadesCrud`). Só para professor (como hoje).
- **Critérios de aceitação:** todo `a.btn.principal` com atividade cadastrada mostra "ID NN" do
  banco, inclusive os 📝 vinculados; sem etiqueta duplicada; `node --check` passa; função ≤ 45
  linhas e JSDoc; arquivo ≤ 1000 linhas.

### #260.4 — Documentação

**Próximo passo:** aguarda a #260.2 e a #260.5.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Critérios de aceitação:** `docs/regras/atividades.md` registra que a página acha o id pela
  `pagina` (sem id no HTML) e que página nova só fica ligada depois do seed; `STATUS-ATIVIDADES.md`
  da Comunicação Oral com os ids novos.
