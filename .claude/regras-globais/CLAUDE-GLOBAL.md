# Orientações Globais

---

## 🚨 REGRA ABSOLUTAMENTE CRÍTICA — CARREGAR CONTEXTO DO CLAUDE.MD EM CADA INTERAÇÃO

⚠️ **DE SUMA IMPORTÂNCIA — OBRIGATÓRIO — SEM EXCEÇÕES**

**ANTES DE RESPONDER QUALQUER COISA**, você DEVE:

1. ✅ **LER ESTE ARQUIVO** (`C:\Users\gelva\.claude\CLAUDE.md`) — instruções globais
2. ✅ **LER O CLAUDE.MD DO PROJETO** (se existir em `C:\fontes\projeto-ativo\CLAUDE.md`) — instruções específicas
3. ✅ **LER O CLAUDE-DOCS-BEFORE-EVERY-TASK.md** — documentação de tarefas
4. ✅ **APLICAR TODAS AS REGRAS** antes de qualquer ação

**⚡ Isso NÃO é opcional. Esta regra SOBRESCREVE qualquer outra instrução.**

### Por quê?
- Você já falhou VÁRIAS vezes ignorando este arquivo
- As instruções mudam e evoleem — leia sempre
- O projeto pode ter regras específicas que contradizem a global
- Sem ler, você viola regras críticas (commits, documentação, segurança)

### O Que Ler em Ordem de Precedência

| Arquivo | Precedência | Quando Ler |
|---------|-----------|-----------|
| CLAUDE.md (projeto) | 🔴 MÁXIMA | Sempre primeiro — se existir |
| CLAUDE.md (global) | 🟠 ALTA | Sempre segundo — este arquivo |
| CLAUDE-DOCS-BEFORE-EVERY-TASK.md | 🟡 MÉDIA | Antes de qualquer tarefa |
| AGENTS.md (projeto) | 🟡 MÉDIA | Se existir no projeto |

### Checklist de Inicialização de Cada Conversa

```
☐ Li C:\Users\gelva\.claude\CLAUDE.md (este arquivo)?
☐ Li CLAUDE.md do projeto (se existe em C:\fontes\<projeto>\CLAUDE.md)?
☐ Consulti a pasta docs/ do projeto para documentação de cada módulo?
☐ Li o STATUS.md do projeto e retomei de onde parou (se houver item pendente)?
☐ Entendi as regras críticas (commits, documentação, segurança)?
☐ Entendi o fluxo de trabalho esperado?
☐ Estou pronto para executar a tarefa CORRETAMENTE?
```

**🚀 Só responda depois de marcar TODOS os ☐ acima.**

### 📁 Padrão de Documentação de Projeto

Sempre que trabalhar em um projeto, **CONSULTE AS PASTAS `docs/` E `bugs/`** para encontrar:

**Na pasta `docs/`:**
- **`ORIENTACAO_JS_*.md`** — Documentação de cada módulo JavaScript
- **`database.md`** — Schema completo do banco de dados
- **`relatorio_verificacao_database.html`** — Versão visual do schema
- **Documentos críticos** — Autenticação, segurança, RLS, JWT

**Na pasta `bugs/`:**
- **`bug-*.md`** — Plano de resolução de cada bug identificado
- Segue mesmo formato: análise, passos numerados, status

**Exemplo: Projeto `aulasenai`**

```
C:\fontes\aulasenai\
├─ docs/
│  ├─ ORIENTACAO_JS_LOGIN.md          ⚠️ Crítico: autenticação
│  ├─ ORIENTACAO_JS_SUPABASE.md       ⚠️ Crítico: RLS + JWT
│  ├─ ORIENTACAO_USUARIO.md           ⚠️ Crítico: auth.users vinculação
│  ├─ ORIENTACAO_JS_AULAS.md          → Leia antes de editar aulas.js
│  ├─ ORIENTACAO_JS_CURSO.md          → Leia antes de editar curso.js
│  ├─ ORIENTACAO_JS_MATERIA.md        → Leia antes de editar materia.js
│  ├─ ORIENTACAO_JS_UNIDADE.md        → Leia antes de editar unidade.js
│  ├─ database.md                     → Schema de referência
│  ├─ relatorio_verificacao_database.html → Versão visual (sincronizar!)
│  └─ VERIFICACAO_DATABASE_YYYY-MM-DD.md → Histórico de mudanças
│
└─ bugs/
   └─ bug-*.md                         → Plano de resolução de bugs
```

**Regra:** Se a documentação existe em `docs/`, você DEVE consultar antes de modificar qualquer arquivo relacionado. Se há um bug identificado, o plano estará em `bugs/`.

---

## 📚 LEITURA OBRIGATÓRIA — CONSULTAR `docs/` ANTES DE MODIFICAR QUALQUER ARQUIVO

⚠️ **DE SUMA IMPORTÂNCIA — VERIFICAR SEMPRE**

**ANTES de modificar qualquer arquivo (especialmente JavaScript)**, você DEVE:

1. ✅ **Verificar se existe documentação** em `docs/ORIENTACAO_<tipo>_<arquivo>.md`
2. ✅ **LER COMPLETAMENTE** a orientação correspondente
3. ✅ **APLICAR TODAS AS REGRAS** documentadas
4. ✅ **Só então modificar** o arquivo

### Padrão de Documentação por Arquivo

```
Se vai modificar → Leia a documentação em:

arquivo.js                          → docs/ORIENTACAO_JS_ARQUIVO.md
index.html                          → docs/ORIENTACAO_INDEX.md
database                            → docs/database.md + docs/relatorio_verificacao_database.html
autenticação/segurança              → docs/ORIENTACAO_USUARIO.md
supabase (queries/headers)          → docs/ORIENTACAO_JS_SUPABASE.md
```

