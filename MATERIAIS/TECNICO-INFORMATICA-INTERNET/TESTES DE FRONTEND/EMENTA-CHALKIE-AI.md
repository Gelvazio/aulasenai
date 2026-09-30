# 🤖 EMENTA-CHALKIE-AI — Testes de Front-End

**Unidade curricular:** Testes de Front-End  
**Módulo:** Específico I | **Curso:** Técnico em Informática para Internet  
**Carga horária:** 40h (10 aulas × 4h) | **Modalidade:** Presencial  
**Plataforma:** Chalkie AI | **Versão:** 2.0 — reescrita a partir da ementa oficial (2026-09-27)

> Segue a ementa do curso (`../EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`, fonte da verdade), o `planoEnsino.pdf` (2 SAs), os slides de `AULAS-CHALKIE-AI/` e o `HORARIO.txt`. **[oficial]** = literal da ementa do curso; o resto é didático.

---

## 📚 I. CONTEXTO E ALINHAMENTO

### Justificativa
Toda interface web chega ao usuário depois de alguém confirmar que ela faz o que foi pedido. A UC ensina a planejar, escrever, automatizar e acompanhar testes do lado do cliente: do caso de teste escrito à suíte automatizada com Vitest, Testing Library e Cypress/Playwright, rodando sozinha num pipeline de integração contínua. Prepara para a UC Projeto de Front-End, que cobra planos de teste completos.

### Função [oficial]
● 1 - Produzir Interfaces para internet, de acordo com metodologia e padrões de qualidade, usabilidade, interatividade, robustez, acessibilidade e segurança da informação.

### Objetivo geral [oficial]
Propiciar desenvolvimento de capacidades básicas e socioemocionais para codificação de interfaces baseadas em UX e UI em aplicações web, considerando as necessidades do usuário.

---

## 🎯 II. CAPACIDADES

### Capacidades básicas [oficial]

| Cód. | Capacidade |
|---|---|
| **C1** | Reconhecer as especificações técnicas da interface |
| **C2** | Reconhecer os requisitos da documentação de testes |
| **C3** | Reconhecer as etapas de planejamento de testes |
| **C4** | Aplicar testes definidos no Plano de Testes. |
| **C5** | Desenvolver conjunto de testes automatizados |

### Capacidades socioemocionais [oficial]
- **S1** — Valorizar novos fatos, ideias e opiniões diferentes para resolução de problemas pertinentes as atividades sob a sua responsabilidade
- **S2** — Fundamentar escolhas e decisões no exame de fatos, contextos, possibilidades, desafios e problemáticas de diferentes naturezas à luz de referenciais técnicos, legais, normativos e institucionais

### Indicadores de desempenho

| # | Indicador | Cap. | Aula |
|---|---|---|---|
| 1 | Diferencia verificação de validação com exemplo de uma tela real | C1/C3 | 1 |
| 2 | Classifica testes por tipo (funcionalidade, usabilidade, confiabilidade, desempenho, manutenibilidade) | C2 | 1 |
| 3 | Extrai requisitos testáveis de uma especificação de interface | C1 | 2 |
| 4 | Escreve casos de teste com ID, pré-condição, passos e resultado esperado | C2/C3 | 2 |
| 5 | Monta plano de testes com escopo, estratégia, cronograma e riscos | C3 | 2 |
| 6 | Escreve testes unitários com padrão AAA e matchers adequados | C5 | 3 |
| 7 | Testa componente pelo comportamento visível (queries por papel e texto) | C4/C5 | 4 |
| 8 | Isola dependências com mocks de API e spies | C5 | 5 |
| 9 | Automatiza fluxo completo de usuário em teste E2E | C4/C5 | 6 |
| 10 | Lê relatório de cobertura e aponta trechos sem teste | C3/C4 | 7 |
| 11 | Aplica ciclo TDD (vermelho → verde → refatorar) e depura teste que falha | C5 | 8 |
| 12 | Configura pipeline que executa a suíte a cada push | C5 | 9 |
| 13 | Justifica decisões de teste com base em requisitos e riscos | S2 | 2, 10 |
| 14 | Acolhe sugestões no code review de testes do colega | S1 | 8, 10 |

---

## 📖 III. CONHECIMENTOS [oficial]

