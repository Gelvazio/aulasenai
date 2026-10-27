// Professor, modal "Progresso das atividades" do card da aula: desenha o quadro alunos (linhas) ×
// atividades (colunas). Cada célula mostra a situação do aluno (sem começar, em andamento ou
// entregue) com cor e texto; o título de cada coluna traz "entregues de total". Só desenha o que
// recebe: as leituras ficam em indice-aula-progresso-alunos.js e indice-aula-progresso-dados.js, e
// a janela em indice-aula-progresso-modal.js (que entrega o corpo a montarQuadroProgressoAula).
// Rola dentro do modal (cabeçalho fixo). Sem style inline. Tarefa #421.5.

const CLASSE_QUADRO_PROGRESSO_AULA = 'aula-progresso__quadro';
const TEXTOS_SITUACAO_PROGRESSO_AULA = {
    vazia: 'Sem começar',
    andamento: 'Em andamento',
    entregue: 'Entregue',
};
const MSG_SEM_ATIVIDADES_PROGRESSO_AULA = 'Esta aula ainda não tem atividades cadastradas.';
const MSG_SEM_ALUNOS_PROGRESSO_AULA = 'Nenhum aluno presente nesta turma.';
const MSG_CARREGANDO_PROGRESSO_AULA = 'Carregando…';
const MSG_ERRO_PROGRESSO_AULA = 'Não foi possível carregar o progresso das atividades: ';

/**
 * Cria uma célula (th ou td) com texto e classe.
 * @param {string} tag - "th" ou "td".
 * @param {string} classe - Classe CSS.
 * @param {string} texto - Texto da célula.
 * @returns {HTMLTableCellElement} Célula pronta.
 */
function criarCelulaQuadroProgressoAula(tag, classe, texto) {
    const celula = document.createElement(tag);
    celula.className = classe;
    celula.textContent = texto;
    return celula;
}

/**
 * Conta os alunos que entregaram uma atividade.
 * @param {Map<string, string>} situacaoDaAtividade - Aluno → situação.
 * @param {{id: string}[]} alunos - Alunos do quadro.
 * @returns {number} Quantidade de entregues.
 */
function contarEntreguesQuadroProgressoAula(situacaoDaAtividade, alunos) {
    const entregue = window.SITUACOES_PROGRESSO_AULA.entregue;
    return alunos.filter((aluno) => situacaoDaAtividade.get(aluno.id) === entregue).length;
}

/**
 * Monta o cabeçalho do quadro: coluna "Aluno" e uma por atividade, com "entregues de total".
 * @param {Object} dados - atividades, alunos e situacoes (atividade → aluno → situação).
 * @returns {HTMLTableSectionElement} Cabeçalho pronto.
 */
function montarCabecalhoQuadroProgressoAula(dados) {
    const cabecalho = document.createElement('thead');
    const linha = document.createElement('tr');
    linha.appendChild(criarCelulaQuadroProgressoAula('th', CLASSE_QUADRO_PROGRESSO_AULA +
        '__aluno', 'Aluno'));
    dados.atividades.forEach((atividade) => {
        const entregues = contarEntreguesQuadroProgressoAula(
            dados.situacoes.get(atividade.id), dados.alunos);
        const celula = criarCelulaQuadroProgressoAula('th', CLASSE_QUADRO_PROGRESSO_AULA +
            '__atividade', atividade.nome);
        celula.appendChild(criarCelulaQuadroProgressoAula('small', CLASSE_QUADRO_PROGRESSO_AULA +
            '__contagem', entregues + ' de ' + dados.alunos.length + ' entregues'));
        linha.appendChild(celula);
    });
    cabecalho.appendChild(linha);
    return cabecalho;
}

/**
 * Monta a linha de um aluno, com a situação dele em cada atividade.
 * @param {{id: string, nome: string}} aluno - Aluno.
 * @param {Object} dados - atividades e situacoes (atividade → aluno → situação).
 * @returns {HTMLTableRowElement} Linha pronta.
 */