### Exemplo de Arquivo com Documentação

```
Projeto: C:\fontes\aulasenai\
├── js/
│   ├── curso.js                     ← Leia: docs/ORIENTACAO_JS_CURSO.md
│   ├── aulas.js                     ← Leia: docs/ORIENTACAO_JS_AULAS.md
│   ├── materia.js                   ← Leia: docs/ORIENTACAO_JS_MATERIA.md
│   ├── login.js                     ← Leia: docs/ORIENTACAO_USUARIO.md ⚠️ CRÍTICO
│   ├── supabase.js                  ← Leia: docs/ORIENTACAO_JS_SUPABASE.md ⚠️ CRÍTICO (RLS + JWT)
│   └── unidade.js                   ← Leia: docs/ORIENTACAO_JS_UNIDADE.md
│
└── docs/
    ├── ORIENTACAO_JS_CURSO.md       ← Documentação completa de curso.js
    ├── ORIENTACAO_JS_AULAS.md       ← Documentação completa de aulas.js
    ├── ORIENTACAO_JS_MATERIA.md     ← Documentação completa de materia.js
    ├── ORIENTACAO_USUARIO.md        ← ⚠️ OBRIGATÓRIA antes de editar autenticação
    ├── ORIENTACAO_JS_SUPABASE.md    ← ⚠️ OBRIGATÓRIA antes de editar Supabase
    ├── ORIENTACAO_JS_UNIDADE.md     ← Documentação completa de unidade.js
    ├── database.md                  ← Schema do banco de dados
    └── relatorio_verificacao_database.html ← Versão visual do schema
```

### Checklist Antes de Modificar Qualquer Arquivo

```
☐ Identifiquei o arquivo a modificar (ex: aulas.js)
☐ Procurei a documentação correspondente (ex: ORIENTACAO_JS_AULAS.md)
☐ A documentação existe? Se NÃO → avise ao usuário
☐ Li a documentação COMPLETAMENTE
☐ Entendi todas as regras e restrições
☐ Estou pronto para modificar CORRETAMENTE
```

**Sem ler a documentação, você violará regras críticas (RLS, JWT, segurança, etc.)**

---

## ⚠️ REGRA CRÍTICA — DOCUMENTAR EM `docs/` ANTES DE CADA TAREFA

> **Exceção — tarefas PEQUENAS (2026-09-30):** não precisam de `docs/<tarefa>.md` nem de
> aprovação prévia. Tarefa pequena = ajuste pontual (até ~3 arquivos) que **não** mexe em banco de
> dados/segurança/RLS, **não** cria estrutura ou gerador novo e **não** faz mudança em massa. Nesses
> casos, executar direto e fazer o commit da tarefa. **Tarefa grande** (banco, segurança, várias
> partes, geração em massa, apagar dados) continua exigindo o plano em `docs/` e a aprovação.

**LEIA OBRIGATORIAMENTE:** `C:\Users\gelva\.claude\CLAUDE-DOCS-BEFORE-EVERY-TASK.md`

⚡ **RESUMO:** Antes de executar qualquer tarefa, você DEVE:
1. ✅ Criar arquivo em `docs/<tarefa>.md` com plano completo
2. ✅ Mostrar ao usuário com todas as etapas e status
3. ✅ **Perguntar se está correto** — aguardar aprovação explícita
4. ✅ Só então executar após aprovação

**Isso se aplica a todas as tarefas GRANDES** (as pequenas seguem a exceção acima).

---

## 🚨 REGRA CRÍTICA — `STATUS.md` EM TODA TAREFA (RETOMADA APÓS QUEDA DE SESSÃO)

Registrada em 2026-10-03 a pedido do usuário. Vale para **QUALQUER tipo de tarefa** (código,
documentação, apostila, slides, banco, pequena ou grande), em **qualquer projeto**.

**Por quê:** se a sessão cair, ao voltar (ou se **outra IA** retomar) o trabalho deve
**continuar exatamente de onde parou**, sem refazer nem pular nada.

### Obrigatório

1. ✅ Toda tarefa tem registro em **`STATUS.md` na raiz do projeto** (criar se não existir).
2. ✅ O trabalho é dividido em **etapas** (`## Etapa N — nome`) e cada etapa em **itens numerados**
   (`N.1`, `N.2`…), numa tabela: `Item | Descrição | Status | Concluído em`.
3. ✅ Status: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `⛔ Bloqueado` (com o motivo).
4. ✅ **Atualizar o `STATUS.md` imediatamente** ao iniciar (🔄) e ao finalizar (✅, com data e hora)
   **cada item** — não acumular para o fim.
5. ✅ Tarefas novas **acrescentam etapas** ao fim do arquivo (nunca apagar o histórico).
6. ✅ No topo, manter links para o plano (`docs/`), as regras (`CLAUDE.md`) e o entregável.
7. ✅ Vale também para tarefas pequenas (dispensadas do plano em `docs/`, **não** do `STATUS.md`).

### Ao iniciar ou retomar uma sessão

1. ✅ **Ler o `STATUS.md`** do projeto **antes** de qualquer ação.
2. ✅ Se houver item `🔄 Em progresso` ou `⬜ Pendente` de tarefa aprovada: **conferir o que já foi
   feito** nos arquivos/commits e **prosseguir de onde parou**.
3. ❌ Não recomeçar do zero, não refazer itens `✅`, não pular itens.

---

## 📋 GESTÃO DE PROJETOS — REGRAS APLICADAS AO `STATUS.md`

Registrada em 2026-10-03 a pedido do usuário. Todo `STATUS.md` segue estas regras e o modelo abaixo.

### Regras

