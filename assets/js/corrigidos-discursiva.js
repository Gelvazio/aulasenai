// Professor: descobre quais alunos da atividade discursiva o professor já corrigiu, para o
// ON/OFF "Pendente Correcao" do combo "Aluno" (assets/js/respostas-aluno-professor.js).
// Corrigido = entregou e tem a nota do professor em todas as questões respondidas (a mesma regra
// da "Prova Corrigida" do Progresso da turma). Só leitura. Depende de js/supabase.js (sbGet).
// Regra: docs/regras/atividades.md

/**
 * Monta a chave de uma parte (tópico) respondida por um aluno numa tentativa.
 * @param {{aluno_id: string, tentativa: number, item: number, topico: number}} linha - Linha.
 * @returns {string} Chave "aluno|tentativa|item|topico".
 */
function chaveParteCorrigida(linha) {
    return [linha.aluno_id, linha.tentativa, linha.item, linha.topico].join('|');
}

/**
 * Conta, por aluno e tentativa, as partes respondidas e as que têm nota do professor.
 * @param {Object[]} respostas - Linhas {aluno_id, tentativa, item, topico, texto}.
 * @param {Object[]} correcoes - Linhas {aluno_id, tentativa, item, topico, nota_professor}.
 * @returns {Map<string, {respondidas: number, doProfessor: number}>} Contagem por
 *     "aluno|tentativa".
 */
function contarPartesCorrigidas(respostas, correcoes) {
    const comNota = new Set(correcoes
        .filter((linha) => linha.nota_professor !== null && linha.nota_professor !== undefined)
        .map(chaveParteCorrigida));
    const contagem = new Map();
    respostas.filter((linha) => (linha.texto || '').trim() !== '').forEach((linha) => {
        const chave = linha.aluno_id + '|' + linha.tentativa;
        const total = contagem.get(chave) || { respondidas: 0, doProfessor: 0 };
        total.respondidas += 1;
        if (comNota.has(chaveParteCorrigida(linha))) total.doProfessor += 1;
        contagem.set(chave, total);
    });
    return contagem;
}

/**
 * Lê quem o professor já corrigiu na atividade discursiva.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Set<string>>} Chaves "alunoId|tentativa" dos alunos corrigidos.
 * @throws {Error} Se o banco recusar.
 */
async function lerCorrigidosDiscursiva(atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [respostas, correcoes, entregas] = await Promise.all([
        sbGet('resposta_discursiva', 'select=aluno_id,tentativa,item,topico,texto&' + filtro),
        sbGet('correcao_discursiva',
            'select=aluno_id,tentativa,item,topico,nota_professor&' + filtro),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa&' + filtro),
    ]);
    const entregues = new Set(entregas.map((entrega) =>
        entrega.aluno_id + '|' + entrega.tentativa));
    const corrigidos = new Set();
    contarPartesCorrigidas(respostas, correcoes).forEach((total, chave) => {
        const estaCorrigido = entregues.has(chave) && total.doProfessor >= total.respondidas;
        if (estaCorrigido) corrigidos.add(chave);
    });
    return corrigidos;
}

window.lerCorrigidosDiscursiva = lerCorrigidosDiscursiva;
