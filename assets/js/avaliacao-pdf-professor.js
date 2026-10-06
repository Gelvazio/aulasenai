// Botões de exportação no final das avaliações (assets/js/atividade.js faz o PDF).
//  • Botão btnExportarPDFGabarito, só PROFESSOR: hoje só a variante data-modo="gabarito" (rótulo
//    "📥 Gabarito", PDF SOMENTE com o gabarito). O "Exportar PDF com gabarito" (atividade completa)
//    foi removido das páginas em 2026-10-06 a pedido do usuário.
//  • "Exportar Gabarito": PROFESSOR recebe o gabarito real (só as alternativas certas); ALUNO
//    recebe o gabarito real SÓ depois que o professor liberar para a turma dele (função
//    solicitar_gabarito do banco); antes disso vê "Aguarde professor liberar os gabaritos" e o
//    pedido fica gravado em tentativaacessogabarito. O gabarito real nunca fica na página.
// As funções recebem o formato (PDF por padrão; FORMATO_WORD_EXPORTACAO, hoje sem botão).
// Depende de: atividade.js, respostas-atividade-banco.js (buscarAtividadeDaPagina) e
// js/supabase.js (sbGet, sbH).

const ID_BOTAO_PDF_GABARITO = 'btnExportarPDFGabarito';
const ID_BOTAO_SO_GABARITO = 'btnExportarGabarito';
const MSG_ERRO_PDF_GABARITO = 'Não foi possível gerar o PDF: ';
const MSG_SO_PROFESSOR_PDF = 'Somente o perfil PROFESSOR pode exportar o PDF com gabarito.';
const MSG_SEM_LOGIN_PDF = 'Entre com o seu usuário para exportar.';
const MSG_AGUARDE_GABARITO = 'Aguarde professor liberar os gabaritos';
const ROTA_SOLICITAR_GABARITO = '/rest/v1/rpc/solicitar_gabarito';
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
 * Pede ao banco o gabarito liberado para o aluno logado (função solicitar_gabarito). Sem
 * liberação, o banco grava o pedido em tentativaacessogabarito e devolve lista vazia.
 * @returns {Promise<string[][]>} Linhas [item, título, letra] (vazio = ainda não liberado).
 * @throws {Error} Se a atividade não estiver cadastrada ou o banco recusar.
 */
async function solicitarGabaritoAluno() {
    const atividade = await buscarAtividadeDaPagina();
    if (!atividade) throw new Error('atividade não cadastrada no banco.');

    const resposta = await fetch(SUPABASE.URL + ROTA_SOLICITAR_GABARITO, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify({ p_atividade: atividade.id }),
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.message || 'erro ' + resposta.status);
    return formatarLinhasGabarito(dados);
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
 * Botão "Exportar Gabarito": professor recebe o gabarito real; aluno, o gabarito real só depois
 * da liberação pelo professor (antes, o aviso de aguardar).
 * @param {Object} [formato] - FORMATO_PDF_EXPORTACAO (padrão) ou FORMATO_WORD_EXPORTACAO.
 */
async function exportarGabaritoPorPerfil(formato = FORMATO_PDF_EXPORTACAO) {
    try {
        const perfil = await lerPerfilPdf();
        if (!perfil.logado) throw new Error(MSG_SEM_LOGIN_PDF);

        const gabarito = perfil.ehProfessor
            ? await lerGabaritoDoBanco() : await solicitarGabaritoAluno();
        if (gabarito.length) {
            formato.soGabarito(gabarito);
            return;
        }
        await avisarAguardeGabarito();
    } catch (erro) {
        await avisarErroPdfGabarito(erro.message === MSG_SEM_LOGIN_PDF
            ? erro.message : MSG_ERRO_PDF_GABARITO + erro.message);
    }
}

/**
 * Avisa o aluno de que o gabarito ainda não foi liberado (popup quando disponível).
 */
async function avisarAguardeGabarito() {
    if (typeof window.mostrarPopup === 'function') {
        await mostrarPopup(MSG_AGUARDE_GABARITO, { tipo: 'aviso', titulo: 'Gabarito' });
        return;
    }
    console.warn(MSG_AGUARDE_GABARITO);
}

/**
 * Mostra o botão "Exportar Gabarito" para qualquer usuário logado (aluno ou professor).
 */
async function mostrarBotaoGabaritoSeLogado() {
    const botao = document.getElementById(ID_BOTAO_SO_GABARITO);
    if (!botao) return;

    const perfil = await lerPerfilPdf();
    if (perfil.logado) botao.hidden = false;
}

document.getElementById(ID_BOTAO_PDF_GABARITO)
    ?.addEventListener('click', () => exportarPdfCompletoProfessor());
document.getElementById(ID_BOTAO_SO_GABARITO)
    ?.addEventListener('click', () => exportarGabaritoPorPerfil());
mostrarBotaoGabaritoSeLogado();
