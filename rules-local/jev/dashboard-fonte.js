// Dashboard do Jev (tarefa #425): leitura dos logs e do quadro.
// Duas fontes com a mesma interface: servidor local (fetch) ou pasta do projeto conectada pelo
// usuário (File System Access API, para quando a página abre por file://). Só lê, nunca grava.

(function definirFonteDoPainel() {
    const PREFIXO_RAIZ = '../../';
    const CAMINHO_CHAMADAS = 'rules-local/jev/saidas/chamadas.jsonl';
    const PREFIXO_MENSAGENS = 'rules-local/jev/saidas/mensagens-';
    const SUFIXO_MENSAGENS = '.jsonl';
    const CAMINHO_QUADRO = 'tasks/STATUS.md';
    const ASSINATURA_AUSENTE = 'ausente';
    const STATUS_NAO_ENCONTRADO = 404;
    const NOME_FONTE_SERVIDOR = 'servidor';
    const NOME_FONTE_PASTA = 'pasta do projeto';
    const ERRO_PASTA_SEM_ARQUIVO = ['NotFoundError', 'TypeMismatchError'];
    const ERRO_SEM_SUPORTE = 'Este navegador não permite conectar uma pasta. Use o Live Server.';

    const ultimosTextos = new Map();

    /**
     * Informa se a página foi aberta direto do disco (file://).
     * @returns {boolean} true quando o protocolo é file:.
     */
    function estaEmArquivoLocal() {
        return window.location.protocol === 'file:';
    }

    /**
     * Diz se a assinatura é igual à já vista para o caminho.
     * @param {Map<string, string>} assinaturas - Assinaturas guardadas por caminho.
     * @param {string} caminho - Caminho do arquivo.
     * @param {string|null} assinatura - Assinatura atual (null = desconhecida).
     * @returns {boolean} true se nada mudou desde a leitura anterior.
     */
    function ehIgualALeituraAnterior(assinaturas, caminho, assinatura) {
        if (assinatura === null) return false;
        return assinaturas.get(caminho) === assinatura;
    }

    /**
     * Monta a assinatura de um arquivo servido pelo servidor, a partir dos cabeçalhos.
     * @param {Response} resposta - Resposta HTTP.
     * @returns {string} Tamanho e data de modificação juntos.
     */
    function assinarResposta(resposta) {
        const tamanho = resposta.headers.get('content-length') || '';
        const modificado = resposta.headers.get('last-modified') || '';
        return tamanho + '|' + modificado;
    }

    /**
     * Consulta só os cabeçalhos do arquivo (HEAD).
     * @param {string} url - Endereço do arquivo.
     * @returns {Promise<string|null>} Assinatura, "ausente" se 404, ou null se HEAD não vale.
     */
    async function consultarAssinatura(url) {
        const resposta = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (resposta.status === STATUS_NAO_ENCONTRADO) return ASSINATURA_AUSENTE;
        if (!resposta.ok) return null;
        const assinatura = assinarResposta(resposta);
        return assinatura === '|' ? null : assinatura;
    }

    /**
     * Baixa o arquivo inteiro do servidor.
     * @param {string} url - Endereço do arquivo.
     * @returns {Promise<{ausente: boolean, texto: string}>} Texto lido; ausente se 404.
     * @throws {Error} Quando o servidor responde com erro diferente de 404.
     */
    async function baixarTexto(url) {
        const resposta = await fetch(url, { cache: 'no-store' });
        if (resposta.status === STATUS_NAO_ENCONTRADO) return { ausente: true, texto: '' };
        if (!resposta.ok) {
            throw new Error('Falha ao ler ' + url + ' (HTTP ' + resposta.status + ')');
        }
        return { ausente: false, texto: await resposta.text() };
    }

    /**
     * Cria a fonte que lê os arquivos pelo servidor local.
     * @returns {{nome: string, lerSeMudou: function(string): Promise<Object>}} Fonte de leitura.
     */
    function criarFontePorServidor() {
        const assinaturas = new Map();
        let aceitaHead = true;

        /**
         * Lê o arquivo só se ele mudou desde a leitura anterior.
         * @param {string} caminho - Caminho relativo à raiz do projeto.
         * @returns {Promise<{mudou: boolean, texto?: string}>} Resultado da leitura.
         */
        async function lerSeMudou(caminho) {
            const url = PREFIXO_RAIZ + caminho;
            const consultada = aceitaHead ? await consultarAssinatura(url) : null;
            if (aceitaHead && consultada === null) aceitaHead = false;
            if (ehIgualALeituraAnterior(assinaturas, caminho, consultada)) return { mudou: false };

            const { ausente, texto } = await baixarTexto(url);
            if (ausente) assinaturas.set(caminho, ASSINATURA_AUSENTE);
            else if (consultada !== null) assinaturas.set(caminho, consultada);
            return { mudou: true, texto };
        }

        return { nome: NOME_FONTE_SERVIDOR, lerSeMudou };
    }

    /**
     * Procura um arquivo dentro da pasta conectada, seguindo o caminho por partes.
     * @param {FileSystemDirectoryHandle} raiz - Pasta raiz do projeto.
     * @param {string} caminho - Caminho relativo com "/".
     * @returns {Promise<File|null>} Arquivo, ou null se não existir.
     * @throws {Error} Erros diferentes de "não encontrado".
     */
    async function abrirArquivoDaPasta(raiz, caminho) {
        const partes = caminho.split('/');
        const nomeArquivo = partes.pop();
        try {
            let pasta = raiz;
            for (const parte of partes) pasta = await pasta.getDirectoryHandle(parte);
            const manipulador = await pasta.getFileHandle(nomeArquivo);
            return await manipulador.getFile();
        } catch (erro) {
            if (ERRO_PASTA_SEM_ARQUIVO.includes(erro.name)) return null;
            throw erro;
        }
    }

    /**
     * Cria a fonte que lê os arquivos da pasta do projeto conectada pelo usuário.
     * @param {FileSystemDirectoryHandle} raiz - Pasta raiz do projeto.
     * @returns {{nome: string, lerSeMudou: function(string): Promise<Object>}} Fonte de leitura.
     */
    function criarFontePorPasta(raiz) {
        const assinaturas = new Map();

        /**
         * Lê o arquivo só se ele mudou desde a leitura anterior.
         * @param {string} caminho - Caminho relativo à raiz do projeto.
         * @returns {Promise<{mudou: boolean, texto?: string}>} Resultado da leitura.
         */
        async function lerSeMudou(caminho) {
            const arquivo = await abrirArquivoDaPasta(raiz, caminho);
            const assinatura = arquivo
                ? arquivo.size + '|' + arquivo.lastModified
                : ASSINATURA_AUSENTE;
            if (ehIgualALeituraAnterior(assinaturas, caminho, assinatura)) return { mudou: false };

            assinaturas.set(caminho, assinatura);
            return { mudou: true, texto: arquivo ? await arquivo.text() : '' };
        }

        return { nome: NOME_FONTE_PASTA, lerSeMudou };
    }

    /**
     * Pede ao usuário a pasta raiz do projeto e devolve a fonte por pasta.
     * @returns {Promise<Object>} Fonte de leitura por pasta.
     * @throws {Error} Navegador sem suporte ou usuário que cancelou.
     */
    async function conectarPasta() {
        if (typeof window.showDirectoryPicker !== 'function') throw new Error(ERRO_SEM_SUPORTE);
        const raiz = await window.showDirectoryPicker({ mode: 'read' });
        return criarFontePorPasta(raiz);
    }

    /**
     * Monta o sufixo AAAA-MM de um mês, no horário local.
     * @param {Date} data - Qualquer dia do mês.
     * @returns {string} Ex.: "2026-10".
     */
    function formatarMes(data) {
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        return data.getFullYear() + '-' + mes;
    }

    /**
     * Lista os caminhos dos logs de mensagens: mês anterior e mês atual.
     * @param {Date} agora - Momento atual.
     * @returns {string[]} Caminhos, do mais antigo para o mais novo.
     */
    function listarCaminhosDeMensagens(agora) {
        const anterior = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);
        return [anterior, agora].map((mes) => {
            return PREFIXO_MENSAGENS + formatarMes(mes) + SUFIXO_MENSAGENS;
        });
    }

    /**
     * Lê um caminho e guarda o texto; se não mudou, devolve o último texto guardado.
     * @param {Object} fonte - Fonte de leitura.
     * @param {string} caminho - Caminho relativo à raiz do projeto.
     * @returns {Promise<{texto: string, mudou: boolean}>} Texto atual e se mudou.
     */
    async function lerComMemoria(fonte, caminho) {
        const leitura = await fonte.lerSeMudou(caminho);
        if (leitura.mudou) ultimosTextos.set(caminho, leitura.texto);
        return { texto: ultimosTextos.get(caminho) || '', mudou: leitura.mudou };
    }

    /**
     * Lê chamadas, mensagens (2 meses) e quadro.
     * @param {Object} fonte - Fonte de leitura (servidor ou pasta).
     * @returns {Promise<{chamadas: string, mensagens: string, quadro: string, mudou: boolean}>}
     *     Textos lidos e se algum arquivo mudou.
     * @throws {Error} Quando a leitura de algum arquivo falha.
     */
    async function lerTudo(fonte) {
        const caminhosMensagens = listarCaminhosDeMensagens(new Date());
        const [chamadas, quadro, ...mensagens] = await Promise.all([
            lerComMemoria(fonte, CAMINHO_CHAMADAS),
            lerComMemoria(fonte, CAMINHO_QUADRO),
            ...caminhosMensagens.map((caminho) => lerComMemoria(fonte, caminho)),
        ]);
        const todas = [chamadas, quadro, ...mensagens];
        return {
            chamadas: chamadas.texto,
            mensagens: mensagens.map((item) => item.texto).join('\n'),
            quadro: quadro.texto,
            mudou: todas.some((item) => item.mudou),
        };
    }

    window.PainelJev = window.PainelJev || {};
    window.PainelJev.fonte = {
        estaEmArquivoLocal, criarFontePorServidor, criarFontePorPasta, conectarPasta, lerTudo,
    };
})();
