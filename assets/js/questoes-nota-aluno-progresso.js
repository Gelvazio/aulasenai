// Professor: campo "Quantidade Questão Considerar" de cada aluno no Progresso da turma GLOBAL
// (progresso-turma-global.js), abaixo do "Faltou?". Define quantas questões contam para a NOTA do
// aluno (nota = soma x total ÷ quantidade, máximo 10). Vazio = a nota usa a Quantidade Mínima
// de Questões, como antes; o mínimo para ENTREGAR não muda. Grava na tabela questoes_nota_aluno
// (upsert por atividade e aluno; campo vazio apaga a linha). O cliente Supabase já envia o JWT do
// usuário logado; o RLS só deixa o professor gravar alunos das turmas dele.
// Grava só depois do botão "Confirmar" (ou Enter no campo) + "Sim" no modal.
// Depende de js/supabase.js e assets/js/popup.js.
// Pedido do usuário em 2026-10-21 (tarefa #319).

const TABELA_QUESTOES_NOTA = 'questoes_nota_aluno';
const CHAVE_QUESTOES_NOTA = 'atividade_id,aluno_id';
const CLASSE_QUESTOES_NOTA = 'questoes-nota';
const ROTULO_QUESTOES_NOTA = 'Quantidade Questão Considerar';
const TEXTO_BOTAO_QUESTOES_NOTA = 'Confirmar';
const MENSAGEM_CONFIRMAR_QUESTOES_NOTA =
    'Deseja alterar a quantidade de questões a considerar para este aluno?';
