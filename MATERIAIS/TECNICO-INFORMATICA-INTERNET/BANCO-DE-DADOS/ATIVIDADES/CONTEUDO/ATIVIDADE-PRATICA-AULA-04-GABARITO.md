# Padrão de Resposta — Atividade Prática — Aula 04 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Configuração do SGBD e Infraestrutura do Sistema.
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
**Resposta esperada:** Controla **como o servidor funciona**: endereços, porta, conexões, memória, fuso horário e registros (log).
**Critérios:** Nota cheia (0,2): ideia de funcionamento do servidor com dois exemplos. Metade (0,1): definição vaga. Zero (0): confunde com o pg_hba.conf.

### ITEM 01-b
**Resposta esperada:** Controla **quem pode conectar, de onde, a qual banco e como se autentica**. Cada linha tem: **tipo** (local/host), **banco**, **usuário**, **endereço** e **método** de autenticação.
**Critérios:** Nota cheia (0,4): função + as cinco partes (aceitar quatro). Metade (0,2): só a função ou só as partes. Zero (0): confunde com parâmetros de memória/porta.

### ITEM 01-c
**Resposta esperada:** **SHOW config_file;** e **SHOW hba_file;** (também SHOW data_directory;). São úteis para **achar o arquivo certo** que o servidor está usando antes de alterar, já que a localização muda conforme o sistema e a instalação.
**Critérios:** Nota cheia (0,4): os dois comandos + utilidade. Metade (0,2): um comando com utilidade, ou os dois sem utilidade. Zero (0): comandos inexistentes.

### ITEM 02-a
**Resposta esperada:** Com **'localhost'** o servidor só aceita conexões **da própria máquina**; o back-end em outro servidor não é atendido.
**Critérios:** Nota cheia (0,2): explicação correta. Metade (0,1): "está bloqueado" sem dizer por quê. Zero (0): culpa a senha.

### ITEM 02-b
**Resposta esperada:** **listen_addresses = '10.0.0.30'** (o IP do servidor de banco na rede interna; '*' só com firewall e pg_hba restritos). Também é preciso: **linha no pg_hba.conf** liberando o back-end, **porta liberada no firewall** para ele e **reiniciar** o serviço.
**Critérios:** Nota cheia (0,4): valor coerente + pelo menos dois dos complementos (pg_hba, firewall, restart). Metade (0,2): só o valor ou só os complementos. Zero (0): "trust para todos".

### ITEM 02-c
**Resposta esperada:** **max_connections** define o **máximo de conexões ao mesmo tempo**. Para 150 acessos, ajustar o valor com folga (ex.: 200) **ou** usar um **pool de conexões** no back-end, considerando que cada conexão usa memória do servidor.
**Critérios:** Nota cheia (0,4): definição + decisão para os 150 (valor com folga ou pool) com justificativa. Metade (0,2): só a definição. Zero (0): definição errada.

### ITEM 03-a
**Resposta esperada:** **timezone = 'America/Sao_Paulo'**.
**Critérios:** Nota cheia (0,2): parâmetro e valor. Metade (0,1): só o parâmetro. Zero (0): parâmetro errado.

### ITEM 03-b
**Resposta esperada:** **ALTER SYSTEM SET timezone = 'America/Sao_Paulo';** e **SELECT pg_reload_conf();**
**Critérios:** Nota cheia (0,4): os dois comandos. Metade (0,2): um. Zero (0): nenhum.

### ITEM 03-c
**Resposta esperada:** **log_connections = on** registra **cada conexão** no log (quem, quando, de onde), ajudando a **auditoria**. **shared_buffers** é a **memória reservada para cache** de dados, que acelera as consultas.
**Critérios:** Nota cheia (0,4): os dois explicados. Metade (0,2): um explicado. Zero (0): nenhum.

### ITEM 04-a
**Resposta esperada:** Permite que **qualquer usuário**, de **qualquer endereço** (0.0.0.0/0), entre em **qualquer banco** **sem senha** (trust).
**Critérios:** Nota cheia (0,2): todos/qualquer endereço/sem senha. Metade (0,1): só "sem senha". Zero (0): interpretação errada.

