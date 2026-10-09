// Bloqueio de atividades no ATIVIDADES/index.html, POR TURMA: atividade.bloqueio guarda os
// códigos das turmas bloqueadas (fora da lista = liberada) e atividade.ativo = false bloqueia
// para todas. O RLS só mostra ao aluno as atividades liberadas para alguma turma dele; aqui, a
// atividade que o aluno não consegue ler fica com cadeado e, ao clicar nela, aparece a mensagem
// "Atividade Bloqueada!" (o card inteiro só trava quando todas as atividades dele estão
// bloqueadas). Só age em pastas gerenciadas pelo banco (pelo menos uma atividade ativa).
// Para o professor, CADA atividade do card ganha, logo depois do link, o botão ON/OFF
// (ON = liberada, OFF = bloqueada) que vale SÓ para a turma favorita (função
// definir_bloqueio_turma; as outras turmas não mudam). Regra global de todas as matérias
// (CLAUDE.md, 2026-10-09). Trocar a favorita na barra do índice (evento
// turma-favorita-alterada) remonta os botões.
// Nas matérias com o bloqueio da AULA ligado (assets/js/indice-bloqueio-aula-config.js), o ON/OFF
// das atividades NUNCA bloqueia o card inteiro: só o botão da aula faz isso
// (assets/js/indice-aula-bloqueio.js).
// Carregado por assets/js/atividades-crud-modal.js. Depende de supabase-js e js/supabase.js.

// Cards informativos (sem atividade no banco) usam data-sem-bloqueio e nunca são bloqueados.
const SELETOR_CARD_BLOQUEIO = 'article.aula:not([data-sem-bloqueio])';
const SELETOR_LINK_BLOQUEIO = 'a.btn.principal';
const SELETOR_LINK_ATIVIDADE_BLOQUEIO = 'a.btn';
const CLASSE_CARD_BLOQUEADO = 'bloqueada';
const CLASSE_TEMA_BLOQUEADO_PROFESSOR = 'bloqueada-professor';
const CLASSE_LINK_BLOQUEADO_PROFESSOR = 'link-bloqueado-professor';
const TEXTO_BOTAO_BLOQUEADO = '🔒 Bloqueada';
const PREFIXO_LINK_BLOQUEADO = '🔒 ';
const TEXTO_INTERRUPTOR_LIGADO = 'Liberada para a turma ';
const TEXTO_INTERRUPTOR_DESLIGADO = 'Bloqueada para a turma ';
const TEXTO_SEM_FAVORITA = '(marque a turma favorita)';
const MSG_ATIVIDADE_BLOQUEADA = 'Atividade Bloqueada!';
const PERFIL_PROFESSOR_BLOQUEIO = 'PROFESSOR';
const ROTA_DEFINIR_BLOQUEIO_TURMA = '/rest/v1/rpc/definir_bloqueio_turma';
const EVENTO_FAVORITA_ALTERADA = 'turma-favorita-alterada';
const SELETOR_INTERRUPTOR_ATIVIDADE = '.interruptor-atividade';
const ATRIBUTO_HREF_GUARDADO = 'data-href-bloqueado';
const MSG_SEM_FAVORITA_BLOQUEIO = 'Marque a turma favorita na barra "Turma" do índice: o ' +
    'bloqueio vale só para a turma favorita.';
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
 * Caminho da página de um link, mesmo quando o href está guardado (link desativado).
 * @param {HTMLAnchorElement} link - Link do card.
 * @returns {string|null} Caminho da página ou null.
 */
