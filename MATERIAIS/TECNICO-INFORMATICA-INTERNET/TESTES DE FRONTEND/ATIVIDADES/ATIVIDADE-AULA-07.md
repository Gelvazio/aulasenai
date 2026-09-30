# ATIVIDADE AULA 07 — Métricas e Cobertura de Testes

**Slides:** `AULAS-CHALKIE-AI/7-Métricas-e-Cobertura-de-Testes.pdf`  
**Duração:** 4 horas | **Modalidade:** Laboratório, individual  
**Capacidades:** C3, C4 · S2 | **Conhecimentos:** 4.5 · 7.4 · 7.5  
**Entrega da aula:** relatório de cobertura comentado (60% → 85%) — **início da SA 2**

---

## ⏱️ Tempo da atividade

| Etapa | Tempo |
|---|---|
| Quiz de revisão (integração × E2E) | 15 min |
| Passo 0 — Ligar a cobertura | 25 min |
| Prática 1 — Mapear os pontos cegos | 60 min |
| Prática 2 — Elevar o módulo para 85% | 80 min |
| Prática 3 — Metas no pipeline e entrega | 60 min |

---

## Passo 0 — Cobertura com v8

`vitest.config.js`:

```javascript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.js'],
    },
  },
});
```

Rode `npm run test:coverage` e abra `coverage/index.html` no navegador.

| Métrica | Pergunta |
|---|---|
| Statements | Quantas instruções rodaram? |
| Branches | Cada `if` foi testado no lado verdadeiro **e** no falso? |
| Functions | Todas as funções foram chamadas? |
| Lines | Quantas linhas rodaram? |

---

## 1. Prática 1 — Mapear os pontos cegos

Crie `src/servicos/carrinho.js`:

```javascript
export function aplicarCupom(total, cupom, hoje = new Date()) {
  if (!cupom) return total;
  if (new Date(cupom.validade) < hoje) throw new Error('Cupom expirado');
  if (total < cupom.valorMinimo) throw new Error('Valor mínimo não atingido');
  if (cupom.tipo === 'percentual') return total - (total * cupom.valor) / 100;
  return Math.max(total - cupom.valor, 0);
}
```

E `tests/carrinho.test.js` com apenas dois testes: **sem cupom** e **cupom percentual válido**.

1. Rode a cobertura e registre os 4 percentuais do arquivo.
2. No relatório HTML, anote as linhas em **vermelho** e os branches marcados com **E** / **I**.
3. Responda: quais condições lógicas a suíte ignorou? Qual delas é mais arriscada para a loja? (S2)

> ✅ **Verifique:** o arquivo começa entre **60% e 70%**. Se estiver muito diferente, confira o `include`.

---

## 2. Prática 2 — Elevar para 85%

Sem repetir testes do que já está verde, adicione:
1. Cupom **expirado** → `toThrow('Cupom expirado')` (use `hoje` fixo para o teste não mudar com a data).
2. Total **abaixo do mínimo** → `toThrow('Valor mínimo não atingido')`.
3. Cupom de **valor fixo** maior que o total → resultado **0** (nunca negativo).

Rode de novo e confirme **Statements e Branches ≥ 85%** no módulo.

> ⚠️ **A falsa sensação dos 100%:** um teste sem `expect` também "cobre" linhas. Todo teste precisa de asserção.

---

## 3. Prática 3 — Meta no pipeline

Acrescente os limites à configuração:

```javascript
coverage: { thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 } }
```

1. Remova temporariamente um teste e veja o comando **falhar** por limite não atingido.
2. Restaure o teste.
3. Escreva 5 linhas: por que regras de pagamento e login pedem cobertura de branches quase total, e por que 100% não garante qualidade (manutenibilidade, 4.5).

---

## 4. Entrega e avaliação

**Entregar:** prints do relatório antes/depois, tabela de percentuais e o texto da Prática 3.

| Critério | Excelente | Bom | Aceitável | Insuficiente |
|---|---|---|---|---|
| Diagnóstico (C3) | Todas as condições ignoradas identificadas | Falta 1 | Faltam 2 | Não identifica |
| Suíte (C4) | ≥ 85% statements e branches | 80–84% | 70–79% | < 70% |
| Thresholds | Configurados e demonstrados | Configurados | Parcial | Ausente |
| Análise (S2) | Argumento com base em risco e dados | Parcial | Genérico | Ausente |

**Próxima aula:** escrever o teste **antes** do código (TDD).
