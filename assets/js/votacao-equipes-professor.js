// Professor: bloco "Votação das equipes" logo depois do painel do Progresso da turma
// (progresso-turma-global.js). Mostra, por equipe, a situação da votação (aberta/fechada), o
// total de votos e a média, e tem o botão que abre ou fecha a votação. Atualiza a cada 5 s.
// Se o combo "Turma" do progresso estiver escolhido, mostra só as equipes dessa turma.
// Usa as funções do banco votacoes_equipes_professor e abrir_votacao_equipe (JWT do usuário;
// o banco só devolve linhas ao professor). Sem painel (aluno ou visitante) ou sem equipe, não
// faz nada. Depende de js/supabase.js (SUPABASE, sbH) e de progresso-turma-global.js
// (estadoProgressoGlobal). Estilo: assets/css/votacao-equipes.css.
// Tarefa #333.3, 2026-10-21; por enquanto só na atividade de Pesquisa na Internet.

const SELETOR_PAINEL_VOTACAO = 'section.progresso-turma';
const SELETOR_COMBO_TURMA_VOTACAO = '#progresso-turma-combo-turma';
const RPC_LISTAR_VOTACAO = 'votacoes_equipes_professor';
const RPC_ABRIR_VOTACAO = 'abrir_votacao_equipe';
const INTERVALO_ESPERA_VOTACAO_MS = 500;
const LIMITE_TENTATIVAS_VOTACAO = 120;
const INTERVALO_RELEITURA_VOTACAO_MS = 5000;
const TITULO_VOTACAO = '🗳️ Votação das equipes';
const AJUDA_VOTACAO = 'Abra a votação quando a equipe começar a apresentar; os alunos votam ' +
    'de 1 a 10 no celular, nesta mesma página.';
const TEXTO_ABERTA_VOTACAO = '🟢 Aberta';
const TEXTO_FECHADA_VOTACAO = 'Fechada';
const TEXTO_ABRIR_VOTACAO = 'Abrir votação';
const TEXTO_FECHAR_VOTACAO = 'Fechar votação';
const TEXTO_SEM_MEDIA_VOTACAO = '—';
const PREFIXO_ERRO_VOTACAO = 'Não foi possível alterar a votação: ';
const CASAS_MEDIA_VOTACAO = 1;

const estadoVotacao = { atividadeId: null, linhas: [], gravando: false, bloco: null };

/**
 * Diz se o painel do progresso já está pronto (painel na tela e atividade definida).
 * @returns {boolean} Verdadeiro quando já dá para montar o bloco.
 */
function painelEstaProntoVotacao() {
    const temEstado = typeof estadoProgressoGlobal !== 'undefined';
    const temPainel = Boolean(document.querySelector(SELETOR_PAINEL_VOTACAO));
    return temEstado && temPainel && Boolean(estadoProgressoGlobal.atividadeId);
}

/**
 * Chama uma função do banco (RPC) com o JWT do usuário logado.
 * @param {string} nome - Nome da função.
 * @param {Object} parametros - Parâmetros da função.
 * @returns {Promise<*>} Resposta em JSON (null quando vazia).
 * @throws {Error} Se o banco recusar.
 */
async function chamarRpcVotacao(nome, parametros) {
    const resposta = await fetch(SUPABASE.URL + '/rest/v1/rpc/' + nome, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify(parametros),
    });
    const texto = await resposta.text();
    const dados = texto ? JSON.parse(texto) : null;
    if (!resposta.ok) throw new Error(dados?.message || 'HTTP ' + resposta.status);
    return dados;
}

/**
 * Formata a média com uma casa e vírgula decimal.
 * @param {*} media - Média (número, texto numérico ou nulo).
 * @returns {string} Média em pt-BR, ou "—" sem votos.
 */
function formatarMediaVotacao(media) {
    if (media === null || media === undefined) return TEXTO_SEM_MEDIA_VOTACAO;
    return Number(media).toFixed(CASAS_MEDIA_VOTACAO).replace('.', ',');
}

/**
 * Cria um elemento simples com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} texto - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoVotacao(tag, classe, texto) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Cria o botão que abre ou fecha a votação de uma equipe.
 * @param {{equipe_id: number, aberta: boolean}} linha - Linha da equipe.
 * @param {HTMLElement} item - Linha na tela (recebe a mensagem de erro).
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoVotacao(linha, item) {
    const botao = criarElementoVotacao('button', 'votacao-equipes__botao',
        linha.aberta ? TEXTO_FECHAR_VOTACAO : TEXTO_ABRIR_VOTACAO);
    botao.type = 'button';
    botao.addEventListener('click', () => alterarVotacao(linha, botao, item));
    return botao;
}

/**
 * Monta a linha de uma equipe: nome, turma, situação, votos, média e botão.
 * @param {Object} linha - Linha devolvida por votacoes_equipes_professor.
 * @returns {HTMLLIElement} Item da lista.
 */
