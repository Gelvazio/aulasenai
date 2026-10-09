// Monta os cards da página inicial com os cursos do usuário logado (RPC cursos_do_usuario).
// Sem login, não lista nada: mostra a apresentação do professor e o botão de entrar.

const ELEMENTO_LISTA_CURSOS = document.getElementById('lista-cursos');
const ELEMENTO_RESUMO_CURSOS = document.getElementById('resumo-cursos');
const ELEMENTO_ROTAS_CURSOS = document.getElementById('rotas-cursos');
const ELEMENTO_APRESENTACAO_PROFESSOR = document.getElementById('apresentacao-professor');
const ICONE_CURSO_INDICE = '🎓';
const RPC_CURSOS_DO_USUARIO = 'cursos_do_usuario';
const TEXTO_SEM_CURSOS = 'Nenhum curso vinculado às suas turmas.';
const TEXTO_ERRO_CURSOS = 'Não foi possível carregar os cursos.';
const TEXTO_ERRO_DICA = 'Tente atualizar a página. Se o problema continuar, avise o administrador.';

/** Normaliza o nome para localizar o caminho da pasta informado pela página. */
function normalizarNomeCursoIndice(nome) {
    return String(nome || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Atualiza o resumo com a quantidade de cursos recebida do banco. */
function atualizarResumoCursosIndice(quantidade) {
    ELEMENTO_RESUMO_CURSOS.textContent = quantidade + (quantidade === 1 ? ' curso' : ' cursos');
}

/** Mostra uma mensagem simples no lugar da lista de cursos. */
function mostrarMensagemListaIndice(texto) {
    const mensagem = document.createElement('p');
    mensagem.className = 'meta';
    mensagem.textContent = texto;
    ELEMENTO_LISTA_CURSOS.replaceChildren(mensagem);
}

/** Sem login: esconde resumo e lista e mostra a apresentação do professor. */
function mostrarApresentacaoProfessor() {
    ELEMENTO_RESUMO_CURSOS.hidden = true;
    ELEMENTO_LISTA_CURSOS.hidden = true;
    ELEMENTO_APRESENTACAO_PROFESSOR.hidden = false;
}

/** Cria o topo do card (ícone, tipo e nome do curso). */
function criarTopoCardCursoIndice(curso) {
    const topo = document.createElement('div');
    topo.className = 'topo';
    const icone = document.createElement('span');
    icone.className = 'icone';
    icone.setAttribute('aria-hidden', 'true');
    icone.textContent = ICONE_CURSO_INDICE;

    const identificacao = document.createElement('div');
    const tipo = document.createElement('div');
    tipo.className = 'num';
    tipo.textContent = 'CURSO';
    const nome = document.createElement('h2');
    nome.textContent = curso.nome_completo || 'Curso sem nome';
    identificacao.append(tipo, nome);
    topo.append(icone, identificacao);
    return topo;
}

/** Cria o botão de acesso às matérias ou o aviso de pasta não vinculada. */
function criarAcaoCardCursoIndice(curso, rotas) {
    const caminho = rotas[normalizarNomeCursoIndice(curso.nome_completo)];
    if (!caminho) {
        const aviso = document.createElement('p');
        aviso.className = 'meta';
        aviso.textContent = 'Materiais ainda não vinculados a uma pasta.';
        return aviso;
    }

    const acoes = document.createElement('div');
    acoes.className = 'acoes';
    const link = document.createElement('a');
    link.className = 'btn principal';
    link.href = caminho;
    link.textContent = '📂 Matérias';
    acoes.append(link);
    return acoes;
}

/** Cria um card usando somente nós de texto para os dados vindos do banco. */
function criarCardCursoIndice(curso, rotas) {
    const card = document.createElement('article');
    card.className = 'aula';
    card.append(criarTopoCardCursoIndice(curso));

    if (curso.descricao) {
        const descricao = document.createElement('p');
        descricao.className = 'meta';
        descricao.textContent = curso.descricao;
        card.append(descricao);
    }

    card.append(criarAcaoCardCursoIndice(curso, rotas));
    return card;
}

/**
 * Busca no banco os cursos do usuário logado.
 * @param {Object} cliente - Cliente supabase-js.
 * @returns {Promise<Object[]>} Cursos visíveis ao usuário.
 * @throws {Error} Se a função do banco responder com erro.
 */
async function buscarCursosDoUsuarioIndice(cliente) {
    const { data, error } = await cliente.rpc(RPC_CURSOS_DO_USUARIO);
    if (error) throw error;
    return data || [];
}

/** Lista os cursos recebidos ou a mensagem de lista vazia. */
function apresentarCursosIndice(cursos) {
    atualizarResumoCursosIndice(cursos.length);
    if (!cursos.length) {
        mostrarMensagemListaIndice(TEXTO_SEM_CURSOS);
        return;
    }

    const rotas = JSON.parse(ELEMENTO_ROTAS_CURSOS.textContent);
    ELEMENTO_LISTA_CURSOS.replaceChildren();
    cursos.forEach((curso) => ELEMENTO_LISTA_CURSOS.append(criarCardCursoIndice(curso, rotas)));
}

/** Carrega e apresenta os cursos do usuário logado; sem login, a apresentação do professor. */
async function carregarCursosIndice() {
    try {
        const cliente = obterClienteSupabase();
        const { data } = cliente ? await cliente.auth.getSession() : { data: null };
        const estaLogado = Boolean(data?.session);
        if (!estaLogado) {
            mostrarApresentacaoProfessor();
            return;
        }

        apresentarCursosIndice(await buscarCursosDoUsuarioIndice(cliente));
    } catch (erro) {
        console.error('Erro ao carregar cursos:', erro);
        ELEMENTO_RESUMO_CURSOS.textContent = TEXTO_ERRO_CURSOS;
        mostrarMensagemListaIndice(TEXTO_ERRO_DICA);
    } finally {
        ELEMENTO_LISTA_CURSOS.setAttribute('aria-busy', 'false');
    }
}

carregarCursosIndice();
