# 📚 CLAUDE.md — Sistema Completo SENAI — 6 Arquivos HTML

**Versão das regras:** 2026-10-05 07:39

## 🕒 HISTÓRICO DE VERSÕES DAS REGRAS

| Versão (data e hora) | O que mudou |
|---|---|
| 2026-10-05 07:39 | Regra "EQUIPES POR TURMA + MATÉRIA": menu **👥 Equipes** nas páginas de atividades abre o modal com o CRUD das equipes (tabelas `equipe` e `equipe_membro`); `js/menu.js` aceita itens de ação (`acao`) |
| 2026-10-03 20:55 | Regras "MATÉRIA MODELO: INTRODUÇÃO À TIC" (tudo segue a estrutura que funciona na ITIC) e "AULAS EXTRAÍDAS DA EMENTA EM `CONTEUDO/`" (1 aula a cada 4 h, arredondando para cima; arquivo `AULA-NN-DESCRICAO-CURTA.md`; atividades e, no final, apostila feitas a partir dessas aulas); fontes das 50 questões e da apostila apontam para `CONTEUDO/` |
| 2026-10-03 20:47 | Regra "CONTEÚDO SÓ PELOS MARKDOWNS": para conferir ou gerar conteúdo, ler sempre os arquivos Markdown da matéria (em primeiro lugar o `EMENTA-CHALKIE-AI.md`) e **nunca extrair dados de PDF**; fonte da atividade prática de Excel ajustada |
| 2026-10-03 19:04 | Apostilas: conferência com a ementa aceita os formatos de ementa das diferentes matérias (ex.: Testes de Frontend) e **reprova** seção da ementa não reconhecida; Markdown completo pode ser montado antes do 1º capítulo; introdução com "Competência integradora" ou "Situações de aprendizagem", conforme a ementa |
| 2026-10-03 18:14 | Permissão por matéria: seção `STATUS-PERMISSAO-MATERIA` no `STATUS-EMENTAS-CURSOS.md` (matéria só vale com curso e matéria em `VERIFICAR`); no Técnico em Informática para Internet só `TESTES-DE-FRONTEND` fica em `VERIFICAR` |
| 2026-10-03 17:22 | Regra "VISUALIZADOR DE REGRAS ATUALIZADO JUNTO COM O CLAUDE.md" e controle de versão com data e hora (linha acima + este histórico); o visualizador passa a mostrar a versão e a recarregar as regras a cada abertura |
| 2026-10-03 | Regras de aulas uma por vez (`STATUS-AULAS.md`), 1 atividade objetiva de 50 questões por aula (`STATUS-ATIVIDADES.md`) e decisões da fila de geração |
| 2026-09-30 | Versão 1.1 (registro anterior ao controle por data e hora) |

---

## 🔄 REGRA CRÍTICA — VISUALIZADOR DE REGRAS ATUALIZADO JUNTO COM O CLAUDE.md

⚠️ **Sempre que este `CLAUDE.md` for atualizado, o visualizador de regras (menu Regras do header)
também deve ser verificado e atualizado junto, para o usuário ver sempre as regras mais atuais.**
Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Cada versão tem data e hora:** a cada alteração deste arquivo, atualizar a linha
  `**Versão das regras:** AAAA-MM-DD HH:MM` (topo) e acrescentar **no início** do
  "HISTÓRICO DE VERSÕES DAS REGRAS" uma linha com a mesma data e hora e o que mudou.
- ✅ **Verificar o visualizador a cada atualização:** `assets/js/regras-modal.js` (+
  `assets/css/regras-modal.css`, acionado por `js/header-usuario.js`) deve continuar lendo este
  arquivo, mostrar a versão (data e hora) no topo do modal e montar o índice com todas as seções
  `##`. Se a mudança no `CLAUDE.md` quebrar algo do visualizador (formato da linha de versão,
  títulos, tabelas), corrigir o visualizador **na mesma tarefa**.
- ✅ O visualizador busca o `CLAUDE.md` sem cache **toda vez que o modal é aberto** (nada de
  cópia antiga em memória).
- ✅ O commit da tarefa inclui o `CLAUDE.md` e, quando alterados, os arquivos do visualizador.

---

## 🚫 REGRAS DO USUÁRIO QUE VALEM SEMPRE (2026-09-30)

- ⛔ **Nunca abrir navegador** (preview, Browser pane, computer-use, Playwright...) nem iniciar
  servidor de desenvolvimento para validar. Validar por leitura do código, `node`, banco e terminal;
  se só o navegador confirmar, pedir ao usuário que teste.
- ✅ **Final de tarefa:** responder **apenas** `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?` (sem tabela
  nem resumo).
- ✅ **Tarefas pequenas** (ajuste pontual, sem banco/segurança/estrutura nova) **não precisam** de
  plano em `docs/` nem de aprovação prévia; tarefas grandes continuam precisando.
- ✅ **Um commit por tarefa** (local).
- ✅ **Aulas: uma por vez, completa** (2026-10-03): gerar e gravar uma aula (e todo o seu material)
  antes de passar à próxima, controlando em `<MATERIA>/AULAS/STATUS-AULAS.md` (ver a regra
  "GERAR E GRAVAR UMA AULA POR VEZ").
- ✅ **1 atividade objetiva de 50 questões por aula** (2026-10-03), controlada em
  `<MATERIA>/ATIVIDADES/STATUS-ATIVIDADES.md` (ver a regra "1 ATIVIDADE OBJETIVA DE 50 QUESTÕES").
- ⛔ **NUNCA fazer push** (2026-10-01): o push é feito **só pelo usuário, localmente**. Mesmo que
  ele peça "faça push", não executar `git push`; avisar que o commit está pronto para ele enviar.
