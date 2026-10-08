# Aula 04 — Testes de Integração com DOM usando Testing Library

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 22/10
- **Conhecimentos (ementa do curso):** 2.3 Aplicação · 3.1 Teste funcional (caixa preta) ·
  4.1 Funcionalidade
- **Capacidades:** C4 — Aplicar testes definidos no Plano de Testes. · C5 — Desenvolver conjunto
  de testes automatizados
- **Estratégias:** exposição dialogada com código ao vivo, prática guiada, dinâmica em duplas,
  desafio
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md)

## Indicadores

- (7) Testa componente pelo comportamento visível, com queries por papel e texto (C4/C5).

## Objetivos

- Explicar o que é um teste de integração no front-end e onde ele fica na pirâmide.
- Configurar o Vitest com JSDOM e Testing Library (2.3).
- Encontrar elementos como o usuário encontra: pelo papel, pelo rótulo e pelo texto.
- Simular cliques e digitação com `userEvent`.
- Aplicar casos de teste de funcionalidade (4.1) do plano como testes de caixa preta (3.1).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: Vitest, AAA e matchers (aula 3) |
| Exposição com código ao vivo | 40 min | Integração; JSDOM; queries; `userEvent`; matchers do jest-dom |
| Prática guiada | 30 min | Passo 0: instalar e configurar; primeiro teste do botão "Seguir" |
| Intervalo | 15 min | — |
| Prática autônoma | 80 min | Botão "Seguir" com estados + formulário de cadastro com 4 testes |
| Dinâmica | 25 min | "Encontre sem olhar o código" (abaixo) |
| Desafio e entrega | 35 min | "O fluxo perfeito": preencher, corrigir e enviar o formulário |

## Conteúdo

### 1. Teste de integração no front-end
O teste de integração verifica **várias partes trabalhando juntas**: o HTML gerado, os eventos, a
regra de validação e a mensagem na tela. Ele fica no meio da pirâmide: mais lento que o unitário,
mas bem mais rápido que o E2E, porque roda num **DOM simulado (JSDOM)**, sem abrir o navegador.

### 2. Configurando o ambiente (2.3)

```bash
npm install -D jsdom @testing-library/dom @testing-library/user-event @testing-library/jest-dom
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
  },
});
```

```js
// tests/setup.js
import '@testing-library/jest-dom/vitest';
```

Em projetos React, troca-se `@testing-library/dom` por `@testing-library/react` e usa-se
`render(<Componente />)`; as queries e o `userEvent` são os mesmos.

### 3. Teste pelo comportamento, não pela implementação (caixa preta, 3.1)

| ❌ Detalhe de implementação | ✅ Comportamento visível |
|---|---|
| `document.querySelector('.btn-primary')` | `screen.getByRole('button', { name: 'Seguir' })` |
| Ler uma variável interna | Conferir o texto que aparece na tela |
| Chamar a função do evento direto | Clicar com `userEvent`, como o usuário |

Se o teste quebra quando só o nome de uma classe CSS muda, ele testa a implementação e deve ser
reescrito.

### 4. Queries da Testing Library

| Prioridade | Query | Encontra pelo… |
|---|---|---|
| 1 | `getByRole` | Papel acessível + nome (`button`, `textbox`, `heading`, `checkbox`) |
| 2 | `getByLabelText` | Rótulo do campo (`<label>`) |
| 3 | `getByPlaceholderText` | Texto de exemplo do campo |
| 4 | `getByText` | Texto visível |
| 5 | `getByTestId` | `data-testid` — último recurso |

- `getBy…` → o elemento **deve existir** (senão o teste falha).
- `queryBy…` → devolve `null`; serve para conferir que algo **não** está na tela.
- `findBy…` → **espera** o elemento aparecer (assíncrono; aula 5).

Buscar pelo papel tem um bônus: se o teste não encontra o botão pelo papel, o leitor de tela
também não encontra. O teste revela problemas de acessibilidade.

### 5. Simulando o usuário com `userEvent`

```js
// src/botaoSeguir.js
export function criarBotaoSeguir({ aoAlternar }) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.textContent = 'Seguir';
  botao.setAttribute('aria-pressed', 'false');

  botao.addEventListener('click', () => {
    const estaSeguindo = botao.getAttribute('aria-pressed') !== 'true';
    botao.setAttribute('aria-pressed', String(estaSeguindo));
    botao.textContent = estaSeguindo ? 'Seguindo' : 'Seguir';
    aoAlternar(estaSeguindo);
  });

  return botao;
}
```

