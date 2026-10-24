const SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY0NTU5NCwiZXhwIjoyMTA0MjIxNTk0fQ.ghhPX0CjvSZdstMzkVzac2P4KZ4JlC8TKU2kqv2MNuY';

async function verificarMateria() {
  console.log('Verificando matéria FUNDAMENTOS DE UI UX...');
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/materia?id=eq.35&select=id,descricao,aulas(id,numero,titulo)`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Erro:', error);
    throw new Error(error);
  }
  
  const data = await response.json();
  console.log('Resultado:', JSON.stringify(data, null, 2));
  return data;
}

verificarMateria().catch(err => {
  console.error(err);
  process.exit(1);
});
