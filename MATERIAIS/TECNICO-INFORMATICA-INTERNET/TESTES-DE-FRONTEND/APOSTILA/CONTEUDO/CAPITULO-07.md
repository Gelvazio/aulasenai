# Capítulo 07 — Métricas e Cobertura de Testes

- **Aula:** 07
- **Capacidade:** C3, C4

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

## Resumo

- **Monitoração e controle:** acompanhar métricas (aprovados, reprovados, intermitentes, tempo, defeitos, cobertura) e agir quando saem do plano.
- **Avaliação dos resultados:** comparar com os critérios de saída e decidir se a versão pode ser publicada, por meio do relatório comentado.
- **Cobertura** = percentual de código executado pelos testes, nas métricas statements, branches, functions e lines; **branches** revela caminhos esquecidos.
- No Vitest: `@vitest/coverage-v8`, `vitest run --coverage`, `reporter`, `exclude` e **thresholds** que travam a suíte abaixo da meta.
- Cobertura alta não garante qualidade: sem **asserções**, o teste só executa; 70% a 85% costuma ser o melhor equilíbrio.
- O relatório revela **código morto** e uma boa suíte torna a refatoração segura — **manutenibilidade**.

## Glossário

- **Cobertura:** percentual de código executado pelos testes.
- **Métrica:** medida numérica usada para acompanhar a suíte e a qualidade (ex.: taxa de aprovação, cobertura).
- **Instrumentação:** inserção de contadores no código para registrar o que os testes executam.
- **Branch (ramo):** cada caminho possível de uma decisão no código (`if`, `else`, ternário, `switch`).
- **Threshold:** meta mínima de cobertura; abaixo dela, a execução dos testes falha.
- **Relatório de cobertura:** documento (no terminal ou em HTML) com os percentuais e as linhas sem teste.
- **Critério de saída:** condição definida no plano para considerar os testes concluídos e liberar a versão.
- **Código morto:** trecho que nunca é executado nem usado pelo sistema.
- **Monitoração e controle:** etapa que acompanha as métricas durante os testes e corrige o rumo quando necessário.
- **Avaliação dos resultados:** etapa que compara os resultados com os critérios de saída e recomenda publicar ou não.
