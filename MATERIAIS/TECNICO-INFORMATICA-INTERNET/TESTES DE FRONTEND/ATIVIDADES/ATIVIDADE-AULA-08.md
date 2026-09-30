# ATIVIDADE AULA 08 — TDD e Debugging Moderno no Front-End

**Slides:** `AULAS-CHALKIE-AI/8-TDD-e-Debugging-Moderno-no-Frontend.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, em dupla (piloto e copiloto)  
**Capacidades:** C5 · S1 | **Conhecimentos:** 1.1 · 2.3 · 3.2  
**Entrega da aula:** validador de CPF e filtro de produtos construídos com TDD

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão (cobertura) | 15 min |
| Prática 1 — Validador de CPF em 4 ciclos | 90 min |
| Prática 2 — Filtro de produtos com TDD | 70 min |
| Prática 3 — Depuração | 35 min |
| Code review e entrega | 30 min |

---

## Regra da aula — Red → Green → Refactor

| Fase | O que fazer | Como saber que terminou |
|---|---|---|
| 🔴 Red | Escrever **um** teste que falha | O Vitest mostra falha pelo motivo esperado |
| 🟢 Green | Escrever o **mínimo** de código para passar | Tudo verde |
| 🔵 Refactor | Limpar nomes e duplicações | Continua tudo verde |

Rode em modo watch: `npx vitest --watch`. Piloto e copiloto **trocam a cada ciclo**.

---

## 1. Prática 1 — Validador de CPF

Arquivos: `src/validarCPF.js` e `tests/validarCPF.test.js`. Registre cada ciclo na tabela de entrega.

**Ciclo 1 — Teste vazio (Red):**
```javascript
it('rejeita valor vazio', () => {
  expect(validarCPF('')).toBe(false);
});
```
Falha porque a função nem existe. Crie a função mínima que retorna `false` (Green).

**Ciclo 2 — Formato:** teste que CPF com letras ou tamanho diferente de 11 dígitos (após remover `.` e `-`) é inválido.

**Ciclo 3 — Dígitos repetidos:** `'111.111.111-11'` deve ser `false`.

**Ciclo 4 — Dígitos verificadores:**
```javascript
expect(validarCPF('52998224725')).toBe(true);
expect(validarCPF('52998224726')).toBe(false);
```
Implemente a soma ponderada e o resto da divisão por 11. No **Refactor**, extraia a conta para uma função interna `calcularDigito(base, pesoInicial)`.

> 🧯 Se passou direto para o verde, o teste não estava testando nada novo: reveja o caso.

---

## 2. Prática 2 — Filtro de produtos

Com TDD, construa um campo de busca que filtra uma lista de produtos por **título** e **categoria**.

Ordem sugerida dos testes (um por ciclo):
1. Sem texto digitado → todos os produtos aparecem.
2. Digitar `mouse` → só produtos com "mouse" no título.
3. Busca ignora maiúsculas e acentos (`TECLADO` encontra "Teclado").
4. Categoria **Periféricos** + texto → combina os dois filtros.
5. Nada encontrado → mensagem **Nenhum produto encontrado**.

Teste o que o usuário **vê** (`getAllByRole('listitem')`), não variáveis internas. Não use TDD para cores e espaçamentos.

---

## 3. Prática 3 — Depuração

1. Introduza de propósito um erro no cálculo do segundo dígito do CPF.
2. Coloque um **breakpoint** no VS Code (painel *Run and Debug* → *JavaScript Debug Terminal* → `npx vitest run`).
3. Inspecione as variáveis até achar a linha errada; use `it.only` para isolar o cenário.
4. Corrija e registre: onde estava o defeito e qual teste o revelou.

---

## 4. Code review (S1)

Troque o repositório com outra dupla. Aponte **2 pontos fortes** e **1 sugestão** nos testes dela, com respeito. Responda à sugestão recebida: aceita ou não, e por quê.

---

## 5. Entrega e avaliação

**Entregar:** repositório + tabela `Ciclo | Teste escrito | Falhou por quê | Código mínimo | Refatoração`.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Ciclos TDD (C5) | 4 ciclos do CPF registrados em ordem | 3 | 2 | Código antes do teste |
| Filtro (C5) | 5 testes, comportamento visível | 4 | 3 | ≤ 2 |
| Depuração (1.1) | Defeito localizado e explicado | Localizado | Parcial | Ausente |
| Code review (S1) | Feedback respeitoso e resposta fundamentada | Parcial | Superficial | Ausente |

**Próxima aula:** colocar a suíte para rodar sozinha no GitHub Actions.
