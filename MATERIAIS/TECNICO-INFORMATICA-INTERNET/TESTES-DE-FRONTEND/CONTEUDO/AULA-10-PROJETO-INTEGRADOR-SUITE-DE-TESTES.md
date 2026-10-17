# Aula 10 — Projeto Integrador: Suíte de Testes + Avaliação

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 13/11
- **Conhecimentos (ementa do curso):** 7 Processo fundamental de teste (7.1 Planejamento · 7.2
  Desenho dos Testes · 7.3 Execução dos Testes · 7.4 Monitoração e Controle · 7.5 Avaliação dos
  Resultados) · 6.3 Suíte de testes · 2.4 Interação com equipe de testes
- **Capacidades:** C1 — Reconhecer as especificações técnicas da interface · C2 — Reconhecer os
  requisitos da documentação de testes · C3 — Reconhecer as etapas de planejamento de testes ·
  C4 — Aplicar testes definidos no Plano de Testes. · C5 — Desenvolver conjunto de testes
  automatizados · S1 — Valorizar novos fatos, ideias e opiniões diferentes para resolução de
  problemas pertinentes as atividades sob a sua responsabilidade · S2 — Fundamentar escolhas e
  decisões no exame de fatos, contextos, possibilidades, desafios e problemáticas de diferentes
  naturezas à luz de referenciais técnicos, legais, normativos e institucionais
- **Estratégias:** projeto integrador em duplas, code review cruzado, avaliação prática e
  avaliação objetiva individual
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-10.md)

## Indicadores

- (13) Justifica decisões de teste com base em requisitos e riscos (S2).
- (14) Acolhe sugestões no code review de testes do colega (S1).
- Retomada de todos os indicadores da UC (1 a 12) na suíte completa e na avaliação objetiva.

## Objetivos

- Percorrer o processo fundamental de teste completo (7.1 a 7.5) num projeto só.
- Montar uma suíte de testes organizada (6.3) com as três camadas da pirâmide: unitário,
  integração e E2E.
- Executar a suíte no pipeline com cobertura mínima de 70% e o merge protegido.
- Justificar o que ficou fora do escopo com base em requisitos e riscos (S2).
- Fazer e responder code review cruzado com respeito (S1, 2.4).
- Demonstrar, na avaliação objetiva, os conceitos, técnicas, tipos e processo de teste.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Abertura | 15 min | Apresentação do repositório-base e dos critérios; retomada do plano da SA 1 |
| Projeto integrador — parte 1 | 120 min | Matriz atualizada; unitários; integração com MSW; E2E; cobertura e CI |
| Intervalo | 15 min | — |
| Dinâmica | 25 min | "Feira das suítes" — code review cruzado (abaixo) |
| Avaliação objetiva | 50 min | Prova individual, sem consulta (15% da nota) |
| Encerramento | 15 min | Autoavaliação das capacidades e fechamento da UC |

## Conteúdo

### 1. O processo de teste completo (7)
O projeto integrador junta tudo o que a UC construiu, na ordem do processo:

| Etapa | No projeto | Aula de origem |
|---|---|---|
| **7.1 Planejamento** | Atualizar o plano e a matriz de rastreabilidade da SA 1 | 2 |
| **7.2 Desenho dos testes** | Escolher os casos por risco: caminho feliz e bordas | 2 |
| **7.3 Execução** | Unitários (Vitest), integração (Testing Library + MSW) e E2E | 3 a 6 |
| **7.4 Monitoração e controle** | Cobertura, testes instáveis, checks do pipeline | 7 e 9 |
| **7.5 Avaliação dos resultados** | `TESTING.md` com resultado, fora do escopo e recomendação | 7 e 10 |

### 2. Organizando a suíte de testes (6.3)
Uma suíte organizada mostra a estratégia só pela estrutura das pastas:

