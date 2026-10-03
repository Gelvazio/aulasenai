// Turma da exportação em PDF — REGRA GLOBAL de todas as atividades e avaliações.
// Para o PROFESSOR logado, coloca uma lista "Turma" no início da .export-bar (antes dos botões
// de exportar). Se o professor tiver só 1 turma, ela já vem escolhida; com mais de uma, ele
// precisa escolher antes de exportar. A turma escolhida preenche o campo "Turma" do PDF.
// Turmas visíveis: o administrador (confirmado pelo banco) vê todas; os demais professores, só
// os vínculos próprios em turmaprofessor. Aluno ou sem login: sem lista, campo em branco.
// Carregado por assets/js/atividade.js (ou direto pela página). Inclui sozinho o
// assets/css/turma-exportacao.css. Depende de js/supabase.js (carregado pela página ou
// pelo js/header-usuario.js); usa popup.js quando estiver na página.

const ID_LISTA_TURMA_EXPORTACAO = 'turmaExportacao';
const CLASSE_CAMPO_TURMA_EXPORTACAO = 'turma-exportacao';
const PERFIL_PROFESSOR_EXPORTACAO = 'PROFESSOR';
const RPC_ADMINISTRADOR_EXPORTACAO = 'eh_professor_administrador';
const TEXTO_ESCOLHA_TURMA_EXPORTACAO = 'Selecione a turma…';
const TEXTO_SEM_TURMA_EXPORTACAO = 'Nenhuma turma vinculada a você';
const MSG_ESCOLHER_TURMA_EXPORTACAO = 'Selecione a turma antes de exportar.';
const TURMA_EM_BRANCO_PDF = '___________________';
const TENTATIVAS_CLIENTE_EXPORTACAO = 20;
const INTERVALO_CLIENTE_EXPORTACAO_MS = 250;
const ORIGEM_TURMA_EXPORTACAO = document.currentScript?.src || '';
const CSS_TURMA_EXPORTACAO = 'css/turma-exportacao.css';

/**
 * Inclui o assets/css/turma-exportacao.css (caminho calculado a partir deste script).
 */
function incluirCssTurmaExportacao() {
    if (!ORIGEM_TURMA_EXPORTACAO) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = ORIGEM_TURMA_EXPORTACAO.replace(/js\/[^/]*$/, CSS_TURMA_EXPORTACAO);
    document.head.append(link);
}

/**
 * Espera um intervalo sem bloquear a página.
 * @param {number} milissegundos - Tempo de espera.
 * @returns {Promise<void>} Resolve depois do intervalo.
 */
function esperarExportacao(milissegundos) {
    return new Promise((resolver) => setTimeout(resolver, milissegundos));
}

/**
 * Obtém o cliente do Supabase; espera o header-usuario.js carregar o supabase.js quando a
 * página não o inclui.
 * @returns {Promise<Object|null>} Cliente do Supabase ou null se não ficou disponível.
 */
async function obterClienteExportacao() {
    for (let i = 0; i < TENTATIVAS_CLIENTE_EXPORTACAO; i++) {
        const cliente = typeof obterClienteSupabase === 'function' ? obterClienteSupabase() : null;
        if (cliente) return cliente;
        await esperarExportacao(INTERVALO_CLIENTE_EXPORTACAO_MS);
    }
    return null;
}

/**
 * Lê o professor logado (perfil vem do app_metadata do Supabase Auth).
 * @param {Object} cliente - Cliente do Supabase.
 * @returns {Promise<Object|null>} Usuário professor ou null.
 */
async function lerProfessorExportacao(cliente) {
    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    if (usuario?.app_metadata?.perfil !== PERFIL_PROFESSOR_EXPORTACAO) return null;
    return usuario;
}

/**
 * Lista as turmas do professor: todas para o administrador; senão, as da turmaprofessor.
 * @param {Object} cliente - Cliente autenticado do Supabase.
 * @param {Object} usuario - Professor logado.
 * @returns {Promise<Object[]>} Turmas {codigo, nome, turno} em ordem de nome.
 * @throws {Error} Se o banco recusar a consulta.
 */
