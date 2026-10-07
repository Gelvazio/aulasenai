// Página scripts/criarUsuariosBancoDados.html: carregado logo ANTES do LISTA-PRESENCA-PROFESSOR.js.
// Guarda como estavam as listas, para o criar-usuarios-pagina.js saber quais vieram desse arquivo
// (todas as pessoas dele vão para a aba "Professores", com perfil PROFESSOR).
window.LISTAS_ANTES_PROFESSOR = {
    unica: window.LISTA_PRESENCA,
    total: (window.LISTAS_PRESENCA || []).length,
};
