# Padrão de Resposta — Atividade Prática — Aula 05 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Demandas do Cliente e Escopo do Projeto.
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** a aplicação certa na situação **e** a justificativa,
   quando o tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do
   tema, conceito trocado ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** outros exemplos de sistema, desde que corretos; sinônimos dos
   termos (registro = linha; campo = coluna; SGBD = gerenciador de banco de dados; chave primária =
   PK; chave estrangeira = FK); SQL equivalente que produza o mesmo resultado no PostgreSQL; ordem
   diferente das partes da resposta.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** "Uma **planilha online** para os banhos."
**Critérios:** Nota cheia (0,2): cita a planilha online. Zero (0): confunde com a necessidade.

### ITEM 01-b
**Resposta esperada:** Ela precisa **controlar a agenda sem conflito de horários**, **lembrar os clientes** dos agendamentos e **saber quanto recebeu** no mês (registrar serviços e pagamentos).
**Critérios:** Nota cheia (0,4): necessidade ligada aos três fatos. Metade (0,2): um ou dois fatos. Zero (0): repete "planilha online".

### ITEM 01-c
**Resposta esperada:** Porque a frase inicial é uma **solução imaginada** pela cliente; se o banco seguir só a frase, **não resolve o problema** (conflitos, esquecimentos, controle financeiro) e precisará ser refeito.
**Critérios:** Nota cheia (0,4): solução × problema + consequência. Metade (0,2): só um dos dois. Zero (0): defende seguir a frase.

### ITEM 02-a
**Resposta esperada:** Diretora: **entrevista**. 300 alunos: **questionário**.
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 02-b
**Resposta esperada:** Acompanhar a secretaria **durante a rotina** (matrículas, atendimentos), anotando sem atrapalhar. Revela **como o trabalho é feito de verdade**: passos esquecidos, anotações paralelas, dados que ninguém citou na entrevista.
**Critérios:** Nota cheia (0,4): como fazer + o que revela. Metade (0,2): só um. Zero (0): sem relação com observação.

### ITEM 02-c
**Resposta esperada:** **Cada campo** da ficha é um **dado candidato** do banco. Ex.: a ficha tem nome, CPF, data de nascimento, curso, turno e responsável → candidatos a atributos de aluno, matrícula e responsável.
**Critérios:** Nota cheia (0,4): explicação + exemplo com campos. Metade (0,2): só a explicação. Zero (0): sem relação.

### ITEM 03-a
**Resposta esperada:** Exemplos: "O que vocês **registram** de cada aluno quando ele entra?"; "O que é **anotado** em cada treino e quem anota?"
**Critérios:** Nota cheia (0,2): duas perguntas abertas sobre registro. Metade (0,1): uma, ou perguntas fechadas (sim/não). Zero (0): perguntas sem relação com dados.

### ITEM 03-b
**Resposta esperada:** Regras: "Quais **regras nunca podem ser quebradas**?" (ex.: aluno sem exame não treina) — descobre restrições do banco. Acesso: "**Quem pode ver** cada informação?" — descobre permissões e dados pessoais a proteger.
**Critérios:** Nota cheia (0,4): duas perguntas + o que cada uma descobre. Metade (0,2): uma pergunta explicada. Zero (0): perguntas sem relação.

### ITEM 03-c
**Resposta esperada:** "Quantos alunos e treinos são registrados **por mês** e **por quanto tempo** guardar o histórico?" A resposta define **espaço em disco**, **backup**, **índices** e se é preciso **arquivar** dados antigos.
**Critérios:** Nota cheia (0,4): pergunta + influência. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 04-a
**Resposta esperada:** "Guardar **nome, CPF e telefone** de cada aluno."
**Critérios:** Nota cheia (0,2): requisito de dados a guardar. Zero (0): outro tipo.

### ITEM 04-b
**Resposta esperada:** Acesso: "O **instrutor consulta somente os alunos vinculados a ele**." Consulta: "**Listar os alunos com mensalidade vencida e não paga**, com o valor e a data de vencimento."
**Critérios:** Nota cheia (0,4): os dois, verificáveis. Metade (0,2): um verificável, ou dois vagos. Zero (0): nenhum.

### ITEM 04-c
**Resposta esperada:** É verificável quando dá para **testar objetivamente** se foi cumprido. Ex.: "A consulta de alunos de um instrutor responde em **até 2 segundos** com **5 mil alunos** cadastrados."
**Critérios:** Nota cheia (0,4): definição + reescrita com medida. Metade (0,2): só um. Zero (0): reescrita ainda vaga.

### ITEM 05-a
**Resposta esperada:** (1) **volume e histórico**; (2) **qualidade**; (3) **regra de negócio**; (4) **consulta/relatório**.
**Critérios:** Nota cheia (0,2): os quatro. Metade (0,1): três. Zero (0): dois ou menos.

### ITEM 05-b
**Resposta esperada:** **Substantivos** importantes (aluno, turma, curso, matrícula) são candidatos a **entidades**; **características** (nome, CPF, data de nascimento, turno) são candidatas a **atributos**.
**Critérios:** Nota cheia (0,4): as duas regras com exemplos da escola. Metade (0,2): uma regra ou sem exemplos. Zero (0): invertido.

### ITEM 05-c
**Resposta esperada:** Guardar **5 anos** de histórico aumenta o **volume**: é preciso prever **espaço em disco** para os dados e **backups** do período, além de definir por quanto tempo os backups ficam guardados.
**Critérios:** Nota cheia (0,4): disco + backup ligados ao período. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 06-a
**Resposta esperada:** Restrição **UNIQUE** no CPF.
**Critérios:** Nota cheia (0,2): UNIQUE. Zero (0): outro recurso.

