// Alerta de atividade pendente no índice de atividades (#293) — só professor.
// Base do módulo: nota mínima da matéria × nota do aluno (#293.11), leitura da turma do combo
// "Turma:" com refiltro (#293.12) e a regra de "pendente" (#293.10).
// A carga no índice e o uso nos cards entram na #293.13 (evento cards-aula-montados).
// Lê o materia.json da matéria e a RPC atividades_pendentes_turma (só contagens, #293.6).
// Depende de: js/supabase.js (SUPABASE, sbH); combo "Turma:" do indice-turma-favorita.js.

const ARQUIVO_MATERIA_PENDENTES = '../materia.json';
const NOTA_MINIMA_PADRAO_PENDENTES = 7;
const NOTA_MAXIMA_PENDENTES = 10;
// Combo "Turma:" do índice e os eventos que avisam quando a turma escolhida muda.
const SELETOR_COMBO_TURMA_PENDENTES = '.barra-turma-favorita__lista';
const EVENTO_TURMA_INDICE_PENDENTES = 'turma-indice-alterada';
const EVENTO_FAVORITA_ALTERADA_PENDENTES = 'turma-favorita-alterada';

/**
 * Lê a nota mínima da matéria no materia.json (avaliacao.nota_minima).
 * Sem o arquivo, sem o campo ou com valor inválido, usa a nota padrão de 7,0.
 * @returns {Promise<number>} Nota mínima entre 0 e 10.
 */
async function carregarNotaMinimaPendentes() {
    try {
        const resposta = await fetch(ARQUIVO_MATERIA_PENDENTES, { cache: 'no-store' });
        if (!resposta.ok) return NOTA_MINIMA_PADRAO_PENDENTES;
        const materia = await resposta.json();
        return normalizarNotaMinimaPendentes(materia?.avaliacao?.nota_minima);
    } catch (erro) {
        console.warn('Nota mínima da matéria indisponível:', erro.message);
        return NOTA_MINIMA_PADRAO_PENDENTES;
    }
}

/**
 * Converte o valor lido do materia.json em nota mínima válida.
 * @param {*} valor - Valor de avaliacao.nota_minima.
 * @returns {number} Nota entre 0 e 10; 7,0 quando o valor não serve.
 */
function normalizarNotaMinimaPendentes(valor) {
    const numero = Number(valor);
    const valida = Number.isFinite(numero) && numero > 0 && numero <= NOTA_MAXIMA_PENDENTES;
    return valida ? numero : NOTA_MINIMA_PADRAO_PENDENTES;
}

/**
 * Diz se a nota do aluno ficou abaixo da nota mínima da matéria.
 * Sem nota (entregou e ainda não corrigido) conta como abaixo do mínimo (#293.11).
 * @param {*} nota - Nota do aluno entre 0 e 10.
 * @param {number} [minima] - Nota mínima da matéria.
 * @returns {boolean} true se a nota está abaixo do mínimo ou não existe.
 */
function notaAbaixoDoMinimoPendentes(nota, minima = NOTA_MINIMA_PADRAO_PENDENTES) {
    if (nota === null || nota === undefined || nota === '') return true;
    const numero = Number(nota);
    if (!Number.isFinite(numero)) return true;
    return numero < normalizarNotaMinimaPendentes(minima);
}

/**
 * Lê o código da turma escolhida no combo "Turma:" do índice.
 * @returns {string} Código da turma ou '' quando não há turma escolhida ou lista na página.
 */
function obterTurmaPendentes() {
    const combo = document.querySelector(SELETOR_COMBO_TURMA_PENDENTES);
    return combo ? String(combo.value || '').trim() : '';
}

/**
 * Chama `aoMudar` quando a turma do índice muda (combo ou favorita) e uma vez agora.
 * Usa delegação de evento para funcionar mesmo se o combo for montado depois deste módulo.
 * @param {(turma: string) => void} aoMudar - Ação a refazer com o código da turma nova.
 */
function ouvirTrocaDeTurmaPendentes(aoMudar) {
    const avisar = () => aoMudar(obterTurmaPendentes());
    document.addEventListener('change', (evento) => {
        if (evento.target?.matches(SELETOR_COMBO_TURMA_PENDENTES)) avisar();
    });
    document.addEventListener(EVENTO_TURMA_INDICE_PENDENTES, avisar);
    document.addEventListener(EVENTO_FAVORITA_ALTERADA_PENDENTES, avisar);
    avisar();
}
// Contrato dos dados que a fonte da #293.5 entrega, por atividade da aula:
// { atividadeId, temQuestao, bloqueada, alunos: [{ alunoId, faltou, entregou,
//   aguardandoCorrecao, nota }] }.

