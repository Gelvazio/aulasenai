// Página relatorioAtividades.html: escolhe a matéria e lista, por turma (abas em cartões), todos
// os alunos (banco + listas de presença) com "Fez Atividade? (Sim/Não)", status, tentativas e
// média de TODAS as atividades ativas da matéria. Só o professor logado. Filtros em interruptores
// ON/OFF. Depende de relatorio-atividades-dados.js, turma-favorita.js, popup.js e js/supabase.js.

const ROTA_LOGIN_REL = 'login.html';
const PAGINA_REL = 'relatorioAtividades.html';
const MSG_SEM_LOGIN_REL = 'Entre como professor para ver o relatório de atividades.';
const MSG_SEM_PERFIL_REL = 'Só o perfil PROFESSOR vê este relatório.';
const MSG_SEM_ATIVIDADES_REL = 'Nenhuma atividade cadastrada para esta matéria.';
const MSG_SEM_UC_REL = 'Nenhuma turma tem esta matéria como UC: mostrando todas as turmas.';
const MSG_ERRO_REL = 'Não foi possível carregar o relatório: ';
const TEXTO_STATUS_REL = { entregue: '📨 Entregue', andamento: '✏️ Andamento', '': '—' };
const QUANTIDADES_REL = ['1', '2', '3'];

