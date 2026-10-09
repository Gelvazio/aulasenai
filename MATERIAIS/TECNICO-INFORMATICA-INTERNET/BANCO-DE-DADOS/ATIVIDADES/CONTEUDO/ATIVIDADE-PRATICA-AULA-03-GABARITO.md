# Padrão de Resposta — Atividade Prática — Aula 03 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Preparação do Ambiente: Instalação do PostgreSQL.
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
**Resposta esperada:** Quatro entre: sistema operacional **64 bits** suportado; **espaço em disco**; **porta 5432 livre**; **permissão de administrador**; **versão** definida pela equipe; memória.
**Critérios:** Nota cheia (0,2): quatro itens corretos. Metade (0,1): dois ou três. Zero (0): um ou nenhum.

### ITEM 01-b
**Resposta esperada:** Para que o banco **se comporte igual** em todas as máquinas: comandos, recursos e scripts funcionam do mesmo jeito, evitando erros que só aparecem numa versão.
**Critérios:** Palavras-chave: mesmo comportamento; scripts/comandos iguais; evita erros entre máquinas. Nota cheia (0,4): motivo com consequência. Metade (0,2): "para ficar padronizado" sem consequência. Zero (0): sem relação.

### ITEM 01-c
**Resposta esperada:** Se outro PostgreSQL já usa a **5432**, o novo não consegue usar a mesma porta (o instalador avisa ou o serviço não sobe) e as conexões podem ir para o servidor errado. Evita-se **conferindo antes** se há instalação anterior e, se houver, **removendo-a** ou escolhendo **outra porta livre** (e registrando-a).
**Critérios:** Nota cheia (0,4): consequência + forma de evitar. Metade (0,2): só um dos dois. Zero (0): sem relação com porta.

### ITEM 02-a
**Resposta esperada:** O **Server** é o próprio **SGBD**: roda como **serviço** e **guarda os dados**, atendendo às conexões.
**Critérios:** Nota cheia (0,2): SGBD/serviço que guarda os dados. Metade (0,1): "o principal" sem explicar. Zero (0): confunde com cliente gráfico.

### ITEM 02-b
**Resposta esperada:** O **psql** é um cliente de **terminal** (comandos digitados); o **pgAdmin** é um cliente **gráfico** (janelas e menus). Os dois **conectam ao mesmo servidor** e executam SQL.
**Critérios:** Nota cheia (0,4): terminal × gráfico + mesmo servidor. Metade (0,2): só a diferença terminal × gráfico. Zero (0): diz que um deles guarda os dados.

### ITEM 02-c
**Resposta esperada:** O Stack Builder é **opcional** (instala extensões extras). A **pasta de dados** é onde o PostgreSQL grava **os arquivos do banco** (nível físico), importante para espaço em disco e backup.
**Critérios:** Nota cheia (0,4): opcional + definição da pasta de dados. Metade (0,2): só um dos dois. Zero (0): diz que é obrigatório e não explica a pasta.

### ITEM 03-a
**Resposta esperada:** É o **superusuário** do PostgreSQL, com **todos os poderes** sobre o servidor (criar bancos, usuários, apagar dados).
**Critérios:** Nota cheia (0,2): superusuário/administrador com todos os poderes. Metade (0,1): "usuário padrão" sem citar os poderes. Zero (0): confunde com usuário do sistema web.

### ITEM 03-b
**Resposta esperada:** "123" é **fácil de adivinhar**; no **código do sistema**, a senha fica visível para quem tem acesso ao código ou ao repositório. Com a senha do superusuário, alguém pode **ler, alterar ou apagar todo o banco**.
**Critérios:** Nota cheia (0,4): os dois riscos + consequência. Metade (0,2): só um risco. Zero (0): diz que não há risco.

