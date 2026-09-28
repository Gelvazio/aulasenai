// Painel do professor: respostas, acertos, notas e entregas das atividades, por turma.
// Acesso: login pelo Supabase Auth com app_metadata.perfil = "PROFESSOR" (o RLS também exige).
// Depende de: supabase-js v2 (CDN), js/supabase.js (obterClienteSupabase, sbGet) e js/login.js.

const PERFIL_PROFESSOR = 'PROFESSOR';
const NOTA_MAXIMA = 10;
const CASAS_NOTA = 1;
const SEPARADOR_CSV = ';';
const IDS_PAINEL = {
    aviso: 'painelAviso',
    conteudo: 'painelConteudo',
    usuario: 'painelUsuario',
    atividade: 'filtroAtividade',
    turma: 'filtroTurma',
    resumo: 'painelResumo',
    tabela: 'tabelaAlunos',
    detalhe: 'painelDetalhe',
    exportar: 'btnExportarCsv',
    sair: 'btnSairPainel',
};
const SELECT_ATIVIDADES = 'select=id,descricao,data_atividade,total_itens,' +
    'aulas(numero,titulo,materia(descricao,curso(nome_completo)))&order=data_atividade.desc,id';
const MSG_ENTRAR = 'Entre com a sua conta de professor para ver o painel.';
const MSG_RESTRITO = 'Acesso restrito ao professor.';
const MSG_SEM_ATIVIDADES = 'Nenhuma atividade cadastrada no banco ainda.';
const MSG_ERRO = 'Não foi possível carregar os dados. ' +
    'Verifique se o projeto Supabase está ativo.';

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string|number} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoPainel(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = String(texto);
    return elemento;
}

/**
 * Mostra um aviso no lugar do painel (opcionalmente com botão de login).
 * @param {string} mensagem - Texto do aviso.
 * @param {boolean} [comLogin] - Se mostra o botão "Entrar".
 */
function mostrarAvisoPainel(mensagem, comLogin) {
    const aviso = document.getElementById(IDS_PAINEL.aviso);
    aviso.replaceChildren(criarElementoPainel('p', '', mensagem));
    if (comLogin) {
        const link = criarElementoPainel('a', 'painel-botao', '🔑 Entrar');
        const retorno = encodeURIComponent(location.pathname);
        link.href = PAGINA_LOGIN + '?' + PARAMETRO_VOLTAR + '=' + retorno;
        aviso.appendChild(link);
    }
    aviso.hidden = false;
    document.getElementById(IDS_PAINEL.conteudo).hidden = true;
}

/**
 * Verifica a sessão e o perfil de professor.
 * @returns {Promise<Object|null>} Usuário professor ou null (aviso já exibido).
 */
async function obterProfessor() {
    const cliente = obterClienteSupabase();
    if (!cliente) {
        mostrarAvisoPainel(MSG_ERRO);
        return null;
    }
    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    if (!usuario) {
        mostrarAvisoPainel(MSG_ENTRAR, true);
        return null;
    }
    if (usuario.app_metadata?.perfil !== PERFIL_PROFESSOR) {
        mostrarAvisoPainel(MSG_RESTRITO);
        return null;
    }
    return usuario;
}

/**
 * Monta o texto de uma atividade para o filtro (curso › matéria › aula · data).
 * @param {Object} atividade - Linha da atividade com aulas/matéria/curso.
 * @returns {string} Rótulo da opção.
 */
function rotuloAtividade(atividade) {
    const aula = atividade.aulas || {};
    const materia = aula.materia || {};
    const curso = materia.curso?.nome_completo || '';
    const data = new Date(atividade.data_atividade + 'T00:00:00').toLocaleDateString('pt-BR');
    return [curso, materia.descricao, 'Aula ' + aula.numero + ' — ' + aula.titulo]
        .filter(Boolean).join(' › ') + ' · ' + data;
}

/**
 * Preenche um <select> com opções.
 * @param {HTMLSelectElement} select - Campo a preencher.
 * @param {{valor: string, texto: string}[]} opcoes - Opções.
 */
function preencherSelect(select, opcoes) {
    select.replaceChildren(...opcoes.map((opcao) => {
        const elemento = criarElementoPainel('option', '', opcao.texto);
        elemento.value = opcao.valor;
        return elemento;
    }));
}

/**
 * Carrega os dados de uma atividade e turma: alunos, gabarito, respostas e entregas.
 * @param {number} atividadeId - Id da atividade.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {Promise<Object>} alunos, gabarito (item→letra), respostas e entregas por aluno.
 */
