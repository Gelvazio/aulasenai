// Botão "📄 Exportar Meu Gabarito" do ALUNO em todas as atividades (objetivas, práticas,
// discursivas e avaliações). Fica desativado até a última tentativa liberada estar entregue e
// gera um PDF só com as respostas do próprio aluno (sem a resposta certa), para postar no
// Ambiente Virtual. Ligado por <body data-exportar-meu-gabarito="sim">; carregado pelos
// adaptadores assets/js/minhas-respostas-objetiva.js e assets/js/minhas-respostas-discursiva.js.
// O PDF é montado por assets/js/pdf-minhas-respostas.js. Regra: docs/regras/atividades.md

const BASE_SCRIPTS_MEU_GABARITO = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const ARQUIVO_PDF_MEU_GABARITO = 'pdf-minhas-respostas.js';
const ARQUIVO_CSS_MEU_GABARITO = '../css/minhas-respostas.css';
const TEXTO_BOTAO_MEU_GABARITO = '📄 Exportar Meu Gabarito';
const TEXTO_GERANDO_MEU_GABARITO = '⏳ Gerando o PDF...';
const DICA_NAO_ENTREGUE_MEU_GABARITO = 'Disponível depois de entregar a atividade.';
const DICA_ENTREGUE_MEU_GABARITO = 'Baixa um PDF com as suas respostas para postar no ' +
    'Ambiente Virtual.';
const MSG_ERRO_MEU_GABARITO = 'Não foi possível gerar o PDF com as suas respostas: ';
const CLASSE_MEU_GABARITO = 'meu-gabarito';

/**
 * Carrega um script de assets/js/ (ao lado deste) e espera terminar.
 * @param {string} arquivo - Nome do script.
 * @returns {Promise<void>} Resolve quando carregou.
 */
function carregarScriptMeuGabarito(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_MEU_GABARITO + arquivo;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Mostra um aviso pelo popup do projeto (assets/js/popup.js) ou, sem ele, no console.
 * @param {string} texto - Mensagem.
 */
function avisarMeuGabarito(texto) {
    if (typeof window.mostrarPopup === 'function') {
        window.mostrarPopup(texto, { tipo: 'erro' });
        return;
    }
    console.warn(texto);
}

/**
 * Gera o PDF: pede os dados ao adaptador da página e entrega ao gerador.
 * @param {HTMLButtonElement} botao - Botão clicado (fica ocupado enquanto gera).
 * @param {Function} obterDados - Função assíncrona do adaptador que devolve os dados do PDF.
 */
async function exportarMeuGabarito(botao, obterDados) {
    botao.disabled = true;
    botao.textContent = TEXTO_GERANDO_MEU_GABARITO;
    try {
        if (typeof window.gerarPdfMeuGabarito !== 'function') {
            await carregarScriptMeuGabarito(ARQUIVO_PDF_MEU_GABARITO);
        }
        await window.gerarPdfMeuGabarito(await obterDados());
    } catch (erro) {
        avisarMeuGabarito(MSG_ERRO_MEU_GABARITO + (erro.message || erro));
    } finally {
        botao.disabled = false;
        botao.textContent = TEXTO_BOTAO_MEU_GABARITO;
    }
}

/**
 * Cria o bloco do botão: ativo só com a atividade entregue, com a dica do porquê.
 * @param {{estaEntregue: boolean, obterDados: Function}} opcoes - Situação da entrega e o
 *     adaptador que monta os dados do PDF.
 * @returns {HTMLElement} Bloco com o botão e a dica.
 */
function criarBlocoMeuGabarito(opcoes) {
    const bloco = document.createElement('div');
    bloco.className = CLASSE_MEU_GABARITO;
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-export ' + CLASSE_MEU_GABARITO + '__botao';
    botao.textContent = TEXTO_BOTAO_MEU_GABARITO;
    botao.disabled = !opcoes.estaEntregue;
    botao.addEventListener('click', () => exportarMeuGabarito(botao, opcoes.obterDados));
    const dica = document.createElement('span');
    dica.className = CLASSE_MEU_GABARITO + '__dica';
    dica.textContent = opcoes.estaEntregue
        ? DICA_ENTREGUE_MEU_GABARITO : DICA_NAO_ENTREGUE_MEU_GABARITO;
    bloco.append(botao, dica);
    return bloco;
}

/**
 * Coloca o botão "Exportar Meu Gabarito" no destino (uma vez por página).
 * @param {{destino: HTMLElement, estaEntregue: boolean, obterDados: Function}} opcoes - Onde
 *     colocar, se a atividade está entregue e o adaptador dos dados do PDF.
 */
function montarBotaoMeuGabarito(opcoes) {
    if (!opcoes?.destino) return;
    if (document.querySelector('.' + CLASSE_MEU_GABARITO)) return;
    opcoes.destino.appendChild(criarBlocoMeuGabarito(opcoes));
}

(function incluirEstiloMeuGabarito() {
    if (!BASE_SCRIPTS_MEU_GABARITO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_MEU_GABARITO + ARQUIVO_CSS_MEU_GABARITO;
    document.head.appendChild(link);
})();

window.montarBotaoMeuGabarito = montarBotaoMeuGabarito;
