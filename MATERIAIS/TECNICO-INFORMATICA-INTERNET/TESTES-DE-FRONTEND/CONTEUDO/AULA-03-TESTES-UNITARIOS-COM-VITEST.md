# Aula 03 — Testes Unitários no Front-End com Vitest

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** 15/10
- **Conhecimentos (ementa do curso):** 2 Automação de Testes (2.1 Definição · 2.2 Frameworks ·
  2.3 Aplicação) · 3.2 Teste estrutural (caixa branca)
- **Capacidades:** C5 — Desenvolver conjunto de testes automatizados
- **Estratégias:** exposição dialogada com código ao vivo, prática guiada no laboratório, dinâmica
  em duplas, debate
- **Prática da aula:** [`../ATIVIDADES/ATIVIDADE-PRATICA-AULA-03.md`](../ATIVIDADES/ATIVIDADE-PRATICA-AULA-03.md)

## Indicadores

- (6) Escreve testes unitários com padrão AAA e matchers adequados (C5).

## Objetivos

- Definir automação de testes e o que é um teste unitário (2.1).
- Reconhecer os principais frameworks de teste do front-end e o papel do Vitest (2.2).
- Preparar um projeto Node com Vitest e rodar a suíte pelo terminal (2.3).
- Escrever testes no padrão **AAA** (Arrange, Act, Assert) com o matcher adequado.
- Usar a visão de caixa branca (3.2) para testar cada caminho de uma função.
- Substituir uma dependência por um mock (`vi.fn`) para testar só a unidade.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: verificação, plano e casos de teste (aula 2) |
| Exposição com código ao vivo | 40 min | Automação; frameworks; anatomia de um teste Vitest; AAA; matchers |
| Prática guiada | 35 min | Passo 0: criar o projeto, instalar o Vitest e rodar o primeiro teste |
| Intervalo | 15 min | — |
| Prática autônoma | 70 min | 5 funções utilitárias com no mínimo 12 testes, incluindo bordas |
| Dinâmica | 25 min | "Mutante sobrevivente" (abaixo) |
| Mock e debate | 40 min | Mock da API de autenticação; debate "Quanto devemos mockar?" |

## Conteúdo

### 1. Automação de testes (2.1)
Teste automatizado é um **programa que testa outro programa**: prepara os dados, executa o código e
compara o resultado com o esperado. Ele roda em segundos, quantas vezes for preciso, e avisa na hora
quando uma alteração quebra algo que funcionava (teste de regressão).

O **teste unitário** verifica a menor parte do código isoladamente — uma função ou um módulo — sem
banco, sem rede e sem navegador. É a base da pirâmide: muitos testes, rápidos e baratos.

### 2. Frameworks de teste (2.2)

| Ferramenta | Para quê | Camada |
|---|---|---|
| **Vitest** | Executa testes JS/TS, com asserções, mocks e cobertura; usa a mesma configuração do Vite | Unitário e integração |
| Jest | Alternativa mais antiga com API quase igual à do Vitest | Unitário e integração |
| Testing Library | Testa componentes pelo que o usuário vê (aula 4) | Integração |
| Cypress / Playwright | Controla o navegador real (aula 6) | E2E |

Usamos o Vitest por ser rápido, compatível com a sintaxe do Jest e já integrado a projetos Vite/React.

### 3. Preparando o projeto (2.3)

```bash
mkdir testes-unitarios && cd testes-unitarios
npm init -y
npm pkg set type=module
npm pkg set scripts.test="vitest" scripts.test:run="vitest run"
npm install -D vitest
```

- `npm test` → modo observação: roda de novo a cada arquivo salvo.
- `npm run test:run` → roda uma vez e termina (é o modo usado no CI, aula 9).
- Por convenção, o teste de `src/utils/frete.js` fica em `src/utils/frete.test.js`.

### 4. Anatomia de um teste e o padrão AAA

```js
// src/utils/frete.js
export const VALOR_FRETE_GRATIS = 199;
export const VALOR_FRETE = 19.9;

export function calcularFrete(subtotal) {
  if (subtotal < 0) throw new Error('Subtotal inválido');
  if (subtotal >= VALOR_FRETE_GRATIS) return 0;
  return VALOR_FRETE;
}
```

```js
// src/utils/frete.test.js
import { describe, it, expect } from 'vitest';
import { calcularFrete } from './frete.js';

describe('calcularFrete', () => {
  it('cobra R$ 19,90 quando o subtotal é menor que R$ 199,00', () => {
    // Arrange (preparar)
    const subtotal = 198.99;
    // Act (agir)
    const frete = calcularFrete(subtotal);
    // Assert (conferir)
    expect(frete).toBe(19.9);
  });

  it('dá frete grátis a partir de R$ 199,00', () => {
    expect(calcularFrete(199)).toBe(0);
  });

  it('recusa subtotal negativo', () => {
    expect(() => calcularFrete(-1)).toThrow('Subtotal inválido');
  });
});
```

- `describe` agrupa os testes de uma unidade; `it` (ou `test`) é um caso de teste.
- O nome do teste descreve o **comportamento esperado**, como um caso de teste da aula 2.
- Cada teste é **independente**: não depende da ordem nem do resultado de outro.

### 5. Matchers mais usados

