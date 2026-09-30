// Turma favorita no ATIVIDADES/index.html de todas as matérias (só professor logado): barra no
// topo com a lista de turmas e o botão de marcar/desmarcar a favorita (grava turma.favorito).
// Carregado por assets/js/atividades-crud-modal.js, depois de assets/js/turma-favorita.js.
// Depende de supabase-js, js/supabase.js e turma-favorita.js; usa popup.js se já estiver na página.

const SELETORES_ANTES_BARRA_FAVORITA = ['.container .resumo', '.container header'];
const CLASSE_BARRA_FAVORITA = 'barra-turma-favorita';
const PERFIL_PROFESSOR_FAVORITA = 'PROFESSOR';
const PREFIXO_OPCAO_FAVORITA = '⭐ ';

/**
 * Indica se há professor logado.
 * @returns {Promise<boolean>} true se o usuário logado é professor.
 */
async function usuarioEhProfessorFavorita() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    const { data } = await cliente.auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_FAVORITA;
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
        if (!await usuarioEhProfessorFavorita()) return;

        const turmas = await sbGet('turma', 'select=codigo,nome,turno&order=nome');
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