function caminhoDoLink(link) {
    return obterCaminhoBloqueio(link.getAttribute('href') ||
        link.getAttribute(ATRIBUTO_HREF_GUARDADO));
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
 * Desativa um link do card bloqueado: tira o href (nem clique, nem nova aba, nem teclado abrem).
 * @param {HTMLAnchorElement} link - Link do card.
 */
function desativarLinkBloqueado(link) {
    link.removeAttribute('href');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
    link.classList.add('off');
    if (!link.matches(SELETOR_LINK_BLOQUEIO)) return;

    link.classList.remove('principal');
    link.textContent = TEXTO_BOTAO_BLOQUEADO;
}

/**
 * Bloqueia o card inteiro: visual de bloqueado, todos os links desativados (atividade, slides,
 * PDFs...) e aviso ao clicar em qualquer parte do card.
 * @param {HTMLElement} card - Card do índice.
 */
function bloquearCardAtividade(card) {
    card.classList.add(CLASSE_CARD_BLOQUEADO);
    card.setAttribute('aria-disabled', 'true');
    card.querySelectorAll('a[href]').forEach(desativarLinkBloqueado);
    card.addEventListener('click', avisarBloqueio, true);
}

/**
 * Aluno: bloqueia só o link de uma atividade (cadeado no nome e aviso ao clicar).
 * @param {HTMLAnchorElement} link - Link da atividade bloqueada.
 */
function bloquearLinkAluno(link) {
    link.removeAttribute('href');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
    link.classList.remove('principal');
    link.classList.add('off');
    link.textContent = PREFIXO_LINK_BLOQUEADO + link.textContent;
    link.addEventListener('click', avisarBloqueio);
}

/**
 * Diz se o card inteiro pode ser bloqueado pelas atividades (não pode nas matérias com o
 * bloqueio da aula ligado: lá, só o botão da aula bloqueia o card).
 * @returns {boolean} true se as atividades podem bloquear o card.
 */
function atividadesBloqueiamCard() {
    return !(typeof bloqueioDeAulaLigado === 'function' && bloqueioDeAulaLigado());
}

/**
 * Aluno: bloqueia as atividades do card que ele não consegue ler; se todas estiverem
 * bloqueadas, o card inteiro fica bloqueado (exceto nas matérias com o bloqueio da aula).
 * @param {HTMLElement} card - Card do índice.
 * @param {Set<string>} ativas - Páginas liberadas para o aluno.
 */
function bloquearLinksAluno(card, ativas) {
    const links = [...card.querySelectorAll(SELETOR_LINK_BLOQUEIO)].filter(caminhoDoLink);
    const bloqueados = links.filter((link) => !ativas.has(caminhoDoLink(link)));
    if (!bloqueados.length) return;

    if (bloqueados.length === links.length && atividadesBloqueiamCard()) {
        bloquearCardAtividade(card);
        return;
    }
    bloqueados.forEach(bloquearLinkAluno);
}

/**
 * Lista os caminhos das páginas de atividade (links .html) de um card.
 * @param {HTMLElement} card - Card do índice.
 * @returns {string[]} Caminhos sem repetição.
 */
function listarPaginasDoCard(card) {
    const caminhos = [...card.querySelectorAll(SELETOR_LINK_ATIVIDADE_BLOQUEIO)].map(caminhoDoLink);
    return [...new Set(caminhos.filter(Boolean))];
}

/**
 * Busca o código da turma favorita (turma.favorito).
 * @returns {Promise<string>} Código da favorita ou vazio.
 */
async function buscarFavoritaBloqueio() {
    const linhas = await sbGet('turma', 'select=codigo&favorito=eq.true');
    return linhas[0]?.codigo || '';
}

/**
 * Diz se a atividade está bloqueada para a turma (ativo = false bloqueia para todas).
 * @param {{ativo: boolean, bloqueio: string[]}} atividade - Linha da atividade.
 * @param {string} turma - Código da turma (vazio = olha só o ativo).
 * @returns {boolean} true se bloqueada para a turma.
 */
function estaBloqueadaParaTurma(atividade, turma) {
    if (!atividade.ativo) return true;
    if (!turma) return false;
    return (atividade.bloqueio || []).includes(turma);
}

/**
 * Bloqueia ou libera uma atividade para uma turma (função definir_bloqueio_turma do banco).
 * @param {number} idAtividade - Id da atividade.
 * @param {string} turma - Código da turma.
 * @param {boolean} bloquear - true para bloquear.
 * @throws {Error} Se o banco recusar.
 */
async function gravarBloqueioTurma(idAtividade, turma, bloquear) {
    const resposta = await fetch(SUPABASE.URL + ROTA_DEFINIR_BLOQUEIO_TURMA, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify({ p_atividade: idAtividade, p_turma: turma, p_bloquear: bloquear }),
    });
    if (resposta.ok) return;

    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.message || 'erro ' + resposta.status);
}

