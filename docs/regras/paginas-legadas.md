# 📚 Regras do projeto — Páginas e registros antigos (legado)

> Parte das regras do projeto aulasenai. **Vale como se estivesse no `CLAUDE.md`** (índice e regras de sempre no [`CLAUDE.md`](../../CLAUDE.md)). Ao alterar este arquivo, atualizar a **Versão das regras** e o histórico no `CLAUDE.md`.

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

## 📚 REGISTRO — VÍNCULOS DE CURSOS POR PROFESSOR (2026-10-03)

- ✅ `33a3ca9`: o índice raiz passou a carregar os cursos do banco (`index.html` e `assets/js/indice-cursos.js`).
- ✅ `abcee07`: especificação aprovada para relacionar cursos e professores por `cursoprofessor`, com menu administrativo `CURSOS` e tela proposta `cursos-professor.html`.
- ✅ `ccb9d3b`: plano detalhado da implementação registrado em `docs/superpowers/plans/2026-10-02-cursoprofessor.md`.
- ✅ O plano recebeu revisão independente; os pontos levantados incluem conferir tabela/permissões existentes, políticas e acesso de leitura a `usuario`, proteger a consulta de funções ausentes e identificar perfil pela sessão Auth (`app_metadata.perfil`).
- ⛔ Substituído em 2026-10-03: o índice filtra pelo curso da turma (`turma.curso_id` + `cursos_do_usuario()`); a `cursoprofessor` não será criada.
- ⛔ Não há conector Supabase/SQL disponível nesta sessão. O usuário recebeu consultas somente de leitura para executar no SQL Editor e fornecer os resultados. Não afirmar que `cursoprofessor` existe no banco remoto antes da aplicação confirmada da migração.
- ✅ Não foram executados testes, navegador ou servidor; essa restrição continua valendo.
- 📄 Registro desta atualização: `docs/registro-vinculos-cursos-professor-2026-10-03.md`.
