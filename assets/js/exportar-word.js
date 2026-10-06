// Exportação em Word das páginas de atividade e avaliação, com o MESMO layout do PDF do
// assets/js/atividade.js: cabeçalho SENAI em tabela, quadro CAPACIDADES, uma tabela por questão
// (cabeçalho cinza, rótulos em negrito na mesma linha), gabarito (só nos botões do professor) e
// rodapé com "Página X de Y".
// Ao lado de CADA botão de PDF da .export-bar entra um botão "Exportar em Word" equivalente, com
// a mesma visibilidade (hidden e data-somente-perfil acompanham o botão de PDF).
// Depende de: atividade.js (dadosDaPaginaParaPDF, coletarQuestoes, turmaDoPDF, rotuloDaAula,
// lerLinhasCapacidadesPDF), documento-word.js e, nos botões de gabarito,
// avaliacao-pdf-professor.js (exportarPdfCompletoProfessor, exportarGabaritoPorPerfil).

const COR_SENAI_WORD = '#003399';
const COR_CINZA_CABECALHO_WORD = '#f0f0f0';
const COR_CINZA_QUESTAO_WORD = '#dcdcdc';
const COR_FAIXA_CAPACIDADES_WORD = '#1f3864';
const COR_GABARITO_WORD = '#764ba2';
const BORDA_WORD = '0.75pt solid #000000';
const TURMA_EM_BRANCO_WORD = '___________________';

/** Funções que os botões de gabarito (avaliacao-pdf-professor.js) usam para gerar o Word. */
const FORMATO_WORD_EXPORTACAO = {
    atividade: (gabarito) => exportarWordAtividade(gabarito),
    soGabarito: (gabarito, opcoes) => exportarSomenteGabaritoWord(gabarito, opcoes)
};

/**
 * Botões de Word espelhados dos botões de PDF da barra (id do PDF → id, rótulo e ação do Word).
 * Lista vazia: os botões "Exportar em Word", "(respostas)" e "(gabarito)" foram retirados a
 * pedido do usuário em 2026-10-06. Para voltar um botão, acrescentar o espelho aqui.
 */
const ESPELHOS_WORD = [];

/**
 * Monta uma célula de tabela no padrão do PDF (borda preta fina, fonte 10pt).
 * @param {string} conteudoHtml - Conteúdo já escapado.
 * @param {{estilo?: string, colunas?: number, largura?: string}} [opcoes] - Estilo extra,
 *     colspan e largura.
 * @returns {string} HTML da célula.
 */
function celulaWord(conteudoHtml, opcoes = {}) {
    const colunas = opcoes.colunas ? ` colspan="${opcoes.colunas}"` : '';
    const largura = opcoes.largura ? `width:${opcoes.largura};` : '';
    const estilo = `border:${BORDA_WORD};padding:4pt;font-size:10pt;vertical-align:top;` +
        largura + (opcoes.estilo || '');
    return `<td${colunas} style="${estilo}">${conteudoHtml || '&nbsp;'}</td>`;
}

/**
 * Envolve as linhas numa tabela de largura total, sem espaço entre as bordas.
 * @param {string[]} linhasHtml - Conteúdo de cada <tr>.
 * @returns {string} HTML da tabela seguido de um pequeno espaço.
 */
function tabelaWord(linhasHtml) {
    const linhas = linhasHtml.map((linha) => `<tr>${linha}</tr>`).join('');
    return '<table cellspacing="0" cellpadding="0" ' +
        `style="width:100%;border-collapse:collapse;font-family:${FONTE_WORD};">` +
        `${linhas}</table><p style="margin:0;font-size:6pt;">&nbsp;</p>`;
}

/**
 * Tabela do cabeçalho (igual à primeira tabela do PDF).
 * @param {Object} pagina - Dados da página (aula, tema, total, uc, docente).
 * @param {string} turma - Turma escolhida ou linha em branco.
 * @returns {string} HTML da tabela.
 */
