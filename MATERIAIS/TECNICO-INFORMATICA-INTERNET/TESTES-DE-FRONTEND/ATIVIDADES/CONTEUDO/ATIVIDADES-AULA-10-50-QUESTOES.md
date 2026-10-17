# Atividade: Projeto Prático Integrador Suíte de Testes — 50 Questões

- **Aula:** 10
- **Tema:** Projeto Prático Integrador Suíte de Testes
- **Ícone:** 🏁
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer especificações e requisitos, planejar, aplicar e desenvolver a suíte de testes completa do projeto integrador: o processo fundamental de teste (7.1 a 7.5), a escolha dos casos pelo risco, a organização da suíte em pastas e scripts (6.3), as metas de qualidade da avaliação prática, o TESTING.md com fora do escopo justificado, o code review cruzado com a equipe de testes (2.4) e a avaliação da UC.
- **Conteúdo-base:** ../CONTEUDO/AULA-10-PROJETO-INTEGRADOR-SUITE-DE-TESTES.md
- **Slides:** ../AULAS/AULA-10-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-10-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Ordem do Processo

- **Capacidade:** C3

**Comando:**  
Qual é a ordem correta das etapas do processo fundamental de teste?

**Alternativas:**
- A) Desenho, avaliação, planejamento, execução, monitoração.
- B) Planejamento, desenho, execução, monitoração e controle, avaliação dos resultados.
- C) Execução, planejamento, avaliação, desenho, monitoração.
- D) Avaliação, execução, desenho, planejamento, monitoração.

**Gabarito:** B

---

## ITEM 02 — Planejamento no Projeto

- **Capacidade:** C3

**Comando:**  
No projeto integrador, o que é feito no planejamento (7.1)?

**Alternativas:**
- A) Publicar a loja antes dos testes.
- B) Escrever os testes E2E sem plano.
- C) Calcular a nota final da UC.
- D) Atualizar o plano e a matriz de rastreabilidade da SA 1.

**Gabarito:** D

---

## ITEM 03 — Desenho dos Testes

- **Capacidade:** C3

**Comando:**  
No projeto integrador, o que é feito no desenho dos testes (7.2)?

**Alternativas:**
- A) Escolher os casos por risco: caminho feliz e bordas.
- B) Desenhar o logotipo da loja.
- C) Rodar a suíte três vezes.
- D) Escrever o badge no README.

**Gabarito:** A

---

## ITEM 04 — Execução no Projeto

- **Capacidade:** C3

**Comando:**  
O que compõe a execução dos testes (7.3) no projeto integrador?

**Alternativas:**
- A) Somente o cálculo da cobertura.
- B) Somente testes manuais no navegador.
- C) Somente a leitura do código pelo professor.
- D) Unitários com Vitest, integração com Testing Library e MSW, e E2E.

**Gabarito:** D

---

## ITEM 05 — Monitoração no Projeto

- **Capacidade:** C3

**Comando:**  
O que é acompanhado na monitoração e controle (7.4) do projeto?

**Alternativas:**
- A) O nome dos integrantes da dupla.
- B) Cobertura, testes instáveis e checks do pipeline.
- C) A cor dos botões da vitrine.
- D) O número de seguidores da loja nas redes sociais.

**Gabarito:** B

---

## ITEM 06 — Avaliação no Projeto

- **Capacidade:** C3

**Comando:**  
Onde fica registrada a avaliação dos resultados (7.5) do projeto?

**Alternativas:**
- A) No arquivo .gitignore.
- B) No TESTING.md, com resultado, fora do escopo e recomendação.
- C) Em um comentário dentro do vitest.config.js.
- D) Somente na memória da equipe.

**Gabarito:** B

---

## ITEM 07 — Prioridade na Black Friday

- **Capacidade:** C3

**Comando:**  
Com só uma tarde para testar a loja, o que testar primeiro?

**Alternativas:**
- A) As cores do rodapé.
- B) Nada, porque o prazo é curto demais.
- C) A jornada vitrine → carrinho → checkout → confirmação, onde está o dinheiro.
- D) A página "Sobre nós", por ser a mais fácil.

**Gabarito:** C

---

## ITEM 08 — Segundo Alvo

