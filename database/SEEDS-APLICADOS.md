# 🗄️ SEEDS APLICADOS NO BANCO (SUPABASE)

Registro único de quais arquivos `database/*-seed-atividades.sql` já foram **aplicados** no banco
(projeto `AULAS SENAI`, ref `hxlvonriearllcmfqeri`). Regra em
[docs/regras/atividades.md](../docs/regras/atividades.md) (seção "Seeds: aplicar só com pedido e
registrar aqui"), criada em 2026-10-09 19:19:18 a pedido do usuário.

- ✅ **Aplicar só com pedido do usuário** (pelo conector do Supabase ou ele mesmo no SQL Editor).
- ✅ **Antes:** conferir o banco real (matéria, aulas e atividades que já existem).
- ✅ **Depois:** conferir com consultas de leitura (quantidade de aulas, atividades, itens do
  gabarito e tópicos) e só então acrescentar a linha em "Aplicados" (mais recente no topo).
- ✅ Na mesma tarefa: marcar ✅ o item "Aplicar os seeds no Supabase" do arquivo da etapa
  (`tasks/etapas/`) e a coluna **Banco** do `STATUS-ATIVIDADES.md` (e do `STATUS-AULAS.md`) da
  matéria.
- ⛔ Este arquivo não leva gabarito, padrão de resposta, senha nem dado de aluno (só nomes de
  arquivo e contagens).

## Aplicados

| Data e hora | Arquivo(s) | Matéria / etapa | Pedido do usuário | Quem aplicou (frente) | Conferência no banco |
|---|---|---|---|---|---|

## ⏳ Gerados e ainda não aplicados

| Arquivo(s) | Matéria / etapa | Situação |
|---|---|---|
| `2026-10-09-banco-de-dados-objetivas-seed-atividades.sql` + `2026-10-09-banco-de-dados-atividade-pratica-aula-01` a `-18-seed-atividades.sql` (19 arquivos) | Banco de Dados (TII), Etapa 125, item 125.8 | Pedido do usuário em 2026-10-09; a 1ª tentativa pelo conector foi cancelada antes de gravar (nada aplicado). Aguarda o usuário aprovar os lotes ou rodar no SQL Editor |

> Seeds de matérias anteriores a 2026-10-09 (ITIC, Testes de Front-End, Reforço de Linguagens e
> outras) foram aplicados antes deste registro existir; a situação delas está na coluna **Banco**
> do `STATUS-ATIVIDADES.md` de cada matéria e no arquivo da etapa em `tasks/etapas/`.
