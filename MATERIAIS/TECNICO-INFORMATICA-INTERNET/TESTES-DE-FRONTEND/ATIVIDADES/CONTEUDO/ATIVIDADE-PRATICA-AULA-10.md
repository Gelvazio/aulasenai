# Atividade: Atividade Prática — Aula 10 — 10 Questões Discursivas

- **Aula:** AP-10
- **Rótulo da aula:** Atividade Prática — Aula 10
- **Tema:** Projeto Prático Integrador Suíte de Testes
- **Ícone:** 🏁
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-10.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Reconhecer, aplicar e desenvolver, por escrito, a suíte de testes completa do projeto integrador com os conteúdos da aula 10 (CONTEUDO/AULA-10-PROJETO-INTEGRADOR-SUITE-DE-TESTES.md): o processo fundamental de teste (7.1 a 7.5), a escolha dos casos pelo risco, a organização da suíte em pastas e scripts (6.3), as metas de qualidade da avaliação prática, o TESTING.md com fora do escopo justificado, o code review cruzado com a equipe de testes (2.4) e a avaliação da UC.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-10-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 10

**Seu papel em todas as questões:** Você, como aluno consultor, recebeu o repositório-base de uma loja virtual que vai enfrentar a Black Friday, com vitrine, carrinho, cupom e checkout e nenhum teste. Em uma tarde, você vai planejar, organizar, executar e avaliar a suíte de testes e defender suas escolhas para a equipe.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o item pedido; **(2)** o código, a estrutura de pastas, a tabela ou o texto pedido escrito por inteiro; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, itens completos (etapas, pastas, scripts, metas, seções do TESTING.md) e justificativa com as palavras-chave do conteúdo, principalmente o risco. Nomes de pastas, arquivos e testes diferentes valem, desde que a organização esteja correta; aspas simples ou duplas são aceitas. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 10 | Questões |
|---|---|
| Processo fundamental de teste (7.1 a 7.5) | 01 |
| Planejamento e desenho dos testes pelo risco (7.1, 7.2) | 02 |
| Execução: as três camadas da suíte (7.3) | 03 |
| Organização da suíte de testes (6.3) | 04, 05 |
| Metas de qualidade da avaliação prática | 06 |
| TESTING.md e fora do escopo (7.5, S2) | 07, 08 |
| Interação com a equipe de testes: code review cruzado (2.4) | 09 |
| Avaliação da UC | 10 |

---

## ITEM 01 — O Processo de Teste Completo

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, vai apresentar à equipe da loja o caminho que a suíte vai seguir, do plano até a recomendação de publicar.

**Comando:**
Descreva o processo fundamental de teste (7) no projeto.

**Tópicos:**
- a) Escreva, em ordem, as cinco etapas do processo fundamental de teste. (0,2)
- b) Diga o que é feito no projeto da loja em cada uma das cinco etapas. (0,4)
- c) Explique por que seguir as etapas em ordem evita começar a escrever testes sem saber o que é mais importante testar. (0,4)

---

## ITEM 02 — Escolhendo pelo Risco

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, tem só uma tarde e não consegue testar a loja inteira: vitrine, carrinho, cupom, checkout e a página "Sobre nós".

**Comando:**
Planeje e desenhe os testes pela análise de riscos (7.1, 7.2).

**Tópicos:**
- a) Diga o que vem primeiro, o que vem depois e o que fica fora do escopo. (0,2)
- b) Justifique pelo risco a ordem que você escolheu. (0,4)
- c) Escreva dois casos de teste do cupom: um do caminho feliz e um de borda, com entrada e resultado esperado. (0,4)

---

## ITEM 03 — As Três Camadas da Execução

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai executar a suíte (7.3) com as ferramentas usadas na UC.

**Comando:**
Distribua os testes da loja nas camadas da suíte.

**Tópicos:**
- a) Diga quais ferramentas são usadas nos testes unitários, nos de integração e nos E2E. (0,2)
- b) Dê um exemplo da loja para cada camada (o que é testado em cada uma). (0,4)
- c) Explique, pela pirâmide de testes, por que a suíte tem mais testes unitários do que E2E. (0,4)

---

## ITEM 04 — A Estrutura das Pastas

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, quer que qualquer pessoa entenda a estratégia de testes só de olhar as pastas do repositório.

