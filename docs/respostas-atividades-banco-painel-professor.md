# 🗃️ Respostas das atividades no banco, gabarito e painel do professor

**Criado em:** 2026-09-28 15:41
**Concluído em:** 2026-09-28 (parte do código); pendente execução do SQL pelo usuário
**Tempo decorrido:** —
**Status geral:** 🔄 Código pronto — aguardando o usuário rodar o SQL e o script

---

## 🎯 Objetivo

1. **Ver a atividade continua livre (sem login).** O login só é exigido **ao marcar uma alternativa**.
2. Gravar as respostas de cada aluno no Supabase (e a entrega ao "Finalizar").
3. Guardar o gabarito numa tabela `gabarito`, fora das páginas dos alunos.
4. Estruturar: **atividade** (id, data, descrição, id da aula) → **aula** (id da matéria) →
   **matéria** (id do curso).
5. Painel do professor com as respostas, acertos e entregas por turma.

## 🔎 Levantamento (o que já existe)

| Tabela | Situação | Uso no plano |
|--------|----------|--------------|
| `curso` | Existe (4 linhas, RLS desligado) | Reaproveitar |
| `materia` | Existe (1 linha); **não tem `curso_id`** — liga ao curso pela N-N `cursomateria` | Acrescentar `curso_id` |
| `cursomateria` | Existe (N-N) | Manter (compatibilidade com `curso.js`/`materia.js`) |
| `aulas` | Existe (0 linhas), já tem `materia_id` e `curso_id` | Reaproveitar |
| `gabarito`, `atividade`, respostas | **Não existem** (nem em SQL, JS ou docs) | Criar |

⚠️ O schema acima é o do `docs/database.md` (16/09). O banco real não pôde ser conferido: projeto
Supabase pausado e sem MCP nesta sessão. O SQL será escrito de forma **idempotente**
(`if not exists`) para não quebrar se algo já existir.

## 🧱 Modelo de dados

```
curso (1) ──< materia.curso_id (nova coluna) (1) ──< aulas.materia_id (1) ──< atividade.aula_id
                                                                                  │
                                            gabarito (atividade_id, item) >───────┤
                                  resposta_atividade (aluno_id, atividade_id, item) >──┤
                                        entrega_atividade (aluno_id, atividade_id) >───┘
turma (codigo) ──< aluno.turma_codigo      aluno.id = auth.users.id
```

| Tabela nova | Colunas principais |
|-------------|--------------------|
| `turma` | `codigo` PK (`135080`), `nome` (`AI AOPL 2026/2 M1`), `turno`, `horario` |
| `aluno` | `id` uuid PK → `auth.users.id`, `nome`, `email`, `turma_codigo` → `turma`, `numero_chamada`, `na_chamada` |
| `atividade` | `id` PK, `aula_id` → `aulas.id`, **`data_atividade`**, **`descricao`**, `pagina` (caminho único do HTML), `total_itens`, `ativo` |
| `gabarito` | `atividade_id` → `atividade.id`, `item`, `titulo`, `letra` (A–D) — PK (`atividade_id`, `item`) |
| `resposta_atividade` | `aluno_id` (padrão `auth.uid()`), `atividade_id`, `item`, `letra`, `atualizado_em` — PK (`aluno_id`, `atividade_id`, `item`) |
| `entrega_atividade` | `aluno_id`, `atividade_id`, `entregue_em` — PK (`aluno_id`, `atividade_id`) |

Alteração: `materia.curso_id bigint references curso(id)` (nulável; `cursomateria` continua).

## 🔒 Segurança (RLS em todas as tabelas novas)

- **Perfil confiável:** o perfil do usuário passa a vir do `app_metadata` (só a chave
  `service_role` altera). O `user_metadata` atual pode ser alterado pelo próprio aluno, então **não**
  serve para decidir quem é professor. Função `eh_professor()` lê `auth.jwt() -> app_metadata`.
- `gabarito`: **só professor lê**. O aluno nunca recebe o gabarito.
- `resposta_atividade`: aluno lê/grava só as próprias linhas; **não grava depois de entregar**;
  professor lê todas.
- `entrega_atividade`: aluno cria a própria entrega uma vez; professor lê todas.
- `aluno`/`turma`: aluno lê só o próprio cadastro; professor lê todos.
- `atividade`: leitura pública (só id, data, descrição, página — sem respostas).
- As páginas dos alunos deixam de embutir o gabarito (`<script id="gabarito-dados">`) quando o login
  estiver ligado.

## 🖥️ Comportamento nas atividades (login só para responder)

1. Qualquer pessoa **abre e lê** a atividade, sem login.
2. Ao **clicar numa alternativa** sem estar logado: aviso "Entre com seu usuário para responder" e
   ida para `login.html?voltar=<atividade>`; ao voltar, a página abre logada.
3. Logado: nome e turma vêm do cadastro (sem campo de nome); cada clique grava no banco
   (upsert) com cópia no localStorage por aluno; ao recarregar, as marcações vêm do banco.
4. "Finalizar": valida (todas assinaladas), grava a entrega e trava as alternativas.
5. Folha de respostas continua igual, com o nome e a turma certos (M1 ou V1).
6. Ativação por página no `.md`: `- **Login:** sim` (gerador inclui supabase-js, `js/supabase.js`,
   `js/login.js` e remove o gabarito embutido).

## 👩‍🏫 Painel do professor (`painel-professor.html`, raiz)

- Exige login com perfil PROFESSOR (senão: "Acesso restrito ao professor").
- Filtros: curso → matéria → aula → atividade e turma.
- Tabela por aluno: respondidas, acertos, nota (0–10), entregue em; aluno sem resposta aparece.
- Detalhe do aluno: item a item (marcada × gabarito).
- Exportar CSV da turma.

