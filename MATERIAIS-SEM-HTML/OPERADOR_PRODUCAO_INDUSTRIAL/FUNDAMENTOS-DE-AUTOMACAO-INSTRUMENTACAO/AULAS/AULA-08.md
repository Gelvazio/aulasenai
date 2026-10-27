# AULA 08 — Softwares SCADA, IHM e Funções Básicas da Supervisão

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M4 — Sistemas Supervisórios e IHM |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 3.3 Softwares SCADA e Interfaces Homem Máquina · 3.4 Funções básicas dos Sistemas de Supervisão |
| **Capacidade** | **C2** — Compreender a operação do sistema supervisório e IHM |
| **Estratégia** | Situação-problema: turno simulado na IHM |

---

## 🎯 Objetivos de aprendizagem

- Diferenciar IHM (no painel da máquina) e software SCADA (estação de supervisão).
- Navegar pelas telas típicas: visão geral, detalhe, alarmes, tendências e receitas.
- Interpretar cores e estados (ligado, desligado, falha) e reconhecer, priorizar e registrar alarmes.
- Fazer o **relatório de turno** com base nas informações da tela.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Componentes de um sistema de supervisão |
| 50 min | Exposição | IHM × SCADA; funções básicas; boas práticas de operação de alarmes |
| 25 min | Demonstração | Docente opera a bancada pela IHM e provoca 2 alarmes |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Duplas operam a IHM seguindo um roteiro de tarefas |
| 50 min | Prática autônoma | Turno simulado com alarmes e relatório |
| 25 min | Registro e verificação | Correção dos relatórios e quiz |

---

## 📖 Conteúdo

### 1. IHM e SCADA (3.3)

| | IHM | Software SCADA |
|---|---|---|
| Onde fica | No painel da máquina (tela touch) | Em computador/servidor de supervisão |
| Alcance | Uma máquina | Várias máquinas ou a fábrica |
| Uso típico | Partir, parar, ajustar receita, ver falhas | Visão geral, históricos, relatórios, alarmes centralizados |

### 2. Funções básicas da supervisão (3.4)

| Função | O que o operador faz |
|---|---|
| **Visualização (sinóticos)** | Vê o desenho do processo com valores em tempo real |
| **Comando** | Liga/desliga, muda modo manual/automático (com permissão) |
| **Alarmes e eventos** | Reconhece, consulta a causa e age conforme procedimento |
| **Tendências (gráficos)** | Acompanha a variável no tempo (ex.: temperatura subindo) |
| **Histórico e relatórios** | Consulta produção, paradas e alarmes passados |
| **Receitas** | Seleciona parâmetros do produto (ex.: garrafa 500 ml ou 1 L) |
| **Controle de acesso** | Entra com usuário e senha; cada nível tem permissões |

### 3. Boas práticas com alarmes

1. **Ler** a mensagem inteira e o horário.
2. **Priorizar:** segurança > qualidade > produção.
3. **Reconhecer** (não é o mesmo que resolver!).
4. **Agir** conforme o procedimento ou chamar o líder/manutenção.
5. **Registrar** no relatório de turno.

---

## 🏭 Exemplos do contexto industrial

- Alarme "Nível alto tanque TQ-02" + tendência subindo → fechar a alimentação conforme procedimento.
- Tela de receita errada → lote produzido fora da especificação (falha de qualidade).
- Muitos alarmes "piscando" e ninguém reconhece → risco de perder o alarme importante.

---

## 🛠️ Atividade — Turno simulado na IHM

Na bancada (ou simulador), durante 40 minutos, o docente provoca 4 eventos: porta aberta, nível alto, sobretemperatura e fim de lote.

1. Para cada alarme: horário, mensagem, prioridade e ação tomada.
2. Use a tela de tendência para dizer se a temperatura estava subindo ou estável.
3. Preencha o **relatório de turno** (produção, paradas, alarmes, observações).

---

## ⚠️ Segurança

Comandos na IHM só com autorização do docente; nunca mudar parâmetros de segurança. Senha é pessoal e não se compartilha (LGPD e segurança da informação).

---

## ✅ Verificação da aprendizagem

- Relatório de turno completo (critério crítico: alarme de segurança tratado primeiro).
- Quiz: 6 telas/situações — qual função da supervisão está sendo usada.

---

## 🧰 Recursos

Laboratório de Automação com CLP e IHM; software SCADA ou simulador; kit multimídia; modelo de relatório de turno.

---

## 🔗 Próxima aula

**Aula 09 — Instrumentação:** os valores que aparecem nas telas vêm de instrumentos. Vamos aprender a "ler" seus símbolos, malhas e sinais.