- ⛔ **Conteúdo só pelos Markdowns, nunca de PDF** (2026-10-03): para conferir ou gerar conteúdo,
  ler os `.md` da matéria — em primeiro lugar o `EMENTA-CHALKIE-AI.md` (ver a regra "CONTEÚDO SÓ
  PELOS MARKDOWNS").
- ✅ **Matéria modelo = Introdução à TIC** (2026-10-03): toda peça de outra matéria segue a
  estrutura que funciona em `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/` (ver a
  regra "MATÉRIA MODELO").
- ✅ **Aulas extraídas da ementa em `CONTEUDO/`** (2026-10-03): 1 aula a cada 4 h da ementa
  (arredondando para cima), arquivo `AULA-NN-DESCRICAO-CURTA.md`; atividades e, no final, a
  apostila são feitas a partir dessas aulas (ver a regra "AULAS EXTRAÍDAS DA EMENTA").

---

## 📄 REGRA CRÍTICA — CONTEÚDO SÓ PELOS MARKDOWNS (NUNCA EXTRAIR DADOS DE PDF)

⚠️ **Para conferir o conteúdo de uma matéria, ler SEMPRE os arquivos Markdown — em primeiro lugar
o `EMENTA-CHALKIE-AI.md` da matéria. Nunca extrair dados de PDF.** Registrada em 2026-10-03 a
pedido do usuário. Vale para todas as matérias e para todo material (aulas, atividades,
avaliações, apostilas, planos, slides e conferências).

- ✅ **Fonte para conferir e para gerar:** o `EMENTA-CHALKIE-AI.md` da matéria (que segue a UC da
  `EMENTA-PRINCIPAL-<CURSO>.md`, também em Markdown — a ementa do curso vence) e o `materia.json`
  copiado dela.
- ✅ **Apoio (sempre abaixo da ementa, que vence):** os demais `.md` da matéria — `CONTEUDO/AULA-NN-*.md`,
  `DOCUMENTACAO/*.md`, `APOSTILA/CONTEUDO/*.md`, `ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.md` etc.
- ⛔ **Nunca extrair dados de PDF** (`AULA-NN-SLIDES.pdf`, `PLANO-ENSINO.pdf`, ementas ou apostilas
  em PDF): não abrir, não ler e não usar PDF como fonte de conteúdo nem de conferência.
- ✅ O PDF continua só como **material de apresentação** (links nas aulas e nos índices).
- ✅ Se alguma informação necessária só existir em PDF, **avisar o usuário** em vez de extrair.
- ✅ Converter um documento de origem em Markdown continua acontecendo **só quando o usuário pede**
  (ex.: criar ou refazer a `EMENTA-PRINCIPAL-<CURSO>.md`).

---

## 🏅 REGRA CRÍTICA — MATÉRIA MODELO: INTRODUÇÃO À TIC

⚠️ **Usar SEMPRE como exemplo padrão a matéria
`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/` — nela tudo está funcionando.**
Registrada em 2026-10-03 a pedido do usuário.

- ✅ Antes de criar ou completar qualquer peça de outra matéria, **abrir a peça equivalente da
  ITIC** e seguir a mesma estrutura de pastas, nomes de arquivo, campos, geradores e fluxo:

| Peça | Onde fica na ITIC (modelo) |
|---|---|
| Dados e ementa da matéria | `materia.json`, `EMENTA-CHALKIE-AI.md` |
| Aulas em Markdown | `CONTEUDO/` (regra "AULAS EXTRAÍDAS DA EMENTA EM `CONTEUDO/`") |
| Slides (só apresentação, nunca fonte) | `AULAS/` |
| Atividade objetiva de cada aula | `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` → `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` |
| Atividade prática de cada aula | `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` (+ `-GABARITO.md`, fora do Git) → `ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.html` |
| Avaliações e média final | `ATIVIDADES/AVALIACAO-OBJETIVA-NN.html`, `AVALIACAO-PRATICA.html`, `AVALIACAO-MEDIA-FINAL.html` (+ `media-final.json`) |
| Menu e índice das atividades | `ATIVIDADES/MENU-ATIVIDADES.js`, `ATIVIDADES/index.html` |
| Controles | `AULAS/STATUS-AULAS.md`, `ATIVIDADES/STATUS-ATIVIDADES.md`, `APOSTILA/STATUS-APOSTILA.md` |
| Apostila | `APOSTILA/` (`CONTEUDO/INTRODUCAO.md`, `CONTEUDO/CAPITULO-NN.md`, Markdown completo e HTML) |
| Banco de questões do AVA | `ATIVIDADES/BANCO-AVA/` (fora do Git) |

- ✅ A ITIC é modelo de **estrutura e funcionamento**; o conteúdo de cada matéria vem da ementa
  **dela** (nunca copiar conteúdo da ITIC para outra UC).
- ✅ Se uma regra deste arquivo e a ITIC divergirem, **avisar o usuário**; a ITIC só é alterada a
  pedido dele (ela é a referência).

---

## 🧩 REGRA CRÍTICA — AULAS DA MATÉRIA: EXTRAÍDAS DA EMENTA EM `CONTEUDO/` (1 AULA A CADA 4 HORAS)

⚠️ **As aulas de cada matéria são extraídas do `EMENTA-CHALKIE-AI.md` e gravadas em Markdown na
pasta `<MATERIA>/CONTEUDO/`; depois, as atividades e, por último, a apostila são SEMPRE feitas
lendo essas aulas.** Registrada em 2026-10-03 a pedido do usuário. **Junta e substitui** a antiga
regra "PASTA `AULAS/` SEMPRE GERADA CONFORME A DOCUMENTAÇÃO DA MATÉRIA" (2026-10-02), sem conflitos.

- ✅ **Quando:** sempre que gerar dados ou materiais de uma matéria (estrutura nova, ementa,
  atividades, avaliações, apostila), as aulas em `CONTEUDO/` também são geradas — **todas**, sem
  pular nenhuma — e vêm **antes** de qualquer outra peça.
- ✅ **Fonte:** o `EMENTA-CHALKIE-AI.md` da matéria — sequência de aulas, temas, conhecimentos,
  capacidades, indicadores, situações de aprendizagem, estratégias e recursos (regra "CONTEÚDO SÓ
  PELOS MARKDOWNS"; se divergir da UC na ementa do curso, a do curso vence e o usuário é avisado).
- ✅ **Quantidade de aulas = carga horária da ementa ÷ 4** (1 aula a cada 4 h). Se a conta não der
  exata, **arredondar para cima**, e a **última aula fica só com as horas que sobram** (ex.: 40 h →
  10 aulas de 4 h; 30 h → 7 aulas de 4 h + 1 aula de 2 h; 42 h → 10 aulas de 4 h + 1 aula de 2 h).
  A soma das horas das aulas é sempre igual à carga horária da UC.
- ✅ **Nome do arquivo:** `AULA-NN-DESCRICAO-CURTA-DO-CONTEUDO.md` — `NN` = número da aula com 2
  dígitos; descrição curta do conteúdo em MAIÚSCULAS, sem acentos, palavras separadas por hífen
  (ex.: `AULA-01-FUNDAMENTOS-DE-TESTES.md`).
- ✅ **Local:** `<MATERIA>/CONTEUDO/`, na raiz da pasta da matéria (como na ITIC) — não confundir
  com `ATIVIDADES/CONTEUDO/` (fontes das atividades) nem com `APOSTILA/CONTEUDO/` (capítulos).
  A pasta `AULAS/` guarda só os slides (apresentação) e o `STATUS-AULAS.md`; **não se criam mais
  aulas em `AULAS/AULA-NN.md`**.
- ✅ **Cada aula traz** (tudo da ementa; aprofundamento só como detalhamento didático): módulo,
  tema, carga horária, conhecimentos (numeração da ementa do curso), capacidades (`Cn`/`Sn`),
  indicadores, objetivos, roteiro com tempos (retomada, exposição, prática guiada, prática
  autônoma, registro), conteúdo em seções, exemplos no contexto profissional do curso (empresa
  fictícia), situação-problema/atividade prevista na ementa, **pelo menos 1 dinâmica**,
  verificação da aprendizagem e recursos (só os previstos na UC).
- ✅ **Dinâmica obrigatória — pelo menos 1 em cada aula** (2026-10-03, pedido do usuário):
  atividade interativa em dupla ou grupo (ex.: jogo de classificação, debate, caça ao defeito,
  simulação de papéis), com nome, objetivo, tempo, materiais, passo a passo e fechamento ligado à
  capacidade da aula; o tempo dela entra no roteiro da aula.
- ✅ **Ordem obrigatória:** (1) aulas em `CONTEUDO/` → (2) atividades e avaliações lidas dessas
  aulas (`- **Aula:**` e `- **Conteúdo-base:** ../CONTEUDO/AULA-NN-....md` na fonte) → (3) **no
  final**, a apostila, também lida dessas aulas (1 capítulo = 1 aula).
- ✅ **`DOCUMENTACAO/PLANO-AULAS.md` não é fonte:** quando existir (ex.: a página da matéria o
  exibe), é só o **resumo** das aulas de `CONTEUDO/` (aula × tema × horas × conhecimentos ×
  capacidades) e é atualizado junto com elas.
- ✅ Uma aula por vez (regra "GERAR E GRAVAR UMA AULA POR VEZ"), registrando no
  `AULAS/STATUS-AULAS.md`.
- ⚠️ Matérias que já têm aulas com outro nome ou em outro lugar (ex.: ITIC, `CONTEUDO/1-Tema.md`;
  Automação, `AULAS/AULA-NN.md`) só são renomeadas ou movidas a pedido do usuário.
- ⚠️ Vale para cursos e matérias em `VERIFICAR` (`STATUS-PERMISSAO-EMENTA`/`STATUS-PERMISSAO-MATERIA`),
  respeita matérias semelhantes (só a pasta pedida) e a exceção de `QUALIFICACAO-PROFISSIONAL/`
  (lá a ementa é só do professor e só é lida).

---

## 🚨 INICIALIZAÇÃO DE CADA CHAT — LEITURA OBRIGATÓRIA

⚠️ **DE SUMA IMPORTÂNCIA — SEM EXCEÇÃO**

**ANTES DE RESPONDER QUALQUER COISA**, você DEVE:

1. ✅ **LER `C:\fontes\aulasenai\TASKS.md`** — Status da tarefa atual
2. ✅ **Verificar** qual tarefa está em progresso
3. ✅ **Verificar** quais são as subtarefas ativas
4. ✅ **Só então responder** ao usuário

**Por quê?** TASKS.md contém o estado atual de trabalho. Sem ler, você pode executar tarefas fora de ordem ou duplicadas.

**Checklist de inicialização:**
```
☐ Li TASKS.md?
☐ Identifiquei a tarefa atual?
☐ Identifiquei as subtarefas ativas?
☐ Entendi o status de cada subtarefa?
☐ Pronto para responder ao usuário?
```

**🚀 Só responda depois de marcar TODOS os ☐ acima.**

---

## 📋 CONSULTAR TAREFAS PENDENTES

⚠️ **ANTES DE QUALQUER TRABALHO, LEIA:**

📄 **Arquivo:** `C:\fontes\aulasenai\TASKS.md`

**Conteúdo:**
- ✅ Tarefa atual (em progresso)
- 🔄 Subtarefas da tarefa atual
- ⏳ Fila de próximas tarefas
- 📊 Estatísticas de progresso

**Fluxo:**
1. ✅ Ler TASKS.md para ver tarefa atual
2. ✅ Executar todas as subtarefas
3. ✅ Marcar tarefa como ✅ CONCLUÍDO
4. ✅ Sistema aguarda nova tarefa a ser adicionada

**Importante:** TASKS.md contém APENAS a tarefa atual. Não é um histórico — é um quadro de estado.

---

## 🚨 REGRA CRÍTICA — SEMPRE CONSULTAR `docs/` ANTES DE MODIFICAR

⚠️ **DE SUMA IMPORTÂNCIA — OBRIGATÓRIO EM CADA INTERAÇÃO**

**ANTES de modificar QUALQUER arquivo neste projeto**, você DEVE:

1. ✅ **Verificar se existe documentação** em `docs/ORIENTACAO_*.md`
2. ✅ **LER COMPLETAMENTE** a orientação correspondente
3. ✅ **APLICAR TODAS AS REGRAS** documentadas
4. ✅ **CONSULTAR `database.md`** se envolver schema/banco de dados
5. ✅ **Só então modificar** o arquivo

### 📁 Documentação Disponível

#### Em `docs/`
| Documento | Usa quando | Prioridade |
|-----------|-----------|-----------|
| **ORIENTACAO_JS_LOGIN.md** | Editar autenticação | 🔴 **CRÍTICA** |
| **ORIENTACAO_JS_SUPABASE.md** | Editar queries Supabase | 🔴 **CRÍTICA** |
| **ORIENTACAO_USUARIO.md** | Editar auth.users vinculação | 🔴 **CRÍTICA** |
| **ORIENTACAO_JS_AULAS.md** | Editar `js/aulas.js` | 🟠 Padrão |
| **ORIENTACAO_JS_CURSO.md** | Editar `js/curso.js` | 🟠 Padrão |
| **ORIENTACAO_JS_MATERIA.md** | Editar `js/materia.js` | 🟠 Padrão |
| **ORIENTACAO_JS_UNIDADE.md** | Editar `js/unidade.js` | 🟠 Padrão |
| **database.md** | Consultar schema | 🟡 Referência |
| **relatorio_verificacao_database.html** | Ver schema visualmente | 🟡 Referência |

#### Em `bugs/`
| Documento | Usa quando | Prioridade |
|-----------|-----------|-----------|
| **bug-*.md** | Corrigir um bug identificado | 🟣 Resolução |

### ✅ Checklist Antes de Qualquer Modificação

```
☐ Identifiquei o arquivo a modificar (ex: aulas.js)
☐ Procurei a documentação correspondente (ex: ORIENTACAO_JS_AULAS.md)
☐ A documentação existe? Sim → Leia COMPLETAMENTE
☐ Entendi todas as regras e restrições da documentação
☐ Estou pronto para modificar CORRETAMENTE
```

---

## 📖 Documentação de Orientação JavaScript

⚠️ **Orientações de cada arquivo JavaScript**

Para cada arquivo em `js/*.js`, existe uma **orientação correspondente** em `docs/`:

```
js/
├── curso.js              → docs/ORIENTACAO_JS_CURSO.md
├── aulas.js              → docs/ORIENTACAO_JS_AULAS.md
├── materia.js            → docs/ORIENTACAO_JS_MATERIA.md
├── login.js              → docs/ORIENTACAO_USUARIO.md ⚠️ LEIA ANTES!
├── supabase.js           → docs/ORIENTACAO_JS_SUPABASE.md
└── unidade.js            → docs/ORIENTACAO_JS_UNIDADE.md
```

**Regra:** Toda orientação referente a um arquivo `xxx.js` estará no arquivo `ORIENTACAO_JS_XXX.md` correspondente na pasta `docs/`.

✅ **Consulte a orientação antes de modificar qualquer arquivo JavaScript**

---

## 🔐 REGRA CRÍTICA — AUTENTICAÇÃO COM SUPABASE AUTH

⚠️ **ANTES de modificar `js/login.js`, `index.html` ou `js/supabase.js`, LEIA:**

📄 **Arquivo obrigatório:** `docs/ORIENTACAO_USUARIO.md`

**O que está documentado:**
- ✅ Fluxo de autenticação com Supabase Auth (não manual)
- ✅ Vínculo entre `auth.users` (Supabase) e tabela `usuario`
- ✅ Estrutura de dados (campos corretos/incorretos)
- ✅ Erros comuns e soluções
- ✅ RLS policies necessárias

**Checklist antes de editar autenticação:**
- [ ] Li `docs/ORIENTACAO_USUARIO.md` completamente
- [ ] Entendo o vínculo entre `auth.users` e `usuario`
- [ ] Não estou adicionando campos como `ativo`, `criado_em`, `senha_hash`
- [ ] Estou usando `supabase.auth.signInWithPassword()` ou `signUp()`
- [ ] Estou usando `data.user.id` ao vincular com tabela `usuario`

---

## 🔒 REGRA CRÍTICA — SEGURANÇA: RLS + JWT Token

⚠️ **TODA requisição ao Supabase DEVE:**
1. ✅ Usar JWT do usuário autenticado (NÃO chave de serviço)
2. ✅ Passar via header `Authorization: Bearer <token>`
3. ✅ A tabela correspondente DEVE ter RLS habilitado
4. ✅ RLS policies DEVEM validar `auth.uid()`

**Implementação obrigatória em `js/supabase.js`:**

```javascript
async function sbH() {
  const headers = {
    apikey: SUPABASE.KEY,
    "Content-Type": "application/json",
  };

  // 🔑 CRÍTICO: Usar JWT do usuário autenticado
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.access_token) {
    headers.Authorization = "Bearer " + session.data.session.access_token;
  } else {
    headers.Authorization = "Bearer " + SUPABASE.KEY; // fallback
  }

  return headers;
}
```

**Exemplo RLS Policy:**
```sql
ALTER TABLE "usuario" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_veem_seus_dados"
ON "usuario"
FOR SELECT
TO authenticated
USING (id = auth.uid());
```

**Checklist de Segurança:**
- [ ] `js/supabase.js` usa JWT token do usuário?
- [ ] TODAS as tabelas com dados sensíveis têm RLS?
- [ ] RLS policies validam `auth.uid()`?
- [ ] Um aluno/professor não pode acessar dados de outro?

📄 **Referência completa:** `docs/ORIENTACAO_USUARIO.md`

---

## 📚 REGRA CRÍTICA — EMENTA-CHALKIE-AI.md EM CADA PASTA DE MATÉRIA

⚠️ **CADA PASTA DE DISCIPLINA/MATÉRIA DEVE CONTER:**

📄 **Arquivo obrigatório:** `EMENTA-CHALKIE-AI.md` (formato **Markdown .md apenas**, sem PDF/DOCX por enquanto)

### 🏛️ REGRA CRÍTICA — A FONTE DA VERDADE É A EMENTA DO CURSO

⚠️ **A fonte da verdade de cada `EMENTA-CHALKIE-AI.md` de matéria é a ementa do curso
(`EMENTA-PRINCIPAL-<CURSO>.md`, na raiz da pasta do curso).** Alterada em 2026-09-25.

**Hierarquia (quem vence em caso de divergência):**
1. `EMENTA-PRINCIPAL-<CURSO>.md` — ementa do curso, **fonte da verdade**.
2. `EMENTA-CHALKIE-AI.md` da matéria — deriva da ementa do curso; capacidades, conhecimentos e
   carga horária devem ser os mesmos da UC correspondente na ementa do curso.
3. Aulas, slides, atividades, questões, avaliações e planos — seguem o `EMENTA-CHALKIE-AI.md`.

- ✅ **Antes** de criar ou alterar um `EMENTA-CHALKIE-AI.md`, ler a UC correspondente na ementa do curso.
- ✅ **Antes** de criar ou alterar aulas, slides, atividades, questões, avaliações ou planos de uma matéria, ler o `EMENTA-CHALKIE-AI.md` dela.
- ✅ Se o `EMENTA-CHALKIE-AI.md` divergir da ementa do curso, **a ementa do curso vence**: seguir a ementa do curso e avisar o usuário sobre a divergência.
- ✅ Se slides, PDFs, atividades ou outros materiais divergirem do `EMENTA-CHALKIE-AI.md`, **a ementa vence**: seguir a ementa e avisar o usuário.
- ❌ Nunca "corrigir" a ementa do curso para ficar igual a uma ementa de matéria ou a um material divergente sem pedido explícito do usuário.
- ⛔ **Exceção — `QUALIFICACAO-PROFISSIONAL/`:** não tem ementa de curso. A ementa de cada matéria é a própria fonte da verdade e só o professor a altera (ver a exceção na regra `EMENTA-PRINCIPAL-<CURSO>.md`).

**Exemplo:** a ementa de ITIC (Assistente de Operações Logísticas) lista **7 elementos da comunicação** (incluindo feedback) e a função **CONT.VALORES**; atividades que falem em "6 elementos" ou usem só CONT.SE devem ser ajustadas à ementa.

### ⚠️ REGRA CRÍTICA DE CONTEÚDO ESPECÍFICO

**🚨 CADA EMENTA-CHALKIE-AI.md DEVE REFLETIR O CONTEÚDO ESPECÍFICO DA MATÉRIA:**

❌ **PROIBIDO:** Arquivos genéricos, iguais para todas as disciplinas  
✅ **OBRIGATÓRIO:** Conteúdo específico da ementa da matéria + instruções para IA

**Checklist de Conteúdo:**
- [ ] **NOME DA DISCIPLINA:** Identificação clara no título
- [ ] **CARGA HORÁRIA:** Total de horas da matéria (e por módulo/aula no cronograma)
- [ ] **CONTEÚDOS ESPECÍFICOS:** Tópicos, temas e assuntos exclusivos da matéria
- [ ] **CAPACIDADES MENSURÁVEIS:** 10+ competências específicas da disciplina
- [ ] **MÓDULOS TEMÁTICOS:** 7–10 módulos refletindo a sequência real de ensino
- [ ] **CRONOGRAMA DETALHADO:** Aulas estruturadas por semana/período
- [ ] **ATIVIDADES PRÁTICAS:** Exercícios, projetos e trabalhos da disciplina
- [ ] **RECURSOS ESPECÍFICOS:** Materiais, apostilas, slides reais da matéria
- [ ] **RÚBRICA DE AVALIAÇÃO:** Critérios de nota baseados no conteúdo
- [ ] **MAPEAMENTO BNCC:** Competências alinhadas com essa disciplina específica
- [ ] **INSTRUÇÕES PARA IA:** Como gerar conteúdo complementar usando Chalkie AI

**Consequência:** Arquivos genéricos serão rejeitados na auditoria. Cada ementa DEVE ter identidade própria.

---

**Propósito:** Guia detalhado e estruturado para uso em plataformas de IA (Chalkie AI, Canvas, Google Classroom)

**O que deve estar documentado:**
- ✅ Contexto e alinhamento curricular (BNCC, competências)
- ✅ Objetivo geral e específicos da disciplina
- ✅ Carga horária total da disciplina
- ✅ 10 capacidades mensuráveis com indicadores
- ✅ Conteúdos programáticos em módulos (com tópicos, exemplos, atividades)
- ✅ Sequência de aulas (cronograma detalhado)
- ✅ Critérios e rúbricas de avaliação (0–10 com 4 níveis)
- ✅ Estratégias de ensino para IA
- ✅ Mapeamento BNCC (competências × módulos)
- ✅ Recursos recomendados
- ✅ Prompts para Chalkie AI gerar conteúdo
- ✅ Checklist de implementação

**Estrutura Recomendada:**

```
DOCUMENTACAO/
├─ EMENTA-CHALKIE-AI.md         (versão IA, 10+ páginas, detalhada) ⭐
├─ PLANO-AULAS.md              (resumo das aulas de CONTEUDO/ — não é fonte)
├─ INDEX.md                     (mapa de navegação)
└─ VERIFICACAO_COBERTURA_EMENTA.md (checklist)
```

**Versão simplificada `EMENTA.md`: não existe mais** (removida em 2026-10-01 a pedido do usuário).
A ementa de cada matéria é só o `EMENTA-CHALKIE-AI.md`; não criar nem verificar `EMENTA.md`.

**Checklist ao criar EMENTA-CHALKIE-AI.md:**
- [ ] Estrutura em 10 seções (contexto, objetivos, conteúdos, cronograma, etc)
- [ ] Carga horária total informada no início do arquivo
- [ ] 7–10 módulos temáticos definidos
- [ ] 10+ capacidades mensuráveis com indicadores
- [ ] Rubrica de avaliação com 4 níveis (Excelente/Bom/Aceitável/Insuficiente)
- [ ] Mapeamento BNCC explícito
- [ ] Atividades para cada módulo
- [ ] Prompts prontos para Chalkie AI
- [ ] Templates e recursos listados
- [ ] Métricas de sucesso definidas
- [ ] Pronto para implementação em plataforma
- [ ] **⚠️ TAMANHO:** Arquivo DEVE ter entre **14.800 e 14.950 caracteres**

### 📏 Regra de Tamanho

**EMENTA-CHALKIE-AI.md DEVE conter:**
- **Mínimo:** 14.800 caracteres
- **Máximo:** 14.950 caracteres
- **Intervalo:** 150 caracteres de margem

**Por quê?** Garante estrutura completa mas concisa, apropriada para IA processar eficientemente.

**Como validar:**
```bash
# Linux/Mac
wc -c DOCUMENTACAO/EMENTA-CHALKIE-AI.md

# PowerShell (Windows)
(Get-Content DOCUMENTACAO/EMENTA-CHALKIE-AI.md).Length
```

**Se estiver fora do intervalo:**
1. ✅ Se < 14.800: Adicione seções ou exemplos práticos
2. ✅ Se > 14.950: Remova redundâncias ou examples menos críticos
3. ✅ Valore conteúdo sobre volume — não adicione texto vazio

**Exemplo:** `MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/DOCUMENTACAO/EMENTA-CHALKIE-AI.md`
- Tamanho atual: ~14.920 caracteres ✅ Dentro do intervalo

---

## 🔄 REGRA CRÍTICA — ATUALIZAR RELATORIO AO MEXER EM DATABASE.MD

⚠️ **Sempre que modificar `docs/database.md`, DEVE atualizar:**
- 📄 `docs/relatorio_verificacao_database.html` (arquivo visual)

**Ordem de atualização (OBRIGATÓRIA):**
1. ✅ Modificar `database.md` (fonte primária)
2. ✅ Atualizar `relatorio_verificacao_database.html` com as mudanças
3. ✅ Commitar ambos os arquivos juntos

**Por quê?** O HTML é um derivado de database.md. Sem sincronização, eles se desincronizam e a documentação fica inútil.

**Checklist ao mexer em database.md:**
- [ ] Editei `database.md` (mudanças nos campos/tabelas)
- [ ] Atualizei `relatorio_verificacao_database.html` (tabelas, campos refletem o banco)
- [ ] Ambos os arquivos foram commitados com mensagem descritiva

---

## 🎓 REGRA CRÍTICA — ATUALIZAR STATUS-EMENTAS AO MODIFICAR EMENTAS

⚠️ **SEMPRE que modificar o EMENTA-CHALKIE-AI.md de qualquer matéria, DEVE atualizar:**
- 📄 `MATERIAIS/RIO_DO_SUL_MAIS_TECH/<materia>/STATUS-EMENTAS.md` (status da matéria)
- 📄 `MATERIAIS/STATUS-EMENTAS-CURSOS.md` (status consolidado do curso)

**Ordem de atualização (OBRIGATÓRIA):**
1. ✅ Modificar `EMENTA-CHALKIE-AI.md` (fonte primária)
2. ✅ Atualizar `STATUS-EMENTAS.md` da matéria com novo tamanho e status
3. ✅ Atualizar `STATUS-EMENTAS-CURSOS.md` com novo status consolidado
4. ✅ Commitar todos os arquivos juntos

**Por quê?** STATUS-EMENTAS.md e STATUS-EMENTAS-CURSOS.md são derivados das ementas. Sem sincronização, o rastreamento de progresso fica inútil.

**Checklist ao modificar ementas:**
- [ ] Editei `EMENTA-CHALKIE-AI.md`
- [ ] Verifiquei o novo tamanho em caracteres
- [ ] Atualizei `STATUS-EMENTAS.md` da matéria (tamanho, fase, checklist)
- [ ] Atualizei `STATUS-EMENTAS-CURSOS.md` (status geral do curso)
- [ ] Todos os arquivos foram commitados com mensagem descritiva

**Scripts disponíveis para atualizar status:**
- `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-ementas.py` — Atualiza STATUS-EMENTAS.md de todas as matérias
- `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-cursos.py` — Atualiza STATUS-EMENTAS-CURSOS.md

---

## 🔐 REGRA CRÍTICA — STATUS-PERMISSAO-EMENTA NO `STATUS-EMENTAS-CURSOS.md`

⚠️ **A primeira coisa do `MATERIAIS/STATUS-EMENTAS-CURSOS.md` é a seção
`## 🔐 STATUS-PERMISSAO-EMENTA`: uma tabela com todos os cursos, um embaixo do outro, com a
marcação `VERIFICAR` ou `IGNORAR` na frente do nome do curso** (`| IGNORAR | NOME-DO-CURSO |`). A marcação vale para o **curso inteiro** (todas as ementas
dele). Registrada em 2026-09-23.

- ✅ **Padrão = `IGNORAR`.** O usuário troca **manualmente** para `VERIFICAR` os cursos que quer
  trabalhar.
- ❌ Curso em `IGNORAR` tem todas as ementas **ignoradas**: não entram em pendências e não podem
  ser ajustadas, expandidas, compactadas nem usadas para gerar aulas, atividades ou dashboards,
  mesmo quando uma regra ou um pedido genérico ("ajuste as ementas fora do padrão") as alcançaria.
- ✅ Só as ementas dos cursos em `VERIFICAR` são processadas.
- ✅ **A cada leitura do `STATUS-EMENTAS-CURSOS.md`, mostrar ao usuário a tabela de
  STATUS-PERMISSAO-EMENTA** (curso por curso, com a marcação).
- ✅ O arquivo é gerado por `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-cursos.py`, que **mantém a
  tabela no topo** e **preserva** a marcação feita à mão ao regenerar. Nunca sobrescrever uma
  escolha do usuário; curso novo entra como `IGNORAR`.
- ✅ **Escopo:** o `STATUS-EMENTAS-CURSOS.md` é relativo **apenas ao que existe hoje em
  `MATERIAIS/`**. Cursos movidos para fora (ex.: `DEMAIS-CURSOS-COMPLETOS/`) não entram. Se o
  relatório listar pasta que não existe mais, regenerar com o script. Registrada em 2026-09-27.

### 🔐 STATUS-PERMISSAO-MATERIA (permissão por matéria)

Registrada em 2026-10-03 a pedido do usuário.

- ✅ Logo abaixo da tabela dos cursos, o `STATUS-EMENTAS-CURSOS.md` tem a seção
  `## 🔐 STATUS-PERMISSAO-MATERIA`: uma linha por matéria, no formato
  `| VERIFICAR | CURSO | MATERIA |` ou `| IGNORAR | CURSO | MATERIA |`.
- ✅ **Uma matéria só é processada quando o curso E a matéria estão em `VERIFICAR`.** Matéria em
  `IGNORAR` fica fora de pendências, ajustes, expansão e geração (aulas, atividades, apostilas,
  dashboards), mesmo que o curso esteja em `VERIFICAR`. Curso em `IGNORAR` continua ignorando
  todas as matérias dele, qualquer que seja a marcação da matéria.
- ✅ O usuário troca a marcação **à mão**; o script `criar-status-cursos.py` preserva as escolhas ao
  regenerar e **matéria nova entra como `IGNORAR`**. A tabela de cada curso mostra a coluna
  "Permissão" com o valor que vale (curso + matéria).
- ✅ **A cada leitura do `STATUS-EMENTAS-CURSOS.md`, mostrar também a tabela por matéria** dos
  cursos envolvidos no pedido.
- 📌 Situação em 2026-10-03: em `TECNICO-INFORMATICA-INTERNET`, só **`TESTES-DE-FRONTEND`** está em
  `VERIFICAR`; todas as outras matérias do curso estão em `IGNORAR`.

---

## 📘 REGRA CRÍTICA — `EMENTA-PRINCIPAL-<CURSO>.md` EM CADA PASTA DE CURSO

⚠️ **Toda pasta de curso em `MATERIAIS/` (exceto `MATERIAS-GERAIS/`) deve SEMPRE conter o
arquivo `EMENTA-PRINCIPAL-<nome do curso>.md`.** Registrada em 2026-09-25.

- ✅ `<nome do curso>` é o **nome exato da pasta do curso** (mesmas maiúsculas, `_` e `-`).
- ✅ Exemplo: `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md`
- ✅ Fica na **raiz da pasta do curso**, não dentro das matérias.
- ✅ Formato **Markdown (.md)** apenas.
- ❌ Nome diferente da pasta (ex.: `GESTAO-E-CONTROLE-MATERIAIS` para a pasta
  `GESTAO_E_CONTROLE_MATERIAIS`) está fora do padrão.
- ✅ Curso novo já nasce com o arquivo. Criar ou renomear o arquivo de um curso existente respeita
  o `STATUS-PERMISSAO-EMENTA` (só cursos em `VERIFICAR`).
- ✅ **Leitura da ementa do curso:** sempre ler a ementa do curso **do arquivo Markdown**
  `MATERIAIS/<CURSO>/EMENTA-PRINCIPAL-<CURSO>.md`. Os documentos de origem (.docx, .pdf, .txt)
  só são usados para criar ou refazer esse `.md`, e apenas a pedido do usuário. Registrada em
  2026-09-25.

### ⛔ EXCEÇÃO — `MATERIAIS/QUALIFICACAO-PROFISSIONAL/`

Registrada em 2026-09-25.

- ❌ **Não tem** `EMENTA-PRINCIPAL-<CURSO>.md` e não deve ter.
- ✅ Cada matéria da pasta tem a **sua própria ementa**, atualizada **diretamente e somente pelo
  professor**.
- ❌ **Nenhum local é origem** da ementa das matérias desta pasta: não gerar, copiar, sincronizar,
  ajustar tamanho nem atualizar a partir de .docx, templates, scripts ou outras ementas.
- ✅ A IA só **lê** essas ementas; qualquer alteração é feita pelo professor.

---

## 📂 REGRA CRÍTICA — CADA PASTA DE MATÉRIA CORRESPONDE A UMA UC DA EMENTA DO CURSO

⚠️ **Toda pasta de matéria em `MATERIAIS/<CURSO>/` corresponde a uma unidade curricular (UC) do
`EMENTA-PRINCIPAL-<CURSO>.md`** (fonte da verdade). Registrada em 2026-09-25.

- ✅ **Uma pasta = uma UC.** Não criar pasta de matéria para algo que não é UC do curso.
- ✅ **Nome da pasta:** nome da UC em **MAIÚSCULAS, sem acentos, palavras separadas por hífen**
  (ex.: UC "Banco de Dados" → `BANCO-DE-DADOS`). Abreviação só se estiver registrada na ementa da
  matéria.
- ✅ O `EMENTA-CHALKIE-AI.md` da pasta usa o **nome exato da UC** e a **mesma carga horária** da
  ementa do curso.
- ✅ Pastas auxiliares que não são matéria (`docs/`, `scripts/`, `.claude/`, `graphify-out/`) são
  permitidas e ignoradas por esta regra.
- ⚠️ Pastas existentes fora do padrão **só são renomeadas a pedido do usuário**. Levantamento
  inicial: `docs/regra-pasta-materia-vinculo-uc.md`.
- ⛔ **Exceção:** `QUALIFICACAO-PROFISSIONAL/` (não tem ementa de curso).

---

## 🔁 REGRA CRÍTICA — MATÉRIAS SEMELHANTES: ATUALIZAR SÓ A PASTA PEDIDA

⚠️ **Quando uma matéria for igual ou semelhante a outra de outro curso, atualizar SOMENTE a
pasta da matéria que o usuário pediu.** As pastas semelhantes **não são atualizadas** até o
usuário solicitar. Registrada em 2026-09-25.

- ✅ Lista de matérias iguais/semelhantes entre cursos: `docs/materias-semelhantes-entre-cursos.md`.
- ❌ Não propagar automaticamente ementa, aulas, slides, atividades, avaliações ou planos para as
  matérias semelhantes, mesmo que o conteúdo seja idêntico (ex.: as UCs de Educação para o Trabalho).
- ✅ Ao terminar, **avisar** o usuário quais matérias semelhantes existem e perguntar se quer
  atualizá-las também; só atualizar depois da resposta.
- ✅ Vale também para reaproveitar conteúdo de outra matéria como fonte: é permitido **ler**, mas
  a matéria de origem não é alterada.

---

## 🚀 LEIA PRIMEIRO — Grafo de Conhecimento do Projeto

⚠️ **ANTES DE QUALQUER COISA, leia o relatório do grafo de conhecimento para entender a arquitetura completa:**

📄 **Arquivo:** `graphify-out/GRAPH_REPORT.md`  
📍 **Localização:** `C:\fontes\aulasenai\graphify-out\GRAPH_REPORT.md`  
⚠️ **Atualizado em:** 2026-09-08 (7678 nós, 7612 arestas, 640 comunidades)

Este relatório contém:
- ✅ Visão geral da estrutura do projeto (7678 nós, 7612 arestas)
- ✅ Comunidades de código (640 clusters)
- ✅ Dependências entre arquivos
- ✅ Padrões de arquitetura
- ✅ Hot spots (arquivos críticos)
- ✅ Mapa completo de navegação

**Por quê?** O GRAPH_REPORT fornece uma análise automática de toda a codebase, enquanto este CLAUDE.md documenta os 6 arquivos HTML principais. Juntos, oferecem visão 360° do projeto.

---

## ⚠️ ESTRUTURA DE PASTAS — IMPORTANTE

**Pasta `MATERIAIS/`:**
- 🚨 **NÃO é um CURSO** — é um repositório de recursos educacionais gerais
- Contém estrutura de múltiplos cursos (ex: `RIO_DO_SUL_MAIS_TECH/`)
- Cada subpasta em `MATERIAIS/` é um curso específico com suas matérias
- Documentação, ementas, apostilas e recursos são organizados **por curso**

**Regra de ouro:**
- ✅ **TODA pasta em `MATERIAIS/` (exceto MATERIAS-GERAIS) = 1 CURSO COMPLETO**
- ✅ Cada curso é independente e tem suas próprias matérias, ementas, apostilas

**Pastas a IGNORAR em análises:**
- ❌ `MATERIAIS/MATERIAS-GERAIS/` — **NÃO é um curso**, é repositório genérico
- ❌ Não ignorar outras pastas — cada uma é um curso válido!

**Scripts de análise DEVEM:**
- ✅ Processar TODAS as pastas em MATERIAIS/ EXCETO `MATERIAS-GERAIS/`
- ✅ Cada pasta = 1 curso a processar
- ✅ Executar operações para cada curso independentemente

**Estrutura correta:**
```
MATERIAIS/
├─ RIO_DO_SUL_MAIS_TECH/          ← ESTE é o curso (processar)
│  ├─ COMPETENCIAS_SOCIOEMOCIONAIS/    ← Matéria do curso
│  ├─ FUNDAMENTOS_TECNOLOGIA/           ← Matéria do curso
│  ├─ scripts/                         ← Scripts auxiliares (ignorar)
│  └─ ...
├─ OUTRO_CURSO/                   ← Futuro segundo curso (processar quando existir)
│  ├─ ...
│  └─ ...
├─ MATERIAS-GERAIS/               ← IGNORAR ❌ (não é curso)
│  ├─ recurso1/
│  └─ ...
└─ STATUS-EMENTAS-CURSOS.md        ← Consolidado de todos os cursos (ignorar)
```

**Checklist para scripts:**
- [ ] Verificar se pasta tem subpastas com nomes de matérias (ex: COMPETENCIAS_*, FUNDAMENTOS_*)
- [ ] Se não tiver, IGNORAR a pasta
- [ ] Manter lista de cursos válidos em `CURSOS_VALIDOS` dentro do script
- [ ] Logar pastas ignoradas em console (ótimo para debug)

---

## 🌍 Visão Geral

**Localização:** `C:\fontes\aulasenai\`  
**Arquivos:** 6 páginas HTML + Supabase backend  
**Tipo:** Aplicação web multiplataforma (aluno/professor)  
**Framework:** HTML5 + CSS3 + JavaScript Vanilla  
**Backend:** Supabase (REST API + PostgreSQL)  
**Público:** Alunos (15–17 anos) e Professores  

---

## 📍 Fluxo de Navegação

```
┌─────────────────────────────────────────────────────────────┐
│ index.html (PORTA DE ENTRADA)                               │
│ - Login com tema claro/escuro                               │
│ - Autenticação Supabase (usuário + senha)                   │
│ - Armazena role em localStorage                             │
└────────────────────┬────────────────────────────────────────┘
                     │ OK: Login bem-sucedido
                     ▼
        ┌────────────────────────────┐
        │ PERFIL ALUNO 👨‍🎓             │    PERFIL PROFESSOR 👨‍🏫
        │                            │                          │
        ├─► dashboard.html           ├─► dashboard.html ◄─────┘
        │   - Cursos (read-only)      │   - Cursos (CRUD)
        │   - Progresso              │   - Editar/duplicar
        │   - Acessar UCs            │   - Admin mode
        │                            │
        ├─► uc.html (opcional)       ├─► uc.html (PRINCIPAL)
        │   - Visualizar UCs         │   - Gerenciar UCs
        │   - Expandir conteúdo      │   - Vincular matérias
        │                            │   - Checklist docente
        │                            │
        ├─► questionarios.html       ├─► questionarios.html
        │   - Responder provas       │   - Gerenciar provas
        │   - Ver gabarito           │   - Adicionar questões
        │   - Consultar scripts      │   - Criar formulários
        │                            │
        └─► validacao.html           ├─► validacao.html
            - Informações gerais     │   - Protocolo completo
            - Estrutura de provas    │   - Documentação RPL
            - Plataformas de cert.   │
                                     │
                                     ├─► visualizador-central-aulas-pendentes.html
                                     │   - Aulas ainda a lecionar
                                     │   - Plano por UC
                                     │   - Modal interativo
```

---

## 📄 Descrição Detalhada de Cada Arquivo

### 1️⃣ **index.html** — Portal de Login

#### 📊 Especificações
- **Linhas:** ~370
- **Tamanho:** ~12 KB
- **Tema:** Compacto, elegante, minimalista
- **Responsividade:** Totalmente responsivo (mobile-first)

#### 🎯 Propósito
Autenticação de usuários (aluno/professor) com:
- Card branco centralizado
- Tema claro/escuro (toggle 🌙/☀️)
- Validação de credenciais contra Supabase
- Spinner de carregamento
- Mensagens de erro claras

#### 🏗️ Estrutura
```html
<body style="background: #004384">
  <div class="card">
    ├─ .card-header (gradiente azul)
    │  ├─ Logo "SENAI"
    │  ├─ Título "SENAI e Tecnologia 3.0"
    │  └─ Subtítulo "UC1 — Introdução..."
    │
    ├─ .card-body
    │  ├─ Dropdown "Perfil de acesso" (ALUNO | PROFESSOR)
    │  ├─ Input "Senha do Professor" (condicional)
    │  ├─ Button "Entrar"
    │  └─ div.spinner (loading)
    │
    └─ .footer
       ├─ Crédito "Professor Gelvazio"
       └─ Button tema (🌙/☀️)
```

#### 🔐 Lógica de Autenticação

```javascript
// Caso ALUNO:
const HASH_ALUNO = "a21d6f3803f0491c32444ef91a0836be243cc4da5186357e805b7009a5b0669b";
// SHA-256 pré-computado

// Caso PROFESSOR:
const hash = await sha256(inputSenha); // Calcula SHA-256 em tempo real

// Query Supabase:
GET /rest/v1/usuario?login_usuario=eq.{role}&senha_hash=eq.{hash}&select=perfil

// Se encontrado:
localStorage.setItem("senai_role", rows[0].perfil);    // "ALUNO" | "PROFESSOR"
localStorage.setItem("senai_login", Date.now());       // timestamp
window.location.href = "dashboard.html";               // Redireciona
```

#### 🎨 Tema
- **Header:** Gradiente azul (#004384 → #0055b3)
- **Card:** Branco com sombra, border-radius 12px
- **Tema Escuro:** `[data-theme="dark"]` altera fundo, inputs, texto
- **Acessibilidade:** Contraste WCAG AAA

---

### 2️⃣ **dashboard.html** — Hub Central de Gerenciamento

#### 📊 Especificações
- **Linhas:** 7.004 (MAIOR arquivo)
- **Tamanho:** ~322 KB
- **Tipo:** SPA (Single Page Application)
- **Responsividade:** 2 colunas (desktop) → 1 coluna (mobile)

#### 🎯 Propósito
Portal central pós-login com:
- **Aluno:** Visualizar cursos, acompanhar progresso, acessar UCs
- **Professor:** CRUD de cursos/UCs, editar planos, gerenciar aulas

#### 🏗️ Arquitetura
```
dashboard.html
├─ Header
│  ├─ Logo SENAI → dashboard.html
│  ├─ Título "Dashboard de Cursos"
│  ├─ Botão Tema 🌙/☀️
│  └─ Badge Perfil (ALUNO/PROFESSOR)
│
├─ Hero
│  ├─ Badge "🎓 Aluno" ou "👨‍🏫 Professor"
│  ├─ Título "Dashboard de Cursos"
│  └─ Subtítulo explicativo
│
├─ Section: Grid de Cursos
│  └─ Cards 2 cols (desktop) / 1 col (mobile)
│     ├─ .card-thumb (emoji + cor)
│     ├─ .card-body
│     │  ├─ Tipo "CURSO 01"
│     │  ├─ Título (nome do curso)
│     │  ├─ Descrição
│     │  └─ Tags ("2 UCs", "33h")
│     │
│     ├─ .card-footer
│     │  ├─ Barra de progresso (aluno)
│     │  └─ Button "Acessar" (aluno) | "Editar" (prof)
│     │
│     └─ .card-edit (professor only)
│        ├─ Button "📋 Aulas"
│        └─ Button "✏️ Editar"
│
└─ Modais (Professor Only)
   ├─ Modal Novo Curso
   ├─ Modal Nova UC
   ├─ Modal Aulas da UC
   ├─ Modal Matérias
   ├─ Modal Checklist Docente
   ├─ Modal Plano de Ensino (markdown editor + preview)
   ├─ Modal Conferência (análise de pendências)
   └─ Modal Duplicar Curso
```

#### 🔧 Funcionalidades

**ALUNO:**
- ✅ Visualizar cursos (apenas os com `ensalado=true`)
- ✅ Ver progresso (barra percentual)
- ✅ Clique → navega para pasta UC
- ✅ Tema claro/escuro
- ✅ Logout

**PROFESSOR:**
- ✅ Criar curso (nome, ícone emoji, cor hex)
- ✅ Editar curso
- ✅ Duplicar curso (copia tudo: UC, aulas, matérias)
- ✅ Deletar curso (com confirmação)
- ✅ Criar/editar/deletar UCs
- ✅ Vincular matérias do Supabase
- ✅ Editar plano de ensino (markdown com preview)
- ✅ Gerenciar aulas (CRUD)
- ✅ Visualizar checklist docente (38 itens × 4 fases)
- ✅ Conferência de pendências (Supabase + localStorage)
- ✅ Toggle "Admin" (modo avançado)
- ✅ Exportar cursos (CSV/JSON)

#### 💾 Dados no localStorage

```javascript
senai_role           // "ALUNO" | "PROFESSOR"
senai_tema           // "light" | "dark"
senai_login          // timestamp
senai_cursos_v2      // JSON.stringify(cursos[])
senai_checklist_v1   // JSON.stringify({ ucId: { itemId: bool } })
senai_visibilidade   // JSON.stringify({ cursoId: bool })
```

#### 📊 Tabelas Supabase Utilizadas

| Tabela | Usado por | Operações |
|--------|-----------|-----------|
| `curso` | Dashboard | SELECT, INSERT, UPDATE, DELETE |
| `cursomateria` | Dashboard, uc.html | SELECT, INSERT, DELETE |
| `aula` | Dashboard, uc.html | SELECT, INSERT, UPDATE, DELETE |
| `materia` | Dashboard | SELECT (read-only para alunos) |
| `usuario` | index.html | SELECT (autenticação) |
| `validacao_competencias` | validacao.html | SELECT (informativo) |

---

### 3️⃣ **uc.html** — Gerenciador de Unidades Curriculares

#### 📊 Especificações
- **Linhas:** ~1.040
- **Tamanho:** ~322 KB (lido parcialmente)
- **Responsividade:** Totalmente responsivo
- **Acesso:** Professor (redirect se não-professor)

#### 🎯 Propósito
Interface dedicada a:
- Visualizar e gerenciar UCs de um curso
- Associar matérias
- Implementar checklist docente (38 itens)
- Conferência de pendências (análise de conformidade)

#### 🏗️ Estrutura
```
uc.html
├─ Header
│  ├─ Logo SENAI → dashboard.html (botão voltar)
│  ├─ Título "Cursos e Unidades Curriculares"
│  ├─ Botão "🔍 Conferência" (badge com pendências)
│  ├─ Button "+ Novo Curso"
│  └─ Button "← Voltar"
│
├─ Hero
│  ├─ Badge "📚 Professor"
│  ├─ Título
│  └─ Subtítulo "Acesse e gerencie suas UCs..."
│
├─ Seção: Grid de Cursos
│  └─ Para cada curso:
│     ├─ .curso-section (expandível)
│     │  ├─ .curso-header
│     │  │  ├─ Barra colorida (left: 5px)
│     │  │  ├─ Ícone emoji
│     │  │  ├─ Nome do curso
│     │  │  ├─ Contagem de UCs
│     │  │  └─ Button "+ Nova UC"
│     │  │
│     │  └─ .uc-content (grid 2 cols)
│     │     └─ Para cada UC:
│     │        ├─ .uc-card
│     │        │  ├─ .uc-card-top (cor da UC)
│     │        │  ├─ .uc-card-body
│     │        │  │  ├─ Ícone
│     │        │  │  ├─ Nome UC
│     │        │  │  ├─ Pasta (monospace)
│     │        │  │  └─ Badges:
│     │        │  │     ├─ ✓ AULAS / ✗ AULAS
│     │        │  │     ├─ ✓ MATERIAIS / ✗ MATERIAIS
│     │        │  │     └─ ⏳ N pendentes
│     │        │  │
│     │        │  └─ .uc-card-footer
│     │        │     ├─ Status (dot color + texto)
│     │        │     ├─ Button "📋 Checklist"
│     │        │     ├─ Button "Acessar" ou "⚠️ Incompleta"
│     │        │     └─ Button "🗑️ Deletar" (custom only)
│
└─ Modais (Professor)
   ├─ Modal Novo Curso
   ├─ Modal Nova UC
   ├─ Modal Checklist (com progresso 0-38 itens)
   └─ Modal Conferência (status gráfico de UCs)
```

#### 🔧 Funcionalidades

**Checklist Docente (38 itens × 4 fases):**

| Fase | Itens | Descrição |
|------|-------|-----------|
| 1. Planejamento | 13 | Antes da UC: email tutor, materiais, ensalamento, adaptação |
| 2. Execução | 11 | Durante aulas: mediação, docência ativa, frequência |
| 3. Acompanhamento | 8 | Ao término: correção, feedback, registro pedagógico |
| 4. Fechamento | 6 | Ao final: atas, notas, conselho de classe |

**Conferência de Pendências:**
- Integra dados do Supabase (tabela `materia` + `validacao_competencias`)
- Mostra quantos itens pendentes por UC
- Barra de progresso visual (% concluído)

#### 💾 Dados Supabase Consultados

```sql
SELECT * FROM curso WHERE ensalado=true;
SELECT * FROM cursomateria WHERE curso_id=?;
SELECT * FROM materia WHERE unidade_curricular_id=?;
SELECT * FROM validacao_competencias WHERE ensalado=true;
SELECT status_criacao_avaliacao, status_plano_aula, status_plano_ensino FROM materia;
```

---

### 4️⃣ **questionarios.html** — Avaliações e Questionários

#### 📊 Especificações
- **Linhas:** ~278
- **Tamanho:** ~8 KB
- **Responsividade:** Grid 3 cols (desktop) → 2 → 1 col (mobile)

#### 🎯 Propósito
Portal de questionários com:
- **Aluno:** Responder provas, ver gabarito
- **Professor:** Gerenciar formas, criar com Google Apps Script

#### 🏗️ Estrutura
```
questionarios.html
├─ Header
│  ├─ Logo SENAI → dashboard.html
│  ├─ Título "Questionários e Avaliações — UC1"
│  ├─ Badge Perfil
│  ├─ Button "🏠 Início"
│  ├─ Button "🔑 Códigos" → codigos.html
│  └─ Button "🚪 Sair" (prof only)
│
├─ Hero/Seção
│  └─ Grid de 3 cards (avaliações)
│     ├─ Card 1: "🖥️ História da Computação"
│     │  ├─ 27 questões
│     │  ├─ Múltipla escolha
│     │  ├─ Button "📝 Responder Questionário" (link externo)
│     │  ├─ Button "✅ Respostas" (prof only, abre modal gabarito)
│     │  └─ Button "📥 Banco GIFT (AVA SENAI)" (prof only, download)
│     │
│     ├─ Card 2: "💻 Iniciando no Chromebook"
│     │  └─ (similar)
│     │
│     └─ Card 3: "💬 Elementos da Comunicação (Aula 02)"
│        └─ Status: "🔒 Questionário disponível em breve"
│
└─ Modal Gabarito (prof only, expandível)
   └─ Grid 5 colunas de respostas
      └─ Cada célula: Q## + Letra (A-E)
```

#### 🔧 Funcionalidades

**ALUNO:**
- ✅ Ver formulários Google disponíveis
- ✅ Clique → abre form em nova aba
- ✅ Responde e submete via Google Forms

**PROFESSOR:**
- ✅ Ver scripts path para cada avaliação
- ✅ Abrir Google Apps Script para criar forms
- ✅ Modal gabarito com 27 questões pre-preenchidas
- ✅ Download de banco de questões (formato GIFT)

#### 📝 Estrutura de Card

```html
<div class="card">
  <div class="card-header card-header-azul">
    <span class="card-icon">🖥️</span>
    <div class="card-meta">
      <div class="card-tag">Avaliação objetiva</div>
      <div class="card-titulo">História da Computação</div>
    </div>
  </div>
  <div class="card-body">
    <div class="card-info">
      <span class="badge badge-blue">27 questões</span>
      <span class="badge badge-orange">Múltipla escolha</span>
    </div>
    <p class="card-desc">Surgimento e Gerações, Como funciona um PC...</p>
    <div class="card-actions">
      <div class="steps prof-only">
        <div class="step"><span class="step-num">1</span>Abra script</div>
        <div class="step"><span class="step-num">2</span>Execute função</div>
      </div>
      <a class="btn btn-primary" href="...">📝 Responder</a>
      <button class="btn btn-secondary prof-only">✅ Respostas</button>
    </div>
  </div>
</div>
```

---

### 5️⃣ **validacao.html** — Protocolo de Validação de Competências

#### 📊 Especificações
- **Linhas:** ~1.770 (SEGUNDO MAIOR)
- **Tamanho:** ~85 KB
- **Tipo:** Documento interativo (seções com tabs)
- **Responsividade:** Totalmente responsivo

#### 🎯 Propósito
Documentação completa e navegável sobre:
- 10 tipos de provas (teórica, prática, experiencial)
- Matriz de pesos (25% + 50% + 15% = 100%)
- Comissão avaliadora (5 pessoas, responsabilidades)
- Calendário de execução (2-3 semanas)
- Banco de dados Supabase (schema)
- Checklist de implementação
- Plataformas de validação (Credly, Canvas, GitHub, etc)

#### 🏗️ Navegação

```
validacao.html
├─ Header
│  └─ Título "🎓 Protocolo Completo de Validação de Competências"
│
├─ Nav (sticky, 9 abas)
│  ├─ 📋 Introdução
│  ├─ ⚖️ Legislação
│  ├─ 🔍 10 Tipos de Provas
│  ├─ 📊 Matriz de Pesos
│  ├─ 🏢 Comissão
│  ├─ 📅 Calendário
│  ├─ 💾 Banco de Dados
│  ├─ ✅ Checklist
│  └─ 🌐 Plataformas
│
├─ Container
│  └─ 9 Seções (visibilidade condicional)
│     ├─ Seção 0: Introdução
│     ├─ Seção 1: Legislação (CNE/CEB, ABNT, Decreto, LDB)
│     ├─ Seção 2: Provas (3 teóricas + 5 práticas + 2 experienciais)
│     ├─ Seção 3: Matriz (tabela com pesos, fórmula cálculo)
│     ├─ Seção 4: Comissão (organograma, responsabilidades)
│     ├─ Seção 5: Calendário (timeline 2-3 semanas)
│     ├─ Seção 6: BD (schema SQL, estructura de pastas)
│     ├─ Seção 7: Checklist (35 itens com checkboxes)
│     └─ Seção 8: Plataformas (17 alternativas: Credly, Canvas, GitHub, etc)
│
└─ Footer
   └─ Crédito SENAI
```

## 🔗 Fluxo Completo de Navegação

```
┌─ Login: index.html
│  │ username + senha
│  └─► Supabase: valida usuario + hash
│      │ senai_role = "ALUNO" ou "PROFESSOR"
│      │ senai_login = timestamp
│      └─► localStorage
│
├─ Dashboard: dashboard.html
│  │ (porta de entrada principal)
│  ├─► Aluno:
│  │    └─ Visualiza cursos → Clique → Pasta UC (filesystem)
│  │
│  └─► Professor:
│       ├─ CRUD de cursos
│       ├─ Edita plano de ensino (markdown)
│       ├─ Gerencia aulas
│       ├─ Admin mode (checklist docente)
│       └─ Exporta dados
│
├─ UC.html (Professor)
│  │ (gerenciador avançado de UCs)
│  ├─ Exibe checklist (38 itens × 4 fases)
│  ├─ Conferência de pendências (Supabase)
│  └─ Vincular matérias
│
├─ Questionarios.html
│  │ (avaliações)
│  ├─ Aluno: Responder provas, ver gabarito
│  └─ Professor: Scripts, GIFT export
│
├─ Validacao.html
│  │ (documentação)
│  ├─ 9 seções navegáveis
│  └─ Protocolo RPL (Reconhecimento Prévio de Aprendizagem)
│
└─ Visualizador-Central-Aulas-Pendentes.html
   │ (aulas ainda a lecionar)
   └─ Modal interativo por UC
```

---

## 📋 **APOSTILA-COMPLETA-REFORCO-MATEMATICA.html** — Formatação Padrão de Exercícios

### 🎯 Estrutura Definida de Cada Exercício (35 exercícios × 7 módulos)

**Localização:** `MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO/AULAS/APOSTILA-COMPLETA-REFORCO-MATEMATICA.html`

#### ✅ Formato Confirmado de Cada Item

Cada exercício segue este padrão obrigatório:

```html
<div class="exercicio-box">
  <div class="exercicio-header">ITEM N</div>
  <div class="exercicio-content">
    <!-- CAPACIDADE: Primeira linha -->
    <p><span class="exercicio-label">CAPACIDADE:</span> [texto capacidades]</p>
    
    <!-- ⚠️ LINHA DIVISÓRIA OBRIGATÓRIA: 1px solid black IMEDIATAMENTE ANTES de Contexto -->
    <div style="border-bottom: 1px solid black; margin: 12px 0;"></div>
    
    <!-- CONTEXTO: Segunda linha (após divisória) -->
    <p><span class="exercicio-label">Contexto:</span> [descrição contexto]</p>
    
    <!-- COMANDO: Terceira linha -->
    <p><span class="exercicio-label">Comando:</span> [pergunta/tarefa]</p>
    
    <!-- RESPOSTA: Linhas para escrever -->
    <div class="resposta-campo">
      <span class="exercicio-label">Resposta:</span>
      <div class="resposta-linha"></div>
      <div class="resposta-linha"></div>
    </div>
  </div>
</div>
```

#### 📌 Elementos Obrigatórios

| Elemento | Descrição | Estilo |
|----------|-----------|--------|
| **ITEM N** | Cabeçalho da questão | `class="exercicio-header"` |
| **CAPACIDADE** | Competências desenvolvidas | Primeira linha após header |
| **⚠️ Linha Divisória** | **1px solid black — ANTES da palavra "Contexto"** | `border-bottom: 1px solid black; margin: 12px 0;` |
| **Contexto** | Situação/contexto da questão | Segunda linha (logo após divisória) |
| **Comando** | Pergunta/tarefa a realizar | Terceira linha |
| **Resposta** | Campo com 2 linhas para escrita | `resposta-linha` class |

#### 🎨 CSS Relacionado

```css
.exercicio-box {
  border: 1px solid #004384;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  background: #f9f9f9;
}

.exercicio-header {
  font-weight: 600;
  color: #004384;
  margin-bottom: 15px;
  font-size: 14px;
}

.exercicio-label {
  font-weight: 600;
  color: #004384;
}

.resposta-linha {
  border-bottom: 1px solid #333;
  height: 25px;
  margin: 8px 0;
}
```

#### ✅ Checklist para Novas Apostilas

Ao criar novos exercícios, garantir:
- [ ] Cada item tem `exercicio-header` com "ITEM N"
- [ ] CAPACIDADE vem primeira (sem divisória antes)
- [ ] **Linha divisória presente:** `<div style="border-bottom: 1px solid black; margin: 12px 0;"></div>`
- [ ] Contexto vem após a divisória
- [ ] Comando vem após Contexto
- [ ] Campo Resposta com 2+ linhas `resposta-linha`
- [ ] Todos os 35 exercícios seguem este padrão

---

## 💾 Supabase: Tabelas Principais
Consulte docs/database.md 
# 📚 Instruções Claude — Aulas SENAI

## 💾 REGRA CRÍTICA — ALTERNATIVAS SEMPRE SALVAS NO BANCO DE DADOS

⚠️ **Toda alternativa marcada pelo aluno em uma atividade DEVE ser salva no banco de dados
(Supabase, tabela `resposta_atividade`).** Registrada em 2026-09-28.

- ✅ Ler a atividade é livre; o **login** (Supabase Auth) é exigido **só para marcar** alternativas.
- ✅ Toda página de atividade com questões usa `- **Folha de respostas:** sim` no `.md` (o gerador
  inclui supabase-js, `js/supabase.js`, `js/login.js`, `assets/js/respostas-atividade-banco.js`,
  põe `data-login="sim"` e não embute o gabarito) e a atividade precisa estar cadastrada nas
  tabelas `atividade` + `gabarito`: acrescentar em `ATIVIDADES` de
  `scripts/gerar-seed-atividades.py`, gerar `database/*-seed-atividades.sql` e rodar no Supabase.
- ❌ **Não existe mais localStorage para as alternativas** — somente banco de dados. Se o banco
  estiver indisponível ou a atividade não estiver cadastrada, a marcação fica **bloqueada com
  aviso** — nunca cai para o navegador. O nome do aluno vem do login (não é digitado).
- ✅ "Finalizar" grava a entrega (`entrega_atividade`); depois dela as respostas não mudam (RLS).
- ✅ **"Finalizar" só entrega com TODAS as alternativas gravadas no banco** (2026-09-30): além de
  conferir a tela, espera as gravações em andamento, **relê do banco** as respostas da tentativa e
  usa o banco como verdade; se faltar alguma, bloqueia, destaca as questões e lista quais não
  estão gravadas (popup). O RLS também recusa entrega incompleta.
- ✅ O gabarito fica **só** na tabela `gabarito` (leitura exclusiva do professor); não embutir
  gabarito nas páginas dos alunos.
- ✅ Nota e acertos completos (item a item) aparecem só no painel do professor
  (`painel-professor.html`). **Exceção (2026-09-30):** depois de entregar, o aluno vê no início da
  atividade a **própria nota** (0 a 10) e, se for **≥ 7**, "Você atingiu a pontuação mínima que é
  7!"; se for menor, "Você não atingiu a pontuação mínima que é 7, solicite ao professor liberação
  da atividade para uma nova tentativa!". A conta é feita no banco (função `nota_da_tentativa`,
  `database/2026-09-30-nota-tentativa.sql`): devolve só acertos e total da própria tentativa
  entregue; o gabarito nunca sai do banco.
- 📄 Plano: `docs/respostas-atividades-banco-painel-professor.md`;
  SQL: `database/2026-09-28-atividades-gabarito.sql`.

### 👩‍🏫 Professor dentro da atividade

Registrada em 2026-09-30. Ao abrir uma atividade logado como PROFESSOR, o topo da página mostra
**"Respostas dos alunos nesta atividade"** (`assets/js/respostas-atividade-professor.js`): uma linha
por aluno e tentativa, com turma, situação, acertos, nota, **data e hora** e, na última tentativa
entregue do aluno, o botão **🔓 Liberar nova tentativa** (popup de confirmação). Acima da tabela há **abas por turma** (Todas as turmas + uma por turma, com a
quantidade de alunos) que filtram as linhas e o resumo; a turma escolhida é lembrada ao recarregar. Dados: função
`resumo_tentativas_atividade` (`database/2026-09-30-resumo-tentativas-professor.sql`); só o
professor consegue chamá-la.

### 🕒 Horário da turma e liberação fora do horário

Registrada em 2026-10-01. O aluno só grava alternativas e entrega **dentro do horário da turma**
(`turma.hora_inicio`/`hora_fim`, imposto pelo RLS). A coluna **`atividade.atividade_liberada_fora_horario`**
(lista JSON de ids de alunos, padrão `[]`) libera a atividade fora do horário para os alunos da
lista (função `liberar_fora_horario`, só professor). ⛔ **Avaliações (página `AVALIACAO-*`:
objetivas 01/02, prática) nunca são liberadas** — seguem sempre o horário. SQL:
`database/2026-10-01-atividade-liberada-fora-horario.sql`; plano: `docs/atividade-liberada-fora-horario.md`.

### 🔁 Tentativas: até 3 por atividade, liberadas pelo professor

Registrada em 2026-09-30. Plano: `docs/regra-3-tentativas-atividade.md`;
SQL: `database/2026-09-30-tentativas-atividade.sql` (o professor roda no SQL Editor).

- ✅ O aluno responde cada atividade **até 3 vezes** (`MAXIMO_TENTATIVAS` no JS e
  `maximo_tentativas()` no banco). A **tentativa 1 é livre**; depois de entregar, o aluno **não
  refaz sozinho**.
- ✅ Nova tentativa **só o professor libera**: no `painel-professor.html`, escolhe a atividade,
  clica no **nome do aluno** e usa **🔓 Liberar nova tentativa** (RPC `liberar_nova_tentativa`,
  que exige perfil PROFESSOR, tentativa anterior entregue e limite de 3).
- ✅ A nova tentativa **abre em branco só nas questões que o aluno errou**: o banco copia apenas as
  respostas CERTAS (`resposta_atividade.herdada = true`); a página esconde as alternativas dessas
  questões e mostra "✅ Você já acertou esta questão na tentativa anterior" (resposta mantida e
  gravada, vale na nova entrega; `database/2026-09-30-nova-tentativa-so-erradas.sql`);
  as tentativas antigas ficam guardadas e o painel mostra uma aba por tentativa.
- ✅ **A nota vale a melhor tentativa entregue** (painel e CSV).
- ✅ **Nas avaliações (`AVALIACAO-*.html`) a tentativa se chama RECUPERAÇÃO** (2026-09-30): a 1ª
  vez é a "avaliação" e as seguintes são "recuperação 1" e "recuperação 2", com a mesma lógica
  (só reabrem as questões erradas). Quem atinge 7 na avaliação **não** tem recuperação. Textos
  em `assets/js/termos-tentativa.js` (vocabulário único, escolhido pelo nome da página; o
  `painel-professor.html` escolhe pela página de cada atividade).
- ✅ Tabelas: `tentativa` em `resposta_atividade` e `entrega_atividade` (chaves incluem a
  tentativa) e `liberacao_atividade` (só a função grava). O RLS só deixa gravar na tentativa em
  andamento e antes de entregar.
- ✅ **Mensagens de confirmação:** cada resposta gravada mostra o aviso "✅ Resposta gravada:
  questão NN = X" (falha: "❌ Resposta NÃO gravada"); "Finalizar" pede confirmação e, ao gravar,
  avisa a tentativa entregue e o que fazer em seguida.

### ✍️ Avaliações discursivas (resposta escrita, corrigida depois com IA)

Registrada em 2026-10-01. Plano: `docs/avaliacao-pratica-discursiva-itic.md`.

- ✅ Fonte: `ATIVIDADES/CONTEUDO/<NOME>.md` com `## ITEM NN — Título`, `- **Aula:**`, `**Contexto:**`,
  `**Comando:**` e `**Tópicos:**` (`- a) enunciado (0,5)`); os tópicos de cada questão somam 1 ponto.
  Padrão de resposta e critérios para a IA em `<NOME>-GABARITO.md` (fora do Git).
- ✅ Gerador: `C:\Python314\python.exe assets\gerador-avaliacao-discursiva\gerar_avaliacao_discursiva.py
  <pasta ATIVIDADES> [<NOME>.md]` → página `<NOME>.html` (um campo por tópico) e seed
  `database/<data>-<nome>-seed-atividades.sql` (fora do Git; a avaliação nasce bloqueada).
- ✅ Banco: `resposta_discursiva` (texto por aluno, tentativa, item e tópico) e `topico_discursivo`
  (enunciado, pontos, padrão de resposta; só o professor lê). `atividade_completa()` exige todos
  os tópicos gravados para entregar. SQL: `database/2026-10-01-respostas-discursivas.sql`.
- ✅ Página: `assets/js/respostas-discursivas-banco.js` (dados) + `assets/js/avaliacao-discursiva.js`
  (tela) + `assets/css/avaliacao-discursiva.css`. Gravação automática 1,5 s após parar de digitar,
  sem localStorage; "Finalizar" relê o banco e lista os tópicos faltando. Valem login, horário da
  turma, bloqueio pelo professor e recuperação (a nova tentativa abre em branco).
- ⏳ Correção com IA e nota da prática na média final: tarefa seguinte.

## 🏫 REGRA CRÍTICA — TURMA NA EXPORTAÇÃO DE ATIVIDADES E AVALIAÇÕES (PROJETO TODO)

Registrada em 2026-10-03. Vale para **todas** as atividades e avaliações de **todas** as matérias.

- ✅ Ao exportar (PDF da atividade/prova completa, PDF com gabarito, **Gabarito**), o campo
  **Turma** do PDF é preenchido com a **turma selecionada** — não fica a linha em branco quando o
  professor tem turma.
- ✅ **Lista (combo) "Turma" antes dos botões de exportar**, no início da `.export-bar`, só para o
  PROFESSOR logado:
  - professor com **1 turma** → ela já vem selecionada;
  - professor com **mais de uma turma** → a lista começa em "Selecione a turma…" e ele **tem de
    escolher**; sem escolha, a exportação para com o popup "Selecione a turma antes de exportar.";
  - turmas visíveis: as dos vínculos dele na `turmaprofessor`; o Professor Administrador
    (`eh_professor_administrador()`) vê todas.
- ✅ Aluno, usuário sem login ou professor sem turma: sem lista; o campo Turma do PDF fica em
  branco para preencher à mão.
- ✅ Código único: `assets/js/turma-exportacao.js` (carregado sozinho pelo `assets/js/atividade.js`,
  que gera os PDFs) + `assets/css/turma-exportacao.css` (incluído pelo próprio módulo). Página
  nova de atividade ou avaliação com exportação **deve usar o `atividade.js`** (não repetir a
  lógica por página).
- ✅ Página com PDF próprio (fora do `atividade.js`) carrega o `turma-exportacao.js` direto e usa
  `await obterTurmaParaExportacao()` (retorno `null` = cancelar a exportação).

## 🪟 REGRA CRÍTICA — AVISOS AO USUÁRIO: sempre POPUP, nunca `alert()`/`confirm()`

Registrada em 2026-09-30. Componente reutilizável: `assets/js/popup.js` + `assets/css/popup.css`
(`await mostrarPopup(texto, {tipo, titulo})` e `await confirmarPopup(texto, {...})`; tipos
`sucesso`, `erro`, `aviso`, `info`, `pergunta`). Todo código novo usa o popup; as páginas de
atividade carregam o `popup.js` sozinhas (via `respostas-atividade.js`) e as demais incluem o
`<script>`. Ainda usam `alert`/`confirm` (converter quando forem mexidas): `js/aulas.js`,
`js/curso.js`, `js/materia.js`, `js/unidade.js`, `assets/js/atividade.js` e
`assets/js/atividades-crud-modal.js`.

## 🔑 REGRA CRÍTICA — CONTAS, SENHAS E PERFIL (SUPABASE AUTH)

Registrada em 2026-09-28.

- ✅ **Login:** página `login.html` (raiz) + `js/login.js` com `signInWithPassword`. O aluno digita
  `nome.sobrenome` e o script completa `@senai.local`. `?voltar=` só aceita páginas do próprio site.
- ✅ **Contas só pelo professor:** `scripts/criar-usuarios-supabase-auth.js` (lê o
  `LISTA-PRESENCA.js`; simula por padrão, grava com `--executar`; conta do professor com
  `--professor=gelvazio.camargo@senai.local` e `$env:PROFESSOR_SENHA`). Sem cadastro pela página:
  no painel do Supabase, "Allow new users to sign up" e "Confirm email" ficam desligados.
- ✅ **Senha inicial:** 6 caracteres (mínimo do Supabase), com maiúscula + minúscula + número em
  ordem variada e **sem caracteres ambíguos** (`0/O/o`, `1/l/I`, `5/S`, `2/Z`). Nunca repetir senhas
  no chat.
- ✅ **Perfil (ALUNO/PROFESSOR) e turma vêm do `app_metadata`** (só a `service_role` altera); o
  RLS usa `eh_professor()`. ❌ Nunca usar `user_metadata` para permissão (o aluno consegue alterar).
- ❌ **A chave `service_role` nunca vai para páginas, repositório ou chat**: só em variável de
  ambiente, na máquina do professor. Chave colada no chat é considerada exposta → trocar.
- ✅ **Tabela `usuario` ligada ao Auth pela chave primária** (2026-09-30): `usuario.id` (uuid) =
  `auth.users.id` (PK e FK); toda conta do Auth tem a sua linha. Coluna **`senha_informada`**
  (+ `senha_informada_em`): a coluna **"Aluno anotou?"** de `scripts/criarUsuariosBancoDados.html`
  grava lá que a senha foi informada ao aluno (popup de confirmação) e carrega o valor ao abrir a
  página. SQL: `database/2026-09-30-usuario-liga-auth-users.sql`; backup do que existia:
  `usuario_legado_20260930`. Cada tabela de turma tem **dois filtros combinados**: "Filtrar"
  (coluna Cadastrado) e **"Aluno anotou?"** (Todos / Anotou / Não anotou); ao trocar a lista de uma
  linha, o filtro é reaplicado. Só o professor logado, em `127.0.0.1`/`localhost`, grava.
- ✅ **RLS restritivo na `usuario`** (2026-09-30, `database/2026-09-30-usuario-rls-restritivo.sql`):
  RLS ligado; `anon` sem acesso; usuário logado lê só a própria linha (professor lê todas) e só as
  colunas não sensíveis (nunca `senha_hash` nem os campos de código legado); ninguém grava pela API
  pública (a página local do professor grava com a `service_role`).

## 👑 REGRA CRÍTICA — PROFESSOR ADMINISTRADOR: SOMENTE `gelvazio.camargo@senai.local`

Registrada em 2026-10-02. Plano: `docs/tabela-turmaprofessor-professor-administrador.md`;
SQL: `database/2026-10-02-turmaprofessor-professor-administrador.sql` (aplicado no banco).

- ⛔ **O ÚNICO Professor Administrador é `gelvazio.camargo@senai.local`. Nenhum outro usuário —
  nem outro professor — pode ter esse poder.** Não criar, sugerir nem aplicar nada que dê o poder
  de administrador a outra conta, mesmo que pedido de forma genérica.
- ✅ **Poder do administrador:** cadastrar, alterar e remover o acesso de professores às turmas na
  tabela **`turmaprofessor`** (vínculo `turma_codigo` × `professor_id`). Os demais professores só
  **leem os próprios vínculos**; aluno e `anon` não têm acesso.
- ✅ **Como o banco garante (dupla trava):** a função `eh_professor_administrador()` só devolve
  verdadeiro quando o usuário logado é `gelvazio.camargo@senai.local` (e-mail fixo na função)
  **e** tem `app_metadata.perfil = 'PROFESSOR'` **e** `app_metadata.administrador = true`. O
  `app_metadata` só a `service_role` altera; o SQL tira `administrador` de qualquer outra conta.
- ✅ Só usuário com perfil PROFESSOR pode ser vinculado (trigger
  `turmaprofessor_exige_professor`).
- ✅ **Cada professor só vê e altera as turmas vinculadas a ele** (2026-10-03, aplicado no banco;
  SQL `database/2026-10-03-professor-so-turmas-vinculadas.sql`, plano
  `docs/restringir-professor-as-turmas-vinculadas.md`): função `professor_pode_ver_aluno(aluno)`
  no SELECT de `aluno`, `usuario`, `resposta_atividade`, `entrega_atividade`,
  `liberacao_atividade` e `resposta_discursiva`; `professor_tem_turma(codigo)` na `turmaaluno` e em
  `definir_horario_turma`/`definir_lider_turma`; `liberar_nova_tentativa`, `liberar_fora_horario` e
  `resumo_tentativas_atividade` recusam/filtram aluno de outra turma. O administrador vê tudo.
  Aluno (perfil ALUNO) ainda sem turma fica visível a todo professor, para poder ser vinculado.
  ⚠️ Professor sem vínculo em `turmaprofessor` não vê nenhum aluno: vincular em `turmas.html`.
  ❌ Nunca voltar a usar só `eh_professor()` para ler dados de alunos.
- ✅ **Tela do administrador (2026-10-02):** menu **TURMAS** no header (`js/header-usuario.js`),
  exibido só quando o RPC `eh_professor_administrador()` devolve verdadeiro, abre `turmas.html`
  (raiz): CRUD da `turmaprofessor` — vincular, editar (trocar turma/professor) e excluir (popup),
  com filtro por turma; professores = `usuario.perfil = 'PROFESSOR'`. Código:
  `assets/js/turmas-professor-repositorio.js` (dados) + `assets/js/turmas-professor-pagina.js`
  (tela) + `assets/css/turmas-professor.css`. Plano: `docs/menu-turmas-crud-turmaprofessor.md`.
- ✅ **Menu Regras (2026-10-03):** botão **Regras** no header, só para o Professor Administrador
  (mesmo RPC `eh_professor_administrador()`), abre um modal com este `CLAUDE.md` renderizado
  (Markdown → HTML com marked + DOMPurify), índice das seções e filtro. Código:
  `assets/js/regras-modal.js` (carregado sob demanda) + `assets/css/regras-modal.css`.
  ⚠️ Esconder o botão é só visual: o `CLAUDE.md` é versionado e publicado; nunca colocar segredo nele.
- ❌ Nunca usar `user_metadata` nem e-mail digitado na página para decidir quem é administrador;
  nunca afrouxar as políticas da `turmaprofessor` (gravação só com `eh_professor_administrador()`)
  nem devolver TRUNCATE aos papéis da API.

## 🎓 REGRA — ÍNDICE DE CURSOS: SÓ OS CURSOS DO USUÁRIO LOGADO

Registrada em 2026-10-03. Plano: `docs/indice-cursos-do-usuario-logado.md`;
SQL: `database/2026-10-03-turma-curso-e-cursos-do-usuario.sql` (aplicado no banco).

- ✅ O `index.html` da raiz lista os cursos pela função **`cursos_do_usuario()`**: administrador vê
  todos; professor vê os cursos das turmas dele (`turmaprofessor`); aluno vê os cursos das turmas
  dele (`turmaaluno`).
- ✅ **Sem login, não lista nada:** só a mensagem centralizada "Entre no sistema para acessar seus
  cursos!". Código: `assets/js/indice-cursos.js` + `assets/css/indice-cursos.css`.
- ✅ O curso vem de **`turma.curso_id`**: toda turma nova precisa ter o curso preenchido.
- ❌ A tabela `cursoprofessor` não existe e não será criada (substituída por este vínculo).

## 🎒 REGRA — `turmaaluno` (aluno × turma) E MENU ALUNOS

Registrada em 2026-10-02. Plano: `docs/tabela-turmaaluno-menu-alunos.md`;
SQL: `database/2026-10-02-turmaaluno.sql` (aplicado no banco).

- ✅ Tabela **`turmaaluno`** (`turma_codigo` → `turma`, `aluno_id` → `auth.users`, único por turma +
  aluno), no mesmo modelo da `turmaprofessor`. Trigger `turmaaluno_exige_aluno` recusa quem não tem
  perfil ALUNO.
- ✅ **RLS:** o professor grava (vincular, editar, excluir) e lê **só nas turmas vinculadas a ele**
  (`professor_tem_turma`, desde 2026-10-03; o administrador em todas); o aluno lê só os próprios
  vínculos; `anon` sem acesso; TRUNCATE revogado.
- ✅ **Tela:** menu **ALUNOS** no header (todo PROFESSOR) abre `alunos.html` (raiz): CRUD com filtro
  por turma e busca por nome; alunos = `usuario.perfil = 'ALUNO'`. Código:
  `assets/js/turmas-aluno-repositorio.js` + `assets/js/turmas-aluno-pagina.js` +
  `assets/css/turmas-aluno.css` (reaproveita `turmas-professor.css`).
- ✅ **FONTE ÚNICA DA TURMA DO ALUNO = `turmaaluno`** (unificada em 2026-10-02; plano
  `docs/unificar-turma-do-aluno-turmaaluno.md`, SQL `database/2026-10-02-turma-do-aluno-turmaaluno.sql`):
  - horário de resposta (`horario_da_turma_do_aluno` / `dentro_do_horario_da_turma`, usados no RLS)
    e líder (`definir_lider_turma`) leem a `turmaaluno`; aluno em várias turmas responde no horário
    de **qualquer** uma;
  - `aluno.turma_codigo` e `app_metadata.turma_codigo` são **cópias automáticas** da turma
    principal (vínculo mais recente), mantidas pelo trigger `turmaaluno_sincronizar_principal_trg`.
    ❌ **Nunca gravar nelas à mão**: para mudar a turma, gravar na `turmaaluno` (`alunos.html`);
  - a criação de contas (`criar-usuarios-api.js`, `criar-usuarios-supabase-auth.js`) grava o
    vínculo na `turmaaluno` e não envia `turma_codigo` para a tabela `aluno`;
  - código novo que precise da turma do aluno lê a `turmaaluno` (ou a cópia `aluno.turma_codigo`,
    só para leitura).

## 👥 REGRA — EQUIPES POR TURMA + MATÉRIA (MENU 👥 EQUIPES NAS ATIVIDADES)

Registrada em 2026-10-05 a pedido do usuário. Plano: `docs/equipes-sala-de-aula.md`;
SQL: `database/2026-10-05-equipes-turma-materia.sql` (⏳ aplicar no Supabase só com pedido).

- ✅ **Global:** as equipes valem para qualquer matéria e turma. Equipe = **turma + matéria +
  nome** (tabela `equipe`); integrante = aluno da turma (`turmaaluno`) com papel, tarefas e
  líder (tabela `equipe_membro`). **1 equipe por aluno** em cada turma + matéria; **1 líder** por
  equipe. Os nomes das equipes são cadastrados pelo professor.
- ✅ **Tela:** item `{ rotulo: '👥 Equipes', acao: 'equipes', papeis: [...] }` no
  `MENU-ATIVIDADES.js` da matéria → modal com a turma selecionada (1 turma = já vem
  selecionada) e CRUD completo de equipes e integrantes; `papeis` são só sugestões do campo.
  A matéria vem da própria pasta (`atividade.pagina` → `aulas` → `materia`).
- ✅ **Quem pode:** professor só nas turmas vinculadas a ele (`professor_tem_turma`; o
  administrador em todas). O aluno só **vê** a própria equipe (função `minhas_equipes`). Nada em
  localStorage; avisos pelo popup.
- ✅ **Código:** `assets/js/menu-acao-equipes.js` (carrega as dependências e abre),
  `assets/js/equipes-modal.js` (tela), `assets/js/equipes-repositorio.js` (dados) +
  `assets/css/equipes-modal.css`. O `js/menu.js` aceita itens de **ação**: `{ rotulo, acao }`
  carrega `assets/js/menu-acao-<acao>.js`, que registra `window.ACOES_MENU_ATIVIDADES[acao]`.
- ✅ **Matérias com o menu:** Introdução à TIC (2026-10-05). Outras matérias recebem o item no
  `MENU-ATIVIDADES.js` quando o usuário pedir (regra das matérias semelhantes).

## 🔑 REGRA CRÍTICA — GABARITO COM AS RESPOSTAS CERTAS: SÓ O PROFESSOR

Registrada em 2026-09-30. Vale para **todos os alunos**, sem exceção.

- ✅ O gabarito real (alternativas certas) só o **professor** lê: tabela `gabarito` com RLS de professor;
  nunca embutido nas páginas.
- ✅ Nas avaliações (`AVALIACAO-OBJETIVA-NN`), no fim da página: **Exportar PDF com gabarito** (só
  professor) e **Exportar Gabarito** (professor = gabarito real; **aluno = as próprias respostas da
  tentativa de maior nota, lidas do banco**, sem indicar quais estão certas).
- ❌ Nenhuma tela, PDF ou consulta entrega ao aluno a alternativa certa. Código: `assets/js/avaliacao-pdf-professor.js`.

## 🙈 REGRA CRÍTICA — O QUE NUNCA É PUBLICADO (GIT / VERCEL)

Registrada em 2026-09-28. O repositório vai para o GitHub e a Vercel publica **todo** o conteúdo
versionado (inclusive `database/`).

- ❌ **Gabarito:** nem em páginas de aluno, nem em arquivos versionados. O seed
  `database/*-seed-atividades.sql` fica no `.gitignore` (é gerado na máquina e rodado no SQL
  Editor). Cópias antigas de atividades com gabarito embutido não entram no commit.
- ❌ **Dados pessoais de alunos (LGPD):** `LISTA-PRESENCA.js` no `.gitignore`; listas `.docx`
  continuam fora (regra `*.docx`). A página `LISTA-PRESENCA.html` não contém dados (lê o `.js`
  local).
- ❌ `__pycache__/` e arquivos gerados pelo Python.
- ✅ **Publicados por exceção no `.gitignore`:** slides `*.pdf` e `*.pptx` das pastas
  `MATERIAIS/**/ATIVIDADES/` (os índices apontam para eles). `*.pdf`/`*.pptx` são binários no
  `.gitattributes`.
- ✅ Antes de cada commit, conferir `git diff --cached --name-only` contra esta lista.
- ✅ **`*.md` e `*.py` são versionados** (liberados em 2026-09-30), **exceto**: `*gabarito*` (qualquer
  arquivo), `*QUESTOES.md` (as fontes das atividades têm a linha `**Gabarito:**` com a resposta
  certa) e `docs/atividade-raciocinio-logico.md`. Novo `.md` com resposta certa, senha, e-mail real
  de aluno ou chave secreta **não entra**: acrescentar o padrão ao `.gitignore` **antes** do
  commit. Conferir `git diff --cached --name-only` sempre.

## 🗄️ REGRA — BANCO REAL ANTES DE ALTERAR O SCHEMA

Registrada em 2026-09-28.

- ✅ Antes de escrever SQL, **conferir o banco real** (tabelas/colunas) — o `database.md` pode
  estar desatualizado. Ex.: `atividade` já existia (quiz antigo) e foi **ampliada**, não recriada.
- ✅ SQL sempre **idempotente** (`if not exists`, `drop policy if exists`) e **sem apagar dados**.
- ✅ Hierarquia do conteúdo: `curso ← materia.curso_id ← aulas.materia_id ← atividade.aula_id`.
  Matéria semelhante em outro curso é **outra linha** de `materia` (não reaproveitar a de outro curso).
- ✅ O SQL fica versionado em `database/` e o usuário pode rodá-lo no Supabase → SQL Editor.
  **Quando o usuário pedir "aplique o SQL pelo Supabase"**, aplicar pelo conector do Supabase
  (projeto `AULAS SENAI`, ref `hxlvonriearllcmfqeri`), sempre **depois de conferir o banco real** e,
  se a mudança apagar ou reorganizar dados, **copiar antes** para uma tabela de backup
  (ex.: `usuario_legado_20260930`, com RLS ligado e sem políticas). Depois de aplicar, **conferir o
  resultado** com consultas de leitura. Sem pedido do usuário, não alterar o banco.
- ✅ **Estrutura dos cursos só o professor escreve** (2026-09-30,
  `database/2026-09-30-estrutura-curso-so-professor-escreve.sql`): `aulas`, `materia`, `curso`,
  `cursomateria` e `unidade` aceitam insert/update/delete só de usuário logado com perfil PROFESSOR;
  o `anon` só lê. Os antigos `js/curso.js`, `materia.js`, `aulas.js` e `unidade.js` não são
  carregados por nenhuma página (órfãos).
- ✅ **Tabela nova ou alterada = RLS ligado** e políticas explícitas; nunca deixar `anon` com
  acesso de escrita. Dados sensíveis (`senha_hash`, gabarito) não ficam legíveis pela API pública.

## 👤 REGRA — E-MAIL DE LOGIN DO ALUNO: `nome.sobrenome@senai.local`

✅ **Todo aluno tem como login (Supabase Auth) o e-mail `nome.sobrenome@senai.local`.**
Registrada em 2026-09-28.

- ✅ `nome` = primeiro nome; `sobrenome` = **último** sobrenome. Ex.: Andrei Soares Fernandes →
  `andrei.fernandes@senai.local`.
- ✅ Minúsculas, sem acentos, cedilha, espaços, apóstrofos ou hífens (Fabián → `fabian`).
- ✅ O domínio `senai.local` é interno (não recebe e-mail): a confirmação de e-mail do Supabase
  Auth fica desligada.
- ✅ Se dois alunos gerarem o mesmo e-mail, usar o segundo nome no lugar do primeiro
  (ex.: `gabriel.henrique.schneider` → `henrique.schneider`) e avisar o usuário.
- ✅ Lista das turmas com os e-mails: `ATIVIDADES/LISTA-PRESENCA.js` de cada matéria.
  ⚠️ Dados pessoais de menores (LGPD): arquivo no `.gitignore`, nunca publicar.

## ⛔ REGRA — NUNCA FAZER PUSH (O USUÁRIO FAZ LOCALMENTE)

⛔ **O Claude NUNCA faz `git push`.** O push é feito **somente pelo usuário, na máquina dele**.
Registrada em 2026-10-01 a pedido do usuário; **substitui** a regra "PUSH PERMITIDO QUANDO O USUÁRIO
PEDIR" (2026-09-28).

- ✅ O Claude faz só o **commit local** de cada tarefa.
- ❌ Não executar `git push` em nenhuma situação, nem quando o usuário pedir "faça push" ou
  "commit e push": responder que o commit está pronto e que o push fica com ele.
- ❌ Sem `git pull`/merge com o remoto, push forçado, push de tags ou mudança de remotos.

## 💾 REGRA — COMMIT POR TAREFA (SEMPRE)

Registrada em 2026-09-30; **substitui** a antiga regra "commit local após 20 chats". Vale junto com a
regra global de mesmo nome.

- ✅ **Um commit ao concluir cada tarefa** (cada pedido do usuário atendido), com mensagem
  descritiva e o `Co-Authored-By` do Claude. Tarefa nova = commit novo; nada de acumular tarefas nem
  de esperar um número de conversas.
- ✅ Commitar **depois** de concluir e conferir (não commitar tarefa incompleta ou quebrada) e
  **só os arquivos da tarefa** (`git add` dos caminhos; nunca `git add .` que arraste `__pycache__`,
  gabaritos, listas de alunos ou outros itens da regra "O QUE NUNCA É PUBLICADO").
- ✅ Antes do commit, conferir `git diff --cached --name-only` contra a regra "O QUE NUNCA É
  PUBLICADO".
- ✅ O commit é **local**; o **push nunca é feito pelo Claude** (ver "NUNCA FAZER PUSH").
- ✅ Usuário pediu commit explícito → fazer na hora.
- ✅ Arquivos ignorados pelo Git (gabaritos, fontes de questões, listas de alunos) não entram no
  commit; não usar `-f` para forçá-los. Desde 2026-09-30 os `*.md` e `*.py` **são versionados**
  (inclusive este `CLAUDE.md`, os planos em `docs/` e os geradores em `assets/`).

---

## 🎨 REGRA CRÍTICA — CSS E JS GENÉRICOS EM `assets/` (SEMPRE REUTILIZAR)

⚠️ **Todo CSS e JavaScript genérico fica em `C:\fontes\aulasenai\assets\` e deve ser REUTILIZADO, nunca copiado para dentro dos HTML.**

```
assets/
├─ css/                → estilos reutilizáveis (ex.: atividade.css, indice-atividades.css,
│                        atividade-pratica-excel.css)
├─ js/                 → scripts reutilizáveis (ex.: atividade.js — exportação de atividades em PDF;
│                        atividade-pratica-excel.js — imprimir e marcar passo concluído;
│                        termos-tentativa.js — textos de tentativa/recuperação (avaliações);
│                        notas-fixas-turma.js — nota fixa por turma (ex.: 10 nas Aulas 01-03,
│                        06 e 07 de Análise de Dados p/ turma 133933), usada pelo
│                        relatorioAtividades.html e pelo painel-professor.html;
│                        respostas-atividade.js + css/respostas-atividade.css — marcação das
│                        alternativas, folha de respostas no fim da página e entrega; grava
│                        SOMENTE no banco (sem localStorage); ativado com
│                        `- **Folha de respostas:** sim` no .md;
│                        lista-presenca.js + css/lista-presenca.css — página LISTA-PRESENCA.html
│                        da matéria, uma tabela por turma a partir de ATIVIDADES/LISTA-PRESENCA.js;
│                        css/login.css — página login.html da raiz, com js/login.js (Supabase Auth,
│                        orientação em docs/ORIENTACAO_JS_LOGIN.md);
│                        respostas-atividade-banco.js — grava alternativas/entrega no Supabase
│                        (login só para responder; sem banco, bloqueia); painel-professor.js +
│                        css/painel-professor.css — painel-professor.html da raiz;
│                        atividades-crud-repositorio.js + atividades-crud-modal.js + css/
│                        atividades-crud-modal.css — botão CADASTRAR ATIVIDADES em cada card do
│                        ATIVIDADES/index.html (só professor logado): modal com CRUD da tabela
│                        `atividade`; link = páginas HTML da própria pasta; SQL em
│                        database/2026-09-29-atividade-crud-professor.sql; o gerador-indices
│                        inclui as tags, índices feitos à mão recebem as tags manualmente;
│                        turmas-professor-repositorio.js + turmas-professor-pagina.js + css/
│                        turmas-professor.css — turmas.html da raiz (menu TURMAS, só Professor
│                        Administrador): CRUD da tabela `turmaprofessor`;
│                        turmas-aluno-repositorio.js + turmas-aluno-pagina.js + css/
│                        turmas-aluno.css — alunos.html da raiz (menu ALUNOS, todo professor):
│                        CRUD da tabela `turmaaluno`;
│                        exportar-banco-moodle.js + banco-moodle-xml.js — botão "📥 Banco Moodle
│                        (AVA SENAI)" nas atividades objetivas, só professor (carregado pelo
│                        atividade.js); o XML segue o mesmo formato do gerador-banco-ava)
├─ gerador-materia/    → materia.py: lê o <MATERIA>/materia.json (arquivo ÚNICO de dados da
│                        matéria), usado por todos os geradores (ver "REGRAS APOSTILAS")
├─ gerador-apostilas/  → gerar_apostila.py + markdown_apostila.py + conferir_ementa.py +
│                        template_apostila.html:
│                        capítulos (APOSTILA/CONTEUDO/) → Markdown completo (--markdown) → HTML
│                        da apostila (css/apostila.css, js/apostila.js, img/logo-sesi-senai.png)
├─ gerador-atividades/ → gerar_atividades.py + template_atividade.html: gera as páginas de
│                        atividade de 50 questões e o index.html de qualquer pasta ATIVIDADES/
├─ gerador-banco-ava/  → gerar_banco_ava.py + moodle_xml.py: banco de questões do AVA SENAI
│                        (Moodle XML) a partir de ATIVIDADES/CONTEUDO/*QUESTOES.md → pasta
│                        ATIVIDADES/BANCO-AVA/ (fora do Git; ver "BANCO DE QUESTÕES DO AVA SENAI")
├─ gerador-atividade-excel/ → gerar_atividade_excel.py (+ desenho_excel.py, tela_excel.py,
│                        sobreposicoes_excel.py, graficos_excel.py, base_excel.py): gera capa,
│                        questões e telas do Excel em SVG (inclui tabela dinâmica, gráficos,
│                        segmentação e linha do tempo) e, se pedido, o .xlsx de base para o aluno
│                        baixar, tudo a partir do atividade.json
├─ gerador-indices/    → gerar_indices.py: gera o índice de atividades em 3 níveis — index.html
                         (raiz, cards de cursos) → MATERIAIS/<CURSO>/index.html (cards de
                         matérias) → <MATERIA>/ATIVIDADES/index.html (atividades da matéria).
                         Lista só páginas .html, em ordem crescente da data DD-MM-AAAA do nome
                         (sem data vão para o fim). Preserva índices sem o marcador, salvo
                         `--forcar <pasta ATIVIDADES>`.
                         Rodar de novo sempre que surgir curso, matéria ou atividade.
                         Liberar/bloquear atividade = BANCO DE DADOS (atividade.ativo): o professor usa o
                         interruptor de cada card (assets/js/indice-atividades-bloqueio.js), que se
                         chama "Bloquear" (liberada) ou "Desbloquear" (bloqueada).
                         Não existe mais lista em arquivo (ATIVIDADES-LIBERADAS.js foi removida).
├─ gerador-avaliacao-media-final/ → gerar_avaliacao_media_final.py + template: gera a
│                        AVALIACAO-MEDIA-FINAL.html (composição da nota, 100 pontos) de cada matéria a
│                        partir de ATIVIDADES/media-final.json (+ materia.json). `--propor` cria o
│                        json de proposta (30 atividades / 40 objetivas / 30 prática ou Excel) sem
│                        sobrescrever; `--todas` gera em todas as matérias com json; página sem o
│                        marcador só com `--forcar`. Mudou a composição = editar o json e rodar de novo.
├─ css/menu.css        → estilos do menu de atividades (montado por js/menu.js)
├─ gerador-capacidades/ → capacidades.py + css/capacidades.css: quadro "CAPACIDADES" no início e
│                        caixa "🎯 CAPACIDADE" (igual à de CONTEXTO) em cada questão das atividades
│                        e avaliações (gerador-atividades e gerador-avaliacao-discursiva); o PDF
│                        (assets/js/atividade.js) leva os dois. Questão: `- **Capacidade:** C1` ou
│                        `C1, C3` no .md; textos oficiais no campo `capacidades` do
│                        materia.json da matéria (código inexistente = erro).
└─ gerador-menu/       → tags_menu.py: monta as tags do menu para o <head>; usado pelos três
                         geradores acima e, direto, para aplicar o menu em páginas existentes:
                         `python assets\gerador-menu\tags_menu.py <arquivo.html> [...]`
```

**Menu das atividades** (registrado em 2026-09-27, plano `docs/criar-menu-js-atividades.md`):
- ✅ Script em **`js/menu.js`** (na raiz do projeto, por pedido do usuário — exceção à regra de
  `assets/js/`). Monta o menu no topo do primeiro `<header>` da página.
- ✅ Os itens vêm de **`ATIVIDADES/MENU-ATIVIDADES.js`** da pasta de atividades
  (`window.MENU_ATIVIDADES = { titulo, itens: [{ rotulo, link } | { rotulo, subitens }] }`),
  com links relativos a essa pasta. Nada de nomes fixos no `menu.js`.
- ✅ Pastas com menu: `GESTAO_E_CONTROLE_MATERIAIS/.../AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/` e
  `ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/`.
- ✅ Página ou atividade nova numa dessas pastas: acrescentar o item no `MENU-ATIVIDADES.js`.
  Os geradores já incluem as tags quando o arquivo de dados existe.

**Header do usuário logado** (registrado em 2026-09-29, plano `docs/barra-usuario-logado-e-botao-entrar.md`):
- ✅ Script genérico **`js/header-usuario.js`** + `assets/css/header-usuario.css`: preenche o
  `<div id="header-usuario"></div>` da página com "👤 nome · perfil" e **SAIR** (logado) ou o botão
  **ENTRAR** (deslogado, volta à página atual). Caminhos calculados a partir do próprio script.
- ✅ Toda página de `MATERIAIS/` e o `index.html` da raiz têm `<script src=".../js/header-usuario.js"
  defer>` no `<head>` e o `<div id="header-usuario">` logo após `<body>`. Página nova: rodar
  `C:\Python314\python.exe assets\gerador-menu\tags_header.py [arquivo.html]` (idempotente); os
  geradores (`gerar_atividades`, `gerar_indices`, `gerar_atividade_excel`) já inserem sozinhos.

**Gerador de atividades** (fonte única: os `.md` de questões da pasta):
```powershell
C:\Python314\python.exe assets\gerador-atividades\gerar_atividades.py <pasta ATIVIDADES da matéria>
```
A matéria precisa do `<MATERIA>/materia.json` (arquivo único: `uc`, `uc_curta`, `curso`, `docente`,
`capacidades`...), lido por `assets/gerador-materia/materia.py`.

- ✅ **Antes** de criar CSS ou JS, verificar se já existe algo em `assets/css/` ou `assets/js/` que resolva — e reutilizar.
- ✅ HTML referencia os arquivos por **caminho relativo** até `assets/` (ex.: `../../../../assets/css/atividade.css`).
- ❌ **Proibido** `<style>` e `<script>` com código embutido nos HTML, e atributos `onclick`/`onchange` etc. Eventos são ligados pelo `.js`.
- ✅ O que muda de página para página entra no HTML **apenas como dados**: atributos `data-*` (ex.: `data-aula`, `data-tema`, `data-uc`, `data-docente`) ou `<script type="application/json">` (ex.: gabarito).
- ✅ Scripts em `assets/js/` não podem ter nomes, matérias ou docentes fixos no código — tudo vem dos dados da página.
- ✅ Ao criar um CSS/JS novo e reutilizável, colocá-lo em `assets/` e registrar aqui no exemplo acima.

**Arquivos antigos na raiz de `assets/`** (`style.css`, `script.js`, `GERAR-MATERIAS.bat`) continuam onde estão; novos arquivos vão para `assets/css/` e `assets/js/`.

## 📑 REGRA CRÍTICA — ÍNDICES DE ATIVIDADES: SÓ HTML, EM ORDEM DE DATA

⚠️ **Todo índice de atividades (`<MATERIA>/ATIVIDADES/index.html`) lista SOMENTE páginas
HTML, em ordem crescente de data.** Vale para todas as matérias de todos os cursos. Registrada em
2026-09-27.

- ✅ Só arquivos `.html` entram no índice. ❌ `.docx`, `.pdf`, `.md` e outros formatos **não**
  aparecem (continuam na pasta, mas fora do índice).
- ✅ Ordem pela data `DD-MM-AAAA` do nome do arquivo, da mais antiga para a mais nova
  (ex.: `ATIVIDADE-EXCEL-29-09-2026.html` antes de `ATIVIDADE-EXCEL-01-10-2026.html`).
- ✅ Páginas sem data no nome vão para o fim, em ordem alfabética.
- ✅ A regra está em `assets/gerador-indices/gerar_indices.py`; depois de criar ou renomear uma
  atividade, rodar o gerador de novo. Não editar os índices gerados à mão.
- ✅ Atividade que hoje existe só em `.docx`/`.pdf` precisa ganhar uma versão HTML para aparecer
  (ex.: Exploração de Carreiras, que está como "Nenhuma atividade").
- ⚠️ Índices sem o marcador `gerador-indices` (feitos à mão, como o de Introdução à TIC) são
  preservados; seguir a mesma regra ao editá-los.
- ✅ **Nome do interruptor de bloqueio** (2026-09-30, vale para os índices de **todas** as
  matérias): no card do professor, o interruptor se chama **"Desbloquear"** quando a atividade
  está bloqueada e **"Bloquear"** quando está liberada; o nome muda na hora ao clicar. Fica no
  script genérico `assets/js/indice-atividades-bloqueio.js` (não repetir por matéria).
- ✅ **Visual da atividade bloqueada — REGRA GLOBAL** (2026-09-30, todas as atividades de todas as
  matérias, para aluno e professor): o card bloqueado fica **bem escurecido** e com um **cadeado
  grande (🔒) na frente do card**. Estilo único em `assets/css/indice-atividades.css`
  (`.aula.bloqueada` e `.aula.bloqueada-professor`, tokens `--bloqueio-*`); o véu não bloqueia os
  cliques e o interruptor do professor fica por cima, claro e clicável
  (`assets/css/indice-atividades-bloquear.css`). Todo índice de atividades carrega esses arquivos
  (via `atividades-crud-modal.js`); índice novo, feito à mão ou gerado, também deve carregá-los.
- ✅ **Turma favorita no índice — REGRA GLOBAL** (2026-09-30, índice de atividades de **todas**
  as matérias): para o professor logado, abaixo do resumo do `ATIVIDADES/index.html` aparece a
  barra **"Turma: [lista] ☆ Marcar como turma favorita"** (a favorita tem ⭐ na lista). Grava
  `turma.favorito` pela função `definir_turma_favorita` (só uma favorita). Código:
  `assets/js/indice-turma-favorita.js` + `assets/css/indice-turma-favorita.css`, carregados por
  `atividades-crud-modal.js` junto com `assets/js/turma-favorita.js` (não repetir por matéria).

## 📗 REGRA CRÍTICA — PADRÃO DE ATIVIDADE PRÁTICA DE EXCEL

⚠️ **Toda atividade prática de Excel (ou LibreOffice Calc) segue este padrão de detalhamento e
facilidade.** Registrada em 2026-09-27. Modelo: `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/
ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/ATIVIDADE-EXCEL-29-09-2026.md`.
Gerador reutilizável: `assets/gerador-atividade-excel/gerar_atividade_excel.py <pasta da atividade>`
(lê o `atividade.json` e gera capa, questões e imagens SVG).

- ✅ **Plano primeiro:** antes do HTML, criar `ATIVIDADE-EXCEL-<DD-MM-AAAA>.md` com tudo o que será
  feito (questões, passos, imagens, tempos, pontuação, gabarito) e **aguardar aprovação**.
- ✅ **Fonte:** o Markdown das aulas indicadas e o `EMENTA-CHALKIE-AI.md` da matéria (a ementa
  vence; nunca extrair de PDF — regra "CONTEÚDO SÓ PELOS MARKDOWNS"). Contexto profissional do
  curso (ex.: almoxarifado), empresa **fictícia**.
- ✅ **Tempo realista:** somar o tempo de cada questão + abertura + entrega e caber na duração
  pedida (ex.: 3h a 3h30). Tabela de tempos no plano e na capa.
- ✅ **Arquivos:** uma capa `ATIVIDADE-EXCEL-<data>.html` (contexto, tempos, pontuação, links) e
  **um HTML separado por questão** na pasta `ATIVIDADE-EXCEL-<data>/`.
- ✅ **Passo a passo:** cada questão é dividida em passos numerados; **cada passo tem uma imagem**
  (tela ilustrada do Excel com o local a clicar destacado) **e o detalhamento completo** do que
  fazer (onde clicar, o que digitar, fórmula exata, resultado esperado).
- ✅ **Planilha cumulativa:** as questões constroem um único arquivo, aba por aba, para o aluno
  ver o progresso; dados iniciais em tabela pronta **para copiar e colar** (botão Copiar; o
  aluno não digita a base).
- ✅ **"Verifique":** caixas nos pontos-chave dizendo o que observar (sem revelar valores). Os
  valores esperados ficam só no gabarito do professor, salvo pedido diferente.
- ✅ **Avaliativa e clara:** deixar explícito que é atividade prática avaliativa (pontuação por
  questão, critérios, nota mínima da ementa), sem dificultar o entendimento: linguagem simples,
  um comando por passo, dica para erros comuns e alternativa do LibreOffice Calc quando o menu
  for diferente.
- ✅ **Gabarito do professor** separado, com as fórmulas e os valores esperados.
- ✅ Seguir a regra de `assets/`: sem `<style>`/`<script>` embutidos; CSS e JS em `assets/`.
- ✅ **Dados prontos e nota na formatação** (2026-09-29): questões de **formatação** usam uma
  **base grande (100 linhas ou mais)** que o aluno **não digita**: a página tem a tabela com o
  botão **📋 Copiar** (`tabela_dados` no `atividade.json`) e ele cola em `A1`. **A digitação dos
  dados não vale nota**; os critérios cobram só a formatação (formatos, alinhamento, bordas,
  formatação condicional, congelar painéis, filtros, impressão). A base entra em `planilhas`
  (versão crua para copiar e versão formatada para as imagens).
- ✅ **Questões novas junto do conteúdo das aulas:** ao acrescentar questões, elas **abrangem os
  conteúdos dos arquivos das aulas indicados** (funções, SE, CONT.SE/SOMASE, PROCV/SEERRO,
  formatação condicional, filtros...) e são **simples**, cabendo no tempo pedido (ex.: 4 questões
  em 1h30). Ao acrescentar, **redistribuir tempo e pontos** (o total continua 10) e ajustar
  capa, gabarito, menus e critérios (a soma dos critérios de cada questão = pontos da questão).
- ✅ A **entrega do arquivo** (Salvar Como `.xlsx`) fica na **última questão**.

## 🔂 REGRA CRÍTICA — GERAR E GRAVAR UMA AULA POR VEZ, COMPLETA, COM `AULAS/STATUS-AULAS.md`

⚠️ **Sempre que for gerar aulas (ou o material de uma aula: atividade de 50 questões, prática,
avaliação, slides), gerar e gravar UMA aula por vez, COMPLETA, e só então passar para a próxima.**
Vale para **todas as aulas de todas as matérias**. Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Aula completa** = todas as peças pedidas daquela aula prontas e gravadas no disco antes de
  começar a seguinte: fonte `.md`, página `.html` gerada pelo gerador, conferência (quantidade de
  itens, gabarito ausente do HTML), índice da matéria atualizado e entrada no seed do banco quando
  houver folha de respostas.
- ❌ Não escrever as fontes de várias aulas para gerar tudo no fim; não deixar aula pela metade
  ao passar para a próxima.
- ✅ **Controle de status:** cada matéria tem `<MATERIA>/AULAS/STATUS-AULAS.md`, com uma linha por
  aula e uma coluna por peça (`⬜ Pendente`, `🔄 Em progresso`, `✅ Concluído`,
  `⛔ Não se aplica`). Atualizar o arquivo **ao concluir cada aula** (e marcar 🔄 ao começar).
  Se o arquivo não existir, criá-lo antes de gerar a primeira aula.
- ✅ Ao retomar um trabalho interrompido, ler o `STATUS-AULAS.md` e continuar da primeira aula que
  não está ✅.
- ✅ Aplicar o seed no Supabase continua dependendo de pedido do usuário (registrar no status).
- ⚠️ Respeita `STATUS-PERMISSAO-EMENTA`, matérias semelhantes e a exceção de
  `QUALIFICACAO-PROFISSIONAL/`.

## 📝 REGRA CRÍTICA — 1 ATIVIDADE OBJETIVA DE 50 QUESTÕES POR AULA + `ATIVIDADES/STATUS-ATIVIDADES.md`

⚠️ **Toda aula de toda matéria deve ter 1 atividade objetiva de 50 questões** (múltipla escolha
A–D), e **cada pasta `ATIVIDADES/` de matéria tem o arquivo `STATUS-ATIVIDADES.md`** com o controle
dessas atividades. Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Atividade objetiva da aula** = `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` (nomes antigos
  já publicados, como `ATIVIDADES-N-TEMA-50-QUESTOES.html` ou com data, continuam valendo), com
  **exatamente 50 questões**, fonte em `ATIVIDADES/CONTEUDO/*-50-QUESTOES.md` (fora do Git, tem
  gabarito), gerada por `assets/gerador-atividades/gerar_atividades.py`, com folha de respostas no
  banco (`- **Folha de respostas:** sim`) e cadastro em `atividade` + `gabarito` (seed).
- ❌ Página com menos de 50 questões **não conta** como a atividade objetiva da aula (fica ⚠️ no
  status até ser completada); práticas, avaliações e atividades de Excel são **adicionais**.
- ✅ **`STATUS-ATIVIDADES.md`**: uma linha por aula (aula, tema, página, nº de questões, fonte,
  banco, status) e a lista das demais atividades da pasta. Atualizar **sempre** que uma atividade
  for criada, alterada, cadastrada no banco ou liberada/bloqueada; criar o arquivo se não existir.
- ✅ Gerar as que faltam seguindo a regra "UMA AULA POR VEZ, COMPLETA" (fonte → HTML → conferência
  de 50 itens e gabarito ausente → índice → seed), atualizando o `STATUS-ATIVIDADES.md` e o
  `AULAS/STATUS-AULAS.md` a cada aula. Gerar em massa continua exigindo plano em `docs/` e aprovação;
  aplicar o seed no Supabase só com pedido do usuário.
- ✅ As questões seguem a aula em `<MATERIA>/CONTEUDO/AULA-NN-*.md` (regra "AULAS EXTRAÍDAS DA
  EMENTA EM `CONTEUDO/`") e o `EMENTA-CHALKIE-AI.md` (a ementa vence); gabarito com letras
  equilibradas (12–13 de cada) e posição sorteada.
- ⚠️ Respeita `STATUS-PERMISSAO-EMENTA` e matérias semelhantes. Em `QUALIFICACAO-PROFISSIONAL/` a
  ementa é só do professor: as atividades usam as aulas/ementa como **leitura**, e matéria sem aulas
  definidas fica aguardando o professor.
- ✅ **Aulas de avaliação** (decisão do usuário, 2026-10-03): a **Aula 15 de Fundamentos de
  Automação/Instrumentação** (avaliação integradora) tem atividade objetiva de **20 questões**;
  as demais aulas de avaliação (ex.: Eletricidade aula 09, Reforço de Linguagens aula 16) seguem
  com **50 questões**.
- ✅ **Banco na geração das pendentes** (plano `docs/gerar-atividades-50-questoes-todas-materias.md`,
  2026-10-03): o usuário autorizou **aplicar o seed no Supabase ao finalizar cada matéria**.
- ⏳ **Fila:** gerar **somente uma matéria por vez, na ordem que o usuário liberar**; as demais
  aguardam. Primeira liberada (2026-10-03): **Testes de Frontend**.

## 🏦 REGRA — BANCO DE QUESTÕES DO AVA SENAI (MOODLE XML)

Registrada em 2026-10-03 a pedido do usuário. Plano: `docs/banco-questoes-ava-senai-moodle-xml.md`.
**Status:** ✅ piloto **Introdução à TIC** gerado (13 atividades, 600 questões), aguardando a
importação no AVA pelo professor; as demais matérias só quando o usuário liberar, **uma por vez**.

- ✅ **Gerador único:** `C:\Python314\python.exe assets\gerador-banco-ava\gerar_banco_ava.py
  <pasta ATIVIDADES>` (`--so=ARQ.md` gera uma fonte só). Fonte = as mesmas
  `ATIVIDADES/CONTEUDO/*QUESTOES.md` das páginas (lidas por `ler_questoes()` do gerador de
  atividades); nada é digitado à mão no XML.
- ✅ **Saída em `ATIVIDADES/BANCO-AVA/`:** um `.xml` por atividade (mesmo nome da fonte) e o
  arquivo único `BANCO-AVA-<PASTA-DA-MATERIA>.xml`. Categorias `top/<uc_curta>/<rótulo> — <tema>`
  (iguais nos dois); questão de resposta única, 1 ponto, sem penalidade, ID
  `<PASTA>-<RÓTULO>-QNN`, tags = capacidades + rótulo; alternativas embaralhadas, exceto quando
  alguma cita as outras ("Todas as anteriores").
- ❌ **O XML contém as respostas certas:** `BANCO-AVA/` fica no `.gitignore`; nunca publicar,
  nunca versionar, nunca colocar link em página de aluno.
- ✅ **Importar no AVA:** Banco de questões → Importar → **Moodle XML**, com **"Obter categoria do
  arquivo"** marcado. Importar **ou** os arquivos por atividade **ou** o arquivo único (os dois
  juntos duplicam as questões).
- ✅ Depois de alterar uma fonte de questões, gerar o banco de novo e registrar no
  `STATUS-ATIVIDADES.md` da matéria.
- ✅ **Botão em cada atividade** (2026-10-03, plano `docs/botao-exportar-banco-moodle-atividade.md`):
  **📥 Banco Moodle (AVA SENAI)** na `.export-bar` de toda página que carrega o `atividade.js`,
  **só para o professor logado** (`app_metadata.perfil`). Lê as questões da própria página e o
  gabarito da tabela `gabarito` (RLS do professor), confere quantidade e letras e baixa
  `<nome-da-pagina>.xml`. Nada é gravado no banco nem no navegador; o gabarito nunca fica na
  página. Código: `assets/js/exportar-banco-moodle.js` (tela, dados) +
  `assets/js/banco-moodle-xml.js` (só monta o XML). ⚠️ O `banco-moodle-xml.js` e o
  `moodle_xml.py` geram **o mesmo XML**: mudou um, mudar o outro e comparar os dois.

## 📘 REGRAS APOSTILAS

Registrada em 2026-10-03 a pedido do usuário (padrões definidos na validação do piloto). Plano:
`docs/gerador-apostilas.md`. **Status:** 🔄 piloto **Introdução à TIC (ITIC)** — só o capítulo 01
gerado, aguardando validação do usuário; os demais capítulos só depois que ele liberar, **um por
vez, perguntando a cada capítulo** (rascunhos em `APOSTILA/RASCUNHOS/`, fora da apostila).

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
  <pasta da matéria>` → `<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.html` (inclui todos os
  `CAPITULO-*.md` de `APOSTILA/CONTEUDO/`). Não montar apostila à mão.
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

- ✅ **1 capítulo = 1 aula de 4 horas.** Cada aula da matéria vira um `CAPITULO-NN.md` em
  `APOSTILA/CONTEUDO/` (lógica mantida).
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
  se capítulos × 4 h = carga da UC. Glossário em ordem alfabética sem considerar acentos.
- ⏳ Gerar o HTML a partir do Markdown completo: pendente (hoje o HTML ainda lê os capítulos).

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
  - **identificação:** `uc`, `uc_curta`, `curso`, `docente`, `modulo`, `modalidade`,
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
   título + duração + canal + link (funciona na tela e no papel). O gerador **recusa** vídeo sem
   duração ou com mais de 15:00. A duração é conferida nos metadados do YouTube (`curl`, sem
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

### Controle e limites

- ❌ **Sem gabarito na apostila** (material do aluno).
- ✅ **Um capítulo por vez, completo** (regra "UMA AULA POR VEZ"), com validação do usuário antes
  do próximo; controle em `<MATERIA>/APOSTILA/STATUS-APOSTILA.md`.
- ✅ A apostila entra no `MENU-ATIVIDADES.js` da matéria (item "📘 Apostila") e recebe o header do
  usuário (`tags_header.py`).
- ⚠️ Respeita `STATUS-PERMISSAO-EMENTA`, matérias semelhantes (só a pasta pedida) e a exceção de
  `QUALIFICACAO-PROFISSIONAL/` (ementa só lida).

## 📊 REGRA — `dashboard.html` EM CADA PASTA DE MATÉRIA

> **STATUS = AGUARDANDO ACERTO DE EMENTA** (registrado em 2026-09-23). A regra ainda **não deve
> ser executada**: o usuário vai corrigir primeiro as ementas (muitas são genéricas ou não
> existem). Só criar ou gerar dashboards quando o usuário liberar. Plano:
> `docs/dashboard-por-materia.md`.

- ✅ Toda pasta de matéria `MATERIAIS/<CURSO>/<MATERIA>/` (exceto `MATERIAS-GERAIS/`) deve ter um
  `dashboard.html`.
- ✅ Modelo: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/dashboard.html`
  (cabeçalho, números, capacidades, um card por aula, progressão e rodapé).
- ✅ Os cards de aula vêm da sequência de aulas do `EMENTA-CHALKIE-AI.md` da matéria (a ementa
  vence). Sem sequência de aulas na ementa, não criar cards: primeiro corrigir a ementa.
- ✅ Cada card aponta para a atividade de 50 questões da aula:
  `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` (botão "📝 50 QUESTÕES") e mantém também o link
  dos slides em PDF, quando existir (botão "📕 Slides (PDF)").
- ✅ Aula sem atividade: criar o arquivo com o nome definitivo, só com a mensagem
  **50 QUESTOES PENDENTES,AGUARDANDO GERACAO...** (nunca sobrescrever uma atividade que já existe).
- ✅ Seguir a regra de `assets/`: sem `<style>`/`<script>` embutidos, CSS compartilhado em
  `assets/css/`.

## 📝 Outras Regras

✅ Tudo conforme `C:\Users\gelva\.claude\CLAUDE.md` (global)  
✅ **Fonte única de regras:** este `CLAUDE.md`. O `AGENTS.md` (Codex e outros agentes) contém apenas a instrução de ler e seguir este arquivo — o conteúdo que existia nele foi mesclado aqui em 2026-09-23. Novas regras devem ser escritas **somente aqui**.  
✅ Grafo: `graphify update .` após cada sessão  
✅ Documentação: `docs/<tarefa>.md` antes de implementar  
✅ Tabelas de resultado ao finalizar tarefas  

---

**Versão:** ver "Versão das regras" e o histórico no topo deste arquivo  
**Status:** ✅ Ativo


## 📚 REGISTRO — VÍNCULOS DE CURSOS POR PROFESSOR (2026-10-03)

- ✅ `33a3ca9`: o índice raiz passou a carregar os cursos do banco (`index.html` e `assets/js/indice-cursos.js`).
- ✅ `abcee07`: especificação aprovada para relacionar cursos e professores por `cursoprofessor`, com menu administrativo `CURSOS` e tela proposta `cursos-professor.html`.
- ✅ `ccb9d3b`: plano detalhado da implementação registrado em `docs/superpowers/plans/2026-10-02-cursoprofessor.md`.
- ✅ O plano recebeu revisão independente; os pontos levantados incluem conferir tabela/permissões existentes, políticas e acesso de leitura a `usuario`, proteger a consulta de funções ausentes e identificar perfil pela sessão Auth (`app_metadata.perfil`).
- ⛔ Substituído em 2026-10-03: o índice filtra pelo curso da turma (`turma.curso_id` + `cursos_do_usuario()`); a `cursoprofessor` não será criada.
- ⛔ Não há conector Supabase/SQL disponível nesta sessão. O usuário recebeu consultas somente de leitura para executar no SQL Editor e fornecer os resultados. Não afirmar que `cursoprofessor` existe no banco remoto antes da aplicação confirmada da migração.
- ✅ Não foram executados testes, navegador ou servidor; essa restrição continua valendo.
- 📄 Registro desta atualização: `docs/registro-vinculos-cursos-professor-2026-10-03.md`.

## PASTAS A SEREM IGNORADAS DENTRO DA PASTA **MATERIAIS**
- ✅ LISTA DE PASTAS A SEREM IGNORADAS, OU SEJA, QUE NAO SAO CURSOS:*AGENDA_COLABORADOR* - Esta pasta tem suas proprias regras e não segue as regras das demais pastas.
