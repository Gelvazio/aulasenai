## Etapa 431-7610d51c — #302: Jogo "Liga ou Desliga?" como atividade do banco, com nota gravada

**Tarefa:** #302 · **Pedido em:** 2026-10-20 09:38 · **Criada por:** Claude Code (Opus 5.5) (local · main · s29)
**Pedido:** "crie a atividade no banco de dados com opcao de gravar as notas, como ja e feito hj, ao
finalizar a atividade, deve gravar a nota do aluno no banco de dados, relacionada a atividade"
(página `MATERIAIS/RIO_DO_SUL_MAIS_TECH/NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/ATIVIDADES/jogo_liga_ou_desliga_seguranca_eletrica.html`).
**Objetivo:** o jogo vira uma atividade objetiva igual às que já existem: o aluno entra com o login,
marca LIGAR/DESLIGAR nas 12 situações, entrega, e a nota fica no banco ligada à atividade
(`resposta_atividade` + `entrega_atividade`, nota por `nota_da_tentativa`), aparecendo nos
relatórios e na média final.

### Escopo

- **Entra:**
  - Banco: 1 linha em `atividade` (página = caminho do jogo, `total_itens = 12`, `ativo`, aula
    escolhida pelo professor) e 12 linhas em `gabarito` (A = LIGAR, B = DESLIGAR / NÃO USAR), por
    um seed em `database/` registrado em `database/SEEDS-APLICADOS.md`.
  - Página: o jogo passa a usar o fluxo padrão (`respostas-atividade.js` +
    `respostas-atividade-banco.js` + login/header), com as 12 situações no formato de questão
    (`.questao` / `.alternativas` com A e B). Mantém o visual do jogo (cores, cards, ícones).
  - **Segurança:** a resposta certa (`safe`) e as explicações saem da página (hoje estão no código
    e qualquer aluno vê). A correção do aluno passa a ser a do sistema (gabarito liberado pelo
    professor).
  - `ATIVIDADES/STATUS-ATIVIDADES.md` da matéria com a atividade nova.
- **Não entra:** mudar `respostas-atividade.js` ou as funções do banco; outras atividades; criar
  tabela nova de nota (a nota sai das respostas, como hoje); os campos "nome / data / professor"
  digitados (o aluno é identificado pelo login).
- **Pronto quando:** consulta mostra a atividade e as 12 linhas do gabarito; a página não contém
  nenhuma resposta certa; `node --check` dos scripts e leitura do HTML conferem o padrão;
  o professor confere na tela uma entrega de teste (sem navegador pela IA).

### Riscos

| Risco | Plano B |
|---|---|
| O jogo fica numa pasta (Noções de Eletricidade) cuja matéria **não existe no banco**; a turma QA LBTSN 2026/1 M2 é de **Fundamentos da Tecnologia e Programação** (matéria 26) | Professor escolhe a aula (pergunta aberta 1); se for outra matéria, cadastrar a matéria/aula antes, em subtarefa nova |
| Explicações das 12 situações deixam de aparecer depois de finalizar | O professor libera o gabarito pelo fluxo atual; explicação por item fica como pendência |
| Professor quer manter os campos de identificação digitados | Login já identifica o aluno; o PDF/relatório do sistema traz nome, turma e professor |

### Perguntas abertas

- ✅ 1. Em qual aula a atividade entra? → professor, 2026-10-20 09:44: "a materia é
  MATERIAIS\RIO_DO_SUL_MAIS_TECH\NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS". A matéria não existe no
  banco: entra a #302.0 (cadastrar a matéria no curso 6 com as 9 aulas) e a atividade vai na
  **aula 01 — Segurança em Eletricidade e Grandezas Elétricas Básicas**.
- ✅ 2. Aprovação do plano com a #302.0 → professor, 2026-10-20 09:48: "faça a tarefa 302".

### Decisões

- 2026-10-20 09:39 — Nota pelo fluxo atual (respostas por item + gabarito no banco), sem tabela
  nova: é o "como já é feito hoje" do pedido. Claude Code (Opus 5.5).
- 2026-10-20 09:47 — Nível de todas as subtarefas (#302.0 a #302.3) mudado para MEDIO · só Sonnet, por
  ordem explícita do professor ("mude o nivel da tarefa 302 pra sonnet"), contra os sinais da
  classificação (banco e gabarito = PESADO). Decisão do usuário. Claude Code (Opus 5.5).

### #302.0 — Cadastrar a matéria Noções de Eletricidade e as 9 aulas

**Próximo passo:** ✅ entregue (matéria 51, aula 01 = id 134); seguir para a #302.1.

- **Nível:** MEDIO — banco. (reclassificada de PESADO a pedido do professor)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** seed idempotente `database/2026-10-20-materia-nocoes-eletricidade-aulas.sql` no padrão
  de `2026-10-09-materia-comunicacao-oral-escrita-aulas.sql`: matéria "Noções de Eletricidade e
  Circuitos Básicos" no curso 6 (Rio do Sul Mais Tech), vínculo `cursomateria` e as 9 aulas de
  `ATIVIDADES/STATUS-ATIVIDADES.md` (4 h cada); registrar em `SEEDS-APLICADOS.md`.
- **Critérios de aceitação:** consulta mostra a matéria no curso 6 com 9 aulas; nada duplicado.
- **Entrega:** `database/2026-10-20-materia-nocoes-eletricidade-aulas.sql` aplicado pelo conector em 2026-10-20 10:05 (s30); a coluna `aulas.rotulo_card` do seed modelo não existe mais e foi retirada. O `registrar_seed.py` só aceita `*-seed-atividades.sql`; como o seed-modelo da Comunicação Oral, este não entra no registro.
- **Verificação:** consulta: matéria id 51 no curso 6, 1 vínculo em `cursomateria`, 9 aulas (números 1 a 9), 1 só matéria com esse nome; aula 01 = id 134.

### #302.1 — Seed da atividade e do gabarito no banco

**Próximo passo:** depois da #302.0 (atividade na aula 01 da matéria nova).

- **Nível:** MEDIO — banco e gabarito. (reclassificada de PESADO a pedido do professor)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** gerar `database/2026-10-20-jogo-liga-desliga-seed-atividade.sql` (idempotente) com a
  atividade e as 12 linhas de gabarito tiradas do `safe` atual do jogo; aplicar, conferir e
  registrar em `SEEDS-APLICADOS.md`.
- **Critérios de aceitação:** consulta mostra 1 atividade com a página certa e 12 itens no gabarito
  batendo com o jogo.
- **Entrega:** — · **Verificação:** —

### #302.2 — Página do jogo no fluxo padrão, sem respostas no código

**Próximo passo:** depois da #302.1.

- **Nível:** MEDIO — tira o gabarito da página (segurança) e liga ao banco. (reclassificada de PESADO a pedido do professor)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** reescrever o HTML com o `<body data-...>` e os scripts das atividades objetivas,
  as 12 situações como `.questao` com A) LIGAR e B) DESLIGAR / NÃO USAR; CSS do jogo mantido;
  remover o JavaScript próprio de pontuação e o `safe`/explicações.
- **Critérios de aceitação:** `grep` não acha `safe`/explicações; os scripts padrão estão ligados;
  12 questões com 2 alternativas.
- **Entrega:** — · **Verificação:** —

### #302.3 — STATUS-ATIVIDADES.md da matéria

**Próximo passo:** depois da #302.2.

- **Nível:** MEDIO — só `.md`. (reclassificada de LEVE a pedido do professor)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** incluir a atividade em "Demais atividades da pasta" com o id do banco.
- **Entrega:** — · **Verificação:** —