```js
// tests/botaoSeguir.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { criarBotaoSeguir } from '../src/botaoSeguir.js';

describe('botão Seguir', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('passa para "Seguindo" e avisa o callback ao ser clicado', async () => {
    // Arrange
    const aoAlternar = vi.fn();
    document.body.append(criarBotaoSeguir({ aoAlternar }));
    const usuario = userEvent.setup();

    // Act
    await usuario.click(screen.getByRole('button', { name: 'Seguir' }));

    // Assert
    const botao = screen.getByRole('button', { name: 'Seguindo' });
    expect(botao).toHaveAttribute('aria-pressed', 'true');
    expect(aoAlternar).toHaveBeenCalledWith(true);
  });
});
```

- `userEvent.setup()` cria um "usuário" que dispara a sequência real de eventos (foco, teclado,
  clique). Toda ação dele é assíncrona: use **`await`**.
- `beforeEach` limpa o `document.body`, para que um teste não interfira no outro.

### 6. Matchers do jest-dom

| Matcher | Confere se o elemento… |
|---|---|
| `toBeInTheDocument()` | Está na página |
| `toBeVisible()` | Está visível para o usuário |
| `toBeDisabled()` / `toBeEnabled()` | Está desabilitado / habilitado |
| `toHaveTextContent('…')` | Mostra o texto |
| `toHaveValue('…')` | Campo com o valor digitado |
| `toHaveAttribute('aria-pressed', 'true')` | Tem o atributo com o valor |

### 7. Do caso de teste ao teste automatizado (C4, 4.1)
O caso de teste da aula 2 vira teste quase linha por linha:

| Caso de teste (plano) | Teste automatizado |
|---|---|
| Pré-condição: formulário aberto | Arrange: montar o formulário no `document.body` |
| Passo: digitar senha "123" | Act: `await usuario.type(screen.getByLabelText('Senha'), '123')` |
| Resultado esperado: botão desabilitado e aviso | Assert: `toBeDisabled()` e `getByText('A senha deve ter no mínimo 6 dígitos')` |

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, foi chamado porque usuários reclamam que "o cadastro não deixa
continuar". Você aplica os casos do plano no formulário: com senha de 5 caracteres, o botão
Cadastrar fica desabilitado, como esperado, **mas a mensagem de aviso não aparece**. O teste
`screen.getByText('A senha deve ter no mínimo 6 dígitos')` falha e comprova o defeito de
funcionalidade (4.1): o usuário não sabe por que não consegue avançar. Seu relatório anexa o teste
que falha, para a equipe usá-lo como prova da correção.

## Dinâmica — Encontre sem olhar o código (25 min, duplas)
- **Objetivo:** escolher a query certa pensando como o usuário, e não como quem escreveu o HTML
  (C4, 3.1).
- **Materiais:** prints de 4 telas (login, busca, carrinho, cadastro) com 3 elementos marcados em cada.
- **Passo a passo:** (1) a dupla recebe uma tela, sem o código; (2) para cada elemento marcado,
  escreve a query que usaria (ex.: `getByRole('button', { name: 'Adicionar ao carrinho' })`);
  (3) troca com outra dupla, que confere se a query segue a ordem de prioridade; (4) toda query com
  classe CSS ou `testid` precisa de justificativa.
- **Fechamento:** o professor mostra o HTML real de uma tela e testa as queries das duplas ao vivo.
  As que falharem revelam um rótulo ou papel faltando no HTML.

## Situação-problema e entrega da aula
- **Entrega:** testes do botão "Seguir" (estados, callback e `aria-pressed`) e do formulário de
  cadastro (4 testes passando), só com queries por papel, rótulo ou texto e `userEvent` com `await`.
- **Ligação com a SA 1:** os casos de teste de integração (tipo I) do plano de autenticação passam a
  ser executados de forma automática.

## Verificação da aprendizagem
- Reescrever `document.querySelector('#btn-enviar')` como query da Testing Library.
- Qual query usar para conferir que uma mensagem de erro **não** aparece?
- Explicar por que `await` é obrigatório antes de `usuario.click`.
- Por que buscar pelo papel ajuda também a acessibilidade?

## Recursos
Laboratório de informática, computador com acesso à internet, IDE para desenvolvimento de testes
(VS Code), Node.js e npm, kit multimídia, prints da dinâmica, slides `../AULAS/AULA-04-SLIDES.pdf`
(apresentação) e apostila da UC (capítulo 4).
