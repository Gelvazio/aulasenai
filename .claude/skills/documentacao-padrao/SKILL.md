---
name: documentacao-padrao
description: Use when starting ANY new task in any project — ensures a docs/ folder exists and every task gets a structured .md file with numbered steps, status tracking (⬜/🔄/✅), code blocks, and verification commands before implementation begins
---

# Documentação Padrão

## Overview

Toda tarefa **grande** deve ser documentada em `docs/` com passos numerados e status rastreável **antes** de iniciar a implementação. O status de cada passo é atualizado conforme o progresso.

> **Exceção — tarefas PEQUENAS (igual ao `AGENTS.md` do projeto, desde 2026-09-30):**
> tarefa pequena = ajuste pontual (até ~3 arquivos) que **não** mexe em banco de dados/segurança/RLS,
> **não** cria estrutura ou gerador novo e **não** faz mudança em massa. Ela **não precisa** de
> `docs/<tarefa>.md` nem de aprovação prévia: executar direto, registrar no `STATUS.md` e fazer o
> commit. **Tarefa grande** (banco, segurança, várias partes, geração em massa, apagar dados)
> continua exigindo o plano em `docs/` e a aprovação.

## Fluxo Obrigatório

```dot
digraph doc_flow {
  "Nova tarefa recebida" [shape=doublecircle];
  "docs/ existe?" [shape=diamond];
  "Solicitar criação de docs/" [shape=box];
  "Criar arquivo .md em docs/" [shape=box];
  "Preencher tabela de status + passos" [shape=box];
  "Executar passos atualizando status" [shape=box];
  "Tarefa concluída" [shape=doublecircle];

  "Nova tarefa recebida" -> "docs/ existe?";
  "docs/ existe?" -> "Solicitar criação de docs/" [label="não"];
  "docs/ existe?" -> "Criar arquivo .md em docs/" [label="sim"];
  "Solicitar criação de docs/" -> "Criar arquivo .md em docs/";
  "Criar arquivo .md em docs/" -> "Preencher tabela de status + passos";
  "Preencher tabela de status + passos" -> "Executar passos atualizando status";
  "Executar passos atualizando status" -> "Tarefa concluída";
}
```

## Regras

1. **Verificar `docs/`** — se não existir, perguntar ao usuário: _"A pasta docs/ não existe. Deseja que eu a crie?"_
2. **Criar arquivo** — nome descritivo em kebab-case: `docs/<nome-da-tarefa>.md`
3. **Tabela de status geral** — no topo do arquivo, com todos os passos e status
4. **Passos detalhados** — cada passo tem status individual, código completo e comando de verificação
5. **Atualizar status** — ao concluir cada passo, mudar o status no arquivo

## Ícones de Status

| Ícone | Significado |
|-------|-------------|
| ⬜ | Pendente |
| 🔄 | Em progresso |
| ✅ | Concluído |

## Modelo do Arquivo

```markdown
# [Nome da Tarefa]

**Objetivo:** [Uma frase descrevendo o que será feito]

**Tech Stack:** [Tecnologias utilizadas]

**Criado em:** [data e hora de criação da tarefa]
**Concluído em:** [data e hora de conclusão da tarefa]
**Tempo decorrido:** [mm:ss desde o início até o fim]

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | [Descrição curta] | ⬜ Pendente | [data e hora de criação da tarefa] | [data e hora de conclusão da tarefa] | [mm:ss] |
| 2 | [Descrição curta] | ⬜ Pendente | [data e hora de criação da tarefa] | [data e hora de conclusão da tarefa] | [mm:ss] |
| N | Commit | ⬜ Pendente | [data e hora de criação da tarefa] | [data e hora de conclusão da tarefa] | [mm:ss] |

---

### Passo 1: [Título do passo]

**Status:** ⬜ Pendente

**Arquivo:** Criar/Modificar `caminho/exato/do/arquivo`

**Ação:** [O que fazer]

\```linguagem
// código completo aqui
\```

**Verificação:**

\```powershell
comando-para-verificar
\```

Esperado: [resultado esperado]

---
```

## Regras dos Passos

- Cada passo = **uma ação** (2-5 minutos)
- **Código completo** — nunca usar "TODO", "implementar depois" ou "similar ao passo X"
- **Comando de verificação** — todo passo tem verificação por leitura, `node --check`, consulta ao banco ou comando de terminal — sem testes automatizados (salvo correção de bug) e sem navegador
- **Caminhos exatos** — sempre incluir o caminho completo do arquivo
- **Último passo** — sempre é o commit

## Red Flags — PARE e Corrija

| Pensamento | Realidade |
|------------|-----------|
| "É tarefa simples, não precisa documentar" | Toda tarefa GRANDE segue o padrão; tarefa pequena segue a exceção do `AGENTS.md` (sem plano, mas com `STATUS.md` e commit). Na dúvida, documente. |
| "Vou documentar depois" | Documentação vem ANTES da implementação. |
| "Só vou colocar os passos sem código" | Código completo é obrigatório em cada passo. |
| "Não precisa de verificação" | Todo passo com código tem verificação. |
| "A pasta docs/ não existe, vou ignorar" | Pergunte ao usuário se quer criar. |
