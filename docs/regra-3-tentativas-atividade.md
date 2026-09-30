# Regra: até 3 tentativas por atividade, liberadas pelo professor

**Criado em:** 2026-09-30 · **Status:** ✅ Código pronto · ⏳ falta o professor rodar o SQL no Supabase

## Regra pedida

- O aluno pode responder cada atividade **até 3 vezes** (tentativa 1, 2 e 3).
- A **tentativa 1** é livre. Depois de entregar, o aluno **não refaz sozinho**.
- Para uma nova tentativa, o **professor** abre a atividade no painel, clica no **nome do aluno** e
  usa **"Liberar nova tentativa"**. Só aí o aluno consegue responder de novo.
- Limite de 3: depois da 3ª entrega o botão de liberar some.

## Como fica no banco (hoje: 1 entrega por aluno/atividade, respostas travadas após a entrega)

| Objeto | Mudança |
|---|---|
| `resposta_atividade` | nova coluna `tentativa smallint not null default 1` (1 a 3); PK vira (`aluno_id`, `atividade_id`, `tentativa`, `item`). Dados atuais viram tentativa 1 |
| `entrega_atividade` | nova coluna `tentativa`; PK vira (`aluno_id`, `atividade_id`, `tentativa`) |
| `liberacao_atividade` (nova) | `aluno_id`, `atividade_id`, `tentativa` (2 ou 3), `liberada_em`, `liberada_por`; PK (`aluno_id`, `atividade_id`, `tentativa`). **Só o professor grava** |
| Função `tentativa_atual(aluno, atividade)` | maior tentativa liberada (mínimo 1) |
| Função `pode_liberar(aluno, atividade)` | a tentativa atual já foi **entregue** e é menor que 3 |
| Políticas (RLS) | aluno só grava resposta/entrega na **tentativa atual** e enquanto ela **não foi entregue**; professor insere em `liberacao_atividade` só se `pode_liberar`; ninguém apaga nem altera entregas |

O limite 3 fica em um único lugar por camada: constante `MAXIMO_TENTATIVAS` em
`assets/js/` e a função SQL. SQL **idempotente** e **sem apagar dados**; antes de escrever, conferir
o banco real (regra do projeto).

## Como fica para o aluno

1. Tela mostra "**Tentativa N de 3**".
2. Entregou → respostas travadas; aviso "Aguarde o professor liberar uma nova tentativa" (ou
   "Você usou as 3 tentativas").
3. Professor liberou → ao recarregar, a atividade abre **em branco** na tentativa seguinte.

## Como fica para o professor (`painel-professor.html`)

1. Escolhe a atividade e a turma (já existe) e **clica na linha do aluno** (já abre o detalhe).
2. O detalhe ganha **abas Tentativa 1 / 2 / 3** (respostas, acertos e nota de cada uma) e o botão
   **🔓 Liberar nova tentativa** (com confirmação; some se não puder liberar).
3. Tabela e CSV passam a mostrar **tentativas usadas** e a nota conforme a regra escolhida.

## Arquivos previstos

| Arquivo | Ação |
|---|---|
| `database/2026-09-30-tentativas-atividade.sql` (novo) | colunas, PKs, tabela, funções e políticas; roda o professor no SQL Editor |
| `assets/js/respostas-atividade-banco.js` | ler tentativa atual, gravar resposta/entrega com `tentativa` |
| `assets/js/respostas-atividade.js` (+ css) | mostrar "Tentativa N de 3" e as mensagens de bloqueio |
| `assets/js/painel-professor.js` (+ css, html se preciso) | abas por tentativa, botão de liberar, coluna de tentativas |
| `docs/respostas-atividades-banco-painel-professor.md` | atualizar |
| `CLAUDE.md` | registrar a regra (seção de respostas no banco) |

## Riscos

- Trocar a PK de tabelas com dados: migração em uma transação, dados existentes viram tentativa 1.
- Páginas em cache do navegador com o JS antigo: gravam sem `tentativa` (vira 1) — o `default 1`
  mantém compatível.
- Nenhum teste automatizado será criado (regra do projeto).

## Passos de execução (após aprovação)

| Passo | Ação | Status |
|---|---|---|
| 1 | Conferir o banco real (tabelas/colunas/políticas) | ⬜ |
| 2 | Escrever o SQL de tentativas | ⬜ |
| 3 | Ajustar `respostas-atividade-banco.js` e `respostas-atividade.js` | ⬜ |
| 4 | Ajustar o painel do professor (abas + liberar) | ⬜ |
| 5 | Atualizar docs e `CLAUDE.md` | ⬜ |
| 6 | Professor roda o SQL no Supabase; conferência do fluxo | ⬜ |
| 7 | Commit local | ⬜ |

## Decisões do professor (2026-09-30)

- Nota = **melhor tentativa**. Nova tentativa abre **com as respostas anteriores marcadas** (o banco
  copia ao liberar).
- **Mensagens de confirmação ao gravar:** aviso rápido por resposta gravada (ou falha), pergunta
  antes de entregar e mensagem final com a tentativa entregue.

## Execução

| Passo | Status |
|---|---|
| 1 Banco real conferido (4 respostas, 0 entregas, 18 atividades; PKs sem `tentativa`) | ✅ |
| 2 `database/2026-09-30-tentativas-atividade.sql` | ✅ escrito · ⏳ rodar no Supabase |
| 3 `respostas-atividade-banco.js` e `respostas-atividade.js` (+ css) | ✅ |
| 4 `painel-professor.js/html/css` | ✅ |
| 5 Docs e `CLAUDE.md` | ✅ |
| 6 Rodar o SQL e testar o fluxo | ⏳ |

## Nota para o aluno (2026-09-30)

Depois de entregar, o início da atividade mostra "Sua nota: X (tentativa N de 3)" e a mensagem do
mínimo 7 (aprovado ou pedir nova tentativa ao professor). Nota vem da função `nota_da_tentativa`
(aplicada no Supabase em 2026-09-30); a comparação com 7 usa acertos/total exatos, sem arredondar.
