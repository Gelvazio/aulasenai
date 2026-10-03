# Introdução

### Apresentação

Toda interface web chega ao usuário depois de alguém confirmar que ela faz o que foi pedido. Esta
apostila acompanha a unidade curricular **Testes de Front-End** e ensina a planejar, escrever,
automatizar e acompanhar testes do lado do cliente: do caso de teste escrito à suíte automatizada
com Vitest, Testing Library e Cypress/Playwright, rodando sozinha num pipeline de integração
contínua. Ela prepara você para a UC Projeto de Front-End, que cobra planos de teste completos.

Os exemplos acontecem na **Loja Nuvem Azul**, uma startup **fictícia** de comércio eletrônico
feita em React, com cadastro, login, catálogo, carrinho e checkout — o tipo de aplicação que você
vai testar no trabalho de técnico em informática para internet.

### Objetivo geral da unidade curricular

**Função:** produzir interfaces para internet, de acordo com metodologia e padrões de qualidade,
usabilidade, interatividade, robustez, acessibilidade e segurança da informação.

**Objetivo geral:** Propiciar desenvolvimento de capacidades básicas e socioemocionais para
codificação de interfaces baseadas em UX e UI em aplicações web, considerando as necessidades do
usuário.

### Como a apostila está organizada

Cada capítulo corresponde a uma aula de 4 horas e tem sempre as mesmas partes:

| Parte | O que você encontra |
|---|---|
| 🎯 Capacidades | O que você vai desenvolver no capítulo |
| 📖 Teoria e exemplos | Conceitos e código de exemplo na Loja Nuvem Azul |
| 🎬 Vídeos | Vídeos curtos do YouTube (no máximo 15 minutos) para revisar o tema |
| 📌 Resumo | Os pontos principais para estudar antes da avaliação |
| ✍️ Exercícios | Questões no padrão ITEM (Capacidade, Contexto, Comando e Resposta) |

A suíte de testes cresce como uma **pirâmide**: muitos testes unitários na base (capítulos 3 e 8),
testes de integração no meio (capítulos 4 e 5), poucos testes de ponta a ponta no topo
(capítulo 6) e, atravessando tudo, métricas e integração contínua (capítulos 7 e 9). O
**glossário**, no início da apostila, reúne os termos técnicos de todos os capítulos.

### Como estudar com esta apostila

- Leia a teoria antes ou logo depois da aula e **rode os exemplos de código** no seu computador.
- Assista aos vídeos e anote dúvidas para levar ao professor.
- Revise o resumo e consulte o glossário sempre que encontrar um termo novo.
- Responda os exercícios explicando **o porquê** das suas decisões de teste.
- Os exercícios podem ser impressos separadamente pelo botão **Exportar PDF** ao lado do título
  de cada seção de exercícios.

### Ferramentas que você vai usar

Node.js e npm, VS Code, Vitest, Testing Library, Cypress e Playwright, Lighthouse e axe-core,
Git/GitHub e GitHub Actions. Todas são gratuitas; o professor fornece um projeto-base pronto.

### Como você será avaliado

| Instrumento | Momento | Peso | Critérios |
|---|---|---|---|
| Avaliação contínua: entregas das aulas 1–9 e SAs 1 e 2 | Aulas 1–9 | 60% | Correção, completude, organização do repositório, prazo |
| Avaliação prática: suíte de testes para aplicação fornecida | Aula 10 | 25% | Unitários (≥ 5 casos) · integração · E2E (≥ 3 fluxos) · cobertura ≥ 70% · execução no CI |
| Avaliação objetiva: conceitos, técnicas, tipos e processo de teste | Aula 10 | 15% | Acertos; questões no formato capacidade → contexto → comando |

**Nota final** = 60% contínua + 25% prática + 15% objetiva. **Aprovação:** nota final **≥ 7,0** e
presença mínima de 75%. Além da nota, cada capacidade recebe o parecer Desenvolvida / Em
desenvolvimento / Não desenvolvida.

| Nível | Nota | O que significa |
|---|---|---|
| Excelente | 9 a 10 | Plano rastreável, testes legíveis pelo comportamento, suíte estável no CI, decisões justificadas |
| Bom | 7 a 8 | Testes corretos e passando, com pequenas falhas de nomenclatura, cobertura ou documentação |
| Aceitável | 5 a 6 | Cumpre o essencial com orientação; lacunas de casos de borda ou testes frágeis |
| Insuficiente | 0 a 4 | Testes que não rodam, não validam requisito ou plano ausente |

**Recuperação:** refazer a avaliação não atingida (prática com outra aplicação, objetiva com novo
banco de questões), retomando só as capacidades pendentes, conforme o regimento da unidade SENAI.

### Ambientes, recursos e acessibilidade

As aulas acontecem no **laboratório de informática**, na biblioteca, na sala de aula e no AVA com
recursos de interatividade. Usaremos kit multimídia, computador com acesso à internet, sistemas
operacionais, pacote de aplicativos de escritório e **IDE para desenvolvimento de testes**, além de
livros, apostilas, revistas especializadas, manuais, normas e catálogos técnicos.

**Acessibilidade:** asseguradas as condições de acessibilidade ao aluno com impedimentos de longo
prazo (Lei nº 13.146/2015, LDB nº 9394/96). Se precisar, peça ao professor zoom e alto contraste na
IDE, leitor de tela, projeto-base pronto, tempo estendido ou trabalho em duplas.

### Situações de aprendizagem

- **SA 1 — Estruturação e documentação de testes (aulas 1, 2 e 10):** a Loja Nuvem Azul não tem
  estratégia de testes. Para autenticação, carrinho e checkout, você entrega um plano formal,
  casos de teste (caminho feliz e casos de borda), matriz de rastreabilidade, estimativa de esforço
  e análise de riscos.
- **SA 2 — Pipeline de integração contínua e cobertura (aulas 7 a 9):** a equipe roda os testes à
  mão antes de publicar e não sabe quanto do código está coberto. Você cria um fluxo automático que
  roda a suíte a cada envio de código, bloqueia a junção com teste falhando ou cobertura abaixo de
  70% e documenta como rodar e contribuir.