### ITEM 04-b
**Resposta esperada:** Qualquer pessoa que alcance o servidor pela rede pode **entrar sem senha**, inclusive como superusuário, e **ler, alterar ou apagar** todos os dados. O **trust** dispensa autenticação, por isso nunca deve ser usado em servidor real.
**Critérios:** Nota cheia (0,4): risco concreto + motivo do trust. Metade (0,2): "é inseguro" sem explicar. Zero (0): diz que é seguro.

### ITEM 04-c
**Resposta esperada:** **host escola_db app_escola 10.0.0.20/32 scram-sha-256**; depois de salvar, **recarregar** a configuração (**SELECT pg_reload_conf();**) e **remover** a linha com trust.
**Critérios:** Nota cheia (0,4): linha correta + reload. Metade (0,2): linha correta sem reload, ou com um campo errado e reload. Zero (0): mantém trust ou 0.0.0.0/0.

### ITEM 05-a
**Resposta esperada:** **CREATE DATABASE escola_db ENCODING 'UTF8';**
**Critérios:** Nota cheia (0,2): comando correto. Metade (0,1): sem a codificação. Zero (0): CREATE TABLE ou comando inexistente.

### ITEM 05-b
**Resposta esperada:** **CREATE ROLE app_escola LOGIN PASSWORD 'senha-forte';** e **GRANT CONNECT ON DATABASE escola_db TO app_escola;** (CREATE USER também é aceito).
**Critérios:** Nota cheia (0,4): criação com login/senha + GRANT CONNECT. Metade (0,2): só um dos comandos. Zero (0): nenhum correto.

### ITEM 05-c
**Resposta esperada:** O postgres é **superusuário**: se a aplicação for invadida, o invasor ganha **poder total** sobre o servidor. A aplicação usa um usuário com **permissões mínimas**. Teste: **psql -U app_escola -h localhost -d escola_db**.
**Critérios:** Nota cheia (0,4): motivo (poder total / permissões mínimas) + comando de teste. Metade (0,2): só um. Zero (0): defende usar o postgres.

### ITEM 06-a
**Resposta esperada:** Usuário **app_escola**; servidor **10.0.0.30**; porta **5432**; banco **escola_db**.
**Critérios:** Nota cheia (0,2): os quatro. Metade (0,1): três. Zero (0): dois ou menos.

### ITEM 06-b
**Resposta esperada:** Quem tem acesso ao **código ou ao repositório** (colegas, GitHub, vazamento) passa a ter a **senha do banco**; trocar a senha exige **mudar o código**; o risco de **acesso indevido aos dados** aumenta.
**Critérios:** Nota cheia (0,4): exposição + consequência. Metade (0,2): só "é inseguro". Zero (0): diz que não há problema.

### ITEM 06-c
**Resposta esperada:** A string fica numa **variável de ambiente** (ex.: **DATABASE_URL**) configurada no servidor; o arquivo **.env**, se usado, fica **fora do repositório** (listado no .gitignore) e nunca é publicado.
**Critérios:** Nota cheia (0,4): variável de ambiente + .env fora do Git. Metade (0,2): só um dos dois. Zero (0): sugere outro lugar público.

### ITEM 07-a
**Resposta esperada:** **Navegador → (HTTPS) → back-end no 10.0.0.20 → (rede interna, porta 5432) → PostgreSQL no 10.0.0.30**; a resposta faz o caminho inverso.
**Critérios:** Nota cheia (0,2): caminho com as três partes na ordem. Metade (0,1): falta uma parte. Zero (0): navegador direto ao banco.

### ITEM 07-b
**Resposta esperada:** Na rede interna, **só o back-end (e os administradores)** alcançam o banco; ninguém da internet consegue tentar senhas ou explorar falhas do servidor de banco. O navegador nunca fala com o banco, só com o back-end, que aplica as regras.
**Critérios:** Nota cheia (0,4): proteção + papel do back-end. Metade (0,2): só "mais seguro". Zero (0): defende acesso direto.

