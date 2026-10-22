// Página scripts/criarUsuariosBancoDados.html: uma aba por turma; cada aba lista os alunos com
// "Cadastrado" (Sim/Não, de auth.users), seleção, marcar todos, filtro e um botão que grava só os
// selecionados. Depende de criar-usuarios-api.js, criar-usuarios-tabela.js e da lista única
// window.LISTAS_PRESENCA (arquivo scripts/LISTAPRESENCA.js).
// A unidade das abas vem só da tabela unidade: a da turma no banco (turma.unidade_id) ou, para
// turma ainda não gravada, a do campo unidadeId da lista. O "local" escrito na lista não é usado.
// Sem window.LISTAS_PRESENCA (site publicado), a página entra no modo banco: só leitura, com
// turmas, alunos e senha inicial lidos pela RPC listar_usuarios_senhas (criar-usuarios-banco.js),
// só para o perfil PROFESSOR (o banco recusa os demais). A gravação continua só no modo local.

const MSG_SEM_LISTA = 'Nenhuma lista encontrada. Coloque o arquivo LISTAPRESENCA.js nesta pasta.';
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
const TABELA_UNIDADE_GUIA = 'unidade';
const TABELA_TURMA_GUIA = 'turma';
// Aba que reúne os professores de todas as listas (virtual: não existe na tabela turma).
const TURMA_PROFESSORES_GUIA = { codigo: 'PROFESSORES', nome: 'Professores', virtual: true };
const MSG_SEM_PROFESSORES = 'Nenhum professor nas listas. Acrescente no LISTAPRESENCA.js, na lista '
    + "com professores: true, uma linha com perfil: 'PROFESSOR'.";
const MSG_CARREGANDO_BANCO = 'Carregando alunos e senhas do banco de dados...';
const MSG_BANCO_OK = 'Lista lida do banco de dados (só leitura; a gravação só funciona na máquina '
    + 'local, com o LISTAPRESENCA.js).';
