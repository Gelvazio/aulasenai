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
- **Rodada da equipe (acrescentado em 2026-10-21 19:32):** depois do sorteio, um **contador de 2 minutos**
  na tela de todos (professor e alunos) para a equipe decidir quem responde cada pergunta; ao
  acabar, começa sozinho **1 minuto por pergunta**, com o **número da pergunta piscando** na tela;
  o aluno daquela pergunta responde falando.
- **Votação (acrescentado em 2026-10-21 19:32):** enquanto um aluno responde, ele fica habilitado na votação
  para os **demais alunos votarem nota de 1 a 10**; **alunos da equipe não votam**.
- **Visual futurista (acrescentado em 2026-10-21 19:32):** telas do sorteio, contadores e votação no estilo do
  prompt `prompts/VISUAL-FUTURISTA.md` do repositório `rules-ai` (fundo escuro, neon ciano/magenta/
  violeta, Orbitron + Share Tech Mono, `prefers-reduced-motion`, contraste e foco visível).
- **Não entra:** mudar a votação existente além do item acima.

### Riscos

- Banco (tabela nova com RLS: professor grava; aluno só lê o sorteio da própria equipe) → tarefa
  grande: plano + aprovação.
- "Sem repetir entre equipes" com dois professores sorteando ao mesmo tempo → garantir no banco
  (função ou restrição única por atividade + pergunta).

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 19:26 | Toda atividade com "Abrir votação"; uma equipe por vez; quantidade editável; sem repetir nem entre equipes; gravar no banco | Usuário |
| 2026-10-21 19:32 | Acrescentadas as subtarefas #339.6 a #339.10: contador de 2 min, 1 min por pergunta com número piscando, banco de "quem responde" e votos, votação 1–10 sem a equipe, visual futurista | Usuário |

### #339.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** achar o botão "Abrir votação" e o cadastro de equipes (ex.: `database/2026-10-20-equipe-atividade.sql`), escrever o plano nesta etapa e mostrar ao usuário.

- **Nível:** PESADO — banco, RLS e mais de 3 arquivos ligados
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** plano (tabela, função de sorteio, horário de início do sorteio para os
  contadores, quem responde cada pergunta, votos 1–10, telas, verificação) e "sim" do usuário.
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

### #339.6 — Contador de 2 minutos na tela de todos depois do sorteio

**Próximo passo:** esperar a #339.2.

- **Nível:** MEDIO — tela com lógica (professor e aluno), tempo calculado pelo horário gravado no sorteio
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** assim que uma equipe é sorteada, aparece para todos um contador de 2:00 para a
  equipe decidir quem responde cada pergunta; recarregar a página não reinicia o contador.
- **Critérios de aceitação:** professor e alunos veem o mesmo tempo; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.7 — 1 minuto por pergunta, com o número da pergunta piscando

**Próximo passo:** esperar a #339.6.

- **Nível:** MEDIO — tela com lógica (sequência de contadores)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** ao terminar os 2 minutos, começa sozinho 1 minuto para cada pergunta sorteada,
  na ordem; a pergunta da vez aparece com o número piscando; o aluno dela responde falando.
- **Critérios de aceitação:** troca de pergunta automática; piscar desligado com
  `prefers-reduced-motion`; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.8 — Banco: quem responde cada pergunta e votos de 1 a 10

**Próximo passo:** esperar a #339.1.

- **Nível:** PESADO — banco (tabelas/colunas, RLS: aluno da equipe não vota, 1 voto por aluno por resposta)
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro
- **Critérios de aceitação:** SQL idempotente aplicado e conferido; voto só de 1 a 10; o banco
  recusa voto de aluno da própria equipe e voto repetido.
- **Entrega:** — · **Verificação:** —

### #339.9 — Votação: habilitar quem está respondendo; os outros alunos dão nota de 1 a 10

**Próximo passo:** esperar a #339.7 e a #339.8.

- **Nível:** MEDIO — tela com lógica (parte de votação da equipe)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** durante o minuto de cada pergunta, o aluno que responde aparece habilitado na
  votação; os alunos de fora da equipe dão nota de 1 a 10; os da equipe não veem o voto.
- **Critérios de aceitação:** só fora da equipe vota; 1 voto por resposta; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.10 — Visual futurista nas telas do sorteio, contadores e votação

**Próximo passo:** esperar a #339.3.

- **Nível:** MEDIO — CSS/HTML de várias telas seguindo o prompt
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** aplicar `prompts/VISUAL-FUTURISTA.md` do `rules-ai` (na nuvem: repositório
  `Gelvazio/rules-ai`): tokens em `:root`, cartões com borda neon, Orbitron/Share Tech Mono,
  grade de fundo, animações desligadas com `prefers-reduced-motion`, foco visível, 1 coluna até 720 px.
- **Critérios de aceitação:** sem `style` inline; contraste legível; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #339.5 — Documentação (`docs/regras/atividades.md`, `docs/database.md`)

**Próximo passo:** esperar a #339.3, #339.4, #339.6, #339.7, #339.9 e #339.10.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
