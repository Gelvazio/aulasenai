// Atividade Dinâmica no PC (tarefa #413): botão "Exportar enunciado em PDF".
// Monta o PDF só com o que o aluno já vê na página (informações, contexto, objetivo e
// formatos) e com os dados da aula (passos, ficha e checklist). ⛔ Nunca leva roteiro, critérios de nota
// nem entregas. Depende de pdf-minhas-respostas.js (jsPDF, faixa SENAI e limpeza de texto) e de
// dinamica-3d-controle.js (obterDinamica3d). Regra: docs/regras/atividade-dinamica.md

const SELETOR_CARDS_ENUNCIADO = '.aula-card:not(.dinamica__professor)';
const SELETOR_CAIXAS_ENUNCIADO = '.content-box';
const SELETOR_FORMATOS_ENUNCIADO = '.dinamica__formatos li';
const TEXTO_BOTAO_ENUNCIADO = 'Exportar enunciado em PDF';
const TEXTO_GERANDO_ENUNCIADO = 'Gerando PDF...';
const MSG_ERRO_ENUNCIADO = 'Não foi possível gerar o PDF do enunciado: ';
const SUBTITULO_PDF_ENUNCIADO = 'SENAI · Enunciado da Atividade Dinâmica';
const TITULO_PASSOS_ENUNCIADO = 'COMO FAZER NO COMPUTADOR';
const TITULO_FICHA_ENUNCIADO = 'FICHA PARA PREENCHER';
const TITULO_CHECKLIST_ENUNCIADO = 'CHECKLIST DO ALUNO CONSULTOR';
const ROTULOS_PASSOS_ENUNCIADO = [
    ['raiox', '1. Raio-x'], ['redesenho', '2. Redesenho'], ['ficha', '3. Ficha e entrega']
];
const LIMITE_FOLHA_ENUNCIADO = 275;
const ALTURA_LINHA_ENUNCIADO = 5;
const TAMANHO_TITULO_ENUNCIADO = 11;
const TAMANHO_TEXTO_ENUNCIADO = 10;
const TAMANHO_NOME_ARQUIVO_ENUNCIADO = 60;

/**
 * Lê as seções de texto dos cards visíveis ao aluno (informações, contexto, objetivo e
 * formatos).
 * @returns {{titulo: string, linhas: string[]}[]} Seções na ordem da página.
 */
function lerSecoesDaPaginaEnunciado() {
    const secoes = [];
    document.querySelectorAll(SELETOR_CARDS_ENUNCIADO).forEach((card) => {
        card.querySelectorAll(SELETOR_CAIXAS_ENUNCIADO).forEach((caixa) => {
            const rotulo = caixa.querySelector('.content-label');
            const texto = caixa.querySelector('.content-text');
            if (rotulo && texto) {
                secoes.push({ titulo: rotulo.textContent, linhas: [texto.innerText] });
            }
        });
        const formatos = [...card.querySelectorAll(SELETOR_FORMATOS_ENUNCIADO)];
        if (formatos.length) {
            secoes.push({
                titulo: 'FORMATOS',
                linhas: formatos.map((item) => '• ' + item.textContent.trim())
            });
        }
    });
    return secoes;
}

/**
 * Monta as seções que vêm dos dados da aula (passos, ficha e checklist).
 * @param {Object|null} dados - Retorno de obterDinamica3d (pode ser nulo).
 * @returns {{titulo: string, linhas: string[]}[]} Seções dos dados da aula.
 */
function lerSecoesDaAulaEnunciado(dados) {
    if (!dados) return [];
    const instrucoes = dados.instrucoes || {};
    const passos = ROTULOS_PASSOS_ENUNCIADO
        .filter(([chave]) => instrucoes[chave])
        .map(([chave, rotulo]) => rotulo + ' — ' + instrucoes[chave]);
    const ficha = (dados.ficha || []).map((campo) => '• ' + campo.rotulo);
    const checklist = (dados.checklist || []).map((item) => '☐ ' + item);
    return [
        { titulo: TITULO_PASSOS_ENUNCIADO, linhas: passos },
        { titulo: TITULO_FICHA_ENUNCIADO, linhas: ficha },
        { titulo: TITULO_CHECKLIST_ENUNCIADO, linhas: checklist }
    ].filter((secao) => secao.linhas.length);
}

/**
 * Desenha uma seção no PDF, abrindo folha nova quando faltar espaço.
 * @param {Object} doc - Documento jsPDF.
 * @param {{titulo: string, linhas: string[]}} secao - Seção a desenhar.
 * @param {number} posicaoY - Posição vertical inicial.
 * @returns {number} Posição vertical logo abaixo da seção.
 */
