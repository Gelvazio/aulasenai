---
name: classificar-tarefa
description: Classifica uma subtarefa do quadro (tasks/STATUS.md + etapa) no nível LEVE (fácil), MEDIO (média) ou PESADO (difícil) e diz qual ferramenta e modelo de IA pode pegá-la. Use ao criar ou dividir subtarefa, ao pegar tarefa antiga sem nível, quando perguntarem "qual o nível desta tarefa?", "quem pode pegar?", "esta tarefa é para mim?" ou "/classificar-tarefa".
---

# Classificar tarefa (classificar-tarefa)

Fonte única dos níveis, dos sinais e da tabela "quem pega o quê":
`.claude/rules/niveis.md` — **leia antes**. Esta skill só diz **como classificar** e **onde
gravar**; reservar continua sendo pela `.claude/rules/tasks/frentes-e-reserva.md`.

## Passo a passo

1. Ler a linha da subtarefa no `tasks/STATUS.md` e a seção dela na etapa (título, descrição,
   arquivos). Tarefa antiga sem subtarefas: ler o pedido e a tabela de itens da etapa.
2. Procurar os sinais de `PESADO`; se não houver, os de `MEDIO`; senão é `LEVE`.
3. **O sinal mais restritivo vence** e, **na dúvida, sobe o nível**.
4. Gravar (formato abaixo) e dizer quem pode pegar, pela tabela do `niveis.md`.

## Exemplos deste projeto

| Subtarefa | Nível | Por quê |
|---|---|---|
| Ajustar RLS ou uma RPC de notas | `PESADO` | banco e segurança |
| Mexer em quem vê o gabarito | `PESADO` | gabarito / segurança |
| Ligar um atributo em 23 páginas de uma matéria | `PESADO` | mudança em massa |
| Mover um botão em `assets/js/respostas-atividade.js` | `MEDIO` | lógica em 1 arquivo |
| Conferir se um pedido de tela foi feito (ler o JS e o HTML) | `MEDIO` | ler e entender código |
| Corrigir texto de uma apostila em `.md` | `LEVE` | só `.md` |
| Listar as tarefas 👀 do quadro com o pedido de cada uma | `LEVE` | só ler o quadro |

## Formato de saída

**Subtarefa nova:** 1º item da seção da subtarefa na etapa (`tasks/etapas/…`):

```markdown
- **Nível:** MEDIO — lógica em 1 arquivo de assets/js/, sem banco
- **Modelo:** só Sonnet — nunca outro
```

E a coluna **Modelo** da linha no `STATUS.md`: `LEVE · só Haiku`, `MEDIO · só Sonnet` ou
`PESADO · só Opus 5.5+ ou Fable` (aceite = `Usuário`). ⛔ Só esse modelo executa.

**Tarefa antiga** (tabela de itens): logo abaixo do **Objetivo** da etapa:

```markdown
**Nível:** PESADO — mexe em RLS
```

Justificativa curta: o sinal que decidiu. Gravar o nível segue o ciclo normal (commit com o
quadro; `docs(tarefas): classificar <códigos> por <IA> (<frente>)` se for só classificar).

## Proibido

- ⛔ Mudar a **prioridade** (é do usuário).
- ⛔ Reclassificar subtarefa **reservada por outra frente**.
- ⛔ Baixar o nível para caber na sua ferramenta: se não cabe, deixe para quem pode.
