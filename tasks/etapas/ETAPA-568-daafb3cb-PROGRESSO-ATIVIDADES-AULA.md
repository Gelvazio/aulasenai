## Etapa 568-daafb3cb — #421: Botão "Progresso Atividades" no card da aula (índice)

**Tarefa:** #421-daafb3cb · **Pedido em:** 2026-10-27 16:23 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "crie um botão aqui de nome *Progresso Atividades*, antes de Aula Liberada; ao clicar, deve abrir um modal com um quadro de progresso das atividades e dos alunos, para ver quem está fazendo ou não; não listar alunos que faltaram; usar o máximo de subtarefas possível".
**Objetivo:** o professor vê, no card da aula do índice, quem fez ou não cada atividade da aula, sem ver os alunos que faltaram.

**Análise (leitura do código, sem navegador):**
- O card da aula é montado em `assets/js/indice-aula-data.js`; o botão ON/OFF "Aula liberada" fica em `assets/js/indice-aula-bloqueio.js` (antes de "Editar aula"). O novo botão entra logo antes dele.
- As atividades da aula são as do card (ex.: aula 148 → ID 182 prática, 191 objetiva, 212 dinâmica).
- Faltas: o quadro de progresso da turma já trata "Faltou?" (`falta-aluno-progresso.css`, `progresso-turma-global.js`); reaproveitar essa fonte, sem criar outra.

### Escopo

- **Entra:** botão "Progresso Atividades" só para o professor, no card da aula; modal com quadro alunos × atividades; situação por célula (sem começar, em andamento, entregue); alunos que faltaram fora do quadro; mensagem de erro se o banco falhar.
- **Não entra:** alterar nota, entrega ou falta; visão do aluno; gráficos; exportação.

### Critério de pronto

- Botão aparece só para o professor, antes de "Aula liberada", em todo card de aula.
- Modal abre e fecha (botão, Esc e clique fora); lista só os alunos presentes da turma escolhida.
- Cada atividade da aula aparece como coluna; cada célula mostra a situação do aluno.
- `node --check` nos JS alterados; conferência na tela só pelo usuário (sem navegador).

### Riscos

- Banco fora do ar: mostrar mensagem de erro; nunca montar a lista por outra fonte.
- Muitos alunos: o quadro deve rolar, não quebrar o card.

### Decisões

- 2026-10-27 (Haiku, C52): nível e modelo de cada subtarefa classificados pelo Jev; a IA não escreveu nível.
- 2026-10-27 (Sonnet 5.5): o usuário mandou "faca a tarefa 421" no chat — vale como aprovação do plano; o Sonnet executa as subtarefas MEDIO e PESADO, uma por vez; a 421.7 (LEVE) fica para o Haiku.

---

### #421.1 — Botão "Progresso Atividades" no card da aula (só professor)

**Próximo passo:** classificar pelo Jev e, depois, reservar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** botão antes de "Aula liberada" em `indice-aula-data.js`/`indice-aula-bloqueio.js`; só professor; abre o modal da 421.2.
- **Critérios de Aceitação:** botão visível só ao professor, antes de "Aula liberada", em todo card.
- **Entrega:** —  · **Verificação:** —

### #421.2 — Modal: abrir, fechar e estrutura visual

**Próximo passo:** depois da 421.1; classificar pelo Jev.

- **Nível:** MEDIO — classificado (jev (confiança 0.94))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.94)
- **Descrição:** modal novo (JS e CSS próprios, um arquivo por responsabilidade); fecha por botão, Esc e clique fora; título com o nome da aula.
- **Critérios de Aceitação:** abre e fecha nos três modos; sem `style` inline nem `onclick`.
- **Entrega:** —  · **Verificação:** —

### #421.3 — Ler os alunos da turma, sem os que faltaram

**Próximo passo:** depois da 421.2; classificar pelo Jev.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** ler os alunos da turma escolhida, excluindo os marcados como "Faltou" (mesma fonte do quadro de progresso); RLS e JWT do professor.
- **Critérios de Aceitação:** aluno com falta não aparece; lista em ordem alfabética.
- **Entrega:** —  · **Verificação:** —

### #421.4 — Ler as atividades da aula e a entrega de cada aluno

**Próximo passo:** depois da 421.2; classificar pelo Jev.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** ler as atividades da aula (ex.: 182, 191, 212) e, por aluno, se não começou, está em andamento ou foi entregue; reaproveitar a leitura do quadro de progresso.
- **Critérios de Aceitação:** cada aluno tem uma situação por atividade, sem ler gabarito.
- **Entrega:** —  · **Verificação:** —

### #421.5 — Desenhar o quadro alunos × atividades

**Próximo passo:** depois das 421.3 e 421.4.

- **Nível:** MEDIO — classificado (jev (confiança 0.95))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.95)
- **Descrição:** tabela com alunos nas linhas e atividades nas colunas; célula com a situação (cor e texto); contagem "entregues de total" por atividade; rola dentro do modal.
- **Critérios de Aceitação:** com 3 atividades e N alunos, a tabela tem N linhas e 3 colunas de situação.
- **Entrega:** —  · **Verificação:** —

### #421.6 — Mensagens de carregamento e de erro

**Próximo passo:** depois da 421.5.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** "Carregando…" enquanto lê; mensagem de erro se o banco falhar; sem lista de plano B.
- **Critérios de Aceitação:** erro mostra mensagem e não desenha lista.
- **Entrega:** —  · **Verificação:** —

### #421.7 — Documentação em docs/

**Próximo passo:** depois da 421.6.

- **Nível:** LEVE — classificado (jev (confiança 1.00))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 1.00)
- **Descrição:** nota em `docs/index-indice-atividades.md` sobre o botão, o modal e a regra de não listar faltantes.
- **Critérios de Aceitação:** nota com data e número da tarefa.
- **Entrega:** —  · **Verificação:** —

### #421.8 — Verificação

**Próximo passo:** depois da 421.7.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** `node --check` em cada JS alterado; leitura do código contra o critério de pronto. Conferência na tela só pelo usuário.
- **Critérios de Aceitação:** sintaxe ok; critérios da 421.1 a 421.7 conferidos por leitura.
- **Entrega:** —  · **Verificação:** —
