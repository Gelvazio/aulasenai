# Aula 09 — Qualidade, Performance, Acessibilidade e CI/CD

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 12/11
- **Conhecimentos (ementa do curso):** 4.2 Usabilidade · 4.4 Desempenho · 2.4 Interação com equipe
  de testes
- **Capacidades:** C5 — Desenvolver conjunto de testes automatizados
- **Estratégias:** exposição dialogada com código ao vivo, prática no GitHub em duplas, auditoria,
  dinâmica, debate
- **Prática da aula:** [`../ATIVIDADES/ATIVIDADE-PRATICA-AULA-09.md`](../ATIVIDADES/ATIVIDADE-PRATICA-AULA-09.md)

## Indicadores

- (12) Configura pipeline que executa a suíte a cada push (C5).

## Objetivos

- Explicar integração contínua (CI) e por que a suíte deve rodar sozinha a cada alteração.
- Criar um workflow do GitHub Actions que roda os testes e a cobertura a cada push e pull request.
- Bloquear o merge quando um teste falha ou a cobertura fica abaixo da meta.
- Automatizar a verificação de acessibilidade com axe-core, como parte da usabilidade (4.2).
- Medir o desempenho (4.4) da página com o Lighthouse e interpretar LCP, INP e CLS.
- Trabalhar com a equipe pelo pull request: revisão, aprovação e badge de status (2.4).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: TDD e depuração (aula 8) |
| Exposição com código ao vivo | 35 min | CI/CD; anatomia do workflow; proteção da branch; axe-core; Lighthouse |
| Prática guiada | 45 min | Workflow de CI no repositório da dupla, até ficar verde |
| Intervalo | 15 min | — |
| Prática autônoma | 75 min | Bloqueio de merge com PR quebrado e liberado; auditoria com axe-core e Lighthouse |
| Dinâmica | 25 min | "Pull request na roda" (abaixo) |
| Badges, debate e entrega | 30 min | Badge no README, `TESTING.md` inicial e debate "quem pode quebrar a main?" |

## Conteúdo

### 1. Integração e entrega contínuas
**Integração contínua (CI)** é juntar o código de todos várias vezes por dia, com a suíte de testes
rodando **automaticamente** a cada envio. **Entrega contínua (CD)** é publicar, também de forma
automática, o que passou pelo CI. Com CI, ninguém depende de lembrar de rodar os testes à mão: o
servidor roda, sempre do mesmo jeito, e mostra o resultado no pull request.

### 2. Workflow do GitHub Actions

```yaml
# .github/workflows/ci.yml
name: Testes

on:
  push:
    branches: [main]
  pull_request:

jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test:coverage

  e2e:
    runs-on: ubuntu-latest
    needs: testes
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          start: npm run dev
          wait-on: 'http://localhost:5173'
```

| Parte | Função |
|---|---|
| `on` | Quando roda: a cada push na `main` e a cada pull request |
| `jobs` | Grupos de passos; `needs: testes` faz o E2E rodar só se unitários e integração passarem |
| `runs-on` | Máquina virtual usada (Linux) |
| `actions/checkout` | Baixa o código do repositório |
| `setup-node` + `cache: npm` | Instala o Node e reaproveita os pacotes entre execuções |
| `npm ci` | Instala exatamente o que está no `package-lock.json` |
| `npm run test:coverage` | Roda a suíte com cobertura; os limites da aula 7 fazem o job falhar abaixo da meta |

YAML exige indentação exata: **2 espaços** por nível, nunca tab.

### 3. Proteção da branch e bloqueio de merge
Em **Settings → Branches** (regra para `main`), exigir:
- o status **testes** (e **e2e**) aprovado antes do merge;
- pelo menos **1 revisão** aprovada no pull request.

Assim, um pull request com teste quebrado ou cobertura abaixo de 70% fica com o check vermelho e
**não pode ser juntado**. A `main` só recebe código testado.

### 4. Acessibilidade automatizada (4.2)
A usabilidade inclui pessoas que usam leitor de tela, teclado ou alto contraste. O **axe-core**
confere regras de acessibilidade (WCAG) automaticamente:

```bash
npm install -D vitest-axe
```

```js
// tests/acessibilidadeCheckout.test.js
import { it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { montarCheckout } from '../src/checkout.js';

it('formulário de checkout não tem violações de acessibilidade', async () => {
  montarCheckout(document.body);
  const resultado = await axe(document.body);
  expect(resultado.violations).toHaveLength(0);
});
```

