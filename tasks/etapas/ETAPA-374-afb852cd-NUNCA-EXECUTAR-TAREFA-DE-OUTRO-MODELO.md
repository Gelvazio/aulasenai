## Etapa 374-afb852cd — #247: Nunca executar tarefa que não é do seu modelo

**Tarefa:** #247-afb852cd-5ce3-4200-8dd1-0f36f02b3533 · **Pedido em:** 2026-10-16 22:48 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o)
**Pedido:** "Ajuste todas as tasks e o gerador de task global, pra que NUNCA EXECUTE TAREFA QUE NAO
E SEU MODELO, coloque isso em todas as tasks, crie essa task agora e ja assuma"
**Objetivo:** nenhuma IA executa subtarefa de outro modelo — a regra fica no global (`rules-ai`),
no projeto, em todas as tarefas abertas e no que cria tarefas novas.

> ⚠️ **Tarefa grande** (regra de todas as IAs, dois repositórios, mudança em massa no quadro e
> no gerador): plano na #247.1 e **"sim"** do usuário antes da #247.2.

### Escopo (a confirmar na #247.1)

**Entra:** regra global (`rules-ai/regras/`, `CONFLITOS.md`); regras do projeto (`AGENTS.md`,
`niveis.md`, `tasks/`); aviso em todas as tarefas abertas do `tasks/STATUS.md` e nas etapas; o
que gera tarefas (modelos do quadro, skills `classificar-tarefa`/`liderar-equipe` e scripts).

**Não entra:** banco de dados; tarefas concluídas (histórico); mudar o nível de tarefa existente.

### Riscos

| Risco | Plano B |
|---|---|
| A regra atual (C2 = A, 2026-10-16) deixa modelo forte pegar nível mais leve | Pedir ao usuário a decisão nova da C2 e registrar no `CONFLITOS.md` |
| Mudança em massa no `STATUS.md` com várias frentes ativas | Script idempotente; só a coluna/marca nova; recado para todas |
| Exceções já autorizadas (#185.1, #206.2–#206.4) | Histórico não muda; vale para o que vier |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|

### #247.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** achar o "gerador de task global" e tudo que cria ou lista tarefas, escrever o
plano nesta etapa e pedir o "sim" do usuário.

- **Nível:** PESADO — regra de todas as IAs (arquitetura), dois repositórios, mudança em massa.
- **Descrição:** levantamento dos lugares a mudar e plano com subtarefas, níveis e verificação.
- **Critérios de aceitação:** plano aprovado pelo usuário.

### #247.2 — Executar o plano aprovado

**Próximo passo:** esperar a #247.1 aprovada (pode ser dividida no plano).

- **Nível:** PESADO — mudança em massa, mais de 3 arquivos ligados.

### #247.3 — Aceite do usuário

**Próximo passo:** esperar a #247.2.

- **Nível:** LEVE — conferência do usuário.