/**
 * Diz se o aluno conta como pendente numa atividade (regra fechada na #293.4).
 * Falta (R15), atividade sem questão e entrega aguardando correção não contam.
 * @param {{faltou: boolean, entregou: boolean, aguardandoCorrecao: boolean, nota: *}} aluno
 * @param {number} [notaMinima] - Nota mínima da matéria.
 * @returns {boolean} true se o aluno está pendente.
 */
function alunoPendentePendentes(aluno, notaMinima = NOTA_MINIMA_PADRAO_PENDENTES) {
    if (!aluno || aluno.faltou) return false;
    if (!aluno.entregou) return true;
    if (aluno.aguardandoCorrecao) return false;
    return notaAbaixoDoMinimoPendentes(aluno.nota, notaMinima);
}

/**
 * Diz se a atividade tem pelo menos 1 aluno pendente na turma escolhida.
 * @param {{bloqueada: boolean, temQuestao: boolean, alunos: Object[]}} atividade
 * @param {number} [notaMinima] - Nota mínima da matéria.
 * @returns {boolean} true se a atividade está pendente.
 */
function atividadePendentePendentes(atividade, notaMinima = NOTA_MINIMA_PADRAO_PENDENTES) {
    if (!atividade || atividade.bloqueada || !atividade.temQuestao) return false;
    if (typeof atividade.pendentes === 'number') return atividade.pendentes > 0;
    return (atividade.alunos || []).some((aluno) => alunoPendentePendentes(aluno, notaMinima));
}

/**
 * Diz se o card (lista de atividades da aula) tem pendência na turma escolhida.
 * @param {Object[]} atividades - Atividades da aula vindas da fonte de dados.
 * @param {number} [notaMinima] - Nota mínima da matéria.
 * @returns {boolean} true se o card fica vermelho.
 */
function cardPendentePendentes(atividades, notaMinima = NOTA_MINIMA_PADRAO_PENDENTES) {
    const lista = atividades || [];
    return lista.some((atividade) => atividadePendentePendentes(atividade, notaMinima));
}

// Estados possíveis do card: pendente (vermelho piscando), concluído (verde fixo) ou '' (sem cor).
const ESTADO_CARD_PENDENTE = 'pendente';
const ESTADO_CARD_CONCLUIDO = 'concluido';

/**
 * Diz o estado do card pela lista de atividades da aula na turma escolhida (R11/R12/R14).
 * Verde só quando nenhuma atividade está pendente e nenhuma está bloqueada.
 * @param {Object[]} atividades - Atividades da aula vindas da fonte de dados.
 * @param {number} [notaMinima] - Nota mínima da matéria.
 * @returns {string} 'pendente', 'concluido' ou '' (sem cor).
 */
function estadoDoCardPendentes(atividades, notaMinima = NOTA_MINIMA_PADRAO_PENDENTES) {
    const lista = atividades || [];
    if (!lista.length) return '';
    const temPendente = lista.some((atividade) =>
        atividadePendentePendentes(atividade, notaMinima));
    if (temPendente) return ESTADO_CARD_PENDENTE;
    const temBloqueada = lista.some((atividade) => Boolean(atividade.bloqueada));
    return temBloqueada ? '' : ESTADO_CARD_CONCLUIDO;
}

// Cards do índice e classes do alerta.
const SELETOR_CARD_PENDENTES = 'article.aula[data-aula-id]';
const CLASSE_CARD_PENDENTE = 'card-atividade-pendente';
const CLASSE_CARD_CONCLUIDA = 'card-atividade-concluida';
const CLASSE_AVISO_OCULTO_PENDENTES = 'aviso-pendente-oculto';
const TEXTO_AVISO_PENDENTE = 'Há aluno com atividade pendente nesta turma.';
const TEXTO_AVISO_CONCLUIDA = 'Todas as atividades desta aula estão concluídas na turma.';
const EVENTO_CARDS_MONTADOS_PENDENTES = 'cards-aula-montados';
// Fonte da #293.5: RPC do banco, uma linha por atividade da turma (só professor; só contagens).
const ROTA_PENDENTES_TURMA = '/rest/v1/rpc/atividades_pendentes_turma';

/**
 * Lê da RPC atividades_pendentes_turma (#293.5) as atividades da turma com os pendentes.
 * Uma chamada por turma, com o JWT do professor (sbH); a nota mínima vai do materia.json.
 * @param {string} turma - Código da turma escolhida.
 * @param {number} notaMinima - Nota mínima da matéria.
 * @returns {Promise<Object[]>} Linhas da fonte.
 * @throws {Error} Se o banco recusar (tratado em recalcularPendentesDoIndicePendentes).
 */
