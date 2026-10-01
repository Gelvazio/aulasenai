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
const TEXTO_SELECIONE_ALUNO_REL = 'Seleciona o aluno';
const MATERIA_PADRAO_REL = 'Introdução à Tecnologia da Informação e Comunicação';
const TITULO_FILTRO_ATIVIDADES_REL = 'Atividades da matéria (nenhuma ligada = todas)';

const estadoRel = {
    materias: [], materia: null, turmas: [], turmaAtual: '', resumos: new Map(),
    alunoSelecionado: '', notasVisiveis: false, soNaoAtingiu: true, fez: new Set(), status: new Set(),
    tentativas: new Set(), atividadesFiltro: new Set(),
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
 * @param {boolean} [ligado] - Estado inicial (padrão desligado).
 * @returns {HTMLLabelElement} Interruptor pronto.
 */
function criarInterruptorRel(texto, aoMudar, ligado = false) {
    const etiqueta = criarElementoRel('label', 'rel-interruptor');
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = ligado;
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
 * Cria, em uma nova linha, a lista "Aluno Selecionado" e o botão "Carregar Respostas".
 * @returns {HTMLElement} Linha pronta (a lista é preenchida por atualizarAlunosSelecionaveisRel).
 */
function criarLinhaAlunoSelecionadoRel() {
    const linha = criarElementoRel('div', 'rel-linha-aluno');
    const etiqueta = criarElementoRel('label', 'rel-filtro-aluno', 'Aluno Selecionado ');
    const lista = document.createElement('select');
    lista.id = 'relAlunoSelecionado';
    lista.add(new Option(TEXTO_SELECIONE_ALUNO_REL, ''));
    lista.addEventListener('change', () => {
        estadoRel.alunoSelecionado = lista.value;
        document.getElementById('relConferencia').replaceChildren();
        renderizarTabelaRel();
    });
    etiqueta.appendChild(lista);
    const botao = criarElementoRel('button', 'rel-botao', 'Carregar Respostas');
    botao.type = 'button';
    botao.addEventListener('click', carregarRespostasDoAlunoRel);
    linha.append(etiqueta, botao);
    return linha;
}

/**
 * Preenche a lista "Aluno Selecionado" com TODOS os alunos da turma (ordem alfabética).
 * @param {Object} turma - Turma escolhida.
 */
function atualizarAlunosSelecionaveisRel(turma) {
    const lista = document.getElementById('relAlunoSelecionado');
    if (!lista) return;

    lista.replaceChildren(new Option(TEXTO_SELECIONE_ALUNO_REL, ''));
    (turma?.alunos || []).forEach((aluno) => lista.add(new Option(
        aluno.nome + (aluno.cadastrado ? '' : ' (sem cadastro)'), aluno.email)));
    const aindaExiste = (turma?.alunos || []).some((aluno) => aluno.email === estadoRel.alunoSelecionado);
    if (!aindaExiste) estadoRel.alunoSelecionado = '';
    lista.value = estadoRel.alunoSelecionado;
}

/**
 * Monta a tabela de conferência de uma atividade (item, resposta do aluno e a certa).
 * @param {{atividade: Object, tentativa: number, itens: Object[]}} dados - Respostas da atividade.
 * @returns {HTMLDetailsElement} Bloco recolhível da atividade.
 */
function montarConferenciaAtividadeRel(dados) {
    const acertos = dados.itens.filter((linha) => linha.marcada === linha.certa).length;
    const bloco = criarElementoRel('details', 'rel-conferencia-atividade');
    bloco.appendChild(criarElementoRel('summary', '', formatarAulaRel(dados.atividade.aulas?.numero) +
        ' — ' + dados.atividade.descricao + ' · tentativa ' + dados.tentativa + ' · ' + acertos +
        ' de ' + dados.itens.length + ' certas'));
    const grade = criarElementoRel('div', 'rel-conferencia-grade');
    dados.itens.forEach((linha) => {
        const ok = linha.marcada && linha.marcada === linha.certa;
        const celula = criarElementoRel('span', 'rel-item ' + (ok ? 'rel-item--certa' : 'rel-item--errada'),
            String(linha.item).padStart(2, '0') + ': ' + (linha.marcada || '—') +
            (ok ? ' ✅' : ' ❌ (certa ' + linha.certa + ')'));
        grade.appendChild(celula);
    });
    bloco.appendChild(grade);
    return bloco;
}

/**
 * Botão "Carregar Respostas": pega o aluno selecionado e mostra as respostas dele em cada
 * atividade ativa da matéria, marcadas como certas ou erradas, para o professor conferir.
 */
async function carregarRespostasDoAlunoRel() {
    const area = document.getElementById('relConferencia');
    const turma = estadoRel.turmas.find((item) => item.codigo === estadoRel.turmaAtual);
    const aluno = turma?.alunos.find((item) => item.email === estadoRel.alunoSelecionado);
    if (!aluno) {
        area.textContent = 'Selecione um aluno em "Aluno Selecionado" antes de carregar as respostas.';
        return;
    }
    if (!aluno.id) {
        area.textContent = aluno.nome + ' ainda não tem cadastro no banco: não há respostas.';
        return;
    }
    area.textContent = 'Carregando respostas de ' + aluno.nome + '...';
    try {
        const dados = await carregarRespostasAlunoRel(aluno.id, obterAtividadesFiltradasRel());
        area.replaceChildren(criarElementoRel('h3', '', 'Respostas de ' + aluno.nome));
        if (!dados.length) area.append('Este aluno ainda não respondeu nenhuma atividade desta matéria.');
        dados.forEach((item) => area.appendChild(montarConferenciaAtividadeRel(item)));
    } catch (erro) {
        area.textContent = MSG_ERRO_REL + erro.message;
    }
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
            (ligado) => { estadoRel.soNaoAtingiu = ligado; renderizarTabelaRel(); },
            estadoRel.soNaoAtingiu)]),
        criarGrupoFiltroRel('Tentativas', QUANTIDADES_REL.map((quantidade) =>
            criarInterruptorRel(quantidade + 'x',
                alternarNoConjuntoRel(estadoRel.tentativas, quantidade)))),
        criarLinhaAlunoSelecionadoRel(),
    );
    return barra;
}

