# Sugestão de alunos por turma com botão "Confirmar" (alunos.html)

- **Criado em:** 2026-10-05
- **Concluído em:** 2026-10-05 (código; falta aplicar o SQL e o teste do professor)
- **Tempo decorrido:** ~1 h
- **Pedido do usuário:** "Na página `alunos.html`, sugira cada aluno pela turma, com um botão ao
  lado de cada aluno de nome CONFIRMAR, para ao confirmar gravar a relação no banco de dados."

## Objetivo

Mostrar ao professor, na `alunos.html`, os alunos (perfil ALUNO) que **ainda não estão ligados a
nenhuma turma** na `turmaaluno`, cada um com a **turma sugerida** e o botão **✅ Confirmar**, que
grava o vínculo `turma_codigo × aluno_id` na `turmaaluno`.

## De onde vem a turma sugerida

- Todos os `aluno.turma_codigo` antigos já viraram vínculos (migração de 2026-10-02), então a
  tabela `aluno` não ajuda mais.
- A única informação de turma dos alunos sem vínculo é a que a página
  `scripts/criarUsuariosBancoDados.html` grava ao criar a conta: `user_metadata.turma_codigo`
  (e `turma_nome`) no `auth.users`. O navegador do professor **não lê** o `auth.users` de outro
  usuário, então é preciso uma **função no banco** (`security definer`).
- ⚠️ O `user_metadata` pode ser alterado pelo aluno: por isso ele é **só sugestão**. Quem decide é
  o professor ao clicar em Confirmar, e a gravação continua passando pelo RLS da `turmaaluno`
  (professor só nas turmas dele) e pelo trigger `turmaaluno_exige_aluno`. Nada de permissão
  depende do `user_metadata` (regra do `CLAUDE.md`).
- Aluno sem turma no `user_metadata`: aparece "sem sugestão" e o professor escolhe a turma na lista
  da própria linha antes de confirmar.

## Mudança de escopo (2026-10-05, pedido do usuário durante a execução)

"Em *Alunos por turma*, deve ter um filtro também de nome **TURMA OK** (SIM/NÃO), para quem está
ou não cadastrado no banco de dados a relação com a turma." Decisão: em vez de uma seção separada,
os alunos sem turma entram **na própria tabela "Alunos por turma"**, com a coluna **Turma OK**
(✅ Sim = vínculo gravado; ❌ Não = falta confirmar, com a turma sugerida na lista e o botão
✅ Confirmar). O filtro **Turma OK** (Todos / Sim / Não) se soma ao filtro de turma e à busca.

## Escopo

- **Entra:** função SQL de leitura das sugestões; seção "Sugestões de vínculo" na `alunos.html`
  (agrupada por turma, com filtro por turma já existente reaproveitado); botão Confirmar por
  aluno; atualização da tabela de vínculos após confirmar; popup de sucesso/erro.
- **Não entra:** confirmar todos de uma vez; alterar a `criarUsuariosBancoDados.html`; mudar
  RLS ou triggers existentes.

## Arquivos previstos

| Arquivo | Ação |
|---|---|
| `database/2026-10-05-sugestoes-turmaaluno.sql` | Novo: função `sugestoes_turmaaluno()` |
| `assets/js/turmas-aluno-repositorio.js` | Novo método `listarSugestoes()` (RPC) |
| `assets/js/turmas-aluno-sugestoes.js` | Novo: linhas dos alunos sem turma + botão Confirmar (SRP; a página já tem 330 linhas) |
| `assets/js/turmas-aluno-pagina.js` | Chamar o módulo de sugestões após carregar e após gravar |
| `alunos.html` | Filtro e coluna **Turma OK** + `<script>` do módulo |
| `assets/css/turmas-aluno.css` | Estilo da seção e do botão Confirmar |
| `docs/database.md` + `docs/relatorio_verificacao_database.html` | Registrar a função |
| `STATUS.md` | Etapa 15 |

## Função no banco (proposta)

```sql
create or replace function public.sugestoes_turmaaluno()
returns table (aluno_id uuid, nome_completo text, email text,
               turma_sugerida text, turma_nome text)
language sql stable security definer set search_path to 'public'
as $$
  select u.id, us.nome_completo, u.email,
         t.codigo, t.nome
  from auth.users u
  left join public.usuario us on us.id = u.id
  left join public.turma t on t.codigo = u.raw_user_meta_data ->> 'turma_codigo'
  where public.eh_professor()
    and u.raw_app_meta_data ->> 'perfil' = 'ALUNO'
    and not exists (select 1 from public.turmaaluno ta where ta.aluno_id = u.id)
    and (t.codigo is null or public.professor_tem_turma(t.codigo))
  order by t.codigo nulls last, us.nome_completo;
$$;
revoke all on function public.sugestoes_turmaaluno() from public, anon;
grant execute on function public.sugestoes_turmaaluno() to authenticated;
```

- Só professor recebe linhas; professor comum só vê sugestões das turmas dele (ou sem sugestão,
  que já são visíveis a todo professor pela regra `professor_pode_ver_aluno`); o administrador vê
  todas. Não devolve senha nem metadados além de nome, e-mail e turma.
- Idempotente, sem apagar dados. Aplicar no Supabase **só com pedido do usuário**.

## Passos

| # | Ação | Arquivo | Verificação | Status |
|---|---|---|---|---|
| 1 | Conferir no código/SQL as funções `eh_professor`, `professor_tem_turma` e o trigger da `turmaaluno` | `database/` | Leitura | ✅ Concluído |
| 2 | Escrever a função SQL | `database/2026-10-05-sugestoes-turmaaluno.sql` | Leitura | ✅ Concluído |
| 3 | Método `listarSugestoes()` no repositório | `assets/js/turmas-aluno-repositorio.js` | `node --check` | ✅ Concluído |
| 4 | Módulo da tela de sugestões (agrupar por turma, lista de turma por linha, botão ✅ Confirmar, popup) | `assets/js/turmas-aluno-sugestoes.js` | `node --check` | ✅ Concluído |
| 5 | Integrar na página e no HTML; CSS | `turmas-aluno-pagina.js`, `alunos.html`, `turmas-aluno.css` | `node --check` + leitura | ✅ Concluído |
| 6 | Documentar a função | `docs/database.md`, `docs/relatorio_verificacao_database.html` | Leitura | ✅ Concluído |
| 7 | Commit local | — | `git diff --cached --name-only` | ✅ Concluído |
| 8 | Aplicar o SQL no Supabase (só com pedido) e o professor testar a página | — | Aplicado em 2026-10-05 pelo conector; hoje 0 alunos sem turma; teste do professor pendente | 🔄 Em progresso |

## Riscos

| Risco | Plano B |
|---|---|
| Alunos antigos sem `turma_codigo` no `user_metadata` | Linha "sem sugestão" com lista de turmas para o professor escolher |
| `user_metadata` alterado pelo aluno | É só sugestão; o professor confirma e o RLS valida a turma |
| Página carregada antes do SQL aplicado | A seção mostra aviso "Função de sugestões ainda não aplicada no banco" sem quebrar o CRUD |

## Resultado final

- Função `sugestoes_turmaaluno()` escrita (não aplicada no banco).
- `alunos.html`: coluna e filtro **Turma OK**; alunos sem turma com a turma sugerida e ✅ Confirmar.
- Sem a função no banco, a página continua funcionando e mostra o aviso no resumo da tabela.
- Verificação: `node --check` nos 3 scripts; sem navegador (regra do usuário).
