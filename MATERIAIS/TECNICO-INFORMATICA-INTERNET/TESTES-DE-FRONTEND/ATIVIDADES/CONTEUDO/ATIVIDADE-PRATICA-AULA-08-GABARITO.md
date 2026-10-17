# Padrão de Resposta — Atividade Prática — Aula 08 — Testes de Front-End (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: TDD e Debugging Moderno no Front-End.
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
**Resposta esperada:** No **TDD (Test-Driven Development, desenvolvimento guiado por testes)** o teste é escrito **antes do código**: o teste descreve o próximo comportamento desejado e o código só existe para fazê-lo passar.
**Critérios:** Palavras-chave: teste antes do código; teste descreve o comportamento. Nota cheia (0,2): definição com "antes". Metade (0,1): "desenvolver com testes" sem dizer quando. Zero (0): diz que o teste é escrito no fim.

### ITEM 01-b
**Resposta esperada:** 🔴 **Vermelho:** escrever **um** teste que falha — termina quando o Vitest mostra a falha **pelo motivo esperado**. 🟢 **Verde:** escrever o **mínimo** de código para passar — termina com **todos os testes verdes**. 🔵 **Refatorar:** melhorar nomes, tirar duplicação, extrair funções — termina quando **continua tudo verde**.
**Critérios:** Palavras-chave: um teste que falha pelo motivo esperado; mínimo de código; todos verdes; refatorar sem quebrar. Nota cheia (0,4): as três fases com o que fazer e quando terminam. Metade (0,2): as três fases sem o critério de término, ou fora de ordem. Zero (0): fases erradas.

### ITEM 01-c
**Resposta esperada:** npx vitest (modo observação). Ele **roda os testes de novo a cada arquivo salvo**, então a resposta (vermelho ou verde) chega **em segundos**, sem precisar digitar comando, e o ciclo continua **curto (minutos)**.
**Critérios:** Palavras-chave: npx vitest (sem run); roda a cada arquivo salvo; resposta rápida/ciclo curto. Nota cheia (0,4): comando + explicação. Metade (0,2): só o comando ou só a explicação. Zero (0): npx vitest run como modo observação, sem explicação.

### ITEM 02-a
**Resposta esperada:** Na **regra que valida o CPF** (lógica com comportamento verificável).
**Critérios:** Palavras-chave: validação do CPF. Nota cheia (0,2): tarefa certa. Metade (0,1): as duas tarefas. Zero (0): só as cores do botão.

### ITEM 02-b
**Resposta esperada:** 1) O código **já nasce testado**. 2) O projeto fica **simples**: só o necessário para os testes passarem. 3) O teste serve de **documentação do comportamento**.
**Critérios:** Palavras-chave: nasce testado; simples/só o necessário; documentação. Nota cheia (0,4): as três vantagens. Metade (0,2): duas. Zero (0): uma ou nenhuma.

### ITEM 02-c
**Resposta esperada:** Cores, espaçamentos e layout **não têm um resultado que um teste automatizado descreva bem antes do código** (o "certo" é visual e depende de quem olha). Eles são conferidos **visualmente** e com **testes de acessibilidade** (por exemplo, contraste), não com TDD.
**Critérios:** Palavras-chave: resultado visual; conferência visual; testes de acessibilidade. Nota cheia (0,4): motivo + como conferir. Metade (0,2): só uma das partes. Zero (0): diz que layout se faz com TDD.

### ITEM 03-a
**Resposta esperada:** Falha porque **a função validarCPF (e o arquivo) ainda não existe**. Ver a falha **pelo motivo esperado** prova que o teste **realmente testa** o comportamento e que ele vai ficar verde por causa do código novo, e não por acaso.
**Critérios:** Palavras-chave: função não existe; motivo esperado prova que o teste testa algo. Nota cheia (0,2): motivo + importância. Metade (0,1): só o motivo. Zero (0): sem motivo correto.

### ITEM 03-b
**Resposta esperada:** import { describe, it, expect } from 'vitest'; import { validarCPF } from '../src/validarCPF.js'; describe('validarCPF', () => { it('rejeita valor vazio', () => { expect(validarCPF('')).toBe(false); }); });
**Critérios:** Palavras-chave: import do vitest; import de validarCPF de ../src/validarCPF.js; validarCPF('') com toBe(false). Nota cheia (0,4): arquivo completo. Metade (0,2): falta um dos imports ou o describe/it. Zero (0): sem expect.