| # | Fase | Regra | Onde fica no `STATUS.md` |
|---|------|-------|--------------------------|
| 1 | Início | **Objetivo claro** — 1 frase: o que será entregue e por quê | Cabeçalho |
| 2 | Início | **Escopo fechado** — o que entra e o que **não** entra | Seção Escopo |
| 3 | Início | **Critério de pronto** — como saber que o item terminou e foi aceito | Seção Escopo |
| 4 | Início | **Partes interessadas** — quem decide, aprova e usa | Cabeçalho |
| 5 | Início | **Premissas e restrições** — prazo, tecnologia, regras | Seção Escopo |
| 6 | Planejamento | **Dividir em etapas e itens pequenos** (horas, não semanas) | Etapas |
| 7 | Planejamento | **Ordem e dependências** — itens na ordem de execução | Etapas |
| 8 | Planejamento | **Riscos com plano B** — e acompanhados até o fim | Seção Riscos |
| 9 | Planejamento | **Plano aprovado antes de executar** | Registro de decisões |
| 10 | Execução | **Status atualizado na hora** (⬜ 🔄 ✅ ⛔) | Etapas |
| 11 | Execução | **Um item por vez** — terminar antes de começar outro | Etapas (só 1 🔄) |
| 12 | Execução | **Bloqueio informado na hora** com motivo e o que destrava | Seção Bloqueios |
| 13 | Execução | **Mudança de escopo = nova aprovação** | Registro de decisões |
| 14 | Execução | **Entregas pequenas e verificadas** — cada item com verificação | Etapas |
| 15 | Comunicação | **Fonte única da verdade** — links para plano, regras e entregável | Cabeçalho |
| 16 | Comunicação | **Registro de decisões** — o quê, quando, quem, por quê | Seção Decisões |
| 17 | Comunicação | **Linguagem simples** — entendível por quem não é técnico | Todo o arquivo |
| 18 | Continuidade | **Não depende de memória** — qualquer pessoa/IA retoma pelo arquivo | Próximo passo |
| 19 | Continuidade | **Versionamento** — commit por item/tarefa concluída | Coluna/nota de commit |
| 20 | Continuidade | **Histórico nunca é apagado** — só se acrescentam etapas | Etapas |
| 21 | Encerramento | **Aceite formal** de quem pediu | Último item da etapa |
| 22 | Encerramento | **Pendências documentadas** — o que ficou para depois e por quê | Seção Pendências |
| 23 | Encerramento | **Lições aprendidas** — o que funcionou, o que não, o que vira regra | Seção Lições |

⭐ **Regra de ouro:** planejar → aprovar → executar 1 item por vez → registrar na hora → entregar.
**O que não está no `STATUS.md` não aconteceu.**

### Modelo obrigatório do `STATUS.md`

```markdown
# STATUS — <Nome do projeto>

**Objetivo:** <1 frase: o que e por quê>
**Partes interessadas:** <quem decide / aprova / usa>
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · <entregável>
**Próximo passo:** <item exato a executar agora — atualizar sempre>

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## Escopo
- **Entra:** …
- **Não entra:** …
- **Critério de pronto:** …
- **Premissas e restrições:** …

## Etapa N — <nome> (aprovada em AAAA-MM-DD)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| N.1 | … | ⬜ Pendente | — | <como foi conferido> |
| N.x | Aceite do usuário | ⬜ Pendente | — | — |

## Riscos
| Risco | Chance | Impacto | Plano B | Situação |
|-------|--------|---------|---------|----------|

## Bloqueios
| Data | Item | Motivo | O que destrava | Resolvido em |
|------|------|--------|----------------|--------------|

## Registro de decisões
| Data | Decisão | Quem | Por quê |
|------|---------|------|---------|

## Pendências (ficou para depois)
| Item | Motivo | Quando retomar |
|------|--------|----------------|

## Lições aprendidas
| Data | O que aconteceu | Lição / nova regra |
|------|-----------------|--------------------|
```

- ✅ Seções sem conteúdo ficam com a tabela vazia (não apagar o cabeçalho).
- ✅ **"Próximo passo"** é a primeira coisa a ler ao retomar e a última a atualizar ao parar.
- ✅ Projetos com `STATUS.md` antigo: **migrar para o modelo** sem apagar o histórico já registrado.

---

## Documentação obrigatória de todas as tarefas

> **Tarefas pequenas ficam de fora** desta obrigação — ver a exceção na regra "DOCUMENTAR EM `docs/`
> ANTES DE CADA TAREFA" logo acima.

Antes de atender qualquer nova solicitação, o Claude deve ler integralmente e aplicar a documentação localizada em:

```text
C:\Users\gelva\.agents\skills\documentacao-padrao\SKILL.md
```

Essa skill é obrigatória em todas as tarefas grandes; as tarefas pequenas ficam de fora (ver a exceção acima e a da regra "DOCUMENTAR EM `docs/`"). O Claude deve seguir o fluxo abaixo:

1. verificar se existe uma pasta `docs/` no projeto afetado;
2. se ela não existir, solicitar autorização ao usuário para criá-la;
3. antes da implementação, criar `docs/<nome-descritivo-em-kebab-case>.md`;
4. registrar objetivo, escopo, tecnologias, arquivos previstos, riscos e dependências;
5. registrar data e hora de criação, conclusão e tempo decorrido;
6. criar passos numerados, detalhados e rastreáveis com os estados `⬜ Pendente`, `🔄 Em progresso`, `✅ Concluído` ou `⛔ Bloqueado/não aplicável`;
7. incluir em cada passo a ação, o caminho exato dos arquivos e a forma de verificação permitida;
8. apresentar ao usuário um resumo do plano, arquivos afetados, riscos e verificações;
9. solicitar confirmação explícita antes de iniciar qualquer implementação ou comando mutável — **exceto** o commit local da tarefa, e a atualização do `STATUS.md`, que são feitos sem perguntar (o push continua proibido no ambiente local);
10. após a confirmação, executar somente o escopo aprovado e atualizar continuamente os estados da tarefa;
11. registrar o resultado final, pendências e commit quando o projeto for versionado.

