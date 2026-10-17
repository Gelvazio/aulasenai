// Cards das aulas do banco no ATIVIDADES/index.html (tarefa #250): a aula cadastrada no
// "📚 Gerenciar Aulas" aparece como card na hora, mesmo sem página de atividade nesta pasta.
// O indice-aula-data.js chama acrescentarCardsDasAulasDoBanco() depois de achar a aula de cada
// card do HTML; os cards novos entram no mesmo fluxo (✏️ Editar aula, bloqueio da aula e botões
// das atividades vinculadas, #249.1). O link dos slides fica em aulas.conteudo.slides e vira o
// botão "📕 Slides" em qualquer card da aula.
// Depende de: assets/js/indice-aula-repositorio.js (listarAulasDaMateriaCard) e
// assets/js/indice-aula-data.js (descobrirMateriaDoIndice, obterRotuloDaAula, obterNomeDaAula).

const SELETOR_GRADE_CARDS_BANCO = 'section.grade';
const CLASSE_CARD_BANCO = 'aula aula--do-banco';
const ICONE_CARD_BANCO = '📘';
const TEXTO_META_CARD_BANCO = 'Aula cadastrada no banco · as atividades entram pelo ✏️ Editar aula';
const TEXTO_BOTAO_SLIDES_BANCO = '📕 Slides';
const ATRIBUTO_SLIDES_BANCO = 'data-slides-aula';
const AULA_EXCLUIDA_CARDS_BANCO = 1;
const PROTOCOLOS_SLIDES_BANCO = ['http:', 'https:'];

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
 * Põe (ou tira) o botão "📕 Slides" do card conforme aulas.conteudo.slides.
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 */
function desenharBotaoSlidesDoBanco(item) {
    const acoes = item.card.querySelector('.acoes');
    if (!acoes) return;

    acoes.querySelector('[' + ATRIBUTO_SLIDES_BANCO + ']')?.remove();
    const link = item.aula?.conteudo?.slides;
    if (!linkDeSlidesSeguro(link)) return;

    const botao = document.createElement('a');
    botao.className = 'btn';
    botao.href = link.trim();
    botao.target = '_blank';
    botao.rel = 'noopener';
    botao.textContent = TEXTO_BOTAO_SLIDES_BANCO;
    botao.setAttribute(ATRIBUTO_SLIDES_BANCO, '');
    acoes.prepend(botao);
}

/**
 * Monta o card de uma aula que só existe no banco.
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {HTMLElement} Card no mesmo formato dos cards do HTML.
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
    const rotulo = document.createElement('div');
    rotulo.className = 'num';
    rotulo.textContent = obterRotuloDaAula(aula);
    const nome = document.createElement('h2');
    nome.textContent = obterNomeDaAula(aula);
    textos.append(rotulo, nome);
    topo.append(icone, textos);
    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = TEXTO_META_CARD_BANCO;
    const acoes = document.createElement('div');
    acoes.className = 'acoes';
    card.append(topo, meta, acoes);
    return card;
}

/**
 * Coloca o card na grade antes do primeiro card de aula com número maior.
 * @param {HTMLElement} grade - Grade dos cards.
 * @param {HTMLElement} card - Card novo.
 * @param {Object[]} itens - Cards já no índice (com a aula de cada um).
 * @param {number} numero - Número da aula do card novo.
 */
function inserirCardNaOrdem(grade, card, itens, numero) {
    const depois = itens.find((item) => Number(item.aula?.numero) > Number(numero));
    if (depois?.card.parentElement === grade) return grade.insertBefore(card, depois.card);
    grade.append(card);
}

/**
 * Diz se a aula do banco ganha card: não excluída, sem card no índice e, para o aluno, visível.
 * @param {Object} aula - Linha da tabela aulas.
 * @param {Set<number>} comCard - Ids das aulas que já têm card.
 * @param {boolean} ehProfessor - true se o usuário é professor.
 * @returns {boolean} true se precisa de card novo.
 */
function aulaPrecisaDeCard(aula, comCard, ehProfessor) {
    if (aula.excluido === AULA_EXCLUIDA_CARDS_BANCO || comCard.has(aula.id)) return false;
    return ehProfessor || aula.visivel_alunos !== false;
}

/**
 * Acrescenta ao índice (e à lista de itens) os cards das aulas que só existem no banco. Falha de
 * rede não quebra o índice. O botão dos slides é desenhado pelo desenharCardAula de cada card.
 * @param {Object[]} itens - Cards do índice (o array recebe os cards novos).
 * @param {boolean} ehProfessor - true se o usuário é professor.
 * @returns {Promise<void>}
 */
async function acrescentarCardsDasAulasDoBanco(itens, ehProfessor) {
    const grade = document.querySelector(SELETOR_GRADE_CARDS_BANCO);
    try {
        const materia = await descobrirMateriaDoIndice(itens);
        if (!materia || !grade) return;

        const comCard = new Set(itens.map((item) => item.aula?.id).filter(Boolean));
        const aulas = await listarAulasDaMateriaCard(materia);
        aulas.filter((aula) => aulaPrecisaDeCard(aula, comCard, ehProfessor))
            .sort((a, b) => Number(a.numero) - Number(b.numero))
            .forEach((aula) => {
                const card = criarCardDaAulaDoBanco(aula);
                inserirCardNaOrdem(grade, card, itens, aula.numero);
                itens.push({ card, paginas: [], pagina: null, rotuloHtml: '', nomeHtml: '', aula });
            });
    } catch (erro) {
        console.warn('Aulas do banco sem card indisponíveis:', erro.message);
    }
}
