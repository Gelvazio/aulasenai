// Página scripts/criarUsuariosBancoDados.html: uma aba por turma; cada aba lista os alunos com
// "Cadastrado" (Sim/Não, de auth.users), seleção, marcar todos, filtro e um botão que grava só os
// selecionados. Depende de criar-usuarios-api.js, criar-usuarios-tabela.js e das listas
// window.LISTA_PRESENCA e window.LISTAS_PRESENCA (arquivos LISTA-PRESENCA*.js da pasta).

const MSG_SEM_LISTA = 'Nenhuma lista encontrada. Coloque os arquivos LISTA-PRESENCA*.js nesta pasta.';
const MSG_GRAVANDO = 'Gravando...';
const MSG_CONSULTA_FALHOU = 'Não foi possível consultar auth.users (coluna Cadastrado = "?"): ';
const MSG_CONSULTA_OK = 'Cadastrado: consulta feita em auth.users ao abrir a página.';
const IDS_GUIA = {
    turmas: 'guiaTurmas',
    abas: 'guiaAbas',
    redefinir: 'guiaRedefinir',
    aviso: 'guiaAviso',
};

/**
 * Obtém um elemento da página pelo nome lógico.
 * @param {string} chave - Chave de IDS_GUIA.
 * @returns {HTMLElement} Elemento encontrado.
 */
function obterElementoGuia(chave) {
    return document.getElementById(IDS_GUIA[chave]);
}

/**
 * Junta as turmas de todas as listas carregadas (window.LISTA_PRESENCA e window.LISTAS_PRESENCA).
 * @returns {Object[]} Turmas de todas as listas; vazio se nenhuma lista foi carregada.
 */
function reunirTurmasPresenca() {
    const listas = [window.LISTA_PRESENCA, ...(window.LISTAS_PRESENCA || [])].filter(Boolean);
    return listas.flatMap((lista) => lista.turmas || []);
}

/**
 * Consulta os cadastrados em auth.users e avisa o resultado na página.
 * @returns {Promise<Map<string, string>|null>} E-mails cadastrados; null se a consulta falhou.
 */
async function consultarCadastradosGuia() {
    const aviso = obterElementoGuia('aviso');
    try {
        const cadastrados = await consultarCadastradosUsuarios();
        aviso.textContent = MSG_CONSULTA_OK;
        aviso.classList.remove('guia-erro');
        return cadastrados;
    } catch (erro) {
        aviso.textContent = MSG_CONSULTA_FALHOU + erro.message;
        aviso.classList.add('guia-erro');
        return null;
    }
}

/**
 * Atualiza o texto e a disponibilidade do botão conforme a quantidade de alunos marcados.
 * @param {HTMLButtonElement} botao - Botão de gravar da turma.
 * @param {HTMLTableElement} tabela - Tabela de alunos da turma.
 */
function atualizarBotaoGuia(botao, tabela) {
    const total = obterEmailsMarcadosGuia(tabela).length;
    botao.textContent = '🚀 GRAVAR SELECIONADOS (' + total + ')';
    botao.disabled = total === 0;
}

/**
 * Cria a barra de controles da turma: marcar todos e filtro por situação de cadastro.
 * @param {HTMLTableElement} tabela - Tabela de alunos da turma.
 * @param {Function} aoMudar - Chamada quando a seleção ou o filtro mudam.
 * @returns {HTMLDivElement} Barra pronta (com a propriedade filtro).
 */
function criarBarraControlesGuia(tabela, aoMudar) {
    const barra = document.createElement('div');
    barra.className = 'guia-controles';

    const marcarTodos = document.createElement('input');
    marcarTodos.type = 'checkbox';
    marcarTodos.className = 'guia-interruptor';
    marcarTodos.setAttribute('role', 'switch');
    marcarTodos.addEventListener('change', () => {
        marcarTodosGuia(tabela, marcarTodos.checked);
        aoMudar();
    });
    const rotuloTodos = document.createElement('label');
    rotuloTodos.append(marcarTodos, ' Marcar todos');

    const filtro = document.createElement('select');
    filtro.className = 'guia-filtro';
    filtro.innerHTML = '<option value="' + FILTRO_TODOS + '">Todos</option>'
        + '<option value="' + FILTRO_SIM + '">Gravados (Sim)</option>'
        + '<option value="' + FILTRO_NAO + '">Não gravados (Não)</option>';
    filtro.addEventListener('change', () => {
        marcarTodos.checked = false;
        aplicarFiltroGuia(tabela, filtro.value);
        aoMudar();
    });
    const rotuloFiltro = document.createElement('label');
    rotuloFiltro.append('Filtrar: ', filtro);

    barra.append(rotuloTodos, rotuloFiltro);
    barra.filtro = filtro;
    barra.marcarTodos = marcarTodos;
    return barra;
}

/**
 * Consulta auth.users de novo e atualiza a coluna Cadastrado, o filtro e o botão de cada aba.
 */
