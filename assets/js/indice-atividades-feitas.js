// Coluna "Fez Atividade? (Sim/Não)" em cada card do ATIVIDADES/index.html, com filtro.
// Para o aluno logado: "Sim" se ele já respondeu pelo menos 1 vez (qualquer alternativa gravada
// no banco); "Não" caso contrário. Só JavaScript: lê as tabelas atividade e resposta_atividade
// (o RLS devolve ao aluno apenas as próprias respostas). Professor e visitante não veem a coluna.
// Carregado por assets/js/atividades-crud-modal.js, que já está em todo índice de atividades.
// Depende de: supabase-js e js/supabase.js (obterClienteSupabase, sbGet).

const SELETOR_CARD_FEITAS = 'article.aula';
const SELETOR_LINK_FEITAS = 'a.btn.principal';
const CLASSE_MARCA_FEITAS = 'marca-feita';
const FILTRO_TODAS_FEITAS = 'todas';
const FILTRO_SIM_FEITAS = 'sim';
const FILTRO_NAO_FEITAS = 'nao';
const LIMITE_RESPOSTAS_FEITAS = 5000;

/**
 * Descobre o perfil do usuário logado.
 * @returns {Promise<string|null>} Perfil (ALUNO/PROFESSOR) ou null se não há login.
 */
async function obterPerfilFeitas() {
    const cliente = obterClienteSupabase();
    if (!cliente) return null;

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    return usuario ? (usuario.app_metadata?.perfil || 'ALUNO') : null;
}

/**
 * Converte o href de um link em caminho (pathname) decodificado, se for página HTML.
 * @param {string} href - Valor do atributo href.
 * @returns {string|null} Caminho da página ou null.
 */
function obterCaminhoFeitas(href) {
    if (!href) return null;

    const caminho = decodeURIComponent(new URL(href, location.href).pathname);
    return caminho.toLowerCase().endsWith('.html') ? caminho : null;
}

/**
 * Descobre quais páginas de atividade o aluno já respondeu ao menos uma vez.
 * @param {string[]} paginas - Caminhos das atividades do índice.
 * @returns {Promise<Set<string>>} Caminhos das atividades já respondidas.
 */
async function buscarPaginasFeitas(paginas) {
    if (!paginas.length) return new Set();

    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const atividades = await sbGet('atividade',
        'select=id,pagina&pagina=in.(' + encodeURIComponent(valores) + ')');
    const ids = atividades.map((atividade) => atividade.id);
    if (!ids.length) return new Set();

    const respostas = await sbGet('resposta_atividade',
        'select=atividade_id&atividade_id=in.(' + ids.join(',') + ')&limit=' +
        LIMITE_RESPOSTAS_FEITAS);
    const idsFeitos = new Set(respostas.map((resposta) => resposta.atividade_id));
    return new Set(atividades.filter((atividade) => idsFeitos.has(atividade.id))
        .map((atividade) => atividade.pagina));
}

/**
 * Acrescenta ao card a marca "Fez Atividade? Sim/Não".
 * @param {HTMLElement} card - Card do índice.
 * @param {boolean} fez - Se o aluno já respondeu ao menos 1 vez.
 */
function marcarCardFeitas(card, fez) {
    card.dataset.fez = fez ? FILTRO_SIM_FEITAS : FILTRO_NAO_FEITAS;
    const marca = document.createElement('p');
    marca.className = CLASSE_MARCA_FEITAS + ' ' + CLASSE_MARCA_FEITAS + (fez ? '--sim' : '--nao');
    marca.textContent = 'Fez Atividade? ' + (fez ? '✅ Sim' : '❌ Não');
    const meta = card.querySelector('.meta');
    if (meta) meta.after(marca);
    else card.prepend(marca);
}

/**
 * Mostra só os cards do filtro escolhido (Todas, Sim ou Não).
 * @param {string} valor - Filtro escolhido.
 */
function aplicarFiltroFeitas(valor) {
    document.querySelectorAll(SELETOR_CARD_FEITAS).forEach((card) => {
        card.hidden = valor !== FILTRO_TODAS_FEITAS && card.dataset.fez !== valor;
    });
}

/**
 * Cria a barra de filtro "Fez Atividade?" antes da grade de cards.
 */
function montarFiltroFeitas() {
    const grade = document.querySelector('.grade');
    if (!grade) return;

    const barra = document.createElement('div');
    barra.className = 'filtro-feitas';
    const rotulo = document.createElement('label');
    rotulo.textContent = 'Fez Atividade? ';
    const lista = document.createElement('select');
    [[FILTRO_TODAS_FEITAS, 'Todas'], [FILTRO_SIM_FEITAS, 'Sim'], [FILTRO_NAO_FEITAS, 'Não']]
        .forEach(([valor, texto]) => lista.add(new Option(texto, valor)));
    lista.addEventListener('change', () => aplicarFiltroFeitas(lista.value));
    rotulo.append(lista);
    barra.append(rotulo);
    grade.before(barra);
}

/**
 * Inicia a marcação: só para aluno logado; falhas de rede não quebram o índice.
 */
async function iniciarMarcacaoFeitas() {
    try {
        if (await obterPerfilFeitas() !== 'ALUNO') return;

        const cards = [...document.querySelectorAll(SELETOR_CARD_FEITAS)];
        const caminhos = cards.map((card) =>
            obterCaminhoFeitas(card.querySelector(SELETOR_LINK_FEITAS)?.getAttribute('href')));
        const feitas = await buscarPaginasFeitas([...new Set(caminhos.filter(Boolean))]);
        cards.forEach((card, indice) => marcarCardFeitas(card, feitas.has(caminhos[indice])));
        montarFiltroFeitas();
    } catch (erro) {
        console.warn('Marcação "Fez Atividade?" indisponível:', erro.message);
    }
}

iniciarMarcacaoFeitas();