| Violação comum | Correção |
|---|---|
| Campo sem rótulo | `<label for="cep">CEP</label>` ou `aria-label` |
| Imagem sem texto alternativo | `alt="Fone de ouvido sem fio preto"` |
| Botão só com ícone | `aria-label="Remover item"` |
| Contraste baixo | Ajustar as cores até a relação mínima de 4,5:1 |

O axe encontra parte dos problemas; o restante exige teste manual (navegar só com o teclado, usar o
leitor de tela).

### 5. Desempenho com Lighthouse (4.4)
No Chrome DevTools → **Lighthouse**, auditar a página no modo mobile. Os principais indicadores
(Core Web Vitals):

| Indicador | Mede | Bom |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Tempo até o maior elemento aparecer | ≤ 2,5 s |
| **INP** (Interaction to Next Paint) | Tempo de resposta a cliques e toques | ≤ 200 ms |
| **CLS** (Cumulative Layout Shift) | Quanto a página "pula" enquanto carrega | ≤ 0,1 |

Melhorias típicas: imagem otimizada e com tamanho definido (LCP e CLS), menos JavaScript na carga
inicial (INP) e carregamento sob demanda do que fica fora da tela.

### 6. Interação com a equipe de testes (2.4)
O pull request é o ponto de encontro da equipe:
- o CI informa a todos se a alteração passou;
- quem revisa comenta os testes (perguntas do code review da aula 8);
- o **badge** no `README.md` mostra o estado da `main` para qualquer pessoa:
  `![Testes](https://github.com/<usuario>/<repositorio>/actions/workflows/ci.yml/badge.svg)`;
- o `TESTING.md` documenta como rodar a suíte, a estratégia e como contribuir com testes.

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, foi chamado porque uma loja virtual publicou duas vezes no mesmo mês
uma versão com o carrinho quebrado: "os testes existiam, mas ninguém rodou". Você implanta o
workflow de CI, liga a proteção da `main` e mostra à equipe um pull request bloqueado pelo check
vermelho. Na auditoria, o axe aponta 7 campos sem rótulo no checkout e o Lighthouse mede LCP de
4,8 s por causa de uma imagem de 3 MB na vitrine. O relatório traz as três correções em ordem de
impacto e o badge verde como prova de que a `main` está protegida.

## Dinâmica — Pull request na roda (25 min, grupos de 4)
- **Objetivo:** viver o fluxo de equipe do pull request com CI: alterar, revisar, aprovar e
  juntar (C5, 2.4).
- **Materiais:** o repositório de um integrante do grupo, com o workflow e a proteção da `main` já
  ativos.
- **Passo a passo:** (1) o integrante 1 cria uma branch e quebra um teste de propósito; (2) abre o
  pull request e todos acompanham o check ficar vermelho; (3) o integrante 2 revisa e comenta onde
  está a falha; (4) o integrante 3 corrige numa nova alteração; (5) o integrante 4 aprova, e o merge
  é liberado com o check verde.
- **Fechamento:** cada grupo conta em quanto tempo o defeito foi pego e quem teria sido afetado se
  ele chegasse à `main`.

## Situação-problema e entrega da aula
- **SA 2 — Pipeline CI/CD e dashboard de cobertura:** o workflow executa Vitest e Cypress em cada
  push e pull request, bloqueia o merge com teste falhando ou cobertura abaixo de 70%, publica
  relatório e badges no README e documenta como rodar e contribuir (`TESTING.md`).
- **Entrega desta aula:** link do repositório com o `ci.yml`, link do pull request bloqueado e
  depois liberado, print do axe antes e depois da correção, tabela do Lighthouse (notas, LCP, INP e
  CLS) com 1 melhoria proposta e o badge no README.

## Verificação da aprendizagem
- Qual a diferença entre `npm install` e `npm ci` no pipeline?
- O que faz `needs: testes` no job de E2E?
- Como impedir que um pull request com teste quebrado seja juntado na `main`?
- A página tem LCP de 4 s. O que isso significa e qual melhoria testar primeiro?
- Citar 2 violações de acessibilidade que o axe detecta e como corrigi-las.

## Recursos
Laboratório de informática, computador com acesso à internet, IDE para desenvolvimento de testes
(VS Code), Node.js e npm, Git e conta no GitHub, navegador com DevTools, kit multimídia, slides
`../AULAS/AULA-09-SLIDES.pdf` (apresentação) e apostila da UC (capítulo 9).
