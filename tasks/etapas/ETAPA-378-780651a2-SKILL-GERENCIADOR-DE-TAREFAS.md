## Etapa 378-780651a2 — #251: Skill "gerenciador-de-tarefas" (líder dispara os agentes nas pastas por modelo)

**Tarefa:** #251-780651a2-f3a5-451e-a5eb-2c5452b935fa · **Pedido em:** 2026-10-17 10:30 · **Criada por:** Claude Code (Opus 5.5) (local · main · s18)
**Pedido:** "Leia o contexto aqui da conversa, e crie 1 skil em *C:\fontes\.claude\skills\gerenciador-de-tarefas*,
que faça o gerenciamento de tarefas, delegando aos agentes pra trabalhar nas suas tarefas com seus
respectivos modelos, nas 3 pastas criadas da imagem, deixe a pasta CLAUDE-OPUS-LIDER, sem tarefa
inicial, pois é de la que eu vou comecar a disparar todos os agentes" (imagem: pastas
`aulas-senai-CLAUDE-HAIKU`, `aulas-senai-CLAUDE-OPUS`, `aulas-senai-CLAUDE-OPUS-LIDER` e
`aulas-senai-CLAUDE-SONNET`).
**Objetivo:** da pasta do líder (Opus, sem tarefa própria), disparar e acompanhar uma sessão por
pasta de modelo — Haiku só `LEVE`, Sonnet só `MEDIO`, Opus só `PESADO` — e conferir as entregas
com o `verify`, sem as sessões disputarem o mesmo Git.

> ⚠️ **Tarefa grande** (estrutura nova de orquestração para todas as frentes): plano na #251.1 e
> **"sim"** do usuário antes da #251.2.

### Levantamento (2026-10-17 10:35)

- As 4 pastas são clones do `Gelvazio/aulasenai` na `main` (commit `b78fb901`, atrás do remoto),
  sem `scripts/variaveis.js` e sem `.claude/settings.local.json` (só existem em `C:ontesulasenai`).
- `C:ontes` **não** é repositório Git: o arquivo da skill fica fora do Git (o commit leva só o quadro).
- **Skill em pasta-pai não carrega:** o Claude Code procura `.claude/skills` só até a raiz do
  repositório (docs `code.claude.com/docs/en/skills.md`); uma sessão aberta em
  `C:ontesulas-senai-CLAUDE-OPUS-LIDER` não vê `C:ontes\.claude\skills`. Skills pessoais
  (`~/.claude/skills/<nome>`) carregam em qualquer pasta e podem ser um link para outra pasta.
- **Disparo:** no app desktop, `start_session` abre uma sessão real com `cwd` (pasta), `model`
  (mesmo ou mais barato que o do líder), `effort`, `use_worktree: false` e `wake_when_done`. As 4
  pastas ainda não foram abertas no app: na 1ª vez o app pode pedir confirmação da pasta.
- **Hook de modelo** (`verificar-modelo.js`): confere a reserva contra a coluna Modelo; cada
  trabalhador reserva em nome próprio, então não esbarra.

### Escopo

**Entra:**
- Skill `C:ontes\.claude\skills\gerenciador-de-tarefas\SKILL.md` (+ `modelo-de-brief.md`):
  ciclo do líder — sincronizar a pasta do líder, escolher a subtarefa livre de maior prioridade
  **de cada nível**, conferir se a pasta do modelo está livre e limpa, abrir a sessão daquela pasta
  com o modelo do nível e o brief, esperar o aviso do app (sem ficar consultando), conferir a
  entrega com o `verify` (`tasks/verificacao.md`) e disparar a próxima.
- Pastas e modelos fixos na skill:

| Pasta | Frente | Nível | Modelo | effort |
|---|---|---|---|---|
| `C:ontesulas-senai-CLAUDE-OPUS-LIDER` | `local · lider · main` | nenhum (só dispara e confere) | Opus 5.5+ ou Fable | — |
| `C:ontesulas-senai-CLAUDE-HAIKU` | `local · haiku · main` | só `LEVE` | `claude-haiku-5-5` | low |
| `C:ontesulas-senai-CLAUDE-SONNET` | `local · sonnet · main` | só `MEDIO` | `claude-sonnet-5-5` | medium |
| `C:ontesulas-senai-CLAUDE-OPUS` | `local · opus · main` | só `PESADO` (e banco) | `claude-opus-5-5` | high |

- Cada trabalhador faz o ciclo completo da subtarefa na própria pasta: sincroniza, **reserva em
  nome próprio** (commit + push), executa só aquela subtarefa, valida, entrega (etapa, linha ✅ para
  o `task_complete.md` com Verificado `—`, visualizador, `git commit -- <arquivos>` + push) e
  devolve um relatório curto. 1 subtarefa por pasta por vez.
- O líder **não reserva nem executa** subtarefa; só edita o quadro para o `verify` (Verificado
  `true` + seção de verificação na etapa). Problema na entrega → subtarefa nova para o modelo certo.
- Proteções: não disparar em paralelo duas subtarefas da mesma tarefa-mãe nem duas que citem o
  mesmo arquivo na etapa; pasta com edição não commitada ou sessão ainda rodando → não dispara;
  tarefa grande sem plano aprovado, 👀 ou 🟢 sem pedido → não dispara.
- Fora do app (CLI sem `start_session`): a skill mostra o brief e o comando para você abrir a
  sessão da pasta à mão.
- Disponibilizar a skill na sessão do líder: link `~/.claude/skills/gerenciador-de-tarefas` →
  `C:ontes\.claude\skills\gerenciador-de-tarefas` (fonte única no caminho pedido).
- Registrar o modo novo nas regras do projeto: `niveis.md` ("Equipe de agentes"), `claude-code.md`
  (lista de skills), `docs/HISTORICO-REGRAS.md` e visualizador.

**Não entra:** disparar qualquer subtarefa agora (a pasta do líder fica **sem tarefa inicial**);
copiar `variaveis.js`/`settings.local.json` para os clones (chaves — você copia, a skill avisa se
faltar); mudar as regras globais do `rules-ai` (o modo cabe na regra "1 subtarefa por frente").

**Pronto quando:** a skill existe no caminho pedido, aparece no `/` de uma sessão aberta na pasta
do líder (link conferido) e as regras do projeto citam o modo "pastas por modelo".

### Riscos

| Risco | Plano B |
|---|---|
| Link em `~/.claude/skills` não permitido (symlink exige Modo Desenvolvedor) | Junção de pasta (`mklink /J`); se não carregar, cópia em `~/.claude/skills` com aviso no topo de qual é a fonte |
| Duas pastas mexem no mesmo arquivo (conflito só no `pull --rebase`) | Trava da skill (mesma mãe/mesmo arquivo não vão juntos); conflito → manter os dois lados; arquivo gerado → regenerar |
| Entrega errada vai ao site antes do `verify` (push na `main` = deploy) | `verify` logo após cada entrega; problema vira subtarefa nova |
| Haiku/Sonnet errando no Git ou no quadro sem o líder por perto | Brief com comandos exatos; `verify` confere a entrega e o quadro |
| Clones sem `variaveis.js` | A skill confere e avisa antes de disparar subtarefa que precise da chave |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 10:39 | Plano aprovado: "Sim, plano da #251 aprovado. Pode executar a #251.2 e a #251.3." | Gelvazio | resposta no chat |
| 2026-10-17 10:39 | A #251.2 é feita pela própria frente (Opus 5.5, nível PESADO), com revisão por 3 lentes num fluxo; a #251.3 vai para o `executor-leve` (Haiku) | Claude Code (Opus 5.5) s18 | regra de níveis |


### #251.1 — Plano e aprovação (tarefa grande)

**Próximo passo:** — (plano aprovado em 2026-10-17 10:39).

- **Nível:** PESADO — arquitetura de orquestração entre pastas e sessões.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Entrega:** commits `91bbb4ca` (criação) e `3a127307` (plano) · **Verificação:** aprovação do
  usuário registrada nas Decisões.

