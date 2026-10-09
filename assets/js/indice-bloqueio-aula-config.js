// Matérias em que o BLOQUEIO DA AULA já está ligado (tarefa #16 do TASKS.md; regra no
// CLAUDE.md, seção "BLOQUEIO DA AULA × BLOQUEIO DA ATIVIDADE"). Nelas:
//   - o ON/OFF de cada atividade NUNCA bloqueia o card inteiro
//     (assets/js/indice-atividades-bloqueio.js);
//   - o botão "Aula liberada / Aula bloqueada" (aulas.ativo), antes de "✏️ Editar aula", é o
//     único que bloqueia o card inteiro (assets/js/indice-aula-bloqueio.js).
// Para ligar em outra matéria, acrescentar a pasta dela aqui (pedido do usuário: uma por vez).
// Carregado pelo assets/js/atividades-crud-modal.js antes dos scripts de bloqueio.

const PASTAS_COM_BLOQUEIO_AULA = [
    '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/',
];

/**
 * Diz se a página atual é de uma matéria com o bloqueio da aula ligado.
 * @returns {boolean} true se o bloqueio da aula vale nesta página.
 */
function bloqueioDeAulaLigado() {
    const caminho = decodeURIComponent(location.pathname).toUpperCase();
    return PASTAS_COM_BLOQUEIO_AULA.some((pasta) => caminho.includes(pasta.toUpperCase()));
}