function criarLinhaVotacao(linha) {
    const item = document.createElement('li');
    item.className = 'votacao-equipes__linha';
    const nome = criarElementoVotacao('span', 'votacao-equipes__nome', linha.equipe_nome);
    nome.append(criarElementoVotacao('span', 'votacao-equipes__turma',
        ' (' + linha.turma_codigo + ')'));
    const situacao = criarElementoVotacao('span', linha.aberta ?
        'votacao-equipes__situacao votacao-equipes__situacao--aberta' :
        'votacao-equipes__situacao', linha.aberta ? TEXTO_ABERTA_VOTACAO : TEXTO_FECHADA_VOTACAO);
    item.append(nome, situacao,
        criarElementoVotacao('span', 'votacao-equipes__votos', 'Votos: ' + linha.votos),
        criarElementoVotacao('span', 'votacao-equipes__media',
            'Média: ' + formatarMediaVotacao(linha.media)),
        criarBotaoVotacao(linha, item));
    return item;
}

/**
 * Lê a turma escolhida no combo do progresso.
 * @returns {string} Código da turma ou '' (todas).
 */
function turmaEscolhidaVotacao() {
    return document.querySelector(SELETOR_COMBO_TURMA_VOTACAO)?.value || '';
}

/**
 * Redesenha a lista de equipes (respeitando o filtro de turma).
 */
function desenharListaVotacao() {
    const lista = estadoVotacao.bloco?.querySelector('.votacao-equipes__lista');
    if (!lista) return;
    const turma = turmaEscolhidaVotacao();
    const visiveis = estadoVotacao.linhas.filter((linha) =>
        !turma || linha.turma_codigo === turma);
    lista.replaceChildren(...visiveis.map(criarLinhaVotacao));
}

/**
 * Relê as linhas do banco e redesenha, exceto enquanto um botão está gravando.
 * @returns {Promise<void>}
 */
async function relerVotacao() {
    if (estadoVotacao.gravando) return;
    try {
        const linhas = await chamarRpcVotacao(RPC_LISTAR_VOTACAO,
            { p_atividade: estadoVotacao.atividadeId });
        if (estadoVotacao.gravando) return;
        estadoVotacao.linhas = linhas || [];
        desenharListaVotacao();
    } catch (erro) {
        console.warn('Votação das equipes (leitura):', erro.message);
    }
}

/**
 * Abre ou fecha a votação da equipe (o contrário do estado atual) e relê na hora.
 * @param {{equipe_id: number, aberta: boolean}} linha - Linha da equipe.
 * @param {HTMLButtonElement} botao - Botão clicado (fica desabilitado enquanto grava).
 * @param {HTMLElement} item - Linha na tela, para a mensagem de erro.
 * @returns {Promise<void>}
 */
async function alterarVotacao(linha, botao, item) {
    estadoVotacao.gravando = true;
    botao.disabled = true;
    try {
        await chamarRpcVotacao(RPC_ABRIR_VOTACAO, { p_atividade: estadoVotacao.atividadeId,
            p_equipe: linha.equipe_id, p_aberta: !linha.aberta });
        estadoVotacao.gravando = false;
        await relerVotacao();
    } catch (erro) {
        estadoVotacao.gravando = false;
        botao.disabled = false;
        console.warn('Votação das equipes (gravação):', erro.message);
        item.append(criarElementoVotacao('p', 'votacao-equipes__erro',
            PREFIXO_ERRO_VOTACAO + erro.message));
    }
}

/**
 * Cria o bloco (título, ajuda e lista vazia) e o insere depois do painel do progresso.
 * @returns {HTMLElement} Bloco criado.
 */
function montarBlocoVotacao() {
    const bloco = document.createElement('section');
    bloco.className = 'votacao-equipes';
    bloco.append(criarElementoVotacao('h3', 'votacao-equipes__titulo', TITULO_VOTACAO),
        criarElementoVotacao('p', 'votacao-equipes__ajuda', AJUDA_VOTACAO),
        criarElementoVotacao('ul', 'votacao-equipes__lista', ''));
    document.querySelector(SELETOR_PAINEL_VOTACAO).after(bloco);
    return bloco;
}

/**
 * Faz a primeira leitura e, havendo equipes, mostra o bloco e liga a releitura periódica.
 * @returns {Promise<void>}
 */
async function iniciarVotacaoProfessor() {
    estadoVotacao.atividadeId = estadoProgressoGlobal.atividadeId;
    try {
        const linhas = await chamarRpcVotacao(RPC_LISTAR_VOTACAO,
            { p_atividade: estadoVotacao.atividadeId });
        if (!linhas?.length) return;
        estadoVotacao.linhas = linhas;
        estadoVotacao.bloco = montarBlocoVotacao();
        desenharListaVotacao();
        document.querySelector(SELETOR_COMBO_TURMA_VOTACAO)
            ?.addEventListener('change', desenharListaVotacao);
        setInterval(relerVotacao, INTERVALO_RELEITURA_VOTACAO_MS);
    } catch (erro) {
        console.warn('Votação das equipes:', erro.message);
    }
}

/**
 * Espera o painel ficar pronto (tentativas limitadas) e então inicia. Sem painel, desiste.
 */
function aguardarPainelVotacao() {
    let tentativas = 0;
    const espera = setInterval(() => {
        tentativas += 1;
        if (painelEstaProntoVotacao()) {
            clearInterval(espera);
            iniciarVotacaoProfessor();
        } else if (tentativas >= LIMITE_TENTATIVAS_VOTACAO) {
            clearInterval(espera);
        }
    }, INTERVALO_ESPERA_VOTACAO_MS);
}

aguardarPainelVotacao();