/**
 * Devolve as atividades ativas da matéria em ordem de aula (e de id).
 * @param {Object[]} atividades - Atividades da matéria.
 * @returns {Object[]} Atividades ativas ordenadas.
 */
function ordenarAtividadesAtivasRel(atividades) {
    return atividades.filter((atividade) => atividade.ativo).sort((a, b) =>
        (a.aulas?.numero ?? 0) - (b.aulas?.numero ?? 0) || a.id - b.id);
}

/**
 * Atividades da matéria que entram no relatório: as ligadas no quadro de atividades ou, se
 * nenhuma estiver ligada, todas.
 * @returns {Object[]} Atividades consideradas.
 */
function obterAtividadesFiltradasRel() {
    const atividades = estadoRel.materia?.atividades || [];
    if (!estadoRel.atividadesFiltro.size) return atividades;

    return atividades.filter((atividade) => estadoRel.atividadesFiltro.has(String(atividade.id)));
}

/**
 * Monta o quadro de filtros por atividade da matéria escolhida (um interruptor ON/OFF por
 * atividade ativa, todos desligados = todas as atividades).
 */
function montarFiltroAtividadesRel() {
    estadoRel.atividadesFiltro.clear();
    const quadro = document.getElementById('relQuadroAtividades');
    const ativas = ordenarAtividadesAtivasRel(estadoRel.materia?.atividades || []);
    quadro.hidden = ativas.length === 0;
    const interruptores = ativas.map((atividade) => criarInterruptorRel(
        formatarAulaRel(atividade.aulas?.numero) + ' — ' + atividade.descricao,
        alternarNoConjuntoRel(estadoRel.atividadesFiltro, String(atividade.id))));
    document.getElementById('relFiltroAtividades').replaceChildren(
        criarGrupoFiltroRel(TITULO_FILTRO_ATIVIDADES_REL, interruptores));
}

