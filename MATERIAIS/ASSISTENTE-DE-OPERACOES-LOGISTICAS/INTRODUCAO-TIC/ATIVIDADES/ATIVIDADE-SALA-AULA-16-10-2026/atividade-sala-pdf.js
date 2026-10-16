/**
 * PDF da atividade de sala avulsa (16/10/2026): cabeçalho SENAI, uma tabela por questão com
 * as respostas do aluno e "Página N de T" no rodapé. Usa jsPDF + jsPDF-AutoTable.
 */

const PDF_MARGEM = 15;
const PDF_ESPACO_ENTRE_TABELAS = 6;
const PDF_LARGURA_ROTULO = 50;
const PDF_COR_SENAI = [0, 51, 153];
const PDF_COR_BRANCA = [255, 255, 255];
const PDF_COR_CINZA = [240, 240, 240];
const PDF_COR_TITULO_QUESTAO = [220, 220, 220];
const PDF_COR_PRETA = [0, 0, 0];
const PDF_TITULO = 'ATIVIDADE DE SALA - COMUNICAÇÃO DIGITAL E COLABORAÇÃO EM NUVEM';
const PDF_INSTITUICAO = 'SENAI\nServiço Nacional de Aprendizagem Industrial\nSanta Catarina';
const PDF_CURSO = 'Curso: Assistente de Operações Logísticas';
const PDF_UNIDADE = 'Unidade Curricular: Introdução à TIC - Aula 4';
const PDF_DOCENTE = 'Docente: GELVAZIO CAMARGO';
const PDF_SEM_RESPOSTA = '(sem resposta)';
const PDF_PREFIXO_ARQUIVO = 'Atividade-Sala-16-10-2026';
const PDF_TAMANHO_RODAPE = 9;
const PDF_ESTILO_TABELA = {
    fontSize: 10,
    cellPadding: 3,
    lineColor: PDF_COR_PRETA,
    lineWidth: 0.1,
    textColor: PDF_COR_PRETA,
};

/**
 * Monta as linhas do cabeçalho SENAI com a identificação do aluno.
 * @param {{estudante: string, turma: string, data: string}} identificacao - Dados do aluno.
 * @returns {Array<Array<Object>>} Linhas no formato do AutoTable.
 */
function montarLinhasCabecalho(identificacao) {
    const estiloInstituicao = {
        fontStyle: 'bold', halign: 'center', valign: 'middle',
        fillColor: PDF_COR_SENAI, textColor: PDF_COR_BRANCA,
    };
    const estiloTitulo = {
        fontStyle: 'bold', halign: 'center', valign: 'middle', fillColor: PDF_COR_CINZA,
    };
    return [
        [
            { content: PDF_INSTITUICAO, styles: estiloInstituicao },
            { content: PDF_TITULO, styles: estiloTitulo, colSpan: 2 },
            { content: 'Desempenho', styles: { ...estiloTitulo, valign: 'top' } },
        ],
        [{ content: PDF_CURSO, colSpan: 2 }, { content: PDF_UNIDADE, colSpan: 2 }],
        [
            { content: PDF_DOCENTE, styles: { fontStyle: 'bold' }, colSpan: 2 },
            { content: 'Data: ' + identificacao.data, colSpan: 2 },
        ],
        [
            { content: 'Estudante: ' + identificacao.estudante, colSpan: 3 },
            { content: 'Turma: ' + identificacao.turma },
        ],
    ];
}

/**
 * Desenha o cabeçalho na primeira página.
 * @param {Object} documento - Instância do jsPDF.
 * @param {{estudante: string, turma: string, data: string}} identificacao - Dados do aluno.
 * @returns {number} Posição Y logo abaixo do cabeçalho.
 */
