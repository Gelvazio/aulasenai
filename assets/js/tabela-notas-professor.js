// Tabela "Notas dos alunos" (só PROFESSOR) dentro da página da atividade: nome do aluno e nota,
// em ordem alfabética, da turma escolhida nas abas do relatório do professor, com o botão
// "📥 Exportar PDF (notas)" ao lado do título. Ligada pela página com
// <body data-tabela-notas="sim">. Carregada por respostas-atividade-professor.js, que entrega
// as linhas do resumo (função resumo_tentativas_atividade) e avisa a troca de turma pelo evento
// EVENTO_TURMA_RELATORIO. Nota = melhor tentativa entregue; nada é gravado no banco nem no
// navegador. Depende de criarElemento, calcularNota, formatarNota e mostrarPopup.

const CLASSE_TABELA_NOTAS = 'tabela-notas-professor';
const EVENTO_TURMA_RELATORIO = 'relatorio-professor:turma';
const COLUNAS_TABELA_NOTAS = ['Nº', 'Aluno', 'Nota'];
const TEXTO_SEM_NOTA = '—';
const TITULO_TABELA_NOTAS = 'Notas dos alunos';
const MSG_SEM_ALUNOS_NOTAS = 'Nenhum aluno nesta turma.';
const MSG_PDF_INDISPONIVEL_NOTAS = 'Não foi possível gerar o PDF: biblioteca de PDF não carregada.';
const COR_CABECALHO_PDF_NOTAS = [0, 67, 132];
const MARGEM_PDF_NOTAS = 15;

const estadoTabelaNotas = { linhas: [], turmas: [], turma: null, bloco: null };

/**
 * Agrupa as linhas do resumo por aluno, com a maior nota entregue. Turma vazia ("Todas as
 * turmas" do Quadro de Progresso, #399) = todos os alunos.
 * @param {Object[]} linhas - Linhas do resumo (uma por aluno e tentativa).
 * @param {string|null} turma - Código da turma escolhida, ou vazio para todas.
 * @returns {{nome: string, nota: number|null}[]} Alunos da turma em ordem alfabética.
 */
function listarNotasDaTurma(linhas, turma) {
    const alunos = new Map();
    linhas.filter((linha) => !turma || (linha.turma_codigo || '') === turma).forEach((linha) => {
        const aluno = alunos.get(linha.aluno_id) || { nome: linha.nome || '', nota: null };
        const temNota = linha.entregue_em && linha.total;
        if (temNota) {
            const nota = calcularNota({ acertos: linha.acertos, total: linha.total,
                questoesNota: linha.questoesNota });
            aluno.nota = aluno.nota === null ? nota : Math.max(aluno.nota, nota);
        }
        alunos.set(linha.aluno_id, aluno);
    });
    return Array.from(alunos.values())
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));
}

/**
 * Converte os alunos em linhas de texto (Nº, nome, nota formatada).
 * @param {{nome: string, nota: number|null}[]} alunos - Alunos em ordem alfabética.
 * @returns {string[][]} Linhas prontas para a tela e para o PDF.
 */
function montarLinhasTextoNotas(alunos) {
    return alunos.map((aluno, indice) => [String(indice + 1), aluno.nome,
        aluno.nota === null ? TEXTO_SEM_NOTA : formatarNota(aluno.nota)]);
}

/**
 * Devolve o nome da turma escolhida (ou o código, se não houver nome).
 * @returns {string} Nome da turma.
 */
function obterNomeTurmaNotas() {
    if (!estadoTabelaNotas.turma) return 'Todas as turmas';
    const turma = estadoTabelaNotas.turmas.find((item) => item.codigo === estadoTabelaNotas.turma);
    return turma ? turma.nome : estadoTabelaNotas.turma;
}

/**
 * Monta a tabela HTML das notas.
 * @param {string[][]} linhasTexto - Linhas (Nº, aluno, nota).
 * @returns {HTMLTableElement} Tabela pronta.
 */
function criarTabelaHtmlNotas(linhasTexto) {
    const tabela = criarElemento('table', CLASSE_TABELA_NOTAS + '__tabela');
    const cabecalho = tabela.createTHead().insertRow();
    COLUNAS_TABELA_NOTAS.forEach((coluna) => {
        cabecalho.appendChild(criarElemento('th', '', coluna));
    });
    const corpo = tabela.createTBody();
    linhasTexto.forEach((valores) => {
        const linha = corpo.insertRow();
        valores.forEach((valor) => linha.appendChild(criarElemento('td', '', valor)));
    });
    return tabela;
}

/**
 * Redesenha a tabela conforme a turma escolhida.
 */
function atualizarTabelaNotas() {
    const area = estadoTabelaNotas.bloco?.querySelector('.' + CLASSE_TABELA_NOTAS + '__area');
    if (!area) return;
    const linhasTexto = montarLinhasTextoNotas(
        listarNotasDaTurma(estadoTabelaNotas.linhas, estadoTabelaNotas.turma));
    estadoTabelaNotas.bloco.querySelector('.' + CLASSE_TABELA_NOTAS + '__turma').textContent =
        'Turma: ' + obterNomeTurmaNotas();
    area.replaceChildren(linhasTexto.length ? criarTabelaHtmlNotas(linhasTexto)
        : criarElemento('p', CLASSE_TABELA_NOTAS + '__vazio', MSG_SEM_ALUNOS_NOTAS));
}

