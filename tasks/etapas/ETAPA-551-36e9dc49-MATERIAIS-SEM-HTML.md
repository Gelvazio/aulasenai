## Etapa 551-36e9dc49 — #402: Clone de MATERIAIS sem HTML (matéria de teste)

**Tarefa:** #402-36e9dc49 · **Pedido em:** 2026-10-26 23:01 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "CRIEI A PASTA *MATERIAIS-SEM-HTML*, CRIE 1 TAREFA COM O MAXIMO DE SUBTASK POSSIVEL, PRA SER UM CLONE DE *C:\fontes\aulasenai\MATERIAIS*, MAS SEM NENHUM ARQUIVO HTML, É POSSIVEL? COLOQUE O JAVASCRIPT NUMA PASTA DE NOME *assets\js* em *C:\fontes\aulasenai\MATERIAIS-SEM-HTML*, e inicial, faça isso pra materia EM FASE DE TESTES, MATERIA *C:\fontes\aulasenai\MATERIAIS\OPERADOR_PRODUCAO_INDUSTRIAL\FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO*"
**Objetivo:** copiar a matéria de teste para `MATERIAIS-SEM-HTML`, com a mesma estrutura de pastas e sem nenhum `.html`, e criar `assets/js` vazia na raiz do clone.

### Escopo

- **Entra:** a matéria `OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO` (89 arquivos sem HTML, de 105); `MATERIAIS-SEM-HTML/assets/js/` vazia com `.gitkeep`; `MATERIAIS-SEM-HTML/` no `.vercelignore`.
- **Não entra:** o restante de `MATERIAIS`; copiar qualquer `.js` (a matéria não tem nenhum; os 94 da pasta estão em outras matérias); alterar `.gitignore` (tem modificação do usuário não commitada); gerar ou editar conteúdo da matéria; testes automatizados; navegador.

### Critério de pronto

- `find MATERIAIS-SEM-HTML -type f -name "*.html"` retorna 0.
- `find MATERIAIS-SEM-HTML/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO -type f` retorna 89 arquivos, com os mesmos caminhos da origem menos os `.html`.
- `MATERIAIS-SEM-HTML/assets/js/` existe.
- `git check-ignore -v MATERIAIS-SEM-HTML/...` mostra a regra nova do `.vercelignore`.

### Riscos