- **Capacidade:** C3

**Comando:**  
Depois da jornada de compra, por que testar o cupom?

**Alternativas:**
- A) Porque é onde estão os defeitos mais comuns.
- B) Porque ninguém usa cupom na Black Friday.
- C) Porque não tem nenhuma regra de negócio.
- D) Porque é a parte mais bonita da loja.

**Gabarito:** A

---

## ITEM 09 — Fora do Escopo na Loja

- **Capacidade:** C3

**Comando:**  
Qual parte da loja pode ficar fora do escopo, pelo baixo risco?

**Alternativas:**
- A) O carrinho.
- B) O cupom de desconto.
- C) A página "Sobre nós".
- D) O checkout.

**Gabarito:** C

---

## ITEM 10 — Caso de Borda

- **Capacidade:** C3

**Comando:**  
Qual destes é um caso de borda do cupom?

**Alternativas:**
- A) Compra sem nenhum cupom.
- B) Página inicial carregando normalmente.
- C) Total exatamente igual ao valor mínimo do cupom.
- D) Total muito maior que o valor mínimo.

**Gabarito:** C

---

## ITEM 11 — Ferramenta dos Unitários

- **Capacidade:** C5

**Comando:**  
Qual ferramenta a suíte usa nos testes unitários?

**Alternativas:**
- A) GitHub Actions.
- B) Cypress.
- C) Vitest.
- D) Lighthouse.

**Gabarito:** C

---

## ITEM 12 — Ferramentas da Integração

- **Capacidade:** C5

**Comando:**  
Quais ferramentas a suíte usa nos testes de integração?

**Alternativas:**
- A) Somente o editor de texto.
- B) Somente o Lighthouse.
- C) Somente o navegador real.
- D) Testing Library e MSW, com o Vitest.

**Gabarito:** D

---

## ITEM 13 — Ferramentas do E2E

- **Capacidade:** C5

**Comando:**  
Quais ferramentas são usadas nos testes E2E?

**Alternativas:**
- A) Cypress ou Playwright.
- B) npm ci ou npm install.
- C) MSW ou axe.
- D) Lighthouse ou DevTools.

**Gabarito:** A

---

## ITEM 14 — Exemplo de Unitário

- **Capacidade:** C5

**Comando:**  
Qual destes é um bom exemplo de teste unitário na loja?

**Alternativas:**
- A) O carrinho mostrando os itens com a API simulada.
- B) O fluxo completo de login e compra no navegador.
- C) A página carregando no WebKit.
- D) aplicarCupom nunca deixa o total negativo.

**Gabarito:** D

---

## ITEM 15 — Exemplo de Integração

- **Capacidade:** C5

**Comando:**  
Qual destes é um bom exemplo de teste de integração na loja?

**Alternativas:**
- A) A função de frete devolve o valor certo.
- B) O usuário compra no navegador real.
- C) O carrinho mostra a mensagem de erro quando a API simulada responde 500.
- D) O README tem o badge.

**Gabarito:** C

---

## ITEM 16 — Pirâmide na Suíte

- **Capacidade:** C5

**Comando:**  
Pela pirâmide de testes, qual camada deve ter mais testes?

**Alternativas:**
- A) A dos testes E2E.
- B) Todas devem ter a mesma quantidade.
- C) A dos testes unitários.
- D) A dos testes manuais.

**Gabarito:** C

---

## ITEM 17 — Suíte Organizada

- **Capacidade:** C5

**Comando:**  
O que caracteriza uma suíte de testes organizada (6.3)?

**Alternativas:**
- A) A estratégia aparece só pela estrutura das pastas.
- B) Os testes ficam fora do repositório.
- C) Todos os testes ficam num arquivo único.
- D) Os testes ficam misturados com as imagens.

**Gabarito:** A

---

## ITEM 18 — Pasta dos Unitários

- **Capacidade:** C5

**Comando:**  
O que fica na pasta tests/unitarios?

**Alternativas:**
- A) As imagens da vitrine.
- B) As regras: descontos, frete e cupom.
- C) Os fluxos completos no navegador.
- D) O workflow do GitHub Actions.

**Gabarito:** B

---

## ITEM 19 — Pasta da Integração

- **Capacidade:** C5

