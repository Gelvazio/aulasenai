// Card "Notas e média" no índice de atividades (ATIVIDADES/index.html): primeiro card da grade
// de aulas, com a nota de cada atividade e a média ponderada do aluno.
// ALUNO: vê só as próprias notas, sem controles. PROFESSOR: escolhe Turma e Aluno e, em cada
// atividade, liga/desliga "Adicionar na média" e define o Peso (vale para a turma inteira).
// Depende de: o cálculo (calcularMediaPonderada, formatarNotaCard), do repositório do card
// (lerAtividadesDoIndice, lerLoginCard, buscarNotasDoAlunoLogado, gravarConfigDaAtividade...),
// de js/supabase.js e do indice-aula-data.js (evento 'cards-aula-montados').

const EVENTO_CARDS_MONTADOS_NOTAS = 'cards-aula-montados';
const SELETOR_GRADE_NOTAS = 'section.grade';
const SELETOR_CARD_AULA_NOTAS = 'article.aula';
const CLASSE_CARD_NOTAS = 'card-notas-media';
const PREFIXO_NOTAS = CLASSE_CARD_NOTAS + '__';
const ESPERA_PESO_NOTAS = 400;
const PESO_PADRAO_NOTAS = 1;
const TITULO_NOTAS = '📊 Notas e média';
const TEXTO_SEM_NOTA_NOTAS = '—';
const TEXTO_AGUARDANDO_NOTAS = 'Aguardando correção';
const TEXTO_FORA_MEDIA_NOTAS = 'fora da média';
const ROTULO_INTERRUPTOR_NOTAS = 'Adicionar na média';
const OPCAO_ALUNO_NOTAS = 'Selecione o Aluno';
const SUFIXO_LIDER_NOTAS = ' ⭐ líder';
const SUFIXO_FORA_CHAMADA_NOTAS = ' (fora da chamada)';
const COLUNAS_ALUNO_NOTAS = ['Aula', 'Atividade', 'Nota', 'Peso'];
const COLUNAS_PROFESSOR_NOTAS = ['Aula', 'Atividade', 'Nota', ROTULO_INTERRUPTOR_NOTAS, 'Peso'];
const MSG_SEM_LOGIN_NOTAS = 'Entre com seu usuário (botão ENTRAR) para ver as suas notas.';
const MSG_CARREGANDO_NOTAS = 'Carregando as notas...';
const MSG_ERRO_NOTAS = 'Não foi possível carregar as notas. Tente novamente mais tarde.';
const MSG_SEM_ATIVIDADES_NOTAS = 'Não há atividades neste índice.';
const MSG_SELECIONE_ALUNO_NOTAS = 'Selecione o aluno para ver as notas.';
const MSG_SEM_ALUNOS_NOTAS = 'Nenhum aluno cadastrado nesta turma.';
const MSG_SEM_TURMAS_NOTAS = 'Nenhuma turma disponível.';
const CHAVE_FILTRO_NOTAS = 'card-notas-media:apenas-atividade-de-media';
const ROTULO_FILTRO_NOTAS = 'Apenas atividade de média';
const MSG_NENHUMA_NA_MEDIA_NOTAS = 'Nenhuma atividade conta na média.';
const MSG_ERRO_GRAVAR_NOTAS = 'Não foi possível gravar a configuração: ';

const estadoNotas = {
    atividades: [], ids: new Map(), configuracao: new Map(), notas: new Map(),
    turmas: [], alunos: [], turma: '', alunoId: '', ehProfessor: false, usuarioId: '',
    elementos: null, temporizadores: new Map(), apenasNaMedia: false,
};

/**
 * Cria um elemento com classe BEM e texto opcional.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS completa.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoNotas(tag, classe, texto) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

/**
 * Configuração (ON/OFF e peso) de uma atividade; sem linha na turma vale ON e peso 1.
 * @param {string} pagina - Caminho da página da atividade.
 * @returns {{naMedia: boolean, peso: number}} Configuração da atividade.
 */
function lerConfiguracaoNotas(pagina) {
    return estadoNotas.configuracao.get(pagina) || { naMedia: true, peso: PESO_PADRAO_NOTAS };
}

/**
 * Mostra um aviso de situação no card.
 * @param {string} mensagem - Texto do aviso ("" esconde).
 * @param {boolean} [ehErro] - Se true, usa o estilo de erro.
 */
