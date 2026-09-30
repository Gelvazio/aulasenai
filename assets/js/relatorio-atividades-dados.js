// Dados do relatorioAtividades.html: busca no Supabase as atividades da matéria, as turmas, os
// alunos (banco + listas de presença em scripts/LISTA-PRESENCA*.js) e as tentativas de cada
// aluno, e calcula o resumo por aluno (fez a atividade, status, tentativas e média).
// Só o professor logado enxerga tudo (RLS). Depende de js/supabase.js (sbGet, sbH, SUPABASE).
// Regra da média: soma das melhores notas das atividades ATIVAS da matéria dividida pelo total
// de atividades ativas (atividade não entregue conta 0). Nota mínima = 7.

const ROTA_RESUMO_REL = '/rest/v1/rpc/resumo_tentativas_atividade';
const NOTA_MINIMA_REL = 7;
const NOTA_MAXIMA_REL = 10;
const PERFIL_PROFESSOR_REL = 'PROFESSOR';
const CONSULTA_ATIVIDADES_REL =
    'select=id,descricao,pagina,ativo,aulas(numero,materia(id,descricao))&order=id';
const CONSULTA_TURMAS_REL = 'select=codigo,nome,turno,local,uc,favorito';
const CONSULTA_ALUNOS_REL = 'select=id,nome,email,turma_codigo,numero_chamada,na_chamada';

/**
 * Normaliza um texto para comparar nomes (sem acentos, minúsculo, espaços únicos).
 * @param {string} texto - Texto original.
 * @returns {string} Texto normalizado.
 */
