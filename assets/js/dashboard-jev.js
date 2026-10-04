// Dashboard do Jev (TypeSafe System One): lê os arquivos Markdown indicados no <body>
// (data-claude e data-documentacao, caminhos relativos à página) e monta fluxo, primitivas,
// comparação LLM × Jev, simulador de confiança, implementação e ideias de uso.
// Markdown → HTML com marked + DOMPurify (carregados no <head>).
// CSS: assets/css/dashboard-jev.css.

const LIMITE_CONFIANCA_BAIXA = 0.5;
const LIMITE_CONFIANCA_ALTA = 0.9;
const MINIMO_OPCOES = 2;
const MAXIMO_OPCOES_SIMULADOR = 6;
const PESO_INICIAL = 50;
const TITULOS_JEV = {
    fluxo: '## 2. Fluxo',
    primitivas: '## 3. Primitivas TypeSafe',
    atomicas: '## 4. Perguntas atômicas',
    comoFunciona: '## 2. Como funciona',
    projeto: '### 3.5 Neste projeto',
    cuidados: '### 3.6 Cuidados obrigatórios',
    ideias: '## 4. Ideias de uso',
};
const MARCA_TABELA_PRIMITIVAS = '**Perguntas';
const DECISOES_CONFIANCA = [
    { minimo: LIMITE_CONFIANCA_ALTA, classe: 'alta', texto: 'Alta: agir automaticamente' },
    { minimo: LIMITE_CONFIANCA_BAIXA, classe: 'media',
        texto: 'Média: pedir confirmação ou revisar' },
    { minimo: 0, classe: 'baixa', texto: 'Baixa: não agir, mandar para revisão humana' },
];
const EXEMPLO_PADRAO = {
    choice: { billing: 'Pagamento', technical: 'Problema técnico', sales: 'Vendas' },
    score: ['Calmo', 'Frustrado, mas educado', 'Muito irritado'],
};
const PARTES_CAMINHO = ['🖥️ Página (JWT do usuário)', '🛡️ Edge Function (chave secreta)', '🤖 Jev'];

/**
 * Busca um arquivo de texto sem cache.
 * @param {string} caminho - Caminho relativo à página.
 * @returns {Promise<string>} Conteúdo do arquivo.
 * @throws {Error} Se o arquivo não for encontrado.
 */
async function buscarArquivoJev(caminho) {
    const resposta = await fetch(caminho, { cache: 'no-store' });
    if (!resposta.ok) throw new Error(caminho + ' (' + resposta.status + ')');
    return resposta.text();
}

/**
 * Devolve o trecho de uma seção (do título até o próximo título de mesmo nível ou maior).
 * @param {string} markdown - Texto completo.
 * @param {string} titulo - Início da linha do título (ex.: "## 3. Primitivas").
 * @returns {string} Conteúdo da seção ou vazio.
 */