/**
 * Diz se um aluno passa pelos filtros globais.
 * @param {Object} resumo - Resumo do aluno.
 * @param {Object} aluno - Aluno da turma.
 * @returns {boolean} true se deve aparecer.
 */
function passaNosFiltrosRel(resumo, aluno) {
    const { fez, status, tentativas } = estadoRel;
    if (estadoRel.alunoSelecionado && aluno.email !== estadoRel.alunoSelecionado) return false;
    if (estadoRel.soNaoAtingiu && !resumo.naoAtingiu) return false;
    if (fez.size === 1 && !fez.has(resumo.fez ? 'sim' : 'nao')) return false;
    const passaStatus = (status.has('entregue') && resumo.entregue) ||
        (status.has('andamento') && resumo.andamento);
    if (status.size > 0 && !passaStatus) return false;
    return tentativas.size === 0 || tentativas.has(String(resumo.tentativas));
}

/**
 * Formata o número da aula ("Aula 01") ou "—" se a atividade não estiver ligada a uma aula.
 * @param {number|undefined} numero - Número da aula.
 * @returns {string} Texto da aula.
 */
function formatarAulaRel(numero) {
    return numero ? 'Aula ' + String(numero).padStart(2, '0') : '—';
}

/**
 * Cria a célula com o botão "Carregar Respostas" de uma atividade do aluno (só se ele respondeu).
 * @param {Object} aluno - Aluno da linha.
 * @param {{atividade: Object, tentativas: number}} detalhe - Atividade e tentativas do aluno.
 * @returns {HTMLTableCellElement} Célula com o botão ou vazia.
 */
function criarCelulaCarregarRespostasRel(aluno, detalhe) {
    const celula = criarElementoRel('td');
    if (!aluno.id || detalhe.tentativas === 0) return celula;

    const botao = criarElementoRel('button', 'rel-botao rel-botao--pequeno', 'Carregar Respostas');
    botao.type = 'button';
    botao.addEventListener('click', () => carregarRespostasDaAtividadeRel(aluno, detalhe.atividade));
    celula.appendChild(botao);
    return celula;
}

/**
 * Carrega, no cartão de conferência, as respostas do aluno em UMA atividade (tentativa mais
 * recente), marcadas como certas ou erradas.
 * @param {Object} aluno - Aluno da linha.
 * @param {Object} atividade - Atividade escolhida.
 */