### ITEM 03-c
**Resposta esperada:** export function validarCPF() { return false; } — É proposital porque o TDD pede o **mínimo de código** que faz o teste passar; o **próximo teste** (por exemplo, aceitar um CPF válido) é que **obriga o código a evoluir**. Assim, cada linha do código existe por causa de um teste.
**Critérios:** Palavras-chave: return false; mínimo; o próximo teste obriga a evoluir. Nota cheia (0,4): código + explicação. Metade (0,2): só o código ou só a explicação. Zero (0): escreve a validação completa sem explicar o mínimo.

### ITEM 04-a
**Resposta esperada:** Um entre: it('rejeita CPF com letras', () => { expect(validarCPF('529.982.247-2A')).toBe(false); }); — it('rejeita CPF com tamanho diferente de 11 dígitos', () => { expect(validarCPF('5299822472')).toBe(false); }); — it('rejeita CPF com todos os dígitos iguais', () => { expect(validarCPF('111.111.111-11')).toBe(false); });
**Critérios:** Palavras-chave: entrada inválida por letras, tamanho ou dígitos iguais; toBe(false). Nota cheia (0,2): teste correto. Metade (0,1): entrada certa sem verificação correta. Zero (0): espera true para entrada inválida.

### ITEM 04-b
**Resposta esperada:** it('aceita CPF com dígitos verificadores corretos', () => { expect(validarCPF('529.982.247-25')).toBe(true); }); it('rejeita CPF com dígito verificador errado', () => { expect(validarCPF('52998224726')).toBe(false); });
**Critérios:** Palavras-chave: 529.982.247-25 com toBe(true); 52998224726 com toBe(false). Nota cheia (0,4): os dois testes. Metade (0,2): só um. Zero (0): valores trocados.

### ITEM 04-c
**Resposta esperada:** Indica que o teste **não testava nada novo**: o comportamento já estava coberto pelos testes anteriores (ou o teste está errado e não falharia nunca). É preciso **rever o caso**: escolher uma entrada que exija código novo ou corrigir o teste para que ele falhe primeiro.
**Critérios:** Palavras-chave: não testava nada novo; rever o caso. Nota cheia (0,4): o que indica + o que fazer. Metade (0,2): só uma parte. Zero (0): diz que é ótimo e segue sem rever.

### ITEM 05-a
**Resposta esperada:** É o teste que **olha o código por dentro** (as condições e os caminhos) para escolher os casos, de modo que **cada caminho** seja exercitado por algum teste.
**Critérios:** Palavras-chave: olha o código/estrutura interna; caminhos/condições. Nota cheia (0,2): definição completa. Metade (0,1): "olha o código" sem falar dos caminhos. Zero (0): confunde com caixa preta.

### ITEM 05-b
**Resposta esperada:** it('aceita CPF que passa pelo caminho 11 - resto', () => { expect(validarCPF('111.444.777-35')).toBe(true); }); it('aceita CPF com primeiro dígito verificador 0', () => { expect(validarCPF('123.456.789-09')).toBe(true); });
**Critérios:** Palavras-chave: 111.444.777-35 com toBe(true); 123.456.789-09 com toBe(true). Nota cheia (0,4): os dois testes. Metade (0,2): só um. Zero (0): espera false nos dois.

### ITEM 05-c
**Resposta esperada:** Depois de cada verde, olhar o código mostra **condições cujo outro lado nenhum teste exercita** (por exemplo, um if só testado no lado verdadeiro). **Esse lado é o próximo teste**: assim a suíte cobre todos os caminhos e encontra defeitos escondidos nos desvios.
**Critérios:** Palavras-chave: if cujo outro lado não foi testado; esse é o próximo teste; cobrir todos os caminhos. Nota cheia (0,4): explicação completa. Metade (0,2): "para ter mais testes" sem falar do outro lado da condição. Zero (0): sem relação com o código.

### ITEM 06-a
**Resposta esperada:** 1) Sem texto digitado → **todos os produtos** aparecem. 2) Digitar **mouse** → só os produtos com "mouse" no título. 3) A busca **ignora maiúsculas e acentos** (TECLADO encontra "Teclado"). 4) **Categoria Periféricos + texto** → os dois filtros combinados. 5) Nada encontrado → mensagem **Nenhum produto encontrado**.
**Critérios:** Palavras-chave: todos sem texto; filtra por texto; maiúsculas e acentos; categoria + texto; mensagem de nada encontrado. Nota cheia (0,2): os cinco em ordem. Metade (0,1): três ou quatro. Zero (0): dois ou menos.

