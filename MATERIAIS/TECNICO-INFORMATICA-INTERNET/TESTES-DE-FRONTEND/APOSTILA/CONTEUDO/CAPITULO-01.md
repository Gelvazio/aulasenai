# Capítulo 01 — Fundamentos de Testes de Software

- **Aula:** 01
- **Capacidade:** C1, C2, C3

## Teoria

### O custo de um clique quebrado

Sexta-feira à noite, promoção no ar: o botão **Finalizar compra** da **Loja Nuvem Azul** (startup
fictícia de e-commerce em React) para de funcionar no celular. Em uma hora, centenas de clientes
desistem. A causa? Uma mudança "pequena" no componente do botão que ninguém testou. Em 1996, o
foguete Ariane 5 explodiu 40 segundos após o lançamento por uma conversão numérica não testada; no
front-end, um erro num botão impede milhares de compras em minutos.

> 🎯 **Objetivos do capítulo:** entender o papel dos testes e da qualidade (QA), diferenciar
> **verificação** de **validação**, conhecer os **tipos de testes** e a **pirâmide de testes** e
> assumir a **responsabilidade** de não entregar código sem teste.

### Qualidade e o papel do QA

**Qualidade** é a conformidade do sistema com os requisitos e com as expectativas dos usuários.
Hoje, QA (garantia de qualidade) não é só "clicar em tudo antes de publicar": os testes são
**automatizados**, rodam a cada alteração de código e fazem parte do trabalho de **toda a
equipe**, desde o primeiro commit.

### Erro, defeito e falha

| Termo | O que é | Exemplo na Loja Nuvem Azul |
|---|---|---|
| **Erro (engano)** | Ação humana equivocada | O dev digita `>` no lugar de `>=` na regra de frete grátis |
| **Defeito (bug)** | A imperfeição que fica no código | A função de frete não dá frete grátis em compras de exatamente R$ 200 |
| **Falha** | O comportamento errado percebido ao usar o sistema | O cliente com R$ 200 no carrinho paga frete |

Testar é procurar **falhas** para encontrar os **defeitos** antes que cheguem ao usuário.

### Verificação × validação

| | Verificação | Validação |
|---|---|---|
| Pergunta | Construímos o produto certo conforme a especificação? | É o produto que o usuário precisa? |
| Base | Requisitos e especificação técnica | Uso real e necessidade do usuário |
| Exemplo na tela de cadastro | O campo CPF aceita só 11 dígitos, como diz a especificação | O cliente consegue se cadastrar no celular sem se confundir |

Um sistema pode passar na verificação (fazer tudo o que estava escrito) e falhar na validação
(o usuário não consegue usar). Os dois são necessários.

### Tipos de testes (características de qualidade)

| Tipo | O que avalia | Exemplo |
|---|---|---|
| **Funcionalidade** | Se o sistema faz o que as regras de negócio pedem | E-mail sem "@" mostra mensagem de erro; frete calculado certo |
| **Usabilidade** | Se é fácil e acessível de usar | Formulário navegável pelo teclado e por leitor de tela |
| **Confiabilidade** | Se funciona de forma estável, inclusive com falhas | A API do frete cai e a tela mostra aviso, sem travar |
| **Desempenho** | Velocidade e resposta sob carga | Página principal carrega em menos de 2,5 s |
| **Manutenibilidade** | Facilidade de alterar e testar o código | Componentes pequenos e testes legíveis que não quebram à toa |

Testes **funcionais** verificam o comportamento; testes **não funcionais** (usabilidade,
desempenho, confiabilidade...) verificam como o sistema se comporta.

### Caixa preta e caixa branca (técnicas)

- **Caixa preta (teste funcional):** olha só entradas e saídas, sem ver o código — "digitei
  um CEP válido, apareceu o frete?".
- **Caixa branca (teste estrutural):** olha os caminhos internos do código — "o `if` do frete
  grátis foi testado com valores abaixo, igual e acima de R$ 200?".

### O processo de teste (STLC) em resumo

1. **Planejamento** — escopo, riscos e metas;
2. **Desenho** — casos de teste, cenários e dados;
3. **Execução** — rodar os testes (automatizados e exploratórios);
4. **Monitoração e controle** — acompanhar falhas, métricas e retestes;
5. **Avaliação dos resultados** — decidir se o produto pode ser publicado.

### A pirâmide de testes

| Nível | Proporção sugerida | Velocidade | O que testa | Exemplo |
|---|---|---|---|---|
| **Unitário** (base) | ~60% | < 100 ms cada | Funções e regras isoladas | `calcularDesconto()` |
| **Integração** (meio) | ~30% | 100 ms a 1 s | Componentes juntos, DOM, API simulada | Formulário + validação |
| **E2E** (topo) | ~10% | 5 a 60 s | O fluxo completo no navegador | Login → carrinho → pagamento |

⚠️ **Cone de sorvete:** muitos testes de ponta a ponta e poucos unitários deixam a suíte lenta e
cheia de **testes intermitentes** (passam ou falham sem mudança no código). Mantenha a base forte.

**Regra de 10 (custo do defeito):** quanto mais tarde o defeito é encontrado, mais caro fica —
1x no design, 10x no desenvolvimento, 100x nos testes, 1.000x em produção.

### Pilares de um bom teste automatizado

- **Assertividade:** compara o resultado obtido com o esperado e, se falhar, diz por quê.
- **Repetibilidade:** rodar 1 ou 1.000 vezes dá o mesmo resultado.
- **Independência:** nenhum teste depende de outro; cada um prepara e limpa seus dados.

**Padrão AAA (Arrange, Act, Assert):**