function mostrarAvisoNotas(mensagem, ehErro = false) {
    const { aviso } = estadoNotas.elementos;
    aviso.textContent = mensagem;
    aviso.hidden = !mensagem;
    aviso.classList.toggle(PREFIXO_NOTAS + 'aviso--erro', ehErro);
}

/**
 * Monta a estrutura vazia do card e a guarda no estado.
 * @returns {HTMLElement} Card pronto para entrar na grade.
 */
function montarEsqueletoNotas() {
    const card = document.createElement('article');
    card.className = CLASSE_CARD_NOTAS;
    card.setAttribute('data-sem-bloqueio', '');
    const titulo = criarElementoNotas('h2', PREFIXO_NOTAS + 'titulo', TITULO_NOTAS);
    const selecao = criarElementoNotas('div', PREFIXO_NOTAS + 'selecao');
    selecao.hidden = true;
    const filtro = criarElementoNotas('div', PREFIXO_NOTAS + 'filtro');
    const tabela = criarElementoNotas('table', PREFIXO_NOTAS + 'tabela');
    const rodape = criarElementoNotas('div', PREFIXO_NOTAS + 'rodape');
    const aviso = criarElementoNotas('p', PREFIXO_NOTAS + 'aviso');
    aviso.hidden = true;
    card.append(titulo, selecao, filtro, tabela, rodape, aviso);
    estadoNotas.elementos = { card, selecao, filtro, tabela, rodape, aviso };
    return card;
}

/**
 * Texto da coluna Nota de uma atividade.
 * @param {string} pagina - Caminho da página da atividade.
 * @returns {string} Nota formatada, "Aguardando correção" ou "—".
 */
function textoNotaNotas(pagina) {
    const nota = estadoNotas.notas.get(pagina);
    if (!nota) return TEXTO_SEM_NOTA_NOTAS;
    if (nota.aguardando) return TEXTO_AGUARDANDO_NOTAS;
    if (nota.nota === null || nota.nota === undefined) return TEXTO_SEM_NOTA_NOTAS;
    return formatarNotaCard(nota.nota);
}

/**
 * Recalcula a média do aluno e atualiza o rodapé.
 */
function atualizarMediaNotas() {
    const { rodape } = estadoNotas.elementos;
    const itens = estadoNotas.atividades.map((atividade) => ({
        nota: estadoNotas.notas.get(atividade.pagina)?.nota ?? null,
        naMedia: lerConfiguracaoNotas(atividade.pagina).naMedia,
        peso: lerConfiguracaoNotas(atividade.pagina).peso,
    }));
    const resultado = calcularMediaPonderada(itens);
    const media = criarElementoNotas('strong', PREFIXO_NOTAS + 'media',
        'Média: ' + formatarNotaCard(resultado.media));
    const detalhe = ' · ' + resultado.quantidadeNaMedia + ' de ' +
        resultado.quantidadeTotal + ' atividades na média';
    rodape.replaceChildren(media, document.createTextNode(detalhe));
}

/**
 * Grava a configuração de uma atividade para a turma; se falhar, reverte e avisa.
 * @param {{pagina: string}} atividade - Atividade alterada.
 * @param {{naMedia: boolean, peso: number}} anterior - Configuração antes da mudança.
 * @param {string} turma - Turma em que a mudança foi feita.
 */
async function gravarConfiguracaoNotas(atividade, anterior, turma) {
    const atual = lerConfiguracaoNotas(atividade.pagina);
    try {
        const atividadeId = estadoNotas.ids.get(atividade.pagina);
        if (!atividadeId) throw new Error('atividade sem cadastro no banco.');

        await gravarConfigDaAtividade({ atividadeId, turma,
            naMedia: atual.naMedia, peso: atual.peso });
        mostrarAvisoNotas('');
    } catch (erro) {
        if (estadoNotas.turma !== turma) return;

        estadoNotas.configuracao.set(atividade.pagina, anterior);
        renderizarTabelaNotas();
        mostrarAvisoNotas(MSG_ERRO_GRAVAR_NOTAS + erro.message, true);
    }
}

/**
 * Aplica uma mudança de configuração: atualiza a tela na hora e grava em seguida.
 * @param {{pagina: string}} atividade - Atividade alterada.
 * @param {{naMedia: boolean, peso: number}} nova - Nova configuração.
 */
function aplicarConfiguracaoNotas(atividade, nova) {
    const anterior = lerConfiguracaoNotas(atividade.pagina);
    estadoNotas.configuracao.set(atividade.pagina, nova);
    renderizarTabelaNotas();
    gravarConfiguracaoNotas(atividade, anterior, estadoNotas.turma);
}