1. **Autogestão** — 1.1 Responsabilidade
2. **Automação de Testes** — 2.1 Definição · 2.2 Frameworks · 2.3 Aplicação · 2.4 Interação com equipe de testes
3. **Técnicas de testes** — 3.1 Teste funcional (caixa preta) · 3.2 Teste estrutural (caixa branca)
4. **Tipos de testes** — 4.1 Funcionalidade · 4.2 Usabilidade · 4.3 Confiabilidade · 4.4 Desempenho · 4.5 Manutenibilidade
5. **Conceitos fundamentais** — 5.1 Verificação · 5.2 Validação
6. **Planejamento de testes client-side** — 6.1 Análise do documento de requisitos · 6.2 Plano de testes · 6.3 Suíte de testes · 6.4 Casos de testes
7. **Processo fundamental de teste** — 7.1 Planejamento · 7.2 Desenho dos Testes · 7.3 Execução dos Testes · 7.4 Monitoração e Controle · 7.5 Avaliação dos Resultados

---

## 🗓️ IV. SEQUÊNCIA DE AULAS (40h)

| Aula | Tema (slides) | Conhecimentos | Entrega |
|---|---|---|---|
| 01 | Fundamentos de Testes de Software | 5 · 4 · 1.1 | Mapa: erro, defeito, falha e tipos de teste |
| 02 | Planejamento, Verificação, Validação e Casos de Teste | 6 · 7.1–7.2 · 3 | Plano de testes + 10 casos (SA 1) |
| 03 | Testes Unitários no Front-End com Vitest | 2.1–2.3 · 3.2 | Suíte unitária de funções utilitárias |
| 04 | Testes de Integração com DOM (Testing Library) | 2.3 · 3.1 · 4.1 | Testes de botão e formulário |
| 05 | Integração Avançada e Mock de APIs | 2.3 · 4.3 · 7.3 | Testes com API simulada e erros de rede |
| 06 | Testes End-to-End com Cypress e Playwright | 2.2–2.3 · 3.1 · 4.2 | Fluxos de login e checkout |
| 07 | Métricas e Cobertura de Testes | 7.4–7.5 · 4.5 | Relatório de cobertura comentado |
| 08 | TDD e Debugging Moderno no Front-End | 2.3 · 3.2 · 1.1 | Funcionalidade feita com TDD |
| 09 | Qualidade, Performance, Acessibilidade e CI/CD | 4.2 · 4.4 · 2.4 | Pipeline GitHub Actions (SA 2) |
| 10 | Projeto Integrador: Suíte de Testes + avaliação | 7 · 6.3 · 2.4 | Suíte completa + avaliações finais |

**Datas previstas (`HORARIO.txt`):** 08/10, 14/10, 15/10, 22/10, 29/10, 30/10, 05/11, 06/11, 12/11 e 13/11.

### Situações de aprendizagem (`planoEnsino.pdf`)
- **SA 1 — Estruturação e documentação de testes (aulas 1–2, retomada na 10).** Startup de e-commerce em React sem estratégia de testes. Para autenticação, carrinho e checkout, o estudante entrega plano formal, no mínimo 5 casos de teste por feature (caminho feliz e casos de borda, tipo U/I/E2E), matriz de rastreabilidade requisito × caso, estimativa de esforço e análise de riscos.
- **SA 2 — Pipeline CI/CD e dashboard de cobertura (aulas 7–9).** A equipe roda testes à mão antes do deploy e não sabe quanto do código está coberto. O estudante cria workflow que executa Vitest e Cypress em cada push e PR, bloqueia merge com teste falhando ou cobertura abaixo de 70%, publica relatório e badges no README e documenta como rodar e contribuir (`TESTING.md`).

### Dificuldades comuns (e como tratar)
- **Testar implementação em vez de comportamento** → consultar pelo que o usuário vê (papel, rótulo, texto).
- **Teste intermitente (flaky)** → esperas assíncronas corretas, nunca tempo fixo; dados isolados por teste.
- **Cobertura como meta única** → 100% de linhas não garante requisito atendido; cruzar com a matriz de rastreabilidade.
- **Ambiente Node/npm quebrado** → projeto-base pronto e roteiro de instalação da aula 3.
- **Caso de teste vago ("testar o login")** → exigir dado de entrada e resultado esperado verificável.
- **Mock que esconde defeito real** → manter ao menos um fluxo E2E contra a API de teste.

