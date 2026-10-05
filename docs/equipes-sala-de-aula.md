# Equipes de sala de aula por turma + matéria (CRUD global no menu das atividades)

**Objetivo:** em toda página de atividade de matéria, o menu **👥 Equipes** abre um modal com as
equipes da **matéria** da página e da **turma selecionada**, com CRUD completo (equipes e
integrantes), começando pela Introdução à TIC (turma 135080 — CEPLAS ITIC Manhã).

**Tech Stack:** Supabase (PostgreSQL + RLS + Auth), JavaScript vanilla, CSS com tokens.

**Criado em:** 2026-10-05
**Concluído em:** 2026-10-05 (código); SQL aguardando aplicação no Supabase
**Tempo decorrido:** —

---

## Decisões (pedido do usuário em 2026-10-05)

1. **Global:** o mesmo código serve a qualquer matéria e turma. A matéria vem da própria pasta
   (as atividades cadastradas em `atividade.pagina` → `aulas` → `materia`); a turma é escolhida
   no modal (turmas do professor; 1 turma = já selecionada; administrador vê todas).
2. **Equipe = turma + matéria + nome** (nome único dentro da turma/matéria) e descrição.
3. **Integrante** = aluno da turma (`turmaaluno`) com papel, tarefas combinadas e marca de
   **líder** (no máximo 1 por equipe). Cada aluno fica em **uma** equipe por turma + matéria.
4. **Nomes das equipes:** o professor cadastra (nada gerado automaticamente).
5. **Professor:** CRUD só nas turmas vinculadas a ele (`professor_tem_turma`). **Aluno:** vê só
   a própria equipe e os colegas (função `minhas_equipes`). `anon` sem acesso. Nada em
   localStorage.
6. **Menu:** item `{ rotulo: '👥 Equipes', acao: 'equipes', papeis: [...] }` no
   `MENU-ATIVIDADES.js` da matéria. O `js/menu.js` passou a aceitar itens de **ação**: carrega
   `assets/js/menu-acao-<acao>.js` no primeiro clique. Os `papeis` são só sugestões do campo Papel.

## Status Geral

| Passo | Descrição | Status | Concluído em |
|-------|-----------|--------|--------------|
| 1 | SQL `database/2026-10-05-equipes-turma-materia.sql` (tabelas `equipe`, `equipe_membro`, triggers, RLS, `minhas_equipes`) | ✅ Concluído | 2026-10-05 |
| 2 | `assets/js/equipes-repositorio.js` (dados, cliente injetado) | ✅ Concluído | 2026-10-05 |
| 3 | `assets/js/equipes-modal.js` + `assets/css/equipes-modal.css` (tela) | ✅ Concluído | 2026-10-05 |
| 4 | `assets/js/menu-acao-equipes.js` (carrega dependências e abre o modal) | ✅ Concluído | 2026-10-05 |
| 5 | `js/menu.js`: itens de ação | ✅ Concluído | 2026-10-05 |
| 6 | ITIC: item 👥 Equipes no `MENU-ATIVIDADES.js`; menu aplicado na página do trabalho em equipe | ✅ Concluído | 2026-10-05 |
| 7 | `docs/database.md` + `docs/relatorio_verificacao_database.html` | ✅ Concluído | 2026-10-05 |
| 8 | Regra no `CLAUDE.md` (versão + histórico) | ✅ Concluído | 2026-10-05 |
| 9 | Conferência: `node --check` e leitura (sem navegador) | ✅ Concluído | 2026-10-05 |
| 10 | Aplicar o SQL no Supabase (**só com pedido do usuário**) | ⬜ Pendente | — |
| 11 | Teste na tela pelo professor (montar as equipes da 135080) | ⬜ Pendente | — |
| 12 | Outras matérias: acrescentar o item no `MENU-ATIVIDADES.js` de cada uma | ⬜ Quando o usuário pedir | — |

## Arquivos

- Novos: `database/2026-10-05-equipes-turma-materia.sql`, `assets/js/equipes-repositorio.js`,
  `assets/js/equipes-modal.js`, `assets/js/menu-acao-equipes.js`, `assets/css/equipes-modal.css`.
- Alterados: `js/menu.js`, `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/MENU-ATIVIDADES.js`,
  `.../ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA.html` (tags do menu),
  `docs/database.md`, `docs/relatorio_verificacao_database.html`, `CLAUDE.md`, `STATUS.md`.

## Riscos

| Risco | Plano B |
|---|---|
| SQL ainda não aplicado: o modal mostra erro de tabela inexistente | Aplicar o SQL (SQL Editor ou pedido "aplique o SQL pelo Supabase") |
| Matéria sem atividade cadastrada no banco não é identificada | Cadastrar as atividades (seed) da matéria |
| Alunos da turma fora da `turmaaluno` não aparecem | Vincular em `alunos.html` |
| Professor sem vínculo em `turmaprofessor` não vê a turma | Administrador vincula em `turmas.html` |

## Verificação

- `node --check` nos JS novos/alterados: OK. Linhas ≤ 100 caracteres.
- Sem navegador (regra do usuário): o teste da tela fica com o professor após aplicar o SQL.