/**
 * Monta o nome do arquivo PDF a partir da página e da turma.
 * @returns {string} Nome do arquivo (ex.: AVALIACAO-OBJETIVA-01-NOTAS-133933.pdf).
 */
function montarNomeArquivoNotas() {
    const pagina = (location.pathname.split('/').pop() || 'atividade').replace(/\.html?$/i, '');
    const turma = String(estadoTabelaNotas.turma || 'TODAS').replace(/[^\w-]+/g, '-');
    return pagina + '-NOTAS-' + turma + '.pdf';
}

/**
 * Escreve o cabeçalho do PDF (título da atividade, UC, turma e data).
 * @param {Object} doc - Documento jsPDF.
 * @returns {number} Posição vertical onde a tabela começa.
 */
function escreverCabecalhoPdfNotas(doc) {
    const titulo = document.querySelector('header h1')?.textContent.trim() || document.title;
    const uc = document.body.dataset.uc || '';
    doc.setFont('helvetica', 'bold').setFontSize(14);
    doc.text(TITULO_TABELA_NOTAS, MARGEM_PDF_NOTAS, 20);
    doc.setFont('helvetica', 'normal').setFontSize(10);
    doc.text(doc.splitTextToSize(titulo, 180), MARGEM_PDF_NOTAS, 27);
    doc.text(uc + ' · Turma: ' + obterNomeTurmaNotas(), MARGEM_PDF_NOTAS, 38);
    doc.text('Gerado em ' + new Date().toLocaleString('pt-BR'), MARGEM_PDF_NOTAS, 44);
    return 50;
}

/**
 * Exporta a tabela de notas da turma escolhida em PDF (A4, rodapé com página).
 */
async function exportarPdfNotas() {
    const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDF) {
        await mostrarPopup(MSG_PDF_INDISPONIVEL_NOTAS, { tipo: 'erro' });
        return;
    }
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const inicio = escreverCabecalhoPdfNotas(doc);
    doc.autoTable({
        startY: inicio, head: [COLUNAS_TABELA_NOTAS],
        body: montarLinhasTextoNotas(
            listarNotasDaTurma(estadoTabelaNotas.linhas, estadoTabelaNotas.turma)),
        margin: { left: MARGEM_PDF_NOTAS, right: MARGEM_PDF_NOTAS },
        headStyles: { fillColor: COR_CABECALHO_PDF_NOTAS },
        columnStyles: { 0: { cellWidth: 15, halign: 'center' }, 2: { cellWidth: 25, halign: 'center' } },
    });
    const paginas = doc.getNumberOfPages();
    for (let pagina = 1; pagina <= paginas; pagina += 1) {
        doc.setPage(pagina).setFontSize(8);
        doc.text('Página ' + pagina + ' de ' + paginas, 195, 290, { align: 'right' });
    }
    doc.save(montarNomeArquivoNotas());
}

/**
 * Mostra a tabela "Notas dos alunos" logo após o relatório do professor.
 * @param {HTMLElement} relatorio - Cartão do relatório do professor.
 * @param {Object[]} linhas - Linhas do resumo (inclui alunos sem resposta).
 * @param {{turmas: Object[], turma: string|null}} opcoes - Turmas e turma escolhida.
 */
function montarTabelaNotasProfessor(relatorio, linhas, opcoes) {
    Object.assign(estadoTabelaNotas, { linhas, turmas: opcoes.turmas, turma: opcoes.turma });
    estadoTabelaNotas.bloco?.remove();
    const bloco = criarElemento('div', 'aula-card ' + CLASSE_TABELA_NOTAS);
    const topo = criarElemento('div', CLASSE_TABELA_NOTAS + '__topo');
    const botao = criarElemento('button', 'btn-export', '📥 Exportar PDF (notas)');
    botao.type = 'button';
    botao.addEventListener('click', exportarPdfNotas);
    topo.append(criarElemento('div', 'aula-title', TITULO_TABELA_NOTAS), botao);
    bloco.append(criarElemento('span', 'aula-badge', 'PROFESSOR'), topo,
        criarElemento('p', CLASSE_TABELA_NOTAS + '__turma'),
        criarElemento('div', CLASSE_TABELA_NOTAS + '__area'));
    relatorio.after(bloco);
    estadoTabelaNotas.bloco = bloco;
    atualizarTabelaNotas();
}

document.addEventListener(EVENTO_TURMA_RELATORIO, (evento) => {
    estadoTabelaNotas.turma = evento.detail.turma;
    atualizarTabelaNotas();
});

(function incluirEstiloTabelaNotas() {
    const script = document.currentScript;
    if (!script) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('../css/tabela-notas-professor.css', script.src).href;
    document.head.appendChild(link);
})();
