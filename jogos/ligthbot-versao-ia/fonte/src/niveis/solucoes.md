# Soluções de referência — níveis 01 a 10

Gabarito do projeto (não aparece para o aluno). Coordenadas (x, y); f: 0 N, 1 L, 2 S, 3 O.
Conferido passo a passo contra as guardas de WALK (altura da frente igual à atual) e JUMP
(frente = atual+1 ou menor, e > 0). Cada linha abaixo é um passo; "lâmpada" = lâmpada acesa nesse passo.

## Nível 01 — Primeiro giro
- MAIN: RIGHT, WALK, WALK, LIGHT (4 de 5)
- Passos: (0,0) f1 → RIGHT f2 → WALK (0,1) h1=1 ok → WALK (0,2) h1=1 ok → LIGHT em (0,2).
- Luzes finais: (0,2) acesa. Vitória no último passo.
- Limites: main 5, proc1 0, proc2 0. Comandos: WALK, LEFT, RIGHT, LIGHT.

## Nível 02 — Duas luzes em linha
- MAIN: WALK, WALK, LIGHT, WALK, WALK, LIGHT (6 de 7)
- Passos: (0,0) → WALK (1,0) ok → WALK (2,0) ok → LIGHT (2,0) → WALK (3,0) ok → WALK (4,0) ok → LIGHT (4,0).
- Luzes finais: (2,0) acesa, (4,0) acesa. Vitória no último passo.
- Limites: main 7, proc1 0, proc2 0. Comandos: WALK, LEFT, RIGHT, LIGHT.

## Nível 03 — Primeiro degrau
- MAIN: WALK, JUMP, WALK, WALK, LIGHT (5 de 6)
- Passos: (0,0) → WALK (1,0) h1=1 ok → JUMP (2,0) h2=1+1 ok → WALK (3,0) h2=2 ok → WALK (4,0) h2=2 ok → LIGHT (4,0).
- Luzes finais: (4,0) acesa. Vitória no último passo.
- Limites: main 6, proc1 0, proc2 0. Comandos: WALK, JUMP, LEFT, RIGHT, LIGHT.

## Nível 04 — Descida e abismo
- MAIN: WALK, JUMP, JUMP, LIGHT, RIGHT, WALK, WALK, LIGHT (8 de 9)
- Passos: (0,0) f1 → WALK (1,0) h1=1 ok → JUMP (2,0) h2=1+1 ok → JUMP (3,0) h1 < 2 (queda) ok → LIGHT (3,0) acende luz 1 → RIGHT f2 → WALK (3,1) h1=1 ok (contorna o abismo pela coluna 3) → WALK (3,2) h1=1 ok → LIGHT (3,2).
- Luzes finais: (3,0) acesa, (3,2) acesa. Vitória no último passo.
- Abismo (1,1) e (2,1) não é atravessado.
- Limites: main 9, proc1 0, proc2 0. Comandos: WALK, JUMP, LEFT, RIGHT, LIGHT.

## Nível 05 — Escada de luzes
- MAIN: JUMP, LIGHT, JUMP, LIGHT, JUMP, LIGHT, WALK, LIGHT (8 de 9)
- Passos: (0,0) h1 → JUMP (1,0) h2=1+1 ok → LIGHT (1,0) → JUMP (2,0) h3=2+1 ok → LIGHT (2,0) → JUMP (3,0) h4=3+1 ok → LIGHT (3,0) → WALK (4,0) h4=4 ok → LIGHT (4,0).
- Luzes finais: (1,0), (2,0), (3,0), (4,0) acesas. Vitória no último passo.
- Limites: main 9, proc1 0, proc2 0. Comandos: WALK, JUMP, LEFT, RIGHT, LIGHT.

## Nível 06 — Padrão repetido
- MAIN: P1, P1, P1, P1 (4 de 5)
- PROC1: WALK, LIGHT (2 de 2)
- Passos: P1 → WALK (1,0) h1=1 ok → LIGHT (1,0). P1 → WALK (2,0) ok → LIGHT (2,0). P1 → WALK (3,0) ok → LIGHT (3,0). P1 → WALK (4,0) ok → LIGHT (4,0).
- Luzes finais: (1,0), (2,0), (3,0), (4,0) acesas. Vitória no último LIGHT.
- Limites: main 5, proc1 2, proc2 0. Comandos: WALK, LEFT, RIGHT, LIGHT, P1.

