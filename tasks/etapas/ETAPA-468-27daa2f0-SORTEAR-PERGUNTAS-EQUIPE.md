## Etapa 468-27daa2f0 — Botão "Sortear perguntas" ao lado de "Abrir votação" (professor)

**Tarefa:** #339-27daa2f0-5381-4027-a66a-8b85515d7348 · **Pedido em:** 2026-10-21 19:26 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "Ao lado do botão de nome abrir votação, no login do professor, crie um botão de nome sortear perguntas. Ao clicar nele, deve abrir um modal [...] a quantidade de pergunta que vai ser sorteada deve ser pega da quantidade de aluno que está na equipe. A quantidade de pergunta deve ser sorteada com o número entre 1 e o máximo total de pergunta da atividade."
**Objetivo:** o professor sorteia, para uma equipe, perguntas da atividade (números de 1 ao total), na quantidade de alunos da equipe, sem repetir entre equipes, e o resultado fica gravado.

### Escopo (respostas do usuário em 2026-10-21 19:26)

- **Onde:** em **toda atividade que tem o botão "Abrir votação"**, só para o professor, ao lado dele.
- **Modal:** o professor **escolhe uma equipe**; a quantidade vem preenchida com o **número de alunos
  da equipe** e o professor **pode mudar** (de 1 até o total de perguntas da atividade).
- **Sorteio:** números de **1 ao total de perguntas** da atividade, **sem repetir na equipe e nem
  entre equipes** da mesma atividade (enquanto houver perguntas livres; se não houver perguntas
  livres suficientes, avisar o professor).
- **Guardar:** o resultado é **gravado no banco** por atividade e equipe; professor e alunos da
  equipe veem depois (recarregar não perde).
- **Não entra:** mudar a votação existente; nota.

### Riscos

- Banco (tabela nova com RLS: professor grava; aluno só lê o sorteio da própria equipe) → tarefa
  grande: plano + aprovação.
- "Sem repetir entre equipes" com dois professores sorteando ao mesmo tempo → garantir no banco
  (função ou restrição única por atividade + pergunta).

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 19:26 | Toda atividade com "Abrir votação"; uma equipe por vez; quantidade editável; sem repetir nem entre equipes; gravar no banco | Usuário |

### #339.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** achar o botão "Abrir votação" e o cadastro de equipes (ex.: `database/2026-10-20-equipe-atividade.sql`), escrever o plano nesta etapa e mostrar ao usuário.

- **Nível:** PESADO — banco, RLS e mais de 3 arquivos ligados
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** plano (tabela, função de sorteio, telas, verificação) e "sim" do usuário.
- **Entrega:** — · **Verificação:** —

### #339.2 — Banco: tabela do sorteio por equipe e função de sortear sem repetir

**Próximo passo:** esperar a #339.1.

- **Nível:** PESADO — banco (tabela, RLS, função)
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro
- **Critérios de aceitação:** SQL idempotente aplicado e conferido; não repete pergunta na atividade.
- **Entrega:** — · **Verificação:** —

### #339.3 — Professor: botão "Sortear perguntas" + modal (equipe, quantidade, resultado)

**Próximo passo:** esperar a #339.2.

- **Nível:** MEDIO — tela com lógica
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** botão ao lado de "Abrir votação" só para professor; quantidade vem da
  equipe e pode mudar (1 ao total); mostra e grava o sorteio; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.4 — Aluno: ver as perguntas sorteadas da própria equipe

**Próximo passo:** esperar a #339.2.

- **Nível:** MEDIO — tela com lógica
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** o aluno vê só o sorteio da equipe dele; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.5 — Documentação (`docs/regras/atividades.md`, `docs/database.md`)

**Próximo passo:** esperar a #339.3 e a #339.4.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
