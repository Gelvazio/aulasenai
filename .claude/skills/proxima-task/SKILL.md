---
name: proxima-task
description: Mostra a próxima tarefa a fazer de cada frente de trabalho ativa. Use quando você quer saber qual é o próximo passo da sessão atual ou de outra frente. Lê o tasks/STATUS.md do projeto (frentes ativas, não encerradas) e o próximo passo na etapa de cada frente, tentando detectar qual é a frente atual pela branch em uso.
---

# Próxima Tarefa (proxima-task)

## O que faz

Lê o arquivo `tasks/STATUS.md` do projeto e a etapa de cada frente (`tasks/etapas/`) e mostra:
- **Todas as frentes de trabalho ativas** (status 🔄 ou 👀, não encerradas)
- O **próximo passo** de cada uma
- Qual é a **frente atual** (detectada pela branch de trabalho, se possível)
- Status da frente (🔄 Ativa, 👀 Aguardando o usuário)

## Como usar

```
/proxima-task
```

Ou em uma pergunta:
- "Qual é a próxima tarefa?"
- "Qual é o próximo passo?"
- "Quais são as tarefas pendentes?"

## Processo

1. ✅ Localizar o arquivo `tasks/STATUS.md` na raiz do repositório do projeto
2. ✅ Extrair a tabela "🧭 Frentes de trabalho"
3. ✅ Filtrar apenas as frentes ativas (status `🔄 Ativa` ou `👀 Aguardando o usuário`)
4. ✅ Para cada frente, extrair:
   - Nome da frente (ambiente · branch)
   - Tarefa/etapa atual
   - Próximo passo: abrir a etapa do link da coluna "Tarefa (etapa)" e ler a linha
     `**Próximo passo:**` (fonte única — `.claude/rules/tasks/quadro.md`; o `STATUS.md` não
     repete o próximo passo)
   - Status
5. ✅ Tentar detectar a frente **atual**:
   - Rodar `git branch --show-current` para pegar a branch atual
   - Procurar na lista de frentes qual tem a branch que corresponde
   - Se encontrar, marcar com ⭐ "Frente Atual"
6. ✅ Mostrar em formato legível:
   - Se houver frente atual, mostrar **primeiro**
   - Depois as demais frentes ativas
   - Destacar o próximo passo de cada uma

## Formato de saída

```
## 📌 Próximas Tarefas

⭐ **Frente Atual:** nuvem · claude/festive-maxwell-25jnhl
   📝 Tarefa: #21 (Etapa 135-eeefc710)
   ➡️  Próximo: Aula 19 de Banco de Dados pronta (conteúdo, objetiva, prática)...
   📊 Status: 🔄 Ativa

**Frente:** nuvem · claude/verificar-status-pastas-c6s5yz
   📝 Tarefa: #20 (Etapa 125)
   ➡️  Próximo: item 125.5 — avaliações objetivas, prática e média final...
   📊 Status: 🔄 Ativa

**Frente:** nuvem · claude/ola-zlzh8z
   📝 Tarefa: #22-f79be83e (Etapa 137-13665a7e)
   ➡️  Próximo: Item 137.2 — aula 05 de Testes de Front-End...
   📊 Status: 🔄 Ativa
```

## O que fazer se

**Não encontrar o STATUS.md:** Avisar que o arquivo não foi encontrado em `tasks/STATUS.md`

**Nenhuma frente ativa:** Mostrar que todas as frentes foram encerradas (✅)

**Erro ao detectar branch atual:** Mostrar as frentes sem destacar qual é a atual — tudo bem, o usuário sabe qual é
