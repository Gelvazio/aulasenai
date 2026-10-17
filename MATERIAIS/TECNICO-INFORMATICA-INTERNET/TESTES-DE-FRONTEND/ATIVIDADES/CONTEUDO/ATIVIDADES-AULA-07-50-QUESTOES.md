# Atividade: Métricas e Cobertura de Testes — 50 Questões

- **Aula:** 07
- **Tema:** Métricas e Cobertura de Testes
- **Ícone:** 📊
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer as etapas de planejamento de testes e aplicar os testes do plano: monitoração e controle com métricas (7.4), cobertura de código com o Vitest, statements, branches, functions e lines, leitura do relatório e pontos cegos, data fixa nos testes, avaliação dos resultados pelos critérios de saída (7.5), a falsa sensação dos 100%, manutenibilidade da suíte (4.5) e metas mínimas no pipeline.
- **Conteúdo-base:** ../CONTEUDO/AULA-07-METRICAS-E-COBERTURA-DE-TESTES.md
- **Slides:** ../AULAS/AULA-07-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-07-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Monitorar os Testes

- **Capacidade:** C3

**Comando:**  
O que é monitorar os testes (7.4)?

**Alternativas:**
- A) Apagar os testes que estão falhando.
- B) Agir para mudar o plano quando algo foge do previsto.
- C) Escrever os casos de teste antes do código.
- D) Acompanhar o andamento dos testes comparando com o plano.

**Gabarito:** D

---

## ITEM 02 — Controlar os Testes

- **Capacidade:** C3

**Comando:**  
O que é controlar os testes (7.4)?

**Alternativas:**
- A) Agir quando o andamento foge do previsto: replanejar, priorizar e corrigir.
- B) Medir a velocidade da internet do laboratório.
- C) Apenas observar o painel sem tomar nenhuma decisão.
- D) Proibir a equipe de criar testes novos.

**Gabarito:** A

---

## ITEM 03 — Base das Decisões

- **Capacidade:** C3

**Comando:**  
Em que as decisões de controle dos testes devem se apoiar?

**Alternativas:**
- A) No número de linhas do código do projeto.
- B) Em métricas, e não na impressão da equipe.
- C) No horário em que os testes foram executados.
- D) Na opinião da pessoa mais experiente, sem dados.

**Gabarito:** B

---

## ITEM 04 — Casos Executados

- **Capacidade:** C3

**Comando:**  
O que mostra a métrica "casos executados × planejados"?

**Alternativas:**
- A) Quantos defeitos são críticos.
- B) Quanto do código a suíte executa.
- C) O tempo que a suíte leva para rodar.
- D) O andamento da execução do plano de testes.

**Gabarito:** D

---

## ITEM 05 — Taxa de Aprovação

- **Capacidade:** C3

**Comando:**  
A taxa de aprovação caiu de 98% para 80%. Qual é a ação de controle indicada?

**Alternativas:**
- A) Apagar os testes que falharam para voltar a 98%.
- B) Publicar mesmo assim, porque 80% é um bom número.
- C) Bloquear a entrega e investigar o que quebrou.
- D) Esperar a próxima semana para ver se melhora sozinha.

**Gabarito:** C

---

## ITEM 06 — Defeitos Críticos

- **Capacidade:** C3

**Comando:**  
Há 2 defeitos críticos abertos no pagamento. O que fazer com a publicação?

**Alternativas:**
- A) Publicar e corrigir depois, se algum cliente reclamar.
- B) Publicar só a tela de pagamento.
- C) Não publicar até os defeitos serem corrigidos e testados.
- D) Mudar a gravidade dos defeitos para baixa.

**Gabarito:** C

---

## ITEM 07 — Tempo de Execução

- **Capacidade:** C3

**Comando:**  
O tempo da suíte passou de 2 para 9 minutos. Qual é a ação de controle citada na aula?

**Alternativas:**
- A) Desligar a cobertura para sempre.
- B) Separar os testes E2E por etapa do pipeline.
- C) Rodar a suíte só uma vez por mês.
- D) Apagar todos os testes E2E da suíte.

**Gabarito:** B

---

## ITEM 08 — Testes Instáveis no Painel

- **Capacidade:** C3

**Comando:**  
O painel mostra 3 testes flaky. O que a aula recomenda?

**Alternativas:**
- A) Criar mais testes para compensar os instáveis.
- B) Rodar de novo até passarem e seguir.
- C) Corrigir os testes instáveis antes de criar testes novos.
- D) Ignorar, porque às vezes eles passam.

**Gabarito:** C

---

## ITEM 09 — Instalando a Cobertura

