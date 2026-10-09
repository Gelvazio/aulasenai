# Padrão de Resposta — Atividade Prática — Aula 02 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Gerenciadores: Características, Requisitos e Níveis.
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
**Resposta esperada:** Três entre: **modelo de dados**, **licença**, **transações ACID**, **desempenho**, **escalabilidade**, **segurança**, **ferramentas e comunidade**.
**Critérios:** Nota cheia (0,2): três características corretas. Metade (0,1): duas corretas. Zero (0): uma ou nenhuma.

### ITEM 01-b
**Resposta esperada:** Exemplos: **segurança** — a clínica guarda dados de saúde e precisa de usuários e permissões por setor; **transações ACID** — agendamento e pagamento da consulta salvos juntos; **desempenho** — buscar o histórico do paciente rapidamente; **modelo de dados** — tabelas de pacientes, médicos e consultas.
**Critérios:** Palavras-chave: duas características explicadas + exemplo da clínica. Nota cheia (0,4): duas explicadas com exemplo coerente. Metade (0,2): uma explicada com exemplo, ou duas sem exemplo. Zero (0): características erradas ou sem relação com a clínica.

### ITEM 01-c
**Resposta esperada:** A licença define o **custo** (gratuita ou paga) e o **que é permitido** (uso comercial, suporte). Um gerenciador **livre** (ex.: PostgreSQL) reduz custos; um **comercial** (ex.: Oracle) pode ter custo alto de licença e suporte.
**Critérios:** Palavras-chave: custo; permissões de uso/suporte; exemplo livre × comercial. Nota cheia (0,4): custo + o que é permitido ou exemplo. Metade (0,2): só "custa dinheiro". Zero (0): sem relação com licença.

### ITEM 02-a
**Resposta esperada:** **Conjunto de comandos que deve acontecer inteiro ou nada** (tudo ou nada).
**Critérios:** Nota cheia (0,2): ideia de conjunto + tudo ou nada. Metade (0,1): "um comando no banco" sem a ideia de tudo ou nada. Zero (0): confunde com backup ou pagamento.

### ITEM 02-b
**Resposta esperada:** **Atomicidade**: pagamento e gravação do pedido ficam na **mesma transação**; se uma parte falha, **nada é confirmado** e o banco volta ao estado anterior, então não fica pagamento sem pedido.
**Critérios:** Palavras-chave: atomicidade; mesma transação; tudo ou nada; desfaz. Nota cheia (0,4): nome + funcionamento na compra. Metade (0,2): só o nome, ou explicação sem o nome. Zero (0): outra propriedade sem explicação coerente.

### ITEM 02-c
**Resposta esperada:** **COMMIT** confirma tudo quando pagamento e pedido deram certo; **ROLLBACK** desfaz tudo se algo falhar (como a queda do servidor antes do fim), deixando o banco como estava.
**Critérios:** Palavras-chave: COMMIT confirma; ROLLBACK desfaz. Nota cheia (0,4): os dois comandos explicados na situação. Metade (0,2): só um explicado. Zero (0): funções trocadas.

### ITEM 03-a
**Resposta esperada:** **Atomicidade, Consistência, Isolamento e Durabilidade.**
**Critérios:** Nota cheia (0,2): as quatro. Metade (0,1): três. Zero (0): duas ou menos.

### ITEM 03-b
**Resposta esperada:** **Isolamento:** duas pessoas comprando o último ingresso ao mesmo tempo não vendem o mesmo lugar duas vezes. **Consistência:** o número de ingressos vendidos nunca passa da capacidade do show (regra respeitada).
**Critérios:** Nota cheia (0,4): dois exemplos coerentes. Metade (0,2): um exemplo coerente. Zero (0): exemplos trocados ou sem relação.

### ITEM 03-c
**Resposta esperada:** **Durabilidade:** depois de confirmada a compra, o ingresso continua registrado mesmo se o servidor cair em seguida. Sem ela, o cliente **pagaria e perderia o ingresso** depois de uma queda de energia.
**Critérios:** Nota cheia (0,4): exemplo + consequência. Metade (0,2): só um dos dois. Zero (0): confunde com outra propriedade.

