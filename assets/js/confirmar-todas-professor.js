// Professor: botão "✅ Confirmar Todas" ao lado do nome do aluno no Progresso da turma das
// discursivas (progresso-turma-global.js). Grava como nota do professor (correcao_discursiva.
// nota_professor, travada depois de gravada) a nota que a IA deu em cada questão do aluno.
// - Só para quem já entregou (a nota travada não pode mudar depois).
// - Se alguma questão estiver sem nota da IA: alerta "QUESTÕES SEM NOTA! GERE A CORREÇÃO DE IA DE
//   NOVO!" e nada é gravado.
// - Questões com suspeita de cópia pendente (90% ou mais) ficam de fora: o professor valida antes.
// Pedido do usuário em 2026-10-14 (tarefa #134). Depende de js/supabase.js e assets/js/popup.js.

const TABELA_CORRECAO_CONFIRMAR_TODAS = 'correcao_discursiva';
const CHAVE_CORRECAO_CONFIRMAR_TODAS = 'aluno_id,atividade_id,tentativa,item,topico';
const SEMELHANCA_MINIMA_CONFIRMAR_TODAS = 0.9;
const TEXTO_BOTAO_CONFIRMAR_TODAS = '✅ Confirmar Todas';
const TITULO_CONFIRMAR_TODAS = 'Confirmar Todas';
const DICA_SEM_ENTREGA_CONFIRMAR_TODAS = 'Só depois que o aluno entregar a atividade.';
const MSG_SEM_NOTA_CONFIRMAR_TODAS = 'QUESTÕES SEM NOTA! GERE A CORREÇÃO DE IA DE NOVO!';
const MSG_NADA_CONFIRMAR_TODAS = 'Não há questão para confirmar: todas já têm a nota do ' +
    'professor ou estão com suspeita de cópia pendente.';
const DIGITOS_QUESTAO_CONFIRMAR_TODAS = 2;

/**
 * Chave de um tópico ("item|tópico").
 * @param {{item: number, topico: number}} linha - Linha com item e tópico.
 * @returns {string} Chave.
 */
function chaveTopicoConfirmarTodas(linha) {
    return linha.item + '|' + linha.topico;
}

/**
 * Lê os tópicos da prova, a correção do aluno e as suspeitas de cópia pendentes dele.
 * @param {number} atividadeId - Id da atividade.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno do painel.
 * @returns {Promise<{topicos: Object[], correcoes: Map, suspeitas: Set<string>}>} Dados.
 */
async function lerDadosConfirmarTodas(atividadeId, aluno) {
    const filtroAluno = '&atividade_id=eq.' + atividadeId + '&aluno_id=eq.' + aluno.alunoId +
        '&tentativa=eq.' + aluno.tentativa;
    const [topicos, correcoes, suspeitas] = await Promise.all([
        sbGet('topico_discursivo', 'select=item,topico&atividade_id=eq.' + atividadeId +
            '&order=item,topico'),
        sbGet(TABELA_CORRECAO_CONFIRMAR_TODAS,
            'select=item,topico,nota_ia,nota_professor' + filtroAluno),
        sbGet('suspeita_copia_discursiva', 'select=item,topico' + filtroAluno +
            '&situacao=eq.pendente&semelhanca=gte.' + SEMELHANCA_MINIMA_CONFIRMAR_TODAS),
    ]);
    return { topicos,
        correcoes: new Map(correcoes.map((linha) => [chaveTopicoConfirmarTodas(linha), linha])),
        suspeitas: new Set(suspeitas.map(chaveTopicoConfirmarTodas)) };
}

/**
 * Separa as questões: sem nota da IA (bloqueiam), com suspeita (puladas) e a confirmar.
 * @param {{topicos: Object[], correcoes: Map, suspeitas: Set<string>}} dados - Dados lidos.
 * @returns {{semNota: Object[], puladas: number, aConfirmar: Object[]}} Separação.
 */
function separarQuestoesConfirmarTodas(dados) {
    const pendentes = dados.topicos.filter((topico) => {
        const correcao = dados.correcoes.get(chaveTopicoConfirmarTodas(topico));
        return correcao?.nota_professor === null || correcao?.nota_professor === undefined;
    });
    const semNota = pendentes.filter((topico) => {
        const notaIa = dados.correcoes.get(chaveTopicoConfirmarTodas(topico))?.nota_ia;
        return notaIa === null || notaIa === undefined;
    });
    const comNota = pendentes.filter((topico) => !semNota.includes(topico));
    const aConfirmar = comNota.filter((topico) =>
        !dados.suspeitas.has(chaveTopicoConfirmarTodas(topico)));
    return { semNota, puladas: comNota.length - aConfirmar.length, aConfirmar };
}