| Matcher | Quando usar | Exemplo |
|---|---|---|
| `toBe` | Valor primitivo exato | `expect(total).toBe(10)` |
| `toEqual` | Objeto ou array com o mesmo conteúdo | `expect(item).toEqual({ id: 1, qtd: 2 })` |
| `toBeCloseTo` | Número com casas decimais | `expect(0.1 + 0.2).toBeCloseTo(0.3)` |
| `toBeTruthy` / `toBeFalsy` | Verdadeiro ou falso "de fato" | `expect(estaValido).toBeTruthy()` |
| `toContain` | Item dentro de array ou texto | `expect(lista).toContain('Teclado')` |
| `toThrow` | A função deve lançar erro | `expect(() => f(-1)).toThrow()` |
| `toHaveBeenCalledWith` | Mock chamado com certos argumentos | `expect(mock).toHaveBeenCalledWith('/api/login', expect.any(Object))` |

Use o matcher **mais específico**: `toBe(0)` diz mais do que `toBeFalsy()`.

### 6. Caixa branca no teste unitário (3.2)
Na caixa branca olhamos o código para garantir que **cada caminho** foi exercitado. A função
`calcularFrete` tem 3 caminhos (negativo, abaixo de 199, a partir de 199); por isso tem no mínimo 3
testes. Os **valores-limite** da aula 2 (198,99 · 199 · 199,01) entram aqui.

### 7. Isolando dependências com mock
Quando a função depende de algo externo (API, data atual, `localStorage`), trocamos essa dependência
por um **mock**: um substituto controlado que devolve o que o teste precisa e registra como foi chamado.

```js
// src/servicos/autenticacao.js
export async function entrar(email, senha, cliente = fetch) {
  const resposta = await cliente('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
  if (!resposta.ok) return { sucesso: false };
  const dados = await resposta.json();
  return { sucesso: true, token: dados.token };
}
```

```js
// src/servicos/autenticacao.test.js
import { describe, it, expect, vi } from 'vitest';
import { entrar } from './autenticacao.js';

describe('entrar', () => {
  it('devolve o token quando a API aceita o login', async () => {
    const clienteFalso = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'token-de-teste' }),
    });

    const resultado = await entrar('teste@loja.local', 'Senha123', clienteFalso);

    expect(resultado).toEqual({ sucesso: true, token: 'token-de-teste' });
    expect(clienteFalso).toHaveBeenCalledWith('/api/login', expect.any(Object));
  });

  it('indica falha quando a API recusa', async () => {
    const clienteFalso = vi.fn().mockResolvedValue({ ok: false });
    const resultado = await entrar('teste@loja.local', 'errada', clienteFalso);
    expect(resultado.sucesso).toBe(false);
  });
});
```

Receber o `cliente` por parâmetro (injeção de dependência) torna a função fácil de testar. Em
`beforeEach` dá para recriar os mocks antes de cada teste, garantindo o isolamento.

## Exemplo no contexto do curso — você como aluno consultor
Você, como aluno consultor, foi chamado porque o carrinho de uma loja virtual mostrou total errado
num cupom de 15%. Antes de mexer no código, você escreve os testes da função
`aplicarCupom(total, percentual)`: 0%, 15%, 100%, percentual negativo (erro) e total com centavos
(`toBeCloseTo`). Dois testes falham e mostram o defeito: o desconto era calculado sobre o frete
também. Com os testes no lugar, a correção pode ser feita sem medo de quebrar outros casos.

## Dinâmica — Mutante sobrevivente (25 min, duplas)
- **Objetivo:** perceber que um teste só tem valor se falha quando o código está errado (C5, 3.2).
- **Materiais:** o projeto da prática com a função `calcularFrete` e seus testes.
- **Passo a passo:** (1) a dupla A cria um "mutante" no código da dupla B: troca `>=` por `>`, ou
  `19.9` por `19`, sem avisar onde; (2) a dupla B roda `npm run test:run`; (3) se algum teste
  falhar, o mutante "morreu"; se todos passarem, o mutante "sobreviveu" e a dupla B escreve o teste
  que faltava; (4) invertem os papéis.
- **Fechamento:** o professor registra no quadro quais mutantes sobreviveram e qual valor-limite ou
  caminho não tinha teste.

## Situação-problema e entrega da aula
- **Entrega:** suíte unitária de 5 funções utilitárias (no mínimo 12 testes, bordas cobertas) +
  teste com mock da API de autenticação (sucesso, recusa e chamada verificada) + print do terminal
  com todos os testes passando.
- **Ligação com a SA 1:** os casos de teste unitários (tipo U) escritos no plano da aula 2 viram,
  aqui, testes automatizados.

## Verificação da aprendizagem
- Identificar Arrange, Act e Assert num teste dado.
- Escolher o matcher para: comparar `{ id: 1 }`; conferir `0.1 + 0.2`; esperar um erro.
- Quantos testes, no mínimo, uma função com um `if/else` dentro de outro `if` precisa? Por quê?
- Explicar por que um teste unitário não deve chamar a API real.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema operacional, IDE para
desenvolvimento de testes (VS Code), Node.js e npm, kit multimídia, slides
`../AULAS/AULA-03-SLIDES.pdf` (apresentação) e apostila da UC (capítulo 3).
