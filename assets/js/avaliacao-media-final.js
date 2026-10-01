// Página AVALIACAO-MEDIA-FINAL.html: preenche a nota (0 a 10) e os pontos de cada instrumento da
// tabela. ALUNO: as próprias notas (melhor tentativa entregue, calculada no banco por
// nota_da_tentativa; o gabarito nunca sai do banco). PROFESSOR: escolhe turma e aluno nos combos
// (assets/js/avaliacao-media-final-professor.js). Linhas com data-pagina (caminho relativo à
// página) e data-pontos; subtotais por data-subtotal e total por data-total.
// Depende de js/supabase.js (SUPABASE, sbGet, sbH, obterClienteSupabase).

const ROTA_NOTA_MEDIA = '/rest/v1/rpc/nota_da_tentativa';
const NOTA_MAXIMA_MEDIA = 10;
const PERFIL_PROFESSOR_MEDIA = 'PROFESSOR';
const TEXTO_SEM_NOTA_MEDIA = '—';
const SUJEITO_ALUNO_MEDIA = 'Você';
const MSG_CARREGANDO_MEDIA = 'Carregando as notas...';
const MSG_SEM_LOGIN_MEDIA = 'Entre com seu usuário (botão ENTRAR) para ver as suas notas.';
const MSG_ERRO_MEDIA = 'Não foi possível carregar as notas: ';
const MSG_APROVADO_MEDIA =
    '✅ {sujeito} soma {pontos} pontos: atingiu a pontuação mínima de {minimo}.';
const MSG_ABAIXO_MEDIA =
    '⚠️ {sujeito} soma {pontos} pontos até agora. A pontuação mínima é {minimo}.';

/**
 * Formata um número com uma casa decimal e vírgula.
 * @param {number} valor - Número a formatar.
 * @returns {string} Número formatado.
 */
function formatarNumeroMedia(valor) {
    return valor.toFixed(1).replace('.', ',');
}

/**
 * Converte o caminho relativo de uma linha no caminho gravado em atividade.pagina.
 * @param {string} relativo - Caminho relativo à página atual.
 * @returns {string} Caminho absoluto (pathname) decodificado.
 */
function caminhoDaPaginaMedia(relativo) {
    return decodeURIComponent(new URL(relativo, location.href).pathname);
}

/**
 * Lê o usuário logado e se ele é professor.
 * @returns {Promise<{logado: boolean, ehProfessor: boolean, usuarioId: string}>} Situação do
 *     login.
 */
async function lerLoginMedia() {
    const cliente = obterClienteSupabase();
    if (!cliente) return { logado: false, ehProfessor: false };

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    return { logado: Boolean(usuario), usuarioId: usuario?.id,
        ehProfessor: usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_MEDIA };
}

/**
 * Busca o código da turma do aluno logado (tabela aluno).
 * @param {string} usuarioId - Id do aluno.
 * @returns {Promise<string>} Código da turma ou "" se não houver.
 */
async function lerTurmaDoAlunoMedia(usuarioId) {
    const linhas = await sbGet('aluno',
        'select=turma_codigo&id=eq.' + encodeURIComponent(usuarioId));
    return linhas[0]?.turma_codigo || '';
}

/**
 * Busca no banco as atividades das linhas da tabela (as que o usuário consegue ler).
 * @param {HTMLTableElement} tabela - Tabela da média final.
 * @returns {Promise<{id: number, pagina: string}[]>} Atividades cadastradas.
 */
