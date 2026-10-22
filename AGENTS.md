# 🤖 AGENTS.md — Regras do projeto Aulas SENAI

<!-- rules-ai:global -->
> 🌐 **Regras globais:** além das regras deste arquivo, valem as regras globais de
> `C:\fontes\rules-ai` (`regras/*.md`, entregues a cada IA pelo arquivo global dela). Em divergência,
> a regra deste projeto prevalece, e o usuário decide o que fazer com cada divergência
> (`rules-ai/CONFLITOS.md`). Ao finalizar uma tarefa: commit + push.


> 📜 **Fonte única das regras para todas as IAs** (Claude, Gemini, Grok, Copilot, Devin,
> Antigravity…). Arquivos de uma IA só (`CLAUDE.md`, `GEMINI.md`, `.cursorrules`…) apenas apontam
> para cá. **"Salvar no `CLAUDE.md`" = salvar aqui** ou no arquivo do assunto em `.claude/rules/`.

As regras ficam divididas por assunto em [`.claude/rules/`](.claude/rules/INDEX.md) (cada arquivo
≤ 5 KB). As regras de **tarefas** que servem para qualquer projeto ficam em
[`.claude/rules/tasks/`](.claude/rules/tasks/quadro.md). Detalhes com exemplos em `docs/regras/`.

> 👁️ **`.claude/rules/index.html` é APENAS um visualizador de regras e tarefas** — não é página
> do projeto e não deve ser usado nele (nem como componente, nem com header/login/banco). É
> gerado ([`visualizador-regras.md`](.claude/rules/visualizador-regras.md)).

## ⚡ Ao iniciar a sessão

1. [`essentials.md`](.claude/rules/essentials.md) — checklist de início
2. [`tasks/quadro.md`](.claude/rules/tasks/quadro.md) e
   [`tasks/ciclo-da-task.md`](.claude/rules/tasks/ciclo-da-task.md) — quadro e ciclo da TASK
3. [`INDEX.md`](.claude/rules/INDEX.md) — o resto, conforme o assunto

## ✅ Regras que valem SEMPRE

1. **Toda tarefa que muda algo vira TASK** (etapa em `tasks/etapas/` + linha no
   `tasks/STATUS.md`) e a IA pede detalhes antes de executar; pergunta sem mudança não vira TASK
   ([`tasks/ciclo-da-task.md`](.claude/rules/tasks/ciclo-da-task.md)).
   - **Primeiro passo, sempre** (2026-10-14): criar a TASK **reservada para a sessão atual** e
     já gravar no quadro (commit + push da reserva) **antes** de ler código, explorar arquivos ou
     pedir detalhes.
   - **Todo pedido, nesta ordem** (2026-10-14, #149; vale para todas as IAs): **1) criar** a TASK
     (etapa + linhas do `STATUS.md`), **2) publicar** no quadro (commit + push) e **3) assumir**
     (reservar em "Em uso por" e na linha da frente, commit + push) — só então trabalhar.
2. **Tarefa grande = plano na própria etapa + aprovação** (sem plano separado em `docs/`).
3. **Cada informação em um lugar só:** etapa = detalhes; `tasks/STATUS.md` = índice
   ([`tasks/quadro.md`](.claude/rules/tasks/quadro.md)). O que não está no quadro não aconteceu.
4. **Fim de tarefa = 1 commit + push**, sempre na **`main`**, local e nuvem
   ([`git-quick.md`](.claude/rules/git-quick.md)).
   - **Sempre, ao finalizar qualquer tarefa** (2026-10-18, pedido do usuário): fazer **commit e push
     direto na `main`** na hora da entrega — de qualquer IA, tarefa grande ou pequena —, sem
     esperar pedido, sem pedir autorização e sem deixar para depois. Nunca em branch paralela;
     `--force` proibido.
5. **Seeds em dia** antes de tarefa nova, com as exceções de [`seeds.md`](.claude/rules/seeds.md).
6. **Sem navegador e sem testes automatizados**
   ([`testes-validacao.md`](.claude/rules/testes-validacao.md)).
7. **RLS + JWT** em toda página e tabela; o aluno nunca vê o gabarito
   ([`security-banco.md`](.claude/rules/security-banco.md)).