- **Capacidade:** C4

**Comando:**  
Qual comando instala o provedor de cobertura v8 do Vitest?

**Alternativas:**
- A) npx vitest install coverage
- B) npm install -D @vitest/coverage-v8
- C) npm run coverage:v8
- D) npm install -D coverage-jest

**Gabarito:** B

---

## ITEM 10 — Script de Cobertura

- **Capacidade:** C4

**Comando:**  
Qual comando o script test:coverage executa?

**Alternativas:**
- A) vitest run --coverage
- B) npx cypress run --coverage
- C) node coverage.js
- D) vitest --watch --no-coverage

**Gabarito:** A

---

## ITEM 11 — Provedor da Cobertura

- **Capacidade:** C4

**Comando:**  
No vitest.config.js, qual opção escolhe o motor que mede a cobertura?

**Alternativas:**
- A) coverage.include com o valor 'node'.
- B) test.environment com o valor 'v8'.
- C) coverage.provider com o valor 'v8'.
- D) coverage.reporter com o valor 'jsdom'.

**Gabarito:** C

---

## ITEM 12 — Relatórios da Cobertura

- **Capacidade:** C4

**Comando:**  
Com reporter: ['text', 'html'], o que o npm run test:coverage produz?

**Alternativas:**
- A) Uma tabela no terminal e a página coverage/index.html.
- B) Apenas um arquivo PDF para imprimir.
- C) Apenas o arquivo package.json atualizado.
- D) Um e-mail para a equipe com os resultados.

**Gabarito:** A

---

## ITEM 13 — Arquivos Medidos

- **Capacidade:** C4

**Comando:**  
Para que serve include: ['src/**/*.js'] no bloco coverage?

**Alternativas:**
- A) Para apagar os arquivos que não têm teste.
- B) Para instalar as dependências da pasta src.
- C) Para medir a cobertura só dos arquivos de código da pasta src.
- D) Para incluir os testes no site publicado.

**Gabarito:** C

---

## ITEM 14 — Statements

- **Capacidade:** C4

**Comando:**  
Que pergunta a métrica statements responde?

**Alternativas:**
- A) Quanto tempo a suíte levou?
- B) Todas as funções foram chamadas?
- C) Cada if foi testado nos dois lados?
- D) Quantas instruções rodaram?

**Gabarito:** D

---

## ITEM 15 — Branches

- **Capacidade:** C4

**Comando:**  
Que pergunta a métrica branches responde?

**Alternativas:**
- A) Cada if foi testado no lado verdadeiro e no falso?
- B) Quantas linhas rodaram?
- C) Quantos testes foram escritos?
- D) Quantos arquivos existem no projeto?

**Gabarito:** A

---

## ITEM 16 — Functions

- **Capacidade:** C4

**Comando:**  
Que pergunta a métrica functions responde?

**Alternativas:**
- A) Cada if foi testado nos dois lados?
- B) Quantas funções têm mais de 45 linhas?
- C) Quantas funções têm nome em português?
- D) Todas as funções foram chamadas pelos testes?

**Gabarito:** D

---

## ITEM 17 — Lines

- **Capacidade:** C4

**Comando:**  
Que pergunta a métrica lines responde?

**Alternativas:**
- A) Quantas linhas do código rodaram nos testes?
- B) Quantas linhas passam de 100 caracteres?
- C) Quantas linhas estão comentadas?
- D) Quantas linhas os testes têm?

**Gabarito:** A

---

## ITEM 18 — Métrica Mais Exigente

- **Capacidade:** C4

**Comando:**  
Qual métrica de cobertura é a mais exigente, segundo a aula?

**Alternativas:**
- A) Functions, porque conta só as funções.
- B) Lines, porque conta todas as linhas.
- C) Statements, porque ignora as condições.
- D) Branches, porque mostra condições que a suíte nunca testou.

**Gabarito:** D

---

## ITEM 19 — 100% de Linhas e 50% de Branches

- **Capacidade:** C4

**Comando:**  
Um módulo tem 100% de linhas e 50% de branches. O que isso indica?

**Alternativas:**
- A) Todas as linhas rodaram, mas metade dos lados das condições não foi testada.
- B) O relatório está errado, porque as duas métricas são iguais.
- C) O módulo está totalmente testado e sem defeitos.
- D) Metade das linhas do módulo não rodou.

**Gabarito:** A

---

## ITEM 20 — Linha em Vermelho

- **Capacidade:** C4

**Comando:**  
No relatório HTML da cobertura, o que significa uma linha em vermelho?

