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
- **Cuidados para 3D e jogos (acrescentado em 2026-10-21 20:36, valem para #339.22 a #339.31):**
  - Three.js só por CDN (versão fixa) e carregado **só nas telas de jogo**, sem pesar nas demais páginas.
  - Sempre uma **versão simples, sem 3D**, usada em celular fraco, sem WebGL e com
    `prefers-reduced-motion: reduce`.
  - ⛔ **Gabarito nunca vai para a tela** (resposta esperada e critérios), nem dentro do 3D ou dos jogos.
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
| 2026-10-21 19:35 | Enunciado da pergunta da vez ao lado do cronômetro (#339.7); todas as 10 sugestões de gamificação viram as subtarefas #339.11 a #339.20 | Usuário |
| 2026-10-21 20:26 | Etapa final #339.21: a atividade gamificada vira **modelo global** para toda atividade discursiva ou prática; em cada aula o professor escolhe usar ou não e se é **com equipe ou sem equipe** | Usuário |
| 2026-10-21 20:31 | Modo **sem equipe** e escolhas da #339.21 (respostas uma a uma): sorteia **aluno + 1 pergunta**; **sem** os 2 min de preparo (vai direto ao 1 min); votam **todos menos quem responde**; aluno já sorteado só volta **depois que todos forem**; só **presentes** (sem "Faltou?"); votos na nota = **o professor decide** por aula/atividade; liga/desliga e com/sem equipe **na página da atividade e no modal da aula**; a escolha vale para **todas as turmas** | Usuário |
| 2026-10-21 20:36 | Acrescentadas #339.22 a #339.31 (5 ideias com Three.js e 5 tipos de jogo; a ideia de "missões da semana" ficou de fora) e os cuidados de 3D/jogos no Escopo | Usuário |
| 2026-10-21 20:39 | Acrescentadas #339.32 a #339.43 (aposta, reações, pergunta da plateia, nome/brasão, combo, capitão, cartas do professor, modo projetor, resumo em PDF, antiabuso, fila de votos, leitura em voz alta) | Usuário |

### #339.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** achar o botão "Abrir votação" e o cadastro de equipes (ex.: `database/2026-10-20-equipe-atividade.sql`), escrever o plano nesta etapa e mostrar ao usuário.

- **Nível:** PESADO — banco, RLS e mais de 3 arquivos ligados
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** plano (tabela, função de sorteio, horário de início do sorteio para os
  contadores, quem responde cada pergunta, votos 1–10, gamificação #339.11–#339.20, 3D e jogos #339.22–#339.31, extras #339.32–#339.43, modelo global #339.21, telas,
  verificação) e "sim" do usuário.
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
  **Junto do cronômetro aparece o enunciado da pergunta** que o aluno sorteado está respondendo
  (pedido em 2026-10-21 19:35), na tela de todos; ⛔ nunca a resposta esperada nem os critérios (gabarito).
- **Critérios de aceitação:** troca de pergunta automática; enunciado da pergunta da vez visível
  ao lado do cronômetro, sem gabarito; piscar desligado com
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

### #339.11 — Placar ao vivo das equipes

**Próximo passo:** esperar a #339.9.

- **Nível:** MEDIO — tela com lógica (ranking pela média dos votos)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** ranking das equipes pela média dos votos, na tela de todos, atualizando a cada resposta.
- **Critérios de aceitação:** conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.12 — Medalhas: melhor resposta da rodada, resposta relâmpago e equipe completa

**Próximo passo:** esperar a #339.9.

- **Nível:** MEDIO — tela com lógica (cálculo a partir dos votos e tempos gravados)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** "Melhor resposta da rodada" (maior média), "Resposta relâmpago" (encerrou bem antes do minuto, se o tempo for gravado) e "Equipe completa" (todos responderam).
- **Critérios de aceitação:** conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.13 — Roleta animada no sorteio

**Próximo passo:** esperar a #339.3.

- **Nível:** MEDIO — tela com animação
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** os números giram antes de parar nas perguntas sorteadas (desligado com `prefers-reduced-motion`).
- **Critérios de aceitação:** conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.14 — Pergunta bônus (vale em dobro)

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (marca de bônus no sorteio) e regra de pontuação
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** uma das perguntas sorteadas vale em dobro no placar e aparece com destaque especial.
- **Critérios de aceitação:** conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.15 — "Passa a vez": a equipe troca 1 pergunta por outra sorteada na hora

**Próximo passo:** esperar a #339.2.

- **Nível:** PESADO — banco (função de troca sem repetir, 1 vez por equipe)
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** uma vez por equipe, troca uma pergunta por outra sorteada, respeitando o "sem repetir".
- **Critérios de aceitação:** conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.16 — Votação às cegas (média só depois que todos votam)

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco/RLS (esconder votos e média até o fim da votação)
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** ninguém vê a média nem os votos dos outros até a votação daquela resposta terminar.
- **Critérios de aceitação:** conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.17 — Comentário rápido no voto vira selo do aluno ("Clara", "Completa", "Criativa")

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (coluna no voto) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** além da nota, o votante toca num elogio; os elogios viram selos do aluno que respondeu.
- **Critérios de aceitação:** conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.18 — Pódio final: 3 melhores equipes e 3 melhores alunos

**Próximo passo:** esperar a #339.11.

- **Nível:** MEDIO — tela com animação a partir do placar
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** no fim da atividade, pódio animado com as 3 melhores equipes e os 3 melhores alunos.
- **Critérios de aceitação:** conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.19 — Som de alerta nos últimos 10 segundos (pode desligar)

**Próximo passo:** esperar a #339.7.

- **Nível:** MEDIO — tela (áudio + preferência do usuário)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** bip nos últimos 10 segundos de cada contador, com botão para desligar (preferência guardada no navegador).
- **Critérios de aceitação:** conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.20 — Histórico de desempenho: média dos votos do aluno nas atividades

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (consulta entre atividades com RLS) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** cada aluno vê a própria média de votos ao longo das atividades; o professor vê a da turma.
- **Critérios de aceitação:** conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.22 — Roleta 3D do sorteio (globo de bingo com Three.js)

**Próximo passo:** esperar a #339.13.

- **Nível:** MEDIO — tela com biblioteca 3D
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** esfera/globo de números que gira e solta as bolinhas sorteadas; substitui a roleta da #339.13 quando o 3D estiver disponível.
- **Critérios de aceitação:** versão sem 3D funcionando (celular fraco, sem WebGL, `prefers-reduced-motion`); Three.js só por CDN e só nesta tela; sem gabarito na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.23 — Arena das equipes em 3D (torres/naves que crescem com a média dos votos)

**Próximo passo:** esperar a #339.11.

- **Nível:** MEDIO — tela com biblioteca 3D
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** cada equipe é uma torre ou nave 3D que cresce conforme a média; o placar ao vivo vira corrida visual.
- **Critérios de aceitação:** versão sem 3D funcionando (celular fraco, sem WebGL, `prefers-reduced-motion`); Three.js só por CDN e só nesta tela; sem gabarito na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.24 — Pódio 3D com luzes neon e confete

**Próximo passo:** esperar a #339.18.

- **Nível:** MEDIO — tela com biblioteca 3D
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** os 3 primeiros sobem num pódio 3D com luzes neon e confete em partículas, no visual futurista.
- **Critérios de aceitação:** versão sem 3D funcionando (celular fraco, sem WebGL, `prefers-reduced-motion`); Three.js só por CDN e só nesta tela; sem gabarito na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.25 — Cronômetro holográfico 3D

**Próximo passo:** esperar a #339.7.

- **Nível:** MEDIO — tela com biblioteca 3D
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** anel 3D que vai se apagando e muda de cor nos últimos 10 segundos.
- **Critérios de aceitação:** versão sem 3D funcionando (celular fraco, sem WebGL, `prefers-reduced-motion`); Three.js só por CDN e só nesta tela; sem gabarito na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.26 — Mapa de conquistas 3D ("galáxia" das perguntas respondidas)

**Próximo passo:** esperar a #339.9.

- **Nível:** MEDIO — tela com biblioteca 3D
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** cada pergunta respondida acende um planeta/nó numa rede 3D; no fim da aula a turma vê a galáxia.
- **Critérios de aceitação:** versão sem 3D funcionando (celular fraco, sem WebGL, `prefers-reduced-motion`); Three.js só por CDN e só nesta tela; sem gabarito na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.27 — Jogo "Duelo": duas equipes ou dois alunos na mesma pergunta; a turma vota na melhor

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (duelo e voto comparativo) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** duas equipes (ou dois alunos) respondem a mesma pergunta e a turma vota em qual resposta foi melhor.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.28 — Jogo "Desafio": a equipe que respondeu escolhe a próxima equipe e a pergunta

**Próximo passo:** esperar a #339.2.

- **Nível:** PESADO — banco (escolha registrada, sem repetir pergunta) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** a equipe que acabou de responder escolhe a próxima equipe e o número da pergunta dela, mantendo o "sem repetir".
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.29 — Jogo "Batata quente": tempo dividido entre os membros da equipe

**Próximo passo:** esperar a #339.7.

- **Nível:** MEDIO — tela com lógica (sequência de tempos)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** o tempo da pergunta é dividido entre os membros e cada um completa a resposta do anterior.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.30 — Jogo "Caça ao tesouro por pistas": a pergunta aparece em pedaços; responder cedo vale mais

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (pontuação pelo momento da resposta) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** o enunciado aparece em partes, uma a cada 15 segundos; quem responde com menos pistas ganha mais pontos.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.31 — Jogo "Rodada relâmpago": 5 perguntas de 20 s, uma pessoa por equipe

**Próximo passo:** esperar a #339.2.

- **Nível:** MEDIO — tela com lógica (sorteio já existente + tempos)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** no fim da aula, 5 perguntas de 20 segundos cada, uma pessoa por equipe.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.32 — Aposta de confiança: a turma aposta se a média vai passar de 7

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (apostas e pontos de "olheiro") + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** antes de a resposta começar, os alunos apostam se o aluno vai tirar média acima de 7; quem acerta ganha pontos de olheiro.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.33 — Reação ao vivo com emojis durante a resposta

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (reações compartilhadas entre telas) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** botões 👏 🔥 🤔 durante a resposta; as reações aparecem flutuando na tela do professor (e no modo projetor).
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.34 — Pergunta da plateia: aluno de fora da equipe faz 1 pergunta extra de 30 s

**Próximo passo:** esperar a #339.7.

- **Nível:** MEDIO — tela com lógica (sorteio entre presentes de fora da equipe + tempo)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** depois da resposta, um aluno presente de fora da equipe é sorteado para fazer uma pergunta extra de 30 segundos.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.35 — Nome, cor e brasão da equipe

**Próximo passo:** esperar a #339.2.

- **Nível:** PESADO — banco (campos da equipe, RLS) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** cada equipe escolhe nome, cor e ícone, mostrados no placar, na arena e no pódio.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.36 — Combo de equipe: todos com média ≥ 8 → ×1,5 no placar da rodada

**Próximo passo:** esperar a #339.11.

- **Nível:** MEDIO — tela com lógica (cálculo no placar)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** se todos os membros da equipe tiverem média ≥ 8 na rodada, a pontuação da rodada vale ×1,5.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.37 — Ajuda do capitão: 15 s para completar a resposta de um colega, 1 vez por rodada

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (capitão da equipe e uso único) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** a equipe tem um capitão que, uma vez por rodada, completa por 15 segundos a resposta de um colega.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.38 — Cartas do professor: tempo extra +30 s, pergunta em dobro, troca de pergunta

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (cartas usadas e efeitos) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** o professor ativa cartas na hora; o efeito vale para todos (tempo, pontuação ou troca sem repetir).
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.39 — Modo projetor: tela limpa em tela cheia para o datashow

**Próximo passo:** esperar a #339.7.

- **Nível:** MEDIO — tela (layout dedicado)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** só cronômetro, enunciado, número piscando e placar, em tela cheia e letras grandes.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.40 — Resumo da aula exportável em PDF SENAI

**Próximo passo:** esperar a #339.12.

- **Nível:** MEDIO — tela + exportação (padrão PDF SENAI do projeto)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** no fim: perguntas sorteadas, quem respondeu, médias, medalhas e tempo usado; exporta em PDF no padrão SENAI.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; PDF sem gabarito.
- **Entrega:** — · **Verificação:** —

### #339.41 — Antiabuso na votação: avisar o professor de votos sempre 1 ou sempre 10

**Próximo passo:** esperar a #339.8.

- **Nível:** PESADO — banco (consulta de padrões de voto, só professor) + tela
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** detecta e avisa o professor sobre alunos que votam sempre 1 ou sempre 10, sem bloquear o voto.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.42 — Fila de votos sem internet: guarda e envia quando voltar, dentro do tempo

**Próximo passo:** esperar a #339.9.

- **Nível:** MEDIO — tela com lógica (fila no navegador; o banco recusa fora do prazo)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** se a internet do aluno cair, o voto fica guardado e é enviado quando voltar, se ainda estiver no tempo da votação.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok; sem dado sensível guardado no navegador.
- **Entrega:** — · **Verificação:** —

### #339.43 — Leitura em voz alta do enunciado (liga/desliga)

**Próximo passo:** esperar a #339.7.

- **Nível:** MEDIO — tela (fala do navegador)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** botão para ler o enunciado da pergunta em voz alta pelo navegador; preferência lembrada no navegador.
- **Critérios de aceitação:** sem gabarito na tela; conferir na tela; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #339.21 — Modelo global: atividade gamificada em toda discursiva ou prática, com ou sem equipe

**Próximo passo:** esperar a #339.2 a #339.4 e a #339.6 a #339.20 e #339.22 a #339.43.

- **Nível:** PESADO — arquitetura (recurso global para todas as matérias), banco (escolha por aula/atividade) e mais de 3 arquivos
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (parte de banco: só Claude Code local)
- **Descrição:** tudo o que a #339 criou (sorteio, contadores, pergunta na tela, votação 1–10,
  gamificação e visual futurista) vira um **modelo único** que funciona em **toda atividade do
  tipo discursiva ou prática**, de qualquer matéria, sem copiar código por atividade (regra de
  layout global de `atividades-banco.md`). Em cada aula/atividade o professor **escolhe**:
  usar ou não a atividade gamificada, e **com equipe** (sorteio por equipe, como na #339) ou
  **sem equipe** (individual: sorteia um aluno presente + 1 pergunta, sem preparo, 1 min para
  responder, votam todos menos ele, ninguém repete até todos irem). O professor também escolhe se
  a média dos votos conta na nota. As escolhas ficam na página da atividade e no modal da aula e
  valem para todas as turmas (ver Decisões). Pedido em 2026-10-21 20:26: "Essa etapa final deve servir como template para todas as outras
  tarefas que tiver pergunta do tipo discursiva ou prática. Dessa forma, nas aulas eu posso
  escolher fazer equipe ou não para pegar e passar essa atividade gamificada na aula."
- **Critérios de aceitação:** ligar/desligar e "com/sem equipe" por aula/atividade, só professor
  (RLS); funciona em pelo menos uma discursiva e uma prática de matérias diferentes; nenhuma
  página nova por atividade; `node --check` ok; SQL idempotente aplicado e conferido.
- **Entrega:** — · **Verificação:** —

### #339.5 — Documentação (`docs/regras/atividades.md`, `docs/database.md`)

**Próximo passo:** esperar todas as outras subtarefas da #339.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
