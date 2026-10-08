// Regra do gabarito nas DISCURSIVAS (carregado pelo assets/js/avaliacao-discursiva.js).
//  • PROFESSOR: no painel de identificação, lista "Turma" + botão "🔓 Liberar gabaritos (turma X)"
//    (liberacao-respostas-professor.js): só libera com todos os alunos da turma com entrega.
//  • ALUNO: botão "🔑 Ver Gabarito". Antes da liberação, aviso "Aguarde professor liberar os
//    gabaritos" (o banco grava o pedido em tentativaacessogabarito); depois, o padrão de resposta
//    de cada tópico aparece abaixo da resposta do aluno (função solicitar_gabarito_discursivo).
// O padrão de resposta nunca fica na página antes da liberação. Plano:
// docs/liberacao-respostas-por-turma.md. Depende de popup.js e js/supabase.js (sbGet, sbH).

const ROTA_SOLICITAR_GABARITO_DISCURSIVO = '/rest/v1/rpc/solicitar_gabarito_discursivo';
const MSG_AGUARDE_GABARITO_DISCURSIVO = 'Aguarde professor liberar os gabaritos';
const CLASSE_LIBERACAO_DISCURSIVA = 'liberacao-discursiva';
const CLASSE_RESPOSTA_ESPERADA = 'resposta-esperada';
const ARQUIVO_LIBERACAO_PROFESSOR = 'liberacao-respostas-professor.js';
const ARQUIVO_TURMA_UNIDADE_LIBERACAO = 'unidade.js';
const EVENTO_TURMA_LIBERACAO_DISCURSIVA = 'relatorio-professor:turma';
const BASE_SCRIPTS_LIBERACAO = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoDiscursivaLiberacao(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Carrega um script de assets/js/ (uma vez só).
 * @param {string} arquivo - Nome do script.
 * @returns {Promise<void>} Resolve quando carregou.
 */
function carregarScriptLiberacao(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_LIBERACAO + arquivo;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Lista as turmas vinculadas ao professor (o administrador lê todos os vínculos), com o texto
 * "código — nome · UNIDADE" (assets/js/unidade.js).
 * @returns {Promise<{codigo: string, rotulo: string}[]>} Turmas sem repetição, em ordem.
 */
async function listarTurmasLiberacaoDiscursiva() {
    if (typeof acrescentarUnidadeTurma !== 'function') {
        await carregarScriptLiberacao(ARQUIVO_TURMA_UNIDADE_LIBERACAO);
    }
    const [vinculos, turmas] = await Promise.all([sbGet('turmaprofessor', 'select=turma_codigo'),
        sbGet('turma', 'select=codigo,nome,turno,local')]);
    const porCodigo = new Map(turmas.map((turma) => [turma.codigo, turma]));
    const codigos = [...new Set(vinculos.map((vinculo) => vinculo.turma_codigo))].sort();
    return codigos.map((codigo) => {
        const turma = porCodigo.get(codigo) || { codigo };
        return { codigo, rotulo: acrescentarUnidadeTurma(codigo + ' — ' + (turma.nome || ''), turma) };
    });
}

/**
 * Monta a lista "Turma" do professor; trocar a turma atualiza o botão de liberar.
 * @param {{codigo: string, rotulo: string}[]} turmas - Turmas da lista.
 * @returns {HTMLLabelElement} Lista pronta.
 */
function criarListaTurmasLiberacao(turmas) {
    const etiqueta = criarElementoDiscursivaLiberacao('label',
        CLASSE_LIBERACAO_DISCURSIVA + '__turma', 'Turma: ');
    const lista = document.createElement('select');
    turmas.forEach((turma) => lista.appendChild(new Option(turma.rotulo, turma.codigo)));
    lista.addEventListener('change', () => document.dispatchEvent(new CustomEvent(
        EVENTO_TURMA_LIBERACAO_DISCURSIVA, { detail: { turma: lista.value } })));
    etiqueta.appendChild(lista);
    return etiqueta;
}

/**
 * Professor: lista de turmas + botão de liberar/recolher o gabarito da discursiva.
 * @param {HTMLElement} painel - Painel de identificação da página.
 * @param {number} atividadeId - Id da atividade.
 */
async function montarLiberacaoProfessorDiscursiva(painel, atividadeId) {
    const turmas = await listarTurmasLiberacaoDiscursiva();
    const area = criarElementoDiscursivaLiberacao('div', CLASSE_LIBERACAO_DISCURSIVA);
    area.appendChild(criarElementoDiscursivaLiberacao('strong', CLASSE_LIBERACAO_DISCURSIVA +
        '__titulo', '🔑 Gabarito da avaliação'));
    painel.appendChild(area);
    if (!turmas.length) {
        area.appendChild(criarElementoDiscursivaLiberacao('span', CLASSE_LIBERACAO_DISCURSIVA +
            '__aviso', 'Você não tem turmas vinculadas.'));
        return;
    }
    if (typeof window.montarLiberarGabaritoProfessor !== 'function') {
        await carregarScriptLiberacao(ARQUIVO_LIBERACAO_PROFESSOR);
    }
    area.appendChild(criarListaTurmasLiberacao(turmas));
    montarLiberarGabaritoProfessor(area, { atividadeId, turma: turmas[0].codigo });
}

/**
 * Mostra o padrão de resposta abaixo de cada tópico (substitui o que já estiver na tela).
 * @param {Object[]} linhas - Linhas {item, topico, pontos, resposta_esperada} do banco.
 */
function mostrarRespostasEsperadas(linhas) {
    document.querySelectorAll('.' + CLASSE_RESPOSTA_ESPERADA).forEach((caixa) => caixa.remove());
    linhas.forEach((linha) => {
        const topico = document.querySelector('.topico-resposta[data-item="' + linha.item +
            '"][data-topico="' + linha.topico + '"]');
        if (!topico) return;

        const caixa = criarElementoDiscursivaLiberacao('div', CLASSE_RESPOSTA_ESPERADA);
        const pontos = String(linha.pontos).replace('.', ',');
        caixa.append(criarElementoDiscursivaLiberacao('strong', CLASSE_RESPOSTA_ESPERADA +
            '__rotulo', '✅ Resposta esperada (' + pontos + ' pt): '),
        document.createTextNode(linha.resposta_esperada || '—'));
        topico.appendChild(caixa);
    });
}

/**
 * Aluno pede o gabarito: liberado = mostra o padrão de resposta; senão, aviso de aguardar
 * (o banco grava o pedido).
 * @param {number} atividadeId - Id da atividade.
 */
async function pedirGabaritoDiscursivo(atividadeId) {
    try {
        const resposta = await fetch(SUPABASE.URL + ROTA_SOLICITAR_GABARITO_DISCURSIVO, {
            method: 'POST',
            headers: await sbH(),
            body: JSON.stringify({ p_atividade: atividadeId }),
        });
        const dados = await resposta.json().catch(() => null);
        if (!resposta.ok) throw new Error(dados?.message || 'erro ' + resposta.status);
        if (!dados?.length) {
            await mostrarPopup(MSG_AGUARDE_GABARITO_DISCURSIVO, { tipo: 'aviso', titulo: 'Gabarito' });
            return;
        }
        mostrarRespostasEsperadas(dados);
    } catch (erro) {
        await mostrarPopup('Não foi possível ler o gabarito: ' + erro.message, { tipo: 'erro' });
    }
}

/**
 * Aluno: botão "🔑 Ver Gabarito" no painel.
 * @param {HTMLElement} painel - Painel de identificação da página.
 * @param {number} atividadeId - Id da atividade.
 */
function montarBotaoGabaritoAluno(painel, atividadeId) {
    const botao = criarElementoDiscursivaLiberacao('button', 'btn-export', '🔑 Ver Gabarito');
    botao.type = 'button';
    botao.addEventListener('click', () => pedirGabaritoDiscursivo(atividadeId));
    painel.appendChild(botao);
}

/**
 * Ponto de entrada: monta a parte do gabarito conforme o perfil. Falhas não quebram a página.
 * @param {HTMLElement} painel - Painel de identificação da página.
 * @param {{logado: boolean, ehProfessor: boolean, atividadeId: number}} dados - Estado da página.
 */
async function montarLiberacaoRespostasDiscursiva(painel, dados) {
    if (!painel || !dados?.logado || !dados.atividadeId) return;
    try {
        if (dados.ehProfessor) {
            await montarLiberacaoProfessorDiscursiva(painel, dados.atividadeId);
            return;
        }
        montarBotaoGabaritoAluno(painel, dados.atividadeId);
    } catch (erro) {
        console.warn('Gabarito da discursiva indisponível:', erro.message);
    }
}

(function incluirEstiloLiberacaoDiscursiva() {
    if (!BASE_SCRIPTS_LIBERACAO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_LIBERACAO + '../css/liberacao-respostas-discursiva.css';
    document.head.appendChild(link);
})();

window.montarLiberacaoRespostasDiscursiva = montarLiberacaoRespostasDiscursiva;
