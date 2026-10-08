/**
 * Apostila de qualquer matéria (gerada por assets/gerador-apostilas/gerar_apostila.py).
 * Divide o conteúdo de cada bloco ".fonte-paginas" em páginas do tamanho de uma folha A4 no tema
 * SESI SENAI, numera as páginas, preenche o sumário e cuida das exportações em PDF
 * (apostila completa ou só os exercícios de um capítulo).
 */

const SELETOR_FONTES = '.fonte-paginas';
const SELETOR_PAGINAS = '.pagina-a4';
const SELETOR_NUMEROS_SUMARIO = '.sumario__pagina[data-alvo]';
const ATRIBUTO_EXERCICIOS = 'data-exportar-exercicios';
const ID_BOTAO_PDF = 'botao-exportar-pdf';
const CLASSE_IMPRIMINDO_PARTE = 'imprimindo-parte';
const CLASSE_PAGINA_IMPRIMIR = 'pagina--imprimir';
const PARTE_EXERCICIOS = 'exercicios';
// Paginação do PDF (todas as apostilas): "Página N de T" no rodapé de cada folha.
const MODELO_PAGINACAO = 'Página {numero} de {total}';
const TAGS_DIVISIVEIS = ['TABLE', 'UL', 'OL'];
const TAGS_TITULO = ['H2', 'H3', 'H4'];
const TOLERANCIA_PIXELS = 1;
// Marca o fim da paginação: só então o CSS de celular mostra as páginas em modo leitura
// (antes disso as páginas precisam ter o tamanho A4 para a divisão sair igual ao PDF).
const CLASSE_APOSTILA_PAGINADA = 'apostila--paginada';

/**
 * Cria uma página A4 vazia com logo, área de conteúdo e rodapé.
 * @param {HTMLElement} fonte - Bloco de origem (dá a parte e o capítulo da página).
 * @returns {HTMLElement} Página criada.
 */
function criarPagina(fonte) {
  const pagina = document.createElement('section');
  pagina.className = 'pagina-senai pagina-a4';
  pagina.dataset.parte = fonte.dataset.parte || '';
  pagina.dataset.capitulo = fonte.dataset.capitulo || '';

  const logo = document.createElement('img');
  logo.className = 'pagina-senai__logo';
  logo.src = document.body.dataset.logo;
  logo.alt = 'SESI SENAI';

  const conteudo = document.createElement('div');
  conteudo.className = 'pagina-senai__conteudo';
  const rodape = document.createElement('footer');
  rodape.className = 'pagina-senai__rodape';
  pagina.append(logo, conteudo, rodape);
  return pagina;
}

/**
 * Informa se o conteúdo ainda cabe na área útil da página.
 * @param {HTMLElement} conteudo - Área de conteúdo da página.
 * @returns {boolean} true se não transbordou.
 */
function cabeNaPagina(conteudo) {
  return conteudo.scrollHeight <= conteudo.clientHeight + TOLERANCIA_PIXELS;
}

/**
 * Informa se o elemento é um título (que não deve ficar sozinho no fim da página).
 * @param {Element|null} elemento - Elemento a verificar.
 * @returns {boolean} true se for título.
 */
function ehTitulo(elemento) {
  if (!elemento) return false;
  return TAGS_TITULO.includes(elemento.tagName) || elemento.dataset.titulo === 'sim';
}

/**
 * Abre uma nova página depois da atual, levando junto um título que ficaria sozinho no fim.
 * @param {{pagina: HTMLElement, conteudo: HTMLElement, fonte: HTMLElement}} estado - Estado.
 * @returns {void}
 */
function abrirNovaPagina(estado) {
  const anterior = estado.conteudo;
  const pagina = criarPagina(estado.fonte);
  estado.pagina.after(pagina);
  estado.pagina = pagina;
  estado.conteudo = pagina.querySelector('.pagina-senai__conteudo');

  const ultimo = anterior.lastElementChild;
  const deveLevarTitulo = ehTitulo(ultimo) && anterior.children.length > 1;
  if (deveLevarTitulo) estado.conteudo.append(ultimo);
}

