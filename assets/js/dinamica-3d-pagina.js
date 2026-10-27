// Atividade Dinâmica no PC (tarefa #410): liga a página da atividade ao banco.
// Aluno: carrega o rascunho, salva e entrega. Professor: pré-visualiza sem gravar.
// Depende de nota-dinamica-repositorio.js, entrega-dinamica-repositorio.js e dos
// módulos dinamica-3d-*.js. Regra: docs/regras/atividade-dinamica.md

const ID_RAIZ_DINAMICA_3D = 'dinamica-3d';
const MSG_SEM_ATIVIDADE_3D = 'Esta atividade ainda não está cadastrada no banco.';
const MSG_SEM_LOGIN_3D = 'Entre com o seu login para fazer a atividade.';
const MSG_SEM_DADOS_AULA_3D = 'Os dados desta aula não foram carregados.';
const MSG_JA_ENTREGUE_3D = 'Atividade entregue. Aguarde a nota do professor.';
const MSG_PREVIA_PROFESSOR_3D = 'Modo professor: pré-visualização, nada é gravado.';

/**
 * Mostra uma mensagem no lugar da dinâmica.
 * @param {HTMLElement} raiz - Elemento da dinâmica.
 * @param {string} mensagem - Texto a mostrar.
 */
function mostrarMensagemPagina3d(raiz, mensagem) {
    raiz.textContent = '';
    const aviso = criarNo3d('p', 'dinamica3d__status dinamica3d__status--erro', mensagem);
    raiz.append(aviso);
}

/**
 * Cria a função que grava a entrega do aluno (rascunho ou definitiva).
 * @param {{atividadeId: number, alunoId: string}} dono - Atividade e aluno logado.
 * @param {boolean} entregue - true para entregar de vez.
 * @returns {Function} Função que recebe o estado e grava.
 */
function criarGravadorEntrega3d(dono, entregue) {
    return async (estado) => {
        await gravarEntregaDinamica({
            aluno_id: dono.alunoId, atividade_id: dono.atividadeId, estado, entregue
        });
    };
}

/**
 * Monta a configuração do aluno (rascunho salvo, travado se já entregou).
 * @param {Object} dados - Dados da aula (tela, ficha, checklist, instruções).
 * @param {{atividadeId: number, alunoId: string}} dono - Atividade e aluno logado.
 * @param {Object|null} entrega - Linha atual de entrega_dinamica, se houver.
 * @returns {Object} Configuração para iniciarDinamica3d.
 */
function montarConfigAluno3d(dados, dono, entrega) {
    return {
        ...dados,
        estadoInicial: entrega ? entrega.estado : null,
        somenteLeitura: Boolean(entrega && entrega.entregue),
        avisoInicial: entrega && entrega.entregue ? MSG_JA_ENTREGUE_3D : '',
        aoSalvar: criarGravadorEntrega3d(dono, false),
        aoEntregar: criarGravadorEntrega3d(dono, true)
    };
}

/**
 * Decide a configuração conforme o perfil e inicia a dinâmica.
 * @param {HTMLElement} raiz - Elemento da dinâmica.
 * @param {Object} dados - Dados da aula.
 * @returns {Promise<void>}
 * @throws {Error} Se o banco ou o 3D falharem.
 */
async function abrirDinamicaPagina3d(raiz, dados) {
    if (await ehProfessorDinamica()) {
        iniciarDinamica3d({
            ...dados, raiz, semGravacao: true, avisoInicial: MSG_PREVIA_PROFESSOR_3D
        });
        return;
    }
    const atividade = await lerAtividadeDaDinamica();
    const alunoId = await lerAlunoLogadoDinamica();
    if (!alunoId) return mostrarMensagemPagina3d(raiz, MSG_SEM_LOGIN_3D);
    if (!atividade) return mostrarMensagemPagina3d(raiz, MSG_SEM_ATIVIDADE_3D);

    const entrega = await lerEntregaDoAlunoDinamica(atividade.id, alunoId);
    const dono = { atividadeId: atividade.id, alunoId };
    iniciarDinamica3d({ ...montarConfigAluno3d(dados, dono, entrega), raiz });
}

/**
 * Ponto de entrada da página: acha os dados da aula e abre a dinâmica.
 * @returns {Promise<void>}
 */
async function iniciarPaginaDinamica3d() {
    const raiz = document.getElementById(ID_RAIZ_DINAMICA_3D);
    if (!raiz) return;

    const dados = obterDinamica3d(document.body.dataset.aula);
    if (!dados) return mostrarMensagemPagina3d(raiz, MSG_SEM_DADOS_AULA_3D);
    try {
        await abrirDinamicaPagina3d(raiz, dados);
    } catch (erro) {
        mostrarMensagemPagina3d(raiz, erro.message || String(erro));
    }
}

document.addEventListener('DOMContentLoaded', iniciarPaginaDinamica3d);