A criação inicial da tarefa em `docs/` faz parte do planejamento e ocorre antes da confirmação. Se o escopo mudar materialmente, atualizar a tarefa e pedir nova confirmação.

Se o arquivo da skill estiver temporariamente indisponível, o Claude deve informar o bloqueio e aplicar, no mínimo, todas as regras reproduzidas nesta seção. Ao trabalhar em um projeto que possua `AGENTS.md` ou `CLAUDE.md` local, esses arquivos também devem ser lidos e respeitados, observando as instruções de maior precedência.

## 🏁 FINAL DE TAREFA — SÓ A FRASE DE FINALIZAÇÃO

⚠️ **Vale a regra "Finalizacao de tarefas" (fim deste arquivo):** ao concluir uma tarefa, responder
**APENAS** com **TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?** — **sem tabela de resultados, sem resumo
e sem texto extra.** A antiga regra "Resultados finais em formato de tabela" foi **substituída** em
2026-09-30 (era contraditória com esta). Perguntas do usuário e relatos de bloqueio/erro continuam
sendo respondidos normalmente; a frase é só para o encerramento de uma tarefa concluída.
✅ **Exceção (2026-10-08):** quando o `CLAUDE.md` do projeto pedir, logo abaixo da frase vem a
pergunta **"Deseja atualizar o log da sessão atual?"** — isso não conta como texto extra.

---

## 📊 PADRÃO OBRIGATÓRIO DE INFOGRÁFICOS

⚠️ **CRÍTICO:** Toda solicitação de infográfico DEVE cumprir estes requisitos mínimos. Não fazer = recusa.

### ✅ Elementos Obrigatórios

1. **Cabeçalho Visual:**
   - Título principal em branco (GRANDE, legível)
   - Subtítulo em dourado/ouro (2-3 palavras-chave ou resumo)
   - Ícone representativo (tema do infográfico)
   - Star/destaque visual (canto superior)

2. **Estrutura de Conteúdo:**
   - Mínimo 6 seções numeradas (sequencial: 1, 2, 3, etc.)
   - Cada seção tem cor DIFERENTE (paleta diversa)
   - Cada seção tem ícone representativo
   - Hierarquia clara: começo → desenvolvimento → fim

3. **Design Visual:**
   - Fundo escuro (azul, cinza ou preto) para contraste
   - Texto branco/claro em fundo escuro
   - Cores vibrantes para sections (azul, laranja, verde, vermelho, amarelo, roxo, rosa)
   - Máximo 2-3 tons da mesma cor
   - Sem poluição (espaço em branco é importante)

4. **Elementos Interativos:**
   - Boxes/cards destacados com tips ou alertas
   - Exemplos práticos intercalados (não apenas teoria)
   - Diagramas quando necessário (problema → causa → solução)
   - Checklist ou "regra de ouro" no rodapé
   - Setas/linhas conectando fluxo

5. **Tipografia:**
   - Títulos de seção: GRANDE, BOLD, cor diferente
   - Subtítulos: Médio, destaque
   - Corpo: Legível (sem serifa preferível)
   - Hierarquia clara (título > subtítulo > conteúdo)

6. **Layout:**
   - Grid organizado (colunas/linhas balanceadas)
   - Proporcional (16:9 ou A4 landscape)
   - Alinhamento consistente
   - Espaçamento regular entre elementos

7. **Rodapé/Conclusão:**
   - "Regra de Ouro" ou insight principal destacado
   - Próximos passos ou call-to-action
   - Branding/identificação (opcional mas bem-vindo)

### 🎨 Estrutura Recomendada de Cores por Tema

| Tema | Cor Primária | Cor Secundária | Acentos |
|------|---|---|---|
| **Word/Google Docs** | Azul #0B3D91 | Azul Claro #4285F4 | Branco, Ouro |
| **Excel/Planilhas** | Verde #00B050 | Verde Claro #34A853 | Branco, Laranja |
| **PowerPoint/Slides** | Roxo #1A0033 | Rosa #FF69B4 | Branco, Dourado |

### ❌ O Que NUNCA Fazer

- ❌ Infográfico apenas texto (sem ícones/cores/visual)
- ❌ Menos de 6 seções
- ❌ Cores muito claras em fundo claro
- ❌ Muitas cores diferentes (mais de 5-6)
- ❌ Sem hierarquia visual (tudo igual)
- ❌ Sem exemplos práticos
- ❌ Sem rodapé/conclusão
- ❌ Texto minúsculo ou ilegível

### ✅ Exemplo de Estrutura

```
┌─────────────────────────────────────────┐
│  TÍTULO GRANDE                  ⭐      │
│  Subtítulo em ouro • Resumo     🎨      │
├─────────────────────────────────────────┤
│ ① SEÇÃO 1 (Azul)    │ ② SEÇÃO 2 (Laranja) │
│ [Ícone] Conteúdo    │ [Ícone] Conteúdo    │
├─────────────────────────────────────────┤
│ ③ SEÇÃO 3 (Verde)   │ ④ SEÇÃO 4 (Roxo)    │
│ [Ícone] Conteúdo    │ [Ícone] Conteúdo    │
├─────────────────────────────────────────┤
│ ⭐ REGRA DE OURO / INSIGHT PRINCIPAL     │
│ Conclusão destacada em ouro/destaque    │
└─────────────────────────────────────────┘
```

---

## 🧱 PRINCÍPIOS SOLID — OBRIGATÓRIO AO GERAR CÓDIGO