**Comando:**
Organize a suíte de testes (6.3).

**Tópicos:**
- a) Diga o que é uma suíte de testes organizada. (0,2)
- b) Escreva a estrutura de pastas e arquivos do repositório da loja com as pastas de testes, o workflow, a configuração e o TESTING.md. (0,4)
- c) Explique o que fica em cada pasta de testes e por que separar as camadas ajuda a equipe. (0,4)

---

## ITEM 05 — Os Scripts da Suíte

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, quer que toda a equipe rode a suíte com os mesmos comandos, no computador e no pipeline.

**Comando:**
Escreva e explique os scripts do package.json.

**Tópicos:**
- a) Diga para que serve o bloco scripts do package.json. (0,2)
- b) Escreva o bloco scripts com test, test:run, test:coverage e test:e2e. (0,4)
- c) Explique a diferença entre npm test (vitest) e npm run test:run (vitest run) e diga qual deles o pipeline deve usar. (0,4)

---

## ITEM 06 — As Metas de Qualidade

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, vai conferir se a suíte da loja atinge o mínimo da avaliação prática e o que falta para chegar à meta Excelente.

**Comando:**
Confira as metas de qualidade.

**Tópicos:**
- a) Diga o mínimo de cobertura para aprovação e a meta Excelente. (0,2)
- b) Escreva, para testes unitários, integração, fluxos E2E e pipeline, o mínimo para aprovação e a meta Excelente. (0,4)
- c) Explique por que a meta Excelente pede os 3 fluxos E2E estáveis em 3 execuções, e não só passando uma vez. (0,4)

---

## ITEM 07 — Escrevendo o TESTING.md

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, terminou a suíte: 72% de cobertura, 12 testes unitários, 4 de integração, 3 fluxos E2E estáveis e 1 teste instável encontrado e corrigido.

**Comando:**
Escreva o TESTING.md de 1 página (7.5).

**Tópicos:**
- a) Liste as cinco seções do TESTING.md. (0,2)
- b) Escreva as seções Como rodar e Resultado com os dados da sua suíte. (0,4)
- c) Escreva a seção Como contribuir e explique por que ela protege a suíte depois que você for embora. (0,4)

---

## ITEM 08 — O Que Ficou Fora

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C2

**Contexto:**
Você, como aluno consultor, não testou a página "Sobre nós" nem a integração real com a operadora de cartão, que depende de um serviço externo.

**Comando:**
Escreva e fundamente a seção Fora do escopo (S2).

**Tópicos:**
- a) Diga o que a seção Fora do escopo registra. (0,2)
- b) Escreva a justificativa pelo risco para cada um dos dois itens que ficaram fora. (0,4)
- c) Explique por que deixar algo fora do escopo, por escrito e justificado, é diferente de simplesmente esquecer de testar. (0,4)

---

## ITEM 09 — Code Review Cruzado

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, vai revisar no GitHub o pull request da suíte de outra dupla na feira das suítes. Ela tem um teste E2E de checkout que usa cy.wait(3000) e não testa cupom vencido.

**Comando:**
Faça o code review com o cartão de revisão (2.4).

**Tópicos:**
- a) Diga quais são os quatro itens do cartão de revisão. (0,2)
- b) Escreva o seu comentário no pull request com 2 pontos fortes, 1 risco e 1 sugestão. (0,4)
- c) Explique como a dupla revisada deve responder a cada comentário e o que fazer com uma sugestão que ela decidir não aplicar. (0,4)

---

## ITEM 10 — A Avaliação da UC

- **Aula:** 10 · Projeto Prático Integrador Suíte de Testes
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, vai calcular a sua nota final: avaliação contínua 8,0; avaliação prática 9,0; avaliação objetiva 6,0; presença de 80%.

**Comando:**
Calcule a nota final e interprete o resultado.

**Tópicos:**
- a) Diga os três instrumentos da avaliação da UC e o peso de cada um. (0,2)
- b) Calcule a nota final, mostrando a conta, e diga se você está aprovado e por quê. (0,4)
- c) Explique o parecer por capacidade (Desenvolvida, Em desenvolvimento ou Não desenvolvida) e escreva um exemplo de evidência do seu repositório para a capacidade C5. (0,4)
