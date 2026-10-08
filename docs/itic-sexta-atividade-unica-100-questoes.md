# ITIC — sexta-feira: atividade objetiva única com 100 questões (Aulas 01 a 07)

**Criado em:** 2026-10-07 · **Status:** ✅ executado em 2026-10-07 (aprovado no mesmo dia) — aguardando aceite

## Objetivo
Juntar as duas atividades objetivas de sexta (40 questões, id 80, e 50 questões, id 85) em **uma
única atividade objetiva com 100 questões diferentes**, cobrindo todo o conteúdo das Aulas 01 a 07.

## Situação no banco (consulta de leitura, 2026-10-07)
| id | Página | Respostas | Entregas | Gabarito | Bloqueio |
|----|--------|-----------|----------|----------|----------|
| 80 | `ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html` (40) | 120 | **3** | 40 | todas as turmas |
| 85 | `ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07.html` (50) | 0 | 0 | 50 | todas as turmas |

⚠️ A id 80 **já tem 3 entregas** (notas de alunos): não pode ser apagada nem ter o gabarito trocado.

## Requisito do usuário (2026-10-07)
A atividade será **impressa** e respondida **com a apostila como consulta**: **toda resposta certa
tem de poder ser encontrada na apostila** (`APOSTILA/APOSTILA-INTRODUCAO-TIC.md`, capítulos 01 a 07).

## Validação contra a apostila (2026-10-07)
- ✅ **50 questões da id 85:** todas escritas a partir da apostila; respostas encontradas nos capítulos 01 a 07.
- ⛔ **40 questões da id 80:** cerca de 16 **não** podem ser respondidas pela apostila, porque
  dependem do trabalho em equipe (Manual de Comunicação do CD) ou do caso da Rota Certa:
  05 Brainstorming, 06 Papel do líder, 07 Equipe de 6, 08 Papéis registrados, 11 Encerramento da
  ata, 12 Relatório (caso), 13 Tabela do relatório, 15 Endereço B-03-04, 16 Diferença no
  inventário, 17 FEFO, 18 Sugestão de melhoria, 19 Pesquisa sobre FEFO, 30 Assunto do e-mail,
  31 Explicação ao cliente, 32 E-mail fictício, 40 Ctrl + Enter (a apostila não traz o atalho).
- ✅ As outras ~24 da id 80 têm resposta na apostila; 5 delas repetem tema da id 85 (Feedback,
  Comunicação assertiva, Phishing, Senha forte, Quebra de página) e saem.
- **Conta:** 50 (id 85) + ~19 aproveitadas da id 80 + **~31 novas**, escritas da apostila = 100.
- Cada questão leva na fonte a seção da apostila de onde sai a resposta (ex.: "Cap. 05 — Senhas"),
  para conferência; o PDF impresso não leva gabarito.

## Escopo
- **Entra:** nova fonte de 100 questões; página nova pelo gerador; reaproveitar a **id 85** (sem
  respostas) com o gabarito de 100 itens; tirar a id 80 do índice e do menu (página e banco ficam,
  para não perder as 3 entregas).
- **Não entra:** a atividade discursiva (id 81) continua como está; não apagar nada do banco.

## Passos
| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Juntar as 50 da id 85 com as ~19 da id 80 que têm resposta na apostila (sem as 16 fora da apostila e sem as 5 repetidas) | `ATIVIDADE-SEXTA-FEIRA/CONTEUDO/ATIVIDADE-INDIVIDUAL-AULAS-01-07-100-QUESTOES.md` (fora do Git) | Nenhum comando/tema repetido | ✅ |
| 2 | Escrever ~31 questões novas **a partir da apostila** (cap. 01 a 07), cobrindo as seções ainda sem questão, com a seção de origem anotada | mesma fonte | Tabela capítulo × nº de questões; toda resposta localizada na apostila | ✅ |
| 3 | Renumerar ITEM 01–100, gabarito 25 de cada letra, posição sorteada, correta não sempre a mais longa | mesma fonte | Script de contagem | ✅ |
| 4 | Gerar a página pelo gerador de atividades | `ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-AULAS-01-07-100-QUESTOES.html` | 100 itens, sem gabarito no HTML | ✅ |
| 5 | Índice e menu: um card/item só para a nova; tirar 40 e 50 | `ATIVIDADES/index.html`, `MENU-ATIVIDADES.js` | `node` lê o menu | ✅ |
| 6 | Banco: id 85 aponta para a página nova e recebe o gabarito de 100 itens (backup do gabarito antigo antes); id 80 continua bloqueada | `scripts/gerar-seed-atividades.py`, seed em `database/` (fora do Git) | 100 linhas no gabarito da id 85 | ✅ |
| 7 | Apagar as páginas antigas da 50 (id 85 reaproveitada); a de 40 fica no disco, fora do índice | pasta `ATIVIDADE-SEXTA-FEIRA/` | — | ✅ |
| 8 | STATUS (`STATUS.md`, `STATUS-ATIVIDADES.md`) e commit | — | — | ✅ |

