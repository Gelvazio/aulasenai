# Atividade: Atividade Prática — Aula 04 — 10 Questões Discursivas

- **Aula:** AP-04
- **Rótulo da aula:** Atividade Prática — Aula 04
- **Tema:** Configuração do SGBD e Infraestrutura do Sistema
- **Ícone:** 🛠️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-04.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de configuração, os conteúdos da aula 04 (CONTEUDO/AULA-04-CONFIGURACAO-DO-SGBD-E-INFRAESTRUTURA.md): postgresql.conf e pg_hba.conf, parâmetros básicos, métodos de autenticação, banco e usuário da aplicação, string de conexão e variáveis de ambiente, arquitetura e firewall, reload e restart.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-04-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 4

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para configurar o PostgreSQL de um sistema web de matrículas e ligar o banco à infraestrutura (back-end, rede e servidores).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito, o comando ou a configuração pedida; **(2)** a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito ou comando certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Comandos equivalentes que funcionem no PostgreSQL valem. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 04 | Questões |
|---|---|
| postgresql.conf e pg_hba.conf | 01 |
| Parâmetros básicos (endereços, porta, conexões, memória, fuso) | 02, 03 |
| pg_hba.conf e métodos de autenticação | 04 |
| Banco e usuário da aplicação | 05 |
| String de conexão e variáveis de ambiente | 06 |
| Infraestrutura, rede e firewall | 07, 08 |
| Reload × restart | 09 |
| Ficha de configuração | 10 |

---

## ITEM 01 — Os Dois Arquivos de Configuração

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, abre a pasta de configuração do PostgreSQL de uma escola e encontra os arquivos postgresql.conf e pg_hba.conf. O coordenador pergunta para que serve cada um.

**Comando:**
Explique os arquivos.

**Tópicos:**
- a) Diga, em uma frase, o que controla o postgresql.conf. (0,2)
- b) Explique o que controla o pg_hba.conf e cite as informações que cada linha dele tem. (0,4)
- c) Escreva os comandos SQL que mostram onde estão os dois arquivos e explique quando eles são úteis. (0,4)

---

## ITEM 02 — Endereços, Porta e Conexões

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, recebe o banco de uma escola configurado com listen_addresses = 'localhost'. O back-end, em outro servidor, não consegue conectar. A escola espera até 150 acessos ao mesmo tempo.

**Comando:**
Ajuste os parâmetros.

**Tópicos:**
- a) Explique por que o back-end em outro servidor não consegue conectar. (0,2)
- b) Diga qual valor colocar em listen_addresses e o que mais é preciso para o back-end entrar. (0,4)
- c) Explique o parâmetro max_connections e o que considerar para os 150 acessos. (0,4)

---

## ITEM 03 — Memória, Fuso e Registros

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, percebe que as matrículas aparecem com horário errado e que a escola quer saber quem conectou no banco em cada dia.

**Comando:**
Configure os parâmetros adequados.

**Tópicos:**
- a) Diga qual parâmetro corrige o horário e o valor para o Brasil. (0,2)
- b) Escreva o comando que altera esse parâmetro e o comando que aplica a mudança sem reiniciar. (0,4)
- c) Explique qual parâmetro registra as conexões e o parâmetro shared_buffers, dizendo para que serve cada um. (0,4)

---

## ITEM 04 — Regras do pg_hba.conf

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, encontra no pg_hba.conf da escola a linha "host all all 0.0.0.0/0 trust".

**Comando:**
Analise e corrija a regra.

**Tópicos:**
- a) Explique o que essa linha permite. (0,2)
- b) Explique o risco dessa linha e por que o método trust não deve ser usado. (0,4)
- c) Escreva uma linha segura que libere só o usuário app_escola no banco escola_db a partir do servidor 10.0.0.20, e diga o que fazer depois de salvar. (0,4)

---

## ITEM 05 — Banco e Usuário da Aplicação

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, vai preparar o banco do sistema de matrículas. O desenvolvedor sugere usar o banco postgres e o usuário postgres para tudo.

**Comando:**
Crie o banco e o usuário corretos.

**Tópicos:**
- a) Escreva o comando que cria o banco escola_db em UTF8. (0,2)
- b) Escreva os comandos que criam o usuário app_escola com senha e permitem que ele se conecte ao banco. (0,4)
- c) Explique por que não usar o usuário postgres na aplicação e como testar a conexão com o novo usuário. (0,4)

---

## ITEM 06 — String de Conexão e Senha Fora do Código

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, revisa o código do back-end e encontra escrito: postgresql://app_escola:Matricula2026@10.0.0.30:5432/escola_db.

**Comando:**
Analise a conexão.

**Tópicos:**
- a) Identifique na string o usuário, o servidor, a porta e o banco. (0,2)
- b) Explique o problema de a senha estar escrita no código. (0,4)
- c) Explique onde a string deve ficar e o cuidado com o arquivo .env no repositório. (0,4)

---

## ITEM 07 — Desenhando a Infraestrutura

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai desenhar a infraestrutura do sistema de matrículas: os alunos usam o navegador, o back-end fica no servidor 10.0.0.20 e o banco no 10.0.0.30.

**Comando:**
Descreva a arquitetura.

**Tópicos:**
- a) Descreva o caminho de uma requisição, do navegador até o banco. (0,2)
- b) Explique por que o banco deve ficar numa rede interna e não acessível pelo navegador. (0,4)
- c) Explique a regra de firewall adequada para o servidor de banco. (0,4)

---

## ITEM 08 — Correlacionando Necessidades e Infraestrutura

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, recebe três necessidades da escola: (1) muitos acessos na semana de matrícula; (2) não perder dados se o servidor estragar; (3) consultas mais rápidas.

**Comando:**
Indique a decisão de infraestrutura de cada necessidade.

**Tópicos:**
- a) Indique uma decisão para cada uma das três necessidades. (0,2)
- b) Explique o que é um pool de conexões e como ele ajuda na necessidade 1. (0,4)
- c) Explique como deve ser o backup para atender a necessidade 2. (0,4)

---

## ITEM 09 — Reload ou Restart

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, precisa aplicar duas mudanças no servidor da escola em pleno horário de matrículas: (1) uma nova linha no pg_hba.conf; (2) a troca da porta de 5432 para 5433.

**Comando:**
Planeje a aplicação das mudanças.

**Tópicos:**
- a) Diga qual mudança precisa de reload e qual precisa de restart. (0,2)
- b) Explique a diferença entre reload e restart quanto às conexões abertas. (0,4)
- c) Explique quando fazer a troca da porta e o que mais precisa ser atualizado depois dela. (0,4)

---

## ITEM 10 — Ficha de Configuração do Ambiente

- **Aula:** 04 · Configuração do SGBD
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, vai entregar à escola a ficha de configuração do ambiente do banco, para que outra pessoa consiga repetir tudo.

**Comando:**
Monte a ficha.

**Tópicos:**
- a) Liste os itens que a ficha de configuração deve ter. (0,2)
- b) Explique por que a ficha não deve conter a senha real e como a senha é informada à equipe. (0,4)
- c) Explique como conferir, depois de configurar, que o back-end consegue conectar com o usuário da aplicação e que um computador não autorizado não consegue. (0,4)
