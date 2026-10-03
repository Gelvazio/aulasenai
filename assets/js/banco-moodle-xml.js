// Monta o texto Moodle XML usado na importação do Banco de questões do AVA SENAI (Moodle).
// Responsabilidade única: transformar dados prontos de categorias e questões em Moodle XML; não
// lê a página, não acessa o banco e não baixa arquivos (isso fica em exportar-banco-moodle.js).
// ⚠️ Mesmo formato do gerador local assets/gerador-banco-ava/moodle_xml.py: mudou um, mudar o
// outro (constantes, ordem dos elementos e recuo iguais).
// Plano: docs/botao-exportar-banco-moodle-atividade.md
//
// Funções e constantes globais com sufixo Moodle/_MOODLE (scripts clássicos dividem o escopo).
//
// Questão esperada: { numero: '01', titulo, contexto, comando, alternativas: [['A', 'texto']],
//                     gabarito: 'A', capacidades: ['C1'] }

const CABECALHO_XML_MOODLE = '<?xml version="1.0" encoding="UTF-8"?>';
const RECUO_MOODLE = '  ';
const FORMATO_HTML_MOODLE = 'html';
const RAIZ_CATEGORIA_MOODLE = 'top';
const SEPARADOR_CATEGORIA_MOODLE = '/';
const SEPARADOR_CATEGORIA_ESCAPADO_MOODLE = '//';
const NOTA_QUESTAO_MOODLE = '1.0000000';
const PENALIDADE_QUESTAO_MOODLE = '0.0000000';
const FRACAO_CORRETA_MOODLE = '100';
const FRACAO_ERRADA_MOODLE = '0';
const NUMERACAO_ALTERNATIVAS_MOODLE = 'ABCD';
const ROTULO_CONTEXTO_MOODLE = 'Contexto:';
const FEEDBACK_CORRETO_MOODLE = 'Resposta correta.';
const FEEDBACK_PARCIAL_MOODLE = 'Resposta parcialmente correta.';
const FEEDBACK_INCORRETO_MOODLE = 'Resposta incorreta.';
const SEPARADOR_IDENTIFICADOR_MOODLE = '-';
// Alternativas que citam as outras deixam de fazer sentido se a ordem mudar.
const TERMOS_DEPENDEM_DA_ORDEM_MOODLE = ['todas as anteriores', 'nenhuma das anteriores',
    'todas as alternativas', 'nenhuma das alternativas',
    'alternativas acima', 'opções acima', 'todas acima', 'nenhuma acima'];

/**
 * Escapa &, < e > (equivale ao xml.sax.saxutils.escape e ao html.escape sem aspas).
 * @param {string} texto - Texto simples.
 * @returns {string} Texto escapado.
 */
