// Adaptador do "Exportar Meu Gabarito" nas atividades OBJETIVAS (assets/js/respostas-atividade.js
// carrega este arquivo quando a página tem <body data-exportar-meu-gabarito="sim"> e o aluno está
// logado). Monta os dados do PDF com a alternativa que o aluno marcou em cada questão na última
// tentativa liberada (respostas do banco, inclusive as herdadas). ⛔ Sem a resposta certa.
// Botão e PDF: assets/js/exportar-meu-gabarito.js e assets/js/exportar-meu-gabarito-pdf.js.

const BASE_SCRIPTS_MEU_GABARITO_OBJETIVA = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const ARQUIVO_BOTAO_MEU_GABARITO_OBJETIVA = 'exportar-meu-gabarito.js';
const TEXTO_EM_BRANCO_OBJETIVA = '(em branco)';

/**
 * Carrega um script de assets/js/ (ao lado deste) e espera terminar.
 * @param {string} arquivo - Nome do script.
 * @returns {Promise<void>} Resolve quando carregou.
 */
function carregarScriptMeuGabaritoObjetiva(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_MEU_GABARITO_OBJETIVA + arquivo;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Descreve a questão como aparece na página (ex.: "Questão 01 — Para Que Serve Testar").
 * @param {{numero: string, card: HTMLElement}} item - Item da página.
 * @returns {string} Descrição da questão.
 */
function descreverQuestaoObjetiva(item) {
    const titulo = item.card.querySelector('.aula-title')?.textContent.trim() || '';
    return 'Questão ' + item.numero + (titulo ? ' — ' + titulo : '');
}

/**
 * Descreve a alternativa marcada pelo aluno com o texto dela (ex.: "B) Encontrar falhas...").
 * @param {{alternativas: HTMLElement[]}} item - Item da página.
 * @param {string} letra - Letra marcada pelo aluno (vazia = em branco).
 * @returns {string} Resposta do aluno.
 */
function descreverRespostaObjetiva(item, letra) {
    if (!letra) return TEXTO_EM_BRANCO_OBJETIVA;
    const alternativa = item.alternativas.find((elemento) =>
        (elemento.querySelector('.letra')?.textContent || '').replace(/\W/g, '') === letra);
    if (!alternativa) return letra + ')';
    const rotulo = alternativa.querySelector('.letra')?.textContent || '';
    return letra + ') ' + alternativa.textContent.replace(rotulo, '').trim();
}

/**
 * Monta os dados do PDF a partir do que a página já carregou do banco.
 * @param {Object} contexto - {carregado, itens, notaTexto, rotuloTentativa}.
 * @returns {Object} Dados no formato de gerarPdfMeuGabarito.
 */
function montarDadosMeuGabaritoObjetiva(contexto) {
    const { carregado, itens } = contexto;
    const respostas = carregado.respostas || {};
    const dadosPagina = document.body.dataset;
    return {
        estudante: carregado.nome || '',
        turma: carregado.turma || '',
        unidadeCurricular: dadosPagina.uc || '',
        atividade: document.title || '',
        docente: dadosPagina.docente || '',
        tentativa: contexto.rotuloTentativa,
        entregueEm: carregado.entregueEm || '',
        nota: contexto.notaTexto,
        respostas: itens.map((item) => ({ questao: descreverQuestaoObjetiva(item),
            resposta: descreverRespostaObjetiva(item, respostas[item.numero] || '') })),
    };
}

/**
 * Coloca o botão "Exportar Meu Gabarito" na folha de respostas da objetiva.
 * @param {{carregado: Object, itens: Object[], notaTexto: string, rotuloTentativa: string,
 *     destino: HTMLElement}} contexto - Dados já carregados pela página e onde pôr o botão.
 */
async function iniciarMeuGabaritoObjetiva(contexto) {
    if (typeof window.montarBotaoMeuGabarito !== 'function') {
        await carregarScriptMeuGabaritoObjetiva(ARQUIVO_BOTAO_MEU_GABARITO_OBJETIVA);
    }
    window.montarBotaoMeuGabarito({
        destino: contexto.destino,
        estaEntregue: Boolean(contexto.carregado.entregueEm),
        obterDados: async () => montarDadosMeuGabaritoObjetiva(contexto),
    });
}

window.iniciarMeuGabaritoObjetiva = iniciarMeuGabaritoObjetiva;
