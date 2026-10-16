// Turma favorita no ATIVIDADES/index.html de todas as matérias (só professor logado): barra no
// topo com a lista de turmas e o botão de marcar/desmarcar a favorita (grava turma.favorito).
// Trocar a turma da lista dispara o evento 'turma-indice-alterada' (detail = código da turma), que
// faz o indice-atividades-bloqueio.js remontar o ON/OFF das atividades para aquela turma (#190)
// e o indice-aula-data.js reler o bloqueio da aula nela (#206). A lista abre na turma favorita.
// A lista mostra só as turmas vinculadas à matéria da página na tabela turma_materia (cadastro
// no botão 📚 Matérias de turmas.html, #211); matéria sem vínculo (ou não achada) = todas.
// Carregado por assets/js/atividades-crud-modal.js, depois de assets/js/turma-favorita.js.
// Depende de supabase-js, js/supabase.js e turma-favorita.js; usa popup.js se já estiver na página.

const SELETORES_ANTES_BARRA_FAVORITA = ['.container .resumo', '.container header'];
const CLASSE_BARRA_FAVORITA = 'barra-turma-favorita';
const PERFIL_PROFESSOR_FAVORITA = 'PROFESSOR';
const RPC_ADMINISTRADOR_FAVORITA = 'eh_professor_administrador';
const PREFIXO_OPCAO_FAVORITA = '⭐ ';
const EVENTO_TURMA_ESCOLHIDA_INDICE = 'turma-indice-alterada';
const PASTA_ATIVIDADES_FAVORITA = 'ATIVIDADES';
const TABELA_MATERIA_FAVORITA = 'materia';
const TABELA_TURMA_MATERIA_FAVORITA = 'turma_materia';

/**
 * Devolve a sessão do professor logado.
 * @returns {Promise<{cliente: Object, usuario: Object}|null>} Sessão do professor ou null.
 */
async function obterSessaoProfessorFavorita() {
    const cliente = obterClienteSupabase();
    if (!cliente) return null;

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    if (usuario?.app_metadata?.perfil !== PERFIL_PROFESSOR_FAVORITA) return null;
    return { cliente, usuario };
}

/**
 * Lista as turmas permitidas ao professor. O administrador, confirmado pelo banco, vê todas;
 * os demais professores veem somente os vínculos próprios em turmaprofessor.
 * @param {Object} cliente - Cliente autenticado do Supabase.
 * @param {Object} usuario - Usuário da sessão atual.
 * @returns {Promise<Object[]>} Turmas visíveis ao professor.
 */
async function listarTurmasVisiveisFavorita(cliente, usuario) {
    const { data: ehAdministrador, error: erroAdministrador } =
        await cliente.rpc(RPC_ADMINISTRADOR_FAVORITA);
    if (erroAdministrador) throw erroAdministrador;

    let consulta = cliente.from('turma').select('codigo,nome,turno,unidade:unidade_id(nome)').order('nome');
    if (ehAdministrador !== true) {
        const { data: vinculos, error: erroVinculos } = await cliente
            .from('turmaprofessor').select('turma_codigo').eq('professor_id', usuario.id);
        if (erroVinculos) throw erroVinculos;

        const codigos = [...new Set((vinculos || []).map((vinculo) => vinculo.turma_codigo))];
        if (!codigos.length) return [];
        consulta = consulta.in('codigo', codigos);
    }

    const { data: turmas, error: erroTurmas } = await consulta;
    if (erroTurmas) throw erroTurmas;
    return turmas || [];
}

/**
 * Nome da matéria pela pasta do endereço (.../<MATERIA>/ATIVIDADES/index.html), com espaços no
 * lugar dos hífens, como na coluna materia.descricao.
 * @returns {string} Nome da matéria ou texto vazio.
 */
function lerNomeMateriaFavorita() {
    const partes = decodeURIComponent(location.pathname).split('/').filter(Boolean);
    const posicao = partes.map((parte) => parte.toUpperCase())
        .lastIndexOf(PASTA_ATIVIDADES_FAVORITA);
    if (posicao < 1) return '';

    return partes[posicao - 1].replace(/-/g, ' ');
}

/**
 * Códigos das turmas vinculadas à matéria da página (tabela turma_materia).
 * @param {Object} cliente - Cliente autenticado do Supabase.
 * @returns {Promise<Set<string>|null>} Códigos, ou null se a matéria não for achada ou não
 *   tiver turma vinculada (aí a lista mostra todas as turmas — decisão D1 da #211).
 * @throws {Error} Erro do banco.
 */
async function buscarTurmasDaMateriaFavorita(cliente) {
    const nome = lerNomeMateriaFavorita();
    if (!nome) return null;

    const { data: materias, error: erroMateria } = await cliente
        .from(TABELA_MATERIA_FAVORITA).select('id').ilike('descricao', nome);
    if (erroMateria) throw erroMateria;
    if (materias?.length !== 1) return null;

    const { data: vinculos, error: erroVinculos } = await cliente
        .from(TABELA_TURMA_MATERIA_FAVORITA).select('turma_codigo')
        .eq('materia_id', materias[0].id);
    if (erroVinculos) throw erroVinculos;
    if (!vinculos?.length) return null;
    return new Set(vinculos.map((vinculo) => vinculo.turma_codigo));
}

/**
 * Deixa só as turmas da matéria da página.
 * @param {Object[]} turmas - Turmas visíveis ao professor.
 * @param {Set<string>|null} codigosDaMateria - Turmas da matéria (null = sem filtro).
 * @returns {Object[]} Turmas que ficam na lista.
 */