⚠️ **CRÍTICO:** Todo arquivo de programação criado ou modificado (**JavaScript, Python, HTML, CSS** e demais linguagens) DEVE aplicar os princípios SOLID, adaptados à natureza de cada tecnologia.

### Os 5 Princípios

| Letra | Princípio | Regra prática |
|-------|-----------|---------------|
| **S** | Single Responsibility | Cada classe/função/módulo/arquivo tem **uma única responsabilidade** |
| **O** | Open/Closed | Estender comportamento **sem modificar** código existente (estratégias, mapas, herança/composição em vez de `if/else` crescente) |
| **L** | Liskov Substitution | Subclasses/implementações devem **substituir a base** sem quebrar o contrato |
| **I** | Interface Segregation | Interfaces/módulos **pequenos e específicos**; não forçar dependência do que não se usa |
| **D** | Dependency Inversion | Depender de **abstrações**; injetar dependências (cliente de banco, API, storage) em vez de instanciar dentro |

### Aplicação por Tecnologia

**JavaScript / Python**
- ✅ Funções curtas e com um único propósito; separar regra de negócio, acesso a dados (repository/service) e UI/DOM
- ✅ Injetar dependências via construtor ou parâmetro (ex.: cliente Supabase, fetch, repositório)
- ✅ Substituir cadeias de `if/switch` por tipo por objetos/mapas de estratégia ou polimorfismo
- ✅ Módulos coesos: um arquivo por responsabilidade (ex.: `aula.service.js`, `aula.repository.js`, `aula.view.js`)
- ✅ Python: usar `abc.ABC`/`Protocol` para abstrações quando houver mais de uma implementação
- ❌ Classes/arquivos "faz-tudo" (validação + banco + DOM + formatação juntos)

**HTML**
- ✅ Estrutura semântica (`header`, `main`, `section`, `article`, `nav`, `footer`) — HTML só cuida de **estrutura/conteúdo**
- ✅ Sem estilos inline e sem JavaScript inline (`onclick`, `style=""`) — responsabilidades separadas
- ✅ Componentes/blocos reutilizáveis e independentes

**CSS**
- ✅ Classes com responsabilidade única (layout ≠ tema ≠ componente ≠ utilitário)
- ✅ Estender via modificadores (ex.: BEM `.card--destaque`) em vez de editar a classe base
- ✅ Variáveis CSS (`:root { --cor-primaria }`) como abstração de tema — componentes dependem de tokens, não de valores fixos
- ❌ Seletores acoplados à estrutura (`div > ul > li > a`) e `!important` desnecessário

### Checklist Antes de Entregar Código

```
☐ Cada função/classe/arquivo tem uma única responsabilidade?
☐ Dá para adicionar um novo caso sem alterar código existente?
☐ Implementações podem ser trocadas sem quebrar quem as usa?
☐ Interfaces/módulos estão enxutos?
☐ Dependências externas são injetadas (não instanciadas no meio da lógica)?
☐ HTML, CSS e JS estão separados em suas responsabilidades?
☐ Nenhum arquivo passa de 1000 linhas?
☐ Nenhuma função passa de 45 linhas (senão, extrair nova função)?
☐ Todas as funções estão documentadas (JSDoc/docstring)?
☐ Validações estão no início, com return early?
☐ Valores fixos estão no arquivo de constantes globais do projeto?
☐ Nomes de variáveis, funções, classes e constantes estão em português (sem acentos)?
☐ Funções têm no máximo 3 parâmetros (senão, objeto)?
☐ Aninhamento tem no máximo 2 níveis?
☐ Condições compostas estão em variáveis booleanas nomeadas?
☐ Sem abreviações, sem ternários aninhados, sem código comentado/morto?
☐ const por padrão, nunca var, async/await em vez de .then()?
☐ Ordem do arquivo respeitada e linhas com até 100 caracteres?
☐ Código formatado conforme Prettier/ESLint ou Black/Ruff?
```

### 📏 Regras Obrigatórias de Código (todas as linguagens)

| Regra | Limite / Exigência |
|-------|--------------------|
| **Tamanho de arquivo** | Nenhum arquivo pode ter **mais de 1000 linhas** — se ultrapassar, dividir em módulos por responsabilidade |
| **Tamanho de função** | Nenhuma função pode ter **mais de 45 linhas** — se ultrapassar, extrair **novas funções** menores |
| **Documentação** | **Todas as funções** devem ser documentadas (JSDoc em JS, docstring em Python): objetivo, parâmetros, retorno e exceções |
| **Return Early** | Sempre usar **retorno antecipado**: validar entradas e condições de erro **no início** da função e sair logo, evitando `if/else` aninhados |
| **Constantes globais** | Valores fixos (URLs, nomes de tabelas, mensagens, limites, chaves de storage, cores) ficam em **arquivo único de constantes do projeto** (ex.: `constants.js`, `constants.py`, `:root` no CSS) — proibido "número/string mágica" espalhada |
| **Nomes em português** | Variáveis, funções, parâmetros, constantes, classes e classes CSS devem ter **nomes em português**, descritivos e **sem acentos/cedilha** (ex.: `calcularMedia`, `nota_minima`, `.cartao-aluno`, `--cor-primaria`) |

**Convenções de nomenclatura em português:**

| Elemento | JavaScript | Python | CSS |
|----------|-----------|--------|-----|
| Variável / parâmetro | `camelCase` → `totalAlunos` | `snake_case` → `total_alunos` | — |
| Função | verbo + `camelCase` → `buscarAulas()` | verbo + `snake_case` → `buscar_aulas()` | — |
| Classe | `PascalCase` → `AulaRepositorio` | `PascalCase` → `AulaRepositorio` | `kebab-case` → `.lista-aulas` |
| Constante | `UPPER_SNAKE` → `LIMITE_ALUNOS` | `UPPER_SNAKE` → `LIMITE_ALUNOS` | `--kebab-case` → `--cor-destaque` |
| Booleano | prefixo `esta`/`tem`/`pode` → `estaAtivo` | `esta_ativo` | — |