### ITEM 04-a
**Resposta esperada:** Capacidade de o gerenciador **aguentar crescer** (mais dados e mais acessos) mantendo o desempenho.
**Critérios:** Nota cheia (0,2): crescer + manter funcionamento/desempenho. Metade (0,1): só "ficar maior". Zero (0): sem relação.

### ITEM 04-b
**Resposta esperada:** **Vertical:** aumentar os recursos do **mesmo servidor** (mais memória, processador melhor). **Horizontal:** acrescentar **mais servidores** para dividir a carga (ex.: servidores de leitura nas promoções).
**Critérios:** Nota cheia (0,4): as duas diferenciadas com exemplo da loja. Metade (0,2): diferença certa sem exemplo, ou só uma explicada. Zero (0): conceitos trocados.

### ITEM 04-c
**Resposta esperada:** **Índices** (ou otimizador de consultas, cache): o índice funciona como o índice de um livro, permitindo achar as linhas **sem ler a tabela inteira**, o que deixa a consulta mais rápida.
**Critérios:** Nota cheia (0,4): recurso correto + como ajuda. Metade (0,2): recurso sem explicação. Zero (0): recurso sem relação com desempenho.

### ITEM 05-a
**Resposta esperada:** PostgreSQL, MySQL e SQLite: **relacionais**; MongoDB: **documentos (não relacional)**.
**Critérios:** Nota cheia (0,2): os quatro corretos. Metade (0,1): um erro. Zero (0): dois ou mais erros.

### ITEM 05-b
**Resposta esperada:** **PostgreSQL** roda como **servidor**, atende muitos usuários ao mesmo tempo e é usado em sistemas web e APIs. **SQLite** é um **arquivo** usado direto pela aplicação, **sem servidor**, ideal para apps de celular, protótipos e testes.
**Critérios:** Nota cheia (0,4): uso típico + com/sem servidor dos dois. Metade (0,2): só um dos aspectos. Zero (0): descrições trocadas.

### ITEM 05-c
**Resposta esperada:** MongoDB quando os dados têm **estrutura variável** (ex.: catálogo em que cada categoria tem campos diferentes). O PostgreSQL oferece **colunas JSON**, que também guardam dados de formato variável.
**Critérios:** Nota cheia (0,4): situação + recurso JSON do PostgreSQL. Metade (0,2): só um dos dois. Zero (0): situação sem relação com estrutura variável.

### ITEM 06-a
**Resposta esperada:** Quatro entre: **sistema operacional** suportado (64 bits), **memória**, **processador**, **espaço em disco**, **rede/porta/firewall**, **versão compatível com o back-end**, **conhecimento da equipe**, **licença**.
**Critérios:** Nota cheia (0,2): quatro corretos. Metade (0,1): dois ou três. Zero (0): um ou nenhum.

### ITEM 06-b
**Resposta esperada:** O PostgreSQL usa a **porta 5432**; ela deve estar **liberada no firewall** apenas para o **servidor da aplicação** (e para quem administra), e o servidor da aplicação precisa alcançar o servidor do banco pela rede.
**Critérios:** Palavras-chave: 5432; firewall; acesso do servidor da aplicação. Nota cheia (0,4): porta + firewall + quem acessa. Metade (0,2): porta correta sem firewall, ou firewall sem porta. Zero (0): porta errada e sem explicação.

### ITEM 06-c
**Resposta esperada:** Porque o disco precisa guardar também **índices**, **registros de transação/logs** e **backups**, além do **crescimento** dos dados ao longo do tempo.
**Critérios:** Nota cheia (0,4): crescimento + pelo menos um item além dos dados (índices, logs, backups). Metade (0,2): só crescimento ou só backups. Zero (0): sem relação.

### ITEM 07-a
**Resposta esperada:** Secretaria vê nome e curso: **externo**; tabelas aluno, curso, matricula: **conceitual (lógico)**; arquivos e índices no disco: **físico**.
**Critérios:** Nota cheia (0,2): os três corretos. Metade (0,1): dois corretos. Zero (0): um ou nenhum.

