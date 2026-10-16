/**
 * Atividade de sala avulsa (16/10/2026) — fora do sistema: sem login, sem banco e sem link nos
 * índices de atividades. Coleta as respostas da página, guarda o rascunho e exporta o PDF.
 * Depende de: atividade-sala-rascunho.js, atividade-sala-pdf.js e jsPDF + AutoTable.
 */

const SELETOR_QUESTAO = '.questao';
const SELETOR_CAMPO_PRATICO = '[data-rotulo]';
const ROTULO_RESPOSTA_OBJETIVA = 'Resposta marcada';
const ATRASO_SALVAR_MS = 400;
const MENSAGEM_SEM_NOME = 'Preencha o seu nome no campo Estudante antes de exportar.';
const MENSAGEM_SEM_BIBLIOTECA =
    'Não foi possível carregar o gerador de PDF. Verifique a internet e recarregue a página.';
const MENSAGEM_CONFIRMAR_LIMPAR = 'Apagar todas as respostas desta atividade?';
const MENSAGEM_RASCUNHO_SALVO = 'Respostas salvas neste navegador às ';
const MENSAGEM_RASCUNHO_FALHOU = 'Este navegador não permitiu salvar o rascunho.';

/**
 * Junta espaços e quebras de linha repetidos em um espaço só.
 * @param {string} texto - Texto de origem.
 * @returns {string} Texto normalizado.
 */
function normalizarTexto(texto) {
    return (texto || '').replace(/\s+/g, ' ').trim();
}

/**
 * Converte a data do campo (AAAA-MM-DD) para DD/MM/AAAA.
 * @param {string} valorIso - Valor do input date.
 * @returns {string} Data formatada, ou linha em branco se vazia.
 */
function formatarData(valorIso) {
    if (!valorIso) return '___/___/______';

    const [ano, mes, dia] = valorIso.split('-');
    return dia + '/' + mes + '/' + ano;
}

/**
 * Data de hoje no formato do input date (AAAA-MM-DD), no fuso do computador.
 * @returns {string} Data de hoje.
 */
function obterDataHojeIso() {
    const hoje = new Date();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return hoje.getFullYear() + '-' + mes + '-' + dia;
}

/**
 * Lê nome, turma e data preenchidos pelo aluno.
 * @param {Document} documentoHtml - Página da atividade.
 * @returns {{estudante: string, turma: string, data: string}} Identificação.
 */
function coletarIdentificacao(documentoHtml) {
    return {
        estudante: normalizarTexto(documentoHtml.getElementById('estudante').value),
        turma: normalizarTexto(documentoHtml.getElementById('turma').value),
        data: formatarData(documentoHtml.getElementById('data-atividade').value),
    };
}

/**
 * Resposta de uma questão objetiva: o texto da alternativa marcada.
 * @param {HTMLElement} questao - Elemento da questão.
 * @returns {Array<{rotulo: string, valor: string}>} Uma resposta (vazia se não marcou).
 */
function coletarRespostaObjetiva(questao) {
    const marcada = questao.querySelector('input[type="radio"]:checked');
    const textoMarcado = marcada ? normalizarTexto(marcada.closest('label').textContent) : '';
    return [{ rotulo: ROTULO_RESPOSTA_OBJETIVA, valor: textoMarcado }];
}

/**
 * Respostas de uma situação prática: um item por campo com data-rotulo.
 * @param {HTMLElement} questao - Elemento da questão.
 * @returns {Array<{rotulo: string, valor: string}>} Respostas na ordem da página.
 */
function coletarRespostasPraticas(questao) {
    return Array.from(questao.querySelectorAll(SELETOR_CAMPO_PRATICO)).map((campo) => ({
        rotulo: campo.dataset.rotulo,
        valor: campo.value.trim(),
    }));
}

/** Coletor de respostas por tipo de questão (tipo novo = coletor novo, sem mexer no resto). */
const COLETORES_POR_TIPO = {
    objetiva: coletarRespostaObjetiva,
    pratica: coletarRespostasPraticas,
};

/**
 * Coleta título, enunciado e respostas de todas as questões da página.
 * @param {Document} documentoHtml - Página da atividade.
 * @returns {Array<{titulo: string, enunciado: string, respostas: Array<Object>}>} Questões.
 */
