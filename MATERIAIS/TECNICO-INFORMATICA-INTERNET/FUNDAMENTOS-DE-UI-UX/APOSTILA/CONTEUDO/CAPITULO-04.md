# Capítulo 04 — Resolução de problemas: análise crítica

- **Aula:** 04
- **Capacidade:** C3, S2

## Teoria

### O enigma da tela confusa

Imagine entrar em um aplicativo para marcar uma consulta de emergência e se deparar com 15
botões coloridos piscando juntos, textos minúsculos e nenhum botão visível de avançar. Mais de
70% dos abandonos de tarefas digitais acontecem por barreiras evitáveis de design visual.

Nesta unidade curricular você atua como **aluno consultor**: analisa telas não como usuário
casual, mas como alguém treinado para achar a raiz das falhas. O trabalho não é dizer se a tela é
bonita, e sim se ela cumpre seu papel com clareza, acessibilidade e eficiência.

### Gosto pessoal × problema estrutural

| Gosto pessoal | Problema estrutural |
|---|---|
| Subjetivo: baseia-se em sentimentos e estilos preferidos | Objetivo e verificável: apoia-se em regras de visualização e métricas |
| "Acho essa cor roxa muito feia." | "O texto lilás tem contraste 1,8:1, abaixo da norma." |
| Não aponta a causa do erro na tarefa | Demonstra o impacto direto no uso real |
| Varia de pessoa para pessoa | Permite propor uma correção técnica clara |

### O método da análise crítica

A análise crítica transforma uma queixa genérica de usuário em diagnóstico profissional por meio
da **tríade investigativa**:

1. **Fato objetivo** — o que está visivelmente ocorrendo na tela, sem julgamento.
   Ex.: "o texto explicativo tem 11 pixels";
2. **Causa técnica** — a decisão de projeto que provocou essa condição.
   Ex.: "falta de padronização tipográfica no layout";
3. **Efeito prático** — o impacto concreto sentido pelo usuário na tarefa.
   Ex.: "a pessoa força a vista e abandona o formulário".

📌 **Fato** é a realidade física da tela, que qualquer pessoa com instrumentos pode medir e
confirmar ("o botão tem 24×24 pixels no canto inferior"). Já "o desenvolvedor não pensou nos
idosos" é julgamento precipitado — a análise se apoia apenas em fatos concretos.

### Causas técnicas frequentes

| Causa | O que acontece |
|---|---|
| Contraste insuficiente | Texto e fundo com luminâncias próximas impedem a leitura rápida |
| Desalinhamento visual | Campos espalhados sem grade cansam os olhos na busca do próximo dado |
| Área de toque minúscula | Botões com menos de 44×44 px causam toques acidentais |
| Falta de hierarquia | Títulos, avisos e botões com o mesmo peso competem pela atenção |

Erros estruturais produzem três efeitos imediatos no usuário: **sobrecarga cognitiva** (energia
gasta para entender onde clicar), **erro operacional** (toques em botões errados que apagam
dados) e **abandono de tarefa** (desistência frustrada do serviço).

### Ruído visual e barreiras de interação

**Ruído visual** ocorre quando elementos gráficos desnecessários disputam atenção com a
informação essencial. Fontes comuns: mais de quatro cores de destaque sem paleta definida, bordas
grossas em todos os cartões e avisos flutuantes cobrindo o formulário.

**Barreira de interação** é qualquer impedimento visual ou lógico que paralisa o usuário:

- **Botão invisível:** cor sem destaque, fundida ao fundo;
- **Campo ambíguo:** rótulos técnicos que o público não entende;
- **Sem feedback:** a tela não avisa se o clique funcionou.

⚠️ Se o usuário comete um erro constante, o defeito é do design, não do usuário.

### Estudo de caso (SA 1): agendamento móvel

