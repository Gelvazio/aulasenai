// Grade de cards do ATIVIDADES/index.html montada SÓ pela tabela aulas (regra 15 do AGENTS.md,
// tarefa #272): um card por registro da matéria, na ordem de aulas.numero (empate: aulas.id).
// Os artigos escritos no HTML nunca viram card nem escolhem, duplicam ou ocultam card: são só a
// fonte dos links de conteúdo de uma aula já cadastrada. O artigo se liga à aula pela atividade
// do link principal (atividade.pagina → atividade.aula_id) ou, se ela não for lida (o aluno não
// lê atividade bloqueada), pelo nome ou rótulo escrito nele. Todos os artigos ligados à mesma
// aula entram no mesmo card, sem link repetido; artigo sem aula da matéria sai da página.
// Link de página de atividade só fica no card se o atividade.aula_id for a aula do card (#273):
// a atividade desvinculada ou ligada a outra aula sai, também na hora em que o vínculo muda.
// Aula excluída (aulas.excluido = 1) não tem card; visivel_alunos = false, só para o professor.
// Banco fora do ar ou matéria não encontrada: mensagem de erro, sem plano B pelos HTMLs. Até a
// grade ficar pronta, os artigos do HTML ficam escondidos (indice-atividades.css).
// O link dos slides fica em aulas.conteudo.slides e vira o botão "📕 Slides" (#250).
// Depende de: indice-aula-repositorio.js (buscarAulasDasPaginasCard, listarAulasDaMateriaCard,
// buscarVinculosDasPaginasCard),
// atividades-crud-modal.js (obterCaminhoHtml, lerHrefCrud) e indice-aula-data.js
// (descobrirMateriaDoIndice, encontrarAulaPelasPaginas, encontrarAulaPeloTextoDoCard,
// obterRotuloDaAula, obterNomeDaAula).

const SELETOR_GRADE_CARDS_BANCO = 'section.grade';
const SELETOR_ACOES_GRADE_BANCO = '.acoes';
const SELETOR_TOPO_GRADE_BANCO = '.topo';
const CLASSE_TEXTOS_TOPO_GRADE_BANCO = 'topo__textos';
const SELETOR_LINK_GRADE_BANCO = 'a';
// Botões que outros módulos põem logo depois do link de uma atividade (ON/OFF, ✏️ e "−").
const SELETOR_CONTROLES_LINK_GRADE_BANCO =
    '.interruptor-atividade, .crud-editar-atividade, .crud-desvincular-atividade';
// "CADASTRAR ATIVIDADES" (atividades-crud-modal.js): um só por card.
const SELETOR_BOTAO_CADASTRAR_GRADE_BANCO = '.crud-botao-card';
const SELETOR_DETALHES_GRADE_BANCO = ':scope > details';
const ATRIBUTO_SOMENTE_PROFESSOR_GRADE = 'data-somente-professor';
// Marcado pelo atividades-crud-modal.js ao carregar: o artigo já vinha com hidden no HTML.
const ATRIBUTO_OCULTO_NO_HTML_GRADE = 'data-oculto-no-html';
const CLASSE_CARD_BANCO = 'aula';
const CLASSE_AVISO_GRADE_BANCO = 'grade-aviso';
const ICONE_CARD_BANCO = '📘';
const TEXTO_BOTAO_SLIDES_BANCO = '📕 Slides';
const ATRIBUTO_SLIDES_BANCO = 'data-slides-aula';
const AULA_EXCLUIDA_CARDS_BANCO = 1;
const PROTOCOLOS_SLIDES_BANCO = ['http:', 'https:'];
const MSG_ERRO_GRADE_BANCO =
    'Não foi possível carregar as aulas do banco de dados. Recarregue a página.';
const MSG_SEM_AULAS_GRADE_BANCO = 'Nenhuma aula cadastrada no banco para esta matéria.';
const MSG_SEM_MATERIA_GRADE_BANCO = 'Matéria do índice não encontrada no banco';

