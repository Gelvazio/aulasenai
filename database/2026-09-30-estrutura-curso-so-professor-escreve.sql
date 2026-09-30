-- ─────────────────────────────────────────────────────────────────────────────────────
-- Estrutura de cursos: só o PROFESSOR escreve (pedido do professor em 2026-09-30)
--
-- Antes: aulas, materia, curso, cursomateria e unidade tinham políticas para o papel "public" com
-- insert/update/delete "using (true)" — qualquer pessoa, mesmo sem login, com a chave pública podia
-- inserir, alterar e apagar. O antigo dashboard que dependia disso não existe mais no repositório
-- (js/curso.js, materia.js, aulas.js e unidade.js não são carregados por nenhuma página).
-- Depois: escrever só como usuário logado com perfil PROFESSOR (eh_professor()); a leitura continua
-- como está (política de SELECT não muda). O anon perde os privilégios de escrita nessas tabelas.
-- Idempotente. Executar no Supabase → SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────────────
do $$
declare
  t text;
begin
  foreach t in array array['aulas', 'materia', 'curso', 'cursomateria', 'unidade'] loop
    execute format('drop policy if exists %I on public.%I', t || '_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_delete', t);
    execute format('drop policy if exists %I on public.%I', t || '_insert_professor', t);
    execute format('drop policy if exists %I on public.%I', t || '_update_professor', t);
    execute format('drop policy if exists %I on public.%I', t || '_delete_professor', t);

    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select public.eh_professor()))',
      t || '_insert_professor', t);
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select public.eh_professor())) with check ((select public.eh_professor()))',
      t || '_update_professor', t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select public.eh_professor()))',
      t || '_delete_professor', t);

    -- defesa em profundidade: anon só lê; ninguém esvazia a tabela pela API
    execute format('revoke insert, update, delete, truncate, references, trigger on public.%I from anon', t);
    execute format('revoke truncate, references, trigger on public.%I from authenticated', t);
  end loop;
end $$;
