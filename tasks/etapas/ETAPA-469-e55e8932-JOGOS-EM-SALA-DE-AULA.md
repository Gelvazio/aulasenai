## Etapa 469-e55e8932 — Jogos em sala de aula (além do pergunta-resposta)

**Tarefa:** #340-e55e8932-3a82-4261-8c6f-83eeaddb5c88 · **Pedido em:** 2026-10-21 20:44 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "Além desse jogo no modelo pergunta-resposta, você tem sugestão de mais algum tipo de jogo para ser feito em sala de aula?" → "Crie a tarefa 340, com todas estas sugestões como subtarefas"
**Objetivo:** oferecer ao professor 12 tipos de jogo para a sala de aula, reaproveitando a estrutura da #339 (sorteio, cronômetro, equipes, votação, placar, visual futurista).

### Escopo

- **Entra:** os 12 jogos (#340.3 a #340.14), uma base comum no banco (#340.2) e a documentação.
- **Reaproveitar a #339** onde couber (equipes, cronômetro, votação, placar, pódio, visual
  futurista e cuidados de 3D); os jogos 6, 7, 8, 9, 11 e 14 são os que mais aproveitam.
- **Conteúdo dos jogos só no banco** (regra de `atividades-banco.md`): nada de pergunta,
  resposta ou gabarito em arquivo nem no navegador; página global por tipo de jogo, recebendo o id.
- **Atividades e cenários:** "você como aluno consultor", sem empresa fictícia.
- **Não entra:** a própria #339 (tarefa separada).

### Riscos

- Escopo grande (12 jogos) → cada jogo é uma subtarefa independente; o plano (#340.1) define a
  ordem e o que é comum.
- Gabarito exposto em jogo de arrastar/ligar → a conferência do acerto é feita no banco.

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 20:44 | Tarefa criada com as 12 sugestões como subtarefas, livre para outra IA | Usuário |

### #340.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** ler a etapa da #339 (`ETAPA-468-*`), definir a base comum dos jogos, a ordem e o que cada jogo reaproveita; mostrar ao usuário.

- **Nível:** PESADO — arquitetura e banco
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** plano nesta etapa e "sim" do usuário em Decisões.
- **Entrega:** — · **Verificação:** —

### #340.2 — Banco: base comum dos jogos (partidas, conteúdo, pontuação, conferência do acerto)

**Próximo passo:** esperar a #340.1.

- **Nível:** PESADO — banco (tabelas, RLS, funções de conferência sem expor gabarito)
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Critérios de aceitação:** SQL idempotente aplicado e conferido; aluno nunca lê o gabarito.
- **Entrega:** — · **Verificação:** —

### #340.3 — Jogo "Simulador de cenário (aluno consultor)"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** situação da área (ex.: estoque com falta de itens); a cada rodada o aluno escolhe uma ação e vê a consequência (custo, prazo, satisfação); vence o melhor indicador. Regra "você como aluno consultor" (sem empresa fictícia).
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.4 — Jogo "Escape room digital"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** a equipe resolve uma sequência de desafios curtos (fórmula, código, classificação, cálculo); cada acerto abre o "cadeado" da próxima sala, contra o relógio.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.5 — Jogo "Linha de produção"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** cada aluno da equipe faz uma etapa de um processo (receber → conferir → armazenar → expedir); o erro de uma etapa passa para a próxima e a equipe precisa achar e corrigir.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.6 — Jogo "Ordenar o processo (cartas arrastáveis)"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** cartas embaralhadas com os passos de um procedimento (inventário, planilha, deploy); a equipe arrasta para a ordem certa.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.7 — Jogo "Ligar os pares"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** conceito ↔ definição, função ↔ uso, sigla ↔ significado, com tempo e pontos por sequência de acertos.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.8 — Jogo "Classificar em caixas"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** arrastar itens para categorias (curva ABC, tipos de dado, hardware × software, ativo × passivo).
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.9 — Jogo "Detetive do erro"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** a tela mostra planilha, código, documento ou layout com erros escondidos; a equipe marca o maior número de erros no tempo.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.10 — Jogo "Caça ao QR Code na sala"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** QR Codes espalhados pela sala levam a mini desafios; a equipe que completa a trilha primeiro vence (combina com rastreio em logística).
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.11 — Jogo "Bingo de conceitos"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** cada aluno recebe uma cartela de termos; o professor lê definições; quem completa a linha grita "Bingo!" e explica um dos termos.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.12 — Jogo "Leilão de respostas"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** as equipes recebem moedas virtuais e dão lances para responder as perguntas que acham que sabem; acerto devolve o dobro, erro perde o lance.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.13 — Jogo "Batalha naval do conteúdo"

**Próximo passo:** esperar a #340.2.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** tabuleiro com perguntas nas casas; acertar a pergunta = acertar o tiro no navio da outra equipe.
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.14 — Jogo "Pitch relâmpago"

**Próximo passo:** esperar a #340.2, #339.9.

- **Nível:** MEDIO — tela com lógica (página global do jogo, recebe o id)
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** cada equipe tem 3 minutos para apresentar uma solução para um problema da área; a turma vota de 1 a 10 (reaproveita a votação da #339).
- **Critérios de aceitação:** sem gabarito na tela; conteúdo vindo do banco; versão simples no celular; `node --check` ok; conferir na tela.
- **Entrega:** — · **Verificação:** —

### #340.15 — Documentação dos jogos (`docs/regras/atividades.md`, `docs/database.md`)

**Próximo passo:** esperar a #340.3 a #340.14.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
