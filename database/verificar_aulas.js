var SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
var SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY0NTU5NCwiZXhwIjoyMTA0MjIxNTk0fQ.ghhPX0CjvSZdstMzkVzac2P4KZ4JlC8TKU2kqv2MNuY';

async function verificarAulas() {
  console.log('Verificando aulas da matéria Fundamentos de UI / UX');

  var sql = "SELECT a.id, a.numero, m.descricao FROM public.aulas a JOIN public.materia m ON m.id = a.materia_id WHERE m.descricao = 'Fundamentos de UI / UX' ORDER BY a.numero";

  var response = await fetch(SUPABASE_URL + '/rest/v1/rpc/exec_sql', {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql_text: sql }),
  });

  var texto = await response.text();
  var data = texto ? JSON.parse(texto) : null;

  if (!response.ok) {
    console.error('Erro:', data);
    throw new Error(data.message || 'Erro desconhecido');
  }

  console.log('Aulas encontradas:', JSON.stringify(data, null, 2));
  return data;
}

verificarAulas().catch(function(err) {
  console.error(err);
  process.exit(1);
});
