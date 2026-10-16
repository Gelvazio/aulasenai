// Botões de exportação no final das avaliações (assets/js/atividade.js faz o PDF).
//  • Botão btnExportarPDFGabarito, só PROFESSOR: hoje só a variante data-modo="gabarito" (rótulo
//    "📥 Gabarito", PDF SOMENTE com o gabarito). O "Exportar PDF com gabarito" (atividade completa)
//    foi removido das páginas em 2026-10-06 a pedido do usuário.
//  • "🔑 Exportar Gabarito", só PROFESSOR (2026-10-15, #176): o botão só aparece e só funciona
//    para o perfil PROFESSOR, que recebe o gabarito real (só as alternativas certas). O aluno vê
//    a correção na própria página depois da liberação (assets/js/correcao-objetiva-aluno.js).
//    O gabarito real nunca fica na página.
// As funções recebem o formato (PDF por padrão; FORMATO_WORD_EXPORTACAO, hoje sem botão).
// Depende de: atividade.js, respostas-atividade-banco.js (buscarAtividadeDaPagina) e
// js/supabase.js (sbGet).

const ID_BOTAO_PDF_GABARITO = 'btnExportarPDFGabarito';
const ID_BOTAO_SO_GABARITO = 'btnExportarGabarito';
const MSG_ERRO_PDF_GABARITO = 'Não foi possível gerar o PDF: ';
const MSG_SO_PROFESSOR_PDF = 'Somente o perfil PROFESSOR pode exportar o PDF com gabarito.';
const MSG_SO_PROFESSOR_GABARITO = 'Somente o perfil PROFESSOR pode exportar o gabarito.';
const PERFIL_PROFESSOR_PDF = 'PROFESSOR';
const MODO_SO_GABARITO_PDF = 'gabarito';

/** Geradores do PDF (assets/js/atividade.js); o Word usa FORMATO_WORD_EXPORTACAO. */
const FORMATO_PDF_EXPORTACAO = {
    atividade: (gabarito) => exportarPDFAtividade(gabarito),
    soGabarito: (gabarito, opcoes) => exportarSomenteGabaritoPDF(gabarito, opcoes)
};

/**
 * Avisa o usuário de um erro (popup quando disponível).
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
 * Lê o usuário logado e o perfil (perfil vem do app_metadata do Supabase Auth).
 * @returns {Promise<{logado: boolean, ehProfessor: boolean}>} Situação do login.
 */
async function lerPerfilPdf() {
    const cliente = obterClienteSupabase();
    if (!cliente) return { logado: false, ehProfessor: false };

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    return { logado: Boolean(usuario),
        ehProfessor: usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_PDF };
}

/**
 * Lê o gabarito real (só professor) da atividade desta página.
 * @returns {Promise<string[][]>} Linhas [item, título, letra].
 * @throws {Error} Se a atividade não estiver cadastrada ou o gabarito vier vazio.
 */
async function lerGabaritoDoBanco() {
    const atividade = await buscarAtividadeDaPagina();
    if (!atividade) throw new Error('atividade não cadastrada no banco.');

    const linhas = await sbGet('gabarito',
        'select=item,titulo,letra&atividade_id=eq.' + atividade.id + '&order=item');
    if (!linhas.length) throw new Error('gabarito vazio (confira o login de professor).');

    return formatarLinhasGabarito(linhas);
}

/**
 * Converte as linhas do gabarito do banco no formato do PDF.
 * @param {{item: number, titulo: string, letra: string}[]} linhas - Linhas do banco.
 * @returns {string[][]} Linhas [item, título, letra].
 */
function formatarLinhasGabarito(linhas) {
    return linhas.map((linha) =>
        ['ITEM ' + String(linha.item).padStart(2, '0'), linha.titulo, linha.letra]);
}

/**
 * Botão "Exportar PDF com gabarito" (só professor): atividade completa + gabarito real; no modo
 * "gabarito" (data-modo do botão), só o gabarito.
 * @param {Object} [formato] - FORMATO_PDF_EXPORTACAO (padrão) ou FORMATO_WORD_EXPORTACAO.
 */
async function exportarPdfCompletoProfessor(formato = FORMATO_PDF_EXPORTACAO) {
    try {
        if (!(await lerPerfilPdf()).ehProfessor) throw new Error(MSG_SO_PROFESSOR_PDF);

        const gabarito = await lerGabaritoDoBanco();
        const botao = document.getElementById(ID_BOTAO_PDF_GABARITO);
        if (botao?.dataset.modo === MODO_SO_GABARITO_PDF) {
            formato.soGabarito(gabarito);
            return;
        }
        formato.atividade(gabarito);
    } catch (erro) {
        await avisarErroPdfGabarito(erro.message === MSG_SO_PROFESSOR_PDF
            ? erro.message : MSG_ERRO_PDF_GABARITO + erro.message);
    }
}

/**
 * Botão "Exportar Gabarito" (só professor): exporta somente o gabarito real da atividade.
 * @param {Object} [formato] - FORMATO_PDF_EXPORTACAO (padrão) ou FORMATO_WORD_EXPORTACAO.
 */
async function exportarGabaritoProfessor(formato = FORMATO_PDF_EXPORTACAO) {
    try {
        if (!(await lerPerfilPdf()).ehProfessor) throw new Error(MSG_SO_PROFESSOR_GABARITO);

        formato.soGabarito(await lerGabaritoDoBanco());
    } catch (erro) {
        await avisarErroPdfGabarito(erro.message === MSG_SO_PROFESSOR_GABARITO
            ? erro.message : MSG_ERRO_PDF_GABARITO + erro.message);
    }
}

/**
 * Mostra o botão "Exportar Gabarito" só para o perfil PROFESSOR (aluno e visitante não o veem).
 */
async function mostrarBotaoGabaritoSeProfessor() {
    const botao = document.getElementById(ID_BOTAO_SO_GABARITO);
    if (!botao) return;

    const perfil = await lerPerfilPdf();
    if (perfil.ehProfessor) botao.hidden = false;
}

document.getElementById(ID_BOTAO_PDF_GABARITO)
    ?.addEventListener('click', () => exportarPdfCompletoProfessor());
document.getElementById(ID_BOTAO_SO_GABARITO)
    ?.addEventListener('click', () => exportarGabaritoProfessor());
mostrarBotaoGabaritoSeProfessor();
