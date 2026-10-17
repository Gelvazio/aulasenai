// Bloqueio da AULA inteira no ATIVIDADES/index.html, POR TURMA (tarefa #206): vale a coluna
// aula_turma.bloqueio da turma escolhida no combo "Turma:" do índice (abre na favorita); o aluno
// usa as turmas dele (perde a aula só se ela estiver bloqueada em todas). aulas.ativo = false
// continua bloqueando a aula para todas as turmas. Regra (CLAUDE.md, seção "BLOQUEIO DA AULA ×
// BLOQUEIO DA ATIVIDADE"): SÓ este botão bloqueia o card inteiro; o ON/OFF de cada atividade
// bloqueia só aquela atividade. Liga apenas nas matérias de
// assets/js/indice-bloqueio-aula-config.js.
// Professor: botão ON/OFF "Aula liberada / Aula bloqueada" logo antes de "✏️ Editar aula", para a
// turma do combo; a aula bloqueada fica escurecida e SEM NENHUM acesso também para ele (links,
// slides, ON/OFF das atividades, CADASTRAR ATIVIDADES, Editar aula): só o botão da aula continua.
// Bloquear na turma põe a turma no bloqueio das atividades da aula (gatilho do banco); liberar
// não mexe nelas. Liberar uma aula bloqueada para todas (aulas.ativo = false) a deixa bloqueada
// nas outras turmas do combo e libera só a escolhida. Sem combo (sem turmas), grava aulas.ativo.
// Aluno: card da aula bloqueada escurecido com cadeado, links desativados e "Aula Bloqueada!".
// Usado por assets/js/indice-aula-data.js; grava com gravarAulaCard (indice-aula-repositorio.js)
// e com assets/js/aula-turma-repositorio.js.

const CLASSE_CARD_BLOQUEADO_AULA_BLOQUEIO = 'bloqueada';
const CLASSE_CARD_OCULTO_ALUNO_AULA_BLOQUEIO = 'aula--oculta-para-aluno';
const SELETOR_COMBO_TURMA_AULA_BLOQUEIO = '.barra-turma-favorita__lista';
const PREFIXO_TITULO_AULA_BLOQUEIO = 'Vale para a turma ';
// turma: turma do combo (só o professor grava nela); linhas: linhas de aula_turma dessa turma;
// bloqueadas: ids das aulas bloqueadas nas turmas lidas; leitura: descarta respostas antigas.
const estadoBloqueioAulaTurma = { turma: '', linhas: new Map(), bloqueadas: new Set(), leitura: 0 };
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
 * Diz se a aula está bloqueada: para todas (aulas.ativo = false) ou na turma lida (aula_turma).
 * @param {Object|null} aula - Linha da tabela aulas.
 * @returns {boolean} true se bloqueada.
 */
function aulaEstaBloqueada(aula) {
    if (!aula) return false;

    return aula.ativo === false || estadoBloqueioAulaTurma.bloqueadas.has(aula.id);
}

/**
 * Lê o bloqueio das aulas nas turmas: a do combo (professor) ou as do aluno.
 * @param {{turma?: string, turmas?: string[]}} escolha - Turma do combo ou turmas do aluno.
 */
async function carregarBloqueioAulaTurma({ turma = '', turmas = [] }) {
    const estado = estadoBloqueioAulaTurma;
    const leitura = ++estado.leitura;
    const lista = turma ? [turma] : turmas.filter(Boolean);
    const lido = { turma, linhas: new Map(), bloqueadas: new Set() };
    if (lista.length && typeof lerAulasBloqueadasNasTurmas === 'function') {
        try {
            lido.bloqueadas = await lerAulasBloqueadasNasTurmas(lista);
            if (turma) lido.linhas = await lerLinhasAulaTurma(turma);
        } catch (erro) {
            console.warn('Bloqueio da aula por turma indisponível:', erro.message);
        }
    }
    if (leitura === estado.leitura) Object.assign(estado, lido);
}

/**
 * Turma em que o bloqueio da aula está sendo lido e gravado (a do combo; vazio = nenhuma).
 * @returns {string} Código da turma.
 */
function turmaDoBloqueioAula() {
    return estadoBloqueioAulaTurma.turma;
}

/**
 * Guarda uma linha de aula_turma gravada por outro módulo (ex.: a data no "Editar aula"), para
 * o próximo bloqueio atualizar a linha em vez de tentar criar outra.
 * @param {{aula_id: number, turma_codigo: string}} linha - Linha gravada.
 */
function registrarLinhaAulaTurma(linha) {
    const estado = estadoBloqueioAulaTurma;
    if (linha?.turma_codigo === estado.turma) estado.linhas.set(linha.aula_id, linha);
}

/**
 * Lê a turma inicial do bloqueio: a do combo "Turma:" (professor) ou as turmas do aluno.
 * @param {boolean} ehProfessor - true se o usuário logado é professor.
 */