```text
loja-virtual/
├─ src/
├─ tests/
│  ├─ unitarios/       # regras: descontos, frete, cupom
│  └─ integracao/      # componentes: carrinho, checkout (com MSW)
├─ e2e/                # fluxos: login, compra completa, cupom inválido
├─ .github/workflows/ci.yml
├─ vitest.config.js    # cobertura e limites (70% mínimo)
└─ TESTING.md
```

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
  }
}
```

### 3. Metas de qualidade da avaliação prática

| Requisito | Mínimo para aprovação | Meta (Excelente) |
|---|---|---|
| Cobertura (linhas, branches, funções) | ≥ 70% | ≥ 80% |
| Testes unitários | 5 casos | 10 ou mais, com bordas |
| Integração | Carrinho com API simulada | Carrinho, carregamento e erro 500 |
| Fluxos E2E | 3 (login, compra completa, cupom inválido) | 3 estáveis em 3 execuções |
| Pipeline | Executa a suíte | Bloqueia o merge e tem badge |

### 4. `TESTING.md` (1 página)
- **Como rodar:** `npm ci`, `npm run test:coverage`, `npm run test:e2e`.
- **Estratégia:** o que cada camada testa e por quê (pirâmide).
- **Fora do escopo:** o que não foi testado e a justificativa pelo risco (S2). Exemplo: "a
  integração real com a operadora de cartão não foi testada porque depende de serviço externo; o
  risco é tratado com o mock da resposta de recusa e de aprovação".
- **Resultado:** cobertura final, quantidade de testes por camada e testes instáveis encontrados.
- **Como contribuir:** todo pull request precisa de teste novo para o comportamento novo.

### 5. Interação com a equipe de testes (2.4)
No code review cruzado, cada dupla comenta o pull request de outra no GitHub: **2 pontos fortes**,
**1 risco** (teste instável, caso não coberto) e **1 sugestão**. A dupla revisada responde a cada
comentário, aceitando ou justificando (S1).

### 6. Avaliação da UC

| Instrumento | Momento | Peso |
|---|---|---|
| Avaliação contínua: entregas das aulas 1–9 e SAs 1 e 2 | Aulas 1–9 | 60% |
| Avaliação prática: suíte de testes para aplicação fornecida | Aula 10 | 25% |
| Avaliação objetiva: conceitos, técnicas, tipos e processo de teste | Aula 10 | 15% |

**Nota final** = 60% contínua + 25% prática + 15% objetiva. **Aprovação:** nota final ≥ 7,0 e
presença mínima de 75%. Cada capacidade recebe também o parecer Desenvolvida, Em desenvolvimento ou
Não desenvolvida.

**Avaliação objetiva:** questões no formato capacidade → contexto → comando, sobre verificação e
validação e tipos de teste (4, 5), plano, suíte e casos (6), caixa preta e caixa branca (3),
automação com Vitest, Testing Library, MSW e E2E (2) e processo de teste, cobertura e CI (7).

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, recebeu o repositório-base de uma loja virtual que vai enfrentar a Black
Friday, com vitrine, carrinho, cupom e checkout e **nenhum teste**. Com o prazo de uma tarde, você
não consegue testar tudo; então decide pelo **risco**: primeiro a jornada vitrine → carrinho →
checkout → confirmação (onde está o dinheiro), depois o cupom (onde estão os defeitos mais comuns),
e deixa fora do escopo a página "Sobre nós", justificando no `TESTING.md`. O pipeline verde, com
72% de cobertura e 3 fluxos E2E estáveis, é a evidência de que a loja pode ir para a Black Friday.

## Dinâmica — Feira das suítes (25 min, duplas)
- **Objetivo:** fazer e receber code review de testes com respeito e fundamentar decisões (S1, S2,
  2.4).
- **Materiais:** o pull request de cada dupla aberto no GitHub e o cartão de revisão (2 pontos
  fortes, 1 risco, 1 sugestão).
- **Passo a passo:** (1) as duplas formam pares de revisão (A revisa B, B revisa C…); (2) em 10 min,
  cada dupla comenta o pull request da outra no GitHub, usando o cartão; (3) em 10 min, a dupla
  revisada responde a cada comentário: "aceito, porque…" ou "mantenho, porque…", com fato técnico;
  (4) em 5 min, cada dupla aplica uma sugestão aceita ou registra no `TESTING.md` por que não aplicou.
- **Fechamento:** o professor destaca 2 ou 3 comentários exemplares da turma (sugestão clara e
  resposta fundamentada).

## Situação-problema e entrega da aula
- **SA 1 — retomada e encerramento:** o plano formal da aula 2 (autenticação, carrinho e
  checkout, no mínimo 5 casos por funcionalidade, matriz de rastreabilidade, estimativa de esforço e
  análise de riscos) é atualizado e passa a ter, para cada caso, o teste automatizado correspondente.
- **Avaliação prática (25%):** suíte para a aplicação fornecida — unitários (≥ 5 casos),
  integração, E2E (≥ 3 fluxos), cobertura ≥ 70% e execução no CI.
- **Entrega:** link do pull request com o workflow verde, `TESTING.md` de 1 página e as respostas
  ao code review.
- **Avaliação objetiva (15%):** prova individual de 50 min.

## Verificação da aprendizagem
- Rubrica da avaliação prática (Excelente 9–10 · Bom 7–8 · Aceitável 5–6 · Insuficiente 0–4), por
  critério: plano e rastreabilidade (C2, C3), unitários (C5), integração (C4, C5), E2E (C4) e
  cobertura e CI (C5).
- Avaliação objetiva com as questões dos 5 temas.
- Autoavaliação: para cada capacidade (C1 a C5, S1 e S2), o estudante marca Desenvolvida, Em
  desenvolvimento ou Não desenvolvida e cita uma evidência do próprio repositório.

## Recursos
Laboratório de informática, computador com acesso à internet, IDE para desenvolvimento de testes
(VS Code), Node.js e npm, Git e conta no GitHub, repositório-base da aplicação, prova objetiva, kit
multimídia, slides [📕 Slides da aula 10 (PDF)](../AULAS/AULA-10-SLIDES.pdf) (apresentação) e apostila da UC (capítulo 10).
