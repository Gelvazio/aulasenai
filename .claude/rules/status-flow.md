# 📋 Status Flow — Ciclo de uma TASK

**Quadro do projeto:** `tasks/STATUS.md` (status oficial) · `tasks/TASKS.md` (descrição longa) ·
`tasks/etapas/` (itens de cada etapa). Modelo e regras de gestão: `status-modelo.md`.

## 🧭 Frentes de trabalho

Cada sessão é uma **frente** com uma linha em "🧭 Frentes de trabalho":
- **Local:** `local · main`
- **Nuvem:** `nuvem · <nome-da-sessão>` (também trabalha na `main` — ver `git-quick.md`)

Atualize **só a linha da sua frente** ao começar e ao parar. Frente sem pendência → `⏹️ Encerrada`.

## 📌 Tarefas em uso

Coluna **"Em uso por"**:
- `—` = livre (pode pegar)
- `<frente> (desde <data>)` = reservada; ninguém mais mexe até ela voltar a `—`

Uma frente reserva **no máximo 1 tarefa por vez** (`multiplas-ias.md`).

## Ciclo

### 1️⃣ Abrir a TASK (antes de executar)
- `tasks/etapas/ETAPA-NNN-<uuid8>-ASSUNTO.md` com tabela
  `Item | Descrição | Status | Concluído em | Verificação`
- Linha em "📌 Tarefas" do `STATUS.md` e no índice de etapas
- Bloco `### #NN-<uuid>: título — pedida em <data hora>` no `TASKS.md`
- Pedir detalhes ao solicitante (`toda-tarefa-e-task.md`)

### 2️⃣ Executar item por item
- Item → `🔄` (só **1** em progresso por vez) → trabalhar → verificar → `✅` com data e hora
- Atualizar o `STATUS.md` **na hora**, não no fim

### 3️⃣ Encerrar
- `STATUS.md`: tarefa `✅ Concluído` e linha da sua frente atualizada
- `TASKS.md`: **remover o bloco inteiro** da tarefa concluída
- Commit + push (`git-quick.md`)
- Responder **apenas**: **TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?**
  (sem resumo nem tabela; perguntas e bloqueios são respondidos normalmente)

## Legenda

⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado (com motivo e o que destrava) ·
👀 Aguardando o usuário

## ⚡ Próximo passo

Sempre o **item exato** (`Etapa 42, item 42.3 — gerar seed da objetiva`).
É a última coisa a atualizar ao parar e a primeira a ler ao retomar.
