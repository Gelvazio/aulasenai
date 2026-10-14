// Adaptador do "Exportar Meu Gabarito" nas atividades PRÁTICAS/DISCURSIVAS e avaliações práticas
// (assets/js/avaliacao-discursiva.js carrega este arquivo quando a página tem
// <body data-exportar-meu-gabarito="sim"> e o aluno está logado). Monta os dados do PDF com o
// texto que o aluno escreveu em cada tópico na última tentativa liberada e a nota
// (notas_media_final; sem correção, "aguardando"). ⛔ Sem o padrão de resposta.
// Botão e PDF: assets/js/botao-minhas-respostas.js e assets/js/pdf-minhas-respostas.js.

const BASE_SCRIPTS_MEU_GABARITO_DISCURSIVA =
    document.currentScript?.src.replace(/[^/]*$/, '') || '';
const ARQUIVO_BOTAO_MEU_GABARITO_DISCURSIVA = 'botao-minhas-respostas.js';
const ROTA_NOTA_MEU_GABARITO = '/rest/v1/rpc/notas_media_final';
const SITUACAO_COM_NOTA = 'NOTA';
const TEXTO_NOTA_PENDENTE = 'Aguardando a correção do professor';
const TEXTO_EM_BRANCO_DISCURSIVA = '(em branco)';
const SELETOR_TOPICOS_MEU_GABARITO = '.topico-resposta[data-item][data-topico]';

/**
 * Carrega um script de assets/js/ (ao lado deste) e espera terminar.
 * @param {string} arquivo - Nome do script.
 * @returns {Promise<void>} Resolve quando carregou.
 */
function carregarScriptMeuGabaritoDiscursiva(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_MEU_GABARITO_DISCURSIVA + arquivo;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Lê a nota do aluno logado nesta página (função notas_media_final).
 * @returns {Promise<string>} Nota formatada ou o aviso de correção pendente.
 */
async function lerNotaMeuGabaritoDiscursiva() {
    const resposta = await fetch(SUPABASE.URL + ROTA_NOTA_MEU_GABARITO, {
        method: 'POST', headers: await sbH(),
        body: JSON.stringify({ p_paginas: [location.pathname] }),
    });
    if (!resposta.ok) return TEXTO_NOTA_PENDENTE;
    const [linha] = await resposta.json();
    if (linha?.situacao !== SITUACAO_COM_NOTA) return TEXTO_NOTA_PENDENTE;
    return Number(linha.nota).toLocaleString('pt-BR',
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' (máximo 10)';
}

/**
 * Descreve o tópico como aparece na página (ex.: "ITEM 01 · Para Que Serve Testar — a) ...").
 * @param {HTMLElement} bloco - Bloco .topico-resposta.
 * @returns {string} Descrição do tópico.
 */
function descreverTopicoMeuGabarito(bloco) {
    const questao = bloco.closest('.aula-card');
    const badge = questao?.querySelector('.aula-badge')?.textContent.trim() || '';
    const titulo = questao?.querySelector('.aula-title')?.textContent.trim() || '';
    const rotulo = bloco.querySelector('.topico-resposta__rotulo');
    const pontos = rotulo?.querySelector('.topico-resposta__pontos')?.textContent || '';
    const enunciado = (rotulo?.textContent || '').replace(pontos, '').replace(/\s+/g, ' ').trim();
    return [badge, titulo].filter(Boolean).join(' · ') + ' — ' + enunciado;
}

/**
 * Monta as linhas de respostas: uma por tópico da página, com o texto gravado no banco.
 * @param {Object<string, string>} respostas - Mapa chave do tópico → texto.
 * @param {Function} chaveTopico - Monta a chave do tópico (item, tópico).
 * @returns {{questao: string, resposta: string}[]} Linhas do PDF.
 */
function montarRespostasMeuGabaritoDiscursiva(respostas, chaveTopico) {
    return Array.from(document.querySelectorAll(SELETOR_TOPICOS_MEU_GABARITO)).map((bloco) => {
        const texto = respostas[chaveTopico(bloco.dataset.item, bloco.dataset.topico)] || '';
        return { questao: descreverTopicoMeuGabarito(bloco),
            resposta: texto.trim() || TEXTO_EM_BRANCO_DISCURSIVA };
    });
}

/**
 * Monta os dados do PDF a partir do que a página carregou do banco.
 * @param {{dados: Object, chaveTopico: Function}} contexto - Estado da página e a chave dos
 *     tópicos.
 * @returns {Promise<Object>} Dados no formato de gerarPdfMeuGabarito.
 */
async function montarDadosMeuGabaritoDiscursiva(contexto) {
    const { dados, chaveTopico } = contexto;
    const termos = window.TERMOS_TENTATIVA;
    const rotulo = termos ? termos.rotulo(dados.tentativa, dados.maximoTentativas) : '';
    const paginaDados = document.body.dataset;
    return {
        estudante: dados.nome || '',
        turma: dados.turma || '',
        unidadeCurricular: paginaDados.uc || '',
        atividade: document.title || '',
        docente: paginaDados.docente || '',
        tentativa: rotulo.charAt(0).toUpperCase() + rotulo.slice(1),
        entregueEm: dados.entregueEm || '',
        nota: await lerNotaMeuGabaritoDiscursiva(),
        respostas: montarRespostasMeuGabaritoDiscursiva(dados.respostas || {}, chaveTopico),
    };
}

/**
 * Coloca o botão "Exportar Meu Gabarito" no painel de identificação.
 * @param {{dados: Object, chaveTopico: Function, destino: HTMLElement}} contexto - Estado da
 *     página, a chave dos tópicos e onde pôr o botão.
 */
async function iniciarMeuGabaritoDiscursiva(contexto) {
    if (typeof window.montarBotaoMeuGabarito !== 'function') {
        await carregarScriptMeuGabaritoDiscursiva(ARQUIVO_BOTAO_MEU_GABARITO_DISCURSIVA);
    }
    window.montarBotaoMeuGabarito({
        destino: contexto.destino,
        estaEntregue: Boolean(contexto.dados.entregueEm),
        obterDados: () => montarDadosMeuGabaritoDiscursiva(contexto),
    });
}

window.iniciarMeuGabaritoDiscursiva = iniciarMeuGabaritoDiscursiva;
