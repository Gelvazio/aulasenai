# Regras complementares de concorrência (seção 1.1)

> 📎 **Origem:** `AGENTS.md` (linhas 105–176 na divisão de 2026-10-13). Em caso de divergência, vale o `AGENTS.md`.
> 🎯 **Carregar quando:** Ao travar/liberar tarefa, mover concluídas, editar o Resumo de Progresso ou pegar tarefa de banco.

---

## ⚖️ 1.1 REGRAS COMPLEMENTARES DE CONCORRÊNCIA (OBRIGATÓRIAS)

1. **Uma tarefa por agente, no máximo:**
   - Cada agente pode ter **no máximo 1 item travado** por vez: **1 subtarefa** (ex: `SUB-19.3`) **ou 1 tarefa atômica** (tarefa sem subtarefas, `Subtarefas: Nenhuma (atômica)`).
   - ⛔ É proibido travar uma tarefa-mãe que tenha subtarefas (status `pendente (aguardando subtarefas)`). Ela só é concluída quando todas as filhas estiverem `concluido`.
   - Só depois de concluir e fazer push da entrega (ou liberar a trava) o agente pode pegar o próximo item.
   - Exceção: o planejamento/subdivisão de tarefas pedido pelo usuário, que trava as tarefas-mãe apenas durante a edição do quadro e as libera no mesmo ciclo, sem escrever código.

2. **Push da trava recusado (corrida entre agentes):**
   - Se o `git push` do lock for recusado, executar `git fetch --all --prune`, depois `git pull --rebase origin main` e **reler o quadro**.
   - Se outro agente travou o mesmo item, **desfazer o seu lock local** e escolher outro item livre. Nunca sobrescrever a trava de outro agente.
   - ⛔ Nunca usar `git push --force`.

3. **Tarefas travadas para todas as IAs:**
   - ⛔ **KIRO-DEV-CLONE**: esta tarefa está **TRAVADA PARA TODAS AS IAS** — nenhuma IA pode assumi-la (nem subtarefas que venham a ser criadas nela) sem autorização explícita do usuário.
   - Para liberar a trava, o usuário deve editar o `task-principal.md` e remover a trava manualmente.
   - Esta trava tem precedência sobre o protocolo normal de captura de tarefas e sobre a prioridade (seção 1.2).

4. **Travas em paralelo:**
   - Vários agentes podem trabalhar ao mesmo tempo, **cada um em um item diferente**.
   - Cada agente registra sua trava em um bloco próprio `### 🔒 TRAVA ADICIONAL — <Nome da IA> — <SUB-XX>` em `task-principal.md`, e nunca edita o bloco de outro agente.
   - A proibição vale para o **mesmo item**: ninguém assume um item que já tem trava de outro agente.

5. **Travas só são liberadas pelo usuário:**
   - Não existe tarefa "abandonada": uma tarefa travada é uma tarefa que ainda não terminou.
   - ⛔ Nenhum agente pode liberar, assumir ou alterar a trava de outro agente por conta própria, independentemente do tempo sem commits.
   - Se uma trava estiver causando problemas, quem decide e libera manualmente é o **usuário**.

6. **Estados das subtarefas no quadro:**
   - 🟢 **livre:** `pendente`, sem trava e com todas as dependências `concluido`; qualquer agente pode pegar.
   - ⛓️ **bloqueada:** `pendente`, mas com alguma dependência ainda não concluída; ninguém pode pegar.
   - 🔒 **reservada:** pertence a uma tarefa-mãe travada por um agente; só esse agente pode pegar.
   - 🔄 **em execução:** travada por um agente.

7. **Tamanho máximo (~3 minutos):**
   - Cada subtarefa deve caber em cerca de **3 minutos** de trabalho de uma IA: 1 função, 1 método, 1 componente, 1 classe, 1 arquivo de teste ou 1 seção de documentação.
   - Se o agente perceber que o item é maior, deve **subdividi-lo** (seção 2) antes de codificar, em vez de entregar parcialmente.

