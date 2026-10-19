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
| 2026-10-19 06:24 | Claude Code (Opus 5.5, líder s24) | Causa no JS, não no banco (continua `MEDIO`): corrigir em 2 arquivos — `obterCaminhoHtml` (`atividades-crud-modal.js`) passa a cortar o caminho a partir de `/MATERIAIS/`, como a #285.1 fez na página da atividade, e o módulo das atividades vinculadas compara os caminhos sem diferenciar maiúsculas | `obterCaminhoHtml` é a chave de todos os módulos do índice (grade, vinculadas, nomes, ID/✏️ do professor): corrigindo nela, o professor também passa a achar as atividades com o site numa pasta; `indice-atividades-feitas.js` fica com a s22 (#286.1/#288.1 reservadas) e recebe recado |
| 2026-10-19 07:33 | Claude Code (Opus 5.5, líder s24) | #290 reaberta a pedido do usuário ("teclado travado, continue na correcao", repassado pela s23) com 2 subtarefas da mesma causa: #290.2 (`MEDIO`) — cadeado do aluno (`indice-atividades-bloqueio.js`) e "🧾 LOG" do professor (`indice-log-alternativas.js`) passam a usar a `obterCaminhoHtml`; #290.3 (`MEDIO`, ⛔) — cores e "Fez Atividade?" (`indice-atividades-feitas.js`) | Os 3 módulos têm a própria função de caminho, sem o corte em `/MATERIAIS/`; o `indice-atividades-feitas.js` está reservado pela s22 (#286.1/#288.1, 🔄 desde 2026-10-18 20:20/20:21, sem commit nem mudança no disco) e só o usuário libera reserva de outra frente |

### Diagnóstico (2026-10-19 06:24, líder s24; consultas só de leitura)

- **Banco sem duplicata:** as aulas 21 (AULA 01) e 22 (AULA 02) da ITIC da Logística (matéria 25)
  têm 2 atividades cada — id 2 "Atividade Objetiva" (`…/ATIVIDADES-AULA-01-50-QUESTOES.html`), id 38
  "Atividade Prática — Aula 01" (`…/ATIVIDADE-PRATICA-AULA-01.html`), id 3 e id 39 —, com `pagina`
  igual ao link do `index.html` (`/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/…`).
- **Quem monta os botões:** os links do artigo do HTML vão para o card da aula
  (`indice-aula-grade-banco.js`) e depois `renderizarAtividadesVinculadas`
  (`indice-aula-atividades-vinculadas.js`) acrescenta "📝 <nome do banco>" para cada atividade da
  aula **cuja página o card ainda não tem**, comparando `obterCaminhoHtml(href)` (pathname do
  endereço aberto) com `obterCaminhoHtml(atividade.pagina)`.
- **Causa:** a comparação é exata. Com o site aberto numa pasta antes de `/MATERIAIS/` (servidor
  local, ex.: Live Server na raiz `C:\fontes` → `/aulasenai/MATERIAIS/…`) ou com outras maiúsculas,
  o link do HTML vira `/aulasenai/MATERIAIS/…/ATIVIDADES-AULA-01-50-QUESTOES.html` e a atividade do
  banco `/MATERIAIS/…` — não batem, e o botão do banco entra de novo: "📝 Atividade" (HTML) +
  "📝 Atividade Objetiva" (banco). É a mesma causa da #285 (página da atividade).
