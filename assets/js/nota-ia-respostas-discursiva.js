// Professor: em "Respostas dos alunos" da avaliação discursiva, ao carregar as respostas de um
// aluno, mostra ao lado de cada alternativa a nota parcial da IA com o ícone: ✅ certa,
// 🟡 meia certa, ❌ errada ou ⏳ ainda sem correção (correcao_discursiva.nota_ia, a confirmar pelo
// professor). O comentário da IA aparece ao passar o mouse. Nada é gravado.
// Carregado por assets/js/avaliacao-discursiva.js. Depende de js/supabase.js (sbGet).
// Regra: docs/regras/atividades.md

const CLASSE_NOTA_IA_RESPOSTA = 'nota-ia-resposta';
const SELETOR_BLOCO_NOTA_IA = '.topico-resposta';
const SELETOR_RODAPE_NOTA_IA = '.topico-resposta__rodape';
const BASE_SCRIPTS_NOTA_IA = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const RESULTADOS_NOTA_IA = {
    certa: { icone: '✅', texto: 'Certa', modificador: 'certa' },
    meia: { icone: '🟡', texto: 'Meia certa', modificador: 'meia' },
    errada: { icone: '❌', texto: 'Errada', modificador: 'errada' },
    pendente: { icone: '⏳', texto: 'Sem correção da IA', modificador: 'pendente' },
};

/**
 * Remove os ícones de nota da IA mostrados antes.
 */
function limparNotasIaDasRespostas() {
    document.querySelectorAll('.' + CLASSE_NOTA_IA_RESPOSTA).forEach((icone) => icone.remove());
}

/**
 * Lê do banco as notas da IA do aluno na tentativa e os pontos de cada alternativa.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{notas: Map<string, Object>, pontos: Map<string, number>}>} Por "item|topico".
 */
async function lerNotasIaDoAluno(aluno, atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [correcoes, topicos] = await Promise.all([
        sbGet('correcao_discursiva', 'select=item,topico,nota_ia,comentario&' + filtro +
            '&aluno_id=eq.' + aluno.alunoId + '&tentativa=eq.' + aluno.tentativa),
        sbGet('topico_discursivo', 'select=item,topico,pontos&' + filtro),
    ]);
    return {
        notas: new Map(correcoes.map((linha) => [linha.item + '|' + linha.topico, linha])),
        pontos: new Map(topicos.map((linha) =>
            [linha.item + '|' + linha.topico, Number(linha.pontos)])),
    };
}

/**
 * Classifica a nota da IA de uma alternativa.
 * @param {Object|undefined} correcao - Linha {nota_ia, comentario} ou undefined.
 * @param {number} pontos - Pontos da alternativa.
 * @returns {Object} Item de RESULTADOS_NOTA_IA.
 */
function classificarNotaIa(correcao, pontos) {
    const temNota = correcao && correcao.nota_ia !== null && correcao.nota_ia !== undefined;
    if (!temNota) return RESULTADOS_NOTA_IA.pendente;

    const nota = Number(correcao.nota_ia);
    if (nota >= pontos) return RESULTADOS_NOTA_IA.certa;
    if (nota > 0) return RESULTADOS_NOTA_IA.meia;
    return RESULTADOS_NOTA_IA.errada;
}

/**
 * Cria o ícone com a nota parcial da IA de uma alternativa.
 * @param {Object|undefined} correcao - Linha {nota_ia, comentario} ou undefined.
 * @param {number} pontos - Pontos da alternativa.
 * @returns {HTMLElement} Ícone pronto.
 */
function criarIconeNotaIa(correcao, pontos) {
    const resultado = classificarNotaIa(correcao, pontos);
    const icone = document.createElement('span');
    icone.className = CLASSE_NOTA_IA_RESPOSTA + ' ' + CLASSE_NOTA_IA_RESPOSTA + '--' +
        resultado.modificador;
    if (resultado === RESULTADOS_NOTA_IA.pendente) {
        icone.textContent = resultado.icone + ' ' + resultado.texto;
        return icone;
    }
    const nota = Number(correcao.nota_ia).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const total = pontos.toLocaleString('pt-BR', { minimumFractionDigits: 1 });
    icone.textContent = resultado.icone + ' ' + resultado.texto + ' · IA ' + nota + '/' + total;
    icone.title = (correcao.comentario || resultado.texto) + ' (nota parcial da IA, a confirmar ' +
        'pelo professor em CORREÇÃO)';
    return icone;
}

/**
 * Mostra ao lado de cada alternativa a nota parcial da IA do aluno escolhido (ou limpa).
 * @param {{alunoId: string, tentativa: number}|null} aluno - Aluno escolhido; null limpa.
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarNotasIaDoAluno(aluno, atividadeId) {
    limparNotasIaDasRespostas();
    if (!aluno || !atividadeId) return;

    const { notas, pontos } = await lerNotasIaDoAluno(aluno, atividadeId);
    document.querySelectorAll(SELETOR_BLOCO_NOTA_IA).forEach((bloco) => {
        const chave = bloco.dataset.item + '|' + bloco.dataset.topico;
        const rodape = bloco.querySelector(SELETOR_RODAPE_NOTA_IA);
        if (!rodape) return;
        rodape.prepend(criarIconeNotaIa(notas.get(chave), pontos.get(chave) || 0));
    });
}

(function incluirEstiloNotaIaRespostas() {
    if (!BASE_SCRIPTS_NOTA_IA) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_NOTA_IA + '../css/nota-ia-respostas-discursiva.css';
    document.head.appendChild(link);
})();

window.mostrarNotasIaDoAluno = mostrarNotasIaDoAluno;