Um serviço público de saúde implantou um aplicativo de marcação de consultas, e o suporte
registrou centenas de desistências diárias na etapa de escolher dia e hora. As evidências na
tela: calendário comprimido (31 números minúsculos sem espaçamento), horários indisponíveis em
cinza quase idêntico aos disponíveis e botão Confirmar abaixo da dobra de rolagem.

Aplicando a tríade no calendário:

1. **Fato objetivo:** os números dos dias medem 16×16 pixels com espaçamento zero;
2. **Causa técnica:** desrespeito ao tamanho mínimo de área de toque (44×44 px) em telas móveis;
3. **Efeito e solução:** toques acidentais em datas erradas e desistência; redimensionar para
   48 px com 8 px de espaçamento.

### O relatório técnico e a matriz de severidade

O diagnóstico é entregue em relatório técnico com quatro partes:

1. **Identificação do componente** — nome e localização exata na tela;
2. **Fato observado e gravidade** — descrição objetiva com evidência mensurável;
3. **Hipótese de causa técnica** — a regra visual ou padrão de interação violado;
4. **Proposta de melhoria** — modificação prática que elimina a barreira sem quebrar o sistema.

| Severidade | Exemplo | Impacto no uso |
|---|---|---|
| Cosmética | Pequeno desalinhamento | Não impede a ação (~15%) |
| Leve | Texto com contraste fraco | Atrasa a leitura (~35%) |
| Grave | Botão de toque difícil | Cliques errados, retrabalho (~68%) |
| Catastrófica | Ação principal inacessível | Bloqueia o uso total (100%) |

### Crítica construtiva e amabilidade

Criticar uma interface não é atacar quem a construiu. O consultor aponta oportunidades técnicas
com postura acolhedora (capacidade socioemocional S4). Compare:

- **Abordagem agressiva:** "Essa tela está horrível e confusa, ninguém consegue usar isso." —
  gera atrito, não explica a falha, não propõe solução.
- **Abordagem construtiva:** "Notamos que o contraste de 2,1:1 dificulta a leitura. Sugiro
  elevar para 4,5:1 com este tom escuro." — baseia-se em parâmetros verificáveis, foca na
  solução e inspira colaboração.

**Checklist do consultor de UI:**

1. Todas as fontes atendem ao contraste mínimo sobre seus fundos?
2. Botões e itens interativos têm ao menos 44×44 px?
3. Há ícones decorativos ou bordas poluindo a hierarquia de leitura?
4. A ação principal é evidente sem exigir rolagem cega?

## Resumo

- Mais de 70% dos abandonos digitais vêm de barreiras evitáveis de design — por isso existe o
  papel do aluno consultor.
- Análise crítica é técnica, não opinião: separa fato objetivo, causa técnica e efeito prático.
- Causas frequentes: contraste insuficiente, desalinhamento, área de toque menor que 44×44 px e
  falta de hierarquia — geram sobrecarga cognitiva, erro operacional e abandono.
- Ruído visual (excesso de cores, bordas, avisos) e barreiras de interação (botão invisível,
  campo ambíguo, sem feedback) bloqueiam a tarefa; erro constante do usuário é defeito do design.
- O diagnóstico vira relatório com componente, fato, causa e proposta — classificado na matriz de
  severidade, de cosmética a catastrófica.
- Crítica construtiva usa dados verificáveis e amabilidade: foco na solução, não na culpa.

## Glossário

- **Diagnóstico:** identificação formal de falhas com base em evidências verificáveis.
- **Causalidade:** relação técnica direta entre o erro do projeto e o bloqueio da ação.
- **Crítica:** avaliação fundamentada em padrões objetivos e regras técnicas.
- **Problema:** obstáculo no sistema que impede ou retarda a conclusão da tarefa.
- **Fato objetivo:** realidade física da tela que independe de interpretação pessoal.
- **Ruído visual:** excesso de cores, linhas e elementos que sobrecarregam e poluem a visão.
- **Barreira de interação:** impedimento visual ou lógico que paralisa a conclusão da tarefa.
- **Severidade:** classificação do impacto da falha, de cosmética a catastrófica.
