# Atividade: Atividade Prática — Aula 03 — 10 Questões Discursivas

- **Aula:** AP-03
- **Rótulo da aula:** Atividade Prática — Aula 03
- **Tema:** Preparação do Ambiente: Instalação do PostgreSQL
- **Ícone:** 💿
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-03.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de preparação de ambiente, os conteúdos da aula 03 (CONTEUDO/AULA-03-PREPARACAO-DO-AMBIENTE-INSTALACAO-DO-POSTGRESQL.md): checklist de requisitos, componentes do PostgreSQL, instalação no Windows e no Linux, senha do superusuário, porta, locale e UTF8, serviço, conferência da instalação e solução de problemas.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-03-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 3

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para preparar e conferir o ambiente do PostgreSQL das máquinas de uma equipe que vai desenvolver um sistema web.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, com as suas palavras: **(1)** o conceito, o comando ou a classificação pedida; **(2)** a aplicação na situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conceito ou comando certo, aplicação certa na situação e justificativa com as palavras-chave do conteúdo. Comandos equivalentes que funcionem no PostgreSQL valem. Erros de português não tiram nota se a ideia estiver clara.

## Cobertura da aula

| Conteúdo da aula 03 | Questões |
|---|---|
| Checklist antes de instalar | 01 |
| Componentes do PostgreSQL | 02 |
| Instalação no Windows (passos, senha, porta, locale) | 03, 04 |
| Instalação no Linux | 05 |
| Conferindo a instalação (psql e pgAdmin) | 06 |
| Serviço do PostgreSQL | 07 |
| Problemas comuns e soluções | 08, 09 |
| Boas práticas e roteiro de instalação | 10 |

---

## ITEM 01 — Checklist Antes de Instalar

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C10

**Contexto:**
Você, como aluno consultor, vai instalar o PostgreSQL nos 15 computadores do laboratório de uma escola. O técnico quer começar imediatamente, sem conferir nada.

**Comando:**
Monte o checklist e oriente o técnico.

**Tópicos:**
- a) Cite quatro itens que devem ser conferidos antes de instalar. (0,2)
- b) Explique por que todas as máquinas devem ficar com a mesma versão principal do PostgreSQL. (0,4)
- c) Explique o que pode acontecer se a porta 5432 já estiver em uso e como evitar o problema. (0,4)

---

## ITEM 02 — Componentes Instalados

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C10

**Contexto:**
Você, como aluno consultor, mostra a uma colega a tela de componentes do instalador: Server, pgAdmin, Stack Builder e Command Line Tools.

**Comando:**
Explique os componentes.

**Tópicos:**
- a) Diga a função do componente Server. (0,2)
- b) Explique a diferença entre o psql (Command Line Tools) e o pgAdmin. (0,4)
- c) Diga se o Stack Builder é obrigatório e explique o que é a pasta de dados escolhida na instalação. (0,4)

---

## ITEM 03 — Senha do Superusuário

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C10

**Contexto:**
Você, como aluno consultor, vê um colega definir a senha do usuário postgres como "123" e dizer que vai colocá-la no código do sistema para não esquecer.

**Comando:**
Oriente o colega.

**Tópicos:**
- a) Diga o que é o usuário postgres criado na instalação. (0,2)
- b) Explique por que a senha "123" e a senha no código do sistema são riscos. (0,4)
- c) Explique onde guardar a senha e com qual usuário a aplicação deve se conectar. (0,4)

---

## ITEM 04 — Porta, Locale e Codificação

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, recebe a reclamação de que nomes como "João" e "Conceição" aparecem com símbolos estranhos no banco recém-instalado.

**Comando:**
Analise as opções de instalação.

**Tópicos:**
- a) Diga qual é a porta padrão do PostgreSQL. (0,2)
- b) Explique o que é o locale escolhido na instalação e o que ele influencia. (0,4)
- c) Explique a causa provável dos acentos errados e qual codificação deve ser usada. (0,4)

---

## ITEM 05 — Instalação no Linux

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C10

**Contexto:**
Você, como aluno consultor, vai preparar um servidor Ubuntu para o banco de dados de um sistema web.

**Comando:**
Descreva a instalação e a conferência no Linux.

**Tópicos:**
- a) Escreva o comando que instala o PostgreSQL no Ubuntu. (0,2)
- b) Escreva o comando que mostra se o serviço está ativo e o que faz iniciar o serviço junto com o sistema. (0,4)
- c) Explique como entrar no psql como o usuário postgres logo após a instalação e por que esse usuário existe no sistema. (0,4)

---

## ITEM 06 — Conferindo a Instalação

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, precisa provar ao professor que a instalação no seu computador está funcionando.

**Comando:**
Mostre a conferência.

**Tópicos:**
- a) Escreva o comando de terminal que conecta ao servidor local com o usuário postgres na porta 5432. (0,2)
- b) Explique o que mostram os comandos SELECT version(); e \l dentro do psql. (0,4)
- c) Explique como registrar o servidor no pgAdmin e quais bancos devem aparecer numa instalação nova. (0,4)

---

## ITEM 07 — O Serviço do PostgreSQL

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, é chamado porque, depois de reiniciar o computador, o sistema da equipe não conecta mais ao banco.

**Comando:**
Investigue o serviço.

**Tópicos:**
- a) Explique o que significa o PostgreSQL rodar como serviço. (0,2)
- b) Explique como conferir e iniciar o serviço no Windows. (0,4)
- c) Explique como evitar que o problema se repita depois de reiniciar, no Windows ou no Linux. (0,4)

---

## ITEM 08 — Diagnóstico de Erros de Conexão

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C11

**Contexto:**
Você, como aluno consultor, recebe duas mensagens de erro: (1) "connection refused" na porta 5432; (2) "password authentication failed for user postgres".

**Comando:**
Diagnostique cada erro.

**Tópicos:**
- a) Diga a causa provável de cada um dos dois erros. (0,2)
- b) Explique os passos para resolver o erro 1. (0,4)
- c) Explique os passos para resolver o erro 2 sem expor a senha. (0,4)

---

## ITEM 09 — psql Não Reconhecido e Porta em Uso

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C10

**Contexto:**
Você, como aluno consultor, ajuda dois colegas: um digita psql no terminal do Windows e recebe "não é reconhecido como comando"; o outro recebe do instalador o aviso de que a porta 5432 está em uso.

**Comando:**
Resolva os dois casos.

**Tópicos:**
- a) Diga a causa provável de cada caso. (0,2)
- b) Explique duas formas de resolver o caso do psql não reconhecido. (0,4)
- c) Explique duas formas de resolver o caso da porta em uso e o cuidado com a conexão depois. (0,4)

---

## ITEM 10 — Roteiro de Instalação e Boas Práticas

- **Aula:** 03 · Instalação do PostgreSQL
- **Capacidade:** C10

**Contexto:**
Você, como aluno consultor, vai entregar à equipe um roteiro que permita repetir a instalação em qualquer máquina nova.

**Comando:**
Monte o roteiro e as boas práticas.

**Tópicos:**
- a) Liste o que deve ser registrado no roteiro de instalação. (0,2)
- b) Explique a ordem correta da preparação do ambiente, do checklist ao teste final. (0,4)
- c) Explique duas boas práticas de segurança da instalação e por que são importantes. (0,4)