**Comando:**  
O que fica na pasta tests/integracao?

**Alternativas:**
- A) Os componentes, como carrinho e checkout, com a API simulada pelo MSW.
- B) O arquivo TESTING.md.
- C) As regras puras de cálculo.
- D) Os fluxos E2E de compra.

**Gabarito:** A

---

## ITEM 20 — Pasta e2e

- **Capacidade:** C5

**Comando:**  
O que fica na pasta e2e?

**Alternativas:**
- A) A configuração da cobertura.
- B) Os pacotes do node_modules.
- C) Os fluxos: login, compra completa e cupom inválido.
- D) As funções de desconto.

**Gabarito:** C

---

## ITEM 21 — Configuração da Cobertura

- **Capacidade:** C5

**Comando:**  
Em qual arquivo ficam a cobertura e os limites mínimos da suíte?

**Alternativas:**
- A) vitest.config.js
- B) .gitignore
- C) README.md
- D) TESTING.md

**Gabarito:** A

---

## ITEM 22 — Script test

- **Capacidade:** C5

**Comando:**  
No package.json da suíte, o que o script "test": "vitest" faz?

**Alternativas:**
- A) Roda o Vitest em modo observação.
- B) Roda a suíte uma vez com cobertura.
- C) Roda os testes E2E no Playwright.
- D) Publica a loja na internet.

**Gabarito:** A

---

## ITEM 23 — Script test:run

- **Capacidade:** C5

**Comando:**  
O que o script "test:run": "vitest run" faz?

**Alternativas:**
- A) Apaga os testes que falharam.
- B) Abre o painel do Cypress.
- C) Roda a suíte para sempre, observando os arquivos.
- D) Roda a suíte uma vez e termina.

**Gabarito:** D

---

## ITEM 24 — Script test:coverage

- **Capacidade:** C5

**Comando:**  
Qual é o comando do script test:coverage?

**Alternativas:**
- A) playwright test --coverage
- B) vitest --watch
- C) npm ci --coverage
- D) vitest run --coverage

**Gabarito:** D

---

## ITEM 25 — Script test:e2e

- **Capacidade:** C5

**Comando:**  
Qual comando o script test:e2e executa quando a suíte usa Playwright?

**Alternativas:**
- A) vitest --coverage
- B) npm run dev
- C) vitest run
- D) playwright test

**Gabarito:** D

---

## ITEM 26 — Script no Pipeline

- **Capacidade:** C5

**Comando:**  
Por que o pipeline não deve usar o modo observação do Vitest?

**Alternativas:**
- A) Porque o modo observação não termina, e o job nunca acabaria.
- B) Porque o pipeline não tem Node instalado.
- C) Porque o modo observação apaga a cobertura.
- D) Porque o modo observação não roda nenhum teste.

**Gabarito:** A

---

## ITEM 27 — Cobertura Mínima

- **Capacidade:** C4

**Comando:**  
Qual é a cobertura mínima para aprovação na avaliação prática?

**Alternativas:**
- A) 10%
- B) 70%
- C) 100%
- D) 50%

**Gabarito:** B

---

## ITEM 28 — Meta Excelente de Cobertura

- **Capacidade:** C4

**Comando:**  
Qual é a meta Excelente de cobertura na avaliação prática?

**Alternativas:**
- A) Exatamente 100%.
- B) 80% ou mais.
- C) 40% ou mais.
- D) 60% ou mais.

**Gabarito:** B

---

## ITEM 29 — Mínimo de Unitários

- **Capacidade:** C4

**Comando:**  
Qual é o mínimo de casos de teste unitários para aprovação?

**Alternativas:**
- A) 1 caso.
- B) 50 casos.
- C) 5 casos.
- D) Nenhum caso.

**Gabarito:** C

---

## ITEM 30 — Integração Excelente

- **Capacidade:** C4

**Comando:**  
O que a meta Excelente pede nos testes de integração?

**Alternativas:**
- A) Somente o carrinho sem API simulada.
- B) Carrinho, carregamento e erro 500.
- C) Somente a página "Sobre nós".
- D) Nenhum teste de integração.

**Gabarito:** B

---

## ITEM 31 — Fluxos E2E Mínimos