/**
 * Cria o botão ON/OFF "Adicionar na média" de uma atividade (só professor).
 * @param {{pagina: string}} atividade - Atividade da linha.
 * @param {HTMLElement} linha - Linha da tabela (recebe a classe de esmaecida).
 * @returns {HTMLButtonElement} Botão interruptor.
 */
function criarInterruptorNotas(atividade, linha) {
    const botao = criarElementoNotas('button', PREFIXO_NOTAS + 'interruptor');
    botao.type = 'button';
    botao.setAttribute('role', 'switch');
    botao.setAttribute('aria-label', ROTULO_INTERRUPTOR_NOTAS);
    const pintar = (ligado) => {
        botao.setAttribute('aria-checked', String(ligado));
        botao.classList.toggle(PREFIXO_NOTAS + 'interruptor--ligado', ligado);
        botao.textContent = ligado ? 'ON' : 'OFF';
        linha.classList.toggle(PREFIXO_NOTAS + 'linha--fora', !ligado);
    };
    pintar(lerConfiguracaoNotas(atividade.pagina).naMedia);
    botao.addEventListener('click', () => {
        const atual = lerConfiguracaoNotas(atividade.pagina);
        pintar(!atual.naMedia);
        aplicarConfiguracaoNotas(atividade, { ...atual, naMedia: !atual.naMedia });
    });
    return botao;
}

/**
 * Cria o campo de peso de uma atividade (só professor), gravando após uma pausa na digitação.
 * @param {{pagina: string}} atividade - Atividade da linha.
 * @returns {HTMLInputElement} Campo numérico.
 */
function criarCampoPesoNotas(atividade) {
    const campo = criarElementoNotas('input', PREFIXO_NOTAS + 'peso');
    campo.type = 'number';
    campo.min = '0';
    campo.step = '0.5';
    campo.setAttribute('aria-label', 'Peso');
    campo.value = String(lerConfiguracaoNotas(atividade.pagina).peso);
    campo.addEventListener('change', () => {
        clearTimeout(estadoNotas.temporizadores.get(atividade.pagina));
        const temporizador = setTimeout(() => {
            const peso = Number(campo.value);
            const vazio = campo.value.trim() === '';
            if (vazio || !Number.isFinite(peso) || peso < 0) {
                campo.value = String(lerConfiguracaoNotas(atividade.pagina).peso);
                return;
            }
            aplicarConfiguracaoNotas(atividade,
                { ...lerConfiguracaoNotas(atividade.pagina), peso });
        }, ESPERA_PESO_NOTAS);
        estadoNotas.temporizadores.set(atividade.pagina, temporizador);
    });
    return campo;
}

/**
 * Rótulo da turma no combo: nome e, se unidade.js estiver carregado, a unidade.
 * @param {Object} turma - Turma do banco.
 * @returns {string} Texto do combo.
 */
function rotuloTurmaNotas(turma) {
    const nome = turma.nome || turma.codigo;
    if (typeof acrescentarUnidadeTurma !== 'function') return nome;

    return acrescentarUnidadeTurma(nome, turma);
}

/**
 * Cria uma célula de tabela com texto ou conteúdo.
 * @param {string|Node} conteudo - Texto ou elemento da célula.
 * @returns {HTMLTableCellElement} Célula pronta.
 */
function criarCelulaNotas(conteudo) {
    const celula = document.createElement('td');
    celula.append(conteudo);
    return celula;
}

/**
 * Cria a célula da atividade, com o link para a página (e o selo "fora da média" para o aluno).
 * @param {{pagina: string, titulo: string}} atividade - Atividade da linha.
 * @returns {HTMLTableCellElement} Célula pronta.
 */
function criarCelulaAtividadeNotas(atividade) {
    const link = document.createElement('a');
    link.href = atividade.pagina;
    link.textContent = atividade.titulo;
    const celula = criarCelulaNotas(link);
    const estaForaDaMedia = !lerConfiguracaoNotas(atividade.pagina).naMedia;
    if (estadoNotas.ehProfessor || !estaForaDaMedia) return celula;

    celula.append(' ', criarElementoNotas('span', PREFIXO_NOTAS + 'selo', TEXTO_FORA_MEDIA_NOTAS));
    return celula;
}

