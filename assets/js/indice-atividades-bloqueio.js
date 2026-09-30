// Bloqueio de atividades no ATIVIDADES/index.html: o professor libera pela tabela `atividade`
// (campo "ativo" do CADASTRAR ATIVIDADES). O RLS só mostra ao aluno as atividades ativas; aqui,
// o card cuja atividade o aluno não consegue ler fica bloqueado e, ao clicar na atividade,
// aparece a mensagem "Atividade Bloqueada!". O professor não tem bloqueio.
// Só age em pastas gerenciadas pelo banco (pelo menos uma atividade da pasta cadastrada e ativa).
// Para o professor, cada card ganha o interruptor ON/OFF (grava atividade.ativo), com o nome
// "Bloquear" quando a atividade está liberada e "Desbloquear" quando está bloqueada.
// Carregado por assets/js/atividades-crud-modal.js. Depende de supabase-js e js/supabase.js.

const SELETOR_CARD_BLOQUEIO = 'article.aula';
const SELETOR_LINK_BLOQUEIO = 'a.btn.principal';
const CLASSE_CARD_BLOQUEADO = 'bloqueada';
const CLASSE_TEMA_BLOQUEADO_PROFESSOR = 'bloqueada-professor';
const TEXTO_BOTAO_BLOQUEADO = '🔒 Bloqueada';
const TEXTO_INTERRUPTOR_BLOQUEAR = 'Bloquear';
const TEXTO_INTERRUPTOR_DESBLOQUEAR = 'Desbloquear';
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
 * Lista os caminhos das páginas de atividade (links .html) de um card.
 * @param {HTMLElement} card - Card do índice.
 * @returns {string[]} Caminhos sem repetição.
 */
function listarPaginasDoCard(card) {
    const caminhos = [...card.querySelectorAll('a.btn')]
        .map((link) => obterCaminhoBloqueio(link.getAttribute('href')));
    return [...new Set(caminhos.filter(Boolean))];
}

/**
 * Define o nome do interruptor conforme o estado: bloqueada = "Desbloquear"; liberada = "Bloquear".
 * @param {HTMLSpanElement} texto - Elemento com o nome do interruptor.
 * @param {boolean} bloqueado - true se a atividade está bloqueada.
 */
function atualizarTextoInterruptor(texto, bloqueado) {
    texto.textContent = bloqueado ? TEXTO_INTERRUPTOR_DESBLOQUEAR : TEXTO_INTERRUPTOR_BLOQUEAR;
}

/**
 * Cria o interruptor ON/OFF "Bloquear"/"Desbloquear" de um card (ON = bloqueada para os alunos).
 * @param {boolean} bloqueado - Estado inicial.
 * @param {Function} aoMudar - Chamada async com o novo estado; se falhar, o interruptor volta.
 * @returns {HTMLLabelElement} Interruptor pronto.
 */
function criarInterruptorBloquear(bloqueado, aoMudar) {
    const etiqueta = document.createElement('label');
    etiqueta.className = 'interruptor-bloquear';
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = bloqueado;
    const chave = document.createElement('span');
    chave.className = 'interruptor-bloquear__chave';
    const texto = document.createElement('span');
    texto.className = 'interruptor-bloquear__texto';
    atualizarTextoInterruptor(texto, bloqueado);
    caixa.addEventListener('change', async () => {
        caixa.disabled = true;
        try {
            await aoMudar(caixa.checked);
        } catch (erro) {
            caixa.checked = !caixa.checked;
            await garantirPopupBloqueio();
            await mostrarPopup('Não foi possível alterar o bloqueio: ' + erro.message,
                { tipo: 'erro' });
        }
        atualizarTextoInterruptor(texto, caixa.checked);
        caixa.disabled = false;
    });
    etiqueta.append(caixa, chave, texto);
    return etiqueta;
}

/**
 * Grava no banco o bloqueio (ativo = não bloqueado) de todas as atividades do card.
 * @param {{id: number}[]} atividades - Atividades cadastradas do card.
 * @param {boolean} bloquear - true para bloquear.
 */
async function gravarBloqueioCard(atividades, bloquear) {
    for (const atividade of atividades) {
        await sbPatch('atividade', 'id', atividade.id, { ativo: !bloquear });
    }
}

/**
 * Acrescenta o interruptor "Bloquear" aos cards do índice (perfil professor).
 */
async function montarInterruptoresBloquear() {
    const cards = [...document.querySelectorAll(SELETOR_CARD_BLOQUEIO)];
    const todas = [...new Set(cards.flatMap(listarPaginasDoCard))];
    if (!todas.length) return;

    const valores = todas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const linhas = await sbGet('atividade',
        'select=id,pagina,ativo&pagina=in.(' + encodeURIComponent(valores) + ')');
    cards.forEach((card) => {
        const paginas = listarPaginasDoCard(card);
        const atividades = linhas.filter((linha) => paginas.includes(linha.pagina));
        const acoes = card.querySelector('.acoes');
        if (!atividades.length || !acoes) return;

        const bloqueado = atividades.every((atividade) => !atividade.ativo);
        card.classList.toggle(CLASSE_TEMA_BLOQUEADO_PROFESSOR, bloqueado);
        acoes.append(criarInterruptorBloquear(bloqueado, async (bloquear) => {
            await gravarBloqueioCard(atividades, bloquear);
            atividades.forEach((atividade) => { atividade.ativo = !bloquear; });
            card.classList.toggle(CLASSE_TEMA_BLOQUEADO_PROFESSOR, bloquear);
        }));
    });
}

/**
 * Inicia o bloqueio. Falhas de rede não quebram o índice.
 */
async function iniciarBloqueioAtividades() {
    try {
        if (await usuarioEhProfessorBloqueio()) return montarInterruptoresBloquear();

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