function montarCabecalhoWord(pagina, turma) {
    const titulo = rotuloDaAula(pagina.aula) + ' — ' + pagina.tema.toUpperCase() +
        ' (' + pagina.total + ' ITENS)';
    const senai = 'SENAI<br>Serviço Nacional de Aprendizagem Industrial<br>Santa Catarina';
    const centro = 'font-weight:bold;text-align:center;';
    return tabelaWord([
        celulaWord(senai, { colunas: 2, largura: '90mm',
            estilo: `${centro}background:${COR_SENAI_WORD};color:#ffffff;` }) +
        celulaWord('ATIVIDADE AVALIATIVA', { largura: '60mm',
            estilo: `${centro}font-size:11pt;background:${COR_CINZA_CABECALHO_WORD};` }) +
        celulaWord('Desempenho', { largura: '30mm',
            estilo: `${centro}background:${COR_CINZA_CABECALHO_WORD};` }),
        celulaWord(escaparHtmlWord(titulo), { colunas: 4, estilo: 'font-weight:bold;' }),
        celulaWord('Data: ___/___/___') + celulaWord('') + celulaWord('') + celulaWord(''),
        celulaWord('Docente: ' + escaparHtmlWord(pagina.docente.toUpperCase()),
            { colunas: 2, estilo: 'font-weight:bold;' }) + celulaWord('') + celulaWord(''),
        celulaWord('Unidade Curricular: ' + escaparHtmlWord(pagina.uc), { colunas: 2 }) +
        celulaWord('Turma: ' + escaparHtmlWord(turma), { colunas: 2 }),
        celulaWord('Estudante: ___________________________________________________',
            { colunas: 4 })
    ]);
}

/**
 * Quadro "CAPACIDADES" do início da página (faixa azul + uma linha por capacidade).
 * @returns {string} HTML da tabela ou texto vazio quando a página não tem quadro.
 */
function montarCapacidadesWord() {
    const quadro = [...document.querySelectorAll('.quadro-capacidades')]
        .find((elemento) => !elemento.closest('.questao'));
    const linhas = lerLinhasCapacidadesPDF(quadro);
    if (!linhas.length) return '';

    const faixa = celulaWord('CAPACIDADES', { estilo: 'font-weight:bold;font-size:12pt;' +
        `background:${COR_FAIXA_CAPACIDADES_WORD};color:#ffffff;` });
    return tabelaWord([faixa, ...linhas.map((linha) => celulaWord(escaparHtmlWord(linha)))]);
}

/**
 * Tabela de uma questão: cabeçalho cinza e uma linha por bloco (rótulo em negrito).
 * @param {{cabecalho: string, linhas: Object[]}} questao - Questão lida por coletarQuestoes().
 * @returns {string} HTML da tabela.
 */
function montarQuestaoWord(questao) {
    const cabecalho = celulaWord(escaparHtmlWord(questao.cabecalho), {
        estilo: `font-weight:bold;font-size:11pt;background:${COR_CINZA_QUESTAO_WORD};` });
    const linhas = questao.linhas.map((linha) => {
        if (linha.rotulo) {
            return celulaWord(`<b>${escaparHtmlWord(linha.rotulo)}</b> ` +
                escaparHtmlWord(linha.texto));
        }
        return celulaWord(escaparHtmlWord(linha.texto),
            { estilo: linha.negrito ? 'font-weight:bold;' : '' });
    });
    return '<div style="page-break-inside:avoid;">' + tabelaWord([cabecalho, ...linhas]) + '</div>';
}

/**
 * Tabela do gabarito (Item | Questão | Resposta), cabeçalho roxo como no PDF.
 * @param {string[][]} linhas - Linhas [item, título, letra].
 * @param {string} [coluna] - Título da 3ª coluna.
 * @returns {string} HTML da tabela.
 */
function montarTabelaGabaritoWord(linhas, coluna = 'Resposta') {
    const topo = `font-weight:bold;background:${COR_GABARITO_WORD};color:#ffffff;font-size:9pt;`;
    const cabecalho = celulaWord('Item', { largura: '22mm', estilo: topo }) +
        celulaWord('Questão', { estilo: topo }) +
        celulaWord(escaparHtmlWord(coluna), { largura: '30mm', estilo: topo });
    const corpo = linhas.map(([item, titulo, letra]) =>
        celulaWord(escaparHtmlWord(item), { estilo: 'font-size:9pt;' }) +
        celulaWord(escaparHtmlWord(titulo), { estilo: 'font-size:9pt;' }) +
        celulaWord(escaparHtmlWord(letra), { estilo: 'font-size:9pt;font-weight:bold;' +
            'text-align:center;' }));
    return tabelaWord([cabecalho, ...corpo]);
}

/**
 * Título em negrito usado antes das tabelas de gabarito.
 * @param {string} texto - Título.
 * @param {string} [subtitulo] - Linha menor abaixo do título.
 * @returns {string} HTML do título.
 */
function montarTituloWord(texto, subtitulo = '') {
    const linhaMenor = subtitulo
        ? `<p style="margin:0 0 6pt 0;font-size:9pt;">${escaparHtmlWord(subtitulo)}</p>` : '';
    return `<p style="margin:0 0 4pt 0;font-size:12pt;font-weight:bold;">` +
        `${escaparHtmlWord(texto)}</p>${linhaMenor}`;
}