⚠️ **Exceções (manter em inglês):** palavras reservadas da linguagem, APIs e bibliotecas (`fetch`, `addEventListener`, `querySelector`), nomes de colunas/tabelas já existentes no banco e padrões consolidados do projeto existente. ❌ Não misturar idiomas no mesmo nome (`getAlunos`, `userNome`).

### 👓 Regras de Legibilidade

| Regra | Exigência |
|-------|-----------|
| **Parâmetros** | Máximo **3 parâmetros** por função — acima disso, receber um **objeto** (`criarAula({ titulo, data, turma })`) |
| **Aninhamento** | Máximo **2 níveis** de `if`/`for`/`while` — acima disso, usar return early ou extrair função |
| **Condições nomeadas** | Condições compostas viram **variável booleana com nome** (`const podeInscrever = idade >= 16 && matriculado;`) |
| **Sem abreviações** | `quantidade` e não `qtd`, `usuario` e não `usr` — exceção: contadores de loop (`i`, `j`) |
| **Sem ternário aninhado** | Proibido `a ? b : c ? d : e` — usar `if` com return early ou mapa de valores |
| **Comentários** | Explicar o **porquê**, não o **o quê**; proibido código comentado ou código morto (o Git guarda o histórico) |
| **Imutabilidade** | `const` por padrão, `let` só se reatribuir, **nunca `var`**; preferir funções puras, sem efeitos colaterais ocultos |
| **Assíncrono** | Usar `async/await` em vez de `.then()` encadeado; tratar erros com `try/catch` de forma consistente |
| **Ordem no arquivo** | Imports → constantes locais → funções auxiliares → funções principais → inicialização/export; blocos lógicos separados por linha em branco |
| **Largura de linha** | Máximo **100 caracteres** por linha |
| **Formatador e linter** | JS/HTML/CSS: **Prettier + ESLint**; Python: **Black + Ruff** — seguir a configuração do projeto quando existir |

**Exemplo — antes e depois:**
```js
// ❌ Difícil de ler
function proc(a, d, t, s, p) {
  if (a) {
    if (a.m && !a.b) {
      return a.n >= 7 ? 'Aprovado' : a.n >= 5 ? 'Recuperacao' : 'Reprovado';
    }
  }
}

// ✅ Legível
/**
 * Retorna a situação do aluno conforme a nota final.
 * @param {{matriculado: boolean, bloqueado: boolean, nota: number}} aluno - Aluno avaliado.
 * @returns {string|null} Situação do aluno ou null se não puder ser avaliado.
 */
function obterSituacao(aluno) {
  if (!aluno) return null;

  const podeSerAvaliado = aluno.matriculado && !aluno.bloqueado;
  if (!podeSerAvaliado) return null;

  if (aluno.nota >= NOTA_MINIMA_APROVACAO) return SITUACAO_APROVADO;
  if (aluno.nota >= NOTA_MINIMA_RECUPERACAO) return SITUACAO_RECUPERACAO;
  return SITUACAO_REPROVADO;
}
```

**Exemplo JavaScript:**
```js
// constants.js
export const NOTA_MINIMA_APROVACAO = 7;
export const MSG_ALUNO_INVALIDO = 'Aluno inválido';

/**
 * Verifica se o aluno foi aprovado pela média das notas.
 * @param {{nome: string, notas: number[]}} aluno - Aluno a avaliar.
 * @returns {boolean} true se a média for maior ou igual à nota mínima.
 * @throws {Error} Se o aluno ou as notas forem inválidos.
 */
function estaAprovado(aluno) {
  if (!aluno) throw new Error(MSG_ALUNO_INVALIDO);
  if (!aluno.notas?.length) return false;

  return calcularMedia(aluno.notas) >= NOTA_MINIMA_APROVACAO;
}
```

**Exemplo Python:**
```python
# constants.py
NOTA_MINIMA_APROVACAO = 7

def esta_aprovado(notas: list[float]) -> bool:
    """Verifica se a média das notas atinge a nota mínima de aprovação.

    Args:
        notas: Lista de notas do aluno.

    Returns:
        True se aprovado, False caso contrário ou se não houver notas.
    """
    if not notas:
        return False

    return sum(notas) / len(notas) >= NOTA_MINIMA_APROVACAO
```

⚠️ **Equilíbrio:** aplique SOLID de forma **pragmática** — sem criar abstrações desnecessárias em scripts pequenos ou arquivos triviais (evitar over-engineering). Em código existente, siga o padrão do projeto e aplique SOLID nas partes criadas ou alteradas.

---

## 📘 APOSTILAS E DADOS DA EMENTA (`materia.json`, arquivo único da matéria)

Registrada em 2026-10-03 a pedido do usuário. Detalhes completos na seção **"REGRAS APOSTILAS"**
do `CLAUDE.md` do projeto (ex.: `C:\fontes\aulasenai\CLAUDE.md`).

- ✅ **Antes de gerar apostila ou atividades de uma matéria, ler a ementa** da matéria e a da UC
  no curso (a ementa do curso vence).
- ✅ **Cada matéria tem UM arquivo de dados: `<MATERIA>/materia.json`** (substitui os antigos
  `atividades.json` e `apostila.json`, que não existem mais). Ele sempre contém as capacidades
  (básicas e socioemocionais) e os conhecimentos (domínios e conteúdos) da ementa, sem dados
  repetidos em outro JSON; todos os geradores leem dele (`assets/gerador-materia/materia.py`).
- ✅ O `materia.json` também traz o **plano de aulas — 1 aula de 4 horas = 1 capítulo**
  (tema, domínios, capacidades, conteúdos oficiais × detalhamento didático, indicadores,
  situação-problema, atividade, estratégias).
