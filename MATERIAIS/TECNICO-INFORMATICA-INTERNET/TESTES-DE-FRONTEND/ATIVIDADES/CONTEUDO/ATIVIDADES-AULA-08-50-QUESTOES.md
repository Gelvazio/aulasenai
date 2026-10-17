# Atividade: TDD e Debugging Moderno no Front-End — 50 Questões

- **Aula:** 08
- **Tema:** TDD e Debugging Moderno no Front-End
- **Ícone:** 🔁
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Desenvolver conjunto de testes automatizados com TDD e depurar falhas: o ciclo vermelho, verde e refatorar, vantagens e limites do TDD, TDD do validador de CPF, caixa branca guiando o próximo teste (3.2), TDD no componente de filtro de produtos, depuração com it.only, breakpoint e screen.debug, responsabilidade na entrega (1.1) e code review de testes com respeito.
- **Conteúdo-base:** ../CONTEUDO/AULA-08-TDD-E-DEBUGGING-NO-FRONT-END.md
- **Slides:** ../AULAS/AULA-08-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-08-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que É TDD

- **Capacidade:** C5

**Comando:**  
O que é TDD (Test-Driven Development)?

**Alternativas:**
- A) Escrever o teste antes do código, deixando o teste guiar o desenvolvimento.
- B) Testar o sistema só no navegador, sem código de teste.
- C) Escrever todos os testes no fim, depois que o código está pronto.
- D) Escrever o código sem nenhum teste para ganhar tempo.

**Gabarito:** A

---

## ITEM 02 — Ordem do Ciclo

- **Capacidade:** C5

**Comando:**  
Qual é a ordem correta do ciclo do TDD?

**Alternativas:**
- A) Vermelho, refatorar e verde.
- B) Verde, refatorar e vermelho.
- C) Refatorar, vermelho e verde.
- D) Vermelho, verde e refatorar.

**Gabarito:** D

---

## ITEM 03 — Fase Vermelha

- **Capacidade:** C5

**Comando:**  
O que se faz na fase vermelha do TDD?

**Alternativas:**
- A) Melhora-se o nome das funções.
- B) Escreve-se todo o código da funcionalidade.
- C) Apaga-se o teste que falhou.
- D) Escreve-se um teste que falha.

**Gabarito:** D

---

## ITEM 04 — Fim da Fase Vermelha

- **Capacidade:** C5

**Comando:**  
Como saber que a fase vermelha terminou do jeito certo?

**Alternativas:**
- A) O código fica com menos de 10 linhas.
- B) O Vitest mostra a falha pelo motivo esperado.
- C) O arquivo de teste é apagado.
- D) Todos os testes ficam verdes.

**Gabarito:** B

---

## ITEM 05 — Fase Verde

- **Capacidade:** C5

**Comando:**  
O que se faz na fase verde do TDD?

**Alternativas:**
- A) Escreve-se mais um teste que falha.
- B) Remove-se o teste para a suíte passar.
- C) Escreve-se o código mais completo possível de uma vez.
- D) Escreve-se o mínimo de código para o teste passar.

**Gabarito:** D

---

## ITEM 06 — Fase Refatorar

- **Capacidade:** C5

**Comando:**  
O que se faz na fase de refatorar?

**Alternativas:**
- A) Escreve-se um teste novo que falha.
- B) Muda-se o comportamento da função sem rodar os testes.
- C) Melhoram-se nomes, tira-se duplicação e extraem-se funções, mantendo tudo verde.
- D) Apagam-se os testes que já passaram.

**Gabarito:** C

---

## ITEM 07 — Fim da Refatoração

- **Capacidade:** C5

**Comando:**  
Como saber que a refatoração terminou sem estragar nada?

**Alternativas:**
- A) Pelo menos um teste fica vermelho.
- B) Todos os testes continuam verdes.
- C) O código fica com mais linhas que antes.
- D) A cobertura cai para zero.

**Gabarito:** B

---

## ITEM 08 — Modo Observação

- **Capacidade:** C5

**Comando:**  
Qual comando roda o Vitest em modo observação, testando a cada arquivo salvo?

**Alternativas:**
- A) npx vitest
- B) npx cypress open
- C) npx vitest run --once
- D) npm install vitest

**Gabarito:** A

---

## ITEM 09 — Tamanho do Ciclo

- **Capacidade:** C5

**Comando:**  
Qual deve ser a duração de cada ciclo do TDD?

