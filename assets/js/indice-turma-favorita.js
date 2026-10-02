// Turma favorita no ATIVIDADES/index.html de todas as matérias (só professor logado): barra no
// topo com a lista de turmas e o botão de marcar/desmarcar a favorita (grava turma.favorito).
// Carregado por assets/js/atividades-crud-modal.js, depois de assets/js/turma-favorita.js.
// Depende de supabase-js, js/supabase.js e turma-favorita.js; usa popup.js se já estiver na página.

const SELETORES_ANTES_BARRA_FAVORITA = ['.container .resumo', '.container header'];
const CLASSE_BARRA_FAVORITA = 'barra-turma-favorita';
const PERFIL_PROFESSOR_FAVORITA = 'PROFESSOR';
const RPC_ADMINISTRADOR_FAVORITA = 'eh_professor_administrador';
const PREFIXO_OPCAO_FAVORITA = '⭐ ';

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

    let consulta = cliente.from('turma').select('codigo,nome,turno').order('nome');
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
 * Monta o texto de uma turma na lista.
 * @param {{codigo: string, nome: string, turno: string}} turma - Turma do banco.
 * @param {string} favorita - Código da turma favorita.
 * @returns {string} Texto da opção.
 */
function textoOpcaoFavorita(turma, favorita) {
    const partes = [turma.nome || turma.codigo, turma.turno].filter(Boolean).join(' · ');
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
    lista.value = favorita || turmas[0].codigo;
    rotulo.append(lista);

    const estado = { lista, turmas, favorita, botao: null };
    estado.botao = criarBotaoFavorita(CLASSE_BARRA_FAVORITA + '__botao',
        () => alternarFavoritaIndice(estado));
    lista.addEventListener('change', () => atualizarBarraFavorita(estado));
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

        const turmas = await listarTurmasVisiveisFavorita(sessao.cliente, sessao.usuario);
        const referencia = SELETORES_ANTES_BARRA_FAVORITA
            .map((seletor) => document.querySelector(seletor)).find(Boolean);
        if (!turmas.length || !referencia) return;

        const favorita = await buscarTurmaFavorita();
        referencia.after(criarBarraFavorita(turmas, favorita));
    } catch (erro) {
        console.warn('Turma favorita indisponível:', erro.message);
    }
}

iniciarTurmaFavoritaIndice();
