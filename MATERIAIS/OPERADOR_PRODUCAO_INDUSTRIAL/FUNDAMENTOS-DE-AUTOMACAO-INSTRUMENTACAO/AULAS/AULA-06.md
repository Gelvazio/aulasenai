# AULA 06 — CLP: Estruturas de Programação (selo, temporizador, contador e intertravamento)

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M3 — CLP: linguagem e estruturas de programação |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 2.5 Estruturas de programação |
| **Capacidade** | **C1** — Identificar a aplicabilidade dos conceitos básicos relativos à programação de CLP´s |
| **Estratégia** | Situação-problema em simulador e bancada |

---

## 🎯 Objetivos de aprendizagem

- Explicar o circuito de **selo** (retenção) de partida e parada.
- Identificar o funcionamento de **temporizador** (atraso na ligação) e **contador** crescente.
- Reconhecer um **intertravamento** no programa e explicar por que ele existe.
- Testar, no simulador ou na bancada, a partida/parada de uma esteira.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Leitura de 2 redes Ladder (série/paralelo) |
| 50 min | Exposição | Selo; prioridade da parada; temporizador; contador; intertravamento |
| 25 min | Demonstração | Partida/parada de esteira no simulador, mostrando o selo |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Duplas montam/testam o programa no simulador seguindo o roteiro |
| 50 min | Prática autônoma | Situação-problema "Esteira que volta sozinha" |
| 25 min | Registro e verificação | Avaliação formativa do bloco C1 (aulas 01–06) |

---

## 📖 Conteúdo

### 1. Selo (retenção)

```
 I0.0 (LIGA)   I0.1 (DESLIGA-NF)  I0.2 (EMERG-NF)      Q0.0 (motor)
──┤ ├────┬──────┤ ├────────────────┤ ├──────────────────( )──
 Q0.0    │
──┤ ├────┘
```

- O botão LIGA é de pulso; o contato **Q0.0 em paralelo** "segura" a saída ligada (selo).
- DESLIGA e EMERGÊNCIA ficam **em série** e ligados fisicamente como NF: qualquer um abre o circuito → **parada tem prioridade**.

### 2. Temporizador (TON — atraso na ligação)

- Conta tempo enquanto a entrada está ligada; após o tempo programado (preset), liga sua saída.
- Exemplo: sirene toca 5 s antes de a esteira partir (aviso de partida).

### 3. Contador (CTU — crescente)

- Soma 1 a cada pulso; ao atingir o preset, liga sua saída; um reset zera.
- Exemplo: a cada 12 garrafas, a caixa é fechada.

### 4. Intertravamento

- Condição que **impede** uma ação insegura ou fora de sequência.
- Exemplos: motor de avanço e de retorno nunca ligados juntos; esteira só parte com a proteção fechada; bomba só liga com nível mínimo no tanque.
- No programa, aparece como contato NF da outra saída ou contato da condição de segurança em série.

---

## 🏭 Exemplos do contexto industrial

- Encaixotadora: contador de 12 unidades + temporizador de 2 s para a dobra da aba.
- Ponte rolante: intertravamento entre subir e descer.
- Após faltar energia, a esteira **não** deve partir sozinha ao voltar (por isso o selo, e não uma chave de manter).

---

## 🛠️ Atividade — Situação-problema "Esteira que volta sozinha"

Na empresa fictícia **Embalagens Sul**, após o operador apertar a emergência e destravá-la, a esteira voltou a andar sem ninguém apertar LIGA. O programa usa uma chave de manter em vez de botão com selo.

1. Explique por que isso é perigoso.
2. Desenhe a rede correta com selo e emergência em série.
3. Acrescente um temporizador de aviso de 5 s antes da partida.
4. Teste no simulador e registre o resultado.

---

## ⚠️ Segurança

Testes em bancada **somente com o docente**; botão de emergência testado antes da prática. Lógica de segurança (emergência, proteções) **nunca** é contornada (jumper, "ponte" ou alteração de programa).

---

## ✅ Verificação da aprendizagem — formativa do bloco C1

- 10 questões: conversões (aula 01), tabela-verdade (02), CLP e ciclo (03), hardware (04), leitura de Ladder (05) e selo/intertravamento (06).
- Prática: programa da esteira funcionando com parada prioritária (critério crítico).

---

## 🧰 Recursos

Laboratório de Automação com CLP, botoeiras e sinaleiros; software/simulador de CLP; kit multimídia.

---

## 🔗 Próxima aula

**Aula 07 — Sistemas de supervisão:** o operador raramente olha o programa; ele vê a máquina pela IHM e pelo supervisório. Vamos conhecer esses sistemas.
