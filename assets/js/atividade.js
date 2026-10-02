// Exportação em PDF das páginas de atividade (genérico para todas as aulas).
// Dados de cada página: atributos data-aula, data-tema, data-total, data-uc,
// data-uc-curta e data-docente no <body>
// e o gabarito em <script type="application/json" id="gabarito-dados">.

function textoPDF(txt) {
    // A fonte padrão do jsPDF só aceita Latin-1/WinAnsi: troca símbolos e remove emojis
    return (txt || '')
        .replace(/→/g, '->').replace(/⇄/g, '<->').replace(/×/g, 'x').replace(/≥/g, '>=').replace(/≤/g, '<=')
        .replace(/[^\x00-\xFF—–“”‘’•…]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function dadosDaPagina() {
    const d = document.body.dataset;
    const gabaritoEl = document.getElementById('gabarito-dados');
    return {
        aula: d.aula || '',
        tema: d.tema || '',
        total: d.total || '',
        uc: d.uc || '',
        ucCurta: d.ucCurta || d.uc || '',
        docente: d.docente || '',
        gabarito: gabaritoEl ? JSON.parse(gabaritoEl.textContent) : []
    };
}

const COR_FAIXA_CAPACIDADES_PDF = [31, 56, 100];
const COR_TEXTO_FAIXA_CAPACIDADES_PDF = [255, 255, 255];

/**
 * Lê as linhas "C1 — texto" de um quadro de capacidades (assets/css/capacidades.css).
 * @param {Element|null} quadro - Elemento .quadro-capacidades ou null.
 * @returns {string[]} Linhas prontas para o PDF (vazia se não houver quadro).
 */
function lerLinhasCapacidadesPDF(quadro) {
    if (!quadro) return [];
    return [...quadro.querySelectorAll('.quadro-capacidades__linha')]
        .map((linha) => textoPDF(linha.textContent));
}

/**
 * Desenha no PDF o quadro "CAPACIDADES" do início da avaliação (faixa azul e uma linha por
 * capacidade), como na página. Sem quadro na página, não desenha nada.
 * @param {Object} doc - Documento jsPDF.
 * @param {number} yPos - Posição vertical atual.
 * @param {number} margin - Margem da página.
 * @returns {number} Nova posição vertical.
 */
function desenharCapacidadesPDF(doc, yPos, margin) {
    const quadro = [...document.querySelectorAll('.quadro-capacidades')]
        .find((elemento) => !elemento.closest('.questao'));
    const linhas = lerLinhasCapacidadesPDF(quadro);
    if (!linhas.length) return yPos;

    doc.autoTable({
        head: [['CAPACIDADES']],
        body: linhas.map((linha) => [linha]),
        startY: yPos,
        margin: margin,
        headStyles: { fillColor: COR_FAIXA_CAPACIDADES_PDF, textColor: COR_TEXTO_FAIXA_CAPACIDADES_PDF,
            fontStyle: 'bold', fontSize: 12 },
        styles: { fontSize: 10, cellPadding: 2.5, textColor: [0, 0, 0] }
    });
    return doc.lastAutoTable.finalY + 10;
}

function coletarQuestoes() {
    const questoes = [];
    document.querySelectorAll('.aula-card.questao').forEach(card => {
        const linhas = [];
        card.querySelectorAll('.content-box').forEach(box => {
            const rotulo = textoPDF(box.querySelector('.content-label')?.textContent);
            const itens = box.querySelectorAll('.alternativas li');
            if (itens.length) {
                linhas.push({ texto: rotulo + ':', negrito: true });
                itens.forEach(li => linhas.push({ texto: textoPDF(li.textContent), negrito: false }));
            } else {
                // Subtítulo (CAPACIDADE, CONTEXTO, COMANDO) em negrito e o texto normal, em linhas separadas
                linhas.push({ texto: rotulo + ':', negrito: true });
                linhas.push({ texto: textoPDF(box.querySelector('.content-text')?.textContent), negrito: false });
            }
        });
        questoes.push({
            cabecalho: textoPDF(card.querySelector('.aula-badge')?.textContent) + ' — ' +
                       textoPDF(card.querySelector('.aula-title')?.textContent),
            linhas: linhas
        });
    });
    return questoes;
}

/**
 * Rótulo da aula ou avaliação para o PDF ("AULA 05" ou "AVALIAÇÃO 01").
 * @param {string} aula - Valor de data-aula ("05" ou "AV-01").
 * @returns {string} Rótulo em maiúsculas.
 */
function rotuloDaAula(aula) {
    return /^AV-/.test(aula) ? 'AVALIAÇÃO ' + aula.slice(3) : 'AULA ' + aula;
}

/**
 * Exporta a atividade em PDF.
 * @param {string[][]} [gabaritoExterno] - Linhas [item, título, letra] vindas do banco (só
 *     professor); quando informado, o PDF inclui o gabarito.
 */
function exportarPDFAtividade(gabaritoExterno) {
    const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDF) {
        alert('Erro: jsPDF não carregado (verifique a conexão com a internet).');
        return;
    }

    const pagina = dadosDaPagina();
    const questoes = coletarQuestoes();
    if (gabaritoExterno) pagina.gabarito = gabaritoExterno;
    const incluirGabarito = Boolean(gabaritoExterno) || document.getElementById('incluirGabarito')?.checked;
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    let yPos = 20;

    const headerData = [
        [
            { content: 'SENAI\nServiço Nacional de Aprendizagem Industrial\nSanta Catarina',
              styles: { fontStyle: 'bold', fontSize: 10, halign: 'center', fillColor: [0, 51, 153], textColor: [255, 255, 255] }, colSpan: 2 },
            { content: 'ATIVIDADE AVALIATIVA', styles: { fontStyle: 'bold', fontSize: 11, halign: 'center', fillColor: [240, 240, 240] } },
            { content: 'Desempenho', styles: { fontStyle: 'bold', fontSize: 10, halign: 'center', fillColor: [240, 240, 240] } }
        ],
        [ { content: textoPDF(rotuloDaAula(pagina.aula) + ' — ' + pagina.tema.toUpperCase() + ' (' + pagina.total + ' ITENS)'), styles: { fontSize: 10, fontStyle: 'bold' }, colSpan: 4 } ],
        [ { content: 'Data: ___/___/___', styles: { fontSize: 10 } }, { content: '' }, { content: '' }, { content: '' } ],
        [ { content: 'Docente: ' + pagina.docente.toUpperCase(), styles: { fontSize: 10, fontStyle: 'bold' }, colSpan: 2 }, { content: '' }, { content: '' } ],
        [ { content: 'Unidade Curricular: ' + pagina.uc, styles: { fontSize: 10 }, colSpan: 2 },
          { content: 'Turma: ___________________', styles: { fontSize: 10 }, colSpan: 2 } ],
        [ { content: 'Estudante: ___________________________________________________', styles: { fontSize: 10 }, colSpan: 4 } ]
    ];

    doc.autoTable({
        body: headerData,
        startY: yPos,
        margin: margin,
        columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 60 }, 2: { cellWidth: 60 }, 3: { cellWidth: 30 } },
        styles: { fontSize: 10, cellPadding: 4, lineColor: [0, 0, 0], lineWidth: 0.1, textColor: [0, 0, 0] }
    });
    yPos = desenharCapacidadesPDF(doc, doc.lastAutoTable.finalY + 10, margin);

    questoes.forEach(q => {
        const tableData = [[{ content: q.cabecalho, styles: { fontStyle: 'bold', fontSize: 11, halign: 'left', fillColor: [220, 220, 220] } }]];
        q.linhas.forEach(l => {
            tableData.push([{ content: l.texto, styles: { fontSize: 10, halign: 'left', fontStyle: l.negrito ? 'bold' : 'normal' } }]);
        });
        doc.autoTable({
            body: tableData,
            startY: yPos,
            margin: margin,
            pageBreak: 'auto',
            rowPageBreak: 'avoid',
            styles: { fontSize: 10, cellPadding: 3, lineColor: [0, 0, 0], lineWidth: 0.1 }
        });
        yPos = doc.lastAutoTable.finalY + 6;
    });

    if (incluirGabarito) {
        doc.addPage();
        doc.autoTable({
            head: [['Item', 'Questão', 'Resposta']],
            body: pagina.gabarito.map(l => l.map(textoPDF)),
            startY: 20,
            margin: { top: 20, left: margin, right: margin },
            headStyles: { fillColor: [118, 75, 162], textColor: [255, 255, 255], fontStyle: 'bold' },
            columnStyles: { 0: { cellWidth: 22 }, 1: { cellWidth: 128 }, 2: { cellWidth: 30, fontStyle: 'bold', halign: 'center' } },
            styles: { fontSize: 9, cellPadding: 2.5, lineColor: [0, 0, 0], lineWidth: 0.1, valign: 'top' },
            didDrawPage: () => {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('GABARITO — USO DO PROFESSOR', margin, 14);
            }
        });
    }

    const total = doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(textoPDF(rotuloDaAula(pagina.aula) + ' — ' + pagina.tema + ' · ' + pagina.ucCurta + ' · SENAI · Página ' + i + ' de ' + total), 105, 290, { align: 'center' });
    }

    doc.save('Atividade-' + rotuloDaAula(pagina.aula).replace(/\s+/g, '-') + '-' + pagina.total + '-Questoes' + (incluirGabarito ? '-COM-GABARITO' : '') + '.pdf');
}