8. **Commits limpos:**
   - Rodar `git fetch --all --prune` antes de qualquer `git pull --rebase origin main` — e repetir o fetch imediatamente antes de publicar, para conferir se o remoto andou durante o seu trabalho.
   - Usar sempre `git pull --rebase origin main` (nunca merge) e adicionar **só os arquivos da tarefa** + quadro (nunca `git add .`).
   - ⛔ **Não** usar `git pull --all` nem `git pull` sem `--rebase`: sem o `--rebase` o comando cria um **merge**, proibido por esta seção. Para "pegar tudo de todos os remotos", a forma correta é `git fetch --all` seguido de `git pull --rebase origin main`.
   - Este item é **verificado mecanicamente** pelo hook [`.githooks/pre-merge-commit`](.githooks/pre-merge-commit), que recusa o merge (ver seção 1.3).

9. **Resumo de Progresso: editar só o próprio item:**
   - Ao travar ou concluir um item, mude no `📊 Resumo de Progresso` **apenas o trecho do seu item** (incluir ou retirar o código dele de "livres agora", "em execução", "bloqueadas", e somar/subtrair 1 nas contagens).
   - ⛔ **Nunca reescrever a linha inteira** (nem gerá-la de uma lista fixa, nem por script): outro agente pode ter criado, travado ou concluído itens depois do seu último `pull`, e a reescrita apaga esses itens do resumo sem aviso.
   - Logo antes de editar o resumo, faça `git fetch --all --prune` + `git pull --rebase origin main` e **releia** o resumo atual; depois do commit, confira no diff que só o seu trecho mudou.

10. **Quadro ativo sem concluídas (atualizador de tasks completas):**
   - O `task-principal.md` só guarda o que **não** terminou. Todo bloco concluído (cabeçalho `[x]` **ou** `Status: concluido`, tarefa-mãe ou subtarefa) fica no [`task_complete.md`](task_complete.md).
   - **Quem conclui move:** ao concluir um item, o próprio agente move o bloco no mesmo commit da conclusão (PARTE 3, passo 2).
   - **Quem encontra move:** qualquer agente que, ao ler o quadro, achar um bloco concluído que ficou para trás deve movê-lo, sem esperar pedido. O commit é separado: `docs(board): mover concluídas para task_complete.md por <agente>`.
   - **Como mover:**
     - mover o bloco **inteiro e sem alterar o texto** para o **fim da fase correspondente** no `task_complete.md`, com o mesmo título de fase (criar o cabeçalho da fase lá, se ainda não existir);
     - na lista `Subtarefas:` da tarefa-mãe que continua no quadro, deixar só `(concluido, <sha>)`;
     - não apagar nem duplicar blocos: a soma de blocos dos dois arquivos é igual antes e depois.
   - ⛔ **Não mover:**
     - bloco com trava ativa (`em_execucao`);
     - tarefa-mãe com alguma filha ainda não `concluido`;
     - bloco sob 🔒 TRAVA ESPECIAL.
   - As contagens do `📊 Resumo de Progresso` **não mudam** com a mudança de arquivo, porque o bloco já contava como concluído (regra 9).

11. **Tarefas de banco de dados: só o Claude Code local:**
   - Só o **Claude Code rodando localmente** (na máquina do usuário, com o **MCP do Supabase** conectado) pega tarefas de banco de dados.
   - Valem como "tarefa de banco": criar ou alterar SQL, schema, trigger, função, RLS ou migração (`database/*.sql`); consultas; suítes do banco (`database/tests/`); testes de integração (`npm run test:integration`); aplicar scripts no Supabase; e validação de telas contra um banco real.
   - ⛔ **Claude Code em sessão na nuvem** (claude.ai/code, container remoto) **não pega** tarefa de banco de dados, mesmo tendo o MCP do Supabase.
   - ⛔ As outras IAs (Gemini, Grok, Copilot, Devin, DeepSeek, Antigravity etc.) também **não pegam** tarefa de banco de dados.
   - Para quem não pode, o item fica indisponível, qualquer que seja a prioridade (seção 1.2).
   - Se o item tiver uma parte sem banco (código do frontend, documentação), crie uma subtarefa separada para essa parte (seção 2), e deixe a parte de banco para o Claude Code local.
   - Esta regra não libera nada: mudança em banco de produção (aplicar SQL, criar usuário, gravar dados) continua exigindo autorização explícita do usuário.
