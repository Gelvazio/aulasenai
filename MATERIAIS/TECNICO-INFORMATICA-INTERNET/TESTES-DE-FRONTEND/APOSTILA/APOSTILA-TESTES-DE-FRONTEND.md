# Apostila — Testes de Front-End

> **Curso:** Técnico em Informática para Internet · **Docente:** Gelvazio Camargo  
> **Módulo:** ESPECÍFICO I · **Modalidade:** Presencial  
> **Ementa:** EMENTA-CHALKIE-AI.md v2.0 — reescrita a partir da ementa oficial (2026-09-27)  
> **Carga horária da UC:** 40 horas · **Capítulos previstos:** 10 (1 capítulo = 1 aula de 4 horas)  
> **Gerado em:** 03/10/2026, a partir de `APOSTILA/CONTEUDO/`.

> ✏️ **Este arquivo é a fonte final da apostila.** Revise, compare e acrescente dados aqui; o HTML é gerado depois, a partir dele. O sumário é refeito a cada geração.

---

## Sumário

<!-- sumario:inicio (gerado; atualizado a cada geração) -->
- [Ementa da matéria (texto oficial)](#ementa-da-matéria-texto-oficial)
  - [Justificativa](#justificativa)
  - [Função](#função)
  - [Objetivo geral](#objetivo-geral)
  - [Avaliação](#avaliação)
  - [Recursos e ambientes](#recursos-e-ambientes)
  - [Acessibilidade](#acessibilidade)
  - [Situações de aprendizagem](#situações-de-aprendizagem)
  - [Dificuldades comuns (e como tratar)](#dificuldades-comuns-e-como-tratar)
  - [Estratégia de testes da UC (pirâmide)](#estratégia-de-testes-da-uc-pirâmide)
  - [Capacidades × conhecimentos (ementa)](#capacidades--conhecimentos-ementa)
  - [Regras para IA (seguidas na escrita da apostila)](#regras-para-ia-seguidas-na-escrita-da-apostila)
  - [Métricas](#métricas)
  - [Mapeamento BNCC](#mapeamento-bncc)
- [Plano de capítulos](#plano-de-capítulos)
  - [Aula 01 — Fundamentos de Testes de Software](#aula-01--fundamentos-de-testes-de-software)
  - [Aula 02 — Planejamento, Verificação, Validação e Casos de Teste](#aula-02--planejamento-verificação-validação-e-casos-de-teste)
  - [Aula 03 — Testes Unitários no Front-End com Vitest](#aula-03--testes-unitários-no-front-end-com-vitest)
  - [Aula 04 — Testes de Integração com DOM (Testing Library)](#aula-04--testes-de-integração-com-dom-testing-library)
  - [Aula 05 — Integração Avançada e Mock de APIs](#aula-05--integração-avançada-e-mock-de-apis)
  - [Aula 06 — Testes End-to-End com Cypress e Playwright](#aula-06--testes-end-to-end-com-cypress-e-playwright)
  - [Aula 07 — Métricas e Cobertura de Testes](#aula-07--métricas-e-cobertura-de-testes)
  - [Aula 08 — TDD e Debugging Moderno no Front-End](#aula-08--tdd-e-debugging-moderno-no-front-end)
  - [Aula 09 — Qualidade, Performance, Acessibilidade e CI/CD](#aula-09--qualidade-performance-acessibilidade-e-cicd)
  - [Aula 10 — Projeto Integrador: Suíte de Testes + avaliação](#aula-10--projeto-integrador-suíte-de-testes--avaliação)
- [Introdução](#introdução)
  - [Apresentação](#apresentação)
  - [Objetivo geral da unidade curricular](#objetivo-geral-da-unidade-curricular)
  - [Como a apostila está organizada](#como-a-apostila-está-organizada)
  - [Como estudar com esta apostila](#como-estudar-com-esta-apostila)
  - [Ferramentas que você vai usar](#ferramentas-que-você-vai-usar)
  - [Como você será avaliado](#como-você-será-avaliado)
  - [Ambientes, recursos e acessibilidade](#ambientes-recursos-e-acessibilidade)
  - [Situações de aprendizagem](#situações-de-aprendizagem-1)
- [Capacidades da matéria](#capacidades-da-matéria)
  - [Capacidades básicas](#capacidades-básicas)
  - [Capacidades socioemocionais](#capacidades-socioemocionais)
  - [Conhecimentos da unidade curricular](#conhecimentos-da-unidade-curricular)
  - [Capacidades × conhecimentos](#capacidades--conhecimentos)
  - [Capacidades por capítulo](#capacidades-por-capítulo)
- [Glossário](#glossário)
- [Referências](#referências)
- [Capítulo 01 — Fundamentos de Testes de Software](#capítulo-01--fundamentos-de-testes-de-software)
  - [Teoria](#teoria)
    - [O custo de um clique quebrado](#o-custo-de-um-clique-quebrado)
    - [Qualidade e o papel do QA](#qualidade-e-o-papel-do-qa)
    - [Erro, defeito e falha](#erro-defeito-e-falha)
    - [Verificação × validação](#verificação--validação)
    - [Tipos de testes (características de qualidade)](#tipos-de-testes-características-de-qualidade)
    - [Caixa preta e caixa branca (técnicas)](#caixa-preta-e-caixa-branca-técnicas)
    - [O processo de teste (STLC) em resumo](#o-processo-de-teste-stlc-em-resumo)
    - [A pirâmide de testes](#a-pirâmide-de-testes)
    - [Pilares de um bom teste automatizado](#pilares-de-um-bom-teste-automatizado)
    - [Responsabilidade (autogestão)](#responsabilidade-autogestão)
  - [Vídeos](#vídeos)
  - [Resumo](#resumo)
  - [Exercícios](#exercícios)
<!-- sumario:fim -->

---

# Ementa da matéria (texto oficial)

Referência literal da ementa da matéria, para comparar com a apostila. Não editar aqui: quem muda é a ementa (e o `materia.json`).

## Justificativa

Toda interface web chega ao usuário depois de alguém confirmar que ela faz o que foi pedido. A UC ensina a planejar, escrever, automatizar e acompanhar testes do lado do cliente: do caso de teste escrito à suíte automatizada com Vitest, Testing Library e Cypress/Playwright, rodando sozinha num pipeline de integração contínua. Prepara para a UC Projeto de Front-End, que cobra planos de teste completos.

## Função

● 1 - Produzir Interfaces para internet, de acordo com metodologia e padrões de qualidade, usabilidade, interatividade, robustez, acessibilidade e segurança da informação.

## Objetivo geral

Propiciar desenvolvimento de capacidades básicas e socioemocionais para codificação de interfaces baseadas em UX e UI em aplicações web, considerando as necessidades do usuário.


## Avaliação

| Instrumento | Momento | Peso | Critérios |
|---|---|---|---|
| Avaliação contínua: entregas das aulas 1–9 e SAs 1 e 2 | Aulas 1–9 | 60% | Correção, completude, organização do repositório, prazo |
| Avaliação prática: suíte de testes para aplicação fornecida | Aula 10 | 25% | Unitários (≥ 5 casos) · integração · E2E (≥ 3 fluxos) · cobertura ≥ 70% · execução no CI |
| Avaliação objetiva: conceitos, técnicas, tipos e processo de teste | Aula 10 | 15% | Acertos; questões no formato capacidade → contexto → comando |

Nota final = 60% contínua + 25% prática + 15% objetiva. Aprovação: nota final ≥ 7,0 e presença mínima de 75%. Além da nota, cada capacidade recebe o parecer Desenvolvida / Em desenvolvimento / Não desenvolvida.

- **Recuperação:** refazer a avaliação não atingida (prática com outra aplicação, objetiva com novo banco de questões), retomando só as capacidades pendentes, conforme o regimento da unidade SENAI.

| Nível | Nota | Descrição |
|---|---|---|
| Excelente | 9–10 | Plano rastreável, testes legíveis pelo comportamento, suíte estável no CI, decisões justificadas |
| Bom | 7–8 | Testes corretos e passando, com pequenas falhas de nomenclatura, cobertura ou documentação |
| Aceitável | 5–6 | Cumpre o essencial com orientação; lacunas de casos de borda ou testes frágeis |
| Insuficiente | 0–4 | Testes que não rodam, não validam requisito ou plano ausente |

## Recursos e ambientes

- **Ambientes:** Laboratório de informática, Biblioteca, Sala de aula, AVA com recursos de interatividade.
- **Equipamentos:** Kit multimídia, Computador com a configuração adequada para a execução das atividades e acesso à internet, Sistemas operacionais, Pacote de aplicativos de escritório, IDE para desenvolvimento de testes.
- **Recursos didáticos:** Livros, apostilas e revistas especializadas; Manuais, normas e catálogos técnicos.
- **Ferramentas (didático):** Node.js e npm, VS Code, Vitest, Testing Library, Cypress e Playwright, Lighthouse e axe-core, Git/GitHub e GitHub Actions.

## Acessibilidade

- **Oficial (ementa do curso):** Serão asseguradas as condições de acessibilidade, reconhecendo a especificidade e a peculiaridade do aluno com impedimentos de longo prazo, de natureza física, mental, intelectual e sensorial, levando-se em conta a(s) Norma(s) Regulamentadora(s) da ocupação, a Lei nº 13.146/2015, os Decretos nº 3298/2009 e 6949/2009, a LDB nº 9394/96 e a legislação específica em vigência da deficiência em questão. Portanto, no planejamento e na prática docente, serão indicados as condições e os pré-requisitos para o desenvolvimento das capacidades que envolvam risco, assegurada a acessibilidade curricular
- **Resumo (ementa da matéria):** asseguradas as condições de acessibilidade ao aluno com impedimentos de longo prazo (Lei nº 13.146/2015, LDB nº 9394/96).
- **Didático:** zoom e alto contraste na IDE, leitor de tela, projeto-base pronto, tempo estendido e duplas.

## Situações de aprendizagem

- SA 1 — Estruturação e documentação de testes (aulas 1–2, retomada na 10). Startup de e-commerce em React sem estratégia de testes. Para autenticação, carrinho e checkout, o estudante entrega plano formal, no mínimo 5 casos de teste por feature (caminho feliz e casos de borda, tipo U/I/E2E), matriz de rastreabilidade requisito × caso, estimativa de esforço e análise de riscos.
- SA 2 — Pipeline CI/CD e dashboard de cobertura (aulas 7–9). A equipe roda testes à mão antes do deploy e não sabe quanto do código está coberto. O estudante cria workflow que executa Vitest e Cypress em cada push e PR, bloqueia merge com teste falhando ou cobertura abaixo de 70%, publica relatório e badges no README e documenta como rodar e contribuir (`TESTING.md`).

## Dificuldades comuns (e como tratar)

- **Testar implementação em vez de comportamento** → consultar pelo que o usuário vê (papel, rótulo, texto).
- **Teste intermitente (flaky)** → esperas assíncronas corretas, nunca tempo fixo; dados isolados por teste.
- **Cobertura como meta única** → 100% de linhas não garante requisito atendido; cruzar com a matriz de rastreabilidade.
- **Ambiente Node/npm quebrado** → projeto-base pronto e roteiro de instalação da aula 3.
- **Caso de teste vago ("testar o login")** → exigir dado de entrada e resultado esperado verificável.
- **Mock que esconde defeito real** → manter ao menos um fluxo E2E contra a API de teste.

## Estratégia de testes da UC (pirâmide)

A suíte cresce da base para o topo, e cada camada responde a uma pergunta diferente:
- **Base — unitários (aulas 3 e 8):** muitos testes rápidos de funções e regras isoladas; revelam defeitos de lógica (caixa branca, 3.2).
- **Meio — integração (aulas 4 e 5):** componentes com DOM, eventos e API simulada; revelam falhas de comunicação entre partes (3.1, 4.1, 4.3).
- **Topo — E2E (aula 6):** poucos fluxos críticos no navegador real; confirmam que o usuário completa a tarefa (validação, 5.2, e usabilidade, 4.2).
- **Transversal — métricas e CI (aulas 7 e 9):** cobertura, taxa de testes intermitentes e tempo de execução alimentam a monitoração e o controle (7.4) e a avaliação dos resultados (7.5).

Regra de bolso para o estudante: se o teste quebra quando só o nome de uma classe CSS muda, ele testa a implementação e deve ser reescrito.

## Capacidades × conhecimentos (ementa)

- C1 Especificações da interface → 5, 6.1
- C2 Requisitos da documentação → 4, 6.2–6.4
- C3 Etapas de planejamento → 6, 7
- C4 Aplicar testes do plano → 3, 7.3–7.5
- C5 Testes automatizados → 2, 3.2
- S1/S2 → 1.1, 2.4

## Regras para IA (seguidas na escrita da apostila)

1. Capacidades e conhecimentos **[oficial]** não podem ser alterados, ampliados nem reduzidos.
2. Carga horária é 40h em 10 aulas de 4h; não criar aulas nem pesos além das Seções IV e V.
3. Capacidades técnicas de plano de testes de interface são da UC Projeto de Front-End; aqui só aparecem como ligação.
4. Contextualizar em aplicações web reais (e-commerce, cadastro, painel); empresas sempre fictícias.
5. Código de exemplo deve rodar: versões atuais, sintaxe válida, resultado esperado informado.
6. Integrar S1 e S2 em code review, trabalho em equipe e justificativa de decisões.

## Métricas

- 80%+ dos estudantes com nota ≥ 7,0
- 100% entregam a suíte do projeto integrador rodando no CI.

## Mapeamento BNCC

- **CG2 Pensamento científico e crítico** — aulas 1, 2 e 7: hipótese de falha, evidência e análise de resultado
- **CG5 Cultura digital** — aulas 3 a 9: frameworks de teste, Git e integração contínua
- **CG4 Comunicação** — aulas 2 e 10: plano de testes, relatório e apresentação da suíte
- **CG9 Empatia e cooperação** — aulas 8 a 10: code review e interação com a equipe de testes (2.4)
- **CG10 Responsabilidade** — todas: não entregar código sem teste; relatar defeitos com honestidade (1.1)

---

# Plano de capítulos

Cada capítulo corresponde a **uma aula de 4 horas** da unidade curricular.

| Capítulo | Aula | Tema | Carga horária | Situação |
|---|---|---|---|---|
| 01 | 01 | Fundamentos de Testes de Software | 4 h | ✅ Incluído |
| 02 | 02 | Planejamento, Verificação, Validação e Casos de Teste | 4 h | ⬜ Pendente |
| 03 | 03 | Testes Unitários no Front-End com Vitest | 4 h | ⬜ Pendente |
| 04 | 04 | Testes de Integração com DOM (Testing Library) | 4 h | ⬜ Pendente |
| 05 | 05 | Integração Avançada e Mock de APIs | 4 h | ⬜ Pendente |
| 06 | 06 | Testes End-to-End com Cypress e Playwright | 4 h | ⬜ Pendente |
| 07 | 07 | Métricas e Cobertura de Testes | 4 h | ⬜ Pendente |
| 08 | 08 | TDD e Debugging Moderno no Front-End | 4 h | ⬜ Pendente |
| 09 | 09 | Qualidade, Performance, Acessibilidade e CI/CD | 4 h | ⬜ Pendente |
| 10 | 10 | Projeto Integrador: Suíte de Testes + avaliação | 4 h | ⬜ Pendente |

**Datas previstas:** 08/10, 14/10, 15/10, 22/10, 29/10, 30/10, 05/11, 06/11, 12/11 e 13/11.

## Aula 01 — Fundamentos de Testes de Software

- **Carga horária:** 4 h · **Domínios:** 5 · 4 · 1.1 · **Capacidades:** C1, C2, C3
- **Data prevista:** 08/10
- **Situação-problema:** SA 1 — Estruturação e documentação de testes (aulas 1–2, retomada na 10). Startup de e-commerce em React sem estratégia de testes. Para autenticação, carrinho e checkout, o estudante entrega plano formal, no mínimo 5 casos de teste por feature (caminho feliz e casos de borda, tipo U/I/E2E), matriz de rastreabilidade requisito × caso, estimativa de esforço e análise de riscos.
- **Atividade / entrega:** Mapa: erro, defeito, falha e tipos de teste
- **BNCC:** CG2 Pensamento científico e crítico, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 5 Conceitos fundamentais: 5.1 Verificação · 5.2 Validação
- 4 Tipos de testes: 4.1 Funcionalidade · 4.2 Usabilidade · 4.3 Confiabilidade · 4.4 Desempenho · 4.5 Manutenibilidade
- 1.1 Responsabilidade

**Indicadores de desempenho:**

- Diferencia verificação de validação com exemplo de uma tela real
- Classifica testes por tipo (funcionalidade, usabilidade, confiabilidade, desempenho, manutenibilidade)

**Ideias da ementa para exemplos e exercícios:**

- Gere 10 questões de múltipla escolha (A–D) sobre verificação × validação e tipos de teste, com gabarito comentado.

**Termos oficiais do glossário (ementa):**

- **Verificação:** construímos o produto certo conforme a especificação?
- **Validação:** é o produto que o usuário precisa?

## Aula 02 — Planejamento, Verificação, Validação e Casos de Teste

- **Carga horária:** 4 h · **Domínios:** 6 · 7.1–7.2 · 3 · **Capacidades:** C1, C2, C3, S2
- **Data prevista:** 14/10
- **Situação-problema:** SA 1 — Estruturação e documentação de testes (aulas 1–2, retomada na 10). Startup de e-commerce em React sem estratégia de testes. Para autenticação, carrinho e checkout, o estudante entrega plano formal, no mínimo 5 casos de teste por feature (caminho feliz e casos de borda, tipo U/I/E2E), matriz de rastreabilidade requisito × caso, estimativa de esforço e análise de riscos.
- **Atividade / entrega:** Plano de testes + 10 casos (SA 1)
- **BNCC:** CG2 Pensamento científico e crítico, CG4 Comunicação, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 6 Planejamento de testes client-side: 6.1 Análise do documento de requisitos · 6.2 Plano de testes · 6.3 Suíte de testes · 6.4 Casos de testes
- 7.1 Planejamento
- 7.2 Desenho dos Testes
- 3 Técnicas de testes: 3.1 Teste funcional (caixa preta) · 3.2 Teste estrutural (caixa branca)

**Indicadores de desempenho:**

- Extrai requisitos testáveis de uma especificação de interface
- Escreve casos de teste com ID, pré-condição, passos e resultado esperado
- Monta plano de testes com escopo, estratégia, cronograma e riscos
- Justifica decisões de teste com base em requisitos e riscos

**Ideias da ementa para exemplos e exercícios:**

- Dada a especificação de um formulário de login, liste os requisitos testáveis e escreva 8 casos de teste (ID, pré-condição, passos, resultado esperado), marcando caixa preta ou branca.
- Crie um plano de testes de 1 página para o carrinho de um e-commerce React: escopo, fora do escopo, estratégia U/I/E2E, cronograma e 3 riscos.

**Termos oficiais do glossário (ementa):**

- **Caso de teste:** condição, passos e resultado esperado
- **Caixa preta:** testa entradas e saídas sem ver o código
- **Caixa branca:** testa caminhos internos do código
- **Matriz de rastreabilidade:** liga cada requisito aos casos de teste que o verificam.

## Aula 03 — Testes Unitários no Front-End com Vitest

- **Carga horária:** 4 h · **Domínios:** 2.1–2.3 · 3.2 · **Capacidades:** C5
- **Data prevista:** 15/10
- **Atividade / entrega:** Suíte unitária de funções utilitárias
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 2.1 Definição
- 2.2 Frameworks
- 2.3 Aplicação
- 3.2 Teste estrutural (caixa branca)

**Indicadores de desempenho:**

- Escreve testes unitários com padrão AAA e matchers adequados

**Ideias da ementa para exemplos e exercícios:**

- Escreva 6 testes Vitest com padrão AAA para uma função que calcula frete, cobrindo casos de borda.

**Termos oficiais do glossário (ementa):**

- **Suíte:** conjunto organizado de testes

## Aula 04 — Testes de Integração com DOM (Testing Library)

- **Carga horária:** 4 h · **Domínios:** 2.3 · 3.1 · 4.1 · **Capacidades:** C4, C5
- **Data prevista:** 22/10
- **Atividade / entrega:** Testes de botão e formulário
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 2.3 Aplicação
- 3.1 Teste funcional (caixa preta)
- 4.1 Funcionalidade

**Indicadores de desempenho:**

- Testa componente pelo comportamento visível (queries por papel e texto)

**Ideias da ementa para exemplos e exercícios:**

- Mostre um teste com Testing Library para uma lista filtrável, buscando elementos por papel e texto, e explique por que não usar classes CSS.

## Aula 05 — Integração Avançada e Mock de APIs

- **Carga horária:** 4 h · **Domínios:** 2.3 · 4.3 · 7.3 · **Capacidades:** C5
- **Data prevista:** 29/10
- **Atividade / entrega:** Testes com API simulada e erros de rede
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 2.3 Aplicação
- 4.3 Confiabilidade
- 7.3 Execução dos Testes

**Indicadores de desempenho:**

- Isola dependências com mocks de API e spies

**Ideias da ementa para exemplos e exercícios:**

- Monte um exercício de mock de API com erro 500 e rede lenta, pedindo ao aluno que teste a mensagem exibida.

**Termos oficiais do glossário (ementa):**

- **Mock:** substituto controlado de uma dependência

## Aula 06 — Testes End-to-End com Cypress e Playwright

- **Carga horária:** 4 h · **Domínios:** 2.2–2.3 · 3.1 · 4.2 · **Capacidades:** C4, C5
- **Data prevista:** 30/10
- **Atividade / entrega:** Fluxos de login e checkout
- **BNCC:** CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 2.2 Frameworks
- 2.3 Aplicação
- 3.1 Teste funcional (caixa preta)
- 4.2 Usabilidade

**Indicadores de desempenho:**

- Automatiza fluxo completo de usuário em teste E2E

**Ideias da ementa para exemplos e exercícios:**

- Crie um teste E2E em Playwright para o fluxo login → adicionar ao carrinho → finalizar, com dados isolados.

**Termos oficiais do glossário (ementa):**

- **E2E:** teste do fluxo completo, como o usuário
- **Teste intermitente (flaky):** passa ou falha sem mudança no código

## Aula 07 — Métricas e Cobertura de Testes

- **Carga horária:** 4 h · **Domínios:** 7.4–7.5 · 4.5 · **Capacidades:** C3, C4
- **Data prevista:** 05/11
- **Situação-problema:** SA 2 — Pipeline CI/CD e dashboard de cobertura (aulas 7–9). A equipe roda testes à mão antes do deploy e não sabe quanto do código está coberto. O estudante cria workflow que executa Vitest e Cypress em cada push e PR, bloqueia merge com teste falhando ou cobertura abaixo de 70%, publica relatório e badges no README e documenta como rodar e contribuir (`TESTING.md`).
- **Atividade / entrega:** Relatório de cobertura comentado
- **BNCC:** CG2 Pensamento científico e crítico, CG5 Cultura digital, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 7.4 Monitoração e Controle
- 7.5 Avaliação dos Resultados
- 4.5 Manutenibilidade

**Indicadores de desempenho:**

- Lê relatório de cobertura e aponta trechos sem teste

**Termos oficiais do glossário (ementa):**

- **Cobertura:** percentual de código executado pelos testes

## Aula 08 — TDD e Debugging Moderno no Front-End

- **Carga horária:** 4 h · **Domínios:** 2.3 · 3.2 · 1.1 · **Capacidades:** C5, S1
- **Data prevista:** 06/11
- **Situação-problema:** SA 2 — Pipeline CI/CD e dashboard de cobertura (aulas 7–9). A equipe roda testes à mão antes do deploy e não sabe quanto do código está coberto. O estudante cria workflow que executa Vitest e Cypress em cada push e PR, bloqueia merge com teste falhando ou cobertura abaixo de 70%, publica relatório e badges no README e documenta como rodar e contribuir (`TESTING.md`).
- **Atividade / entrega:** Funcionalidade feita com TDD
- **BNCC:** CG5 Cultura digital, CG9 Empatia e cooperação, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 2.3 Aplicação
- 3.2 Teste estrutural (caixa branca)
- 1.1 Responsabilidade

**Indicadores de desempenho:**

- Aplica ciclo TDD (vermelho → verde → refatorar) e depura teste que falha
- Acolhe sugestões no code review de testes do colega

**Ideias da ementa para exemplos e exercícios:**

- Mostre o ciclo TDD em 3 passos (vermelho, verde, refatorar) para um validador de CPF no front-end.

**Termos oficiais do glossário (ementa):**

- **TDD:** escrever o teste antes do código

## Aula 09 — Qualidade, Performance, Acessibilidade e CI/CD

- **Carga horária:** 4 h · **Domínios:** 4.2 · 4.4 · 2.4 · **Capacidades:** C5
- **Data prevista:** 12/11
- **Situação-problema:** SA 2 — Pipeline CI/CD e dashboard de cobertura (aulas 7–9). A equipe roda testes à mão antes do deploy e não sabe quanto do código está coberto. O estudante cria workflow que executa Vitest e Cypress em cada push e PR, bloqueia merge com teste falhando ou cobertura abaixo de 70%, publica relatório e badges no README e documenta como rodar e contribuir (`TESTING.md`).
- **Atividade / entrega:** Pipeline GitHub Actions (SA 2)
- **BNCC:** CG5 Cultura digital, CG9 Empatia e cooperação, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 4.2 Usabilidade
- 4.4 Desempenho
- 2.4 Interação com equipe de testes

**Indicadores de desempenho:**

- Configura pipeline que executa a suíte a cada push

**Ideias da ementa para exemplos e exercícios:**

- Escreva um workflow GitHub Actions que rode Vitest com cobertura e Cypress, bloqueando o merge abaixo de 70%.

**Termos oficiais do glossário (ementa):**

- **CI:** integração contínua que roda a suíte a cada alteração

## Aula 10 — Projeto Integrador: Suíte de Testes + avaliação

- **Carga horária:** 4 h · **Domínios:** 7 · 6.3 · 2.4 · **Capacidades:** C1, C2, C3, C4, C5, S1, S2
- **Data prevista:** 13/11
- **Situação-problema:** SA 1 — Estruturação e documentação de testes (aulas 1–2, retomada na 10). Startup de e-commerce em React sem estratégia de testes. Para autenticação, carrinho e checkout, o estudante entrega plano formal, no mínimo 5 casos de teste por feature (caminho feliz e casos de borda, tipo U/I/E2E), matriz de rastreabilidade requisito × caso, estimativa de esforço e análise de riscos.
- **Atividade / entrega:** Suíte completa + avaliações finais
- **BNCC:** CG4 Comunicação, CG9 Empatia e cooperação, CG10 Responsabilidade

**Conteúdos oficiais (ementa):**

- 7 Processo fundamental de teste: 7.1 Planejamento · 7.2 Desenho dos Testes · 7.3 Execução dos Testes · 7.4 Monitoração e Controle · 7.5 Avaliação dos Resultados
- 6.3 Suíte de testes
- 2.4 Interação com equipe de testes

**Indicadores de desempenho:**

- Justifica decisões de teste com base em requisitos e riscos
- Acolhe sugestões no code review de testes do colega

**Ideias da ementa para exemplos e exercícios:**

- Crie um roteiro de code review de testes com 6 perguntas que o colega deve responder de forma respeitosa.

---

# Introdução

## Apresentação

Toda interface web chega ao usuário depois de alguém confirmar que ela faz o que foi pedido. Esta
apostila acompanha a unidade curricular **Testes de Front-End** e ensina a planejar, escrever,
automatizar e acompanhar testes do lado do cliente: do caso de teste escrito à suíte automatizada
com Vitest, Testing Library e Cypress/Playwright, rodando sozinha num pipeline de integração
contínua. Ela prepara você para a UC Projeto de Front-End, que cobra planos de teste completos.

Os exemplos acontecem na **Loja Nuvem Azul**, uma startup **fictícia** de comércio eletrônico
feita em React, com cadastro, login, catálogo, carrinho e checkout — o tipo de aplicação que você
vai testar no trabalho de técnico em informática para internet.

## Objetivo geral da unidade curricular

**Função:** produzir interfaces para internet, de acordo com metodologia e padrões de qualidade,
usabilidade, interatividade, robustez, acessibilidade e segurança da informação.

**Objetivo geral:** Propiciar desenvolvimento de capacidades básicas e socioemocionais para
codificação de interfaces baseadas em UX e UI em aplicações web, considerando as necessidades do
usuário.

## Como a apostila está organizada

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

## Como estudar com esta apostila

- Leia a teoria antes ou logo depois da aula e **rode os exemplos de código** no seu computador.
- Assista aos vídeos e anote dúvidas para levar ao professor.
- Revise o resumo e consulte o glossário sempre que encontrar um termo novo.
- Responda os exercícios explicando **o porquê** das suas decisões de teste.
- Os exercícios podem ser impressos separadamente pelo botão **Exportar PDF** ao lado do título
  de cada seção de exercícios.

## Ferramentas que você vai usar

Node.js e npm, VS Code, Vitest, Testing Library, Cypress e Playwright, Lighthouse e axe-core,
Git/GitHub e GitHub Actions. Todas são gratuitas; o professor fornece um projeto-base pronto.

## Como você será avaliado

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

## Ambientes, recursos e acessibilidade

As aulas acontecem no **laboratório de informática**, na biblioteca, na sala de aula e no AVA com
recursos de interatividade. Usaremos kit multimídia, computador com acesso à internet, sistemas
operacionais, pacote de aplicativos de escritório e **IDE para desenvolvimento de testes**, além de
livros, apostilas, revistas especializadas, manuais, normas e catálogos técnicos.

**Acessibilidade:** asseguradas as condições de acessibilidade ao aluno com impedimentos de longo
prazo (Lei nº 13.146/2015, LDB nº 9394/96). Se precisar, peça ao professor zoom e alto contraste na
IDE, leitor de tela, projeto-base pronto, tempo estendido ou trabalho em duplas.

## Situações de aprendizagem

- **SA 1 — Estruturação e documentação de testes (aulas 1, 2 e 10):** a Loja Nuvem Azul não tem
  estratégia de testes. Para autenticação, carrinho e checkout, você entrega um plano formal,
  casos de teste (caminho feliz e casos de borda), matriz de rastreabilidade, estimativa de esforço
  e análise de riscos.
- **SA 2 — Pipeline de integração contínua e cobertura (aulas 7 a 9):** a equipe roda os testes à
  mão antes de publicar e não sabe quanto do código está coberto. Você cria um fluxo automático que
  roda a suíte a cada envio de código, bloqueia a junção com teste falhando ou cobertura abaixo de
  70% e documenta como rodar e contribuir.

---

# Capacidades da matéria

## Capacidades básicas

- **C1:** Reconhecer as especificações técnicas da interface
- **C2:** Reconhecer os requisitos da documentação de testes
- **C3:** Reconhecer as etapas de planejamento de testes
- **C4:** Aplicar testes definidos no Plano de Testes.
- **C5:** Desenvolver conjunto de testes automatizados

## Capacidades socioemocionais

- **S1:** Valorizar novos fatos, ideias e opiniões diferentes para resolução de problemas pertinentes as atividades sob a sua responsabilidade
- **S2:** Fundamentar escolhas e decisões no exame de fatos, contextos, possibilidades, desafios e problemáticas de diferentes naturezas à luz de referenciais técnicos, legais, normativos e institucionais

## Conhecimentos da unidade curricular

1. **Autogestão:** 1.1 Responsabilidade.
2. **Automação de Testes:** 2.1 Definição; 2.2 Frameworks; 2.3 Aplicação; 2.4 Interação com equipe de testes.
3. **Técnicas de testes:** 3.1 Teste funcional (caixa preta); 3.2 Teste estrutural (caixa branca).
4. **Tipos de testes:** 4.1 Funcionalidade; 4.2 Usabilidade; 4.3 Confiabilidade; 4.4 Desempenho; 4.5 Manutenibilidade.
5. **Conceitos fundamentais:** 5.1 Verificação; 5.2 Validação.
6. **Planejamento de testes client-side:** 6.1 Análise do documento de requisitos; 6.2 Plano de testes; 6.3 Suíte de testes; 6.4 Casos de testes.
7. **Processo fundamental de teste:** 7.1 Planejamento; 7.2 Desenho dos Testes; 7.3 Execução dos Testes; 7.4 Monitoração e Controle; 7.5 Avaliação dos Resultados.

## Capacidades × conhecimentos

| Capacidade | Domínios |
|---|---|
| C1 | 5, 6 |
| C2 | 4, 6 |
| C3 | 6, 7 |
| C4 | 3, 7 |
| C5 | 2, 3 |
| S1 | 1, 2 |
| S2 | 1, 2 |

## Capacidades por capítulo

| Capítulo | Capacidades |
|---|---|
| Capítulo 01 — Fundamentos de Testes de Software | C1, C2, C3 |

---

# Glossário

Termos técnicos de todos os capítulos, em ordem alfabética (o número indica o capítulo).

- **Defeito:** imperfeição no código ou na especificação (bug). _(cap. 01)_
- **Erro:** ação humana equivocada que introduz um defeito. _(cap. 01)_
- **Falha:** comportamento incorreto do sistema percebido durante o uso. _(cap. 01)_
- **Padrão AAA:** estrutura de teste em três etapas: preparar (Arrange), executar (Act) e conferir (Assert). _(cap. 01)_
- **Pirâmide de testes:** modelo que equilibra muitos testes unitários, alguns de integração e poucos E2E. _(cap. 01)_
- **Qualidade:** conformidade do sistema com os requisitos e as expectativas dos usuários. _(cap. 01)_
- **Regra de 10:** o custo de corrigir um defeito cresce cerca de 10 vezes a cada etapa em que ele avança. _(cap. 01)_
- **Teste unitário:** teste rápido e isolado de uma função ou regra. _(cap. 01)_
- **Validação:** é o produto que o usuário precisa? _(cap. 01)_
- **Verificação:** construímos o produto certo conforme a especificação? _(cap. 01)_

---

# Referências

---

# Capítulo 01 — Fundamentos de Testes de Software

- **Aula:** 01
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C1, C2, C3
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-01.md`

## Teoria

### O custo de um clique quebrado

Sexta-feira à noite, promoção no ar: o botão **Finalizar compra** da **Loja Nuvem Azul** (startup
fictícia de e-commerce em React) para de funcionar no celular. Em uma hora, centenas de clientes
desistem. A causa? Uma mudança "pequena" no componente do botão que ninguém testou. Em 1996, o
foguete Ariane 5 explodiu 40 segundos após o lançamento por uma conversão numérica não testada; no
front-end, um erro num botão impede milhares de compras em minutos.

> 🎯 **Objetivos do capítulo:** entender o papel dos testes e da qualidade (QA), diferenciar
> **verificação** de **validação**, conhecer os **tipos de testes** e a **pirâmide de testes** e
> assumir a **responsabilidade** de não entregar código sem teste.

### Qualidade e o papel do QA

**Qualidade** é a conformidade do sistema com os requisitos e com as expectativas dos usuários.
Hoje, QA (garantia de qualidade) não é só "clicar em tudo antes de publicar": os testes são
**automatizados**, rodam a cada alteração de código e fazem parte do trabalho de **toda a
equipe**, desde o primeiro commit.

### Erro, defeito e falha

| Termo | O que é | Exemplo na Loja Nuvem Azul |
|---|---|---|
| **Erro (engano)** | Ação humana equivocada | O dev digita `>` no lugar de `>=` na regra de frete grátis |
| **Defeito (bug)** | A imperfeição que fica no código | A função de frete não dá frete grátis em compras de exatamente R$ 200 |
| **Falha** | O comportamento errado percebido ao usar o sistema | O cliente com R$ 200 no carrinho paga frete |

Testar é procurar **falhas** para encontrar os **defeitos** antes que cheguem ao usuário.

### Verificação × validação

| | Verificação | Validação |
|---|---|---|
| Pergunta | Construímos o produto certo conforme a especificação? | É o produto que o usuário precisa? |
| Base | Requisitos e especificação técnica | Uso real e necessidade do usuário |
| Exemplo na tela de cadastro | O campo CPF aceita só 11 dígitos, como diz a especificação | O cliente consegue se cadastrar no celular sem se confundir |

Um sistema pode passar na verificação (fazer tudo o que estava escrito) e falhar na validação
(o usuário não consegue usar). Os dois são necessários.

### Tipos de testes (características de qualidade)

| Tipo | O que avalia | Exemplo |
|---|---|---|
| **Funcionalidade** | Se o sistema faz o que as regras de negócio pedem | E-mail sem "@" mostra mensagem de erro; frete calculado certo |
| **Usabilidade** | Se é fácil e acessível de usar | Formulário navegável pelo teclado e por leitor de tela |
| **Confiabilidade** | Se funciona de forma estável, inclusive com falhas | A API do frete cai e a tela mostra aviso, sem travar |
| **Desempenho** | Velocidade e resposta sob carga | Página principal carrega em menos de 2,5 s |
| **Manutenibilidade** | Facilidade de alterar e testar o código | Componentes pequenos e testes legíveis que não quebram à toa |

Testes **funcionais** verificam o comportamento; testes **não funcionais** (usabilidade,
desempenho, confiabilidade...) verificam como o sistema se comporta.

### Caixa preta e caixa branca (técnicas)

- **Caixa preta (teste funcional):** olha só entradas e saídas, sem ver o código — "digitei
  um CEP válido, apareceu o frete?".
- **Caixa branca (teste estrutural):** olha os caminhos internos do código — "o `if` do frete
  grátis foi testado com valores abaixo, igual e acima de R$ 200?".

### O processo de teste (STLC) em resumo

1. **Planejamento** — escopo, riscos e metas;
2. **Desenho** — casos de teste, cenários e dados;
3. **Execução** — rodar os testes (automatizados e exploratórios);
4. **Monitoração e controle** — acompanhar falhas, métricas e retestes;
5. **Avaliação dos resultados** — decidir se o produto pode ser publicado.

### A pirâmide de testes

| Nível | Proporção sugerida | Velocidade | O que testa | Exemplo |
|---|---|---|---|---|
| **Unitário** (base) | ~60% | < 100 ms cada | Funções e regras isoladas | `calcularDesconto()` |
| **Integração** (meio) | ~30% | 100 ms a 1 s | Componentes juntos, DOM, API simulada | Formulário + validação |
| **E2E** (topo) | ~10% | 5 a 60 s | O fluxo completo no navegador | Login → carrinho → pagamento |

⚠️ **Cone de sorvete:** muitos testes de ponta a ponta e poucos unitários deixam a suíte lenta e
cheia de **testes intermitentes** (passam ou falham sem mudança no código). Mantenha a base forte.

**Regra de 10 (custo do defeito):** quanto mais tarde o defeito é encontrado, mais caro fica —
1x no design, 10x no desenvolvimento, 100x nos testes, 1.000x em produção.

### Pilares de um bom teste automatizado

- **Assertividade:** compara o resultado obtido com o esperado e, se falhar, diz por quê.
- **Repetibilidade:** rodar 1 ou 1.000 vezes dá o mesmo resultado.
- **Independência:** nenhum teste depende de outro; cada um prepara e limpa seus dados.

**Padrão AAA (Arrange, Act, Assert):**

```js
// formatarMoeda.js
export function formatarMoeda(valor) {
  return valor
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace(/\s/g, ' ');
}

// formatarMoeda.test.js
import { describe, it, expect } from 'vitest';
import { formatarMoeda } from './formatarMoeda';

describe('formatarMoeda', () => {
  it('formata 1500 como R$ 1.500,00', () => {
    const valor = 1500;                      // Arrange: prepara os dados
    const resultado = formatarMoeda(valor);  // Act: executa a função
    expect(resultado).toBe('R$ 1.500,00');   // Assert: confere o resultado
  });
});
```

### Responsabilidade (autogestão)

Testar faz parte do **compromisso profissional**: não entregar código sem teste, rodar a suíte
antes de enviar alterações e **relatar defeitos com honestidade** — inclusive os que você mesmo
causou. Esconder uma falha para "não atrasar a entrega" só transfere o custo (e multiplica por 10)
para depois.

## Vídeos

- [Testes unitários, integração e E2E: você realmente sabe a diferença?](https://www.youtube.com/watch?v=5HBS5M97wXo) — 14:01 — Full Cycle
- [Tipos de testes de software](https://www.youtube.com/watch?v=ETyeakDeMl8) — 10:19 — 4ALL Tests
- [Erro × defeito × falha: entenda a diferença](https://www.youtube.com/watch?v=DximzBibKm4) — 05:39 — Leo in Tech

## Resumo

- **Qualidade** = atender aos requisitos e às expectativas do usuário; testar é responsabilidade de toda a equipe.
- **Erro** (ação humana) gera **defeito** (no código), que aparece como **falha** (no uso).
- **Verificação:** construímos o produto certo conforme a especificação? **Validação:** é o produto que o usuário precisa?
- **Tipos de teste:** funcionalidade, usabilidade, confiabilidade, desempenho e manutenibilidade; técnicas de **caixa preta** e **caixa branca**.
- **Pirâmide:** muitos unitários, alguns de integração, poucos E2E; evite o cone de sorvete e os testes intermitentes.
- Bons testes são assertivos, repetíveis e independentes (padrão **AAA**); relatar defeitos com honestidade é parte do trabalho.

## Exercícios

### ITEM 1
- **Capacidade:** C1, C3
- **Contexto:** Na especificação da tela de cadastro da Loja Nuvem Azul: "o campo CPF aceita 11 dígitos e mostra máscara 000.000.000-00". Nos testes com clientes, muitos idosos não entenderam a máscara e desistiram do cadastro no celular.
- **Comando:** Explique a diferença entre verificação e validação usando essa tela: dê um exemplo de verificação e um de validação e diga qual dos dois falhou nesse caso.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C2
- **Contexto:** A equipe listou cinco testes: (a) a página do catálogo carrega em menos de 2,5 s; (b) o cupom "NUVEM10" dá 10% de desconto; (c) o checkout pode ser feito só com o teclado; (d) se a API de frete cair, aparece um aviso e a compra continua; (e) trocar o nome de uma classe CSS não quebra os testes.
- **Comando:** Classifique cada teste pelo tipo (funcionalidade, usabilidade, confiabilidade, desempenho ou manutenibilidade) e justifique em uma linha.
- **Linhas:** 5

### ITEM 3
- **Capacidade:** C2, C3
- **Contexto:** Um desenvolvedor escreveu `if (total > 200)` na regra de frete grátis, mas a especificação diz "a partir de R$ 200". Uma cliente com exatamente R$ 200 no carrinho pagou frete e reclamou.
- **Comando:** Monte o mapa erro → defeito → falha dessa situação e diga qual técnica (caixa branca ou caixa preta) e qual nível da pirâmide teriam encontrado o problema mais cedo.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C3
- **Contexto:** A suíte da Loja Nuvem Azul tem 80% de testes de ponta a ponta, demora 2 horas e falha "do nada" em 1 de cada 5 execuções.
- **Comando:** Explique o problema (cone de sorvete), proponha uma nova distribuição pela pirâmide de testes e classifique onde ficariam os testes de: `calcularDesconto()`, formulário de login com API simulada e fluxo login → carrinho → pagamento.
- **Linhas:** 6

### ITEM 5
- **Capacidade:** C2
- **Contexto:** Com o prazo apertado, o gerente sugere pular os testes automatizados e fazer só testes manuais rápidos na véspera do lançamento. Ao rodar a suíte, você percebe que uma alteração sua quebrou o cálculo de parcelas.
- **Comando:** Argumente sobre os riscos técnicos e financeiros de pular os testes (use a regra de 10) e descreva a atitude responsável diante do defeito que você mesmo causou.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C1, C2
- **Contexto:** Para revisar a aula, a turma vai trocar questões de múltipla escolha sobre verificação, validação e tipos de teste.
- **Comando:** Elabore duas questões de múltipla escolha (A a D) — uma sobre verificação × validação e outra sobre tipos de teste —, indicando a alternativa correta e explicando por que as outras estão erradas.
- **Linhas:** 8