/**
 * Cria uma cópia vazia de tabela/lista para receber parte das linhas ou itens.
 * @param {HTMLElement} bloco - Tabela ou lista original.
 * @param {number} inicio - Número do primeiro item (listas numeradas).
 * @returns {HTMLElement} Cópia vazia.
 */
function clonarVazio(bloco, inicio) {
  const copia = bloco.cloneNode(true);
  const recipiente = recipienteDe(copia);
  recipiente.replaceChildren();
  if (copia.tagName === 'OL') copia.start = inicio;
  return copia;
}

/**
 * Devolve onde ficam os itens do bloco (tbody da tabela ou a própria lista).
 * @param {HTMLElement} bloco - Tabela ou lista.
 * @returns {HTMLElement} Recipiente dos itens.
 */
function recipienteDe(bloco) {
  if (bloco.tagName === 'TABLE') return bloco.tBodies[0] || bloco;
  return bloco;
}

/**
 * Distribui as linhas de uma tabela (ou itens de uma lista) por quantas páginas forem precisas.
 * @param {Object} estado - Estado da paginação.
 * @param {HTMLElement} bloco - Tabela ou lista grande demais para o espaço restante.
 * @returns {void}
 */
function dividirBloco(estado, bloco) {
  const itens = Array.from(recipienteDe(bloco).children);
  const inicioOriginal = bloco.tagName === 'OL' ? bloco.start : 1;
  let parte = clonarVazio(bloco, inicioOriginal);
  estado.conteudo.append(parte);

  itens.forEach((item, indice) => {
    recipienteDe(parte).append(item);
    if (cabeNaPagina(estado.conteudo)) return;

    item.remove();
    const parteVazia = recipienteDe(parte).children.length === 0;
    if (parteVazia) parte.remove();
    abrirNovaPagina(estado);
    parte = clonarVazio(bloco, inicioOriginal + indice);
    estado.conteudo.append(parte);
    recipienteDe(parte).append(item);
  });
}

/**
 * Coloca um bloco na página atual ou na seguinte, dividindo tabelas e listas grandes.
 * @param {Object} estado - Estado da paginação.
 * @param {HTMLElement} bloco - Bloco a posicionar.
 * @returns {void}
 */
function colocarBloco(estado, bloco) {
  const paginaVazia = () => estado.conteudo.children.length === 0;
  const pedeNovaPagina = bloco.dataset.novaPagina === 'sim' && !paginaVazia();
  if (pedeNovaPagina) abrirNovaPagina(estado);

  estado.conteudo.append(bloco);
  if (cabeNaPagina(estado.conteudo)) return;

  bloco.remove();
  if (TAGS_DIVISIVEIS.includes(bloco.tagName)) {
    dividirBloco(estado, bloco);
    return;
  }
  if (!paginaVazia()) abrirNovaPagina(estado);
  estado.conteudo.append(bloco);
}

/**
 * Transforma um bloco ".fonte-paginas" em uma ou mais páginas A4.
 * @param {HTMLElement} fonte - Bloco com o conteúdo corrido.
 * @returns {void}
 */
function paginarFonte(fonte) {
  const pagina = criarPagina(fonte);
  fonte.before(pagina);
  const estado = { fonte, pagina, conteudo: pagina.querySelector('.pagina-senai__conteudo') };
  Array.from(fonte.children).forEach((bloco) => colocarBloco(estado, bloco));
  fonte.remove();
}

/**
 * Monta o texto da paginação ("Página N de T").
 * @param {number} numero - Número da página.
 * @param {number} total - Total de páginas.
 * @returns {string} Texto da paginação.
 */
function textoPaginacao(numero, total) {
  return MODELO_PAGINACAO.replace('{numero}', String(numero)).replace('{total}', String(total));
}

/**
 * Escreve o rodapé de uma página: nome da apostila e paginação.
 * @param {HTMLElement} pagina - Página A4.
 * @param {string} paginacao - Texto "Página N de T".
 * @returns {void}
 */