### ITEM 06-b
**Resposta esperada:** import { it, expect } from 'vitest'; import { screen } from '@testing-library/dom'; import userEvent from '@testing-library/user-event'; import { montarFiltro } from '../src/montarFiltro.js'; const PRODUTOS = [{ titulo: 'Mouse sem fio' }, { titulo: 'Teclado' }, { titulo: 'Mouse gamer' }]; it('digitar mouse mostra só os produtos com mouse no título', async () => { montarFiltro(document.body, PRODUTOS); await userEvent.type(screen.getByLabelText('Buscar'), 'mouse'); const itens = screen.getAllByRole('listitem'); expect(itens).toHaveLength(2); expect(itens[0]).toHaveTextContent('Mouse sem fio'); });
**Critérios:** Palavras-chave: montarFiltro com lista de produtos; userEvent.type no campo Buscar (getByLabelText ou getByRole('textbox', { name: 'Buscar' })); await; getAllByRole('listitem'); verificação da quantidade ou dos títulos. Nota cheia (0,4): teste completo. Metade (0,2): sem await, ou sem verificação da lista. Zero (0): sem digitar no campo.

### ITEM 06-c
**Resposta esperada:** it('mostra mensagem quando nada é encontrado', async () => { montarFiltro(document.body, PRODUTOS); await userEvent.type(screen.getByLabelText('Buscar'), 'monitor'); expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument(); expect(screen.queryAllByRole('listitem')).toHaveLength(0); }); — Os testes usam **o que o usuário vê** (papel, rótulo, texto) para **não quebrar** quando o código interno ou o HTML mudam sem mudar o comportamento, e para conferir o que **realmente importa ao usuário**.
**Critérios:** Palavras-chave: texto sem resultado; getByText('Nenhum produto encontrado'); toBeInTheDocument; o que o usuário vê; não quebra com mudança interna. Nota cheia (0,4): teste + explicação. Metade (0,2): só o teste ou só a explicação. Zero (0): nenhum dos dois.

### ITEM 07-a
**Resposta esperada:** O que foi **esperado e o que foi recebido** (expected true, received false) e **a linha do teste** que falhou (nome do teste e arquivo).
**Critérios:** Palavras-chave: esperado × recebido; linha/nome do teste. Nota cheia (0,2): as duas partes. Metade (0,1): só uma. Zero (0): nenhuma.

### ITEM 07-b
**Resposta esperada:** it.only('aceita CPF com dígitos verificadores corretos', () => { expect(validarCPF('529.982.247-25')).toBe(true); }); — O it.only roda **só aquele teste**; o describe.only roda **só aquele grupo** de testes.
**Critérios:** Palavras-chave: it.only no teste que falha; describe.only = só o grupo. Nota cheia (0,4): código + explicação do describe.only. Metade (0,2): só uma das partes. Zero (0): usa it.skip ou apaga os outros testes.

### ITEM 07-c
**Resposta esperada:** Com o teste isolado, a execução é **rápida** e a saída mostra **só aquela falha**, sem as mensagens dos outros 39 testes; cada mudança de investigação é conferida em segundos e a causa fica mais fácil de encontrar.
**Critérios:** Palavras-chave: execução rápida; saída só da falha; menos ruído. Nota cheia (0,4): explicação com velocidade e foco. Metade (0,2): só uma das ideias. Zero (0): sem explicação.

### ITEM 08-a
**Resposta esperada:** Marcar o **breakpoint** clicando ao lado do número da linha; abrir **Run and Debug** → **JavaScript Debug Terminal**; rodar **npx vitest run** nesse terminal. O código **para na linha marcada**.
**Critérios:** Palavras-chave: marcar a linha; JavaScript Debug Terminal; npx vitest run. Nota cheia (0,2): os passos. Metade (0,1): falta um passo. Zero (0): passos errados.