- **Conteúdo sensível no site:** a matéria tem Markdown com gabarito e `ALUNOS-TAIO.md` (lista de alunos). Por isso a pasta inteira entra no `.vercelignore` (subtarefa #402.4).
- **Pasta criada pelo usuário com arquivos novos:** `MATERIAIS-SEM-HTML/REGRA_GERECAO_AULAS.md` já existe (criado pelo usuário em 2026-10-26 23:00). Não é apagado nem sobrescrito; entra no commit só se for pedido.
- **Mudanças do usuário não commitadas** (`.gitignore`, `assets/js/card-notas-*`, outros): `git add` só pelos caminhos desta tarefa.

### Premissas

- "Clone" = mesma árvore de pastas e arquivos, sem `.html`, copiada da origem (a origem não muda).
- `robocopy /E /XF *.html` ou `find` + `cp` com exclusão de `*.html`.
- Pasta vazia não vai ao Git: a `assets/js` leva `.gitkeep`.

### Decisões

- 2026-10-26 (pedido do usuário): escopo só a matéria de teste; `assets/js` criada vazia; pasta fora do site (`.vercelignore`). Registrado no plano aprovado.

### Aprovação

- ✅ Aprovada pelo usuário em 2026-10-26 (plano aprovado no modo de plano).

---

### #402.1 — Registrar a etapa e a mãe no quadro

**Próximo passo:** commit e push deste quadro (etapa, mãe e subtarefas) antes de copiar qualquer arquivo.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** criar a mãe #402 e as subtarefas #402.1 a #402.6 no `tasks/STATUS.md`, com esta etapa.
- **Critérios de aceitação:** quadro publicado na `main` antes das demais subtarefas.
- **Entrega:** commit do quadro · **Verificação:** `git log -1` mostra o commit; `tasks/STATUS.md` tem a mãe #402.

### #402.2 — Copiar a matéria sem `*.html` para MATERIAIS-SEM-HTML

**Próximo passo:** concluído.

- **Nível:** MEDIO · effort medium (executor-medio, Sonnet)
- **Modelo:** só Sonnet
- **Descrição:** cópia da árvore sem HTML; a origem não é alterada.
- **Critérios de aceitação:** 89 arquivos no clone; nenhum `.html`; origem intacta.
- **Entrega:** cópia feita pelo executor-medio com `tar` (a primeira tentativa com `cpio` falhou: o comando não existe no ambiente, e só sobrou a pasta vazia). · **Verificação:** conferido pelo Haiku (líder) em 2026-10-26: `.html` no destino = 0; arquivos no destino = 89; lista de caminhos da origem sem `.html` é igual à do destino; MD5 de todos os 89 arquivos é igual ao da origem.

### #402.3 — Criar assets/js vazia na raiz do clone

**Próximo passo:** criar `MATERIAIS-SEM-HTML/assets/js/` com um `.gitkeep` dentro.

- **Nível:** LEVE · effort low
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** a pasta existe e vai ao Git pelo `.gitkeep`; os `.js` entram depois, quando o usuário indicar quais.
- **Critérios de aceitação:** `MATERIAIS-SEM-HTML/assets/js/.gitkeep` existe.
- **Entrega:** `MATERIAIS-SEM-HTML/assets/js/.gitkeep` (Claude Code Haiku 5.5) · **Verificação:** `ls -la` mostra `.gitkeep` com 0 bytes dentro de `assets/js/`.

### #402.4 — Incluir MATERIAIS-SEM-HTML/ no .vercelignore

**Próximo passo:** acrescentar ao `.vercelignore` um bloco com comentário, no mesmo estilo do bloco de `analises/`: `MATERIAIS-SEM-HTML/`.

- **Nível:** LEVE · effort low
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** a pasta tem Markdown com gabarito e lista de alunos; não pode ir ao site.
- **Critérios de aceitação:** `grep -n "MATERIAIS-SEM-HTML" .vercelignore` acha a linha; a linha tem comentário explicando o motivo.
- **Entrega:** linha `MATERIAIS-SEM-HTML/` no `.vercelignore` (linha 49) · **Verificação:** `grep -n "MATERIAIS-SEM-HTML" .vercelignore` acha a linha. (O plano citava `git check-ignore`, mas ele não serve para `.vercelignore`, que não é um `.gitignore`; a checagem correta é o `grep`.)

### #402.5 — Conferir a contagem e os caminhos

**Próximo passo:** concluído.

- **Nível:** LEVE · effort low
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash
- **Descrição:** `find ... -name "*.html" | wc -l` = 0; `find ... -type f | wc -l` = 89; diff dos caminhos relativos vazio.
- **Critérios de aceitação:** os três números batem.
- **Entrega:** conferência feita pelo líder (Haiku), somente leitura · **Verificação:** 0 `.html`; 89 arquivos; diff de caminhos vazio; MD5 igual nos 89 arquivos.

### #402.6 — Commit e push da entrega

**Próximo passo:** `git add` pelos caminhos desta tarefa (`MATERIAIS-SEM-HTML/OPERADOR_PRODUCAO_INDUSTRIAL/`, `MATERIAIS-SEM-HTML/assets/js/`, `.vercelignore`, quadro e etapa); conferir com `git diff --cached --name-only`; commit e `git push` na `main`. Nunca `git add .`.

- **Nível:** a classificar pelo Jev
- **Modelo:** a classificar pelo Jev
- **Descrição:** um commit com o clone, o `.vercelignore` e o quadro; `REGRA_GERECAO_AULAS.md` do usuário fica fora.
- **Critérios de aceitação:** push feito; linha da mãe movida para `task_complete.md` só quando todas as subtarefas estiverem ✅.
- **Entrega:** — · **Verificação:** —
