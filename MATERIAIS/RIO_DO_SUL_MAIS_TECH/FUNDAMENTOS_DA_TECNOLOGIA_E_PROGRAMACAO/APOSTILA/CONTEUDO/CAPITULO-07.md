# Capítulo 07 — Algoritmos, Fluxogramas e Primeiros Passos no Scratch

- **Aula:** 07
- **Capacidade:** C3, C4, C5

## Teoria

### Do papel para a tela

Antes de programar, todo programador **pensa no papel**: escreve o algoritmo e desenha o
fluxograma. Só depois passa para o computador. Neste capítulo você faz esse caminho completo e cria
o seu primeiro programa no **Scratch**.

> 🎯 **Objetivos do capítulo:** usar sequência, decisão e repetição em algoritmos, desenhar
> fluxogramas, conhecer a interface do Scratch e criar um programa que pergunta e responde.

### As três estruturas dos algoritmos

| Estrutura | O que faz | Exemplo: de casa até a escola |
|---|---|---|
| **Sequência** | Passos executados um depois do outro | Sair de casa → caminhar até o ponto → pegar o ônibus |
| **Decisão (condicional)** | Escolhe um caminho conforme uma condição | **Se** o sinal estiver vermelho, **então** esperar; **senão**, atravessar |
| **Repetição (laço)** | Repete passos enquanto algo for verdade ou um número de vezes | **Repita** "andar um quarteirão" **até** chegar à esquina da escola |

📝 **Algoritmo: ir de casa até a escola**

1. Início.
2. Pegar a mochila.
3. Sair de casa.
4. Repita "andar um quarteirão" até chegar à avenida.
5. Se o sinal estiver vermelho, esperar; senão, atravessar.
6. Andar até o portão da escola.
7. Fim.

### Fluxogramas

O **fluxograma** é o desenho do algoritmo com símbolos padronizados:

| Símbolo | Forma | Uso |
|---|---|---|
| Terminal | Oval | Início e fim |
| Processo | Retângulo | Uma ação ("pegar a mochila") |
| Decisão | Losango | Pergunta com sim/não ("sinal vermelho?") |
| Entrada/saída | Paralelogramo | Ler ou mostrar dados ("ler o nome") |
| Fluxo | Seta | Indica o próximo passo |

```
( Início ) → [ Pegar mochila ] → < Sinal vermelho? > —sim→ [ Esperar ] ↺ volta à pergunta
                                         |não
                                         ↓
                                 [ Atravessar ] → ( Fim )
```

🔍 **Exemplo:** na **TecVale**, o atendimento segue um fluxograma: "O cliente tem cadastro?" —
**sim**, abrir o chamado; **não**, cadastrar primeiro e depois abrir o chamado.

### Achando erros em algoritmos

Algoritmo de "fazer café" com erros:

1. Coar o café. ← fora de ordem: ainda não tem água quente
2. Esquentar a água.
3. Se tiver açúcar, adoçar. ← falta o "senão" (e se não tiver?)
4. Repita "mexer". ← repetição sem fim: mexer até quando?

Algoritmo corrigido: esquentar a água → colocar o pó no filtro → despejar a água → **se** quiser
doce, adoçar, **senão**, servir puro → mexer **3 vezes** → servir.

### Scratch: a interface

O **Scratch** (scratch.mit.edu, online, ou instalado) programa com **blocos** que se encaixam.

| Parte | O que é |
|---|---|
| **Palco** | Área onde a ação acontece |
| **Ator** | Personagem ou objeto que recebe os blocos (o gato é o ator padrão) |
| **Paleta de blocos** | Categorias coloridas: Movimento, Aparência, Som, Eventos, Controle, Sensores, Operadores, Variáveis |
| **Área de programação** | Onde os blocos são arrastados e encaixados |
| **Bandeira verde / sinal vermelho** | Começa e para o programa |

### Eventos e movimento