**Alternativas:**
- A) Curta, de minutos.
- B) Longa, de semanas.
- C) Um ciclo por semestre.
- D) Um ciclo só para o projeto inteiro.

**Gabarito:** A

---

## ITEM 10 — Vantagem do TDD

- **Capacidade:** C5

**Comando:**  
Qual é uma vantagem do TDD vista na aula?

**Alternativas:**
- A) O layout da página fica mais bonito.
- B) O código já nasce testado.
- C) Os testes deixam de ser necessários depois.
- D) O código nunca precisa ser refatorado.

**Gabarito:** B

---

## ITEM 11 — Teste como Documentação

- **Capacidade:** C5

**Comando:**  
Por que se diz que, no TDD, o teste serve de documentação?

**Alternativas:**
- A) Porque o teste guarda a senha do sistema.
- B) Porque o teste substitui o manual do usuário impresso.
- C) Porque o teste descreve o comportamento esperado do código.
- D) Porque o teste é escrito em português formal.

**Gabarito:** C

---

## ITEM 12 — Quando Não Usar TDD

- **Capacidade:** C5

**Comando:**  
Em qual tarefa o TDD não é indicado, segundo a aula?

**Alternativas:**
- A) Ajustar cores, espaçamentos e layout.
- B) Calcular o desconto do carrinho.
- C) Filtrar os produtos pelo texto digitado.
- D) Validar o CPF do cliente.

**Gabarito:** A

---

## ITEM 13 — Conferindo o Layout

- **Capacidade:** C5

**Comando:**  
Como cores e espaçamentos são conferidos, já que não se usa TDD para eles?

**Alternativas:**
- A) Não são conferidos de nenhuma forma.
- B) Com it.only em todos os testes.
- C) Visualmente e com testes de acessibilidade.
- D) Somente com testes unitários do CPF.

**Gabarito:** C

---

## ITEM 14 — Primeiro Teste do CPF

- **Capacidade:** C5

**Comando:**  
Qual é o primeiro teste do ciclo 1 do validador de CPF?

**Alternativas:**
- A) expect(validarCPF('')).toBe(false);
- B) expect(validarCPF('529.982.247-25')).toBe(true);
- C) expect(validarCPF('')).toBe(true);
- D) expect(validarCPF).toBeUndefined();

**Gabarito:** A

---

## ITEM 15 — Por Que o Primeiro Teste Falha

- **Capacidade:** C5

**Comando:**  
No ciclo 1, por que o teste do CPF vazio falha?

**Alternativas:**
- A) Porque a função validarCPF ainda não existe.
- B) Porque o CPF vazio é válido.
- C) Porque o Vitest não aceita textos vazios.
- D) Porque o teste está com o nome errado.

**Gabarito:** A

---

## ITEM 16 — Código Mínimo

- **Capacidade:** C5

**Comando:**  
Qual é o código mínimo que deixa verde o teste do CPF vazio?

**Alternativas:**
- A) A validação completa com os dois dígitos verificadores.
- B) Nenhum código: o teste passa sozinho.
- C) export function validarCPF() { return true; }
- D) export function validarCPF() { return false; }

**Gabarito:** D

---

## ITEM 17 — O return false Proposital

- **Capacidade:** C5

**Comando:**  
Por que o primeiro verde pode ser só return false?

**Alternativas:**
- A) Porque o TDD proíbe escrever if.
- B) Porque todo CPF é inválido.
- C) Porque assim a função nunca mais precisa mudar.
- D) Porque o próximo teste obriga o código a evoluir.

**Gabarito:** D

---

## ITEM 18 — Ciclo do Tamanho

- **Capacidade:** C5

**Comando:**  
Qual teste representa o ciclo do CPF com tamanho diferente de 11 dígitos?

**Alternativas:**
- A) expect(validarCPF('52998224725')).toBe(true);
- B) expect(validarCPF('')).toBe(true);
- C) expect(validarCPF(11)).toBe(11);
- D) expect(validarCPF('5299822472')).toBe(false);

**Gabarito:** D

---

## ITEM 19 — Dígitos Iguais

- **Capacidade:** C5

**Comando:**  
Por que o teste usa 111.111.111-11 no ciclo 3?

**Alternativas:**
- A) Porque é o CPF válido mais simples.
- B) Porque CPF com todos os dígitos iguais deve ser recusado.
- C) Porque tem menos de 11 dígitos.
- D) Porque tem letras no meio.

