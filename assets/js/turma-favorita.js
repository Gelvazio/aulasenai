// Turma favorita: lê e grava turma.favorito no Supabase (uma só turma favorita, definida pelo
// professor pela função definir_turma_favorita). Reutilizado pelo relatório das atividades e
// por scripts/criarUsuariosBancoDados.html, onde a turma favorita já vem selecionada.
// Depende de: js/supabase.js (sbGet, sbH, SUPABASE).

const ROTA_DEFINIR_FAVORITA = '/rest/v1/rpc/definir_turma_favorita';
const TEXTO_MARCAR_FAVORITA = '☆ Marcar como turma favorita';
const TEXTO_DESMARCAR_FAVORITA = '⭐ Turma favorita (clique para desmarcar)';
const MSG_ERRO_FAVORITA = 'Não foi possível definir a turma favorita: ';

/**
 * Busca o código da turma favorita.
 * @returns {Promise<string>} Código da turma favorita ou vazio (sem favorita ou sem acesso).
 */
async function buscarTurmaFavorita() {
    try {
        const linhas = await sbGet('turma', 'select=codigo&favorito=eq.true');
        return linhas[0]?.codigo || '';
    } catch (erro) {
        return '';
    }
}

/**
 * Define (ou limpa, com vazio) a turma favorita. Só o professor logado consegue.
 * @param {string} codigo - Código da turma ou vazio para desmarcar.
 * @throws {Error} Se o banco recusar.
 */
async function definirTurmaFavorita(codigo) {
    const resposta = await fetch(SUPABASE.URL + ROTA_DEFINIR_FAVORITA, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify({ p_codigo: codigo || null }),
    });
    if (resposta.ok) return;

    const erro = await resposta.json().catch(() => ({}));
    throw new Error(MSG_ERRO_FAVORITA + (erro.message || resposta.status));
}

/**
 * Cria o botão que marca/desmarca uma turma como favorita.
 * @param {string} classe - Classe CSS do botão.
 * @param {Function} aoClicar - Chamada ao clicar (async).
 * @returns {HTMLButtonElement} Botão pronto (texto definido por atualizarBotaoFavorita).
 */
function criarBotaoFavorita(classe, aoClicar) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = classe;
    botao.addEventListener('click', aoClicar);
    return botao;
}

/**
 * Atualiza o texto do botão conforme a turma ser ou não a favorita.
 * @param {HTMLButtonElement} botao - Botão da turma.
 * @param {boolean} ehFavorita - Se a turma do botão é a favorita.
 */
function atualizarBotaoFavorita(botao, ehFavorita) {
    botao.textContent = ehFavorita ? TEXTO_DESMARCAR_FAVORITA : TEXTO_MARCAR_FAVORITA;
}