### ITEM 06-b
**Resposta esperada:** Matrícula: **chaves estrangeiras** para aluno e turma (não aceita matrícula de aluno ou turma inexistente). Mensalidade: restrição **CHECK** (valor > 0).
**Critérios:** Nota cheia (0,4): os dois recursos corretos explicados. Metade (0,2): um. Zero (0): nenhum.

### ITEM 06-c
**Resposta esperada:** **Trigger de auditoria**: a cada alteração de nota, grava automaticamente quem alterou, quando e os valores antigo e novo. Protege a escola porque permite **descobrir e provar alterações indevidas**.
**Critérios:** Nota cheia (0,4): trigger + proteção. Metade (0,2): só o recurso. Zero (0): recurso errado.

### ITEM 07-a
**Resposta esperada:** **Alunos, responsáveis, cursos, turmas, matrículas e pagamentos** (mensalidades).
**Critérios:** Nota cheia (0,2): itens das matrículas coerentes. Metade (0,1): parcial. Zero (0): inclui cantina e folha.

### ITEM 07-b
**Resposta esperada:** Não entra: **cantina** e **folha de pagamento**. Registrar evita **pedidos extras sem controle** e deixa claro para o cliente o que será entregue no prazo.
**Critérios:** Nota cheia (0,4): itens + motivo do registro. Metade (0,2): só um. Zero (0): diz que não precisa registrar.

### ITEM 07-c
**Resposta esperada:** Ex.: "O banco vai **registrar alunos, turmas, matrículas e pagamentos** para que a escola **não perca matrículas e saiba as vagas e os pagamentos**." Partes interessadas: **diretora** (pede e aprova), **secretaria** (usa), **professores e alunos** (usam/consultam), **equipe** que desenvolve.
**Critérios:** Nota cheia (0,4): objetivo com o quê e por quê + partes. Metade (0,2): só um dos dois. Zero (0): objetivo técnico sem relação.

### ITEM 08-a
**Resposta esperada:** **Documento de escopo/requisitos, modelo de entidades, DER, tabelas normalizadas, padrão de dados, scripts SQL e documentação técnica**.
**Critérios:** Nota cheia (0,2): três ou mais entregas. Metade (0,1): duas. Zero (0): entregas sem relação.

### ITEM 08-b
**Resposta esperada:** Ex.: "A **diretora estará disponível** uma vez por semana para validar o modelo." Se não for verdade, as **validações atrasam** e o projeto pode seguir com **erros de entendimento**.
**Critérios:** Nota cheia (0,4): premissa + consequência. Metade (0,2): só um. Zero (0): confunde com requisito.

### ITEM 08-c
**Resposta esperada:** Ex.: (1) **mudanças de escopo frequentes** → registrar e aprovar cada mudança; (2) **dados das fichas antigas com erros** → separar tempo para limpeza e padronização; (3) **atraso de entregas** → prazos internos e acompanhamento semanal.
**Critérios:** Nota cheia (0,4): dois riscos com ação. Metade (0,2): um risco com ação ou dois sem ação. Zero (0): sem riscos coerentes.

### ITEM 09-a
**Resposta esperada:** **Mudança de escopo**: a cantina já tinha sido colocada **fora do escopo**; é um pedido novo, não um requisito esquecido.
**Critérios:** Nota cheia (0,2): classificação + justificativa. Metade (0,1): só a classificação. Zero (0): requisito esquecido.

### ITEM 09-b
**Resposta esperada:** **Registrar o pedido**, avaliar o **impacto** (tabelas novas, prazo, custo), apresentar à diretora e só incluir com **aprovação** (ou deixar para uma **próxima versão**).
**Critérios:** Nota cheia (0,4): registrar + impacto + aprovação. Metade (0,2): dois passos. Zero (0): incluir direto.

### ITEM 09-c
**Resposta esperada:** O projeto **cresce sem controle**, **atrasa**, a equipe perde o foco e o cliente fica insatisfeito porque o combinado inicial não é entregue.
**Critérios:** Nota cheia (0,4): crescimento sem controle + atraso/consequência. Metade (0,2): só "atrasa". Zero (0): diz que melhora.

### ITEM 10-a
**Resposta esperada:** Porque as entregas são **semanais e dependentes** (uma depende da anterior); sem organização, uma atrasada **atrasa todas**.
**Critérios:** Nota cheia (0,2): dependência entre entregas. Metade (0,1): "para não atrasar". Zero (0): sem relação.

### ITEM 10-b
**Resposta esperada:** Dividir as tarefas **por pessoa** (ou em duplas) conforme cada entrega, definir **prazos internos alguns dias antes** do prazo do professor e reservar tempo para **revisão em grupo**.
**Critérios:** Nota cheia (0,4): divisão + prazo interno antecipado. Metade (0,2): só um. Zero (0): uma pessoa faz tudo.

### ITEM 10-c
**Resposta esperada:** Registrar num **quadro de tarefas** (ou planilha) quem faz o quê, prazo e situação. Se atrasar: **avisar logo o grupo**, redistribuir tarefas ou pedir ajuda ao professor, e **ajustar o cronograma**.
**Critérios:** Nota cheia (0,4): forma de registro + ação no atraso. Metade (0,2): só um. Zero (0): esconder o atraso.
