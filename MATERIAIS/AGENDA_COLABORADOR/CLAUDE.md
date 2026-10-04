# CLAUDE.md — Agenda do Colaborador

## Objetivo

Consulte a agenda do Google Calendar usando o conector disponível e crie um dashboard que ajude a acompanhar as aulas e a produção de materiais. O dashboard deve destacar:

- UCs recém-inseridas na agenda;
- aulas ou UCs cujos materiais estejam pendentes ou não localizados.

## Fontes de informação

- Use o Google Calendar como fonte dos nomes das matérias/UCs e dos dados de agendamento. Não invente nem deduza nomes, datas, horários ou turmas.
- Consulte os arquivos do projeto para confirmar se cada material existe e em que estado está. Registre o caminho do arquivo quando ele puder ser identificado.
- Se o conector, a agenda ou os arquivos necessários não estiverem acessíveis, informe a limitação e marque o dado como não confirmado. Não preencha lacunas com suposições.

## Fluxo de trabalho

1. Leia os eventos relevantes do Google Calendar e extraia as matérias/UCs diretamente deles.
2. Compare as UCs da agenda com os registros anteriores em `STATUS-AGENDA.md`. Considere uma UC nova quando ela ainda não estiver registrada ou quando a agenda indicar que foi adicionada recentemente.
3. Para cada aula/UC, procure os materiais correspondentes nos arquivos disponíveis no projeto.
4. Atualize ou crie `STATUS-AGENDA.md` com o agendamento e o estado de cada material.
5. Construa ou atualize o dashboard para apresentar as aulas e emitir alertas para UCs novas e materiais pendentes ou não localizados.
6. Ao concluir, resuma o que foi atualizado e indique quaisquer informações que não puderam ser confirmadas.

## Materiais a acompanhar

Registre individualmente, quando aplicável:

- geração de conteúdo;
- plano de aulas;
- plano de ensino da matéria;
- atividades;
- apostilas;
- outros materiais identificados para a aula.

## Formato de `STATUS-AGENDA.md`

Mantenha uma entrada por aula/UC, com os campos disponíveis na agenda:

- matéria/UC;
- data, horário e turma, se informados;
- indicação de UC nova ou já registrada;
- estado de cada material listado acima;
- caminho ou referência do material encontrado;
- observações e dados que precisam de confirmação.

Use estes estados para cada material:

- `✅ Concluído` — o material foi localizado e sua existência foi confirmada;
- `🔄 Em andamento` — há evidência explícita de que está sendo produzido;
- `⬜ Pendente` — foi confirmado que ainda não foi produzido;
- `⚠️ Não localizado` — a busca disponível não encontrou o material ou não foi possível confirmar seu estado.

Não marque um material como concluído apenas porque ele foi mencionado na agenda. Se não for possível distinguir entre pendente e não localizado, use `⚠️ Não localizado` e explique a limitação.

## Regras para alertas e dados incertos

- Sinalize UCs novas com base na comparação com `STATUS-AGENDA.md` ou em informação explícita da agenda. Se não houver histórico suficiente para confirmar quando a UC foi adicionada, indique que a novidade precisa de confirmação.
- Gere alertas para materiais `⬜ Pendente` ou `⚠️ Não localizado`, identificando a aula/UC e o material em questão.
- Evite duplicar alertas sem necessidade; associe cada alerta à aula/UC correspondente.
- Preserve as informações originais da agenda e deixe claras as diferenças entre dados confirmados e dados ausentes.