async function buscarAtividadesMedia(tabela) {
    const lista = [...tabela.querySelectorAll('tr[data-pagina]')]
        .map((linha) => '"' + caminhoDaPaginaMedia(linha.dataset.pagina).replace(/"/g, '') + '"')
        .join(',');
    return sbGet('atividade', 'select=id,pagina&pagina=in.(' + encodeURIComponent(lista) + ')');
}

/**
 * Guarda a maior nota de cada atividade (por página) a partir de notas de tentativas.
 * @param {{id: number, pagina: string}[]} atividades - Atividades da tabela.
 * @param {{atividade_id: number, nota: number|null}[]} notas - Notas das tentativas entregues.
 * @returns {Map<string, number>} Melhor nota por caminho da página.
 */
function agruparMelhoresNotasMedia(atividades, notas) {
    const melhores = new Map();
    atividades.forEach((atividade) => {
        const daAtividade = notas.filter((item) =>
            item.atividade_id === atividade.id && item.nota !== null);
        if (daAtividade.length) melhores.set(atividade.pagina,
            Math.max(...daAtividade.map((item) => item.nota)));
    });
    return melhores;
}

/**
 * Calcula a nota (0 a 10) de uma tentativa entregue do aluno logado.
 * @param {number} atividadeId - Id da atividade.
 * @param {number} tentativa - Número da tentativa.
 * @returns {Promise<number|null>} Nota ou null se não houver resultado.
 */
async function lerNotaDaTentativaMedia(atividadeId, tentativa) {
    const resposta = await fetch(SUPABASE.URL + ROTA_NOTA_MEDIA, {
        method: 'POST', headers: await sbH(), cache: 'no-store',
        body: JSON.stringify({ p_atividade: atividadeId, p_tentativa: tentativa }),
    });
    if (!resposta.ok) throw new Error('nota indisponível (' + resposta.status + ')');

    const [resultado] = await resposta.json();
    if (!resultado?.total) return null;
    return (resultado.acertos / resultado.total) * NOTA_MAXIMA_MEDIA;
}

/**
 * Busca a melhor nota entregue do ALUNO logado em cada atividade.
 * @param {{id: number, pagina: string}[]} atividades - Atividades da tabela.
 * @returns {Promise<Map<string, number>>} Melhor nota por caminho da página.
 */
async function buscarNotasDoAlunoLogadoMedia(atividades) {
    if (!atividades.length) return new Map();

    const ids = atividades.map((atividade) => atividade.id).join(',');
    const entregas = await sbGet('entrega_atividade',
        'select=atividade_id,tentativa&atividade_id=in.(' + ids + ')');
    const notas = await Promise.all(entregas.map(async (entrega) => ({ ...entrega,
        nota: await lerNotaDaTentativaMedia(entrega.atividade_id, entrega.tentativa) })));
    return agruparMelhoresNotasMedia(atividades, notas);
}

/**
 * Diz se a nota fixa da linha vale para a turma em exibição (tabela data-turma-atual). Sem
 * data-nota-fixa-turmas, a nota fixa vale para todas as turmas.
 * @param {HTMLTableRowElement} linha - Linha da tabela.
 * @returns {boolean} true se a linha usa a nota fixa.
 */
function usaNotaFixaMedia(linha) {
    if (linha.dataset.notaFixa === undefined) return false;
    if (linha.dataset.notaFixaTurmas === undefined) return true;

    const turmaAtual = linha.closest('table').dataset.turmaAtual || '';
    return linha.dataset.notaFixaTurmas.split(',').includes(turmaAtual);
}

/**
 * Nota de uma linha: a nota fixa (data-nota-fixa, para a turma) ou a do banco.
 * @param {HTMLTableRowElement} linha - Linha com data-pagina.
 * @param {Map<string, number>} notas - Melhor nota por caminho.
 * @returns {number|undefined} Nota de 0 a 10 ou undefined se não houver.
 */
function notaDaLinhaMedia(linha, notas) {
    if (usaNotaFixaMedia(linha)) return Number(linha.dataset.notaFixa);
    return notas.get(caminhoDaPaginaMedia(linha.dataset.pagina));
}

/**
 * Escreve a nota e os pontos das linhas com nota fixa (valem para todos os alunos).
 * @param {HTMLTableElement} tabela - Tabela da média final.
 */
function preencherNotasFixasMedia(tabela) {
    tabela.querySelectorAll('tr[data-nota-fixa]').forEach((linha) => {
        if (!usaNotaFixaMedia(linha)) return;
        const nota = Number(linha.dataset.notaFixa);
        const pontos = (nota / NOTA_MAXIMA_MEDIA) * Number(linha.dataset.pontos);
        linha.querySelector('[data-campo="nota"]').textContent = formatarNumeroMedia(nota);
        linha.querySelector('[data-campo="pontos"]').textContent = formatarNumeroMedia(pontos);
    });
}

/**
 * Escreve nota e pontos em cada linha com data-pagina (sem nota = "—").
 * @param {HTMLTableElement} tabela - Tabela da média final.
 * @param {Map<string, number>} notas - Melhor nota por caminho.
 * @returns {number} Total de pontos.
 */
function preencherLinhasMedia(tabela, notas) {
    let total = 0;
    tabela.querySelectorAll('tr[data-pagina]').forEach((linha) => {
        const nota = notaDaLinhaMedia(linha, notas);
        const temNota = nota !== undefined;
        const pontos = temNota ? (nota / NOTA_MAXIMA_MEDIA) * Number(linha.dataset.pontos) : 0;
        linha.dataset.obtidos = String(pontos);
        linha.querySelector('[data-campo="nota"]').textContent =
            temNota ? formatarNumeroMedia(nota) : TEXTO_SEM_NOTA_MEDIA;
        linha.querySelector('[data-campo="pontos"]').textContent =
            temNota ? formatarNumeroMedia(pontos) : TEXTO_SEM_NOTA_MEDIA;
        total += pontos;
    });
    return total;
}

/**
 * Escreve a nota (0 a 10) de um subtotal que tem campo de nota, para lançar no sistema com o
 * peso do grupo (ex.: média das 10 atividades = pontos obtidos ÷ 30 × 10).
 * @param {HTMLTableRowElement} linha - Linha do subtotal (com data-pontos).
 * @param {number} soma - Pontos obtidos no grupo.
 */
function preencherNotaSubtotalMedia(linha, soma) {
    const campoNota = linha.querySelector('[data-campo="nota"]');
    const pontosDoGrupo = Number(linha.dataset.pontos);
    if (!campoNota || !pontosDoGrupo) return;

    campoNota.textContent = formatarNumeroMedia((soma / pontosDoGrupo) * NOTA_MAXIMA_MEDIA);
}

/**
 * Escreve os pontos de cada subtotal (soma das linhas do mesmo grupo) e o total geral.
 * @param {HTMLTableElement} tabela - Tabela da média final.
 * @param {number} total - Total de pontos.
 */
function preencherSomasMedia(tabela, total) {
    tabela.querySelectorAll('tr[data-subtotal]').forEach((linha) => {
        const soma = [...tabela.querySelectorAll(
            'tr[data-pagina][data-grupo="' + linha.dataset.subtotal + '"]')]
            .reduce((acumulado, item) => acumulado + Number(item.dataset.obtidos || 0), 0);
        linha.querySelector('[data-campo="pontos"]').textContent = formatarNumeroMedia(soma);
        preencherNotaSubtotalMedia(linha, soma);
    });
    tabela.querySelector('tr[data-total] [data-campo="pontos"]').textContent =
        formatarNumeroMedia(total);
}

/**
 * Preenche a tabela com as notas e mostra a situação em relação à pontuação mínima.
 * @param {{tabela: HTMLTableElement, aviso: HTMLElement}} pagina - Elementos da página.
 * @param {Map<string, number>} notas - Melhor nota por caminho.
 * @param {string} sujeito - Quem soma os pontos ("Você" ou o nome do aluno).
 */
function exibirNotasMedia({ tabela, aviso }, notas, sujeito) {
    const total = preencherLinhasMedia(tabela, notas);
    preencherSomasMedia(tabela, total);
    const minimo = Number(tabela.dataset.notaMinima);
    const modelo = total >= minimo ? MSG_APROVADO_MEDIA : MSG_ABAIXO_MEDIA;
    aviso.textContent = modelo.replace('{sujeito}', sujeito)
        .replace('{pontos}', formatarNumeroMedia(total)).replace('{minimo}', String(minimo));
    aviso.classList.toggle('media-situacao--abaixo', total < minimo);
}

/**
 * Inicia a página: confere o login e carrega as notas (aluno) ou os combos (professor).
 */
async function iniciarMediaFinal() {
    const pagina = { tabela: document.querySelector('.media-tabela'),
        aviso: document.getElementById('mediaSituacao') };
    if (!pagina.tabela || !pagina.aviso) return;

    pagina.aviso.textContent = MSG_CARREGANDO_MEDIA;
    try {
        const login = await lerLoginMedia();
        if (!login.logado) {
            pagina.aviso.textContent = MSG_SEM_LOGIN_MEDIA;
            return;
        }
        const atividades = await buscarAtividadesMedia(pagina.tabela);
        if (login.ehProfessor) {
            await iniciarProfessorMedia(pagina, atividades);
            return;
        }
        pagina.tabela.dataset.turmaAtual = await lerTurmaDoAlunoMedia(login.usuarioId);
        exibirNotasMedia(pagina, await buscarNotasDoAlunoLogadoMedia(atividades),
            SUJEITO_ALUNO_MEDIA);
    } catch (erro) {
        pagina.aviso.textContent = MSG_ERRO_MEDIA + erro.message;
    }
}

iniciarMediaFinal();
