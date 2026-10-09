# Padrão de Resposta — Atividade Prática — Aula 03 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: não publicar nem versionar. O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado.
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** o código/valores certos **e** a justificativa, quando o
   tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do tema,
   código que não testa o pedido ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** test no lugar de it; nomes de testes e variáveis diferentes;
   aspas simples ou duplas; ponto e vírgula opcional; import com ou sem a extensão .js;
   toStrictEqual no lugar de toEqual; await expect(...).resolves quando correto; pequenos erros de
   digitação que não mudam o sentido do código.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** Teste automatizado é um **programa que testa outro programa**: prepara os dados, executa o código e **compara o resultado com o esperado**, automaticamente.
**Critérios:** Palavras-chave: programa que testa programa; executa; compara com o esperado. Nota cheia (0,2): definição completa. Metade (0,1): "teste feito pelo computador" sem a comparação. Zero (0): teste manual.

### ITEM 01-b
**Resposta esperada:** O teste unitário verifica a **menor parte do código isoladamente** (uma função ou módulo), **sem banco, sem rede e sem navegador**. Fica na **base da pirâmide** porque é **rápido e barato**: dá para ter **muitos** e rodá-los a todo momento.
**Critérios:** Palavras-chave: menor parte/função isolada; sem banco, rede, navegador; base; rápido, barato, muitos. Nota cheia (0,4): definição + o que não usa + motivo da base. Metade (0,2): duas das três partes. Zero (0): confunde com E2E.

### ITEM 01-c
**Resposta esperada:** Teste de regressão é o que **avisa quando uma alteração quebra algo que já funcionava**. Se existissem testes do cálculo do frete, ao alterar o carrinho a equipe rodaria a suíte (em segundos) e **o teste do frete falharia na hora**, antes da publicação, em vez de passar despercebido.
**Critérios:** Palavras-chave: quebra o que funcionava; roda a cada alteração; falharia antes de publicar. Nota cheia (0,4): definição + aplicação ao caso do frete. Metade (0,2): só definição ou só aplicação. Zero (0): sem relação com regressão.

### ITEM 02-a
**Resposta esperada:** **Vitest**, porque é **rápido**, **compatível com a sintaxe do Jest** e **já integrado a projetos Vite/React** (usa a mesma configuração do Vite).
**Critérios:** Palavras-chave: Vitest; rápido; compatível com Jest; integrado ao Vite. Nota cheia (0,2): Vitest + pelo menos dois motivos. Metade (0,1): Vitest com um motivo. Zero (0): outra ferramenta.

### ITEM 02-b
**Resposta esperada:** **Vitest:** executa testes JS/TS com asserções, mocks e cobertura — **unitário e integração**. **Jest:** alternativa com API quase igual — **unitário e integração**. **Testing Library:** testa componentes pelo que o usuário vê — **integração** (aula 4). **Cypress/Playwright:** controlam o navegador real — **E2E** (aula 6).
**Critérios:** Palavras-chave: função e camada de cada ferramenta. Nota cheia (0,4): as quatro corretas. Metade (0,2): duas ou três corretas. Zero (0): uma ou nenhuma.

### ITEM 02-c
**Resposta esperada:** O Jest é a **alternativa mais antiga, com API quase igual** à do Vitest (describe, it, expect, matchers). Quem conhece o Jest **aproveita quase tudo**: muda principalmente o import (vitest) e o mock (**vi.fn** no lugar de jest.fn).
**Critérios:** Palavras-chave: mais antigo; API quase igual; reaproveita; vi.fn × jest.fn ou import. Nota cheia (0,4): relação + o que muda. Metade (0,2): só a relação. Zero (0): diz que são ferramentas sem relação ou que Jest é E2E.

### ITEM 03-a
**Resposta esperada:** **npm init -y** e **npm install -D vitest**.
**Critérios:** Palavras-chave: npm init -y; npm install -D (ou --save-dev) vitest. Nota cheia (0,2): os dois comandos. Metade (0,1): um comando. Zero (0): nenhum correto.

