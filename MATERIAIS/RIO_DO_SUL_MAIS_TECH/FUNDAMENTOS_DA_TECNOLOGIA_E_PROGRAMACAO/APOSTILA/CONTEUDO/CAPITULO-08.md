# Capítulo 08 — Scratch: Condições, Repetições, Variáveis e Projeto Autoral

- **Aula:** 08
- **Capacidade:** C3, C4, C5, C6

## Teoria

### Seu primeiro jogo

Todo jogo que você conhece tem **regras** (se tocar no inimigo, perde uma vida), **repetição** (o
jogo continua rodando) e **memória** (pontos, vidas, fase). No Scratch, isso vira **condições**,
**repetições** e **variáveis**. Neste capítulo você monta um jogo completo e cria o seu **projeto
autoral**.

> 🎯 **Objetivos do capítulo:** usar condições e repetições, criar variáveis de pontos e vidas,
> planejar, programar e testar um jogo ou história e explicar cada bloco usado.

### Condições

O bloco **"se < > então ... senão ..."** escolhe o que fazer. A condição (o espaço hexagonal) vem de:

- **Sensores:** "tocando em [Maçã]?", "tecla [espaço] pressionada?", "tocando na cor [vermelho]?";
- **Operadores:** `pontos > 10`, `vidas = 0`, `resposta = "sim"`.

### Repetições

| Bloco | Uso |
|---|---|
| **repita 10 vezes** | Repete um número exato de vezes (andar 10 passos de 1 em 1) |
| **sempre** | Repete sem parar — mantém o jogo verificando teclas e toques |
| **repita até < >** | Repete até a condição ficar verdadeira (até vidas = 0) |

### Variáveis

Uma **variável** guarda um valor que muda durante o programa. Em **Variáveis → Criar uma variável**:

| Bloco | O que faz |
|---|---|
| mude [pontos] para 0 | Começa o jogo com 0 pontos |
| adicione 1 a [pontos] | Soma 1 ponto |
| adicione -1 a [vidas] | Tira 1 vida |
| mostre a variável [pontos] | Exibe o placar no palco |

### Mini jogo: pegue a maçã

**Gato (jogador):**

- quando a bandeira verde for clicada
- mude [pontos] para 0 · mude [vidas] para 3
- sempre
  - se tecla [seta para direita] pressionada, então mude x por 10
  - se tecla [seta para esquerda] pressionada, então mude x por -10

**Maçã:**

- quando a bandeira verde for clicada
- sempre
  - vá para x: (número aleatório entre -200 e 200) y: 180
  - repita até < (tocando em Gato?) ou (y < -170) >: mude y por -5
  - se tocando em [Gato], então adicione 1 a [pontos]; senão, adicione -1 a [vidas]
  - se vidas = 0, então diga "Fim de jogo!" e pare tudo

🔑 **Ponto-chave:** **evento** inicia, **repetição** mantém o jogo vivo, **condição** aplica as regras
e **variável** guarda o placar.

### Animações, jogos e histórias interativas

| Tipo | Ingredientes |
|---|---|
| **Animação** | Troca de fantasias ("próxima fantasia"), movimento e espera |
| **Jogo** | Objetivo, regras, pontos, vidas, fases e fim |
| **História interativa** | Cenários, diálogos ("diga"), escolhas do usuário ("pergunte e espere") |

### Projeto autoral: do papel ao palco

1. **Ideia:** o que o projeto faz e para quem.
2. **Roteiro no papel:** atores, cenários, regras e fim.
3. **Programação:** um ator por vez, testando a cada bloco.
4. **Teste e correção:** jogue, ache erros e corrija.
5. **Apresentação:** mostre o projeto e **explique cada bloco**.

🔍 **Exemplo:** a **TecVale** fez um jogo de treinamento: o jogador ganha pontos ao separar o lixo
eletrônico corretamente e perde vidas quando erra; com 10 pontos, passa de fase.

**Rubrica do projeto:** funcionamento, criatividade, uso de condição e repetição e explicação oral.

## Vídeos

- ⏳ Vídeos pendentes: escolher de 1 a 4 vídeos de até 15 min e conferir localmente a duração (TASKS.md #12).

## Exercícios

### ITEM 1
- **Capacidade:** C3
- **Contexto:** No seu jogo, o gato deve ganhar um ponto quando tocar na maçã.
- **Comando:** Escreva os blocos dessa regra, indicando qual é o evento, a repetição, a condição e a variável.
- **Linhas:** 5

### ITEM 2
- **Capacidade:** C4
- **Contexto:** O jogo deve acabar quando as vidas chegarem a zero.
- **Comando:** Explique qual bloco de repetição e qual condição você usaria e por que o bloco "sempre" sozinho não resolve.
- **Linhas:** 4

### ITEM 3
- **Capacidade:** C5
- **Contexto:** Você quer um jogo de perguntas no Scratch: o programa faz 3 perguntas e soma 1 ponto em cada acerto.
- **Comando:** Escreva os blocos da primeira pergunta (entrada, condição, variável de pontos e saída com o resultado).
- **Linhas:** 6

### ITEM 4
- **Capacidade:** C6
- **Contexto:** O professor pediu um projeto autoral: um jogo ou uma história interativa.
- **Comando:** Escreva o roteiro do seu projeto: ideia, atores, cenário, regras (ou escolhas) e como termina.
- **Linhas:** 6

### ITEM 5
- **Capacidade:** C3, C6
- **Contexto:** Crie um jogo em que o jogador ganha pontos e perde vidas.
- **Comando:** Explique cada bloco usado no seu jogo (evento, repetição, condição e variáveis) e diga qual regra original você inventou.
- **Linhas:** 6

### ITEM 6
- **Capacidade:** C4
- **Contexto:** Ao testar o jogo, a maçã cai e o placar nunca aumenta, mesmo quando o gato a pega.
- **Comando:** Liste duas causas prováveis do erro nos blocos e como você testaria e corrigiria cada uma.
- **Linhas:** 4

## Resumo

- **Condições** (se... então... senão) usam sensores e operadores para aplicar as regras.
- **Repetições**: "repita N vezes", "sempre" e "repita até" mantêm o programa funcionando.
- **Variáveis** guardam valores que mudam, como pontos, vidas e fase.
- Um jogo junta **evento + repetição + condição + variável**.
- Projeto autoral: ideia → roteiro no papel → programação → teste → apresentação explicando cada bloco.

## Glossário

- **Variável:** espaço nomeado que guarda um valor mutável
- **Condição:** pergunta de verdadeiro ou falso que decide o que o programa faz.
- **Sensor:** bloco do Scratch que verifica toques, teclas, cores e distâncias.
- **Operador:** bloco que compara ou calcula valores (>, <, =, +).
- **Laço infinito:** repetição sem fim, como o bloco "sempre".
- **Fantasia:** aparência de um ator do Scratch; trocar fantasias cria animação.
- **Projeto autoral:** projeto criado com uma ideia original do próprio aluno.
- **Depuração:** encontrar e corrigir erros em um programa.
- **Placar:** exibição dos pontos e vidas no palco.
- **Roteiro:** planejamento escrito do projeto antes de programar.