## 🗂️ Arquivos previstos

| Arquivo | Ação |
|---------|------|
| `database/2026-09-28-atividades-gabarito.sql` | Criar: tabelas, coluna `materia.curso_id`, RLS, `eh_professor()` |
| `database/2026-09-28-seed-atividades.sql` | Criar (gerado): turmas, curso/matéria/aulas/atividades e gabarito |
| `scripts/gerar-seed-atividades.py` | Criar: gera o seed a partir dos `.md` das atividades |
| `scripts/criar-usuarios-supabase-auth.js` | Alterar: `app_metadata` (perfil/turma), gravar `aluno`/`turma`, conta do professor |
| `assets/js/respostas-atividade.js` | Alterar: login ao marcar, gravar/ler do banco, entrega |
| `assets/js/painel-professor.js`, `assets/css/painel-professor.css`, `painel-professor.html` | Criar |
| `assets/gerador-atividades/gerar_atividades.py` e `template_atividade.html` | Alterar: opção `Login: sim` |
| `.md` e `.html` das atividades escolhidas | Alterar (ligar `Login: sim`) |
| `docs/database.md` + `docs/relatorio_verificacao_database.html` | Atualizar juntos (regra do `CLAUDE.md`) |
| `docs/ORIENTACAO_JS_LOGIN.md`, `CLAUDE.md` | Atualizar |

## ⚠️ Riscos e dependências

- Projeto Supabase **pausado**; o SQL é executado **pelo usuário** no SQL Editor (sem MCP aqui).
- Banco real pode divergir do `database.md` (SQL idempotente, mas conferir antes de rodar).
- Usuários já criados precisam do `app_metadata`: o script ganha modo de atualização.
- Mudar o perfil de `user_metadata` para `app_metadata` exige rodar o script de novo.
- Respostas salvas antes no localStorage não migram para o banco.

## ❓ Decisões pendentes

1. **Quais atividades** ligam o login: só Aula 03 e 28/09, ou as 12 de Introdução à TIC?
2. **Depois de entregar**, o aluno pode alterar respostas? (sugestão: não)
3. **Conta do professor:** qual e-mail? (sugestão: `gelvazio.camargo@senai.local`)
4. **Nota para o aluno:** mostrar acertos depois de entregar? (sugestão: não, só no painel)
5. **Data da atividade** da Aula 03: qual data usar? (a de 28/09 é 2026-09-28)

## 📝 Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Levantar schema existente e procurar `gabarito` | `docs/database.md`, projeto | Nada encontrado | ✅ Concluído |
| 2 | Escrever SQL de schema + RLS | `database/2026-09-28-atividades-gabarito.sql` | Revisão; idempotente | ✅ Concluído |
| 3 | Gerar seed a partir dos `.md` | `scripts/gerar-seed-atividades.py`, `database/2026-09-28-seed-atividades.sql` | Itens e letras batem com os `.md` | ✅ Concluído |
| 4 | Ajustar script de usuários (`app_metadata`, `aluno`, professor) | `scripts/criar-usuarios-supabase-auth.js` | Simulação | ✅ Concluído |
| 5 | Login ao marcar + gravar/ler do banco + entrega | `assets/js/respostas-atividade.js` | `node --check`; teste local sem login | ✅ Concluído |
| 6 | Opção `Login: sim` no gerador; aplicar nas atividades escolhidas | gerador, `.md`/`.html` | Página sem gabarito embutido | ✅ Concluído |
| 7 | Painel do professor | `painel-professor.*` | `node --check`; página carrega e bloqueia sem login | ✅ Concluído |
| 8 | Documentação | `database.md`, relatório HTML, `ORIENTACAO_JS_LOGIN.md`, `CLAUDE.md` | Leitura | ✅ Concluído |
| 9 | Usuário: reativar projeto, rodar SQL, rodar script, testar | — | Aluno responde; professor vê no painel | ⛔ Depende do usuário |
| 10 | Commit (push se pedido) | — | Hash | ⬜ Pendente |

## ✅ Resultado final

**Decisões do usuário:** login em **todas** as 12 atividades de Introdução à TIC; sem alteração após a
entrega; professor `gelvazio.camargo@senai.local`; nota só no painel; Aula 03 em 2026-09-28.
**Regras novas (CLAUDE.md):** alternativas **somente no banco** — localStorage removido.

**Descobertas no banco real (consulta pela API pública):**
- `atividade` já existia (quiz antigo "QUALIDADE") → ampliada com as colunas novas, sem apagar dados.
- `usuario` exposta à chave anônima, inclusive `senha_hash` (fora do escopo — tratar à parte).
- Curso "Assistente de Operações Logísticas" não existia → criado pelo seed, com matéria própria
  (a matéria 23 de TIC pertence ao curso Operador de Produção Industrial e não foi alterada).

**Feito:** SQL de schema/RLS, seed com 12 atividades e 550 itens de gabarito, script de usuários com
`app_metadata`/turma/aluno/professor, respostas só no banco com bloqueio sem banco, 12 páginas ligadas
(11 pelo gerador + 23/09 à mão), gabarito removido das páginas, painel do professor, documentação.
**Datas provisórias** (2026-09-28): aulas 01, 02, 04–10 — ajustar em `DATA_PROVISORIA`/`ATIVIDADES`.

## 🔁 Tentativas (2026-09-30)

Até 3 tentativas por atividade, liberadas pelo professor no painel (clicar no aluno → 🔓 Liberar
nova tentativa). Nota = melhor tentativa. Detalhes: `docs/regra-3-tentativas-atividade.md`;
SQL: `database/2026-09-30-tentativas-atividade.sql`. `resposta_atividade` e `entrega_atividade`
ganham `tentativa` (PK inclui a tentativa); nova tabela `liberacao_atividade`.