- **Provas no print:** nenhum botão ganhou cor (#283/#284) e os links do HTML não trocaram o nome
  pelo do banco (#124): as duas coisas consultam o banco por `pagina=in.(…)` com o mesmo caminho e
  voltaram vazias — mas o aluno lê as atividades pelo `aula_id` (os botões do banco apareceram).
- **Não foi** a #281/#283/#284 nem a #280: elas não criam botão; a duplicata depende só do
  endereço aberto (no endereço exato do site, os caminhos batem e não há botão repetido).

### #290.1 — Achar a causa da duplicata e mostrar cada atividade uma vez só

**Próximo passo:** nenhum — entregue em 2026-10-19 06:27 (falta só o professor conferir na tela).

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
- **Entrega:** commit `fix(indice): atividade duplicada para o aluno no card da aula (#290.1)`
  (2026-10-19 06:27), feito pelo executor-medio (Sonnet), conferido pelo líder:
  - `assets/js/atividades-crud-modal.js` — `obterCaminhoHtml` devolve o caminho a partir de
    `/MATERIAIS/` (constante `PASTA_RAIZ_CAMINHO_CRUD`, busca sem diferenciar maiúsculas), como
    `atividade.pagina` no banco; endereço já em `/MATERIAIS/…` não muda. Vale para todos os módulos
    do índice que usam a função (grade, vinculadas, nomes do banco, ID/✏️ e páginas do CRUD do
    professor).
  - `assets/js/indice-aula-atividades-vinculadas.js` — nova `chaveDoCaminhoVinculadas`: a checagem
    "o card já tem esta página" compara o caminho em minúsculas; o `href` do botão continua
    `atividade.pagina`.
- **Verificação:** `node --check` OK nos dois; `wc -l` 819 e 177 (< 1000); linhas novas ≤ 100
  caracteres; conferência no Node (pasta da sessão, fora do repositório) com `location.href`
  simulado: `…/aulasenai/MATERIAIS/A/B/ATIVIDADES/index.html` + `ATIVIDADES-AULA-01-50-QUESTOES.html`
  → `/MATERIAIS/A/B/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html` (igual ao endereço sem a pasta);
  `.pdf` e `.md` → `null`. Leitura do código: com o caminho igual ao do banco, o card já tem a página
  e o botão "📝 <nome>" não entra de novo. Nada de banco (só consultas de leitura no diagnóstico).
  **Conferir na tela** (sem navegador por regra): abrir o índice da ITIC da Logística como aluno —
  cada card com "📝 Atividade Objetiva" e "📝 Atividade Prática — Aula NN" uma vez só (nome do banco).
- **Anotação:** `indice-atividades-feitas.js` (cores e "Fez Atividade?") e
  `indice-atividades-bloqueio.js` (🔒 do aluno) têm a própria função de caminho, sem o corte em
  `/MATERIAIS/`: com o site numa pasta, as cores e o cadeado não aparecem. Não causam duplicata; o
  primeiro está com a s22 (#286.1/#288.1, recado em `tasks/RECADOS.md`), o segundo ficou em
  Pendências do `STATUS.md`.

### #290.2 — Cadeado do aluno e LOG do professor pelo caminho a partir de /MATERIAIS/

**Próximo passo:** nenhum — entregue em 2026-10-19 07:45 (falta só o professor conferir na tela).

- **Nível:** MEDIO — código com lógica em 2 arquivos JS, sem banco nem RLS (mesmo padrão da #290.1)
- **Modelo:** só Sonnet — nunca outro (#247); executor-medio, líder Opus 5.5 (s24)
- **Effort:** medium
- **Descrição:** `obterCaminhoBloqueio` (`assets/js/indice-atividades-bloqueio.js`) e
  `caminhoDoLinkLog` (`assets/js/indice-log-alternativas.js`) devolvem o pathname do endereço
  aberto; com o site numa pasta antes de `/MATERIAIS/` não acham a atividade no banco (o 🔒 da
  atividade bloqueada não aparece ao aluno; o ON/OFF e o "🧾 LOG" do professor não aparecem).
  Passam a usar a `obterCaminhoHtml` (`atividades-crud-modal.js`, que carrega os dois módulos).
- **Critérios de aceitação:** os 2 módulos com o mesmo caminho do banco; endereço já em
  `/MATERIAIS/…` sem mudança; `node --check` OK; nada de banco.
- **Entrega:** commit `fix(indice): cadeado do aluno e LOG do professor pelo caminho a partir de
  /MATERIAIS/ (#290.2)` (2026-10-19 07:45), feito pelo executor-medio (Sonnet), conferido pelo líder:
  - `assets/js/indice-atividades-bloqueio.js` — saiu a `obterCaminhoBloqueio`; `caminhoDoLink` usa a
    `obterCaminhoHtml` (o 🔒 do aluno e o ON/OFF do professor acham a atividade com o site numa pasta).
  - `assets/js/indice-log-alternativas.js` — `caminhoDoLinkLog` lê `href`/`data-href-bloqueado` e
    devolve `obterCaminhoHtml(endereco)` ("🧾 LOG" do professor).
- **Verificação:** `node --check` OK nos dois; `wc -l` 388 e 294 (< 1000); linhas novas ≤ 100
  caracteres; `grep` sem `obterCaminhoBloqueio` em `assets/` e `js/` e sem cálculo próprio de
  `pathname` nos dois arquivos; leitura: os dois módulos são carregados pelo
  `atividades-crud-modal.js` depois de ele definir a `obterCaminhoHtml` (que devolve `null` sem
  endereço). Nada de banco. **Conferir na tela** (sem navegador por regra): aluno vê o 🔒 na
  atividade bloqueada; professor vê o ON/OFF e o "🧾 LOG" de cada atividade.

### #290.3 — Cores e "Fez Atividade?" pelo caminho a partir de /MATERIAIS/

**Próximo passo:** ⛔ esperar a s22 entregar ou liberar a #286.1/#288.1 (ou o usuário liberar a
reserva); depois trocar a `obterCaminhoFeitas` do `indice-atividades-feitas.js` pela
`obterCaminhoHtml`.

- **Nível:** MEDIO — código com lógica em 1 arquivo JS, sem banco
- **Modelo:** só Sonnet — nunca outro (#247)
- **Effort:** medium
- **Descrição:** no print do usuário, todos os botões laranja e "❌ Não": a `obterCaminhoFeitas`
  não corta em `/MATERIAIS/` e a consulta `pagina=in.(…)` volta vazia com o site numa pasta.
- **Bloqueio:** o arquivo está reservado pela frente s22 (#286.1 e #288.1). **Destrava:** a s22
  entregar ou liberar as duas, ou o usuário liberar a reserva. Recado já deixado à s22 em
  `tasks/RECADOS.md` (2026-10-19 06:27).
- **Critérios de aceitação:** cores e "Fez Atividade?" corretos com o site numa pasta; `node --check`
  OK; nada de banco.
- **Entrega:** — · **Verificação:** —