/**
 * Cria a linha da tabela de uma atividade.
 * @param {{pagina: string, titulo: string, rotuloAula: string}} atividade - Atividade.
 * @returns {HTMLTableRowElement} Linha pronta.
 */
function criarLinhaNotas(atividade) {
    const linha = criarElementoNotas('tr', PREFIXO_NOTAS + 'linha');
    const celulaNota = criarCelulaNotas(textoNotaNotas(atividade.pagina));
    celulaNota.className = PREFIXO_NOTAS + 'nota';
    linha.append(criarCelulaNotas(atividade.rotuloAula || ''),
        criarCelulaAtividadeNotas(atividade), celulaNota);
    if (estadoNotas.ehProfessor) {
        linha.append(criarCelulaNotas(criarInterruptorNotas(atividade, linha)),
            criarCelulaNotas(criarCampoPesoNotas(atividade)));
        return linha;
    }
    const configuracao = lerConfiguracaoNotas(atividade.pagina);
    linha.classList.toggle(PREFIXO_NOTAS + 'linha--fora', !configuracao.naMedia);
    linha.append(criarCelulaNotas(String(configuracao.peso)));
    return linha;
}

/**
 * Lista as atividades da tabela: só as que contam na média quando o filtro está ligado.
 * @returns {{pagina: string}[]} Atividades a mostrar.
 */
function listarAtividadesVisiveisNotas() {
    if (!estadoNotas.apenasNaMedia) return estadoNotas.atividades;

    return estadoNotas.atividades
        .filter((atividade) => lerConfiguracaoNotas(atividade.pagina).naMedia);
}

/**
 * Linha única mostrada quando o filtro não deixa nenhuma atividade na tabela.
 * @param {number} quantidadeColunas - Colunas da tabela.
 * @returns {HTMLTableRowElement} Linha com a mensagem.
 */
function criarLinhaVaziaNotas(quantidadeColunas) {
    const linha = criarElementoNotas('tr', PREFIXO_NOTAS + 'linha');
    const celula = criarElementoNotas('td', PREFIXO_NOTAS + 'vazio', MSG_NENHUMA_NA_MEDIA_NOTAS);
    celula.colSpan = quantidadeColunas;
    linha.append(celula);
    return linha;
}

/**
 * Lê no localStorage se o filtro "Apenas atividade de média" estava ligado.
 * @returns {boolean} true se o filtro estava ligado.
 */
function lerFiltroSalvoNotas() {
    try {
        return localStorage.getItem(CHAVE_FILTRO_NOTAS) === 'sim';
    } catch (erro) {
        return false;
    }
}

/**
 * Guarda no localStorage o estado do filtro (sem falhar se o navegador bloquear).
 * @param {boolean} ligado - Estado do filtro.
 */
function salvarFiltroNotas(ligado) {
    try {
        localStorage.setItem(CHAVE_FILTRO_NOTAS, ligado ? 'sim' : 'nao');
    } catch (erro) {
        console.warn('Filtro não salvo no navegador:', erro.message);
    }
}

/**
 * Monta a chave ON/OFF "Apenas atividade de média" acima da tabela.
 */
function montarFiltroNotas() {
    const { filtro } = estadoNotas.elementos;
    const rotulo = criarElementoNotas('span', PREFIXO_NOTAS + 'filtro-rotulo',
        ROTULO_FILTRO_NOTAS);
    const botao = criarElementoNotas('button', PREFIXO_NOTAS + 'interruptor');
    botao.type = 'button';
    botao.setAttribute('role', 'switch');
    botao.setAttribute('aria-label', ROTULO_FILTRO_NOTAS);
    const pintar = () => {
        botao.setAttribute('aria-checked', String(estadoNotas.apenasNaMedia));
        botao.classList.toggle(PREFIXO_NOTAS + 'interruptor--ligado', estadoNotas.apenasNaMedia);
        botao.textContent = estadoNotas.apenasNaMedia ? 'ON' : 'OFF';
    };
    estadoNotas.apenasNaMedia = lerFiltroSalvoNotas();
    pintar();
    botao.addEventListener('click', () => {
        estadoNotas.apenasNaMedia = !estadoNotas.apenasNaMedia;
        salvarFiltroNotas(estadoNotas.apenasNaMedia);
        pintar();
        renderizarTabelaNotas();
    });
    filtro.replaceChildren(rotulo, botao);
}

/**
 * Desenha a tabela inteira e o rodapé com a média.
 */