### Estratégia de testes da UC (pirâmide)
A suíte cresce da base para o topo, e cada camada responde a uma pergunta diferente:
- **Base — unitários (aulas 3 e 8):** muitos testes rápidos de funções e regras isoladas; revelam defeitos de lógica (caixa branca, 3.2).
- **Meio — integração (aulas 4 e 5):** componentes com DOM, eventos e API simulada; revelam falhas de comunicação entre partes (3.1, 4.1, 4.3).
- **Topo — E2E (aula 6):** poucos fluxos críticos no navegador real; confirmam que o usuário completa a tarefa (validação, 5.2, e usabilidade, 4.2).
- **Transversal — métricas e CI (aulas 7 e 9):** cobertura, taxa de testes intermitentes e tempo de execução alimentam a monitoração e o controle (7.4) e a avaliação dos resultados (7.5).

Regra de bolso para o estudante: se o teste quebra quando só o nome de uma classe CSS muda, ele testa a implementação e deve ser reescrito.

---

## 💯 V. AVALIAÇÃO

| Instrumento | Momento | Peso | Critérios |
|---|---|---|---|
| Avaliação contínua: entregas das aulas 1–9 e SAs 1 e 2 | Aulas 1–9 | 60% | Correção, completude, organização do repositório, prazo |
| Avaliação prática: suíte de testes para aplicação fornecida | Aula 10 | 25% | Unitários (≥ 5 casos) · integração · E2E (≥ 3 fluxos) · cobertura ≥ 70% · execução no CI |
| Avaliação objetiva: conceitos, técnicas, tipos e processo de teste | Aula 10 | 15% | Acertos; questões no formato capacidade → contexto → comando |

**Nota final** = 60% contínua + 25% prática + 15% objetiva. **Aprovação:** nota final **≥ 7,0** e presença mínima de 75%. Além da nota, cada capacidade recebe o parecer Desenvolvida / Em desenvolvimento / Não desenvolvida.

**Recuperação (didático):** refazer a avaliação não atingida (prática com outra aplicação, objetiva com novo banco de questões), retomando só as capacidades pendentes, conforme o regimento da unidade SENAI.

### Rubrica de desempenho (4 níveis)

| Nível | Nota | Descrição |
|---|---|---|
| **Excelente** | 9–10 | Plano rastreável, testes legíveis pelo comportamento, suíte estável no CI, decisões justificadas |
| **Bom** | 7–8 | Testes corretos e passando, com pequenas falhas de nomenclatura, cobertura ou documentação |
| **Aceitável** | 5–6 | Cumpre o essencial com orientação; lacunas de casos de borda ou testes frágeis |
| **Insuficiente** | 0–4 | Testes que não rodam, não validam requisito ou plano ausente |

---

## 🔗 VI. MAPEAMENTO BNCC (didático)

- **CG2 Pensamento científico e crítico** — aulas 1, 2 e 7: hipótese de falha, evidência e análise de resultado
- **CG5 Cultura digital** — aulas 3 a 9: frameworks de teste, Git e integração contínua
- **CG4 Comunicação** — aulas 2 e 10: plano de testes, relatório e apresentação da suíte
- **CG9 Empatia e cooperação** — aulas 8 a 10: code review e interação com a equipe de testes (2.4)
- **CG10 Responsabilidade** — todas: não entregar código sem teste; relatar defeitos com honestidade (1.1)

---

## 📦 VII. RECURSOS E AMBIENTES

**Ambientes pedagógicos [oficial]:** laboratório de informática, biblioteca, sala de aula, AVA com recursos de interatividade.  
**Máquinas, equipamentos, instrumentos e ferramentas [oficial]:** kit multimídia; computador com a configuração adequada para a execução das atividades e acesso à internet; sistemas operacionais; pacote de aplicativos de escritório; IDE para desenvolvimento de testes.  
**Recursos didáticos [oficial]:** livros, apostilas e revistas especializadas; manuais, normas e catálogos técnicos.

**Ferramentas (didático):** Node.js e npm, VS Code, Vitest, Testing Library, Cypress e Playwright, Lighthouse e axe-core, Git/GitHub e GitHub Actions.

**Materiais da pasta:** `AULAS-CHALKIE-AI/` (slides das 10 aulas) · `ATIVIDADES/` (atividades por aula) · `ESTRUTURACAO-PLANO-ENSINO/` (blocos e SAs) · `EXERCICIOS/` e `GUIAS-LABORATORIO/` · `planoEnsino.pdf` · `REFERENCIA-TESTES-DE-SISTEMAS/` (plano, avaliações e atividades da UC Testes de Sistemas, só como apoio).