- **Capacidade:** C4

**Comando:**  
Quais são os 3 fluxos E2E mínimos da avaliação prática?

**Alternativas:**
- A) Rodapé, cabeçalho e menu.
- B) Login, compra completa e cupom inválido.
- C) Cadastro de produto, estoque e relatório.
- D) Sobre nós, contato e blog.

**Gabarito:** B

---

## ITEM 32 — E2E Estáveis

- **Capacidade:** C4

**Comando:**  
Por que a meta Excelente exige os 3 fluxos E2E estáveis em 3 execuções?

**Alternativas:**
- A) Porque o Cypress só funciona na terceira vez.
- B) Porque o professor precisa de três prints.
- C) Porque cada execução aumenta a cobertura.
- D) Porque passar uma vez pode esconder um teste instável.

**Gabarito:** D

---

## ITEM 33 — Pipeline Excelente

- **Capacidade:** C4

**Comando:**  
O que a meta Excelente pede do pipeline?

**Alternativas:**
- A) Que publique mesmo com teste falhando.
- B) Que rode só uma vez por mês.
- C) Que não rode os testes E2E.
- D) Que bloqueie o merge e tenha badge.

**Gabarito:** D

---

## ITEM 34 — Seções do TESTING.md

- **Capacidade:** C2

**Comando:**  
Quais são as seções do TESTING.md de 1 página?

**Alternativas:**
- A) Como rodar, estratégia, fora do escopo, resultado e como contribuir.
- B) Somente a lista de nomes da equipe.
- C) Somente as senhas de acesso.
- D) Somente o histórico de commits.

**Gabarito:** A

---

## ITEM 35 — Como Rodar

- **Capacidade:** C2

**Comando:**  
Quais comandos entram na seção "Como rodar" do TESTING.md?

**Alternativas:**
- A) npm run dev e mais nada.
- B) git push --force e git reset.
- C) npm ci, npm run test:coverage e npm run test:e2e.
- D) npm publish e npm unpublish.

**Gabarito:** C

---

## ITEM 36 — Estratégia

- **Capacidade:** C2

**Comando:**  
O que a seção "Estratégia" do TESTING.md explica?

**Alternativas:**
- A) O que cada camada testa e por quê, pela pirâmide.
- B) Quanto custou o computador do laboratório.
- C) Qual é a cor favorita da equipe.
- D) Como fazer o deploy sem testes.

**Gabarito:** A

---

## ITEM 37 — Resultado

- **Capacidade:** C2

**Comando:**  
O que a seção "Resultado" do TESTING.md registra?

**Alternativas:**
- A) Somente o link do site publicado.
- B) Somente a data da entrega.
- C) Cobertura final, testes por camada e testes instáveis encontrados.
- D) Somente os elogios do code review.

**Gabarito:** C

---

## ITEM 38 — Como Contribuir

- **Capacidade:** C2

**Comando:**  
Qual é a regra da seção "Como contribuir" do TESTING.md?

**Alternativas:**
- A) Todo pull request pode entrar sem teste.
- B) Todo pull request precisa de teste novo para o comportamento novo.
- C) Os testes devem ser apagados a cada versão.
- D) Somente o professor pode escrever testes.

**Gabarito:** B

---

## ITEM 39 — Fora do Escopo

- **Capacidade:** C2

**Comando:**  
O que a seção "Fora do escopo" do TESTING.md registra?

**Alternativas:**
- A) Os testes que passaram.
- B) A lista de ferramentas instaladas.
- C) O que não foi testado e a justificativa pelo risco.
- D) Os nomes dos clientes da loja.

**Gabarito:** C

---

## ITEM 40 — Operadora de Cartão

- **Capacidade:** C2

**Comando:**  
Por que a integração real com a operadora de cartão fica fora do escopo?

**Alternativas:**
- A) Porque depende de serviço externo; o risco é tratado com o mock das respostas de recusa e aprovação.
- B) Porque pagamentos nunca têm defeitos.
- C) Porque o cartão não faz parte da compra.
- D) Porque a operadora proíbe testes de qualquer tipo.

**Gabarito:** A

---

## ITEM 41 — Fora do Escopo × Esquecer

- **Capacidade:** C2