async function prepararBloqueioAulaTurma(ehProfessor) {
    if (ehProfessor) {
        const turma = document.querySelector(SELETOR_COMBO_TURMA_AULA_BLOQUEIO)?.value || '';
        return carregarBloqueioAulaTurma({ turma });
    }
    try {
        const turmas = typeof lerTurmasDoAlunoAulaTurma === 'function'
            ? await lerTurmasDoAlunoAulaTurma() : [];
        await carregarBloqueioAulaTurma({ turmas });
    } catch (erro) {
        console.warn('Turmas do aluno indisponíveis:', erro.message);
    }
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
 * Professor: desativa (guardando o href) ou reativa um link do card da aula.
 * @param {HTMLAnchorElement} link - Link do card.
 * @param {boolean} travar - true para desativar.
 */
function travarLinkAulaProfessor(link, travar) {
    if (travar && link.hasAttribute('href')) {
        link.setAttribute(ATRIBUTO_HREF_AULA_BLOQUEIO, link.getAttribute('href'));
        link.removeAttribute('href');
    }
    if (!travar && link.hasAttribute(ATRIBUTO_HREF_AULA_BLOQUEIO)) {
        link.setAttribute('href', link.getAttribute(ATRIBUTO_HREF_AULA_BLOQUEIO));
        link.removeAttribute(ATRIBUTO_HREF_AULA_BLOQUEIO);
    }
}

/**
 * Professor: trava (ou destrava) todo o card da aula bloqueada, menos o botão da aula.
 * O CSS também corta o clique (pointer-events) nos controles criados depois.
 * @param {HTMLElement} card - Card da aula.
 * @param {boolean} travar - true para travar.
 */
function travarCardAulaProfessor(card, travar) {
    card.classList.toggle(CLASSE_PROFESSOR_AULA_BLOQUEIO, travar);
    const seletorLinks = 'a[href], a[' + ATRIBUTO_HREF_AULA_BLOQUEIO + ']';
    card.querySelectorAll(seletorLinks).forEach((link) => travarLinkAulaProfessor(link, travar));
    card.querySelectorAll('button, input, select').forEach((controle) => {
        if (controle.closest('.' + CLASSE_BOTAO_AULA_BLOQUEIO)) return;
        controle.disabled = travar;
    });
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
    const { turma } = estadoBloqueioAulaTurma;
    etiqueta.title = turma ? PREFIXO_TITULO_AULA_BLOQUEIO + turma : '';
}

/**
 * Aplica o bloqueio da aula: oculta o card para aluno e mantém no professor o botão de liberar.
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 * @param {boolean} ehProfessor - true se o usuário logado é professor.
 */
function aplicarBloqueioAulaNoCard(item, ehProfessor) {
    const bloqueada = aulaEstaBloqueada(item.aula);
    const botao = item.card.querySelector('.' + CLASSE_BOTAO_AULA_BLOQUEIO);
    item.card.classList.toggle(CLASSE_CARD_OCULTO_ALUNO_AULA_BLOQUEIO,
        !ehProfessor && bloqueada);
    if (botao) atualizarBotaoBloqueioAula(botao, !bloqueada);
    if (ehProfessor) {
        travarCardAulaProfessor(item.card, bloqueada);
        return;
    }
    if (bloqueada) bloquearCardAulaAluno(item.card);
}

/**
 * Grava o bloqueio da aula para todas as turmas (aulas.ativo).
 * @param {Object} aula - Linha da tabela aulas.
 * @param {boolean} liberada - true para liberar.
 * @returns {Promise<Object>} Aula com o novo valor de ativo.
 * @throws {Error} Se o banco não alterar a linha.
 */
async function gravarAtivoDaAula(aula, liberada) {
    const gravou = await gravarAulaCard(aula.id, { ativo: liberada });
    if (!gravou) throw new Error('o banco não alterou a aula');

    return { ...aula, ativo: liberada };
}

/**
 * Grava o bloqueio da aula numa turma (aula_turma) e atualiza o estado da turma do combo.
 * @param {number} aulaId - Id da aula.
 * @param {string} turma - Código da turma.
 * @param {{bloquear: boolean, existente?: Object}} opcoes - Bloquear e a linha que já existe.
 * @throws {Error} Se o banco recusar.
 */
async function gravarBloqueioNaTurma(aulaId, turma, { bloquear, existente }) {
    const gravada = await gravarLinhaAulaTurma({ aulaId, turmaCodigo: turma, existente },
        { bloqueio: bloquear });
    const estado = estadoBloqueioAulaTurma;
    if (turma !== estado.turma) return;

    estado.linhas.set(aulaId, gravada);
    if (bloquear) estado.bloqueadas.add(aulaId); else estado.bloqueadas.delete(aulaId);
}

/**
 * Antes de liberar uma aula bloqueada para todas (aulas.ativo = false), deixa-a bloqueada nas
 * outras turmas do combo, para que só a turma escolhida seja liberada.
 * @param {Object} aula - Linha da tabela aulas.
 * @param {string} turma - Turma do combo (a que será liberada).
 * @throws {Error} Se o banco recusar.
 */
async function manterBloqueioNasOutrasTurmas(aula, turma) {
    const combo = document.querySelector(SELETOR_COMBO_TURMA_AULA_BLOQUEIO);
    const outras = [...(combo?.options || [])].map((opcao) => opcao.value)
        .filter((codigo) => codigo && codigo !== turma);
    for (const codigo of outras) {
        const linhas = await lerLinhasAulaTurma(codigo);
        const existente = linhas.get(aula.id);
        if (existente?.bloqueio !== true) {
            await gravarBloqueioNaTurma(aula.id, codigo, { bloquear: true, existente });
        }
    }
}

/**
 * Grava o bloqueio da aula na turma do combo (sem turma, para todas) e devolve a aula.
 * @param {Object} aula - Linha da tabela aulas.
 * @param {boolean} liberada - true para liberar.
 * @returns {Promise<Object>} Aula atualizada.
 * @throws {Error} Se o banco não gravar.
 */
async function gravarBloqueioAula(aula, liberada) {
    const { turma, linhas } = estadoBloqueioAulaTurma;
    if (!turma) return gravarAtivoDaAula(aula, liberada);

    let atualizada = aula;
    if (liberada && aula.ativo === false) {
        await manterBloqueioNasOutrasTurmas(aula, turma);
        atualizada = await gravarAtivoDaAula(aula, true);
    }
    await gravarBloqueioNaTurma(aula.id, turma, { bloquear: !liberada,
        existente: linhas.get(aula.id) });
    return atualizada;
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