function desenharCabecalho(documento, identificacao) {
    documento.autoTable({
        body: montarLinhasCabecalho(identificacao),
        startY: PDF_MARGEM,
        margin: PDF_MARGEM,
        columnStyles: { 0: { cellWidth: 50 }, 3: { cellWidth: 35 } },
        styles: PDF_ESTILO_TABELA,
    });
    return documento.lastAutoTable.finalY + PDF_ESPACO_ENTRE_TABELAS + 2;
}

/**
 * Monta as linhas de uma questão: título, enunciado e uma linha por resposta.
 * @param {{titulo: string, enunciado: string, respostas: Array<{rotulo: string, valor: string}>}}
 *   questao - Questão coletada da página.
 * @returns {Array<Array<Object>>} Linhas no formato do AutoTable.
 */
function montarLinhasQuestao(questao) {
    const linhas = [
        [{
            content: questao.titulo, colSpan: 2,
            styles: { fontStyle: 'bold', halign: 'center', fillColor: PDF_COR_TITULO_QUESTAO },
        }],
        [{ content: questao.enunciado, colSpan: 2 }],
    ];
    questao.respostas.forEach((resposta) => {
        linhas.push([
            { content: resposta.rotulo, styles: { fontStyle: 'bold' } },
            { content: resposta.valor || PDF_SEM_RESPOSTA },
        ]);
    });
    return linhas;
}

/**
 * Desenha uma questão a partir da posição informada (quebra de página automática).
 * @param {Object} documento - Instância do jsPDF.
 * @param {Object} questao - Questão coletada da página.
 * @param {number} posicaoY - Posição Y inicial.
 * @returns {number} Posição Y logo abaixo da questão.
 */
function desenharQuestao(documento, questao, posicaoY) {
    documento.autoTable({
        body: montarLinhasQuestao(questao),
        startY: posicaoY,
        margin: PDF_MARGEM,
        pageBreak: 'auto',
        rowPageBreak: 'avoid',
        columnStyles: { 0: { cellWidth: PDF_LARGURA_ROTULO } },
        styles: PDF_ESTILO_TABELA,
    });
    return documento.lastAutoTable.finalY + PDF_ESPACO_ENTRE_TABELAS;
}

/**
 * Escreve "Página N de T" no rodapé de todas as folhas.
 * @param {Object} documento - Instância do jsPDF.
 * @returns {void}
 */
function numerarPaginas(documento) {
    const totalPaginas = documento.internal.getNumberOfPages();
    const largura = documento.internal.pageSize.getWidth();
    const altura = documento.internal.pageSize.getHeight();
    documento.setFontSize(PDF_TAMANHO_RODAPE);
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
        documento.setPage(pagina);
        const texto = 'Página ' + pagina + ' de ' + totalPaginas;
        documento.text(texto, largura / 2, altura - PDF_MARGEM / 2, { align: 'center' });
    }
}

/**
 * Gera o nome do arquivo com o nome do aluno, sem acentos nem espaços.
 * @param {string} estudante - Nome do aluno.
 * @returns {string} Nome do arquivo PDF.
 */
function gerarNomeArquivo(estudante) {
    const nomeLimpo = estudante
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^A-Za-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    return PDF_PREFIXO_ARQUIVO + '-' + nomeLimpo + '.pdf';
}

/**
 * Gera e baixa o PDF da atividade.
 * @param {{identificacao: Object, questoes: Array<Object>, construtorPdf: Function}} dados -
 *   Identificação do aluno, questões coletadas e o construtor do jsPDF (injetado).
 * @returns {void}
 */
function gerarPdfAtividade({ identificacao, questoes, construtorPdf }) {
    const documento = new construtorPdf('p', 'mm', 'a4');
    let posicaoY = desenharCabecalho(documento, identificacao);
    questoes.forEach((questao) => {
        posicaoY = desenharQuestao(documento, questao, posicaoY);
    });
    numerarPaginas(documento);
    documento.save(gerarNomeArquivo(identificacao.estudante));
}

window.gerarPdfAtividade = gerarPdfAtividade;