const TITULO_ERRO_QUESTOES_NOTA = 'Quantidade Questão Considerar';
const BASE_SCRIPTS_QUESTOES_NOTA = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const ARQUIVO_CSS_QUESTOES_NOTA = '../css/questoes-nota-aluno-progresso.css';

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoQuestoesNota(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Grava a quantidade de questões da nota do aluno (insere ou atualiza).
 * @param {{atividadeId: number, alunoId: string}} dados - Atividade e aluno.
 * @param {number} quantidade - Questões que contam para a nota.
 * @throws {Error} Se o banco recusar.
 */
async function gravarQuestoesNotaDoAluno(dados, quantidade) {
    const { error } = await obterClienteSupabase().from(TABELA_QUESTOES_NOTA).upsert([{
        atividade_id: dados.atividadeId, aluno_id: dados.alunoId, quantidade,
        definido_em: new Date().toISOString(),
    }], { onConflict: CHAVE_QUESTOES_NOTA });
    if (error) throw new Error(error.message);
}

/**
 * Volta a nota do aluno para a Quantidade Mínima (apaga a linha dele).
 * @param {{atividadeId: number, alunoId: string}} dados - Atividade e aluno.
 * @throws {Error} Se o banco recusar.
 */
async function apagarQuestoesNotaDoAluno(dados) {
    const { error } = await obterClienteSupabase().from(TABELA_QUESTOES_NOTA).delete()
        .eq('atividade_id', dados.atividadeId).eq('aluno_id', dados.alunoId);
    if (error) throw new Error(error.message);
}

/**
 * Lê o campo: vazio = null (usa o mínimo); número inteiro de 1 ao total = quantidade.
 * @param {HTMLInputElement} campo - Campo da quantidade.
 * @param {number} totalQuestoes - Total de questões da atividade.
 * @returns {number|null|undefined} Quantidade, null se vazio, undefined se inválido.
 */
function lerQuantidadeDigitada(campo, totalQuestoes) {
    if (campo.value.trim() === '') return null;

    const quantidade = Number(campo.value);
    const estaValida = Number.isInteger(quantidade) && quantidade >= 1 &&
        quantidade <= totalQuestoes;
    return estaValida ? quantidade : undefined;
}

/**
 * Devolve o valor gravado do aluno como texto do campo.
 * @param {Object} aluno - Aluno (questoesNotaDoAluno).
 * @returns {string} Quantidade gravada, ou vazio.
 */
function obterValorGravado(aluno) {
    return aluno.questoesNotaDoAluno ? String(aluno.questoesNotaDoAluno) : '';
}

/**
 * Volta o campo para o valor gravado e tira a marca de alterado.
 * @param {HTMLInputElement} campo - Campo da quantidade.
 * @param {string} gravado - Valor gravado.
 */
function restaurarCampoQuestoesNota(campo, gravado) {
    campo.value = gravado;
    delete campo.dataset.alterado;
}

/**
 * Grava (ou apaga) a quantidade do aluno e redesenha o painel.
 * @param {Object} dados - atividadeId, aluno, aoMudar.
 * @param {number|null} quantidade - Quantidade; null apaga a linha.
 */
async function gravarEscolhaQuestoesNota(dados, quantidade) {
    const ids = { atividadeId: dados.atividadeId, alunoId: dados.aluno.alunoId };
    if (quantidade === null) await apagarQuestoesNotaDoAluno(ids);
    if (quantidade !== null) await gravarQuestoesNotaDoAluno(ids, quantidade);
    await dados.aoMudar();
}

/**
 * Valida o campo, pergunta no modal e, se o professor disser Sim, grava para este aluno.
 * Erro ou "Não" voltam o valor gravado.
 * @param {Object} dados - atividadeId, aluno, aoMudar.
 * @param {HTMLInputElement} campo - Campo da quantidade.
 */
async function confirmarQuestoesNotaDoCampo(dados, campo) {
    const { aluno } = dados;
    const gravado = obterValorGravado(aluno);
    const quantidade = lerQuantidadeDigitada(campo, aluno.totalQuestoes);
    if (quantidade === undefined) {
        restaurarCampoQuestoesNota(campo, gravado);
        await mostrarPopup('Informe um número inteiro de 1 a ' + aluno.totalQuestoes +
            ', ou deixe vazio para usar a Quantidade Mínima.',
        { tipo: 'aviso', titulo: TITULO_ERRO_QUESTOES_NOTA });
        return;
    }
    if (String(quantidade ?? '') === gravado) return restaurarCampoQuestoesNota(campo, gravado);

    const confirmou = await confirmarPopup(MENSAGEM_CONFIRMAR_QUESTOES_NOTA, {
        titulo: TITULO_ERRO_QUESTOES_NOTA, textoConfirmar: 'Sim', textoCancelar: 'Não' });
    if (!confirmou) return restaurarCampoQuestoesNota(campo, gravado);

    campo.disabled = true;
    try {
        await gravarEscolhaQuestoesNota(dados, quantidade);
        delete campo.dataset.alterado;
    } catch (erro) {
        restaurarCampoQuestoesNota(campo, gravado);
        await mostrarPopup('Não foi possível gravar a quantidade: ' + erro.message,
            { tipo: 'erro', titulo: TITULO_ERRO_QUESTOES_NOTA });
    } finally {
        campo.disabled = false;
    }
}

/**
 * Cria o campo "Quantidade Questão Considerar" de um aluno, com o botão "Confirmar" ao lado.
 * @param {{atividadeId: number, aluno: Object, aoMudar: Function}} dados - Atividade, aluno
 *     (alunoId, nome, minimo, totalQuestoes, questoesNotaDoAluno) e redesenho do painel.
 * @returns {HTMLElement} Rótulo com o campo e o botão.
 */
function criarCampoQuestoesNota(dados) {
    const { aluno } = dados;
    const gravado = obterValorGravado(aluno);
    const rotulo = criarElementoQuestoesNota('div', CLASSE_QUESTOES_NOTA, ROTULO_QUESTOES_NOTA);
    const linha = criarElementoQuestoesNota('div', CLASSE_QUESTOES_NOTA + '__linha');
    const campo = criarElementoQuestoesNota('input', CLASSE_QUESTOES_NOTA + '__campo');
    const botao = criarElementoQuestoesNota('button', CLASSE_QUESTOES_NOTA + '__confirmar',
        TEXTO_BOTAO_QUESTOES_NOTA);
    Object.assign(campo, { type: 'number', min: '1', max: String(aluno.totalQuestoes),
        step: '1', value: gravado, placeholder: String(aluno.minimo) });
    botao.type = 'button';
    rotulo.title = 'Quantas questões contam para a nota de ' + aluno.nome + ' (1 a ' +
        aluno.totalQuestoes + '). Vazio: usa a Quantidade Mínima (' + aluno.minimo + ').';
    campo.addEventListener('input', () => {
        if (campo.value !== gravado) campo.dataset.alterado = 'sim';
        if (campo.value === gravado) delete campo.dataset.alterado;
    });
    const confirmar = () => confirmarQuestoesNotaDoCampo(dados, campo);
    botao.addEventListener('click', confirmar);
    campo.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') confirmar();
    });
    linha.append(campo, botao);
    rotulo.appendChild(linha);
    return rotulo;
}


(function incluirEstiloQuestoesNota() {
    if (!BASE_SCRIPTS_QUESTOES_NOTA) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_QUESTOES_NOTA + ARQUIVO_CSS_QUESTOES_NOTA;
    document.head.appendChild(link);
})();

window.criarCampoQuestoesNota = criarCampoQuestoesNota;
