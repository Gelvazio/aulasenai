# Capítulo 10 — Projeto Integrador: Suíte de Testes + avaliação

- **Aula:** 10
- **Capacidade:** C1, C2, C3, C4, C5, S1, S2

## Teoria

### A loja aguenta a Black Friday?

Faltam três semanas para a Black Friday e a diretoria da **Loja Nuvem Azul** fez uma única
pergunta: "podemos confiar no site?". Para responder com fatos, a equipe precisa juntar tudo o que
foi estudado em um só repositório: **plano**, **casos de teste**, **suíte automatizada** (unitários,
integração e E2E), **cobertura**, **pipeline** e **relatório final**. Este capítulo é o roteiro do
projeto integrador — e da avaliação final da unidade.

> 🎯 **Objetivos do capítulo:** aplicar o **processo fundamental de teste completo** (planejamento,
> desenho, execução, monitoração e controle, avaliação dos resultados), organizar a **suíte de
> testes**, trabalhar em equipe com **code review respeitoso** e **justificar as decisões** com base
> em requisitos e riscos.

### O processo fundamental de teste no projeto

| Etapa | O que entregar no projeto | Capítulos de apoio |
|---|---|---|
| **7.1 Planejamento** | Plano formal: escopo, estratégia, riscos, estimativa de esforço, critérios de saída | 2 |
| **7.2 Desenho dos testes** | No mínimo 5 casos por feature (caminho feliz e bordas, tipo U/I/E2E) e matriz de rastreabilidade | 2 |
| **7.3 Execução dos testes** | Suíte automatizada: unitários, integração (com MSW) e E2E | 3 a 6 e 8 |
| **7.4 Monitoração e controle** | Pipeline de CI, cobertura ≥ 70%, testes intermitentes tratados | 7 e 9 |
| **7.5 Avaliação dos resultados** | Relatório final com recomendação de publicar ou não | 7 |

### Planejamento e desenho (retomando a situação de aprendizagem 1)

Para **autenticação**, **carrinho** e **checkout**, o plano formal traz o escopo, a análise de riscos
e a **estimativa de esforço**:

| Feature | Casos (U/I/E2E) | Risco (impacto × probabilidade) | Esforço estimado |
|---|---|---|---|
| Autenticação | 3 U · 2 I · 1 E2E | Alto × médio | 4 h |
| Carrinho e cupom | 4 U · 2 I · 1 E2E | Alto × alto | 5 h |
| Checkout | 2 U · 2 I · 1 E2E | Altíssimo × alto | 6 h |

**Exemplo — casos da feature "cupom":**

| ID | Caso | Tipo | Requisito |
|---|---|---|---|
| CT-CUP-01 | Cupom válido de 10% reduz o subtotal (caminho feliz) | U | RF-11 |
| CT-CUP-02 | Cupom expirado não dá desconto | U | RF-12 |
| CT-CUP-03 | Carrinho vazio com cupom não quebra e não fica negativo | U | RF-11 |
| CT-CUP-04 | Ao aplicar o cupom na tela, o total é recalculado e exibido | I | RF-11 |
| CT-CUP-05 | Compra completa com cupom até a confirmação do pedido | E2E | RF-11, RF-13 |

### A suíte de testes (6.3): organização

```text
loja-nuvem-azul/
├─ .github/workflows/testes.yml   pipeline de CI
├─ src/                           componentes, regras de negócio, mocks/handlers.js
├─ tests/                         unitários e integração (Vitest, Testing Library, MSW)
├─ e2e/                           fluxos E2E e Page Objects
├─ TESTING.md                     como rodar e contribuir
└─ README.md                      badges da pipeline e da cobertura
```

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "e2e": "cypress run"
  }
}
```

Se a equipe preferir os testes **ao lado do código** (`precos.test.js` junto de `precos.js`), tudo
bem — o importante é que a regra esteja escrita no `TESTING.md` e seja seguida por todos.

### Execução: a base unitária com casos de borda

```js
// src/precos.js
export function calcularTotal({ itens, cupom, frete }) {
  const subtotal = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  const desconto = cupom?.ativo ? subtotal * cupom.percentual : 0;
  return Math.round((subtotal - desconto + frete) * 100) / 100;
}

// tests/precos.test.js
import { describe, it, expect } from 'vitest';
import { calcularTotal } from '../src/precos';

const cupom10 = { ativo: true, percentual: 0.1 };

