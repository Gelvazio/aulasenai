# Apostila — Testes de Front-End

> **Curso:** Técnico em Informática para Internet · **Docente:** Gelvazio Camargo  
> **Módulo:** ESPECÍFICO I · **Modalidade:** Presencial  
> **Ementa:** EMENTA-CHALKIE-AI.md v2.0 — reescrita a partir da ementa oficial (2026-09-27)  
> **Carga horária da UC:** 40 horas · **Capítulos previstos:** 10 (1 capítulo = 1 aula de 4 horas)  
> **Autor:** Gelvazio Camargo · **Versão:** 1.0 · **Data e hora:** 07/10/2026 às 20:16  
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
- [Capítulo 02 — Planejamento, Verificação, Validação e Casos de Teste](#capítulo-02--planejamento-verificação-validação-e-casos-de-teste)
  - [Teoria](#teoria-1)
    - [Testar sem plano é testar no escuro](#testar-sem-plano-é-testar-no-escuro)
    - [Verificação e validação no planejamento](#verificação-e-validação-no-planejamento)
    - [6.1 Análise do documento de requisitos](#61-análise-do-documento-de-requisitos)
    - [7.1 Planejamento: o plano de testes](#71-planejamento-o-plano-de-testes)
    - [7.2 Desenho dos testes: suíte e casos de teste](#72-desenho-dos-testes-suíte-e-casos-de-teste)
    - [Técnicas de teste](#técnicas-de-teste)
    - [BDD: cenários em linguagem do negócio](#bdd-cenários-em-linguagem-do-negócio)
    - [Matriz de rastreabilidade](#matriz-de-rastreabilidade)
    - [Justificar as decisões (S2)](#justificar-as-decisões-s2)
  - [Vídeos](#vídeos-1)
  - [Resumo](#resumo-1)
  - [Exercícios](#exercícios-1)
- [Capítulo 03 — Testes Unitários no Front-End com Vitest](#capítulo-03--testes-unitários-no-front-end-com-vitest)
  - [Teoria](#teoria-2)
    - [Mexi numa função. Será que quebrei o checkout?](#mexi-numa-função-será-que-quebrei-o-checkout)
    - [Automação de testes: definição e frameworks](#automação-de-testes-definição-e-frameworks)
    - [Configurando o Vitest](#configurando-o-vitest)
    - [Estrutura de um teste: describe, it e expect](#estrutura-de-um-teste-describe-it-e-expect)
    - [O padrão AAA na prática](#o-padrão-aaa-na-prática)
    - [Matchers: escolhendo a asserção certa](#matchers-escolhendo-a-asserção-certa)
    - [Isolando dependências com vi.fn e vi.spyOn](#isolando-dependências-com-vifn-e-vispyon)
    - [Caixa branca: cobrir todos os caminhos](#caixa-branca-cobrir-todos-os-caminhos)
    - [Boas práticas](#boas-práticas)
  - [Vídeos](#vídeos-2)
  - [Resumo](#resumo-2)
  - [Exercícios](#exercícios-2)
- [Capítulo 04 — Testes de Integração com DOM (Testing Library)](#capítulo-04--testes-de-integração-com-dom-testing-library)
  - [Teoria](#teoria-3)
    - [O teste passou, mas o botão sumiu](#o-teste-passou-mas-o-botão-sumiu)
    - [A filosofia: testar o comportamento visível](#a-filosofia-testar-o-comportamento-visível)
    - [Preparando o ambiente (React + Vitest)](#preparando-o-ambiente-react--vitest)
    - [Hierarquia de consultas (queries)](#hierarquia-de-consultas-queries)
    - [getBy, queryBy e findBy](#getby-queryby-e-findby)
    - [Simulando o usuário com user-event](#simulando-o-usuário-com-user-event)
    - [Exemplo: lista filtrável buscada por papel e texto](#exemplo-lista-filtrável-buscada-por-papel-e-texto)
    - [Testando formulários](#testando-formulários)
    - [Armadilhas comuns](#armadilhas-comuns)
  - [Vídeos](#vídeos-3)
  - [Resumo](#resumo-3)
  - [Exercícios](#exercícios-3)
- [Capítulo 05 — Integração Avançada e Mock de APIs](#capítulo-05--integração-avançada-e-mock-de-apis)
  - [Teoria](#teoria-4)
    - [E quando o servidor cai no meio dos testes?](#e-quando-o-servidor-cai-no-meio-dos-testes)
    - [Mock, stub e spy: os "dublês" de teste](#mock-stub-e-spy-os-dublês-de-teste)
    - [Por que não "mockar o fetch" direto?](#por-que-não-mockar-o-fetch-direto)
    - [Configurando o MSW (Node + Vitest)](#configurando-o-msw-node--vitest)
    - [O componente que busca dados](#o-componente-que-busca-dados)
    - [Testando sucesso, erro 500 e rede lenta](#testando-sucesso-erro-500-e-rede-lenta)
    - [Confiabilidade: a tela que não quebra](#confiabilidade-a-tela-que-não-quebra)
    - [Spies: conferindo as chamadas](#spies-conferindo-as-chamadas)
    - [Estado compartilhado e localStorage](#estado-compartilhado-e-localstorage)
    - [Execução dos testes: rápida e determinística](#execução-dos-testes-rápida-e-determinística)
  - [Vídeos](#vídeos-4)
  - [Resumo](#resumo-4)
  - [Exercícios](#exercícios-4)
- [Capítulo 06 — Testes End-to-End com Cypress e Playwright](#capítulo-06--testes-end-to-end-com-cypress-e-playwright)
  - [Teoria](#teoria-5)
    - [Todos os testes passaram. Ninguém conseguiu comprar.](#todos-os-testes-passaram-ninguém-conseguiu-comprar)
    - [O que é um teste E2E](#o-que-é-um-teste-e2e)
    - [Frameworks: Cypress × Playwright](#frameworks-cypress--playwright)
    - [Cypress: instalação e primeiro fluxo](#cypress-instalação-e-primeiro-fluxo)
    - [Playwright: o fluxo de compra com dados isolados](#playwright-o-fluxo-de-compra-com-dados-isolados)
    - [Seletores que resistem a mudanças](#seletores-que-resistem-a-mudanças)
    - [Usabilidade no E2E](#usabilidade-no-e2e)
    - [Testes intermitentes (flaky)](#testes-intermitentes-flaky)
    - [Page Object Model (POM)](#page-object-model-pom)
  - [Vídeos](#vídeos-5)
  - [Resumo](#resumo-5)
  - [Exercícios](#exercícios-5)
- [Capítulo 07 — Métricas e Cobertura de Testes](#capítulo-07--métricas-e-cobertura-de-testes)
  - [Teoria](#teoria-6)
    - [95% de cobertura e o cupom quebrado](#95-de-cobertura-e-o-cupom-quebrado)
    - [O processo de teste: monitoração, controle e avaliação](#o-processo-de-teste-monitoração-controle-e-avaliação)
    - [O que é cobertura](#o-que-é-cobertura)
    - [O ramo escondido](#o-ramo-escondido)
    - [Gerando o relatório com Vitest](#gerando-o-relatório-com-vitest)
    - [Lendo o relatório](#lendo-o-relatório)
    - [A falsa sensação dos 100%](#a-falsa-sensação-dos-100)
    - [Avaliação dos resultados: o relatório comentado](#avaliação-dos-resultados-o-relatório-comentado)
    - [Cobertura e manutenibilidade](#cobertura-e-manutenibilidade)
  - [Vídeos](#vídeos-6)
  - [Resumo](#resumo-6)
  - [Exercícios](#exercícios-6)
- [Capítulo 08 — TDD e Debugging Moderno no Front-End](#capítulo-08--tdd-e-debugging-moderno-no-front-end)
  - [Teoria](#teoria-7)
    - [E se o teste nascesse antes do código?](#e-se-o-teste-nascesse-antes-do-código)
    - [O que é TDD](#o-que-é-tdd)
    - [TDD na prática: validador de CPF em 3 passos](#tdd-na-prática-validador-de-cpf-em-3-passos)
    - [Caixa branca: conferindo os caminhos](#caixa-branca-conferindo-os-caminhos)
    - [Quando usar TDD (e quando não)](#quando-usar-tdd-e-quando-não)
    - [Debugging moderno: depurar com método](#debugging-moderno-depurar-com-método)
    - [Responsabilidade com a suíte](#responsabilidade-com-a-suíte)
    - [Code review dos testes: acolher sugestões (S1)](#code-review-dos-testes-acolher-sugestões-s1)
  - [Vídeos](#vídeos-7)
  - [Resumo](#resumo-7)
  - [Exercícios](#exercícios-7)
- [Capítulo 09 — Qualidade, Performance, Acessibilidade e CI/CD](#capítulo-09--qualidade-performance-acessibilidade-e-cicd)
  - [Teoria](#teoria-8)
    - [Publicar na sexta-feira com um clique?](#publicar-na-sexta-feira-com-um-clique)
    - [CI e CD](#ci-e-cd)
    - [Anatomia de um workflow (GitHub Actions)](#anatomia-de-um-workflow-github-actions)
    - [A pipeline da situação de aprendizagem 2](#a-pipeline-da-situação-de-aprendizagem-2)
    - [Bloqueando a junção (proteção da branch)](#bloqueando-a-junção-proteção-da-branch)
    - [Badges e TESTING.md](#badges-e-testingmd)
    - [Usabilidade: testes de acessibilidade](#usabilidade-testes-de-acessibilidade)
    - [Desempenho: Core Web Vitals e Lighthouse](#desempenho-core-web-vitals-e-lighthouse)
    - [Interação com a equipe de testes](#interação-com-a-equipe-de-testes)
  - [Vídeos](#vídeos-8)
  - [Resumo](#resumo-8)
  - [Exercícios](#exercícios-8)
- [Capítulo 10 — Projeto Integrador: Suíte de Testes + avaliação](#capítulo-10--projeto-integrador-suíte-de-testes--avaliação)
  - [Teoria](#teoria-9)
    - [A loja aguenta a Black Friday?](#a-loja-aguenta-a-black-friday)
    - [O processo fundamental de teste no projeto](#o-processo-fundamental-de-teste-no-projeto)
    - [Planejamento e desenho (retomando a situação de aprendizagem 1)](#planejamento-e-desenho-retomando-a-situação-de-aprendizagem-1)
    - [A suíte de testes (6.3): organização](#a-suíte-de-testes-63-organização)
    - [Execução: a base unitária com casos de borda](#execução-a-base-unitária-com-casos-de-borda)
    - [Monitoração, controle e avaliação dos resultados](#monitoração-controle-e-avaliação-dos-resultados)
    - [Equipe: code review respeitoso (S1)](#equipe-code-review-respeitoso-s1)
    - [Justificar as decisões (S2)](#justificar-as-decisões-s2-1)
    - [Como você será avaliado](#como-você-será-avaliado-1)
    - [Checklist final da entrega](#checklist-final-da-entrega)
  - [Vídeos](#vídeos-9)
  - [Resumo](#resumo-9)
  - [Exercícios](#exercícios-9)
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
| 02 | 02 | Planejamento, Verificação, Validação e Casos de Teste | 4 h | ✅ Incluído |
| 03 | 03 | Testes Unitários no Front-End com Vitest | 4 h | ✅ Incluído |
| 04 | 04 | Testes de Integração com DOM (Testing Library) | 4 h | ✅ Incluído |
| 05 | 05 | Integração Avançada e Mock de APIs | 4 h | ✅ Incluído |
| 06 | 06 | Testes End-to-End com Cypress e Playwright | 4 h | ✅ Incluído |
| 07 | 07 | Métricas e Cobertura de Testes | 4 h | ✅ Incluído |
| 08 | 08 | TDD e Debugging Moderno no Front-End | 4 h | ✅ Incluído |
| 09 | 09 | Qualidade, Performance, Acessibilidade e CI/CD | 4 h | ✅ Incluído |
| 10 | 10 | Projeto Integrador: Suíte de Testes + avaliação | 4 h | ✅ Incluído |

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
| Capítulo 02 — Planejamento, Verificação, Validação e Casos de Teste | C1, C2, C3, S2 |
| Capítulo 03 — Testes Unitários no Front-End com Vitest | C5 |
| Capítulo 04 — Testes de Integração com DOM (Testing Library) | C4, C5 |
| Capítulo 05 — Integração Avançada e Mock de APIs | C5 |
| Capítulo 06 — Testes End-to-End com Cypress e Playwright | C4, C5 |
| Capítulo 07 — Métricas e Cobertura de Testes | C3, C4 |
| Capítulo 08 — TDD e Debugging Moderno no Front-End | C5, S1 |
| Capítulo 09 — Qualidade, Performance, Acessibilidade e CI/CD | C5 |
| Capítulo 10 — Projeto Integrador: Suíte de Testes + avaliação | C1, C2, C3, C4, C5, S1, S2 |

---

# Glossário

Termos técnicos de todos os capítulos, em ordem alfabética (o número indica o capítulo).

- **Análise de riscos:** identificação do que pode falhar, com impacto e probabilidade, para priorizar os testes. _(cap. 10)_
- **Arquitetura da suíte:** organização das pastas, ferramentas e camadas de testes do projeto. _(cap. 10)_
- **Artefato:** arquivo gerado pela pipeline e guardado para download (ex.: relatório de cobertura). _(cap. 09)_
- **Asserção:** verificação que compara o resultado obtido com o esperado (`expect`). _(cap. 03)_
- **Auto-waiting:** espera automática até o elemento estar pronto para a ação (visível, habilitado e parado). _(cap. 06)_
- **Automação de testes:** execução de testes por meio de scripts, sem intervenção humana. _(cap. 03)_
- **Avaliação dos resultados:** etapa que compara os resultados com os critérios de saída e recomenda publicar ou não. _(cap. 07)_
- **Badge:** selo no README que mostra a situação da pipeline ou da cobertura. _(cap. 09)_
- **BDD:** desenvolvimento guiado por comportamento, com cenários no formato Dado / Quando / Então. _(cap. 02)_
- **beforeEach:** função executada antes de cada teste para preparar o estado. _(cap. 03)_
- **Branch (ramo):** cada caminho possível de uma decisão no código (`if`, `else`, ternário, `switch`). _(cap. 07)_
- **Breakpoint:** ponto de parada que pausa a execução para inspecionar o estado do programa. _(cap. 08)_
- **Caixa branca:** testa caminhos internos do código. _(cap. 02)_
- **Caixa preta:** testa entradas e saídas sem ver o código. _(cap. 02)_
- **Caminho feliz:** cenário em que tudo dá certo, com dados válidos. _(cap. 10)_
- **Caso de borda:** cenário nos limites ou fora do comum (carrinho vazio, cupom expirado, arredondamento). _(cap. 10)_
- **Caso de teste:** condição, passos e resultado esperado. _(cap. 02)_
- **CD:** entrega ou implantação contínua do código aprovado, sem passos manuais. _(cap. 09)_
- **CI:** integração contínua que roda a suíte a cada alteração. _(cap. 09)_
- **Ciclo vermelho-verde-refatorar:** sequência do TDD: teste que falha, código mínimo que passa e melhoria do código. _(cap. 08)_
- **Cobertura:** percentual de código executado pelos testes. _(cap. 07)_
- **Code review:** revisão do código (e dos testes) por um colega antes da junção ao projeto. _(cap. 08)_
- **Código morto:** trecho que nunca é executado nem usado pelo sistema. _(cap. 07)_
- **Core Web Vitals:** métricas de experiência do usuário: LCP, INP e CLS. _(cap. 09)_
- **Critério de aceitação:** condição objetiva que define quando um requisito está atendido. _(cap. 10)_
- **Critério de saída:** condição definida no plano para considerar os testes concluídos e liberar a versão. _(cap. 07)_
- **Cypress:** framework de testes E2E que roda dentro do navegador, com painel visual de depuração. _(cap. 06)_
- **data-testid:** atributo HTML dedicado a localizar elementos nos testes. _(cap. 06)_
- **Defeito:** imperfeição no código ou na especificação (bug). _(cap. 01)_
- **Depuração (debugging):** processo de localizar, isolar e corrigir a causa de uma falha. _(cap. 08)_
- **describe:** função que agrupa testes relacionados em uma suíte. _(cap. 03)_
- **Dígito verificador:** dígito calculado a partir dos demais para detectar erros de digitação (ex.: no CPF). _(cap. 08)_
- **DOM:** estrutura da página que o navegador monta a partir do HTML. _(cap. 04)_
- **E2E:** teste do fluxo completo, como o usuário. _(cap. 06)_
- **Erro:** ação humana equivocada que introduz um defeito. _(cap. 01)_
- **Escopo:** o que será testado (e o que fica de fora) em uma versão. _(cap. 02)_
- **Estimativa de esforço:** previsão do tempo necessário para planejar, escrever e executar os testes. _(cap. 10)_
- **Falha:** comportamento incorreto do sistema percebido durante o uso. _(cap. 01)_
- **findBy:** consulta assíncrona que espera o elemento aparecer na tela. _(cap. 04)_
- **Framework de testes:** ferramenta que roda os testes e oferece funções de asserção (ex.: Vitest). _(cap. 03)_
- **getByRole:** consulta que encontra um elemento pelo papel e pelo nome acessível. _(cap. 04)_
- **Handler:** regra do MSW que define a resposta para um endereço da API. _(cap. 05)_
- **Instrumentação:** inserção de contadores no código para registrar o que os testes executam. _(cap. 07)_
- **Interceptação:** captura de uma requisição HTTP antes que ela chegue ao servidor real. _(cap. 05)_
- **it.only:** marca que faz o framework rodar somente aquele teste (uso temporário na depuração). _(cap. 08)_
- **it.skip:** marca que faz o framework pular um teste temporariamente. _(cap. 08)_
- **Jornada:** sequência de passos que o usuário percorre para cumprir uma meta (ex.: comprar um produto). _(cap. 06)_
- **jsdom:** simulação do navegador dentro do Node, usada nos testes. _(cap. 04)_
- **Latência:** tempo de espera entre a requisição e a resposta da rede. _(cap. 05)_
- **Lighthouse:** ferramenta que audita desempenho, acessibilidade, boas práticas e SEO de uma página. _(cap. 09)_
- **Matcher:** método que define como comparar na asserção (ex.: `toBe`, `toEqual`). _(cap. 03)_
- **Matriz de rastreabilidade:** liga cada requisito aos casos de teste que o verificam. _(cap. 02)_
- **Métrica:** medida numérica usada para acompanhar a suíte e a qualidade (ex.: taxa de aprovação, cobertura). _(cap. 07)_
- **Mock:** substituto controlado de uma dependência. _(cap. 05)_
- **Modo watch:** execução automática dos testes a cada alteração salva. _(cap. 03)_
- **Monitoração e controle:** etapa que acompanha as métricas durante os testes e corrige o rumo quando necessário. _(cap. 07)_
- **MSW (Mock Service Worker):** ferramenta que intercepta requisições na camada de rede e devolve respostas simuladas. _(cap. 05)_
- **Nome acessível:** texto que identifica um elemento para leitores de tela (ex.: o rótulo do botão). _(cap. 04)_
- **Padrão AAA:** estrutura de teste em três etapas: preparar (Arrange), executar (Act) e conferir (Assert). _(cap. 01)_
- **Page Object Model:** padrão que concentra os seletores e as ações de cada página em um só módulo. _(cap. 06)_
- **Parecer por capacidade:** avaliação de cada capacidade como Desenvolvida, Em desenvolvimento ou Não desenvolvida. _(cap. 10)_
- **Partição de equivalência:** técnica que agrupa entradas de mesmo comportamento e testa um representante de cada grupo. _(cap. 02)_
- **Persistência:** manutenção dos dados depois de recarregar a página (ex.: `localStorage`). _(cap. 05)_
- **Pilha de chamadas:** lista das funções em execução, mostrando o caminho até o ponto atual. _(cap. 08)_
- **Pipeline:** sequência automatizada de etapas que instala, testa e entrega o software. _(cap. 09)_
- **Pirâmide de testes:** modelo que equilibra muitos testes unitários, alguns de integração e poucos E2E. _(cap. 01)_
- **Plano de testes:** documento com escopo, estratégia, ambientes, cronograma, riscos e critérios de saída dos testes. _(cap. 02)_
- **Playwright:** framework de testes E2E que comanda Chromium, Firefox e WebKit a partir do Node. _(cap. 06)_
- **Projeto integrador:** atividade final que reúne todo o conteúdo da unidade em um único projeto. _(cap. 10)_
- **Proteção da branch:** regra que só permite juntar código quando os checks obrigatórios passam. _(cap. 09)_
- **Qualidade:** conformidade do sistema com os requisitos e as expectativas dos usuários. _(cap. 01)_
- **queryBy:** consulta que devolve nulo quando o elemento não existe, usada para provar ausência. _(cap. 04)_
- **Race condition:** defeito em que respostas chegam fora de ordem e a resposta antiga sobrescreve a recente. _(cap. 05)_
- **Recuperação:** nova oportunidade de avaliação, retomando apenas as capacidades pendentes. _(cap. 10)_
- **Refatoração:** melhoria da estrutura interna do código sem mudar o seu comportamento. _(cap. 08)_
- **Regra de 10:** o custo de corrigir um defeito cresce cerca de 10 vezes a cada etapa em que ele avança. _(cap. 01)_
- **Relatório de cobertura:** documento (no terminal ou em HTML) com os percentuais e as linhas sem teste. _(cap. 07)_
- **Relatório final de testes:** documento com resultados, cobertura, defeitos, riscos e recomendação de publicação. _(cap. 10)_
- **Requisito testável:** requisito claro, com um comportamento e um critério objetivo de aceitação. _(cap. 02)_
- **Role (papel):** função acessível de um elemento na tela (botão, link, caixa de texto, item de lista). _(cap. 04)_
- **Spy:** espião que registra como uma função foi chamada, sem mudar o que ela faz. _(cap. 05)_
- **Stub:** dublê de teste que devolve uma resposta fixa, sem lógica. _(cap. 05)_
- **Suíte:** conjunto organizado de testes. _(cap. 03)_
- **TDD:** escrever o teste antes do código. _(cap. 08)_
- **Teste de integração:** teste de várias partes funcionando juntas (componente, DOM, eventos). _(cap. 04)_
- **Teste determinístico:** teste que dá sempre o mesmo resultado nas mesmas condições. _(cap. 05)_
- **Teste intermitente (flaky):** passa ou falha sem mudança no código. _(cap. 06)_
- **Teste unitário:** teste rápido e isolado de uma função ou regra. _(cap. 01)_
- **Testing Library:** biblioteca que testa componentes pelo que o usuário vê e faz. _(cap. 04)_
- **Threshold:** meta mínima de cobertura; abaixo dela, a execução dos testes falha. _(cap. 07)_
- **Time-travel:** recurso do Cypress que mostra a tela exatamente como estava em cada passo do teste. _(cap. 06)_
- **Trace:** registro passo a passo da execução de um teste do Playwright, usado para investigar falhas. _(cap. 06)_
- **user-event:** biblioteca que simula as interações reais do usuário (clicar, digitar). _(cap. 04)_
- **Validação:** é o produto que o usuário precisa? _(cap. 01)_
- **Valor-limite:** técnica que testa as entradas exatamente nas bordas de uma regra. _(cap. 02)_
- **Verificação:** construímos o produto certo conforme a especificação? _(cap. 01)_
- **vi.fn:** função simulada que registra como foi chamada. _(cap. 03)_
- **vi.spyOn:** espião que observa (e pode substituir) um método existente. _(cap. 03)_
- **WCAG:** diretrizes internacionais de acessibilidade para conteúdo web. _(cap. 09)_
- **Workflow:** arquivo de configuração que define eventos, jobs e passos da automação. _(cap. 09)_

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

---

# Capítulo 02 — Planejamento, Verificação, Validação e Casos de Teste

- **Aula:** 02
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C1, C2, C3, S2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-02.md`

## Teoria

### Testar sem plano é testar no escuro

A **Loja Nuvem Azul** vai lançar autenticação, carrinho e checkout em três semanas e não tem
nenhuma estratégia de testes (situação de aprendizagem 1). Cada pessoa testa "o que acha
importante", ninguém sabe o que já foi coberto e os mesmos defeitos voltam a cada versão. Antes de
escrever uma linha de código de teste, é preciso **analisar os requisitos, planejar e desenhar**
os testes.

> 🎯 **Objetivos do capítulo:** extrair **requisitos testáveis** de uma especificação, montar um
> **plano de testes**, organizar a **suíte** e escrever **casos de teste** (inclusive em BDD),
> usar as técnicas de **caixa preta e caixa branca**, ligar tudo numa **matriz de
> rastreabilidade** e **justificar** as decisões com base em requisitos e riscos.

### Verificação e validação no planejamento

Retomando o capítulo 1: a **verificação** pergunta se o produto foi construído conforme a
especificação (papel forte do desenvolvedor: testes unitários e de integração); a **validação**
pergunta se é o produto que o usuário precisa (papel forte do QA: cenários, testes de ponta a ponta,
usabilidade). O plano de testes precisa prever as duas.

### 6.1 Análise do documento de requisitos

Um **requisito testável** é claro, tem um único comportamento e um **critério objetivo** de
aceitação. Requisito vago não pode ser testado.

| Especificação (vaga) | Requisito testável |
|---|---|
| "O login deve ser seguro." | RF-01: após 3 senhas erradas seguidas, o botão Entrar fica bloqueado por 5 minutos. |
| "Validar o e-mail." | RF-02: e-mail sem "@" ou sem domínio mostra "Informe um e-mail válido" abaixo do campo. |
| "O frete deve funcionar direito." | RF-03: compras a partir de R$ 200,00 têm frete grátis; abaixo disso, frete pela tabela de CEP. |

**Como extrair:** leia a especificação, sublinhe cada comportamento observável, transforme em uma
frase "quando X, então Y", inclua valores e mensagens exatas e pergunte ao responsável o que não
estiver claro.

### 7.1 Planejamento: o plano de testes

O **plano de testes** (modelo inspirado na norma ISO/IEC/IEEE 29119) é o documento que organiza o
trabalho:

| Parte | Exemplo na Loja Nuvem Azul |
|---|---|
| **Escopo (dentro)** | Login, cadastro, carrinho, cupom e checkout |
| **Fora do escopo** | Login social e aplicativo mobile (próxima versão) |
| **Estratégia** | Unitários (regras de frete, cupom, validações), integração (formulários com API simulada), E2E (login → carrinho → pagamento) |
| **Ambientes e dados** | Ambiente de homologação igual ao de produção; usuários e cartões de teste |
| **Cronograma** | Semana 1: unitários; semana 2: integração; semana 3: E2E e regressão |
| **Riscos** | Falha no pagamento (impacto alto), cálculo de frete (alto), layout do rodapé (baixo) |
| **Critérios de saída** | 100% dos testes críticos passando, nenhum defeito grave aberto, cobertura ≥ 70% |

**Priorização por risco:** prioridade = **impacto × probabilidade**. Falha no checkout tem
prioridade máxima; desalinhamento no rodapé, prioridade baixa. Documentar o que está **fora do
escopo** alinha expectativas e evita cobranças de testes não planejados.

### 7.2 Desenho dos testes: suíte e casos de teste

- **Suíte de testes (6.3):** conjunto organizado de testes, agrupado por funcionalidade
  (suíte de login, de carrinho, de checkout) ou por nível (unitários, integração, E2E).
- **Caso de teste (6.4):** condição, passos e resultado esperado — com identificação única.

| Campo | CT-LOGIN-02 — Login com senha incorreta |
|---|---|
| **Pré-condição** | Usuário `ana@nuvemazul.test` cadastrado; servidor de homologação no ar |
| **Passos** | 1. Acessar `/login`. 2. Digitar o e-mail `ana@nuvemazul.test`. 3. Digitar a senha `errada123`. 4. Clicar em **Entrar**. |
| **Resultado esperado** | Mensagem "E-mail ou senha incorretos" abaixo do formulário; usuário continua na página de login |
| **Requisito** | RF-01 · **Técnica:** caixa preta · **Nível:** integração |

⚠️ **Caso vago:** "testar o login com senha errada e ver se dá erro". Falta o dado exato, o lugar
da mensagem e o estado inicial. Use verbos no imperativo, dados exatos e um resultado
**verificável**.

### Técnicas de teste

**Caixa preta (teste funcional):** testa entradas e saídas sem ver o código.

- **Partição de equivalência:** agrupar entradas que se comportam igual (e-mails válidos, e-mails
  sem "@", campo vazio) e testar um representante de cada grupo.
- **Valor-limite:** testar exatamente nas bordas da regra — para "frete grátis a partir de
  R$ 200,00": R$ 199,99, R$ 200,00 e R$ 200,01.

**Caixa branca (teste estrutural):** testa caminhos internos do código — cada `if/else`, cada
laço e cada retorno da função de frete precisa ser executado por algum teste.

### BDD: cenários em linguagem do negócio

O **BDD** descreve o comportamento com a sintaxe **Dado / Quando / Então** (Gherkin), que todo o
time entende e que depois vira teste automatizado:

```gherkin
Funcionalidade: Frete grátis
  Cenário: Compra exatamente no limite
    Dado que o carrinho soma R$ 200,00
    Quando eu vou para o pagamento
    Então o frete aparece como "Grátis"
```

### Matriz de rastreabilidade

Liga cada requisito aos casos de teste que o verificam. Se um requisito muda, a matriz mostra quais
testes atualizar; requisito sem caso de teste é funcionalidade sem garantia.

| Requisito | Casos de teste | Situação |
|---|---|---|
| RF-01 Bloqueio após 3 senhas erradas | CT-LOGIN-02, CT-LOGIN-03 | ✅ Coberto |
| RF-02 Validação de e-mail | CT-CAD-01, CT-CAD-02 | ✅ Coberto |
| RF-03 Frete grátis a partir de R$ 200 | — | ❌ Sem caso de teste |

### Justificar as decisões (S2)

Nunca dá para testar tudo. Por isso cada decisão do plano — o que entra, o que fica de fora, o que
vem primeiro — deve ser **fundamentada em fatos**: requisitos, riscos, histórico de defeitos e
prazos. "Priorizamos o checkout porque uma falha ali impede a venda (impacto alto) e o módulo foi
alterado nesta versão (probabilidade alta)" é uma justificativa técnica; "porque sim", não.

## Vídeos

- [Criando um caso de teste na prática](https://www.youtube.com/watch?v=-Yz1lWiyOwc) — 08:52 — Many - QA
- [Como desenvolver um plano de testes](https://www.youtube.com/watch?v=faw5RmpxOvk) — 10:54 — Fulltureschool
- [Estratégia de teste de software: como fazer](https://www.youtube.com/watch?v=bmzeuk3zVS4) — 13:48 — pessonizando
- [Gherkin × BDD: entenda as diferenças](https://www.youtube.com/watch?v=7tDgX23Da3I) — 04:05 — Priscila Caimi

## Resumo

- **Requisito testável** tem um comportamento e um critério objetivo; requisito vago precisa ser esclarecido antes de testar.
- O **plano de testes** define escopo, fora do escopo, estratégia, ambientes e dados, cronograma, riscos e critérios de saída.
- **Suíte** organiza os testes; **caso de teste** traz ID, pré-condição, passos com dados exatos e resultado esperado verificável.
- **Caixa preta** (partição de equivalência, valor-limite) olha entradas e saídas; **caixa branca** olha os caminhos do código.
- **BDD** (Dado / Quando / Então) aproxima negócio, QA e desenvolvimento; a **matriz de rastreabilidade** garante que todo requisito tenha teste.
- Decisões de teste são **justificadas** por requisitos e riscos (impacto × probabilidade).

## Exercícios

### ITEM 1
- **Capacidade:** C1
- **Contexto:** Especificação do formulário de login da Loja Nuvem Azul: "O login deve ser rápido, seguro e avisar o usuário quando algo der errado. E-mail e senha são obrigatórios."
- **Comando:** Extraia pelo menos quatro requisitos testáveis dessa especificação, cada um com comportamento e critério objetivo (valores, mensagens, tempos), e aponte o que precisaria ser perguntado ao cliente.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C2, C3
- **Contexto:** A tela de login precisa de casos de teste para: (a) login com dados válidos; (b) senha incorreta; (c) e-mail em branco.
- **Comando:** Escreva os três casos de teste completos (ID, título, pré-condição, passos numerados com dados exatos e resultado esperado verificável) e marque, em cada um, a técnica (caixa preta ou caixa branca).
- **Linhas:** 10

### ITEM 3
- **Capacidade:** C3
- **Contexto:** O carrinho de compras da Loja Nuvem Azul (em React) será testado nas próximas duas semanas.
- **Comando:** Monte um plano de testes de uma página para o carrinho com escopo, fora do escopo, estratégia por nível (unitário, integração e E2E), cronograma e três riscos com impacto e probabilidade.
- **Linhas:** 9

### ITEM 4
- **Capacidade:** C2
- **Contexto:** O cliente enviou o requisito: "o carrinho deve calcular o frete certinho, e frete grátis para compras grandes". Depois confirmou: frete grátis a partir de R$ 200,00.
- **Comando:** Escreva três cenários BDD (Dado / Quando / Então) usando a técnica de valor-limite e explique por que esses três valores foram escolhidos.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C2, C3
- **Contexto:** Requisitos do checkout: RF-10 aceitar cartão de crédito; RF-11 aplicar cupom válido; RF-12 recusar cupom vencido; RF-13 calcular parcelas sem juros até 3x. Casos existentes: CT-20 (cartão aprovado), CT-21 (cartão recusado), CT-22 (cupom válido) e CT-23 (parcelamento em 2x).
- **Comando:** Monte a matriz de rastreabilidade requisito × caso, indique os requisitos sem cobertura ou com cobertura incompleta e proponha os casos que faltam.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C3, S2
- **Contexto:** Faltam dois dias para o lançamento e só há tempo para executar 10 dos 30 casos de teste planejados. O checkout foi todo alterado nesta versão; o rodapé e a página "Quem somos" não mudaram.
- **Comando:** Explique quais casos você priorizaria e quais deixaria para depois, justificando cada decisão com base em requisitos, impacto e probabilidade (riscos).
- **Linhas:** 6

---

# Capítulo 03 — Testes Unitários no Front-End com Vitest

- **Aula:** 03
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C5
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-03.md`

## Teoria

### Mexi numa função. Será que quebrei o checkout?

Na **Loja Nuvem Azul**, a função que calcula o frete é usada no carrinho, no checkout e na
página do produto. Um desenvolvedor muda uma linha para "melhorar" o cálculo. Sem testes, a única
forma de saber se nada quebrou é clicar em todas as telas — e torcer. Com uma **suíte de testes
unitários**, a resposta vem em milissegundos, a cada vez que o arquivo é salvo.

> 🎯 **Objetivos do capítulo:** entender o que é **automação de testes** e os **frameworks**
> do front-end, configurar o **Vitest**, escrever testes unitários com o padrão **AAA** e os
> **matchers** adequados, simular dependências com **vi.fn** e aplicar a visão de **caixa
> branca** para cobrir todos os caminhos do código.

### Automação de testes: definição e frameworks

**Automação de testes** é usar código (scripts) para executar testes repetíveis sem intervenção
humana. O teste automatizado roda igual 1 ou 1.000 vezes, em segundos, sempre que o código muda.

| Framework | Para quê | Nível da pirâmide |
|---|---|---|
| **Vitest** (ou Jest, com API parecida) | Rodar testes e fazer asserções em JavaScript/TypeScript | Unitário e integração |
| **Testing Library** | Testar componentes pelo que o usuário vê | Integração (capítulos 4 e 5) |
| **Cypress / Playwright** | Automatizar o navegador de ponta a ponta | E2E (capítulo 6) |

O **Vitest** é rápido (usa o mesmo motor do Vite), entende ES Modules e TypeScript e tem o
**modo watch**, que roda de novo os testes afetados a cada vez que você salva.

### Configurando o Vitest

```bash
npm init -y
npm install -D vitest
```

No `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- `npm test` abre o modo watch (uso no dia a dia);
- `npm run test:run` roda uma vez e termina (uso na integração contínua).

**Nomes dos arquivos:** o Vitest encontra sozinho arquivos `*.test.js` e `*.spec.js`. Mantenha
`frete.test.js` ao lado de `frete.js`.

### Estrutura de um teste: describe, it e expect

- `describe('calcularFrete', ...)` agrupa os testes de uma unidade — uma **suíte**.
- `it('dá frete grátis a partir de R$ 200', ...)` (ou `test`) declara um caso de teste.
- `expect(valor).matcher(esperado)` é a asserção: se não bater, o teste falha e o terminal mostra
  a diferença. **Teste sem `expect` não testa nada.**

### O padrão AAA na prática

```js
// frete.js
export function calcularFrete(totalCarrinho, distanciaKm) {
  if (totalCarrinho < 0 || distanciaKm < 0) {
    throw new Error('Valores inválidos');
  }
  if (totalCarrinho >= 200) return 0;
  if (distanciaKm <= 10) return 15;
  return 15 + (distanciaKm - 10) * 2;
}

// frete.test.js
import { describe, it, expect } from 'vitest';
import { calcularFrete } from './frete';

describe('calcularFrete', () => {
  it('dá frete grátis a partir de R$ 200', () => {
    const total = 200;                         // Arrange
    const frete = calcularFrete(total, 30);    // Act
    expect(frete).toBe(0);                     // Assert
  });

  it('cobra R$ 2 por km acima de 10 km', () => {
    expect(calcularFrete(100, 12)).toBe(19);
  });

  it('recusa valores negativos', () => {
    expect(() => calcularFrete(-1, 5)).toThrow('Valores inválidos');
  });
});
```

Deixe a etapa **Act** em uma linha e separe visualmente as três etapas.

### Matchers: escolhendo a asserção certa

| Matcher | Quando usar | Exemplo |
|---|---|---|
| `toBe` | Valores primitivos (número, texto, booleano) | `expect(calcularFrete(200, 5)).toBe(0)` |
| `toEqual` | Objetos e arrays (compara o conteúdo) | `expect(pedido).toEqual({ id: 1, status: 'pago' })` |
| `toContain` | Item dentro de array ou trecho de texto | `expect(perfis).toContain('ADMIN')` |
| `toBeNull` / `toBeDefined` | Resultado vazio / variável preenchida | `expect(buscarCupom('XYZ')).toBeNull()` |
| `toBeGreaterThan` | Comparações numéricas | `expect(itens.length).toBeGreaterThan(0)` |
| `toThrow` | A função deve lançar erro | `expect(() => f(-1)).toThrow()` |

⚠️ **Armadilha clássica:** `expect({ id: 1 }).toBe({ id: 1 })` **falha**, porque são dois objetos
diferentes na memória. Para objetos e arrays, use `toEqual`.

### Isolando dependências com vi.fn e vi.spyOn

Teste unitário não acessa rede, banco nem envia e-mail de verdade. Para isso, a dependência é
**simulada**:

```js
import { it, expect, vi } from 'vitest';

function finalizarPedido(pedido, enviarEmail) {
  enviarEmail(pedido.emailCliente, `Pedido ${pedido.id} confirmado`);
  return { ...pedido, status: 'confirmado' };
}

it('confirma o pedido e envia o e-mail', () => {
  const enviarEmail = vi.fn();
  const pedido = { id: 42, emailCliente: 'ana@nuvemazul.test' };

  const resultado = finalizarPedido(pedido, enviarEmail);

  expect(enviarEmail).toHaveBeenCalledWith('ana@nuvemazul.test', 'Pedido 42 confirmado');
  expect(resultado).toEqual({ id: 42, emailCliente: 'ana@nuvemazul.test', status: 'confirmado' });
});
```

- `vi.fn()` cria uma função falsa que lembra **como foi chamada**.
- `vi.spyOn(objeto, 'metodo')` observa (e pode substituir) um método que já existe.
- Use `afterEach(() => vi.restoreAllMocks())` para um teste não contaminar o outro.

### Caixa branca: cobrir todos os caminhos

Olhando o código de `calcularFrete`, há **quatro caminhos**: valores negativos (erro), total a
partir de 200 (grátis), até 10 km (taxa fixa) e acima de 10 km (taxa por km). Cada caminho precisa
de pelo menos um teste — e as **bordas** (199,99 e 200; 10 e 11 km) são onde os defeitos se
escondem.

### Boas práticas

- Cada teste é **independente**: prepara seus dados e não depende da ordem de execução.
- Use `beforeEach` para recriar objetos antes de cada teste.
- Teste o **comportamento** (o que a função devolve), não detalhes internos.
- Nomeie os testes como frases: "cobra R$ 2 por km acima de 10 km".

## Vídeos

- [Vitest: instalação e configuração](https://www.youtube.com/watch?v=FWXy_Kz-jwc) — 11:04 — Pablo Codes
- [Testes unitários no front-end](https://www.youtube.com/watch?v=MfEcEjSaO_E) — 08:25 — Rodrigo Gabriel Dev
- [toBe() × toEqual() e outros matchers](https://www.youtube.com/watch?v=RT3ISoUUSkU) — 10:14 — Seeema Holiday Developer

## Resumo

- **Automação de testes** executa testes repetíveis por código; frameworks: Vitest/Jest (unitário), Testing Library (integração) e Cypress/Playwright (E2E).
- Configure com `npm install -D vitest` e os scripts `vitest` (watch) e `vitest run` (CI); arquivos `*.test.js` ao lado do código.
- **describe** agrupa (suíte), **it/test** declara o caso e **expect** faz a asserção; siga o padrão **AAA**.
- Escolha o **matcher** certo: `toBe` para primitivos, `toEqual` para objetos e arrays, `toContain`, `toBeNull`, `toThrow`...
- **vi.fn** e **vi.spyOn** isolam dependências; restaure os mocks depois de cada teste.
- Pela **caixa branca**, cada caminho e cada borda do código precisa de teste; testes independentes e com nomes claros.

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** Você recebeu o projeto da Loja Nuvem Azul sem nenhuma ferramenta de testes e precisa começar a suíte de funções utilitárias.
- **Comando:** Liste os comandos para instalar o Vitest, os scripts que devem ir no `package.json` (para uso diário e para a integração contínua) e explique onde e com que nome criar o arquivo de testes de `formatarCep.js`.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C5
- **Contexto:** Use a função `calcularFrete(totalCarrinho, distanciaKm)` do capítulo: erro para valores negativos, grátis a partir de R$ 200, R$ 15 até 10 km e R$ 2 por km excedente.
- **Comando:** Escreva uma suíte com 6 testes Vitest no padrão AAA cobrindo os casos de borda (199,99 e 200; 10 e 11 km; valor negativo), com nomes descritivos e o matcher adequado em cada um.
- **Linhas:** 12

### ITEM 3
- **Capacidade:** C5
- **Contexto:** Você precisa conferir: (a) o texto "R$ 15,00"; (b) o objeto `{ id: 7, status: 'pago' }`; (c) se a lista de cupons contém "NUVEM10"; (d) se a busca de um cupom inexistente devolve `null`; (e) se `aplicarCupom('')` lança erro; (f) se o total do carrinho é maior que zero.
- **Comando:** Indique o matcher adequado para cada situação e escreva a linha do `expect` correspondente.
- **Linhas:** 6

### ITEM 4
- **Capacidade:** C5
- **Contexto:** Um colega escreveu: `it('carrinho', () => { carrinho.push({ id: 1 }); expect(carrinho[0]).toBe({ id: 1 }); });` e um segundo teste que só passa se esse rodar antes, porque usa o mesmo array `carrinho`.
- **Comando:** Aponte os três problemas (matcher, nome do teste e dependência entre testes) e reescreva os testes de forma independente, com `beforeEach`.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C5
- **Contexto:** A função `cancelarPedido(pedido, registrarLog)` muda o status do pedido para "cancelado" e chama `registrarLog('Pedido <id> cancelado')`. Nos testes, o log não pode ser gravado de verdade.
- **Comando:** Escreva um teste com `vi.fn()` que confira o objeto retornado e a chamada do log com o texto exato.
- **Linhas:** 7

### ITEM 6
- **Capacidade:** C5
- **Contexto:** A função `classificarCliente(totalComprado)` devolve "novo" se o total for 0, "bronze" até R$ 500, "prata" até R$ 2.000 e "ouro" acima disso.
- **Comando:** Usando a visão de caixa branca, liste todos os caminhos do código e os valores de borda que a suíte precisa testar, e organize os testes em um `describe`.
- **Linhas:** 6

---

# Capítulo 04 — Testes de Integração com DOM (Testing Library)

- **Aula:** 04
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C4, C5
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-04.md`

## Teoria

### O teste passou, mas o botão sumiu

Na **Loja Nuvem Azul**, os testes unitários do carrinho passavam todos. Mesmo assim, depois de
uma mudança no CSS, o botão **Adicionar ao carrinho** ficou escondido atrás da imagem do produto e
ninguém conseguia clicar. Os testes conferiam variáveis internas, não a tela. Testes de
**integração com o DOM** verificam se as partes funcionam **juntas**, do jeito que o usuário usa:
lendo textos, clicando em botões e preenchendo campos.

> 🎯 **Objetivos do capítulo:** aplicar a filosofia da **Testing Library**, encontrar elementos
> pelo **papel (role) e pelo texto**, simular o usuário com **user-event** e escrever testes de
> **botões e formulários** como testes funcionais de **caixa preta**.

### A filosofia: testar o comportamento visível

> "Quanto mais os seus testes se parecerem com a forma como o software é usado, mais confiança
> eles podem dar." — princípio da Testing Library (Kent C. Dodds)

| Testar a implementação ❌ | Testar o comportamento ✅ |
|---|---|
| Conferir o estado interno `contador = 1` | Conferir o texto "Total: 1" na tela |
| Buscar pelo seletor `.btn-primary` | Buscar o botão com o nome "Adicionar ao carrinho" |
| Quebra quando alguém renomeia uma classe CSS | Só quebra quando o usuário seria afetado |

Esse é um teste **funcional de caixa preta**: entra a ação do usuário, sai o que ele vê — sem olhar
o código do componente. Ele verifica a **funcionalidade** (a regra de negócio funcionando na tela).

### Preparando o ambiente (React + Vitest)

```bash
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @vitejs/plugin-react
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: './vitest.setup.js' },
});

// vitest.setup.js
import '@testing-library/jest-dom/vitest';
```

- **jsdom** simula o navegador dentro do Node (document, eventos).
- **jest-dom** acrescenta matchers como `toBeInTheDocument`, `toBeVisible`, `toBeDisabled`.

### Hierarquia de consultas (queries)

| Prioridade | Consulta | Quando usar |
|---|---|---|
| 1 | `getByRole('button', { name: 'Entrar' })` | Quase sempre: botões, links, títulos, caixas de texto |
| 2 | `getByLabelText('E-mail')` | Campos de formulário com rótulo |
| 3 | `getByPlaceholderText('Buscar...')` | Campos sem rótulo (ex.: busca) |
| 4 | `getByText('Frete grátis')` | Textos sem papel específico |
| Último recurso | `getByTestId('grafico')` | Elementos sem significado para o usuário |

**Bônus de acessibilidade:** se o teste não encontra o botão por `getByRole`, um leitor de tela
também não vai encontrar — a `<div>` clicável precisa virar `<button>`.

### getBy, queryBy e findBy

- `getBy...` — o elemento **tem de estar** na tela (senão o teste falha).
- `queryBy...` — devolve `null` se não achar: use para provar que algo **sumiu**
  (`expect(screen.queryByText('E-mail inválido')).not.toBeInTheDocument()`).
- `findBy...` — **espera** o elemento aparecer (devolve uma promessa; use `await`), ideal para
  conteúdo que chega depois.

### Simulando o usuário com user-event

`user-event` reproduz a sequência real de eventos (foco, teclas, clique). Prefira-o ao
`fireEvent`. Sempre com `await`:

```jsx
// BotaoSeguir.jsx
import { useState } from 'react';

export function BotaoSeguir({ aoSeguir }) {
  const [seguindo, setSeguindo] = useState(false);
  function alternar() {
    setSeguindo(!seguindo);
    aoSeguir(!seguindo);
  }
  return <button onClick={alternar}>{seguindo ? 'Seguindo' : 'Seguir'}</button>;
}

// BotaoSeguir.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, vi } from 'vitest';
import { BotaoSeguir } from './BotaoSeguir';

it('muda para "Seguindo" e avisa quem usa o componente', async () => {
  const user = userEvent.setup();
  const aoSeguir = vi.fn();
  render(<BotaoSeguir aoSeguir={aoSeguir} />);

  await user.click(screen.getByRole('button', { name: 'Seguir' }));

  expect(screen.getByRole('button', { name: 'Seguindo' })).toBeInTheDocument();
  expect(aoSeguir).toHaveBeenCalledWith(true);
});
```

### Exemplo: lista filtrável buscada por papel e texto

```jsx
// ListaProdutos.jsx
import { useState } from 'react';

export function ListaProdutos({ produtos }) {
  const [busca, setBusca] = useState('');
  const visiveis = produtos.filter((p) => p.toLowerCase().includes(busca.toLowerCase()));
  return (
    <div>
      <label htmlFor="busca">Buscar produto</label>
      <input id="busca" value={busca} onChange={(e) => setBusca(e.target.value)} />
      <ul>
        {visiveis.map((p) => <li key={p}>{p}</li>)}
      </ul>
      {visiveis.length === 0 && <p>Nenhum produto encontrado</p>}
    </div>
  );
}

// ListaProdutos.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect } from 'vitest';
import { ListaProdutos } from './ListaProdutos';

it('filtra a lista pelo texto digitado', async () => {
  const user = userEvent.setup();
  render(<ListaProdutos produtos={['Camiseta azul', 'Boné preto', 'Camiseta branca']} />);

  await user.type(screen.getByLabelText('Buscar produto'), 'camiseta');

  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText('Boné preto')).not.toBeInTheDocument();
});
```

**Por que não buscar pela classe CSS?** Classes mudam por motivos visuais (novo tema, nova
biblioteca de estilos) sem que o comportamento mude. O teste preso a `.item-lista` quebraria à toa;
o teste que busca `listitem` e o texto continua válido enquanto o usuário vê a mesma coisa.

### Testando formulários

Roteiro típico: renderizar → achar o campo pelo **rótulo** → digitar um valor inválido → conferir a
mensagem de erro **visível** → corrigir → conferir que a mensagem sumiu (`queryBy`) e que o botão
**Cadastrar** ficou habilitado (`toBeEnabled`).

### Armadilhas comuns

- Esquecer o `await` antes de `user.click`, `user.type` ou `findBy`.
- Usar `getBy` para verificar ausência (use `queryBy`).
- Usar `data-testid` quando existe papel ou rótulo.
- Quando um teste falha, `screen.debug()` mostra o HTML atual e a mensagem de erro lista os papéis
  disponíveis — use isso para corrigir a consulta.

## Vídeos

- [Writing integration tests — React testing for beginners (em inglês)](https://www.youtube.com/watch?v=52-QICDljww) — 08:01 — Syntax
- [Finding elements by role — getByRole (em inglês)](https://www.youtube.com/watch?v=YIVz3j9s1z4) — 03:38 — Technical Rajni
- [Using getByRole in React (em inglês)](https://www.youtube.com/watch?v=Px-H5Eplg90) — 07:45 — Timothy Amo

## Resumo

- Testes de **integração com DOM** verificam as partes funcionando juntas, como o usuário vê — **caixa preta** e **funcionalidade**.
- **Testing Library:** teste o comportamento visível, não a implementação; classes CSS e estado interno deixam o teste frágil.
- Prioridade das consultas: **getByRole** → getByLabelText → getByPlaceholderText → getByText → getByTestId (último recurso).
- **getBy** (tem de estar), **queryBy** (para ausência) e **findBy** (espera, com `await`).
- **user-event** simula o usuário de verdade; **jest-dom** traz matchers como `toBeInTheDocument`, `toBeVisible` e `toBeDisabled`.
- Formulários: rótulo → digitação inválida → mensagem visível → correção → mensagem some e botão habilita.

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** O projeto da Loja Nuvem Azul já tem Vitest para funções, mas ainda não consegue testar componentes React com o DOM.
- **Comando:** Liste os pacotes a instalar e explique o papel de cada um (Testing Library, user-event, jest-dom, jsdom) e o que deve ir no `vitest.config.js` e no arquivo de setup.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C4, C5
- **Contexto:** O componente `BotaoCarrinho` mostra "Adicionar ao carrinho"; ao ser clicado, troca o texto para "Adicionado ✓" e chama a função `aoAdicionar` recebida por propriedade.
- **Comando:** Escreva o teste com Testing Library e user-event no padrão AAA, buscando o botão pelo papel e pelo nome e conferindo o novo texto e a chamada da função.
- **Linhas:** 9

### ITEM 3
- **Capacidade:** C4
- **Contexto:** Você precisa localizar: (a) o botão "Finalizar compra"; (b) o campo com rótulo "E-mail"; (c) a busca com placeholder "Buscar produtos..."; (d) a confirmação de que o modal de cupom NÃO está aberto; (e) a mensagem "Pedido realizado" que aparece depois de alguns instantes.
- **Comando:** Indique a consulta adequada para cada caso (getBy, queryBy ou findBy e o tipo: Role, LabelText, PlaceholderText ou Text) e justifique.
- **Linhas:** 6

### ITEM 4
- **Capacidade:** C4, C5
- **Contexto:** No formulário de cadastro, a senha com menos de 6 caracteres mostra "A senha deve ter no mínimo 6 dígitos" e o botão "Cadastrar" fica desabilitado; com a senha válida, a mensagem some e o botão habilita.
- **Comando:** Escreva o roteiro do teste de integração (consultas, digitação e asserções com os matchers de jest-dom) cobrindo a senha inválida e a correção.
- **Linhas:** 8

### ITEM 5
- **Capacidade:** C4
- **Contexto:** Um teste da lista de produtos faz `container.querySelector('.item-lista')` e confere o estado interno `filtroAtivo === true`. Depois de trocar o tema visual, ele quebrou, embora a lista funcione igual para o usuário.
- **Comando:** Explique por que esse teste é frágil (falso negativo) e reescreva a ideia do teste buscando os elementos por papel e texto.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C5
- **Contexto:** Use o componente `ListaProdutos` do capítulo (campo "Buscar produto", lista de itens e a mensagem "Nenhum produto encontrado").
- **Comando:** Escreva um teste que digite um termo sem resultados e confira que nenhum item aparece e que a mensagem "Nenhum produto encontrado" é exibida.
- **Linhas:** 7

---

# Capítulo 05 — Integração Avançada e Mock de APIs

- **Aula:** 05
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C5
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-05.md`

## Teoria

### E quando o servidor cai no meio dos testes?

A suíte da **Loja Nuvem Azul** chamava a API de homologação de verdade. Numa manhã, o servidor
ficou fora do ar por uma hora e **todos** os testes do catálogo falharam — sem nenhum defeito no
front-end. Em outro dia, a API respondeu devagar e os testes passaram ou falharam "do nada". Testes
que dependem de rede real são **lentos, instáveis e caros**. A solução é **isolar a dependência**:
o teste controla exatamente o que a API responde.

> 🎯 **Objetivos do capítulo:** aplicar a **automação de testes** a telas que buscam dados,
> substituindo a API por um **mock** com o **MSW**; testar sucesso, **erros 404 e 500** e **rede
> lenta** (confiabilidade); usar **spies** para conferir chamadas; testar estado compartilhado e
> `localStorage`; e **executar** a suíte de forma rápida e determinística.

### Mock, stub e spy: os "dublês" de teste

| Dublê | O que faz | Exemplo |
|---|---|---|
| **Mock** | Substituto controlado de uma dependência, que responde o que o teste definir | A API de produtos simulada devolve 2 produtos |
| **Stub** | Resposta fixa, sem lógica | `buscarFrete` sempre devolve 15 |
| **Spy (espião)** | Observa uma função real (ou falsa) e registra como foi chamada | `vi.spyOn(window, 'fetch')` conta quantas requisições saíram |

O objetivo é sempre o mesmo: o teste deve depender **só do código que está sendo testado**, nunca
do humor da rede ou de um servidor externo.

### Por que não "mockar o fetch" direto?

Substituir `fetch` (ou o `axios`) por `vi.fn()` funciona em testes unitários, mas **acopla o teste
à biblioteca**: se o time trocar `fetch` por `axios`, todos os testes quebram — e erros de URL,
cabeçalho ou leitura do JSON passam despercebidos. O **MSW (Mock Service Worker)** intercepta a
requisição **na camada de rede**: o componente usa o cliente HTTP de produção, sem nenhuma
alteração, e quem responde é o servidor simulado.

### Configurando o MSW (Node + Vitest)

```bash
npm install -D msw
```

```js
// src/mocks/handlers.js — respostas padrão (o "caminho feliz")
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/produtos', () =>
    HttpResponse.json([
      { id: 1, nome: 'Camiseta azul', preco: 59.9 },
      { id: 2, nome: 'Boné preto', preco: 39.9 },
    ]),
  ),
];

// src/mocks/servidor.js — o servidor simulado (importado pelo setup e pelos testes)
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const servidor = setupServer(...handlers);

// vitest.setup.js — ciclo de vida do servidor simulado
import '@testing-library/jest-dom/vitest';
import { servidor } from './src/mocks/servidor';

beforeAll(() => servidor.listen());
afterEach(() => {
  servidor.resetHandlers();
  localStorage.clear();
});
afterAll(() => servidor.close());
```

- `listen()` liga a interceptação antes de todos os testes;
- `resetHandlers()` desfaz as mudanças feitas em um teste (o próximo começa limpo);
- `close()` desliga o servidor no fim da suíte.

### O componente que busca dados

```jsx
// Catalogo.jsx
import { useEffect, useState } from 'react';

export function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch('/api/produtos');
        if (!resposta.ok) throw new Error(String(resposta.status));
        setProdutos(await resposta.json());
      } catch {
        setErro('Serviço indisponível, tente novamente');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p role="alert">{erro}</p>;
  return <ul>{produtos.map((p) => <li key={p.id}>{p.nome}</li>)}</ul>;
}
```

### Testando sucesso, erro 500 e rede lenta

```jsx
// Catalogo.test.jsx
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { http, HttpResponse, delay } from 'msw';
import { it, expect } from 'vitest';
import { servidor } from './mocks/servidor';
import { Catalogo } from './Catalogo';

it('mostra os produtos que a API devolve', async () => {
  render(<Catalogo />);
  expect(await screen.findAllByRole('listitem')).toHaveLength(2);
});

it('mostra mensagem amigável quando a API devolve erro 500', async () => {
  servidor.use(http.get('/api/produtos', () => new HttpResponse(null, { status: 500 })));
  render(<Catalogo />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Serviço indisponível');
});

it('mostra "Carregando..." enquanto a rede está lenta', async () => {
  servidor.use(
    http.get('/api/produtos', async () => {
      await delay(800);
      return HttpResponse.json([]);
    }),
  );
  render(<Catalogo />);
  await waitForElementToBeRemoved(() => screen.queryByText('Carregando...'));
});
```

- `servidor.use(...)` **sobrescreve** o handler **só naquele teste** (o `resetHandlers` restaura).
- Para o **404**, a mesma ideia: `new HttpResponse(null, { status: 404 })` e a tela deve mostrar
  uma mensagem de "não encontrado", sem quebrar.
- ⚠️ **Nunca** use `setTimeout` com tempo fixo no teste: `findBy`, `waitFor` e
  `waitForElementToBeRemoved` esperam **só o necessário**.

### Confiabilidade: a tela que não quebra

Testar erros de rede é testar a **confiabilidade** (tipo de teste 4.3): o sistema continua
utilizável quando algo dá errado. Perguntas que a suíte precisa responder:

- A API caiu (500)? Aparece aviso e um botão **Tentar novamente**?
- O recurso não existe (404)? A mensagem é amigável?
- A rede está lenta? O botão fica desabilitado (evita **clique duplo**) e há indicação de carregamento?
- Duas buscas seguidas voltaram **fora de ordem** (race condition)? A tela mostra a resposta mais recente?

### Spies: conferindo as chamadas

```js
it('busca os produtos uma única vez ao abrir a tela', async () => {
  const espiaoFetch = vi.spyOn(globalThis, 'fetch');
  render(<Catalogo />);
  await screen.findAllByRole('listitem');
  expect(espiaoFetch).toHaveBeenCalledTimes(1);
  expect(espiaoFetch).toHaveBeenCalledWith('/api/produtos');
});
```

O spy **observa** sem substituir: a requisição continua indo para o MSW. Restaure com
`vi.restoreAllMocks()` no `afterEach`.

### Estado compartilhado e localStorage

Componentes reais dependem de **provedores** (carrinho, usuário logado, tema). Em vez de repetir os
provedores em cada teste, crie um **render personalizado**:

```jsx
// tests/renderComProvedores.jsx
import { render } from '@testing-library/react';
import { CarrinhoProvider } from '../src/CarrinhoContext';

export function renderComProvedores(componente, { itensIniciais = [] } = {}) {
  return render(<CarrinhoProvider itensIniciais={itensIniciais}>{componente}</CarrinhoProvider>);
}
```

Para a **persistência**: grave os dados com `localStorage.setItem` **antes** de montar a tela,
renderize, confira com `findByText` que os itens aparecem e **limpe** o storage no `afterEach`
(senão um teste contamina o outro).

### Execução dos testes: rápida e determinística

- Rode só o arquivo em foco: `npx vitest run Catalogo`; a suíte inteira antes de enviar o código.
- Teste **determinístico** dá sempre o mesmo resultado: sem rede real, sem horários fixos e com
  dados limpos a cada teste.
- O aviso **"not wrapped in act(...)"** indica promessa terminando depois do teste: espere o
  resultado final com `findBy`/`waitFor` antes de encerrar.
- Mock com MSW no desenvolvimento e na integração contínua (rápido e gratuito); servidor real fica
  para os testes de ponta a ponta antes da publicação (capítulo 6).

## Vídeos

- [O que é Mock e Stub? Entenda a importância deles nos testes](https://www.youtube.com/watch?v=ARSCjYPh2bI) — 03:13 — AlgaWorks
- [Mocks, stubs, dummies, fakes, spies: dublês de teste](https://www.youtube.com/watch?v=9w4GpaOeX7M) — 10:40 — Otavio Lemos
- [How to mock API calls with Mock Service Worker in React (em inglês)](https://www.youtube.com/watch?v=6MhPKSGzDFk) — 11:51 — Codeching
- [How to test fetch or axios in a React component with MSW (em inglês)](https://www.youtube.com/watch?v=dReoPIwDccY) — 12:30 — Coding With Adam

## Resumo

- Testes com **rede real** são lentos e instáveis; o teste deve controlar o que a API responde.
- **Mock** é o substituto controlado de uma dependência; **stub** dá resposta fixa; **spy** observa as chamadas.
- O **MSW** intercepta na camada de rede: o componente usa o `fetch` de produção e o teste define a resposta (handlers + `listen`/`resetHandlers`/`close`).
- `servidor.use` sobrescreve o handler em um teste para simular **404, 500 e rede lenta** (`delay`) — testes de **confiabilidade**.
- Espere com `findBy`, `waitFor` e `waitForElementToBeRemoved`, nunca com `setTimeout` fixo.
- **Render personalizado** com provedores e `localStorage.clear()` no `afterEach` mantêm a suíte **determinística**.

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** A suíte do catálogo da Loja Nuvem Azul chama a API de homologação real: quando o servidor cai, todos os testes falham, e quando a rede está lenta, alguns passam e outros não.
- **Comando:** Explique por que esses testes são instáveis, o que é um mock e por que interceptar a rede com MSW é melhor do que substituir o `fetch` por `vi.fn()`.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C5
- **Contexto:** A tela de pedidos busca `GET /api/pedidos` e mostra cada pedido em um item de lista. O projeto ainda não tem o MSW configurado.
- **Comando:** Escreva o handler que devolve dois pedidos, o arquivo de setup com o ciclo de vida do servidor (`listen`, `resetHandlers`, `close`) e o teste que confere os dois itens na tela.
- **Linhas:** 10

### ITEM 3
- **Capacidade:** C5
- **Contexto:** Na mesma tela, quando a API devolve erro 500 deve aparecer "Serviço indisponível, tente novamente" e o botão **Tentar novamente**; quando a rede está lenta, aparece "Carregando..." até os dados chegarem.
- **Comando:** Escreva os dois testes sobrescrevendo o handler com `servidor.use`: um para o erro 500 (conferindo a mensagem exibida) e outro com `delay` (conferindo que "Carregando..." aparece e depois some), sem usar `setTimeout`.
- **Linhas:** 10

### ITEM 4
- **Capacidade:** C5
- **Contexto:** Um bug foi relatado: ao clicar duas vezes rápido em **Finalizar compra**, saem duas requisições `POST /api/pedidos` e o cliente é cobrado duas vezes.
- **Comando:** Descreva um teste que use um spy (`vi.spyOn(globalThis, 'fetch')`) e rede lenta para provar que só uma requisição é enviada e que o botão fica desabilitado enquanto espera.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C5
- **Contexto:** O carrinho salva os itens em `localStorage` com a chave `@carrinho` e, ao abrir a página, recupera os itens salvos. Um teste passa sozinho, mas falha quando roda depois de outro.
- **Comando:** Coloque em ordem as etapas do teste de recuperação do carrinho (gravar, renderizar, conferir, limpar), explique a causa da falha intermitente e como o `afterEach` resolve.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C5
- **Contexto:** A busca de produtos dispara uma requisição a cada letra digitada. Às vezes a resposta de "cam" chega depois da de "camiseta" e a tela mostra o resultado antigo.
- **Comando:** Explique o que é essa race condition e descreva como simular o problema no teste com MSW (latências diferentes por termo) e qual resultado o teste deve exigir na tela.
- **Linhas:** 6

---

# Capítulo 06 — Testes End-to-End com Cypress e Playwright

- **Aula:** 06
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C4, C5
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-06.md`

## Teoria

### Todos os testes passaram. Ninguém conseguiu comprar.

Na **Loja Nuvem Azul**, os testes unitários e de integração estavam verdes e todas as APIs
respondiam com status 200. Mesmo assim, num sábado de promoção, nenhum cliente conseguiu pagar: um
banner de cupom, colocado por cima do botão **Finalizar compra**, impedia o clique. O jsdom não
desenha a tela, então só um teste que roda **num navegador de verdade**, como o cliente, teria
encontrado o problema. Esse é o papel do teste **E2E (ponta a ponta)**.

> 🎯 **Objetivos do capítulo:** diferenciar o E2E dos testes unitários e de integração, conhecer os
> **frameworks** Cypress e Playwright, **automatizar fluxos completos** (login e checkout) como
> teste **funcional de caixa preta**, verificar aspectos de **usabilidade** e combater os testes
> **intermitentes (flaky)**.

### O que é um teste E2E

O **E2E** testa o fluxo completo, como o usuário: abre o navegador, navega pelas páginas, digita,
clica e confere o que aparece — com CSS, rotas, cookies e (em geral) API reais.

| | Unitário / integração | E2E |
|---|---|---|
| Onde roda | Node + jsdom (sem desenhar a tela) | Navegador real (Chromium, Firefox, WebKit) |
| O que cobre | Funções e componentes | A jornada inteira (login → carrinho → pagamento) |
| Velocidade | Milissegundos | Segundos por teste |
| Na pirâmide | Base e meio (~90%) | Topo (~10%), só os **fluxos críticos** |

O E2E é o teste **funcional de caixa preta** por excelência: ele não conhece o código, só a tela.

### Frameworks: Cypress × Playwright

| | Cypress | Playwright |
|---|---|---|
| Como funciona | Roda dentro do navegador, junto com a aplicação | O teste roda no Node e comanda o navegador por protocolo |
| Navegadores | Chrome, Edge, Firefox (e Electron) | Chromium, Firefox e **WebKit** (motor do Safari) |
| Destaques | Painel visual com **time-travel** (volta a cada passo) | Várias abas/páginas, celular emulado, **trace viewer** |
| Sintaxe | Comandos encadeados (`cy.get().type()`) | `async/await` (`await page.getByRole().click()`) |
| Espera | `should()` repete a verificação até passar | **Auto-waiting**: espera o elemento estar visível, habilitado e parado |

Os dois resolvem o mesmo problema; a escolha depende do projeto e da equipe.

### Cypress: instalação e primeiro fluxo

```bash
npm install -D cypress
npx cypress open
```

```js
// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({ e2e: { baseUrl: 'http://localhost:5173' } });

// cypress/e2e/login.cy.js
describe('Login', () => {
  beforeEach(() => cy.clearLocalStorage());

  it('entra com dados válidos e vai para o painel', () => {
    cy.visit('/login');
    cy.get('[data-testid="campo-email"]').type('cliente.teste@nuvemazul.test');
    cy.get('[data-testid="campo-senha"]').type('Teste123');
    cy.contains('button', 'Entrar').click();
    cy.url().should('include', '/painel');
    cy.contains('Bem-vindo').should('be.visible');
  });

  it('mostra "Credenciais inválidas" e continua no login', () => {
    cy.visit('/login');
    cy.get('[data-testid="campo-email"]').type('cliente.teste@nuvemazul.test');
    cy.get('[data-testid="campo-senha"]').type('errada');
    cy.contains('button', 'Entrar').click();
    cy.contains('Credenciais inválidas').should('be.visible');
    cy.url().should('include', '/login');
  });
});
```

- `cy.visit` abre a rota (com `baseUrl` não se repete o endereço);
- `cy.get` busca por seletor; `cy.contains` busca pelo texto visível;
- `should(...)` **repete** a verificação até passar ou estourar o tempo limite;
- quando um teste falha, o Cypress salva **captura de tela** (e, se configurado, vídeo) — essencial
  na integração contínua, onde não há monitor.

### Playwright: o fluxo de compra com dados isolados

```bash
npm init playwright@latest
```

```js
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:5173', trace: 'on-first-retry', screenshot: 'only-on-failure' },
  webServer: { command: 'npm run dev', url: 'http://localhost:5173', reuseExistingServer: true },
  projects: [
    { name: 'computador', use: { ...devices['Desktop Chrome'] } },
    { name: 'celular', use: { ...devices['iPhone 13'] } },
  ],
});

// e2e/compra.spec.js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
  // Rota que só existe no ambiente de testes: recria o cliente com o carrinho vazio.
  await request.post('/api/testes/preparar', { data: { cliente: 'cliente.teste@nuvemazul.test' } });
});

test('cliente entra, adiciona ao carrinho e finaliza a compra', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-mail').fill('cliente.teste@nuvemazul.test');
  await page.getByLabel('Senha').fill('Teste123');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/\/catalogo/);

  await page.getByRole('button', { name: 'Adicionar Camiseta azul ao carrinho' }).click();
  await page.getByRole('link', { name: /Carrinho/ }).click();
  await expect(page.getByText('Subtotal: R$ 59,90')).toBeVisible();

  await page.getByRole('button', { name: 'Finalizar compra' }).click();
  await expect(page.getByRole('heading', { name: 'Pedido confirmado' })).toBeVisible();
});
```

- `npx playwright test` roda tudo; `--ui` abre o modo visual; `npx playwright show-report` mostra
  o relatório com capturas e o **trace** (o passo a passo do teste que falhou).
- **Dados isolados:** cada teste prepara o próprio cliente e o próprio carrinho; nenhum depende do
  que outro teste deixou no banco.
- Se o banner cobrir o botão, o `click()` do Playwright **falha**, porque o elemento não está
  recebendo o clique — exatamente o defeito da abertura.

### Seletores que resistem a mudanças

| Seletor | Avaliação |
|---|---|
| `div > p:nth-child(2)` | ❌ Quebra se a ordem do HTML mudar |
| `.btn-primary-blue` | ❌ Quebra se o tema visual mudar |
| `/html/body/div[2]/button` (XPath absoluto) | ❌ Quebra com qualquer mudança de estrutura |
| `getByRole('button', { name: 'Salvar' })` | ✅ Igual ao que o usuário vê (e ajuda a acessibilidade) |
| `[data-testid="btn-salvar"]` | ✅ Atributo dedicado a teste, estável |

### Usabilidade no E2E

Como roda num navegador real, o E2E também verifica a **usabilidade** (tipo de teste 4.2):

- o botão está **visível** e não está coberto por outro elemento;
- o fluxo funciona em **tela de celular** (projeto `celular` do Playwright);
- dá para concluir o formulário **só com o teclado** (`page.keyboard.press('Tab')`, `Enter`);
- as mensagens de erro aparecem **perto do campo** e com texto compreensível.

### Testes intermitentes (flaky)

Um teste **intermitente (flaky)** passa ou falha sem mudança no código: passou na sua máquina,
falhou duas vezes na integração contínua. Ele destrói a confiança na suíte — o time passa a ignorar
falhas, e defeitos reais se escondem no ruído.

| Causa | Como evitar |
|---|---|
| Clicar antes de a tela estar pronta | Usar a espera automática (`should`, auto-waiting), nunca pausa fixa |
| `cy.wait(5000)` "para garantir" | Interceptar a rota e esperar por ela: `cy.intercept('POST', '/api/pedidos').as('pedido')` e `cy.wait('@pedido')` |
| Dados compartilhados entre testes | Cada teste cria e limpa seus dados (cookies, storage, banco de teste) |
| Animações e elementos se movendo | Esperar o estado final; desligar animações no ambiente de teste |
| Dependência de data e hora | Fixar o relógio (ex.: `page.clock` no Playwright, `cy.clock` no Cypress) |

**Ciclo de vida seguro de um teste E2E:** preparar o ambiente (limpar estado, interceptar rede) →
navegar até a rota → executar as ações do usuário → validar com asserções e conferência da URL.

### Page Object Model (POM)

Quando dezenas de testes repetem os mesmos seletores, qualquer mudança no HTML obriga a editar todos.
O **Page Object** concentra seletores e ações de uma página em um só lugar:

```js
// e2e/paginas/PaginaLogin.js
export class PaginaLogin {
  constructor(page) {
    this.page = page;
  }

  async entrar(email, senha) {
    await this.page.goto('/login');
    await this.page.getByLabel('E-mail').fill(email);
    await this.page.getByLabel('Senha').fill(senha);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }
}
```

No teste: `await new PaginaLogin(page).entrar('cliente.teste@nuvemazul.test', 'Teste123');`.

## Vídeos

- [Criando um primeiro teste E2E com Cypress](https://www.youtube.com/watch?v=yCujUWwBzGU) — 13:47 — Tiago Samuel
- [Curso de automação de testes com Playwright: introdução](https://www.youtube.com/watch?v=WYgDL106aVI) — 12:49 — Willames Vital
- [Flaky tests: o que comem, onde vivem e como reproduzem](https://www.youtube.com/watch?v=NE0Hf4HsH7o) — 10:21 — Dev Eficiente

## Resumo

- **E2E** testa o fluxo completo, como o usuário, num navegador real; fica no **topo da pirâmide** (~10%), só nos fluxos críticos.
- **Cypress** (time-travel, comandos encadeados, `should` com repetição) e **Playwright** (vários navegadores e celular, `async/await`, auto-waiting, trace) são os principais frameworks.
- O E2E é teste **funcional de caixa preta** e também verifica **usabilidade**: botão visível, celular, teclado.
- Use **seletores estáveis** (`getByRole`, `data-testid`), nunca posição, classe de estilo ou XPath absoluto.
- **Teste intermitente (flaky)** passa ou falha sem mudança no código: evite pausas fixas, espere a rede com intercept/alias e **isole os dados**.
- O **Page Object Model** concentra seletores e ações de cada página e facilita a manutenção.

## Exercícios

### ITEM 1
- **Capacidade:** C4
- **Contexto:** Na Loja Nuvem Azul, todos os testes unitários e de integração passaram, mas um banner cobriu o botão **Finalizar compra** e nenhum cliente conseguiu pagar. O time quer criar testes E2E para "tudo".
- **Comando:** Explique por que só um teste E2E encontraria esse defeito, onde o E2E fica na pirâmide de testes e quais três fluxos da loja você escolheria para automatizar em E2E (e por quê não automatizar tudo).
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C4, C5
- **Contexto:** Plano de testes do login: (a) dados válidos levam a `/painel` com "Bem-vindo"; (b) senha errada mostra "Credenciais inválidas" e a rota continua `/login`. Os campos têm `data-testid="campo-email"` e `data-testid="campo-senha"`.
- **Comando:** Escreva os dois testes em Cypress (`cy.visit`, `cy.get`, `type`, `cy.contains`, `should`), incluindo a limpeza do estado no `beforeEach`.
- **Linhas:** 10

### ITEM 3
- **Capacidade:** C5
- **Contexto:** A loja precisa de um teste E2E em Playwright para o fluxo login → adicionar ao carrinho → finalizar, que não dependa de dados deixados por outros testes.
- **Comando:** Escreva o teste com `page.getByLabel`, `page.getByRole` e `expect`, preparando os dados do cliente no `beforeEach` e conferindo a URL depois do login, o subtotal no carrinho e a mensagem "Pedido confirmado".
- **Linhas:** 12

### ITEM 4
- **Capacidade:** C5
- **Contexto:** O teste do checkout usa `cy.wait(5000)` depois de clicar em **Confirmar pedido** e, mesmo assim, falha em 1 de cada 5 execuções na integração contínua; localmente sempre passa. Ele também usa um cliente que outro teste altera.
- **Comando:** Explique o que é um teste intermitente (flaky), aponte as duas causas desse caso e reescreva a espera usando `cy.intercept` com alias e `cy.wait('@alias')`, além de isolar os dados.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C4
- **Contexto:** Para clicar no botão **Salvar endereço**, quatro colegas sugeriram: `div > button:nth-child(3)`, `.btn-primary-blue`, `/html/body/div[2]/form/button` e `getByRole('button', { name: 'Salvar endereço' })`.
- **Comando:** Classifique cada seletor como frágil ou confiável, justifique e diga quando o `data-testid` é a melhor alternativa.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C4
- **Contexto:** O plano de testes do checkout exige verificar a usabilidade: concluir a compra no celular, concluir só com o teclado e garantir que nenhum elemento cubra o botão de pagamento.
- **Comando:** Descreva como cada exigência seria verificada em E2E (projeto de celular, navegação com Tab/Enter e a espera automática do clique) e que resultado indicaria falha de usabilidade.
- **Linhas:** 6

---

# Capítulo 07 — Métricas e Cobertura de Testes

- **Aula:** 07
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C3, C4
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-07.md`

## Teoria

### 95% de cobertura e o cupom quebrado

A equipe da **Loja Nuvem Azul** comemorava: **95% de cobertura**. Uma semana depois, o cupom
**NUVEM10** passou a dar desconto em dobro e ninguém percebeu antes dos clientes. O relatório
mostrava a função do cupom "verde", mas o teste só **chamava** a função — não conferia o resultado.
Além disso, a equipe rodava os testes à mão antes de publicar e ninguém acompanhava os números ao
longo do tempo (situação de aprendizagem 2). Métricas ajudam muito, **desde que** sejam bem lidas.

> 🎯 **Objetivos do capítulo:** **monitorar e controlar** a execução dos testes com métricas,
> gerar e **ler o relatório de cobertura** apontando trechos sem teste, **avaliar os resultados**
> para decidir se a versão pode ser publicada e usar a cobertura a favor da **manutenibilidade**.

### O processo de teste: monitoração, controle e avaliação

Nos capítulos anteriores vimos planejamento, desenho e execução. Faltam as duas etapas finais:

| Etapa | Pergunta | Exemplo na Loja Nuvem Azul |
|---|---|---|
| **7.4 Monitoração e controle** | O andamento está de acordo com o plano? O que fazer se não estiver? | A cobertura caiu de 78% para 66% em duas semanas → bloquear o envio de código abaixo de 70% |
| **7.5 Avaliação dos resultados** | Os critérios de saída foram atingidos? Podemos publicar? | 100% dos testes críticos passando, nenhum defeito grave aberto, cobertura ≥ 70% → versão aprovada |

**Métricas para monitorar:** testes executados, aprovados e reprovados; testes intermitentes;
tempo de execução da suíte; defeitos encontrados × corrigidos; e a **cobertura** e sua tendência.
**Controlar** é agir com base nelas: repriorizar testes, corrigir testes instáveis, travar o envio de
código sem teste.

### O que é cobertura

**Cobertura** é o percentual de código executado pelos testes. A ferramenta **instrumenta** o
código (coloca contadores invisíveis em cada trecho), roda a suíte e, no fim, conta o que foi e o
que não foi executado.

| Métrica | O que mede |
|---|---|
| **Statements** (instruções) | Percentual de instruções executadas |
| **Branches** (ramos) | Percentual de caminhos de decisão testados (`if/else`, `switch`, ternário, `&&`, `??`) |
| **Functions** (funções) | Percentual de funções chamadas ao menos uma vez |
| **Lines** (linhas) | Percentual de linhas executadas |

### O ramo escondido

```js
// desconto.js
export function aplicarDesconto(total, cupom) {
  const desconto = cupom === 'NUVEM10' ? total * 0.1 : 0;
  return total - desconto;
}

// desconto.test.js — só testa o cupom válido
it('aplica 10% com o cupom NUVEM10', () => {
  expect(aplicarDesconto(200, 'NUVEM10')).toBe(180);
});
```

Esse teste executa **100% das linhas**, mas só **50% dos ramos**: o caminho "cupom inválido → sem
desconto" nunca foi testado. Por isso, em regras de negócio, a métrica de **branches** é a mais
reveladora.

### Gerando o relatório com Vitest

```bash
npm install -D @vitest/coverage-v8
npx vitest run --coverage
```

```js
// vitest.config.js (trecho)
test: {
  coverage: {
    provider: 'v8',
    reporter: ['text', 'html', 'lcov'],
    include: ['src/**/*.{js,jsx}'],
    exclude: ['src/**/*.test.{js,jsx}', 'src/mocks/**', 'src/main.jsx'],
    thresholds: { lines: 70, branches: 70, functions: 70, statements: 70 },
  },
},
```

- **provider:** `v8` (nativo e rápido) ou `istanbul` (instrumentação própria);
- **reporter:** `text` (tabela no terminal), `html` (pasta `coverage/` navegável), `lcov` (para
  serviços de integração contínua);
- **exclude:** testes, mocks e arquivos de inicialização não entram na conta;
- **thresholds:** metas mínimas — abaixo delas, o comando **falha** (e a integração contínua barra
  o envio).

### Lendo o relatório

```text
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------|---------|----------|---------|---------|------------------
All files     |   78.4  |   61.5   |   85.7  |   78.4  |
 carrinho.js  |  100    |  100     |  100    |  100    |
 cupom.js     |   62.5  |   40     |   66.6  |   62.5  | 14-18, 25
 frete.js     |   90    |   75     |  100    |   90    | 9
```

- **Uncovered Line #s** mostra as linhas que nenhum teste executou: em `cupom.js`, as linhas 14 a 18
  e 25.
- No **HTML** (`coverage/index.html`), as cores indicam a situação de cada arquivo (verde: boa;
  amarelo: média; vermelho: crítica); dentro do arquivo, a **margem** mostra quantas vezes cada
  linha rodou, o **fundo vermelho** marca linhas nunca executadas e as letras **I** (if) e **E**
  (else) marcam ramos não percorridos.
- Prioridade: arquivos com **regra de negócio** e branch baixo (aqui, `cupom.js`) vêm antes de
  componentes puramente visuais.

### A falsa sensação dos 100%

```js
it('cupom', () => {
  aplicarDesconto(200, 'NUVEM10'); // executa, mas não confere nada
});
```

Esse teste conta como cobertura, mas não protege nada: **cobertura mostra o que foi executado, não
o que foi verificado**. O que protege o software são **asserções** sobre regras de negócio, bordas e
erros.

| Faixa de cobertura | Retorno do esforço |
|---|---|
| 0% a 70% | Alto: cada teste novo pega defeitos importantes |
| 70% a 85% | Equilíbrio entre esforço e segurança |
| 90% a 100% | Custo alto, muitas vezes testando código trivial; exigir 100% gera testes "só para bater meta" |

Metas podem variar por módulo: **checkout e pagamento** com 90%; componentes puramente visuais com
meta menor.

### Avaliação dos resultados: o relatório comentado

Números sozinhos não decidem nada; o **relatório de cobertura comentado** transforma a métrica em
decisão:

1. **Resumo:** testes executados, aprovados e reprovados; cobertura geral e por métrica.
2. **Achados:** arquivos e linhas sem teste, com o risco de cada um (ex.: "cupom inválido não
   testado — risco de desconto indevido").
3. **Plano de ação:** testes a criar, em ordem de prioridade.
4. **Recomendação:** a versão atende aos critérios de saída do plano de testes? Publicar ou não.

### Cobertura e manutenibilidade

- O relatório revela **código morto**: funções que nenhum teste (e nenhuma tela) chama e condições
  que nunca podem ser verdadeiras — candidatas a remoção.
- Uma boa suíte deixa **refatorar com segurança**: se o comportamento mudar sem querer, um teste
  falha.
- Testes também precisam ser **fáceis de manter**: nomes claros, sem duplicação, auxiliares
  reaproveitados (como o render com provedores do capítulo 5).
- Na situação de aprendizagem 2, o próximo passo (capítulo 9) é levar tudo isso para a
  **integração contínua**: rodar a suíte a cada envio, barrar a junção do código com teste falhando
  ou cobertura abaixo de 70% e publicar o relatório.

## Vídeos

- [Entendendo e aplicando cobertura de código (exemplo em Java)](https://www.youtube.com/watch?v=amDFHIg-D_U) — 12:29 — Manoel Campos Dev
- [Getting started with Vitest code coverage (em inglês)](https://www.youtube.com/watch?v=UOdgx2Mm3X8) — 11:24 — ViteConf
- [Run code coverage tool with Vitest (em inglês)](https://www.youtube.com/watch?v=Bo7gZUqgRQ0) — 02:51 — Nathan Krasney

## Resumo

- **Monitoração e controle:** acompanhar métricas (aprovados, reprovados, intermitentes, tempo, defeitos, cobertura) e agir quando saem do plano.
- **Avaliação dos resultados:** comparar com os critérios de saída e decidir se a versão pode ser publicada, por meio do relatório comentado.
- **Cobertura** = percentual de código executado pelos testes, nas métricas statements, branches, functions e lines; **branches** revela caminhos esquecidos.
- No Vitest: `@vitest/coverage-v8`, `vitest run --coverage`, `reporter`, `exclude` e **thresholds** que travam a suíte abaixo da meta.
- Cobertura alta não garante qualidade: sem **asserções**, o teste só executa; 70% a 85% costuma ser o melhor equilíbrio.
- O relatório revela **código morto** e uma boa suíte torna a refatoração segura — **manutenibilidade**.

## Exercícios

### ITEM 1
- **Capacidade:** C4
- **Contexto:** O relatório do terminal mostra: `carrinho.js` 100/100/100/100; `cupom.js` 62,5% statements, 40% branches, 66,6% funções, linhas não cobertas 14-18 e 25; `frete.js` 90% statements, 75% branches, linha não coberta 9.
- **Comando:** Leia o relatório: diga qual arquivo tem a situação mais crítica, qual métrica é a pior, quais trechos estão sem teste e em que ordem você criaria os testes que faltam, justificando pelo risco.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C4
- **Contexto:** A função `calcularParcelas(total)` devolve `total <= 100 ? 1 : 3`. A suíte tem um único teste: `calcularParcelas(300)` deve ser 3. O relatório mostra 100% de linhas e 50% de branches.
- **Comando:** Explique por que as linhas estão em 100% e os ramos em 50% e escreva os testes que faltam, incluindo o valor de borda.
- **Linhas:** 6

### ITEM 3
- **Capacidade:** C4
- **Contexto:** Um colega elevou a cobertura de 60% para 98% em uma tarde escrevendo testes como `it('frete', () => { calcularFrete(100, 12); });`.
- **Comando:** Explique por que essa cobertura é enganosa (cobertura mostra o que foi executado, não o que foi verificado) e reescreva o teste para que ele realmente proteja a regra.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C3, C4
- **Contexto:** A coordenação definiu: cobertura mínima de 70% em todas as métricas, sem contar arquivos de teste, a pasta `src/mocks` e o `src/main.jsx`, com relatório no terminal e em HTML.
- **Comando:** Escreva o trecho `coverage` do `vitest.config.js` que atende a essas exigências e explique o que acontece com o comando de testes (e com a integração contínua) quando a cobertura fica abaixo da meta.
- **Linhas:** 8

### ITEM 5
- **Capacidade:** C3
- **Contexto:** Resultado da versão 2.4: 182 testes, 179 aprovados, 3 reprovados (dois no checkout); cobertura geral de 74%, mas `pagamento.js` com 48% de branches; um defeito grave aberto no cálculo de parcelas. Critério de saída do plano: testes críticos 100% aprovados, nenhum defeito grave aberto e cobertura ≥ 70%.
- **Comando:** Escreva o relatório de cobertura comentado (resumo, achados com risco, plano de ação e recomendação de publicar ou não a versão), justificando com os critérios de saída.
- **Linhas:** 9

### ITEM 6
- **Capacidade:** C3
- **Contexto:** Painel das últimas quatro semanas: cobertura 79% → 76% → 71% → 66%; testes intermitentes 2 → 5 → 9 → 12; tempo da suíte 3 min → 4 min → 6 min → 9 min.
- **Comando:** Interprete as tendências (monitoração) e proponha três ações de controle, explicando que problema cada ação resolve.
- **Linhas:** 6

### ITEM 7
- **Capacidade:** C3
- **Contexto:** O relatório HTML mostra a função `formatarCupomAntigo` com 0 execuções, e nenhuma tela do sistema a importa. O gerente quer exigir 100% de cobertura em todo o projeto.
- **Comando:** Explique o que a função em vermelho indica e o que fazer com ela, e argumente sobre a meta de 100% usando o retorno do esforço e a manutenibilidade dos testes.
- **Linhas:** 6

---

# Capítulo 08 — TDD e Debugging Moderno no Front-End

- **Aula:** 08
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C5, S1
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-08.md`

## Teoria

### E se o teste nascesse antes do código?

Na **Loja Nuvem Azul**, o cadastro aceitava CPFs como `111.111.111-11`, e corrigir o validador
virou motivo de medo: cada ajuste quebrava outra coisa. A equipe decidiu reescrever o validador de
outro jeito — **escrevendo o teste antes do código**. Cada regra nova começou com um teste falhando,
e o código só cresceu o suficiente para passar. No fim, havia uma suíte que documentava todas as
regras e permitia mexer no código sem medo.

> 🎯 **Objetivos do capítulo:** aplicar o ciclo **TDD (vermelho → verde → refatorar)**, depurar
> um teste que falha com método (mensagem, isolamento, breakpoints), usar a visão de **caixa
> branca** para conferir os caminhos, agir com **responsabilidade** com a suíte e **acolher
> sugestões** no code review dos testes.

### O que é TDD

**TDD** (Test-Driven Development) é escrever o teste antes do código. Mais do que testar, é uma
forma de **projetar**: o teste é o primeiro "cliente" da função e obriga a decidir nome,
parâmetros e retorno antes de programar.

| Fase | O que fazer | Regra de ouro |
|---|---|---|
| 🔴 **Vermelho** | Escrever **um** teste pequeno para a próxima regra e vê-lo falhar | Falhar **pelo motivo esperado** (prova que o teste funciona) |
| 🟢 **Verde** | Escrever o código **mais simples** que faz o teste passar | Não programar o futuro; resolver só a falha atual |
| 🔵 **Refatorar** | Melhorar nomes, remover duplicação, extrair funções | Comportamento igual: a barra continua verde |

O ciclo se repete em **micro-passos**: um teste por vez, nunca "todos os testes do sistema antes".

### TDD na prática: validador de CPF em 3 passos

**Passo 1 — Vermelho → verde: o caso mais simples.**

```js
// cpf.test.js
import { describe, it, expect } from 'vitest';
import { validarCPF } from './cpf';

describe('validarCPF', () => {
  it('recusa texto vazio', () => {
    expect(validarCPF('')).toBe(false);
  });
});

// 🔴 Falha: validarCPF ainda não existe.
// 🟢 cpf.js — o mínimo para passar:
export function validarCPF() {
  return false;
}
```

**Passo 2 — Vermelho → verde: um CPF válido e um CPF com dígitos repetidos.**

```js
it('aceita um CPF válido, com ou sem máscara', () => {
  expect(validarCPF('529.982.247-25')).toBe(true);
  expect(validarCPF('52998224725')).toBe(true);
});

it('recusa dígito verificador errado', () => {
  expect(validarCPF('529.982.247-26')).toBe(false);
});

it('recusa CPF com todos os dígitos iguais', () => {
  expect(validarCPF('111.111.111-11')).toBe(false);
});
```

O CPF `111.111.111-11` **passa** no cálculo dos dígitos verificadores; por isso o último teste
fica vermelho até a regra dos dígitos repetidos ser escrita — um vermelho legítimo, que revelou uma
regra escondida.

**Passo 3 — Refatorar: o código final, com a barra verde o tempo todo.**

```js
// cpf.js
function calcularDigito(numeros, pesoInicial) {
  const soma = numeros.reduce((total, numero, i) => total + numero * (pesoInicial - i), 0);
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

export function validarCPF(cpf) {
  const digitos = String(cpf ?? '').replace(/\D/g, '');
  if (digitos.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digitos)) return false;

  const numeros = [...digitos].map(Number);
  const primeiro = calcularDigito(numeros.slice(0, 9), 10);
  const segundo = calcularDigito(numeros.slice(0, 10), 11);
  return primeiro === numeros[9] && segundo === numeros[10];
}
```

O cálculo repetido virou a função `calcularDigito` — a refatoração foi segura porque os testes
confirmavam, a cada mudança, que o comportamento continuava o mesmo.

### Caixa branca: conferindo os caminhos

Depois do ciclo, olhe o código (visão de **caixa branca**) e confira se cada caminho tem teste:
tamanho diferente de 11 (`''`), dígitos repetidos (`111...`), dígito verificador errado (`...-26`)
e CPF válido (`...-25`). Faltou algum? Escreva o teste — e o relatório de cobertura (capítulo 7)
confirma os ramos.

### Quando usar TDD (e quando não)

| Use TDD ✅ | Prefira testar depois ⚠️ |
|---|---|
| Regras de negócio, cálculos e validações (CPF, cupom, frete) | Ajustes visuais de CSS e layout |
| Correção de defeitos: primeiro um teste que **reproduz** o bug | Protótipos descartáveis para explorar uma ideia |
| Componentes com comportamento (filtro, formulário) | Código de terceiros que você não controla |

Mito comum: "TDD dobra o tempo". Na prática, ele reduz retrabalho e tempo de depuração.

### Debugging moderno: depurar com método

Quando um teste falha, siga a ordem:

1. **Leia a mensagem inteira:** `expected 19 to be 21` diz o valor esperado, o obtido, o arquivo e a
   linha.
2. **Isole o caso:** `it.only(...)` roda só aquele teste; `it.skip(...)` pula um teste em construção
   (e **nenhum dos dois pode ser enviado** ao repositório).
3. **Use o modo watch:** `npx vitest` roda de novo ao salvar; no terminal, `p` filtra por arquivo, `t`
   pelo nome do teste e `f` roda só os que falharam.
4. **Pause no ponto certo:** em vez de espalhar `console.log`, use **breakpoints**. No editor
   (ex.: VS Code), abra um **terminal de depuração JavaScript**, rode `npx vitest run cpf` e a
   execução para na linha marcada (ou numa instrução `debugger;`). Inspecione as **variáveis**, a
   **pilha de chamadas** e teste expressões no console de depuração.
5. **Testes E2E:** use o time-travel do Cypress ou o trace do Playwright (capítulo 6) para ver a
   tela no exato momento da falha.

### Responsabilidade com a suíte

- Nunca **apague** ou "pule" um teste vermelho só para a suíte passar: ele está avisando algo.
- Não envie código com `it.only`, `it.skip` ou `debugger;` esquecidos.
- Rode a suíte inteira antes de enviar; se o seu código quebrou um teste, **assuma e corrija**.
- Defeito encontrado = teste que o reproduz + correção (o defeito não volta sem ser notado).

### Code review dos testes: acolher sugestões (S1)

No code review, um colega lê o seu código **e os seus testes** antes da junção. O que observar:

- o nome do teste descreve o comportamento? Há uma regra por teste?
- as asserções conferem algo importante (e não só "não deu erro")?
- os testes são independentes e cobrem as bordas?
- sobrou `only`, `skip` ou `console.log`?

**Ao receber sugestões:** leia com calma, agradeça, pergunte quando não entender e **considere a
ideia diferente da sua** — muitas vezes ela revela um caso que você não viu. Discorde com fatos
("o caso de CPF com letras já está no teste da linha 30"), nunca com o ego.

> 💬 **Exemplo:** "Sugiro testar também `529.982.247-2` (10 dígitos)." → "Boa! Esse caminho
> estava sem teste; incluí no mesmo describe."

## Vídeos

- [O que é TDD — Test-Driven Development](https://www.youtube.com/watch?v=o_C_qxhPws4) — 09:36 — Dias de Dev
- [TDD — Test Driven Development](https://www.youtube.com/watch?v=bhT7_gZE55c) — 14:59 — Programinhas
- [How to debug a unit test in VS Code (em inglês)](https://www.youtube.com/watch?v=zzYks4GGrFs) — 03:01 — Nathan Krasney
- [Recebi um code review no GitHub, e agora?](https://www.youtube.com/watch?v=YKncSsTDR_4) — 14:40 — Mayk Brito

## Resumo

- **TDD** é escrever o teste antes do código, em micro-ciclos **vermelho → verde → refatorar**.
- No vermelho, o teste falha pelo motivo esperado; no verde, o código mínimo; na refatoração, melhora-se o código com a barra verde.
- TDD é ideal para regras de negócio, validações e correção de defeitos; menos útil para ajustes visuais.
- Depure com método: mensagem, `only`, modo watch, **breakpoints** (variáveis e pilha de chamadas) e time-travel/trace no E2E.
- A visão de **caixa branca** confere se cada caminho tem teste; **responsabilidade** é nunca apagar teste vermelho nem enviar `only`/`skip`.
- No **code review**, acolha sugestões e ideias diferentes e discorde com fatos.

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** Um colega diz que "TDD é escrever todos os testes do sistema primeiro e depois programar tudo" e que, na fase verde, já deixa o código pronto para regras futuras.
- **Comando:** Corrija o entendimento do colega explicando as três fases do ciclo TDD, por que o teste precisa falhar antes e o que é permitido em cada fase.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C5
- **Contexto:** O cadastro da Loja Nuvem Azul precisa da função `validarSenhaForte(senha)`: mínimo de 8 caracteres, pelo menos uma letra maiúscula e pelo menos um número.
- **Comando:** Desenvolva a função com TDD em três ciclos (uma regra por ciclo), mostrando em cada ciclo o teste vermelho, o código verde mínimo e, no fim, a refatoração.
- **Linhas:** 12

### ITEM 3
- **Capacidade:** C5
- **Contexto:** O validador de CPF do capítulo já aceita `529.982.247-25` e recusa `529.982.247-26`. Ao escrever o teste `expect(validarCPF('111.111.111-11')).toBe(false)`, ele ficou vermelho.
- **Comando:** Explique por que esse vermelho é legítimo, escreva o código verde mínimo para a regra e diga qual refatoração deixaria o cálculo dos dígitos mais legível sem mudar o comportamento.
- **Linhas:** 7

### ITEM 4
- **Capacidade:** C5
- **Contexto:** O teste `cobra R$ 2 por km acima de 10 km` falha com a mensagem `expected 19 to be 21` em `frete.test.js:14`. A suíte tem 240 testes e leva 2 minutos.
- **Comando:** Descreva, em ordem, como você depuraria essa falha (leitura da mensagem, isolamento com `only`, modo watch, breakpoint e inspeção de variáveis) e o que deve ser removido antes de enviar a correção.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** S1
- **Contexto:** No code review dos seus testes do validador de CPF, a colega comentou: "o teste 'teste 1' não diz o que verifica", "faltou o caso com 10 dígitos" e "um teste confere três regras de uma vez".
- **Comando:** Escreva a resposta ao code review acolhendo as sugestões (ou discordando com fatos, se for o caso) e descreva as mudanças que você faria nos testes.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C5
- **Contexto:** Para a integração contínua passar antes do fim do expediente, um desenvolvedor apagou um teste vermelho do checkout e enviou outro arquivo com `it.only` esquecido.
- **Comando:** Explique os riscos de cada atitude para a equipe e para o cliente e descreva a conduta responsável diante de um teste vermelho.
- **Linhas:** 5

### ITEM 7
- **Capacidade:** C5
- **Contexto:** Observe o código final de `validarCPF` do capítulo, com seus três `return`.
- **Comando:** Usando a visão de caixa branca, liste cada caminho do código, o teste que o percorre e o valor de entrada usado, e indique se algum caminho ficou sem teste.
- **Linhas:** 6

---

# Capítulo 09 — Qualidade, Performance, Acessibilidade e CI/CD

- **Aula:** 09
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C5
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-09.md`

## Teoria

### Publicar na sexta-feira com um clique?

Na **Loja Nuvem Azul**, publicar era um ritual de medo: alguém rodava os testes à mão (quando
lembrava), ninguém sabia a cobertura e, às vezes, código com teste vermelho chegava à produção
(situação de aprendizagem 2). Além disso, a loja funcionava, mas era **lenta** no celular e
**difícil de usar** com leitor de tela. Neste capítulo, a qualidade deixa de ser um evento no fim e
vira um **processo automático e contínuo**.

> 🎯 **Objetivos do capítulo:** configurar uma **pipeline de CI** que executa a suíte a cada envio
> e bloqueia a junção com teste falhando ou cobertura abaixo de 70%; testar **usabilidade**
> (acessibilidade) e **desempenho** (Core Web Vitals); e organizar a **interação com a equipe**
> por meio de relatórios, badges e do `TESTING.md`.

### CI e CD

- **CI** é a integração contínua que roda a suíte a cada alteração: cada envio (`push`) e cada
  pedido de junção (`pull request`) dispara, automaticamente, a instalação do projeto e os testes.
- **CD** (entrega/implantação contínua) leva o código aprovado até a publicação de forma previsível,
  sem passos manuais.
- A pipeline vira um **guardião permanente**: ninguém precisa lembrar de testar.

### Anatomia de um workflow (GitHub Actions)

| Parte | O que é | No exemplo |
|---|---|---|
| **Workflow** | Arquivo YAML em `.github/workflows/` | `testes.yml` |
| **Eventos (on)** | O que dispara a execução | `push` e `pull_request` na `main` |
| **Jobs** | Conjuntos de passos, cada um numa máquina virtual | `unitarios` e `e2e` |
| **Steps** | Comandos ou ações prontas | `npm ci`, `npx vitest run --coverage` |

### A pipeline da situação de aprendizagem 2

```yaml
# .github/workflows/testes.yml
name: Testes

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unitarios:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx vitest run --coverage
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: relatorio-cobertura
          path: coverage/

  e2e:
    runs-on: ubuntu-latest
    needs: unitarios
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm run preview
          wait-on: 'http://localhost:4173'
          config: baseUrl=http://localhost:4173
```

- `npm ci` faz a instalação **limpa e reprodutível**, exatamente como está no `package-lock.json`.
- A meta de **70%** fica nos `thresholds` do `vitest.config.js` (capítulo 7): abaixo dela,
  `vitest run --coverage` termina com erro e o job fica **vermelho**.
- `upload-artifact` guarda o relatório HTML de cobertura para a equipe baixar, mesmo quando o job
  falha (`if: always()`).
- `needs: unitarios` só roda o E2E (mais lento) se os testes rápidos passarem.
- A YAML exige **indentação exata** (dois espaços por nível): um espaço a mais quebra o arquivo.

### Bloqueando a junção (proteção da branch)

A pipeline mostra o resultado; quem **impede** a junção é a regra de proteção da branch, configurada
nas definições do repositório: exigir que os checks `unitarios` e `e2e` passem (e que a branch esteja
atualizada com a `main`) antes de permitir o merge. Sem essa regra, o vermelho vira só um aviso.

### Badges e TESTING.md

```markdown
<!-- README.md -->
![Testes](https://github.com/<usuario>/<repositorio>/actions/workflows/testes.yml/badge.svg)
```

O **badge** mostra a saúde do projeto a quem abre o repositório. O **`TESTING.md`** documenta como
rodar os testes (`npm test`, `npm run test:run`, `npx vitest run --coverage`, `npx cypress run`),
onde ficam os arquivos, as convenções de nome, a meta de cobertura e como contribuir com novos testes.

### Usabilidade: testes de acessibilidade

Acessibilidade é requisito (e direito do usuário). As diretrizes **WCAG** organizam a web acessível
em quatro princípios: **perceptível** (texto alternativo, contraste), **operável** (teclado, foco
visível), **compreensível** (linguagem clara) e **robusto** (funciona com tecnologias assistivas).

```jsx
// vitest.setup.js (acrescente; instale antes com npm install -D vitest-axe)
import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
expect.extend(matchers);

// BotaoRemover.test.jsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { it, expect } from 'vitest';

it('o botão de remover item não tem violações de acessibilidade', async () => {
  const { container } = render(
    <button aria-label="Remover item">
      <img src="/lixeira.svg" alt="" />
    </button>,
  );
  expect(await axe(container)).toHaveNoViolations();
});
```

Sem o `aria-label`, o teste falha com a regra **button-name** (botão sem nome acessível); uma imagem
informativa sem `alt` falha na regra **image-alt**. Atenção: no jsdom a regra de **contraste** não é
verificada (não há tela desenhada) — o contraste se audita no navegador, com o Lighthouse ou com o
axe dentro do teste E2E (`@axe-core/playwright`). E as ferramentas automáticas encontram só uma
parte dos problemas: testes manuais com **teclado e leitor de tela** continuam indispensáveis.

### Desempenho: Core Web Vitals e Lighthouse

| Métrica | O que mede | Bom |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Tempo até o maior elemento visível aparecer | ≤ 2,5 s |
| **INP** (Interaction to Next Paint) | Tempo de resposta da tela a uma interação (substituiu o FID em 2024) | ≤ 200 ms |
| **CLS** (Cumulative Layout Shift) | Quanto o layout "pula" durante o carregamento | < 0,1 |

O **Lighthouse** (no DevTools do navegador) dá notas de 0 a 100 para desempenho, acessibilidade,
boas práticas e SEO e aponta o que otimizar. Na pipeline, o **Lighthouse CI** evita regressões:

```json
{
  "ci": {
    "collect": { "staticDistDir": "./dist" },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

Esse é o `lighthouserc.json`; depois do `npm run build`, o passo `npx @lhci/cli autorun` audita a
pasta `dist` e reprova a pipeline se as notas ficarem abaixo de 90.

**Pipeline rápida também é desempenho:** cache das dependências (`cache: npm`), jobs em paralelo e
divisão dos testes E2E entre máquinas mantêm o retorno em poucos minutos.

### Interação com a equipe de testes

- O resultado da pipeline é **visível para todos** no pull request: desenvolvedores, QA e revisores
  falam a partir dos mesmos fatos.
- **Pipeline da `main` vermelha é prioridade da equipe**: quem quebrou avisa e corrige (ou reverte)
  logo; ninguém junta código "por cima" do vermelho.
- Ao relatar um defeito, envie **evidências**: log do job, captura de tela, vídeo ou relatório
  baixado como artefato.
- Teste intermitente é **comunicado e tratado**, nunca simplesmente desativado.
- O `TESTING.md` e o code review (capítulo 8) alinham o jeito de testar de toda a equipe.

## Vídeos

- [O que é CI ou integração contínua?](https://www.youtube.com/watch?v=hv-M8jLY_tI) — 05:23 — Full Cycle
- [CI/CD com GitHub Actions: automação de build e testes (exemplo em Java)](https://www.youtube.com/watch?v=wA1RbmK-QRA) — 12:11 — Manoel Campos Dev
- [Accessibility testing with axe-core (em inglês)](https://www.youtube.com/watch?v=PGaF8lE3qm8) — 09:37 — Test Automation 101
- [Core Web Vitals explained: INP, LCP, CLS (em inglês)](https://www.youtube.com/watch?v=m_yWVuf8ZkE) — 05:31 — FullStackDev

## Resumo

- **CI** é a integração contínua que roda a suíte a cada alteração; **CD** leva o código aprovado à publicação sem passos manuais.
- O workflow (YAML em `.github/workflows/`) tem eventos, jobs e steps: checkout, Node, `npm ci`, Vitest com cobertura e Cypress.
- A meta de cobertura fica nos `thresholds`; a **proteção da branch** exige os checks verdes para permitir o merge.
- **Usabilidade:** WCAG e testes com axe (`toHaveNoViolations`), complementados por teclado e leitor de tela.
- **Desempenho:** Core Web Vitals (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS < 0,1), Lighthouse e Lighthouse CI na pipeline.
- **Interação com a equipe:** resultados visíveis, evidências nos defeitos, `main` vermelha como prioridade, badges e `TESTING.md`.

## Exercícios

### ITEM 1
- **Capacidade:** C5
- **Contexto:** Na Loja Nuvem Azul, os testes são rodados à mão antes de publicar. A ordem dos passos que a nova pipeline deve seguir foi embaralhada: (a) gerar o relatório de cobertura e atualizar o status da branch; (b) baixar o código e configurar o Node.js; (c) executar os testes unitários, de integração e de acessibilidade; (d) instalar as dependências com `npm ci`.
- **Comando:** Explique o que é CI e por que rodar a suíte a cada `push` e `pull request`, coloque os passos na ordem correta e justifique o uso de `npm ci` em vez de `npm install`.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C5
- **Contexto:** A situação de aprendizagem 2 pede um workflow que rode o Vitest com cobertura e o Cypress em cada `push` e `pull request` para a `main` e que impeça a junção abaixo de 70% de cobertura.
- **Comando:** Escreva o arquivo `.github/workflows/testes.yml` com os dois jobs e explique onde fica a meta de 70% e o que mais precisa ser configurado no repositório para o merge ser realmente bloqueado.
- **Linhas:** 14

### ITEM 3
- **Capacidade:** C5
- **Contexto:** Um pull request ficou vermelho. O log do job `unitarios` termina com: `ERROR: Coverage for branches (64.2%) does not meet global threshold (70%)`. Todos os testes passaram.
- **Comando:** Interprete o log, explique por que a pipeline falhou mesmo sem teste vermelho e descreva como encontrar e resolver o problema usando o relatório guardado como artefato.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C5
- **Contexto:** O carrinho tem um botão só com o ícone de lixeira (sem texto), uma imagem de produto sem `alt` e um campo de cupom sem rótulo. O teste com `axe` falhou.
- **Comando:** Indique as violações que o teste deve apontar, corrija o código de cada elemento e explique por que um resultado sem violações no axe não garante que a página seja acessível.
- **Linhas:** 7

### ITEM 5
- **Capacidade:** C5
- **Contexto:** O Lighthouse da página do produto, no celular, mostrou: LCP de 4,1 s, INP de 350 ms e CLS de 0,27 (a imagem principal carrega sem tamanho definido e empurra o botão Comprar).
- **Comando:** Compare cada métrica com o valor considerado bom, explique o impacto de cada uma para o cliente e diga como impedir, na pipeline, que uma nova versão piore o desempenho.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C5
- **Contexto:** Depois do merge de um colega, a pipeline da `main` ficou vermelha no E2E do checkout. Outro colega sugere desativar o teste "porque às vezes falha" e o QA pede evidências do problema.
- **Comando:** Descreva a conduta da equipe: quem age primeiro, que evidências enviar ao QA, como decidir se é defeito ou teste intermitente e por que não juntar código novo enquanto a `main` estiver vermelha.
- **Linhas:** 6

### ITEM 7
- **Capacidade:** C5
- **Contexto:** Novos estagiários vão entrar na equipe e precisam saber rodar e escrever testes no projeto sem depender de alguém.
- **Comando:** Escreva o roteiro do `TESTING.md` (comandos, organização dos arquivos, convenções, meta de cobertura, como contribuir) e a linha do badge da pipeline para o `README.md`.
- **Linhas:** 8

---

# Capítulo 10 — Projeto Integrador: Suíte de Testes + avaliação

- **Aula:** 10
- **Carga horária:** 4 horas (1 aula)
- **Capacidade:** C1, C2, C3, C4, C5, S1, S2
- **Fonte:** `APOSTILA/CONTEUDO/CAPITULO-10.md`

## Teoria

### A loja aguenta a Black Friday?

Faltam três semanas para a Black Friday e a diretoria da **Loja Nuvem Azul** fez uma única
pergunta: "podemos confiar no site?". Para responder com fatos, a equipe precisa juntar tudo o que
foi estudado em um só repositório: **plano**, **casos de teste**, **suíte automatizada** (unitários,
integração e E2E), **cobertura**, **pipeline** e **relatório final**. Este capítulo é o roteiro do
projeto integrador — e da avaliação final da unidade.

> 🎯 **Objetivos do capítulo:** aplicar o **processo fundamental de teste completo** (planejamento,
> desenho, execução, monitoração e controle, avaliação dos resultados), organizar a **suíte de
> testes**, trabalhar em equipe com **code review respeitoso** e **justificar as decisões** com base
> em requisitos e riscos.

### O processo fundamental de teste no projeto

| Etapa | O que entregar no projeto | Capítulos de apoio |
|---|---|---|
| **7.1 Planejamento** | Plano formal: escopo, estratégia, riscos, estimativa de esforço, critérios de saída | 2 |
| **7.2 Desenho dos testes** | No mínimo 5 casos por feature (caminho feliz e bordas, tipo U/I/E2E) e matriz de rastreabilidade | 2 |
| **7.3 Execução dos testes** | Suíte automatizada: unitários, integração (com MSW) e E2E | 3 a 6 e 8 |
| **7.4 Monitoração e controle** | Pipeline de CI, cobertura ≥ 70%, testes intermitentes tratados | 7 e 9 |
| **7.5 Avaliação dos resultados** | Relatório final com recomendação de publicar ou não | 7 |

### Planejamento e desenho (retomando a situação de aprendizagem 1)

Para **autenticação**, **carrinho** e **checkout**, o plano formal traz o escopo, a análise de riscos
e a **estimativa de esforço**:

| Feature | Casos (U/I/E2E) | Risco (impacto × probabilidade) | Esforço estimado |
|---|---|---|---|
| Autenticação | 3 U · 2 I · 1 E2E | Alto × médio | 4 h |
| Carrinho e cupom | 4 U · 2 I · 1 E2E | Alto × alto | 5 h |
| Checkout | 2 U · 2 I · 1 E2E | Altíssimo × alto | 6 h |

**Exemplo — casos da feature "cupom":**

| ID | Caso | Tipo | Requisito |
|---|---|---|---|
| CT-CUP-01 | Cupom válido de 10% reduz o subtotal (caminho feliz) | U | RF-11 |
| CT-CUP-02 | Cupom expirado não dá desconto | U | RF-12 |
| CT-CUP-03 | Carrinho vazio com cupom não quebra e não fica negativo | U | RF-11 |
| CT-CUP-04 | Ao aplicar o cupom na tela, o total é recalculado e exibido | I | RF-11 |
| CT-CUP-05 | Compra completa com cupom até a confirmação do pedido | E2E | RF-11, RF-13 |

### A suíte de testes (6.3): organização

```text
loja-nuvem-azul/
├─ .github/workflows/testes.yml   pipeline de CI
├─ src/                           componentes, regras de negócio, mocks/handlers.js
├─ tests/                         unitários e integração (Vitest, Testing Library, MSW)
├─ e2e/                           fluxos E2E e Page Objects
├─ TESTING.md                     como rodar e contribuir
└─ README.md                      badges da pipeline e da cobertura
```

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "e2e": "cypress run"
  }
}
```

Se a equipe preferir os testes **ao lado do código** (`precos.test.js` junto de `precos.js`), tudo
bem — o importante é que a regra esteja escrita no `TESTING.md` e seja seguida por todos.

### Execução: a base unitária com casos de borda

```js
// src/precos.js
export function calcularTotal({ itens, cupom, frete }) {
  const subtotal = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  const desconto = cupom?.ativo ? subtotal * cupom.percentual : 0;
  return Math.round((subtotal - desconto + frete) * 100) / 100;
}

// tests/precos.test.js
import { describe, it, expect } from 'vitest';
import { calcularTotal } from '../src/precos';

const cupom10 = { ativo: true, percentual: 0.1 };

describe('calcularTotal', () => {
  it('soma itens e frete sem cupom', () => {
    expect(calcularTotal({ itens: [{ preco: 59.9, quantidade: 2 }], cupom: null, frete: 15 })).toBe(134.8);
  });

  it('não aplica o desconto sobre o frete', () => {
    expect(calcularTotal({ itens: [{ preco: 100, quantidade: 1 }], cupom: cupom10, frete: 15 })).toBe(105);
  });

  it('carrinho vazio com cupom cobra só o frete', () => {
    expect(calcularTotal({ itens: [], cupom: cupom10, frete: 15 })).toBe(15);
  });

  it('cupom expirado não dá desconto', () => {
    const expirado = { ativo: false, percentual: 0.1 };
    expect(calcularTotal({ itens: [{ preco: 100, quantidade: 1 }], cupom: expirado, frete: 0 })).toBe(100);
  });

  it('arredonda para duas casas decimais', () => {
    expect(calcularTotal({ itens: [{ preco: 33.33, quantidade: 3 }], cupom: cupom10, frete: 0 })).toBe(89.99);
  });
});
```

Acima da base: **integração** do carrinho com a API simulada (capítulos 4 e 5) e **no mínimo três
fluxos E2E** — por exemplo, login, compra com cupom e checkout com erro de pagamento (capítulo 6).

### Monitoração, controle e avaliação dos resultados

- A pipeline (capítulo 9) roda tudo a cada `push` e `pull request` e bloqueia o merge com teste
  vermelho ou cobertura abaixo de **70%**.
- O painel acompanha cobertura, testes intermitentes e tempo da suíte (capítulo 7).
- O **relatório final** resume resultados, cobertura, defeitos abertos e riscos e termina com a
  recomendação: a versão atende aos critérios de saída do plano? Pode ir para a Black Friday?

### Equipe: code review respeitoso (S1)

**Roteiro de code review de testes — seis perguntas que o colega responde com respeito:**

1. O nome de cada teste descreve claramente o comportamento verificado?
2. Os casos de borda do requisito (vazio, limite, inválido) estão cobertos?
3. Cada teste confere algo importante com asserções, e não só "executa sem erro"?
4. Os testes são independentes e usam dados isolados (sem depender da ordem)?
5. Os seletores seguem o que o usuário vê (`getByRole`, rótulo, texto) e não classes de estilo?
6. Sobrou algo que não deve ir para o repositório (`only`, `skip`, `console.log`, teste desativado)?

Comentários começam pelo que está bom, apontam o problema (não a pessoa) e sugerem um caminho:
"Ótima cobertura do cupom! Que tal incluir o caso de cupom expirado?". Quem recebe agradece,
considera a ideia diferente e responde com fatos.

### Justificar as decisões (S2)

O tempo nunca dá para testar tudo. Cada escolha do projeto deve ser **justificada por requisitos e
riscos**: "Automatizamos primeiro o checkout com cupom porque é o requisito de maior impacto
financeiro (RF-13) e o módulo mais alterado nesta versão; deixamos o rodapé para o teste manual
porque o impacto de uma falha ali é baixo."

### Como você será avaliado

| Instrumento | Momento | Peso | Critérios |
|---|---|---|---|
| Avaliação contínua: entregas das aulas 1–9 e SAs 1 e 2 | Aulas 1–9 | 60% | Correção, completude, organização do repositório, prazo |
| Avaliação prática: suíte de testes para aplicação fornecida | Aula 10 | 25% | Unitários (≥ 5 casos) · integração · E2E (≥ 3 fluxos) · cobertura ≥ 70% · execução no CI |
| Avaliação objetiva: conceitos, técnicas, tipos e processo de teste | Aula 10 | 15% | Acertos; questões no formato capacidade → contexto → comando |

- **Nota final** = 60% contínua + 25% prática + 15% objetiva. Aprovação: nota final ≥ 7,0 e presença
  mínima de 75%. Cada capacidade também recebe o parecer **Desenvolvida / Em desenvolvimento / Não
  desenvolvida**.
- **Rubrica:** Excelente (9–10) — plano rastreável, testes legíveis pelo comportamento, suíte estável
  no CI, decisões justificadas; Bom (7–8) — testes corretos e passando, com pequenas falhas de
  nomenclatura, cobertura ou documentação; Aceitável (5–6) — cumpre o essencial com orientação,
  lacunas de casos de borda ou testes frágeis; Insuficiente (0–4) — testes que não rodam, não
  validam requisito ou plano ausente.
- **Recuperação:** refazer a avaliação não atingida (prática com outra aplicação, objetiva com novo
  banco de questões), retomando só as capacidades pendentes.

### Checklist final da entrega

- [ ] Plano formal com escopo, riscos, esforço e critérios de saída
- [ ] No mínimo 5 casos por feature e matriz de rastreabilidade sem lacunas
- [ ] Unitários (≥ 5 casos), integração e E2E (≥ 3 fluxos) passando
- [ ] Cobertura ≥ 70% e pipeline verde com proteção da branch
- [ ] `TESTING.md`, badges e relatório final com recomendação
- [ ] Code review feito e sugestões respondidas

## Vídeos

- [A pirâmide de testes](https://www.youtube.com/watch?v=RX1bvaNOc-M) — 10:37 — Otavio Lemos
- [Como fazer um bom code review](https://www.youtube.com/watch?v=jq4AxdaCID0) — 10:45 — Eder TV
- [5 dicas de como receber feedback](https://www.youtube.com/watch?v=mwrfJW5mvUA) — 05:29 — Caput Consultoria

## Resumo

- O projeto integrador aplica o **processo fundamental de teste** completo: planejamento, desenho, execução, monitoração e controle e avaliação dos resultados.
- **Planejamento e desenho:** plano formal com riscos e esforço, no mínimo 5 casos por feature (U/I/E2E) e matriz de rastreabilidade.
- **Suíte organizada:** pastas, scripts e `TESTING.md`; base unitária com casos de borda, integração com MSW e no mínimo três fluxos E2E.
- **Controle e avaliação:** pipeline com cobertura ≥ 70%, painel de métricas e relatório final com recomendação.
- **Equipe:** code review respeitoso (S1) e decisões justificadas por requisitos e riscos (S2).
- **Avaliação:** 60% contínua + 25% prática + 15% objetiva; nota ≥ 7,0, presença ≥ 75% e parecer por capacidade.

## Exercícios

### ITEM 1
- **Capacidade:** C1, C2
- **Contexto:** Especificação da tela de checkout da Loja Nuvem Azul: campo CEP com 8 dígitos e preenchimento automático do endereço; botão **Pagar** desabilitado até o cliente aceitar os termos; mensagem "Pagamento recusado, tente outro cartão" quando o cartão é negado; resumo do pedido sempre visível.
- **Comando:** Identifique as especificações técnicas da interface (elementos, estados e mensagens) e transforme-as em pelo menos quatro requisitos testáveis, com critério objetivo de aceitação.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C2, C3
- **Contexto:** A feature de autenticação (login, cadastro e recuperação de senha) precisa entrar no plano formal do projeto integrador.
- **Comando:** Monte o trecho do plano da autenticação com escopo (dentro e fora), três riscos com impacto e probabilidade, estimativa de esforço e critérios de saída.
- **Linhas:** 8

### ITEM 3
- **Capacidade:** C2, C4
- **Contexto:** Requisitos do carrinho: RF-20 adicionar item; RF-21 alterar quantidade (mínimo 1, máximo 10); RF-22 remover item; RF-23 mostrar o subtotal atualizado.
- **Comando:** Escreva cinco casos de teste do carrinho (caminho feliz e bordas), indicando o tipo de cada um (U, I ou E2E), e monte a matriz de rastreabilidade requisito × caso.
- **Linhas:** 8

### ITEM 4
- **Capacidade:** C5
- **Contexto:** A avaliação prática exige pelo menos cinco casos unitários para a regra `calcularParcelas(total)`: até R$ 100 em 1 vez; de R$ 100,01 a R$ 500 em até 3 vezes; acima de R$ 500 em até 6 vezes; total negativo lança erro.
- **Comando:** Escreva a suíte Vitest com no mínimo cinco testes no padrão AAA, incluindo os valores de borda e o caso de erro, com nomes descritivos.
- **Linhas:** 12

### ITEM 5
- **Capacidade:** C3, C5
- **Contexto:** Faltam dois dias para a entrega e a suíte tem: 18 unitários, nenhum teste de integração, 1 fluxo E2E, cobertura de 63% e nenhuma pipeline.
- **Comando:** Compare a situação com os critérios da avaliação prática, liste o que falta em ordem de prioridade e descreva como organizar a suíte (pastas, scripts e pipeline) para atender a todos os critérios.
- **Linhas:** 7

### ITEM 6
- **Capacidade:** S1
- **Contexto:** Você vai revisar os testes do checkout de um colega e também receberá a revisão dele sobre os seus testes do carrinho.
- **Comando:** Crie um roteiro de code review de testes com seis perguntas que o colega deve responder de forma respeitosa e escreva um exemplo de comentário construtivo e um exemplo de resposta que acolhe a sugestão.
- **Linhas:** 8

### ITEM 7
- **Capacidade:** S2, C3
- **Contexto:** Só há tempo para automatizar dois destes quatro fluxos E2E: (a) login; (b) compra com cupom até a confirmação; (c) troca de idioma do site; (d) checkout com pagamento recusado. O checkout foi todo alterado nesta versão.
- **Comando:** Escolha os dois fluxos e justifique a decisão com base em requisitos e riscos (impacto × probabilidade), dizendo também como os outros dois serão cobertos ou acompanhados.
- **Linhas:** 6
