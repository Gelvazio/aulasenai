// Atividades vinculadas à aula no banco (atividade.aula_id) aparecem como botão no card da aula do
// ATIVIDADES/index.html (#249.1). Os botões do HTML continuam como estão; aqui só se acrescenta,
// no div.acoes do card, um "📝 <nome>" para cada atividade ativa da aula cuja página ainda não tem
// link no card (comparação pelo caminho decodificado, em href, data-href-bloqueado e
// data-href-aula-bloqueada). Uma só consulta traz as atividades de todos os cards.
// Card dono da aula: se dois cards forem identificados com a mesma aula (ex.: o card "AVALIAÇÃO 02"
// tem o link de uma atividade que agora é da aula 10), só o card cujo nome escrito no HTML é o
// nome da aula (sem diferenciar maiúsculas) recebe os botões; sem nome igual, o de rótulo
// igual ao da aula (ex.: "AULA 10");
// sem rótulo igual, o primeiro card da página.
// Assim o mesmo botão nunca aparece em dois cards. Os botões levam data-vinculo-banco para serem
// removidos e refeitos quando o vínculo muda. Quem chama redesenha o card depois (bloqueio da aula)
// e remonta os ON/OFF das atividades (indice-aula-data.js).
// Depende de: assets/js/indice-aula-repositorio.js, atividades-crud-modal.js (obterCaminhoHtml) e
// indice-aula-data.js (obterRotuloDaAula, obterNomeDaAula e
// normalizarNomeCardAula).

const SELETOR_ACOES_VINCULADAS = '.acoes';
const SELETOR_LINK_ACAO_VINCULADAS = 'a.btn';
const SELETOR_LINKS_CARD_VINCULADAS = 'a';
// ON/OFF, ✏️ e "−" que outros módulos põem logo depois do link de uma atividade.
const SELETOR_CONTROLES_DO_BOTAO_VINCULADAS =
    '.interruptor-atividade, .crud-editar-atividade, .crud-desvincular-atividade';
const ATRIBUTO_VINCULO_BANCO = 'data-vinculo-banco';
const SELETOR_BOTAO_VINCULO_BANCO = 'a[' + ATRIBUTO_VINCULO_BANCO + ']';
const ATRIBUTOS_HREF_CARD_VINCULADAS = ['href', 'data-href-bloqueado', 'data-href-aula-bloqueada'];
const PROTOCOLOS_PERMITIDOS_VINCULADAS = ['http:', 'https:', 'file:'];
const PREFIXO_TEXTO_VINCULADAS = '📝 ';
const ALVO_NOVA_ABA_VINCULADAS = '_blank';
const REL_NOVA_ABA_VINCULADAS = 'noopener';

/**
 * Remove do índice os botões acrescentados por este módulo.
 */
function removerBotoesVinculadosDoBanco() {
    document.querySelectorAll(SELETOR_BOTAO_VINCULO_BANCO).forEach((botao) => {
        let irmao = botao.nextElementSibling;
        while (irmao && irmao.matches(SELETOR_CONTROLES_DO_BOTAO_VINCULADAS)) {
            const proximo = irmao.nextElementSibling;
            irmao.remove();
            irmao = proximo;
        }
        botao.remove();
    });
}

/**
 * Escolhe, entre os cards identificados com a mesma aula, o card dono dela.
 * @param {{rotuloHtml: string, nomeHtml: string, aula: Object}[]} candidatos - Cards da aula.
 * @returns {Object} Card dono: o de nome do HTML igual ao da aula; senão o de rótulo igual;
 *     senão o primeiro.
 */
function escolherCardDonoDaAula(candidatos) {
    const aula = candidatos[0].aula;
    const rotuloDaAula = obterRotuloDaAula(aula);
    const nomeDaAula = normalizarNomeCardAula(obterNomeDaAula(aula));
    return candidatos.find((item) => normalizarNomeCardAula(item.nomeHtml) === nomeDaAula)
        || candidatos.find((item) => item.rotuloHtml === rotuloDaAula)
        || candidatos[0];
}

/**
 * Descobre o card dono de cada aula.
 * @param {{rotuloHtml: string, aula: Object|null}[]} itens - Cards do índice.
 * @returns {Map<number, Object>} Card dono de cada id de aula.
 */
function mapearCardsDonosDasAulas(itens) {
    const porAula = new Map();
    itens.filter((item) => item.aula).forEach((item) => {
        const lista = porAula.get(item.aula.id) || [];
        porAula.set(item.aula.id, [...lista, item]);
    });
    const donos = new Map();
    porAula.forEach((candidatos, idAula) => donos.set(idAula, escolherCardDonoDaAula(candidatos)));
    return donos;
}

