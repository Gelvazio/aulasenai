# Atividade: Atividade Prática — Aula 07 — 10 Questões Discursivas

- **Aula:** AP-07
- **Rótulo da aula:** Atividade Prática — Aula 07
- **Tema:** Métricas e Cobertura de Testes
- **Ícone:** 📊
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-07.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Reconhecer as etapas de planejamento e aplicar os testes do plano, por escrito, com os conteúdos da aula 07 (CONTEUDO/AULA-07-METRICAS-E-COBERTURA-DE-TESTES.md): monitoração e controle com métricas (7.4), cobertura de código com o Vitest (statements, branches, functions e lines), leitura do relatório e pontos cegos, testes que faltavam com data fixa, avaliação dos resultados pelos critérios de saída (7.5), a falsa sensação dos 100%, manutenibilidade da suíte (4.5) e metas mínimas no pipeline.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-07-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 7

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para medir a cobertura dos testes de uma loja virtual, encontrar os pontos cegos da suíte e recomendar à equipe, com base nos dados, se a versão pode ser publicada.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o comando pedido; **(2)** o código pedido escrito por inteiro (configuração do Vitest, teste com expect) ou os valores pedidos; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Escreva o código como escreveria no VS Code. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito certo, código correto (opções de coverage, dados de teste e matcher adequado) e justificativa com as palavras-chave do conteúdo. Nomes de testes e variáveis diferentes valem, desde que o código esteja correto; aspas simples ou duplas e ponto e vírgula opcional são aceitos. Erros de português não tiram nota se a ideia estiver clara.

**Função usada em várias questões (src/servicos/carrinho.js):** aplicarCupom(total, cupom, hoje = new Date()) devolve o total sem mudança quando não há cupom; lança o erro "Cupom expirado" quando a validade do cupom é anterior a hoje; lança "Valor mínimo não atingido" quando o total é menor que cupom.valorMinimo; com cupom.tipo "percentual", devolve total - (total × cupom.valor) / 100; nos demais casos (valor fixo), devolve Math.max(total - cupom.valor, 0).

## Cobertura da aula

| Conteúdo da aula 07 | Questões |
|---|---|
| Monitoração e controle com métricas (7.4) | 01, 02 |
| Cobertura de código com o Vitest | 03 |
| As quatro métricas de cobertura | 04 |
| Lendo o relatório: pontos cegos | 05 |
| Testes que faltavam e data fixa | 06 |
| Avaliação dos resultados e relatório (7.5) | 07 |
| A falsa sensação dos 100% | 08 |
| Manutenibilidade da suíte (4.5) | 09 |
| Metas mínimas no pipeline | 10 |

---

## ITEM 01 — Monitorar e Controlar

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, perguntou à equipe como ela sabe se os testes estão em dia. A resposta foi: "A gente sente que está tudo bem".

**Comando:**
Explique à equipe a monitoração e o controle dos testes (7.4).

**Tópicos:**
- a) Diga a diferença entre monitorar e controlar os testes. (0,2)
- b) Cite três métricas que ajudam a monitorar os testes e o que cada uma mostra. (0,4)
- c) Explique por que as decisões de controle precisam se apoiar em métricas, e não na impressão da equipe. (0,4)

---

## ITEM 02 — Da Métrica à Ação

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, recebeu o painel da semana: a taxa de aprovação caiu de 98% para 80%; há 2 defeitos críticos abertos no pagamento; o tempo de execução da suíte passou de 2 para 9 minutos.

**Comando:**
Proponha a ação de controle para cada sinal do painel.

**Tópicos:**
- a) Diga qual dos três sinais é o mais grave para a publicação e por quê. (0,2)
- b) Escreva a ação de controle para cada um dos três sinais. (0,4)
- c) Explique por que três testes instáveis (flaky) devem ser corrigidos antes de a equipe criar testes novos. (0,4)

---

## ITEM 03 — Ligando a Cobertura no Vitest

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, vai medir pela primeira vez quanto do código da loja a suíte executa.

**Comando:**
Instale e configure a cobertura.

**Tópicos:**
- a) Escreva o comando que instala o provedor de cobertura v8 e o comando que cria o script test:coverage. (0,2)
- b) Escreva o vitest.config.js com o ambiente jsdom e a cobertura com provedor v8, relatórios text e html e os arquivos de src. (0,4)
- c) Diga o que o comando npm run test:coverage mostra e gera e explique para que serve cada um dos dois relatórios. (0,4)

---

## ITEM 04 — As Quatro Métricas

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, mostrou a tabela da cobertura e a equipe perguntou: "O módulo tem 100% de linhas e só 50% de branches. Afinal, está testado ou não?".

