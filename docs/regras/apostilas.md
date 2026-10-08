# 📚 Regras do projeto — Apostilas

> Parte das regras do projeto aulasenai. **Vale como se estivesse no `CLAUDE.md`** (índice e regras de sempre no [`CLAUDE.md`](../../CLAUDE.md)). Ao alterar este arquivo, atualizar a **Versão das regras** e o histórico no `CLAUDE.md`.

---

## 📘 REGRAS APOSTILAS

Registrada em 2026-10-03 a pedido do usuário (padrões definidos na validação do piloto). Plano:
`docs/gerador-apostilas.md`. **Reforço de Linguagens (2026-10-07):** introdução + 10 capítulos gerados, conferência 100%
(138/138), aguardando validação; vídeos pendentes (`REFORCO_LINGUAGENS/APOSTILA/STATUS-APOSTILA.md`).
**Status (2026-10-07):** ✅ piloto **Introdução à TIC (ITIC)** com os
**10 capítulos** escritos, Markdown completo (conferência 100%), HTML e PDF (84 páginas) gerados;
👀 aguardando a validação dos capítulos e a conferência dos vídeos pelo professor. Nas próximas
matérias, continua **um capítulo por vez, perguntando a cada capítulo** (rascunhos em
`APOSTILA/RASCUNHOS/`, fora da apostila).

### 🏷️ IDENTIFICAÇÃO DA APOSTILA: AUTOR, VERSÃO, DATA E HORA (REGRA GLOBAL)

Registrada em 2026-10-07 a pedido do usuário. Vale para **todas as apostilas de todas as
matérias**; começou pela ITIC.

- ✅ **Toda apostila mostra autor, versão, data e hora:**
  - **HTML:** na capa (quadro "Autor · Versão · Data e hora") e a versão no rodapé de todas as
    páginas ("Apostila — <UC> · Versão X · SESI SENAI"), saindo também no PDF;
  - **Markdown completo:** a linha `> **Autor:** … · **Versão:** … · **Data e hora:** …` no
    cabeçalho, regravada pelo gerador a cada geração do HTML (sempre igual ao HTML).
- ✅ **Dados no `materia.json`** (obrigatórios; sem eles o gerador para com erro):
  `autor_apostila` (ITIC: **Gelvazio Camargo**) e `versao_apostila` (ex.: `"1.0"`).
- ✅ **Data e hora** = momento da geração do HTML (`DD/MM/AAAA às HH:MM`), automáticas.
- ✅ **Versão:** ao mudar o conteúdo da apostila, aumentar `versao_apostila` antes de gerar —
  ajuste/correção → `1.0` para `1.1`; capítulo novo ou mudança grande → `1.x` para `2.0`.
  Gerar de novo sem mudar conteúdo mantém a versão (só a data e hora mudam).
- ✅ Código: `assets/gerador-apostilas/gerar_apostila.py` (`gravar_identificacao_markdown`),
  `markdown_apostila.py` (`linha_identificacao`, `atualizar_identificacao`),
  `template_apostila.html` e `assets/css/apostila.css` (`.capa-apostila__identificacao`).
- ✅ **Obrigatória em TODAS as apostilas** (2026-10-07, pedido do usuário): toda matéria que
  tem apostila — ou que vai ganhar uma — tem `autor_apostila` e `versao_apostila` no
  `materia.json` **antes da primeira geração** (Markdown completo ou HTML). Padrão quando o
  usuário não disser outro: autor **Gelvazio Camargo**, versão **"1.0"**. Logo após preencher,
  gerar o HTML de novo para a identificação aparecer na capa, no rodapé e no Markdown completo.
- ✅ Aplicada em: Introdução à TIC, Testes de Frontend e Reforço de Linguagens (todas versão
  1.0; Reforço em 2026-10-07).

### ⛔ PRÉ-REQUISITO: o Markdown completo bate 100% com a ementa da matéria

Registrada em 2026-10-03 a pedido do usuário. **Vale antes de gerar qualquer capítulo novo e
antes de gerar o HTML**, em todas as matérias.

- ⛔ **Não gerar o resto da apostila** (próximo capítulo, Markdown completo atualizado ou HTML)
  enquanto o `<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md` **não bater 100%** com o
  `EMENTA-CHALKIE-AI.md` da matéria. Qualquer divergência é corrigida **primeiro**.
