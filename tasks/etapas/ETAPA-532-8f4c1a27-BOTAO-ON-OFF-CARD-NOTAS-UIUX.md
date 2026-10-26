# ETAPA 532 — Botão ON/OFF no card "Notas e média": mostra ou esconde o card aos alunos (Fundamentos de UI / UX)

- **TASK:** #383 (pedida em 2026-10-26)
- **Nível/Modelo:** de cada subtarefa = a classificar pelo Jev (regra C52). Neste projeto nunca Opus.
- **Tipo:** tarefa grande (banco + tela): precisa de plano e do "sim" do usuário antes de executar.

## Pedido

Em `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/index.html`, o card "Notas e média" deve ter um botão ON/OFF ao lado que mostra ou esconde o card aos alunos. Inicial: escondido para todos. Esta tarefa faz só esta matéria; a #384 faz as demais.

## Objetivo

O professor decide quando o card "Notas e média" aparece para os alunos; enquanto estiver OFF, nenhum aluno o vê.

## Decisões em aberto

- **Decidido em 2026-10-26 pelo usuário:** a visibilidade vale por matéria e turma. Sem linha no banco = escondido.

## Subtarefas

### 383.1 — Registrar o escopo: visibilidade por matéria e turma, sem linha = escondido (decisão a confirmar com o usuário)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Registrar o escopo: visibilidade por matéria e turma, sem linha = escondido (decisão a confirmar com o usuário).
- **Depende de:** —.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.2 — SQL: tabela `card_notas_visivel` (matéria × turma, padrão escondido) com RLS e JWT, idempotente

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** SQL: tabela `card_notas_visivel` (matéria × turma, padrão escondido) com RLS e JWT, idempotente.
- **Depende de:** 383.1.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.3 — Aplicar o SQL no Supabase e conferir as políticas (só Claude Code local)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Aplicar o SQL no Supabase e conferir as políticas (só Claude Code local).
- **Depende de:** 383.2.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.4 — Repositório do card: ler e gravar a visibilidade

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Repositório do card: ler e gravar a visibilidade.
- **Depende de:** 383.3.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.5 — Visão do professor: botão ON/OFF ao lado do título do card, que abre em OFF

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Visão do professor: botão ON/OFF ao lado do título do card, que abre em OFF.
- **Depende de:** 383.4.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.6 — Visão do aluno: card escondido enquanto OFF, sem carregar as notas

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Visão do aluno: card escondido enquanto OFF, sem carregar as notas.
- **Depende de:** 383.4.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.7 — CSS do interruptor, no estilo dos outros ON/OFF do card

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** CSS do interruptor, no estilo dos outros ON/OFF do card.
- **Depende de:** 383.5.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.8 — Documentação: `docs/database.md`, relatório HTML, `.claude/rules/atividades-banco.md` e histórico

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Documentação: `docs/database.md`, relatório HTML, `.claude/rules/atividades-banco.md` e histórico.
- **Depende de:** 383.3.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 383.9 — Verificação: `node --check`, leitura do código e consulta das políticas; avisar o usuário para testar na tela

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Verificação: `node --check`, leitura do código e consulta das políticas; avisar o usuário para testar na tela.
- **Depende de:** 383.6, 383.7, 383.8.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

## Entrega (2026-10-26)

- SQL `database/2026-10-26-card-notas-visivel.sql` aplicado (RLS ligado, 3 políticas, `anon` sem acesso, sem delete, 0 linhas = tudo escondido).
- `assets/js/card-notas-visibilidade.js` (novo, carregado antes de `card-notas-media.js` por `atividades-crud-modal.js`), ajustes em `card-notas-media.js` (cabeçalho com o botão; aluno e visitante sem login ficam com o card escondido) e CSS. Documentação em `docs/database.md`, relatório HTML, `atividades-banco.md` e histórico.
- Verificação: `node --check` nos 3 JS e consulta das políticas. **Não testado na tela.** Como o card é carregado globalmente, a #384 deve confirmar as demais matérias.
