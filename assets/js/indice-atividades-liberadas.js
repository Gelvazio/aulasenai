/**
 * Índice de atividades: bloqueia para o aluno a leitura das atividades não liberadas.
 * A lista vem do arquivo de dados ATIVIDADES-LIBERADAS.js da pasta da matéria, carregado antes
 * deste script: window.ATIVIDADES_LIBERADAS = ['nome-do-arquivo', ...].
 * Cada card traz <article class="aula" data-arquivo="nome-do-arquivo">.
 */

const CLASSE_BLOQUEADA = 'bloqueada';
const TEXTO_BLOQUEADA = '🔒 Bloqueada';

/**
 * Lê a lista de arquivos liberados definida pela página.
 * @returns {Set<string>|null} Nomes liberados ou null se a lista não existir.
 */
function lerLiberadas() {
  const lista = window.ATIVIDADES_LIBERADAS;
  if (!Array.isArray(lista)) return null;

  return new Set(lista);
}

/**
 * Impede a abertura do arquivo pelo botão bloqueado.
 * @param {MouseEvent} evento - Clique no botão.
 * @returns {void}
 */
function impedirAbertura(evento) {
  evento.preventDefault();
}

/**
 * Marca o card como bloqueado: remove os links e mostra o cadeado.
 * @param {HTMLElement} cartao - Card da atividade.
 * @returns {void}
 */
function bloquearCartao(cartao) {
  cartao.classList.add(CLASSE_BLOQUEADA);
  cartao.querySelectorAll('a.btn').forEach((botao) => {
    botao.removeAttribute('href');
    botao.classList.remove('principal');
    botao.classList.add('off');
    botao.setAttribute('aria-disabled', 'true');
    botao.textContent = TEXTO_BLOQUEADA;
    botao.addEventListener('click', impedirAbertura);
  });
}

/**
 * Aplica a lista de liberadas a todos os cards da página.
 * @returns {void}
 */
function aplicarLiberadas() {
  const liberadas = lerLiberadas();
  if (!liberadas) return;

  document.querySelectorAll('article.aula[data-arquivo]').forEach((cartao) => {
    const estaLiberada = liberadas.has(cartao.dataset.arquivo);
    if (!estaLiberada) bloquearCartao(cartao);
  });
}

aplicarLiberadas();