### ITEM 03-c
**Resposta esperada:** Guardar num **gerenciador de senhas/cofre** de acesso restrito. A aplicação deve se conectar com um **usuário próprio**, com **apenas as permissões necessárias**, e nunca com o postgres.
**Critérios:** Nota cheia (0,4): local seguro + usuário próprio com permissões mínimas. Metade (0,2): só um dos dois. Zero (0): mantém a senha no código ou usa o postgres na aplicação.

### ITEM 04-a
**Resposta esperada:** **5432.**
**Critérios:** Nota cheia (0,2): 5432. Zero (0): outra porta.

### ITEM 04-b
**Resposta esperada:** O **locale** é o **idioma e a região** do banco (ex.: Portuguese, Brazil); influencia a **ordenação de textos**, comparação de letras e **formatos** de data e números.
**Critérios:** Nota cheia (0,4): definição + o que influencia. Metade (0,2): só a definição. Zero (0): confunde com porta ou senha.

### ITEM 04-c
**Resposta esperada:** Causa provável: **codificação** do banco diferente de **UTF8** (ou do cliente diferente da do banco). Deve-se usar **UTF8**, que guarda corretamente acentos e caracteres especiais.
**Critérios:** Palavras-chave: codificação; UTF8. Nota cheia (0,4): causa + UTF8. Metade (0,2): só UTF8 sem explicar a causa. Zero (0): culpa a porta ou o teclado.

### ITEM 05-a
**Resposta esperada:** **sudo apt install postgresql postgresql-contrib** (precedido de sudo apt update).
**Critérios:** Nota cheia (0,2): comando apt install postgresql. Metade (0,1): comando incompleto mas com apt e postgresql. Zero (0): comando de outro sistema.

### ITEM 05-b
**Resposta esperada:** **sudo systemctl status postgresql** mostra se está ativo; **sudo systemctl enable postgresql** faz iniciar junto com o sistema.
**Critérios:** Nota cheia (0,4): os dois comandos. Metade (0,2): um comando. Zero (0): nenhum correto.

### ITEM 05-c
**Resposta esperada:** **sudo -u postgres psql**: executa o psql como o **usuário postgres do sistema**, que a instalação cria para **rodar o serviço** e fazer o primeiro acesso local de administração.
**Critérios:** Nota cheia (0,4): comando + motivo do usuário. Metade (0,2): só o comando ou só o motivo. Zero (0): comando errado sem explicação.

### ITEM 06-a
**Resposta esperada:** **psql -U postgres -h localhost -p 5432**
**Critérios:** Nota cheia (0,2): comando com usuário, servidor e porta. Metade (0,1): falta um parâmetro. Zero (0): comando sem relação.

### ITEM 06-b
**Resposta esperada:** **SELECT version();** mostra a **versão do servidor** conectado; **\l** **lista os bancos** do servidor.
**Critérios:** Nota cheia (0,4): os dois corretos. Metade (0,2): um correto. Zero (0): nenhum.

### ITEM 06-c
**Resposta esperada:** No pgAdmin: **Servers → Register → Server**, informar **localhost, porta 5432, usuário postgres e senha**. Numa instalação nova aparecem os bancos **postgres, template0 e template1**.
**Critérios:** Nota cheia (0,4): dados do registro + bancos iniciais. Metade (0,2): só um dos dois. Zero (0): sem relação.

### ITEM 07-a
**Resposta esperada:** O servidor fica rodando **em segundo plano**, sem janela, **esperando conexões**; se o serviço para, ninguém conecta.
**Critérios:** Nota cheia (0,2): segundo plano + esperando conexões. Metade (0,1): só uma das ideias. Zero (0): confunde com o pgAdmin.

### ITEM 07-b
**Resposta esperada:** Abrir o aplicativo **Serviços** do Windows, localizar **postgresql-x64-NN**, conferir o **status** e clicar em **Iniciar** se estiver parado; depois testar a conexão de novo.
**Critérios:** Nota cheia (0,4): onde conferir + iniciar + testar. Metade (0,2): só "reiniciar o computador" ou só "abrir serviços". Zero (0): reinstalar tudo como primeira solução.

