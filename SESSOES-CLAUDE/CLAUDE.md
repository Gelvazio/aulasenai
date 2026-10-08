# 🤖 CLAUDE.md — Pasta `SESSOES-CLAUDE/`

Regras desta pasta. Valem junto com o [`CLAUDE.md` da raiz](../CLAUDE.md) (regra "REGISTRO DA
SESSÃO EM `SESSOES-CLAUDE/`"), que tem precedência no que não estiver dito aqui.
Registrado em 2026-10-08 a pedido do usuário.

---

## 🚨 1. Sempre ler TODAS as sessões com status `PENDENTE` e verificar conflitos

⚠️ **Antes de começar qualquer tarefa** (e no início de cada chat), o Claude **deve**:

1. ✅ Ler o [`STATUS-SESSOES.md`](STATUS-SESSOES.md) e listar **todas** as sessões com status
   **`PENDENTE`**.
2. ✅ **Ler o arquivo de cada uma dessas sessões por inteiro** (próximo passo, decisões, validação
   dos pedidos e pendências) — não só a sessão mais recente.
3. ✅ **Verificar se não há conflitos**:
   - **entre as sessões pendentes:** dois logs mexendo no mesmo arquivo, na mesma etapa/item do
     `STATUS.md` ou com decisões opostas do usuário (ex.: uma manda manter, outra manda apagar);
   - **entre as sessões e o `STATUS.md`:** item marcado de um jeito no log e de outro no
     `STATUS.md` (o **`STATUS.md` vence** — corrigir o log na mesma tarefa);
   - **entre as sessões e a tarefa nova:** o pedido atual contradiz ou repete algo já feito ou
     decidido em outra sessão;
   - **no Git:** arquivos com alterações sem commit de outra sessão (nunca levá-los no commit da
     tarefa atual; colocar no commit só o que é da tarefa).
4. ✅ **Havendo conflito:** não escolher sozinho — **avisar o usuário** (qual sessão, qual arquivo
   ou item, o que diverge) e esperar a decisão. Registrar a decisão no log da sessão e no
   `STATUS.md`.
5. ✅ **Sem conflito:** seguir a tarefa normalmente.

## 2. Nome dos arquivos de sessão: `sessao-claude-[ID].md`

- ✅ Pedido do usuário em 2026-10-08: cada sessão nova ganha o arquivo
  **`sessao-claude-[ID].md`**, com **ID incremental** (o próximo número depois da última sessão
  registrada no `STATUS-SESSOES.md`). Ex.: `sessao-claude-4.md`, `sessao-claude-5.md`.
- ✅ Os arquivos antigos (`SESSAO-AAAA-MM-DD-HHMM-ASSUNTO.md`) continuam válidos com o nome que têm.
- ✅ O arquivo nasce com **`Status: PENDENTE`** e só vira `CONCLUÍDO` com todos os pedidos validados
  (regra da raiz).

## 3. Conteúdo de cada arquivo de sessão

- ✅ Cabeçalho: status, ID, início, atualização, ambiente, modelo, branch, etapas do `STATUS.md`,
  planos e entregáveis.
- ✅ **"▶️ Próximo passo exato"** logo no início.
- ✅ Uma seção por pedido (`## AAAA-MM-DD — pedido · status`) com o que foi feito, decisões e
  commits.
- ✅ No fim: **"✅ Validação dos pedidos"** e **"⏳ Pendências"** (com a etapa/item do `STATUS.md`).
- ✅ A cada sessão: linha no [`STATUS-SESSOES.md`](STATUS-SESSOES.md) e seção curta no índice
  [`SESSAO-CLAUDE.md`](SESSAO-CLAUDE.md).

## 4. Proibições

- ⛔ A pasta é versionada e publicada: **nunca** gravar senhas, chaves, gabaritos, respostas certas
  nem dados pessoais de alunos.
- ⛔ Nunca marcar uma sessão `CONCLUÍDO` com pedido, commit ou aceite faltando.
