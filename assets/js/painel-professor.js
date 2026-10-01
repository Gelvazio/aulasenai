// Painel do professor: respostas, acertos, notas e entregas das atividades, por turma.
// Tentativas: o limite vem do banco (atividade.max_tentativas); a nota do aluno é a MELHOR.
// O professor libera uma nova tentativa clicando no aluno (RPC liberar_nova_tentativa).
// Plano: docs/regra-3-tentativas-atividade.md.
// Acesso: login pelo Supabase Auth com app_metadata.perfil = "PROFESSOR" (o RLS também exige).
// Depende de: supabase-js v2 (CDN), js/supabase.js (obterClienteSupabase, sbGet) e js/login.js.

const PERFIL_PROFESSOR = 'PROFESSOR';
const NOTA_MAXIMA = 10;
const CASAS_NOTA = 1;
const SEPARADOR_CSV = ';';
const ROTA_LIBERAR = '/rest/v1/rpc/liberar_nova_tentativa';
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
const SELECT_ATIVIDADES = 'select=id,descricao,data_atividade,total_itens,max_tentativas,pagina,' +
    'aulas(numero,titulo,materia(descricao,curso(nome_completo)))&order=data_atividade.desc,id';
const MSG_ENTRAR = 'Entre com a sua conta de professor para ver o painel.';
const MSG_RESTRITO = 'Acesso restrito ao professor.';
const MSG_SEM_ATIVIDADES = 'Nenhuma atividade cadastrada no banco ainda.';
const MSG_ERRO_LIBERAR = 'Não foi possível liberar a ';
const NOTA_MINIMA_APROVACAO = 7;
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
 * Devolve (criando se preciso) a tentativa de um aluno no mapa de tentativas.
 * @param {Object} mapa - Mapa aluno → tentativa → dados.
 * @param {string} alunoId - Id do aluno.
 * @param {number} numero - Número da tentativa.
 * @returns {{numero: number, respostas: Object, entregueEm: string}} Tentativa.
 */
function obterTentativa(mapa, alunoId, numero) {
    mapa[alunoId] = mapa[alunoId] || {};
    mapa[alunoId][numero] = mapa[alunoId][numero] ||
        { numero, respostas: {}, entregueEm: '' };
    return mapa[alunoId][numero];
}

/**
 * Agrupa respostas, entregas e liberações por aluno e por tentativa.
 * @param {Object[]} respostas - Linhas de resposta_atividade.
 * @param {Object[]} entregas - Linhas de entrega_atividade.
 * @param {Object[]} liberacoes - Linhas de liberacao_atividade.
 * @returns {Object} Mapa aluno → tentativa → {numero, respostas, entregueEm}.
 */
function agruparTentativas(respostas, entregas, liberacoes) {
    const mapa = {};
    respostas.forEach((resposta) => {
        obterTentativa(mapa, resposta.aluno_id, resposta.tentativa)
            .respostas[resposta.item] = resposta.letra;
    });
    entregas.forEach((entrega) => {
        obterTentativa(mapa, entrega.aluno_id, entrega.tentativa).entregueEm = entrega.entregue_em;
    });
    liberacoes.forEach((liberacao) => {
        obterTentativa(mapa, liberacao.aluno_id, liberacao.tentativa);
    });
    return mapa;
}

/**
 * Carrega os dados de uma atividade e turma: alunos, gabarito, respostas, entregas e liberações.
 * @param {number} atividadeId - Id da atividade.
 * @param {string} turmaCodigo - Código da turma.
 * @param {number} maximoTentativas - Limite de tentativas da atividade (vem do banco).
 * @returns {Promise<Object>} alunos, gabarito (item→letra), tentativas por aluno e o limite.
 */
