// Professor: logo abaixo do combo "Turma" do Progresso da turma (progresso-turma-global.js), lista
// as aulas da matéria da atividade com a DATA de cada uma NA TURMA escolhida (cada turma tem dias
// de aula diferentes). As datas ficam na tabela aula_turma (aula_id, turma_codigo, data_aula) e o
// professor edita aqui mesmo: escolher a data grava; limpar o campo remove a data da turma.
// "Todas as turmas" não tem datas: mostra um aviso. O RLS só deixa o professor gravar.
// Depende de js/supabase.js (sbGet, sbPost, sbPatch, sbDelete). Estilo: css/datas-aulas-turma.css
// Pedido do usuário em 2026-10-16 (tarefa #185). Regra: docs/regras/atividades.md

const TABELA_DATAS_AULAS_TURMA = 'aula_turma';
const CLASSE_DATAS_AULAS_TURMA = 'datas-aulas-turma';
const ARQUIVO_CSS_DATAS_AULAS_TURMA = '../css/datas-aulas-turma.css';
const TEXTO_SEM_TURMA_DATAS_AULAS = 'Escolha uma turma para ver as datas das aulas.';
const TEXTO_SEM_AULAS_DATAS_AULAS = 'Esta matéria não tem aulas cadastradas.';
const TEXTO_SALVO_DATAS_AULAS = '✔ salvo';
const TEXTO_ERRO_DATAS_AULAS = '✖ não salvou';

/**
 * Lê a matéria da atividade e as aulas dela (sem as excluídas), em ordem.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{id: number, numero: number, titulo: string}[]>} Aulas da matéria.
 * @throws {Error} Se o banco recusar.
 */
async function lerAulasDaMateriaDatasAulas(atividadeId) {
    const [atividade] = await sbGet('atividade', 'select=aulas(materia_id)&id=eq.' + atividadeId);
    const materiaId = atividade?.aulas?.materia_id;
    if (!materiaId) return [];

    return sbGet('aulas', 'select=id,numero,titulo&excluido=eq.0&materia_id=eq.' + materiaId +
        '&order=numero');
}

/**
 * Lê as datas já cadastradas da turma.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {Promise<Map<number, {id: number, data_aula: string}>>} Datas por id da aula.
 * @throws {Error} Se o banco recusar.
 */
async function lerDatasDaTurmaDatasAulas(turmaCodigo) {
    const linhas = await sbGet(TABELA_DATAS_AULAS_TURMA,
        'select=id,aula_id,data_aula&turma_codigo=eq.' + encodeURIComponent(turmaCodigo));
    return new Map(linhas.map((linha) => [linha.aula_id, linha]));
}

/**
 * Grava a data de uma aula na turma: cria, troca ou remove (campo vazio).
 * @param {{aulaId: number, turmaCodigo: string, existente: ?{id: number}}} alvo - Aula e turma.
 * @param {string} dataAula - Data AAAA-MM-DD, ou vazio para remover.
 * @returns {Promise<?{id: number}>} Linha gravada, ou null se foi removida.
 * @throws {Error} Se o banco recusar.
 */
async function gravarDataDaAulaDatasAulas(alvo, dataAula) {
    const { aulaId, turmaCodigo, existente } = alvo;
    if (!dataAula) {
        if (existente) await sbDelete(TABELA_DATAS_AULAS_TURMA, 'id=eq.' + existente.id);
        return null;
    }
    if (existente) {
        const [atualizada] = await sbPatch(TABELA_DATAS_AULAS_TURMA, 'id', existente.id,
            { data_aula: dataAula, updated_at: new Date().toISOString() });
        return atualizada;
    }
    const [criada] = await sbPost(TABELA_DATAS_AULAS_TURMA,
        { aula_id: aulaId, turma_codigo: turmaCodigo, data_aula: dataAula });
    return criada;
}

/**
 * Cria a linha de uma aula: título e campo de data que grava ao mudar.
 * @param {{aula: Object, turmaCodigo: string, datas: Map}} dados - Aula, turma e datas lidas.
 * @returns {HTMLElement} Item da lista.
 */