async function atualizarTodasAsTabelasGuia() {
    const cadastrados = await consultarCadastradosGuia();
    document.querySelectorAll('.guia-cartao[data-turma]').forEach((cartao) => {
        atualizarSituacoesGuia(cartao.querySelector('.guia-tabela'), cadastrados);
        cartao.reaplicarFiltro();
    });
}

/**
 * Grava só os alunos selecionados da turma, depois de confirmar, e atualiza a coluna Cadastrado.
 * @param {{turma: Object, botao: HTMLElement, tabela: HTMLElement, resultado: HTMLElement}}
 *     contexto - Turma e elementos da aba.
 */
async function gravarSelecionadosGuia(contexto) {
    const { turma, botao, tabela, resultado } = contexto;
    const emails = new Set(obterEmailsMarcadosGuia(tabela));
    const turmaSelecionada = { ...turma, alunos: turma.alunos.filter((a) => emails.has(a.email)) };
    const pergunta = 'Gravar ' + emails.size + ' usuário(s) da turma ' + turma.nome + '?';
    if (!emails.size || !window.confirm(pergunta)) return;

    botao.disabled = true;
    resultado.textContent = MSG_GRAVANDO + '\n';
    try {
        const resumo = await gravarListaNoSupabase({ turmas: [turmaSelecionada] }, {
            redefinirSenhas: obterElementoGuia('redefinir').checked,
            aoResultado: (situacao, email) => {
                resultado.textContent += situacao.padEnd(12) + email + '\n';
            },
        });
        resultado.textContent += '\nResumo: ' + JSON.stringify(resumo) + '\n';
    } catch (erro) {
        resultado.textContent += '\n' + erro.message + '\n';
    }
    await atualizarTodasAsTabelasGuia();
}

/**
 * Cria o cartão de uma turma: título, controles, botão, resultado e tabela de alunos.
 * @param {Object} turma - Turma da lista de presença.
 * @param {Map<string, string>|null} cadastrados - E-mails cadastrados.
 * @returns {HTMLElement} Cartão pronto.
 */
function criarCartaoTurmaGuia(turma, cadastrados) {
    const cartao = document.createElement('section');
    cartao.className = 'guia-cartao';
    cartao.dataset.turma = turma.codigo;

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'guia-botao';
    const resultado = document.createElement('pre');
    resultado.className = 'guia-comando';
    const aoMudar = () => {
        atualizarBotaoGuia(botao, tabela);
        barra.marcarTodos.checked = todosVisiveisMarcadosGuia(tabela);
    };
    const tabela = criarTabelaAlunosGuia(turma, cadastrados, aoMudar);
    const barra = criarBarraControlesGuia(tabela, aoMudar);
    botao.addEventListener('click', () => gravarSelecionadosGuia(
        { turma, botao, tabela, resultado }));
    cartao.reaplicarFiltro = () => {
        aplicarFiltroGuia(tabela, barra.filtro.value);
        aoMudar();
    };

    const titulo = document.createElement('h2');
    titulo.textContent = turma.nome + ' (código: ' + turma.codigo + ') — '
        + turma.alunos.length + ' alunos';
    cartao.append(titulo, barra, botao, resultado, tabela);
    aoMudar();
    return cartao;
}

/**
 * Mostra só o cartão da aba escolhida e marca a aba como ativa.
 * @param {number} indice - Posição da turma escolhida.
 */
function alternarAbaGuia(indice) {
    const cartoes = obterElementoGuia('turmas').children;
    const abas = obterElementoGuia('abas').children;
    Array.from(cartoes).forEach((cartao, posicao) => {
        cartao.hidden = posicao !== indice;
        abas[posicao].classList.toggle('guia-aba--ativa', posicao === indice);
    });
}

/**
 * Cria o botão de aba de uma turma.
 * @param {Object} turma - Turma da aba.
 * @param {number} indice - Posição da turma.
 * @returns {HTMLButtonElement} Botão da aba.
 */
function criarAbaTurmaGuia(turma, indice) {
    const aba = document.createElement('button');
    aba.type = 'button';
    aba.className = 'guia-aba';
    aba.textContent = turma.nome + ' (' + turma.alunos.length + ')';
    aba.addEventListener('click', () => alternarAbaGuia(indice));
    return aba;
}

/**
 * Inicia a página: consulta auth.users e monta as abas com um cartão por turma.
 */
async function iniciarGuiaUsuarios() {
    const turmas = reunirTurmasPresenca();
    if (!turmas.length) {
        const aviso = obterElementoGuia('aviso');
        aviso.textContent = MSG_SEM_LISTA;
        aviso.classList.add('guia-erro');
        return;
    }
    const cadastrados = await consultarCadastradosGuia();
    obterElementoGuia('abas').replaceChildren(...turmas.map(criarAbaTurmaGuia));
    obterElementoGuia('turmas').replaceChildren(
        ...turmas.map((turma) => criarCartaoTurmaGuia(turma, cadastrados)));
    alternarAbaGuia(0);
}

iniciarGuiaUsuarios();
