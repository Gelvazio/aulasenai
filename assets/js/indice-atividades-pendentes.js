// Alerta de atividade pendente no índice de atividades (#293) — só professor.
// Base do módulo: nota mínima da matéria e comparação com a nota do aluno (#293.11); leitura da
// turma do combo "Turma:" e refiltro ao trocar (#293.12).
// A carga no índice e o uso nos cards entram na #293.10/#293.13 (evento cards-aula-montados).
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
