// Professor: "Suspeita de Cópia" nas avaliações discursivas (tarefa #129, Etapa 256).
// A IA grava as suspeitas em suspeita_copia_discursiva (procedimento:
// docs/regras/suspeita-copia-discursiva.md); só o professor lê (RLS). Este módulo:
//   1. coluna "Suspeita de Cópia" do Progresso da turma (progresso-turma-global.js), com quem a
//      resposta parece; ao passar o mouse, o nome e a resposta do outro aluno;
//   2. alerta vermelho piscando na questão do aluno escolhido no combo (avaliacao-discursiva.js),
//      com os botões "Não é cópia" / "É cópia" (função validar_suspeita_copia: "É cópia" grava
//      nota_professor = 0 naquele tópico).
// Depende de js/supabase.js (sbGet, obterClienteSupabase) e assets/js/popup.js.

const TABELA_SUSPEITA_COPIA = 'suspeita_copia_discursiva';
const RPC_VALIDAR_SUSPEITA_COPIA = 'validar_suspeita_copia';
const SITUACAO_PENDENTE_COPIA = 'pendente';
const SITUACAO_COPIA = 'copia';
const SITUACAO_NAO_COPIA = 'nao_copia';
const TITULO_COLUNA_SUSPEITA = 'Suspeita de Cópia';
const CLASSE_AREA_SUSPEITA = 'progresso-turma--com-suspeita';
const CLASSE_CELULA_SUSPEITA = 'suspeita-copia__celula';
const CLASSE_ITEM_SUSPEITA = 'suspeita-copia__item';
const CLASSE_QUESTAO_SUSPEITA = 'questao-discursiva--suspeita-copia';
const CLASSE_ALERTA_SUSPEITA = 'suspeita-copia__alerta';
const SELETOR_QUESTAO_SUSPEITA = '.questao-discursiva[data-item="';
const TEXTO_ALERTA_SUSPEITA = '🚨 SUSPEITA DE CÓPIA! PROFESSOR PRECISA VALIDAR!';
const TEXTO_COPIA_CONFIRMADA = '❌ Cópia confirmada pelo professor — nota da questão zerada.';
const TEXTO_SEM_SUSPEITA = '—';
const TITULO_POPUP_SUSPEITA = 'Suspeita de cópia';
const MSG_CONFIRMAR_COPIA = 'Confirmar que a questão foi COPIADA? A nota desta questão será ' +
    'zerada (nota do professor = 0) e não poderá mais ser alterada.';
const DIGITOS_QUESTAO_SUSPEITA = 2;
const ARQUIVO_CSS_SUSPEITA = '../css/suspeita-copia.css';
const BASE_SCRIPTS_SUSPEITA = document.currentScript?.src.replace(/[^/]*$/, '') || '';