function escaparXmlMoodle(texto) {
    return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Acrescenta recuo às linhas XML.
 * @param {string[]} linhas - Linhas.
 * @param {number} [nivel=1] - Quantidade de recuos.
 * @returns {string[]} Novas linhas recuadas.
 */
function recuarMoodle(linhas, nivel = 1) {
    const prefixo = RECUO_MOODLE.repeat(nivel);
    return linhas.map((linha) => prefixo + linha);
}

/**
 * Monta um elemento Moodle com <text> dentro (ex.: <name>, <questiontext>).
 * @param {string} nome - Nome do elemento XML.
 * @param {string} texto - Conteúdo pronto (HTML ou texto simples); escapado aqui.
 * @param {string} [formato] - Valor do atributo format; omitido quando vazio.
 * @returns {string[]} Linhas XML.
 */
function elementoTextoMoodle(nome, texto, formato) {
    const atributo = formato ? ' format="' + formato + '"' : '';
    const linhaTexto = RECUO_MOODLE + '<text>' + escaparXmlMoodle(texto) + '</text>';
    return ['<' + nome + atributo + '>', linhaTexto, '</' + nome + '>'];
}

/**
 * Parágrafo HTML com o texto escapado e, se houver, um rótulo em negrito.
 * @param {string} texto - Texto simples.
 * @param {string} [rotulo] - Rótulo mostrado antes do texto (ex.: "Contexto:").
 * @returns {string} Parágrafo HTML.
 */
function paragrafoHtmlMoodle(texto, rotulo) {
    let conteudo = escaparXmlMoodle(texto);
    if (rotulo) conteudo = '<strong>' + escaparXmlMoodle(rotulo) + '</strong> ' + conteudo;
    return '<p>' + conteudo + '</p>';
}

/**
 * Enunciado HTML: contexto (quando houver) seguido do comando.
 * @param {Object} questao - Questão.
 * @returns {string} HTML do enunciado.
 */
function montarEnunciadoMoodle(questao) {
    const paragrafos = [];
    if (questao.contexto) {
        paragrafos.push(paragrafoHtmlMoodle(questao.contexto, ROTULO_CONTEXTO_MOODLE));
    }
    paragrafos.push(paragrafoHtmlMoodle(questao.comando));
    return paragrafos.join('');
}

/**
 * Indica se as alternativas podem ser embaralhadas no AVA.
 * @param {Object} questao - Questão com alternativas [[letra, texto]].
 * @returns {boolean} false quando alguma alternativa cita as outras.
 */
function podeEmbaralharMoodle(questao) {
    const textos = questao.alternativas.map(([, texto]) => texto.toLowerCase()).join(' ');
    return !TERMOS_DEPENDEM_DA_ORDEM_MOODLE.some((termo) => textos.includes(termo));
}

/**
 * Configuração da questão: nota, penalidade, ID, resposta única, embaralhar e numeração.
 * @param {Object} questao - Questão.
 * @param {string} prefixoIdentificador - Prefixo do ID (ex.: "INTRODUCAO-TIC-AULA-01").
 * @returns {string[]} Linhas XML.
 */
function montarConfiguracaoMoodle(questao, prefixoIdentificador) {
    const embaralhar = podeEmbaralharMoodle(questao) ? 'true' : 'false';
    const identificador = prefixoIdentificador + '-Q' + questao.numero;
    return [
        '<defaultgrade>' + NOTA_QUESTAO_MOODLE + '</defaultgrade>',
        '<penalty>' + PENALIDADE_QUESTAO_MOODLE + '</penalty>',
        '<hidden>0</hidden>',
        '<idnumber>' + escaparXmlMoodle(identificador) + '</idnumber>',
        '<single>true</single>',
        '<shuffleanswers>' + embaralhar + '</shuffleanswers>',
        '<answernumbering>' + NUMERACAO_ALTERNATIVAS_MOODLE + '</answernumbering>',
        '<showstandardinstruction>0</showstandardinstruction>',
    ];
}

/**
 * Feedbacks gerais da questão, sem revelar qual alternativa é a certa.
 * @returns {string[]} Linhas XML.
 */
function montarFeedbacksMoodle() {
    const feedbacks = [['correctfeedback', FEEDBACK_CORRETO_MOODLE],
        ['partiallycorrectfeedback', FEEDBACK_PARCIAL_MOODLE],
        ['incorrectfeedback', FEEDBACK_INCORRETO_MOODLE]];
    return feedbacks.flatMap(([nome, texto]) =>
        elementoTextoMoodle(nome, paragrafoHtmlMoodle(texto), FORMATO_HTML_MOODLE));
}

/**
 * Alternativas: a do gabarito vale 100%, as demais 0%.
 * @param {Object} questao - Questão com alternativas e gabarito.
 * @returns {string[]} Linhas XML.
 */
function montarAlternativasMoodle(questao) {
    const linhas = [];
    questao.alternativas.forEach(([letra, texto]) => {
        const fracao = letra === questao.gabarito ? FRACAO_CORRETA_MOODLE : FRACAO_ERRADA_MOODLE;
        linhas.push('<answer fraction="' + fracao + '" format="' + FORMATO_HTML_MOODLE + '">');
        const textoHtml = escaparXmlMoodle(paragrafoHtmlMoodle(texto));
        linhas.push(RECUO_MOODLE + '<text>' + textoHtml + '</text>');
        linhas.push(...recuarMoodle(elementoTextoMoodle('feedback', '', FORMATO_HTML_MOODLE)));
        linhas.push('</answer>');
    });
    return linhas;
}

/**
 * Tags da questão: as capacidades (C1, S2...) e o rótulo da atividade (ex.: "Aula 01").
 * @param {Object} questao - Questão com capacidades.
 * @param {string} rotulo - Rótulo da atividade.
 * @returns {string[]} Linhas XML.
 */
function montarTagsQuestaoMoodle(questao, rotulo) {
    const nomes = [...questao.capacidades, rotulo];
    const linhasTags = nomes.map((nome) =>
        RECUO_MOODLE + '<tag><text>' + escaparXmlMoodle(nome) + '</text></tag>');
    return ['<tags>', ...linhasTags, '</tags>'];
}

/**
 * Monta uma questão de múltipla escolha (resposta única) em Moodle XML.
 * @param {Object} questao - Questão.
 * @param {string} rotulo - Rótulo da atividade (vira tag).
 * @param {string} prefixoIdentificador - Prefixo do ID number.
 * @returns {string} XML da questão, já recuado para dentro de <quiz>.
 */
function montarQuestaoMoodle(questao, rotulo, prefixoIdentificador) {
    const nome = 'ITEM ' + questao.numero + ' — ' + questao.titulo;
    const corpo = [
        ...elementoTextoMoodle('name', nome),
        ...elementoTextoMoodle('questiontext', montarEnunciadoMoodle(questao), FORMATO_HTML_MOODLE),
        ...elementoTextoMoodle('generalfeedback', '', FORMATO_HTML_MOODLE),
        ...montarConfiguracaoMoodle(questao, prefixoIdentificador),
        ...montarFeedbacksMoodle(),
        ...montarAlternativasMoodle(questao),
        ...montarTagsQuestaoMoodle(questao, rotulo),
    ];
    const linhas = ['<question type="multichoice">', ...recuarMoodle(corpo), '</question>'];
    return recuarMoodle(linhas).join('\n');
}

/**
 * Caminho da categoria a partir da raiz do banco (ex.: "top/Introdução à TIC/Aula 01 — ...").
 * @param {string[]} partes - Nomes das categorias, da mais geral para a mais específica.
 * @returns {string} Caminho com "/" escapado como "//" dentro dos nomes (regra do Moodle).
 */
function caminhoCategoriaMoodle(partes) {
    const seguras = partes.map((parte) =>
        parte.split(SEPARADOR_CATEGORIA_MOODLE).join(SEPARADOR_CATEGORIA_ESCAPADO_MOODLE));
    return [RAIZ_CATEGORIA_MOODLE, ...seguras].join(SEPARADOR_CATEGORIA_MOODLE);
}

/**
 * Bloco que muda a categoria das questões seguintes.
 * @param {string[]} partes - Nomes das categorias.
 * @returns {string} XML do bloco de categoria, já recuado para dentro de <quiz>.
 */
function montarCategoriaMoodle(partes) {
    const corpo = [...elementoTextoMoodle('category', caminhoCategoriaMoodle(partes)),
        ...elementoTextoMoodle('info', '', FORMATO_HTML_MOODLE)];
    const linhas = ['<question type="category">', ...recuarMoodle(corpo), '</question>'];
    return recuarMoodle(linhas).join('\n');
}

/**
 * Documento completo de importação: cabeçalho XML e os blocos dentro de <quiz>.
 * @param {string[]} blocos - XML de categorias e questões, na ordem de importação.
 * @returns {string} Documento Moodle XML.
 */
function montarQuizMoodle(blocos) {
    return [CABECALHO_XML_MOODLE, '<quiz>', ...blocos, '</quiz>'].join('\n') + '\n';
}

/**
 * ID sem acentos, maiúsculo e com hífens (igual ao normalizar_identificador do Python).
 * @param {string} texto - Texto livre (ex.: "INTRODUCAO-TIC Avaliação Objetiva 01").
 * @returns {string} Identificador (ex.: "INTRODUCAO-TIC-AVALIACAO-OBJETIVA-01").
 */
function normalizarIdentificadorMoodle(texto) {
    const semAcentos = texto.normalize('NFKD').replace(/[^\x00-\x7F]/g, '');
    return semAcentos.toUpperCase().replace(/[^A-Z0-9]+/g, SEPARADOR_IDENTIFICADOR_MOODLE)
        .replace(/^-+|-+$/g, '');
}

/**
 * Documento completo de uma atividade: a categoria e todas as questões.
 * @param {{ucCurta: string, rotulo: string, tema: string, pastaMateria: string,
 *     questoes: Object[]}} atividade - Dados da atividade.
 * @returns {string} Documento Moodle XML.
 */
function montarBancoDaAtividadeMoodle(atividade) {
    const prefixo = normalizarIdentificadorMoodle(
        atividade.pastaMateria + ' ' + atividade.rotulo);
    const categoria = [atividade.ucCurta, atividade.rotulo + ' — ' + atividade.tema];
    const blocos = [montarCategoriaMoodle(categoria),
        ...atividade.questoes.map((questao) =>
            montarQuestaoMoodle(questao, atividade.rotulo, prefixo))];
    return montarQuizMoodle(blocos);
}
