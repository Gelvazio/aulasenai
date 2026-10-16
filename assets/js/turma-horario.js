// Horário da turma (turma.hora_inicio / turma.hora_fim): o aluno só grava alternativas e entrega
// a atividade dentro desse intervalo (horário de Brasília). Vazio = sem restrição.
// O professor configura pela função definir_horario_turma; o banco (RLS) é quem impõe a regra.
// ON/OFF "Bloquear horário" (turma.bloquear_horario, #200): desligado, o horário não bloqueia
// nada (nem nas avaliações); o professor muda pela função definir_bloqueio_horario_turma.
// Depende de: js/supabase.js (SUPABASE, sbH).

const ROTA_DEFINIR_HORARIO = '/rest/v1/rpc/definir_horario_turma';
const MSG_ERRO_HORARIO = 'Não foi possível salvar o horário da turma: ';
const ROTA_DEFINIR_BLOQUEIO_HORARIO = '/rest/v1/rpc/definir_bloqueio_horario_turma';
const MSG_ERRO_BLOQUEIO_HORARIO = 'Não foi possível ligar ou desligar o bloqueio de horário: ';
const TEXTO_BLOQUEIO_HORARIO_LIGADO = '🔒 Bloquear horário: ON';
const TEXTO_BLOQUEIO_HORARIO_DESLIGADO = '🔓 Bloquear horário: OFF';
const MSG_BLOQUEIO_HORARIO_LIGADO = 'Bloqueio ligado: os alunos da turma só gravam e entregam ' +
    'dentro do horário da turma.';
const MSG_BLOQUEIO_HORARIO_DESLIGADO = 'Bloqueio desligado: os alunos da turma gravam e ' +
    'entregam a qualquer hora.';
const CLASSE_BLOQUEIO_HORARIO = 'bloqueio-horario';

/**
 * Corta os segundos de um horário do banco ("13:15:00" vira "13:15").
 * @param {string|null} hora - Horário no formato do banco ou vazio.
 * @returns {string} Horário HH:MM ou vazio.
 */
function formatarHoraTurma(hora) {
    return hora ? String(hora).slice(0, 5) : '';
}

/**
 * Define (ou limpa, com os dois vazios) o horário de uma turma. Só o professor consegue.
 * @param {{codigo: string, inicio: string, fim: string}} horario - Turma e horários HH:MM.
 * @throws {Error} Se o banco recusar (ex.: início maior que o fim).
 */
async function definirHorarioTurma({ codigo, inicio, fim }) {
    const resposta = await fetch(SUPABASE.URL + ROTA_DEFINIR_HORARIO, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify({ p_codigo: codigo, p_inicio: inicio || null, p_fim: fim || null }),
    });
    if (resposta.ok) return;

    const erro = await resposta.json().catch(() => ({}));
    throw new Error(MSG_ERRO_HORARIO + (erro.message || resposta.status));
}

/**
 * Liga ou desliga o bloqueio de horário de uma turma. Só o professor da turma consegue.
 * @param {{codigo: string, ligado: boolean}} bloqueio - Turma e a nova situação.
 * @throws {Error} Se o banco recusar (ex.: turma não vinculada ao professor).
 */
async function definirBloqueioHorarioTurma({ codigo, ligado }) {
    const resposta = await fetch(SUPABASE.URL + ROTA_DEFINIR_BLOQUEIO_HORARIO, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify({ p_codigo: codigo, p_ligado: ligado }),
    });
    if (resposta.ok) return;

    const erro = await resposta.json().catch(() => ({}));
    throw new Error(MSG_ERRO_BLOQUEIO_HORARIO + (erro.message || resposta.status));
}

/**
 * Mostra no botão se o bloqueio está ligado (ON) ou desligado (OFF).
 * @param {HTMLButtonElement} botao - Botão ON/OFF.
 * @param {boolean} ligado - Situação do bloqueio da turma.
 */
function atualizarBotaoBloqueioHorario(botao, ligado) {
    botao.textContent = ligado ? TEXTO_BLOQUEIO_HORARIO_LIGADO : TEXTO_BLOQUEIO_HORARIO_DESLIGADO;
    botao.classList.toggle(CLASSE_BLOQUEIO_HORARIO + '--desligado', !ligado);
    botao.setAttribute('aria-pressed', String(ligado));
}

/**
 * Inverte o bloqueio da turma escolhida, grava no banco e avisa o professor.
 * @param {HTMLButtonElement} botao - Botão ON/OFF (fica ocupado enquanto grava).
 * @param {{obterTurma: Function, avisar: Function}} opcoes - Turma escolhida
 *     ({codigo, bloquearHorario}) e como mostrar a mensagem (texto, tipo).
 */
async function alternarBloqueioHorario(botao, { obterTurma, avisar }) {
    const turma = obterTurma();
    if (!turma) return;

    const ligado = !turma.bloquearHorario;
    botao.disabled = true;
    try {
        await definirBloqueioHorarioTurma({ codigo: turma.codigo, ligado });
        turma.bloquearHorario = ligado;
        atualizarBotaoBloqueioHorario(botao, ligado);
        await avisar(ligado ? MSG_BLOQUEIO_HORARIO_LIGADO : MSG_BLOQUEIO_HORARIO_DESLIGADO,
            'sucesso');
    } catch (erro) {
        await avisar(erro.message, 'erro');
    } finally {
        botao.disabled = false;
    }
}

/**
 * Cria o botão ON/OFF "Bloquear horário" da turma escolhida (botao.atualizar() relê a turma).
 * @param {{obterTurma: Function, avisar: Function}} opcoes - Turma escolhida
 *     ({codigo, bloquearHorario}) e como mostrar a mensagem (texto, tipo).
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoBloqueioHorario(opcoes) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-export ' + CLASSE_BLOQUEIO_HORARIO;
    botao.addEventListener('click', () => alternarBloqueioHorario(botao, opcoes));
    botao.atualizar = () => atualizarBotaoBloqueioHorario(botao,
        opcoes.obterTurma()?.bloquearHorario !== false);
    botao.atualizar();
    return botao;
}
