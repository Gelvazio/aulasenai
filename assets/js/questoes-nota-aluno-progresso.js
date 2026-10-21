// Professor: campo "Quantidade Questão Considerar" de cada aluno no Progresso da turma GLOBAL
// (progresso-turma-global.js), abaixo do "Faltou?". Define quantas questões contam para a NOTA do
// aluno (nota = soma x total ÷ quantidade, máximo 10). Vazio = a nota usa a Quantidade Mínima
// de Questões, como antes; o mínimo para ENTREGAR não muda. Grava na tabela questoes_nota_aluno
// (upsert por atividade e aluno; campo vazio apaga a linha). O cliente Supabase já envia o JWT do
// usuário logado; o RLS só deixa o professor gravar alunos das turmas dele.
// Salva ao sair do campo (change) ou com Enter. Depende de js/supabase.js e assets/js/popup.js.
// Pedido do usuário em 2026-10-21 (tarefa #319).

const TABELA_QUESTOES_NOTA = 'questoes_nota_aluno';
const CHAVE_QUESTOES_NOTA = 'atividade_id,aluno_id';
const CLASSE_QUESTOES_NOTA = 'questoes-nota';
const ROTULO_QUESTOES_NOTA = 'Quantidade Questão Considerar';
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
 * Grava (ou apaga) o que está no campo; erro volta o valor anterior e avisa no popup.
 * @param {Object} dados - atividadeId, aluno, aoMudar.
 * @param {HTMLInputElement} campo - Campo da quantidade.
 */
async function salvarQuestoesNotaDoCampo(dados, campo) {
    const { aluno } = dados;
    const anterior = aluno.questoesNotaDoAluno ? String(aluno.questoesNotaDoAluno) : '';
    const quantidade = lerQuantidadeDigitada(campo, aluno.totalQuestoes);
    if (quantidade === undefined) {
        campo.value = anterior;
        await mostrarPopup('Informe um número inteiro de 1 a ' + aluno.totalQuestoes +
            ', ou deixe vazio para usar a Quantidade Mínima.',
        { tipo: 'aviso', titulo: TITULO_ERRO_QUESTOES_NOTA });
        return;
    }
    if (String(quantidade ?? '') === anterior) return;

    campo.disabled = true;
    try {
        const ids = { atividadeId: dados.atividadeId, alunoId: aluno.alunoId };
        if (quantidade === null) await apagarQuestoesNotaDoAluno(ids);
        if (quantidade !== null) await gravarQuestoesNotaDoAluno(ids, quantidade);
        await dados.aoMudar();
    } catch (erro) {
        campo.value = anterior;
        await mostrarPopup('Não foi possível gravar a quantidade: ' + erro.message,
            { tipo: 'erro', titulo: TITULO_ERRO_QUESTOES_NOTA });
    } finally {
        campo.disabled = false;
    }
}

/**
 * Cria o campo "Quantidade Questão Considerar" de um aluno.
 * @param {{atividadeId: number, aluno: Object, aoMudar: Function}} dados - Atividade, aluno
 *     (alunoId, nome, minimo, totalQuestoes, questoesNotaDoAluno) e redesenho do painel.
 * @returns {HTMLElement} Rótulo com o campo.
 */
function criarCampoQuestoesNota(dados) {
    const { aluno } = dados;
    const rotulo = criarElementoQuestoesNota('label', CLASSE_QUESTOES_NOTA, ROTULO_QUESTOES_NOTA);
    const campo = criarElementoQuestoesNota('input', CLASSE_QUESTOES_NOTA + '__campo');
    Object.assign(campo, { type: 'number', min: '1', max: String(aluno.totalQuestoes),
        step: '1', value: aluno.questoesNotaDoAluno ? String(aluno.questoesNotaDoAluno) : '',
        placeholder: String(aluno.minimo) });
    rotulo.title = 'Quantas questões contam para a nota de ' + aluno.nome + ' (1 a ' +
        aluno.totalQuestoes + '). Vazio: usa a Quantidade Mínima (' + aluno.minimo + ').';
    campo.addEventListener('change', () => salvarQuestoesNotaDoCampo(dados, campo));
    campo.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') campo.blur();
    });
    rotulo.appendChild(campo);
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
