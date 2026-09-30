# ATIVIDADE AULA 10 — Projeto Prático Integrador: Suíte de Testes

**Slides:** `AULAS-CHALKIE-AI/10-Projeto-Prático-Integrador-Suíte-de-Testes.pdf`  
**Duração:** 4 horas | **Modalidade:** Em dupla (projeto) e individual (prova objetiva)  
**Capacidades:** C1 a C5 · S1, S2 | **Conhecimentos:** 1 a 7 (processo completo)  
**Entrega da aula:** suíte completa no CI + avaliações finais (ementa: prática 25% · objetiva 15%)

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Apresentação do projeto e plano de testes | 20 min |
| Parte 1 — Suíte integrada (avaliação prática) | 150 min |
| Parte 2 — Code review cruzado | 20 min |
| Parte 3 — Avaliação objetiva | 50 min |

---

## Contexto — Black Friday da Loja Vale Digital

A loja fictícia da SA 1 vai enfrentar a Black Friday. O professor entrega o **repositório-base do
e-commerce** (vitrine, carrinho, cupom, checkout). A dupla usa o plano e os casos da **aula 2** e
monta a suíte de três camadas, rodando no pipeline da **aula 9**.

---

## 1. Parte 1 — Suíte integrada (avaliação prática, 25%)

**Passo 1 — Plano (15 min):** atualize a matriz de rastreabilidade da aula 2: cada requisito do
e-commerce ligado a casos unitários, de integração ou E2E, e a jornada crítica (vitrine → carrinho →
checkout → confirmação) marcada.

**Passo 2 — Unitários (Vitest):** `calcularDescontos(total, percentual)` com os casos **0%**, **10%**,
**50%** e percentual inválido; regras de frete e cupom. Mínimo **5 casos** com bordas.

**Passo 3 — Integração (Testing Library + MSW):** carrinho adicionando e removendo itens com API
simulada; estado de carregamento e erro 500.

**Passo 4 — E2E (Cypress ou Playwright):** no mínimo **3 fluxos** — login, compra completa e cupom
inválido no checkout.

**Passo 5 — Cobertura e CI:** `npm run test:coverage` e Pull Request com o workflow **verde**.

**Metas de qualidade:**

| Requisito | Mínimo para aprovação | Meta (Excelente) |
|---|---|---|
| Cobertura (linhas, branches, funções) | ≥ 70% | ≥ 80% |
| Testes unitários | 5 casos | 10+ com bordas |
| Fluxos E2E | 3 | 3 estáveis em 3 execuções |
| Pipeline | Executa a suíte | Bloqueia merge e tem badge |

**Entregar:** link do PR com o workflow verde + `TESTING.md` de 1 página (como rodar, estratégia, o que ficou fora do escopo e por quê).

---

## 2. Parte 2 — Code review cruzado (S1)

Cada dupla revisa o PR de outra e comenta no GitHub: **2 pontos fortes**, **1 risco** (teste instável,
caso não coberto) e **1 sugestão**. A dupla revisada responde a cada comentário.

---

## 3. Parte 3 — Avaliação objetiva (15%, individual)

Prova com questões no formato **capacidade → contexto → comando**, cobrindo:

| Tema | Conhecimentos |
|---|---|
| Verificação × validação, tipos de teste | 4, 5 |
| Plano, suíte e casos de teste | 6 |
| Caixa preta × caixa branca | 3 |
| Automação: Vitest, Testing Library, MSW, E2E | 2 |
| Processo de teste, cobertura e CI | 7 |

Sem consulta; tempo de 50 min.

---

## 4. Avaliação

| Critério da Parte 1 | Excelente (9–10) | Bom (7–8) | Aceitável (5–6) | Insuficiente (0–4) |
|---|---|---|---|---|
| Plano e rastreabilidade (C2, C3) | Todos os requisitos rastreados | 1–2 sem caso | Parcial | Ausente |
| Unitários (C5) | 10+ com bordas | 5–9 | < 5 | Falhando |
| Integração (C4, C5) | Carrinho, loading e erro | Sem erro | Só caminho feliz | Ausente |
| E2E (C4) | 3 fluxos estáveis | 3 com instabilidade | 1–2 | Nenhum |
| Cobertura e CI (C5) | ≥ 80%, merge bloqueado, badge | ≥ 70% e verde | < 70% | Pipeline não roda |
| Documentação e decisões (S2) | `TESTING.md` claro e justificado | Completo | Incompleto | Ausente |

**Nota final da UC** = 60% avaliação contínua (aulas 1–9 e SAs) + 25% Parte 1 + 15% Parte 3.
**Aprovação:** nota final **≥ 7,0** e presença mínima de 75%. Cada capacidade recebe o parecer
Desenvolvida / Em desenvolvimento / Não desenvolvida.

**Recuperação:** refazer a avaliação não atingida (outra aplicação-base ou novo banco de questões), retomando só as capacidades pendentes.
