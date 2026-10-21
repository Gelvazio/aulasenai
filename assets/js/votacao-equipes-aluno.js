// Aluno: card "Votar na Equipe X" (nota de 1 a 10) enquanto o professor deixa a votação aberta.
// A cada 5 s chama a função do banco votacoes_abertas_aluno (só devolve as votações abertas em
// que o aluno logado pode votar: turma dele, fora da própria equipe) e mostra um card por
// votação. O voto vai por votar_equipe (JWT do usuário; o banco recusa voto repetido ou em
// votação fechada, com mensagem pronta). O aluno nunca vê votos nem média.
// Nada em localStorage. Só para perfil ALUNO; professor, visitante ou página sem atividade:
// não faz nada.
// Depende de js/supabase.js (SUPABASE, sbH, sbGet, obterClienteSupabase).
// Estilo: assets/css/votacao-equipes.css (bloco votacao-equipes--aluno).
// Tarefa #333.4, 2026-10-21; por enquanto só na atividade de Pesquisa na Internet.

const RPC_LISTAR_VOTO_ALUNO = 'votacoes_abertas_aluno';
const RPC_VOTAR_VOTO_ALUNO = 'votar_equipe';
const PERFIL_ALUNO_VOTO_ALUNO = 'ALUNO';
const TENTATIVAS_PERFIL_VOTO_ALUNO = 10;
const ESPERA_PERFIL_VOTO_ALUNO_MS = 300;
const INTERVALO_RELEITURA_VOTO_ALUNO_MS = 5000;
const NOTA_MINIMA_VOTO_ALUNO = 1;
const NOTA_MAXIMA_VOTO_ALUNO = 10;
const TEXTO_INSTRUCAO_VOTO_ALUNO = 'Dê uma nota de 1 a 10 para a apresentação.';
const TEXTO_VOTADO_VOTO_ALUNO = '✅ Voto registrado';
const PREFIXO_ERRO_VOTO_ALUNO = 'Não foi possível votar: ';
const CLASSE_ESCONDIDO_VOTO_ALUNO = 'votacao-equipes--oculto';

const estadoVotoAluno = { atividadeId: null, votacoes: [], gravando: false, contentor: null };

/**
 * Descobre o perfil do usuário logado, tentando de novo enquanto a sessão não fica pronta.
 * @returns {Promise<string|null>} Perfil (ALUNO/PROFESSOR) ou null se não há login.
 */
async function aguardarPerfilVotoAluno() {
    for (let tentativa = 0; tentativa < TENTATIVAS_PERFIL_VOTO_ALUNO; tentativa += 1) {
        const cliente = obterClienteSupabase();
        const { data } = cliente ? await cliente.auth.getSession() : {};
        const usuario = data?.session?.user;
        if (usuario) return usuario.app_metadata?.perfil || PERFIL_ALUNO_VOTO_ALUNO;
        await new Promise((resolver) => setTimeout(resolver, ESPERA_PERFIL_VOTO_ALUNO_MS));
    }
    return null;
}

/**
 * Acha o id da atividade da página atual pela coluna atividade.pagina.
 * @returns {Promise<number|null>} Id da atividade ou null se a página não for uma atividade.
 */
async function obterAtividadeIdVotoAluno() {
    const caminho = decodeURIComponent(location.pathname);
    const linhas = await sbGet('atividade',
        'select=id&pagina=eq.' + encodeURIComponent(caminho));
    return linhas?.[0]?.id ?? null;
}

/**
 * Chama uma função do banco (RPC) com o JWT do usuário logado.
 * @param {string} nome - Nome da função.
 * @param {Object} parametros - Parâmetros da função.
 * @returns {Promise<*>} Resposta em JSON (null quando vazia).
 * @throws {Error} Se o banco recusar.
 */
async function chamarRpcVotoAluno(nome, parametros) {
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
 * Cria um elemento simples com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} texto - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoVotoAluno(tag, classe, texto) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Cria o botão de uma nota.
 * @param {number} nota - Nota de 1 a 10.
 * @param {Object} votacao - Linha da votação.
 * @param {HTMLElement} card - Card onde o botão fica (recebe botões e erro).
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoNotaVotoAluno(nota, votacao, card) {
    const botao = criarElementoVotoAluno('button', 'votacao-equipes__nota', String(nota));
    botao.type = 'button';
    botao.addEventListener('click', () => votarVotoAluno(votacao, nota, card));
    return botao;
}

/**
 * Monta o card de uma votação: título e instrução, e os 10 botões (ou o aviso de voto feito).
 * @param {{votacao_id: number, equipe_nome: string, ja_votei: boolean}} votacao - Linha.
 * @returns {HTMLElement} Card pronto.
 */
