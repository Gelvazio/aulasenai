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
                linhas.push({ texto: rotulo + ': ' + textoPDF(box.querySelector('.content-text')?.textContent), negrito: false });
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

function exportarPDFAtividade() {
    const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDF) {
        alert('Erro: jsPDF não carregado (verifique a conexão com a internet).');
        return;
    }

    const pagina = dadosDaPagina();
    const questoes = coletarQuestoes();
    const incluirGabarito = document.getElementById('incluirGabarito')?.checked;
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
        [ { content: textoPDF('AULA ' + pagina.aula + ' — ' + pagina.tema.toUpperCase() + ' (' + pagina.total + ' ITENS)'), styles: { fontSize: 10, fontStyle: 'bold' }, colSpan: 4 } ],
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
    yPos = doc.lastAutoTable.finalY + 10;

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
        doc.text(textoPDF('Aula ' + pagina.aula + ' — ' + pagina.tema + ' · ' + pagina.ucCurta + ' · SENAI · Página ' + i + ' de ' + total), 105, 290, { align: 'center' });
    }

    doc.save('Atividade-Aula-' + pagina.aula + '-' + pagina.total + '-Questoes' + (incluirGabarito ? '-COM-GABARITO' : '') + '.pdf');
}

document.getElementById('btnExportarPDF')?.addEventListener('click', exportarPDFAtividade);