async function carregarDadosAtividade(atividadeId, turmaCodigo, maximoTentativas) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [alunos, gabarito, respostas, entregas, liberacoes] = await Promise.all([
        sbGet('aluno', 'select=id,nome,email,numero_chamada&turma_codigo=eq.' +
            encodeURIComponent(turmaCodigo) + '&order=numero_chamada'),
        sbGet('gabarito', 'select=item,titulo,letra&' + filtro + '&order=item'),
        sbGet('resposta_atividade', 'select=aluno_id,tentativa,item,letra&' + filtro),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa,entregue_em&' + filtro),
        sbGet('liberacao_atividade', 'select=aluno_id,tentativa&' + filtro),
    ]);
    const tentativasPorAluno = agruparTentativas(respostas, entregas, liberacoes);
    alunos.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));
    return { alunos, gabarito, tentativasPorAluno, maximoTentativas };
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
 * Escolhe a melhor tentativa entregue (mais acertos; em empate, a mais recente).
 * @param {Object[]} tentativas - Tentativas já com o resultado calculado.
 * @returns {Object|null} Melhor tentativa entregue ou null se nenhuma foi entregue.
 */
function escolherMelhorTentativa(tentativas) {
    const entregues = tentativas.filter((tentativa) => tentativa.entregueEm);
    return entregues.reduce((melhor, tentativa) => (
        !melhor || tentativa.acertos >= melhor.acertos ? tentativa : melhor), null);
}

/**
 * Monta a linha do relatório de um aluno com todas as suas tentativas.
 * @param {Object} aluno - Linha da tabela aluno.
 * @param {Object} dados - Retorno de carregarDadosAtividade.
 * @returns {Object} Linha com tentativas, melhor resultado e se pode liberar nova tentativa.
 */
function montarLinhaRelatorio(aluno, dados) {
    const { termos } = dados;
    const brutas = Object.values(dados.tentativasPorAluno[aluno.id] || {});
    const lista = brutas.length ? brutas : [{ numero: 1, respostas: {}, entregueEm: '' }];
    const tentativas = lista.sort((a, b) => a.numero - b.numero).map((tentativa) => (
        { ...tentativa, ...calcularResultado(tentativa.respostas, dados.gabarito) }));
    const atual = tentativas[tentativas.length - 1];
    const destaque = escolherMelhorTentativa(tentativas) || atual;
    const entregas = tentativas.filter((tentativa) => tentativa.entregueEm);
    const ultimaEntrega = entregas.length ? entregas[entregas.length - 1].entregueEm : '';
    const notaDestaque = dados.gabarito.length
        ? (destaque.acertos / dados.gabarito.length) * NOTA_MAXIMA : 0;
    const aprovadoSemRecuperacao = !termos.aprovadoPodeRefazer &&
        Boolean(destaque.entregueEm) && notaDestaque >= NOTA_MINIMA_APROVACAO;
    return {
        aluno, tentativas, atual, destaque, entregueEm: ultimaEntrega, termos,
        maximo: dados.maximoTentativas,
        podeLiberar: Boolean(atual.entregueEm) && atual.numero < dados.maximoTentativas &&
            !aprovadoSemRecuperacao,
        respondidas: destaque.respondidas, acertos: destaque.acertos, nota: destaque.nota,
    };
}

/**
 * Monta as linhas do relatório (uma por aluno da turma).
 * @param {Object} dados - Retorno de carregarDadosAtividade.
 * @returns {Object[]} Linhas com aluno, tentativas e resultado da melhor tentativa.
 */
function montarLinhasRelatorio(dados) {
    return dados.alunos.map((aluno) => montarLinhaRelatorio(aluno, dados));
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
    [linha.aluno.numero_chamada, linha.aluno.nome,
        linha.atual.numero + '/' + linha.maximo, linha.respondidas + '/' + totalItens,
        linha.acertos, linha.nota, formatarEntrega(linha.entregueEm)]
        .forEach((valor) => tr.appendChild(criarElementoPainel('td', '', valor ?? '')));
    tr.tabIndex = 0;
    tr.addEventListener('click', aoClicar);
    tr.addEventListener('keydown', (evento) => { if (evento.key === 'Enter') aoClicar(); });
    return tr;
}

/**
 * Monta a tabela item a item de uma tentativa, comparada ao gabarito.
 * @param {Object} tentativa - Tentativa com as respostas marcadas.
 * @param {{item: number, titulo: string, letra: string}[]} gabarito - Gabarito.
 * @returns {HTMLTableElement} Tabela de respostas.
 */
