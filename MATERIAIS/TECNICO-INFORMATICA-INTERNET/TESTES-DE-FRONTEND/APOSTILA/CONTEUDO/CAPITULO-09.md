# Capítulo 09 — Qualidade, Performance, Acessibilidade e CI/CD

- **Aula:** 09
- **Capacidade:** C5

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

## Resumo

- **CI** é a integração contínua que roda a suíte a cada alteração; **CD** leva o código aprovado à publicação sem passos manuais.
- O workflow (YAML em `.github/workflows/`) tem eventos, jobs e steps: checkout, Node, `npm ci`, Vitest com cobertura e Cypress.
- A meta de cobertura fica nos `thresholds`; a **proteção da branch** exige os checks verdes para permitir o merge.
- **Usabilidade:** WCAG e testes com axe (`toHaveNoViolations`), complementados por teclado e leitor de tela.
- **Desempenho:** Core Web Vitals (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS < 0,1), Lighthouse e Lighthouse CI na pipeline.
- **Interação com a equipe:** resultados visíveis, evidências nos defeitos, `main` vermelha como prioridade, badges e `TESTING.md`.

## Glossário

- **CI:** integração contínua que roda a suíte a cada alteração.
- **CD:** entrega ou implantação contínua do código aprovado, sem passos manuais.
- **Pipeline:** sequência automatizada de etapas que instala, testa e entrega o software.
- **Workflow:** arquivo de configuração que define eventos, jobs e passos da automação.
- **Proteção da branch:** regra que só permite juntar código quando os checks obrigatórios passam.
- **Badge:** selo no README que mostra a situação da pipeline ou da cobertura.
- **WCAG:** diretrizes internacionais de acessibilidade para conteúdo web.
- **Core Web Vitals:** métricas de experiência do usuário: LCP, INP e CLS.
- **Lighthouse:** ferramenta que audita desempenho, acessibilidade, boas práticas e SEO de uma página.
- **Artefato:** arquivo gerado pela pipeline e guardado para download (ex.: relatório de cobertura).
