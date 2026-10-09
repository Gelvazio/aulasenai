# 📚 Regras do projeto — Ementas, cursos e aulas da matéria

> Parte das regras do projeto aulasenai. **Vale como se estivesse no `CLAUDE.md`** (índice e regras de sempre no [`CLAUDE.md`](../../CLAUDE.md)). Ao alterar este arquivo, atualizar a **Versão das regras** e o histórico no `CLAUDE.md`.

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
- [ ] **CAPACIDADES MENSURÁVEIS:** as capacidades da UC na ementa do curso (que vence; "10+" é só referência)
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
- ✅ Capacidades mensuráveis da UC (as da ementa do curso) com indicadores
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
<MATERIA>/
├─ EMENTA-CHALKIE-AI.md            (na raiz da matéria — versão IA, detalhada) ⭐
└─ DOCUMENTACAO/
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
- [ ] Capacidades da UC (as da ementa do curso) com indicadores
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
# Windows, Linux ou Mac (conta caracteres: acento = 1; quebra de linha = 1)
C:\Python314\python.exe -c "import sys;print(len(open(sys.argv[1],encoding='utf-8').read()))" EMENTA-CHALKIE-AI.md
# Não usar wc -c (conta bytes: acento = 2) nem Get-Content sem -Raw (conta linhas)
```

**Se estiver fora do intervalo:**
1. ✅ Se < 14.800: Adicione seções ou exemplos práticos
2. ✅ Se > 14.950: Remova redundâncias ou examples menos críticos
3. ✅ Valore conteúdo sobre volume — não adicione texto vazio

**Exemplo:** `MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/EMENTA-CHALKIE-AI.md`
- Exemplo de **estrutura** (o tamanho real muda com as edições: medir sempre com o comando acima).

---

## 🎓 REGRA CRÍTICA — ATUALIZAR STATUS-EMENTAS AO MODIFICAR EMENTAS

⚠️ **SEMPRE que modificar o EMENTA-CHALKIE-AI.md de qualquer matéria, DEVE atualizar:**
- 📄 `MATERIAIS/<CURSO>/<MATERIA>/STATUS-EMENTAS.md` (status da matéria, quando a matéria tiver)
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
- `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-ementas.py` — atualiza o STATUS-EMENTAS.md **só das matérias de Rio do Sul**; nos outros cursos, atualizar o `STATUS-EMENTAS.md` da matéria à mão
- `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-cursos.py` — atualiza o STATUS-EMENTAS-CURSOS.md (todos os cursos)

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