async function carregarDadosAtividade(atividadeId, turmaCodigo) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [alunos, gabarito, respostas, entregas] = await Promise.all([
        sbGet('aluno', 'select=id,nome,email,numero_chamada&turma_codigo=eq.' +
            encodeURIComponent(turmaCodigo) + '&order=numero_chamada'),
        sbGet('gabarito', 'select=item,titulo,letra&' + filtro + '&order=item'),
        sbGet('resposta_atividade', 'select=aluno_id,item,letra&' + filtro),
        sbGet('entrega_atividade', 'select=aluno_id,entregue_em&' + filtro),
    ]);
    const respostasPorAluno = {};
    respostas.forEach((resposta) => {
        respostasPorAluno[resposta.aluno_id] = respostasPorAluno[resposta.aluno_id] || {};
        respostasPorAluno[resposta.aluno_id][resposta.item] = resposta.letra;
    });
    const entregasPorAluno = Object.fromEntries(entregas.map((e) => [e.aluno_id, e.entregue_em]));
    return { alunos, gabarito, respostasPorAluno, entregasPorAluno };
}

/**
 * Calcula respondidas, acertos e nota de um aluno.
 * @param {Object<number, string>} respostas - Item → letra marcada.
 * @param {{item: number, letra: string}[]} gabarito - Gabarito da atividade.
 * @returns {{respondidas: number, acertos: number, nota: string}} Resultado do aluno.
 */
function calcularResultado(respostas, gabarito) {
    const respondidas = Object.keys(respostas).length;
    const acertos = gabarito.filter((linha) => respostas[linha.item] === linha.letra).length;
    const nota = gabarito.length ? (acertos / gabarito.length) * NOTA_MAXIMA : 0;
    return { respondidas, acertos, nota: nota.toFixed(CASAS_NOTA).replace('.', ',') };
}

/**
 * Monta as linhas do relatório (uma por aluno da turma).
 * @param {Object} dados - Retorno de carregarDadosAtividade.
 * @returns {Object[]} Linhas com aluno, resultado e entrega.
 */
function montarLinhasRelatorio(dados) {
    return dados.alunos.map((aluno) => {
        const respostas = dados.respostasPorAluno[aluno.id] || {};
        const entregueEm = dados.entregasPorAluno[aluno.id] || '';
        return { aluno, respostas, entregueEm, ...calcularResultado(respostas, dados.gabarito) };
    });
}

/**
 * Formata a data/hora da entrega para exibição.
 * @param {string} entregueEm - Data ISO ou vazio.
 * @returns {string} Data formatada ou "—".
 */
function formatarEntrega(entregueEm) {
    return entregueEm ? new Date(entregueEm).toLocaleString('pt-BR') : '—';
}

/**
 * Mostra o resumo da turma (entregas e média).
 * @param {Object[]} linhas - Linhas do relatório.
 * @param {number} totalItens - Total de itens da atividade.
 */
function mostrarResumo(linhas, totalItens) {
    const entregues = linhas.filter((linha) => linha.entregueEm);
    const soma = entregues.reduce((total, linha) => total + linha.acertos, 0);
    const media = entregues.length ? (soma / entregues.length / totalItens) * NOTA_MAXIMA : 0;
    document.getElementById(IDS_PAINEL.resumo).textContent =
        linhas.length + ' alunos · ' + entregues.length + ' entregas · média das entregas: ' +
        media.toFixed(CASAS_NOTA).replace('.', ',');
}

/**
 * Monta a linha da tabela de um aluno.
 * @param {Object} linha - Linha do relatório.
 * @param {number} totalItens - Total de itens da atividade.
 * @param {Function} aoClicar - Abre o detalhe do aluno.
 * @returns {HTMLTableRowElement} Linha.
 */
function montarLinhaAluno(linha, totalItens, aoClicar) {
    const tr = document.createElement('tr');
    tr.className = linha.entregueEm ? 'aluno--entregue' : 'aluno--pendente';
    [linha.aluno.numero_chamada, linha.aluno.nome, linha.respondidas + '/' + totalItens,
        linha.acertos, linha.nota, formatarEntrega(linha.entregueEm)]
        .forEach((valor) => tr.appendChild(criarElementoPainel('td', '', valor ?? '')));
    tr.tabIndex = 0;
    tr.addEventListener('click', aoClicar);
    tr.addEventListener('keydown', (evento) => { if (evento.key === 'Enter') aoClicar(); });
    return tr;
}

/**
 * Mostra, item a item, a resposta do aluno comparada ao gabarito.
 * @param {Object} linha - Linha do relatório.
 * @param {{item: number, titulo: string, letra: string}[]} gabarito - Gabarito.
 */