```js
// formatarMoeda.js
export function formatarMoeda(valor) {
  return valor
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace(/\s/g, ' ');
}

// formatarMoeda.test.js
import { describe, it, expect } from 'vitest';
import { formatarMoeda } from './formatarMoeda';

describe('formatarMoeda', () => {
  it('formata 1500 como R$ 1.500,00', () => {
    const valor = 1500;                      // Arrange: prepara os dados
    const resultado = formatarMoeda(valor);  // Act: executa a função
    expect(resultado).toBe('R$ 1.500,00');   // Assert: confere o resultado
  });
});
```

### Responsabilidade (autogestão)

Testar faz parte do **compromisso profissional**: não entregar código sem teste, rodar a suíte
antes de enviar alterações e **relatar defeitos com honestidade** — inclusive os que você mesmo
causou. Esconder uma falha para "não atrasar a entrega" só transfere o custo (e multiplica por 10)
para depois.

## Vídeos

- [Testes unitários, integração e E2E: você realmente sabe a diferença?](https://www.youtube.com/watch?v=5HBS5M97wXo) — 14:01 — Full Cycle
- [Tipos de testes de software](https://www.youtube.com/watch?v=ETyeakDeMl8) — 10:19 — 4ALL Tests
- [Erro × defeito × falha: entenda a diferença](https://www.youtube.com/watch?v=DximzBibKm4) — 05:39 — Leo in Tech

## Exercícios

### ITEM 1
- **Capacidade:** C1, C3
- **Contexto:** Na especificação da tela de cadastro da Loja Nuvem Azul: "o campo CPF aceita 11 dígitos e mostra máscara 000.000.000-00". Nos testes com clientes, muitos idosos não entenderam a máscara e desistiram do cadastro no celular.
- **Comando:** Explique a diferença entre verificação e validação usando essa tela: dê um exemplo de verificação e um de validação e diga qual dos dois falhou nesse caso.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C2
- **Contexto:** A equipe listou cinco testes: (a) a página do catálogo carrega em menos de 2,5 s; (b) o cupom "NUVEM10" dá 10% de desconto; (c) o checkout pode ser feito só com o teclado; (d) se a API de frete cair, aparece um aviso e a compra continua; (e) trocar o nome de uma classe CSS não quebra os testes.
- **Comando:** Classifique cada teste pelo tipo (funcionalidade, usabilidade, confiabilidade, desempenho ou manutenibilidade) e justifique em uma linha.
- **Linhas:** 5

### ITEM 3
- **Capacidade:** C2, C3
- **Contexto:** Um desenvolvedor escreveu `if (total > 200)` na regra de frete grátis, mas a especificação diz "a partir de R$ 200". Uma cliente com exatamente R$ 200 no carrinho pagou frete e reclamou.
- **Comando:** Monte o mapa erro → defeito → falha dessa situação e diga qual técnica (caixa branca ou caixa preta) e qual nível da pirâmide teriam encontrado o problema mais cedo.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C3
- **Contexto:** A suíte da Loja Nuvem Azul tem 80% de testes de ponta a ponta, demora 2 horas e falha "do nada" em 1 de cada 5 execuções.
- **Comando:** Explique o problema (cone de sorvete), proponha uma nova distribuição pela pirâmide de testes e classifique onde ficariam os testes de: `calcularDesconto()`, formulário de login com API simulada e fluxo login → carrinho → pagamento.
- **Linhas:** 6

### ITEM 5
- **Capacidade:** C2
- **Contexto:** Com o prazo apertado, o gerente sugere pular os testes automatizados e fazer só testes manuais rápidos na véspera do lançamento. Ao rodar a suíte, você percebe que uma alteração sua quebrou o cálculo de parcelas.
- **Comando:** Argumente sobre os riscos técnicos e financeiros de pular os testes (use a regra de 10) e descreva a atitude responsável diante do defeito que você mesmo causou.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C1, C2
- **Contexto:** Para revisar a aula, a turma vai trocar questões de múltipla escolha sobre verificação, validação e tipos de teste.
- **Comando:** Elabore duas questões de múltipla escolha (A a D) — uma sobre verificação × validação e outra sobre tipos de teste —, indicando a alternativa correta e explicando por que as outras estão erradas.
- **Linhas:** 8

## Resumo

- **Qualidade** = atender aos requisitos e às expectativas do usuário; testar é responsabilidade de toda a equipe.
- **Erro** (ação humana) gera **defeito** (no código), que aparece como **falha** (no uso).
- **Verificação:** construímos o produto certo conforme a especificação? **Validação:** é o produto que o usuário precisa?
- **Tipos de teste:** funcionalidade, usabilidade, confiabilidade, desempenho e manutenibilidade; técnicas de **caixa preta** e **caixa branca**.
- **Pirâmide:** muitos unitários, alguns de integração, poucos E2E; evite o cone de sorvete e os testes intermitentes.
- Bons testes são assertivos, repetíveis e independentes (padrão **AAA**); relatar defeitos com honestidade é parte do trabalho.

## Glossário

- **Verificação:** construímos o produto certo conforme a especificação?
- **Validação:** é o produto que o usuário precisa?
- **Qualidade:** conformidade do sistema com os requisitos e as expectativas dos usuários.
- **Erro:** ação humana equivocada que introduz um defeito.
- **Defeito:** imperfeição no código ou na especificação (bug).
- **Falha:** comportamento incorreto do sistema percebido durante o uso.
- **Pirâmide de testes:** modelo que equilibra muitos testes unitários, alguns de integração e poucos E2E.
- **Teste unitário:** teste rápido e isolado de uma função ou regra.
- **Padrão AAA:** estrutura de teste em três etapas: preparar (Arrange), executar (Act) e conferir (Assert).
- **Regra de 10:** o custo de corrigir um defeito cresce cerca de 10 vezes a cada etapa em que ele avança.