function criarLinhaDatasAulas({ aula, turmaCodigo, datas }) {
    const item = document.createElement('li');
    item.className = CLASSE_DATAS_AULAS_TURMA + '__item';
    const nome = document.createElement('span');
    nome.textContent = 'Aula ' + String(aula.numero).padStart(2, '0') + ' — ' + aula.titulo;
    const campo = document.createElement('input');
    campo.type = 'date';
    campo.value = datas.get(aula.id)?.data_aula || '';
    const aviso = document.createElement('span');
    aviso.className = CLASSE_DATAS_AULAS_TURMA + '__aviso';
    campo.addEventListener('change', async () => {
        try {
            const gravada = await gravarDataDaAulaDatasAulas(
                { aulaId: aula.id, turmaCodigo, existente: datas.get(aula.id) }, campo.value);
            if (gravada) datas.set(aula.id, gravada); else datas.delete(aula.id);
            aviso.textContent = TEXTO_SALVO_DATAS_AULAS;
        } catch (erro) {
            console.warn('Data da aula na turma:', erro.message);
            aviso.textContent = TEXTO_ERRO_DATAS_AULAS;
        }
    });
    item.append(nome, campo, aviso);
    return item;
}

/**
 * Desenha a lista de aulas com as datas da turma escolhida.
 * @param {{atividadeId: number, aviso: HTMLElement, lista: HTMLElement}} bloco - Área a preencher.
 * @param {string} turmaCodigo - Código da turma ou vazio (todas).
 */
async function desenharDatasAulasTurma(bloco, turmaCodigo) {
    bloco.lista.replaceChildren();
    if (!turmaCodigo) {
        bloco.aviso.textContent = TEXTO_SEM_TURMA_DATAS_AULAS;
        return;
    }
    try {
        const [aulas, datas] = await Promise.all([lerAulasDaMateriaDatasAulas(bloco.atividadeId),
            lerDatasDaTurmaDatasAulas(turmaCodigo)]);
        bloco.aviso.textContent = aulas.length ? '' : TEXTO_SEM_AULAS_DATAS_AULAS;
        bloco.lista.append(...aulas.map((aula) => criarLinhaDatasAulas(
            { aula, turmaCodigo, datas })));
    } catch (erro) {
        console.warn('Datas das aulas da turma:', erro.message);
        bloco.aviso.textContent = TEXTO_ERRO_DATAS_AULAS;
    }
}

/**
 * Põe a lista de datas das aulas logo abaixo do combo "Turma" e a refaz quando a turma muda.
 * @param {HTMLElement} rotuloCombo - Rótulo que contém o <select> da turma.
 * @param {number} atividadeId - Id da atividade.
 */
function montarDatasAulasTurma(rotuloCombo, atividadeId) {
    const select = rotuloCombo.querySelector('select');
    const jaExiste = rotuloCombo.nextElementSibling?.classList.contains(CLASSE_DATAS_AULAS_TURMA);
    if (!select || jaExiste) return;

    const area = document.createElement('details');
    area.className = CLASSE_DATAS_AULAS_TURMA;
    area.open = true;
    const titulo = document.createElement('summary');
    titulo.textContent = '📅 Datas das aulas da turma';
    const bloco = { atividadeId, aviso: document.createElement('p'),
        lista: document.createElement('ul') };
    bloco.lista.className = CLASSE_DATAS_AULAS_TURMA + '__lista';
    area.append(titulo, bloco.aviso, bloco.lista);
    rotuloCombo.after(area);
    select.addEventListener('change', () => desenharDatasAulasTurma(bloco, select.value));
    desenharDatasAulasTurma(bloco, select.value);
}

(function incluirEstiloDatasAulasTurma() {
    const atual = document.currentScript?.src;
    if (!atual) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL(ARQUIVO_CSS_DATAS_AULAS_TURMA, atual).href;
    document.head.appendChild(link);
})();

window.montarDatasAulasTurma = montarDatasAulasTurma;
