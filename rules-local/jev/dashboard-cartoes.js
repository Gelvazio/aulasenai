// Dashboard do Jev (tarefa #425): cartões das tarefas do quadro, separados em colunas por nível.
// Reconcilia pelo id: cria, move, atualiza e remove cartões sem recriar a lista inteira, e marca
// cada mudança com uma classe de animação. Usa só textContent (nunca innerHTML).

(function definirCartoesDoPainel() {
    const ID_CONTAINER = 'colunas-cartoes';
    const NIVEL_PADRAO = 'A CLASSIFICAR';
    const MS_ENTRADA = 900;
    const MS_MUDANCA = 1200;
    const MS_SAIDA = 600;
    const ROTULO_STATUS = {
        '⬜': { classe: 'pendente', texto: 'pendente' },
        '🔄': { classe: 'andamento', texto: 'em andamento' },
        '👀': { classe: 'aguardando', texto: 'aguardando' },
        '⛔': { classe: 'bloqueado', texto: 'bloqueado' },
    };

    const cartoesPorId = new Map();
    let primeiraRenderizacao = true;

    /**
     * Cria um elemento com classe e texto.
     * @param {string} tag - Nome da tag.
     * @param {string} classe - Classe CSS.
     * @param {string} texto - Texto (textContent).
     * @returns {HTMLElement} Elemento criado.
     */
    function criarElemento(tag, classe, texto) {
        const elemento = document.createElement(tag);
        elemento.className = classe;
        elemento.textContent = texto;
        return elemento;
    }

    /**
     * Aplica uma classe de animação e a remove depois de um tempo.
     * @param {HTMLElement} elemento - Cartão.
     * @param {string} classe - Classe temporária.
     * @param {number} milissegundos - Duração.
     */
    function aplicarClasseTemporaria(elemento, classe, milissegundos) {
        elemento.classList.remove(classe);
        void elemento.offsetWidth;
        elemento.classList.add(classe);
        setTimeout(() => elemento.classList.remove(classe), milissegundos);
    }

    /**
     * Monta o chip de status a partir do texto do quadro (começa com o emoji).
     * @param {string} status - Status da linha do quadro.
     * @returns {HTMLElement} Chip de status.
     */
    function criarChipStatus(status) {
        const emoji = Object.keys(ROTULO_STATUS).find((chave) => status.startsWith(chave));
        if (!emoji) return criarElemento('span', 'chip', status);
        const { classe, texto } = ROTULO_STATUS[emoji];
        return criarElemento('span', `chip chip--${classe}`, `${emoji} ${texto}`);
    }

    /**
     * Preenche (ou atualiza no lugar) o conteúdo de um cartão.
     * @param {HTMLElement} cartao - Elemento article do cartão.
     * @param {Object} item - Subtarefa ou mãe do quadro.
     */
    function preencherCartao(cartao, item) {
        const rodape = criarElemento('div', 'cartao__rodape', '');
        rodape.append(criarChipStatus(item.status || ''));
        if (item.effort) rodape.append(criarElemento('span', 'cartao__effort', item.effort));
        if (item.modelo) rodape.append(criarElemento('span', 'cartao__modelo', item.modelo));
        cartao.replaceChildren(
            criarElemento('div', 'cartao__id', `#${item.id}`),
            criarElemento('div', 'cartao__titulo', item.titulo || ''),
            rodape,
        );
        if (item.reserva) {
            cartao.append(criarElemento('div', 'cartao__reserva', `em uso por ${item.reserva}`));
        }
        cartao.classList.toggle('cartao--em-uso', Boolean(item.reserva));
    }

    /**
     * Junta subtarefas e mães que não têm nenhuma subtarefa.
     * @param {{subtarefas: Object[], maes: Object[]}} quadro - Saída de lerQuadro.
     * @returns {Object[]} Itens que viram cartão.
     */
    function listarItens(quadro) {
        const maesSemFilhas = quadro.maes.filter((mae) => {
            return !quadro.subtarefas.some((sub) => sub.id.startsWith(`${mae.id}.`));
        });
        return [...quadro.subtarefas, ...maesSemFilhas];
    }

    /**
     * Acha a lista da coluna de um nível (coluna "A CLASSIFICAR" se o nível for desconhecido).
     * @param {string} nivel - Nível do item.
     * @returns {HTMLElement|null} Div da lista de cartões.
     */
    function obterListaDaColuna(nivel) {
        const container = document.getElementById(ID_CONTAINER);
        if (!container) return null;
        const colunas = [...container.querySelectorAll('.coluna-cartoes')];
        const coluna = colunas.find((candidata) => candidata.dataset.nivel === nivel)
            || colunas.find((candidata) => candidata.dataset.nivel === NIVEL_PADRAO);
        return coluna ? coluna.querySelector('.coluna-cartoes__lista') : null;
    }

    /**
     * Cria o cartão de um item novo e o coloca na coluna.
     * @param {Object} item - Item do quadro.
     * @param {HTMLElement} lista - Lista da coluna.
     * @returns {HTMLElement} Cartão criado.
     */
    function criarCartao(item, lista) {
        const cartao = document.createElement('article');
        cartao.className = 'cartao';
        cartao.dataset.id = item.id;
        preencherCartao(cartao, item);
        lista.append(cartao);
        if (!primeiraRenderizacao) aplicarClasseTemporaria(cartao, 'cartao--novo', MS_ENTRADA);
        return cartao;
    }

    /**
     * Atualiza um cartão existente: move de coluna e/ou reescreve se algo mudou.
     * @param {Object} registro - {cartao, assinatura} guardado do cartão.
     * @param {Object} item - Item atual do quadro.
     * @param {HTMLElement} lista - Lista da coluna de destino.
     */
    function atualizarCartao(registro, item, lista) {
        const assinatura = JSON.stringify([item.nivel, item.status, item.reserva, item.titulo]);
        const mudouDeColuna = registro.cartao.parentElement !== lista;
        if (assinatura === registro.assinatura && !mudouDeColuna) return;
        preencherCartao(registro.cartao, item);
        if (mudouDeColuna) lista.append(registro.cartao);
        registro.assinatura = assinatura;
        aplicarClasseTemporaria(registro.cartao, 'cartao--mudou', MS_MUDANCA);
    }

    /**
     * Remove os cartões cujo id saiu do quadro, depois da animação de saída.
     * @param {Set<string>} idsAtuais - Ids que continuam no quadro.
     */
    function removerAusentes(idsAtuais) {
        [...cartoesPorId.keys()].filter((id) => !idsAtuais.has(id)).forEach((id) => {
            const { cartao } = cartoesPorId.get(id);
            cartoesPorId.delete(id);
            cartao.classList.add('cartao--saindo');
            setTimeout(() => cartao.remove(), MS_SAIDA);
        });
    }

    /**
     * Atualiza o número de cartões de cada coluna.
     */
    function atualizarContagens() {
        const container = document.getElementById(ID_CONTAINER);
        if (!container) return;
        container.querySelectorAll('.coluna-cartoes').forEach((coluna) => {
            const total = coluna.querySelectorAll('.cartao:not(.cartao--saindo)').length;
            const contagem = coluna.querySelector('.coluna-cartoes__contagem');
            if (contagem) contagem.textContent = String(total);
        });
    }

    /**
     * Reconcilia os cartões da tela com o quadro, pelo id.
     * @param {{subtarefas: Object[], maes: Object[]}} quadro - Saída de lerQuadro.
     */
    function desenhar(quadro) {
        if (!document.getElementById(ID_CONTAINER)) return;
        const itens = listarItens(quadro || { subtarefas: [], maes: [] });
        itens.forEach((item) => {
            const lista = obterListaDaColuna(item.nivel);
            if (!lista) return;
            const registro = cartoesPorId.get(item.id);
            if (registro) return atualizarCartao(registro, item, lista);
            const cartao = criarCartao(item, lista);
            const assinatura = JSON.stringify([item.nivel, item.status, item.reserva, item.titulo]);
            cartoesPorId.set(item.id, { cartao, assinatura });
        });
        removerAusentes(new Set(itens.map((item) => item.id)));
        atualizarContagens();
        primeiraRenderizacao = false;
    }

    window.PainelJev = window.PainelJev || {};
    window.PainelJev.cartoes = { desenhar };
})();
