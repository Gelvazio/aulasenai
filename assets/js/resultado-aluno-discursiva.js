// Aluno: quando a avaliação discursiva já foi entregue e o professor liberou os gabaritos da turma,
// a página volta com as respostas do aluno e mostra: a nota (função notas_media_final), o
// resultado de cada alternativa corrigida pelo professor (✅ Certa / 🟡 Meia certa / ❌ Errada,
// ⏳ se ainda não corrigida), a observação da IA do porquê (balão grande) e o padrão de resposta.
// Só lê o que o RLS deixa o aluno ver (as próprias notas confirmadas). Nada é gravado.
// Carregado por assets/js/avaliacao-discursiva.js. Depende de js/supabase.js.
// Regra: docs/regras/atividades.md

const CLASSE_RESULTADO_ALUNO = 'resultado-aluno';
const ROTA_NOTA_RESULTADO = '/rest/v1/rpc/notas_media_final';
const ROTA_GABARITO_RESULTADO = '/rest/v1/rpc/solicitar_gabarito_discursivo';
const SELETOR_TOPICO_RESULTADO = '.topico-resposta';
const SELETOR_RODAPE_RESULTADO = '.topico-resposta__rodape';
const SELETOR_DESTINO_RESULTADO = '.content-section';
const SELETOR_PAINEL_RESULTADO = '#painel-discursivo';
const TOLERANCIA_RESULTADO = 0.001;
const PREFIXO_COMENTARIO_IA = /^\[IA\]\s*/;
const BASE_SCRIPTS_RESULTADO = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const RESULTADOS_ALUNO = {
    certa: { icone: '✅', texto: 'Certa', modificador: 'certa' },
    meia: { icone: '🟡', texto: 'Meia certa', modificador: 'meia' },
    errada: { icone: '❌', texto: 'Errada', modificador: 'errada' },
    pendente: { icone: '⏳', texto: 'Aguardando correção', modificador: 'pendente' },
};

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoResultado(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Chama uma função do banco (RPC) com o token do aluno.
 * @param {string} rota - Rota da RPC.
 * @param {Object} corpo - Parâmetros.
 * @returns {Promise<*>} Resposta em JSON.
 * @throws {Error} Se o banco recusar.
 */
async function chamarFuncaoResultado(rota, corpo) {
    const resposta = await fetch(SUPABASE.URL + rota, {
        method: 'POST', headers: await sbH(), body: JSON.stringify(corpo),
    });
    if (!resposta.ok) throw new Error(await resposta.text());
    return resposta.json();
}

/**
 * Lê a nota, as correções confirmadas e o gabarito (pontos e padrão de resposta) do aluno.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{nota: Object|null, correcoes: Object[], gabarito: Object[]}>} Dados.
 */
async function lerResultadoDoAluno(atividadeId) {
    const [notas, correcoes, gabarito] = await Promise.all([
        chamarFuncaoResultado(ROTA_NOTA_RESULTADO, { p_paginas: [location.pathname] }),
        sbGet('correcao_discursiva', 'select=item,topico,nota_professor,comentario' +
            '&atividade_id=eq.' + atividadeId),
        chamarFuncaoResultado(ROTA_GABARITO_RESULTADO, { p_atividade: atividadeId }),
    ]);
    return { nota: notas[0] || null, correcoes, gabarito: gabarito || [] };
}

/**
 * Classifica a alternativa pela nota do professor.
 * @param {Object|undefined} correcao - Linha {nota_professor, comentario}.
 * @param {number} pontos - Pontos da alternativa.
 * @returns {Object} Item de RESULTADOS_ALUNO.
 */
function classificarResultadoAluno(correcao, pontos) {
    const temNota = correcao && correcao.nota_professor !== null &&
        correcao.nota_professor !== undefined;
    if (!temNota) return RESULTADOS_ALUNO.pendente;
    const nota = Number(correcao.nota_professor);
    if (nota >= pontos - TOLERANCIA_RESULTADO) return RESULTADOS_ALUNO.certa;
    if (nota > 0) return RESULTADOS_ALUNO.meia;
    return RESULTADOS_ALUNO.errada;
}

/**
 * Cria o selo da alternativa com o balão da observação da IA.
 * @param {Object|undefined} correcao - Linha {nota_professor, comentario}.
 * @param {Object} linhaGabarito - Linha {pontos, resposta_esperada}.
 * @returns {HTMLElement} Selo pronto.
 */
function criarSeloResultado(correcao, linhaGabarito) {
    const pontos = Number(linhaGabarito.pontos);
    const resultado = classificarResultadoAluno(correcao, pontos);
    const selo = criarElementoResultado('span', CLASSE_RESULTADO_ALUNO + '__selo ' +
        CLASSE_RESULTADO_ALUNO + '__selo--' + resultado.modificador);
    selo.tabIndex = 0;
    const nota = correcao?.nota_professor === null || correcao?.nota_professor === undefined
        ? '' : ' · ' + String(Number(correcao.nota_professor)).replace('.', ',') + '/' +
            String(pontos).replace('.', ',');
    selo.textContent = resultado.icone + ' ' + resultado.texto + nota;
    const comentario = (correcao?.comentario || '').replace(PREFIXO_COMENTARIO_IA, '');
    if (!comentario) return selo;

    const balao = criarElementoResultado('span', CLASSE_RESULTADO_ALUNO + '__balao');
    balao.setAttribute('role', 'tooltip');
    balao.append(criarElementoResultado('strong', CLASSE_RESULTADO_ALUNO + '__balao-titulo',
        resultado.icone + ' ' + resultado.texto + ' — por quê:'),
    criarElementoResultado('span', '', comentario));
    selo.appendChild(balao);
    return selo;
}

/**
 * Mostra em cada alternativa o selo do resultado e o padrão de resposta.
 * @param {Object[]} correcoes - Correções confirmadas do aluno.
 * @param {Object[]} gabarito - Linhas {item, topico, pontos, resposta_esperada}.
 */
function mostrarResultadoNasAlternativas(correcoes, gabarito) {
    const chave = (linha) => linha.item + '|' + linha.topico;
    const notas = new Map(correcoes.map((linha) => [chave(linha), linha]));
    gabarito.forEach((linha) => {
        const bloco = document.querySelector(SELETOR_TOPICO_RESULTADO + '[data-item="' +
            linha.item + '"][data-topico="' + linha.topico + '"]');
        const rodape = bloco?.querySelector(SELETOR_RODAPE_RESULTADO);
        if (!rodape) return;
        rodape.prepend(criarSeloResultado(notas.get(chave(linha)), linha));
        // Mesma classe do botão "Ver Gabarito" (resposta-esperada): não duplica a caixa.
        const esperada = criarElementoResultado('div', 'resposta-esperada ' +
            CLASSE_RESULTADO_ALUNO + '__esperada');
        esperada.append(criarElementoResultado('strong', '', '✅ Resposta esperada: '),
            document.createTextNode(linha.resposta_esperada || '—'));
        bloco.appendChild(esperada);
    });
}

/**
 * Monta o quadro da nota do aluno (topo da prova).
 * @param {Object|null} nota - Linha {nota, situacao} de notas_media_final.
 * @returns {HTMLElement} Quadro pronto.
 */
function montarQuadroNota(nota) {
    const quadro = criarElementoResultado('section', 'aula-card ' + CLASSE_RESULTADO_ALUNO);
    const temNota = nota?.situacao === 'NOTA';
    const texto = temNota
        ? '🎓 Sua nota: ' + Number(nota.nota).toLocaleString('pt-BR',
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' (máximo 10)'
        : '⏳ Sua nota ainda está aguardando a correção do professor.';
    quadro.append(criarElementoResultado('h2', CLASSE_RESULTADO_ALUNO + '__nota', texto),
        criarElementoResultado('p', CLASSE_RESULTADO_ALUNO + '__dica', 'Passe o mouse (ou toque) ' +
            'no resultado de cada alternativa para ver a observação da IA do porquê ela está ' +
            'certa, meia certa ou errada.'));
    return quadro;
}

/**
 * Mostra ao aluno a prova corrigida: nota, resultado por alternativa, observação da IA e
 * padrão de resposta (só com a entrega feita e o gabarito liberado).
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarResultadoDoAluno(atividadeId) {
    const destino = document.querySelector(SELETOR_DESTINO_RESULTADO);
    if (!destino || document.querySelector('.' + CLASSE_RESULTADO_ALUNO)) return;

    const { nota, correcoes, gabarito } = await lerResultadoDoAluno(atividadeId);
    const painel = destino.querySelector(SELETOR_PAINEL_RESULTADO);
    destino.insertBefore(montarQuadroNota(nota), painel ? painel.nextSibling : destino.firstChild);
    mostrarResultadoNasAlternativas(correcoes, gabarito);
}

(function incluirEstiloResultadoAluno() {
    if (!BASE_SCRIPTS_RESULTADO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_RESULTADO + '../css/resultado-aluno-discursiva.css';
    document.head.appendChild(link);
})();

window.mostrarResultadoDoAluno = mostrarResultadoDoAluno;