/**
 * Diz se o link dos slides pode virar botão: endereço http(s) ou caminho relativo.
 * @param {string} link - Valor de aulas.conteudo.slides.
 * @returns {boolean} true se o link é seguro.
 */
function linkDeSlidesSeguro(link) {
    if (typeof link !== 'string' || !link.trim()) return false;
    try {
        const endereco = new URL(link.trim(), location.href);
        return PROTOCOLOS_SLIDES_BANCO.includes(endereco.protocol);
    } catch (erro) {
        return false;
    }
}

/**
 * Põe (ou tira) o botão "📕 Slides" do card conforme aulas.conteudo.slides: em cima, à direita
 * do "AULA NN" (no topo do card, #274).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 */
function desenharBotaoSlidesDoBanco(item) {
    const topo = item.card.querySelector(SELETOR_TOPO_GRADE_BANCO);
    if (!topo) return;

    item.card.querySelector('[' + ATRIBUTO_SLIDES_BANCO + ']')?.remove();
    const link = item.aula?.conteudo?.slides;
    if (!linkDeSlidesSeguro(link)) return;

    const botao = document.createElement('a');
    botao.className = 'btn';
    botao.href = link.trim();
    botao.target = '_blank';
    botao.rel = 'noopener';
    botao.textContent = TEXTO_BOTAO_SLIDES_BANCO;
    botao.setAttribute(ATRIBUTO_SLIDES_BANCO, '');
    topo.append(botao);
}

/**
 * Monta o card de uma aula da tabela aulas.
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {HTMLElement} Card (article.aula com data-aula-id).
 */
function criarCardDaAulaDoBanco(aula) {
    const card = document.createElement('article');
    card.className = CLASSE_CARD_BANCO;
    card.dataset.aulaId = String(aula.id);
    const topo = document.createElement('div');
    topo.className = 'topo';
    const icone = document.createElement('span');
    icone.className = 'icone';
    icone.textContent = ICONE_CARD_BANCO;
    const textos = document.createElement('div');
    textos.className = CLASSE_TEXTOS_TOPO_GRADE_BANCO;
    const rotulo = document.createElement('div');
    rotulo.className = 'num';
    rotulo.textContent = obterRotuloDaAula(aula);
    const nome = document.createElement('h2');
    nome.textContent = obterNomeDaAula(aula);
    textos.append(rotulo, nome);
    topo.append(icone, textos);
    const acoes = document.createElement('div');
    acoes.className = 'acoes';
    card.append(topo, acoes);
    return card;
}

/**
 * Diz se a aula ganha card: não excluída e, para o aluno, visível.
 * @param {Object} aula - Linha da tabela aulas.
 * @param {boolean} ehProfessor - true se o usuário é professor.
 * @returns {boolean} true se a aula aparece na grade.
 */
function aulaTemCardNaGrade(aula, ehProfessor) {
    if (aula.excluido === AULA_EXCLUIDA_CARDS_BANCO) return false;
    return ehProfessor || aula.visivel_alunos !== false;
}

/**
 * Ordena as aulas por aulas.numero crescente; empate (ou sem número) por aulas.id.
 * @param {Object[]} aulas - Aulas da matéria.
 * @returns {Object[]} Nova lista ordenada.
 */
function ordenarAulasDaGrade(aulas) {
    const numero = (aula) => {
        const valor = Number(aula.numero);
        return Number.isFinite(valor) ? valor : Infinity;
    };
    return [...aulas].sort((a, b) => numero(a) - numero(b) || a.id - b.id);
}

/**
 * Diz se o conteúdo do artigo pode entrar no card: o "só professor" só para o professor; o
 * artigo escondido no HTML (hidden, pedido do professor) não entra.
 * @param {HTMLElement} artigo - Artigo do HTML.
 * @param {boolean} ehProfessor - true se o usuário é professor.
 * @returns {boolean} true se os links do artigo podem ir para o card.
 */
