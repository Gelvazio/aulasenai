---
name: proxima-task
description: Executa a próxima etapa livre conforme o STATUS.md do aulasenai, seguindo o protocolo de colaboração entre sessões (fetch, merge, lock, implementação, validação, commit e push). Use quando pedirem para "pegar a próxima tarefa", trabalhar no STATUS, assumir/concluir uma etapa ou sincronizar com outras sessões/IAs.
---

# Próxima tarefa do aulasenai

Fluxo de uma etapa (ou item de etapa) por vez. A fonte da verdade é o `CLAUDE.md` e o `tasks/STATUS.md`: em caso de dúvida ou divergência, eles prevalecem.

## Procedimento

1. **Sincronize primeiro com a `main`:**
   ```bash
   git fetch origin main
   git merge origin/main  # ou git pull --rebase origin main (confira a regra global)
   ```
   - Veja `tasks/RECADOS.md` e cumpra os recados abertos para sua frente ou para `todas`

2. **Leia o `STATUS.md`:**
   - Linha **"🧭 Frentes de trabalho"** da sua frente
   - Coluna **"Em uso por"** do "📌 Tarefas do `TASKS.md`" (se uma tarefa tiver outra frente reservada, não mexe)
   - Tabela **"⏳ Aguardando o usuário"** (itens que só o professor pode libertar)
   - Arquivo da etapa em `tasks/etapas/ETAPA-NNN[-uuid8]-ASSUNTO.md`

3. **Escolha o próximo item:**
   - Etapa `⬜ Pendente` com **todas as dependências `✅` Concluído**
   - Ou continuar um item `🔄 Em progresso` da sua frente (encontra a linha dela em "Frentes de trabalho")
   - **Nunca** mexe em item de outra frente (ver coluna "Em uso por")
   - Se há item `⏳ Aguardando o usuário`, pule para o próximo ou pare e comunique

4. **Reserve a tarefa/etapa (se necessário):**
   - Se for uma `TASK` do `TASKS.md` (tarefa grande), atualize a coluna **"Em uso por"** em "📌 Tarefas":
     ```
     | #XX | ... | ... | ... | 🌩️ <seu-ambiente-branch> (desde AAAA-MM-DD HH:MM) |
     ```
   - **Faça commit + push da reserva NA HORA:**
     ```bash
     git add tasks/STATUS.md
     git commit -m "reserve: tarefa #XX para <seu-ambiente-branch>"
     git push -u origin <sua-branch>  # nuvem: sempre push
     ```
   - Se o push falhar, rode `git fetch origin main` e `git merge origin/main`, releia o STATUS e tente de novo

5. **Atualize o status para `🔄 Em progresso`:**
   - No `STATUS.md`, linha da etapa (ou item) em "🧭 Frentes de trabalho": `🔄 Em progresso`
   - No arquivo da etapa (`tasks/etapas/`), item correspondente: `🔄 Em progresso` + data/hora e seu nome
   - **Faça commit + push:**
     ```bash
     git add tasks/STATUS.md tasks/etapas/ETAPA-NNN-*.md
     git commit -m "work: começando <item> — <descrição>"
     git push origin <sua-branch>  # nuvem: sempre push
     ```

6. **Implemente só o escopo do item** (itens da etapa + critérios de aceitação).
   - Se encontrar problema **fora do escopo**: registre como nova etapa/item pendente em vez de corrigir agora

7. **Valide conforme o item:**
   - **JavaScript/TypeScript**: `npm run typecheck`, `npm test`, `npm run build`
   - **Python**: testes unitários, linter, type hints (`python -m pytest`, `ruff`, `mypy`)
   - **Banco**: scripts SQL idempotentes, sem `DELETE`, com comentários explicativos
   - **Markdown/Documentação**: conferência manual (gramática, links, consistência)
   - Corrija até tudo ficar verde ✅

8. **Faça commit(s) da entrega:**
   ```bash
   git add <arquivos da tarefa>  # NUNCA git add .
   git commit -m "feat: <o que foi feito> — #XX.<item>"
   git push origin <sua-branch>
   ```
   - Na **nuvem**: após cada commit, fazer push e abrir/atualizar PR para `main`
   - No **local**: o usuário faz o push

9. **Conclua no STATUS.md e na etapa:**
   - No `STATUS.md`:
     - Linha da etapa: `✅ Concluído` + data/hora real (horário Brasília: `AAAA-MM-DD HH:MM:SS`)
     - Item da tarefa em "📌 Tarefas": coluna "Em uso por" volta a `—`
   - No arquivo da etapa (`tasks/etapas/`):
     - Item correspondente: `✅ Concluído` + data/hora, seu nome, observação técnica
   - **Gravar o status + arquivos de documentação**:
     ```bash
     git add tasks/STATUS.md tasks/etapas/ docs/ <outros-arquivos>
     git commit -m "docs: concluir <item> — <resumo da entrega>"
     git push origin <sua-branch>
     ```

10. **Na nuvem: abrir/juntar PR para a `main`:**
    - Se for primeira vez: `git push -u origin <sua-branch>` + `gh pr create`
    - Se houver conflito: `git fetch origin main`, `git merge origin/main`, resolver, `git push`
    - Depois de tudo verde: **Claude faz o merge automaticamente** (desde 2026-10-09 22:17)
    - **Ler `RECADOS.md` de novo após o merge** (regra "CONVERSA ENTRE SESSÕES E LICENÇAS")

11. **Só então** escolha a próxima etapa/item (volte ao passo 2) ou reporte ao usuário.

## Especificações

- A **fonte única do estado** é `tasks/STATUS.md` (junto com os arquivos das etapas em `tasks/etapas/`)
- **Uma etapa/tarefa por frente** — terminar antes de começar outra
- Data/hora sempre com **segundos** (desde 2026-10-07) e em **horário de Brasília** (`TZ=America/Sao_Paulo`)
- **Local**: commit na hora, push fica com o usuário
- **Nuvem**: commit + push + PR/merge automático — sempre confira a branch certa (nunca `main`)
- **Cada merge com a `main`**: trazer a `main` para a branch, rodar validações de novo, ler recados abertos

## Dicas

- `RECADOS.md` é o canal entre frentes de trabalho — leia ao iniciar e a cada merge
- Etapa que não aparece em `STATUS.md` está **incompleta ou esquecida** — consulte `CLAUDE.md` para saber o que é
- Dependência que não aparece como pendente pode estar já concluída em commit anterior — verifique pelo commit citado
- Seeds (`database/SEEDS-APLICADOS.md`): todos `CONCLUÍDO` antes de começar tarefa
- Scripts de geração (status de matérias, análise, etc.): rodar após cada tarefa que altere matérias

## Proibido

- ⛔ Editar ou liberar a linha "Em uso por" de outra frente (só o usuário pode)
- ⛔ Push forçado (`--force`), merge para sincronizar, `git add .`, rebase com perda de histórico
- ⛔ Começar nova etapa sem terminar a anterior
- ⛔ Commitar mudanças de STATUS.md sem as mudanças da etapa (ou vice-versa)
- ⛔ Na nuvem: push direto na `main` (sempre branch própria + PR)
- ⛔ Mudar a seção "Histórico de Versões das Regras" do `CLAUDE.md` sem autorização (só o usuário)