- ✅ **"Bater 100%" significa que o Markdown completo tem, igual à ementa da matéria:**
  - carga horária da UC e quantidade de aulas (1 capítulo = 1 aula de 4 h);
  - **todas** as capacidades básicas e socioemocionais, com o mesmo texto;
  - **todos** os conhecimentos (domínios e conteúdos), sem faltar nem sobrar;
  - para cada aula: tema, domínios, capacidades, conteúdos, indicadores, situação-problema,
    atividade, estratégias, BNCC e marco — e cada capítulo escrito usa **exatamente** as
    capacidades da sua aula e trata todos os conteúdos oficiais dela;
  - objetivo geral, justificativa, competência integradora, avaliação (instrumentos, valores,
    rubrica, recuperação), recursos/acessibilidade e o glossário oficial;
  - nada de fora da ementa apresentado como oficial (aprofundamentos só como detalhamento
    didático) e nenhuma marca de software imposta (regra da ementa).
- ✅ **Como conferir antes de seguir:** (1) reler a ementa da matéria inteira; (2) rodar a
  **conferência obrigatória** (abaixo) até dar 100%; (3) zerar os avisos ⚠️ dos capítulos;
  (4) informar ao usuário o resultado (✅ bate 100% ou a lista do que foi corrigido) **antes** de
  gerar o próximo capítulo.

### ⛔ CONFERÊNCIA OBRIGATÓRIA ANTES DE GERAR QUALQUER APOSTILA

Registrada em 2026-10-03 a pedido do usuário. **Sempre, antes de gerar uma apostila (HTML) ou um
capítulo novo de qualquer matéria, fazer a conferência do Markdown completo com a ementa da
matéria.**

- ✅ **Comando:** `C:\Python314\python.exe assets\gerador-apostilas\gerar_apostila.py
  <pasta da matéria> --conferir` (módulo `assets/gerador-apostilas/conferir_ementa.py`). Ela
  também roda **sozinha** depois do `--markdown` e **antes do HTML**.
- ⛔ **O HTML fica bloqueado** (o gerador para com erro) se a conferência não der **100%**. Não
  existe opção para pular a conferência; corrigir o que falta e rodar de novo.
