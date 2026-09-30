// Horário da turma (turma.hora_inicio / turma.hora_fim): o aluno só grava alternativas e entrega
// a atividade dentro desse intervalo (horário de Brasília). Vazio = sem restrição.
// O professor configura pela função definir_horario_turma; o banco (RLS) é quem impõe a regra.
// Depende de: js/supabase.js (SUPABASE, sbH).

const ROTA_DEFINIR_HORARIO = '/rest/v1/rpc/definir_horario_turma';
const MSG_ERRO_HORARIO = 'Não foi possível salvar o horário da turma: ';

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