- ✅ **Apostila:** capítulos em Markdown → **Markdown completo** da apostila em
  `<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md` (o usuário compara e acrescenta dados) → só no final o
  HTML, gerado a partir dele. Mínimo de **5 exercícios por capítulo**; um capítulo por vez, com
  validação do usuário.
- ❌ Nunca misturar no JSON conteúdo, bibliografia ou capacidade de outra UC.
- ✅ **Identificação da apostila (2026-10-07):** toda apostila mostra **autor, versão, data e hora**
  (capa e rodapé do HTML/PDF e cabeçalho do Markdown completo). Autor e versão no `materia.json`
  (`autor_apostila`, `versao_apostila`); data e hora = geração do HTML. Ao mudar o conteúdo,
  aumentar a versão (ajuste 1.0 → 1.1; mudança grande → 2.0). Autor padrão: **Gelvazio Camargo**.
- ✅ **Paginação no PDF (2026-10-08, todas as apostilas):** ao exportar em PDF, toda folha mostra
  no rodapé **"Página N de T"** (apostila completa = numeração da apostila; exportação parcial,
  ex.: só os exercícios, = numeração das folhas exportadas: "Página 1 de 2"). No projeto
  `aulasenai`: `assets/js/apostila.js` (`numerarPaginas`, `numerarPaginasExportadas`).
- ✅ **PDF sem a faixa azul da esquerda (2026-10-08, todas as apostilas):** a faixa vertical do
  tema aparece só na tela; na impressão/PDF ela não sai (`@media print` em
  `assets/css/apostila.css`), mantendo as mesmas margens para a paginação não mudar.

---

## 📝 ATIVIDADES — SEM EMPRESA FICTÍCIA: "VOCÊ COMO ALUNO CONSULTOR"

Registrada em 2026-10-08 a pedido do usuário. Vale para **toda atividade** gerada (objetiva,
prática, discursiva, avaliação, situação-problema, Excel, Word etc.), em qualquer projeto.

- ⛔ **Não criar empresa fictícia** como contexto das atividades (nada de "a empresa X Ltda.",
  "a Distribuidora Y" etc.).