**Gabarito:** B

---

## ITEM 20 — Dígito Verificador Correto

- **Capacidade:** C5

**Comando:**  
Qual teste do ciclo 4 confere um CPF com dígitos verificadores corretos?

**Alternativas:**
- A) expect(validarCPF('111.111.111-11')).toBe(true);
- B) expect(validarCPF('529.982.247-25')).toBe(true);
- C) expect(validarCPF('abc')).toBe(true);
- D) expect(validarCPF('52998224726')).toBe(true);

**Gabarito:** B

---

## ITEM 21 — Dígito Verificador Errado

- **Capacidade:** C5

**Comando:**  
Qual teste confere que um CPF com dígito verificador errado é recusado?

**Alternativas:**
- A) expect(validarCPF('52998224726')).toBe(true);
- B) expect(validarCPF('529.982.247-25')).toBe(false);
- C) expect(validarCPF('52998224726')).toBe(false);
- D) expect(validarCPF()).toBe(true);

**Gabarito:** C

---

## ITEM 22 — Limpando a Pontuação

- **Capacidade:** C5

**Comando:**  
O que a linha String(valor).replace(/[.-]/g, '') faz no validarCPF?

**Alternativas:**
- A) Tira os pontos e o traço, deixando só os números.
- B) Apaga o CPF inteiro.
- C) Troca todos os números por letras.
- D) Acrescenta pontos e traço ao CPF.

**Gabarito:** A

---

## ITEM 23 — Padrão de 11 Dígitos

- **Capacidade:** C5

**Comando:**  
O que a constante PADRAO_ONZE_DIGITOS = /^\d{11}$/ confere?

**Alternativas:**
- A) Que todos os dígitos são iguais.
- B) Que o valor tem exatamente 11 dígitos e nada mais.
- C) Que o CPF tem pontos e traço.
- D) Que o valor tem pelo menos uma letra.

**Gabarito:** B

---

## ITEM 24 — Teste Que Passa Direto

- **Capacidade:** C5

**Comando:**  
Um teste novo passou direto para o verde, sem mudar o código. O que isso indica?

**Alternativas:**
- A) O teste não testava nada novo, e o caso precisa ser revisto.
- B) É preciso apagar todos os outros testes.
- C) O Vitest está com defeito.
- D) O código está perfeito e o ciclo pode ser pulado.

**Gabarito:** A

---

## ITEM 25 — Teste Estrutural

- **Capacidade:** C5

**Comando:**  
O que é o teste estrutural (caixa branca, 3.2)?

**Alternativas:**
- A) O teste feito sem acesso ao código.
- B) O teste que olha o código por dentro para exercitar cada caminho.
- C) O teste que confere apenas as cores da página.
- D) O teste que só usa o que o usuário vê na tela.

**Gabarito:** B

---

## ITEM 26 — Próximo Teste pela Caixa Branca

- **Capacidade:** C5

**Comando:**  
Depois de cada verde, como a caixa branca ajuda a escolher o próximo teste?

**Alternativas:**
- A) Repetindo o último teste com outro nome.
- B) Escolhendo o teste com o nome mais curto.
- C) Apagando os testes que já passaram.
- D) Procurando um if cujo outro lado nenhum teste exercita.

**Gabarito:** D

---

## ITEM 27 — Caminho do Dígito Zero

- **Capacidade:** C5

**Comando:**  
Qual CPF válido passa pelo caminho do dígito 0 no primeiro dígito verificador?

**Alternativas:**
- A) 52998224726
- B) 111.111.111-11
- C) 000
- D) 123.456.789-09

**Gabarito:** D

---

## ITEM 28 — Os Dois Caminhos

- **Capacidade:** C5

**Comando:**  
Por que testar 111.444.777-35 e 123.456.789-09?

**Alternativas:**
- A) Porque os dois são inválidos.
- B) Porque os dois têm letras.
- C) Porque são os CPFs mais curtos possíveis.
- D) Porque cada um passa por um caminho diferente da condição resto < 2.

**Gabarito:** D

---

## ITEM 29 — Filtro sem Texto

- **Capacidade:** C5

**Comando:**  
No TDD do filtro de produtos, qual é o primeiro comportamento testado?

**Alternativas:**
- A) Aparece a mensagem de nada encontrado.
- B) Sem texto digitado, todos os produtos aparecem.
- C) A busca ignora acentos.
- D) Digitar mouse mostra só os mouses.

