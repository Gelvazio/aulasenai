// Página scripts/criarUsuariosBancoDados.html: uma aba por turma; cada aba lista os alunos com
// "Cadastrado" (Sim/Não, de auth.users), seleção, marcar todos, filtro e um botão que grava só os
// selecionados. Depende de criar-usuarios-api.js, criar-usuarios-tabela.js e das listas
// window.LISTA_PRESENCA e window.LISTAS_PRESENCA (arquivos LISTA-PRESENCA*.js da pasta).

const MSG_SEM_LISTA = 'Nenhuma lista encontrada. Coloque os arquivos LISTA-PRESENCA*.js nesta pasta.';
const MSG_GRAVANDO = 'Gravando...';
const MSG_CONSULTANDO = 'Consultando auth.users...';
const MSG_SOMENTE_LEITURA = 'Modo somente leitura: senhas ocultas e gravação desabilitada.';
const MSG_CONSULTA_FALHOU = 'Não foi possível consultar auth.users (coluna Cadastrado = "?"): ';
const MSG_CONSULTA_OK = 'Cadastrado: consulta feita em auth.users ao abrir a página.';
const PERFIL_EXIGIDO_GUIA = 'PROFESSOR';
const MSG_SEM_LOGIN = 'Você não está logado. Só o professor logado pode ver as senhas e gravar.';
const MSG_SEM_PERFIL = 'Só o perfil PROFESSOR vê as senhas e grava. Seu perfil: ';
const PERFIL_DESCONHECIDO = '(sem perfil)';
const ROTA_LOGIN_GUIA = '../login.html';
const RPC_ADMINISTRADOR_GUIA = 'eh_professor_administrador';
const IDS_GUIA = {
    bloqueio: 'guiaBloqueio',
    opcoes: 'guiaOpcoes',
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
 * @returns {Object[]} Turmas de todas as listas, cada uma com a UC e o local da lista;
 *     vazio se nenhuma lista foi carregada.
 */
function reunirTurmasPresenca() {
    const listas = [window.LISTA_PRESENCA, ...(window.LISTAS_PRESENCA || [])].filter(Boolean);
    return listas.flatMap((lista) => (
        (lista.turmas || []).map((turma) => ({
            ...turma,
            uc: turma.uc || lista.uc || '',
            local: turma.local || lista.local || '',
        }))));
}

/**
 * Lê o usuário logado (sessão do Supabase Auth).
 * @returns {Promise<Object|null>} Usuário logado ou null sem sessão ou sem o cliente Supabase.
 */
async function obterUsuarioLogadoGuia() {
    try {
        const { data } = await obterClienteSupabase().auth.getSession();
        return data?.session?.user || null;
    } catch (erro) {
        return null;
    }
}

/**
 * Confere no banco se o usuário logado é o Professor Administrador.
 * O e-mail e o user_metadata não decidem nada: quem decide é eh_professor_administrador().
 * @returns {Promise<boolean>} true só se o banco confirmar; false em qualquer falha.
 */
async function ehProfessorAdministradorGuia() {
    try {
        const { data, error } = await obterClienteSupabase().rpc(RPC_ADMINISTRADOR_GUIA);
        return !error && data === true;
    } catch (erro) {
        return false;
    }
}

/**
 * Explica por que a página está só para leitura (sem login ou sem perfil de professor).
 * @param {Object|null} usuario - Usuário logado ou null.
 */
function avisarSemPermissaoGuia(usuario) {
    const bloqueio = obterElementoGuia('bloqueio');
    const perfil = usuario?.app_metadata?.perfil || PERFIL_DESCONHECIDO;
    const mensagem = document.createElement('p');
    mensagem.textContent = usuario ? MSG_SEM_PERFIL + perfil : MSG_SEM_LOGIN;
    bloqueio.replaceChildren(mensagem);
    if (!usuario) {
        const entrar = document.createElement('a');
        entrar.className = 'guia-botao';
        entrar.textContent = 'ENTRAR';
        entrar.href = ROTA_LOGIN_GUIA + '?voltar=' + encodeURIComponent(location.pathname);
        bloqueio.append(entrar);
    }
    bloqueio.hidden = false;
}

/**
 * Consulta no banco quais alunos já tiveram a senha informada ("Aluno anotou?").
 * @returns {Promise<Set<string>|null>} E-mails; null se a consulta falhou (a escolha fica travada).
 */
async function consultarSenhasInformadasGuia() {
    try {
        return await consultarSenhasInformadas();
    } catch (erro) {
        console.warn('Não foi possível ler "Aluno anotou?" no banco:', erro.message);
        return null;
    }
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
 * @param {boolean} podeGravar - false para quem não é professor logado (botão sempre desabilitado).
 */
function atualizarBotaoGuia(botao, tabela, podeGravar) {
    const total = obterEmailsMarcadosGuia(tabela).length;
    botao.textContent = '🚀 GRAVAR SELECIONADOS (' + total + ')';
    botao.disabled = !podeGravar || total === 0;
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
        aplicarFiltroGuia(tabela, filtro.value, barra.filtroAnotou.value);
        aoMudar();
    });
    const rotuloFiltro = document.createElement('label');
    rotuloFiltro.append('Filtrar: ', filtro);

    const filtroAnotou = document.createElement('select');
    filtroAnotou.className = 'guia-filtro';
    filtroAnotou.innerHTML = '<option value="' + FILTRO_TODOS + '">Todos</option>'
        + '<option value="' + FILTRO_SIM + '">Anotou (Sim)</option>'
        + '<option value="' + FILTRO_NAO + '">Não anotou (Não)</option>';
    filtroAnotou.addEventListener('change', () => {
        marcarTodos.checked = false;
        aplicarFiltroGuia(tabela, filtro.value, filtroAnotou.value);
        aoMudar();
    });
    const rotuloAnotou = document.createElement('label');
    rotuloAnotou.append('Aluno anotou?: ', filtroAnotou);

    barra.append(rotuloTodos, rotuloFiltro, rotuloAnotou);
    barra.filtro = filtro;
    barra.filtroAnotou = filtroAnotou;
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
 * @param {{turma: Object, botao: HTMLElement, tabela: HTMLElement, resultado: HTMLElement,
 *     podeGravar: boolean}} contexto - Turma, elementos da aba e permissão de gravar.
 */
async function gravarSelecionadosGuia(contexto) {
    const { turma, botao, tabela, resultado, podeGravar } = contexto;
    if (!podeGravar) return;

    const emails = new Set(obterEmailsMarcadosGuia(tabela));
    const turmaSelecionada = { ...turma, alunos: turma.alunos.filter((a) => emails.has(a.email)) };
    const pergunta = 'Gravar ' + emails.size + ' usuário(s) da turma ' + turma.nome + '?';
    if (!emails.size) return;
    const querGravar = await confirmarPopup(pergunta,
        { titulo: 'Gravar usuários', textoConfirmar: 'Gravar', textoCancelar: 'Cancelar' });
    if (!querGravar) return;

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
 * Monta o local e o turno em maiúsculas (ex.: "AI CEPLAS MANHÃ").
 * @param {Object} turma - Turma com local e turno.
 * @returns {string} Texto pronto; vazio se a turma não tem local nem turno.
 */
function montarLocalTurnoGuia(turma) {
    return [turma.local, turma.turno].filter(Boolean).join(' ').toUpperCase();
}

/**
 * Monta o título do cartão: "NOME (código: X) - LOCAL TURNO" (local e turno em maiúsculas).
 * @param {Object} turma - Turma com nome, codigo, local e turno.
 * @returns {string} Título pronto.
 */
function montarTituloTurmaGuia(turma) {
    const localTurno = montarLocalTurnoGuia(turma);
    const base = turma.nome + ' (código: ' + turma.codigo + ')';
    return localTurno ? base + ' - ' + localTurno : base;
}

/**
 * Marca a turma favorita nas abas (⭐) e ajusta o botão de favorita de cada cartão.
 * @param {{favorita: string}} contexto - Contexto da página com o código da favorita.
 */
function atualizarFavoritaGuia(contexto) {
    document.querySelectorAll('.guia-aba[data-turma]').forEach((aba) => {
        const ehFavorita = aba.dataset.turma === contexto.favorita;
        aba.querySelector('.guia-aba__favorita')?.remove();
        if (ehFavorita) aba.prepend(criarElementoAbaGuia('guia-aba__favorita', '⭐ Favorita'));
    });
    document.querySelectorAll('.guia-cartao[data-turma]').forEach((cartao) => {
        const botao = cartao.querySelector('.guia-favorita');
        if (botao) atualizarBotaoFavorita(botao, cartao.dataset.turma === contexto.favorita);
    });
}

/**
 * Cria o botão de marcar/desmarcar a turma como favorita (só professor).
 * @param {Object} turma - Turma do cartão.
 * @param {{favorita: string}} contexto - Contexto da página (guarda a favorita atual).
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoFavoritaGuia(turma, contexto) {
    return criarBotaoFavorita('guia-botao guia-favorita', async () => {
        const novaFavorita = contexto.favorita === turma.codigo ? '' : turma.codigo;
        try {
            await definirTurmaFavorita(novaFavorita);
            contexto.favorita = novaFavorita;
            atualizarFavoritaGuia(contexto);
        } catch (erro) {
            await mostrarPopup(erro.message, { tipo: 'erro' });
        }
    });
}

/**
 * Cria o cartão de uma turma: título, controles, botão, resultado e tabela de alunos.
 * @param {Object} turma - Turma da lista de presença.
 * @param {{cadastrados: Map<string, string>|null, mostrarSenha: boolean}} contexto - Cadastrados
 *   e permissão de ver a senha (só professor logado).
 * @returns {HTMLElement} Cartão pronto.
 */
function criarCartaoTurmaGuia(turma, contexto) {
    const cartao = document.createElement('section');
    cartao.className = 'guia-cartao';
    cartao.dataset.turma = turma.codigo;

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'guia-botao';
    const resultado = document.createElement('pre');
    resultado.className = 'guia-comando';
    const aoMudar = () => {
        atualizarBotaoGuia(botao, tabela, contexto.podeGravar);
        atualizarSenhasGuia(tabela);
        barra.marcarTodos.checked = todosVisiveisMarcadosGuia(tabela);
    };
    const tabela = criarTabelaAlunosGuia(turma, contexto, aoMudar);
    const barra = criarBarraControlesGuia(tabela, aoMudar);
    botao.addEventListener('click', () => gravarSelecionadosGuia(
        { turma, botao, tabela, resultado, podeGravar: contexto.podeGravar }));
    cartao.reaplicarFiltro = () => {
        aplicarFiltroGuia(tabela, barra.filtro.value, barra.filtroAnotou.value);
        aoMudar();
    };
    tabela.addEventListener(EVENTO_ANOTOU_ALTERADO, cartao.reaplicarFiltro);

    const titulo = document.createElement('h2');
    titulo.textContent = montarTituloTurmaGuia(turma);
    cartao.append(titulo);
    if (contexto.podeGravar) cartao.append(criarBotaoFavoritaGuia(turma, contexto));
    cartao.append(barra, botao, resultado, tabela);
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
 * Cria um trecho de texto dentro da aba.
 * @param {string} classe - Classe CSS do trecho.
 * @param {string} texto - Texto exibido.
 * @returns {HTMLSpanElement} Trecho pronto.
 */
function criarElementoAbaGuia(classe, texto) {
    const trecho = document.createElement('span');
    trecho.className = classe;
    trecho.textContent = texto;
    return trecho;
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
    const localTurno = montarLocalTurnoGuia(turma);
    if (localTurno) aba.append(criarElementoAbaGuia('guia-aba__local', localTurno));
    if (turma.uc) aba.append(criarElementoAbaGuia('guia-aba__uc', turma.uc));
    aba.append(criarElementoAbaGuia('guia-aba__turma',
        turma.nome + ' (' + turma.alunos.length + ')'));
    aba.dataset.turma = turma.codigo;
    aba.addEventListener('click', () => alternarAbaGuia(indice));
    return aba;
}

/**
 * Inicia a página: só o professor logado vê senhas, consulta auth.users e grava; monta as abas com um cartão por turma.
 */
async function iniciarGuiaUsuarios() {
    const usuario = await obterUsuarioLogadoGuia();
    const ehProfessor = usuario?.app_metadata?.perfil === PERFIL_EXIGIDO_GUIA;
    if (!ehProfessor) avisarSemPermissaoGuia(usuario);
    obterElementoGuia('aviso').textContent = ehProfessor ? MSG_CONSULTANDO : MSG_SOMENTE_LEITURA;

    const turmas = reunirTurmasPresenca();
    if (!turmas.length) {
        const aviso = obterElementoGuia('aviso');
        aviso.textContent = MSG_SEM_LISTA;
        aviso.classList.add('guia-erro');
        return;
    }
    const cadastrados = ehProfessor ? await consultarCadastradosGuia() : null;
    const senhasInformadas = ehProfessor ? await consultarSenhasInformadasGuia() : null;
    const mostrarSenhaProfessor = ehProfessor ? await ehProfessorAdministradorGuia() : false;
    const contexto = {
        cadastrados,
        senhasInformadas,
        mostrarSenha: ehProfessor,
        mostrarSenhaProfessor,
        podeGravar: ehProfessor,
    };
    contexto.favorita = await buscarTurmaFavorita();
    obterElementoGuia('abas').replaceChildren(...turmas.map(criarAbaTurmaGuia));
    obterElementoGuia('turmas').replaceChildren(
        ...turmas.map((turma) => criarCartaoTurmaGuia(turma, contexto)));
    atualizarFavoritaGuia(contexto);
    const indiceFavorita = turmas.findIndex((turma) => turma.codigo === contexto.favorita);
    alternarAbaGuia(Math.max(indiceFavorita, 0));
}

iniciarGuiaUsuarios();