function renderizarTabelaNotas() {
    const { tabela } = estadoNotas.elementos;
    const colunas = estadoNotas.ehProfessor ? COLUNAS_PROFESSOR_NOTAS : COLUNAS_ALUNO_NOTAS;
    const cabecalho = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');
    colunas.forEach((nome) => {
        const celula = document.createElement('th');
        celula.textContent = nome;
        linhaCabecalho.append(celula);
    });
    cabecalho.append(linhaCabecalho);
    const corpo = document.createElement('tbody');
    const visiveis = listarAtividadesVisiveisNotas();
    if (visiveis.length) corpo.append(...visiveis.map(criarLinhaNotas));
    else corpo.append(criarLinhaVaziaNotas(colunas.length));
    tabela.replaceChildren(cabecalho, corpo);
    atualizarMediaNotas();
}

/**
 * Lê a configuração da turma e a converte para o mapa por página da atividade.
 * @param {string} turma - Código da turma.
 */
async function carregarConfiguracaoNotas(turma) {
    const configuracao = new Map();
    estadoNotas.configuracao = configuracao;
    if (!turma) return;

    try {
        const porId = await lerConfigDaTurma(turma);
        if (estadoNotas.turma !== turma) return;

        estadoNotas.ids.forEach((id, pagina) => {
            if (porId.has(id)) configuracao.set(pagina, porId.get(id));
        });
    } catch (erro) {
        console.warn('Configuração da média indisponível (assume ON/peso 1):', erro.message);
    }
}

/**
 * Cria um combo com rótulo para o professor.
 * @param {string} rotulo - Texto do rótulo.
 * @returns {{etiqueta: HTMLLabelElement, lista: HTMLSelectElement}} Combo criado.
 */
function criarComboNotas(rotulo) {
    const etiqueta = criarElementoNotas('label', PREFIXO_NOTAS + 'combo', rotulo + ' ');
    const lista = document.createElement('select');
    etiqueta.append(lista);
    return { etiqueta, lista };
}

/**
 * Texto de um aluno no combo.
 * @param {Object} aluno - Aluno da turma.
 * @param {Object} turma - Turma escolhida (para marcar o líder).
 * @returns {string} Texto da opção.
 */
function textoAlunoNotas(aluno, turma) {
    const lider = aluno.id === turma?.lider_aluno_id ? SUFIXO_LIDER_NOTAS : '';
    const fora = aluno.na_chamada === false ? SUFIXO_FORA_CHAMADA_NOTAS : '';
    return (aluno.numero_chamada ?? '-') + ' — ' + aluno.nome + lider + fora;
}

/**
 * Mostra as notas do aluno escolhido (ou esvazia a tabela quando não há aluno).
 * @param {string} alunoId - Id do aluno ("" = nenhum).
 */
async function escolherAlunoNotas(alunoId) {
    estadoNotas.alunoId = alunoId;
    estadoNotas.notas = new Map();
    if (!alunoId) {
        renderizarTabelaNotas();
        mostrarAvisoNotas(MSG_SELECIONE_ALUNO_NOTAS);
        return;
    }
    mostrarAvisoNotas(MSG_CARREGANDO_NOTAS);
    try {
        const paginas = estadoNotas.atividades.map((atividade) => atividade.pagina);
        const notas = await buscarNotasParaProfessor(alunoId, paginas);
        if (estadoNotas.alunoId !== alunoId) return;

        estadoNotas.notas = notas;
        renderizarTabelaNotas();
        mostrarAvisoNotas('');
    } catch (erro) {
        console.warn('Notas indisponíveis:', erro.message);
        mostrarAvisoNotas(MSG_ERRO_NOTAS, true);
    }
}

/**
 * Troca a turma: recarrega a configuração e o combo de alunos.
 * @param {HTMLSelectElement} listaAluno - Combo de alunos.
 * @param {string} codigo - Código da turma escolhida.
 */
async function trocarTurmaNotas(listaAluno, codigo) {
    estadoNotas.turma = codigo;
    estadoNotas.temporizadores.forEach((temporizador) => clearTimeout(temporizador));
    estadoNotas.temporizadores.clear();
    const alunos = codigo ? await listarAlunosDaTurmaCard(codigo) : [];
    if (estadoNotas.turma !== codigo) return;

    estadoNotas.alunos = alunos;
    await carregarConfiguracaoNotas(codigo);
    if (estadoNotas.turma !== codigo) return;

    const turma = estadoNotas.turmas.find((item) => item.codigo === codigo);
    listaAluno.replaceChildren(new Option(OPCAO_ALUNO_NOTAS, ''),
        ...estadoNotas.alunos.map((aluno) => new Option(textoAlunoNotas(aluno, turma), aluno.id)));
    await escolherAlunoNotas('');
    if (!estadoNotas.alunos.length) mostrarAvisoNotas(MSG_SEM_ALUNOS_NOTAS);
}

