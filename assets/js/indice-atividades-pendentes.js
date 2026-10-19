// Alerta de atividade pendente no índice de atividades (#293) — só professor.
// Base do módulo: nota mínima da matéria × nota do aluno (#293.11), leitura da turma do combo
// "Turma:" com refiltro (#293.12) e a regra de "pendente" (#293.10).
// A carga no índice e o uso nos cards entram na #293.13 (evento cards-aula-montados).
// Só lê o materia.json da matéria; nenhum dado de aluno e nenhuma consulta ao banco aqui.
// Depende de: fetch do navegador; combo "Turma:" do indice-turma-favorita.js.

const ARQUIVO_MATERIA_PENDENTES = '../materia.json';
const NOTA_MINIMA_PADRAO_PENDENTES = 7;
const NOTA_MAXIMA_PENDENTES = 10;
// Combo "Turma:" do índice e os eventos que avisam quando a turma escolhida muda.
const SELETOR_COMBO_TURMA_PENDENTES = '.barra-turma-favorita__lista';
const EVENTO_TURMA_INDICE_PENDENTES = 'turma-indice-alterada';
const EVENTO_FAVORITA_ALTERADA_PENDENTES = 'turma-favorita-alterada';

/**
 * Lê a nota mínima da matéria no materia.json (avaliacao.nota_minima).
 * Sem o arquivo, sem o campo ou com valor inválido, usa a nota padrão de 7,0.
 * @returns {Promise<number>} Nota mínima entre 0 e 10.
 */
async function carregarNotaMinimaPendentes() {
    try {
        const resposta = await fetch(ARQUIVO_MATERIA_PENDENTES, { cache: 'no-store' });
        if (!resposta.ok) return NOTA_MINIMA_PADRAO_PENDENTES;
        const materia = await resposta.json();
        return normalizarNotaMinimaPendentes(materia?.avaliacao?.nota_minima);
    } catch (erro) {
        console.warn('Nota mínima da matéria indisponível:', erro.message);
        return NOTA_MINIMA_PADRAO_PENDENTES;
    }
}

/**
 * Converte o valor lido do materia.json em nota mínima válida.
 * @param {*} valor - Valor de avaliacao.nota_minima.
 * @returns {number} Nota entre 0 e 10; 7,0 quando o valor não serve.
 */
function normalizarNotaMinimaPendentes(valor) {
    const numero = Number(valor);
    const valida = Number.isFinite(numero) && numero > 0 && numero <= NOTA_MAXIMA_PENDENTES;
    return valida ? numero : NOTA_MINIMA_PADRAO_PENDENTES;
}

/**
 * Diz se a nota do aluno ficou abaixo da nota mínima da matéria.
 * Sem nota (entregou e ainda não corrigido) conta como abaixo do mínimo (#293.11).
 * @param {*} nota - Nota do aluno entre 0 e 10.
 * @param {number} [minima] - Nota mínima da matéria.
 * @returns {boolean} true se a nota está abaixo do mínimo ou não existe.
 */
function notaAbaixoDoMinimoPendentes(nota, minima = NOTA_MINIMA_PADRAO_PENDENTES) {
    if (nota === null || nota === undefined || nota === '') return true;
    const numero = Number(nota);
    if (!Number.isFinite(numero)) return true;
    return numero < normalizarNotaMinimaPendentes(minima);
}

/**
 * Lê o código da turma escolhida no combo "Turma:" do índice.
 * @returns {string} Código da turma ou '' quando não há turma escolhida ou lista na página.
 */
function obterTurmaPendentes() {
    const combo = document.querySelector(SELETOR_COMBO_TURMA_PENDENTES);
    return combo ? String(combo.value || '').trim() : '';
}

/**
 * Chama `aoMudar` quando a turma do índice muda (combo ou favorita) e uma vez agora.
 * Usa delegação de evento para funcionar mesmo se o combo for montado depois deste módulo.
 * @param {(turma: string) => void} aoMudar - Ação a refazer com o código da turma nova.
 */
function ouvirTrocaDeTurmaPendentes(aoMudar) {
    const avisar = () => aoMudar(obterTurmaPendentes());
    document.addEventListener('change', (evento) => {
        if (evento.target?.matches(SELETOR_COMBO_TURMA_PENDENTES)) avisar();
    });
    document.addEventListener(EVENTO_TURMA_INDICE_PENDENTES, avisar);
    document.addEventListener(EVENTO_FAVORITA_ALTERADA_PENDENTES, avisar);
    avisar();
}
// Contrato dos dados que a fonte da #293.5 entrega, por atividade da aula:
// { atividadeId, temQuestao, bloqueada, alunos: [{ alunoId, faltou, entregou,
//   aguardandoCorrecao, nota }] }.

/**
 * Diz se o aluno conta como pendente numa atividade (regra fechada na #293.4).
 * Falta (R15), atividade sem questão e entrega aguardando correção não contam.
 * @param {{faltou: boolean, entregou: boolean, aguardandoCorrecao: boolean, nota: *}} aluno
 * @param {number} [notaMinima] - Nota mínima da matéria.
 * @returns {boolean} true se o aluno está pendente.
 */
function alunoPendentePendentes(aluno, notaMinima = NOTA_MINIMA_PADRAO_PENDENTES) {
    if (!aluno || aluno.faltou) return false;
    if (!aluno.entregou) return true;
    if (aluno.aguardandoCorrecao) return false;
    return notaAbaixoDoMinimoPendentes(aluno.nota, notaMinima);
}

/**
 * Diz se a atividade tem pelo menos 1 aluno pendente na turma escolhida.
 * @param {{bloqueada: boolean, temQuestao: boolean, alunos: Object[]}} atividade
 * @param {number} [notaMinima] - Nota mínima da matéria.
 * @returns {boolean} true se a atividade está pendente.
 */
function atividadePendentePendentes(atividade, notaMinima = NOTA_MINIMA_PADRAO_PENDENTES) {
    if (!atividade || atividade.bloqueada || !atividade.temQuestao) return false;
    return (atividade.alunos || []).some((aluno) => alunoPendentePendentes(aluno, notaMinima));
}

/**
 * Diz se o card (lista de atividades da aula) tem pendência na turma escolhida.
 * @param {Object[]} atividades - Atividades da aula vindas da fonte de dados.
 * @param {number} [notaMinima] - Nota mínima da matéria.
 * @returns {boolean} true se o card fica vermelho.
 */
function cardPendentePendentes(atividades, notaMinima = NOTA_MINIMA_PADRAO_PENDENTES) {
    const lista = atividades || [];
    return lista.some((atividade) => atividadePendentePendentes(atividade, notaMinima));
}