### ITEM 07-c
**Resposta esperada:** **Liberar a porta 5432 apenas para o servidor do back-end (10.0.0.20)** e para a máquina de administração, bloqueando todo o resto.
**Critérios:** Nota cheia (0,4): porta + origem restrita + bloqueio do resto. Metade (0,2): porta liberada sem restringir a origem. Zero (0): abrir para todos ou desligar o firewall.

### ITEM 08-a
**Resposta esperada:** (1) ajustar **max_connections** e usar **pool de conexões**; (2) **backup automático em outro disco/servidor** e monitoramento; (3) **memória (shared_buffers) e disco rápido** (e índices).
**Critérios:** Nota cheia (0,2): três decisões coerentes. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 08-b
**Resposta esperada:** O pool **mantém um conjunto de conexões abertas** e as **reaproveita** entre os pedidos, em vez de abrir uma nova a cada acesso. Na semana de matrícula evita estourar o **max_connections** e reduz o tempo de cada pedido.
**Critérios:** Nota cheia (0,4): definição + benefício na situação. Metade (0,2): só a definição. Zero (0): definição errada.

### ITEM 08-c
**Resposta esperada:** Backup **automático e periódico** (ex.: diário), guardado **fora do servidor de banco** (outro disco, outro servidor ou nuvem), com **teste de restauração** de tempos em tempos.
**Critérios:** Nota cheia (0,4): automático + em outro lugar + teste. Metade (0,2): dois dos três. Zero (0): backup no mesmo disco ou nenhum.

### ITEM 09-a
**Resposta esperada:** Nova linha no pg_hba.conf: **reload**. Troca de porta: **restart**.
**Critérios:** Nota cheia (0,2): as duas corretas. Zero (0): trocadas.

### ITEM 09-b
**Resposta esperada:** O **reload** aplica as mudanças **sem derrubar** as conexões abertas; o **restart** **para e inicia** o serviço, **derrubando** todas as conexões.
**Critérios:** Nota cheia (0,4): diferença quanto às conexões. Metade (0,2): diferença vaga. Zero (0): invertida.

### ITEM 09-c
**Resposta esperada:** Fazer a troca de porta **fora do horário de uso** (avisando a equipe), porque o restart derruba as conexões. Depois, atualizar a **porta na string de conexão** do back-end, no **firewall**, no **pgAdmin** e na **ficha de configuração**.
**Critérios:** Nota cheia (0,4): quando + o que atualizar (ao menos dois). Metade (0,2): só um dos dois. Zero (0): fazer em pleno horário sem atualizar nada.

### ITEM 10-a
**Resposta esperada:** **Parâmetros ajustados com valores**, **linhas do pg_hba.conf**, **banco e usuário da aplicação criados**, **string de conexão sem a senha real** e **desenho da infraestrutura** (versão e porta também).
**Critérios:** Nota cheia (0,2): quatro ou mais itens. Metade (0,1): dois ou três. Zero (0): inclui a senha real como item.

### ITEM 10-b
**Resposta esperada:** A ficha circula entre várias pessoas e pode ser arquivada ou publicada; com a senha nela, **qualquer leitor** acessaria o banco. A senha é passada pelo **cofre/gerenciador de senhas** da equipe, só para quem precisa.
**Critérios:** Nota cheia (0,4): motivo + canal seguro. Metade (0,2): só um. Zero (0): manda incluir a senha.

### ITEM 10-c
**Resposta esperada:** Do servidor do back-end, conectar com **psql -U app_escola -h 10.0.0.30 -d escola_db** (ou testar pela aplicação) e ver que entra; de um computador **não autorizado**, tentar a mesma conexão e confirmar a **recusa** (erro de pg_hba.conf ou bloqueio do firewall).
**Critérios:** Nota cheia (0,4): teste positivo + teste negativo. Metade (0,2): só um dos testes. Zero (0): nenhum teste coerente.
