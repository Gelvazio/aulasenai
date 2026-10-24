## Etapa 520-7f3b9c20 — Card "Notas e média" no índice de atividades (aluno e professor)

**Tarefa:** #371-7f3b9c20 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "CRIE 1 CARD AQUI, QUE MOSTRE A NOTA DE TODAS AS ATIVIDADES E A MEDIA DO ALUNO, PARA O ALUNO E PARA O PROFESSOR, MAS PARA O PROFESSOR, ELE DEVE SELECIONAR O ALUNO, PARA O ALUNO JA DEVE VIR CARREGADO COM OS DADOS DELE" e, em seguida: "USE VARIOS AGENTES, DEVE TER TODAS AS ATIVIDADES NO QUADRO E SOMENTE PARA O PROFESSOR, AO LADO DE CADA 1 DELAS, DEVE TER UM BOTAO DE NOME *ADICIONAR NA MEDIA* DO TIPO ON/OFF, E UM CAMPO COM O PESO, ISSO DEVE RECALCULAR A MEDIA DO ALUNO SELECIONADO".
**Objetivo:** um card na grade do `ATIVIDADES/index.html` com a nota de cada atividade e a média (ponderada) do aluno; o professor escolhe turma e aluno e controla, por atividade, se entra na média e com que peso.

### Escopo
- **Entra:** card novo (1º da grade, largura total) em `assets/js` + `assets/css`, ligado ao índice de Introdução à TIC e ao gerador de índices; tabela de configuração no banco; função de notas do aluno para o professor; documentação.
- **Não entra:** mudar a página `AVALIACAO-MEDIA-FINAL.html`; mudar notas ou correções; os outros índices já gerados (só o gerador recebe o card, sem regerar).

### Plano (tarefa grande: banco + RLS — aguarda o "sim" do usuário)
1. **Banco (SQL idempotente, `database/2026-10-24-media-atividade-config.sql`):**
   - tabela `media_atividade_config(atividade_id, turma_codigo, na_media boolean default true, peso numeric default 1 check (peso >= 0), atualizado_por, atualizado_em)`, chave `(atividade_id, turma_codigo)`. RLS: professor da turma lê e grava (`professor_tem_turma`); aluno só lê as linhas da própria turma; `anon` sem acesso. Sem linha = ON, peso 1.
   - função `notas_aluno_para_professor(p_aluno uuid, p_paginas text[])`: mesma conta de `notas_media_final`, para o aluno escolhido, só se `eh_professor()` e o professor tiver a turma do aluno; nunca devolve gabarito.
2. **Cálculo:** média ponderada = Σ(nota × peso) ÷ Σ(peso) das atividades com **ON e com nota** (discursiva sem correção = "Aguardando correção", fora da conta). Sem nenhuma nota: "—".
3. **Card:** tabela Aula · Atividade · Nota · (professor: ON/OFF "Adicionar na média" + campo Peso). Aluno: já carregado com as próprias notas, vê tudo, sem controles. Professor: combos Turma (favorita) e Aluno ("Selecione o Aluno"); mudar ON/OFF ou peso grava no banco e recalcula na hora.
4. **Atividades da lista:** os links já presentes nos cards das aulas (inclui bloqueadas, que o aluno não lê no banco).

### Riscos
- Aluno ver nota de outro: a função do aluno usa só `auth.uid()`; a do professor exige `eh_professor()` e turma. Plano B: não publicar a função.
- Banco de produção: só com o "sim" do usuário; SQL idempotente, sem apagar dados.

### Decisões
- **Aprovado pelo usuário em 2026-10-24** ("sim, aprovado o plano da #371; use vários agentes"). Média ponderada só das atividades ON com nota; padrão ON e peso 1; configuração por turma.

### #371.1 — SQL: tabela de configuração + função de notas para o professor

**Próximo passo:** escrever o SQL e, com o "sim", aplicar pelo Claude Code local.

- **Nível:** PESADO — banco/RLS (Jev: PESADO, matriz)
- **Modelo:** só Sonnet
- **Verificação:** consulta de leitura ao banco, policies conferidas.

### #371.2 — Repositório de dados do card (atividades, notas, config)

**Próximo passo:** depende da .1.

- **Nível:** PESADO — Jev sugeriu mais de 3 arquivos; vale a matriz
- **Modelo:** só Sonnet

### #371.3 — Visão do card: tabela, média ponderada, ON/OFF e peso

**Próximo passo:** depende da .2.

- **Nível:** PESADO — Jev sugeriu mais de 3 arquivos; vale a matriz
- **Modelo:** só Sonnet

### #371.4 — CSS, ligação no índice e no gerador

**Próximo passo:** depende da .3.

- **Nível:** PESADO — mesma classificação da tarefa
- **Modelo:** só Sonnet

### #371.5 — Documentação (`docs/database.md`, relatório HTML, orientação)

**Próximo passo:** depende da .1 aplicada.

- **Nível:** PESADO — mesma classificação da tarefa
- **Modelo:** só Sonnet
