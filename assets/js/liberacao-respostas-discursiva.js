// Regra do gabarito nas DISCURSIVAS (carregado pelo assets/js/avaliacao-discursiva.js).
//  • PROFESSOR: no painel de identificação, botão "🔓 Liberar gabaritos (turma X)"
//    (liberacao-respostas-professor.js): libera mesmo com alunos sem entrega e encerra o
//    preenchimento da turma (2026-10-15, #175). A turma é a do combo "Turma" do Quadro de
//    Progresso — fonte única da página (2026-10-26, #399); sem turma específica escolhida
//    ("Todas as turmas"), o botão fica escondido.
//  • ALUNO: botão "🔑 Gabarito da Atividade-Respostas" (antes "Ver Gabarito"; o "📄 Exportar Meu
//    Gabarito" fica ao lado dele, no mesmo grupo — #196.5). Antes da liberação, aviso "Aguarde professor liberar os
//    gabaritos" (o banco grava o pedido em tentativaacessogabarito); depois, o padrão de resposta
//    de cada tópico aparece abaixo da resposta do aluno (função solicitar_gabarito_discursivo).
// O padrão de resposta nunca fica na página antes da liberação. Plano:
// docs/liberacao-respostas-por-turma.md. Depende de popup.js e js/supabase.js (sbH).

const ROTA_SOLICITAR_GABARITO_DISCURSIVO = '/rest/v1/rpc/solicitar_gabarito_discursivo';
const MSG_AGUARDE_GABARITO_DISCURSIVO = 'Aguarde professor liberar os gabaritos';
const CLASSE_LIBERACAO_DISCURSIVA = 'liberacao-discursiva';
const CLASSE_RESPOSTA_ESPERADA = 'resposta-esperada';
const CLASSE_GRUPO_GABARITO_ALUNO = CLASSE_LIBERACAO_DISCURSIVA + ' ' +
    CLASSE_LIBERACAO_DISCURSIVA + '--aluno';
const TEXTO_BOTAO_GABARITO_ALUNO = '🔑 Gabarito da Atividade-Respostas';
const ARQUIVO_LIBERACAO_PROFESSOR = 'liberacao-respostas-professor.js';
const ARQUIVO_LIBERACAO_NOTA = 'liberacao-nota-professor.js';
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
 * Lê a turma escolhida no combo "Turma" do Progresso da turma — fonte única da página (#399).
 * @returns {string} Código da turma escolhida, ou '' ("Todas as turmas" / sem Quadro).
 */
function lerTurmaProgressoDiscursiva() {
    return String(window.lerTurmaEscolhidaProgresso?.() || '');
}

/**
 * Professor: botões de liberar/recolher o gabarito e a nota da discursiva, na turma escolhida
 * no combo "Turma" do Quadro de Progresso (o evento `relatorio-professor:turma` atualiza os
 * botões a cada troca; sem turma específica, ficam escondidos).
 * @param {HTMLElement} painel - Painel de identificação da página.
 * @param {number} atividadeId - Id da atividade.
 */
async function montarLiberacaoProfessorDiscursiva(painel, atividadeId) {
    const area = criarElementoDiscursivaLiberacao('div', CLASSE_LIBERACAO_DISCURSIVA);
    area.appendChild(criarElementoDiscursivaLiberacao('strong', CLASSE_LIBERACAO_DISCURSIVA +
        '__titulo', '🔑 Gabarito da avaliação'));
    painel.appendChild(area);
    if (typeof window.montarLiberarGabaritoProfessor !== 'function') {
        await carregarScriptLiberacao(ARQUIVO_LIBERACAO_PROFESSOR);
    }
    const turma = lerTurmaProgressoDiscursiva();
    montarLiberarGabaritoProfessor(area, { atividadeId, turma });
    await montarLiberarNotaSemFalha(area, { atividadeId, turma });
}

/**
 * Põe o botão "Liberar notas" (só a nota, sem o padrão de resposta, #393) junto do "Liberar
 * gabaritos". Uma falha aqui não derruba o painel do professor.
 * @param {HTMLElement} area - Área do gabarito no painel.
 * @param {{atividadeId: number, turma: string}} contexto - Atividade e turma escolhida.
 */
async function montarLiberarNotaSemFalha(area, contexto) {
    try {
        if (typeof window.montarLiberarNotaProfessor !== 'function') {
            await carregarScriptLiberacao(ARQUIVO_LIBERACAO_NOTA);
        }
        window.montarLiberarNotaProfessor(area, contexto);
    } catch (erro) {
        console.warn('Liberar notas:', erro.message);
    }
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
 * Aluno: grupo com o botão "🔑 Gabarito da Atividade-Respostas" no painel (o "Exportar Meu
 * Gabarito" entra no mesmo grupo, ao lado).
 * @param {HTMLElement} painel - Painel de identificação da página.
 * @param {number} atividadeId - Id da atividade.
 */
function montarBotaoGabaritoAluno(painel, atividadeId) {
    const grupo = criarElementoDiscursivaLiberacao('div', CLASSE_GRUPO_GABARITO_ALUNO);
    const botao = criarElementoDiscursivaLiberacao('button', 'btn-export',
        TEXTO_BOTAO_GABARITO_ALUNO);
    botao.type = 'button';
    botao.addEventListener('click', () => pedirGabaritoDiscursivo(atividadeId));
    grupo.appendChild(botao);
    painel.appendChild(grupo);
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
