// Dashboard do Jev (tarefa #425): orquestração. Lê pela fonte a cada 3 s, calcula com
// PainelJev.dados e desenha com PainelJev.tela. Não mexe em gráficos nem em cartões diretamente.

(function iniciarPainelDoJev() {
    const INTERVALO_CICLO_MS = 3000;
    const PERIODO_PADRAO = 'hoje';
    const ESTADO_AO_VIVO = 'ao-vivo';
    const ESTADO_PAUSADO = 'pausado';
    const ESTADO_SEM_CONEXAO = 'sem-conexao';
    const TEXTO_AO_VIVO = 'AO VIVO';
    const TEXTO_PAUSADO = 'PAUSADO';
    const TEXTO_SEM_CONEXAO = 'SEM CONEXÃO';
    const TEXTO_BOTAO_PAUSAR = 'PAUSAR';
    const TEXTO_BOTAO_RETOMAR = 'RETOMAR';
    const NOME_SEM_FONTE = '—';
    const CLASSE_FILTRO_ATIVO = 'filtro--ativo';
    const AVISO_ARQUIVO_LOCAL = 'Esta página foi aberta direto do disco. Abra pelo Live Server '
        + 'ou clique em "Conectar pasta" e escolha a pasta do projeto.';
    const AVISO_FALHA_LEITURA = 'Não foi possível ler os dados: ';
    const AVISO_FALHA_PASTA = 'Não foi possível conectar a pasta: ';

    const estado = {
        periodo: PERIODO_PADRAO,
        pausado: false,
        fonte: null,
        textos: null,
        chamadasVistas: null,
        cicloAtivo: false,
    };

    /**
     * Busca um elemento do painel pelo id.
     * @param {string} id - Id do elemento.
     * @returns {HTMLElement|null} Elemento encontrado.
     */
    function obterElemento(id) {
        return document.getElementById(id);
    }

    /**
     * Mostra o estado da conexão no cabeçalho.
     * @param {string} situacao - ao-vivo, pausado ou sem-conexao.
     * @param {string} texto - Texto do estado.
     * @returns {void}
     */
    function informarEstado(situacao, texto) {
        window.PainelJev.tela.mostrarEstado({
            estado: situacao,
            texto,
            ultimaLeitura: new Date(),
            fonte: estado.fonte ? estado.fonte.nome : NOME_SEM_FONTE,
        });
    }

    /**
     * Calcula tudo a partir dos textos lidos e desenha o painel.
     * @param {{chamadas: string, mensagens: string, quadro: string}} textos - Textos lidos.
     * @returns {number} Quantidade de chamadas existentes no log (sem filtro de período).
     */
    function desenharPainel(textos) {
        const { dados, tela } = window.PainelJev;
        const agora = new Date();
        const todasChamadas = dados.lerJsonl(textos.chamadas);
        const chamadas = dados.filtrarPorPeriodo(todasChamadas, estado.periodo, agora);
        const mensagens = dados.filtrarPorPeriodo(dados.lerJsonl(textos.mensagens),
            estado.periodo, agora);

        tela.desenharIndicadores({
            resumo: dados.resumirChamadas(chamadas),
            mensagens: { total: mensagens.length, porNivel: dados.contarPor(mensagens, 'nivel') },
        });
        tela.desenharBarrasPorHora(dados.contarPorHora(chamadas, agora));
        tela.desenharLatencia(chamadas);
        tela.desenharDistribuicao('distribuicao-nivel', dados.contarPor(mensagens, 'nivel'));
        tela.desenharDistribuicao('distribuicao-decisao', dados.contarPor(mensagens, 'decisao'));
        tela.desenharHistograma(dados.histogramaConfianca(mensagens));
        tela.desenharTerminalChamadas(chamadas);
        tela.desenharTerminalMensagens(mensagens);
        tela.desenharCartoes(dados.lerQuadro(textos.quadro));
        return todasChamadas.length;
    }

    /**
     * Pulsa a rede quando o log ganhou chamadas desde o ciclo anterior.
     * @param {number} total - Quantidade atual de chamadas no log.
     * @returns {void}
     */
    function registrarChamadasVistas(total) {
        const chegaramNovas = estado.chamadasVistas !== null && total > estado.chamadasVistas;
        estado.chamadasVistas = total;
        if (chegaramNovas) window.PainelJev.tela.pulsarRede();
    }

    /**
     * Lê os dados uma vez e redesenha se houve mudança.
     * @returns {Promise<void>}
     * @throws {Error} Quando a leitura falha.
     */
    async function lerEAtualizar() {
        const leitura = await window.PainelJev.fonte.lerTudo(estado.fonte);
        const primeiraLeitura = estado.textos === null;
        estado.textos = leitura;
        if (leitura.mudou || primeiraLeitura) registrarChamadasVistas(desenharPainel(leitura));
        window.PainelJev.tela.mostrarAviso(null);
        informarEstado(ESTADO_AO_VIVO, TEXTO_AO_VIVO);
    }

    /**
     * Executa um ciclo de leitura, tratando pausa e erro, e agenda o próximo.
     * @returns {Promise<void>}
     */
    async function executarCiclo() {
        try {
            if (estado.pausado) informarEstado(ESTADO_PAUSADO, TEXTO_PAUSADO);
            else await lerEAtualizar();
        } catch (erro) {
            informarEstado(ESTADO_SEM_CONEXAO, TEXTO_SEM_CONEXAO);
            window.PainelJev.tela.mostrarAviso(AVISO_FALHA_LEITURA + erro.message);
        }
        window.setTimeout(executarCiclo, INTERVALO_CICLO_MS);
    }

    /**
     * Começa o ciclo de leitura com a fonte escolhida (só uma vez).
     * @param {Object} fonte - Fonte de leitura.
     * @returns {void}
     */
    function iniciarComFonte(fonte) {
        estado.fonte = fonte;
        estado.textos = null;
        estado.chamadasVistas = null;
        if (estado.cicloAtivo) return;
        estado.cicloAtivo = true;
        executarCiclo();
    }

    /**
     * Marca visualmente o botão de período ativo.
     * @param {HTMLElement[]} botoes - Botões de período.
     * @returns {void}
     */
    function marcarFiltroAtivo(botoes) {
        botoes.forEach((botao) => {
            const ativo = botao.dataset.periodo === estado.periodo;
            botao.setAttribute('aria-pressed', String(ativo));
            botao.classList.toggle(CLASSE_FILTRO_ATIVO, ativo);
        });
    }

    /**
     * Liga os botões de período: trocam o filtro e redesenham com os últimos textos.
     * @returns {void}
     */
    function ligarFiltrosDePeriodo() {
        const botoes = [...document.querySelectorAll('#filtros-periodo button[data-periodo]')];
        marcarFiltroAtivo(botoes);
        botoes.forEach((botao) => {
            botao.addEventListener('click', () => {
                estado.periodo = botao.dataset.periodo;
                marcarFiltroAtivo(botoes);
                if (estado.textos) desenharPainel(estado.textos);
            });
        });
    }

    /**
     * Liga o botão que pausa e retoma a leitura.
     * @returns {void}
     */
    function ligarBotaoPausar() {
        const botao = obterElemento('botao-pausar');
        if (!botao) return;
        botao.addEventListener('click', () => {
            estado.pausado = !estado.pausado;
            botao.setAttribute('aria-pressed', String(estado.pausado));
            botao.textContent = estado.pausado ? TEXTO_BOTAO_RETOMAR : TEXTO_BOTAO_PAUSAR;
            if (estado.pausado) informarEstado(ESTADO_PAUSADO, TEXTO_PAUSADO);
        });
    }

    /**
     * Pede a pasta do projeto ao usuário e inicia a leitura por ela.
     * @param {HTMLElement} botao - Botão de conectar pasta.
     * @returns {Promise<void>}
     */
    async function conectarEIniciar(botao) {
        try {
            const fonte = await window.PainelJev.fonte.conectarPasta();
            botao.hidden = true;
            window.PainelJev.tela.mostrarAviso(null);
            iniciarComFonte(fonte);
        } catch (erro) {
            window.PainelJev.tela.mostrarAviso(AVISO_FALHA_PASTA + erro.message);
        }
    }

    /**
     * Prepara a abertura por arquivo local: mostra o botão e o aviso e espera o clique.
     * @returns {void}
     */
    function prepararArquivoLocal() {
        const botao = obterElemento('botao-conectar-pasta');
        informarEstado(ESTADO_SEM_CONEXAO, TEXTO_SEM_CONEXAO);
        window.PainelJev.tela.mostrarAviso(AVISO_ARQUIVO_LOCAL);
        if (!botao) return;
        botao.hidden = false;
        botao.addEventListener('click', () => conectarEIniciar(botao));
    }

    /**
     * Inicializa o painel quando a página termina de carregar.
     * @returns {void}
     */
    function iniciar() {
        ligarFiltrosDePeriodo();
        ligarBotaoPausar();
        const { fonte } = window.PainelJev;
        if (fonte.estaEmArquivoLocal()) prepararArquivoLocal();
        else iniciarComFonte(fonte.criarFontePorServidor());
    }

    document.addEventListener('DOMContentLoaded', iniciar);
})();
