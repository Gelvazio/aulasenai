// Bloqueio de atividades no ATIVIDADES/index.html, POR TURMA: atividade.bloqueio guarda os
// códigos das turmas bloqueadas (fora da lista = liberada) e atividade.ativo = false bloqueia
// para todas. O RLS só mostra ao aluno as atividades liberadas para alguma turma dele; aqui, o
// card cuja atividade o aluno não consegue ler fica bloqueado e, ao clicar na atividade,
// aparece a mensagem "Atividade Bloqueada!". O professor não tem bloqueio.
// Só age em pastas gerenciadas pelo banco (pelo menos uma atividade da pasta cadastrada e ativa).
// Para o professor, cada card ganha o interruptor ON/OFF que vale SÓ para a turma favorita
// (função definir_bloqueio_turma; as outras turmas não mudam), com o nome "Bloquear (turma X)"
// quando está liberada e "Desbloquear (turma X)" quando está bloqueada. Trocar a favorita na
// barra do índice (evento turma-favorita-alterada) remonta os interruptores.
// Carregado por assets/js/atividades-crud-modal.js. Depende de supabase-js e js/supabase.js.

// Cards informativos (sem atividade no banco) usam data-sem-bloqueio e nunca são bloqueados.
const SELETOR_CARD_BLOQUEIO = 'article.aula:not([data-sem-bloqueio])';
const SELETOR_LINK_BLOQUEIO = 'a.btn.principal';
const CLASSE_CARD_BLOQUEADO = 'bloqueada';
const CLASSE_TEMA_BLOQUEADO_PROFESSOR = 'bloqueada-professor';
const TEXTO_BOTAO_BLOQUEADO = '🔒 Bloqueada';
const TEXTO_INTERRUPTOR_BLOQUEAR = 'Bloquear';
const TEXTO_INTERRUPTOR_DESBLOQUEAR = 'Desbloquear';
const MSG_ATIVIDADE_BLOQUEADA = 'Atividade Bloqueada!';
const PERFIL_PROFESSOR_BLOQUEIO = 'PROFESSOR';
const ROTA_DEFINIR_BLOQUEIO_TURMA = '/rest/v1/rpc/definir_bloqueio_turma';
const EVENTO_FAVORITA_ALTERADA = 'turma-favorita-alterada';
const SELETOR_INTERRUPTOR_BLOQUEAR = '.interruptor-bloquear';
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
 * Define o nome do interruptor conforme o estado: bloqueada = "Desbloquear"; liberada =
 * "Bloquear", seguido da turma afetada (a favorita).
 * @param {HTMLSpanElement} texto - Elemento com o nome do interruptor.
 * @param {boolean} bloqueado - true se a atividade está bloqueada.
 * @param {string} turma - Código da turma favorita (vazio = sem favorita).
 */
function atualizarTextoInterruptor(texto, bloqueado, turma) {
    const acao = bloqueado ? TEXTO_INTERRUPTOR_DESBLOQUEAR : TEXTO_INTERRUPTOR_BLOQUEAR;
    texto.textContent = acao + (turma ? ' (turma ' + turma + ')' : ' (sem turma favorita)');
}

/**
 * Cria o interruptor ON/OFF "Bloquear"/"Desbloquear" de um card (ON = bloqueada para a turma).
 * @param {{bloqueado: boolean, turma: string}} estado - Estado inicial e turma favorita.
 * @param {Function} aoMudar - Chamada async com o novo estado; se falhar, o interruptor volta.
 * @returns {HTMLLabelElement} Interruptor pronto.
 */
function criarInterruptorBloquear(estado, aoMudar) {
    const { bloqueado, turma } = estado;
    const etiqueta = document.createElement('label');
    etiqueta.className = 'interruptor-bloquear';
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = bloqueado;
    const chave = document.createElement('span');
    chave.className = 'interruptor-bloquear__chave';
    const texto = document.createElement('span');
    texto.className = 'interruptor-bloquear__texto';
    atualizarTextoInterruptor(texto, bloqueado, turma);
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
        atualizarTextoInterruptor(texto, caixa.checked, turma);
        caixa.disabled = false;
    });
    etiqueta.append(caixa, chave, texto);
    return etiqueta;
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
 * Grava o bloqueio do card (todas as atividades dele) só para a turma favorita e atualiza as
 * linhas em memória. As outras turmas não mudam (o banco cuida delas).
 * @param {Object[]} atividades - Atividades cadastradas do card.
 * @param {string} turma - Turma favorita.
 * @param {boolean} bloquear - true para bloquear.
 * @throws {Error} Sem turma favorita ou se o banco recusar.
 */
async function gravarBloqueioCard(atividades, turma, bloquear) {
    if (!turma) throw new Error(MSG_SEM_FAVORITA_BLOQUEIO);

    for (const atividade of atividades) {
        await gravarBloqueioTurma(atividade.id, turma, bloquear);
        const outras = (atividade.bloqueio || []).filter((codigo) => codigo !== turma);
        atividade.bloqueio = bloquear ? outras.concat(turma) : outras;
        if (!bloquear) atividade.ativo = true;
    }
}

/**
 * Acrescenta ao card o interruptor da turma favorita.
 * @param {HTMLElement} card - Card do índice.
 * @param {Object[]} atividades - Atividades cadastradas do card.
 * @param {string} turma - Turma favorita (vazio = sem favorita).
 */
function montarInterruptorCard(card, atividades, turma) {
    const acoes = card.querySelector('.acoes');
    if (!atividades.length || !acoes) return;

    const bloqueado = atividades.every((atividade) => estaBloqueadaParaTurma(atividade, turma));
    card.classList.toggle(CLASSE_TEMA_BLOQUEADO_PROFESSOR, bloqueado);
    acoes.append(criarInterruptorBloquear({ bloqueado, turma }, async (bloquear) => {
        await gravarBloqueioCard(atividades, turma, bloquear);
        card.classList.toggle(CLASSE_TEMA_BLOQUEADO_PROFESSOR, bloquear);
    }));
}

/**
 * Acrescenta (ou refaz) o interruptor da turma favorita nos cards do índice (perfil professor).
 */
async function montarInterruptoresBloquear() {
    document.querySelectorAll(SELETOR_INTERRUPTOR_BLOQUEAR).forEach((item) => item.remove());
    const cards = [...document.querySelectorAll(SELETOR_CARD_BLOQUEIO)];
    const todas = [...new Set(cards.flatMap(listarPaginasDoCard))];
    if (!todas.length) return;

    const valores = todas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const [linhas, turma] = await Promise.all([
        sbGet('atividade',
            'select=id,pagina,ativo,bloqueio&pagina=in.(' + encodeURIComponent(valores) + ')'),
        buscarFavoritaBloqueio(),
    ]);
    cards.forEach((card) => {
        const paginas = listarPaginasDoCard(card);
        const atividades = linhas.filter((linha) => paginas.includes(linha.pagina));
        montarInterruptorCard(card, atividades, turma);
    });
}

/**
 * Remonta os interruptores quando a turma favorita muda na barra do índice.
 */
function ouvirTrocaFavoritaBloqueio() {
    document.addEventListener(EVENTO_FAVORITA_ALTERADA, () => {
        montarInterruptoresBloquear().catch((erro) =>
            console.warn('Bloqueio de atividades indisponível:', erro.message));
    });
}

/**
 * Inicia o bloqueio. Falhas de rede não quebram o índice.
 */
async function iniciarBloqueioAtividades() {
    try {
        if (await usuarioEhProfessorBloqueio()) {
            ouvirTrocaFavoritaBloqueio();
            return montarInterruptoresBloquear();
        }

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