8. **Várias IAs ao mesmo tempo:** 1 tarefa reservada por frente; banco só pelo Claude Code local
   ([`tasks/frentes-e-reserva.md`](.claude/rules/tasks/frentes-e-reserva.md),
   [`multiplas-ias.md`](.claude/rules/multiplas-ias.md)).
   - **Nível de cada subtarefa** (2026-10-15, #182): `LEVE`, `MEDIO` ou `PESADO`; cada IA se
     identifica como IA + modelo. ⛔ **NUNCA executar tarefa que não é do seu modelo** (2026-10-16,
     #247, C22): só o seu nível (coluna **Modelo**), nem acima nem abaixo, sem exceção
     ([`niveis.md`](.claude/rules/niveis.md)).
9. **Visualizador `.claude/rules/index.html` só com pedido explícito** (2026-10-22, #341, global
   C45): só é gerado quando o usuário pedir, e só no Claude Code local — nunca na nuvem, nunca
   por conta própria (fim de tarefa, reserva, regra mudada) ([`visualizador-regras.md`](.claude/rules/visualizador-regras.md)).
10. **Sem sugestões** (2026-10-08, "PARE DE SUGERIR"): responder só o pedido, sem oferecer opções,
    "quer que eu…?" ou próximos passos; se o usuário afirma algo, aceitar sem conferir. Pedir os
    detalhes de uma TASK (regra 1) e relatar bloqueios continua valendo.
11. **A IA não gera slides de aula** (2026-10-16, #244.9): nem PDF nem PPTX, em nenhuma aula de
    nenhuma matéria — o professor gera os slides em outro momento
    ([`materias-global.md`](.claude/rules/materias-global.md)).
12. **Sempre verificar as regras do `rules-ai`** (2026-10-16, #246): ao iniciar a sessão (antes
    do primeiro pedido) e antes de entregar cada tarefa, ler as regras globais
    (`regras/*.md` e `CONFLITOS.md`) e conferir se o trabalho as segue.
    - **Local:** `C:\fontes\rules-ai` (`git pull --rebase` antes de ler).
    - **Nuvem:** a pasta não existe; usar o repositório **`Gelvazio/rules-ai`** do GitHub (anexar
      à sessão e clonar em `/home/user/rules-ai`), **só para leitura**.
    - Divergência com este projeto → vale a regra do projeto e o usuário decide
      (`CONFLITOS.md`); sem acesso ao `rules-ai` → avisar o usuário, não seguir em silêncio.

13. **Mensagem só com um ponto (`.`)** (2026-10-17, pedido do usuário): listar as tarefas
    pendentes do quadro (como em "Liste tarefas pendentes": contagens por status e prioridade, 
    🔴, 🔄, 👀 e grupos grandes), sem começar nenhuma tarefa nem alterar arquivos.
14. **Mensagem `verify`** (2026-10-16, #248): verificação completa do quadro — conflitos e se o que
    foi feito foi aplicado mesmo; só o que tem prova ganha `true` na coluna **Verificado**
    ([`tasks/verificacao.md`](.claude/rules/tasks/verificacao.md)).
15. **Cards de aula só da tabela `aulas`** (2026-10-17, #272, pedido do usuário): a lista de
    cards de aulas vem só do banco; arquivos nunca criam, escolhem nem ocultam cards, sem plano B
    por HTML ([`materias-global.md`](.claude/rules/materias-global.md)).

Histórico de mudanças das regras: [`docs/HISTORICO-REGRAS.md`](docs/HISTORICO-REGRAS.md).

<!-- rules-local:inicio -->
## Regras globais (rules-local)

No início da sessão, antes do primeiro pedido, rode na raiz do projeto:

```
node rules-local/sessao.mjs
```

Leia as linhas que começam com `rules-local:`:

- `versão igual`, `sem acesso`, `nuvem inconsistente` ou `outra sessão`: siga o pedido.
- `DISPARAR A SINCRONIZAÇÃO DE TASKS`: faça a sincronização de tasks antes do pedido, como manda
  `rules-local/regras/rules-local.md`.

Não edite a pasta `rules-local/` à mão. Ela é gerada pelo script.
<!-- rules-local:fim -->