**Gabarito:** B

---

## ITEM 30 — Query da Lista

- **Capacidade:** C5

**Comando:**  
Qual query encontra todos os produtos mostrados como itens de lista?

**Alternativas:**
- A) document.querySelector('.lista li:first-child')
- B) screen.getAllByRole('listitem')
- C) screen.getByClass('produto')
- D) screen.getByText('listitem')

**Gabarito:** B

---

## ITEM 31 — Maiúsculas e Acentos

- **Capacidade:** C5

**Comando:**  
Qual comportamento do filtro é conferido digitando TECLADO?

**Alternativas:**
- A) A busca mostra todos os produtos menos o teclado.
- B) A busca ignora maiúsculas e acentos e encontra "Teclado".
- C) A busca só funciona com letras maiúsculas.
- D) A busca apaga o texto digitado.

**Gabarito:** B

---

## ITEM 32 — Filtros Combinados

- **Capacidade:** C5

**Comando:**  
O que o ciclo "categoria Periféricos + texto" confere?

**Alternativas:**
- A) Que a lista fica sempre vazia.
- B) Que o texto apaga a categoria escolhida.
- C) Que a categoria desliga a busca por texto.
- D) Que os dois filtros funcionam juntos.

**Gabarito:** D

---

## ITEM 33 — Nada Encontrado

- **Capacidade:** C5

**Comando:**  
Qual verificação confere a mensagem quando nenhum produto combina com a busca?

**Alternativas:**
- A) expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
- B) expect(console.log).toBe('nada');
- C) expect(screen.getAllByRole('listitem')).toHaveLength(10);
- D) screen.debug('Nenhum produto encontrado');

**Gabarito:** A

---

## ITEM 34 — TDD na Interface

- **Capacidade:** C5

**Comando:**  
No TDD do componente, o que os testes conferem?

**Alternativas:**
- A) A quantidade de linhas do arquivo CSS.
- B) Os nomes das variáveis internas do componente.
- C) O que o usuário vê na tela.
- D) A ordem dos imports do arquivo.

**Gabarito:** C

---

## ITEM 35 — Lendo a Falha

- **Capacidade:** C5

**Comando:**  
Qual é o primeiro passo da depuração quando um teste falha?

**Alternativas:**
- A) Rodar a suíte 100 vezes seguidas.
- B) Ler a mensagem: o esperado, o recebido e a linha do teste.
- C) Apagar o teste que falhou.
- D) Reescrever toda a função do zero.

**Gabarito:** B

---

## ITEM 36 — Isolando o Teste

- **Capacidade:** C5

**Comando:**  
O que faz o it.only em um teste?

**Alternativas:**
- A) Roda aquele teste duas vezes.
- B) Roda só aquele teste.
- C) Apaga aquele teste da suíte.
- D) Pula aquele teste.

**Gabarito:** B

---

## ITEM 37 — Isolando o Grupo

- **Capacidade:** C5

**Comando:**  
O que faz o describe.only?

**Alternativas:**
- A) Renomeia o grupo de testes.
- B) Roda todos os grupos menos aquele.
- C) Roda só aquele grupo de testes.
- D) Desliga o Vitest.

**Gabarito:** C

---

## ITEM 38 — Breakpoint no VS Code

- **Capacidade:** C5

**Comando:**  
Como fazer o código parar na linha marcada com breakpoint durante os testes?

**Alternativas:**
- A) Abrir o JavaScript Debug Terminal e rodar npx vitest run nele.
- B) Fechar o VS Code e abrir o navegador.
- C) Colocar um it.only na linha do código.
- D) Rodar npm install com a linha marcada.

**Gabarito:** A

---

## ITEM 39 — O Que o Breakpoint Mostra

- **Capacidade:** C5

**Comando:**  
Quando o código para no breakpoint, o que ele mostra?

**Alternativas:**
- A) O valor de cada variável naquele momento.
- B) A lista de commits do projeto.
- C) A cobertura de todos os arquivos.
- D) O HTML final da página publicada.

**Gabarito:** A

---

## ITEM 40 — screen.debug

- **Capacidade:** C5

**Comando:**  
O que faz o screen.debug() num teste de componente?

**Alternativas:**
- A) Apaga o DOM do teste.
- B) Imprime o HTML atual da tela do teste.
- C) Roda só aquele teste.
- D) Corrige automaticamente o teste que falhou.

**Gabarito:** B

