# ATIVIDADE AULA 02 — Planejamento, Verificação, Validação e Casos de Teste

**Slides:** `AULAS-CHALKIE-AI/2-Planejamento,-Verificação,-Validação-e-Casos-de-Teste.pdf`  
**Duração:** 4 horas | **Modalidade:** Oficina em trios  
**Capacidades:** C1, C2, C3 · S2 | **Conhecimentos:** 3 · 5 · 6 · 7.1 · 7.2  
**Entrega da aula:** plano de testes + 10 casos de teste — **início da SA 1**

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão e verificação × validação | 30 min |
| Prática 1 — Plano de testes da Loja Vale Digital | 60 min |
| Prática 2 — 10 casos de teste | 70 min |
| Prática 3 — Refinamento BDD | 40 min |
| Debate sobre clareza e entrega | 40 min |

---

## Contexto — SA 1

A **Loja Vale Digital** (empresa fictícia) vai lançar um e-commerce em React. Ninguém definiu o que
testar, quanto testar nem como. Seu trio é a equipe de qualidade. Três funcionalidades são críticas:
**autenticação**, **carrinho** e **checkout**.

---

## 1. Verificação × validação

Classifique cada item como **Verificação** (segue a especificação?) ou **Validação** (atende o usuário?):

1. O campo CEP aceita só 8 dígitos, como diz o requisito.
2. Clientes idosos conseguem finalizar a compra sem ajuda.
3. O botão "Comprar" usa a cor definida no guia visual.
4. O frete calculado corresponde à tabela da transportadora.
5. O usuário entende a mensagem de cartão recusado.

---

## 2. Prática 1 — Plano de testes (1 página)

Preencha o modelo:

| Seção | O que escrever |
|---|---|
| Informações gerais | Projeto, versão, trio, datas |
| Escopo (in) | Funcionalidades testadas |
| Fora do escopo (out) | O que não será testado agora e por quê |
| Estratégia | Proporção U/I/E2E, ferramentas (Vitest, Testing Library, Cypress/Playwright) |
| Ambientes e massa de testes | Navegadores, usuários de teste, produtos cadastrados |
| Riscos | Mínimo 3, com probabilidade (B/M/A), impacto (B/M/A) e mitigação |
| Métricas | Cobertura esperada, defeitos encontrados, taxa de testes instáveis |
| Cronograma | Relacionar com as aulas 3 a 10 |

> 💡 **Dica:** risco alto no pagamento pede mais casos e mais cobertura de branches ali.

---

## 3. Prática 2 — Casos de teste

Use o formato: **ID · Título · Pré-condição · Passos numerados · Dados · Resultado esperado · Tipo (U/I/E2E) · Técnica (caixa preta/branca)**.

**Obrigatórios (login):**
- **CT-001** Login com credenciais válidas (caminho feliz)
- **CT-002** Login com senha incorreta (mensagem "Credenciais inválidas")
- **CT-003** Envio com e-mail em branco (validação no front-end)

**Mais 7 casos:** pelo menos 3 de **carrinho** (adicionar, alterar quantidade, produto sem estoque) e 4 de **checkout** (frete, cupom, cartão recusado, confirmação do pedido).

> ⚠️ **Evite passos vagos:** "tente logar com senha errada e veja se dá erro".
> ✅ **Prefira:** "1. Informar `cliente@vale.com` · 2. Informar senha `123` · 3. Clicar em **Entrar** · 4. Validar a mensagem **Credenciais inválidas** abaixo do formulário".

Depois, monte a **matriz de rastreabilidade**:

| Requisito | Casos de teste | Tipo | Situação |
|---|---|---|---|
| RF01 Autenticar cliente | CT-001, CT-002, CT-003 | U/I/E2E | Planejado |

---

## 4. Prática 3 — Refinamento BDD

O cliente escreveu: *"O carrinho deve funcionar direito e calcular o frete certinho."*
Transforme em **3 cenários Gherkin** (Dado / Quando / Então), por exemplo:

```gherkin
Cenário: Frete grátis acima de R$ 200
  Dado que o carrinho soma R$ 200,01
  Quando finalizo a compra
  Então o frete é gratuito
```

Crie os outros dois: **produto esgotado** e **frete pago abaixo de R$ 200**.

---

## 5. Debate (S2)

"Documentar casos de teste atrasa o projeto?" Cada trio justifica sua posição com um fato do plano que escreveu.

---

## 6. Entrega e avaliação

**Entregar:** plano de testes, 10 casos, matriz de rastreabilidade e 3 cenários BDD. Guardar: o material será retomado na aula 10.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Plano (C3) | Todas as seções, riscos com mitigação | Falta 1 seção | Faltam 2–3 | Ausente |
| Casos (C2) | 10 casos verificáveis e rastreados | 8–9 | 6–7 | ≤ 5 ou vagos |
| Especificação (C1) | Requisitos testáveis bem extraídos | Pequenas lacunas | Genéricos | Ausente |
| Justificativas (S2) | Decisões apoiadas em riscos e requisitos | Parcial | Frágil | Ausente |

**Próxima aula:** transformar casos de teste em testes unitários com Vitest.
