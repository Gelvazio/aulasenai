# Atividade: Atividade Prática — Aula 09 — 10 Questões Discursivas

- **Aula:** AP-09
- **Rótulo da aula:** Atividade Prática — Aula 09
- **Tema:** Qualidade, Performance, Acessibilidade e CI CD
- **Ícone:** 🚦
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-09.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Desenvolver, por escrito, o pipeline de testes e as verificações de qualidade com os conteúdos da aula 09 (CONTEUDO/AULA-09-QUALIDADE-PERFORMANCE-ACESSIBILIDADE-E-CI-CD.md): integração e entrega contínuas, workflow do GitHub Actions (on, jobs, needs, npm ci e cobertura), proteção da branch e bloqueio de merge, acessibilidade automatizada com axe (4.2), desempenho com Lighthouse e Core Web Vitals (4.4) e interação com a equipe de testes pelo pull request, badge e TESTING.md (2.4).
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-09-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 9

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado porque uma loja virtual publicou duas vezes no mesmo mês uma versão com o carrinho quebrado ("os testes existiam, mas ninguém rodou"). Você vai montar o pipeline de testes no GitHub, proteger a branch main e auditar a acessibilidade e o desempenho do checkout.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o comando pedido; **(2)** o código pedido escrito por inteiro (trecho do workflow em YAML, teste com expect, HTML corrigido) ou os valores pedidos; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". No YAML, use 2 espaços por nível. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, código correto (chaves do workflow, ordem dos passos, teste com o matcher adequado, atributo de acessibilidade) e justificativa com as palavras-chave do conteúdo. Nomes de jobs e de arquivos diferentes valem, desde que o código esteja correto; aspas simples ou duplas são aceitas. Erros de português não tiram nota se a ideia estiver clara.

**Projeto usado em várias questões:** a loja usa Vitest (script test:coverage, com metas mínimas de cobertura) e Cypress, roda em http://localhost:5173 com npm run dev e guarda o código no GitHub, na branch main. O checkout é montado por montarCheckout(container), do arquivo src/checkout.js.

## Cobertura da aula

| Conteúdo da aula 09 | Questões |
|---|---|
| Integração e entrega contínuas | 01 |
| Workflow do GitHub Actions | 02, 03 |
| Proteção da branch e bloqueio de merge | 04 |
| Acessibilidade automatizada com axe (4.2) | 05, 06 |
| Desempenho com Lighthouse e Core Web Vitals (4.4) | 07, 08 |
| Interação com a equipe de testes (2.4) | 09, 10 |

---

## ITEM 01 — CI e CD

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, ouviu da equipe que os testes da loja existiam, mas ninguém lembrou de rodá-los antes das duas publicações com o carrinho quebrado.

**Comando:**
Explique à equipe a integração e a entrega contínuas.

**Tópicos:**
- a) Diga o que é integração contínua (CI) e o que é entrega contínua (CD). (0,2)
- b) Explique como o CI teria evitado as duas publicações com o carrinho quebrado. (0,4)
- c) Explique por que rodar os testes no servidor, sempre do mesmo jeito, é mais confiável do que depender de alguém rodar à mão. (0,4)

---

## ITEM 02 — Montando o Workflow

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai criar o arquivo .github/workflows/ci.yml para rodar a suíte com cobertura a cada push na main e a cada pull request.

**Comando:**
Escreva o workflow dos testes.

**Tópicos:**
- a) Escreva o trecho on que faz o workflow rodar a cada push na main e a cada pull request. (0,2)
- b) Escreva o job testes completo: máquina Linux, checkout, setup do Node 20 com cache do npm, instalação e execução da suíte com cobertura. (0,4)
- c) Explique a diferença entre npm install e npm ci no pipeline e por que os limites de cobertura da aula 7 fazem o job falhar. (0,4)

---

## ITEM 03 — O Job de E2E

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai acrescentar ao workflow os testes E2E do Cypress, que precisam da aplicação rodando e são os mais lentos da suíte.

**Comando:**
Escreva e explique o job de E2E.

**Tópicos:**
- a) Diga por que o YAML exige cuidado com a indentação e qual é a regra. (0,2)
- b) Escreva o job e2e com needs, checkout e a action do Cypress que inicia a aplicação e espera o endereço responder. (0,4)
- c) Explique o que faz o needs: testes e por que é bom o E2E rodar só depois dos testes unitários e de integração passarem. (0,4)

