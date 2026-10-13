# Plano em docs/ para tarefas grandes (seção 6)

> 📎 **Origem:** `AGENTS.md` (linhas 332–357 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Antes de executar tarefa grande (banco, segurança, várias partes, massa).

---

## 📝 6. PLANO EM `docs/` PARA TAREFAS GRANDES (OBRIGATÓRIO)

Antes de executar uma **tarefa grande**, o agente cria o plano em `docs/<nome-descritivo-em-kebab-case>.md`. Vale para qualquer IA.

**Tarefa grande** é a que tem pelo menos um destes pontos:
- mexe em **banco de dados** (SQL, schema, trigger, função, migração);
- mexe em **segurança** (autenticação, papéis, RLS, chaves, permissões);
- tem **várias partes** (tarefa-mãe com subtarefas);
- faz **geração ou mudança em massa** ou **apaga dados**.

**Tarefa pequena** (ajuste pontual em até ~3 arquivos, sem nenhum dos pontos acima) **não** precisa de plano em `docs/`.

**Regras:**

1. **Quando criar:** antes do primeiro commit de código da tarefa. Numa tarefa-mãe, o plano é **um só**, criado por quem pegar a primeira subtarefa e mantido por quem pegar as seguintes.
2. **Conteúdo mínimo:**
   - cabeçalho com a data de criação, o executor e o código da tarefa no quadro;
   - objetivo em 1 frase;
   - escopo (o que entra e o que **não** entra);
   - riscos com plano B;
   - tabela de passos (`# | Subtarefa | Arquivos | Verificação | Status`) com os estados `⬜ Pendente`, `🔄 Em progresso`, `✅ Concluído` e `⛔ Bloqueado`.
3. **Aprovação:** a tarefa no quadro, criada ou pedida pelo usuário, já conta como aprovação do plano. **Mudança de escopo** exige nova aprovação do usuário, registrada no plano e na anotação do bloco.
4. **Ligação com o quadro:** citar o arquivo do plano na anotação do bloco (`Plano em docs/<arquivo>.md`). O detalhamento de cada passo continua no `task-principal.md`, que é a fonte da verdade; o plano não substitui o bloco.
5. **Atualização na hora:** ao concluir cada passo, marcar `✅` com o commit da entrega. Ao terminar a tarefa, preencher a conclusão e o tempo decorrido.
6. **Commit junto:** o plano vai no mesmo commit do lock ou da entrega da subtarefa (`git add docs/<arquivo>.md`), nunca sozinho depois.
