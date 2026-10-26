# ETAPA 533 — Botão ON/OFF do card "Notas e média" em todas as demais matérias

- **TASK:** #384 (pedida em 2026-10-26)
- **Nível/Modelo:** de cada subtarefa = a classificar pelo Jev (regra C52). Neste projeto nunca Opus.
- **Tipo:** tarefa grande (banco + tela): precisa de plano e do "sim" do usuário antes de executar.

## Pedido

Depois da #383, aplicar o botão ON/OFF (mostra/esconde o card aos alunos, inicial escondido) em todas as demais matérias.

## Objetivo

Todas as matérias com o card "Notas e média" têm o mesmo botão ON/OFF, abrindo escondido para os alunos.

## Decisões em aberto

- Escopo da visibilidade: por matéria e turma (proposta) ou só por matéria. Sem linha no banco = escondido.

## Subtarefas

### 384.1 — Inventário: matérias cujo índice de atividades mostra o card "Notas e média"

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Inventário: matérias cujo índice de atividades mostra o card "Notas e média".
- **Depende de:** 383.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 384.2 — Conferir se o carregamento do card e do botão é global (um só código) ou por página

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Conferir se o carregamento do card e do botão é global (um só código) ou por página.
- **Depende de:** 384.1.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 384.3 — Ajustar o gerador de índices, se o card for inserido por ele, sem editar página à mão

- **Nível:** MEDIO — classificado (jev (confiança 0.82))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.82)
- **Descrição:** Ajustar o gerador de índices, se o card for inserido por ele, sem editar página à mão.
- **Depende de:** 384.2.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 384.4 — Regravar os índices das matérias com o card (versão do remoto em conflito)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Regravar os índices das matérias com o card (versão do remoto em conflito).
- **Depende de:** 384.3.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 384.5 — Conferir o RLS para as turmas de cada matéria (professor liga só a turma que vê)

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Conferir o RLS para as turmas de cada matéria (professor liga só a turma que vê).
- **Depende de:** 384.1.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 384.6 — Documentação final e histórico de regras

- **Nível:** LEVE — classificado (jev (confiança 0.94))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.94)
- **Descrição:** Documentação final e histórico de regras.
- **Depende de:** 384.4.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.

### 384.7 — Verificação geral por matéria: leitura do código, consulta das políticas e aviso para o usuário testar na tela

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Verificação geral por matéria: leitura do código, consulta das políticas e aviso para o usuário testar na tela.
- **Depende de:** 384.4, 384.5, 384.6.

**Próximo passo:** executar depois do plano aprovado e de classificado pelo Jev.