## Parte 2 — Discursiva de sexta expandida para 40 questões (pedido de 2026-10-07)
Na aula de sexta ficam **só 2 atividades**: a objetiva de 100 e a discursiva de 40.

- **Decisão do usuário (2026-10-07): manter as respostas dos 2 alunos que já responderam.**
  Banco (consulta de leitura): id 81 tem 20 tópicos, 2 alunos com as 20 respostas cada, ambos com
  entrega da tentativa 1. As respostas **não** têm chave estrangeira para `topico_discursivo`:
  regravar os tópicos não as apaga.
- **Por isso a id 81 é ampliada no lugar** (mesma página e mesma atividade):
  - ITEM 01 a 20 ficam **exatamente iguais** (mesmo número e tópico `a`), para as respostas dos
    2 alunos continuarem valendo;
  - ITEM 21 a 40 são **novos**, escritos **a partir da apostila** (cap. 01 a 07), sem repetir tema
    das 20 atuais nem das 100 objetivas;
  - o padrão de resposta (`-GABARITO.md`, fora do Git) ganha os 20 novos.
- ⚠️ **Exceção à regra da apostila:** os ITEM 01 a 20 continuam como estão (ligados ao Manual de
  Comunicação do CD / caso da Rota Certa). O contexto de cada um traz os dados do caso; só
  **04 (brainstorming)** e **09 (FEFO)** pedem conceito que a apostila não tem.
- **Os 2 alunos já entregaram** com 20 questões. Para eles responderem as 20 novas mantendo as
  respostas, a entrega deles é **reaberta**: backup das 2 linhas em
  `entrega_atividade_backup_20261007` e remoção dessas 2 entregas (as 40 respostas ficam). Assim
  eles continuam a tentativa 1 com as 20 já respondidas e só fazem as novas.

| # | Ação | Verificação | Status |
|---|------|-------------|--------|
| 9 | Fonte: acrescentar ITEM 21 a 40 (Contexto, Comando, 1 tópico de 1,0) e o padrão de resposta deles | Gerador: 40 questões, 40 tópicos, 40 pontos | ✅ |
| 10 | Regerar a página da id 81 + seed (reaplica os 40 tópicos; não toca nas respostas) | 40 tópicos no banco; os 2 alunos com as 20 respostas | ✅ |
| 11 | Backup e reabertura das 2 entregas da id 81 | Backup com 2 linhas; respostas continuam 40 | ✅ |
| 12 | Índice e menu só com as 2 atividades de sexta (objetiva 100 + discursiva 40) | `node` lê o menu | ✅ |

## Riscos
| Risco | Plano B |
|-------|---------|
| **Tempo:** 100 objetivas ≈ 200–240 min + 40 discursivas ≈ 240–300 min = **7h40 a 9h**, o dobro da aula de 4 h | Aplicar em mais de um dia, ou deixar parte como tarefa para casa |
| Reabrir a entrega muda a situação dos 2 alunos (de "entregue" para "em andamento") | Backup das 2 entregas; voltar é reinserir as linhas do backup |
| Alunos com entrega na id 80 | Página e banco da id 80 preservados (só sai do índice) |

## Resultado (2026-10-07)
- Objetiva: mantidos o nome da página e a id 85 (`ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07.html`), sem
  criar página nova, para não mudar a `pagina` no banco. 100 itens = 50 da id 85 + 12 da id 80 com
  resposta na apostila (01, 02, 09, 14, 20, 23, 24, 25, 26, 35, 36, 37; 20, 23, 25, 35 e 09 com a
  resposta ajustada ao texto da apostila — ex.: coletor de dados = entrada e saída) + 38 novas.
  Cada item tem na fonte a linha "Fonte na apostila". Correta mais longa em só 19 de 100.
- Discursiva id 81: ITEM 01 a 20 com os mesmos números; 04 (brainstorming → consenso), 09 (FEFO →
  fato × recomendação) e 14 (WMS → ordem de verificação) trocaram de comando, porque o conceito não
  está na apostila. Os 2 alunos mantêm as 20 respostas e podem revisar as 04, 09 e 14.
