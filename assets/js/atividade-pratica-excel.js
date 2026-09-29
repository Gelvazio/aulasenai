/**
 * Atividade prática de Excel: botão de impressão e marcação de passos concluídos.
 * A página informa o identificador da atividade em <body data-atividade="...">.
 */

const PREFIXO_CHAVE = 'atividade-excel:';
const CLASSE_PASSO_FEITO = 'passo--feito';
const TEXTO_COPIAR = '📋 Copiar';
const TEXTO_COPIADO = '✅ Copiado!';
const TEXTO_FALHA_COPIA = '⚠️ Não foi possível copiar';
const TEMPO_AVISO_COPIA_MS = 2500;
const MINIMO_LINHAS_PARA_COPIAR = 2;

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
 * Garante que só dados sejam copiados: qualquer texto que comece com "=" (fórmula) vira vazio,
 * porque as fórmulas devem ser feitas pelos alunos.
 * @param {string} texto - Conteúdo da célula.
 * @returns {string} O texto, ou vazio se for uma fórmula.
 */
function textoSemFormula(texto) {
  return texto.startsWith('=') ? '' : texto;
}

/**
 * Converte a tabela em texto separado por tabulação (cola direto nas células do Excel/Calc).
 * @param {HTMLTableElement} tabela - Tabela "Dados para digitar".
 * @returns {string} Linhas separadas por quebra de linha e colunas por tabulação.
 */
function tabelaParaTexto(tabela) {
  const tabulacao = String.fromCharCode(9);
  const quebraLinha = String.fromCharCode(10);
  return Array.from(tabela.rows)
    .map((linha) => Array.from(linha.cells).map((celula) => textoSemFormula(celula.textContent.trim()))
      .join(tabulacao))
    .join(quebraLinha);
}

/**
 * Copia um texto para a área de transferência, com alternativa para navegadores sem a API.
 * @param {string} texto - Texto a copiar.
 * @returns {Promise<boolean>} true se copiou.
 */
async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (erro) {
    const campo = document.createElement('textarea');
    campo.value = texto;
    document.body.appendChild(campo);
    campo.select();
    const copiou = document.execCommand('copy');
    campo.remove();
    return copiou;
  }
}

/**
 * Cria o botão "Copiar" de uma tabela de dados; mostra a confirmação por instantes.
 * @param {HTMLTableElement} tabela - Tabela "Dados para digitar".
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoCopiar(tabela) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'botao botao--copiar';
  botao.textContent = TEXTO_COPIAR;
  botao.addEventListener('click', () => copiarComAviso(
    botao, tabela.dataset.copiar || tabelaParaTexto(tabela)));
  return botao;
}

/**
 * Copia o texto e mostra no botão se deu certo, voltando ao rótulo original depois.
 * @param {HTMLButtonElement} botao - Botão clicado.
 * @param {string} texto - Texto a copiar.
 * @returns {Promise<void>} Resolve depois de copiar.
 */
async function copiarComAviso(botao, texto) {
  const copiou = await copiarTexto(texto);
  botao.textContent = copiou ? TEXTO_COPIADO : TEXTO_FALHA_COPIA;
  setTimeout(() => { botao.textContent = TEXTO_COPIAR; }, TEMPO_AVISO_COPIA_MS);
}

/**
 * Liga os botões "Copiar" das imagens de planilha: o texto (só dados) vem em data-copiar.
 * @returns {void}
 */
function ligarCopiaDasImagens() {
  document.querySelectorAll('button[data-copiar]').forEach((botao) => {
    botao.addEventListener('click', () => copiarComAviso(botao, botao.dataset.copiar));
  });
}

/**
 * Coloca um botão "Copiar" ao lado de cada tabela "Dados para digitar". Copia só os dados
 * digitáveis; formatação e fórmulas são feitas pelo aluno na planilha.
 * @returns {void}
 */
function ligarCopiaDosDados() {
  document.querySelectorAll('.tabela--dados').forEach((tabela) => {
    const linhasDeDados = tabela.tBodies[0]?.rows.length || 0;
    if (linhasDeDados < MINIMO_LINHAS_PARA_COPIAR) return;

    const rolagem = tabela.closest('.tabela__rolagem') || tabela;
    const linha = document.createElement('div');
    linha.className = 'tabela-dados-linha';
    rolagem.parentNode.insertBefore(linha, rolagem);
    linha.append(rolagem, criarBotaoCopiar(tabela));
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
  ligarCopiaDosDados();
  ligarCopiaDasImagens();
}

document.addEventListener('DOMContentLoaded', iniciarAtividade);