function mostrarDetalhe(linha, gabarito) {
    const detalhe = document.getElementById(IDS_PAINEL.detalhe);
    detalhe.replaceChildren(criarElementoPainel('h3', '', 'Respostas de ' + linha.aluno.nome));
    const tabela = criarElementoPainel('table', 'painel-tabela');
    const cabecalho = tabela.createTHead().insertRow();
    ['Item', 'Questão', 'Marcada', 'Gabarito', ''].forEach((texto) => {
        cabecalho.appendChild(criarElementoPainel('th', '', texto));
    });
    const corpo = tabela.createTBody();
    gabarito.forEach((item) => {
        const marcada = linha.respostas[item.item] || '—';
        const acertou = marcada === item.letra;
        const tr = corpo.insertRow();
        tr.className = acertou ? 'item--acerto' : 'item--erro';
        [item.item, item.titulo, marcada, item.letra, acertou ? '✔' : '✘']
            .forEach((valor) => tr.appendChild(criarElementoPainel('td', '', valor)));
    });
    detalhe.appendChild(tabela);
    detalhe.hidden = false;
    detalhe.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Gera e baixa o CSV da turma para a atividade selecionada.
 * @param {Object[]} linhas - Linhas do relatório.
 * @param {string} nomeArquivo - Nome do arquivo .csv.
 */
function exportarCsv(linhas, nomeArquivo) {
    const cabecalho = ['Nº', 'Nome', 'E-mail', 'Respondidas', 'Acertos', 'Nota', 'Entregue em'];
    const corpo = linhas.map((linha) => [linha.aluno.numero_chamada, linha.aluno.nome,
        linha.aluno.email, linha.respondidas, linha.acertos, linha.nota,
        formatarEntrega(linha.entregueEm)]);
    const celulaCsv = (valor) => '"' + String(valor ?? '').replace(/"/g, '""') + '"';
    const texto = [cabecalho, ...corpo]
        .map((colunas) => colunas.map(celulaCsv).join(SEPARADOR_CSV))
        .join('\r\n');
    const blob = new Blob(['﻿' + texto], { type: 'text/csv;charset=utf-8' });
    const link = criarElementoPainel('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(link.href);
}

/**
 * Carrega e mostra o relatório da atividade e turma escolhidas nos filtros.
 * @param {Object} painel - Estado do painel (atividades carregadas e relatório atual).
 */
async function atualizarRelatorio(painel) {
    const atividadeId = Number(document.getElementById(IDS_PAINEL.atividade).value);
    const turmaCodigo = document.getElementById(IDS_PAINEL.turma).value;
    const atividade = painel.atividades.find((item) => item.id === atividadeId);
    if (!atividade || !turmaCodigo) return;

    const dados = await carregarDadosAtividade(atividadeId, turmaCodigo);
    painel.linhas = montarLinhasRelatorio(dados);
    painel.nomeCsv = 'atividade-' + atividadeId + '-turma-' + turmaCodigo + '.csv';
    mostrarResumo(painel.linhas, atividade.total_itens);

    const corpo = document.querySelector('#' + IDS_PAINEL.tabela + ' tbody');
    corpo.replaceChildren(...painel.linhas.map((linha) => montarLinhaAluno(linha,
        atividade.total_itens, () => mostrarDetalhe(linha, dados.gabarito))));
    document.getElementById(IDS_PAINEL.detalhe).hidden = true;
}

/**
 * Carrega atividades e turmas nos filtros e liga os eventos.
 * @param {Object} painel - Estado do painel.
 * @returns {Promise<boolean>} false se não houver atividades.
 */
async function prepararFiltros(painel) {
    const [atividades, turmas] = await Promise.all([
        sbGet('atividade', SELECT_ATIVIDADES),
        sbGet('turma', 'select=codigo,nome&order=codigo'),
    ]);
    if (!atividades.length) return false;
    painel.atividades = atividades;
    const opcoesAtividade = atividades.map((atividade) => ({
        valor: atividade.id, texto: rotuloAtividade(atividade),
    }));
    const opcoesTurma = turmas.map((turma) => ({
        valor: turma.codigo, texto: turma.nome + ' (' + turma.codigo + ')',
    }));
    preencherSelect(document.getElementById(IDS_PAINEL.atividade), opcoesAtividade);
    preencherSelect(document.getElementById(IDS_PAINEL.turma), opcoesTurma);
    [IDS_PAINEL.atividade, IDS_PAINEL.turma].forEach((id) => {
        document.getElementById(id).addEventListener('change', () => atualizarRelatorio(painel));
    });
    document.getElementById(IDS_PAINEL.exportar).addEventListener('click', () => {
        if (painel.linhas.length) exportarCsv(painel.linhas, painel.nomeCsv);
    });
    return true;
}

/**
 * Inicia o painel: confere o professor, prepara os filtros e mostra o primeiro relatório.
 */
async function iniciarPainelProfessor() {
    try {
        const professor = await obterProfessor();
        if (!professor) return;
        document.getElementById(IDS_PAINEL.usuario).textContent =
            professor.user_metadata?.nome || professor.email;
        document.getElementById(IDS_PAINEL.sair).addEventListener('click', fazerLogout);

        const painel = { atividades: [], linhas: [], nomeCsv: '' };
        if (!(await prepararFiltros(painel))) return mostrarAvisoPainel(MSG_SEM_ATIVIDADES);
        document.getElementById(IDS_PAINEL.aviso).hidden = true;
        document.getElementById(IDS_PAINEL.conteudo).hidden = false;
        await atualizarRelatorio(painel);
    } catch (erro) {
        console.error(erro);
        mostrarAvisoPainel(MSG_ERRO);
    }
}

iniciarPainelProfessor();
