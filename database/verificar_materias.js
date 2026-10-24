var SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
var SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY0NTU5NCwiZXhwIjoyMTA0MjIxNTk0fQ.ghhPX0CjvSZdstMzkVzac2P4KZ4JlC8TKU2kqv2MNuY';

async function verificarMaterias() {
  console.log('Listando todas as matérias');
  
  var response = await fetch(SUPABASE_URL + '/rest/v1/materia?select=id,descricao&order=descricao', {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
    },
  });
  
  var materias = await response.json();
  console.log('Matérias encontradas:', JSON.stringify(materias, null, 2));
  
  // Filter for UI-related
  var uiMaterias = materias.filter(function(m) {
    return m.descricao && m.descricao.indexOf('UI') !== -1;
  });
  console.log('Matérias com UI:', JSON.stringify(uiMaterias, null, 2));
  return materias;
}

verificarMaterias().catch(function(err) {
  console.error(err);
  process.exit(1);
});