/**
 * Grava o bloqueio de UMA atividade só para a turma favorita e atualiza a linha em memória.
 * @param {Object} atividade - Linha da atividade (id, ativo, bloqueio).
 * @param {string} turma - Turma favorita.
 * @param {boolean} bloquear - true para bloquear.
 * @throws {Error} Sem turma favorita ou se o banco recusar.
 */
async function gravarBloqueioAtividade(atividade, turma, bloquear) {
    if (!turma) throw new Error(MSG_SEM_FAVORITA_BLOQUEIO);

    await gravarBloqueioTurma(atividade.id, turma, bloquear);
    const outras = (atividade.bloqueio || []).filter((codigo) => codigo !== turma);
    atividade.bloqueio = bloquear ? outras.concat(turma) : outras;
    if (!bloquear) atividade.ativo = true;
}

/**
 * Professor: desativa (guardando o href) ou reativa um link.
 * @param {HTMLAnchorElement} link - Link do card.
 * @param {boolean} bloquear - true para desativar.
 */
function definirLinkProfessor(link, bloquear) {
    if (bloquear && link.hasAttribute('href')) {
        link.setAttribute(ATRIBUTO_HREF_GUARDADO, link.getAttribute('href'));
        link.removeAttribute('href');
    }
    if (!bloquear && link.hasAttribute(ATRIBUTO_HREF_GUARDADO)) {
        link.setAttribute('href', link.getAttribute(ATRIBUTO_HREF_GUARDADO));
        link.removeAttribute(ATRIBUTO_HREF_GUARDADO);
    }
    link.toggleAttribute('aria-disabled', bloquear);
    link.classList.toggle(CLASSE_LINK_BLOQUEADO_PROFESSOR, bloquear);
    if (bloquear) link.setAttribute('tabindex', '-1');
    else link.removeAttribute('tabindex');
}

/**
 * Professor: aplica ao card o estado das atividades. Todas bloqueadas = card escurecido com
 * todos os links desativados; senão, só os links das atividades bloqueadas.
 * @param {HTMLElement} card - Card do índice.
 * @param {{link: HTMLAnchorElement, bloqueado: boolean}[]} itens - Atividades do card.
 */
function aplicarEstadoCardProfessor(card, itens) {
    const cardBloqueado = atividadesBloqueiamCard() && itens.every((item) => item.bloqueado);
    card.classList.toggle(CLASSE_TEMA_BLOQUEADO_PROFESSOR, cardBloqueado);
    const links = card.querySelectorAll('a[href], a[' + ATRIBUTO_HREF_GUARDADO + ']');
    links.forEach((link) => definirLinkProfessor(link, cardBloqueado));
    if (cardBloqueado) return;

    itens.forEach((item) => definirLinkProfessor(item.link, item.bloqueado));
}

/**
 * Atualiza o visual e a dica do botão ON/OFF.
 * @param {HTMLLabelElement} etiqueta - Botão da atividade.
 * @param {boolean} liberada - true se a atividade está liberada (ON).
 * @param {string} turma - Turma favorita (vazio = sem favorita).
 */
function atualizarInterruptorAtividade(etiqueta, liberada, turma) {
    const prefixo = liberada ? TEXTO_INTERRUPTOR_LIGADO : TEXTO_INTERRUPTOR_DESLIGADO;
    etiqueta.title = turma ? prefixo + turma : TEXTO_SEM_FAVORITA;
    etiqueta.setAttribute('aria-label', etiqueta.title);
}

/**
 * Cria o botão ON/OFF de uma atividade (ON = liberada; OFF = bloqueada para a turma).
 * @param {boolean} liberada - Estado inicial.
 * @param {string} turma - Turma favorita.
 * @param {Function} aoMudar - Chamada async com "bloquear"; se falhar, o botão volta.
 * @returns {HTMLLabelElement} Botão pronto.
 */
