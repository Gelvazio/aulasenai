// Professor, modal "Progresso das atividades" do card da aula: barra de filtros acima do quadro
// alunos × atividades — Todos, Entregue, Em andamento e Sem começar, cada um com a contagem de
// alunos. A regra olha as atividades da aula juntas: Entregue = entregou alguma; Em andamento =
// está fazendo alguma; Sem começar = não começou nenhuma. Não lê o banco: filtra as linhas que
// o quadro (indice-aula-progresso-quadro.js) já desenhou, na mesma ordem dos alunos. Tarefa #424.

const CLASSE_FILTRO_PROGRESSO_AULA = 'aula-progresso__filtro';
const MSG_FILTRO_SEM_ALUNOS_PROGRESSO_AULA = 'Nenhum aluno neste filtro.';
const FILTROS_PROGRESSO_AULA = [
    { chave: 'todos', texto: 'Todos', serve: () => true },
    { chave: 'entregue', texto: 'Entregue',
        serve: (situacoes) => situacoes.has(window.SITUACOES_PROGRESSO_AULA.entregue) },
    { chave: 'andamento', texto: 'Em andamento',
        serve: (situacoes) => situacoes.has(window.SITUACOES_PROGRESSO_AULA.andamento) },
    { chave: 'vazia', texto: 'Sem começar',
        serve: (situacoes) => situacoes.size === 1 &&
            situacoes.has(window.SITUACOES_PROGRESSO_AULA.vazia) },
];

/**
 * Junta as situações do aluno em todas as atividades da aula.
 * @param {string} alunoId - Id do aluno.
 * @param {{atividades: {id: number}[], situacoes: Map}} dados - Atividades e situações.
 * @returns {Set<string>} Situações do aluno ("vazia", "andamento", "entregue").
 */
function juntarSituacoesDoAlunoProgressoAula(alunoId, dados) {
    return new Set(dados.atividades.map((atividade) =>
        dados.situacoes.get(atividade.id).get(alunoId) || window.SITUACOES_PROGRESSO_AULA.vazia));
}

/**
 * Cria o botão de um filtro, com a contagem de alunos.
 * @param {{chave: string, texto: string}} filtro - Filtro.
 * @param {number} quantidade - Alunos que o filtro mostra.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoFiltroProgressoAula(filtro, quantidade) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = CLASSE_FILTRO_PROGRESSO_AULA + '__botao ' + CLASSE_FILTRO_PROGRESSO_AULA +
        '__botao--' + filtro.chave;
    botao.textContent = filtro.texto + ' (' + quantidade + ')';
    return botao;
}

/**
 * Aplica um filtro: esconde as linhas dos alunos que não servem e marca o botão ativo.
 * @param {Object} tela - botoes (chave → botão), linhas, situacoesDosAlunos e aviso.
 * @param {{chave: string, serve: Function}} filtro - Filtro escolhido.
 */
function aplicarFiltroProgressoAula(tela, filtro) {
    let visiveis = 0;
    tela.linhas.forEach((linha, indice) => {
        const serve = filtro.serve(tela.situacoesDosAlunos[indice]);
        linha.hidden = !serve;
        if (serve) visiveis += 1;
    });
    tela.aviso.hidden = visiveis > 0;
    Object.entries(tela.botoes).forEach(([chave, botao]) => {
        const estaAtivo = chave === filtro.chave;
        botao.classList.toggle(CLASSE_FILTRO_PROGRESSO_AULA + '__botao--ativo', estaAtivo);
        botao.setAttribute('aria-pressed', String(estaAtivo));
    });
}

/**
 * Cria a barra de filtros do quadro de progresso da aula.
 * @param {{tabela: HTMLTableElement, alunos: {id: string}[], atividades: Object[],
 *     situacoes: Map}} dados - Quadro desenhado e os dados dele (linhas na ordem dos alunos).
 * @returns {HTMLElement} Barra de filtros (com o aviso de "nenhum aluno").
 */
function criarFiltroProgressoAula(dados) {
    const barra = document.createElement('div');
    barra.className = CLASSE_FILTRO_PROGRESSO_AULA;
    const situacoesDosAlunos = dados.alunos.map((aluno) =>
        juntarSituacoesDoAlunoProgressoAula(aluno.id, dados));
    const tela = { botoes: {}, situacoesDosAlunos, linhas: [...dados.tabela.tBodies[0].rows],
        aviso: document.createElement('p') };
    tela.aviso.className = CLASSE_FILTRO_PROGRESSO_AULA + '__aviso';
    tela.aviso.textContent = MSG_FILTRO_SEM_ALUNOS_PROGRESSO_AULA;
    FILTROS_PROGRESSO_AULA.forEach((filtro) => {
        const quantidade = situacoesDosAlunos.filter((situacoes) => filtro.serve(situacoes)).length;
        const botao = criarBotaoFiltroProgressoAula(filtro, quantidade);
        botao.addEventListener('click', () => aplicarFiltroProgressoAula(tela, filtro));
        tela.botoes[filtro.chave] = botao;
        barra.appendChild(botao);
    });
    barra.appendChild(tela.aviso);
    aplicarFiltroProgressoAula(tela, FILTROS_PROGRESSO_AULA[0]);
    return barra;
}

window.criarFiltroProgressoAula = criarFiltroProgressoAula;
