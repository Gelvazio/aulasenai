const ARQUIVO_DADOS = "analise-materiais.json";
const MENSAGEM_ERRO =
  "Não foi possível carregar analise-materiais.json. " +
  "Gere o arquivo e abra esta página por um servidor local.";
const LOCALE = "pt-BR";

/**
 * Busca um elemento pelo id.
 * @param {string} identificador - Id do elemento.
 * @returns {HTMLElement} Elemento encontrado.
 */
function obterElemento(identificador) {
  return document.getElementById(identificador);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} texto - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Formata um número no padrão brasileiro.
 * @param {number} numero - Valor a formatar.
 * @returns {string} Número formatado.
 */
function formatarNumero(numero) {
  return Number(numero || 0).toLocaleString(LOCALE);
}

/**
 * Formata bytes em unidade legível.
 * @param {number} bytes - Tamanho em bytes.
 * @returns {string} Texto como "1,5 MB".
 */
function formatarTamanho(bytes) {
  const unidades = ["B", "KB", "MB", "GB", "TB"];
  let valor = Number(bytes || 0);
  let indice = 0;
  while (valor >= 1024 && indice < unidades.length - 1) {
    valor /= 1024;
    indice += 1;
  }
  return `${valor.toLocaleString(LOCALE, { maximumFractionDigits: 1 })} ${unidades[indice]}`;
}

/**
 * Ordena um objeto {chave: quantidade} em ordem decrescente.
 * @param {Object<string, number>} contagem - Contagem por chave.
 * @returns {Array<[string, number]>} Pares ordenados.
 */
function ordenarContagem(contagem) {
  return Object.entries(contagem || {}).sort((a, b) => b[1] - a[1]);
}

/**
 * Cria a linha de barra de uma contagem.
 * @param {string} rotulo - Nome do item.
 * @param {number} quantidade - Quantidade do item.
 * @param {number} maximo - Maior quantidade do grupo.
 * @returns {HTMLElement} Elemento da linha.
 */
function criarLinhaBarra(rotulo, quantidade, maximo) {
  const linha = criarElemento("li", "barra-linha");
  const trilho = criarElemento("div", "barra-trilho");
  const preenchimento = criarElemento("div", "barra-preenchimento");
  const porcentagem = maximo > 0 ? (quantidade / maximo) * 100 : 0;
  preenchimento.style.setProperty("--largura-barra", `${porcentagem}%`);
  trilho.appendChild(preenchimento);
  linha.append(
    criarElemento("span", "barra-rotulo", rotulo),
    trilho,
    criarElemento("span", "barra-quantidade", formatarNumero(quantidade))
  );
  return linha;
}

/**
 * Preenche uma lista com barras ordenadas.
 * @param {HTMLElement} lista - Elemento ul de destino.
 * @param {Object<string, number>} contagem - Contagem por chave.
 * @returns {void}
 */
function preencherBarras(lista, contagem) {
  const ordenado = ordenarContagem(contagem);
  const maximo = ordenado.length ? ordenado[0][1] : 0;
  lista.replaceChildren(
    ...ordenado.map(([rotulo, quantidade]) => criarLinhaBarra(rotulo, quantidade, maximo))
  );
}

/**
 * Cria um cartão de resumo.
 * @param {string} rotulo - Título do cartão.
 * @param {string} valor - Valor exibido.
 * @returns {HTMLElement} Cartão criado.
 */
function criarCartao(rotulo, valor) {
  const cartao = criarElemento("article", "cartao");
  cartao.append(
    criarElemento("p", "cartao-rotulo", rotulo),
    criarElemento("p", "cartao-valor", valor)
  );
  return cartao;
}

/**
 * Soma o tamanho de todos os arquivos.
 * @param {Array<{tamanho: number}>} arquivos - Lista de arquivos.
 * @returns {number} Tamanho total em bytes.
 */
function somarTamanhos(arquivos) {
  return (arquivos || []).reduce((total, arquivo) => total + Number(arquivo.tamanho || 0), 0);
}

/**
 * Mostra os cartões de resumo.
 * @param {Object} dados - Conteúdo do JSON de análise.
 * @returns {void}
 */
function mostrarResumo(dados) {
  const quantidadeTipos = Object.keys(dados.porTipo || {}).length;
  const quantidadePastas = Object.keys(dados.porPasta || {}).length;
  obterElemento("cartoes-resumo").replaceChildren(
    criarCartao("Total de arquivos", formatarNumero(dados.totalArquivos)),
    criarCartao("Tipos de arquivo", formatarNumero(quantidadeTipos)),
    criarCartao("Pastas", formatarNumero(quantidadePastas)),
    criarCartao("Tamanho total", formatarTamanho(somarTamanhos(dados.arquivos)))
  );
}

/**
 * Cria o bloco de uma pasta com os tipos dela.
 * @param {string} nome - Nome da pasta.
 * @param {{total: number, tipos: Object<string, number>}} pasta - Dados da pasta.
 * @returns {HTMLElement} Bloco da pasta.
 */
function criarBlocoPasta(nome, pasta) {
  const bloco = criarElemento("article", "pasta");
  const cabecalho = criarElemento("h3", "pasta-cabecalho");
  cabecalho.append(
    criarElemento("span", "pasta-nome", nome),
    criarElemento("span", "pasta-total", formatarNumero(pasta.total))
  );
  const lista = criarElemento("ul", "barras");
  preencherBarras(lista, pasta.tipos);
  bloco.append(cabecalho, lista);
  return bloco;
}

/**
 * Mostra as pastas ordenadas pelo total de arquivos.
 * @param {Object<string, {total: number, tipos: Object}>} porPasta - Dados por pasta.
 * @returns {void}
 */
function mostrarPastas(porPasta) {
  const ordenadas = Object.entries(porPasta || {}).sort((a, b) => b[1].total - a[1].total);
  obterElemento("lista-pastas").replaceChildren(
    ...ordenadas.map(([nome, pasta]) => criarBlocoPasta(nome, pasta))
  );
}

/**
 * Mostra a data de geração dos dados.
 * @param {string} geradoEm - Data em formato ISO.
 * @returns {void}
 */
function mostrarGeradoEm(geradoEm) {
  const data = new Date(geradoEm);
  const valido = !Number.isNaN(data.getTime());
  const texto = valido ? data.toLocaleString(LOCALE) : String(geradoEm || "desconhecido");
  obterElemento("gerado-em").textContent = `Gerado em ${texto}`;
}

/**
 * Exibe a mensagem de erro amigável.
 * @returns {void}
 */
function mostrarErro() {
  const caixa = obterElemento("mensagem-erro");
  caixa.textContent = MENSAGEM_ERRO;
  caixa.hidden = false;
  obterElemento("gerado-em").textContent = "Sem dados";
}

/**
 * Carrega o JSON e monta o painel.
 * @returns {Promise<void>}
 */
async function iniciarPainel() {
  try {
    const resposta = await fetch(ARQUIVO_DADOS, { cache: "no-store" });
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();
    mostrarGeradoEm(dados.geradoEm);
    mostrarResumo(dados);
    preencherBarras(obterElemento("barras-tipos"), dados.porTipo);
    mostrarPastas(dados.porPasta);
  } catch (erro) {
    mostrarErro();
  }
}

iniciarPainel();
