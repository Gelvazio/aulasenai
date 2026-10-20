## Etapa 445-50000fd9 — #316: Card da aula só com links de atividades vinculadas no banco

**Tarefa:** #316 · **Pedido em:** 2026-10-20 16:24 · **Criada por:** Claude Code (Opus 5.5) (local · main · s33)
**Pedido:** "nao deve aparecer link que nao tem id de atividade relacionado" · "na aula, devem ser
listados apenas links de atividades que estao ligadas por vinculo na atividade pelo banco de dados".
**Objetivo:** no índice de atividades (todas as matérias), cada card de aula mostra só os links
cuja página é uma atividade com `atividade.aula_id` igual à aula do card; link sem atividade no
banco, de atividade sem vínculo (`aula_id` vazio) ou de outra aula não aparece.

### Situação

- Hoje (`assets/js/indice-aula-grade-banco.js`) um link do artigo do HTML só sai do card se a
  página **for** atividade de outra aula (`linkDeAtividadeDeOutraAula`); página que não está na
  tabela `atividade` continua no card.
- Os vínculos são lidos por `buscarVinculosDasPaginasCard` (`assets/js/indice-aula-repositorio.js`)
  com o caminho exato (`pagina=in.(...)`): no endereço em minúsculas (ex.: Netlify
  `/materiais/...`) nada bate e a regra nova esvaziaria os cards.
- O aluno não lê atividade bloqueada para ele (RLS `atividade_select`: `ativo` e liberada, ou
  professor): com a regra nova, a atividade bloqueada para aquele aluno não aparece no card dele.

### #316.1 — Grade: manter só links de atividades com `aula_id` da aula do card

**Próximo passo:** — (concluída em 2026-10-20 16:32; executor-medio, conferida pelo líder s33)

- **Nível:** MEDIO — lógica JS em 2 arquivos, sem banco novo (só leitura já permitida pelo RLS)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:**
  1. `indice-aula-repositorio.js`: função nova que lê `atividade` por `aula_id=in.(<ids das aulas
     da matéria>)` (`select=pagina,aula_id`) e devolve `Map` chave → `aula_id`, com a chave de
     `obterChaveDaPagina` (`atividades-crud-modal.js`: pasta/arquivo em minúsculas).
  2. `indice-aula-grade-banco.js`: na montagem (`moverConteudoDoArtigo`/`elementoForaDoCard`) e
     em `retirarAtividadesDeOutraAulaDosCards`, um link de `.acoes` só fica se
     `obterChaveDaPagina(lerHrefCrud(link))` existir no mapa **e** o `aula_id` for o da aula do
     card; senão sai junto com os controles que vêm depois dele (ON/OFF, ✏️, "−"). Continua sem
     link repetido. O botão "📕 Slides" (fora de `.acoes`) não muda.
  3. Atualizar os comentários do topo dos dois arquivos (regra nova) e o JSDoc.
- **Critérios de aceitação:** `node --check` nos 2 arquivos; funções ≤ 45 linhas, linhas ≤ 100;
  na leitura, um link sem atividade, com `aula_id` vazio ou de outra aula nunca fica no card; a
  comparação não depende da caixa das letras nem da pasta antes de `/MATERIAIS/`.
- **Entrega:** `245fd4d2`. `buscarVinculosDasPaginasCard` saiu e entrou `buscarVinculosDasAulasCard`
  (lê `atividade` por `aula_id=in.(...)`, mapa pela `obterChaveDaPagina`); `linkForaDaAulaDoCard`
  tira do card todo link sem atividade, com `aula_id` vazio ou de outra aula (na montagem e em
  `retirarAtividadesDeOutraAulaDosCards`). · **Verificação:** `node --check` nos 2 arquivos; nenhuma
  linha > 100; grep sem uso restante da função removida; diff revisado pelo líder. No banco, aula
  06 (id 42) só tem a atividade 32 → o card dela fica só com a 32. A tela só o navegador confirma.
