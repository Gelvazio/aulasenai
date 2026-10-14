// Professor: combobox "Questões respondidas" no Progresso da turma GLOBAL
// (progresso-turma-global.js), em toda atividade (objetiva, prática e discursiva). Mostra só os
// alunos cuja quantidade de questões respondidas (questões completas, o mesmo número da coluna
// Situação) cai na faixa escolhida: Todas, 5 ou menos, 6 a 10, 11 a 15 ou 16 a 20. Ao lado,
// "N de T alunos". Só filtra a lista na tela: nada é lido nem gravado no banco.
// Pedido do usuário em 2026-10-14 (tarefa #135).

const CLASSE_FILTRO_RESPONDIDAS = 'progresso-turma__filtro';
const ROTULO_FILTRO_RESPONDIDAS = 'Questões respondidas:';
const ID_FILTRO_RESPONDIDAS = 'progresso-turma-filtro-respondidas';
const VALOR_TODAS_FILTRO_RESPONDIDAS = 'todas';
// Faixas do combobox (limites inclusivos); acrescentar uma faixa = acrescentar uma linha.
const FAIXAS_FILTRO_RESPONDIDAS = [
    { valor: VALOR_TODAS_FILTRO_RESPONDIDAS, texto: 'Todas', minimo: 0, maximo: Infinity },
    { valor: 'ate-5', texto: '5 ou menos', minimo: 0, maximo: 5 },
    { valor: '6-a-10', texto: '6 a 10 (10 ou menos e mais de 5)', minimo: 6, maximo: 10 },
    { valor: '11-a-15', texto: '11 a 15 (15 ou menos e mais de 10)', minimo: 11, maximo: 15 },
    { valor: '16-a-20', texto: '16 a 20 (20 ou menos e mais de 15)', minimo: 16, maximo: 20 },
];

/**
 * Procura a faixa pelo valor da opção (valor desconhecido = Todas).
 * @param {string} valor - Valor da opção escolhida.
 * @returns {{minimo: number, maximo: number}} Faixa.
 */
function obterFaixaFiltroRespondidas(valor) {
    return FAIXAS_FILTRO_RESPONDIDAS.find((faixa) => faixa.valor === valor) ||
        FAIXAS_FILTRO_RESPONDIDAS[0];
}

/**
 * Monta o combobox com as faixas.
 * @param {Function} aoMudar - Chamada quando o professor troca a faixa.
 * @returns {HTMLSelectElement} Combobox pronto.
 */
function montarComboboxFiltroRespondidas(aoMudar) {
    const combobox = document.createElement('select');
    combobox.id = ID_FILTRO_RESPONDIDAS;
    combobox.className = CLASSE_FILTRO_RESPONDIDAS + '-opcoes';
    FAIXAS_FILTRO_RESPONDIDAS.forEach((faixa) => combobox.add(new Option(faixa.texto,
        faixa.valor)));
    combobox.addEventListener('change', aoMudar);
    return combobox;
}

/**
 * Cria o filtro "Questões respondidas" do Progresso da turma.
 * @param {Function} aoMudar - Redesenha a lista quando a faixa muda.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Área do filtro e a função que devolve
 *   só os alunos da faixa escolhida (e atualiza o "N de T alunos").
 */
function criarFiltroRespondidas(aoMudar) {
    const elemento = document.createElement('div');
    elemento.className = CLASSE_FILTRO_RESPONDIDAS;
    const rotulo = document.createElement('label');
    rotulo.htmlFor = ID_FILTRO_RESPONDIDAS;
    rotulo.textContent = ROTULO_FILTRO_RESPONDIDAS;
    const combobox = montarComboboxFiltroRespondidas(aoMudar);
    const contagem = document.createElement('span');
    contagem.className = CLASSE_FILTRO_RESPONDIDAS + '-contagem';
    elemento.append(rotulo, combobox, contagem);

    /**
     * Devolve só os alunos da faixa escolhida e mostra quantos ficaram.
     * @param {Object[]} alunos - Alunos com indicadores (campo completas).
     * @returns {Object[]} Alunos da faixa.
     */
    function filtrar(alunos) {
        const faixa = obterFaixaFiltroRespondidas(combobox.value);
        const daFaixa = alunos.filter((aluno) =>
            aluno.completas >= faixa.minimo && aluno.completas <= faixa.maximo);
        contagem.textContent = daFaixa.length + ' de ' + alunos.length + ' alunos';
        return daFaixa;
    }

    return { elemento, filtrar };
}

window.criarFiltroRespondidas = criarFiltroRespondidas;
