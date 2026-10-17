# Aula 07 — Métricas e Cobertura de Testes

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 05/11
- **Conhecimentos (ementa do curso):** 7.4 Monitoração e Controle · 7.5 Avaliação dos Resultados ·
  4.5 Manutenibilidade
- **Capacidades:** C3 — Reconhecer as etapas de planejamento de testes · C4 — Aplicar testes
  definidos no Plano de Testes.
- **Estratégias:** exposição dialogada com código ao vivo, análise de relatório, prática guiada,
  dinâmica em grupos
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md)

## Indicadores

- (10) Lê relatório de cobertura e aponta trechos sem teste (C3/C4).

## Objetivos

- Explicar o que é monitorar e controlar os testes (7.4) e avaliar os resultados (7.5).
- Ligar a cobertura de código com o Vitest e ler as 4 métricas do relatório.
- Encontrar no relatório os trechos e as condições sem teste (pontos cegos).
- Escrever os testes que faltam, priorizando pelo risco, até a meta do plano.
- Reconhecer por que cobertura alta não garante qualidade e como testes legíveis ajudam a
  manutenibilidade (4.5).
- Definir metas mínimas de cobertura que o pipeline vai cobrar (início da SA 2).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: integração × E2E e testes instáveis (aula 6) |
| Exposição com código ao vivo | 40 min | Monitoração e controle; métricas de teste; cobertura com v8; leitura do relatório |
| Prática guiada | 25 min | Passo 0: ligar a cobertura e gerar o primeiro relatório |
| Intervalo | 15 min | — |
| Prática autônoma | 85 min | Mapear os pontos cegos do carrinho e elevar o módulo de ~60% para ≥ 85% |
| Dinâmica | 25 min | "100% e ainda com defeito" (abaixo) |
| Metas e entrega | 35 min | Limites mínimos na configuração; relatório comentado; abertura da SA 2 |

## Conteúdo

### 1. Monitoração e controle (7.4)
Monitorar é **acompanhar** o andamento dos testes comparando com o plano; controlar é **agir**
quando o andamento foge do previsto (replanejar, priorizar, corrigir). As decisões se apoiam em
métricas, não em impressão.

| Métrica | O que mostra | Exemplo de ação de controle |
|---|---|---|
| Casos executados × planejados | Andamento da execução | Faltam 12 casos de checkout → priorizar antes do deploy |
| Taxa de aprovação | Quantos testes passam | Caiu de 98% para 80% → bloquear a entrega e investigar |
| Defeitos abertos por gravidade | Risco ainda presente | 2 defeitos críticos no pagamento → não publicar |
| Cobertura de código | Quanto do código a suíte executa | Módulo de cupons com 40% → escrever testes |
| Testes instáveis (flaky) | Confiança na suíte | 3 testes flaky → corrigir antes de criar novos |
| Tempo de execução | Custo de rodar a suíte | Passou de 2 para 9 min → separar E2E por etapa |

### 2. Cobertura de código com o Vitest

```bash
npm install -D @vitest/coverage-v8
npm pkg set scripts.test:coverage="vitest run --coverage"
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.js'],
    },
  },
});
```

`npm run test:coverage` mostra a tabela no terminal e gera `coverage/index.html`.

| Métrica | Pergunta que responde |
|---|---|
| **Statements** (instruções) | Quantas instruções rodaram? |
| **Branches** (desvios) | Cada `if` foi testado no lado verdadeiro **e** no falso? |
| **Functions** (funções) | Todas as funções foram chamadas? |
| **Lines** (linhas) | Quantas linhas rodaram? |

No relatório HTML, linhas em **vermelho** não rodaram; o marcador **I** indica que o caminho do
`if` não foi testado e **E**, o do `else`. **Branches** é a métrica mais exigente: mostra condições
que a suíte nunca testou.

### 3. Lendo o relatório: os pontos cegos

```js
// src/servicos/carrinho.js
export function aplicarCupom(total, cupom, hoje = new Date()) {
  if (!cupom) return total;
  if (new Date(cupom.validade) < hoje) throw new Error('Cupom expirado');
  if (total < cupom.valorMinimo) throw new Error('Valor mínimo não atingido');
  if (cupom.tipo === 'percentual') return total - (total * cupom.valor) / 100;
  return Math.max(total - cupom.valor, 0);
}
```

Com só 2 testes (sem cupom e cupom percentual válido), o relatório aponta como não testados: o
cupom expirado, o valor mínimo não atingido e o cupom de valor fixo. Pelo **risco**, o primeiro a
testar é o cupom de valor fixo maior que o total: sem o `Math.max`, a loja daria pedido com valor
negativo.

