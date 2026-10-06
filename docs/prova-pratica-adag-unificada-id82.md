# Prova Prática ADAG unificada (id 82) e exclusão da prova id 37

- **Criado em:** 2026-10-06
- **Status:** ✅ Concluído em 2026-10-06 (aprovado: "SIM, FAÇA ISSO"); aguardando o aceite do usuário
- **Matéria:** Análise de Dados Aplicada à Gestão (`MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/`)

## Objetivo

Unir as perguntas da Prova Prática (id 37) e da Prova Prática 06-10-2026 (id 82) numa prova única de
**20 questões discursivas** que cobre **100% do conteúdo das aulas** da pasta `CONTEUDO/`, com
padrão de resposta por tópico para a **correção por IA** (certa, meia certa, errada) e confirmação
do professor; manter só a prova **id 82** e **excluir a id 37 do banco**.

## Decisões do usuário (2026-10-06)

- Prova primeiro em Markdown: `ATIVIDADES/CONTEUDO/PROVA-PRATICA-ADAG-SALETE.md`.
- 20 questões discursivas cobrindo 100% das aulas; batimento completo ao final.
- Nota total 10, dividida entre as questões (0,5 por questão: 0,1 + 0,2 + 0,2).
- Cada tópico com resposta esperada gravada no banco para a análise e o batimento por IA.
- A média final passa a usar a prova id 82 (`PROVA-PRATICA-06-10-2026.html`).
- Excluir a prova id 37 do banco ao final.

## Situação conferida no banco (2026-10-06)

- id 37 e id 82: **0 respostas, 0 entregas, 0 correções, 0 liberações** (as duas bloqueadas para
  todas as turmas). Excluir a 37 e trocar as questões da 82 **não perde dados de alunos**.

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Prova em Markdown (20 questões), padrão de resposta (60 tópicos) e batimento com as 7 aulas | `ATIVIDADES/CONTEUDO/PROVA-PRATICA-ADAG-SALETE.md`, `-GABARITO.md` (fora do Git), `BATIMENTO-PROVA-PRATICA-ADAG-SALETE.md` | 20 itens, 60 tópicos, 10 pontos, 60 padrões; batimento slide a slide | ✅ Concluído |
| 2 | Gerador discursivo aceitar pontos por questão diferentes de 1 (campo `Pontos por questão` no .md) | `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` | `py_compile` e geração | ✅ Concluído |
| 3 | Fonte da id 82 = a prova nova; gerar `PROVA-PRATICA-06-10-2026.html` e o seed (`topico_discursivo` com resposta esperada e critérios) | `ATIVIDADES/CONTEUDO/PROVA-PRATICA-06-10-2026.md` (+ gabarito), página HTML, `database/*-seed-atividades.sql` (fora do Git) | 20 itens/60 tópicos na página; padrão ausente do HTML | ✅ Concluído |
| 4 | Aplicar o seed da id 82 no Supabase (troca os tópicos; `total_itens` = 20) e conferir | — | Consultas de leitura | ✅ Concluído |
| 5 | Média final, índice e menu apontando só para a id 82; remover `PROVA-PRATICA.html`; **excluir a id 37 do banco** (com cópia de backup da linha e dos tópicos) | `media-final.json`, `AVALIACAO-MEDIA-FINAL.html`, `index.html`, `MENU-ATIVIDADES.js`, `STATUS-ATIVIDADES.md` | Consultas de leitura; grep sem links para a 37 | ✅ Concluído |
| 6 | Aceite do usuário | — | — | ⬜ Pendente |

## Riscos

| Risco | Plano B |
|---|---|
| Prova longa (20 questões, 60 tópicos) | Duração indicada de 180–220 min; o professor pode dividir em dois encontros |
| Gerador exige 1 ponto por questão | Passo 2 torna o valor configurável sem mudar as provas antigas |
| Excluir a id 37 por engano com dados | Conferido: 0 respostas; backup da linha antes de excluir |

## Resultado

- **Gerador discursivo:** campos opcionais `- **Pontos por questão:**` (padrão 1) e `- **Página:**`
  (nome da página gerada) no cabeçalho da fonte.
- **Fonte única da prova id 82:** `ATIVIDADES/CONTEUDO/PROVA-PRATICA-ADAG-SALETE.md` (+ `-GABARITO.md`,
  fora do Git) → `ATIVIDADES/PROVA-PRATICA-06-10-2026.html` (20 itens, 60 campos, padrão ausente
  do HTML). A fonte antiga `PROVA-PRATICA-06-10-2026.md` foi retirada (o Git guarda o histórico).
- **Banco (aplicado e conferido):** id 82 com `total_itens = 20` e 60 tópicos (10 pontos), todos
  com resposta esperada e critérios; bloqueio por turma mantido. Backups antes das mudanças:
  `atividade_backup_20261006` (37 e 82), `topico_discursivo_backup_20261006` (60 tópicos antigos),
  `abertura_atividade_backup_20261006` (3 aberturas da 37), com RLS e sem acesso pela API.
- **Prova id 37 excluída** (0 respostas, 0 entregas, 0 correções); `PROVA-PRATICA.html` removida.
- **Média final, índice e menu** apontam só para a id 82 (Aulas 01 a 07, 20 discursivas);
  `AVALIACAO-MEDIA-FINAL.html` regerada.
