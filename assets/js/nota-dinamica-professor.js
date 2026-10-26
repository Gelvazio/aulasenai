// Atividade Dinâmica (tarefa #381): painel do PROFESSOR para lançar a nota (0 a 10) de cada aluno,
// por critério, com formato (individual, duplas, grupos, turma toda) e grupo. "Salvar grupo" aplica
// os mesmos critérios a todos os alunos com o mesmo nome de grupo. O aluno nunca vê este painel.
// Depende de nota-dinamica-repositorio.js. Regra: docs/regras/atividade-dinamica.md

const ID_ROTEIRO_DINAMICA = 'dinamica-roteiro';
const ID_NOTAS_DINAMICA = 'dinamica-notas';
const CLASSE_TEXTO_DINAMICA = 'dinamica__texto';
const MSG_SEM_ATIVIDADE_DINAMICA = 'Esta dinâmica ainda não está cadastrada no banco. ' +
    'Peça para aplicar o seed da atividade.';
const MSG_SEM_ALUNOS_DINAMICA = 'Nenhum aluno encontrado nesta turma.';
const MSG_ERRO_DINAMICA = 'Não foi possível carregar as notas: ';
const NOTA_MAXIMA_DINAMICA = 10;
const CASAS_NOTA_DINAMICA = 2;

const estadoProfessorDinamica = { atividadeId: null, criterios: [], notas: new Map() };

/**
 * Cria um elemento com classe e texto.
 * @param {string} etiqueta - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto (nunca HTML).
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoDinamica(etiqueta, classe, texto) {
    const elemento = document.createElement(etiqueta);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

/**
 * Converte o texto digitado em nota entre 0 e o máximo do critério.
 * @param {string} valor - Texto do campo (aceita vírgula).
 * @param {number} maximo - Pontos do critério.
 * @returns {number} Nota válida (0 se vazio ou inválido).
 */
function converterNotaDinamica(valor, maximo) {
    const numero = parseFloat(String(valor).replace(',', '.'));
    if (Number.isNaN(numero) || numero < 0) return 0;
    return Math.min(numero, maximo);
}

/**
 * Cria o campo numérico de um critério já preenchido com a nota anterior.
 * @param {{nome: string, pontos: number}} criterio - Critério.
 * @param {number|undefined} valorAnterior - Nota já lançada no critério.
 * @returns {HTMLInputElement} Campo.
 */
function criarCampoCriterioDinamica(criterio, valorAnterior) {
    const campo = criarElementoDinamica('input', 'dinamica__campo-nota');
    Object.assign(campo, { type: 'number', min: 0, max: criterio.pontos, step: 0.25,
        title: criterio.nome + ' (máx. ' + criterio.pontos + ')' });
    campo.dataset.criterio = criterio.nome;
    if (valorAnterior !== undefined) campo.value = valorAnterior;
    return campo;
}

/**
 * Soma os campos de critério de uma linha.
 * @param {HTMLTableRowElement} linha - Linha do aluno.
 * @returns {number} Nota total (0 a 10).
 */
function somarCriteriosDinamica(linha) {
    const campos = [...linha.querySelectorAll('input[data-criterio]')];
    const total = campos.reduce((soma, campo) =>
        soma + converterNotaDinamica(campo.value, parseFloat(campo.max)), 0);
    return Math.min(total, NOTA_MAXIMA_DINAMICA);
}

/**
 * Atualiza a célula de total da linha.
 * @param {HTMLTableRowElement} linha - Linha do aluno.
 */
function atualizarTotalDinamica(linha) {
    const total = somarCriteriosDinamica(linha);
    linha.querySelector('.dinamica__total-aluno').textContent =
        total.toFixed(CASAS_NOTA_DINAMICA).replace('.', ',');
}

/**
 * Cria o seletor de formato.
 * @param {string|null|undefined} formatoAtual - Formato já lançado.
 * @returns {HTMLSelectElement} Seletor.
 */
function criarSeletorFormatoDinamica(formatoAtual) {
    const seletor = criarElementoDinamica('select', 'dinamica__combo');
    seletor.dataset.campo = 'formato';
    FORMATOS_DINAMICA.forEach(({ valor, texto }) => {
        const opcao = criarElementoDinamica('option', '', texto);
        opcao.value = valor;
        opcao.selected = valor === formatoAtual;
        seletor.append(opcao);
    });
    return seletor;
}

/**
 * Cria um campo de texto da linha (grupo ou comentário).
 * @param {string} campo - Nome do campo (grupo ou comentario).
 * @param {string|null|undefined} valor - Valor atual.
 * @param {number} maximo - Limite de caracteres.
 * @returns {HTMLInputElement} Campo de texto.
 */