```js
// tests/carrinho.test.js (trechos que faltavam)
import { describe, it, expect } from 'vitest';
import { aplicarCupom } from '../src/servicos/carrinho.js';

const HOJE = new Date('2026-11-05');
const CUPOM_FIXO = { tipo: 'fixo', valor: 50, valorMinimo: 0, validade: '2026-12-31' };

describe('aplicarCupom', () => {
  it('nunca deixa o total negativo com cupom de valor fixo', () => {
    expect(aplicarCupom(30, CUPOM_FIXO, HOJE)).toBe(0);
  });

  it('recusa cupom vencido', () => {
    const cupomVencido = { ...CUPOM_FIXO, validade: '2026-10-01' };
    expect(() => aplicarCupom(100, cupomVencido, HOJE)).toThrow('Cupom expirado');
  });
});
```

A data `HOJE` é **fixa**: se o teste usasse a data real, passaria hoje e falharia no ano que vem.

### 4. Avaliação dos resultados (7.5)
Avaliar é responder, com os dados: **os critérios de saída do plano foram atingidos?**
- Todos os casos de alto risco foram executados e passaram?
- A cobertura atingiu a meta do plano (ex.: ≥ 70% na UC; meta da turma 80%)?
- Há defeito crítico aberto?
- A suíte está estável (nenhum flaky)?

O resultado vira um **relatório**: o que foi testado, o que ficou fora e por quê, defeitos
encontrados, métricas e a recomendação (publicar ou não).

### 5. A falsa sensação dos 100%
Cobertura mede o que **rodou**, não o que foi **conferido**. Um teste sem `expect` cobre linhas e
não verifica nada. E 100% de linhas não garante que o requisito foi atendido: um requisito
esquecido não tem código, então não aparece no relatório. Por isso a cobertura é cruzada com a
**matriz de rastreabilidade** (aula 2).

### 6. Manutenibilidade da suíte (4.5)
Uma suíte fácil de manter é aquela que a equipe entende e altera sem medo:
- nomes de teste que descrevem o comportamento (`'recusa cupom vencido'`);
- dados de teste em constantes com nome (`CUPOM_FIXO`, `HOJE`);
- testes independentes e curtos, um comportamento por teste;
- testes pelo comportamento: trocar o CSS ou reorganizar o código interno não quebra a suíte.

### 7. Metas no pipeline

```js
coverage: {
  provider: 'v8',
  thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
},
```

Com os limites, `npm run test:coverage` **termina com erro** se a cobertura ficar abaixo da meta.
Na aula 9 esse comando roda no GitHub Actions e bloqueia o merge.

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, recebeu o relatório de uma loja virtual que diz: "92% de cobertura,
pode publicar". Ao abrir o relatório HTML, você vê que o módulo de pagamento tem 31% de branches:
o alto valor geral vem de dezenas de testes de componentes visuais simples. Você recomenda **não
publicar** até cobrir os desvios de recusa do cartão e de pagamento duplicado, e propõe metas por
módulo (pagamento ≥ 90%), justificadas pelo risco. É a avaliação dos resultados (7.5) com base nos
dados, não no número geral.

## Dinâmica — 100% e ainda com defeito (25 min, grupos de 4)
- **Objetivo:** perceber que cobertura alta não basta e que asserções e casos de borda é que
  encontram defeitos (C3, C4, 7.5).
- **Materiais:** a função `aplicarCupom` com um defeito colocado pelo professor (`<=` no lugar de
  `<` no valor mínimo: o total exatamente igual ao mínimo é recusado) e uma suíte com 100% de
  cobertura que não testa esse valor-limite.
- **Passo a passo:** (1) cada grupo roda a cobertura e confirma os 100%; (2) recebe a missão:
  "encontre o defeito"; (3) escreve casos de borda (total igual ao mínimo, 0%, 100%, centavos) até um falhar;
  (4) registra qual caso achou o defeito e por que a cobertura não o mostrava.
- **Fechamento:** o professor compara as estratégias dos grupos e conclui: cobertura diz onde
  **não** há teste; não diz se o teste é bom.

## Situação-problema e entrega da aula
- **SA 2 — Pipeline CI/CD e dashboard de cobertura (início):** a equipe roda os testes à mão antes
  do deploy e não sabe quanto do código está coberto. Nesta aula: relatório de cobertura e metas
  mínimas. Nas aulas 8 e 9: TDD, pipeline que bloqueia o merge abaixo de 70% e documentação.
- **Entrega desta aula:** prints do relatório antes e depois (de ~60% para ≥ 85% no módulo),
  tabela com os 4 percentuais, lista comentada dos pontos cegos encontrados e a configuração com as
  metas mínimas.

## Verificação da aprendizagem
- Qual a diferença entre cobertura de linhas e de branches? Dar um exemplo com `if`.
- O módulo tem 100% de linhas e 50% de branches. O que isso indica?
- Citar 3 métricas que ajudam a monitorar e controlar os testes (7.4).
- Por que a data "hoje" deve ser fixa no teste de validade do cupom?

## Recursos
Laboratório de informática, computador com acesso à internet, IDE para desenvolvimento de testes
(VS Code), Node.js e npm, kit multimídia, material da dinâmica, slides [📕 Slides da aula 07 (PDF)](../AULAS/AULA-07-SLIDES.pdf)
(apresentação) e apostila da UC (capítulo 7).