function normalizarTextoRel(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Compara dois nomes em ordem alfabética (português, sem diferenciar acento).
 * @param {string} a - Primeiro nome.
 * @param {string} b - Segundo nome.
 * @returns {number} Resultado da comparação.
 */
function compararNomesRel(a, b) {
    return String(a || '').localeCompare(String(b || ''), 'pt-BR', { sensitivity: 'base' });
}

/**
 * Indica se o usuário logado é professor.
 * @returns {Promise<{logado: boolean, ehProfessor: boolean}>} Situação do login.
 */
async function lerLoginRel() {
    const cliente = obterClienteSupabase();
    if (!cliente) return { logado: false, ehProfessor: false };

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    const ehProfessor = usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_REL;
    return { logado: Boolean(usuario), ehProfessor };
}

/**
 * Agrupa as atividades cadastradas por matéria.
 * @param {Object[]} atividades - Atividades com aulas(materia).
 * @returns {{id: number, nome: string, atividades: Object[]}[]} Matérias em ordem alfabética.
 */
function agruparMateriasRel(atividades) {
    const porMateria = new Map();
    atividades.forEach((atividade) => {
        const materia = atividade.aulas?.materia;
        if (!materia) return;

        const grupo = porMateria.get(materia.id) || { id: materia.id, nome: materia.descricao,
            atividades: [] };
        grupo.atividades.push(atividade);
        porMateria.set(materia.id, grupo);
    });
    return [...porMateria.values()].sort((a, b) => compararNomesRel(a.nome, b.nome));
}

/**
 * Lê as listas de presença carregadas pelos arquivos scripts/LISTA-PRESENCA*.js.
 * @returns {{codigo: string, nome: string, turno: string, local: string, uc: string,
 *     alunos: Object[]}[]} Turmas das listas (professor excluído).
 */
function lerListasPresencaRel() {
    const listas = [...(window.LISTAS_PRESENCA || [])];
    if (window.LISTA_PRESENCA) listas.push(window.LISTA_PRESENCA);
    return listas.flatMap((lista) => (lista.turmas || []).map((turma) => ({
        codigo: String(turma.codigo), nome: turma.nome, turno: turma.turno || '',
        local: turma.local || lista.local || '', uc: turma.uc || lista.uc || '',
        alunos: (turma.alunos || []).filter((aluno) => aluno.perfil !== PERFIL_PROFESSOR_REL),
    })));
}

/**
 * Junta os alunos do banco e da lista de presença de uma turma (chave = e-mail).
 * @param {Object[]} doBanco - Alunos da tabela aluno nesta turma.
 * @param {Object[]} daLista - Alunos da lista de presença nesta turma.
 * @returns {Object[]} Alunos em ordem alfabética.
 */
function mesclarAlunosRel(doBanco, daLista) {
    const porEmail = new Map();
    daLista.forEach((aluno) => porEmail.set(String(aluno.email).toLowerCase(), {
        id: null, nome: aluno.nome, email: aluno.email, numero: aluno.numero,
        foraChamada: aluno.naChamada === false, cadastrado: false,
    }));
    doBanco.forEach((aluno) => {
        const chave = String(aluno.email).toLowerCase();
        const existente = porEmail.get(chave) || {};
        porEmail.set(chave, { ...existente, id: aluno.id, nome: aluno.nome || existente.nome,
            email: aluno.email, numero: aluno.numero_chamada ?? existente.numero,
            foraChamada: aluno.na_chamada === false, cadastrado: true });
    });
    return [...porEmail.values()].sort((a, b) => compararNomesRel(a.nome, b.nome));
}

/**
 * Monta as turmas da matéria, com os alunos do banco e das listas de presença.
 * Se nenhuma turma tiver a UC da matéria, mostra todas (aviso na tela).
 * @param {{nome: string}} materia - Matéria escolhida.
 * @returns {Promise<{turmas: Object[], filtradaPorUc: boolean}>} Turmas e se filtrou pela UC.
 */
async function carregarTurmasRel(materia) {
    const [turmasBanco, alunosBanco] = await Promise.all(
        [sbGet('turma', CONSULTA_TURMAS_REL), sbGet('aluno', CONSULTA_ALUNOS_REL)]);
    const listas = lerListasPresencaRel();
    const codigos = new Set([...turmasBanco.map((t) => t.codigo), ...listas.map((t) => t.codigo)]);
    const todas = [...codigos].map((codigo) => {
        const banco = turmasBanco.find((turma) => turma.codigo === codigo) || {};
        const lista = listas.find((turma) => turma.codigo === codigo) || {};
        return {
            codigo, nome: banco.nome || lista.nome || codigo, uc: banco.uc || lista.uc || '',
            turno: banco.turno || lista.turno || '', local: banco.local || lista.local || '',
            favorita: Boolean(banco.favorito),
            alunos: mesclarAlunosRel(
                alunosBanco.filter((aluno) => aluno.turma_codigo === codigo), lista.alunos || []),
        };
    });
    const daMateria = todas.filter((turma) =>
        normalizarTextoRel(turma.uc) === normalizarTextoRel(materia.nome));
    const filtradaPorUc = daMateria.length > 0;
    const turmas = filtradaPorUc ? daMateria : todas;
    return { turmas: turmas.sort((a, b) => compararNomesRel(a.nome, b.nome)), filtradaPorUc };
}

/**
 * Busca as tentativas de todos os alunos em cada atividade (função só do professor).
 * @param {Object[]} atividades - Atividades da matéria.
 * @returns {Promise<Map<number, Object[]>>} Linhas do resumo por id de atividade.
 */
async function carregarResumosRel(atividades) {
    const pares = await Promise.all(atividades.map(async (atividade) => {
        const resposta = await fetch(SUPABASE.URL + ROTA_RESUMO_REL, {
            method: 'POST', headers: await sbH(), cache: 'no-store',
            body: JSON.stringify({ p_atividade: atividade.id }),
        });
        if (!resposta.ok) throw new Error('Resumo da atividade ' + atividade.id + ' indisponível');
        return [atividade.id, await resposta.json()];
    }));
    return new Map(pares);
}

/**
 * Resume um aluno em uma atividade (tentativas, status e melhor nota entregue).
 * @param {Object[]} linhas - Linhas do resumo do aluno nesta atividade.
 * @returns {{tentativas: number, status: string, melhorNota: number|null}} Resumo.
 */
function resumirAtividadeDoAluno(linhas) {
    if (!linhas.length) return { tentativas: 0, status: '', melhorNota: null };

    const ordenadas = [...linhas].sort((a, b) => a.tentativa - b.tentativa);
    const notas = ordenadas.filter((linha) => linha.entregue_em)
        .map((linha) => (linha.acertos / linha.total) * NOTA_MAXIMA_REL);
    const ultima = ordenadas[ordenadas.length - 1];
    return {
        tentativas: ordenadas.length, status: ultima.entregue_em ? 'entregue' : 'andamento',
        melhorNota: notas.length ? Math.max(...notas) : null,
    };
}

/**
 * Calcula o resumo geral de um aluno em todas as atividades ativas da matéria.
 * @param {Object} aluno - Aluno (com id ou null se sem cadastro).
 * @param {Object[]} atividades - Atividades da matéria.
 * @param {Map<number, Object[]>} resumos - Linhas do resumo por atividade.
 * @returns {Object} Resumo: detalhes, feitas, fez, status, tentativas, media e naoAtingiu.
 */
function calcularResumoAlunoRel(aluno, atividades, resumos) {
    const ativas = atividades.filter((atividade) => atividade.ativo);
    const detalhes = ativas.map((atividade) => {
        const linhas = aluno.id
            ? (resumos.get(atividade.id) || []).filter((linha) => linha.aluno_id === aluno.id) : [];
        return { atividade, ...resumirAtividadeDoAluno(linhas) };
    });
    const feitas = detalhes.filter((detalhe) => detalhe.tentativas > 0).length;
    const somaNotas = detalhes.reduce((soma, detalhe) => soma + (detalhe.melhorNota || 0), 0);
    const media = ativas.length ? somaNotas / ativas.length : 0;
    return {
        detalhes, feitas, total: ativas.length, fez: feitas > 0, media,
        entregue: detalhes.some((detalhe) => detalhe.status === 'entregue'),
        andamento: detalhes.some((detalhe) => detalhe.status === 'andamento'),
        tentativas: Math.max(0, ...detalhes.map((detalhe) => detalhe.tentativas)),
        naoAtingiu: media < NOTA_MINIMA_REL,
    };
}
