// Professor: logo abaixo do combo "Turma" do Progresso da turma (progresso-turma-global.js), lista
// TODAS as aulas da matéria da atividade e, em cada uma, a "Data da Aula" e o bloqueio NA TURMA
// escolhida (cada turma tem dias de aula diferentes); trocar a turma no combo relê os valores.
// Os dados ficam na tabela aula_turma (aula_id, turma_codigo, data_aula, bloqueio) e o professor
// edita aqui mesmo: escolher a data grava; limpar o campo remove a data da turma. O botão 🔒/🔓
// grava aula_turma.bloqueio (tarefa #186): bloquear a aula na turma põe a turma no bloqueio das
// atividades dela (gatilho do banco); liberar não mexe nas atividades.
// "Todas as turmas" não tem datas: mostra um aviso. O RLS só deixa o professor gravar.
// Depende de js/supabase.js e assets/js/aula-turma-repositorio.js (lê e grava aula_turma). Estilo: css/datas-aulas-turma.css
// Pedidos do usuário em 2026-10-16 (tarefas #185 e #186). Regra: docs/regras/atividades.md

const CLASSE_DATAS_AULAS_TURMA = 'datas-aulas-turma';
const ARQUIVO_CSS_DATAS_AULAS_TURMA = '../css/datas-aulas-turma.css';
const TEXTO_SEM_TURMA_DATAS_AULAS = 'Escolha uma turma para ver as datas das aulas.';
const TEXTO_SEM_AULAS_DATAS_AULAS = 'Esta matéria não tem aulas cadastradas.';
const TEXTO_BLOQUEADA_DATAS_AULAS = '🔒 Bloqueada';
const TEXTO_LIBERADA_DATAS_AULAS = '🔓 Liberada';
const TEXTO_SALVO_DATAS_AULAS = '✔ salvo';
const TEXTO_ERRO_DATAS_AULAS = '✖ não salvou';

/**
 * Lê a matéria da atividade e todas as aulas dela (sem as excluídas), em ordem.
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
 * Cria o botão de bloqueio da aula na turma (🔒 bloqueada / 🔓 liberada).
 * @param {boolean} estaBloqueada - Estado inicial.
 * @returns {HTMLButtonElement} Botão (o estado fica em aria-pressed).
 */
function criarBotaoBloqueioDatasAulas(estaBloqueada) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = CLASSE_DATAS_AULAS_TURMA + '__bloqueio';
    botao.setAttribute('aria-pressed', String(estaBloqueada));
    botao.textContent = estaBloqueada ? TEXTO_BLOQUEADA_DATAS_AULAS : TEXTO_LIBERADA_DATAS_AULAS;
    return botao;
}

/**
 * Cria a linha de uma aula: título, campo de data e botão de bloqueio, que gravam ao mudar.
 * @param {{aula: Object, turmaCodigo: string, datas: Map}} dados - Aula, turma e linhas lidas.
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
    const botao = criarBotaoBloqueioDatasAulas(datas.get(aula.id)?.bloqueio === true);
    const aviso = document.createElement('span');
    aviso.className = CLASSE_DATAS_AULAS_TURMA + '__aviso';
    const salvar = async () => {
        const valores = { data_aula: campo.value || null,
            bloqueio: botao.getAttribute('aria-pressed') === 'true' };
        try {
            const gravada = await gravarLinhaAulaTurma(
                { aulaId: aula.id, turmaCodigo, existente: datas.get(aula.id) }, valores);
            if (gravada) datas.set(aula.id, gravada); else datas.delete(aula.id);
            aviso.textContent = TEXTO_SALVO_DATAS_AULAS;
        } catch (erro) {
            console.warn('Data/bloqueio da aula na turma:', erro.message);
            aviso.textContent = TEXTO_ERRO_DATAS_AULAS;
        }
    };
    campo.addEventListener('change', salvar);
    botao.addEventListener('click', () => {
        const vaiBloquear = botao.getAttribute('aria-pressed') !== 'true';
        botao.setAttribute('aria-pressed', String(vaiBloquear));
        botao.textContent = vaiBloquear ? TEXTO_BLOQUEADA_DATAS_AULAS : TEXTO_LIBERADA_DATAS_AULAS;
        salvar();
    });
    item.append(nome, campo, botao, aviso);
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
            lerLinhasAulaTurma(turmaCodigo)]);
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
    titulo.textContent = '📅 Datas e bloqueio das aulas da turma';
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
