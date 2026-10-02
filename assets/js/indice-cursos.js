// Carrega os cursos cadastrados no Supabase e monta os cards da página inicial.

const ELEMENTO_LISTA_CURSOS = document.getElementById('lista-cursos');
const ELEMENTO_RESUMO_CURSOS = document.getElementById('resumo-cursos');
const ELEMENTO_ROTAS_CURSOS = document.getElementById('rotas-cursos');
const ICONE_CURSO_INDICE = '🎓';

/** Normaliza o nome para localizar o caminho da pasta informado pela página. */
function normalizarNomeCursoIndice(nome) {
    return String(nome || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Atualiza o resumo com a quantidade de cursos recebida do banco. */
function atualizarResumoCursosIndice(quantidade) {
    ELEMENTO_RESUMO_CURSOS.textContent = quantidade + (quantidade === 1 ? ' curso' : ' cursos');
}

/** Cria um card usando somente nós de texto para os dados vindos do banco. */
function criarCardCursoIndice(curso, rotas) {
    const card = document.createElement('article');
    card.className = 'aula';

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
    card.append(topo);

    if (curso.descricao) {
        const descricao = document.createElement('p');
        descricao.className = 'meta';
        descricao.textContent = curso.descricao;
        card.append(descricao);
    }

    const caminho = rotas[normalizarNomeCursoIndice(curso.nome_completo)];
    if (caminho) {
        const acoes = document.createElement('div');
        acoes.className = 'acoes';
        const link = document.createElement('a');
        link.className = 'btn principal';
        link.href = caminho;
        link.textContent = '📂 Matérias';
        acoes.append(link);
        card.append(acoes);
    } else {
        const aviso = document.createElement('p');
        aviso.className = 'meta';
        aviso.textContent = 'Materiais ainda não vinculados a uma pasta.';
        card.append(aviso);
    }

    return card;
}

/** Carrega e apresenta os cursos disponíveis no banco. */
async function carregarCursosIndice() {
    try {
        const rotas = JSON.parse(ELEMENTO_ROTAS_CURSOS.textContent);
        const cursos = await sbGet('curso', 'select=id,nome_completo,descricao&order=nome_completo');
        ELEMENTO_LISTA_CURSOS.replaceChildren();

        if (!cursos.length) {
            atualizarResumoCursosIndice(0);
            const mensagem = document.createElement('p');
            mensagem.className = 'meta';
            mensagem.textContent = 'Nenhum curso cadastrado.';
            ELEMENTO_LISTA_CURSOS.append(mensagem);
            return;
        }

        atualizarResumoCursosIndice(cursos.length);
        cursos.forEach((curso) => ELEMENTO_LISTA_CURSOS.append(criarCardCursoIndice(curso, rotas)));
    } catch (erro) {
        console.error('Erro ao carregar cursos:', erro);
        ELEMENTO_RESUMO_CURSOS.textContent = 'Não foi possível carregar os cursos.';
        const mensagem = document.createElement('p');
        mensagem.className = 'meta';
        mensagem.textContent = 'Tente atualizar a página. Se o problema continuar, avise o administrador.';
        ELEMENTO_LISTA_CURSOS.replaceChildren(mensagem);
    } finally {
        ELEMENTO_LISTA_CURSOS.setAttribute('aria-busy', 'false');
    }
}

carregarCursosIndice();