const estadoSuspeitaCopia = { porAluno: new Map(), nomes: new Map() };

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoSuspeita(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

/**
 * Número da questão com dois dígitos (3 → "Q03").
 * @param {number} item - Número do item.
 * @returns {string} Rótulo da questão.
 */
function rotularQuestaoSuspeita(item) {
    return 'Q' + String(item).padStart(DIGITOS_QUESTAO_SUSPEITA, '0');
}

/**
 * Lê as suspeitas ainda válidas (pendentes ou confirmadas) da atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Linhas de suspeita_copia_discursiva.
 */
async function lerLinhasSuspeita(atividadeId) {
    return sbGet(TABELA_SUSPEITA_COPIA, 'select=aluno_id,tentativa,item,topico,' +
        'aluno_parecido_id,semelhanca,motivo,situacao&atividade_id=eq.' + atividadeId +
        '&situacao=neq.' + SITUACAO_NAO_COPIA + '&order=item,topico');
}

/**
 * Lê os nomes dos alunos que ainda não estão na memória.
 * @param {string[]} ids - Ids dos alunos.
 */
async function carregarNomesSuspeita(ids) {
    const novos = [...new Set(ids)].filter((id) => !estadoSuspeitaCopia.nomes.has(id));
    if (!novos.length) return;

    const alunos = await sbGet('aluno', 'select=id,nome&id=in.(' + novos.join(',') + ')');
    alunos.forEach((aluno) => estadoSuspeitaCopia.nomes.set(aluno.id, aluno.nome));
}

/**
 * Lê as respostas dos alunos parecidos (para mostrar ao passar o mouse).
 * @param {number} atividadeId - Id da atividade.
 * @param {string[]} ids - Ids dos alunos parecidos.
 * @returns {Promise<Map<string, string>>} Texto por "aluno|item|tópico" (maior tentativa).
 */
async function lerRespostasParecidas(atividadeId, ids) {
    const textos = new Map();
    const unicos = [...new Set(ids)];
    if (!unicos.length) return textos;

    const linhas = await sbGet('resposta_discursiva', 'select=aluno_id,tentativa,item,topico,' +
        'texto&atividade_id=eq.' + atividadeId + '&aluno_id=in.(' + unicos.join(',') + ')' +
        '&order=tentativa');
    linhas.forEach((linha) => textos.set(
        linha.aluno_id + '|' + linha.item + '|' + linha.topico, linha.texto || ''));
    return textos;
}

/**
 * Lê do banco as suspeitas da atividade e as agrupa por aluno (com nome e resposta do outro).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Map<string, Object[]>>} Suspeitas por "aluno|tentativa".
 */
async function lerSuspeitasDeCopia(atividadeId) {
    const linhas = await lerLinhasSuspeita(atividadeId);
    const parecidos = linhas.map((linha) => linha.aluno_parecido_id);
    const [textos] = await Promise.all([lerRespostasParecidas(atividadeId, parecidos),
        carregarNomesSuspeita(parecidos)]);
    const porAluno = new Map();
    linhas.forEach((linha) => {
        const chave = linha.aluno_id + '|' + linha.tentativa;
        const lista = porAluno.get(chave) || [];
        lista.push({ ...linha,
            nomeParecido: estadoSuspeitaCopia.nomes.get(linha.aluno_parecido_id) || 'outro aluno',
            respostaParecida: textos.get(linha.aluno_parecido_id + '|' + linha.item + '|' +
                linha.topico) || '' });
        porAluno.set(chave, lista);
    });
    estadoSuspeitaCopia.porAluno = porAluno;
    return porAluno;
}

/**
 * Texto de dica (mouse) com o nome e a resposta do outro aluno.
 * @param {Object} suspeita - Suspeita com nomeParecido, respostaParecida, semelhanca e motivo.
 * @returns {string} Dica.
 */
function montarDicaSuspeita(suspeita) {
    const percentual = Math.round(Number(suspeita.semelhanca) * 100);
    return 'Parece com: ' + suspeita.nomeParecido + ' (' + percentual + '% igual)\n\n' +
        'Resposta de ' + suspeita.nomeParecido + ':\n' + (suspeita.respostaParecida || '(vazia)') +
        (suspeita.motivo ? '\n\nIA: ' + suspeita.motivo : '');
}

/**
 * Cria a etiqueta de uma suspeita na célula do Progresso ("⚠️ Q03 ≈ Nome").
 * @param {Object} suspeita - Suspeita do aluno.
 * @returns {HTMLElement} Etiqueta com dica.
 */
function criarEtiquetaSuspeita(suspeita) {
    const confirmada = suspeita.situacao === SITUACAO_COPIA;
    const texto = (confirmada ? '❌ ' : '⚠️ ') + rotularQuestaoSuspeita(suspeita.item) +
        (confirmada ? ' cópia' : ' ≈ ' + suspeita.nomeParecido);
    const etiqueta = criarElementoSuspeita('span', CLASSE_ITEM_SUSPEITA + (confirmada
        ? ' ' + CLASSE_ITEM_SUSPEITA + '--confirmada' : ''), texto);
    etiqueta.title = montarDicaSuspeita(suspeita);
    return etiqueta;
}

/**
 * Célula "Suspeita de Cópia" de um aluno no Progresso da turma.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno do painel.
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaSuspeitaCopia(aluno) {
    const celula = criarElementoSuspeita('div', CLASSE_CELULA_SUSPEITA);
    const lista = estadoSuspeitaCopia.porAluno.get(aluno.alunoId + '|' + aluno.tentativa) || [];
    if (!lista.length) {
        celula.textContent = TEXTO_SEM_SUSPEITA;
        return celula;
    }
    celula.append(...lista.map(criarEtiquetaSuspeita));
    return celula;
}

/**
 * Coluna extra do Progresso da turma (contrato de progresso-turma-global.js).
 * @returns {{titulo: string, classeArea: string, atualizar: Function, montarCelula: Function}}
 */
function criarColunaSuspeitaCopia() {
    return { titulo: TITULO_COLUNA_SUSPEITA, classeArea: CLASSE_AREA_SUSPEITA,
        atualizar: lerSuspeitasDeCopia, montarCelula: montarCelulaSuspeitaCopia };
}

/**
 * Grava a validação do professor (função do banco).
 * @param {{atividadeId: number, aluno: Object, suspeita: Object, eCopia: boolean}} pedido
 * @returns {Promise<void>}
 * @throws {Error} Se o banco recusar (ex.: nota do professor já confirmada).
 */
async function gravarValidacaoSuspeita({ atividadeId, aluno, suspeita, eCopia }) {
    const { error } = await obterClienteSupabase().rpc(RPC_VALIDAR_SUSPEITA_COPIA, {
        p_atividade: atividadeId, p_aluno: aluno.alunoId, p_tentativa: aluno.tentativa,
        p_item: suspeita.item, p_topico: suspeita.topico, p_e_copia: eCopia });
    if (error) throw new Error(error.message);
}

/**
 * Trata o clique em "Não é cópia" / "É cópia" (com confirmação para "É cópia").
 * @param {Object} contexto - atividadeId, aluno, suspeita, eCopia e aoValidar.
 */
async function aoValidarSuspeita(contexto) {
    const confirmou = !contexto.eCopia || await confirmarPopup(MSG_CONFIRMAR_COPIA,
        { tipo: 'aviso', titulo: TITULO_POPUP_SUSPEITA, textoConfirmar: 'É cópia' });
    if (!confirmou) return;

    try {
        await gravarValidacaoSuspeita(contexto);
        await mostrarSuspeitasNaProva(contexto.aluno, contexto.atividadeId, contexto.aoValidar);
        await contexto.aoValidar?.();
    } catch (erro) {
        await mostrarPopup('Não foi possível validar: ' + erro.message,
            { tipo: 'erro', titulo: TITULO_POPUP_SUSPEITA });
    }
}

/**
 * Cria um botão de validação do alerta.
 * @param {string} texto - Rótulo.
 * @param {string} modificador - Modificador BEM do botão.
 * @param {Function} acao - Ação do clique.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoSuspeita(texto, modificador, acao) {
    const botao = criarElementoSuspeita('button',
        'suspeita-copia__botao suspeita-copia__botao--' + modificador, texto);
    botao.type = 'button';
    botao.addEventListener('click', acao);
    return botao;
}

/**
 * Monta o alerta de uma suspeita embaixo da questão.
 * @param {Object} suspeita - Suspeita do aluno.
 * @param {Object} contexto - atividadeId, aluno e aoValidar.
 * @returns {HTMLElement} Alerta.
 */
function montarAlertaSuspeita(suspeita, contexto) {
    const confirmada = suspeita.situacao === SITUACAO_COPIA;
    const alerta = criarElementoSuspeita('div', CLASSE_ALERTA_SUSPEITA +
        (confirmada ? ' ' + CLASSE_ALERTA_SUSPEITA + '--confirmada' : ''));
    alerta.appendChild(criarElementoSuspeita('strong', 'suspeita-copia__titulo',
        confirmada ? TEXTO_COPIA_CONFIRMADA : TEXTO_ALERTA_SUSPEITA));
    const parecido = criarElementoSuspeita('span', 'suspeita-copia__parecido',
        'Parece com: ' + suspeita.nomeParecido + ' (passe o mouse para ver a resposta)');
    parecido.title = montarDicaSuspeita(suspeita);
    alerta.appendChild(parecido);
    if (confirmada) return alerta;

    const validar = (eCopia) => aoValidarSuspeita({ ...contexto, suspeita, eCopia });
    const botoes = criarElementoSuspeita('div', 'suspeita-copia__botoes');
    botoes.append(criarBotaoSuspeita('✅ Não é cópia', 'nao', () => validar(false)),
        criarBotaoSuspeita('❌ É cópia', 'sim', () => validar(true)));
    alerta.appendChild(botoes);
    return alerta;
}

/**
 * Tira da prova os alertas e as marcas de suspeita desenhados antes.
 */
function limparSuspeitasDaProva() {
    document.querySelectorAll('.' + CLASSE_ALERTA_SUSPEITA).forEach((alerta) => alerta.remove());
    document.querySelectorAll('.' + CLASSE_QUESTAO_SUSPEITA)
        .forEach((questao) => questao.classList.remove(CLASSE_QUESTAO_SUSPEITA));
}

/**
 * Desenha (ou limpa) os alertas de suspeita nas questões do aluno escolhido no combo.
 * @param {{alunoId: string, tentativa: number}|null} aluno - Aluno escolhido (null limpa).
 * @param {number} atividadeId - Id da atividade.
 * @param {Function} [aoValidar] - Chamada depois de o professor validar (atualiza a tela).
 */
async function mostrarSuspeitasNaProva(aluno, atividadeId, aoValidar) {
    limparSuspeitasDaProva();
    if (!aluno || !atividadeId) return;

    const porAluno = await lerSuspeitasDeCopia(atividadeId);
    const lista = porAluno.get(aluno.alunoId + '|' + aluno.tentativa) || [];
    lista.forEach((suspeita) => {
        const questao = document.querySelector(SELETOR_QUESTAO_SUSPEITA + suspeita.item + '"]');
        if (!questao) return;

        const pendente = suspeita.situacao === SITUACAO_PENDENTE_COPIA;
        if (pendente) questao.classList.add(CLASSE_QUESTAO_SUSPEITA);
        questao.appendChild(montarAlertaSuspeita(suspeita, { atividadeId, aluno, aoValidar }));
    });
}

(function incluirEstiloSuspeitaCopia() {
    if (!BASE_SCRIPTS_SUSPEITA) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_SUSPEITA + ARQUIVO_CSS_SUSPEITA;
    document.head.appendChild(link);
})();

window.criarColunaSuspeitaCopia = criarColunaSuspeitaCopia;
window.mostrarSuspeitasNaProva = mostrarSuspeitasNaProva;
