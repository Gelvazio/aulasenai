# Atividade: Qualidade, Performance, Acessibilidade e CI CD — 50 Questões

- **Aula:** 09
- **Tema:** Qualidade, Performance, Acessibilidade e CI CD
- **Ícone:** 🚦
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Desenvolver conjunto de testes automatizados no pipeline e verificar a qualidade: integração e entrega contínuas, workflow do GitHub Actions (on, jobs, needs, npm ci e cobertura), proteção da branch e bloqueio de merge, acessibilidade automatizada com axe (4.2), desempenho com Lighthouse e Core Web Vitals (4.4) e interação com a equipe de testes pelo pull request, badge e TESTING.md (2.4).
- **Conteúdo-base:** ../CONTEUDO/AULA-09-QUALIDADE-PERFORMANCE-ACESSIBILIDADE-E-CI-CD.md
- **Slides:** ../AULAS/AULA-09-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-09-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Integração Contínua

- **Capacidade:** C5

**Comando:**  
O que é integração contínua (CI)?

**Alternativas:**
- A) Escrever todo o código sem testes e juntar no fim do projeto.
- B) Publicar o site uma vez por ano, depois de testar à mão.
- C) Rodar os testes só no computador do professor.
- D) Juntar o código várias vezes por dia, com os testes rodando automaticamente a cada envio.

**Gabarito:** D

---

## ITEM 02 — Entrega Contínua

- **Capacidade:** C5

**Comando:**  
O que é entrega contínua (CD)?

**Alternativas:**
- A) Rodar os testes à mão antes de cada publicação.
- B) Escrever os testes depois da publicação.
- C) Publicar automaticamente o que passou pelo CI.
- D) Apagar as versões antigas do site.

**Gabarito:** C

---

## ITEM 03 — Vantagem do CI

- **Capacidade:** C5

**Comando:**  
Qual é a principal vantagem do CI para a equipe?

**Alternativas:**
- A) Ninguém depende de lembrar de rodar os testes: o servidor roda sempre do mesmo jeito.
- B) O código passa a ser publicado sem nenhuma verificação.
- C) Os testes deixam de ser necessários.
- D) Cada pessoa testa de um jeito diferente.

**Gabarito:** A

---

## ITEM 04 — Arquivo do Workflow

- **Capacidade:** C5

**Comando:**  
Onde fica o arquivo do workflow do GitHub Actions visto na aula?

**Alternativas:**
- A) .github/workflows/ci.yml
- B) package.json, na chave workflow
- C) src/workflows/ci.js
- D) .gitignore

**Gabarito:** A

---

## ITEM 05 — Chave on

- **Capacidade:** C5

**Comando:**  
No workflow, para que serve a chave on?

**Alternativas:**
- A) Define quando o workflow roda: a cada push na main e a cada pull request.
- B) Instala o Node no servidor.
- C) Liga a cobertura de testes.
- D) Define a máquina virtual usada.

**Gabarito:** A

---

## ITEM 06 — Chave jobs

- **Capacidade:** C5

**Comando:**  
O que a chave jobs agrupa no workflow?

**Alternativas:**
- A) Os nomes dos integrantes da equipe.
- B) As dependências do package.json.
- C) Os grupos de passos que o pipeline executa.
- D) As branches protegidas do repositório.

**Gabarito:** C

---

## ITEM 07 — Chave runs-on

- **Capacidade:** C5

**Comando:**  
O que define runs-on: ubuntu-latest?

**Alternativas:**
- A) A versão do Node instalada.
- B) A branch que recebe o merge.
- C) A máquina virtual Linux em que o job roda.
- D) O navegador usado nos testes E2E.

**Gabarito:** C

---

## ITEM 08 — actions/checkout

- **Capacidade:** C5

**Comando:**  
O que faz o passo actions/checkout no workflow?

**Alternativas:**
- A) Publica o site na internet.
- B) Apaga os testes que falharam.
- C) Aprova o pull request automaticamente.
- D) Baixa o código do repositório para a máquina do job.

**Gabarito:** D

---

## ITEM 09 — setup-node com cache

- **Capacidade:** C5

**Comando:**  
Para que serve o passo setup-node com cache: npm?