function montarLinhaQuadroProgressoAula(aluno, dados) {
    const linha = document.createElement('tr');
    linha.appendChild(criarCelulaQuadroProgressoAula('td', CLASSE_QUADRO_PROGRESSO_AULA +
        '__aluno', aluno.nome));
    dados.atividades.forEach((atividade) => {
        const situacao = dados.situacoes.get(atividade.id).get(aluno.id) ||
            window.SITUACOES_PROGRESSO_AULA.vazia;
        linha.appendChild(criarCelulaQuadroProgressoAula('td', CLASSE_QUADRO_PROGRESSO_AULA +
            '__celula ' + CLASSE_QUADRO_PROGRESSO_AULA + '__celula--' + situacao,
        TEXTOS_SITUACAO_PROGRESSO_AULA[situacao]));
    });
    return linha;
}

/**
 * Desenha o quadro alunos × atividades no corpo do modal.
 * @param {HTMLElement} corpo - Corpo do modal.
 * @param {{atividades: Object[], alunos: Object[], situacoes: Map}} dados - O que desenhar.
 */
function desenharQuadroProgressoAula(corpo, dados) {
    if (!dados.atividades.length) {
        corpo.textContent = MSG_SEM_ATIVIDADES_PROGRESSO_AULA;
        return;
    }
    if (!dados.alunos.length) {
        corpo.textContent = MSG_SEM_ALUNOS_PROGRESSO_AULA;
        return;
    }
    const tabela = document.createElement('table');
    tabela.className = CLASSE_QUADRO_PROGRESSO_AULA;
    const corpoTabela = document.createElement('tbody');
    dados.alunos.forEach((aluno) => corpoTabela.appendChild(
        montarLinhaQuadroProgressoAula(aluno, dados)));
    tabela.append(montarCabecalhoQuadroProgressoAula(dados), corpoTabela);
    const filtro = typeof window.criarFiltroProgressoAula === 'function'
        ? window.criarFiltroProgressoAula({ ...dados, tabela }) : null;
    corpo.replaceChildren(...(filtro ? [filtro] : []), tabela);
}

/**
 * Mostra no corpo do modal uma mensagem de estado (carregando ou erro), sem desenhar lista.
 * @param {HTMLElement} corpo - Corpo do modal.
 * @param {string} texto - Mensagem.
 * @param {boolean} ehErro - true para o estilo de erro.
 */
function mostrarMensagemProgressoAula(corpo, texto, ehErro) {
    const mensagem = document.createElement('p');
    mensagem.className = CLASSE_QUADRO_PROGRESSO_AULA + '__mensagem' +
        (ehErro ? ' ' + CLASSE_QUADRO_PROGRESSO_AULA + '__mensagem--erro' : '');
    mensagem.textContent = texto;
    corpo.replaceChildren(mensagem);
}

/**
 * Lê os dados da aula e desenha o quadro no corpo do modal: "Carregando…" enquanto lê e, se o
 * banco falhar, só a mensagem de erro (nunca uma lista montada por outra fonte).
 * @param {HTMLElement} corpo - Corpo do modal.
 * @param {{aula: {id: number}}} item - Card e aula.
 * @returns {Promise<void>} Resolve quando o quadro (ou o erro) estiver na tela.
 */
async function montarQuadroProgressoAula(corpo, item) {
    mostrarMensagemProgressoAula(corpo, MSG_CARREGANDO_PROGRESSO_AULA, false);
    try {
        const atividades = await window.lerAtividadesDaAula(item.aula.id);
        const dias = [...new Set(atividades.map((atividade) => atividade.dia).filter(Boolean))];
        const [{ alunos }, situacoes] = await Promise.all([
            window.lerAlunosPresentesDaTurma({ dias }),
            window.lerSituacoesDasAtividades(atividades)]);
        desenharQuadroProgressoAula(corpo, { atividades, alunos, situacoes });
    } catch (erro) {
        mostrarMensagemProgressoAula(corpo, MSG_ERRO_PROGRESSO_AULA + erro.message, true);
    }
}

window.montarQuadroProgressoAula = montarQuadroProgressoAula;
