// Bloqueio da AULA inteira no ATIVIDADES/index.html pela coluna aulas.ativo (false =
// bloqueada). Regra (CLAUDE.md, seção "BLOQUEIO DA AULA × BLOQUEIO DA ATIVIDADE"): SÓ este botão
// bloqueia o card inteiro; o ON/OFF de cada atividade bloqueia só aquela atividade. Liga apenas
// nas matérias de assets/js/indice-bloqueio-aula-config.js.
// Professor: botão ON/OFF "Aula liberada / Aula bloqueada" logo antes de "✏️ Editar aula"; a aula
// bloqueada fica escurecida para ele, mas os links e botões continuam funcionando.
// Aluno: card da aula bloqueada escurecido com cadeado, links desativados e "Aula Bloqueada!".
// Usado por assets/js/indice-aula-data.js; grava com gravarAulaCard (indice-aula-repositorio.js).

const CLASSE_CARD_BLOQUEADO_AULA_BLOQUEIO = 'bloqueada';
const CLASSE_PROFESSOR_AULA_BLOQUEIO = 'aula--bloqueada-professor';
const CLASSE_BOTAO_AULA_BLOQUEIO = 'interruptor-aula';
const ATRIBUTO_HREF_AULA_BLOQUEIO = 'data-href-aula-bloqueada';
const MSG_AULA_BLOQUEIO = 'Aula Bloqueada!';
const TEXTO_LIBERADA_AULA_BLOQUEIO = 'Aula liberada';
const TEXTO_BLOQUEADA_AULA_BLOQUEIO = 'Aula bloqueada';
const MSG_FALHA_AULA_BLOQUEIO = 'Não foi possível alterar o bloqueio da aula: ';
// Avisa o indice-atividades-bloqueio.js para reler as atividades (o trigger do banco bloqueia
// todas as atividades da aula bloqueada).
const EVENTO_AULA_BLOQUEIO_ALTERADO = 'aula-bloqueio-alterado';

/**
 * Diz se o bloqueio da aula vale nesta página (matéria listada na configuração).
 * @returns {boolean} true se ligado.
 */
function bloqueioAulaAtivoNaPagina() {
    return typeof bloqueioDeAulaLigado === 'function' && bloqueioDeAulaLigado();
}

/**
 * Diz se a aula está bloqueada (aulas.ativo = false).
 * @param {Object|null} aula - Linha da tabela aulas.
 * @returns {boolean} true se bloqueada.
 */
function aulaEstaBloqueada(aula) {
    return aula?.ativo === false;
}

/**
 * Mostra um aviso pelo popup do projeto (sem alert), se ele estiver carregado.
 * @param {string} mensagem - Texto do aviso.
 * @param {string} tipo - Tipo do popup (aviso ou erro).
 */
async function avisarBloqueioAula(mensagem, tipo) {
    if (typeof window.mostrarPopup !== 'function') return;

    await window.mostrarPopup(mensagem, { tipo, titulo: 'Aula' });
}

/**
 * Aluno: aviso ao clicar em qualquer parte do card da aula bloqueada.
 * @param {Event} evento - Clique no card.
 */
function avisarCliqueAulaBloqueada(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    avisarBloqueioAula(MSG_AULA_BLOQUEIO, 'aviso');
}

/**
 * Aluno: bloqueia o card inteiro (visual de bloqueado, links sem href e aviso ao clicar).
 * @param {HTMLElement} card - Card da aula.
 */
function bloquearCardAulaAluno(card) {
    if (card.classList.contains(CLASSE_CARD_BLOQUEADO_AULA_BLOQUEIO)) return;

    card.classList.add(CLASSE_CARD_BLOQUEADO_AULA_BLOQUEIO);
    card.setAttribute('aria-disabled', 'true');
    card.querySelectorAll('a[href]').forEach((link) => {
        link.setAttribute(ATRIBUTO_HREF_AULA_BLOQUEIO, link.getAttribute('href'));
        link.removeAttribute('href');
        link.setAttribute('tabindex', '-1');
    });
    card.addEventListener('click', avisarCliqueAulaBloqueada, true);
}

/**
 * Atualiza a marcação e o texto do botão da aula conforme o estado.
 * @param {HTMLLabelElement} etiqueta - Botão da aula.
 * @param {boolean} liberada - true se a aula está liberada (ON).
 */
function atualizarBotaoBloqueioAula(etiqueta, liberada) {
    etiqueta.querySelector('input').checked = liberada;
    etiqueta.querySelector('.' + CLASSE_BOTAO_AULA_BLOQUEIO + '__texto').textContent =
        liberada ? TEXTO_LIBERADA_AULA_BLOQUEIO : TEXTO_BLOQUEADA_AULA_BLOQUEIO;
}

/**
 * Aplica ao card o estado de bloqueio da aula (professor: só visual; aluno: card bloqueado).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 * @param {boolean} ehProfessor - true se o usuário logado é professor.
 */
function aplicarBloqueioAulaNoCard(item, ehProfessor) {
    const bloqueada = aulaEstaBloqueada(item.aula);
    const botao = item.card.querySelector('.' + CLASSE_BOTAO_AULA_BLOQUEIO);
    if (botao) atualizarBotaoBloqueioAula(botao, !bloqueada);
    if (ehProfessor) {
        item.card.classList.toggle(CLASSE_PROFESSOR_AULA_BLOQUEIO, bloqueada);
        return;
    }
    if (bloqueada) bloquearCardAulaAluno(item.card);
}

/**
 * Grava o bloqueio da aula (aulas.ativo) e devolve a aula atualizada.
 * @param {Object} aula - Linha da tabela aulas.
 * @param {boolean} liberada - true para liberar.
 * @returns {Promise<Object>} Aula com o novo valor de ativo.
 * @throws {Error} Se o banco não alterar a linha.
 */
async function gravarBloqueioAula(aula, liberada) {
    const gravou = await gravarAulaCard(aula.id, { ativo: liberada });
    if (!gravou) throw new Error('o banco não alterou a aula');

    return { ...aula, ativo: liberada };
}

/**
 * Cria o botão ON/OFF da aula (ON = liberada; OFF = bloqueada, card inteiro para os alunos).
 * @param {{card: HTMLElement, aula: Object}} item - Card e aula.
 * @param {Function} aoGravar - Recebe a aula gravada (redesenha os cards da aula).
 * @returns {HTMLLabelElement} Botão pronto.
 */
function criarBotaoBloqueioAula(item, aoGravar) {
    const etiqueta = document.createElement('label');
    etiqueta.className = CLASSE_BOTAO_AULA_BLOQUEIO;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    const chave = document.createElement('span');
    chave.className = CLASSE_BOTAO_AULA_BLOQUEIO + '__chave';
    const texto = document.createElement('span');
    texto.className = CLASSE_BOTAO_AULA_BLOQUEIO + '__texto';
    etiqueta.append(caixa, chave, texto);
    atualizarBotaoBloqueioAula(etiqueta, !aulaEstaBloqueada(item.aula));
    caixa.addEventListener('change', async () => {
        caixa.disabled = true;
        try {
            aoGravar(await gravarBloqueioAula(item.aula, caixa.checked));
            document.dispatchEvent(new CustomEvent(EVENTO_AULA_BLOQUEIO_ALTERADO));
        } catch (erro) {
            atualizarBotaoBloqueioAula(etiqueta, !caixa.checked);
            await avisarBloqueioAula(MSG_FALHA_AULA_BLOQUEIO + erro.message, 'erro');
        }
        caixa.disabled = false;
    });
    return etiqueta;
}