**Alternativas:**
- A) Instala o Node e reaproveita os pacotes entre execuções.
- B) Apaga o package-lock.json a cada execução.
- C) Instala o Cypress no computador do aluno.
- D) Desliga o cache do navegador.

**Gabarito:** A

---

## ITEM 10 — npm ci

- **Capacidade:** C5

**Comando:**  
Por que o pipeline usa npm ci e não npm install?

**Alternativas:**
- A) Porque o npm ci instala exatamente o que está no package-lock.json.
- B) Porque o npm ci atualiza todas as versões para a mais nova.
- C) Porque o npm ci não instala nenhuma dependência.
- D) Porque o npm install não funciona no Linux.

**Gabarito:** A

---

## ITEM 11 — Cobertura no Pipeline

- **Capacidade:** C5

**Comando:**  
Por que o job falha quando a cobertura fica abaixo da meta?

**Alternativas:**
- A) Porque os limites da aula 7 fazem o npm run test:coverage terminar com erro.
- B) Porque o YAML não aceita números.
- C) Porque o GitHub apaga os arquivos sem teste.
- D) Porque o Node para de funcionar.

**Gabarito:** A

---

## ITEM 12 — Indentação do YAML

- **Capacidade:** C5

**Comando:**  
Qual é a regra de indentação do YAML vista na aula?

**Alternativas:**
- A) 2 espaços por nível, nunca tab.
- B) Sempre 1 tab por nível.
- C) Qualquer quantidade, porque o YAML ignora espaços.
- D) 4 tabs por nível.

**Gabarito:** A

---

## ITEM 13 — needs: testes

- **Capacidade:** C5

**Comando:**  
O que faz needs: testes no job de E2E?

**Alternativas:**
- A) Instala o Cypress no job testes.
- B) Faz o E2E rodar antes de todos os outros jobs.
- C) Faz o E2E rodar só se o job testes passar.
- D) Desliga o job testes.

**Gabarito:** C

---

## ITEM 14 — Por Que E2E Depois

- **Capacidade:** C5

**Comando:**  
Por que é bom o E2E rodar só depois dos testes unitários e de integração?

**Alternativas:**
- A) Porque o E2E não encontra defeitos.
- B) Porque o GitHub proíbe dois jobs no mesmo arquivo.
- C) Porque o E2E apaga o resultado dos outros testes.
- D) Porque o E2E é o mais lento, e não vale rodá-lo se os rápidos já falharam.

**Gabarito:** D

---

## ITEM 15 — Action do Cypress

- **Capacidade:** C5

**Comando:**  
Na action do Cypress, para que servem start: npm run dev e wait-on?

**Alternativas:**
- A) Iniciam a aplicação e esperam o endereço responder antes dos testes.
- B) Abrem o painel visual do Cypress no computador do aluno.
- C) Instalam o Vitest e rodam a cobertura.
- D) Publicam o site e encerram o workflow.

**Gabarito:** A

---

## ITEM 16 — Proteção da Branch

- **Capacidade:** C5

**Comando:**  
Onde se cria a regra que protege a branch main no GitHub?

**Alternativas:**
- A) No terminal, com npm run protect.
- B) No README.md do projeto.
- C) No arquivo package.json.
- D) Em Settings → Branches, numa regra para a main.

**Gabarito:** D

---

## ITEM 17 — Exigências da Proteção

- **Capacidade:** C5

**Comando:**  
Quais exigências da proteção da main foram vistas na aula?

**Alternativas:**
- A) Status dos testes aprovado e pelo menos 1 revisão aprovada no pull request.
- B) Somente que o autor seja o professor.
- C) Que ninguém revise o pull request.
- D) Que o pull request tenha mais de 100 arquivos.

**Gabarito:** A

---

## ITEM 18 — Pull Request Bloqueado

- **Capacidade:** C5

**Comando:**  
Com a proteção ativa, o que acontece com um pull request com teste quebrado?

**Alternativas:**
- A) O pull request é juntado e o teste é apagado.
- B) O check fica vermelho e o pull request não pode ser juntado.
- C) O check fica verde mesmo com o teste quebrado.
- D) O GitHub corrige o teste sozinho.

**Gabarito:** B

---

## ITEM 19 — Garantia da Proteção