## Nível 07 — Corredor recursivo
- MAIN: P1 (1 de 2)
- PROC1: WALK, WALK, LIGHT, P1 (4 de 4)
- Passos: P1 → WALK (1,0) ok → WALK (2,0) ok → LIGHT (2,0) → P1 (recursão) → WALK (3,0) ok → WALK (4,0) ok → LIGHT (4,0) → P1 → WALK (5,0) ok → WALK (6,0) ok → LIGHT (6,0).
- Luzes finais: (2,0), (4,0), (6,0) acesas. A vitória para o programa no último LIGHT; o P1 final não é executado.
- Limites: main 2, proc1 4, proc2 0. Comandos: WALK, LIGHT, P1.

## Nível 08 — Rotina e sub-rotina
- MAIN: P1, WALK, RIGHT, P2, WALK, WALK, LIGHT (7 de 8)
- PROC1: WALK, LIGHT (2 de 2)
- PROC2: WALK, LIGHT, WALK, LEFT (4 de 4)
- Passos: P1 → WALK (1,0) h1=1 ok → LIGHT (1,0) → volta ao MAIN em (1,0) f1 → WALK (2,0) h1=1 ok → RIGHT f2 → P2 → WALK (2,1) h1=1 ok → LIGHT (2,1) → WALK (2,2) h1=1 ok → LEFT f1 → volta ao MAIN em (2,2) → WALK (3,2) h1=1 ok → WALK (4,2) h1=1 ok → LIGHT (4,2).
- Luzes finais: (1,0), (2,1), (4,2) acesas. Vitória no último LIGHT.
- Limites: main 8, proc1 2, proc2 4. Comandos: WALK, LEFT, RIGHT, LIGHT, P1, P2.

## Nível 09 — Mapa com desníveis
- MAIN: WALK, LIGHT, JUMP, WALK, LIGHT, RIGHT, JUMP, LIGHT, WALK, LEFT, WALK, WALK, LIGHT (13 de 14)
- Passos: (0,0) f1 → WALK (1,0) h1=1 ok → LIGHT (1,0) → JUMP (2,0) h2=1+1 ok → WALK (3,0) h2=2 ok → LIGHT (3,0) → RIGHT f2 → JUMP (3,1) h1 < 2 (queda) ok → LIGHT (3,1) → WALK (3,2) h1=1 ok → LEFT f1 → WALK (4,2) h1=1 ok → WALK (5,2) h1=1 ok → LIGHT (5,2).
- Luzes finais: (1,0), (3,0), (3,1), (5,2) acesas. Vitória no último LIGHT.
- Limites: main 14, proc1 0, proc2 0. Comandos: WALK, JUMP, LEFT, RIGHT, LIGHT.

## Nível 10 — Desafio com sub-rotinas
- MAIN: P1, WALK, WALK, LIGHT, P2, LIGHT, WALK, WALK, P1 (9 de 9, limite exato)
- PROC1: WALK, LIGHT (2 de 2)
- PROC2: RIGHT, WALK, WALK, LEFT (4 de 4)
- Passos: P1 → WALK (1,0) h1=1 ok → LIGHT (1,0) → MAIN: WALK (2,0) h1=1 ok → WALK (3,0) h1=1 ok → LIGHT (3,0) → P2 → RIGHT f2 → WALK (3,1) h1=1 ok → WALK (3,2) h1=1 ok → LEFT f1 → MAIN: LIGHT (3,2) → WALK (4,2) h1=1 ok → WALK (5,2) h1=1 ok → P1 → WALK (6,2) h1=1 ok → LIGHT (6,2).
- Luzes finais: (1,0), (3,0), (3,2), (6,2) acesas. Vitória no último LIGHT.
- Limites: main 9, proc1 2, proc2 4. Comandos: WALK, LEFT, RIGHT, LIGHT, P1, P2.
