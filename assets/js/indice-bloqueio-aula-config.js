// BLOQUEIO DA AULA ligado em TODAS as matérias (tarefa #210, pedido do usuário em 2026-10-16:
// "liga o bloqueio da aula em tudo"; antes valia só em Testes de Front-End, #16). Regra no
// CLAUDE.md, seção "BLOQUEIO DA AULA × BLOQUEIO DA ATIVIDADE". Em toda matéria:
//   - o ON/OFF de cada atividade NUNCA bloqueia o card inteiro
//     (assets/js/indice-atividades-bloqueio.js);
//   - o botão "Aula liberada / Aula bloqueada", antes de "✏️ Editar aula", é o único que bloqueia
//     o card inteiro, na turma do combo "Turma:" (assets/js/indice-aula-bloqueio.js, #206). Card
//     sem aula no banco não ganha o botão.
// Para desligar numa matéria, pôr a pasta dela em PASTAS_SEM_BLOQUEIO_AULA.
// Carregado pelo assets/js/atividades-crud-modal.js antes dos scripts de bloqueio e pelas
// páginas de atividade antes do assets/js/atividade-bloqueio-aula.js.

const PASTAS_SEM_BLOQUEIO_AULA = [];

/**
 * Diz se a página atual é de uma matéria com o bloqueio da aula ligado (todas, menos as da
 * lista de exceções).
 * @returns {boolean} true se o bloqueio da aula vale nesta página.
 */
function bloqueioDeAulaLigado() {
    const caminho = decodeURIComponent(location.pathname).toUpperCase();
    return !PASTAS_SEM_BLOQUEIO_AULA.some((pasta) => caminho.includes(pasta.toUpperCase()));
}