**Alternativas:**
- A) A linha não rodou em nenhum teste.
- B) A linha foi apagada pelo Vitest.
- C) A linha rodou mais de uma vez.
- D) A linha tem um erro de sintaxe.

**Gabarito:** A

---

## ITEM 21 — Marcador I

- **Capacidade:** C4

**Comando:**  
No relatório HTML, o que o marcador I ao lado de um if indica?

**Alternativas:**
- A) Que o caminho do if (lado verdadeiro) não foi testado.
- B) Que a linha é importante e deve ser lida primeiro.
- C) Que a função foi importada de outro arquivo.
- D) Que o if foi testado nos dois lados.

**Gabarito:** A

---

## ITEM 22 — Marcador E

- **Capacidade:** C4

**Comando:**  
No relatório HTML, o que o marcador E indica?

**Alternativas:**
- A) Que o teste é end-to-end.
- B) Que o caminho do else (lado falso) não foi testado.
- C) Que a linha tem um erro de execução.
- D) Que a linha foi executada com sucesso.

**Gabarito:** B

---

## ITEM 23 — Pontos Cegos do Cupom

- **Capacidade:** C4

**Comando:**  
A função aplicarCupom só tem testes "sem cupom" e "cupom percentual válido". Qual caminho fica sem teste?

**Alternativas:**
- A) O cupom percentual válido.
- B) Nenhum: dois testes cobrem tudo.
- C) O cupom de valor fixo.
- D) O caminho sem cupom.

**Gabarito:** C

---

## ITEM 24 — Prioridade pelo Risco

- **Capacidade:** C4

**Comando:**  
Entre os pontos cegos de aplicarCupom, qual testar primeiro pelo risco?

**Alternativas:**
- A) O caminho sem cupom, que já está testado.
- B) O nome da função, para ver se está em português.
- C) A formatação do código da função.
- D) O cupom de valor fixo maior que o total, que poderia gerar pedido negativo.

**Gabarito:** D

---

## ITEM 25 — Papel do Math.max

- **Capacidade:** C4

**Comando:**  
Por que aplicarCupom usa Math.max(total - cupom.valor, 0) no cupom de valor fixo?

**Alternativas:**
- A) Para arredondar o total para o número inteiro mais próximo.
- B) Para o total nunca ficar negativo quando o cupom vale mais que a compra.
- C) Para dobrar o valor do desconto.
- D) Para escolher o maior cupom do cliente.

**Gabarito:** B

---

## ITEM 26 — Teste do Total Negativo

- **Capacidade:** C4

**Comando:**  
Qual verificação confere que aplicarCupom(30, CUPOM_FIXO, HOJE) com cupom fixo de 50 não fica negativo?

**Alternativas:**
- A) expect(aplicarCupom(30, CUPOM_FIXO, HOJE)).toBe(-20);
- B) expect(aplicarCupom).toBeDefined();
- C) aplicarCupom(30, CUPOM_FIXO, HOJE) === 0;
- D) expect(aplicarCupom(30, CUPOM_FIXO, HOJE)).toBe(0);

**Gabarito:** D

---

## ITEM 27 — Testando o Erro

- **Capacidade:** C4

**Comando:**  
Como verificar que aplicarCupom lança "Cupom expirado" com um cupom vencido?

**Alternativas:**
- A) expect(() => aplicarCupom(100, cupomVencido, HOJE)).toThrow('Cupom expirado');
- B) try { aplicarCupom(100, cupomVencido, HOJE); } catch {}
- C) expect(aplicarCupom).toThrow();
- D) expect(aplicarCupom(100, cupomVencido, HOJE)).toBe('Cupom expirado');

**Gabarito:** A

---

## ITEM 28 — Cupom Vencido

- **Capacidade:** C4

**Comando:**  
Como criar o cupom vencido a partir de CUPOM_FIXO sem repetir os outros campos?

**Alternativas:**
- A) const cupomVencido = CUPOM_FIXO.validade = '2026-10-01';
- B) const cupomVencido = delete CUPOM_FIXO.validade;
- C) const cupomVencido = { ...CUPOM_FIXO, validade: '2026-10-01' };
- D) const cupomVencido = new CUPOM_FIXO('2026-10-01');

**Gabarito:** C

---

## ITEM 29 — Data Fixa

- **Capacidade:** C4

**Comando:**  
Por que o teste de validade do cupom usa HOJE = new Date('2026-11-05')?

**Alternativas:**
- A) Porque a data deixa a cobertura em 100%.
- B) Com a data real, o teste passaria hoje e falharia quando o cupom vencesse.
- C) Para o teste rodar mais rápido.
- D) Porque o Vitest não aceita new Date() sem valor.

