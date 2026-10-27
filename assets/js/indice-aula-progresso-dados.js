// Professor, modal "Progresso das atividades" do card da aula: lê as atividades da aula e, por
// aluno, a situação em cada uma (sem começar, em andamento ou entregue). Só lê; nunca lê o
// gabarito; o RLS limita o professor às turmas dele. Para as respostas reaproveita a leitura
// paginada do Progresso da turma (progresso-turma-fontes.js, carregado sob demanda), porque a API
// devolve no máximo 1000 linhas por consulta. Depende de js/supabase.js (sbGet). Tarefa #421.4.

const ARQUIVO_FONTES_PROGRESSO_AULA = 'progresso-turma-fontes.js';
const BASE_SCRIPTS_PROGRESSO_AULA = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const SITUACAO_VAZIA_PROGRESSO_AULA = 'vazia';
const SITUACAO_ANDAMENTO_PROGRESSO_AULA = 'andamento';
const SITUACAO_ENTREGUE_PROGRESSO_AULA = 'entregue';

/**
 * Lê as atividades de uma aula, em ordem de cadastro.
 * @param {number} aulaId - Id da aula (tabela aulas).
 * @returns {Promise<{id: number, nome: string, dia: string|null}[]>} Atividades da aula.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerAtividadesDaAula(aulaId) {
    const linhas = await sbGet('atividade',
        'select=id,nome_atividade,data_atividade&aula_id=eq.' + aulaId + '&order=id');
    return linhas.map((linha) => ({ id: linha.id, nome: linha.nome_atividade || 'Atividade ' +
        linha.id, dia: linha.data_atividade || null }));
}

/**
 * Carrega (uma vez) o script do Progresso da turma, que traz a leitura paginada das respostas.
 * @returns {Promise<void>} Resolve quando a função de leitura estiver disponível.
 * @throws {Error} Se o script não carregar.
 */
function garantirLeituraPaginadaProgressoAula() {
    if (typeof window.lerTodasAsLinhasProgresso === 'function') return Promise.resolve();

    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_PROGRESSO_AULA + ARQUIVO_FONTES_PROGRESSO_AULA;
        script.onload = resolver;
        script.onerror = () => rejeitar(new Error('Não foi possível carregar a leitura do ' +
            'progresso da turma.'));
        document.head.appendChild(script);
    });
}

/**
 * Anota a maior tentativa de cada aluno numa atividade e se ela tem resposta.
 * @param {Map<string, {tentativa: number}>} destino - Aluno → maior tentativa lida.
 * @param {{aluno_id: string, tentativa: number}[]} linhas - Linhas de resposta ou de entrega.
 */
function anotarMaiorTentativaProgressoAula(destino, linhas) {
    linhas.forEach((linha) => {
        const atual = destino.get(linha.aluno_id);
        const tentativa = Number(linha.tentativa ?? 1);
        if (!atual || tentativa > atual.tentativa) destino.set(linha.aluno_id, { tentativa });
    });
}

/**
 * Lê as respostas (objetiva e discursiva) e as entregas de uma atividade e resolve a situação
 * de cada aluno que tem alguma linha.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Map<string, string>>} Aluno → "andamento" ou "entregue" (quem não aparece
 *     ainda não começou).
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerSituacaoDaAtividade(atividadeId) {
    const [objetiva, discursiva, entregas, dinamica] = await Promise.all([
        lerTodasAsLinhasProgresso({ tabela: 'resposta_atividade', atividadeId,
            colunas: 'aluno_id,tentativa,item', ordem: COLUNAS_CHAVE_OBJETIVA }),
        lerTodasAsLinhasProgresso({ tabela: 'resposta_discursiva', atividadeId,
            colunas: 'aluno_id,tentativa,item,topico', ordem: COLUNAS_CHAVE_DISCURSIVA }),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa&atividade_id=eq.' + atividadeId),
        sbGet('entrega_dinamica', 'select=aluno_id,entregue&atividade_id=eq.' + atividadeId),
    ]);
    const comResposta = new Map();
    anotarMaiorTentativaProgressoAula(comResposta, [...objetiva, ...discursiva]);
    const comEntrega = new Map();
    anotarMaiorTentativaProgressoAula(comEntrega, entregas);
    const situacoes = new Map();
    comResposta.forEach((_, alunoId) => situacoes.set(alunoId, SITUACAO_ANDAMENTO_PROGRESSO_AULA));
    dinamica.forEach((linha) => situacoes.set(linha.aluno_id, linha.entregue
        ? SITUACAO_ENTREGUE_PROGRESSO_AULA : SITUACAO_ANDAMENTO_PROGRESSO_AULA));
    comEntrega.forEach((entrega, alunoId) => {
        const tentativaDasRespostas = comResposta.get(alunoId)?.tentativa ?? 0;
        const estaNaUltimaTentativa = entrega.tentativa >= tentativaDasRespostas;
        if (estaNaUltimaTentativa) situacoes.set(alunoId, SITUACAO_ENTREGUE_PROGRESSO_AULA);
    });
    return situacoes;
}

/**
 * Lê a situação de todos os alunos em cada atividade da aula.
 * @param {{id: number}[]} atividades - Atividades da aula.
 * @returns {Promise<Map<number, Map<string, string>>>} Atividade → (aluno → situação).
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerSituacoesDasAtividades(atividades) {
    await garantirLeituraPaginadaProgressoAula();
    const lidas = await Promise.all(atividades.map((atividade) =>
        lerSituacaoDaAtividade(atividade.id)));
    return new Map(atividades.map((atividade, indice) => [atividade.id, lidas[indice]]));
}

window.lerAtividadesDaAula = lerAtividadesDaAula;
window.lerSituacoesDasAtividades = lerSituacoesDasAtividades;
window.SITUACOES_PROGRESSO_AULA = {
    vazia: SITUACAO_VAZIA_PROGRESSO_AULA,
    andamento: SITUACAO_ANDAMENTO_PROGRESSO_AULA,
    entregue: SITUACAO_ENTREGUE_PROGRESSO_AULA,
};