function criarCampoTextoDinamica(campo, valor, maximo) {
    const entrada = criarElementoDinamica('input', 'dinamica__campo-texto');
    Object.assign(entrada, { type: 'text', maxLength: maximo, value: valor || '' });
    entrada.dataset.campo = campo;
    return entrada;
}

/**
 * Lê o que o professor preencheu na linha.
 * @param {HTMLTableRowElement} linha - Linha do aluno.
 * @returns {Object} Registro pronto para nota_dinamica.
 */
function lerLinhaDinamica(linha) {
    const campo = (nome) => linha.querySelector('[data-campo="' + nome + '"]').value.trim();
    const criterios = [...linha.querySelectorAll('input[data-criterio]')].map((entrada) => ({
        nome: entrada.dataset.criterio,
        nota: converterNotaDinamica(entrada.value, parseFloat(entrada.max)),
    }));
    return {
        aluno_id: linha.dataset.alunoId, atividade_id: estadoProfessorDinamica.atividadeId,
        nota: Number(somarCriteriosDinamica(linha).toFixed(CASAS_NOTA_DINAMICA)), criterios,
        formato: campo('formato'), grupo: campo('grupo') || null,
        comentario: campo('comentario') || null,
    };
}

/**
 * Grava a linha e mostra a situação na própria linha.
 * @param {HTMLTableRowElement} linha - Linha do aluno.
 * @returns {Promise<void>}
 */
async function salvarLinhaDinamica(linha) {
    const situacao = linha.querySelector('.dinamica__situacao');
    try {
        await gravarNotaDaDinamica(lerLinhaDinamica(linha));
        situacao.className = 'dinamica__situacao dinamica__situacao--ok';
        situacao.textContent = '✅ Gravada';
    } catch (erro) {
        situacao.className = 'dinamica__situacao dinamica__situacao--erro';
        situacao.textContent = '❌ ' + erro.message;
    }
}

/**
 * Copia critérios, formato e comentário da linha para as outras do mesmo grupo e grava todas.
 * @param {HTMLTableRowElement} linhaOrigem - Linha usada como modelo.
 * @returns {Promise<void>}
 */
async function salvarGrupoDinamica(linhaOrigem) {
    const grupo = linhaOrigem.querySelector('[data-campo="grupo"]').value.trim();
    if (!grupo) return;

    const linhas = [...linhaOrigem.closest('tbody').querySelectorAll('tr')].filter((linha) =>
        linha.querySelector('[data-campo="grupo"]').value.trim() === grupo);
    const modelo = [...linhaOrigem.querySelectorAll('input[data-criterio]')].map((c) => c.value);
    for (const linha of linhas) {
        linha.querySelectorAll('input[data-criterio]').forEach((c, i) => { c.value = modelo[i]; });
        linha.querySelector('[data-campo="formato"]').value =
            linhaOrigem.querySelector('[data-campo="formato"]').value;
        atualizarTotalDinamica(linha);
        await salvarLinhaDinamica(linha);
    }
}

/**
 * Cria o botão de uma linha.
 * @param {string} texto - Texto do botão.
 * @param {Function} acao - Função chamada ao clicar.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoDinamica(texto, acao) {
    const botao = criarElementoDinamica('button', 'dinamica__botao', texto);
    botao.type = 'button';
    botao.addEventListener('click', async () => {
        botao.disabled = true;
        await acao();
        botao.disabled = false;
    });
    return botao;
}

/**
 * Monta a linha de um aluno.
 * @param {{id: string, nome: string}} aluno - Aluno.
 * @param {Object|undefined} nota - Nota já lançada.
 * @returns {HTMLTableRowElement} Linha da tabela.
 */
function criarLinhaAlunoDinamica(aluno, nota) {
    const linha = criarElementoDinamica('tr');
    linha.dataset.alunoId = aluno.id;
    linha.append(criarElementoDinamica('td', '', aluno.nome));
    const anteriores = new Map((nota?.criterios || []).map((c) => [c.nome, c.nota]));
    const celulaFormato = criarElementoDinamica('td');
    celulaFormato.append(criarSeletorFormatoDinamica(nota?.formato));
    const celulaGrupo = criarElementoDinamica('td');
    celulaGrupo.append(criarCampoTextoDinamica('grupo', nota?.grupo, 80));
    linha.append(celulaFormato, celulaGrupo);
    estadoProfessorDinamica.criterios.forEach((criterio) => {
        const celula = criarElementoDinamica('td');
        const campo = criarCampoCriterioDinamica(criterio, anteriores.get(criterio.nome));
        campo.addEventListener('input', () => atualizarTotalDinamica(linha));
        celula.append(campo);
        linha.append(celula);
    });
    const total = criarElementoDinamica('td', 'dinamica__total-aluno',
        nota ? String(nota.nota).replace('.', ',') : '—');
    const celulaComentario = criarElementoDinamica('td');
    celulaComentario.append(criarCampoTextoDinamica('comentario', nota?.comentario, 1000));
    const celulaAcoes = criarElementoDinamica('td');
    celulaAcoes.append(criarBotaoDinamica('Salvar', () => salvarLinhaDinamica(linha)),
        criarBotaoDinamica('Salvar grupo', () => salvarGrupoDinamica(linha)),
        criarElementoDinamica('div', 'dinamica__situacao'));
    linha.append(total, celulaComentario, celulaAcoes);
    return linha;
}