function criarCardVotoAluno(votacao) {
    const card = document.createElement('article');
    card.className = 'votacao-equipes__card';
    card.append(criarElementoVotoAluno('h3', 'votacao-equipes__titulo',
        '🗳️ Votar na ' + votacao.equipe_nome));
    if (votacao.ja_votei) {
        card.append(criarElementoVotoAluno('p', 'votacao-equipes__votado',
            TEXTO_VOTADO_VOTO_ALUNO));
        return card;
    }
    const notas = criarElementoVotoAluno('div', 'votacao-equipes__notas', '');
    for (let nota = NOTA_MINIMA_VOTO_ALUNO; nota <= NOTA_MAXIMA_VOTO_ALUNO; nota += 1) {
        notas.append(criarBotaoNotaVotoAluno(nota, votacao, card));
    }
    card.append(criarElementoVotoAluno('p', 'votacao-equipes__ajuda', TEXTO_INSTRUCAO_VOTO_ALUNO),
        notas);
    return card;
}

/**
 * Redesenha os cards; sem votação aberta o contêiner some. Não redesenha durante a gravação.
 */
function desenharVotoAluno() {
    const contentor = estadoVotoAluno.contentor;
    if (!contentor || estadoVotoAluno.gravando) return;
    contentor.replaceChildren(...estadoVotoAluno.votacoes.map(criarCardVotoAluno));
    contentor.classList.toggle(CLASSE_ESCONDIDO_VOTO_ALUNO, !estadoVotoAluno.votacoes.length);
}

/**
 * Relê as votações abertas do banco e redesenha, exceto enquanto um voto está sendo gravado.
 * @returns {Promise<void>}
 */
async function relerVotoAluno() {
    if (estadoVotoAluno.gravando) return;
    try {
        const linhas = await chamarRpcVotoAluno(RPC_LISTAR_VOTO_ALUNO,
            { p_atividade: estadoVotoAluno.atividadeId });
        if (estadoVotoAluno.gravando) return;
        estadoVotoAluno.votacoes = linhas || [];
        desenharVotoAluno();
    } catch (erro) {
        console.warn('Votação das equipes (aluno, leitura):', erro.message);
    }
}

/**
 * Confirma e grava o voto; em sucesso mostra "Voto registrado", em erro mostra a mensagem.
 * @param {{votacao_id: number, equipe_nome: string}} votacao - Votação escolhida.
 * @param {number} nota - Nota de 1 a 10.
 * @param {HTMLElement} card - Card da votação.
 * @returns {Promise<void>}
 */
async function votarVotoAluno(votacao, nota, card) {
    const pergunta = 'Dar nota ' + nota + ' para a ' + votacao.equipe_nome +
        '? O voto não pode ser trocado.';
    if (!confirm(pergunta)) return;
    const botoes = card.querySelectorAll('button');
    botoes.forEach((botao) => { botao.disabled = true; });
    estadoVotoAluno.gravando = true;
    try {
        await chamarRpcVotoAluno(RPC_VOTAR_VOTO_ALUNO,
            { p_votacao: votacao.votacao_id, p_nota: nota });
        votacao.ja_votei = true;
        estadoVotoAluno.gravando = false;
        desenharVotoAluno();
    } catch (erro) {
        estadoVotoAluno.gravando = false;
        botoes.forEach((botao) => { botao.disabled = false; });
        console.warn('Votação das equipes (aluno, voto):', erro.message);
        card.querySelector('.votacao-equipes__erro')?.remove();
        card.append(criarElementoVotoAluno('p', 'votacao-equipes__erro',
            PREFIXO_ERRO_VOTO_ALUNO + erro.message));
    }
}

/**
 * Cria o contêiner (escondido até haver votação aberta) no começo do corpo da página.
 * @returns {HTMLElement} Contêiner criado.
 */
function montarContentorVotoAluno() {
    const contentor = document.createElement('section');
    contentor.className = 'votacao-equipes votacao-equipes--aluno ' + CLASSE_ESCONDIDO_VOTO_ALUNO;
    document.body.prepend(contentor);
    return contentor;
}

/**
 * Inicia o card do aluno: confere o perfil, acha a atividade e liga a releitura periódica.
 * @returns {Promise<void>}
 */
async function iniciarVotacaoAluno() {
    try {
        if (await aguardarPerfilVotoAluno() !== PERFIL_ALUNO_VOTO_ALUNO) return;
        estadoVotoAluno.atividadeId = await obterAtividadeIdVotoAluno();
        if (!estadoVotoAluno.atividadeId) return;
        estadoVotoAluno.contentor = montarContentorVotoAluno();
        await relerVotoAluno();
        setInterval(relerVotoAluno, INTERVALO_RELEITURA_VOTO_ALUNO_MS);
    } catch (erro) {
        console.warn('Votação das equipes (aluno):', erro.message);
    }
}

iniciarVotacaoAluno();
