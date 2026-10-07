// Professor: combo "Aluno" no painel das discursivas para carregar nos campos as respostas
// gravadas de um aluno (somente leitura). Só aparece para o professor; o RLS limita aos alunos
// das turmas dele. Nada é gravado. Carregado por assets/js/avaliacao-discursiva.js.
// Depende de js/supabase.js (sbGet).

const CLASSE_RESPOSTAS_ALUNO = 'respostas-aluno-discursiva';
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
 * Agrupa as respostas por aluno e tentativa, contando os tópicos gravados.
 * @param {Object[]} linhas - Linhas {aluno_id, tentativa} de resposta_discursiva.
 * @returns {Map<string, {alunoId: string, tentativa: number, topicos: number}>} Grupos.
 */
function agruparPorAlunoETentativa(linhas) {
    const grupos = new Map();
    linhas.forEach((linha) => {
        const chave = linha.aluno_id + '|' + linha.tentativa;
        const grupo = grupos.get(chave) ||
            { alunoId: linha.aluno_id, tentativa: linha.tentativa, topicos: 0 };
        grupo.topicos += 1;
        grupos.set(chave, grupo);
    });
    return grupos;
}

/**
 * Lê do banco quem respondeu a atividade, com nome e situação da entrega.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Lista {alunoId, tentativa, topicos, nome, entregueEm}, por nome.
 */
async function listarAlunosQueResponderam(atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [respostas, entregas] = await Promise.all([
        sbGet('resposta_discursiva', 'select=aluno_id,tentativa&' + filtro),
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
        : 'não entregue (' + aluno.topicos + ' tópico(s) gravado(s))';
    return aluno.nome + ' — tentativa ' + aluno.tentativa + ' — ' + situacao;
}

/**
 * Lê as respostas de um aluno numa tentativa e devolve o mapa chave do tópico → texto.
 * @param {{atividadeId: number, alunoId: string, tentativa: number, chaveTopico: Function}} pedido
 *     Dados do pedido.
 * @returns {Promise<Object<string, string>>} Respostas do aluno.
 */
async function lerRespostasDoAlunoEscolhido(pedido) {
    const filtro = 'atividade_id=eq.' + pedido.atividadeId + '&aluno_id=eq.' + pedido.alunoId +
        '&tentativa=eq.' + pedido.tentativa;
    const linhas = await sbGet('resposta_discursiva', 'select=item,topico,texto&' + filtro);
    const respostas = {};
    linhas.forEach((linha) => {
        respostas[pedido.chaveTopico(linha.item, linha.topico)] = linha.texto;
    });
    return respostas;
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
 * Carrega nos campos as respostas do aluno escolhido (ou limpa, se nenhum).
 * @param {{combo: HTMLSelectElement, alunos: Object[], aviso: HTMLElement}} tela - Elementos.
 * @param {{atividadeId: number, preencher: Function, chaveTopico: Function}} opcoes - Ações.
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
        const respostas = await lerRespostasDoAlunoEscolhido({ atividadeId: opcoes.atividadeId,
            alunoId: aluno.alunoId, tentativa: aluno.tentativa, chaveTopico: opcoes.chaveTopico });
        opcoes.preencher(respostas);
        tela.aviso.textContent = '👀 Mostrando as respostas de ' + aluno.nome +
            ' (somente leitura).';
    } catch (erro) {
        tela.aviso.textContent = '❌ Não foi possível carregar as respostas: ' + erro.message;
    } finally {
        tela.combo.disabled = false;
    }
}

/**
 * Monta no painel o combo "Aluno" que carrega as respostas de cada aluno nos campos.
 * @param {HTMLElement} painel - Painel de identificação da página.
 * @param {{atividadeId: number, preencher: Function, chaveTopico: Function}} opcoes
 *     Id da atividade, função que preenche os campos e função da chave do tópico.
 */
async function montarRespostasDoAlunoDiscursiva(painel, opcoes) {
    const area = criarElementoRespostasAluno('div', CLASSE_RESPOSTAS_ALUNO);
    area.appendChild(criarElementoRespostasAluno('strong', CLASSE_RESPOSTAS_ALUNO + '__titulo',
        '🧑‍🎓 Respostas dos alunos'));
    painel.appendChild(area);

    const alunos = await listarAlunosQueResponderam(opcoes.atividadeId);
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
    link.href = BASE_SCRIPTS_RESPOSTAS_ALUNO + '../css/respostas-aluno-discursiva.css';
    document.head.appendChild(link);
})();

window.montarRespostasDoAlunoDiscursiva = montarRespostasDoAlunoDiscursiva;