function montarTabelaTentativa(tentativa, gabarito) {
    const tabela = criarElementoPainel('table', 'painel-tabela');
    const cabecalho = tabela.createTHead().insertRow();
    ['Item', 'Questão', 'Marcada', 'Gabarito', ''].forEach((texto) => {
        cabecalho.appendChild(criarElementoPainel('th', '', texto));
    });
    const corpo = tabela.createTBody();
    gabarito.forEach((item) => {
        const marcada = tentativa.respostas[item.item] || '—';
        const acertou = marcada === item.letra;
        const tr = corpo.insertRow();
        tr.className = acertou ? 'item--acerto' : 'item--erro';
        [item.item, item.titulo, marcada, item.letra, acertou ? '✔' : '✘']
            .forEach((valor) => tr.appendChild(criarElementoPainel('td', '', valor)));
    });
    return tabela;
}

/**
 * Descreve uma tentativa para o título da aba (número, situação e nota). Nas avaliações, a
 * 1ª é a "Avaliação" e as seguintes, "Recuperação".
 * @param {Object} tentativa - Tentativa com resultado.
 * @param {Object} termos - Vocabulário da atividade (assets/js/termos-tentativa.js).
 * @returns {string} Texto da aba.
 */
function rotuloTentativa(tentativa, termos) {
    const situacao = tentativa.entregueEm ? 'nota ' + tentativa.nota : 'em andamento';
    return maiusculaInicial(termos.simples(tentativa.numero)) + ' (' + situacao + ')';
}

/**
 * Pede confirmação e libera a próxima tentativa do aluno (só o professor consegue).
 * @param {Object} painel - Estado do painel.
 * @param {Object} linha - Linha do relatório do aluno.
 */
async function liberarNovaTentativa(painel, linha) {
    const proxima = linha.atual.numero + 1;
    const { termos } = linha;
    const rotuloProxima = termos.rotulo(proxima, linha.maximo);
    const pergunta = 'Liberar a ' + rotuloProxima + ' para ' + linha.aluno.nome + '?\n\n' +
        'Só as questões erradas ou em branco voltam para o aluno; as acertadas ficam mantidas.';
    const querLiberar = await confirmarPopup(pergunta,
        { titulo: 'Liberar ' + termos.nova, textoConfirmar: 'Liberar', textoCancelar: 'Cancelar' });
    if (!querLiberar) return;
    const resposta = await fetch(SUPABASE.URL + ROTA_LIBERAR, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify({ p_aluno: linha.aluno.id, p_atividade: painel.atividadeId }),
    });
    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({}));
        return mostrarPopup(MSG_ERRO_LIBERAR + termos.nova + ': ' +
            (erro.message || resposta.status), { tipo: 'erro' });
    }
    await mostrarPopup(maiusculaInicial(rotuloProxima) + ' liberada para ' +
        linha.aluno.nome + '.', { tipo: 'sucesso', titulo: maiusculaInicial(termos.nova) +
            ' liberada' });
    await atualizarRelatorio(painel, linha.aluno.id);
}

/**
 * Monta as abas Tentativa 1/2/3 e mostra a tabela da tentativa escolhida.
 * @param {HTMLElement} detalhe - Área do detalhe.
 * @param {Object} linha - Linha do relatório.
 * @param {{item: number, titulo: string, letra: string}[]} gabarito - Gabarito.
 */
function montarAbasTentativas(detalhe, linha, gabarito) {
    const abas = criarElementoPainel('div', 'painel-abas');
    const area = criarElementoPainel('div');
    linha.tentativas.forEach((tentativa) => {
        const aba = criarElementoPainel('button', 'painel-aba',
            rotuloTentativa(tentativa, linha.termos));
        aba.type = 'button';
        aba.addEventListener('click', () => {
            abas.querySelectorAll('.painel-aba').forEach((outra) => {
                outra.classList.toggle('painel-aba--ativa', outra === aba);
            });
            area.replaceChildren(montarTabelaTentativa(tentativa, gabarito));
        });
        abas.appendChild(aba);
    });
    detalhe.append(abas, area);
    abas.querySelectorAll('.painel-aba')[linha.tentativas.indexOf(linha.destaque)].click();
}