---

## ITEM 04 — Protegendo a main

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, já tem o workflow rodando, mas um integrante juntou na main um pull request com o check vermelho.

**Comando:**
Configure a proteção da branch.

**Tópicos:**
- a) Diga onde, no GitHub, se cria a regra de proteção da branch main. (0,2)
- b) Diga as duas exigências da regra vistas na aula. (0,4)
- c) Explique o que acontece com um pull request com teste quebrado ou com cobertura abaixo de 70% depois da proteção e o que isso garante para a main. (0,4)

---

## ITEM 05 — Teste de Acessibilidade com axe

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, quer que o pipeline avise sempre que o formulário de checkout perder acessibilidade.

**Comando:**
Automatize a verificação de acessibilidade (4.2).

**Tópicos:**
- a) Escreva o comando que instala o vitest-axe e diga o que o axe-core confere. (0,2)
- b) Escreva o teste "formulário de checkout não tem violações de acessibilidade" com montarCheckout e axe. (0,4)
- c) Explique por que a acessibilidade faz parte da usabilidade e por que o axe não dispensa o teste manual. (0,4)

---

## ITEM 06 — Corrigindo as Violações

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, rodou o axe e ele apontou no checkout: o campo de CEP sem rótulo, a imagem do produto sem texto alternativo, o botão de lixeira só com ícone e um texto cinza-claro sobre fundo branco.

**Comando:**
Corrija as violações.

**Tópicos:**
- a) Diga quem é prejudicado por um campo sem rótulo e por um botão só com ícone. (0,2)
- b) Escreva o HTML corrigido do campo de CEP, da imagem do produto e do botão de lixeira. (0,4)
- c) Explique como corrigir o contraste baixo, citando a relação mínima, e como conferir depois da correção. (0,4)

---

## ITEM 07 — Lendo o Lighthouse

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai auditar o desempenho (4.4) da vitrine da loja.

**Comando:**
Explique a auditoria e os indicadores.

**Tópicos:**
- a) Diga onde se roda o Lighthouse e em que modo a página deve ser auditada. (0,2)
- b) Explique o que medem LCP, INP e CLS e diga o valor considerado bom de cada um. (0,4)
- c) Explique por que o desempenho é uma questão de qualidade para o cliente da loja. (0,4)

---

## ITEM 08 — Melhorando o Desempenho

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, mediu LCP de 4,8 s na vitrine, causado por uma imagem de 3 MB. Ao carregar, a página também "pula" quando as fotos aparecem, e os cliques em Adicionar demoram a responder.

**Comando:**
Proponha as melhorias.

**Tópicos:**
- a) Diga se o LCP de 4,8 s é bom e qual é a primeira melhoria a testar. (0,2)
- b) Escreva a tag img da vitrine com as melhorias para o LCP e para o CLS, e explique cada atributo. (0,4)
- c) Proponha uma melhoria para o INP e uma para o que fica fora da tela, e explique por que cada uma ajuda. (0,4)

---

## ITEM 09 — O Pull Request como Ponto de Encontro

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai conduzir com a equipe a dinâmica do pull request: alguém quebra um teste de propósito numa branch e abre o pull request.

**Comando:**
Descreva o fluxo da equipe no pull request (2.4).

**Tópicos:**
- a) Diga o que o CI informa à equipe no pull request. (0,2)
- b) Descreva, em ordem, os passos do fluxo: alterar, abrir o pull request, revisar, corrigir e juntar. (0,4)
- c) Explique por que é melhor o defeito ser pego no pull request do que depois de chegar à main. (0,4)

---

## ITEM 10 — Badge e TESTING.md

- **Aula:** 09 · Qualidade, Performance, Acessibilidade e CI CD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai deixar visível para qualquer pessoa o estado dos testes da main e explicar a novos integrantes como contribuir com testes.

**Comando:**
Documente o pipeline para a equipe.

**Tópicos:**
- a) Diga o que mostra o badge no README.md. (0,2)
- b) Escreva a linha do badge do workflow ci.yml no README.md. (0,4)
- c) Diga o que o TESTING.md documenta e explique como ele ajuda a interação com a equipe de testes. (0,4)
