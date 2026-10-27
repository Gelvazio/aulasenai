// Dashboard do Jev (tarefa #425): desenha indicadores, gráficos SVG, terminais e estado da conexão.
// Recebe dados prontos de dashboard-dados.js e não lê rede nem disco. Texto sempre por textContent;
// os cartões das tarefas ficam em dashboard-cartoes.js.

(function definirTelaDoPainel() {
    const NAMESPACE_SVG = 'http://www.w3.org/2000/svg';
    const ID_INDICADORES = 'indicadores';
    const ID_GRAFICO_HORAS = 'grafico-horas';
    const ID_GRAFICO_LATENCIA = 'grafico-latencia';
    const ID_HISTOGRAMA = 'histograma-confianca';
    const ID_TERMINAL_CHAMADAS = 'terminal-chamadas';
    const ID_TERMINAL_MENSAGENS = 'terminal-mensagens';
    const IDS_NOS_REDE = ['no-gancho', 'no-jev', 'no-decisao'];
    const ID_ESTADO = 'estado-conexao';
    const ID_ULTIMA_LEITURA = 'ultima-leitura';
    const ID_FONTE = 'fonte-nome';
    const ID_AVISO = 'aviso-erro';
    const ESTADOS = ['ao-vivo', 'pausado', 'sem-conexao'];

    const COR_CIANO = '#00f0ff';
    const COR_MAGENTA = '#ff2bd6';
    const COR_VIOLETA = '#9d4dff';
    const COR_TEXTO = '#9fb4c9';

    const LARGURA_BARRAS = 480;
    const ALTURA_HORAS = 160;
    const ALTURA_HISTOGRAMA = 120;
    const MARGEM_X = 8;
    const MARGEM_TOPO = 14;
    const ALTURA_ROTULO = 16;
    const PROPORCAO_BARRA = 0.7;
    const PASSO_ROTULO_HORA = 3;
    const FAIXAS_CONFIANCA = 10;
    const LIMITE_LATENCIA = 60;
    const LIMITE_LINHAS_TERMINAL = 25;
    const CASAS_CUSTO = 6;
    const CASAS_TAXA = 1;
    const MS_KPI_MUDOU = 800;
    const MS_ENTRE_NOS = 200;
    const MS_NO_PULSANDO = 900;

    const ultimaChavePorTerminal = new Map();
    const indicadoresCriados = new Map();

    /**
     * Cria um elemento SVG com atributos.
     * @param {string} tag - Nome da tag SVG.
     * @param {Object} atributos - Atributos (nome → valor).
     * @param {Element} [pai] - Elemento onde anexar.
     * @returns {SVGElement} Elemento criado.
     */
    function criarSvg(tag, atributos, pai) {
        const no = document.createElementNS(NAMESPACE_SVG, tag);
        Object.entries(atributos).forEach(([nome, valor]) => no.setAttribute(nome, valor));
        if (pai) pai.append(no);
        return no;
    }

    /**
     * Cria um texto SVG.
     * @param {Element} pai - Elemento onde anexar.
     * @param {string} texto - Conteúdo (textContent).
     * @param {Object} atributos - Atributos do text.
     */
    function criarTextoSvg(pai, texto, atributos) {
        criarSvg('text', { fill: COR_TEXTO, 'font-size': 9, ...atributos }, pai).textContent = texto;
    }

    /**
     * Mostra "sem dados" no centro de um gráfico vazio.
     * @param {SVGElement} svg - Gráfico.
     * @param {number} altura - Altura do viewBox.
     */
    function desenharSemDados(svg, altura) {
        criarTextoSvg(svg, 'sem dados', {
            x: LARGURA_BARRAS / 2, y: altura / 2, 'text-anchor': 'middle', 'font-size': 11,
        });
    }

    /**
     * Cria o filtro de brilho neon do gráfico e devolve a referência a ele.
     * @param {SVGElement} svg - Gráfico.
     * @returns {string} Valor para o atributo filter.
     */
    function criarFiltroBrilho(svg) {
        const idFiltro = `brilho-${svg.id}`;
        const filtro = criarSvg('filter', { id: idFiltro }, criarSvg('defs', {}, svg));
        criarSvg('feGaussianBlur', { stdDeviation: 2, result: 'desfoque' }, filtro);
        const mistura = criarSvg('feMerge', {}, filtro);
        criarSvg('feMergeNode', { in: 'desfoque' }, mistura);
        criarSvg('feMergeNode', { in: 'SourceGraphic' }, mistura);
        return `url(#${idFiltro})`;
    }

    /**
     * Formata um instante como hora local HH:MM:SS.
     * @param {string|Date} instante - Data ISO ou Date.
     * @returns {string} Hora local (vazia se inválida).
     */
    function formatarHora(instante) {
        const data = new Date(instante);
        if (Number.isNaN(data.getTime())) return '';
        return data.toLocaleTimeString('pt-BR', { hour12: false });
    }

    /**
     * Desenha uma barra e seus rótulos.
     * @param {SVGElement} svg - Gráfico.
     * @param {Object} contexto - Medidas e opções do gráfico.
     * @param {number} indice - Posição da barra.
     */
    function desenharUmaBarra(svg, contexto, indice) {
        const valor = contexto.valores[indice];
        const altura = valor > 0 ? Math.max(2, (valor / contexto.maximo) * contexto.alturaUtil) : 1;
        const largura = contexto.espaco * PROPORCAO_BARRA;
        const x = MARGEM_X + indice * contexto.espaco + (contexto.espaco - largura) / 2;
        const y = MARGEM_TOPO + contexto.alturaUtil - altura;
        criarSvg('rect', {
            x, y, width: largura, height: altura, rx: 2, class: 'barra-neon',
            fill: contexto.cor, filter: contexto.filtro, opacity: valor > 0 ? 1 : 0.25,
        }, svg);
        const centro = x + largura / 2;
        if (valor > 0) criarTextoSvg(svg, String(valor), { x: centro, y: y - 3, 'text-anchor': 'middle' });
        const rotulo = contexto.rotulo(indice);
        const yRotulo = contexto.altura - 3;
        if (rotulo) criarTextoSvg(svg, rotulo, { x: centro, y: yRotulo, 'text-anchor': 'middle' });
    }

    /**
     * Desenha um gráfico de barras verticais.
     * @param {SVGElement} svg - Gráfico.
     * @param {number[]} valores - Altura de cada barra.
     * @param {{altura: number, cor: string, rotulo: Function}} opcoes - Aparência.
     */
    function desenharBarras(svg, valores, opcoes) {
        svg.replaceChildren();
        const contexto = {
            ...opcoes,
            valores,
            maximo: Math.max(1, ...valores),
            espaco: (LARGURA_BARRAS - 2 * MARGEM_X) / valores.length,
            alturaUtil: opcoes.altura - ALTURA_ROTULO - MARGEM_TOPO,
            filtro: criarFiltroBrilho(svg),
        };
        valores.forEach((_valor, indice) => desenharUmaBarra(svg, contexto, indice));
    }

    /**
     * Desenha as barras de chamadas por hora (24 faixas, hora local).
     * @param {number[]} faixas - 24 contagens, da mais antiga para a mais nova.
     */
    function desenharBarrasPorHora(faixas) {
        const svg = document.getElementById(ID_GRAFICO_HORAS);
        if (!svg) return;
        const agora = new Date();
        const rotulo = (indice) => {
            if (indice % PASSO_ROTULO_HORA) return '';
            const horasAtras = faixas.length - 1 - indice;
            return String(new Date(agora.getTime() - horasAtras * 3600000).getHours());
        };
        desenharBarras(svg, faixas, { altura: ALTURA_HORAS, cor: COR_CIANO, rotulo });
    }

    /**
     * Desenha o histograma de confiança (10 faixas de 0 a 1).
     * @param {number[]} faixas - 10 contagens.
     */
    function desenharHistograma(faixas) {
        const svg = document.getElementById(ID_HISTOGRAMA);
        if (!svg) return;
        const rotulo = (indice) => (indice / FAIXAS_CONFIANCA).toFixed(1);
        desenharBarras(svg, faixas, { altura: ALTURA_HISTOGRAMA, cor: COR_VIOLETA, rotulo });
    }

    /**
     * Desenha a linha de latência das últimas chamadas e a linha pontilhada da média.
     * @param {Object[]} chamadas - Linhas de chamadas.jsonl.
     */
    function desenharLatencia(chamadas) {
        const svg = document.getElementById(ID_GRAFICO_LATENCIA);
        if (!svg) return;
        svg.replaceChildren();
        const valores = chamadas.slice(-LIMITE_LATENCIA).map((linha) => linha.latencia_ms || 0);
        if (!valores.length) return desenharSemDados(svg, ALTURA_HORAS);
        const maximo = Math.max(1, ...valores);
        const alturaUtil = ALTURA_HORAS - 2 * MARGEM_TOPO;
        const passo = (LARGURA_BARRAS - 2 * MARGEM_X) / Math.max(1, valores.length - 1);
        const paraY = (valor) => MARGEM_TOPO + alturaUtil * (1 - valor / maximo);
        const pontos = valores.map((valor, i) => `${MARGEM_X + i * passo},${paraY(valor)}`);
        const media = valores.reduce((soma, valor) => soma + valor, 0) / valores.length;
        criarSvg('line', {
            x1: MARGEM_X, x2: LARGURA_BARRAS - MARGEM_X, y1: paraY(media), y2: paraY(media),
            stroke: COR_MAGENTA, 'stroke-dasharray': '4 4', class: 'linha-media',
        }, svg);
        criarSvg('polyline', {
            points: pontos.join(' '), fill: 'none', stroke: COR_CIANO, 'stroke-width': 2,
            filter: criarFiltroBrilho(svg), class: 'linha-latencia',
        }, svg);
        criarTextoSvg(svg, `máx ${Math.round(maximo)} ms · média ${Math.round(media)} ms`, {
            x: MARGEM_X, y: ALTURA_HORAS - 3,
        });
    }

    /**
     * Cria uma linha de distribuição (rótulo, barra horizontal em SVG, contagem e %).
     * @param {string} chave - Nome da categoria.
     * @param {number} quantidade - Contagem.
     * @param {number} total - Soma de todas as categorias.
     * @returns {HTMLElement} Linha pronta.
     */
    function criarLinhaDistribuicao(chave, quantidade, total) {
        const percentual = (quantidade / total) * 100;
        const linha = document.createElement('div');
        linha.className = 'distribuicao__linha';
        const rotulo = document.createElement('span');
        rotulo.className = 'distribuicao__rotulo';
        rotulo.textContent = chave;
        const trilho = document.createElement('div');
        trilho.className = `barra-dist barra-dist--${chave.toLowerCase()}`;
        const preenchimento = document.createElement('div');
        preenchimento.className = 'barra-dist__preenchimento';
        preenchimento.style.width = `${percentual}%`;
        trilho.append(preenchimento);
        const valor = document.createElement('span');
        valor.className = 'distribuicao__valor';
        valor.textContent = `${quantidade} · ${percentual.toFixed(0)}%`;
        linha.append(rotulo, trilho, valor);
        return linha;
    }

    /**
     * Desenha barras horizontais com a distribuição de categorias.
     * @param {string} idContainer - Id da div que recebe as barras.
     * @param {Map<string, number>} mapa - Categoria → quantidade.
     */
    function desenharDistribuicao(idContainer, mapa) {
        const container = document.getElementById(idContainer);
        if (!container) return;
        container.replaceChildren();
        const entradas = [...mapa.entries()].sort((a, b) => b[1] - a[1]);
        const total = entradas.reduce((soma, [, quantidade]) => soma + quantidade, 0);
        if (!total) {
            const vazio = document.createElement('p');
            vazio.className = 'distribuicao__vazio';
            vazio.textContent = 'sem dados';
            container.append(vazio);
            return;
        }
        entradas.forEach(([chave, quantidade]) => {
            container.append(criarLinhaDistribuicao(chave, quantidade, total));
        });
    }

    /**
     * Define os indicadores mostrados a partir do resumo e das mensagens.
     * @param {Object} resumo - Saída de resumirChamadas.
     * @param {{total: number}} mensagens - Total de mensagens classificadas.
     * @returns {Array<{chave: string, rotulo: string, valor: string}>} Indicadores.
     */
    function listarIndicadores(resumo, mensagens) {
        const numero = (valor) => Math.round(valor).toLocaleString('pt-BR');
        const taxa = (resumo.taxaErro * 100).toFixed(CASAS_TAXA);
        return [
            { chave: 'chamadas', rotulo: 'Chamadas', valor: numero(resumo.total) },
            { chave: 'custo', rotulo: 'Custo', valor: `US$ ${resumo.custo.toFixed(CASAS_CUSTO)}` },
            { chave: 'media', rotulo: 'Latência média', valor: `${numero(resumo.latenciaMedia)} ms` },
            { chave: 'p95', rotulo: 'Latência p95', valor: `${numero(resumo.latenciaP95)} ms` },
            { chave: 'entrada', rotulo: 'Tokens entrada', valor: numero(resumo.tokensEntrada) },
            { chave: 'saida', rotulo: 'Tokens saída', valor: numero(resumo.tokensSaida) },
            { chave: 'erros', rotulo: 'Erros', valor: `${numero(resumo.erros)} (${taxa}%)` },
            { chave: 'mensagens', rotulo: 'Mensagens', valor: numero(mensagens.total) },
        ];
    }

    /**
     * Cria o cartão de um indicador.
     * @param {HTMLElement} container - Grade de indicadores.
     * @param {Object} indicador - Chave e rótulo.
     * @returns {{cartao: HTMLElement, valor: HTMLElement}} Elementos do cartão.
     */
    function criarCartaoIndicador(container, indicador) {
        const cartao = document.createElement('div');
        cartao.className = 'kpi';
        const rotulo = document.createElement('span');
        rotulo.className = 'kpi__rotulo';
        rotulo.textContent = indicador.rotulo;
        const valor = document.createElement('span');
        valor.className = 'kpi__valor';
        cartao.append(rotulo, valor);
        container.append(cartao);
        return { cartao, valor };
    }

    /**
     * Atualiza os cartões KPI no lugar; o número que mudou pisca.
     * @param {{resumo: Object, mensagens: {total: number}}} dados - Resumo e mensagens.
     */
    function desenharIndicadores({ resumo, mensagens }) {
        const container = document.getElementById(ID_INDICADORES);
        if (!container) return;
        listarIndicadores(resumo, mensagens).forEach((indicador) => {
            if (!indicadoresCriados.has(indicador.chave)) {
                indicadoresCriados.set(indicador.chave, criarCartaoIndicador(container, indicador));
            }
            const { cartao, valor } = indicadoresCriados.get(indicador.chave);
            if (valor.textContent === indicador.valor) return;
            const eraVazio = valor.textContent === '';
            valor.textContent = indicador.valor;
            if (eraVazio) return;
            cartao.classList.add('kpi--mudou');
            setTimeout(() => cartao.classList.remove('kpi--mudou'), MS_KPI_MUDOU);
        });
    }

    /**
     * Cria uma linha de terminal com hora e campos.
     * @param {string} hora - Hora local.
     * @param {string[]} campos - Textos em sequência.
     * @param {boolean} ehErro - Se é linha de erro (magenta).
     * @returns {HTMLElement} Item da lista.
     */
    function criarLinhaTerminal(hora, campos, ehErro) {
        const item = document.createElement('li');
        item.className = ehErro ? 'linha linha--erro' : 'linha';
        const horario = document.createElement('span');
        horario.className = 'linha__hora';
        horario.textContent = hora;
        item.append(horario);
        campos.filter(Boolean).forEach((campo) => {
            const trecho = document.createElement('span');
            trecho.className = 'linha__campo';
            trecho.textContent = campo;
            item.append(trecho);
        });
        return item;
    }

    /**
     * Redesenha um terminal com as últimas linhas (mais nova no topo) e marca as novas.
     * @param {string} idLista - Id da ul.
     * @param {Object[]} linhas - Registros em ordem cronológica.
     * @param {{chaveDe: Function, camposDe: Function, ehErro: Function}} formato - Como mostrar.
     */
    function desenharTerminal(idLista, linhas, formato) {
        const lista = document.getElementById(idLista);
        if (!lista) return;
        const recentes = linhas.slice(-LIMITE_LINHAS_TERMINAL).reverse();
        const chaves = recentes.map(formato.chaveDe);
        const ultima = ultimaChavePorTerminal.get(idLista);
        const indice = chaves.indexOf(ultima);
        const novas = ultima === undefined ? 0 : (indice === -1 ? chaves.length : indice);
        lista.replaceChildren(...recentes.map((registro, posicao) => {
            const item = criarLinhaTerminal(
                formatarHora(registro.data), formato.camposDe(registro), formato.ehErro(registro),
            );
            if (posicao < novas) item.classList.add('linha--nova');
            return item;
        }));
        ultimaChavePorTerminal.set(idLista, chaves.length ? chaves[0] : ultima ?? null);
    }

    /**
     * Mostra as últimas chamadas à API do Jev no terminal.
     * @param {Object[]} chamadas - Linhas de chamadas.jsonl.
     */
    function desenharTerminalChamadas(chamadas) {
        desenharTerminal(ID_TERMINAL_CHAMADAS, chamadas, {
            chaveDe: (linha) => `${linha.data}|${linha.id}`,
            ehErro: (linha) => linha.situacao !== 'ok',
            camposDe: (linha) => [
                linha.acao, linha.modelo_resposta,
                `${linha.tokens_entrada || 0}/${linha.tokens_saida || 0} tok`,
                `${linha.latencia_ms || 0} ms`, `US$ ${(linha.custo_usd || 0).toFixed(CASAS_CUSTO)}`,
                linha.situacao === 'ok' ? 'ok' : `${linha.situacao} ${linha.erro_codigo || ''}`.trim(),
            ],
        });
    }

    /**
     * Mostra as últimas mensagens classificadas no terminal.
     * @param {Object[]} mensagens - Linhas de mensagens-AAAA-MM.jsonl.
     */
    function desenharTerminalMensagens(mensagens) {
        desenharTerminal(ID_TERMINAL_MENSAGENS, mensagens, {
            chaveDe: (linha) => `${linha.data}|${linha.hash}`,
            ehErro: (linha) => Boolean(linha.situacao) && linha.situacao !== 'ok',
            camposDe: (linha) => [
                linha.pulado ? `pulada ${linha.motivo || ''}`.trim() : linha.decisao,
                linha.nivel,
                typeof linha.confianca === 'number' ? `conf ${linha.confianca.toFixed(2)}` : '',
                linha.latencia_ms ? `${linha.latencia_ms} ms` : '',
                linha.acao, linha.projeto,
            ],
        });
    }

    /**
     * Delega o desenho dos cartões ao módulo de cartões.
     * @param {{subtarefas: Object[], maes: Object[]}} quadro - Saída de lerQuadro.
     */
    function desenharCartoes(quadro) {
        const cartoes = window.PainelJev.cartoes;
        if (cartoes) cartoes.desenhar(quadro);
    }

    /**
     * Faz os nós da rede brilharem em sequência (gancho, Jev, decisão).
     */
    function pulsarRede() {
        IDS_NOS_REDE.forEach((id, posicao) => {
            const no = document.getElementById(id);
            if (!no) return;
            setTimeout(() => no.classList.add('no--pulsando'), posicao * MS_ENTRE_NOS);
            setTimeout(() => no.classList.remove('no--pulsando'),
                posicao * MS_ENTRE_NOS + MS_NO_PULSANDO);
        });
    }

    /**
     * Mostra o estado da conexão, a última leitura e o nome da fonte.
     * @param {{estado: string, texto: string, ultimaLeitura: (string|Date), fonte: string}} dados
     */
    function mostrarEstado({ estado, texto, ultimaLeitura, fonte }) {
        const indicador = document.getElementById(ID_ESTADO);
        if (indicador) {
            ESTADOS.forEach((nome) => indicador.classList.remove(`estado-conexao--${nome}`));
            if (ESTADOS.includes(estado)) indicador.classList.add(`estado-conexao--${estado}`);
            const campoTexto = indicador.querySelector('.texto');
            if (campoTexto) campoTexto.textContent = texto || '';
        }
        const leitura = document.getElementById(ID_ULTIMA_LEITURA);
        if (leitura && ultimaLeitura) leitura.textContent = formatarHora(ultimaLeitura);
        const nomeFonte = document.getElementById(ID_FONTE);
        if (nomeFonte && fonte) nomeFonte.textContent = fonte;
    }

    /**
     * Mostra ou esconde o aviso de erro/orientação.
     * @param {string|null} texto - Mensagem; vazio ou null esconde.
     */
    function mostrarAviso(texto) {
        const aviso = document.getElementById(ID_AVISO);
        if (!aviso) return;
        aviso.textContent = texto || '';
        aviso.hidden = !texto;
    }

    window.PainelJev = window.PainelJev || {};
    window.PainelJev.tela = {
        desenharIndicadores, desenharBarrasPorHora, desenharLatencia, desenharDistribuicao,
        desenharHistograma, desenharTerminalChamadas, desenharTerminalMensagens,
        desenharCartoes, pulsarRede, mostrarEstado, mostrarAviso,
    };
})();