### ITEM 07-b
**Resposta esperada:** O nível externo cria **visões**: cada setor enxerga **só a parte dos dados de que precisa** (ex.: financeiro vê mensalidades, secretaria vê matrículas), sem mudar as tabelas e protegendo dados que o setor não deve ver.
**Critérios:** Palavras-chave: visões; cada setor vê só o necessário; sem mudar as tabelas. Nota cheia (0,4): explicação + exemplo de setores. Metade (0,2): explicação sem exemplo. Zero (0): confunde com nível físico.

### ITEM 07-c
**Resposta esperada:** O **conceitual** descreve **o que** existe no banco (tabelas, colunas, chaves e regras); o **físico** descreve **como** os dados são gravados (arquivos, páginas, índices no disco).
**Critérios:** Nota cheia (0,4): diferença "o que × como" com exemplos. Metade (0,2): só um nível explicado. Zero (0): níveis trocados.

### ITEM 08-a
**Resposta esperada:** (1) coluna telefone: **independência lógica**; (2) trocar de disco: **independência física**.
**Critérios:** Nota cheia (0,2): as duas corretas. Metade (0,1): não se aplica (é tudo ou nada nesta). Zero (0): trocadas.

### ITEM 08-b
**Resposta esperada:** As telas que não usam a coluna telefone **continuam funcionando sem nenhuma alteração**, porque a mudança no nível conceitual não afeta as visões que não dependem dela.
**Critérios:** Palavras-chave: telas continuam funcionando; sem alteração; nível conceitual. Nota cheia (0,4): garantia + motivo. Metade (0,2): só "não quebra". Zero (0): diz que todas as telas precisam ser refeitas.

### ITEM 08-c
**Resposta esperada:** A aplicação e as tabelas **não precisam mudar**: o SGBD cuida de onde e como os dados são gravados; a aplicação continua usando o mesmo SQL.
**Critérios:** Nota cheia (0,4): aplicação/tabelas sem mudança + SGBD cuida do armazenamento. Metade (0,2): só uma parte. Zero (0): diz que a aplicação precisa ser reescrita.

### ITEM 09-a
**Resposta esperada:** **Usuário final**, **desenvolvedor** e **administrador de banco (DBA)**.
**Critérios:** Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 09-b
**Resposta esperada:** O desenvolvedor **modela os dados** e **escreve o SQL** usado pela aplicação. Exemplo: criar a tabela de clientes ou escrever a consulta que lista os pedidos do mês.
**Critérios:** Nota cheia (0,4): função + exemplo. Metade (0,2): só a função ou só o exemplo. Zero (0): descreve tarefa do usuário final.

### ITEM 09-c
**Resposta esperada:** Três entre: **instalar e configurar** o SGBD, fazer **backup e restauração**, cuidar do **desempenho**, **controlar acessos** (usuários e permissões), monitorar o servidor. São importantes porque mantêm os dados **disponíveis, seguros e recuperáveis**.
**Critérios:** Nota cheia (0,4): três tarefas + importância. Metade (0,2): duas tarefas ou três sem importância. Zero (0): tarefas de outro papel.

### ITEM 10-a
**Resposta esperada:** **500 acessos simultâneos**, **pagamentos (transações)**, **orçamento baixo**, **equipe que conhece SQL** (sistema web).
**Critérios:** Nota cheia (0,2): três ou quatro requisitos. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 10-b
**Resposta esperada:** **PostgreSQL** (ou MySQL/MariaDB): é **livre** (orçamento baixo), **relacional com SQL** (equipe já conhece), tem **transações ACID** (pagamentos) e suporta **muitos acessos** como servidor.
**Critérios:** Nota cheia (0,4): gerenciador relacional servidor livre + dois requisitos. Metade (0,2): gerenciador adequado + um requisito. Zero (0): SQLite, planilha ou comercial caro sem justificativa coerente.

### ITEM 10-c
**Resposta esperada:** O SQLite é um **arquivo sem servidor**, pensado para **um aplicativo local**; não é adequado para **500 acessos simultâneos** de um sistema web com pagamentos, pois tem **concorrência limitada** para gravações ao mesmo tempo.
**Critérios:** Palavras-chave: sem servidor/arquivo; acessos simultâneos; concorrência limitada. Nota cheia (0,4): motivo técnico ligado aos acessos. Metade (0,2): "é fraco" sem dizer por quê. Zero (0): diz que o SQLite não usa SQL ou não guarda dados.