const estadoRel = {
    materias: [], materia: null, turmas: [], turmaAtual: '', resumos: new Map(),
    notasVisiveis: false, soNaoAtingiu: false, fez: new Set(), status: new Set(),
    tentativas: new Set(),
};

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoRel(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

/**
 * Formata uma nota com uma casa decimal e vírgula.
 * @param {number|null} nota - Nota de 0 a 10.
 * @returns {string} Nota formatada ou "—".
 */
function formatarNotaRel(nota) {
    return nota === null ? '—' : nota.toFixed(1).replace('.', ',');
}

/**
 * Cria um interruptor ON/OFF (checkbox estilizado).
 * @param {string} texto - Rótulo.
 * @param {Function} aoMudar - Chamada com true (ON) ou false (OFF).
 * @returns {HTMLLabelElement} Interruptor pronto (desligado).
 */
function criarInterruptorRel(texto, aoMudar) {
    const etiqueta = criarElementoRel('label', 'rel-interruptor');
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.addEventListener('change', () => aoMudar(caixa.checked));
    etiqueta.append(caixa, criarElementoRel('span', 'rel-chave'),
        criarElementoRel('span', 'rel-interruptor-texto', texto));
    return etiqueta;
}

/**
 * Liga/desliga um valor dentro de um conjunto de filtros.
 * @param {Set<string>} conjunto - Conjunto de valores ligados.
 * @param {string} valor - Valor do interruptor.
 * @returns {Function} Função que recebe o estado (true/false) do interruptor.
 */
function alternarNoConjuntoRel(conjunto, valor) {
    return (ligado) => {
        if (ligado) conjunto.add(valor);
        else conjunto.delete(valor);
        renderizarTabelaRel();
    };
}

/**
 * Cria um grupo de filtro (título + interruptores).
 * @param {string} titulo - Título do grupo.
 * @param {HTMLElement[]} interruptores - Interruptores do grupo.
 * @returns {HTMLElement} Grupo pronto.
 */
function criarGrupoFiltroRel(titulo, interruptores) {
    const grupo = criarElementoRel('div', 'rel-grupo-filtro');
    grupo.append(criarElementoRel('strong', '', titulo), ...interruptores);
    return grupo;
}

/**
 * Monta a barra de filtros globais (interruptores ON/OFF), todos desligados por padrão.
 * @returns {HTMLElement} Barra de filtros.
 */
function montarFiltrosRel() {
    const barra = criarElementoRel('div', 'rel-filtros');
    barra.append(
        criarGrupoFiltroRel('', [criarInterruptorRel('Visualizar Notas', (ligado) => {
            estadoRel.notasVisiveis = ligado;
            renderizarTabelaRel();
        })]),
        criarGrupoFiltroRel('Fez a atividade?', [
            criarInterruptorRel('Sim', alternarNoConjuntoRel(estadoRel.fez, 'sim')),
            criarInterruptorRel('Não', alternarNoConjuntoRel(estadoRel.fez, 'nao'))]),
        criarGrupoFiltroRel('Status', [
            criarInterruptorRel('Entregue', alternarNoConjuntoRel(estadoRel.status, 'entregue')),
            criarInterruptorRel('Andamento',
                alternarNoConjuntoRel(estadoRel.status, 'andamento'))]),
        criarGrupoFiltroRel('Situação', [criarInterruptorRel('Não atingiram a nota mínima',
            (ligado) => { estadoRel.soNaoAtingiu = ligado; renderizarTabelaRel(); })]),
        criarGrupoFiltroRel('Tentativas', QUANTIDADES_REL.map((quantidade) =>
            criarInterruptorRel(quantidade + 'x',
                alternarNoConjuntoRel(estadoRel.tentativas, quantidade)))),
    );
    return barra;
}

/**
 * Diz se um aluno passa pelos filtros globais.
 * @param {Object} resumo - Resumo do aluno.
 * @returns {boolean} true se deve aparecer.
 */
function passaNosFiltrosRel(resumo) {
    const { fez, status, tentativas } = estadoRel;
    if (estadoRel.soNaoAtingiu && !resumo.naoAtingiu) return false;
    if (fez.size === 1 && !fez.has(resumo.fez ? 'sim' : 'nao')) return false;
    const passaStatus = (status.has('entregue') && resumo.entregue) ||
        (status.has('andamento') && resumo.andamento);
    if (status.size > 0 && !passaStatus) return false;
    return tentativas.size === 0 || tentativas.has(String(resumo.tentativas));
}

/**
 * Monta a linha de detalhe com as notas de cada atividade do aluno.
 * @param {Object} resumo - Resumo do aluno.
 * @returns {HTMLTableRowElement} Linha de detalhe.
 */
function montarDetalheRel(resumo) {
    const tabela = criarElementoRel('table', 'rel-tabela-detalhe');
    const cabecalho = tabela.createTHead().insertRow();
    ['Atividade', 'Tentativas', 'Situação', 'Melhor nota'].forEach((texto) =>
        cabecalho.appendChild(criarElementoRel('th', '', texto)));
    const corpo = tabela.createTBody();
    resumo.detalhes.forEach((detalhe) => {
        const linha = corpo.insertRow();
        [detalhe.atividade.descricao, detalhe.tentativas, TEXTO_STATUS_REL[detalhe.status],
            formatarNotaRel(detalhe.melhorNota)].forEach((valor) =>
            linha.appendChild(criarElementoRel('td', '', String(valor))));
    });
    const linhaDetalhe = criarElementoRel('tr', 'rel-detalhe');
    const celula = criarElementoRel('td');
    celula.colSpan = 7;
    celula.appendChild(tabela);
    linhaDetalhe.appendChild(celula);
    return linhaDetalhe;
}

/**
 * Monta o bloco (tbody) de um aluno: linha com colunas retas e detalhe por atividade.
 * @param {Object} aluno - Aluno da turma.
 * @param {Object} resumo - Resumo do aluno.
 * @returns {HTMLTableSectionElement} Bloco do aluno.
 */
function montarBlocoAlunoRel(aluno, resumo) {
    const bloco = criarElementoRel('tbody', 'rel-aluno');
    bloco.classList.toggle('rel-aluno--abaixo', resumo.naoAtingiu);
    const aberto = estadoRel.notasVisiveis;
    const nome = aluno.nome + (aluno.foraChamada ? ' (fora da chamada)' : '') +
        (aluno.cadastrado ? '' : ' (sem cadastro)');
    const linha = bloco.insertRow();
    const celulas = [aluno.numero ?? '', nome, resumo.fez ? '✅ Sim' : '❌ Não',
        resumo.feitas + ' de ' + resumo.total,
        TEXTO_STATUS_REL[resumo.entregue ? 'entregue' : (resumo.andamento ? 'andamento' : '')],
        resumo.tentativas + ' de 3', aberto ? formatarNotaRel(resumo.media) : '••••'];
    celulas.forEach((valor) => linha.appendChild(criarElementoRel('td', '', String(valor))));
    linha.cells[2].classList.add(resumo.fez ? 'rel-sim' : 'rel-nao');
    if (aberto) bloco.appendChild(montarDetalheRel(resumo));
    return bloco;
}

/**
 * Desenha a tabela de alunos da turma escolhida, aplicando os filtros.
 */
function renderizarTabelaRel() {
    const area = document.getElementById('relTabela');
    const turma = estadoRel.turmas.find((item) => item.codigo === estadoRel.turmaAtual);
    area.replaceChildren();
    if (!turma) return;

    const tabela = criarElementoRel('table', 'rel-tabela');
    const cabecalho = tabela.createTHead().insertRow();
    ['Nº', 'Aluno', 'Fez Atividade?', 'Atividades feitas', 'Status', 'Tentativas',
        'Média (atividades ativas)'].forEach((texto) =>
        cabecalho.appendChild(criarElementoRel('th', '', texto)));
    let visiveis = 0;
    turma.alunos.forEach((aluno) => {
        const resumo = calcularResumoAlunoRel(aluno, estadoRel.materia.atividades,
            estadoRel.resumos);
        if (!passaNosFiltrosRel(resumo)) return;

        tabela.appendChild(montarBlocoAlunoRel(aluno, resumo));
        visiveis += 1;
    });
    document.getElementById('relResumo').textContent = visiveis + ' de ' + turma.alunos.length +
        ' aluno(s) · ' + estadoRel.materia.atividades.filter((a) => a.ativo).length +
        ' atividade(s) ativa(s) na matéria.';
    const rolagem = criarElementoRel('div', 'rel-rolagem');
    rolagem.appendChild(tabela);
    area.appendChild(rolagem);
}

/**
 * Cria o cartão de aba de uma turma (local/turno, UC e turma com a quantidade de alunos).
 * @param {Object} turma - Turma da matéria.
 * @returns {HTMLButtonElement} Botão da aba.
 */
function criarAbaTurmaRel(turma) {
    const aba = criarElementoRel('button', 'rel-aba');
    aba.type = 'button';
    aba.dataset.turma = turma.codigo;
    const localTurno = [turma.local, turma.turno].filter(Boolean).join(' ').toUpperCase();
    if (turma.favorita) aba.append(criarElementoRel('span', 'rel-aba-uc', '⭐ Turma favorita'));
    if (localTurno) aba.append(criarElementoRel('span', 'rel-aba-local', localTurno));
    if (turma.uc) aba.append(criarElementoRel('span', 'rel-aba-uc', turma.uc));
    aba.append(criarElementoRel('span', 'rel-aba-turma',
        turma.nome + ' (' + turma.alunos.length + ')'));
    aba.addEventListener('click', () => escolherTurmaRel(turma.codigo));
    return aba;
}

/**
 * Escolhe a turma, marca a aba ativa e redesenha a tabela.
 * @param {string} codigo - Código da turma.
 */
function escolherTurmaRel(codigo) {
    estadoRel.turmaAtual = codigo;
    document.querySelectorAll('.rel-aba').forEach((aba) =>
        aba.classList.toggle('rel-aba--ativa', aba.dataset.turma === codigo));
    renderizarTabelaRel();
}

/**
 * Carrega turmas, alunos e tentativas da matéria escolhida e desenha o relatório.
 * @param {number} materiaId - Id da matéria escolhida.
 */
async function carregarMateriaRel(materiaId) {
    const aviso = document.getElementById('relAviso');
    aviso.textContent = 'Carregando...';
    try {
        estadoRel.materia = estadoRel.materias.find((materia) => materia.id === materiaId);
        const { turmas, filtradaPorUc } = await carregarTurmasRel(estadoRel.materia);
        estadoRel.turmas = turmas;
        estadoRel.resumos = await carregarResumosRel(
            estadoRel.materia.atividades.filter((atividade) => atividade.ativo));
        document.getElementById('relAbas').replaceChildren(...turmas.map(criarAbaTurmaRel));
        aviso.textContent = filtradaPorUc ? '' : MSG_SEM_UC_REL;
        const favorita = turmas.find((turma) => turma.favorita);
        escolherTurmaRel((favorita || turmas[0])?.codigo || '');
    } catch (erro) {
        aviso.textContent = MSG_ERRO_REL + erro.message;
    }
}

/**
 * Monta o seletor de matéria (as que têm atividades cadastradas).
 */
function montarSeletorMateriaRel() {
    const lista = document.getElementById('relMateria');
    estadoRel.materias.forEach((materia) =>
        lista.add(new Option(materia.nome + ' (' + materia.atividades.length + ' atividades)',
            materia.id)));
    lista.addEventListener('change', () => carregarMateriaRel(Number(lista.value)));
}

/**
 * Mostra um bloqueio (sem login ou sem perfil) e esconde o relatório.
 * @param {string} texto - Mensagem.
 * @param {boolean} comLinkLogin - Se mostra o link para o login.
 */
function bloquearPaginaRel(texto, comLinkLogin) {
    const bloqueio = document.getElementById('relBloqueio');
    bloqueio.hidden = false;
    bloqueio.textContent = texto + ' ';
    if (comLinkLogin) {
        const link = criarElementoRel('a', '', 'Ir para o login');
        link.href = ROTA_LOGIN_REL + '?voltar=' + encodeURIComponent('/' + PAGINA_REL);
        bloqueio.appendChild(link);
    }
    document.getElementById('relConteudo').hidden = true;
}

/**
 * Inicia a página: confere o login, carrega as matérias e abre a primeira.
 */
async function iniciarRelatorioAtividades() {
    try {
        const login = await lerLoginRel();
        if (!login.ehProfessor) {
            return bloquearPaginaRel(login.logado ? MSG_SEM_PERFIL_REL : MSG_SEM_LOGIN_REL,
                !login.logado);
        }
        estadoRel.materias = agruparMateriasRel(await sbGet('atividade', CONSULTA_ATIVIDADES_REL));
        if (!estadoRel.materias.length) {
            document.getElementById('relAviso').textContent = MSG_SEM_ATIVIDADES_REL;
            return;
        }
        document.getElementById('relFiltrosArea').replaceChildren(montarFiltrosRel());
        montarSeletorMateriaRel();
        await carregarMateriaRel(estadoRel.materias[0].id);
    } catch (erro) {
        document.getElementById('relAviso').textContent = MSG_ERRO_REL + erro.message;
    }
}

iniciarRelatorioAtividades();
