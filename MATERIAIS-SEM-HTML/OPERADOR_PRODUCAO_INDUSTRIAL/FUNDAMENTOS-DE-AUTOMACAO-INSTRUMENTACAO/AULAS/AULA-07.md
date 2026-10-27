# AULA 07 — Sistemas de Supervisão: Local e Remoto e seus Componentes

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M4 — Sistemas Supervisórios e IHM |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 3.1 Sistemas de Supervisão: Local e Remoto · 3.2 Componentes de um sistema de supervisão |
| **Capacidade** | **C2** — Compreender a operação do sistema supervisório e IHM |
| **Estratégia** | Estudo de caso: sala de controle |

---

## 🎯 Objetivos de aprendizagem

- Explicar o que é supervisão de processo e por que ela existe.
- Diferenciar supervisão **local** (junto à máquina) e **remota** (sala de controle, outro prédio, celular).
- Identificar os componentes de um sistema de supervisão: instrumentos de campo, CLP, rede de comunicação, servidor/estação, IHM/telas e banco de dados.
- Montar o diagrama de um sistema de supervisão simples.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Do programa do CLP à tela do operador: o que falta? |
| 50 min | Exposição | Supervisão; níveis da automação; local × remota; componentes |
| 25 min | Demonstração | Vídeo/fotos de salas de controle e da bancada CLP + IHM do laboratório |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Duplas desenham a arquitetura de supervisão do laboratório |
| 50 min | Prática autônoma | Estudo de caso "Laticínio Serra Azul" |
| 25 min | Registro e verificação | Apresentação dos diagramas e quiz |

---

## 📖 Conteúdo

### 1. Supervisão de processo

- Supervisionar = **ver, registrar e comandar** o processo à distância, a partir de dados que vêm do CLP.
- Benefícios: visão geral da linha, alarmes rápidos, histórico para análise, menos deslocamento e mais segurança.

### 2. Níveis da automação (pirâmide simplificada)

```
        Gestão (ERP)                  ← planejamento e indicadores da empresa
      Supervisão (SCADA)              ← telas, alarmes, históricos
    Controle (CLP)                    ← lógica da máquina
  Campo (sensores, atuadores)         ← medições e acionamentos
```

### 3. Local × remoto (3.1)

| | Supervisão local | Supervisão remota |
|---|---|---|
| Onde | Na própria máquina (IHM no painel) | Sala de controle, outro setor, acesso pela rede |
| Abrangência | Uma máquina | Linha inteira ou fábrica |
| Exemplo | Tela da envasadora | Sala de controle do laticínio com todas as linhas |

### 4. Componentes (3.2)

| Componente | Papel |
|---|---|
| Instrumentos de campo | Medem e atuam (transmissores, válvulas, motores) |
| CLP / controladores | Executam a lógica e guardam os valores |
| Rede de comunicação | Leva os dados (cabos, Ethernet industrial) |
| Estação/servidor de supervisão | Roda o software SCADA |
| IHM / telas | Mostram o processo ao operador |
| Banco de dados / histórico | Guarda valores e alarmes para relatórios |

---

## 🏭 Exemplos do contexto industrial

- Laticínio: o operador da sala de controle vê temperatura dos tanques de pasteurização e recebe alarme se sair da faixa.
- Estação de tratamento de efluentes da fábrica supervisionada à distância.
- Líder de turno consulta a produção da linha pelo supervisório antes da reunião de passagem de turno.

---

## 🛠️ Atividade — Estudo de caso "Laticínio Serra Azul"

O **Laticínio Serra Azul** (fictício) tem 3 tanques de leite, uma pasteurizadora e uma envasadora. Hoje os operadores andam pela fábrica anotando temperaturas em papel.

1. Desenhe um sistema de supervisão para a fábrica (campo → CLP → rede → SCADA → telas).
2. Indique o que fica em supervisão local e o que vai para a sala de controle.
3. Liste 3 ganhos e 2 cuidados (ex.: queda de rede, acesso indevido).

---

## ⚠️ Segurança

Mesmo com supervisão remota, **comandos que colocam pessoas em risco** (partida de máquina) exigem confirmação local e procedimento. Senhas de acesso ao supervisório são pessoais (segurança da informação).

---

## ✅ Verificação da aprendizagem

- Diagrama correto com os 6 componentes.
- Quiz: classificar 6 situações como supervisão local ou remota.

---

## 🧰 Recursos

Laboratório de Automação (CLP + IHM), laboratório de informática, kit multimídia, vídeos de salas de controle.

---

## 🔗 Próxima aula

**Aula 08 — Softwares SCADA, IHM e funções básicas:** hora de operar a planta pela tela e tratar alarmes.