async function buscarAtividadesDaTurmaPendentes(turma, notaMinima) {
    const resposta = await fetch(SUPABASE.URL + ROTA_PENDENTES_TURMA, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify({ p_turma: turma, p_nota_minima: notaMinima }),
    });
    const linhas = await resposta.json().catch(() => null);
    if (!resposta.ok) throw new Error(linhas?.message || 'erro ' + resposta.status);
    return Array.isArray(linhas) ? linhas : [];
}

/**
 * Agrupa as linhas da fonte por aula (id do card).
 * @param {Object[]} linhas - Linhas da fonte de dados.
 * @returns {Map<number, Object[]>} Atividades por aula.
 */
function agruparAtividadesPorAulaPendentes(linhas) {
    const porAula = new Map();
    (linhas || []).forEach((linha) => {
        const aulaId = Number(linha.aula_id);
        if (!Number.isFinite(aulaId)) return;
        if (!porAula.has(aulaId)) porAula.set(aulaId, []);
        porAula.get(aulaId).push({
            atividadeId: linha.atividade_id,
            temQuestao: linha.tem_questao !== false,
            bloqueada: Boolean(linha.bloqueada),
            pendentes: Number(linha.pendentes) || 0,
        });
    });
    return porAula;
}

/**
 * Tira o alerta do card.
 * @param {HTMLElement} card - Card da aula.
 */
function limparEstadoDoCardPendentes(card) {
    card.classList.remove(CLASSE_CARD_PENDENTE, CLASSE_CARD_CONCLUIDA);
    card.querySelector('.' + CLASSE_AVISO_OCULTO_PENDENTES)?.remove();
}

/**
 * Texto do aviso para leitor de tela conforme o estado do card.
 * @param {string} estado - 'pendente', 'concluido' ou '' (sem cor).
 * @returns {string} Texto do aviso ('' sem cor).
 */
function avisoDoEstadoPendentes(estado) {
    if (estado === ESTADO_CARD_PENDENTE) return TEXTO_AVISO_PENDENTE;
    if (estado === ESTADO_CARD_CONCLUIDO) return TEXTO_AVISO_CONCLUIDA;
    return '';
}

/**
 * Aplica o estado do card (classe do vermelho/verde) e o aviso para leitor de tela.
 * @param {HTMLElement} card - Card da aula.
 * @param {string} estado - 'pendente', 'concluido' ou '' (sem cor).
 */
function aplicarEstadoNoCardPendentes(card, estado) {
    limparEstadoDoCardPendentes(card);
    const aviso = avisoDoEstadoPendentes(estado);
    if (!aviso) return;
    if (estado === ESTADO_CARD_PENDENTE) card.classList.add(CLASSE_CARD_PENDENTE);
    if (estado === ESTADO_CARD_CONCLUIDO) card.classList.add(CLASSE_CARD_CONCLUIDA);
    const texto = document.createElement('span');
    texto.className = CLASSE_AVISO_OCULTO_PENDENTES;
    texto.textContent = aviso;
    card.append(texto);
}

/**
 * Refaz o alerta nos cards com a turma do combo e os dados da fonte.
 */
async function recalcularPendentesDoIndicePendentes() {
    const cards = [...document.querySelectorAll(SELETOR_CARD_PENDENTES)];
    if (!cards.length) return;
    const turma = obterTurmaPendentes();
    if (!turma) {
        cards.forEach((card) => limparEstadoDoCardPendentes(card));
        return;
    }
    try {
        const notaMinima = await carregarNotaMinimaPendentes();
        const linhas = await buscarAtividadesDaTurmaPendentes(turma, notaMinima);
        const porAula = agruparAtividadesPorAulaPendentes(linhas);
        cards.forEach((card) => {
            const atividades = porAula.get(Number(card.dataset.aulaId)) || [];
            aplicarEstadoNoCardPendentes(card, estadoDoCardPendentes(atividades, notaMinima));
        });
    } catch (erro) {
        console.warn('Alerta de atividades pendentes indisponível:', erro.message);
        cards.forEach((card) => limparEstadoDoCardPendentes(card));
    }
}

/**
 * Liga o alerta: recalcula quando a turma muda e quando a grade de cards é remontada.
 */
function iniciarPendentesNoIndicePendentes() {
    document.addEventListener(EVENTO_CARDS_MONTADOS_PENDENTES,
        recalcularPendentesDoIndicePendentes);
    ouvirTrocaDeTurmaPendentes(recalcularPendentesDoIndicePendentes);
}

iniciarPendentesNoIndicePendentes();