function escreverRodape(pagina, paginacao) {
  const rodape = pagina.querySelector('.pagina-senai__rodape');
  if (!rodape) return;
  const nome = document.createElement('span');
  nome.textContent = document.body.dataset.rodape || '';
  const numeroPagina = document.createElement('span');
  numeroPagina.textContent = paginacao;
  rodape.replaceChildren(nome, numeroPagina);
}

/**
 * Numera todas as páginas ("Página N de T") e guarda o número para o sumário.
 * @returns {void}
 */
function numerarPaginas() {
  const paginas = document.querySelectorAll(SELETOR_PAGINAS);
  paginas.forEach((pagina, indice) => {
    pagina.dataset.numero = String(indice + 1);
    escreverRodape(pagina, textoPaginacao(indice + 1, paginas.length));
  });
}

/**
 * Numera só as páginas da exportação parcial (ex.: exercícios: "Página 1 de 2").
 * @param {NodeListOf<HTMLElement>} paginas - Páginas que vão para o PDF.
 * @returns {void}
 */
function numerarPaginasExportadas(paginas) {
  paginas.forEach((pagina, indice) => {
    escreverRodape(pagina, textoPaginacao(indice + 1, paginas.length));
  });
}

/**
 * Escreve no sumário o número da página de cada item.
 * @returns {void}
 */
function preencherSumario() {
  document.querySelectorAll(SELETOR_NUMEROS_SUMARIO).forEach((campo) => {
    const alvo = document.getElementById(campo.dataset.alvo);
    const pagina = alvo ? alvo.closest(SELETOR_PAGINAS) : null;
    campo.textContent = pagina ? pagina.dataset.numero : '';
  });
}

/**
 * Desfaz a marcação de impressão parcial e volta a paginação da apostila inteira.
 * @returns {void}
 */
function limparImpressaoParcial() {
  document.body.classList.remove(CLASSE_IMPRIMINDO_PARTE);
  document.querySelectorAll(`.${CLASSE_PAGINA_IMPRIMIR}`)
    .forEach((pagina) => pagina.classList.remove(CLASSE_PAGINA_IMPRIMIR));
  numerarPaginas();
}

/**
 * Abre a impressão da apostila completa ("Salvar como PDF").
 * @returns {void}
 */
function exportarApostilaPDF() {
  limparImpressaoParcial();
  window.print();
}

/**
 * Abre a impressão só com as páginas de exercícios de um capítulo.
 * @param {string} idCapitulo - id do capítulo (ex.: "capitulo-01").
 * @returns {void}
 */
function exportarExerciciosPDF(idCapitulo) {
  limparImpressaoParcial();
  const seletor = `${SELETOR_PAGINAS}[data-capitulo="${idCapitulo}"]`
    + `[data-parte="${PARTE_EXERCICIOS}"]`;
  const paginas = document.querySelectorAll(seletor);
  paginas.forEach((pagina) => pagina.classList.add(CLASSE_PAGINA_IMPRIMIR));
  numerarPaginasExportadas(paginas);
  document.body.classList.add(CLASSE_IMPRIMINDO_PARTE);
  window.addEventListener('afterprint', limparImpressaoParcial, { once: true });
  window.print();
}

/**
 * Trata os cliques nos botões de exportação (apostila completa ou exercícios).
 * @param {MouseEvent} evento - Clique na página.
 * @returns {void}
 */
function tratarClique(evento) {
  const botaoExercicios = evento.target.closest(`[${ATRIBUTO_EXERCICIOS}]`);
  if (botaoExercicios) {
    exportarExerciciosPDF(botaoExercicios.getAttribute(ATRIBUTO_EXERCICIOS));
    return;
  }
  if (evento.target.closest(`#${ID_BOTAO_PDF}`)) exportarApostilaPDF();
}

/**
 * Inicializa a apostila: espera as fontes, pagina, numera e liga os botões.
 * @returns {Promise<void>}
 */
async function iniciarApostila() {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  document.querySelectorAll(SELETOR_FONTES).forEach(paginarFonte);
  numerarPaginas();
  preencherSumario();
  document.body.classList.add(CLASSE_APOSTILA_PAGINADA);
  document.addEventListener('click', tratarClique);
}

document.addEventListener('DOMContentLoaded', iniciarApostila);