function criarInterruptorAtividade(liberada, turma, aoMudar) {
    const etiqueta = document.createElement('label');
    etiqueta.className = 'interruptor-atividade';
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = liberada;
    const chave = document.createElement('span');
    chave.className = 'interruptor-atividade__chave';
    atualizarInterruptorAtividade(etiqueta, liberada, turma);
    caixa.addEventListener('change', async () => {
        caixa.disabled = true;
        try {
            await aoMudar(!caixa.checked);
        } catch (erro) {
            caixa.checked = !caixa.checked;
            await garantirPopupBloqueio();
            await mostrarPopup('Não foi possível alterar o bloqueio: ' + erro.message,
                { tipo: 'erro' });
        }
        atualizarInterruptorAtividade(etiqueta, caixa.checked, turma);
        caixa.disabled = false;
    });
    etiqueta.append(caixa, chave);
    return etiqueta;
}

/**
 * Põe o botão ON/OFF logo depois de cada atividade cadastrada do card.
 * @param {HTMLElement} card - Card do índice.
 * @param {Object[]} linhas - Atividades do índice (id, pagina, ativo, bloqueio).
 * @param {string} turma - Turma favorita (vazio = sem favorita).
 */
function montarInterruptoresCard(card, linhas, turma) {
    const itens = [...card.querySelectorAll(SELETOR_LINK_ATIVIDADE_BLOQUEIO)]
        .map((link) => {
            const pagina = caminhoDoLink(link);
            return { link, atividade: linhas.find((linha) => linha.pagina === pagina) };
        })
        .filter((item) => item.atividade);
    if (!itens.length) return;

    itens.forEach((item) => {
        item.bloqueado = estaBloqueadaParaTurma(item.atividade, turma);
        item.link.after(criarInterruptorAtividade(!item.bloqueado, turma, async (bloquear) => {
            await gravarBloqueioAtividade(item.atividade, turma, bloquear);
            item.bloqueado = bloquear;
            aplicarEstadoCardProfessor(card, itens);
        }));
    });
    aplicarEstadoCardProfessor(card, itens);
}

/**
 * Acrescenta (ou refaz) os botões ON/OFF das atividades nos cards do índice (perfil professor).
 */
async function montarInterruptoresBloquear() {
    document.querySelectorAll(SELETOR_INTERRUPTOR_ATIVIDADE).forEach((item) => item.remove());
    const cards = [...document.querySelectorAll(SELETOR_CARD_BLOQUEIO)];
    const todas = [...new Set(cards.flatMap(listarPaginasDoCard))];
    if (!todas.length) return;

    const valores = todas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const [linhas, turma] = await Promise.all([
        sbGet('atividade',
            'select=id,pagina,ativo,bloqueio&pagina=in.(' + encodeURIComponent(valores) + ')'),
        buscarFavoritaBloqueio(),
    ]);
    cards.forEach((card) => montarInterruptoresCard(card, linhas, turma));
}

/**
 * Remonta os botões quando a turma favorita muda na barra do índice.
 */
function ouvirTrocaFavoritaBloqueio() {
    document.addEventListener(EVENTO_FAVORITA_ALTERADA, () => {
        montarInterruptoresBloquear().catch((erro) =>
            console.warn('Bloqueio de atividades indisponível:', erro.message));
    });
}

/**
 * Aluno e visitante: bloqueia as atividades que não estão liberadas para ele.
 */
async function aplicarBloqueioAluno() {
    const cards = [...document.querySelectorAll(SELETOR_CARD_BLOQUEIO)];
    const caminhos = cards.flatMap((card) =>
        [...card.querySelectorAll(SELETOR_LINK_BLOQUEIO)].map(caminhoDoLink));
    const unicos = [...new Set(caminhos.filter(Boolean))];
    if (!unicos.length) return;

    const ativas = await buscarPaginasAtivasBloqueio(unicos);
    if (!ativas.size) return;

    cards.forEach((card) => bloquearLinksAluno(card, ativas));
}

/**
 * Inicia o bloqueio. Falhas de rede não quebram o índice.
 */
async function iniciarBloqueioAtividades() {
    try {
        if (await usuarioEhProfessorBloqueio()) {
            ouvirTrocaFavoritaBloqueio();
            await montarInterruptoresBloquear();
            return;
        }
        await aplicarBloqueioAluno();
    } catch (erro) {
        console.warn('Bloqueio de atividades indisponível:', erro.message);
    }
}

iniciarBloqueioAtividades();
