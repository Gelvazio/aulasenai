// Professor: botão "📊 Progresso Atividades" no card da aula do índice de atividades, logo antes
// de "Aula liberada / Aula bloqueada". Ao clicar, abre o modal com o quadro de progresso das
// atividades da aula e dos alunos (assets/js/indice-aula-progresso-modal.js). Só o botão: o
// modal, a leitura do banco e o quadro ficam em arquivos próprios. Tarefa #421.1.
// Usado por assets/js/indice-aula-data.js (só monta para o professor).

const CLASSE_BOTAO_PROGRESSO_AULA = 'btn aula-data-botao aula-progresso-botao';
const TEXTO_BOTAO_PROGRESSO_AULA = '📊 Progresso Atividades';
const TITULO_BOTAO_PROGRESSO_AULA = 'Quem já fez cada atividade desta aula (sem os alunos que ' +
    'faltaram)';
const MSG_MODAL_PROGRESSO_INDISPONIVEL = 'Não foi possível abrir o progresso das atividades.';

/**
 * Cria o botão "Progresso Atividades" do card da aula.
 * @param {{card: HTMLElement, aula: Object}} item - Card e aula (linha da tabela aulas).
 * @returns {HTMLButtonElement} Botão pronto, que abre o modal de progresso.
 */
function criarBotaoProgressoAtividades(item) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = CLASSE_BOTAO_PROGRESSO_AULA;
    botao.textContent = TEXTO_BOTAO_PROGRESSO_AULA;
    botao.title = TITULO_BOTAO_PROGRESSO_AULA;
    botao.addEventListener('click', () => abrirProgressoAtividadesDaAula(item));
    return botao;
}

/**
 * Abre o modal de progresso das atividades da aula (módulo carregado junto da página).
 * @param {{card: HTMLElement, aula: Object}} item - Card e aula.
 * @returns {Promise<void>} Resolve quando o modal abrir (ou o aviso de erro fechar).
 */
async function abrirProgressoAtividadesDaAula(item) {
    const moduloCarregado = typeof window.abrirModalProgressoAtividades === 'function';
    if (!moduloCarregado) {
        await mostrarPopup(MSG_MODAL_PROGRESSO_INDISPONIVEL, { tipo: 'erro' });
        return;
    }
    await window.abrirModalProgressoAtividades(item);
}

window.criarBotaoProgressoAtividades = criarBotaoProgressoAtividades;