const MSG_BANCO_SEM_ALUNOS = 'Nenhum aluno encontrado no banco de dados.';
const MSG_BANCO_SEM_PERMISSAO = 'A lista de alunos e senhas é só para o perfil PROFESSOR.';
const TITULO_OPCOES_BANCO = 'Lista do banco de dados';
const TEXTO_MOSTRAR_SENHAS = ' Mostrar senhas';
const IDS_GUIA = {
    bloqueio: 'guiaBloqueio',
    opcoes: 'guiaOpcoes',
    opcoesTitulo: 'guiaOpcoesTitulo',
    gravacao: 'guiaOpcoesGravacao',
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
 * Indica se o item da lista tem perfil PROFESSOR.
 * @param {Object} pessoa - Item da lista de presença.
 * @returns {boolean} true para professor.
 */
function ehProfessorDaLista(pessoa) {
    return String(pessoa.perfil || '').trim().toUpperCase() === PERFIL_EXIGIDO_GUIA;
}

/**
 * Monta a aba "Professores" com os itens de perfil PROFESSOR de todas as listas (sem repetir
 * e-mail), numerados de 1 em diante. É só agrupamento da página: não é gravada na tabela turma.
 * @param {Object[]} turmas - Turmas de todas as listas.
 * @returns {Object} Turma virtual (sem alunos se nenhuma lista tem professor).
 */
function montarTurmaProfessoresGuia(turmas) {
    const porEmail = new Map();
    turmas.flatMap((turma) => turma.alunos.filter(ehProfessorDaLista))
        .forEach((professor) => porEmail.set(professor.email.toLowerCase(), professor));
    const professores = [...porEmail.values()]
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
        .map((professor, posicao) => ({ ...professor, numero: posicao + 1 }));
    return { ...TURMA_PROFESSORES_GUIA, alunos: professores };
}

/**
 * Separa as listas de professores (marcadas com professores: true no LISTAPRESENCA.js) das
 * demais listas de alunos.
 * @returns {{professores: Object[], alunos: Object[]}} Listas de cada origem.
 */
function separarListasPresencaGuia() {
    const listas = window.LISTAS_PRESENCA || [];
    return {
        professores: listas.filter((lista) => lista.professores === true),
        alunos: listas.filter((lista) => lista.professores !== true),
    };
}

/**
 * Lista as turmas de um conjunto de listas, cada uma com a UC da lista.
 * @param {Object[]} listas - Listas de presença.
 * @returns {Object[]} Turmas.
 */
function listarTurmasGuia(listas) {
    return listas.flatMap((lista) => (
        (lista.turmas || []).map((turma) => ({
            ...turma,
            alunos: turma.alunos || [],
            uc: turma.uc || lista.uc || '',
        }))));
}

/**
 * Junta as turmas de todas as listas do LISTAPRESENCA.js (window.LISTAS_PRESENCA).
 * A primeira aba é "Professores": todas as pessoas das listas com professores: true (sempre com
 * perfil PROFESSOR) mais quem tem perfil PROFESSOR nas outras listas. Os professores saem das
 * turmas de alunos; turma que fica vazia sem eles não aparece.
 * @returns {Object[]} Turmas; vazio se nenhuma lista foi carregada.
 */
function reunirTurmasPresenca() {
    const listas = separarListasPresencaGuia();
    const turmasProfessor = listarTurmasGuia(listas.professores).map((turma) => ({
        ...turma,
        alunos: turma.alunos.map((pessoa) => ({ ...pessoa, perfil: PERFIL_EXIGIDO_GUIA })),
    }));
    const turmas = [...turmasProfessor, ...listarTurmasGuia(listas.alunos)];
    if (!turmas.length) return [];
    const turmasAlunos = turmas
        .map((turma) => ({ ...turma, alunos: turma.alunos.filter((a) => !ehProfessorDaLista(a)) }))
        .filter((turma) => turma.alunos.length);
    return [montarTurmaProfessoresGuia(turmas), ...turmasAlunos];
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
 * Busca no banco o nome das unidades por turma e por id (tabela unidade).
 * @returns {Promise<{porTurma: Map<string, string>, porId: Map<number, string>}>} Nomes; vazios
 *     se a consulta falhar.
 */
async function buscarUnidadesGuia() {
    const vazio = { porTurma: new Map(), porId: new Map() };
    try {
        const cliente = obterClienteSupabase();
        const [unidades, turmas] = await Promise.all([
            cliente.from(TABELA_UNIDADE_GUIA).select('id, nome'),
            cliente.from(TABELA_TURMA_GUIA).select('codigo, unidade:unidade_id(nome)')]);
        if (unidades.error || turmas.error) return vazio;
        return {
            porId: new Map(unidades.data.map((unidade) => [unidade.id, unidade.nome])),
            porTurma: new Map(turmas.data.map((turma) => [turma.codigo, turma.unidade?.nome || ''])),
        };
    } catch (erro) {
        return vazio;
    }
}

/**
 * Põe em cada turma o nome da unidade: a do banco; se a turma ainda não existe, a do unidadeId.
 * @param {Object[]} turmas - Turmas das listas.
 * @param {{porTurma: Map<string, string>, porId: Map<number, string>}} unidades - Nomes.
 * @returns {Object[]} Turmas com unidadeNome.
 */
function aplicarUnidadesGuia(turmas, unidades) {
    return turmas.map((turma) => ({
        ...turma,
        unidadeNome: unidades.porTurma.get(String(turma.codigo))
            || unidades.porId.get(turma.unidadeId) || '',
    }));
}

/**
 * Monta a unidade e o turno em maiúsculas (ex.: "CEPLAS MANHÃ"); o turno não se repete se o
 * nome da unidade já o traz (ex.: "AI TAIÓ TARDE").
 * @param {Object} turma - Turma com unidadeNome e turno.
 * @returns {string} Texto pronto; vazio se a turma não tem unidade nem turno.
 */
function montarLocalTurnoGuia(turma) {
    const unidade = String(turma.unidadeNome || '').toUpperCase();
    const turno = String(turma.turno || '').toUpperCase();
    const unidadeJaTemTurno = Boolean(turno) && unidade.includes(turno);
    if (unidadeJaTemTurno) return unidade;
    return [unidade, turno].filter(Boolean).join(' ');
}

/**
 * Monta o título do cartão: "NOME (código: X) - LOCAL TURNO" (local e turno em maiúsculas).
 * @param {Object} turma - Turma com nome, codigo, local e turno.
 * @returns {string} Título pronto.
 */
function montarTituloTurmaGuia(turma) {
    const localTurno = montarLocalTurnoGuia(turma);
    if (turma.virtual) return turma.nome;
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
        atualizarBotaoExportarPdf(botaoPdf, tabela);
        atualizarSenhasGuia(tabela);
        barra.marcarTodos.checked = todosVisiveisMarcadosGuia(tabela);
    };
    const tabela = criarTabelaAlunosGuia(turma, contexto, aoMudar);
    const barra = criarBarraControlesGuia(tabela, aoMudar);
    const botaoPdf = criarBotaoExportarPdf(tabela, montarTituloTurmaGuia(turma));
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
    if (contexto.podeGravar && !turma.virtual) cartao.append(criarBotaoFavoritaGuia(turma, contexto));
    cartao.append(barra, botao, botaoPdf, resultado, tabela);
    if (turma.virtual && !turma.alunos.length) {
        const vazio = document.createElement('p');
        vazio.textContent = MSG_SEM_PROFESSORES;
        cartao.append(vazio);
    }
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
    const aba = criarAbaBaseGuia(turma);
    aba.addEventListener('click', () => alternarAbaGuia(indice));
    return aba;
}

/**
 * Cria o botão de aba de uma turma, sem ação de clique.
 * @param {Object} turma - Turma da aba.
 * @returns {HTMLButtonElement} Botão da aba.
 */
function criarAbaBaseGuia(turma) {
    const aba = document.createElement('button');
    aba.type = 'button';
    aba.className = 'guia-aba';
    const localTurno = montarLocalTurnoGuia(turma);
    if (localTurno) aba.append(criarElementoAbaGuia('guia-aba__local', localTurno));
    if (turma.uc) aba.append(criarElementoAbaGuia('guia-aba__uc', turma.uc));
    aba.append(criarElementoAbaGuia('guia-aba__turma',
        turma.nome + ' (' + turma.alunos.length + ')'));
    aba.dataset.turma = turma.codigo;
    return aba;
}

/**
 * Mostra uma mensagem no aviso da página.
 * @param {string} texto - Mensagem.
 * @param {boolean} ehErro - true para pintar como erro.
 */
function mostrarAvisoGuia(texto, ehErro) {
    const aviso = obterElementoGuia('aviso');
    aviso.textContent = texto;
    aviso.classList.toggle('guia-erro', ehErro);
}

/**
 * Prepara a página para o modo banco: troca o título das opções e esconde a gravação.
 */
function prepararModoBancoGuia() {
    obterElementoGuia('opcoesTitulo').textContent = TITULO_OPCOES_BANCO;
    obterElementoGuia('gravacao').hidden = true;
}

/**
 * Cria o interruptor "Mostrar senhas" do cartão da turma no modo banco (começa desligado).
 * @param {HTMLTableElement} tabela - Tabela de senhas da turma.
 * @returns {HTMLDivElement} Barra com o interruptor.
 */
function criarInterruptorSenhasBancoGuia(tabela) {
    const interruptor = document.createElement('input');
    interruptor.type = 'checkbox';
    interruptor.className = 'guia-interruptor';
    interruptor.setAttribute('role', 'switch');
    interruptor.addEventListener('change', () => (
        mostrarSenhasBancoGuia(tabela, interruptor.checked)));
    const rotulo = document.createElement('label');
    rotulo.append(interruptor, TEXTO_MOSTRAR_SENHAS);
    const barra = document.createElement('div');
    barra.className = 'guia-controles';
    barra.append(rotulo);
    return barra;
}

/**
 * Cria o cartão só de leitura de uma turma no modo banco: título, interruptor e tabela.
 * @param {Object} turma - Turma lida do banco (com unidadeNome).
 * @returns {HTMLElement} Cartão pronto.
 */
function criarCartaoTurmaBancoGuia(turma) {
    const cartao = document.createElement('section');
    cartao.className = 'guia-cartao';
    cartao.dataset.turma = turma.codigo;
    const titulo = document.createElement('h2');
    titulo.textContent = montarTituloTurmaGuia(turma);
    const tabela = criarTabelaSenhasBancoGuia(turma);
    cartao.append(titulo, criarInterruptorSenhasBancoGuia(tabela), tabela);
    return cartao;
}

/**
 * Busca no banco as turmas com alunos e senhas; na falha, explica o motivo na página.
 * @param {Object} usuario - Usuário logado.
 * @returns {Promise<Object[]|null>} Turmas; null se o banco recusou ou deu erro.
 */
async function carregarTurmasBancoGuia(usuario) {
    try {
        const linhas = await buscarUsuariosSenhasBanco(obterClienteSupabase());
        return agruparTurmasBanco(linhas);
    } catch (erro) {
        if (erro.semPermissao) {
            avisarSemPermissaoGuia(usuario);
            mostrarAvisoGuia(MSG_BANCO_SEM_PERMISSAO, true);
            return null;
        }
        mostrarAvisoGuia(erro.message, true);
        return null;
    }
}

/**
 * Busca no banco o turno e a UC de cada turma (tabela turma).
 * @returns {Promise<Map<string, {turno: string, uc: string}>>} Dados por código; vazio se falhar.
 */
async function buscarTurnoUcBancoGuia() {
    try {
        const resposta = await obterClienteSupabase().from(TABELA_TURMA_GUIA)
            .select('codigo, turno, uc');
        if (resposta.error) return new Map();
        return new Map(resposta.data.map((turma) => [
            String(turma.codigo), { turno: turma.turno || '', uc: turma.uc || '' }]));
    } catch (erro) {
        return new Map();
    }
}

/**
 * Põe turno e UC em cada turma e coloca a favorita primeiro (as demais seguem a ordem do banco).
 * @param {Object[]} turmas - Turmas lidas do banco.
 * @param {{favorita: string}} contexto - Contexto com o código da favorita.
 * @returns {Promise<Object[]>} Turmas completas e ordenadas.
 */
async function completarTurmasBancoGuia(turmas, contexto) {
    const dados = await buscarTurnoUcBancoGuia();
    const completas = turmas.map((turma) => ({ ...turma, ...dados.get(String(turma.codigo)) }));
    const ehFavorita = (turma) => turma.codigo === contexto.favorita;
    return [...completas.filter(ehFavorita), ...completas.filter((turma) => !ehFavorita(turma))];
}

/**
 * Marca a aba escolhida como ativa e rola até o cartão da turma, sem esconder nenhum.
 * @param {string} codigo - Código da turma escolhida.
 */
function irParaTurmaBancoGuia(codigo) {
    document.querySelectorAll('.guia-aba[data-turma]').forEach((aba) => {
        aba.classList.toggle('guia-aba--ativa', aba.dataset.turma === String(codigo));
    });
    const cartao = Array.from(document.querySelectorAll('.guia-cartao[data-turma]'))
        .find((item) => item.dataset.turma === String(codigo));
    cartao?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Cria a aba de uma turma no modo banco: o clique rola até o cartão.
 * @param {Object} turma - Turma da aba.
 * @returns {HTMLButtonElement} Botão da aba.
 */
function criarAbaTurmaBancoGuia(turma) {
    const aba = criarAbaBaseGuia(turma);
    aba.addEventListener('click', () => irParaTurmaBancoGuia(turma.codigo));
    return aba;
}

/**
 * Monta as abas e todos os cartões do modo banco, com a turma favorita primeiro.
 * @param {Object[]} turmas - Turmas lidas do banco.
 */
async function montarAbasBancoGuia(turmas) {
    const contexto = { favorita: await buscarTurmaFavorita() };
    const comUnidade = aplicarUnidadesGuia(turmas, await buscarUnidadesGuia());
    const ordenadas = await completarTurmasBancoGuia(comUnidade, contexto);
    obterElementoGuia('abas').replaceChildren(...ordenadas.map(criarAbaTurmaBancoGuia));
    obterElementoGuia('turmas').replaceChildren(
        ...ordenadas.map((turma) => criarCartaoTurmaBancoGuia(turma)));
    atualizarFavoritaGuia(contexto);
    document.querySelector('.guia-aba[data-turma]')?.classList.add('guia-aba--ativa');
}

/**
 * Inicia o modo banco: exige login, lê do banco (que só responde ao perfil PROFESSOR) e monta
 * as abas só de leitura. Sem plano B por arquivo: erro do banco vira mensagem na página.
 */
async function iniciarModoBancoGuia() {
    prepararModoBancoGuia();
    const usuario = await obterUsuarioLogadoGuia();
    if (!usuario) {
        avisarSemPermissaoGuia(null);
        mostrarAvisoGuia(MSG_BANCO_SEM_PERMISSAO, true);
        return;
    }
    mostrarAvisoGuia(MSG_CARREGANDO_BANCO, false);
    const turmas = await carregarTurmasBancoGuia(usuario);
    if (!turmas) return;
    if (!turmas.length) {
        mostrarAvisoGuia(MSG_BANCO_SEM_ALUNOS, true);
        return;
    }
    mostrarAvisoGuia(MSG_BANCO_OK, false);
    await montarAbasBancoGuia(turmas);
}

/**
 * Inicia a página: só o professor logado vê senhas, consulta auth.users e grava; monta as abas
 * com um cartão por turma. Sem a lista local (site publicado), segue pelo modo banco.
 */
async function iniciarGuiaUsuarios() {
    if (estaEmModoBancoUsuarios()) {
        await iniciarModoBancoGuia();
        return;
    }
    const usuario = await obterUsuarioLogadoGuia();
    const ehProfessor = usuario?.app_metadata?.perfil === PERFIL_EXIGIDO_GUIA;
    if (!ehProfessor) avisarSemPermissaoGuia(usuario);
    obterElementoGuia('aviso').textContent = ehProfessor ? MSG_CONSULTANDO : MSG_SOMENTE_LEITURA;

    const turmas = aplicarUnidadesGuia(reunirTurmasPresenca(), await buscarUnidadesGuia());
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