### ITEM 03-b
**Resposta esperada:** **npm pkg set scripts.test="vitest" scripts.test:run="vitest run"** (aceitar também editar o package.json à mão com os dois scripts). **npm test** roda em **modo observação** (repete os testes a cada arquivo salvo); **npm run test:run** **roda uma vez e termina**.
**Critérios:** Palavras-chave: scripts test = vitest e test:run = vitest run; observação × uma vez. Nota cheia (0,4): scripts + diferença. Metade (0,2): só scripts ou só diferença. Zero (0): diferença invertida.

### ITEM 03-c
**Resposta esperada:** O teste fica em **src/utils/frete.test.js** (ao lado do arquivo, com .test.js). No CI usa-se **npm run test:run** (rodar uma vez), porque o CI precisa que o comando **termine e devolva o resultado** (passou/falhou); o modo observação ficaria esperando para sempre.
**Critérios:** Palavras-chave: frete.test.js; test:run/vitest run no CI; precisa terminar. Nota cheia (0,4): caminho + modo + motivo. Metade (0,2): dois dos três. Zero (0): modo observação no CI.

### ITEM 04-a
**Resposta esperada:** **Arrange** = preparar os dados e o cenário; **Act** = executar o código testado; **Assert** = conferir o resultado com o esperado.
**Critérios:** Palavras-chave: preparar; agir/executar; conferir. Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 04-b
**Resposta esperada:** **Arrange:** const subtotal = 198.99 (prepara o dado de entrada). **Act:** const frete = calcularFrete(subtotal) (executa a função). **Assert:** expect(frete).toBe(19.9) (confere com o esperado).
**Critérios:** Palavras-chave: cada linha na parte certa com o papel. Nota cheia (0,4): as três linhas certas com papel. Metade (0,2): linhas certas sem papel, ou duas certas. Zero (0): partes trocadas.