function obterSecaoJev(markdown, titulo) {
    const linhas = markdown.split(/\r?\n/);
    const inicio = linhas.findIndex((linha) => linha.startsWith(titulo));
    if (inicio < 0) return '';

    const nivel = titulo.match(/^#+/)[0].length;
    const fimRelativo = linhas.slice(inicio + 1).findIndex((linha) => {
        const marcador = linha.match(/^(#+) /);
        return marcador && marcador[1].length <= nivel;
    });
    const fim = fimRelativo < 0 ? linhas.length : inicio + 1 + fimRelativo;
    return linhas.slice(inicio + 1, fim).join('\n');
}

/**
 * Lê a primeira tabela Markdown (bloco contínuo de linhas com "|") de um trecho.
 * @param {string} trecho - Texto com a tabela.
 * @returns {string[][]} Linhas da tabela (sem cabeçalho e separador).
 */
function lerTabelaJev(trecho) {
    const todas = trecho.split(/\r?\n/);
    const ehLinhaDeTabela = (linha) => linha.trim().startsWith('|');
    const inicio = todas.findIndex(ehLinhaDeTabela);
    if (inicio < 0) return [];

    const fimRelativo = todas.slice(inicio).findIndex((linha) => !ehLinhaDeTabela(linha));
    const fim = fimRelativo < 0 ? todas.length : inicio + fimRelativo;
    return todas.slice(inicio + 2, fim).map((linha) =>
        linha.trim().replace(/^\||\|$/g, '').split('|').map((celula) => celula.trim()));
}

/**
 * Lê os itens de uma lista (numerada ou com marcadores) de um trecho.
 * @param {string} trecho - Texto com a lista.
 * @returns {string[]} Itens, incluindo as linhas de continuação.
 */
function lerListaJev(trecho) {
    const itens = [];
    trecho.split(/\r?\n/).forEach((linha) => {
        const novoItem = linha.match(/^(\d+\.|-)\s+(.*)$/);
        if (novoItem) {
            itens.push(novoItem[2]);
            return;
        }
        const continuacao = itens.length && /^\s{2,}\S/.test(linha);
        if (continuacao) itens[itens.length - 1] += ' ' + linha.trim();
    });
    return itens;
}

/**
 * Converte Markdown de uma linha em HTML seguro.
 * @param {string} texto - Markdown inline.
 * @returns {string} HTML sanitizado.
 */
function htmlInlineJev(texto) {
    return window.DOMPurify.sanitize(window.marked.parseInline(texto || ''));
}

/**
 * Cria um elemento com classe e conteúdo Markdown opcional.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [markdown] - Markdown inline do conteúdo.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoJev(tag, classe, markdown) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (markdown !== undefined) elemento.innerHTML = htmlInlineJev(markdown);
    return elemento;
}

/**
 * Cria a seta entre etapas.
 * @returns {HTMLElement} Seta.
 */
function criarSetaJev() {
    return criarElementoJev('span', 'jev-fluxo__seta', '➜');
}

/**
 * Monta o fluxo entrada → modelo → saída a partir do diagrama Mermaid da documentação.
 * @param {HTMLElement} destino - Área do fluxo.
 * @param {string} documentacao - Conteúdo de documentacao.md.
 */
function montarFluxoJev(destino, documentacao) {
    const diagrama = obterSecaoJev(documentacao, TITULOS_JEV.fluxo);
    const rotulos = [...diagrama.matchAll(/\["([^"]+)"\]/g)]
        .map((achado) => achado[1].split('<br/>'));
    if (!rotulos.length) return;

    destino.replaceChildren();
    rotulos.forEach(([titulo, detalhe], indice) => {
        const etapa = criarElementoJev('div', 'jev-fluxo__etapa');
        etapa.append(criarElementoJev('span', 'jev-fluxo__numero', String(indice + 1)),
            criarElementoJev('strong', '', titulo), criarElementoJev('p', '', detalhe || ''));
        destino.append(etapa);
        const temProxima = indice < rotulos.length - 1;
        if (temProxima) destino.append(criarSetaJev());
    });
}

/**
 * Cria o card de uma primitiva.
 * @param {string[]} linha - Linha da tabela da documentação (nome, o que faz, o que devolve).
 * @param {string[]|undefined} campos - Linha da tabela do CLAUDE.md com os campos.
 * @returns {HTMLElement} Card.
 */
function criarCardPrimitivaJev([nome, faz, devolve], campos) {
    const nomeLimpo = nome.replace(/\*/g, '');
    const card = criarElementoJev('article', 'jev-card jev-card--' + nomeLimpo.toLowerCase());
    card.append(criarElementoJev('h3', '', nome), criarElementoJev('p', '', faz),
        criarElementoJev('p', 'jev-card__rotulo', 'Devolve'), criarElementoJev('p', '', devolve));
    if (campos) {
        card.append(criarElementoJev('p', 'jev-card__rotulo', 'Campos'),
            criarElementoJev('p', '', campos[2]));
    }
    return card;
}

/**
 * Monta os cards das primitivas (documentação: o que faz/devolve; CLAUDE.md: campos).
 * @param {HTMLElement} destino - Área dos cards.
 * @param {{claude: string, documentacao: string}} arquivos - Conteúdo dos dois arquivos.
 */
function montarPrimitivasJev(destino, { claude, documentacao }) {
    const linhas = lerTabelaJev(obterSecaoJev(documentacao, TITULOS_JEV.primitivas));
    const secaoCampos = obterSecaoJev(claude, TITULOS_JEV.comoFunciona);
    const campos = lerTabelaJev(secaoCampos.split(MARCA_TABELA_PRIMITIVAS)[1] || '');
    destino.replaceChildren();
    linhas.forEach((linha) => {
        const nomeLimpo = linha[0].replace(/\*/g, '');
        const extra = campos.find((item) => item[0].includes(nomeLimpo));
        destino.append(criarCardPrimitivaJev(linha, extra));
    });
    const atomicas = lerListaJev(obterSecaoJev(documentacao, TITULOS_JEV.atomicas));
    if (atomicas.length) destino.append(criarElementoJev('p', 'jev-dica', '💡 ' + atomicas.join(' ')));
}

/**
 * Monta a comparação LLM × Jev (primeira tabela de "Como funciona" do CLAUDE.md).
 * @param {HTMLElement} destino - Área da comparação.
 * @param {string} claude - Conteúdo de CLAUDE.md.
 */
function montarComparacaoJev(destino, claude) {
    const linhas = lerTabelaJev(obterSecaoJev(claude, TITULOS_JEV.comoFunciona));
    destino.replaceChildren();
    linhas.forEach(([item, llm, jev]) => {
        const linha = criarElementoJev('div', 'jev-comparacao__linha');
        linha.append(criarElementoJev('span', 'jev-comparacao__item', item),
            criarElementoJev('span', 'jev-comparacao__llm', llm),
            criarElementoJev('span', 'jev-comparacao__jev', jev));
        destino.append(linha);
    });
}

/**
 * Lê do exemplo Python do CLAUDE.md as opções do Choice e os níveis do Score.
 * @param {string} claude - Conteúdo de CLAUDE.md.
 * @returns {{choice: Object<string,string>, score: string[]}} Exemplo para o simulador.
 */
function lerExemploJev(claude) {
    const trechoChoice = (claude.split('Choice(')[1] || '').split('Score(')[0];
    const trechoScore = (claude.split('Score(')[1] || '').split('Noul(')[0];
    const choice = Object.fromEntries([...trechoChoice.matchAll(/"(\w+)":\s*"([^"]+)"/g)]
        .map((achado) => [achado[1], achado[2]]));
    const score = [...trechoScore.matchAll(/^\s*"([^"]+)",\s*$/gm)].map((achado) => achado[1]);
    const temExemplo = Object.keys(choice).length >= MINIMO_OPCOES && score.length >= MINIMO_OPCOES;
    return temExemplo ? { choice, score } : EXEMPLO_PADRAO;
}

/**
 * Confiança de um Choice: quanto a maior probabilidade supera a divisão igual.
 * @param {number[]} probabilidades - Probabilidades que somam 1.
 * @returns {number} Confiança de 0 a 1.
 */
function calcularConfiancaChoice(probabilidades) {
    const quantidade = probabilidades.length;
    return (Math.max(...probabilidades) - 1 / quantidade) / (1 - 1 / quantidade);
}

/**
 * Confiança de um Score: considera a distância entre os níveis.
 * @param {number[]} probabilidades - Probabilidades por nível (do menor ao maior).
 * @returns {number} Confiança de 0 a 1.
 */
function calcularConfiancaScore(probabilidades) {
    const quantidade = probabilidades.length;
    const maior = probabilidades.indexOf(Math.max(...probabilidades));
    const espalhamento = probabilidades.reduce((soma, p, i) => soma + p * Math.abs(i - maior), 0);
    let espalhamentoIgual = 0;
    for (let i = 0; i < quantidade; i += 1) espalhamentoIgual += Math.abs(i - (quantidade - 1) / 2);
    return Math.max(0, 1 - espalhamento / (espalhamentoIgual / quantidade));
}

/**
 * Valor do Score (0 a 1): média dos níveis ponderada pelas probabilidades.
 * @param {number[]} probabilidades - Probabilidades por nível.
 * @returns {number} Score normalizado.
 */
function calcularValorScore(probabilidades) {
    const ultimo = probabilidades.length - 1;
    return probabilidades.reduce((soma, p, i) => soma + p * (i / ultimo), 0);
}

/**
 * Escolhe a decisão recomendada para uma confiança.
 * @param {number} confianca - Valor de 0 a 1.
 * @returns {{classe: string, texto: string}} Decisão.
 */
function decidirPorConfianca(confianca) {
    return DECISOES_CONFIANCA.find((decisao) => confianca >= decisao.minimo);
}

/**
 * Normaliza pesos em probabilidades (soma 1).
 * @param {number[]} pesos - Pesos dos controles deslizantes.
 * @returns {number[]} Probabilidades.
 */
function normalizarPesos(pesos) {
    const total = pesos.reduce((soma, peso) => soma + peso, 0);
    if (!total) return pesos.map(() => 1 / pesos.length);
    return pesos.map((peso) => peso / total);
}

/**
 * Cria um controle deslizante de peso com a barra da probabilidade.
 * @param {string} rotulo - Nome da opção ou nível.
 * @param {Function} aoMudar - Chamada quando o peso muda.
 * @returns {{linha: HTMLElement, entrada: HTMLInputElement, barra: HTMLElement,
 *   valor: HTMLElement}} Controle montado.
 */
function criarControleJev(rotulo, aoMudar) {
    const linha = criarElementoJev('label', 'jev-simulador__linha');
    const entrada = document.createElement('input');
    entrada.type = 'range';
    entrada.min = '0';
    entrada.max = '100';
    entrada.value = String(PESO_INICIAL);
    entrada.addEventListener('input', aoMudar);
    const trilho = criarElementoJev('span', 'jev-simulador__trilho');
    const barra = criarElementoJev('span', 'jev-simulador__barra');
    trilho.append(barra);
    const valor = criarElementoJev('span', 'jev-simulador__valor');
    linha.append(criarElementoJev('span', 'jev-simulador__rotulo', rotulo), entrada, trilho, valor);
    return { linha, entrada, barra, valor };
}

/**
 * Formata um valor de 0 a 1 como porcentagem inteira.
 * @param {number} valor - Valor de 0 a 1.
 * @returns {string} Porcentagem (ex.: "42%").
 */
function formatarPorcentagemJev(valor) {
    return (valor * 100).toFixed(0) + '%';
}

/**
 * Calcula a resposta e a confiança conforme o tipo de pergunta.
 * @param {object} estado - Estado do simulador (tipo e rótulos).
 * @param {number[]} probabilidades - Probabilidades atuais.
 * @returns {{resposta: string, confianca: number}} Resultado.
 */
function calcularResultadoJev(estado, probabilidades) {
    if (estado.tipo === 'choice') {
        const maior = probabilidades.indexOf(Math.max(...probabilidades));
        return { resposta: estado.rotulos[maior],
            confianca: calcularConfiancaChoice(probabilidades) };
    }
    return { resposta: 'score = ' + calcularValorScore(probabilidades).toFixed(2),
        confianca: calcularConfiancaScore(probabilidades) };
}

/**
 * Atualiza barras, confiança e decisão do simulador.
 * @param {object} estado - Estado do simulador (tipo, controles, áreas de resultado).
 */
function atualizarSimuladorJev(estado) {
    const probabilidades = normalizarPesos(estado.controles.map((c) => Number(c.entrada.value)));
    estado.controles.forEach((controle, i) => {
        controle.barra.style.width = formatarPorcentagemJev(probabilidades[i]);
        controle.valor.textContent = formatarPorcentagemJev(probabilidades[i]);
    });
    const { resposta, confianca } = calcularResultadoJev(estado, probabilidades);
    const decisao = decidirPorConfianca(confianca);
    estado.resposta.textContent = resposta;
    estado.medidor.style.width = formatarPorcentagemJev(confianca);
    estado.medidor.className = 'jev-medidor__valor jev-medidor__valor--' + decisao.classe;
    estado.confianca.textContent = confianca.toFixed(2);
    estado.decisao.textContent = decisao.texto;
    estado.decisao.className = 'jev-decisao jev-decisao--' + decisao.classe;
}

/**
 * Monta os controles do simulador para o tipo escolhido (Choice ou Score).
 * @param {object} estado - Estado do simulador.
 * @param {string} tipo - "choice" ou "score".
 */
function trocarTipoSimuladorJev(estado, tipo) {
    const rotulos = tipo === 'choice' ? Object.keys(estado.exemplo.choice) : estado.exemplo.score;
    estado.tipo = tipo;
    estado.rotulos = rotulos.slice(0, MAXIMO_OPCOES_SIMULADOR);
    estado.controles = estado.rotulos.map((rotulo) =>
        criarControleJev(rotulo, () => atualizarSimuladorJev(estado)));
    estado.lista.replaceChildren(...estado.controles.map((controle) => controle.linha));
    estado.botoes.forEach((botao) =>
        botao.classList.toggle('jev-aba--ativa', botao.dataset.tipo === tipo));
    atualizarSimuladorJev(estado);
}

/**
 * Liga o simulador de confiança aos elementos da página.
 * @param {string} claude - Conteúdo de CLAUDE.md (exemplo de Choice e Score).
 */
function iniciarSimuladorJev(claude) {
    const estado = {
        exemplo: lerExemploJev(claude),
        lista: document.getElementById('jevSimuladorControles'),
        resposta: document.getElementById('jevSimuladorResposta'),
        medidor: document.getElementById('jevSimuladorMedidor'),
        confianca: document.getElementById('jevSimuladorConfianca'),
        decisao: document.getElementById('jevSimuladorDecisao'),
        botoes: [...document.querySelectorAll('[data-tipo]')],
    };
    if (!estado.lista || !estado.resposta) return;

    estado.botoes.forEach((botao) =>
        botao.addEventListener('click', () => trocarTipoSimuladorJev(estado, botao.dataset.tipo)));
    trocarTipoSimuladorJev(estado, 'choice');
}

/**
 * Cria uma lista HTML a partir de itens em Markdown.
 * @param {string} tag - "ol" ou "ul".
 * @param {string} classe - Classe CSS.
 * @param {string[]} itens - Itens.
 * @returns {HTMLElement} Lista.
 */
function criarListaJev(tag, classe, itens) {
    const lista = criarElementoJev(tag, classe);
    itens.forEach((item) => lista.append(criarElementoJev('li', '', item)));
    return lista;
}

/**
 * Monta o caminho de implementação no projeto e os cuidados (CLAUDE.md, seções 3.5 e 3.6).
 * @param {HTMLElement} destino - Área da implementação.
 * @param {string} claude - Conteúdo de CLAUDE.md.
 */
function montarImplementacaoJev(destino, claude) {
    const passos = lerListaJev(obterSecaoJev(claude, TITULOS_JEV.projeto));
    const cuidados = lerListaJev(obterSecaoJev(claude, TITULOS_JEV.cuidados));
    const caminho = criarElementoJev('div', 'jev-caminho');
    PARTES_CAMINHO.forEach((parte, i) => {
        caminho.append(criarElementoJev('span', 'jev-caminho__parte', parte));
        if (i < PARTES_CAMINHO.length - 1) caminho.append(criarSetaJev());
    });
    destino.replaceChildren(caminho,
        criarElementoJev('h3', '', 'Passos'), criarListaJev('ol', 'jev-lista', passos),
        criarElementoJev('h3', '', 'Cuidados obrigatórios'),
        criarListaJev('ul', 'jev-lista jev-lista--cuidados', cuidados));
}

/**
 * Monta os cards de ideias de uso (CLAUDE.md, seção 4).
 * @param {HTMLElement} destino - Área das ideias.
 * @param {string} claude - Conteúdo de CLAUDE.md.
 */
function montarIdeiasJev(destino, claude) {
    destino.replaceChildren();
    lerTabelaJev(obterSecaoJev(claude, TITULOS_JEV.ideias)).forEach(([ideia, primitiva, nota]) => {
        const card = criarElementoJev('article', 'jev-ideia');
        card.append(criarElementoJev('span', 'jev-ideia__primitiva', primitiva),
            criarElementoJev('h3', '', ideia), criarElementoJev('p', '', nota));
        destino.append(card);
    });
}

/**
 * Mostra um dos arquivos completos na área de leitura.
 * @param {{leitura: HTMLElement, arquivos: object, abas: HTMLElement[]}} estado - Leitura.
 * @param {string} chave - "claude" ou "documentacao".
 */
function mostrarArquivoJev(estado, chave) {
    const html = window.marked.parse(estado.arquivos[chave]);
    estado.leitura.innerHTML = window.DOMPurify.sanitize(html);
    estado.abas.forEach((aba) =>
        aba.classList.toggle('jev-aba--ativa', aba.dataset.arquivo === chave));
}

/**
 * Liga as abas de leitura dos arquivos completos.
 * @param {{claude: string, documentacao: string}} arquivos - Conteúdo dos arquivos.
 */
function iniciarLeituraJev(arquivos) {
    const estado = {
        leitura: document.getElementById('jevLeitura'),
        abas: [...document.querySelectorAll('[data-arquivo]')],
        arquivos,
    };
    if (!estado.leitura) return;

    estado.abas.forEach((aba) =>
        aba.addEventListener('click', () => mostrarArquivoJev(estado, aba.dataset.arquivo)));
    mostrarArquivoJev(estado, 'documentacao');
}

/**
 * Mostra o status registrado no fim do CLAUDE.md.
 * @param {string} claude - Conteúdo de CLAUDE.md.
 */
function mostrarStatusJev(claude) {
    const status = claude.match(/^\*\*Status:\*\*(.*)$/m);
    const destino = document.getElementById('jevStatus');
    if (status && destino) destino.innerHTML = htmlInlineJev('**Status:**' + status[1]);
}

/**
 * Monta todas as seções a partir do conteúdo dos dois arquivos.
 * @param {{claude: string, documentacao: string}} arquivos - Conteúdo dos arquivos.
 */
function montarDashboardJev(arquivos) {
    mostrarStatusJev(arquivos.claude);
    montarFluxoJev(document.getElementById('jevFluxo'), arquivos.documentacao);
    montarPrimitivasJev(document.getElementById('jevPrimitivas'), arquivos);
    montarComparacaoJev(document.getElementById('jevComparacao'), arquivos.claude);
    iniciarSimuladorJev(arquivos.claude);
    montarImplementacaoJev(document.getElementById('jevImplementacao'), arquivos.claude);
    montarIdeiasJev(document.getElementById('jevIdeias'), arquivos.claude);
    iniciarLeituraJev(arquivos);
}

/**
 * Inicia o dashboard: lê os dois arquivos e monta as seções.
 */
async function iniciarDashboardJev() {
    const dados = document.body.dataset;
    const aviso = document.getElementById('jevAviso');
    try {
        const temBibliotecas = Boolean(window.marked && window.DOMPurify);
        if (!temBibliotecas) throw new Error('bibliotecas de Markdown indisponíveis');
        const [claude, documentacao] = await Promise.all([
            buscarArquivoJev(dados.claude), buscarArquivoJev(dados.documentacao)]);
        montarDashboardJev({ claude, documentacao });
        aviso.hidden = true;
    } catch (erro) {
        aviso.textContent = 'Não foi possível carregar os arquivos: ' + erro.message;
    }
}

document.addEventListener('DOMContentLoaded', iniciarDashboardJev);
