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