async function carregarRespostasDaAtividadeRel(aluno, atividade) {
    const area = document.getElementById('relConferencia');
    area.textContent = 'Carregando respostas de ' + aluno.nome + '...';
    try {
        const dados = await carregarRespostasAlunoRel(aluno.id, [{ ...atividade, ativo: true }]);
        area.replaceChildren(criarElementoRel('h3', '', 'Respostas de ' + aluno.nome));
        if (!dados.length) area.append('Este aluno ainda não respondeu esta atividade.');
        dados.forEach((item) => {
            const bloco = montarConferenciaAtividadeRel(item);
            bloco.open = true;
            area.appendChild(bloco);
        });
        area.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (erro) {
        area.textContent = MSG_ERRO_REL + erro.message;
    }
}

/**
 * Monta a linha de detalhe com as notas de cada atividade do aluno.
 * @param {Object} resumo - Resumo do aluno.
 * @param {Object} aluno - Aluno da linha (id usado para carregar as respostas).
 * @returns {HTMLTableRowElement} Linha de detalhe.
 */
function montarDetalheRel(resumo, aluno) {
    const tabela = criarElementoRel('table', 'rel-tabela-detalhe');
    const cabecalho = tabela.createTHead().insertRow();
    ['Aula', 'Atividade', 'Tentativas', 'Situação', 'Melhor nota', 'Respostas'].forEach((texto) =>
        cabecalho.appendChild(criarElementoRel('th', '', texto)));
    const corpo = tabela.createTBody();
    resumo.detalhes.forEach((detalhe) => {
        const linha = corpo.insertRow();
        [formatarAulaRel(detalhe.atividade.aulas?.numero), detalhe.atividade.descricao,
            detalhe.tentativas, TEXTO_STATUS_REL[detalhe.status],
            estadoRel.notasVisiveis ? formatarNotaRel(detalhe.melhorNota) : '••••'].forEach((valor) =>
            linha.appendChild(criarElementoRel('td', '', String(valor))));
        linha.appendChild(criarCelulaCarregarRespostasRel(aluno, detalhe));
    });
    const linhaDetalhe = criarElementoRel('tr', 'rel-detalhe');
    linhaDetalhe.hidden = true;
    const celula = criarElementoRel('td');
    celula.colSpan = 7;
    celula.appendChild(tabela);
    linhaDetalhe.appendChild(celula);
    return linhaDetalhe;
}

/**
 * Faz a linha do aluno funcionar como acordeão: clicar (ou Enter/Espaço) expande e recolhe as
 * atividades do aluno logo abaixo.
 * @param {HTMLTableRowElement} linha - Linha do aluno.
 * @param {HTMLTableRowElement} detalhe - Linha com as atividades do aluno.
 */
function tornarLinhaAcordeaoRel(linha, detalhe) {
    linha.classList.add('rel-linha-acordeao');
    linha.tabIndex = 0;
    linha.setAttribute('role', 'button');
    linha.setAttribute('aria-expanded', 'false');
    const alternar = () => {
        detalhe.hidden = !detalhe.hidden;
        linha.setAttribute('aria-expanded', String(!detalhe.hidden));
        linha.classList.toggle('rel-linha-acordeao--aberta', !detalhe.hidden);
    };
    linha.addEventListener('click', alternar);
    linha.addEventListener('keydown', (evento) => {
        if (evento.key !== 'Enter' && evento.key !== ' ') return;
        evento.preventDefault();
        alternar();
    });
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
    const detalhe = montarDetalheRel(resumo, aluno);
    bloco.appendChild(detalhe);
    tornarLinhaAcordeaoRel(linha, detalhe);
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
    const atividades = obterAtividadesFiltradasRel();
    turma.alunos.forEach((aluno) => {
        const resumo = calcularResumoAlunoRel(aluno, atividades, estadoRel.resumos);
        if (!passaNosFiltrosRel(resumo, aluno)) return;

        tabela.appendChild(montarBlocoAlunoRel(aluno, resumo));
        visiveis += 1;
    });
    document.getElementById('relResumo').textContent = visiveis + ' de ' + turma.alunos.length +
        ' aluno(s) · ' + ordenarAtividadesAtivasRel(atividades).length +
        ' atividade(s) ativa(s) no relatório.';
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
    atualizarAlunosSelecionaveisRel(estadoRel.turmas.find((turma) => turma.codigo === codigo));
    document.getElementById('relConferencia')?.replaceChildren();
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
        montarFiltroAtividadesRel();
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
 * @param {number} idSelecionado - Id da matéria que abre selecionada.
 */
function montarSeletorMateriaRel(idSelecionado) {
    const lista = document.getElementById('relMateria');
    estadoRel.materias.forEach((materia) =>
        lista.add(new Option(materia.nome + ' (' + materia.atividades.length + ' atividades)',
            materia.id)));
    lista.value = String(idSelecionado);
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
        const padrao = estadoRel.materias.find((materia) =>
            normalizarTextoRel(materia.nome) === normalizarTextoRel(MATERIA_PADRAO_REL))
            || estadoRel.materias[0];
        montarSeletorMateriaRel(padrao.id);
        await carregarMateriaRel(padrao.id);
    } catch (erro) {
        document.getElementById('relAviso').textContent = MSG_ERRO_REL + erro.message;
    }
}

iniciarRelatorioAtividades();