**Comando:**
Explique as métricas da tabela.

**Tópicos:**
- a) Diga a pergunta que cada métrica responde: statements, branches, functions e lines. (0,2)
- b) Explique, com um exemplo de if, como um código pode ter 100% de linhas e 50% de branches. (0,4)
- c) Explique por que branches é a métrica mais exigente e o que o resultado do módulo indica. (0,4)

---

## ITEM 05 — Os Pontos Cegos

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, abriu o relatório HTML da função aplicarCupom. A suíte só tem dois testes: sem cupom e cupom percentual válido.

**Comando:**
Leia o relatório e priorize os testes.

**Tópicos:**
- a) Diga o que significam, no relatório HTML, as linhas em vermelho e os marcadores I e E. (0,2)
- b) Liste os três caminhos da função que o relatório vai apontar como não testados. (0,4)
- c) Diga qual caminho deve ser testado primeiro pelo risco e justifique pelo que aconteceria com o pedido sem o Math.max. (0,4)

---

## ITEM 06 — Escrevendo os Testes Que Faltavam

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, vai escrever os testes dos pontos cegos encontrados na função aplicarCupom.

**Comando:**
Escreva os testes que faltavam.

**Tópicos:**
- a) Escreva as constantes HOJE e CUPOM_FIXO (tipo fixo, valor 50, sem valor mínimo, validade no fim do ano) usadas pelos testes. (0,2)
- b) Escreva os testes "nunca deixa o total negativo com cupom de valor fixo" e "recusa cupom vencido". (0,4)
- c) Explique por que a data HOJE precisa ser fixa no teste de validade do cupom. (0,4)

---

## ITEM 07 — Avaliando os Resultados

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, recebeu o relatório: "92% de cobertura, pode publicar". No relatório HTML, o módulo de pagamento tem 31% de branches; o número geral alto vem de dezenas de testes simples de componentes visuais.

**Comando:**
Faça a avaliação dos resultados (7.5) e a recomendação.

**Tópicos:**
- a) Diga qual pergunta a avaliação dos resultados responde. (0,2)
- b) Cite quatro perguntas dos critérios de saída do plano que você confere antes de recomendar a publicação. (0,4)
- c) Escreva a sua recomendação para esta loja (publicar ou não), com a meta por módulo e a justificativa pelo risco. (0,4)

---

## ITEM 08 — 100% e Ainda com Defeito

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, recebeu a função aplicarCupom com um defeito: o sinal <= no lugar de < na comparação do valor mínimo, de modo que o total exatamente igual ao mínimo é recusado. A suíte tem 100% de cobertura e passa toda.

**Comando:**
Explique por que a cobertura não mostrou o defeito e encontre-o.

**Tópicos:**
- a) Diga o que a cobertura mede e o que ela não mede. (0,2)
- b) Escreva o caso de borda (teste) que encontra o defeito, com cupom de valor mínimo 100 e total 100. (0,4)
- c) Explique por que 100% de linhas não garante que o requisito foi atendido e com o que a cobertura deve ser cruzada. (0,4)

---

## ITEM 09 — Uma Suíte Fácil de Manter

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C4

**Contexto:**
Você, como aluno consultor, encontrou na suíte o teste it('teste 3', () => { expect(aplicarCupom(30, { tipo: 'fixo', valor: 50, valorMinimo: 0, validade: '2026-12-31' }, new Date('2026-11-05'))).toBe(0); }). Toda mudança de CSS da loja também quebra vários testes de tela.

**Comando:**
Melhore a manutenibilidade da suíte (4.5).

**Tópicos:**
- a) Diga o que é uma suíte fácil de manter. (0,2)
- b) Reescreva o teste com um nome que descreve o comportamento e com os dados em constantes com nome. (0,4)
- c) Explique duas práticas que evitam que trocar o CSS ou reorganizar o código interno quebre a suíte. (0,4)

---

## ITEM 10 — Metas Mínimas no Pipeline

- **Aula:** 07 · Métricas e Cobertura de Testes
- **Capacidade:** C3

**Contexto:**
Você, como aluno consultor, quer que a cobertura nunca caia abaixo de 80% sem que a equipe perceba.

**Comando:**
Configure as metas mínimas de cobertura.

**Tópicos:**
- a) Diga qual opção do coverage define as metas mínimas. (0,2)
- b) Escreva o bloco coverage com o provedor v8 e as metas de 80% para as quatro métricas. (0,4)
- c) Explique o que acontece com o npm run test:coverage quando a cobertura fica abaixo da meta e como isso protege a loja quando o comando roda no pipeline. (0,4)
