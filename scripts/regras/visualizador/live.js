/* Tela AO VIVO: lê tasks/STATUS.md e tasks/task_complete.md do GitHub a cada minuto. */
const URL_STATUS = 'https://raw.githubusercontent.com/Gelvazio/aulasenai/main/tasks/STATUS.md';
const URL_CONCLUIDAS =
  'https://raw.githubusercontent.com/Gelvazio/aulasenai/main/tasks/task_complete.md';
const INTERVALO_ATUALIZACAO_MS = 60000;
const INTERVALO_RELOGIO_MS = 1000;
const QUANTIDADE_ULTIMAS_CONCLUIDAS = 15;
const MARCA_TAREFAS = '📌 Tarefas';
const MARCA_FRENTES = '🧭 Frentes';
const MARCA_CONCLUIDAS = '✅ Concluídas';
const EMOJI_EXECUCAO = '🔄';
const EMOJI_AGUARDANDO = '👀';
const EMOJI_BLOQUEADA = '⛔';
const EMOJI_PENDENTE = '⬜';
const SITUACAO_FRENTE_ATIVA = '🔄 Ativa';
const COLUNAS_EXECUCAO = ['Tarefa', 'Título', 'Modelo', 'Em uso por'];
const COLUNAS_ESPERA = ['Tarefa', 'Título', 'Status'];
const COLUNAS_CONCLUIDAS = ['Tarefa', 'Título', 'Status'];
const MSG_FALHA_LEITURA = 'Falha ao ler o quadro; mostrando a última leitura. Detalhe: ';
const MSG_SEM_LINHAS = 'Nenhuma.';
const RESUMO_ITENS = [
  { emoji: EMOJI_EXECUCAO, rotulo: 'Em execução' },
  { emoji: EMOJI_AGUARDANDO, rotulo: 'Aguardando' },
  { emoji: EMOJI_BLOQUEADA, rotulo: 'Bloqueadas' },
  { emoji: EMOJI_PENDENTE, rotulo: 'Pendentes' },
];

const estado = { anterior: null, proximaLeitura: 0 };

/**
 * Obtém um elemento da página pelo id.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement} Elemento encontrado.
 */
function obterElemento(id) {
  return document.getElementById(id);
}

/**
 * Separa as células de uma linha de tabela Markdown, respeitando `\|` e crases.
 * @param {string} linha - Linha da tabela.
 * @returns {string[]} Células sem espaços nas pontas.
 */
function dividirCelulas(linha) {
  const celulas = [];
  let atual = '';
  let dentroCrase = false;
  const corpo = linha.trim().replace(/^\|/, '');
  for (let i = 0; i < corpo.length; i++) {
    const caractere = corpo[i];
    const escapado = caractere === '\\' && corpo[i + 1] === '|';
    if (escapado) { atual += '|'; i++; continue; }
    if (caractere === '`') dentroCrase = !dentroCrase;
    if (caractere === '|' && !dentroCrase) { celulas.push(atual.trim()); atual = ''; continue; }
    atual += caractere;
  }
  if (atual.trim() !== '') celulas.push(atual.trim());
  return celulas;
}

/**
 * Limpa a marcação Markdown de uma célula (negrito, crase, links).
 * @param {string} texto - Texto da célula.
 * @returns {string} Texto simples.
 */