### #251.2 — Criar a skill `gerenciador-de-tarefas`

**Próximo passo:** — (entregue em 2026-10-17 10:55).

- **Nível:** PESADO — arquitetura de orquestração entre pastas e sessões.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Entrega:** `C:ontes\.claude\skills\gerenciador-de-tarefas\SKILL.md` (211 linhas) e
  `modelo-de-brief.md` (95 linhas), **fora do Git** (`C:ontes` não é repositório); junção
  `~/.claude/skills/gerenciador-de-tarefas` → essa pasta (link simbólico exige administrador). O
  commit da entrega leva só o quadro.
- **Revisão:** fluxo com 3 revisores em paralelo (regras do projeto, ferramentas, brief seguido por
  modelo fraco): 42 achados, todos tratados na 2ª versão — seeds sem disparo impossível, pasta
  ocupada por qualquer reserva da frente, status exatamente `⬜ Pendente`, Próximo passo que pede o
  usuário fica de fora, líder retomado só quando todas as sessões param, pastas confiáveis,
  conferência do modelo real, `{MODELO_COLUNA}`, dependências no `task_complete.md`, sequência de
  rebase, trailer com dois `-m`, nomes de frente `local · main · <pasta>`, verify com visualizador.
- **Verificação:** `claude -p` aberto em `C:ontesulas-senai-CLAUDE-OPUS-LIDER` respondeu "SIM"
  e citou a descrição da skill (junção funciona); a skill também apareceu nesta sessão. As 4 pastas
  ainda **não são confiáveis** no Claude Code (`~/.claude.json` sem `hasTrustDialogAccepted`): o
  usuário abre cada uma uma vez e aceita.
- **Anotação:** o commit `5f45f378` desta tarefa apagou por engano o `tasks/task_complete.md`
  (script abriu o arquivo para gravação antes de ler); restaurado no `e2a7bb6f` (achado pela
  revisão). Lição registrada no `STATUS.md`.

### #251.3 — Registrar o modo "pastas por modelo" nas regras do projeto

**Próximo passo:** aguardar o "sim" do usuário ao escopo ampliado (a revisão da #251.2 mostrou
exceções de regra necessárias); depois delegar ao `executor-leve`.

- **Nível:** LEVE — só `.md` de regra e o visualizador gerado.
- **Modelo:** só Haiku — nunca outro (executa o `executor-leve`).
- **Descrição (escopo ampliado em 2026-10-17 10:55, aguarda aprovação):**
  - `niveis.md`: parágrafo "Pastas por modelo (skill gerenciador-de-tarefas)" — as 4 pastas e
    frentes `local · main · lider|haiku|sonnet|opus`; o líder não reserva nem executa, só dispara e
    faz o `verify`; cada pasta reserva, commita e edita o quadro da própria subtarefa (diferente do
    `liderar-equipe`); banco só na pasta OPUS.
  - `seeds.md`: as pastas HAIKU e SONNET são "frente sem banco" e não deixam recado (o líder manda
    os seeds para a pasta OPUS).
  - `tasks/verificacao.md`: a frente do líder `🧭 Líder (sem reserva)` não é conflito; o `verify`
    do líder a cada entrega não abre TASK.
  - `AGENTS.md`: nota na regra 1 (sessão trabalhadora não cria TASK, reserva a que recebeu; o
    líder não abre TASK para o `verify`) e na regra 12 (nas pastas por modelo só o líder roda git
    no `rules-ai`; as outras só leem).
  - `claude-code.md` (skill `gerenciador-de-tarefas`, pessoal, fonte em `C:ontes\.claude\skills`),
    `docs/HISTORICO-REGRAS.md` e visualizador regenerado.
- **Critérios de aceitação:** cada arquivo de regra continua ≤ 5 KB; sem repetir regra (apontar
  para `niveis.md`); visualizador regenerado.
- **Entrega:** — · **Verificação:** —