- **Capacidade:** C5

**Comando:**  
O que a proteção da branch garante para a main?

**Alternativas:**
- A) Que ela só recebe código testado.
- B) Que qualquer pessoa pode juntar qualquer código.
- C) Que ela nunca recebe código novo.
- D) Que os testes deixam de rodar nela.

**Gabarito:** A

---

## ITEM 20 — Acessibilidade e Usabilidade

- **Capacidade:** C5

**Comando:**  
Por que a acessibilidade faz parte da usabilidade (4.2)?

**Alternativas:**
- A) Porque usabilidade é apenas a velocidade da página.
- B) Porque leitores de tela não acessam sites.
- C) Porque a tela precisa ser usável também por quem usa leitor de tela, teclado ou alto contraste.
- D) Porque acessibilidade só trata das cores da marca.

**Gabarito:** C

---

## ITEM 21 — axe-core

- **Capacidade:** C5

**Comando:**  
O que o axe-core confere automaticamente?

**Alternativas:**
- A) A cobertura de código da suíte.
- B) O tempo de carregamento da página.
- C) Regras de acessibilidade (WCAG) da página.
- D) A indentação do arquivo YAML.

**Gabarito:** C

---

## ITEM 22 — Instalando o vitest-axe

- **Capacidade:** C5

**Comando:**  
Qual comando instala o vitest-axe como dependência de desenvolvimento?

**Alternativas:**
- A) npx axe install
- B) npm install -D vitest-axe
- C) npm init axe@latest
- D) npm run axe

**Gabarito:** B

---

## ITEM 23 — Teste com axe

- **Capacidade:** C5

**Comando:**  
Qual verificação confere que o checkout não tem violações de acessibilidade?

**Alternativas:**
- A) expect(axe).toBeDefined();
- B) expect(resultado.violations).toHaveLength(0);
- C) expect(resultado.violations).toHaveLength(1);
- D) expect(resultado).toBe(true);

**Gabarito:** B

---

## ITEM 24 — Chamando o axe

- **Capacidade:** C5

**Comando:**  
Como o teste chama o axe sobre a tela montada?

**Alternativas:**
- A) const resultado = axe.run('checkout.html');
- B) const resultado = await fetch('/axe');
- C) const resultado = document.body.axe();
- D) const resultado = await axe(document.body);

**Gabarito:** D

---

## ITEM 25 — Campo sem Rótulo

- **Capacidade:** C5

**Comando:**  
Qual é a correção para um campo de CEP sem rótulo?

**Alternativas:**
- A) Apagar o campo do formulário.
- B) Trocar a cor de fundo do campo.
- C) Aumentar o tamanho da fonte do campo.
- D) <label for="cep">CEP</label> ligado ao input com id="cep".

**Gabarito:** D

---

## ITEM 26 — Imagem sem Texto Alternativo

- **Capacidade:** C5

**Comando:**  
Qual é a correção para uma imagem de produto sem texto alternativo?

**Alternativas:**
- A) class="imagem-produto"
- B) alt=""
- C) title="imagem"
- D) alt="Fone de ouvido sem fio preto"

**Gabarito:** D

---

## ITEM 27 — Botão Só com Ícone

- **Capacidade:** C5

**Comando:**  
Qual é a correção para um botão de lixeira que só tem um ícone?

**Alternativas:**
- A) aria-label="Remover item"
- B) id="botao1"
- C) style="color: red"
- D) class="botao-lixeira"

**Gabarito:** A

---

## ITEM 28 — Contraste Mínimo

- **Capacidade:** C5

**Comando:**  
Qual é a relação de contraste mínima citada na aula para o texto?

**Alternativas:**
- A) 2:1
- B) 1:1
- C) 4,5:1
- D) 10:1

**Gabarito:** C

---

## ITEM 29 — Limite do axe

- **Capacidade:** C5

**Comando:**  
O axe dispensa o teste manual de acessibilidade?

**Alternativas:**
- A) Sim: ele encontra todos os problemas de acessibilidade.
- B) Não: ele encontra parte dos problemas; o resto exige teclado e leitor de tela.
- C) Sim: o teste manual é proibido.
- D) Não: o axe não encontra nenhum problema.

**Gabarito:** B

