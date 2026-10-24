var SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
var SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY0NTU5NCwiZXhwIjoyMTA0MjIxNTk0fQ.ghhPX0CjvSZdstMzkVzac2P4KZ4JlC8TKU2kqv2MNuY';

async function verificarAulasMateria() {
  console.log('Verificando aulas da matéria Fundamentos de UI / UX (id 52)');
  
  var response = await fetch(SUPABASE_URL + '/rest/v1/aulas?select=id,numero,materia_id&materia_id=eq.52&order=numero', {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
    },
  });
  
  var aulas = await response.json();
  console.log('Aulas encontradas (materia_id=52):', JSON.stringify(aulas, null, 2));
  
  console.log('\nVerificando aulas da matéria FUNDAMENTOS DE UI UX (id 35)');
  var response2 = await fetch(SUPABASE_URL + '/rest/v1/aulas?select=id,numero,materia_id&materia_id=eq.35&order=numero', {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
    },
  });
  
  var aulas2 = await response2.json();
  console.log('Aulas encontradas (materia_id=35):', JSON.stringify(aulas2, null, 2));
  return aulas;
}

verificarAulasMateria().catch(function(err) {
  console.error(err);
  process.exit(1);
});