/**
 * Caminhos das páginas que o card já tem em algum link (inclusive link desativado pelo bloqueio).
 * @param {HTMLElement} card - Card do índice.
 * @returns {Set<string>} Caminhos das páginas.
 */
function lerCaminhosDoCardVinculadas(card) {
    const caminhos = new Set();
    card.querySelectorAll(SELETOR_LINKS_CARD_VINCULADAS).forEach((link) => {
        ATRIBUTOS_HREF_CARD_VINCULADAS.forEach((atributo) => {
            const caminho = obterCaminhoHtml(link.getAttribute(atributo));
            if (caminho) caminhos.add(caminho);
        });
    });
    return caminhos;
}

/**
 * Confere se a página gravada no banco é um endereço http(s) ou file: da mesma origem.
 * @param {string} pagina - Valor de atividade.pagina.
 * @returns {boolean} true só para página do mesmo site (nunca javascript:, data: ou externa).
 */
function ehPaginaDoMesmoSite(pagina) {
    if (!pagina || pagina.startsWith('//')) return false;

    try {
        const url = new URL(pagina, location.href);
        const temProtocoloPermitido = PROTOCOLOS_PERMITIDOS_VINCULADAS.includes(url.protocol);
        return temProtocoloPermitido && url.origin === location.origin;
    } catch (erro) {
        return false;
    }
}

/**
 * Cria o botão de uma atividade vinculada à aula.
 * @param {{id: number, nome_atividade: string, descricao: string, pagina: string}} atividade
 * @returns {HTMLAnchorElement} Botão pronto.
 */
function criarBotaoAtividadeVinculada(atividade) {
    const botao = document.createElement('a');
    botao.className = 'btn principal';
    botao.href = atividade.pagina;
    botao.target = ALVO_NOVA_ABA_VINCULADAS;
    botao.rel = REL_NOVA_ABA_VINCULADAS;
    botao.setAttribute(ATRIBUTO_VINCULO_BANCO, String(atividade.id));
    botao.textContent = PREFIXO_TEXTO_VINCULADAS +
        (atividade.nome_atividade || atividade.descricao || '');
    return botao;
}

/**
 * Cria os botões das atividades cuja página o card ainda não tem.
 * @param {HTMLElement} card - Card dono da aula.
 * @param {Object[]} atividades - Atividades ativas da aula.
 * @returns {HTMLAnchorElement[]} Botões novos, sem página repetida.
 */
function criarBotoesQueFaltamNoCard(card, atividades) {
    const existentes = lerCaminhosDoCardVinculadas(card);
    const botoes = [];
    atividades.forEach((atividade) => {
        const caminho = obterCaminhoHtml(atividade.pagina);
        const jaTemNoCard = !caminho || existentes.has(caminho);
        if (jaTemNoCard || !ehPaginaDoMesmoSite(atividade.pagina)) return;

        existentes.add(caminho);
        botoes.push(criarBotaoAtividadeVinculada(atividade));
    });
    return botoes;
}

/**
 * Põe os botões no div.acoes, depois do último link e dos controles dele (ON/OFF e ✏️).
 * @param {HTMLElement} card - Card dono da aula.
 * @param {HTMLAnchorElement[]} botoes - Botões novos.
 */
function inserirBotoesNoCard(card, botoes) {
    const acoes = card.querySelector(SELETOR_ACOES_VINCULADAS);
    if (!acoes || !botoes.length) return;

    const links = acoes.querySelectorAll(SELETOR_LINK_ACAO_VINCULADAS);
    let ancora = links[links.length - 1];
    if (!ancora) return acoes.prepend(...botoes);

    while (ancora.nextElementSibling?.matches(SELETOR_CONTROLES_DO_BOTAO_VINCULADAS)) {
        ancora = ancora.nextElementSibling;
    }
    ancora.after(...botoes);
}

/**
 * Refaz os botões das atividades vinculadas nos cards dos donos das aulas.
 * @param {{card: HTMLElement, rotuloHtml: string, aula: Object|null}[]} itens - Cards do índice.
 * @returns {Promise<number>} Quantidade de botões acrescentados.
 */
async function renderizarAtividadesVinculadas(itens) {
    removerBotoesVinculadosDoBanco();
    const donos = mapearCardsDonosDasAulas(itens);
    if (!donos.size) return 0;

    const atividades = await buscarAtividadesDasAulasCard([...donos.keys()]);
    let total = 0;
    donos.forEach((item, idAula) => {
        const daAula = atividades.filter((atividade) => atividade.aula_id === idAula);
        const botoes = criarBotoesQueFaltamNoCard(item.card, daAula);
        inserirBotoesNoCard(item.card, botoes);
        total += botoes.length;
    });
    return total;
}
