// Vocabulário das tentativas das páginas de atividade (genérico para todas as matérias).
// Nas avaliações (páginas AVALIACAO-*.html), a 1ª vez é a "avaliação" e as seguintes são a
// "recuperação" — que reabre só as questões erradas, com a mesma lógica das tentativas. Nas
// atividades, tudo continua se chamando "tentativa". Carregado por respostas-atividade.js antes
// de montar a página; usado também pelo provedor do banco e pelo relatório do professor.

const PADRAO_PAGINA_AVALIACAO = /\/AVALIACAO-[^/]*\.html$/i;

/**
 * Indica se a página atual é uma avaliação (pelo nome do arquivo).
 * @returns {boolean} true se for uma página AVALIACAO-*.html.
 */
function ehPaginaAvaliacao() {
    return PADRAO_PAGINA_AVALIACAO.test(decodeURIComponent(location.pathname));
}

/**
 * Deixa a primeira letra do texto em maiúscula (ex.: "recuperação 1" → "Recuperação 1").
 * @param {string} texto - Texto de origem.
 * @returns {string} Texto com a inicial maiúscula.
 */
function maiusculaInicial(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const TERMOS_TENTATIVA_ATIVIDADE = {
    ehAvaliacao: false,
    simples: (numero) => 'tentativa ' + numero,
    rotulo: (numero, maximo) => 'tentativa ' + numero + ' de ' + maximo,
    nova: 'nova tentativa',
    colunaEtapa: 'Tentativa',
    colunaQuantidade: 'Tentativas',
    entregues: 'tentativa(s) entregue(s)',
    usouTodas: (maximo) => 'Você usou as ' + maximo + ' tentativas desta atividade.',
    pedirNova: 'Se precisar refazer, peça ao professor para liberar uma nova tentativa.',
    regra: 'Depois de entregar, só o professor pode liberar uma nova tentativa.',
    reprovado: 'solicite ao professor liberação da atividade para uma nova tentativa!',
    professorLibera: 'libera novas tentativas',
    aprovadoPodeRefazer: true,
};

const TERMOS_TENTATIVA_AVALIACAO = {
    ehAvaliacao: true,
    simples: (numero) => (numero <= 1 ? 'avaliação' : 'recuperação ' + (numero - 1)),
    rotulo: (numero, maximo) => (numero <= 1
        ? 'avaliação' : 'recuperação ' + (numero - 1) + ' de ' + (maximo - 1)),
    nova: 'recuperação',
    colunaEtapa: 'Etapa',
    colunaQuantidade: 'Etapas',
    entregues: 'entrega(s)',
    usouTodas: (maximo) => 'Você já fez a avaliação e as ' + (maximo - 1) + ' recuperações.',
    pedirNova: 'Se não atingir a nota mínima, peça ao professor para liberar a recuperação ' +
        '(só das questões que você errar).',
    regra: 'Depois de entregar, só o professor pode liberar a recuperação.',
    reprovado: 'solicite ao professor a liberação da recuperação, só com as questões que ' +
        'você errou!',
    professorLibera: 'libera as recuperações',
    aprovadoPodeRefazer: false,
};

window.TERMOS_TENTATIVA = ehPaginaAvaliacao()
    ? TERMOS_TENTATIVA_AVALIACAO : TERMOS_TENTATIVA_ATIVIDADE;
window.maiusculaInicial = maiusculaInicial;
