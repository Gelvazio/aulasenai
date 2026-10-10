// Página da lista de presença: monta uma tabela por turma a partir da lista única
// window.LISTAS_PRESENCA (scripts/LISTAPRESENCA.js), só com a UC informada em data-uc no
// <div id="lista-presenca">. Turmas em ordem de horário: manhã antes da tarde.

const ID_CONTEUDO = 'lista-presenca';
const ID_BOTAO_SENHAS = 'btnMostrarSenhas';
const ID_BOTAO_IMPRIMIR = 'btnImprimirLista';
const CLASSE_SENHAS_VISIVEIS = 'senhas-visiveis';
const TEXTO_MOSTRAR_SENHAS = '👁️ Mostrar senhas';
const TEXTO_OCULTAR_SENHAS = '🙈 Ocultar senhas';
const SENHA_OCULTA = '••••••';
const MSG_SEM_DADOS = 'Lista de presença não encontrada (LISTAPRESENCA.js).';
const COLUNAS = ['Nº', 'Nome', 'E-mail (login)', 'Senha', 'Situação'];

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string|number} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = String(texto);
    return elemento;
}

/**
 * Ordena as turmas pelo horário de início (manhã antes da tarde).
 * @param {{horario: string}[]} turmas - Turmas da lista.
 * @returns {Object[]} Nova lista ordenada.
 */
function ordenarTurmas(turmas) {
    const inicio = (turma) => (turma.horario || '').slice(0, 5);
    return [...turmas].sort((a, b) => inicio(a).localeCompare(inicio(b)));
}

/**
 * Monta a linha de um aluno.
 * @param {{numero: number, nome: string, email: string, senha: string, naChamada: boolean}} aluno
 * @returns {HTMLTableRowElement} Linha da tabela.
 */
function montarLinhaAluno(aluno) {
    const linha = document.createElement('tr');
    if (!aluno.naChamada) linha.className = 'aluno--fora-chamada';
    linha.appendChild(criarElemento('td', 'coluna-numero', aluno.numero));
    linha.appendChild(criarElemento('td', 'coluna-nome', aluno.nome));
    linha.appendChild(criarElemento('td', 'coluna-email', aluno.email || '—'));

    const senha = criarElemento('td', 'coluna-senha');
    senha.appendChild(criarElemento('span', 'senha-oculta', SENHA_OCULTA));
    senha.appendChild(criarElemento('span', 'senha-real', aluno.senha || '—'));
    linha.appendChild(senha);

    const situacao = aluno.naChamada ? 'Na chamada' : 'Fora da chamada';
    linha.appendChild(criarElemento('td', 'coluna-situacao', situacao));
    return linha;
}

/**
 * Monta a tabela de alunos de uma turma.
 * @param {{alunos: Object[]}} turma - Turma da lista.
 * @returns {HTMLTableElement} Tabela montada.
 */
function montarTabela(turma) {
    const tabela = criarElemento('table', 'tabela-alunos');
    const cabecalho = tabela.createTHead().insertRow();
    COLUNAS.forEach((coluna) => cabecalho.appendChild(criarElemento('th', '', coluna)));
    const corpo = tabela.createTBody();
    [...turma.alunos].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))
        .forEach((aluno) => corpo.appendChild(montarLinhaAluno(aluno)));
    return tabela;
}

/**
 * Monta a seção de uma turma: título, dados da turma, contagem e tabela.
 * @param {Object} turma - Turma da lista.
 * @param {{uc: string, professor: string, local: string}} lista - Dados gerais.
 * @returns {HTMLElement} Seção da turma.
 */
function montarSecaoTurma(turma, lista) {
    const secao = criarElemento('section', 'turma');
    secao.appendChild(criarElemento('h2', 'turma__titulo',
        turma.turno + ' — ' + turma.nome + ' (' + turma.codigo + ')'));

    const naChamada = turma.alunos.filter((aluno) => aluno.naChamada).length;
    const detalhes = [
        'Horário: ' + turma.horario,
        'Local: ' + lista.local,
        'Professor: ' + lista.professor,
        turma.alunos.length + ' alunos (' + naChamada + ' na chamada)',
    ];
    const listaDetalhes = criarElemento('ul', 'turma__detalhes');
    detalhes.forEach((texto) => listaDetalhes.appendChild(criarElemento('li', '', texto)));
    secao.appendChild(listaDetalhes);
    secao.appendChild(montarTabela(turma));
    return secao;
}

/**
 * Alterna a exibição das senhas e o texto do botão.
 * @param {HTMLButtonElement} botao - Botão de mostrar/ocultar.
 */
function alternarSenhas(botao) {
    const estaoVisiveis = document.body.classList.toggle(CLASSE_SENHAS_VISIVEIS);
    botao.textContent = estaoVisiveis ? TEXTO_OCULTAR_SENHAS : TEXTO_MOSTRAR_SENHAS;
    botao.setAttribute('aria-pressed', String(estaoVisiveis));
}

/**
 * Liga os botões de mostrar senhas e imprimir.
 */
function ligarBotoes() {
    const botaoSenhas = document.getElementById(ID_BOTAO_SENHAS);
    botaoSenhas?.addEventListener('click', () => alternarSenhas(botaoSenhas));
    document.getElementById(ID_BOTAO_IMPRIMIR)?.addEventListener('click', () => window.print());
}

/**
 * Normaliza um texto para comparar nomes de UC (sem acentos e sem diferença de maiúsculas).
 * @param {string} texto - Texto original.
 * @returns {string} Texto normalizado.
 */
function normalizarTexto(texto) {
    return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .trim().toLowerCase();
}

/**
 * Procura no LISTAPRESENCA.js a lista da UC pedida (a lista de professores é ignorada).
 * @param {string} uc - Nome da UC (atributo data-uc da página).
 * @returns {Object|null} Lista da UC ou null se não houver.
 */
function encontrarListaDaUc(uc) {
    const listas = window.LISTAS_PRESENCA || [];
    const procurada = normalizarTexto(uc);
    if (!procurada) return null;
    return listas.find((lista) => (
        lista.professores !== true && normalizarTexto(lista.uc) === procurada)) || null;
}

/**
 * Monta a página: uma seção por turma, na ordem de horário.
 */
function iniciarListaPresenca() {
    const conteudo = document.getElementById(ID_CONTEUDO);
    if (!conteudo) return;

    const lista = encontrarListaDaUc(conteudo.dataset.uc);
    if (!lista?.turmas?.length) {
        conteudo.appendChild(criarElemento('p', 'aviso-sem-dados', MSG_SEM_DADOS));
        return;
    }
    const subtitulo = document.querySelector('.cabecalho__uc');
    if (subtitulo) subtitulo.textContent = lista.uc;
    ordenarTurmas(lista.turmas).forEach((turma) => {
        conteudo.appendChild(montarSecaoTurma(turma, lista));
    });
    ligarBotoes();
}

iniciarListaPresenca();
