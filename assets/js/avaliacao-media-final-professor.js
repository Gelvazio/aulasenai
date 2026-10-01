// AVALIACAO-MEDIA-FINAL.html, perfil PROFESSOR: combos Turma e Aluno acima da tabela. A turma que
// já vem escolhida é a favorita (turma.favorito); o combo Aluno sempre começa em "Selecione o
// Aluno", com a tabela vazia, até o professor escolher. Só aparecem as turmas da UC da página
// (body data-uc).
// As notas vêm de resumo_tentativas_atividade (função só do professor), melhor tentativa entregue.
// Depende de avaliacao-media-final.js (NOTA_MAXIMA_MEDIA, agruparMelhoresNotasMedia,
// exibirNotasMedia) e de js/supabase.js (SUPABASE, sbGet, sbH).

const ROTA_RESUMO_MEDIA = '/rest/v1/rpc/resumo_tentativas_atividade';
const CONSULTA_TURMAS_MEDIA = 'select=codigo,nome,turno,local,uc,favorito,lider_aluno_id';
const CONSULTA_ALUNOS_MEDIA = 'select=id,nome,turma_codigo,numero_chamada,na_chamada' +
    '&order=numero_chamada.asc.nullslast,nome.asc';
const ROTULO_TURMA_MEDIA = 'Turma';
const ROTULO_ALUNO_MEDIA = 'Aluno';
const SUFIXO_LIDER_MEDIA = ' ⭐ líder';
const SUFIXO_FORA_CHAMADA_MEDIA = ' (fora da chamada)';
const MSG_SEM_ALUNOS_MEDIA = 'Nenhum aluno cadastrado nesta turma.';
const OPCAO_SELECIONE_ALUNO_MEDIA = 'Selecione o Aluno';
const MSG_SELECIONE_ALUNO_MEDIA = 'Selecione o aluno para ver as notas.';

const estadoProfessorMedia = { turmas: [], alunos: [], atividades: [], resumos: [] };

/**
 * Normaliza um texto para comparar (sem acentos, minúsculo, espaços únicos).
 * @param {string} texto - Texto original.
 * @returns {string} Texto normalizado.
 */
