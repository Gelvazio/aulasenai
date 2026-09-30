// Botão "Exportar PDF com gabarito" das avaliações (só o professor vê o botão).
// O gabarito NÃO fica na página: é lido da tabela gabarito (RLS: só professor) na hora do clique
// e entregue ao exportador de assets/js/atividade.js.
// Depende de: atividade.js, respostas-atividade-banco.js (buscarAtividadeDaPagina) e js/supabase.js.

const ID_BOTAO_PDF_GABARITO = 'btnExportarPDFGabarito';
const ID_BOTAO_SO_GABARITO = 'btnExportarGabarito';
const MSG_ERRO_PDF_GABARITO = 'Não foi possível gerar o PDF com gabarito: ';
const MSG_SO_PROFESSOR_PDF = 'Somente o perfil PROFESSOR pode exportar o PDF com gabarito.';
const PERFIL_PROFESSOR_PDF = 'PROFESSOR';

/**
 * Avisa o professor de um erro (popup quando disponível).
 * @param {string} texto - Mensagem.
 */
async function avisarErroPdfGabarito(texto) {
    if (typeof window.mostrarPopup === 'function') {
        await mostrarPopup(texto, { tipo: 'erro' });
        return;
    }
    console.warn(texto);
}

/**
 * Indica se o usuário logado tem perfil PROFESSOR (perfil vem do app_metadata do Supabase Auth).
 * @returns {Promise<boolean>} true somente para professor logado.
 */
async function usuarioEhProfessorPdf() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    const { data } = await cliente.auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_PDF;
}

/**
 * Lê o gabarito da atividade desta página no banco.
 * @returns {Promise<string[][]>} Linhas [item, título, letra].
 * @throws {Error} Se a atividade não estiver cadastrada ou o gabarito vier vazio.
 */
async function lerGabaritoDoBanco() {
    const atividade = await buscarAtividadeDaPagina();
    if (!atividade) throw new Error('atividade não cadastrada no banco.');

    const linhas = await sbGet('gabarito',
        'select=item,titulo,letra&atividade_id=eq.' + atividade.id + '&order=item');
    if (!linhas.length) throw new Error('gabarito vazio (confira o login de professor).');

    return linhas.map((linha) =>
        ['ITEM ' + String(linha.item).padStart(2, '0'), linha.titulo, linha.letra]);
}

/**
 * Exporta pelo botão: confere o perfil, lê o gabarito do banco e chama o exportador.
 * @param {Function} exportador - Recebe as linhas do gabarito e gera o PDF.
 */
async function exportarComPerfilProfessor(exportador) {
    try {
        if (!(await usuarioEhProfessorPdf())) throw new Error(MSG_SO_PROFESSOR_PDF);

        exportador(await lerGabaritoDoBanco());
    } catch (erro) {
        await avisarErroPdfGabarito(erro.message === MSG_SO_PROFESSOR_PDF
            ? erro.message : MSG_ERRO_PDF_GABARITO + erro.message);
    }
}

document.getElementById(ID_BOTAO_PDF_GABARITO)?.addEventListener('click',
    () => exportarComPerfilProfessor(exportarPDFAtividade));
document.getElementById(ID_BOTAO_SO_GABARITO)?.addEventListener('click',
    () => exportarComPerfilProfessor(exportarSomenteGabaritoPDF));
