// Aluno, atividade OBJETIVA entregue e gabarito liberado pelo professor para a turma: cada questão
// mostra a alternativa que o aluno marcou com ✅ (acertou) ou ❌ (errou) e, nas erradas, a
// alternativa certa. Vale para todas as objetivas (carregado por assets/js/respostas-atividade.js).
// Antes de pedir o gabarito, confere a liberação com aluno_pode_ver_gabarito (não grava pedido);
// só então chama solicitar_gabarito. O gabarito nunca fica guardado na página.
// Regra: docs/regras/atividades.md

const ROTA_PODE_VER_GABARITO_ALUNO = '/rest/v1/rpc/aluno_pode_ver_gabarito';
const ROTA_GABARITO_CORRECAO_ALUNO = '/rest/v1/rpc/solicitar_gabarito';
const CLASSE_CORRECAO_ALUNO = 'correcao-objetiva';
const CLASSE_ALTERNATIVA_ACERTOU = 'alternativa--acertou';
const CLASSE_ALTERNATIVA_ERROU = 'alternativa--errou';
const CLASSE_ALTERNATIVA_CERTA = 'alternativa--certa';
const DIGITOS_ITEM_CORRECAO = 2;

/**
 * Chama uma função do banco (RPC) com o token do aluno logado.
 * @param {string} rota - Rota da RPC.
 * @param {Object} corpo - Parâmetros.
 * @returns {Promise<*>} Resposta em JSON.
 * @throws {Error} Se o banco recusar.
 */
async function chamarFuncaoCorrecaoAluno(rota, corpo) {
    const resposta = await fetch(SUPABASE.URL + rota, {
        method: 'POST', headers: await sbH(), body: JSON.stringify(corpo),
    });
    if (!resposta.ok) throw new Error(await resposta.text());
    return resposta.json();
}

/**
 * Lê o gabarito só se a turma do aluno já foi liberada (sem liberação, devolve vazio e o banco
 * não registra pedido de gabarito).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object<string, string>>} Mapa número do item ("01") → letra certa.
 */
async function lerGabaritoLiberadoAluno(atividadeId) {
    const corpo = { p_atividade: atividadeId };
    const podeVer = await chamarFuncaoCorrecaoAluno(ROTA_PODE_VER_GABARITO_ALUNO, corpo);
    if (podeVer !== true) return {};
    const linhas = await chamarFuncaoCorrecaoAluno(ROTA_GABARITO_CORRECAO_ALUNO, corpo);
    const certas = {};
    (linhas || []).forEach((linha) => {
        certas[String(linha.item).padStart(DIGITOS_ITEM_CORRECAO, '0')] = linha.letra;
    });
    return certas;
}

/**
 * Lê a letra (A–D) de uma alternativa pelo rótulo.
 * @param {HTMLElement} alternativa - Elemento <li> da alternativa.
 * @returns {string} Letra.
 */
function letraDaAlternativaCorrecao(alternativa) {
    return (alternativa.querySelector('.letra')?.textContent || '').replace(/\W/g, '');
}

/**
 * Monta o texto da correção da questão.
 * @param {string} marcada - Letra marcada pelo aluno (vazia = em branco).
 * @param {string} certa - Letra certa.
 * @returns {{acertou: boolean, texto: string}} Resultado da questão.
 */
function descreverCorrecaoAluno(marcada, certa) {
    if (marcada === certa) return { acertou: true, texto: '✅ Você acertou: ' + certa + ')' };
    const suaResposta = marcada ? 'Você marcou ' + marcada + ')' : 'Você deixou em branco';
    return { acertou: false, texto: '❌ ' + suaResposta + ' — a certa é ' + certa + ')' };
}

/**
 * Marca uma questão: alternativa do aluno (acertou/errou), a certa e o texto da correção.
 * @param {{numero: string, card: HTMLElement, alternativas: HTMLElement[]}} item - Questão.
 * @param {string} marcada - Letra marcada pelo aluno.
 * @param {string} certa - Letra certa.
 */
function marcarCorrecaoDaQuestao(item, marcada, certa) {
    const resultado = descreverCorrecaoAluno(marcada, certa);
    item.alternativas.forEach((alternativa) => {
        const letra = letraDaAlternativaCorrecao(alternativa);
        const ehMarcada = letra === marcada;
        alternativa.classList.toggle(CLASSE_ALTERNATIVA_ACERTOU, ehMarcada && resultado.acertou);
        alternativa.classList.toggle(CLASSE_ALTERNATIVA_ERROU, ehMarcada && !resultado.acertou);
        alternativa.classList.toggle(CLASSE_ALTERNATIVA_CERTA, letra === certa);
    });
    item.card.querySelector('.' + CLASSE_CORRECAO_ALUNO)?.remove();
    const modificador = resultado.acertou ? '--acertou' : '--errou';
    const aviso = document.createElement('div');
    aviso.className = CLASSE_CORRECAO_ALUNO + ' ' + CLASSE_CORRECAO_ALUNO + modificador;
    aviso.textContent = resultado.texto;
    item.card.appendChild(aviso);
}

/**
 * Mostra a correção em todas as questões, se o gabarito da turma já foi liberado.
 * @param {{atividadeId: number, respostas: Object<string, string>, itens: Object[]}} contexto -
 *     Atividade, respostas da última tentativa entregue e questões da página.
 */
async function mostrarCorrecaoObjetivaAluno(contexto) {
    const certas = await lerGabaritoLiberadoAluno(contexto.atividadeId);
    const respostas = contexto.respostas || {};
    contexto.itens.filter((item) => certas[item.numero]).forEach((item) =>
        marcarCorrecaoDaQuestao(item, respostas[item.numero] || '', certas[item.numero]));
}

window.mostrarCorrecaoObjetivaAluno = mostrarCorrecaoObjetivaAluno;