function normalizarTextoMedia(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Mantém só as turmas da UC da página; se nenhuma for da UC, devolve todas.
 * @param {Object[]} turmas - Turmas do banco.
 * @returns {Object[]} Turmas a oferecer no combo.
 */
function filtrarTurmasDaUcMedia(turmas) {
    const uc = normalizarTextoMedia(document.body.dataset.uc);
    const daUc = turmas.filter((turma) => normalizarTextoMedia(turma.uc) === uc);
    return daUc.length ? daUc : turmas;
}

/**
 * Busca o resumo das tentativas de todos os alunos em cada atividade da tabela.
 * @param {{id: number}[]} atividades - Atividades da tabela.
 * @returns {Promise<Object[]>} Linhas do resumo com atividade_id.
 */
async function buscarResumosProfessorMedia(atividades) {
    const listas = await Promise.all(atividades.map(async (atividade) => {
        const resposta = await fetch(SUPABASE.URL + ROTA_RESUMO_MEDIA, {
            method: 'POST', headers: await sbH(), cache: 'no-store',
            body: JSON.stringify({ p_atividade: atividade.id }),
        });
        if (!resposta.ok) throw new Error('resumo da atividade ' + atividade.id + ' indisponível');
        const linhas = await resposta.json();
        return linhas.map((linha) => ({ ...linha, atividade_id: atividade.id }));
    }));
    return listas.flat();
}

/**
 * Melhor nota entregue de um aluno em cada atividade, a partir do resumo do professor.
 * @param {string} alunoId - Id do aluno.
 * @returns {Map<string, number>} Melhor nota por caminho da página.
 */
function notasDoAlunoProfessorMedia(alunoId) {
    const notas = estadoProfessorMedia.resumos
        .filter((linha) => linha.aluno_id === alunoId && linha.entregue_em && linha.total)
        .map((linha) => ({ atividade_id: linha.atividade_id,
            nota: (linha.acertos / linha.total) * NOTA_MAXIMA_MEDIA }));
    return agruparMelhoresNotasMedia(estadoProfessorMedia.atividades, notas);
}

/**
 * Esvazia notas, pontos, subtotais e total da tabela (nenhum aluno escolhido). As linhas com
 * nota fixa (data-nota-fixa, igual para todos) continuam preenchidas.
 * @param {{tabela: HTMLTableElement, aviso: HTMLElement}} pagina - Elementos da página.
 * @param {string} mensagem - Texto do aviso abaixo da tabela.
 */
function limparNotasMedia({ tabela, aviso }, mensagem) {
    tabela.querySelectorAll('[data-campo="nota"], [data-campo="pontos"]')
        .forEach((campo) => { campo.textContent = TEXTO_SEM_NOTA_MEDIA; });
    preencherNotasFixasMedia(tabela);
    aviso.textContent = mensagem;
    aviso.classList.remove('media-situacao--abaixo');
}

/**
 * Cria um combo com rótulo.
 * @param {string} rotulo - Texto do rótulo.
 * @returns {{etiqueta: HTMLLabelElement, lista: HTMLSelectElement}} Combo pronto.
 */
function criarComboMedia(rotulo) {
    const etiqueta = document.createElement('label');
    etiqueta.className = 'media-combo';
    etiqueta.textContent = rotulo + ' ';
    const lista = document.createElement('select');
    etiqueta.appendChild(lista);
    return { etiqueta, lista };
}

/**
 * Mostra na tabela as notas do aluno escolhido.
 * @param {{tabela: HTMLTableElement, aviso: HTMLElement}} pagina - Elementos da página.
 * @param {Object|undefined} aluno - Aluno escolhido.
 */
function mostrarAlunoMedia(pagina, aluno) {
    if (!aluno) {
        limparNotasMedia(pagina, MSG_SELECIONE_ALUNO_MEDIA);
        return;
    }
    exibirNotasMedia(pagina, notasDoAlunoProfessorMedia(aluno.id), aluno.nome);
}

/**
 * Preenche o combo de alunos da turma, já em "Selecione o Aluno", com a tabela vazia.
 * @param {{pagina: Object, lista: HTMLSelectElement}} combo - Página e combo de alunos.
 * @param {Object} turma - Turma escolhida.
 */
function trocarTurmaMedia({ pagina, lista }, turma) {
    pagina.tabela.dataset.turmaAtual = turma.codigo;
    const alunos = estadoProfessorMedia.alunos
        .filter((aluno) => aluno.turma_codigo === turma.codigo);
    lista.replaceChildren(new Option(OPCAO_SELECIONE_ALUNO_MEDIA, ''), ...alunos.map((aluno) =>
        new Option((aluno.numero_chamada ?? '-') + ' — ' + aluno.nome +
        (aluno.id === turma.lider_aluno_id ? SUFIXO_LIDER_MEDIA : '') +
        (aluno.na_chamada === false ? SUFIXO_FORA_CHAMADA_MEDIA : ''), aluno.id)));
    lista.value = '';
    limparNotasMedia(pagina, alunos.length ? MSG_SELECIONE_ALUNO_MEDIA : MSG_SEM_ALUNOS_MEDIA);
}

/**
 * Monta os combos Turma e Aluno, com a turma favorita e o aluno em "Selecione o Aluno".
 * @param {{tabela: HTMLTableElement, aviso: HTMLElement}} pagina - Elementos da página.
 * @param {{id: number, pagina: string}[]} atividades - Atividades da tabela.
 */
async function iniciarProfessorMedia(pagina, atividades) {
    const [turmas, alunos, resumos] = await Promise.all([sbGet('turma', CONSULTA_TURMAS_MEDIA),
        sbGet('aluno', CONSULTA_ALUNOS_MEDIA), buscarResumosProfessorMedia(atividades)]);
    Object.assign(estadoProfessorMedia, { turmas: filtrarTurmasDaUcMedia(turmas), alunos,
        atividades, resumos });
    const comboTurma = criarComboMedia(ROTULO_TURMA_MEDIA);
    const comboAluno = criarComboMedia(ROTULO_ALUNO_MEDIA);
    estadoProfessorMedia.turmas.forEach((turma) => comboTurma.lista.add(new Option(
        [turma.nome, turma.local, turma.turno].filter(Boolean).join(' · '), turma.codigo)));
    const buscarTurma = (codigo) =>
        estadoProfessorMedia.turmas.find((turma) => turma.codigo === codigo);
    comboTurma.lista.addEventListener('change', () =>
        trocarTurmaMedia({ pagina, lista: comboAluno.lista }, buscarTurma(comboTurma.lista.value)));
    comboAluno.lista.addEventListener('change', () => mostrarAlunoMedia(pagina,
        estadoProfessorMedia.alunos.find((aluno) => aluno.id === comboAluno.lista.value)));
    const area = document.getElementById('mediaSelecao');
    area.replaceChildren(comboTurma.etiqueta, comboAluno.etiqueta);
    area.hidden = false;
    const favorita = estadoProfessorMedia.turmas.find((turma) => turma.favorito)
        || estadoProfessorMedia.turmas[0];
    if (!favorita) return;

    comboTurma.lista.value = favorita.codigo;
    trocarTurmaMedia({ pagina, lista: comboAluno.lista }, favorita);
}