- ✅ **O que ela compara, item por item e literalmente** (sem diferenciar maiúsculas e ignorando
  `**`, `_`, `` ` `` e o tipo de travessão): identificação da UC (nome, módulo, carga horária,
  modalidade), justificativa, objetivo geral e dimensões, competência integradora (eixo,
  competência, resultados), capacidades básicas e socioemocionais, indicadores, conhecimentos
  (linha inteira de cada domínio) e detalhamento didático, sequência de aulas (tema, domínios,
  capacidades, atividade e estratégias de cada aula), aula padrão, marcos, situações-problema,
  avaliação (instrumentos, tarefas, formativa, recuperação, rubrica), BNCC, recursos,
  acessibilidade, referências, métricas, ideias (prompts), regras para IA, capacidades ×
  conhecimentos e o glossário oficial (termo + definição).
- ✅ Ela lê a ementa **pela estrutura** (tabelas, listas e campos em negrito do padrão
  `EMENTA-CHALKIE-AI.md`), sem textos fixos de matéria, e aceita as variações de formato entre
  matérias: socioemocionais "**S1 Nome** texto" ou "**S1** — texto"; conhecimentos
  "**Título:** a; b" ou "**Título** — 1.1 a · 1.2 b" (título e cada conteúdo conferidos);
  sequência de aulas lida pelos **títulos das colunas** (tema, domínios/conhecimentos,
  capacidades, estratégias, atividade/entrega); listas e textos da seção de sequência
  (situações de aprendizagem, dificuldades, pirâmide, datas previstas); recursos item a item;
  BNCC com "aulas 1, 2 e 7" ou "todas".
- ✅ **Formato de ementa em listas** (2026-10-07, Reforço de Linguagens): capacidades em lista
  numerada sob "Capacidades ...", "CONTEÚDOS PROGRAMÁTICOS" com `### Módulo N: Título` + lista,
  aulas em negrito `**Aula N — Tema (6h)**`, indicadores `- **Nome:** texto`, situações-problema
  em listas e parágrafos e as seções de texto livre de `SECOES_TEXTO_LIVRE` (Alinhamento,
  Metodologias, Integração, Acompanhamento). No `materia.json`, essas seções ficam em
  `conteudos_programaticos`, `textos_ementa` (`{titulo, texto|itens}`) e
  `avaliacao.rubrica_lista`.
- ⛔ **Seção que existe na ementa mas não foi reconhecida reprova a conferência** (capacidades,
  socioemocionais, indicadores, conhecimentos, sequência, avaliação, BNCC, recursos, prompts,
  regras para IA, glossário): nada pode ficar de fora em silêncio. Formato novo de ementa =
  ampliar o `conferir_ementa.py` (sem textos fixos de matéria) e avisar o usuário.
- ✅ O **Markdown completo pode ser montado antes do primeiro capítulo** (`--markdown` sem
  `CAPITULO-*.md`), justamente para a conferência acontecer antes de escrever os capítulos.
- ✅ **Fora da conferência** (não são conteúdo da apostila): materiais da pasta, plataforma,
  checklist, status e notas de proveniência da ementa.
- ✅ **Nos capítulos**, o gerador também avisa (⚠️) quando tema, capacidades ou termos oficiais do
  glossário diferem do plano, ou quando a **definição** de um termo oficial no capítulo é
  diferente da ementa (tem de ser a da ementa, literal).
- ✅ Para bater 100%, o texto oficial entra **literal** no `materia.json` (copiado da ementa, não
  reescrito) e o Markdown completo o reproduz na seção **"Ementa da matéria (texto oficial)"**, no
  plano de aulas, nas capacidades/conhecimentos, no glossário e nas referências.
- ✅ Se a ementa da matéria divergir da **ementa do curso**, a do curso vence: avisar o usuário,
  corrigir a ementa da matéria/`materia.json` conforme ele decidir e só então conferir o Markdown.

### Gerador e arquivos

- ✅ **Gerador único:** `C:\Python314\python.exe assets\gerador-apostilas\gerar_apostila.py
  <pasta da matéria>` → `<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.html`, gerado a partir do Markdown completo
  `APOSTILA-<MATERIA>.md` (que reúne os `CAPITULO-*.md`). Não montar apostila à mão.
- ✅ **CSS e JS globais e reutilizáveis em qualquer matéria:** `assets/css/apostila.css`,
  `assets/js/apostila.js` e `assets/img/logo-sesi-senai.png`, sem matéria, curso ou docente fixo no
  código e sem `<style>`/`<script>` embutidos. O que muda vem dos dados.
- ✅ **Fontes em `<MATERIA>/APOSTILA/`:** `CONTEUDO/INTRODUCAO.md` (obrigatória),
  `CONTEUDO/CAPITULO-NN.md` (um por aula). Todos os dados da matéria (UC, curso, docente,
  capacidades, conhecimentos e plano de aulas) vêm do `<MATERIA>/materia.json` (ver abaixo).
- ✅ **Fonte do conteúdo = as aulas da matéria** em `<MATERIA>/CONTEUDO/AULA-NN-*.md` (a apostila
  é feita **no final**, lendo essas aulas — regra "AULAS EXTRAÍDAS DA EMENTA EM `CONTEUDO/`") e o
  `EMENTA-CHALKIE-AI.md` (a ementa vence; a ementa do curso vence as duas). Exemplos no contexto
  profissional do curso, com empresa **fictícia**.

### Markdown completo da apostila (fonte final do HTML)

Registrada em 2026-10-03 a pedido do usuário.

- ✅ **1 capítulo = 1 aula** (em geral de 4 h; a última aula pode ter menos horas, e o Reforço de
  Linguagens tem aulas de 6 h e 7 h). Cada aula vira um `CAPITULO-NN.md` em `APOSTILA/CONTEUDO/`.
- ✅ **Fluxo em 3 etapas:**
  1. escrever e validar os capítulos (`CAPITULO-NN.md`), um por vez;
  2. gerar o **Markdown completo da apostila** dentro da pasta `APOSTILA` da própria matéria:
     `<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md`, para o usuário **comparar e acrescentar dados**;
  3. **só no final** gerar a apostila HTML (`APOSTILA-<MATERIA>.html`) **a partir desse Markdown
     completo**.
- ✅ **Conteúdo do Markdown completo, nesta ordem (detalhado):**
  1. **cabeçalho:** UC, curso, docente, carga horária da UC, capítulos previstos (1 capítulo =
     1 aula de 4 h), data de geração e o aviso de que o arquivo é a fonte final;
  2. **sumário com links** (refeito a cada geração, entre os marcadores `sumario:inicio/fim`);
  2a. **"Ementa da matéria (texto oficial)"**: justificativa, objetivo geral, competência
     integradora, avaliação (instrumentos, tarefas, nota final da UC, formativa, recuperação,
     rubrica), recursos e ambientes, acessibilidade, aula padrão (4 h), marcos, capacidades ×
     conhecimentos, regras para IA, métricas e mapeamento BNCC — tudo literal da ementa;
  3. **plano de capítulos:** tabela das aulas (capítulo, aula, tema, 4 h, situação ✅ incluído /
     ⬜ pendente) e, para **cada aula**, a seção "Aula NN — tema" com domínios, capacidades,
     situação-problema, atividade, estratégias, BNCC, marco, termos oficiais do glossário,
     conteúdos oficiais, detalhamento didático, indicadores e ideias da ementa — o roteiro do que
     o capítulo tem de cobrir;
  4. **introdução** (subtítulos viram `##`);
  5. **capacidades da matéria:** básicas, socioemocionais, **conhecimentos da UC** (domínios e
     conteúdos), tabela **capacidades × conhecimentos** e tabela **capacidades por capítulo**;
  6. **glossário** de todos os capítulos, em ordem alfabética, com `_(cap. NN)_`;
  6a. **referências** da ementa;
  7. **capítulos** (identificação com aula, carga horária e capacidades + teoria, vídeos, resumo
     e exercícios).
- ✅ O que o usuário acrescentar no Markdown completo **vale para o HTML**; o gerador **não
  sobrescreve** o Markdown completo existente sem pedido (`--forcar`) e, ao entrar um capítulo
  novo, apenas o acrescenta.
- ✅ **Comando do Markdown completo:**
  `C:\Python314\python.exe assets\gerador-apostilas\gerar_apostila.py <pasta da matéria> --markdown`
  (`--forcar` refaz do zero). Módulo:
  `assets/gerador-apostilas/markdown_apostila.py`. O plano de capítulos vem do `materia.json`
  (`carga_horaria_uc`, `horas_por_aula` = 4, `aulas` = uma por aula); o gerador confere
  se a **soma das horas das aulas** = carga da UC (ver "Carga horária por aula"). Glossário em ordem alfabética sem considerar acentos.
- ✅ **Carga horária por aula** (2026-10-07): quando as aulas não têm 4 h (exceção de Reforço de
  Linguagens: 6 h e 7 h), cada aula do `materia.json` traz `carga_horaria`; o gerador soma as
  aulas para conferir a carga da UC e mostra as horas de cada capítulo. Sem `carga_horaria`, vale
  o `horas_por_aula` (padrão 4).
- ✅ **Vídeos pendentes** (2026-10-07): se o YouTube não puder ser conferido (rede bloqueada), o
  capítulo leva na seção "Vídeos" a linha `- ⏳ Vídeos pendentes: ...` (o gerador avisa e o HTML
  mostra o aviso). ❌ Nunca inventar link, título ou duração; trocar pela lista real assim que
  conferida (status no `STATUS-APOSTILA.md`).
- ✅ **Vídeo com duração "a conferir"** (2026-10-07, decisão do usuário): quando o vídeo foi
  achado pela busca (link, título e canal reais) mas a duração não pôde ser lida, a linha fica
  `- [título](url) — a conferir — canal`; o gerador avisa e o HTML mostra "⏱️ duração a conferir
  pelo professor". O professor troca por `mm:ss` (até 15 min) ou apaga a linha.
- ✅ **Ementa no formato por módulos** (2026-10-08, Fundamentos da Tecnologia e Programação): o
  `conferir_ementa.py` também lê o indicador na tabela de capacidades ("Indicador ..."), BNCC em
  tabela ("Competência geral | Módulos"), prompts `1. **M1:** "..."` e "**Regras para a IA:**",
  glossário `- **Termo:** definição` com "**Marcos de competência:**", recursos em lista, métricas
  em "Indicadores de sucesso" e as listas "Exemplos práticos" e "Orientações ao professor" — sempre
  como alternativa, quando o formato padrão da seção não existe (ITIC, Testes de Frontend e
  Reforço de Linguagens continuam 100%). As seções sem campo próprio vão em `textos_ementa`.
- ✅ **O HTML é gerado a partir do Markdown completo** (2026-10-07): o `gerar_apostila.py` lê a
  `# Introdução` e cada `# Capítulo NN` do `APOSTILA-<MATERIA>.md` (glossário de cada capítulo
  pelo `_(cap. NN)_` do glossário geral); sem o Markdown completo, o gerador para com erro
  (gerar antes com `--markdown`). Os `CAPITULO-NN.md` continuam sendo a fonte do `--markdown`.

### `materia.json`: ARQUIVO ÚNICO de dados de cada matéria (opção B)

Registrada em 2026-10-03 a pedido do usuário (escolheu a opção B: um arquivo só, sem dados
repetidos). Vale para **todas as matérias**. Plano: `docs/arquivo-unico-materia-json.md`.
**Status:** ✅ migração concluída em 2026-10-03 nas 4 matérias que tinham dados (ITIC, Análise de
Dados, Automação, Fundamentos da Tecnologia). As outras 3 ainda têm só UC, curso, docente e
capacidades básicas: completar socioemocionais e conhecimentos quando cada uma for trabalhada.

- ✅ **Cada matéria tem UM arquivo de dados: `<MATERIA>/materia.json`** (na raiz da pasta da
  matéria). Ele substitui `ATIVIDADES/atividades.json` e `APOSTILA/apostila.json`, que **deixam de
  existir**. Nenhum dado da matéria fica repetido em outro JSON.
- ✅ **Todos os geradores leem o `materia.json`** (atividades de 50 questões, avaliação
  discursiva, média final, apostila e o `scripts/extrair-atividades-docx.py`), por um módulo
  único em `assets/gerador-materia/materia.py`, que procura o arquivo subindo a partir da pasta
  informada (ex.: `ATIVIDADES/` → raiz da matéria). Sem `materia.json`, o gerador para com erro
  claro.
- ✅ **Antes de gerar apostila ou atividades, ler a ementa** da matéria (`EMENTA-CHALKIE-AI.md`)
  **e a UC na ementa do curso** (`EMENTA-PRINCIPAL-<CURSO>.md`, que vence) e manter o
  `materia.json` atualizado com o que a ementa diz.
- ✅ **O `materia.json` sempre contém:**
  - **identificação:** `uc`, `uc_curta`, `curso`, `docente`, `autor_apostila`,
    `versao_apostila` (regra "IDENTIFICAÇÃO DA APOSTILA"), `modulo`, `modalidade`,
    `carga_horaria_uc`, `fontes`, `versao_ementa`, `proveniencia`;
  - **capacidades e conhecimentos da ementa:** `capacidades` (básicas `C1`..., texto da ementa do
    curso), `capacidades_socioemocionais` (`S1`...), `conhecimentos` (`dominio`, `titulo`,
    `conteudos`) e `capacidades_x_conhecimentos`;
  - **plano de aulas — 1 aula = 4 h = 1 capítulo da apostila:** `horas_por_aula` (4) e `aulas`, cada
    uma com `numero`, `aula`, `tema`, `carga_horaria`, `dominios`, `capacidades`,
    `conteudos_oficiais`, `detalhamento_didatico`, `indicadores`, `indicadores_numeros`,
    `situacao_problema`, `atividade`, `estrategias`, `bncc`, `marco` (quando houver),
    `termos_glossario_ementa`, `ideias_ementa` (prompts literais da ementa), `dominios_texto`
    (quando a ementa escreve os domínios por extenso, ex.: "10, todos") e `observacao` (ex.:
    como um domínio indicado em duas aulas foi distribuído entre elas);
  - **demais seções da ementa:** `justificativa`, `objetivo_geral`, `competencia_integradora`,
    `indicadores_desempenho`, `detalhamento_didatico_conhecimentos`, `estrategias_siglas`,
    `aula_padrao_4h`, `marcos`, `avaliacao`, `mapeamento_bncc`, `recursos`, `acessibilidade`,
    `glossario_ementa`, `regras_ia`, `metricas`, `referencias` e
    `capacidades_x_conhecimentos_ementa` (linha literal da ementa).
  - **Texto literal:** conteúdos, temas, glossário, objetivos, competência, avaliação, recursos,
    acessibilidade, aula padrão, prompts, regras e referências são **copiados** da ementa, não
    reescritos (é o que permite a conferência dar 100%).
- ✅ **Conteúdo oficial separado do didático:** `conteudos_oficiais` = literal da ementa;
  `detalhamento_didatico` = exemplos e aprofundamentos (regra da ementa de não misturar).
- ✅ Divergência com a ementa do curso: a ementa do curso vence e o usuário é avisado.
- ✅ Outros JSON de pasta continuam com a **própria** responsabilidade e **sem repetir** dados da
  matéria: `ATIVIDADES/media-final.json` (composição da média final) e `atividade.json` das
  atividades práticas de Excel.
- ❌ Não colocar no `materia.json` bibliografia, conteúdo ou capacidade de **outra UC**.
- ❌ Não criar de novo `atividades.json` nem `apostila.json`.

### Cobertura completa da ementa na apostila (nada pode faltar)

Registrada em 2026-10-03 a pedido do usuário, depois de reler a ementa da ITIC e completar o que
faltava. Vale para **todas as matérias**.

- ✅ **Antes de gerar a apostila, reler a ementa inteira e conferir cada seção** contra o
  `materia.json`, a `INTRODUCAO.md` e os capítulos. Tudo o que a ementa traz entra na apostila:

| Seção da ementa | Campo no `materia.json` | Onde aparece na apostila |
|---|---|---|
| Identificação (módulo, carga, modalidade, versão) | `modulo`, `carga_horaria_uc`, `modalidade`, `versao_ementa`, `proveniencia` | Capa e cabeçalho do Markdown |
| Justificativa | `justificativa` | Introdução (Apresentação) |
| Objetivo geral e competência integradora/BNCC | `objetivo_geral`, `competencia_integradora` | Introdução |
| Capacidades básicas e socioemocionais | `capacidades`, `capacidades_socioemocionais` | Página de capacidades + abertura de cada capítulo |
| Indicadores de desempenho | `indicadores_desempenho` + `indicadores`/`indicadores_numeros` do capítulo | Exercícios do capítulo (cada indicador vira ao menos 1 exercício) |
| Conhecimentos (domínios) e detalhamento didático | `conhecimentos`, `detalhamento_didatico_conhecimentos`, `capacidades_x_conhecimentos` | Teoria dos capítulos (todo conteúdo oficial do capítulo é tratado) |
| Sequência de aulas, estratégias, aula padrão, marcos | `aulas`, `horas_por_aula`, `estrategias_siglas`, `aula_padrao_4h`, `marcos` | Plano de capítulos (1 capítulo = 1 aula de 4 h) |
| Situações-problema | `situacao_problema` do capítulo | Teoria/exercícios do capítulo |
| Avaliação (instrumentos, tarefas, formativa, recuperação, rubrica) | `avaliacao` | Introdução ("Como você será avaliado") |
| Mapeamento BNCC | `mapeamento_bncc` + `bncc` do capítulo | Plano de capítulos |
| Recursos, ambientes e acessibilidade | `recursos`, `acessibilidade` | Introdução ("Ambientes, recursos e acessibilidade") |
| Ideias de conteúdo (prompts da ementa) | `ideias_ementa` do capítulo | Exemplos e exercícios do capítulo |
| Regras para IA | `regras_ia` | Seguidas na escrita (sem marca imposta, norma declarada, oficial ≠ didático) |
| Glossário da ementa | `glossario_ementa` + `termos_glossario_ementa` do capítulo | Glossário do capítulo (termo oficial obrigatório) |
| Métricas e referências | `metricas`, `referencias` | Uso do professor / referências |

- ✅ **Conferência automática do gerador** (aviso ⚠️, não bloqueia): para cada capítulo, o tema e
  as capacidades têm de bater com o plano (`aulas` do `materia.json`) e o glossário do
  capítulo tem de conter os termos de `termos_glossario_ementa`. Avisos devem ser resolvidos antes
  de pedir a validação do capítulo ao usuário.
- ✅ **Conferência manual por capítulo** (antes de pedir validação): todos os
  `conteudos_oficiais` tratados na teoria; cada indicador coberto por ao menos 1 exercício; a
  situação-problema da aula usada na teoria ou nos exercícios; as `ideias_ementa` aproveitadas.
- ✅ Encontrou algo na ementa que não está em nenhum campo: **acrescentar ao `materia.json`**,
  registrar nesta tabela e avisar o usuário.

### Formato das fontes (o gerador recusa fora do padrão)

- ✅ **`CONTEUDO/CAPITULO-NN.md`** (NN = número da aula, com 2 dígitos):

```markdown
# Capítulo NN — <tema igual ao da aula no materia.json>

- **Aula:** NN
- **Capacidade:** C1, S1            ← iguais às da aula no materia.json

## Teoria
### <subtítulo>                     ← cada "###" vira subtítulo da teoria e entra no sumário
<texto, listas e tabelas em Markdown; exemplos com a empresa fictícia do curso>

## Vídeos
- [<título exato>](https://www.youtube.com/watch?v=<id>) — mm:ss — <canal>

## Exercícios
### ITEM 1
- **Capacidade:** C1
- **Contexto:** <situação profissional>
- **Comando:** <o que o aluno deve fazer>
- **Linhas:** 4                     ← linhas de resposta (opcional; padrão 3)

## Resumo
- <ponto principal>

## Glossário
- **<Termo>:** <definição>
```

- ✅ Nenhum "## " extra dentro da teoria (quebraria as seções); subtítulos da teoria sempre "###".
- ✅ **`CONTEUDO/INTRODUCAO.md`:** título `# Introdução` e subtítulos `###`: Apresentação,
  Objetivo geral da unidade curricular, Como a apostila está organizada, Como estudar com esta
  apostila, **Como você será avaliado** (instrumentos, valores, rubrica e recuperação da ementa),
  **Ambientes, recursos e acessibilidade** e **Competência integradora** — ou, quando a ementa
  não tiver competência integradora, **Situações de aprendizagem** (e, se houver, "Ferramentas
  que você vai usar").
- ✅ **Busca dos vídeos (sem abrir navegador):** pesquisa na web restrita ao `youtube.com`, em
  português, preferindo canais educacionais; a duração, o título e o canal são lidos dos
  metadados da página do vídeo por `curl` (`lengthSeconds`, `ownerChannelName`); descartar os de
  mais de 15:00. De 1 a 4 vídeos por capítulo, cobrindo os conteúdos principais.

### Ordem da apostila

1. **Capa** (tema SESI SENAI);
2. **Sumário detalhado** com número de página: introdução, capacidades, glossário, cada capítulo
   e, dentro dele, teoria (com os subtítulos), vídeos, resumo e exercícios;
3. **Introdução** ao conteúdo (apresentação/justificativa, objetivo geral, organização, como
   estudar, como você será avaliado, ambientes/recursos/acessibilidade, competência integradora);
4. **Capacidades da matéria:** **todas** as capacidades básicas (C1...) e socioemocionais (S1...)
   da ementa, mais a tabela "capacidades por capítulo" (no Markdown completo, também os
   conhecimentos e a tabela capacidades × conhecimentos);
5. **Glossário** (no início): termos de todos os capítulos, em ordem alfabética;
6. **Capítulos.**

### Cada capítulo (partes obrigatórias, nesta ordem)

1. **Abertura** com as capacidades do capítulo (`- **Capacidade:** C1, S1`);
2. **Teoria + exemplos**;
3. **Vídeos do YouTube de no máximo 15 minutos** (`- [título](url) — mm:ss — canal`): miniatura +
   título + duração + canal + link (funciona na tela e no papel). O gerador **recusa** vídeo com
   mais de 15:00. **Exceção (2026-10-08, pedido do usuário):** quando a duração não pôde ser
   conferida (ex.: sessão em nuvem sem acesso ao YouTube), escrever `a conferir` no lugar de
   `mm:ss` (ver "Vídeo com duração 'a conferir'") e registrar uma tarefa no `TASKS.md` para
   conferir depois. O canal é opcional. A duração é conferida nos metadados do YouTube (`curl`, sem
   navegador) e o professor confere o conteúdo;
4. **Resumo**;
5. **No mínimo 5 exercícios (questões) por capítulo** (mais é permitido), no padrão ITEM
   (CAPACIDADE → linha divisória → Contexto → Comando → Resposta com linhas), cobrindo todos os
   indicadores da aula, em **páginas próprias**, com campos Aluno(a)/Turma/Data e o botão
   **📥 Exportar PDF
   ao lado do título "Exercícios"**, que exporta só os exercícios daquele capítulo.

### Páginas A4 e PDF

- ✅ **Cada página é um card do tamanho de uma folha A4** (210 × 297 mm), no tema
  `GERADOR-AULAS/TEMA-SENAI.png`: fundo branco, faixa vertical à esquerda (azul-escuro `#164193`,
  topo azul-claro `#008ad1` com corte diagonal), logo SESI SENAI no canto superior direito,
  acentos verde `#56b735` e laranja `#e84910`; rodapé com o nome da apostila e o número da página.
- ✅ O `apostila.js` **divide o conteúdo em quantas páginas forem precisas** (tabelas e listas são
  quebradas entre páginas; título não fica sozinho no fim da página). Nada pode passar de uma
  folha.
- ✅ **No PDF, cada card sai como uma página A4**, igual ao tema (`@page { size: A4; margin: 0 }`).
  A margem zero **remove o endereço e a paginação que o navegador imprime**; se algum navegador
  ainda mostrar, desmarcar "Cabeçalhos e rodapés" na impressão.
- ✅ Botões: **Exportar PDF (apostila completa)** no topo e **Exportar PDF** dos exercícios de cada
  capítulo. Os botões não aparecem no PDF.
- ✅ **Paginação no PDF (2026-10-08, todas as apostilas):** o rodapé de toda folha mostra
  **"Página N de T"**; na exportação parcial (só os exercícios de um capítulo), as folhas
  exportadas são numeradas entre si ("Página 1 de 2") e a numeração da apostila volta depois.
  Código: `assets/js/apostila.js` (`numerarPaginas`, `numerarPaginasExportadas`).
- ✅ **PDF sem a faixa azul da esquerda (2026-10-08, todas as apostilas):** a faixa vertical do
  tema só aparece na tela; no `@media print` de `assets/css/apostila.css` ela não sai. As margens
  continuam iguais, para a divisão das páginas não mudar.

### Edições da apostila (ex.: versão reduzida V2)

Registrada em 2026-10-08 a pedido do usuário (1ª edição: ITIC V2 com até 40 páginas). Plano:
`docs/apostila-itic-v2-40-paginas.md`.

- ✅ Uma edição é **outra apostila da mesma matéria**, sem mexer na normal: fontes em
  `APOSTILA/CONTEUDO-<EDIÇÃO>/` (`INTRODUCAO.md` + `CAPITULO-NN.md`), Markdown completo
  `APOSTILA-<MATERIA>-<EDIÇÃO>.md` e HTML `APOSTILA-<MATERIA>-<EDIÇÃO>.html`.
- ✅ Configuração no `materia.json`: `"edicoes_apostila": {"V2": {"versao": "2.0",
  "sem_videos_e_exercicios": true}}` — a versão da edição aparece na capa, no rodapé e no
  Markdown; a apostila normal continua com `versao_apostila`.
- ✅ Comandos: `gerar_apostila.py <pasta da matéria> --markdown --edicao=V2` (`--forcar` refaz) e
  `gerar_apostila.py <pasta da matéria> --edicao=V2` (HTML). A **conferência com a ementa
  (100%)** vale igual para a edição.
- ✅ Com `sem_videos_e_exercicios` (pedido do usuário: ele faz vídeos e exercícios à parte), cada
  capítulo tem só **Teoria, Resumo e Glossário**; sem essa opção, Vídeos e Exercícios continuam
  obrigatórios (mínimo de 5 exercícios). Mesmo reduzida, a edição trata **todos os conteúdos
  oficiais** de cada aula e mantém os termos oficiais do glossário com a definição da ementa.
- ✅ Código: `assets/gerador-apostilas/edicao_apostila.py`.

### Controle e limites

- ❌ **Sem gabarito na apostila** (material do aluno).
- ✅ **Um capítulo por vez, completo** (regra "UMA AULA POR VEZ"), com validação do usuário antes
  do próximo; controle em `<MATERIA>/APOSTILA/STATUS-APOSTILA.md`.
- ✅ A apostila entra no `MENU-ATIVIDADES.js` da matéria (item "📘 Apostila") e recebe o header do
  usuário (`tags_header.py`).
- ⚠️ Respeita `STATUS-PERMISSAO-EMENTA`, matérias semelhantes (só a pasta pedida) e a exceção de
  `QUALIFICACAO-PROFISSIONAL/` (ementa só lida).
