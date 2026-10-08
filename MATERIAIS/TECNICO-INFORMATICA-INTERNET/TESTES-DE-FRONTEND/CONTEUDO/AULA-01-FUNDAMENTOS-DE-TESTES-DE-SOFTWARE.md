# Aula 01 — Fundamentos de Testes de Software

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 08/10
- **Conhecimentos (ementa do curso):** 5 Conceitos fundamentais (5.1 Verificação · 5.2 Validação) ·
  4 Tipos de testes (4.1 Funcionalidade · 4.2 Usabilidade · 4.3 Confiabilidade · 4.4 Desempenho ·
  4.5 Manutenibilidade) · 1.1 Responsabilidade
- **Capacidades:** C1 — Reconhecer as especificações técnicas da interface · C2 — Reconhecer os
  requisitos da documentação de testes · C3 — Reconhecer as etapas de planejamento de testes
- **Estratégias:** exposição dialogada, estudo de caso, dinâmica em grupo, mapa de conceitos
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md)

## Indicadores

- (1) Diferencia verificação de validação com exemplo de uma tela real (C1/C3).
- (2) Classifica testes por tipo: funcionalidade, usabilidade, confiabilidade, desempenho e
  manutenibilidade (C2).

## Objetivos

- Explicar por que testar faz parte do desenvolvimento de interfaces web, e não é uma etapa extra.
- Diferenciar **erro**, **defeito** e **falha** com exemplos de telas.
- Diferenciar **verificação** de **validação**.
- Classificar um teste pelos 5 tipos da ementa.
- Reconhecer a pirâmide de testes (unitário, integração e E2E), usada ao longo da UC.
- Assumir a **responsabilidade** de não entregar código sem teste e de relatar defeitos com honestidade.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Pergunta disparadora | 20 min | "O botão Finalizar compra parou numa sexta à noite. Quem perde?" (aquecimento da prática) |
| Exposição dialogada | 50 min | Por que testar; erro × defeito × falha; verificação × validação; custo do defeito |
| Prática guiada | 40 min | Mapa de conceitos com um exemplo de interface para cada termo (Prática 1) |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Tribunal do bug" (abaixo) |
| Prática autônoma | 50 min | Classificar 10 cenários por tipo de teste e por camada da pirâmide (Práticas 2 e 3) |
| Socialização e registro | 35 min | Grupos apresentam o mapa; quiz de verificação; síntese no caderno |

## Conteúdo

### 1. Por que testar interfaces web
Toda tela chega ao usuário depois de alguém confirmar que ela faz o que foi pedido. Quando ninguém
confirma, quem descobre o problema é o cliente: o botão que não responde, o total do carrinho errado,
o formulário que apaga tudo ao dar erro. Testar é **produzir evidência** de que o software atende
aos requisitos, antes que o usuário encontre o problema.

Testar **não prova** que o software não tem defeitos. Mostra que os defeitos procurados não estão
lá. Por isso o teste é planejado: escolhemos o que testar pelos requisitos e pelos riscos.

### 2. Erro, defeito e falha

| Termo | O que é | Exemplo numa tela de cadastro |
|---|---|---|
| **Erro (engano)** | Ação humana equivocada | A pessoa programadora entendeu que o CEP tem 9 dígitos |
| **Defeito (bug)** | O problema que ficou no código ou no documento | A validação aceita só `\d{9}` |
| **Falha** | O comportamento errado visto quando o sistema roda | O usuário digita um CEP válido de 8 dígitos e recebe "CEP inválido" |

Um erro gera um defeito, e o defeito, quando executado, provoca a falha. Nem todo defeito vira falha
(o trecho pode nunca rodar), mas todo defeito é um risco.

### 3. O custo do defeito
Quanto mais tarde o defeito é encontrado, mais caro fica corrigi-lo. A ideia é conhecida como
**Regra de 10 de Myers**: o custo cresce cerca de 10 vezes a cada fase (requisito → código → teste
→ produção). Um requisito ambíguo corrigido numa conversa custa minutos; o mesmo defeito em
produção custa vendas perdidas, suporte, correção urgente e nova publicação.

### 4. Verificação e validação (5.1 e 5.2)

| | Verificação (5.1) | Validação (5.2) |
|---|---|---|
| Pergunta | "Estamos construindo o produto **certo conforme a especificação**?" | "É o produto que o **usuário precisa**?" |
| Compara com | Requisitos, protótipo, regras de negócio | Necessidade real e uso do usuário |
| Exemplo | O campo senha exige 8 caracteres, como diz o requisito | O usuário consegue criar a senha sem desistir do cadastro |
| Quando | Durante todo o desenvolvimento | Com o produto (ou protótipo) em uso |

Uma tela pode passar na verificação e falhar na validação: tudo está como a especificação pediu,
mas o usuário não encontra o botão de continuar.

### 5. Tipos de testes (4.1 a 4.5)