Um **evento** é uma ação que dispara os blocos. O mais comum é **"quando a bandeira verde for
clicada"**. Outros: "quando a tecla espaço for pressionada", "quando este ator for clicado".

Primeiro programa:

- quando a bandeira verde for clicada
- mova 10 passos
- gire 15 graus
- diga "Olá, turma!" por 2 segundos

### Entrada e saída no Scratch

- **Entrada:** o bloco **"pergunte ... e espere"** mostra uma pergunta e guarda o que o usuário
  digitou no bloco **resposta**.
- **Saída:** o bloco **"diga"** mostra o resultado no balão do ator.

Programa que pergunta e responde:

- quando a bandeira verde for clicada
- pergunte "Qual é o seu nome?" e espere
- diga (junte "Olá, " com resposta) por 2 segundos

## Exercícios

### ITEM 1
- **Capacidade:** C4
- **Contexto:** Você precisa ensinar um colega novo a ir da sua casa até a escola.
- **Comando:** Escreva o algoritmo em passos numerados com pelo menos uma decisão e uma repetição, marcando cada uma.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C4
- **Contexto:** O algoritmo do ITEM 1 precisa ser apresentado de forma visual para a turma.
- **Comando:** Desenhe o fluxograma usando os símbolos corretos (oval, retângulo, losango e setas) e indique o caminho do "sim" e do "não".
- **Linhas:** 8

### ITEM 3
- **Capacidade:** C3
- **Contexto:** Um algoritmo diz: "1. Servir o café. 2. Coar o café. 3. Esquentar a água. 4. Repita mexer."
- **Comando:** Aponte os erros de sequência e de repetição e reescreva o algoritmo corrigido.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C3
- **Contexto:** Você abriu o Scratch pela primeira vez no laboratório.
- **Comando:** Explique para que servem o palco, o ator, a paleta de blocos e a bandeira verde.
- **Linhas:** 4

### ITEM 5
- **Capacidade:** C5
- **Contexto:** A TecVale quer um programa de boas-vindas no Scratch para a feira de tecnologia: ele pergunta o nome do visitante e responde com uma saudação.
- **Comando:** Escreva os blocos do programa, na ordem, e indique qual bloco é a entrada e qual é a saída de dados.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C4, C5
- **Contexto:** O programa de boas-vindas deve perguntar também a idade e dizer "Você pode participar da oficina de robótica" se a idade for 15 ou mais; senão, "Venha conhecer a oficina de Scratch".
- **Comando:** Desenhe o fluxograma desse programa, com a entrada, a decisão e as duas saídas.
- **Linhas:** 8

## Resumo

- Algoritmos usam três estruturas: **sequência**, **decisão** (se... então... senão) e **repetição** (repita).
- O **fluxograma** desenha o algoritmo: oval (início/fim), retângulo (ação), losango (decisão), paralelogramo (entrada/saída) e setas.
- Achar e corrigir erros de ordem, de decisão e de repetição faz parte de programar.
- No **Scratch**, os blocos se encaixam no ator; o **evento** "bandeira verde" inicia o programa.
- **"Pergunte e espere"** recebe a entrada do usuário e **"diga"** mostra a saída.

## Glossário

- **Fluxograma:** desenho que mostra os passos de um algoritmo com símbolos
- **Evento (Scratch):** ação que dispara um bloco, como clicar na bandeira verde
- **Sequência:** passos de um algoritmo executados um depois do outro.
- **Decisão (condicional):** estrutura que escolhe um caminho conforme uma condição (se... então... senão).
- **Repetição (laço):** estrutura que repete passos várias vezes ou até uma condição.
- **Scratch:** linguagem de programação em blocos criada pelo MIT.
- **Ator:** personagem ou objeto do Scratch que recebe os blocos.
- **Palco:** área do Scratch onde a ação acontece.
- **Bloco:** peça de comando do Scratch que se encaixa em outras.
- **Entrada e saída de dados:** o que o programa recebe do usuário e o que mostra para ele.
