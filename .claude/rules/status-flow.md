# 📋 Status Flow — Ler e Atualizar STATUS.md

## 🧭 Frentes de Trabalho

Você é identificada como:
- **Local:** `local · main`
- **Nuvem:** `nuvem · <branch-da-sessao>`

Toda frente tem sua linha em "🧭 Frentes de trabalho" com o **próximo passo exato**. Não mexer em linha de outra frente.

## 📌 Tarefas em Uso

Coluna **"Em uso por":**
- `—` = disponível (pegue!)
- `<frente> (desde data)` = reservada por outra frente (não mexer)

---

## Ciclo de Uma Tarefa

### 1️⃣ Tarefa Aprovada
- Criar arquivo `tasks/etapas/ETAPA-NNN[-uuid]-ASSUNTO.md`
- Criar linha em "📌 Tarefas" do STATUS.md (⬜ Pendente, —)
- Criar bloco no `TASKS.md`

### 2️⃣ Executar Item por Item
- Mudar status → 🔄 (data)
- Trabalhar
- Verificar
- Mudar status → ✅ (data)
- Commit + push

### 3️⃣ Tarefa Termina
- STATUS.md: linha → ✅ Concluído
- TASKS.md: **REMOVER O BLOCO INTEIRO**
- Commit + push
- Responder: TAREFA FINALIZADA!

---

## Status Legend

- ⬜ Pendente
- 🔄 Em progresso (só 1 por vez!)
- ✅ Concluído
- ⛔ Bloqueado (motivo explicado)

---

## ⚡ "Próximo Passo"

A linha no topo:
```
**Próximo passo:** Etapa 42, item 42.3 — gerar seed da objetiva
```

- Ao **parar:** diga o item exato a fazer
- Ao **retomar:** comece por ali

---

**Ver também:** `git-quick.md` (como commitar)