function filtrarTurmasDaMateriaFavorita(turmas, codigosDaMateria) {
    if (!codigosDaMateria) return turmas;
    return turmas.filter((turma) => codigosDaMateria.has(turma.codigo));
}

/**
 * Monta o texto de uma turma na lista.
 * @param {{codigo: string, nome: string, turno: string}} turma - Turma do banco.
 * @param {string} favorita - Código da turma favorita.
 * @returns {string} Texto da opção.
 */
function textoOpcaoFavorita(turma, favorita) {
    const partes = acrescentarUnidadeTurma(turma.nome || turma.codigo, turma);
    const prefixo = turma.codigo === favorita ? PREFIXO_OPCAO_FAVORITA : '';
    return prefixo + partes + ' (' + turma.codigo + ')';
}

/**
 * Atualiza as opções da lista e o texto do botão conforme a favorita atual.
 * @param {{lista: HTMLSelectElement, botao: HTMLButtonElement, turmas: object[],
 *   favorita: string}} estado - Estado da barra.
 */
function atualizarBarraFavorita(estado) {
    [...estado.lista.options].forEach((opcao, indice) => {
        opcao.textContent = textoOpcaoFavorita(estado.turmas[indice], estado.favorita);
    });
    atualizarBotaoFavorita(estado.botao, estado.lista.value === estado.favorita);
}

/**
 * Marca ou desmarca como favorita a turma escolhida na lista.
 * @param {object} estado - Estado da barra (ver atualizarBarraFavorita).
 */
async function alternarFavoritaIndice(estado) {
    const nova = estado.lista.value === estado.favorita ? '' : estado.lista.value;
    estado.botao.disabled = true;
    try {
        await definirTurmaFavorita(nova);
        estado.favorita = nova;
        // O bloqueio das atividades vale para a favorita: avisa o indice-atividades-bloqueio.js.
        document.dispatchEvent(new CustomEvent('turma-favorita-alterada', { detail: nova }));
    } catch (erro) {
        if (typeof window.mostrarPopup === 'function') {
            await mostrarPopup(erro.message, { tipo: 'erro' });
        } else {
            console.warn(erro.message);
        }
    }
    estado.botao.disabled = false;
    atualizarBarraFavorita(estado);
}

/**
 * Avisa o índice (ON/OFF de bloqueio das atividades, indice-atividades-bloqueio.js) qual turma
 * está escolhida.
 * @param {string} turmaCodigo - Código da turma escolhida na lista.
 */
function avisarTurmaEscolhidaIndice(turmaCodigo) {
    document.dispatchEvent(new CustomEvent(EVENTO_TURMA_ESCOLHIDA_INDICE, { detail: turmaCodigo }));
}

/**
 * Cria a barra com a lista de turmas e o botão de favorita.
 * @param {object[]} turmas - Turmas do banco.
 * @param {string} favorita - Código da turma favorita.
 * @returns {HTMLDivElement} Barra pronta.
 */
function criarBarraFavorita(turmas, favorita) {
    const barra = document.createElement('div');
    barra.className = CLASSE_BARRA_FAVORITA;
    const rotulo = document.createElement('label');
    rotulo.className = CLASSE_BARRA_FAVORITA + '__rotulo';
    rotulo.textContent = 'Turma:';
    const lista = document.createElement('select');
    lista.className = CLASSE_BARRA_FAVORITA + '__lista';
    turmas.forEach((turma) => lista.append(new Option('', turma.codigo)));
    // A favorita pode não ser da matéria da página: aí a lista abre na primeira turma.
    const favoritaNaLista = turmas.some((turma) => turma.codigo === favorita);
    lista.value = favoritaNaLista ? favorita : turmas[0].codigo;
    rotulo.append(lista);

    const estado = { lista, turmas, favorita, botao: null };
    estado.botao = criarBotaoFavorita(CLASSE_BARRA_FAVORITA + '__botao',
        () => alternarFavoritaIndice(estado));
    lista.addEventListener('change', () => {
        atualizarBarraFavorita(estado);
        avisarTurmaEscolhidaIndice(lista.value);
    });
    barra.append(rotulo, estado.botao);
    atualizarBarraFavorita(estado);
    return barra;
}

/**
 * Inicia a barra da turma favorita. Falhas de rede não quebram o índice.
 */
async function iniciarTurmaFavoritaIndice() {
    try {
        const sessao = await obterSessaoProfessorFavorita();
        if (!sessao) return;

        const [visiveis, codigosDaMateria] = await Promise.all([
            listarTurmasVisiveisFavorita(sessao.cliente, sessao.usuario),
            buscarTurmasDaMateriaFavorita(sessao.cliente)]);
        const turmas = filtrarTurmasDaMateriaFavorita(visiveis, codigosDaMateria);
        const referencia = SELETORES_ANTES_BARRA_FAVORITA
            .map((seletor) => document.querySelector(seletor)).find(Boolean);
        if (!turmas.length || !referencia) return;

        const favorita = await buscarTurmaFavorita();
        const barra = criarBarraFavorita(turmas, favorita);
        referencia.after(barra);
        avisarTurmaEscolhidaIndice(barra.querySelector('select').value);
    } catch (erro) {
        console.warn('Turma favorita indisponível:', erro.message);
    }
}

iniciarTurmaFavoritaIndice();
