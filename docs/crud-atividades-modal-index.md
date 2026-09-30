# 🗂️ CRUD de atividades (modal) nos cards do índice de atividades

**Criado em:** 2026-09-29 09:06
**Concluído em:** 2026-09-29
**Tempo decorrido:** —
**Status geral:** ✅ Concluído (pendente: usuário rodar o SQL no Supabase)

---

## 🎯 Objetivo

Em **cada card** do `ATIVIDADES/index.html` de cada matéria, um botão **CADASTRAR ATIVIDADES** que
abre um **modal** com:

1. a **lista das atividades já cadastradas** no banco (tabela `atividade`) daquela aula;
2. **CRUD completo**: cadastrar nova, editar, excluir (e listar);
3. o campo **link da atividade** (`pagina`) escolhido **a partir das páginas HTML da própria pasta
   `ATIVIDADES/`** (é o local do link), gravado como caminho relativo a essa pasta.

## 📌 Interpretações (confirmar)

| # | Interpretação | Alternativa |
|---|---------------|-------------|
| 1 | Botão só para o **professor** (logado com `app_metadata.perfil = PROFESSOR`); aluno não vê o botão | Visível a todos, mas o RLS bloqueia a gravação |
| 2 | "Link deste local" = `pagina` recebe o caminho do HTML **dentro da pasta ATIVIDADES do card** (ex.: `ATIVIDADES-AULA-29-09-2026-50-QUESTOES.html`); a lista de arquivos vem dos próprios cards do índice | Digitar o link livremente |
| 3 | Campos do cadastro: descrição, data (`data_atividade`), total de itens, link (`pagina`), ativa (`ativo`). A aula vem do card (`aula_id`) | Outros campos |
| 4 | **Gabarito não entra** no modal (fica só no seed/`gabarito`, regra de segurança) | — |

## 🧰 Tecnologias

HTML + CSS + JS vanilla, Supabase (REST + JWT do professor, RLS), gerador Python
`assets/gerador-indices/gerar_indices.py`.

## 📁 Arquivos previstos

| Arquivo | Ação |
|---------|------|
| `assets/gerador-indices/gerar_indices.py` | Incluir o botão no card, o modal (HTML) e os scripts (supabase-js, `js/supabase.js`, `js/login.js`, novo JS) |
| `assets/js/atividades-crud-modal.js` | **Novo** — modal + CRUD (repositório Supabase separado da visão) |
| `assets/css/atividades-crud-modal.css` | **Novo** — estilos do modal (tokens CSS) |
| `database/2026-09-29-atividade-crud-professor.sql` | **Novo** — policies RLS de insert/update/delete de `atividade` só para `eh_professor()` (idempotente) |
| `MATERIAIS/**/ATIVIDADES/index.html` | Regenerados pelo gerador (índices com marcador `gerador-indices`) |
| `CLAUDE.md` | Registrar a regra/arquivos novos em `assets/` |

## ⚠️ Riscos e dependências

- Hoje `atividade` só tem **SELECT** público: sem as policies novas o CRUD falha (SQL é rodado pelo
  usuário no Supabase → SQL Editor).
- `aula_id` exige a aula cadastrada em `aulas`; card sem aula no banco mostra aviso e bloqueia o
  cadastro.
- Índices sem o marcador `gerador-indices` (ex.: Introdução à TIC) não são regenerados: ajustar à mão.
- Excluir atividade apaga em cascata `gabarito`, respostas e entregas → confirmação obrigatória.
- Sem testes automatizados (regra do projeto); limites: funções ≤ 45 linhas, nomes em português.

## 📋 Passos

| # | Estado | Passo | Arquivos | Verificação |
|---|--------|-------|----------|-------------|
| 1 | ⛔ Bloqueado/não aplicável | Conferir o banco real (sem acesso ao Supabase nesta sessão) (colunas de `atividade`, policies) | Supabase | Consulta no SQL Editor |
| 2 | ✅ Concluído | Escrever SQL das policies de escrita do professor | `database/2026-09-29-atividade-crud-professor.sql` | Usuário roda; releitura do SQL |
| 3 | ✅ Concluído | Criar CSS do modal | `assets/css/atividades-crud-modal.css` | Inspeção do arquivo |
| 4 | ✅ Concluído | Criar JS (repositório, lista, formulário, excluir com confirmação) | `assets/js/atividades-crud-modal.js` | Leitura + limites de linhas |
| 5 | ✅ Concluído | Ajustar o gerador: botão no card, modal e scripts | `assets/gerador-indices/gerar_indices.py` | Rodar o gerador |
| 6 | ✅ Concluído | Regenerar índices e ajustar os feitos à mão | `MATERIAIS/**/ATIVIDADES/index.html` | `git diff --stat` |
| 7 | ✅ Concluído | Documentar em `CLAUDE.md` | `CLAUDE.md` | Leitura |
| 8 | ✅ Concluído | Commit local | — | — |

## ✅ Resultado final

Código pronto e índices regenerados (17 regravados; 2 feitos à mão receberam as tags). O passo 1 (conferir banco real) ficou para o usuário: rodar `database/2026-09-29-atividade-crud-professor.sql` no Supabase → SQL Editor. Sem o SQL, o CRUD falha por RLS.
