// Card "Notas e média" do índice de atividades: cálculo puro (sem DOM, sem banco).
// A média é ponderada: Σ(nota × peso) ÷ Σ(peso), só das atividades marcadas para entrar na média,
// com nota lançada e peso maior que zero. Consumido por card-notas-media.js.

const TEXTO_SEM_NOTA_CARD = '—';
const CASAS_DECIMAIS_CARD = 1;

/**
 * Diz se um item entra na média ponderada.
 * @param {{nota: number|null, naMedia: boolean, peso: number}} item - Atividade do card.
 * @returns {boolean} true se tem nota, está marcada na média e tem peso positivo.
 */
function itemEntraNaMediaCard(item) {
    const temNota = item.nota !== null && item.nota !== undefined && !Number.isNaN(item.nota);
    const temPeso = Number(item.peso) > 0;
    return Boolean(item.naMedia) && temNota && temPeso;
}

/**
 * Calcula a média ponderada das notas.
 * @param {{nota: number|null, naMedia: boolean, peso: number}[]} itens - Atividades do card.
 * @returns {{media: number|null, quantidadeNaMedia: number, quantidadeTotal: number,
 *     somaPesos: number}} Média (null sem itens válidos) e contagens.
 */
function calcularMediaPonderada(itens) {
    const lista = Array.isArray(itens) ? itens : [];
    const validos = lista.filter(itemEntraNaMediaCard);
    const somaPesos = validos.reduce((soma, item) => soma + Number(item.peso), 0);
    const resultado = { media: null, quantidadeNaMedia: validos.length,
        quantidadeTotal: lista.length, somaPesos };
    if (!validos.length) return resultado;

    const somaPonderada = validos
        .reduce((soma, item) => soma + Number(item.nota) * Number(item.peso), 0);
    resultado.media = somaPonderada / somaPesos;
    return resultado;
}

/**
 * Formata uma nota com uma casa decimal e vírgula.
 * @param {number|null|undefined} valor - Nota a formatar.
 * @returns {string} Ex.: "8,5"; "—" quando não há nota.
 */
function formatarNotaCard(valor) {
    if (valor === null || valor === undefined || Number.isNaN(Number(valor))) {
        return TEXTO_SEM_NOTA_CARD;
    }
    return Number(valor).toFixed(CASAS_DECIMAIS_CARD).replace('.', ',');
}
