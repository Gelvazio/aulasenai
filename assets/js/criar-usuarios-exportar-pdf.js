// Botão "Exportar Usuários em PDF" da página scripts/criarUsuariosBancoDados.html: monta uma folha
// só com as linhas marcadas (e visíveis) da tabela de consulta da turma e abre a impressão do
// navegador ("Salvar como PDF"). Só funciona em host local (HOSTS_LOCAIS, de criar-usuarios-api.js),
// porque a tabela pode mostrar a senha inicial dos alunos marcados.

const ID_FOLHA_EXPORTACAO = 'guiaExportacaoPdf';
const CLASSE_EXPORTANDO = 'guia-exportando';
const TEXTO_BOTAO_EXPORTAR = '📄 Exportar Usuários em PDF';
const MSG_EXPORTAR_HOST_NAO_LOCAL = 'A exportação em PDF só funciona em 127.0.0.1 ou localhost.';
const MSG_EXPORTAR_SEM_SELECAO = 'Marque ao menos um usuário para exportar.';
const COLUNAS_EXPORTACAO = ['Nº', 'Aluno', 'Aluno anotou?', 'E-mail de login', 'Senha', 'Cadastrado'];

/**
 * Diz se a página está aberta em um host local.
 * @returns {boolean} true em 127.0.0.1 ou localhost.
 */
function estaEmHostLocalExportacao() {
    return HOSTS_LOCAIS.includes(location.hostname);
}

/**
 * Lê os textos de uma linha da tabela de consulta, na ordem de COLUNAS_EXPORTACAO.
 * @param {HTMLTableRowElement} linha - Linha do aluno.
 * @returns {string[]} Textos das colunas.
 */
function lerLinhaExportacao(linha) {
    const celulas = Array.from(linha.cells).slice(1);
    return celulas.map((celula) => {
        const escolha = celula.querySelector('select');
        return escolha ? escolha.value : celula.textContent.trim();
    });
}

/**
 * Lista as linhas marcadas e visíveis da tabela (as ocultas pelo filtro não saem).
 * @param {HTMLTableElement} tabela - Tabela de consulta da turma.
 * @returns {HTMLTableRowElement[]} Linhas selecionadas.
 */
function obterLinhasMarcadasExportacao(tabela) {
    return obterLinhasGuia(tabela)
        .filter((linha) => !linha.hidden && linha.querySelector('.guia-marcar').checked);
}

/**
 * Cria a tabela da folha de exportação com as linhas informadas.
 * @param {string[][]} linhas - Textos de cada linha.
 * @returns {HTMLTableElement} Tabela pronta.
 */
function criarTabelaExportacao(linhas) {
    const tabela = document.createElement('table');
    tabela.className = 'guia-exportacao__tabela';
    const cabecalho = tabela.createTHead().insertRow();
    COLUNAS_EXPORTACAO.forEach((coluna) => {
        const celula = document.createElement('th');
        celula.textContent = coluna;
        cabecalho.append(celula);
    });
    const corpo = tabela.createTBody();
    linhas.forEach((textos) => {
        const linha = corpo.insertRow();
        textos.forEach((texto) => { linha.insertCell().textContent = texto; });
    });
    return tabela;
}

/**
 * Monta a folha de exportação (título, data e hora, total e tabela) no fim do body.
 * @param {string} tituloTurma - Título da turma.
 * @param {string[][]} linhas - Textos das linhas selecionadas.
 * @returns {HTMLElement} Folha pronta.
 */
function montarFolhaExportacao(tituloTurma, linhas) {
    document.getElementById(ID_FOLHA_EXPORTACAO)?.remove();
    const folha = document.createElement('section');
    folha.id = ID_FOLHA_EXPORTACAO;
    folha.className = 'guia-exportacao';
    const titulo = document.createElement('h1');
    titulo.textContent = 'Usuários — ' + tituloTurma;
    const resumo = document.createElement('p');
    resumo.textContent = 'Exportado em ' + new Date().toLocaleString('pt-BR')
        + ' · ' + linhas.length + ' usuário(s)';
    folha.append(titulo, resumo, criarTabelaExportacao(linhas));
    document.body.append(folha);
    return folha;
}

/**
 * Exporta em PDF (impressão do navegador) os usuários marcados da tabela de consulta.
 * @param {HTMLTableElement} tabela - Tabela de consulta da turma.
 * @param {string} tituloTurma - Título da turma, usado no cabeçalho da folha.
 */
async function exportarUsuariosPdf(tabela, tituloTurma) {
    if (!estaEmHostLocalExportacao()) {
        await mostrarPopup(MSG_EXPORTAR_HOST_NAO_LOCAL, { tipo: 'erro' });
        return;
    }
    const linhas = obterLinhasMarcadasExportacao(tabela).map(lerLinhaExportacao);
    if (!linhas.length) {
        await mostrarPopup(MSG_EXPORTAR_SEM_SELECAO, { tipo: 'info' });
        return;
    }
    const folha = montarFolhaExportacao(tituloTurma, linhas);
    document.body.classList.add(CLASSE_EXPORTANDO);
    window.addEventListener('afterprint', () => {
        document.body.classList.remove(CLASSE_EXPORTANDO);
        folha.remove();
    }, { once: true });
    window.print();
}

/**
 * Cria o botão "Exportar Usuários em PDF" da turma.
 * @param {HTMLTableElement} tabela - Tabela de consulta da turma.
 * @param {string} tituloTurma - Título da turma.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoExportarPdf(tabela, tituloTurma) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'guia-botao guia-exportar';
    botao.addEventListener('click', () => exportarUsuariosPdf(tabela, tituloTurma));
    return botao;
}

/**
 * Atualiza o texto (com o total marcado) e o estado do botão de exportação.
 * Fica desabilitado fora do host local ou sem usuário marcado.
 * @param {HTMLButtonElement} botao - Botão de exportação.
 * @param {HTMLTableElement} tabela - Tabela de consulta da turma.
 */
function atualizarBotaoExportarPdf(botao, tabela) {
    const total = obterLinhasMarcadasExportacao(tabela).length;
    botao.textContent = TEXTO_BOTAO_EXPORTAR + ' (' + total + ')';
    botao.disabled = !estaEmHostLocalExportacao() || total === 0;
    botao.title = estaEmHostLocalExportacao() ? '' : MSG_EXPORTAR_HOST_NAO_LOCAL;
}
