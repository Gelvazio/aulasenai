const 
const SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY0NTU5NCwiZXhwIjoyMTA0MjIxNTk0fQ.ghhPX0CjvSZdstMzkVzac2P4KZ4JlC8TKU2kqv2MNuY';

  console.log(`Aplicando seed: ${arquivoSql}`);
  
  const response = await fetch(`${SUPABASE_URL/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'aUespAnseA_SERVICEfEtch(`${SUPABASE_URL}/,est/v1/r/`, {
    method: 'POST
    headers:
      'Content-Type':'application/jon',
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ s
  })
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      !r'sponse.ok) {
    const eCont = await response.text(e;-Type': 'application/json',
    },
    bodyw ne: Error(JSON.)stringify({ sql_text: sql }),
  }
  );
  const data = await response.json();
  const data = await response.json();
  
  if (!response.ok) {
    console.error('Erro ao aplicar seed:', data);
    throw new Error(data.message || 'Erro desconhecido');
  }
  
  console.log('Seed aplicado com sucesso:', data);
  return data;
}

const arquivo = process.argv[2];
if (!arquivo) {
  console.error('Uso: node database/aplicar_seed.js <arquivo.sql>');
  process.exit(1);
}

aplicarSeed(arquivo).catch(err => {
  console.error(err);
  process.exit(1);
});