function coletarQuestoes(documentoHtml) {
    return Array.from(documentoHtml.querySelectorAll(SELETOR_QUESTAO)).map((questao) => {
        const coletor = COLETORES_POR_TIPO[questao.dataset.tipo] || coletarRespostasPraticas;
        return {
            titulo: normalizarTexto(questao.querySelector('.questao__titulo').textContent),
            enunciado: questao.querySelector('.questao__enunciado').innerText.trim(),
            respostas: coletor(questao),
        };
    });
}

/**
 * Conta as questões com pelo menos uma resposta em branco.
 * @param {Array<{respostas: Array<{valor: string}>}>} questoes - Questões coletadas.
 * @returns {number} Quantidade de questões incompletas.
 */
function contarQuestoesIncompletas(questoes) {
    return questoes.filter((questao) => questao.respostas.some((resposta) => !resposta.valor))
        .length;
}

/**
 * Valida a página e exporta o PDF com as respostas do aluno.
 * @param {Document} documentoHtml - Página da atividade.
 * @returns {void}
 */
function exportarPdf(documentoHtml) {
    const construtorPdf = window.jspdf?.jsPDF;
    if (!construtorPdf) {
        alert(MENSAGEM_SEM_BIBLIOTECA);
        return;
    }

    const identificacao = coletarIdentificacao(documentoHtml);
    if (!identificacao.estudante) {
        alert(MENSAGEM_SEM_NOME);
        documentoHtml.getElementById('estudante').focus();
        return;
    }

    const questoes = coletarQuestoes(documentoHtml);
    const quantidadeIncompletas = contarQuestoesIncompletas(questoes);
    const pergunta = 'Há ' + quantidadeIncompletas + ' questão(ões) com resposta em branco. '
        + 'Exportar mesmo assim?';
    if (quantidadeIncompletas > 0 && !confirm(pergunta)) return;

    window.gerarPdfAtividade({ identificacao, questoes, construtorPdf });
}

/**
 * Mostra ao aluno se o rascunho foi salvo.
 * @param {Document} documentoHtml - Página da atividade.
 * @param {boolean} foiSalvo - Resultado do salvamento.
 * @returns {void}
 */
function mostrarSituacaoRascunho(documentoHtml, foiSalvo) {
    const mensagem = documentoHtml.getElementById('mensagem-rascunho');
    if (!foiSalvo) {
        mensagem.textContent = MENSAGEM_RASCUNHO_FALHOU;
        return;
    }
    mensagem.textContent = MENSAGEM_RASCUNHO_SALVO + new Date().toLocaleTimeString('pt-BR');
}

/**
 * Salva o rascunho pouco depois da última digitação (evita gravar a cada tecla).
 * @param {Document} documentoHtml - Página da atividade.
 * @param {{salvar: Function}} rascunho - Rascunho da atividade.
 * @returns {Function} Função a ligar nos eventos de entrada.
 */
function criarSalvamentoAdiado(documentoHtml, rascunho) {
    let temporizador = null;
    return () => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            mostrarSituacaoRascunho(documentoHtml, rascunho.salvar(documentoHtml));
        }, ATRASO_SALVAR_MS);
    };
}

/**
 * Apaga as respostas da página e do rascunho, depois de confirmar com o aluno.
 * @param {Document} documentoHtml - Página da atividade.
 * @param {{limpar: Function}} rascunho - Rascunho da atividade.
 * @returns {void}
 */
function limparRespostas(documentoHtml, rascunho) {
    if (!confirm(MENSAGEM_CONFIRMAR_LIMPAR)) return;

    rascunho.limpar();
    documentoHtml.querySelectorAll('input, textarea, select').forEach((campo) => {
        if (campo.type === 'radio') campo.checked = false;
        else campo.value = '';
    });
    documentoHtml.getElementById('data-atividade').value = obterDataHojeIso();
    documentoHtml.getElementById('mensagem-rascunho').textContent = '';
}

/**
 * Inicializa a página: restaura o rascunho, preenche a data e liga os botões.
 * @returns {void}
 */
function iniciarAtividade() {
    const rascunho = window.criarRascunho(window.localStorage);
    rascunho.restaurar(document);

    const campoData = document.getElementById('data-atividade');
    if (!campoData.value) campoData.value = obterDataHojeIso();

    const salvarAdiado = criarSalvamentoAdiado(document, rascunho);
    document.addEventListener('input', salvarAdiado);
    document.addEventListener('change', salvarAdiado);

    document.getElementById('botao-exportar')
        .addEventListener('click', () => exportarPdf(document));
    document.getElementById('botao-limpar')
        .addEventListener('click', () => limparRespostas(document, rascunho));
}

document.addEventListener('DOMContentLoaded', iniciarAtividade);