**Gabarito:** B

---

## ITEM 30 — Constantes com Nome

- **Capacidade:** C4

**Comando:**  
Por que os dados de teste ficam em constantes como CUPOM_FIXO e HOJE?

**Alternativas:**
- A) Porque o JavaScript proíbe objetos dentro do expect.
- B) Para os testes ficarem claros e fáceis de manter, sem valores soltos repetidos.
- C) Para aumentar o tempo de execução da suíte.
- D) Para esconder os dados do professor.

**Gabarito:** B

---

## ITEM 31 — Avaliação dos Resultados

- **Capacidade:** C3

**Comando:**  
Qual pergunta a avaliação dos resultados (7.5) responde?

**Alternativas:**
- A) Quantas linhas tem o arquivo de configuração?
- B) Os critérios de saída do plano foram atingidos?
- C) Quantas pessoas escreveram os testes?
- D) Qual ferramenta de teste é a mais famosa?

**Gabarito:** B

---

## ITEM 32 — Critério de Saída

- **Capacidade:** C3

**Comando:**  
Qual destas perguntas faz parte dos critérios de saída vistos na aula?

**Alternativas:**
- A) Qual é a cor do botão principal?
- B) Quantos commits foram feitos hoje?
- C) Qual navegador a equipe prefere?
- D) Há defeito crítico aberto?

**Gabarito:** D

---

## ITEM 33 — Relatório de Testes

- **Capacidade:** C3

**Comando:**  
O que o relatório da avaliação dos resultados deve trazer?

**Alternativas:**
- A) O que foi testado, o que ficou fora e por quê, defeitos, métricas e a recomendação.
- B) Somente as fotos da equipe trabalhando.
- C) Somente a lista de nomes dos testes.
- D) Somente o percentual geral de cobertura.

**Gabarito:** A

---

## ITEM 34 — Número Geral que Engana

- **Capacidade:** C3

**Comando:**  
O relatório diz 92% de cobertura, mas o pagamento tem 31% de branches. O que recomendar?

**Alternativas:**
- A) Não publicar até cobrir os desvios do pagamento, com meta por módulo.
- B) Ignorar o pagamento, porque é só um módulo.
- C) Publicar, porque 92% está acima de qualquer meta.
- D) Apagar os testes visuais para baixar o número geral.

**Gabarito:** A

---

## ITEM 35 — Meta por Módulo

- **Capacidade:** C3

**Comando:**  
Por que propor meta por módulo (pagamento ≥ 90%) em vez de olhar só o número geral?

**Alternativas:**
- A) Porque todos os módulos têm o mesmo risco.
- B) Porque o número geral nunca passa de 50%.
- C) Porque os módulos de maior risco precisam de mais testes, e o geral esconde isso.
- D) Porque o Vitest não calcula o número geral.

**Gabarito:** C

---

## ITEM 36 — O Que a Cobertura Mede

- **Capacidade:** C4

**Comando:**  
O que a cobertura de código mede?

**Alternativas:**
- A) Se o código está bem formatado.
- B) Se todos os requisitos foram atendidos.
- C) O que rodou durante os testes, não o que foi conferido.
- D) Se cada teste tem um expect correto.

**Gabarito:** C

---

## ITEM 37 — Teste sem expect

- **Capacidade:** C4

**Comando:**  
Um teste chama aplicarCupom mas não tem nenhum expect. O que acontece com a cobertura?

**Alternativas:**
- A) O Vitest recusa a cobertura do arquivo inteiro.
- B) A cobertura cai para 0%.
- C) As linhas contam como cobertas, mas nada foi verificado.
- D) O teste encontra todos os defeitos da função.

**Gabarito:** C

---

## ITEM 38 — Requisito Esquecido

- **Capacidade:** C4

**Comando:**  
Por que um requisito esquecido não aparece no relatório de cobertura?

**Alternativas:**
- A) Porque o Vitest apaga os requisitos sem teste.
- B) Porque ele não tem código, e a cobertura só olha o código que existe.
- C) Porque requisitos ficam na pasta coverage.
- D) Porque o relatório só mostra requisitos aprovados.

**Gabarito:** B

---

## ITEM 39 — Cruzando com a Rastreabilidade

- **Capacidade:** C4

**Comando:**  
Com o que a cobertura deve ser cruzada para conferir se os requisitos foram testados?

**Alternativas:**
- A) Com a lista de dependências do package.json.
- B) Com o histórico de commits da semana.
- C) Com o arquivo .gitignore do projeto.
- D) Com a matriz de rastreabilidade, que liga requisitos aos casos de teste.

