# Trigger: bloquear a aula bloqueia todas as atividades dela

**Criado em:** 2026-10-09 01:10 (horário de referência do projeto) · **Concluído em:** 2026-10-09 01:15 · **Tempo decorrido:** 5 min
**Pedido do usuário:** "ao bloquear uma aula inteira, automaticamente todas as atividades dela devem
ser marcadas como bloqueadas; faça isso através de trigger e usando MCP Supabase para gravar a
trigger". **STATUS.md:** Etapa 115.

## Objetivo

Quando o professor bloqueia a aula (`aulas.ativo` passa de `true` para `false`, pelo botão
"Aula liberada / Aula bloqueada" do índice ou pelo "Ativa" do "Editar aula"), o próprio banco marca
**todas as atividades da aula** como bloqueadas (`atividade.ativo = false`, que bloqueia para todas
as turmas).

## Banco real conferido (2026-10-09)

- `aulas.ativo` boolean (padrão true); trigger existente só `aulas_excluido_so_administrador_trg`.
- `atividade.ativo` boolean (padrão true) e `atividade.bloqueio` jsonb (turmas bloqueadas);
  `atividade.aula_id` liga a atividade à aula.

## Desenho

```sql
create or replace function public.aulas_bloqueio_propaga_atividades()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.atividade set ativo = false where aula_id = new.id and ativo;
  return new;
end $$;

create trigger aulas_bloqueio_propaga_atividades_trg
  after update of ativo on public.aulas
  for each row when (old.ativo is distinct from new.ativo and new.ativo = false)
  execute function public.aulas_bloqueio_propaga_atividades();
```

- `security definer`: quem dispara já passou pelo RLS da `aulas` (só professor altera); a função só
  mexe nas atividades **daquela** aula. `execute` revogado de `public`/`anon`/`authenticated` (a
  função só roda pelo trigger).
- SQL versionado em `database/2026-10-09-trigger-bloqueio-aula-atividades.sql` (idempotente) e
  aplicado pelo MCP do Supabase (`apply_migration`).

## Decisão pedida ao usuário

| # | Pergunta | Opções |
|---|---|---|
| D1 | Ao **desbloquear** a aula, as atividades voltam sozinhas? | (a) Não: o professor libera cada atividade no ON/OFF (seguro: as práticas que nasceram bloqueadas continuam bloqueadas) · (b) Sim: todas as atividades da aula voltam a `ativo = true` |

## Passos

| Passo | Ação | Verificação | Status |
|---|---|---|---|
| 1 | Escrever o SQL em `database/` | leitura | ✅ Concluído |
| 2 | Aplicar pelo MCP (`apply_migration`) | consulta do trigger em `pg_trigger` | ✅ Concluído |
| 3 | Teste no banco dentro de transação desfeita (bloquear a aula 1 de Testes de Front-End e ler as atividades; `rollback`) | atividades 96 e 99 com `ativo = false` dentro da transação; nada muda depois | ✅ Concluído |
| 4 | Atualizar `docs/database.md` + `docs/relatorio_verificacao_database.html`, `docs/regras/atividades.md`, `CLAUDE.md` (seção do bloqueio da aula), `STATUS.md` e commit | leitura | ✅ Concluído |

## Riscos

| Risco | Plano B |
|---|---|
| Atividades bloqueadas por engano ao bloquear a aula errada | desbloquear cada atividade no ON/OFF (ou opção D1-b) |
| Interface do índice não atualiza os ON/OFF na hora | os botões das atividades leem o banco ao recarregar a página (Ctrl+F5) |

## Resultado

- D1 (usuário, 2026-10-09): **(a)** — desbloquear a aula não mexe nas atividades.
- Trigger e função aplicados pelo MCP (`apply_migration` "trigger_bloqueio_aula_atividades").
- Teste em bloco desfeito na aula 93 (Testes de Front-End, aula 1): antes 96 = true, 99 = false;
  aula bloqueada → 96 = false, 99 = false; aula desbloqueada → continua 96 = false, 99 = false;
  depois do teste, tudo como antes (aula 93 ativa, 96 = true).
- Função `security definer`, sem execução para `authenticated`/`anon`.
- Tela: o botão da aula dispara `aula-bloqueio-alterado` e o `indice-atividades-bloqueio.js` relê
  os ON/OFF das atividades na hora.