### ITEM 08-b
**Resposta esperada:** O breakpoint **para a execução** e mostra **o valor de cada variável** naquele momento (soma, resto, dígito). Parando no cálculo com um CPF cujo resto era **2**, você viu que a condição antiga (**resto <= 2**) dava **dígito 0**, quando o certo era **11 - 2 = 9**; por isso todo CPF com dígito 9 era recusado.
**Critérios:** Palavras-chave: para a execução; mostra valores das variáveis; resto 2; <= dá 0 no lugar de 9. Nota cheia (0,4): o que mostra + como revelou o defeito. Metade (0,2): só uma das partes. Zero (0): sem relação com o breakpoint.

### ITEM 08-c
**Resposta esperada:** Logo depois da ação que muda a tela e antes da verificação que falha: montarFiltro(document.body, PRODUTOS); await userEvent.type(screen.getByLabelText('Buscar'), 'mouse'); screen.debug(); — O screen.debug() **imprime no terminal o HTML atual** da tela do teste, mostrando o que o usuário "veria" naquele momento (quais itens a lista tem de verdade).
**Critérios:** Palavras-chave: depois da ação e antes do expect; imprime o HTML atual do DOM. Nota cheia (0,4): lugar certo + explicação. Metade (0,2): só uma das partes. Zero (0): diz que ele corrige o teste.

### ITEM 09-a
**Resposta esperada:** **Tirar o it.only** e **apagar o console.log** de depuração antes de entregar.
**Critérios:** Palavras-chave: tirar it.only; apagar console.log. Nota cheia (0,2): os dois. Metade (0,1): só um. Zero (0): manter os dois.

### ITEM 09-b
**Resposta esperada:** Com o it.only no repositório, **só aquele teste roda** e todos os outros são **pulados**, inclusive no pipeline: a suíte fica "verde" sem ter testado o resto do sistema, e defeitos novos **passam sem ninguém perceber**.
**Critérios:** Palavras-chave: só um teste roda; os outros são pulados; defeitos passam despercebidos/falso verde. Nota cheia (0,4): explicação completa. Metade (0,2): "só roda um teste" sem a consequência. Zero (0): diz que não muda nada.

### ITEM 09-c
**Resposta esperada:** **Corrigir e confirmar:** tirar o .only, **rodar a suíte inteira** e conferir que tudo está verde, depois **registrar a causa**. No relatório da entrega: **onde estava o defeito** (resto <= 2 no cálculo do dígito), **qual teste o revelou** e a tabela dos ciclos do TDD.
**Critérios:** Palavras-chave: tirar .only; rodar a suíte inteira; registrar a causa; onde estava o defeito e qual teste revelou. Nota cheia (0,4): passo final + registro. Metade (0,2): só uma das partes. Zero (0): entrega sem rodar a suíte.

### ITEM 10-a
**Resposta esperada:** Três entre: O nome do teste descreve o comportamento? O teste falharia se o código estivesse errado? Há casos de borda faltando? O teste depende de outro teste ou de dado externo? As queries seguem o comportamento visível? O que você aprendeu com este código?
**Critérios:** Palavras-chave: as perguntas do cartão do code review. Nota cheia (0,2): três perguntas. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 10-b
**Resposta esperada:** Exemplo: "Gostei de os testes estarem separados por ciclo. Que tal testar também um CPF com dígito verificador 0, como 123.456.789-09? Assim cobrimos o outro caminho do resto < 2." (Valem outras sugestões técnicas, desde que comecem por um ponto concreto e sejam respeitosas, por exemplo "Que tal…".)
**Critérios:** Palavras-chave: tom respeitoso (ex.: "Que tal…"); sugestão técnica concreta; fala do código, não da pessoa. Nota cheia (0,4): comentário respeitoso + sugestão concreta. Metade (0,2): respeitoso sem sugestão concreta, ou sugestão concreta com tom ofensivo. Zero (0): mantém a crítica pessoal.

### ITEM 10-c
**Resposta esperada:** Quem recebe avalia a sugestão pelo **fato técnico**, **não pela pessoa**, e responde **"aceito, porque…"** ou **"não vou aplicar, porque…"** com um argumento técnico. Isso **valoriza ideias diferentes** (S1): a sugestão é considerada pelo que ela melhora no código, e a equipe aprende com outros pontos de vista.
**Critérios:** Palavras-chave: fato técnico, não a pessoa; aceito porque / não vou aplicar porque; valoriza ideias diferentes. Nota cheia (0,4): como avaliar + como responder + valor das ideias. Metade (0,2): só uma ou duas partes. Zero (0): manda ignorar a sugestão.