/**
 * Mostra o detalhe do aluno: abas por tentativa e o botão de liberar nova tentativa.
 * @param {Object} painel - Estado do painel (atividade e gabarito atuais).
 * @param {Object} linha - Linha do relatório.
 */
function mostrarDetalhe(painel, linha) {
    const detalhe = document.getElementById(IDS_PAINEL.detalhe);
    detalhe.replaceChildren(criarElementoPainel('h3', '', 'Respostas de ' + linha.aluno.nome));
    const usadas = linha.tentativas.length + ' de ' + linha.maximo;
    detalhe.appendChild(criarElementoPainel('p', 'painel-dica',
        linha.termos.colunaQuantidade + ' usadas: ' + usadas + ' · a nota vale a melhor.'));
    if (linha.podeLiberar) {
        detalhe.appendChild(criarBotaoLiberar(painel, linha));
    } else if (linha.atual.numero >= linha.maximo && linha.atual.entregueEm) {
        detalhe.appendChild(criarElementoPainel('p', 'painel-dica',
            linha.termos.usouTodas(linha.maximo).replace('Você', 'O aluno')));
    }
    montarAbasTentativas(detalhe, linha, painel.gabarito);
    detalhe.hidden = false;
    detalhe.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Cria o botão "Liberar nova tentativa" do aluno.
 * @param {Object} painel - Estado do painel.
 * @param {Object} linha - Linha do relatório.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoLiberar(painel, linha) {
    const proxima = linha.atual.numero + 1;
    const botao = criarElementoPainel('button', 'painel-botao', '🔓 Liberar ' +
        linha.termos.rotulo(proxima, linha.maximo));
    botao.type = 'button';
    botao.addEventListener('click', () => liberarNovaTentativa(painel, linha));
    return botao;
}

/**
 * Gera e baixa o CSV da turma para a atividade selecionada.
 * @param {Object[]} linhas - Linhas do relatório.
 * @param {string} nomeArquivo - Nome do arquivo .csv.
 */
function exportarCsv(linhas, nomeArquivo) {
    const quantidade = linhas[0]?.termos.colunaQuantidade || 'Tentativas';
    const cabecalho = ['Nº', 'Nome', 'E-mail', quantidade, 'Respondidas', 'Acertos',
        'Nota (melhor)', 'Entregue em'];
    const corpo = linhas.map((linha) => [linha.aluno.numero_chamada, linha.aluno.nome,
        linha.aluno.email, linha.atual.numero, linha.respondidas, linha.acertos, linha.nota,
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
 * @param {string} [alunoAbertoId] - Aluno cujo detalhe deve reabrir depois de atualizar.
 */
async function atualizarRelatorio(painel, alunoAbertoId) {
    const atividadeId = Number(document.getElementById(IDS_PAINEL.atividade).value);
    const turmaCodigo = document.getElementById(IDS_PAINEL.turma).value;
    const atividade = painel.atividades.find((item) => item.id === atividadeId);
    if (!atividade || !turmaCodigo) return;

    const dados = await carregarDadosAtividade(atividadeId, turmaCodigo,
        atividade.max_tentativas);
    dados.termos = termosTentativaDaPagina(atividade.pagina);
    painel.linhas = montarLinhasRelatorio(dados);
    painel.atividadeId = atividadeId;
    painel.gabarito = dados.gabarito;
    painel.nomeCsv = 'atividade-' + atividadeId + '-turma-' + turmaCodigo + '.csv';
    mostrarResumo(painel.linhas, atividade.total_itens);

    const corpo = document.querySelector('#' + IDS_PAINEL.tabela + ' tbody');
    corpo.replaceChildren(...painel.linhas.map((linha) => montarLinhaAluno(linha,
        atividade.total_itens, () => mostrarDetalhe(painel, linha))));
    document.getElementById(IDS_PAINEL.detalhe).hidden = true;
    const aberta = painel.linhas.find((linha) => linha.aluno.id === alunoAbertoId);
    if (aberta) mostrarDetalhe(painel, aberta);
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

        const painel = { atividades: [], linhas: [], nomeCsv: '', atividadeId: 0, gabarito: [] };
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