| Tipo | Pergunta que responde | Exemplo em interface web |
|---|---|---|
| **4.1 Funcionalidade** | Faz o que o requisito pede? | O cupom de 10% reduz o total em 10% |
| **4.2 Usabilidade** | O usuário consegue usar com facilidade? | A mensagem de erro diz qual campo corrigir; a tela funciona com teclado e leitor de tela |
| **4.3 Confiabilidade** | Continua funcionando quando algo dá errado? | Se a API falhar, a tela mostra aviso e não perde o carrinho |
| **4.4 Desempenho** | Responde no tempo esperado? | A vitrine carrega em menos de 2,5 s numa conexão 4G |
| **4.5 Manutenibilidade** | É fácil de alterar sem quebrar? | Testes legíveis e independentes; trocar uma classe CSS não quebra a suíte |

### 6. A pirâmide de testes (visão da UC)
- **Base — unitários (aulas 3 e 8):** muitos testes rápidos de funções isoladas.
- **Meio — integração (aulas 4 e 5):** componentes com DOM, eventos e API simulada.
- **Topo — E2E (aula 6):** poucos fluxos críticos no navegador real.
- **Transversal — métricas e CI (aulas 7 e 9):** cobertura, testes instáveis e execução automática.

Quanto mais alto na pirâmide, mais lento, mais caro e mais próximo da experiência do usuário.

### 7. Responsabilidade (1.1)
Quem desenvolve é responsável pela qualidade do que entrega. Isso significa: não marcar uma tarefa
como pronta sem teste, relatar um defeito mesmo quando foi você quem o causou e registrar a falha com
dados que permitam reproduzi-la (passos, dado usado, resultado obtido e esperado).

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, foi chamado para analisar a tela de login de uma loja virtual. O
requisito diz: "o sistema deve bloquear o acesso após 3 tentativas com senha errada".
- **Verificação:** após a 3ª senha errada, o botão Entrar fica desabilitado? (sim → atende a
  especificação).
- **Validação:** o usuário entende por que não consegue entrar? A tela só desabilita o botão, sem
  mensagem; os clientes acham que o site travou e desistem. A tela passou na verificação e falhou
  na validação.
- **Classificação:** bloquear após 3 tentativas = funcionalidade (4.1); a mensagem clara =
  usabilidade (4.2); o desbloqueio funcionar mesmo se o e-mail de recuperação demorar =
  confiabilidade (4.3).

Seu relatório de consultor recomenda incluir no requisito: "exibir a mensagem 'Acesso bloqueado
por 15 minutos. Use Esqueci minha senha para entrar agora.'".

## Dinâmica — Tribunal do bug (30 min, grupos de 5)
- **Objetivo:** praticar a diferença entre erro, defeito e falha e classificar o tipo de teste que
  teria encontrado o problema (C2, 1.1).
- **Materiais:** 5 cartões com relatos de falhas em telas (ex.: "o total do carrinho some ao
  atualizar a página"; "a busca leva 9 s"; "o botão Pagar não é lido pelo leitor de tela").
- **Passo a passo:** (1) cada grupo sorteia um cartão; (2) dentro do grupo há 1 juiz, 2 acusadores
  e 2 defensores; (3) os acusadores apontam o **erro** provável e o **defeito**; os defensores
  propõem o **teste** e o **tipo de teste** (4.1 a 4.5) que o teria pego antes; (4) o juiz decide
  em 2 minutos e registra a sentença: "erro · defeito · falha · tipo · camada da pirâmide".
- **Fechamento:** cada juiz lê a sentença. O professor reforça que "culpado" não é a pessoa, e sim
  a falta de verificação (responsabilidade, 1.1).

## Situação-problema e entrega da aula
- **Entrega:** mapa de conceitos (erro, defeito, falha, verificação, validação, tipos de teste e,
  como antecipação da aula 2, caixa preta e caixa branca), com um exemplo de interface para cada
  termo, e a classificação dos 10 cenários da prática.
- **Ligação com a SA 1:** a próxima aula começa a SA 1 (plano formal de testes para autenticação,
  carrinho e checkout de uma loja virtual em React). O mapa desta aula é a base de vocabulário do plano.

## Verificação da aprendizagem
- Para a falha "o preço aparece como NaN", escrever o erro, o defeito e a falha.
- Diferenciar verificação e validação usando a tela de cadastro de um aplicativo que você usa.
- Classificar: "a página do produto leva 6 s para abrir" (4.4); "o campo data não aceita teclado"
  (4.2); "o teste quebra quando mudam o nome de uma classe" (4.5).
- Verdadeiro ou falso: "se todos os testes passam, o sistema não tem defeitos" (falso).

## Recursos
Laboratório de informática, kit multimídia (projetor), computador com acesso à internet, cartões da
dinâmica, slides `../AULAS/AULA-01-SLIDES.pdf` (apresentação) e apostila da UC (capítulo 1).
