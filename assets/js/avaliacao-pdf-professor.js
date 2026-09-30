// Botões de exportação no final das avaliações (assets/js/atividade.js faz o PDF).
//  • "Exportar PDF com gabarito": só PROFESSOR; o gabarito real é lido do banco (RLS) no clique.
//  • "Exportar Gabarito": PROFESSOR recebe o gabarito real (só as alternativas certas); ALUNO
//    recebe as alternativas que ele marcou na tentativa de MAIOR NOTA (lidas do banco), sem
//    indicar quais estão certas. O gabarito real nunca fica na página.
// Depende de: atividade.js, respostas-atividade-banco.js (buscarAtividadeDaPagina,
// lerResultadoDaTentativa) e js/supabase.js.

const ID_BOTAO_PDF_GABARITO = 'btnExportarPDFGabarito';
const ID_BOTAO_SO_GABARITO = 'btnExportarGabarito';
const ID_BARRA_SO_GABARITO = 'barraExportarGabarito';
const MSG_ERRO_PDF_GABARITO = 'Não foi possível gerar o PDF: ';
const MSG_SO_PROFESSOR_PDF = 'Somente o perfil PROFESSOR pode exportar o PDF com gabarito.';
const MSG_SEM_LOGIN_PDF = 'Entre com o seu usuário para exportar.';
const MSG_SEM_ENTREGA_PDF = 'Você ainda não entregou esta atividade: não há tentativa com nota.';
const PERFIL_PROFESSOR_PDF = 'PROFESSOR';
const NOTA_MAXIMA_PDF = 10;

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

    return linhas.map((linha) =>
        ['ITEM ' + String(linha.item).padStart(2, '0'), linha.titulo, linha.letra]);
}

/**
 * Descobre a tentativa entregue de maior nota do aluno logado.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{tentativa: number, nota: number}>} Melhor tentativa entregue.
 * @throws {Error} Se nenhuma tentativa foi entregue.
 */
async function lerMelhorTentativa(atividadeId) {
    const entregas = await sbGet('entrega_atividade',
        'select=tentativa&atividade_id=eq.' + atividadeId);
    const notas = [];
    for (const entrega of entregas) {
        const resultado = await lerResultadoDaTentativa(atividadeId, entrega.tentativa);
        if (resultado) {
            notas.push({ tentativa: entrega.tentativa,
                nota: (resultado.acertos / resultado.total) * NOTA_MAXIMA_PDF });
        }
    }
    if (!notas.length) throw new Error(MSG_SEM_ENTREGA_PDF);

    return notas.sort((a, b) => b.nota - a.nota || b.tentativa - a.tentativa)[0];
}

/**
 * Lê as alternativas marcadas pelo aluno na tentativa de maior nota.
 * Os títulos das questões vêm da própria página (o gabarito não é lido).
 * @returns {Promise<{linhas: string[][], melhor: {tentativa: number, nota: number}}>} Respostas.
 */
async function lerRespostasDaMelhorTentativa() {
    const atividade = await buscarAtividadeDaPagina();
    if (!atividade) throw new Error('atividade não cadastrada no banco.');

    const melhor = await lerMelhorTentativa(atividade.id);
    const respostas = await sbGet('resposta_atividade', 'select=item,letra&atividade_id=eq.' +
        atividade.id + '&tentativa=eq.' + melhor.tentativa + '&order=item');
    const porItem = new Map(respostas.map((linha) => [Number(linha.item), linha.letra]));
    const linhas = [...document.querySelectorAll('.aula-card.questao')].map((card) => {
        const numero = Number((card.querySelector('.aula-badge')?.textContent.match(/\d+/) || [0])[0]);
        return ['ITEM ' + String(numero).padStart(2, '0'),
            card.querySelector('.aula-title')?.textContent.trim() || '', porItem.get(numero) || '—'];
    });
    return { linhas, melhor };
}

/**
 * Botão "Exportar PDF com gabarito" (só professor): atividade completa + gabarito real.
 */
async function exportarPdfCompletoProfessor() {
    try {
        if (!(await lerPerfilPdf()).ehProfessor) throw new Error(MSG_SO_PROFESSOR_PDF);

        exportarPDFAtividade(await lerGabaritoDoBanco());
    } catch (erro) {
        await avisarErroPdfGabarito(erro.message === MSG_SO_PROFESSOR_PDF
            ? erro.message : MSG_ERRO_PDF_GABARITO + erro.message);
    }
}

/**
 * Botão "Exportar Gabarito": professor recebe o gabarito real; aluno, as próprias respostas da
 * tentativa de maior nota.
 */
async function exportarGabaritoPorPerfil() {
    try {
        const perfil = await lerPerfilPdf();
        if (!perfil.logado) throw new Error(MSG_SEM_LOGIN_PDF);

        if (perfil.ehProfessor) {
            exportarSomenteGabaritoPDF(await lerGabaritoDoBanco());
            return;
        }
        const { linhas, melhor } = await lerRespostasDaMelhorTentativa();
        exportarSomenteGabaritoPDF(linhas, { titulo: 'MINHAS RESPOSTAS', coluna: 'Sua resposta',
            arquivo: 'Minhas-Respostas',
            subtitulo: 'Tentativa ' + melhor.tentativa + ' (maior nota: ' +
                melhor.nota.toFixed(1).replace('.', ',') + ')' });
    } catch (erro) {
        await avisarErroPdfGabarito(erro.message === MSG_SEM_LOGIN_PDF ||
            erro.message === MSG_SEM_ENTREGA_PDF ? erro.message : MSG_ERRO_PDF_GABARITO + erro.message);
    }
}

/**
 * Mostra a barra "Exportar Gabarito" para qualquer usuário logado (aluno ou professor).
 */
async function mostrarBarraGabaritoSeLogado() {
    const barra = document.getElementById(ID_BARRA_SO_GABARITO);
    if (!barra) return;

    const perfil = await lerPerfilPdf();
    if (perfil.logado) barra.hidden = false;
    const texto = barra.querySelector('small');
    if (texto && !perfil.ehProfessor) {
        texto.textContent = 'Gera um PDF com as alternativas que você marcou na tentativa de maior nota.';
    }
}

document.getElementById(ID_BOTAO_PDF_GABARITO)?.addEventListener('click', exportarPdfCompletoProfessor);
document.getElementById(ID_BOTAO_SO_GABARITO)?.addEventListener('click', exportarGabaritoPorPerfil);
mostrarBarraGabaritoSeLogado();
