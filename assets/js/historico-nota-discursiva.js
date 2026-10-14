// Professor e aluno: botão "🕒 Histórico" da alternativa da avaliação discursiva. Abre o modal
// "Histórico" com a linha do tempo dos eventos da nota (confirmação e cada mudança, com data e
// hora, a mudança "Meia certa → Certa", a justificativa e quem fez — sempre "Professor").
// Lê a tabela correcao_discursiva_historico (o RLS deixa o professor ver os alunos das turmas dele
// e o aluno ver só os dele, depois de entregar e do gabarito liberado). Só leitura.
// Depende de js/supabase.js (sbGet) e assets/js/modal-nota-discursiva.js.
// Regra: docs/regras/atividades.md

const TABELA_HISTORICO_NOTA = 'correcao_discursiva_historico';
const TITULO_MODAL_HISTORICO = 'Histórico';
const TEXTO_BOTAO_HISTORICO = '🕒 Histórico';
const AUTOR_HISTORICO_NOTA = 'Professor';
const TOLERANCIA_HISTORICO_NOTA = 0.001;
const ROTULOS_NOTA_HISTORICO = {
    certa: '✅ Certa',
    meia: '🟡 Meia certa',
    errada: '❌ Errada',
};

/**
 * Classifica uma nota pelos pontos da alternativa.
 * @param {number} nota - Nota dada.
 * @param {number} pontos - Pontos da alternativa.
 * @returns {string} Rótulo "✅ Certa", "🟡 Meia certa" ou "❌ Errada".
 */
function rotuloDaNotaHistorico(nota, pontos) {
    if (Number(nota) >= Number(pontos) - TOLERANCIA_HISTORICO_NOTA) {
        return ROTULOS_NOTA_HISTORICO.certa;
    }
    if (Number(nota) > 0) return ROTULOS_NOTA_HISTORICO.meia;
    return ROTULOS_NOTA_HISTORICO.errada;
}

/**
 * Formata data e hora do evento como "dd/mm/aaaa hh:mm".
 * @param {string} dataIso - Data ISO.
 * @returns {string} Data e hora formatadas.
 */