function desenharSecaoEnunciado(doc, secao, posicaoY) {
    const largura = LARGURA_A4_MEU_GABARITO - 2 * MARGEM_MEU_GABARITO;
    let y = posicaoY;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(TAMANHO_TITULO_ENUNCIADO);
    doc.setTextColor(...COR_SENAI_MEU_GABARITO);
    doc.text(textoPdfMeuGabarito(secao.titulo), MARGEM_MEU_GABARITO, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(TAMANHO_TEXTO_ENUNCIADO);
    doc.setTextColor(0, 0, 0);
    y += ALTURA_LINHA_ENUNCIADO;
    secao.linhas.forEach((linha) => {
        doc.splitTextToSize(textoPdfMeuGabarito(linha), largura).forEach((parte) => {
            if (y > LIMITE_FOLHA_ENUNCIADO) {
                doc.addPage();
                y = MARGEM_MEU_GABARITO;
            }
            doc.text(parte, MARGEM_MEU_GABARITO, y);
            y += ALTURA_LINHA_ENUNCIADO;
        });
    });
    return y + ALTURA_LINHA_ENUNCIADO / 2;
}

/**
 * Desenha a faixa azul do topo com o título da atividade.
 * @param {Object} doc - Documento jsPDF.
 * @param {string} titulo - Título da atividade.
 * @returns {number} Posição vertical logo abaixo da faixa.
 */
function desenharFaixaEnunciado(doc, titulo) {
    doc.setFillColor(...COR_SENAI_MEU_GABARITO);
    doc.rect(0, 0, LARGURA_A4_MEU_GABARITO, ALTURA_FAIXA_MEU_GABARITO + 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    const linhas = doc.splitTextToSize(textoPdfMeuGabarito(titulo), 180);
    doc.text(linhas.slice(0, 2), MARGEM_MEU_GABARITO, 8);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.text(textoPdfMeuGabarito(SUBTITULO_PDF_ENUNCIADO), MARGEM_MEU_GABARITO, 18.5);
    doc.setTextColor(0, 0, 0);
    return ALTURA_FAIXA_MEU_GABARITO + 12;
}

/**
 * Escreve "Página X de Y" em todas as folhas.
 * @param {Object} doc - Documento jsPDF.
 * @param {string} rodape - Texto à esquerda do número da página.
 */
function numerarFolhasEnunciado(doc, rodape) {
    const total = doc.getNumberOfPages();
    doc.setFontSize(8);
    for (let pagina = 1; pagina <= total; pagina++) {
        doc.setPage(pagina);
        doc.text(textoPdfMeuGabarito(rodape + ' · Página ' + pagina + ' de ' + total),
            LARGURA_A4_MEU_GABARITO / 2, POSICAO_RODAPE_MEU_GABARITO, { align: 'center' });
    }
}

/**
 * Monta o nome do arquivo (sem acentos nem símbolos).
 * @param {string} titulo - Título da atividade.
 * @returns {string} Nome do arquivo .pdf.
 */
function nomeArquivoEnunciado(titulo) {
    const base = ('ENUNCIADO ' + titulo).normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toUpperCase();
    return base.slice(0, TAMANHO_NOME_ARQUIVO_ENUNCIADO) + '.pdf';
}

/**
 * Gera e baixa o PDF do enunciado da dinâmica aberta na página.
 * @returns {Promise<void>}
 * @throws {Error} Se o jsPDF não carregar.
 */
async function exportarEnunciadoDinamicaPdf() {
    const jsPDF = await garantirJsPdfMeuGabarito();
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const titulo = document.querySelector('header h1').textContent.trim();
    const dados = obterDinamica3d(document.body.dataset.aula);
    const secoes = [...lerSecoesDaPaginaEnunciado(), ...lerSecoesDaAulaEnunciado(dados)];
    let y = desenharFaixaEnunciado(doc, titulo);
    secoes.forEach((secao) => { y = desenharSecaoEnunciado(doc, secao, y); });
    const docente = document.body.dataset.docente;
    numerarFolhasEnunciado(doc, document.body.dataset.ucCurta + (docente ? ' · ' + docente : ''));
    doc.save(nomeArquivoEnunciado(titulo));
}

/**
 * Trata o clique do botão: gera o PDF e mostra erro, se houver.
 * @param {HTMLButtonElement} botao - Botão clicado.
 * @returns {Promise<void>}
 */
async function aoClicarExportarEnunciado(botao) {
    botao.disabled = true;
    botao.textContent = TEXTO_GERANDO_ENUNCIADO;
    try {
        await exportarEnunciadoDinamicaPdf();
    } catch (erro) {
        window.alert(MSG_ERRO_ENUNCIADO + (erro.message || erro));
    } finally {
        botao.disabled = false;
        botao.textContent = TEXTO_BOTAO_ENUNCIADO;
    }
}

/** Coloca o botão no primeiro card da página (informações da dinâmica). */
function inserirBotaoExportarEnunciado() {
    const card = document.querySelector(SELETOR_CARDS_ENUNCIADO);
    if (!card) return;

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'dinamica3d__botao dinamica3d__exportar-enunciado';
    botao.textContent = TEXTO_BOTAO_ENUNCIADO;
    botao.addEventListener('click', () => aoClicarExportarEnunciado(botao));
    card.querySelector('.aula-title').after(botao);
}

document.addEventListener('DOMContentLoaded', inserirBotaoExportarEnunciado);