---

## ITEM 41 — Defeito do resto <= 2

- **Capacidade:** C5

**Comando:**  
A função antiga usava resto <= 2 no cálculo do dígito. Qual era o efeito?

**Alternativas:**
- A) Recusava só CPFs com letras.
- B) Aceitava todos os CPFs, mesmo os inválidos.
- C) Recusava todo CPF cujo dígito deveria ser 9.
- D) Não mudava nada no resultado.

**Gabarito:** C

---

## ITEM 42 — Corrigir e Confirmar

- **Capacidade:** C5

**Comando:**  
Qual é o último passo da depuração?

**Alternativas:**
- A) Tirar o .only, rodar a suíte inteira e registrar a causa.
- B) Manter o .only para o teste ficar mais rápido.
- C) Apagar a mensagem de erro do terminal.
- D) Entregar sem rodar os outros testes.

**Gabarito:** A

---

## ITEM 43 — it.only no Repositório

- **Capacidade:** C5

**Comando:**  
Por que o it.only não pode ir para o repositório?

**Alternativas:**
- A) Porque só aquele teste rodaria e os outros seriam pulados sem ninguém perceber.
- B) Porque ele apaga o arquivo de teste.
- C) Porque ele deixa o teste mais lento.
- D) Porque o Git não aceita a palavra only.

**Gabarito:** A

---

## ITEM 44 — console.log de Depuração

- **Capacidade:** C5

**Comando:**  
O que fazer com o console.log usado para depurar antes de entregar?

**Alternativas:**
- A) Copiar para todos os outros arquivos.
- B) Trocar por um alert na página.
- C) Apagar, por responsabilidade com o código entregue (1.1).
- D) Deixar, para ajudar o próximo programador.

**Gabarito:** C

---

## ITEM 45 — Code Review

- **Capacidade:** C5

**Comando:**  
O que é o code review de testes?

**Alternativas:**
- A) Escrever os testes depois de publicar o site.
- B) Apagar os testes de outra dupla.
- C) Outra pessoa ler os testes antes de juntar o código.
- D) Rodar os testes só no computador do professor.

**Gabarito:** C

---

## ITEM 46 — Pergunta do Code Review

- **Capacidade:** C5

**Comando:**  
Qual destas é uma pergunta útil no code review de testes?

**Alternativas:**
- A) O teste tem mais de 100 linhas?
- B) Quantas horas a dupla dormiu?
- C) O teste falharia se o código estivesse errado?
- D) Qual é a cor favorita de quem escreveu o teste?

**Gabarito:** C

---

## ITEM 47 — Testes Dependentes

- **Capacidade:** C5

**Comando:**  
No code review, por que perguntar se o teste depende de outro teste ou de dado externo?

**Alternativas:**
- A) Porque todo teste deve depender do anterior.
- B) Porque testes dependentes rodam mais rápido.
- C) Porque um teste dependente pode passar ou falhar por causa dos outros.
- D) Porque o Vitest exige dados externos.

**Gabarito:** C

---

## ITEM 48 — Comentário Respeitoso

- **Capacidade:** C5

**Comando:**  
Qual é a melhor forma de reescrever o comentário "esse teste está horrível"?

**Alternativas:**
- A) "Refaz tudo, está errado."
- B) "Você não sabe testar."
- C) "Não vou nem comentar."
- D) "Que tal testar também o CPF com dígito 0?"

**Gabarito:** D

---

## ITEM 49 — Recebendo a Sugestão

- **Capacidade:** C5

**Comando:**  
Como quem recebe uma sugestão no code review deve avaliá-la?

**Alternativas:**
- A) Ignorando, porque sugestões não mudam o código.
- B) Aceitando tudo sem pensar, para evitar discussão.
- C) Pelo fato técnico, não pela pessoa, respondendo "aceito, porque..." ou "não vou aplicar, porque...".
- D) Recusando tudo, porque o código é seu.

**Gabarito:** C

---

## ITEM 50 — Ideias Diferentes

- **Capacidade:** C5

**Comando:**  
Por que o code review respeitoso valoriza ideias diferentes (S1)?

**Alternativas:**
- A) Porque só a opinião de quem escreveu o código vale.
- B) Porque deixa o código mais longo.
- C) Porque elimina a necessidade de testes.
- D) Porque cada sugestão é avaliada pelo que melhora no código, e a equipe aprende com outros pontos de vista.

**Gabarito:** D