---

## ITEM 30 — Onde Fica o Lighthouse

- **Capacidade:** C5

**Comando:**  
Onde se roda a auditoria do Lighthouse vista na aula?

**Alternativas:**
- A) Dentro do arquivo ci.yml.
- B) No Chrome DevTools, na aba Lighthouse.
- C) No Settings → Branches do GitHub.
- D) No terminal, com npm ci.

**Gabarito:** B

---

## ITEM 31 — Modo da Auditoria

- **Capacidade:** C5

**Comando:**  
Em que modo a página deve ser auditada no Lighthouse, segundo a aula?

**Alternativas:**
- A) Modo impressão.
- B) Modo somente texto.
- C) Modo desligado.
- D) Modo mobile.

**Gabarito:** D

---

## ITEM 32 — LCP

- **Capacidade:** C5

**Comando:**  
O que mede o LCP (Largest Contentful Paint)?

**Alternativas:**
- A) O tempo de resposta a cliques e toques.
- B) Quanto a página pula enquanto carrega.
- C) O tempo até o maior elemento da página aparecer.
- D) A quantidade de testes da suíte.

**Gabarito:** C

---

## ITEM 33 — Valor Bom de LCP

- **Capacidade:** C5

**Comando:**  
Qual valor de LCP é considerado bom?

**Alternativas:**
- A) Acima de 4 s.
- B) Até 25 s.
- C) Até 2,5 s.
- D) Exatamente 0,1.

**Gabarito:** C

---

## ITEM 34 — INP

- **Capacidade:** C5

**Comando:**  
O que mede o INP (Interaction to Next Paint)?

**Alternativas:**
- A) O tempo até o maior elemento aparecer.
- B) O tamanho das imagens da página.
- C) O tempo de resposta a cliques e toques.
- D) Quanto a página pula enquanto carrega.

**Gabarito:** C

---

## ITEM 35 — Valor Bom de INP

- **Capacidade:** C5

**Comando:**  
Qual valor de INP é considerado bom?

**Alternativas:**
- A) Até 200 ms.
- B) Acima de 2 s.
- C) Exatamente 4,5:1.
- D) Até 20 s.

**Gabarito:** A

---

## ITEM 36 — CLS

- **Capacidade:** C5

**Comando:**  
O que mede o CLS (Cumulative Layout Shift)?

**Alternativas:**
- A) A cobertura de branches.
- B) Quanto a página "pula" enquanto carrega.
- C) O tempo de resposta a cliques.
- D) O tempo até o maior elemento aparecer.

**Gabarito:** B

---

## ITEM 37 — Valor Bom de CLS

- **Capacidade:** C5

**Comando:**  
Qual valor de CLS é considerado bom?

**Alternativas:**
- A) Exatamente 200.
- B) Acima de 2,5.
- C) Até 10.
- D) Até 0,1.

**Gabarito:** D

---

## ITEM 38 — LCP Alto

- **Capacidade:** C5

**Comando:**  
A vitrine tem LCP de 4,8 s por causa de uma imagem de 3 MB. Qual melhoria testar primeiro?

**Alternativas:**
- A) Desligar o CI do repositório.
- B) Otimizar a imagem, deixando-a menor e mais leve.
- C) Acrescentar mais imagens grandes na vitrine.
- D) Trocar o texto dos botões.

**Gabarito:** B

---

## ITEM 39 — Página Que Pula

- **Capacidade:** C5

**Comando:**  
Qual melhoria ajuda o CLS quando a página pula ao carregar as fotos?

**Alternativas:**
- A) Carregar todas as imagens ao mesmo tempo.
- B) Definir largura e altura (width e height) das imagens.
- C) Aumentar o tamanho dos arquivos das imagens.
- D) Remover o texto alternativo das imagens.

**Gabarito:** B

---

## ITEM 40 — Melhorando o INP

- **Capacidade:** C5

**Comando:**  
Qual melhoria típica ajuda o INP (resposta a cliques)?

**Alternativas:**
- A) Imagens maiores na vitrine.
- B) Menos JavaScript na carga inicial.
- C) Mais JavaScript na carga inicial.
- D) Remover os rótulos dos campos.

**Gabarito:** B

---