/**
 * Lista as questões sem nota ("Q03, Q07").
 * @param {Object[]} topicos - Tópicos sem nota da IA.
 * @returns {string} Lista das questões.
 */
function listarQuestoesConfirmarTodas(topicos) {
    const itens = [...new Set(topicos.map((topico) => topico.item))];
    return itens.map((item) => 'Q' + String(item).padStart(DIGITOS_QUESTAO_CONFIRMAR_TODAS, '0'))
        .join(', ');
}

/**
 * Grava a nota da IA como nota do professor em todas as questões a confirmar (um comando só).
 * @param {{atividadeId: number, aluno: Object, aConfirmar: Object[], correcoes: Map}} pedido
 * @throws {Error} Se o banco recusar.
 */
async function gravarConfirmarTodas({ atividadeId, aluno, aConfirmar, correcoes }) {
    const linhas = aConfirmar.map((topico) => ({
        aluno_id: aluno.alunoId, atividade_id: atividadeId, tentativa: aluno.tentativa,
        item: topico.item, topico: topico.topico,
        nota_professor: correcoes.get(chaveTopicoConfirmarTodas(topico)).nota_ia,
    }));
    const { error } = await obterClienteSupabase().from(TABELA_CORRECAO_CONFIRMAR_TODAS)
        .upsert(linhas, { onConflict: CHAVE_CORRECAO_CONFIRMAR_TODAS });
    if (error) throw new Error(error.message);
}

/**
 * Pergunta ao professor antes de gravar (a nota fica travada).
 * @param {Object} aluno - Aluno do painel (nome).
 * @param {{aConfirmar: Object[], puladas: number}} separacao - Questões separadas.
 * @returns {Promise<boolean>} true se confirmou.
 */
function perguntarConfirmarTodas(aluno, separacao) {
    const aviso = separacao.puladas
        ? '\n\n' + separacao.puladas + ' questão(ões) com suspeita de cópia pendente ficam de fora.'
        : '';
    return confirmarPopup('Confirmar a nota da IA como nota do professor em ' +
        separacao.aConfirmar.length + ' questão(ões) de ' + aluno.nome + '? Depois de ' +
        'confirmada, a nota não pode mais ser alterada.' + aviso,
        { tipo: 'aviso', titulo: TITULO_CONFIRMAR_TODAS, textoConfirmar: 'Confirmar Todas' });
}

/**
 * Faz o "Confirmar Todas" de um aluno: confere, pergunta, grava e atualiza o painel.
 * @param {{atividadeId: number, aluno: Object, aoMudar: Function}} contexto - Dados do painel.
 */
async function confirmarTodasDoAluno(contexto) {
    const { atividadeId, aluno } = contexto;
    try {
        const dados = await lerDadosConfirmarTodas(atividadeId, aluno);
        const separacao = separarQuestoesConfirmarTodas(dados);
        if (separacao.semNota.length) {
            await mostrarPopup(MSG_SEM_NOTA_CONFIRMAR_TODAS + '\n\nQuestões: ' +
                listarQuestoesConfirmarTodas(separacao.semNota),
                { tipo: 'erro', titulo: TITULO_CONFIRMAR_TODAS });
            return;
        }
        if (!separacao.aConfirmar.length) {
            await mostrarPopup(MSG_NADA_CONFIRMAR_TODAS,
                { tipo: 'info', titulo: TITULO_CONFIRMAR_TODAS });
            return;
        }
        if (!await perguntarConfirmarTodas(aluno, separacao)) return;

        await gravarConfirmarTodas({ atividadeId, aluno, aConfirmar: separacao.aConfirmar,
            correcoes: dados.correcoes });
        await mostrarPopup(separacao.aConfirmar.length + ' questão(ões) confirmada(s).',
            { tipo: 'sucesso', titulo: TITULO_CONFIRMAR_TODAS });
        await contexto.aoMudar?.();
    } catch (erro) {
        await mostrarPopup('Não foi possível confirmar: ' + erro.message,
            { tipo: 'erro', titulo: TITULO_CONFIRMAR_TODAS });
    }
}

/**
 * Cria o botão "✅ Confirmar Todas" do aluno (desativado enquanto ele não entregou).
 * @param {{atividadeId: number, aluno: Object, aoMudar: Function}} contexto - Dados do painel.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoConfirmarTodas(contexto) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'progresso-turma__confirmar-todas';
    botao.textContent = TEXTO_BOTAO_CONFIRMAR_TODAS;
    botao.disabled = !contexto.aluno.entregue;
    if (botao.disabled) botao.title = DICA_SEM_ENTREGA_CONFIRMAR_TODAS;
    botao.addEventListener('click', () => confirmarTodasDoAluno(contexto));
    return botao;
}

window.criarBotaoConfirmarTodas = criarBotaoConfirmarTodas;