### ITEM 07-c
**Resposta esperada:** Deixar o serviço com início **automático**: no Windows, tipo de inicialização **Automático** nas propriedades do serviço; no Linux, **sudo systemctl enable postgresql**.
**Critérios:** Nota cheia (0,4): início automático em pelo menos um sistema, explicado. Metade (0,2): ideia de "iniciar sempre" sem dizer como. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** (1) **Serviço parado ou porta errada**; (2) **senha errada** para o usuário postgres.
**Critérios:** Nota cheia (0,2): as duas causas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 08-b
**Resposta esperada:** Conferir se o **serviço está ativo** (Serviços no Windows ou systemctl status no Linux) e iniciá-lo; conferir a **porta** usada na instalação (5432 ou outra registrada) e usá-la na conexão; se o banco estiver em outra máquina, conferir o **firewall**.
**Critérios:** Nota cheia (0,4): serviço + porta (firewall é bônus). Metade (0,2): só um passo. Zero (0): passos sem relação.

### ITEM 08-c
**Resposta esperada:** Conferir se o **usuário e a senha** digitados estão certos (sem erro de digitação, Caps Lock); se a senha foi perdida, pedir ao **DBA/responsável** que a **redefina** e guardá-la no **cofre de senhas**, sem enviá-la por mensagem aberta nem colocá-la no código.
**Critérios:** Nota cheia (0,4): conferir + redefinir com o responsável + não expor. Metade (0,2): só conferir ou só redefinir. Zero (0): sugere publicar a senha ou desligar a autenticação.

### ITEM 09-a
**Resposta esperada:** psql não reconhecido: a **pasta bin do PostgreSQL não está no PATH**. Porta em uso: **já existe outro PostgreSQL** (ou programa) usando a 5432.
**Critérios:** Nota cheia (0,2): as duas causas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 09-b
**Resposta esperada:** (1) usar o atalho **"SQL Shell (psql)"** instalado junto; (2) **acrescentar a pasta bin** do PostgreSQL ao **PATH** do Windows (ou chamar o psql pelo caminho completo).
**Critérios:** Nota cheia (0,4): duas formas. Metade (0,2): uma forma. Zero (0): reinstalar o Windows.

### ITEM 09-c
**Resposta esperada:** (1) **remover a instalação antiga** que ocupa a porta (se não for usada); (2) **usar outra porta livre** (ex.: 5433). Cuidado: depois, **todas as conexões** (psql, pgAdmin, aplicação) devem usar a porta nova, registrada no roteiro.
**Critérios:** Nota cheia (0,4): duas formas + cuidado com a conexão. Metade (0,2): uma forma ou duas sem o cuidado. Zero (0): instalar por cima na mesma porta.

### ITEM 10-a
**Resposta esperada:** **Versão**, **porta**, **pasta de dados**, **locale/codificação**, **data**, **quem instalou** (e problemas encontrados com a solução).
**Critérios:** Nota cheia (0,2): quatro ou mais itens. Metade (0,1): dois ou três. Zero (0): inclui a senha em texto aberto como item.

### ITEM 10-b
**Resposta esperada:** (1) conferir **requisitos** (checklist); (2) **instalar** (componentes, senha, porta, locale); (3) conferir o **serviço** ativo; (4) **testar a conexão** (psql e pgAdmin, SELECT version()).
**Critérios:** Nota cheia (0,4): as quatro etapas na ordem. Metade (0,2): etapas certas fora de ordem ou faltando uma. Zero (0): começa criando tabelas.

### ITEM 10-c
**Resposta esperada:** Duas entre: **senha forte** do postgres guardada em **cofre**; aplicação com **usuário próprio** de permissões mínimas; **baixar só do site oficial**; **instalar só os componentes necessários**; liberar a porta **só para quem precisa** no firewall. Importantes porque **reduzem o risco** de acesso indevido aos dados.
**Critérios:** Nota cheia (0,4): duas práticas + importância. Metade (0,2): uma prática ou duas sem importância. Zero (0): práticas inseguras.