async function listarTurmasDoProfessorExportacao(cliente, usuario) {
    const { data: ehAdministrador, error: erroAdministrador } =
        await cliente.rpc(RPC_ADMINISTRADOR_EXPORTACAO);
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
 * Texto da turma na lista e no PDF: "Nome · Turno (código)".
 * @param {{codigo: string, nome: string, turno: string}} turma - Turma do banco.
 * @returns {string} Texto da turma.
 */
function textoTurmaExportacao(turma) {
    const partes = [turma.nome || turma.codigo, turma.turno].filter(Boolean).join(' · ');
    return partes + ' (' + turma.codigo + ')';
}

/**
 * Cria uma opção da lista.
 * @param {string} valor - Valor da opção.
 * @param {string} texto - Texto exibido.
 * @returns {HTMLOptionElement} Opção criada.
 */
function criarOpcaoExportacao(valor, texto) {
    const opcao = document.createElement('option');
    opcao.value = valor;
    opcao.textContent = texto;
    return opcao;
}

/**
 * Monta o campo "Turma" com a lista; 1 turma = já escolhida, várias = o professor escolhe.
 * @param {Object[]} turmas - Turmas do professor.
 * @returns {HTMLLabelElement} Campo pronto para a .export-bar.
 */
function criarCampoTurmaExportacao(turmas) {
    const campo = document.createElement('label');
    campo.className = CLASSE_CAMPO_TURMA_EXPORTACAO;
    campo.htmlFor = ID_LISTA_TURMA_EXPORTACAO;
    campo.textContent = 'Turma: ';
    const lista = document.createElement('select');
    lista.id = ID_LISTA_TURMA_EXPORTACAO;

    if (!turmas.length) {
        lista.append(criarOpcaoExportacao('', TEXTO_SEM_TURMA_EXPORTACAO));
        lista.disabled = true;
    }
    if (turmas.length > 1) lista.append(criarOpcaoExportacao('', TEXTO_ESCOLHA_TURMA_EXPORTACAO));
    turmas.forEach((turma) =>
        lista.append(criarOpcaoExportacao(turma.codigo, textoTurmaExportacao(turma))));
    campo.append(lista);
    return campo;
}

/**
 * Coloca a lista de turmas antes dos botões de exportar (só professor logado).
 */
async function iniciarTurmaExportacao() {
    const barra = document.querySelector('.export-bar');
    if (!barra || document.getElementById(ID_LISTA_TURMA_EXPORTACAO)) return;

    try {
        const cliente = await obterClienteExportacao();
        if (!cliente) return;

        const usuario = await lerProfessorExportacao(cliente);
        if (!usuario) return;

        const turmas = await listarTurmasDoProfessorExportacao(cliente, usuario);
        incluirCssTurmaExportacao();
        barra.prepend(criarCampoTurmaExportacao(turmas));
    } catch (erro) {
        console.warn('Não foi possível carregar as turmas para a exportação:', erro);
    }
}

/**
 * Avisa o professor (popup quando disponível).
 * @param {string} texto - Mensagem.
 */
async function avisarTurmaExportacao(texto) {
    if (typeof window.mostrarPopup === 'function') {
        await mostrarPopup(texto, { tipo: 'aviso' });
        return;
    }
    console.warn(texto);
}

/**
 * Turma que vai no campo "Turma" do PDF. Sem lista (aluno, sem login ou professor sem turma),
 * o campo fica em branco para preencher à mão.
 * @returns {Promise<string|null>} Texto da turma, linha em branco, ou null quando o professor
 *     ainda precisa escolher a turma (a exportação deve parar).
 */
async function obterTurmaParaExportacao() {
    const lista = document.getElementById(ID_LISTA_TURMA_EXPORTACAO);
    const semLista = !lista || lista.disabled;
    if (semLista) return TURMA_EM_BRANCO_PDF;

    if (!lista.value) {
        lista.focus();
        await avisarTurmaExportacao(MSG_ESCOLHER_TURMA_EXPORTACAO);
        return null;
    }
    return lista.options[lista.selectedIndex].textContent;
}

// Carregado dinamicamente pelo atividade.js: se o "load" já passou, inicia na hora.
if (document.readyState === 'complete') {
    iniciarTurmaExportacao();
} else {
    window.addEventListener('load', iniciarTurmaExportacao);
}
