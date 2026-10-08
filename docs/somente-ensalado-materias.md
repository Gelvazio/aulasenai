# Plano — Botões "SOMENTE ENSALADO" e "VER TODAS MATÉRIAS" na faixa de matérias

**Criado em:** 2026-10-08 23:42:02 (Brasília) · **Concluído em:** — · **Tempo decorrido:** —
**Status geral:** 🟡 Aguardando aprovação do usuário

## 1. Objetivo
Na faixa "Matérias — TECNICO INFORMATICA INTERNET" (página `MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html`),
ao lado do título, dois botões: **SOMENTE ENSALADO** (lista só as matérias marcadas como ensaladas) e
**VER TODAS MATÉRIAS** (volta a lista completa). Dentro da faixa, cada matéria tem um botão **ON/OFF** ao
lado do nome para o professor marcar/desmarcar `ensalado` ali mesmo; a mudança grava no banco.

## 2. Escopo
- **Entra:** botões na faixa; filtro por `ensalado`; botão ON/OFF por matéria (só PROFESSOR grava);
  regra salva no `CLAUDE.md` global.
- **Não entra:** outros cursos (a faixa é compartilhada, mas o filtro só age quando a lista tem dados
  do banco — ver risco R1); nova coluna (ela já existe); testes automatizados (proibido).

## 3. Descoberta no banco (projeto `AULAS SENAI`, ref `hxlvonriearllcmfqeri`)
- A coluna **`materia.ensalado`** (boolean, default `false`) **já existe** e já tem o significado
  "matéria já ensalada (liberada para alunos)" em `docs/database.md` (linha 122). **Não precisa criar coluna.**
  O "ENSALADO(1,0)" pedido = essa coluna (true/false).
- A tabela `materia` tem só 7 linhas (ids 23 a 29, cursos 2, 5, 6, 7). **As 19 matérias da faixa
  do ITIC não estão no banco** — a faixa é HTML fixo. Por isso o ON/OFF não tem onde gravar hoje (R1).

## 4. Arquivos previstos
| Arquivo | Mudança |
|---|---|
| `MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html` | Botões ao lado do título; `data-` com o nome da matéria em cada card; botão ON/OFF por card |
| `assets/js/faixa-materias-ensalado.js` (novo) | Filtro dos botões; leitura e gravação de `ensalado` (módulo único, SOLID) |
| `assets/css/indice-atividades.css` | Estilo dos botões e do ON/OFF (sem mexer no layout de colunas já feito) |
| `assets/js/supabase.js` ou repositório existente | Só se necessário para leitura/gravação (ver orientação `docs/ORIENTACAO_JS_SUPABASE.md` antes de editar) |
| `CLAUDE.md` global (`C:\Users\gelva\.claude\CLAUDE.md`) | Regra salva (pedido explícito) |
| `STATUS.md` e `docs/` | Registro da tarefa |

Banco: **nenhuma alteração de schema**. Só dados (ver passo 3).

## 5. Riscos e dependências
| Risco | Plano B |
|---|---|
| R1 — As 19 matérias não estão em `materia`; o ON/OFF não grava para elas | Opção A: cadastrar as matérias do ITIC em `materia` (INSERT com `curso_id` do ITIC, `ensalado=false`) — precisa de aprovação. Opção B: a faixa lê o `materia` pelo nome; sem linha no banco, o ON/OFF fica desligado |
| R2 — Gravação só para PROFESSOR (RLS) | Botão ON/OFF só aparece para perfil PROFESSOR; aluno só lê |
| R3 — Página é estática (sem login) e o ON/OFF exige sessão | Botão visível só para professor logado (`header-usuario.js`) |
| R4 — `supabase.js` é JWT/RLS: não pode usar chave de serviço | Usar o `sbH()` existente com o JWT do usuário |

## 6. Passos
| # | Passo | Status | Verificação permitida |
|---|---|---|---|
| 1 | Confirmar com o usuário a opção do R1 (cadastrar as 19 matérias no banco ou outra) | ⬜ Pendente | Resposta do usuário |
| 2 | Ler `docs/ORIENTACAO_JS_SUPABASE.md` e `docs/ORIENTACAO_USUARIO.md` (autenticação e RLS) | ⬜ Pendente | Leitura |
| 3 | Criar `assets/js/faixa-materias-ensalado.js` (leitura de `ensalado`, filtro, ON/OFF) | ⬜ Pendente | `node --check` |
| 4 | Editar `index.html` da ITIC: botões, `data-materia`, ON/OFF só para professor | ⬜ Pendente | Leitura do HTML; `grep` de `onclick` (proibido) |
| 5 | Estilo dos botões em `indice-atividades.css` | ⬜ Pendente | Leitura |
| 6 | Banco: inserir/conferir as matérias (conforme a opção do passo 1) | ⬜ Pendente | `select` de conferência |
| 7 | Salvar a regra no `CLAUDE.md` global | ✅ Feito em 2026-10-08 23:42 | Leitura do arquivo |
| 8 | Commit local da tarefa (sem push) | ⬜ Pendente | `git diff --cached --name-only` |
| 9 | Aceite do usuário (testar na tela — não validado aqui, por regra) | ⬜ Pendente | — |

## 7. Pendências de decisão do usuário
1. **R1:** cadastrar as 19 matérias do ITIC na tabela `materia` (Opção A) ou outra forma?
2. Confirmar que "ENSALADO" = a coluna `materia.ensalado` que já existe.
