// Professor: combo "Aluno" nas páginas de atividade (objetivas e discursivas) para carregar na
// tela as respostas gravadas de um aluno (somente leitura). Só aparece para o professor; o RLS
// limita aos alunos das turmas dele. Nada é gravado.
// Carregado por assets/js/avaliacao-discursiva.js e assets/js/respostas-atividade.js, que
// informam a tabela, as colunas e como mostrar as respostas. Depende de js/supabase.js (sbGet).

const CLASSE_RESPOSTAS_ALUNO = 'respostas-aluno-professor';
const TEXTO_OPCAO_VAZIA = '— Selecione o aluno —';
const BASE_SCRIPTS_RESPOSTAS_ALUNO = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoRespostasAluno(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Formata data ISO como "dd/mm/aaaa hh:mm".
 * @param {string} dataIso - Data ISO.
 * @returns {string} Data formatada.
 */
function formatarDataRespostasAluno(dataIso) {
    return new Date(dataIso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

/**
 * Agrupa as respostas por aluno e tentativa, contando as linhas gravadas.
 * @param {Object[]} linhas - Linhas {aluno_id, tentativa} da tabela de respostas.
 * @returns {Map<string, {alunoId: string, tentativa: number, gravadas: number}>} Grupos.
 */
function agruparPorAlunoETentativa(linhas) {
    const grupos = new Map();
    linhas.forEach((linha) => {
        const chave = linha.aluno_id + '|' + linha.tentativa;
        const grupo = grupos.get(chave) ||
            { alunoId: linha.aluno_id, tentativa: linha.tentativa, gravadas: 0 };
        grupo.gravadas += 1;
        grupos.set(chave, grupo);
    });
    return grupos;
}

/**
 * Lê do banco quem respondeu a atividade, com nome e situação da entrega.
 * @param {{atividadeId: number, tabela: string}} opcoes - Atividade e tabela de respostas.
 * @returns {Promise<Object[]>} Lista {alunoId, tentativa, gravadas, nome, entregueEm}, por nome.
 */
async function listarAlunosQueResponderam(opcoes) {
    const filtro = 'atividade_id=eq.' + opcoes.atividadeId;
    const [respostas, entregas] = await Promise.all([
        sbGet(opcoes.tabela, 'select=aluno_id,tentativa&' + filtro),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa,entregue_em&' + filtro),
    ]);
    const grupos = [...agruparPorAlunoETentativa(respostas).values()];
    if (!grupos.length) return [];

    const ids = [...new Set(grupos.map((grupo) => grupo.alunoId))];
    const alunos = await sbGet('aluno', 'select=id,nome&id=in.(' + ids.join(',') + ')');
    const nomes = new Map(alunos.map((aluno) => [aluno.id, aluno.nome]));
    const entregues = new Map(entregas.map((entrega) =>
        [entrega.aluno_id + '|' + entrega.tentativa, entrega.entregue_em]));
    return grupos.map((grupo) => ({
        ...grupo,
        nome: nomes.get(grupo.alunoId) || 'Aluno sem nome',
        entregueEm: entregues.get(grupo.alunoId + '|' + grupo.tentativa) || '',
    })).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR') || a.tentativa - b.tentativa);
}

/**
 * Monta o texto da opção do combo (nome, tentativa e situação).
 * @param {Object} aluno - Registro de listarAlunosQueResponderam.
 * @returns {string} Texto da opção.
 */
function rotuloOpcaoAluno(aluno) {
    const situacao = aluno.entregueEm
        ? 'entregue em ' + formatarDataRespostasAluno(aluno.entregueEm)
        : 'não entregue (' + aluno.gravadas + ' resposta(s) gravada(s))';
    return aluno.nome + ' — tentativa ' + aluno.tentativa + ' — ' + situacao;
}

/**
 * Lê as respostas de um aluno numa tentativa e as converte para a tela.
 * @param {Object} aluno - Registro de listarAlunosQueResponderam.
 * @param {{atividadeId: number, tabela: string, colunas: string, converter: Function}} opcoes
 *     Atividade, tabela, colunas lidas e conversão das linhas.
 * @returns {Promise<Object>} Respostas no formato da tela.
 */
async function lerRespostasDoAlunoEscolhido(aluno, opcoes) {
    const filtro = 'atividade_id=eq.' + opcoes.atividadeId + '&aluno_id=eq.' + aluno.alunoId +
        '&tentativa=eq.' + aluno.tentativa;
    const linhas = await sbGet(opcoes.tabela, 'select=' + opcoes.colunas + '&' + filtro);
    return opcoes.converter(linhas);
}

/**
 * Cria o combo com os alunos que responderam.
 * @param {Object[]} alunos - Lista de listarAlunosQueResponderam.
 * @returns {HTMLSelectElement} Combo pronto.
 */
function criarComboAlunos(alunos) {
    const combo = document.createElement('select');
    combo.appendChild(new Option(TEXTO_OPCAO_VAZIA, ''));
    alunos.forEach((aluno, indice) => combo.appendChild(new Option(rotuloOpcaoAluno(aluno),
        String(indice))));
    return combo;
}

/**
 * Mostra na tela as respostas do aluno escolhido (ou limpa, se nenhum).
 * @param {{combo: HTMLSelectElement, alunos: Object[], aviso: HTMLElement}} tela - Elementos.
 * @param {Object} opcoes - Opções de montarRespostasDoAluno.
 */
async function carregarAlunoEscolhido(tela, opcoes) {
    const aluno = tela.alunos[Number(tela.combo.value)];
    if (!tela.combo.value || !aluno) {
        opcoes.preencher({});
        tela.aviso.textContent = '';
        return;
    }
    tela.combo.disabled = true;
    try {
        opcoes.preencher(await lerRespostasDoAlunoEscolhido(aluno, opcoes));
        tela.aviso.textContent = '👀 Mostrando as respostas de ' + aluno.nome +
            ' (somente leitura).';
    } catch (erro) {
        tela.aviso.textContent = '❌ Não foi possível carregar as respostas: ' + erro.message;
    } finally {
        tela.combo.disabled = false;
    }
}

/**
 * Monta o combo "Aluno" que carrega na tela as respostas de cada aluno.
 * @param {HTMLElement} destino - Elemento onde a área do combo é acrescentada.
 * @param {{atividadeId: number, tabela: string, colunas: string, converter: Function,
 *     preencher: Function}} opcoes - Atividade, tabela de respostas, colunas lidas, conversão
 *     das linhas para o formato da tela e função que mostra as respostas.
 */
async function montarRespostasDoAluno(destino, opcoes) {
    const area = criarElementoRespostasAluno('div', CLASSE_RESPOSTAS_ALUNO);
    area.appendChild(criarElementoRespostasAluno('strong', CLASSE_RESPOSTAS_ALUNO + '__titulo',
        '🧑‍🎓 Respostas dos alunos'));
    destino.appendChild(area);

    const alunos = await listarAlunosQueResponderam(opcoes);
    if (!alunos.length) {
        area.appendChild(criarElementoRespostasAluno('span', CLASSE_RESPOSTAS_ALUNO + '__aviso',
            'Nenhum aluno das suas turmas respondeu ainda.'));
        return;
    }
    const etiqueta = criarElementoRespostasAluno('label', CLASSE_RESPOSTAS_ALUNO + '__aluno',
        'Aluno: ');
    const combo = criarComboAlunos(alunos);
    const aviso = criarElementoRespostasAluno('span', CLASSE_RESPOSTAS_ALUNO + '__aviso');
    etiqueta.appendChild(combo);
    area.append(etiqueta, aviso);
    combo.addEventListener('change', () => carregarAlunoEscolhido({ combo, alunos, aviso },
        opcoes));
}

(function incluirEstiloRespostasAluno() {
    if (!BASE_SCRIPTS_RESPOSTAS_ALUNO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_RESPOSTAS_ALUNO + '../css/respostas-aluno-professor.css';
    document.head.appendChild(link);
})();

window.montarRespostasDoAluno = montarRespostasDoAluno;