/**
 * Exporta um PDF só com o gabarito da atividade atual (uso do professor).
 * @param {string[][]} gabarito - Linhas [item, título, letra] vindas do banco.
 * @param {{titulo?: string, subtitulo?: string, coluna?: string, arquivo?: string}} [opcoes] -
 *     Textos do PDF: padrão é o gabarito real (professor); o aluno recebe as próprias respostas.
 */
function exportarSomenteGabaritoPDF(gabarito, opcoes = {}) {
    const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDF) {
        console.warn('jsPDF não carregado (verifique a conexão com a internet).');
        return;
    }

    const pagina = dadosDaPagina();
    const rotulo = rotuloDaAula(pagina.aula);
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.text(textoPDF((opcoes.titulo || 'GABARITO') + ' — ' + rotulo + ': ' + pagina.tema + ' (' + pagina.total + ' itens)'), 15, 16);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(textoPDF(pagina.uc + ' · Docente: ' + pagina.docente + ' · ' + (opcoes.subtitulo || 'USO DO PROFESSOR')), 15, 22);
    doc.autoTable({
        head: [['Item', 'Questão', opcoes.coluna || 'Resposta']],
        body: gabarito.map(l => l.map(textoPDF)),
        startY: 27,
        margin: { top: 20, left: 15, right: 15 },
        headStyles: { fillColor: [118, 75, 162], textColor: [255, 255, 255], fontStyle: 'bold' },
        columnStyles: { 0: { cellWidth: 22 }, 1: { cellWidth: 128 }, 2: { cellWidth: 30, fontStyle: 'bold', halign: 'center' } },
        styles: { fontSize: 9, cellPadding: 2.5, lineColor: [0, 0, 0], lineWidth: 0.1, valign: 'top' }
    });
    doc.save((opcoes.arquivo || 'Gabarito') + '-' + rotulo.replace(/\s+/g, '-') + '-' + pagina.total + '-Questoes.pdf');
}

document.getElementById('btnExportarPDF')?.addEventListener('click', () => exportarPDFAtividade());