function limparMarcacao(texto) {
  return texto.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\*\*|`/g, '');
}

/**
 * Extrai o texto de uma seção `## ` cujo título contém a marca.
 * @param {string} texto - Markdown completo.
 * @param {string} marca - Trecho do título da seção.
 * @returns {string[]} Linhas da seção (sem o título).
 */
function lerSecao(texto, marca) {
  const linhas = texto.split('\n');
  const inicio = linhas.findIndex((l) => l.startsWith('## ') && l.includes(marca));
  if (inicio < 0) return [];
  const fim = linhas.findIndex((l, i) => i > inicio && l.startsWith('## '));
  return linhas.slice(inicio + 1, fim < 0 ? linhas.length : fim);
}

/**
 * Converte as linhas de tabela Markdown em objetos {coluna: valor}.
 * @param {string[]} linhas - Linhas da seção.
 * @returns {Object[]} Registros da tabela.
 */
function lerTabela(linhas) {
  const tabela = linhas.filter((l) => l.trim().startsWith('|'));
  if (tabela.length < 2) return [];
  const cabecalho = dividirCelulas(tabela[0]);
  return tabela.slice(2).map((linha) => {
    const celulas = dividirCelulas(linha).map(limparMarcacao);
    const registro = {};
    cabecalho.forEach((nome, i) => { registro[nome] = celulas[i] || ''; });
    return registro;
  });
}

/**
 * Filtra as linhas cuja coluna Status contém o emoji.
 * @param {Object[]} linhas - Registros do quadro.
 * @param {string} emoji - Emoji de situação.
 * @returns {Object[]} Linhas filtradas.
 */
function filtrarPorStatus(linhas, emoji) {
  return linhas.filter((linha) => (linha.Status || '').includes(emoji));
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} etiqueta - Nome da tag.
 * @param {string} classe - Classe CSS (pode ser vazia).
 * @param {string} texto - Texto (via textContent).
 * @returns {HTMLElement} Elemento criado.
 */
function criarNo(etiqueta, classe, texto) {
  const no = document.createElement(etiqueta);
  if (classe) no.className = classe;
  if (texto) no.textContent = texto;
  return no;
}

/**
 * Monta uma tabela com as colunas pedidas; destaca linhas novas ou alteradas.
 * @param {Object[]} linhas - Registros a mostrar.
 * @param {string[]} colunas - Nomes das colunas.
 * @param {Set<string>} novos - Tarefas novas ou com status alterado.
 * @returns {HTMLElement} Tabela ou parágrafo vazio.
 */
function montarTabela(linhas, colunas, novos) {
  if (linhas.length === 0) return criarNo('p', 'vazio', MSG_SEM_LINHAS);
  const tabela = document.createElement('table');
  const cabecalho = tabela.createTHead().insertRow();
  colunas.forEach((nome) => cabecalho.appendChild(criarNo('th', '', nome)));
  const corpo = tabela.createTBody();
  linhas.forEach((linha) => {
    const tr = corpo.insertRow();
    if (novos.has(linha.Tarefa)) tr.className = 'ao-vivo__novo';
    colunas.forEach((nome) => tr.appendChild(criarNo('td', '', linha[nome] || '')));
  });
  return tabela;
}

/**
 * Substitui o conteúdo de um contêiner por um novo nó.
 * @param {string} id - Id do contêiner.
 * @param {Node} no - Novo conteúdo.
 * @returns {void}
 */
function trocarConteudo(id, no) {
  obterElemento(id).replaceChildren(no);
}

/**
 * Desenha o resumo com a contagem de cada situação.
 * @param {Object[]} tarefas - Linhas de "📌 Tarefas".
 * @returns {void}
 */
function desenharResumo(tarefas) {
  const itens = RESUMO_ITENS.map(({ emoji, rotulo }) => {
    const item = criarNo('div', 'resumo__item', '');
    const quantidade = filtrarPorStatus(tarefas, emoji).length;
    item.append(criarNo('div', 'resumo__numero', `${emoji} ${quantidade}`));
    item.append(criarNo('div', 'resumo__rotulo', rotulo));
    return item;
  });
  obterElemento('ao-vivo-resumo').replaceChildren(...itens);
}

/**
 * Desenha os cartões das frentes com situação ativa.
 * @param {Object[]} frentes - Linhas de "🧭 Frentes".
 * @returns {void}
 */
function desenharFrentes(frentes) {
  const ativas = frentes.filter((f) => (f['Situação'] || '').includes(SITUACAO_FRENTE_ATIVA));
  if (ativas.length === 0) {
    trocarConteudo('ao-vivo-frentes', criarNo('p', 'vazio', MSG_SEM_LINHAS));
    return;
  }
  const cartoes = ativas.map((frente) => {
    const cartao = criarNo('article', 'cartao situacao--em-andamento', '');
    cartao.append(criarNo('div', 'cartao__titulo', frente.Frente || ''));
    cartao.append(criarNo('div', 'cartao__texto', frente['Tarefa (etapa)'] || ''));
    const rodape = criarNo('div', 'cartao__rodape', '');
    rodape.append(criarNo('span', 'etiqueta', frente['Situação']));
    rodape.append(criarNo('span', 'etiqueta', frente['Atualizado em'] || ''));
    cartao.append(rodape);
    return cartao;
  });
  obterElemento('ao-vivo-frentes').replaceChildren(...cartoes);
}

/**
 * Descobre as tarefas novas ou com status alterado desde a leitura anterior.
 * @param {Object[]} tarefas - Linhas atuais de "📌 Tarefas".
 * @returns {Set<string>} Ids das tarefas destacadas.
 */
function calcularNovos(tarefas) {
  const novos = new Set();
  if (!estado.anterior) return novos;
  tarefas.forEach((tarefa) => {
    const statusAntes = estado.anterior.get(tarefa.Tarefa);
    if (statusAntes !== tarefa.Status) novos.add(tarefa.Tarefa);
  });
  return novos;
}

/**
 * Guarda o status de cada tarefa para comparar na próxima leitura.
 * @param {Object[]} tarefas - Linhas atuais de "📌 Tarefas".
 * @returns {void}
 */
function guardarAnterior(tarefas) {
  estado.anterior = new Map(tarefas.map((t) => [t.Tarefa, t.Status]));
}

/**
 * Desenha as últimas linhas concluídas (fim da tabela do task_complete.md).
 * @param {string} texto - Markdown de task_complete.md.
 * @returns {void}
 */
function desenharConcluidas(texto) {
  const linhas = lerTabela(lerSecao(texto, MARCA_CONCLUIDAS));
  const ultimas = linhas.slice(-QUANTIDADE_ULTIMAS_CONCLUIDAS).reverse();
  trocarConteudo('ao-vivo-concluidas', montarTabela(ultimas, COLUNAS_CONCLUIDAS, new Set()));
}

/**
 * Desenha toda a tela a partir do texto dos dois arquivos.
 * @param {{status: string, concluidas: string}} textos - Conteúdo lido.
 * @returns {void}
 */
function desenharTela({ status, concluidas }) {
  const tarefas = lerTabela(lerSecao(status, MARCA_TAREFAS));
  const frentes = lerTabela(lerSecao(status, MARCA_FRENTES));
  const novos = calcularNovos(tarefas);
  desenharResumo(tarefas);
  desenharFrentes(frentes);
  const tabela = (emoji, colunas) => montarTabela(filtrarPorStatus(tarefas, emoji), colunas, novos);
  trocarConteudo('ao-vivo-execucao', tabela(EMOJI_EXECUCAO, COLUNAS_EXECUCAO));
  trocarConteudo('ao-vivo-aguardando', tabela(EMOJI_AGUARDANDO, COLUNAS_ESPERA));
  trocarConteudo('ao-vivo-bloqueadas', tabela(EMOJI_BLOQUEADA, COLUNAS_ESPERA));
  desenharConcluidas(concluidas);
  guardarAnterior(tarefas);
}

/**
 * Baixa um arquivo de texto sem usar cache.
 * @param {string} url - Endereço do arquivo.
 * @returns {Promise<string>} Conteúdo do arquivo.
 * @throws {Error} Se a resposta não for bem-sucedida.
 */
async function baixarTexto(url) {
  const resposta = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
  if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
  return resposta.text();
}

/**
 * Mostra ou esconde o aviso de falha.
 * @param {string} mensagem - Texto do aviso (vazio esconde).
 * @returns {void}
 */
function mostrarAviso(mensagem) {
  const aviso = obterElemento('ao-vivo-aviso');
  aviso.textContent = mensagem;
  aviso.hidden = mensagem === '';
}

/**
 * Lê os dois arquivos, redesenha a tela e agenda a próxima leitura.
 * @returns {Promise<void>}
 */
async function atualizar() {
  estado.proximaLeitura = Date.now() + INTERVALO_ATUALIZACAO_MS;
  try {
    const [status, concluidas] = await Promise.all([
      baixarTexto(URL_STATUS),
      baixarTexto(URL_CONCLUIDAS),
    ]);
    desenharTela({ status, concluidas });
    mostrarAviso('');
    obterElemento('ao-vivo-atualizado').textContent =
      `Atualizado às ${new Date().toLocaleTimeString('pt-BR')}`;
  } catch (erro) {
    mostrarAviso(MSG_FALHA_LEITURA + erro.message);
  }
}

/**
 * Atualiza a contagem regressiva até a próxima leitura.
 * @returns {void}
 */
function atualizarRelogio() {
  const restante = Math.max(0, Math.ceil((estado.proximaLeitura - Date.now()) / 1000));
  obterElemento('ao-vivo-contagem').textContent = `${restante}s`;
}

/**
 * Inicia a primeira leitura e os temporizadores.
 * @returns {void}
 */
function iniciar() {
  atualizar();
  setInterval(atualizar, INTERVALO_ATUALIZACAO_MS);
  setInterval(atualizarRelogio, INTERVALO_RELOGIO_MS);
}

iniciar();