**Gabarito:** D

---

## ITEM 40 — Defeito no Valor-Limite

- **Capacidade:** C4

**Comando:**  
A função usa <= no lugar de < no valor mínimo, e a suíte tem 100% de cobertura. Que teste acha o defeito?

**Alternativas:**
- A) Um teste sem cupom.
- B) Rodar a cobertura de novo.
- C) Um teste com o total muito maior que o mínimo.
- D) Um caso de borda com o total exatamente igual ao valor mínimo.

**Gabarito:** D

---

## ITEM 41 — Lição da Dinâmica

- **Capacidade:** C4

**Comando:**  
Qual é a conclusão da dinâmica "100% e ainda com defeito"?

**Alternativas:**
- A) Casos de borda são desnecessários com cobertura alta.
- B) A cobertura diz onde não há teste; não diz se o teste é bom.
- C) Com 100% de cobertura não existe defeito.
- D) Cobertura alta substitui o plano de testes.

**Gabarito:** B

---

## ITEM 42 — Suíte Manutenível

- **Capacidade:** C4

**Comando:**  
O que é uma suíte de testes fácil de manter (4.5)?

**Alternativas:**
- A) Uma suíte com todos os testes num arquivo só.
- B) Uma suíte com o maior número possível de testes.
- C) Uma suíte que ninguém precisa ler.
- D) Uma suíte que a equipe entende e altera sem medo.

**Gabarito:** D

---

## ITEM 43 — Nome do Teste

- **Capacidade:** C4

**Comando:**  
Qual nome de teste ajuda mais na manutenção da suíte?

**Alternativas:**
- A) 'teste 3'
- B) 'recusa cupom vencido'
- C) 'aaa'
- D) 'funciona'

**Gabarito:** B

---

## ITEM 44 — Um Comportamento por Teste

- **Capacidade:** C4

**Comando:**  
Por que cada teste deve conferir um comportamento só?

**Alternativas:**
- A) Para a suíte ter mais arquivos.
- B) Para o teste rodar mais devagar.
- C) Para que, quando falhar, fique claro o que quebrou e só ele precise mudar.
- D) Porque o Vitest aceita só um expect por arquivo.

**Gabarito:** C

---

## ITEM 45 — Teste pelo Comportamento

- **Capacidade:** C4

**Comando:**  
Trocar o CSS da loja quebrou vários testes de tela. O que isso indica?

**Alternativas:**
- A) Os testes dependem de detalhes de estilo, e não do comportamento.
- B) A cobertura subiu para 100%.
- C) É preciso parar de mudar o CSS.
- D) Os testes estão perfeitos e o CSS está errado.

**Gabarito:** A

---

## ITEM 46 — Testes Independentes

- **Capacidade:** C4

**Comando:**  
Por que testes independentes ajudam na manutenção?

**Alternativas:**
- A) Porque testes independentes não precisam de expect.
- B) Porque só rodam na ordem em que foram escritos.
- C) Um teste pode ser alterado ou rodado sozinho sem quebrar os outros.
- D) Porque assim os testes compartilham os mesmos dados.

**Gabarito:** C

---

## ITEM 47 — Metas Mínimas

- **Capacidade:** C3

**Comando:**  
Qual opção do bloco coverage define as metas mínimas de cobertura?

**Alternativas:**
- A) include
- B) thresholds
- C) reporter
- D) environment

**Gabarito:** B

---

## ITEM 48 — Configurando as Metas

- **Capacidade:** C3

**Comando:**  
Qual configuração define meta de 80% para as quatro métricas?

**Alternativas:**
- A) reporter: ['80', 'html']
- B) thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 }
- C) include: ['80%']
- D) environment: 'jsdom-80'

**Gabarito:** B

---

## ITEM 49 — Abaixo da Meta

- **Capacidade:** C3

**Comando:**  
O que acontece com npm run test:coverage quando a cobertura fica abaixo dos thresholds?

**Alternativas:**
- A) O comando aumenta a cobertura sozinho.
- B) Nada: a meta é só um comentário.
- C) O comando apaga os testes que faltam.
- D) O comando termina com erro.

**Gabarito:** D

---

## ITEM 50 — Metas no Pipeline

- **Capacidade:** C3

**Comando:**  
Quando o comando com thresholds roda no pipeline do GitHub Actions, o que ele garante?

**Alternativas:**
- A) O merge é bloqueado se a cobertura cair abaixo da meta.
- B) O site é publicado mesmo com a cobertura baixa.
- C) A cobertura deixa de ser medida.
- D) Os testes deixam de ser executados.

**Gabarito:** A