/**
 * Texto do rodapé e nome base do arquivo da página atual.
 * @param {Object} pagina - Dados da página.
 * @returns {{rotulo: string, rodape: string, base: string}} Textos prontos.
 */
function textosDaPaginaWord(pagina) {
    const rotulo = rotuloDaAula(pagina.aula);
    return {
        rotulo,
        rodape: rotulo + ' — ' + pagina.tema + ' · ' + pagina.ucCurta + ' · SENAI',
        base: rotulo.replace(/\s+/g, '-') + '-' + pagina.total + '-Questoes'
    };
}

/**
 * Exporta a atividade em Word com o mesmo layout do PDF.
 * @param {string[][]} [gabaritoExterno] - Gabarito real lido do banco (só professor); quando
 *     informado, o Word inclui o gabarito numa página própria, como o PDF.
 */
async function exportarWordAtividade(gabaritoExterno) {
    const turma = await turmaDoPDF();
    if (turma === null) return;

    const pagina = await dadosDaPaginaParaPDF();
    const textos = textosDaPaginaWord(pagina);
    const gabarito = gabaritoExterno
        ? '<br style="page-break-before:always" clear="all">' +
          montarTituloWord('GABARITO — USO DO PROFESSOR') + montarTabelaGabaritoWord(gabaritoExterno)
        : '';
    baixarDocumentoWord({
        titulo: textos.rotulo,
        corpoHtml: montarCabecalhoWord(pagina, turma) + montarCapacidadesWord() +
            coletarQuestoes().map(montarQuestaoWord).join('') + gabarito,
        rodape: textos.rodape,
        nomeArquivo: 'Atividade-' + textos.base + (gabaritoExterno ? '-COM-GABARITO' : '') + '.doc'
    });
}

/**
 * Exporta em Word só o gabarito (professor) ou as respostas do aluno, como o PDF equivalente.
 * @param {string[][]} gabarito - Linhas [item, título, letra].
 * @param {{titulo?: string, subtitulo?: string, coluna?: string, arquivo?: string}} [opcoes] -
 *     Textos do documento (padrão: gabarito real do professor).
 */
async function exportarSomenteGabaritoWord(gabarito, opcoes = {}) {
    const turma = await turmaDoPDF();
    if (turma === null) return;

    const pagina = await dadosDaPaginaParaPDF();
    const textos = textosDaPaginaWord(pagina);
    const textoTurma = turma === TURMA_EM_BRANCO_WORD ? '' : ' · Turma: ' + turma;
    const titulo = (opcoes.titulo || 'GABARITO') + ' — ' + textos.rotulo + ': ' + pagina.tema +
        ' (' + pagina.total + ' itens)';
    const subtitulo = pagina.uc + ' · Docente: ' + pagina.docente + textoTurma + ' · ' +
        (opcoes.subtitulo || 'USO DO PROFESSOR');
    baixarDocumentoWord({
        titulo: textos.rotulo,
        corpoHtml: montarTituloWord(titulo, subtitulo) +
            montarTabelaGabaritoWord(gabarito, opcoes.coluna),
        rodape: textos.rodape,
        nomeArquivo: (opcoes.arquivo || 'Gabarito') + '-' + textos.base + '.doc'
    });
}

/**
 * Faz o botão de Word acompanhar a visibilidade do botão de PDF (hidden muda depois do login).
 * @param {HTMLElement} botaoPdf - Botão de PDF original.
 * @param {HTMLElement} botaoWord - Botão de Word criado.
 */
function acompanharVisibilidadeWord(botaoPdf, botaoWord) {
    botaoWord.hidden = botaoPdf.hidden;
    new MutationObserver(() => { botaoWord.hidden = botaoPdf.hidden; })
        .observe(botaoPdf, { attributes: true, attributeFilter: ['hidden'] });
}

/**
 * Coloca, logo depois de cada botão de PDF da página, o botão de Word equivalente.
 */
function inserirBotoesWord() {
    ESPELHOS_WORD.forEach(({ idPdf, idWord, rotulo, acao }) => {
        const botaoPdf = document.getElementById(idPdf);
        if (!botaoPdf || document.getElementById(idWord)) return;

        const botao = document.createElement('button');
        botao.type = 'button';
        botao.id = idWord;
        botao.className = botaoPdf.className;
        botao.textContent = rotulo;
        if (botaoPdf.dataset.somentePerfil) botao.dataset.somentePerfil = botaoPdf.dataset.somentePerfil;
        botao.addEventListener('click', acao);
        acompanharVisibilidadeWord(botaoPdf, botao);
        botaoPdf.after(botao);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inserirBotoesWord);
} else {
    inserirBotoesWord();
}