**Comando:**  
Qual é a diferença entre deixar algo fora do escopo e esquecer de testar?

**Alternativas:**
- A) Não há diferença: os dois são iguais.
- B) Fora do escopo é uma decisão escrita e justificada; esquecer deixa o risco escondido.
- C) Fora do escopo significa testar duas vezes.
- D) Esquecer é melhor, porque economiza tempo.

**Gabarito:** B

---

## ITEM 42 — Evidência para a Black Friday

- **Capacidade:** C3

**Comando:**  
O que serve de evidência de que a loja pode ir para a Black Friday?

**Alternativas:**
- A) A opinião do dono da loja.
- B) A quantidade de commits do dia.
- C) O número de imagens da vitrine.
- D) O pipeline verde, com a cobertura acima do mínimo e os fluxos E2E estáveis.

**Gabarito:** D

---

## ITEM 43 — Cartão de Revisão

- **Capacidade:** C4

**Comando:**  
Quais itens o cartão de revisão da feira das suítes pede?

**Alternativas:**
- A) Somente uma nota de 0 a 10.
- B) 2 pontos fortes, 1 risco e 1 sugestão.
- C) Somente a lista de erros de português.
- D) 5 críticas e nenhum elogio.

**Gabarito:** B

---

## ITEM 44 — Risco no Code Review

- **Capacidade:** C4

**Comando:**  
O pull request revisado tem um teste E2E com cy.wait(3000). Como registrar isso no cartão?

**Alternativas:**
- A) Como sugestão de aumentar para 10000.
- B) Não registrar, porque é um detalhe.
- C) Como ponto forte: deixa o teste mais seguro.
- D) Como risco: a espera fixa pode deixar o teste instável.

**Gabarito:** D

---

## ITEM 45 — Respondendo ao Code Review

- **Capacidade:** C4

**Comando:**  
Como a dupla revisada deve responder a cada comentário?

**Alternativas:**
- A) "Aceito, porque..." ou "mantenho, porque...", com fato técnico.
- B) Respondendo só aos elogios.
- C) Apagando os comentários sem ler.
- D) Pedindo para outra dupla responder.

**Gabarito:** A

---

## ITEM 46 — Sugestão Não Aplicada

- **Capacidade:** C4

**Comando:**  
O que fazer com uma sugestão que a dupla decidiu não aplicar?

**Alternativas:**
- A) Registrar no TESTING.md por que não aplicou.
- B) Esconder a sugestão no código.
- C) Fechar o pull request sem explicação.
- D) Aplicar sem concordar, para evitar conversa.

**Gabarito:** A

---

## ITEM 47 — Pesos da Avaliação

- **Capacidade:** C3

**Comando:**  
Quais são os pesos da avaliação da UC?

**Alternativas:**
- A) Contínua 33%, prática 33% e objetiva 34%.
- B) Contínua 60%, prática 25% e objetiva 15%.
- C) Contínua 15%, prática 25% e objetiva 60%.
- D) Somente a objetiva, com 100%.

**Gabarito:** B

---

## ITEM 48 — Cálculo da Nota Final

- **Capacidade:** C3

**Comando:**  
Com contínua 8,0, prática 9,0 e objetiva 6,0, qual é a nota final?

**Alternativas:**
- A) 7,67
- B) 7,95
- C) 8,50
- D) 6,00

**Gabarito:** B

---

## ITEM 49 — Aprovação na UC

- **Capacidade:** C3

**Comando:**  
Quais são os critérios de aprovação na UC?

**Alternativas:**
- A) Nota final ≥ 5,0 e qualquer presença.
- B) Somente a nota da avaliação objetiva.
- C) Nota final ≥ 7,0 e presença mínima de 75%.
- D) Somente presença de 100%.

**Gabarito:** C

---

## ITEM 50 — Parecer por Capacidade

- **Capacidade:** C3

**Comando:**  
Além da nota, o que cada capacidade recebe na avaliação da UC?

**Alternativas:**
- A) Um número de 0 a 100 sem explicação.
- B) Uma medalha de ouro, prata ou bronze.
- C) Nenhum registro.
- D) O parecer Desenvolvida, Em desenvolvimento ou Não desenvolvida.

**Gabarito:** D