/**
 * Monta os combos Turma e Aluno do professor, começando na turma favorita.
 */
async function montarSelecaoProfessorNotas() {
    estadoNotas.turmas = await listarTurmasCard();
    if (!estadoNotas.turmas.length) {
        renderizarTabelaNotas();
        mostrarAvisoNotas(MSG_SEM_TURMAS_NOTAS);
        return;
    }
    const comboTurma = criarComboNotas('Turma');
    const comboAluno = criarComboNotas('Aluno');
    estadoNotas.turmas.forEach((turma) => comboTurma.lista.add(new Option(
        rotuloTurmaNotas(turma), turma.codigo)));
    comboTurma.lista.addEventListener('change', () =>
        trocarTurmaNotas(comboAluno.lista, comboTurma.lista.value));
    comboAluno.lista.addEventListener('change', () => escolherAlunoNotas(comboAluno.lista.value));
    const { selecao } = estadoNotas.elementos;
    selecao.replaceChildren(comboTurma.etiqueta, comboAluno.etiqueta);
    selecao.hidden = false;
    const inicial = estadoNotas.turmas.find((turma) => turma.favorito) || estadoNotas.turmas[0];
    comboTurma.lista.value = inicial.codigo;
    await trocarTurmaNotas(comboAluno.lista, inicial.codigo);
}

/**
 * Carrega o card do aluno logado: turma, configuração e as próprias notas.
 */
async function montarVisaoAlunoNotas() {
    const paginas = estadoNotas.atividades.map((atividade) => atividade.pagina);
    estadoNotas.turma = await lerTurmaDoAlunoLogado(estadoNotas.usuarioId);
    await carregarConfiguracaoNotas(estadoNotas.turma);
    estadoNotas.notas = await buscarNotasDoAlunoLogado(paginas);
    renderizarTabelaNotas();
    mostrarAvisoNotas('');
}

/**
 * Preenche o card conforme o perfil, depois de conferir login e atividades.
 */
async function preencherCardNotas() {
    mostrarAvisoNotas(MSG_CARREGANDO_NOTAS);
    const login = await lerLoginCard();
    if (!login.logado) {
        mostrarAvisoNotas(MSG_SEM_LOGIN_NOTAS);
        return;
    }
    estadoNotas.atividades = lerAtividadesDoIndice();
    if (!estadoNotas.atividades.length) {
        mostrarAvisoNotas(MSG_SEM_ATIVIDADES_NOTAS);
        return;
    }
    Object.assign(estadoNotas, { ehProfessor: login.ehProfessor, usuarioId: login.usuarioId });
    estadoNotas.ids = await buscarIdsDasAtividades(
        estadoNotas.atividades.map((atividade) => atividade.pagina));
    if (login.ehProfessor) {
        await montarSelecaoProfessorNotas();
        return;
    }
    await montarVisaoAlunoNotas();
}

/**
 * Cria o card como primeiro filho da grade (sem duplicar) e o preenche.
 */
async function iniciarCardNotas() {
    const grade = document.querySelector(SELETOR_GRADE_NOTAS);
    if (!grade || grade.querySelector('.' + CLASSE_CARD_NOTAS)) return;

    grade.prepend(montarEsqueletoNotas());
    montarFiltroNotas();
    try {
        await preencherCardNotas();
    } catch (erro) {
        console.warn('Card de notas indisponível:', erro.message);
        mostrarAvisoNotas(MSG_ERRO_NOTAS, true);
    }
}

/**
 * Espera a grade de aulas do banco ficar pronta e então inicia o card.
 */
function aguardarGradeNotas() {
    const gradeJaPronta = document.querySelector(
        SELETOR_GRADE_NOTAS + ' ' + SELETOR_CARD_AULA_NOTAS);
    if (gradeJaPronta) {
        iniciarCardNotas();
        return;
    }
    document.addEventListener(EVENTO_CARDS_MONTADOS_NOTAS, iniciarCardNotas, { once: true });
}

aguardarGradeNotas();