function formatarDataHoraHistorico(dataIso) {
    return new Date(dataIso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit',
        year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/**
 * Monta a filtragem da consulta de uma alternativa.
 * @param {{atividade_id: number, item: number, topico: number, aluno_id?: string,
 *     tentativa?: number}} alternativa - Alternativa (aluno e tentativa são opcionais).
 * @returns {string} Filtro para o sbGet.
 */
function filtroDaAlternativaHistorico(alternativa) {
    const partes = ['atividade_id=eq.' + alternativa.atividade_id,
        'item=eq.' + alternativa.item, 'topico=eq.' + alternativa.topico];
    if (alternativa.aluno_id) partes.push('aluno_id=eq.' + alternativa.aluno_id);
    if (alternativa.tentativa) partes.push('tentativa=eq.' + alternativa.tentativa);
    return partes.join('&');
}

/**
 * Lê os eventos de uma alternativa, do mais antigo ao mais novo.
 * @param {Object} alternativa - Alternativa (ver filtroDaAlternativaHistorico).
 * @returns {Promise<Object[]>} Eventos {tipo, nota_anterior, nota_nova, justificativa, feito_em}.
 * @throws {Error} Se o banco recusar.
 */
function lerEventosDoHistorico(alternativa) {
    return sbGet(TABELA_HISTORICO_NOTA, 'select=tipo,nota_anterior,nota_nova,justificativa,' +
        'feito_em&' + filtroDaAlternativaHistorico(alternativa) + '&order=feito_em.asc,id.asc');
}

/**
 * Lê quais alternativas do aluno já têm eventos (para habilitar o botão "Histórico").
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Set<string>>} Chaves "item|topico" com pelo menos um evento.
 * @throws {Error} Se o banco recusar.
 */
async function lerAlternativasComHistorico(aluno, atividadeId) {
    const linhas = await sbGet(TABELA_HISTORICO_NOTA, 'select=item,topico&atividade_id=eq.' +
        atividadeId + '&aluno_id=eq.' + aluno.alunoId + '&tentativa=eq.' + aluno.tentativa);
    return new Set(linhas.map((linha) => linha.item + '|' + linha.topico));
}

/**
 * Monta o cartão de um evento da linha do tempo.
 * @param {Object} evento - Evento lido do banco.
 * @param {number} pontos - Pontos da alternativa.
 * @returns {HTMLElement} Item da linha do tempo.
 */
function montarEventoDoHistorico(evento, pontos) {
    const cria = window.criarElementoModalNota;
    const item = cria('li', 'historico-nota__evento');
    item.appendChild(cria('time', 'historico-nota__quando',
        formatarDataHoraHistorico(evento.feito_em)));
    item.appendChild(cria('span', 'historico-nota__marcador'));
    const cartao = cria('div', 'historico-nota__cartao');
    const nova = rotuloDaNotaHistorico(evento.nota_nova, pontos);
    const titulo = evento.tipo === 'mudanca'
        ? rotuloDaNotaHistorico(evento.nota_anterior, pontos) + '  →  ' + nova
        : 'Nota confirmada: ' + nova;
    cartao.appendChild(cria('strong', 'historico-nota__titulo', titulo));
    if (evento.justificativa) {
        cartao.appendChild(cria('p', 'historico-nota__justificativa',
            'Motivo: ' + evento.justificativa));
    }
    cartao.appendChild(cria('span', 'historico-nota__autor', 'Por: ' + AUTOR_HISTORICO_NOTA));
    item.appendChild(cartao);
    return item;
}

/**
 * Abre o modal "Histórico" com a linha do tempo da alternativa.
 * @param {Object} alternativa - Alternativa (ver filtroDaAlternativaHistorico).
 * @param {number} pontos - Pontos da alternativa (para dizer certa, meia certa ou errada).
 */
async function abrirHistoricoNota(alternativa, pontos) {
    const modal = window.abrirModalNota({ titulo: TITULO_MODAL_HISTORICO });
    const cria = window.criarElementoModalNota;
    modal.corpo.appendChild(cria('p', 'modal-nota__aviso', 'Carregando...'));
    try {
        const eventos = await lerEventosDoHistorico(alternativa);
        const linha = cria('ol', 'historico-nota__linha');
        eventos.forEach((evento) => linha.appendChild(montarEventoDoHistorico(evento, pontos)));
        modal.corpo.replaceChildren(eventos.length ? linha
            : cria('p', 'modal-nota__aviso', 'Ainda não há eventos nesta alternativa.'));
    } catch (erro) {
        modal.corpo.replaceChildren(cria('p', 'modal-nota__erro',
            'Não foi possível carregar o histórico: ' + erro.message));
    }
}

/**
 * Cria o botão "🕒 Histórico" da alternativa (desabilitado enquanto não houver eventos).
 * @param {{alternativa: Object, pontos: number, temEventos: boolean}} dados - Alternativa, pontos
 *     e se já existem eventos.
 * @returns {HTMLButtonElement} Botão pronto (o chamador o habilita quando surgir o 1º evento).
 */
function criarBotaoHistoricoNota(dados) {
    const botao = window.criarElementoModalNota('button', 'historico-nota__botao',
        TEXTO_BOTAO_HISTORICO);
    botao.type = 'button';
    botao.disabled = !dados.temEventos;
    botao.title = 'Linha do tempo das mudanças da nota desta alternativa';
    botao.addEventListener('click', () => abrirHistoricoNota(dados.alternativa, dados.pontos));
    return botao;
}

window.rotuloDaNotaHistorico = rotuloDaNotaHistorico;
window.criarBotaoHistoricoNota = criarBotaoHistoricoNota;
window.lerAlternativasComHistorico = lerAlternativasComHistorico;
