// ID da atividade (atividade.id do banco) em cada botão de atividade do card, para o ALUNO logado
// (#288, #290.4): a mesma etiqueta "ID NN" que o professor vê (.crud-id-atividade, em
// assets/css/atividades-crud-modal.css), para o aluno citar a atividade pelo número. O botão vindo
// do banco leva o id em data-vinculo-banco; o link do HTML acha a atividade da aula do card pela
// chave pasta/arquivo (obterChaveDaPagina). Atividade que o aluno não lê (bloqueada, RLS) fica
// sem id. Professor (que tem o dele em atividades-crud-modal.js) e visitante não recebem.
// Carregado por assets/js/atividades-crud-modal.js.
// Depende de: supabase-js, js/supabase.js (obterClienteSupabase), indice-aula-repositorio.js
// (buscarAtividadesDasAulasCard) e atividades-crud-modal.js (obterChaveDaPagina,
// formatarIdAtividadeCrud).

const SELETOR_CARD_ID_ALUNO = 'article.aula[data-aula-id]';
const SELETOR_LINK_ID_ALUNO = 'a.btn.principal';
const CLASSE_ETIQUETA_ID_ALUNO = 'crud-id-atividade crud-id-atividade--aluno';
const SELETOR_ETIQUETA_ID_ALUNO = ':scope > .crud-id-atividade--aluno';
const ATRIBUTO_VINCULO_BANCO_ID_ALUNO = 'data-vinculo-banco';
// O href some quando a atividade ou a aula é bloqueada; os endereços guardados vêm do bloqueio.
const ATRIBUTOS_ENDERECO_ID_ALUNO = ['href', 'data-href-bloqueado', 'data-href-aula-bloqueada'];
const PERFIL_ALUNO_ID_ALUNO = 'ALUNO';
const PREFIXO_ETIQUETA_ID_ALUNO = 'ID ';
// A sessão do Supabase pode demorar a ficar pronta na abertura da página.
const TENTATIVAS_PERFIL_ID_ALUNO = 10;
const ESPERA_PERFIL_ID_ALUNO = 300;
// Disparado pelo indice-aula-data.js quando a grade só do banco fica pronta (#272).
const EVENTO_CARDS_MONTADOS_ID_ALUNO = 'cards-aula-montados';
// Disparado quando o ON/OFF e os botões dos cards são refeitos.
const EVENTO_BLOQUEIO_ALTERADO_ID_ALUNO = 'aula-bloqueio-alterado';
let contadorExecucaoIdAluno = 0;

/**
 * Descobre o perfil do usuário logado.
 * @returns {Promise<string|null>} Perfil (ALUNO/PROFESSOR) ou null se não há login.
 */
async function obterPerfilIdAluno() {
    const cliente = obterClienteSupabase();
    if (!cliente) return null;

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    return usuario ? (usuario.app_metadata?.perfil || PERFIL_ALUNO_ID_ALUNO) : null;
}

/**
 * Descobre o perfil do usuário logado, esperando a sessão ficar pronta na abertura da página.
 * @returns {Promise<string|null>} Perfil (ALUNO/PROFESSOR) ou null se não há login.
 */
async function aguardarPerfilIdAluno() {
    for (let tentativa = 0; tentativa < TENTATIVAS_PERFIL_ID_ALUNO; tentativa += 1) {
        const perfil = await obterPerfilIdAluno();
        if (perfil) return perfil;
        await new Promise((resolver) => setTimeout(resolver, ESPERA_PERFIL_ID_ALUNO));
    }
    return null;
}

/**
 * Endereço do link da atividade, mesmo quando o bloqueio já tirou o href.
 * @param {HTMLAnchorElement} link - Botão de atividade.
 * @returns {string|null} Endereço do link ou null.
 */
function lerEnderecoIdAluno(link) {
    for (const atributo of ATRIBUTOS_ENDERECO_ID_ALUNO) {
        const endereco = link.getAttribute(atributo);
        if (endereco) return endereco;
    }
    return null;
}

/**
 * Id de cada atividade de uma aula, pela chave da página.
 * @param {Array<{id: number, pagina: string, aula_id: number}>} atividades - Atividades lidas.
 * @param {number} idAula - Id da aula do card.
 * @returns {Map<string, number>} Id da atividade de cada chave de página.
 */
