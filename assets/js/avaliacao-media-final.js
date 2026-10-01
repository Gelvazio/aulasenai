// Página AVALIACAO-MEDIA-FINAL.html: preenche, para o ALUNO logado, a nota (0 a 10) e os pontos de
// cada instrumento da tabela. A nota de cada atividade é a da melhor tentativa entregue, calculada
// no banco por nota_da_tentativa (o gabarito nunca sai do banco). Linhas com data-pagina (caminho
// relativo à página) e data-pontos; subtotais por data-subtotal e total por data-total.
// Depende de js/supabase.js (SUPABASE, sbGet, sbH, obterClienteSupabase).

const ROTA_NOTA_MEDIA = '/rest/v1/rpc/nota_da_tentativa';
const NOTA_MAXIMA_MEDIA = 10;
const PERFIL_PROFESSOR_MEDIA = 'PROFESSOR';
const TEXTO_SEM_NOTA_MEDIA = '—';
const MSG_CARREGANDO_MEDIA = 'Carregando suas notas...';
const MSG_SEM_LOGIN_MEDIA = 'Entre com seu usuário (botão ENTRAR) para ver as suas notas.';
const MSG_PROFESSOR_MEDIA = 'As notas aparecem para o aluno logado. ' +
    'O professor vê as notas de todos em Relatório de atividades.';
const MSG_ERRO_MEDIA = 'Não foi possível carregar as suas notas: ';
const MSG_APROVADO_MEDIA =
    '✅ Você soma {pontos} pontos: atingiu a pontuação mínima de {minimo}.';
const MSG_ABAIXO_MEDIA =
    '⚠️ Você soma {pontos} pontos até agora. A pontuação mínima é {minimo}.';

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
 * @returns {Promise<{logado: boolean, ehProfessor: boolean}>} Situação do login.
 */
async function lerLoginMedia() {
    const cliente = obterClienteSupabase();
    if (!cliente) return { logado: false, ehProfessor: false };

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    return { logado: Boolean(usuario),
        ehProfessor: usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_MEDIA };
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
 * Busca a melhor nota entregue do aluno logado em cada página da tabela.
 * @param {string[]} caminhos - Caminhos (atividade.pagina) das linhas.
 * @returns {Promise<Map<string, number>>} Melhor nota por caminho (só as que têm entrega).
 */
async function buscarMelhoresNotasMedia(caminhos) {
    const lista = caminhos.map((caminho) => '"' + caminho.replace(/"/g, '') + '"').join(',');
    const atividades = await sbGet('atividade',
        'select=id,pagina&pagina=in.(' + encodeURIComponent(lista) + ')');
    if (!atividades.length) return new Map();

    const ids = atividades.map((atividade) => atividade.id).join(',');
    const entregas = await sbGet('entrega_atividade',
        'select=atividade_id,tentativa&atividade_id=in.(' + ids + ')');
    const notas = await Promise.all(entregas.map(async (entrega) => ({ ...entrega,
        nota: await lerNotaDaTentativaMedia(entrega.atividade_id, entrega.tentativa) })));
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
 * Escreve nota e pontos em cada linha com data-pagina.
 * @param {HTMLTableElement} tabela - Tabela da média final.
 * @param {Map<string, number>} notas - Melhor nota por caminho.
 * @returns {number} Total de pontos do aluno.
 */
function preencherLinhasMedia(tabela, notas) {
    let total = 0;
    tabela.querySelectorAll('tr[data-pagina]').forEach((linha) => {
        const nota = notas.get(caminhoDaPaginaMedia(linha.dataset.pagina));
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
 * Escreve os pontos de cada subtotal (soma das linhas do mesmo grupo) e o total geral.
 * @param {HTMLTableElement} tabela - Tabela da média final.
 * @param {number} total - Total de pontos do aluno.
 */
function preencherSomasMedia(tabela, total) {
    tabela.querySelectorAll('tr[data-subtotal]').forEach((linha) => {
        const soma = [...tabela.querySelectorAll(
            'tr[data-pagina][data-grupo="' + linha.dataset.subtotal + '"]')]
            .reduce((acumulado, item) => acumulado + Number(item.dataset.obtidos || 0), 0);
        linha.querySelector('[data-campo="pontos"]').textContent = formatarNumeroMedia(soma);
    });
    tabela.querySelector('tr[data-total] [data-campo="pontos"]').textContent =
        formatarNumeroMedia(total);
}

/**
 * Mostra a situação do aluno em relação à pontuação mínima.
 * @param {HTMLElement} aviso - Parágrafo de situação.
 * @param {number} total - Total de pontos do aluno.
 * @param {number} minimo - Pontuação mínima (data-nota-minima da tabela).
 */
function mostrarSituacaoMedia(aviso, total, minimo) {
    const modelo = total >= minimo ? MSG_APROVADO_MEDIA : MSG_ABAIXO_MEDIA;
    aviso.textContent = modelo.replace('{pontos}', formatarNumeroMedia(total))
        .replace('{minimo}', String(minimo));
    aviso.classList.toggle('media-situacao--abaixo', total < minimo);
}

/**
 * Inicia a página: confere o login e preenche as notas do aluno logado.
 */
async function iniciarMediaFinal() {
    const tabela = document.querySelector('.media-tabela');
    const aviso = document.getElementById('mediaSituacao');
    if (!tabela || !aviso) return;

    aviso.textContent = MSG_CARREGANDO_MEDIA;
    try {
        const login = await lerLoginMedia();
        if (!login.logado) return void (aviso.textContent = MSG_SEM_LOGIN_MEDIA);
        if (login.ehProfessor) return void (aviso.textContent = MSG_PROFESSOR_MEDIA);

        const caminhos = [...tabela.querySelectorAll('tr[data-pagina]')]
            .map((linha) => caminhoDaPaginaMedia(linha.dataset.pagina));
        const total = preencherLinhasMedia(tabela, await buscarMelhoresNotasMedia(caminhos));
        preencherSomasMedia(tabela, total);
        mostrarSituacaoMedia(aviso, total, Number(tabela.dataset.notaMinima));
    } catch (erro) {
        aviso.textContent = MSG_ERRO_MEDIA + erro.message;
    }
}

iniciarMediaFinal();
