/**
 * Atividade prática de Excel: botão de impressão e marcação de passos concluídos.
 * A página informa o identificador da atividade em <body data-atividade="...">.
 */

const PREFIXO_CHAVE = 'atividade-excel:';
const CLASSE_PASSO_FEITO = 'passo--feito';

/**
 * Lê um valor salvo no navegador sem quebrar a página se o armazenamento estiver bloqueado.
 * @param {string} chave - Chave do armazenamento local.
 * @returns {string|null} Valor salvo ou null.
 */
function lerSalvo(chave) {
  try {
    return window.localStorage.getItem(chave);
  } catch (erro) {
    return null;
  }
}

/**
 * Grava um valor no navegador, ignorando falhas de armazenamento.
 * @param {string} chave - Chave do armazenamento local.
 * @param {string} valor - Valor a gravar.
 * @returns {void}
 */
function gravarSalvo(chave, valor) {
  try {
    window.localStorage.setItem(chave, valor);
  } catch (erro) {
    // Sem armazenamento a marcação vale só enquanto a página estiver aberta.
  }
}

/**
 * Aplica o visual de passo concluído ao cartão do passo.
 * @param {HTMLInputElement} caixa - Caixa de seleção do passo.
 * @returns {void}
 */
function atualizarVisualPasso(caixa) {
  const cartao = caixa.closest('.passo');
  if (!cartao) return;

  cartao.classList.toggle(CLASSE_PASSO_FEITO, caixa.checked);
}

/**
 * Liga as caixas "Passo concluído" ao armazenamento local.
 * @param {string} atividade - Identificador da atividade.
 * @returns {void}
 */
function ligarPassosConcluidos(atividade) {
  const caixas = document.querySelectorAll('input[data-passo]');

  caixas.forEach((caixa) => {
    const chave = PREFIXO_CHAVE + atividade + ':' + caixa.dataset.passo;
    caixa.checked = lerSalvo(chave) === '1';
    atualizarVisualPasso(caixa);

    caixa.addEventListener('change', () => {
      gravarSalvo(chave, caixa.checked ? '1' : '0');
      atualizarVisualPasso(caixa);
    });
  });
}

/**
 * Liga os botões de impressão (salvar em PDF pelo navegador).
 * @returns {void}
 */
function ligarImpressao() {
  document.querySelectorAll('[data-acao="imprimir"]').forEach((botao) => {
    botao.addEventListener('click', () => window.print());
  });
}

/**
 * Inicializa a página da atividade.
 * @returns {void}
 */
function iniciarAtividade() {
  const atividade = document.body.dataset.atividade || 'atividade';
  ligarPassosConcluidos(atividade);
  ligarImpressao();
}

document.addEventListener('DOMContentLoaded', iniciarAtividade);