function mapearIdsDaAulaIdAluno(atividades, idAula) {
    const mapa = new Map();
    atividades.filter((atividade) => atividade.aula_id === idAula).forEach((atividade) => {
        const chave = obterChaveDaPagina(atividade.pagina);
        if (chave) mapa.set(chave, atividade.id);
    });
    return mapa;
}

/**
 * Descobre o id da atividade de um botão do card.
 * @param {HTMLAnchorElement} link - Botão de atividade.
 * @param {Map<string, number>} idsPorChave - Id das atividades da aula, pela chave da página.
 * @returns {number|null} Id da atividade, ou null se o aluno não a lê.
 */
function descobrirIdDoBotaoIdAluno(link, idsPorChave) {
    const idDoBanco = Number(link.getAttribute(ATRIBUTO_VINCULO_BANCO_ID_ALUNO));
    if (idDoBanco) return idDoBanco;

    const chave = obterChaveDaPagina(lerEnderecoIdAluno(link));
    return (chave && idsPorChave.get(chave)) || null;
}

/**
 * Põe a etiqueta "ID NN" na frente do botão da atividade.
 * @param {HTMLAnchorElement} link - Botão de atividade.
 * @param {number} id - Id da atividade.
 */
function colocarEtiquetaIdAluno(link, id) {
    const etiqueta = document.createElement('span');
    etiqueta.className = CLASSE_ETIQUETA_ID_ALUNO;
    etiqueta.textContent = PREFIXO_ETIQUETA_ID_ALUNO + formatarIdAtividadeCrud(id);
    link.prepend(etiqueta);
}

/**
 * Refaz as etiquetas de id dos botões de um card.
 * @param {HTMLElement} card - Card da aula (article.aula com data-aula-id).
 * @param {Object[]} atividades - Atividades das aulas dos cards, lidas do banco.
 */
function aplicarIdsNoCardIdAluno(card, atividades) {
    const idsPorChave = mapearIdsDaAulaIdAluno(atividades, Number(card.dataset.aulaId));
    card.querySelectorAll(SELETOR_LINK_ID_ALUNO).forEach((link) => {
        link.querySelector(SELETOR_ETIQUETA_ID_ALUNO)?.remove();
        const id = descobrirIdDoBotaoIdAluno(link, idsPorChave);
        if (id) colocarEtiquetaIdAluno(link, id);
    });
}

/**
 * Põe o id nos botões de atividade de todos os cards, só para o aluno logado. Só a execução mais
 * recente aplica o resultado (evita corrida entre os eventos da grade e o load). Falha de rede não
 * quebra o índice.
 */
async function aplicarIdsDoAluno() {
    contadorExecucaoIdAluno += 1;
    const minhaExecucao = contadorExecucaoIdAluno;
    try {
        if (await aguardarPerfilIdAluno() !== PERFIL_ALUNO_ID_ALUNO) return;

        const cards = [...document.querySelectorAll(SELETOR_CARD_ID_ALUNO)];
        const repositorioPronto = typeof buscarAtividadesDasAulasCard === 'function';
        if (!cards.length || !repositorioPronto) return;

        const idsDasAulas = cards.map((card) => Number(card.dataset.aulaId));
        const atividades = await buscarAtividadesDasAulasCard(idsDasAulas);
        if (minhaExecucao !== contadorExecucaoIdAluno) return;

        cards.forEach((card) => aplicarIdsNoCardIdAluno(card, atividades));
    } catch (erro) {
        console.warn('IDs das atividades indisponíveis para o aluno:', erro.message);
    }
}

document.addEventListener(EVENTO_CARDS_MONTADOS_ID_ALUNO, aplicarIdsDoAluno);
document.addEventListener(EVENTO_BLOQUEIO_ALTERADO_ID_ALUNO, aplicarIdsDoAluno);
// Rede de segurança: se o evento da grade chegar antes deste módulo, o fim do carregamento põe.
window.addEventListener('load', aplicarIdsDoAluno);
aplicarIdsDoAluno();