### ITEM 04-c
**Resposta esperada:**
it('dá frete grátis com subtotal de 250', () => { // Arrange: const subtotal = 250; // Act: const frete = calcularFrete(subtotal); // Assert: expect(frete).toBe(0); });
**Critérios:** Palavras-chave: it/test; subtotal 250; calcularFrete; expect(...).toBe(0); comentários das três partes. Nota cheia (0,4): teste correto com resultado 0 e as três partes marcadas. Metade (0,2): teste correto sem marcar as partes, ou partes marcadas com resultado errado. Zero (0): resultado 19.9 ou sem expect.

### ITEM 05-a
**Resposta esperada:** **describe** agrupa os testes de uma unidade; **it** (ou test) é um caso de teste; **expect** recebe o valor obtido e, com o matcher, confere com o esperado.
**Critérios:** Palavras-chave: agrupar; caso de teste; conferir. Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 05-b
**Resposta esperada:** import { describe, it, expect } from 'vitest'; import { calcularFrete } from './frete.js'; describe('calcularFrete', () => { it('cobra 19,90 abaixo de 199', () => { expect(calcularFrete(198.99)).toBe(19.9); }); it('dá frete grátis a partir de 199', () => { expect(calcularFrete(199)).toBe(0); }); it('recusa subtotal negativo', () => { expect(() => calcularFrete(-1)).toThrow('Subtotal inválido'); }); });
**Critérios:** Palavras-chave: imports; describe; três it; toBe(19.9); toBe(0); toThrow com função. Nota cheia (0,4): arquivo completo com os três testes corretos. Metade (0,2): falta o import ou um dos testes, ou toThrow sem a função anônima. Zero (0): menos de dois testes corretos.

### ITEM 05-c
**Resposta esperada:** O nome descreve o **comportamento esperado** (como um caso de teste: "dá frete grátis a partir de 199"). Independente = **não depende da ordem nem do resultado de outro teste**. Se dependesse, **um teste falharia por causa de outro**, o resultado mudaria conforme a ordem e ficaria difícil achar a causa real (teste instável).
**Critérios:** Palavras-chave: comportamento esperado; não depende da ordem/de outro; falha em cascata/instável. Nota cheia (0,4): nome + independência + consequência. Metade (0,2): dois dos três. Zero (0): diz que os testes devem depender uns dos outros.

### ITEM 06-a
**Resposta esperada:** (1) **toBe**; (2) **toEqual**; (3) **toBeCloseTo**; (4) **toContain**; (5) **toThrow**.
**Critérios:** Palavras-chave: os cinco matchers. Nota cheia (0,2): 5 ou 4 corretos. Metade (0,1): 2 ou 3. Zero (0): 0 ou 1.

### ITEM 06-b
**Resposta esperada:** (1) expect(total).toBe(10); (2) expect(item).toEqual({ id: 1, qtd: 2 }); (3) expect(0.1 + 0.2).toBeCloseTo(0.3); (4) expect(lista).toContain('Teclado'); (5) expect(() => calcularFrete(-1)).toThrow().
**Critérios:** Palavras-chave: cinco linhas completas e corretas. Nota cheia (0,4): 5 ou 4 corretas. Metade (0,2): 2 ou 3. Zero (0): 0 ou 1.

### ITEM 06-c
**Resposta esperada:** toBe(0) é **mais específico**: diz **exatamente o valor esperado**; toBeFalsy aceitaria também null, undefined, false ou "" e esconderia um defeito. O toThrow precisa de uma **função** porque o expect tem de **executar a chamada e capturar o erro**; se chamar calcularFrete(-1) direto, o erro estoura antes do expect e o teste quebra.
**Critérios:** Palavras-chave: mais específico; toBeFalsy aceita outros valores; função para capturar o erro. Nota cheia (0,4): as duas explicações. Metade (0,2): uma explicação. Zero (0): nenhuma coerente.

### ITEM 07-a
**Resposta esperada:** **3 caminhos:** subtotal **negativo** (erro), subtotal **abaixo de 199** (19.9) e subtotal **a partir de 199** (0).
**Critérios:** Palavras-chave: 3; negativo; abaixo de 199; a partir de 199. Nota cheia (0,2): número e os três caminhos. Metade (0,1): só o número ou dois caminhos. Zero (0): número errado sem caminhos.

### ITEM 07-b
**Resposta esperada:** expect(calcularFrete(198.99)).toBe(19.9); expect(calcularFrete(199)).toBe(0); expect(calcularFrete(199.01)).toBe(0);
**Critérios:** Palavras-chave: 198.99 → 19.9; 199 → 0; 199.01 → 0. Nota cheia (0,4): os três corretos. Metade (0,2): dois corretos. Zero (0): um ou nenhum.

### ITEM 07-c
**Resposta esperada:** **3 testes:** (1) if de fora **falso**; (2) if de fora verdadeiro e if de dentro **verdadeiro**; (3) if de fora verdadeiro e if de dentro **falso** (else). São 3 caminhos possíveis, e cada caminho precisa de pelo menos um teste.
**Critérios:** Palavras-chave: 3; os três caminhos; um teste por caminho. Nota cheia (0,4): número + caminhos justificados. Metade (0,2): número certo sem justificar, ou justificativa com 4 testes coerente. Zero (0): 1 ou 2 testes.

### ITEM 08-a
**Resposta esperada:** O mutante "sobreviveu" porque **o código ficou errado e todos os testes continuaram passando**: a suíte **não detectou o defeito**.
**Critérios:** Palavras-chave: código errado; testes passaram; não detectou. Nota cheia (0,2): ideia completa. Metade (0,1): só "os testes passaram". Zero (0): diz que é bom sinal.

### ITEM 08-b
**Resposta esperada:** 50 e 500 estão **longe da borda**: com >= ou com >, 50 continua pagando e 500 continua grátis. Só o **valor-limite 199** muda: com >= é grátis (0) e com > passa a cobrar 19.9.
**Critérios:** Palavras-chave: longe do limite; resultado igual com os dois operadores; 199 revela. Nota cheia (0,4): explicação + valor 199. Metade (0,2): só o valor 199 ou só a explicação. Zero (0): outro valor sem justificativa.

### ITEM 08-c
**Resposta esperada:** it('dá frete grátis com subtotal exatamente 199', () => { expect(calcularFrete(199)).toBe(0); }); — com o mutante, recebe 19.9 e **falha** (o mutante "morre"). A dinâmica ensina que **um teste só tem valor se falha quando o código está errado**.
**Critérios:** Palavras-chave: teste com 199 esperando 0; falha com o mutante; teste só vale se falha com código errado. Nota cheia (0,4): teste + lição. Metade (0,2): só o teste ou só a lição. Zero (0): teste que não usa 199.

### ITEM 09-a
**Resposta esperada:** Mock é um **substituto controlado** de uma dependência, que **devolve o que o teste precisa e registra como foi chamado**. A API real deixaria o teste **lento, instável** (rede, servidor fora) e **deixaria de testar só a unidade**.
**Critérios:** Palavras-chave: substituto controlado; registra chamadas; lento/instável; isolar a unidade. Nota cheia (0,2): definição + motivo. Metade (0,1): só um dos dois. Zero (0): mock = API real.

### ITEM 09-b
**Resposta esperada:** it('devolve o token quando a API aceita', async () => { const clienteFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ token: 'token-de-teste' }) }); const resultado = await entrar('teste@loja.local', 'Senha123', clienteFalso); expect(resultado).toEqual({ sucesso: true, token: 'token-de-teste' }); expect(clienteFalso).toHaveBeenCalledWith('/api/login', expect.any(Object)); });
**Critérios:** Palavras-chave: vi.fn().mockResolvedValue com ok true e json; await entrar com o mock; toEqual com sucesso e token; toHaveBeenCalledWith('/api/login', ...). Nota cheia (0,4): os quatro elementos. Metade (0,2): falta a conferência da chamada ou o await, ou o json do mock. Zero (0): usa fetch real ou sem mock.