/**
 * Monta a tabela de notas da turma.
 * @param {{id: string, nome: string}[]} alunos - Alunos da turma.
 * @returns {HTMLElement} Área rolável com a tabela.
 */
function criarTabelaDinamica(alunos) {
    const tabela = criarElementoDinamica('table', 'dinamica__tabela');
    const cabecalho = criarElementoDinamica('tr');
    const titulos = ['Aluno', 'Formato', 'Grupo',
        ...estadoProfessorDinamica.criterios.map((c) => c.nome + ' (' + c.pontos + ')'),
        'Total', 'Comentário', 'Ações'];
    titulos.forEach((titulo) => cabecalho.append(criarElementoDinamica('th', '', titulo)));
    const corpo = criarElementoDinamica('tbody');
    alunos.forEach((aluno) => corpo.append(
        criarLinhaAlunoDinamica(aluno, estadoProfessorDinamica.notas.get(aluno.id))));
    tabela.append(criarElementoDinamica('thead'), corpo);
    tabela.firstChild.append(cabecalho);
    const area = criarElementoDinamica('div', 'dinamica__tabela-rolagem');
    area.append(tabela);
    return area;
}

/**
 * Carrega os alunos e as notas da turma e redesenha a tabela.
 * @param {HTMLElement} painel - Seção do painel de notas.
 * @param {string} turmaCodigo - Código da turma escolhida.
 * @returns {Promise<void>}
 */
async function carregarTurmaDinamica(painel, turmaCodigo) {
    painel.querySelector('.dinamica__tabela-rolagem')?.remove();
    const aviso = painel.querySelector('.' + CLASSE_TEXTO_DINAMICA);
    const [alunos, notas] = await Promise.all([lerAlunosDaDinamica(turmaCodigo),
        lerNotasDaDinamica(estadoProfessorDinamica.atividadeId)]);
    estadoProfessorDinamica.notas = new Map(notas.map((nota) => [nota.aluno_id, nota]));
    aviso.textContent = alunos.length ? '' : MSG_SEM_ALUNOS_DINAMICA;
    if (alunos.length) painel.append(criarTabelaDinamica(alunos));
}

/**
 * Cria o combo de turmas e carrega a favorita.
 * @param {HTMLElement} painel - Seção do painel de notas.
 * @param {{codigo: string, nome: string}[]} turmas - Turmas do curso.
 * @returns {Promise<void>}
 */
async function montarComboTurmaDinamica(painel, turmas) {
    const combo = criarElementoDinamica('select', 'dinamica__combo');
    turmas.forEach((turma) => {
        const opcao = criarElementoDinamica('option', '', turma.nome);
        opcao.value = turma.codigo;
        combo.append(opcao);
    });
    combo.addEventListener('change', () => carregarTurmaDinamica(painel, combo.value));
    painel.querySelector('.' + CLASSE_TEXTO_DINAMICA).before(combo);
    await carregarTurmaDinamica(painel, combo.value);
}

/**
 * Inicia o painel do professor: mostra roteiro e notas e carrega a turma.
 * @returns {Promise<void>}
 */
async function iniciarNotasDaDinamica() {
    if (!(await ehProfessorDinamica())) return;

    const painel = document.getElementById(ID_NOTAS_DINAMICA);
    document.getElementById(ID_ROTEIRO_DINAMICA).hidden = false;
    painel.hidden = false;
    const aviso = painel.querySelector('.' + CLASSE_TEXTO_DINAMICA);
    try {
        const atividade = await lerAtividadeDaDinamica();
        if (!atividade) { aviso.textContent = MSG_SEM_ATIVIDADE_DINAMICA; return; }
        estadoProfessorDinamica.atividadeId = atividade.id;
        estadoProfessorDinamica.criterios = lerCriteriosDaDinamica();
        await montarComboTurmaDinamica(painel, await lerTurmasDaDinamica(atividade.cursoId));
    } catch (erro) {
        aviso.textContent = MSG_ERRO_DINAMICA + erro.message;
    }
}

document.addEventListener('DOMContentLoaded', iniciarNotasDaDinamica);
