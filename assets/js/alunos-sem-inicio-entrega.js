// Professor: no "Progresso da turma" (progresso-turma-global.js), lista os alunos das turmas da
// UC da atividade que não têm nenhuma resposta gravada — os que nunca abriram e os que o
// professor marcou como entregue sem resposta —, cada um com o "📨 Marcar como entregue" ou o
// "↩️ Desfazer entrega" (marcar-entregue-professor.js). Só nas páginas com
// <body data-marcar-entregue="sim">. A lista de alunos é lida uma vez; as entregas, a cada
// atualização do painel. O RLS limita aos alunos das turmas do professor.
// Depende de js/supabase.js (sbGet) e de marcar-entregue-professor.js.
// Regra: docs/regras/atividades.md

const CLASSE_SEM_INICIO = 'sem-inicio-entrega';
const TEXTO_NAO_COMECOU = '❌ Não começou';
const TENTATIVA_INICIAL_SEM_INICIO = 1;

const memoriaSemInicio = { atividadeId: null, alunos: null };

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoSemInicio(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Normaliza um texto para comparar nomes de UC (sem acentos, minúsculo, sem espaços sobrando).
 * @param {string} texto - Texto original.
 * @returns {string} Texto normalizado.
 */
function normalizarTextoSemInicio(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Lê os alunos das turmas da UC da atividade (sem UC conhecida, todos os que o professor vê).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Alunos {id, nome, numero_chamada, turma_codigo}.
 * @throws {Error} Se o banco recusar.
 */
async function lerAlunosDaUcSemInicio(atividadeId) {
    const [atividades, turmas, alunos] = await Promise.all([
        sbGet('atividade', 'select=aulas(materia(descricao))&id=eq.' + atividadeId),
        sbGet('turma', 'select=codigo,uc'),
        sbGet('aluno', 'select=id,nome,numero_chamada,turma_codigo&desistente=eq.false' +
            '&order=turma_codigo,nome'),
    ]);
    const uc = normalizarTextoSemInicio(atividades[0]?.aulas?.materia?.descricao);
    const ucPorTurma = new Map(turmas.map((turma) => [turma.codigo, turma.uc]));
    return alunos.filter((aluno) => {
        const semComoConferir = !uc || !ucPorTurma.has(aluno.turma_codigo);
        const ucDaTurma = normalizarTextoSemInicio(ucPorTurma.get(aluno.turma_codigo));
        return semComoConferir || ucDaTurma === uc;
    });
}

/**
 * Lê (uma vez por atividade) os alunos da UC.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Alunos da UC.
 */
async function obterAlunosSemInicio(atividadeId) {
    if (memoriaSemInicio.atividadeId !== atividadeId) {
        memoriaSemInicio.alunos = await lerAlunosDaUcSemInicio(atividadeId);
        memoriaSemInicio.atividadeId = atividadeId;
    }
    return memoriaSemInicio.alunos;
}

/**
 * Lê a entrega da tentativa atual de cada aluno (tentativa atual = a maior liberada, ou 1).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Map<string, {entregue_em: string, entregue_por: string|null}>>} Por aluno.
 * @throws {Error} Se o banco recusar.
 */
async function lerEntregasAtuaisSemInicio(atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [entregas, liberacoes] = await Promise.all([
        sbGet('entrega_atividade', 'select=aluno_id,tentativa,entregue_em,entregue_por&' + filtro),
        sbGet('liberacao_atividade', 'select=aluno_id,tentativa&' + filtro),
    ]);
    const tentativaAtual = new Map();
    liberacoes.forEach((linha) => tentativaAtual.set(linha.aluno_id,
        Math.max(linha.tentativa, tentativaAtual.get(linha.aluno_id) || 0)));
    const atuais = new Map();
    entregas.forEach((entrega) => {
        const atual = tentativaAtual.get(entrega.aluno_id) || TENTATIVA_INICIAL_SEM_INICIO;
        if (entrega.tentativa === atual) atuais.set(entrega.aluno_id, entrega);
    });
    return atuais;
}

/**
 * Monta a linha de um aluno sem resposta: nome, situação e o controle de entrega.
 * @param {Object} aluno - Aluno {id, nome}.
 * @param {Object|undefined} entrega - Entrega da tentativa atual, se houver.
 * @param {{atividadeId: number, aoMudar: Function}} opcoes - Atividade e o que fazer depois.
 * @returns {HTMLElement} Linha pronta.
 */
function montarLinhaSemInicio(aluno, entrega, opcoes) {
    const linha = criarElementoSemInicio('div', CLASSE_SEM_INICIO + '__linha');
    linha.appendChild(criarElementoSemInicio('span', CLASSE_SEM_INICIO + '__nome',
        aluno.nome || '(sem cadastro)'));
    if (!entrega) {
        linha.appendChild(criarElementoSemInicio('span', CLASSE_SEM_INICIO + '__situacao',
            TEXTO_NAO_COMECOU));
    }
    const linhaDoResumo = { aluno_id: aluno.id, nome: aluno.nome,
        entregue_em: entrega?.entregue_em || null, entregue_por: entrega?.entregue_por || null };
    window.acrescentarControleEntrega(linha, { atividadeId: opcoes.atividadeId,
        aoMudar: opcoes.aoMudar, linha: linhaDoResumo });
    return linha;
}

/**
 * Redesenha a lista dos alunos sem nenhuma resposta (fora da lista principal do painel).
 * @param {HTMLElement} destino - Área da lista dentro do painel.
 * @param {{atividadeId: number, idsQueComecaram: Set<string>, aoMudar: Function}} opcoes -
 *     Atividade, alunos que já aparecem no painel e o que fazer depois de mudar.
 */
async function atualizarAlunosSemInicio(destino, opcoes) {
    if (!destino || typeof window.acrescentarControleEntrega !== 'function') return;

    try {
        const [alunos, entregas] = await Promise.all([obterAlunosSemInicio(opcoes.atividadeId),
            lerEntregasAtuaisSemInicio(opcoes.atividadeId)]);
        const faltantes = alunos.filter((aluno) => !opcoes.idsQueComecaram.has(aluno.id));
        const titulo = criarElementoSemInicio('h3', CLASSE_SEM_INICIO + '__titulo',
            'Alunos sem nenhuma resposta (' + faltantes.length + ')');
        destino.replaceChildren(titulo, ...faltantes.map((aluno) =>
            montarLinhaSemInicio(aluno, entregas.get(aluno.id), opcoes)));
    } catch (erro) {
        destino.replaceChildren('❌ Não foi possível ler os alunos sem resposta: ' +
            erro.message);
    }
}

window.atualizarAlunosSemInicio = atualizarAlunosSemInicio;