describe('calcularTotal', () => {
  it('soma itens e frete sem cupom', () => {
    expect(calcularTotal({ itens: [{ preco: 59.9, quantidade: 2 }], cupom: null, frete: 15 })).toBe(134.8);
  });

  it('não aplica o desconto sobre o frete', () => {
    expect(calcularTotal({ itens: [{ preco: 100, quantidade: 1 }], cupom: cupom10, frete: 15 })).toBe(105);
  });

  it('carrinho vazio com cupom cobra só o frete', () => {
    expect(calcularTotal({ itens: [], cupom: cupom10, frete: 15 })).toBe(15);
  });

  it('cupom expirado não dá desconto', () => {
    const expirado = { ativo: false, percentual: 0.1 };
    expect(calcularTotal({ itens: [{ preco: 100, quantidade: 1 }], cupom: expirado, frete: 0 })).toBe(100);
  });

  it('arredonda para duas casas decimais', () => {
    expect(calcularTotal({ itens: [{ preco: 33.33, quantidade: 3 }], cupom: cupom10, frete: 0 })).toBe(89.99);
  });
});
```

Acima da base: **integração** do carrinho com a API simulada (capítulos 4 e 5) e **no mínimo três
fluxos E2E** — por exemplo, login, compra com cupom e checkout com erro de pagamento (capítulo 6).

### Monitoração, controle e avaliação dos resultados

- A pipeline (capítulo 9) roda tudo a cada `push` e `pull request` e bloqueia o merge com teste
  vermelho ou cobertura abaixo de **70%**.
- O painel acompanha cobertura, testes intermitentes e tempo da suíte (capítulo 7).
- O **relatório final** resume resultados, cobertura, defeitos abertos e riscos e termina com a
  recomendação: a versão atende aos critérios de saída do plano? Pode ir para a Black Friday?

### Equipe: code review respeitoso (S1)

**Roteiro de code review de testes — seis perguntas que o colega responde com respeito:**

1. O nome de cada teste descreve claramente o comportamento verificado?
2. Os casos de borda do requisito (vazio, limite, inválido) estão cobertos?
3. Cada teste confere algo importante com asserções, e não só "executa sem erro"?
4. Os testes são independentes e usam dados isolados (sem depender da ordem)?
5. Os seletores seguem o que o usuário vê (`getByRole`, rótulo, texto) e não classes de estilo?
6. Sobrou algo que não deve ir para o repositório (`only`, `skip`, `console.log`, teste desativado)?

Comentários começam pelo que está bom, apontam o problema (não a pessoa) e sugerem um caminho:
"Ótima cobertura do cupom! Que tal incluir o caso de cupom expirado?". Quem recebe agradece,
considera a ideia diferente e responde com fatos.

### Justificar as decisões (S2)

O tempo nunca dá para testar tudo. Cada escolha do projeto deve ser **justificada por requisitos e
riscos**: "Automatizamos primeiro o checkout com cupom porque é o requisito de maior impacto
financeiro (RF-13) e o módulo mais alterado nesta versão; deixamos o rodapé para o teste manual
porque o impacto de uma falha ali é baixo."

### Como você será avaliado

| Instrumento | Momento | Peso | Critérios |
|---|---|---|---|
| Avaliação contínua: entregas das aulas 1–9 e SAs 1 e 2 | Aulas 1–9 | 60% | Correção, completude, organização do repositório, prazo |
| Avaliação prática: suíte de testes para aplicação fornecida | Aula 10 | 25% | Unitários (≥ 5 casos) · integração · E2E (≥ 3 fluxos) · cobertura ≥ 70% · execução no CI |
| Avaliação objetiva: conceitos, técnicas, tipos e processo de teste | Aula 10 | 15% | Acertos; questões no formato capacidade → contexto → comando |

- **Nota final** = 60% contínua + 25% prática + 15% objetiva. Aprovação: nota final ≥ 7,0 e presença
  mínima de 75%. Cada capacidade também recebe o parecer **Desenvolvida / Em desenvolvimento / Não
  desenvolvida**.
- **Rubrica:** Excelente (9–10) — plano rastreável, testes legíveis pelo comportamento, suíte estável
  no CI, decisões justificadas; Bom (7–8) — testes corretos e passando, com pequenas falhas de
  nomenclatura, cobertura ou documentação; Aceitável (5–6) — cumpre o essencial com orientação,
  lacunas de casos de borda ou testes frágeis; Insuficiente (0–4) — testes que não rodam, não
  validam requisito ou plano ausente.
- **Recuperação:** refazer a avaliação não atingida (prática com outra aplicação, objetiva com novo
  banco de questões), retomando só as capacidades pendentes.

### Checklist final da entrega

- [ ] Plano formal com escopo, riscos, esforço e critérios de saída
- [ ] No mínimo 5 casos por feature e matriz de rastreabilidade sem lacunas
- [ ] Unitários (≥ 5 casos), integração e E2E (≥ 3 fluxos) passando
- [ ] Cobertura ≥ 70% e pipeline verde com proteção da branch
- [ ] `TESTING.md`, badges e relatório final com recomendação
- [ ] Code review feito e sugestões respondidas

## Vídeos

- [A pirâmide de testes](https://www.youtube.com/watch?v=RX1bvaNOc-M) — 10:37 — Otavio Lemos
- [Como fazer um bom code review](https://www.youtube.com/watch?v=jq4AxdaCID0) — 10:45 — Eder TV
- [5 dicas de como receber feedback](https://www.youtube.com/watch?v=mwrfJW5mvUA) — 05:29 — Caput Consultoria

## Exercícios

### ITEM 1
- **Capacidade:** C1, C2
- **Contexto:** Especificação da tela de checkout da Loja Nuvem Azul: campo CEP com 8 dígitos e preenchimento automático do endereço; botão **Pagar** desabilitado até o cliente aceitar os termos; mensagem "Pagamento recusado, tente outro cartão" quando o cartão é negado; resumo do pedido sempre visível.
- **Comando:** Identifique as especificações técnicas da interface (elementos, estados e mensagens) e transforme-as em pelo menos quatro requisitos testáveis, com critério objetivo de aceitação.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C2, C3
- **Contexto:** A feature de autenticação (login, cadastro e recuperação de senha) precisa entrar no plano formal do projeto integrador.
- **Comando:** Monte o trecho do plano da autenticação com escopo (dentro e fora), três riscos com impacto e probabilidade, estimativa de esforço e critérios de saída.
- **Linhas:** 8

### ITEM 3
- **Capacidade:** C2, C4
- **Contexto:** Requisitos do carrinho: RF-20 adicionar item; RF-21 alterar quantidade (mínimo 1, máximo 10); RF-22 remover item; RF-23 mostrar o subtotal atualizado.
- **Comando:** Escreva cinco casos de teste do carrinho (caminho feliz e bordas), indicando o tipo de cada um (U, I ou E2E), e monte a matriz de rastreabilidade requisito × caso.
- **Linhas:** 8

### ITEM 4
- **Capacidade:** C5
- **Contexto:** A avaliação prática exige pelo menos cinco casos unitários para a regra `calcularParcelas(total)`: até R$ 100 em 1 vez; de R$ 100,01 a R$ 500 em até 3 vezes; acima de R$ 500 em até 6 vezes; total negativo lança erro.
- **Comando:** Escreva a suíte Vitest com no mínimo cinco testes no padrão AAA, incluindo os valores de borda e o caso de erro, com nomes descritivos.
- **Linhas:** 12

### ITEM 5
- **Capacidade:** C3, C5
- **Contexto:** Faltam dois dias para a entrega e a suíte tem: 18 unitários, nenhum teste de integração, 1 fluxo E2E, cobertura de 63% e nenhuma pipeline.
- **Comando:** Compare a situação com os critérios da avaliação prática, liste o que falta em ordem de prioridade e descreva como organizar a suíte (pastas, scripts e pipeline) para atender a todos os critérios.
- **Linhas:** 7

### ITEM 6
- **Capacidade:** S1
- **Contexto:** Você vai revisar os testes do checkout de um colega e também receberá a revisão dele sobre os seus testes do carrinho.
- **Comando:** Crie um roteiro de code review de testes com seis perguntas que o colega deve responder de forma respeitosa e escreva um exemplo de comentário construtivo e um exemplo de resposta que acolhe a sugestão.
- **Linhas:** 8

### ITEM 7
- **Capacidade:** S2, C3
- **Contexto:** Só há tempo para automatizar dois destes quatro fluxos E2E: (a) login; (b) compra com cupom até a confirmação; (c) troca de idioma do site; (d) checkout com pagamento recusado. O checkout foi todo alterado nesta versão.
- **Comando:** Escolha os dois fluxos e justifique a decisão com base em requisitos e riscos (impacto × probabilidade), dizendo também como os outros dois serão cobertos ou acompanhados.
- **Linhas:** 6

## Resumo

- O projeto integrador aplica o **processo fundamental de teste** completo: planejamento, desenho, execução, monitoração e controle e avaliação dos resultados.
- **Planejamento e desenho:** plano formal com riscos e esforço, no mínimo 5 casos por feature (U/I/E2E) e matriz de rastreabilidade.
- **Suíte organizada:** pastas, scripts e `TESTING.md`; base unitária com casos de borda, integração com MSW e no mínimo três fluxos E2E.
- **Controle e avaliação:** pipeline com cobertura ≥ 70%, painel de métricas e relatório final com recomendação.
- **Equipe:** code review respeitoso (S1) e decisões justificadas por requisitos e riscos (S2).
- **Avaliação:** 60% contínua + 25% prática + 15% objetiva; nota ≥ 7,0, presença ≥ 75% e parecer por capacidade.

## Glossário

- **Projeto integrador:** atividade final que reúne todo o conteúdo da unidade em um único projeto.
- **Caminho feliz:** cenário em que tudo dá certo, com dados válidos.
- **Caso de borda:** cenário nos limites ou fora do comum (carrinho vazio, cupom expirado, arredondamento).
- **Estimativa de esforço:** previsão do tempo necessário para planejar, escrever e executar os testes.
- **Análise de riscos:** identificação do que pode falhar, com impacto e probabilidade, para priorizar os testes.
- **Critério de aceitação:** condição objetiva que define quando um requisito está atendido.
- **Arquitetura da suíte:** organização das pastas, ferramentas e camadas de testes do projeto.
- **Relatório final de testes:** documento com resultados, cobertura, defeitos, riscos e recomendação de publicação.
- **Parecer por capacidade:** avaliação de cada capacidade como Desenvolvida, Em desenvolvimento ou Não desenvolvida.
- **Recuperação:** nova oportunidade de avaliação, retomando apenas as capacidades pendentes.
