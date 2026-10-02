# AULA 11 — Medição de Nível: Direta, Indireta, Descontínua e de Sólidos

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M7 — Medição de nível e vazão |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 4.9 Medição direta e indireta de nível · 4.10 Medidores descontínuos de nível · 4.11 Métodos de medição de nível de sólidos |
| **Capacidade** | **C4** — Observar as variáveis de controle (pressão, vazão, temperatura, nível etc) |
| **Estratégia** | Prática em bancada + situação-problema |

---

## 🎯 Objetivos de aprendizagem

- Diferenciar medição de nível **direta** e **indireta**.
- Diferenciar medição **contínua** e **descontínua** (pontual).
- Identificar os medidores descontínuos (boia, eletrodos, chave vibratória) e seus usos.
- Reconhecer métodos de medição de nível de **sólidos** (grãos, pó, granulados).
- Calcular o nível a partir da pressão hidrostática (medição indireta).

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Pressão e unidades (ligação com a medição indireta) |
| 50 min | Exposição | Métodos diretos e indiretos; descontínuos; sólidos |
| 25 min | Demonstração | Tanque da bancada: visor, boia e transmissor de pressão |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Medir o nível por 2 métodos e comparar |
| 50 min | Prática autônoma | Situação-problema "Tanque que transbordou" |
| 25 min | Registro e verificação | Quiz e planilha de medições |

---

## 📖 Conteúdo

### 1. Medição direta e indireta (4.9)

| Tipo | Como mede | Exemplos |
|---|---|---|
| **Direta** | Usa a própria superfície do líquido como referência | Régua/trena (vareta), visor de vidro, boia com escala |
| **Indireta** | Mede outra grandeza e calcula o nível | Pressão hidrostática, ultrassom, radar, capacitivo, empuxo |

**Pressão hidrostática:** P = ρ · g · h → h = P ÷ (ρ · g).
Para água: cada **1 m de coluna ≈ 0,098 bar (≈ 9,8 kPa)**.
Ex.: transmissor no fundo do tanque marca 19,6 kPa → h ≈ 19,6 ÷ 9,8 = **2 m** de água.
Atenção: líquido com densidade diferente (xarope, óleo) muda o cálculo.

### 2. Medidores descontínuos de nível (4.10)

Indicam apenas se o nível **atingiu um ponto** (alto, baixo) — geram **sinal digital**.

| Medidor | Princípio | Uso típico |
|---|---|---|
| Chave de boia | Boia sobe/desce e aciona contato | Liga/desliga bomba de abastecimento |
| Eletrodos (condutivos) | Líquido condutor fecha o circuito entre hastes | Água e soluções condutivas |
| Chave vibratória (diapasão) | Vibração muda quando coberta pelo produto | Líquidos e sólidos |
| Chave capacitiva | Variação de capacitância | Líquidos e granulados |

### 3. Nível de sólidos (4.11)

| Método | Como funciona | Cuidado |
|---|---|---|
| Pesagem (células de carga) | Peso do silo indica a quantidade | Precisa conhecer a densidade |
| Ultrassom / radar | Tempo de ida e volta do sinal até a superfície | Pó e cone de material inclinado afetam |
| Prumo eletromecânico | Peso desce até tocar o material | Medição periódica |
| Chave de pás rotativas | Pá para de girar quando coberta | Pontual (alto/baixo) |

---

## 🏭 Exemplos do contexto industrial

- Silo de grãos com células de carga: estoque em toneladas no supervisório.
- Caixa d'água da fábrica com chave de boia comandando a bomba.
- Tanque de xarope com transmissor de pressão no fundo e alarme LAH (nível alto).

---

## 🛠️ Atividade — Situação-problema "Tanque que transbordou"

Na empresa fictícia **Sucos Vale Verde**, o tanque de xarope transbordou, mas a IHM mostrava 80%. O transmissor é de pressão no fundo e foi configurado para **água**.

1. Explique por que a densidade do xarope (maior que a da água) altera a leitura.
2. Proponha uma proteção independente (medidor descontínuo de nível alto).
3. Na bancada, meça o nível pelo visor e pelo transmissor e registre a diferença.

---

## ⚠️ Segurança

Bancada com água: piso seco, cuidado com eletricidade próxima. Não subir em tanques ou silos; espaços confinados são proibidos para o aprendiz.

---

## ✅ Verificação da aprendizagem

- Planilha com medições por 2 métodos e diferença calculada.
- Quiz: classificar 8 medidores (direto/indireto, contínuo/descontínuo, líquido/sólido).

---

## 🧰 Recursos

Bancada com tanque, visor, medidores descontínuos de nível e transmissor; calculadora; computador com planilha; kit multimídia.

---

## 🔗 Próxima aula

**Aula 12 — Vazão:** quanto produto passa pela tubulação por minuto — unidades e medidores.