function artigoPodeDarConteudo(artigo, ehProfessor) {
    if (artigo.hasAttribute(ATRIBUTO_SOMENTE_PROFESSOR_GRADE)) return ehProfessor;
    return !artigo.hasAttribute(ATRIBUTO_OCULTO_NO_HTML_GRADE);
}

/**
 * Chave de um link para não repetir no card: a página .html (também a do link desativado pelo
 * bloqueio) ou, para outros arquivos (.md, .pdf), o href.
 * @param {HTMLAnchorElement} link - Link do card.
 * @returns {string|null} Chave do link ou null sem endereço.
 */
function chaveDoLinkGrade(link) {
    return obterCaminhoHtml(lerHrefCrud(link)) || link.getAttribute('href') || null;
}

/**
 * Chaves dos links que o card já tem.
 * @param {HTMLElement} card - Card da aula.
 * @returns {Set<string>} Chaves dos links.
 */
function lerCaminhosDoCardGrade(card) {
    const links = [...card.querySelectorAll(SELETOR_LINK_GRADE_BANCO)];
    return new Set(links.map(chaveDoLinkGrade).filter(Boolean));
}

/**
 * Diz se o link é de uma atividade cadastrada que, no banco, não é desta aula (aula_id de outra
 * aula ou vazio, #273): a atividade só aparece no card pelo aula_id.
 * @param {string} caminho - Chave do link (chaveDoLinkGrade).
 * @param {{aulaId: number, vinculos: Map<string, number|null>}} estado
 * @returns {boolean} true se o link é de atividade de outra aula.
 */
function linkDeAtividadeDeOutraAula(caminho, estado) {
    return estado.vinculos.has(caminho) && estado.vinculos.get(caminho) !== estado.aulaId;
}

/**
 * Diz se o elemento do div.acoes do artigo deve ficar fora do card: link de página que o card já
 * tem, link de atividade de outra aula (e os controles deles) ou um segundo "CADASTRAR ATIVIDADES".
 * @param {HTMLElement} elemento - Filho do div.acoes do artigo.
 * @param {{acoes: HTMLElement, caminhos: Set<string>, pulandoLink: boolean, aulaId: number,
 *     vinculos: Map<string, number|null>}} estado
 * @returns {boolean} true se o elemento não vai para o card.
 */
function elementoForaDoCard(elemento, estado) {
    if (elemento.matches(SELETOR_CONTROLES_LINK_GRADE_BANCO)) return estado.pulandoLink;
    estado.pulandoLink = false;
    if (elemento.matches(SELETOR_BOTAO_CADASTRAR_GRADE_BANCO)) {
        return Boolean(estado.acoes.querySelector(SELETOR_BOTAO_CADASTRAR_GRADE_BANCO));
    }
    if (!elemento.matches(SELETOR_LINK_GRADE_BANCO)) return false;

    const caminho = chaveDoLinkGrade(elemento);
    if (!caminho) return false;
    estado.pulandoLink = estado.caminhos.has(caminho) ||
        linkDeAtividadeDeOutraAula(caminho, estado);
    estado.caminhos.add(caminho);
    return estado.pulandoLink;
}

/**
 * Leva para o card os links do artigo (sem página repetida nem atividade de outra aula) e os
 * detalhes (details). Os elementos são movidos, não copiados: o estado e os eventos postos por
 * outros módulos (bloqueio, ✏️, ID) continuam valendo.
 * @param {HTMLElement} artigo - Artigo do HTML ligado à aula.
 * @param {{card: HTMLElement, aula: Object}} destino - Card e aula.
 * @param {Map<string, number|null>} vinculos - aula_id de cada página de atividade.
 */