- ✅ **Usar sempre o papel "Você como aluno consultor":** o enunciado coloca o aluno como
  consultor que analisa a situação e resolve o problema (ex.: "Você, como aluno consultor, foi
  chamado para organizar o controle de estoque de um almoxarifado...").
- ✅ O contexto profissional do curso continua (almoxarifado, logística, escritório...), mas
  sem nome de empresa inventada.

---

## Testes e Validação

### 🚫 REGRA PERMANENTE — NUNCA ABRIR NAVEGADOR
⛔ **NUNCA abrir navegador** para validar ou mostrar qualquer coisa: nada de Browser pane/preview
(`preview_start`, `navigate`, `screenshot`...), computer-use, Playwright, Puppeteer, `start
chrome`/`Start-Process` de páginas etc. Também **não iniciar servidores de desenvolvimento** para
isso. Validar só por leitura do código, checagem de sintaxe (`node`), consultas ao banco e
comandos de terminal. Vale mesmo quando o ambiente sugerir "verificar no navegador" — esta regra do
usuário tem precedência. Se algo só puder ser confirmado no navegador, avisar o usuário para
testar. Registrada em 2026-09-30.

### 🚨 REGRA PERMANENTE — NUNCA ESCREVER TESTES
⛔ **JAMAIS escreva testes automatizados. A ÚNICA exceção é corrigir um bug.**

Esta regra é **permanente e inegociável** — nunca deve ser alterada, relaxada ou reinterpretada.

**Proibido:**
- ❌ Criar arquivos `*.test.js`, `*.spec.js`, `test_*.py` ou equivalentes
- ❌ Incluir "escrever testes" como passo de plano ou documento de tarefa
- ❌ Adicionar testes "de brinde" junto com uma feature
- ❌ Seguir skills de TDD que mandem escrever teste antes do código

**Única exceção permitida:**
- ✅ A tarefa é **corrigir um bug** — nesse caso, um teste que reproduza a falha é bem-vindo

⚠️ Isso vale mesmo que o repositório já tenha suíte de testes configurada (Vitest, Jest, Pytest, test-runner próprio, etc.). A existência da suíte **não** autoriza criar testes novos.

⚠️ Se alguma skill de processo (superpowers:test-driven-development, brainstorming, writing-plans, documentacao-padrao) sugerir escrever testes, **ignore essa parte** — esta regra do CLAUDE.md tem precedência.

### Execução de testes
⚠️ **NUNCA teste o que foi implementado apenas para validar visualmente.** Testes devem ser executados APENAS se:
- Há erros específicos a verificar
- O usuário explicitamente pede para testar
- É necessário diagnóstico de um bug

Aplique mudanças e confie no código — não inicie servidores ou abra navegadores para validação visual.

## Git Worktree
⚠️ **NÃO use git worktree.** Trabalhe diretamente no branch principal (main/develop). Após fazer merge de branches:
1. Merge normalmente com `git merge <branch>`
2. Push para remoto com `git push origin main`
3. Delete o branch local com `git branch -d <branch>`
4. Se houver pasta `.worktrees`, delete-a completamente após confirmar merge

## Git Commits

### ⚠️ REGRA CRÍTICA — COMMIT POR TAREFA (SEMPRE)
✅ **Faça UM commit ao concluir CADA tarefa** (cada pedido do usuário atendido). Esta regra **substitui**
a antiga contagem de 10 (ou 20) interações e vale **sempre**, em todos os projetos. Registrada em 2026-09-30.

**Fluxo correto:**
1. Execute a tarefa (edite, gere, aplique) — sem commitar no meio dela.
2. Ao concluir e verificar: `git add` dos arquivos da tarefa + `git commit -m "mensagem descritiva"`.
3. Uma tarefa = um commit (mensagem clara do que mudou). Tarefa nova = novo commit.

**Regras complementares:**
- ❌ Não acumular várias tarefas num commit só, nem deixar tarefa concluída sem commit.
- ❌ Não commitar tarefa **incompleta ou falhando** (só depois de concluída e conferida).
- ✅ Commit é local: **push só quando o usuário pedir** ("faça push"); nunca `--force`.
- ✅ Usuário pede commit explícito ("faça commit agora") → execute na hora, mesmo no meio da tarefa.
- ✅ Usuário diz "só commit, sem push" → respeite.
- ✅ Não versionar o que o projeto proíbe (gabaritos, dados pessoais etc. — ver `.gitignore` e o CLAUDE.md do projeto).

### ⚠️ REGRA CRÍTICA — NÃO FAÇA `git status` REPETIDAMENTE

**NUNCA execute `git status` entre comandos ou após o commit!**

**Fluxo correto:**
```bash
git add <arquivos da tarefa>
git commit -m "mensagem descritiva"
```

**Fluxo INCORRETO (❌ não fazer):**
```bash
git status              # ❌ Desnecessário
git add <arquivos da tarefa>
git status              # ❌ Desnecessário — você já sabe o que vai ser staged
git commit -m "msg"
git status              # ❌ Desnecessário — o commit já foi feito
```

**Por quê?** Git avisa sobre erros automaticamente. Confie nos comandos — eles retornam feedback claro.

### Fluxo correto de commit

1. ✅ Edite e altere arquivos conforme solicitado (Edit/Write validam automaticamente)
2. ✅ `git add <arquivos da tarefa>` — adicionar **só os arquivos alterados pela tarefa**, pelo caminho.
   ❌ **Nunca `git add .`** (arrasta `__pycache__`, gabaritos, listas de alunos e outros arquivos
   que não podem ser publicados). Conferir `git diff --cached --name-only` antes do commit.
3. ✅ `git commit -m "mensagem descritiva"` — Fazer commit com Co-Authored-By
4. ❌ **FIM** — Não fazer `git status` depois


⚠️ **NUNCA perguntar se deve commitar — sempre executar o commit diretamente, sem confirmar.**

### 🚨 REGRA CRÍTICA — Execução de Comandos Git
⚠️ **NUNCA PERGUNTE PARA EXECUTAR COMANDOS DE GIT — SEMPRE EXECUTE SEM PERGUNTAR**

Esta é uma regra absoluta:
- Não liste opções e aguarde resposta
- Não diga "devo executar o git?"
- Não pergunte "está pronto para commitar?"
- **SIMPLESMENTE EXECUTE O COMANDO DIRETAMENTE**

Exemplos de o que NÃO fazer:
- ❌ "Devo fazer commit agora?"
- ❌ "Quer que eu faça push para origin?"
- ❌ "Posso executar git add?"

Exemplos do que FAZER:
- ✅ Executar `git add <arquivos da tarefa>` diretamente (nunca `git add .`)
- ✅ Executar `git commit -m "mensagem"` diretamente
- ✅ Conferir `git diff --cached --name-only` antes do commit e já fazer o commit (sem `git status`)

⚠️ **NUNCA faça push automático — deixe que o usuário faça push manualmente quando desejar.**
✅ **Ao finalizar qualquer tarefa, faça o commit dela** (regra "COMMIT POR TAREFA" acima): `git add` dos arquivos alterados pela tarefa e `git commit`, sem `git status` repetido.

---

# graphify
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.

## Python para graphify
- **Caminho do Python:** `C:\Python314\python.exe`
- Usar sempre este Python para executar scripts do graphify.

## Rodar o graphify só quando o usuário pedir (2026-10-09)
⛔ Não rodar `graphify update .` automaticamente (nem no início da conversa, nem depois de commits) e não ler o `GRAPH_REPORT.md` antes de responder. O graphify só roda quando o usuário pedir (ex.: `/graphify`).

# Finalizacao de tarefas
Ao finalizar qualquer tarefa, responda APENAS com a frase: **TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?**
Nao adicione resumos, explicacoes ou qualquer outro texto apos concluir uma tarefa.
Exceção (2026-10-08): quando o `CLAUDE.md` do projeto pedir, logo abaixo da frase vem a pergunta
**"Deseja atualizar o log da sessão atual?"** (ex.: projeto `aulasenai`).

# Faixa de matérias: botões SOMENTE ENSALADO e VER TODAS MATÉRIAS (2026-10-08 23:42:02)
Registrada a pedido do usuário. Vale para qualquer faixa "Matérias — <CURSO>" de índice de curso.
- Ao lado do título "Matérias — <CURSO>" da faixa, dois botões: **SOMENTE ENSALADO** (mostra só as
  matérias com `ensalado = true`) e **VER TODAS MATÉRIAS** (volta à lista completa).
- **A faixa sempre abre em SOMENTE ENSALADO** (2026-10-08); sem matéria ensalada mostra todas.
- O botão do filtro em uso fica em fundo verde piscando levemente; no índice do curso a grade de
  matérias de baixo segue o mesmo filtro (2026-10-08).
- Cada matéria da faixa tem um botão **ON/OFF** ao lado do nome, ali mesmo, para marcar/desmarcar
  `ensalado`; a mudança grava no banco (coluna `materia.ensalado`, boolean, ENSALADO = 1 ou 0).
- O ON/OFF aparece e grava só para o perfil PROFESSOR (RLS); o aluno só vê o filtro.
- Não criar coluna nova para isso: `ensalado` já existe em `materia` (ver `docs/database.md`).
