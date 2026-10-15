// Modelo do scripts/variaveis.js (o papel do .env.example neste projeto).
// Copie para scripts/variaveis.js e preencha só na sua máquina: variaveis.js está no .gitignore
// e nunca vai para o Git nem para o site. Usado por scripts/criarUsuariosBancoDados.html
// (assets/js/criar-usuarios-api.js). Regras: .claude/rules/security-banco.md e git-quick.md.

window.VARIAVEIS = {
  // Chave service_role do Supabase (Project Settings → API). Acesso total ao banco: nunca publicar.
  SUPABASE_SERVICE_ROLE_KEY: "",
};