function moverConteudoDoArtigo(artigo, destino, vinculos) {
    const acoes = destino.card.querySelector(SELETOR_ACOES_GRADE_BANCO);
    const origem = artigo.querySelector(SELETOR_ACOES_GRADE_BANCO);
    if (acoes && origem) {
        const estado = { acoes, caminhos: lerCaminhosDoCardGrade(destino.card),
            pulandoLink: false, aulaId: destino.aula.id, vinculos };
        [...origem.children].forEach((elemento) => {
            if (!elementoForaDoCard(elemento, estado)) acoes.append(elemento);
        });
    }
    destino.card.append(...artigo.querySelectorAll(SELETOR_DETALHES_GRADE_BANCO));
}

/**
 * Remove o link e os controles que vêm logo depois dele (ON/OFF, ✏️ e "−").
 * @param {HTMLAnchorElement} link - Link do card.
 */
function removerLinkComControles(link) {
    let irmao = link.nextElementSibling;
    while (irmao?.matches(SELETOR_CONTROLES_LINK_GRADE_BANCO)) {
        const proximo = irmao.nextElementSibling;
        irmao.remove();
        irmao = proximo;
    }
    link.remove();
}

/**
 * Caminhos de todas as páginas .html dos links dos elementos (para ler o aula_id delas).
 * @param {HTMLElement[]} elementos - Artigos do HTML ou cards.
 * @returns {string[]} Caminhos sem repetição.
 */
function lerPaginasDosLinks(elementos) {
    const links = elementos.flatMap((elemento) =>
        [...elemento.querySelectorAll(SELETOR_LINK_GRADE_BANCO)]);
    const caminhos = links.map((link) => obterCaminhoHtml(lerHrefCrud(link)));
    return [...new Set(caminhos.filter(Boolean))];
}

/**
 * Depois de o vínculo mudar no banco ("−", ✏️ Editar ou 🔗 Gerenciar atividades, #273), tira de
 * cada card os links de atividades que não são mais da aula dele. Quem chama refaz depois os
 * botões das atividades vinculadas (que põem a atividade no card da aula nova).
 * @param {{card: HTMLElement, aula: Object}[]} itens - Cards da grade.
 * @returns {Promise<void>}
 * @throws {Error} Se a consulta ao banco falhar.
 */
async function retirarAtividadesDeOutraAulaDosCards(itens) {
    const vinculos = await buscarVinculosDasPaginasCard(
        lerPaginasDosLinks(itens.map((item) => item.card)));
    itens.forEach((item) => {
        const estado = { aulaId: item.aula.id, vinculos };
        [...item.card.querySelectorAll(SELETOR_ACOES_GRADE_BANCO + ' ' + SELETOR_LINK_GRADE_BANCO)]
            .filter((link) => linkDeAtividadeDeOutraAula(chaveDoLinkGrade(link), estado))
            .forEach(removerLinkComControles);
    });
}

/**
 * Liga cada artigo do HTML a uma aula da lista do banco: pela atividade do link principal e,
 * se ela não foi lida, pelo nome ou rótulo escrito no artigo.
 * @param {Object[]} artigos - Itens { card, paginas, rotuloHtml, nomeHtml, aula } do HTML.
 * @param {Map<string, Object>} aulasDasPaginas - Aula de cada página lida.
 * @param {Object[]} aulas - Aulas da matéria.
 */
function ligarArtigosAsAulas(artigos, aulasDasPaginas, aulas) {
    const porId = new Map(aulas.map((aula) => [aula.id, aula]));
    artigos.forEach((artigo) => {
        const daPagina = encontrarAulaPelasPaginas(artigo, aulasDasPaginas);
        artigo.aula = (daPagina && porId.get(daPagina.id)) ||
            encontrarAulaPeloTextoDoCard(artigo, aulas);
    });
}

/**
 * Cria os cards das aulas (um por registro) e põe neles o conteúdo dos artigos de cada aula.
 * @param {{aulas: Object[], artigos: Object[], vinculos: Map<string, number|null>,
 *     ehProfessor: boolean}} dados
 * @returns {Object[]} Itens { card, paginas, pagina, rotuloHtml, nomeHtml, aula }, na ordem.
 */
