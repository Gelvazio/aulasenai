# 🗄️ SEEDS DO BANCO (SUPABASE) — STATUS DE CADA ARQUIVO

Registro único de **todos** os arquivos `database/*-seed-atividades.sql` e do status de cada um no
banco (projeto `AULAS SENAI`, ref `hxlvonriearllcmfqeri`). Regra em
[docs/regras/atividades.md](../docs/regras/atividades.md) (seção "Seeds: aplicar só com pedido e
registrar aqui"); criado em 2026-10-09 19:19:18 e com status em todos os seeds desde 2026-10-09
19:23:21, a pedido do usuário.

## Status (todo seed tem exatamente um)

| Status | Quando usar |
|---|---|
| **PENDENTE** | Gerado (ou não encontrado no banco); ainda não foi rodado no Supabase |
| **APLICADO** | Rodado no Supabase, mas a conferência ainda não foi feita ou não bate (ex.: substituído por um seed mais novo, formato antigo sem contagem) |
| **CONCLUÍDO** | Rodado **e conferido** com consultas de leitura: a atividade de cada página está no banco com a mesma quantidade de itens (gabarito ou tópicos) do arquivo |

- ✅ **Seed novo entra aqui como PENDENTE** no mesmo commit em que é gerado.
- ✅ **Aplicar só com pedido do usuário**; ao rodar, passar a **APLICADO**; depois de conferir no
  banco, **CONCLUÍDO** (com a data e hora da conferência). Na mesma tarefa, atualizar o item
  "Aplicar os seeds no Supabase" do arquivo da etapa (`tasks/etapas/`) e a coluna **Banco** do
  `STATUS-ATIVIDADES.md` da matéria.
- ✅ A conferência compara, por página, a atividade (`atividade.pagina`) e a quantidade de linhas em
  `gabarito` (objetivas) ou `topico_discursivo` (discursivas) com o arquivo.
- ⛔ Este arquivo não leva gabarito, padrão de resposta, senha nem dado de aluno (só nomes de
  arquivo, contagens e status).

## Resumo (atualizado em 2026-10-09 19:33)

| PENDENTE | APLICADO | CONCLUÍDO | Total |
|---|---|---|---|
| 24 | 4 | 41 | 69 |

## Todos os seeds

| Arquivo | Matéria | Atividades | Status | Conferido em | Observação |
|---|---|---|---|---|---|
| `2026-09-28-seed-atividades.sql` | Fundamentos da Tecnologia (RSL), Introdução à TIC (AOPL) | 18 | **CONCLUÍDO** | 2026-10-09 19:23 | 18 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-09-30-analise-dados-seed-atividades.sql` | Análise de Dados (GCM) | 11 | **APLICADO** | 2026-10-09 19:23 | As 11 atividades estão no banco; formato antigo do arquivo, a contagem de itens não foi comparada |
| `2026-10-01-analise-dados-objetiva-01-60-seed-atividades.sql` | Análise de Dados (GCM) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-01-analise-dados-objetiva-02-60-seed-atividades.sql` | Análise de Dados (GCM) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-01-avaliacao-pratica-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-01-prova-pratica-seed-atividades.sql` | Análise de Dados (GCM) | 1 | **PENDENTE** | 2026-10-09 19:23 | Página `PROVA-PRATICA.html` não está no banco (a prova prática da matéria está como `PROVA-PRATICA-01.html`, id 82): conferir com o usuário se foi substituído |
| `2026-10-02-atividade-pratica-aula-02-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-02-atividade-pratica-aula-03-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-02-atividade-pratica-aula-04-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-02-atividade-pratica-aula-05-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-02-automacao-instrumentacao-seed-atividades.sql` | Automação e Instrumentação (OPI) | 6 | **CONCLUÍDO** | 2026-10-09 19:23 | 6 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-02-avaliacao-pratica-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-02-prova-objetiva-prof-rafael-seed-atividades.sql` | Automação e Instrumentação (OPI) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-02-prova-pratica-seed-atividades.sql` | Análise de Dados (GCM) | 1 | **PENDENTE** | 2026-10-09 19:23 | Página `PROVA-PRATICA.html` não está no banco (a prova prática da matéria está como `PROVA-PRATICA-01.html`, id 82): conferir com o usuário se foi substituído |
| `2026-10-03-automacao-instrumentacao-aulas-07-14-seed-atividades.sql` | Automação e Instrumentação (OPI) | 8 | **CONCLUÍDO** | 2026-10-09 19:23 | 8 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-01-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-02-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-03-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-04-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-05-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-06-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-07-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-08-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-09-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-discursiva-aula-10-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-individual-comunicacao-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-atividade-individual-comunicacao-tecnica-discursiva-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-prova-pratica-06-10-2026-seed-atividades.sql` | Análise de Dados (GCM) | 1 | **PENDENTE** | 2026-10-09 19:23 | Página `PROVA-PRATICA-06-10-2026.html` não está no banco (a prova id 82 está como `PROVA-PRATICA-01.html`): conferir com o usuário se foi substituído |
| `2026-10-06-reforco-linguagens-aula-01-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-02-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-03-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-04-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-05-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-06-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-07-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-08-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-09-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-06-reforco-linguagens-aula-10-seed-atividades.sql` | Reforço de Linguagens (RSL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-07-atividade-individual-100-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | Atualiza a atividade id 85 para 100 questões; banco com 100 itens no gabarito |
| `2026-10-07-atividade-individual-apostila-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **APLICADO** | 2026-10-09 19:23 | Substituído por `2026-10-07-atividade-individual-100-seed-atividades.sql` (id 85 passou de 50 para 100 questões) |
| `2026-10-07-atividade-individual-comunicacao-tecnica-discursiva-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **APLICADO** | 2026-10-09 19:23 | Substituído por `2026-10-08-atividade-individual-comunicacao-tecnica-discursiva-seed-atividades.sql` (id 81 com 20 tópicos) |
| `2026-10-07-atividade-pratica-aula-06-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:30 | Aplicado em 2026-10-09 19:28 a pedido do usuário, em 3 partes pelo conector (atividade id 102, bloqueada; 20 tópicos, 10 pontos); conferido por md5 do texto dos tópicos igual ao do arquivo. Antes: nunca entrou porque procurava a matéria pelo nome antigo (corrigido para `INTRODUCAO TIC`) |
| `2026-10-08-atividade-individual-comunicacao-tecnica-discursiva-seed-atividades.sql` | Introdução à TIC (AOPL) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-08-atividade-pratica-aula-01-seed-atividades.sql` | Comunicação Oral e Escrita (RSL) | 1 | **PENDENTE** | 2026-10-09 19:23 | Não pode ser aplicado ainda: a matéria "Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho" e as aulas dela não existem no banco (o seed para com erro); falta criar a matéria e as aulas (decisão do usuário) |
| `2026-10-08-atividade-pratica-aula-02-seed-atividades.sql` | Comunicação Oral e Escrita (RSL) | 1 | **PENDENTE** | 2026-10-09 19:23 | Não pode ser aplicado ainda: a matéria "Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho" e as aulas dela não existem no banco (o seed para com erro); falta criar a matéria e as aulas (decisão do usuário) |
| `2026-10-08-prova-pratica-06-10-2026-seed-atividades.sql` | Análise de Dados (GCM) | 1 | **PENDENTE** | 2026-10-09 19:23 | Página `PROVA-PRATICA-06-10-2026.html` não está no banco (a prova id 82 está como `PROVA-PRATICA-01.html`): conferir com o usuário se foi substituído |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-01-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:33 | Próximo a aplicar (lote pronto, em partes); a aula 1 já existe no banco (id 96). Etapa 125, item 125.8 |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-02-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-03-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-04-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-05-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-06-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-07-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-08-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-09-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-10-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-11-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-12-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-13-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-14-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-15-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-16-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-17-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-atividade-pratica-aula-18-seed-atividades.sql` | Banco de Dados (TII) | 1 | **PENDENTE** | 2026-10-09 19:23 | Ainda não aplicado; Etapa 125, item 125.8 (1ª tentativa pelo conector cancelada antes de gravar) |
| `2026-10-09-banco-de-dados-objetivas-seed-atividades.sql` | Banco de Dados (TII) | 18 | **APLICADO** | 2026-10-09 19:33 | Parcial — aplicado em partes pelo conector (um comando por aula, sem `delete`), a pedido do usuário: **aula 01 aplicada e conferida** (aula id 96, atividade id 103, 50 itens, md5 do gabarito igual ao do arquivo); faltam as aulas 02 a 18. Vira CONCLUÍDO quando as 18 estiverem conferidas |
| `2026-10-09-testes-frontend-atividade-pratica-aula-01-seed-atividades.sql` | Testes de Front-End (TII) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-09-testes-frontend-atividade-pratica-aula-02-seed-atividades.sql` | Testes de Front-End (TII) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-09-testes-frontend-atividade-pratica-aula-03-seed-atividades.sql` | Testes de Front-End (TII) | 1 | **CONCLUÍDO** | 2026-10-09 19:23 | 1 atividade(s) no banco com a mesma quantidade de itens do arquivo |
| `2026-10-09-testes-frontend-objetivas-seed-atividades.sql` | Testes de Front-End (TII) | 3 | **CONCLUÍDO** | 2026-10-09 19:23 | 3 atividade(s) no banco com a mesma quantidade de itens do arquivo |
