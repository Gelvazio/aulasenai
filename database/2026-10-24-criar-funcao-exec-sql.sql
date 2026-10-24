-- Função RPC para executar SQL arbitrário (cuidado: poder total)
-- Uso: SELECT exec_sql('COMANDO SQL AQUI');
-- NOTA: Este arquivo contém SQL que cria uma função com poder total no banco.
-- Aplique manualmente pelo painel do Supabase antes de usar o script de seeds.

CREATE OR REPLACE FUNCTION exec_sql(sql_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_text;
  RETURN 'SQL executado com sucesso';
EXCEPTION WHEN OTHERS THEN
  RETURN 'Erro: ' || SQLERRM;
END;
$$;

-- Conceder permissão para a função (service_role já tem por padrão)
GRANT EXECUTE ON FUNCTION exec_sql(text) TO anon, authenticated, service_role;