**Acessibilidade [oficial, resumo]:** asseguradas as condições de acessibilidade ao aluno com impedimentos de longo prazo (Lei nº 13.146/2015, LDB nº 9394/96). **Didático:** zoom e alto contraste na IDE, leitor de tela, projeto-base pronto, tempo estendido e duplas.

---

## 🧠 VIII. PROMPTS PARA CHALKIE AI

1. *"Dada a especificação de um formulário de login, liste os requisitos testáveis e escreva 8 casos de teste (ID, pré-condição, passos, resultado esperado), marcando caixa preta ou branca."*
2. *"Crie um plano de testes de 1 página para o carrinho de um e-commerce React: escopo, fora do escopo, estratégia U/I/E2E, cronograma e 3 riscos."*
3. *"Escreva 6 testes Vitest com padrão AAA para uma função que calcula frete, cobrindo casos de borda."*
4. *"Mostre um teste com Testing Library para uma lista filtrável, buscando elementos por papel e texto, e explique por que não usar classes CSS."*
5. *"Monte um exercício de mock de API com erro 500 e rede lenta, pedindo ao aluno que teste a mensagem exibida."*
6. *"Crie um teste E2E em Playwright para o fluxo login → adicionar ao carrinho → finalizar, com dados isolados."*
7. *"Gere 10 questões de múltipla escolha (A–D) sobre verificação × validação e tipos de teste, com gabarito comentado."*
8. *"Escreva um workflow GitHub Actions que rode Vitest com cobertura e Cypress, bloqueando o merge abaixo de 70%."*
9. *"Mostre o ciclo TDD em 3 passos (vermelho, verde, refatorar) para um validador de CPF no front-end."*
10. *"Crie um roteiro de code review de testes com 6 perguntas que o colega deve responder de forma respeitosa."*

---

## ⚙️ IX. REGRAS PARA IA

1. Capacidades e conhecimentos **[oficial]** não podem ser alterados, ampliados nem reduzidos.
2. Carga horária é 40h em 10 aulas de 4h; não criar aulas nem pesos além das Seções IV e V.
3. Capacidades técnicas de plano de testes de interface são da UC Projeto de Front-End; aqui só aparecem como ligação.
4. Contextualizar em aplicações web reais (e-commerce, cadastro, painel); empresas sempre fictícias.
5. Código de exemplo deve rodar: versões atuais, sintaxe válida, resultado esperado informado.
6. Integrar S1 e S2 em code review, trabalho em equipe e justificativa de decisões.

---

## 🔗 X. CAPACIDADES × CONHECIMENTOS

C1 Especificações da interface → 5, 6.1 · C2 Requisitos da documentação → 4, 6.2–6.4 · C3 Etapas de planejamento → 6, 7 · C4 Aplicar testes do plano → 3, 7.3–7.5 · C5 Testes automatizados → 2, 3.2 · S1/S2 → 1.1, 2.4.

---

## 📘 XI. GLOSSÁRIO

**Verificação** — construímos o produto certo conforme a especificação? · **Validação** — é o produto que o usuário precisa? · **Caixa preta** — testa entradas e saídas sem ver o código · **Caixa branca** — testa caminhos internos do código · **Caso de teste** — condição, passos e resultado esperado · **Suíte** — conjunto organizado de testes · **Mock** — substituto controlado de uma dependência · **Cobertura** — percentual de código executado pelos testes · **E2E** — teste do fluxo completo, como o usuário · **TDD** — escrever o teste antes do código · **CI** — integração contínua que roda a suíte a cada alteração · **Teste intermitente (flaky)** — passa ou falha sem mudança no código · **Matriz de rastreabilidade** — liga cada requisito aos casos de teste que o verificam.

---

## ✅ XII. CHECKLIST E MÉTRICAS

- [x] Ementa oficial conciliada; 10 aulas × 4h alinhadas aos slides e ao horário
- [x] Situações de aprendizagem 1 e 2 do plano de ensino
- [x] `ATIVIDADES/ATIVIDADE-AULA-01..10.md` alinhadas aos slides das 10 aulas, com rubricas (2026-09-27)
- [ ] Atividades de 50 questões por aula (padrão `assets/gerador-atividades/`)

**Métricas:** 80%+ dos estudantes com nota ≥ 7,0 · 100% entregam a suíte do projeto integrador rodando no CI.

---

**Status:** ✅ Específica, conciliada com a ementa oficial do curso  
**Última atualização:** 2026-09-27