### ITEM 09-c
**Resposta esperada:** it('indica falha quando a API recusa', async () => { const clienteFalso = vi.fn().mockResolvedValue({ ok: false }); const resultado = await entrar('teste@loja.local', 'errada', clienteFalso); expect(resultado.sucesso).toBe(false); }); Receber o cliente por parâmetro (**injeção de dependência**) deixa o teste **trocar o fetch real pelo mock**. Recriar os mocks no **beforeEach** dá **mocks novos antes de cada teste**, garantindo o **isolamento** (um teste não herda chamadas do outro).
**Critérios:** Palavras-chave: mock com ok false; sucesso false; injeção = trocar pelo mock; beforeEach = isolamento. Nota cheia (0,4): teste + as duas explicações. Metade (0,2): teste sem explicações, ou explicações sem teste correto. Zero (0): nada coerente.

### ITEM 10-a
**Resposta esperada:** Os testes **mostram o defeito** (falham com o código atual) e depois **protegem a correção**: dá para alterar o código **sem medo de quebrar outros casos**, porque a suíte avisa.
**Critérios:** Palavras-chave: mostram o defeito; protegem/regressão; corrigir com segurança. Nota cheia (0,2): as duas ideias. Metade (0,1): uma. Zero (0): sem justificativa.

### ITEM 10-b
**Resposta esperada:** **0%:** aplicarCupom(100, 0) → 100. **15%:** aplicarCupom(100, 15) → 85. **100%:** aplicarCupom(100, 100) → 0. **Negativo:** aplicarCupom(100, -10) → **lança erro**. **Centavos:** aplicarCupom(99.90, 15) → **84.915 (≈ 84,92)**, conferido com toBeCloseTo. (Aceitar outros totais com resultados coerentes.)
**Critérios:** Palavras-chave: cinco casos com entrada e resultado; erro no negativo. Nota cheia (0,4): 5 ou 4 casos corretos. Metade (0,2): 2 ou 3. Zero (0): 0 ou 1.

### ITEM 10-c
**Resposta esperada:** it('aplica 15% em total com centavos', () => { expect(aplicarCupom(99.90, 15)).toBeCloseTo(84.915); }); O **toBeCloseTo** é necessário porque **contas com casas decimais em JavaScript têm imprecisão** (ex.: 0.1 + 0.2 = 0.30000000000000004); o toBe compararia o valor exato e **falharia mesmo com a conta certa**.
**Critérios:** Palavras-chave: toBeCloseTo; valor esperado coerente; imprecisão de ponto flutuante; toBe falharia. Nota cheia (0,4): teste + justificativa. Metade (0,2): teste sem justificativa, ou justificativa com teste usando toBe. Zero (0): sem teste nem justificativa.
