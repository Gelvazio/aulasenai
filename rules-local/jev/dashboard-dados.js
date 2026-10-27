// Dashboard do Jev (tarefa #425): funções puras que transformam os logs e o quadro em números.
// Lê o texto de saidas/chamadas.jsonl, saidas/mensagens-AAAA-MM.jsonl e tasks/STATUS.md (formato
// simplificado) e devolve estruturas prontas para desenhar. Não acessa rede, disco nem DOM.
// Os logs guardam só metadados (nunca o texto das mensagens).

(function definirDadosDoPainel() {
    const HORAS_NO_DIA = 24;
    const MS_POR_HORA = 3600000;
    const FAIXAS_CONFIANCA = 10;
    const PERCENTIL_LATENCIA = 0.95;
    const NIVEL_A_CLASSIFICAR = 'A CLASSIFICAR';
    const SEPARADOR_QUADRO = ' · ';

    /**
     * Converte o texto de um arquivo JSONL em objetos, ignorando linhas inválidas.
     * @param {string} texto - Conteúdo do arquivo.
     * @returns {Object[]} Linhas lidas, na ordem do arquivo.
     */
    function lerJsonl(texto) {
        const linhas = [];
        (texto || '').split('\n').forEach((linha) => {
            if (!linha.trim()) return;
            try {
                linhas.push(JSON.parse(linha));
            } catch (erro) {
                // linha cortada no meio da gravação: a próxima leitura traz inteira
            }
        });
        return linhas;
    }

    /**
     * Mantém só as linhas do período escolhido.
     * @param {Object[]} linhas - Linhas com o campo data (ISO).
     * @param {string} periodo - "hoje", "24h" ou "tudo".
     * @param {Date} agora - Momento atual.
     * @returns {Object[]} Linhas do período.
     */
    function filtrarPorPeriodo(linhas, periodo, agora) {
        if (periodo === 'tudo') return linhas;
        const inicio = periodo === '24h'
            ? agora.getTime() - HORAS_NO_DIA * MS_POR_HORA
            : new Date(agora.getFullYear(), agora.getMonth(), agora.getDate()).getTime();
        return linhas.filter((linha) => new Date(linha.data).getTime() >= inicio);
    }

    /**
     * Calcula o percentil de uma lista de números.
     * @param {number[]} valores - Números (qualquer ordem).
     * @param {number} fracao - Percentil de 0 a 1.
     * @returns {number} Valor do percentil (0 sem dados).
     */
    function calcularPercentil(valores, fracao) {
        if (!valores.length) return 0;
        const ordenados = [...valores].sort((a, b) => a - b);
        return ordenados[Math.min(ordenados.length - 1, Math.floor(ordenados.length * fracao))];
    }

    /**
     * Resume as chamadas à API do Jev.
     * @param {Object[]} chamadas - Linhas de chamadas.jsonl.
     * @returns {Object} total, custo, tokens, latência (média e p95) e erros.
     */
    function resumirChamadas(chamadas) {
        const soma = (campo) => chamadas.reduce((total, linha) => total + (linha[campo] || 0), 0);
        const latencias = chamadas.map((linha) => linha.latencia_ms || 0);
        const erros = chamadas.filter((linha) => linha.situacao !== 'ok').length;
        return {
            total: chamadas.length, custo: soma('custo_usd'),
            tokensEntrada: soma('tokens_entrada'), tokensSaida: soma('tokens_saida'),
            latenciaMedia: chamadas.length ? soma('latencia_ms') / chamadas.length : 0,
            latenciaP95: calcularPercentil(latencias, PERCENTIL_LATENCIA),
            erros, taxaErro: chamadas.length ? erros / chamadas.length : 0,
        };
    }

    /**
     * Conta as chamadas em cada uma das últimas 24 horas (índice 23 = hora atual).
     * @param {Object[]} chamadas - Linhas de chamadas.jsonl.
     * @param {Date} agora - Momento atual.
     * @returns {number[]} 24 contagens, da mais antiga para a mais nova.
     */
    function contarPorHora(chamadas, agora) {
        const faixas = new Array(HORAS_NO_DIA).fill(0);
        chamadas.forEach((linha) => {
            const horasAtras = Math.floor((agora - new Date(linha.data)) / MS_POR_HORA);
            const dentro = horasAtras >= 0 && horasAtras < HORAS_NO_DIA;
            if (dentro) faixas[HORAS_NO_DIA - 1 - horasAtras] += 1;
        });
        return faixas;
    }

    /**
     * Conta quantas linhas têm cada valor de um campo.
     * @param {Object[]} linhas - Linhas.
     * @param {string} campo - Nome do campo.
     * @returns {Map<string, number>} Valor → quantidade.
     */
    function contarPor(linhas, campo) {
        const contagem = new Map();
        linhas.forEach((linha) => {
            const valor = String(linha[campo] ?? '—');
            contagem.set(valor, (contagem.get(valor) || 0) + 1);
        });
        return contagem;
    }

    /**
     * Distribui a confiança das mensagens em 10 faixas (0–0,1 … 0,9–1).
     * @param {Object[]} mensagens - Linhas de mensagens-AAAA-MM.jsonl.
     * @returns {number[]} 10 contagens.
     */
    function histogramaConfianca(mensagens) {
        const faixas = new Array(FAIXAS_CONFIANCA).fill(0);
        mensagens.filter((linha) => typeof linha.confianca === 'number').forEach((linha) => {
            faixas[Math.min(FAIXAS_CONFIANCA - 1, Math.floor(linha.confianca * FAIXAS_CONFIANCA))] += 1;
        });
        return faixas;
    }

    /**
     * Lê o nível, o esforço, o modelo e a reserva de uma linha do quadro. O separador " · "
     * também aparece dentro do nível e da reserva, por isso cada dado é achado por padrão.
     * @param {string} texto - Linha do quadro depois do "—".
     * @returns {{nivel: string, effort: string, modelo: string, reserva: string}} Dados da linha.
     */
    function lerDetalhesDaSubtarefa(texto) {
        const nivel = texto.match(/`(\w+)\s*·\s*effort\s*(\w+)`/);
        const modelo = texto.match(/ só (.+?)(?= · |$)/);
        const reserva = texto.match(/((?:Claude Code|Gemini CLI|Grok|DeepSeek|Codex|Cursor|Qoder|Devin|Copilot|Antigravity|OpenCode)[^`]*?\(desde [^)]*\))/);
        return {
            nivel: nivel ? nivel[1] : NIVEL_A_CLASSIFICAR,
            effort: nivel ? nivel[2] : '',
            modelo: modelo ? modelo[1].replace(/\)$/, '').trim() : '',
            reserva: reserva ? reserva[1] : '',
        };
    }

    /**
     * Lê uma linha do quadro (mãe ou subtarefa) no formato simplificado.
     * @param {string} linha - Linha do tasks/STATUS.md.
     * @returns {Object|null} Item com id, titulo, status e detalhes; null se não for item.
     */
    function lerLinhaDoQuadro(linha) {
        const achou = linha.match(/^(\s*)- #(\d+(?:\.\d+)?)[-\w]*\s+—\s+(.+)$/);
        if (!achou) return null;
        const partes = achou[3].split(SEPARADOR_QUADRO);
        const titulo = partes[0].replace(/^\[(.+?)\]\(.*\)$/, '$1');
        const ehSubtarefa = achou[2].includes('.');
        const status = (partes[1] || '').trim();
        const detalhes = lerDetalhesDaSubtarefa(achou[3]);
        if (!ehSubtarefa && /\(não reservável\)/.test(achou[3])) detalhes.reserva = '';
        return { id: achou[2], titulo, status, ehSubtarefa, ...detalhes };
    }

    /**
     * Lê as tarefas abertas do quadro: cada subtarefa vira um item com nível e status.
     * @param {string} texto - Conteúdo de tasks/STATUS.md.
     * @returns {{subtarefas: Object[], maes: Object[]}} Itens abertos do quadro.
     */
    function lerQuadro(texto) {
        const resultado = { subtarefas: [], maes: [] };
        let dentro = false;
        (texto || '').split(/\r?\n/).forEach((linha) => {
            if (/^## /.test(linha)) dentro = /^## Tarefas/.test(linha);
            const item = dentro ? lerLinhaDoQuadro(linha) : null;
            if (!item) return;
            (item.ehSubtarefa ? resultado.subtarefas : resultado.maes).push(item);
        });
        return resultado;
    }

    window.PainelJev = window.PainelJev || {};
    window.PainelJev.dados = {
        lerJsonl, filtrarPorPeriodo, resumirChamadas, contarPorHora, contarPor,
        histogramaConfianca, lerQuadro, NIVEL_A_CLASSIFICAR, HORAS_NO_DIA,
    };
})();