function criarCardsDaGrade({ aulas, artigos, vinculos, ehProfessor }) {
    const visiveis = ordenarAulasDaGrade(aulas)
        .filter((aula) => aulaTemCardNaGrade(aula, ehProfessor));
    return visiveis.map((aula) => {
        const card = criarCardDaAulaDoBanco(aula);
        artigos.filter((artigo) => artigo.aula?.id === aula.id)
            .filter((artigo) => artigoPodeDarConteudo(artigo.card, ehProfessor))
            .forEach((artigo) => moverConteudoDoArtigo(artigo.card, { card, aula }, vinculos));
        const paginas = lerPaginasPrincipaisDoCard(card);
        return { card, paginas, pagina: paginas[0] || null, rotuloHtml: '', nomeHtml: '', aula };
    });
}

/**
 * Mostra um aviso no lugar dos cards (erro do banco ou matéria sem aulas).
 * @param {HTMLElement} grade - Grade dos cards.
 * @param {string} texto - Mensagem.
 */
function mostrarAvisoDaGrade(grade, texto) {
    const aviso = document.createElement('p');
    aviso.className = CLASSE_AVISO_GRADE_BANCO;
    aviso.textContent = texto;
    grade.append(aviso);
}

/**
 * Lê no banco a matéria, as aulas dela, a aula das páginas dos artigos e o aula_id de cada
 * página de atividade dos links.
 * @param {Object[]} artigos - Itens dos artigos do HTML.
 * @returns {Promise<{aulas: Object[], aulasDasPaginas: Map<string, Object>,
 *     vinculos: Map<string, number|null>}>} Dados do banco.
 * @throws {Error} Se a matéria não for encontrada ou a consulta falhar.
 */
async function lerAulasDaGrade(artigos) {
    const paginas = [...new Set(artigos.flatMap((artigo) => artigo.paginas))];
    const [aulasDasPaginas, vinculos] = await Promise.all([
        paginas.length ? buscarAulasDasPaginasCard(paginas) : new Map(),
        buscarVinculosDasPaginasCard(lerPaginasDosLinks(artigos.map((artigo) => artigo.card))),
    ]);
    artigos.forEach((artigo) => {
        artigo.aula = encontrarAulaPelasPaginas(artigo, aulasDasPaginas);
    });
    const materia = await descobrirMateriaDoIndice(artigos);
    if (!materia) throw new Error(MSG_SEM_MATERIA_GRADE_BANCO);

    const aulas = await listarAulasDaMateriaCard(materia);
    return { aulas, aulasDasPaginas, vinculos };
}

/**
 * Troca os artigos do HTML pelos cards das aulas do banco. Com erro, a grade fica só com a
 * mensagem (sem plano B pelos HTMLs).
 * @param {Object[]} artigos - Itens dos artigos do HTML (lerCardsDoIndice).
 * @param {boolean} ehProfessor - true se o usuário é professor.
 * @returns {Promise<Object[]>} Itens dos cards montados (vazio com erro ou sem aulas).
 */
async function montarGradeSoDoBanco(artigos, ehProfessor) {
    const grade = document.querySelector(SELETOR_GRADE_CARDS_BANCO);
    if (!grade) return [];

    let itens = [];
    let aviso = MSG_SEM_AULAS_GRADE_BANCO;
    try {
        const { aulas, aulasDasPaginas, vinculos } = await lerAulasDaGrade(artigos);
        ligarArtigosAsAulas(artigos, aulasDasPaginas, aulas);
        itens = criarCardsDaGrade({ aulas, artigos, vinculos, ehProfessor });
    } catch (erro) {
        console.warn('Aulas do banco indisponíveis:', erro.message);
        aviso = MSG_ERRO_GRADE_BANCO;
    }
    artigos.forEach((artigo) => artigo.card.remove());
    grade.append(...itens.map((item) => item.card));
    if (!itens.length) mostrarAvisoDaGrade(grade, aviso);
    return itens;
}
