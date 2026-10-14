// Aluno: quando a avaliação discursiva já foi entregue e o professor liberou os gabaritos da turma,
// a página volta com as respostas do aluno e mostra: a nota (função notas_media_final), o
// resultado de cada alternativa corrigida pelo professor (✅ Certa / 🟡 Meia certa / ❌ Errada,
// ⏳ se ainda não corrigida), ABAIXO da alternativa errada ou meia certa a explicação do porquê
// (sem dizer que foi a IA) e, se o professor mudou a nota, a justificativa da mudança; o botão
// "🕒 Histórico" abre a linha do tempo. Mostra também o padrão de resposta (tarefa #156) e o
// ON/OFF "Mostrar Certas" (mostrar-certas-aluno-discursiva.js, tarefa #158).
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
const TABELA_HISTORICO_RESULTADO = 'correcao_discursiva_historico';
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
 * Lê a nota, as correções confirmadas, o histórico de mudanças e o gabarito (pontos e padrão de
 * resposta) do aluno.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{nota: Object|null, correcoes: Object[], gabarito: Object[],
 *     historico: Object[]}>} Dados.
 */
async function lerResultadoDoAluno(atividadeId) {
    const [notas, correcoes, gabarito, historico] = await Promise.all([
        chamarFuncaoResultado(ROTA_NOTA_RESULTADO, { p_paginas: [location.pathname] }),
        sbGet('correcao_discursiva', 'select=item,topico,nota_professor,comentario' +
            '&atividade_id=eq.' + atividadeId),
        chamarFuncaoResultado(ROTA_GABARITO_RESULTADO, { p_atividade: atividadeId }),
        sbGet(TABELA_HISTORICO_RESULTADO, 'select=item,topico,tipo,nota_anterior,nota_nova,' +
            'justificativa,feito_em&atividade_id=eq.' + atividadeId +
            '&order=feito_em.asc,id.asc').catch(() => []),
    ]);
    return { nota: notas[0] || null, correcoes, gabarito: gabarito || [], historico };
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
 * Cria o selo do resultado da alternativa (✅ Certa, 🟡 Meia certa, ❌ Errada ou ⏳).
 * @param {Object|undefined} correcao - Linha {nota_professor, comentario}.
 * @param {Object} linhaGabarito - Linha {pontos, resposta_esperada}.
 * @returns {HTMLElement} Selo pronto.
 */
function criarSeloResultado(correcao, linhaGabarito) {
    const pontos = Number(linhaGabarito.pontos);
    const resultado = classificarResultadoAluno(correcao, pontos);
    const selo = criarElementoResultado('span', CLASSE_RESULTADO_ALUNO + '__selo ' +
        CLASSE_RESULTADO_ALUNO + '__selo--' + resultado.modificador);
    const nota = correcao?.nota_professor === null || correcao?.nota_professor === undefined
        ? '' : ' · ' + String(Number(correcao.nota_professor)).replace('.', ',') + '/' +
            String(pontos).replace('.', ',');
    selo.textContent = resultado.icone + ' ' + resultado.texto + nota;
    return selo;
}

/**
 * Monta o texto abaixo da alternativa: a explicação do porquê (errada ou meia certa, ou quando a
 * nota mudou) e, se o professor mudou a nota, "estava X e foi considerada Y pelo motivo: ...".
 * Nunca diz que a explicação veio da IA.
 * @param {{correcao: Object|undefined, pontos: number, mudanca: Object|undefined}} dados -
 *     Correção, pontos e a última mudança de nota (se houver).
 * @returns {HTMLElement|null} Bloco de explicação, ou null se não houver o que mostrar.
 */
function criarExplicacaoResultado(dados) {
    const resultado = classificarResultadoAluno(dados.correcao, dados.pontos);
    if (resultado === RESULTADOS_ALUNO.pendente) return null;

    const ehErradaOuMeia = resultado === RESULTADOS_ALUNO.errada ||
        resultado === RESULTADOS_ALUNO.meia;
    const comentario = (dados.correcao?.comentario || '').replace(PREFIXO_COMENTARIO_IA, '');
    const mostrarComentario = Boolean(comentario) && (ehErradaOuMeia || Boolean(dados.mudanca));
    if (!mostrarComentario && !dados.mudanca) return null;

    const bloco = criarElementoResultado('div', CLASSE_RESULTADO_ALUNO + '__explicacao');
    if (mostrarComentario) {
        bloco.append(criarElementoResultado('strong', '', '💬 Explicação: '),
            document.createTextNode(comentario));
    }
    if (dados.mudanca) bloco.appendChild(criarJustificativaResultado(dados.mudanca, dados.pontos));
    return bloco;
}

/**
 * Cria o texto "Esta alternativa estava X, e foi considerada Y pelo motivo: ...".
 * @param {Object} mudanca - Evento {nota_anterior, nota_nova, justificativa}.
 * @param {number} pontos - Pontos da alternativa.
 * @returns {HTMLElement} Parágrafo pronto.
 */
function criarJustificativaResultado(mudanca, pontos) {
    const nome = (nota) => window.rotuloDaNotaHistorico(nota, pontos).replace(/^\S+\s/, '')
        .toLowerCase();
    return criarElementoResultado('p', CLASSE_RESULTADO_ALUNO + '__justificativa',
        'Esta alternativa estava ' + nome(mudanca.nota_anterior) + ', e foi considerada ' +
        nome(mudanca.nota_nova) + ' pelo motivo: ' + mudanca.justificativa);
}

/**
 * Agrupa o histórico por alternativa.
 * @param {Object[]} historico - Eventos do aluno, do mais antigo ao mais novo.
 * @returns {Map<string, Object[]>} Eventos por "item|topico".
 */
function agruparHistoricoResultado(historico) {
    const grupos = new Map();
    historico.forEach((evento) => {
        const chave = evento.item + '|' + evento.topico;
        grupos.set(chave, (grupos.get(chave) || []).concat(evento));
    });
    return grupos;
}

/**
 * Mostra em cada alternativa o selo, o botão "Histórico" (se houver eventos), a explicação, a
 * justificativa da mudança e o padrão de resposta.
 * @param {{atividadeId: number, correcoes: Object[], gabarito: Object[], historico: Object[]}}
 *     dados - Atividade e dados lidos.
 */
function mostrarResultadoNasAlternativas(dados) {
    const chave = (linha) => linha.item + '|' + linha.topico;
    const notas = new Map(dados.correcoes.map((linha) => [chave(linha), linha]));
    const eventos = agruparHistoricoResultado(dados.historico);
    dados.gabarito.forEach((linha) => {
        const bloco = document.querySelector(SELETOR_TOPICO_RESULTADO + '[data-item="' +
            linha.item + '"][data-topico="' + linha.topico + '"]');
        const rodape = bloco?.querySelector(SELETOR_RODAPE_RESULTADO);
        if (!rodape) return;
        montarResultadoDaAlternativa({ bloco, rodape, linha, atividadeId: dados.atividadeId,
            correcao: notas.get(chave(linha)), eventos: eventos.get(chave(linha)) || [] });
    });
}

/**
 * Monta o resultado de uma alternativa na tela.
 * @param {{bloco: HTMLElement, rodape: HTMLElement, linha: Object, atividadeId: number,
 *     correcao: Object|undefined, eventos: Object[]}} dados - Elementos, gabarito, correção e
 *     eventos do histórico da alternativa.
 */
function montarResultadoDaAlternativa(dados) {
    const { bloco, rodape, linha, correcao, eventos } = dados;
    const pontos = Number(linha.pontos);
    rodape.prepend(criarSeloResultado(correcao, linha));
    if (eventos.length) {
        rodape.appendChild(window.criarBotaoHistoricoNota({ pontos, temEventos: true,
            alternativa: { atividade_id: dados.atividadeId, item: linha.item,
                topico: linha.topico } }));
    }
    const mudanca = eventos.filter((evento) => evento.tipo === 'mudanca').pop();
    const explicacao = criarExplicacaoResultado({ correcao, pontos, mudanca });
    if (explicacao) bloco.appendChild(explicacao);
    // Mesma classe do botão "Ver Gabarito" (resposta-esperada): não duplica a caixa.
    const esperada = criarElementoResultado('div', 'resposta-esperada ' +
        CLASSE_RESULTADO_ALUNO + '__esperada');
    esperada.append(criarElementoResultado('strong', '', '✅ Resposta esperada: '),
        document.createTextNode(linha.resposta_esperada || '—'));
    bloco.appendChild(esperada);
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
        criarElementoResultado('p', CLASSE_RESULTADO_ALUNO + '__dica', 'Clique ' +
            'no botão Histórico de cada alternativa para ver as mudanças da nota; abaixo das ' +
            'alternativas erradas ou meia certas está a explicação do porquê.'));
    return quadro;
}

/**
 * Mostra ao aluno a prova corrigida: nota, resultado por alternativa, explicação, histórico e
 * padrão de resposta (só com a entrega feita e o gabarito liberado).
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarResultadoDoAluno(atividadeId) {
    const destino = document.querySelector(SELETOR_DESTINO_RESULTADO);
    if (!destino || document.querySelector('.' + CLASSE_RESULTADO_ALUNO)) return;

    const { nota, correcoes, gabarito, historico } = await lerResultadoDoAluno(atividadeId);
    const painel = destino.querySelector(SELETOR_PAINEL_RESULTADO);
    const quadro = montarQuadroNota(nota);
    destino.insertBefore(quadro, painel ? painel.nextSibling : destino.firstChild);
    mostrarResultadoNasAlternativas({ atividadeId, correcoes, gabarito, historico });
    window.ligarMostrarCertasAluno?.(quadro, { correcoes, gabarito });
}

(function incluirEstiloResultadoAluno() {
    if (!BASE_SCRIPTS_RESULTADO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_RESULTADO + '../css/resultado-aluno-discursiva.css';
    document.head.appendChild(link);
})();

window.mostrarResultadoDoAluno = mostrarResultadoDoAluno;
