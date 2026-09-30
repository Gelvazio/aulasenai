// Bloqueio de atividades no ATIVIDADES/index.html: o professor libera pela tabela `atividade`
// (campo "ativo" do CADASTRAR ATIVIDADES). O RLS só mostra ao aluno as atividades ativas; aqui,
// o card cuja atividade o aluno não consegue ler fica bloqueado e, ao clicar na atividade,
// aparece a mensagem "Atividade Bloqueada!". O professor não tem bloqueio.
// Só age em pastas gerenciadas pelo banco (pelo menos uma atividade da pasta cadastrada e ativa).
// Carregado por assets/js/atividades-crud-modal.js. Depende de supabase-js e js/supabase.js.

const SELETOR_CARD_BLOQUEIO = 'article.aula';
const SELETOR_LINK_BLOQUEIO = 'a.btn.principal';
const CLASSE_CARD_BLOQUEADO = 'bloqueada';
const TEXTO_BOTAO_BLOQUEADO = '🔒 Bloqueada';
const MSG_ATIVIDADE_BLOQUEADA = 'Atividade Bloqueada!';
const PERFIL_PROFESSOR_BLOQUEIO = 'PROFESSOR';
const URL_POPUP_BLOQUEIO = document.currentScript?.src.replace(/[^/]*$/, 'popup.js') || '';

/**
 * Converte o href de um link em caminho (pathname) decodificado, se for página HTML.
 * @param {string} href - Valor do atributo href.
 * @returns {string|null} Caminho da página ou null.
 */
function obterCaminhoBloqueio(href) {
    if (!href) return null;

    const caminho = decodeURIComponent(new URL(href, location.href).pathname);
    return caminho.toLowerCase().endsWith('.html') ? caminho : null;
}

/**
 * Indica se há professor logado (ele vê e abre tudo).
 * @returns {Promise<boolean>} true se o usuário logado é professor.
 */
async function usuarioEhProfessorBloqueio() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    const { data } = await cliente.auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_BLOQUEIO;
}

/**
 * Carrega o popup reutilizável (assets/js/popup.js), se ainda não estiver na página.
 * @returns {Promise<void>} Resolve quando o popup está disponível.
 */
function garantirPopupBloqueio() {
    if (typeof window.mostrarPopup === 'function' || !URL_POPUP_BLOQUEIO) return Promise.resolve();

    return new Promise((resolver) => {
        const script = document.createElement('script');
        script.src = URL_POPUP_BLOQUEIO;
        script.addEventListener('load', resolver);
        script.addEventListener('error', resolver);
        document.head.appendChild(script);
    });
}

/**
 * Busca os caminhos das atividades ativas que o usuário consegue ler no banco.
 * @param {string[]} paginas - Caminhos das atividades do índice.
 * @returns {Promise<Set<string>>} Caminhos cadastrados e ativos.
 */
async function buscarPaginasAtivasBloqueio(paginas) {
    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const linhas = await sbGet('atividade',
        'select=pagina&pagina=in.(' + encodeURIComponent(valores) + ')');
    return new Set(linhas.map((linha) => linha.pagina));
}

/**
 * Mostra o aviso de atividade bloqueada.
 * @param {Event} evento - Clique no link da atividade.
 */
async function avisarBloqueio(evento) {
    evento.preventDefault();
    await garantirPopupBloqueio();
    await mostrarPopup(MSG_ATIVIDADE_BLOQUEADA, { tipo: 'aviso', titulo: 'Bloqueada' });
}

/**
 * Bloqueia o card: visual de bloqueado e aviso ao clicar em qualquer página de atividade.
 * @param {HTMLElement} card - Card do índice.
 */
function bloquearCardAtividade(card) {
    card.classList.add(CLASSE_CARD_BLOQUEADO);
    card.querySelectorAll('a.btn').forEach((link) => {
        if (!obterCaminhoBloqueio(link.getAttribute('href'))) return;

        link.addEventListener('click', avisarBloqueio);
        if (!link.matches(SELETOR_LINK_BLOQUEIO)) return;
        link.classList.remove('principal');
        link.classList.add('off');
        link.textContent = TEXTO_BOTAO_BLOQUEADO;
    });
}

/**
 * Inicia o bloqueio. Falhas de rede não quebram o índice.
 */
async function iniciarBloqueioAtividades() {
    try {
        if (await usuarioEhProfessorBloqueio()) return;

        const cards = [...document.querySelectorAll(SELETOR_CARD_BLOQUEIO)];
        const caminhos = cards.map((card) =>
            obterCaminhoBloqueio(card.querySelector(SELETOR_LINK_BLOQUEIO)?.getAttribute('href')));
        const unicos = [...new Set(caminhos.filter(Boolean))];
        if (!unicos.length) return;

        const ativas = await buscarPaginasAtivasBloqueio(unicos);
        if (!ativas.size) return;

        cards.forEach((card, indice) => {
            if (caminhos[indice] && !ativas.has(caminhos[indice])) bloquearCardAtividade(card);
        });
    } catch (erro) {
        console.warn('Bloqueio de atividades indisponível:', erro.message);
    }
}

iniciarBloqueioAtividades();