## ITEM 41 — Fora da Tela

- **Capacidade:** C5

**Comando:**  
O que fazer com o conteúdo que fica fora da tela ao carregar a página?

**Alternativas:**
- A) Transformar o conteúdo em imagem de 3 MB.
- B) Carregar tudo antes de mostrar a primeira tela.
- C) Carregar sob demanda, quando o usuário rolar até ele.
- D) Apagar todo o conteúdo de baixo.

**Gabarito:** C

---

## ITEM 42 — Pull Request como Encontro

- **Capacidade:** C5

**Comando:**  
Por que o pull request é o ponto de encontro da equipe de testes (2.4)?

**Alternativas:**
- A) Porque ali o código é publicado sem revisão.
- B) Porque ali os testes são apagados.
- C) Porque ali cada um trabalha sozinho sem ver os outros.
- D) Porque ali o CI mostra o resultado e os colegas revisam e comentam os testes.

**Gabarito:** D

---

## ITEM 43 — Revisão no Pull Request

- **Capacidade:** C5

**Comando:**  
Na dinâmica do pull request, o que faz o integrante que revisa?

**Alternativas:**
- A) Apaga a branch sem ler.
- B) Desliga a proteção da main.
- C) Comenta onde está a falha.
- D) Junta o pull request mesmo com o check vermelho.

**Gabarito:** C

---

## ITEM 44 — Liberando o Merge

- **Capacidade:** C5

**Comando:**  
Na dinâmica, quando o merge do pull request é liberado?

**Alternativas:**
- A) Quando o professor sai da sala.
- B) Quando o check fica vermelho.
- C) Assim que o pull request é aberto.
- D) Quando o check fica verde e um integrante aprova.

**Gabarito:** D

---

## ITEM 45 — Defeito no Pull Request

- **Capacidade:** C5

**Comando:**  
Por que é melhor pegar o defeito no pull request do que na main?

**Alternativas:**
- A) Porque a main não é usada por ninguém.
- B) Porque é corrigido antes de chegar à loja publicada e aos clientes.
- C) Porque na main o defeito some sozinho.
- D) Porque no pull request ninguém vê o defeito.

**Gabarito:** B

---

## ITEM 46 — Badge

- **Capacidade:** C5

**Comando:**  
O que o badge no README.md mostra?

**Alternativas:**
- A) O número de linhas do projeto.
- B) O estado dos testes da main para qualquer pessoa.
- C) A lista de todas as dependências.
- D) A foto de quem escreveu os testes.

**Gabarito:** B

---

## ITEM 47 — Endereço do Badge

- **Capacidade:** C5

**Comando:**  
Qual é o final do endereço da imagem do badge do workflow ci.yml?

**Alternativas:**
- A) /actions/workflows/ci.yml/badge.svg
- B) /src/ci.js
- C) /package.json/badge
- D) /settings/branches/main.png

**Gabarito:** A

---

## ITEM 48 — TESTING.md

- **Capacidade:** C5

**Comando:**  
O que o TESTING.md documenta?

**Alternativas:**
- A) As senhas do repositório.
- B) Como rodar a suíte, a estratégia de testes e como contribuir com testes.
- C) Somente a lista de clientes da loja.
- D) O histórico de commits do projeto.

**Gabarito:** B

---

## ITEM 49 — Integrante Novo

- **Capacidade:** C5

**Comando:**  
Como o TESTING.md ajuda um integrante novo da equipe?

**Alternativas:**
- A) Ele passa a revisar sem ler o código.
- B) Ele sabe sozinho rodar e escrever testes do mesmo jeito que os outros.
- C) Ele não precisa mais rodar os testes.
- D) Ele pode desligar o CI quando quiser.

**Gabarito:** B

---

## ITEM 50 — Ordem de Impacto

- **Capacidade:** C5

**Comando:**  
No relatório, o axe apontou 7 campos sem rótulo e o Lighthouse mediu LCP de 4,8 s. Como apresentar as correções?

**Alternativas:**
- A) Em ordem alfabética, sem evidências.
- B) Só a mais fácil, escondendo as outras.
- C) Nenhuma, porque os testes já existem.
- D) Em ordem de impacto, com a evidência de cada problema.

**Gabarito:** D
