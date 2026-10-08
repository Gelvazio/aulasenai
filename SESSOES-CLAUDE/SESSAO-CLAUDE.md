# 🤖 SESSÕES DO CLAUDE

Registro dos dados de cada sessão do Claude (uma seção por sessão, a mais recente no topo).
Status de todas as sessões: [STATUS-SESSOES.md](STATUS-SESSOES.md).

> ⚠️ Esta pasta é versionada no Git e publicada pela Vercel: **nunca** gravar aqui senhas, chaves,
> gabaritos ou dados pessoais de alunos.

---

## 📋 MODELO (copiar para cada sessão nova)

```markdown
## Sessão AAAA-MM-DD HH:MM

- **Ambiente:** local / nuvem
- **Link da sessão:**
- **Modelo:**
- **Branch / commits:**
- **Pedido do usuário:**
- **O que foi feito:**
- **Pendências:**
- **Observações:**
```

---

## Sessão 2026-10-07 21:10 — status PENDENTE

- **Ambiente:** local · **Modelo:** Claude Opus 5.5 · **Branch:** `main` (commits `f8687be` a `b13aa19`)
- **Pedido do usuário:** revisar o `.gitignore`, analisar `Scripts-Comunicacao` e recriar a matéria
  de Comunicação Oral e Escrita (Rio do Sul) no padrão da ITIC.
- **Detalhe por data e hora:** [SESSAO-2026-10-07-2110-COMUNICACAO-RIO-DO-SUL.md](SESSAO-2026-10-07-2110-COMUNICACAO-RIO-DO-SUL.md)

---

## Sessão 2026-10-08

- **Ambiente:** nuvem (Claude Code na web)
- **Link da sessão:** https://claude.ai/code/session_015p6uWWQTbzjAGJVionxvtH
- **Branch / commits:** `claude/gracious-cannon-gh0mj4` → `main` (`17cc7fd`, `728251e`)
- **Pedido do usuário:** separar tarefas pendentes e concluídas; criar a pasta `SESSOES-CLAUDE/`.
- **O que foi feito:**
  - `TASKS.md` só com as tarefas pendentes; concluídas e canceladas movidas para `TASKS_COMPLETE.md`
    (regra registrada no `CLAUDE.md`, versão 2026-10-08 10:00);
  - criada esta pasta com o arquivo `SESSAO-CLAUDE.md`.
- **Pendências:** tarefas do `TASKS.md` (#2 aguardando aprovação do plano).
- **Observações:** o `CLAUDE.md` tem ~175 mil caracteres e é carregado em toda mensagem, o que
  consome o limite de uso rapidamente; sugerida a redução dele.
