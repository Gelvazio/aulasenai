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
const ROTULO_PERGUNTAS_NOTAS = 'Média de perguntas respondidas (turma)';
const COLUNAS_PROFESSOR_NOTAS = ['Aula', 'Atividade', 'Nota', ROTULO_PERGUNTAS_NOTAS,
    ROTULO_INTERRUPTOR_NOTAS, 'Peso'];
const CHAVE_SELECAO_NOTAS = 'card-notas-media:selecao';
const CHAVE_FAIXA_PERGUNTAS_NOTAS = 'card-notas-media:faixa-perguntas';
const ROTULO_FAIXA_PERGUNTAS_NOTAS = 'Perguntas respondidas';
// Faixas em percentual: acima de "de" (exclusivo, exceto a primeira) até "ate" (inclusivo).
const FAIXAS_PERGUNTAS_NOTAS = [
    { valor: '', rotulo: 'Todas', de: -1, ate: 100 },
    { valor: '0-10', rotulo: 'Até 10%', de: -1, ate: 10 },
    { valor: '10-30', rotulo: '10 a 30%', de: 10, ate: 30 },
    { valor: '30-50', rotulo: '30 a 50%', de: 30, ate: 50 },
    { valor: '50-70', rotulo: '50 a 70%', de: 50, ate: 70 },
    { valor: '70-100', rotulo: '70 a 100%', de: 70, ate: 100 },
];
const MSG_SEM_LOGIN_NOTAS = 'Entre com seu usuário (botão ENTRAR) para ver as suas notas.';
const MSG_CARREGANDO_NOTAS = 'Carregando as notas...';
const MSG_ERRO_NOTAS = 'Não foi possível carregar as notas. Tente novamente mais tarde.';
const MSG_SEM_ATIVIDADES_NOTAS = 'Não há atividades neste índice.';
const MSG_SELECIONE_ALUNO_NOTAS = 'Selecione o aluno para ver as notas.';
const MSG_SEM_ALUNOS_NOTAS = 'Nenhum aluno cadastrado nesta turma.';
const MSG_SEM_TURMAS_NOTAS = 'Nenhuma turma disponível.';
const CHAVE_FILTRO_NOTAS = 'card-notas-media:apenas-atividade-de-media';
const ROTULO_FILTRO_NOTAS = 'Apenas atividade de média';
const MSG_NENHUMA_NA_MEDIA_NOTAS = 'Nenhuma atividade para os filtros escolhidos.';
const MSG_ERRO_GRAVAR_NOTAS = 'Não foi possível gravar a configuração: ';
const ROTULO_LISTAR_TODOS_NOTAS = 'Listar todos';
const ROTULO_CONFIRMAR_MEDIA_NOTAS = 'Confirmar Media Aluno';
const SUFIXO_MEDIA_CONFIRMADA_NOTAS = ' (média confirmada)';
const MSG_ERRO_CONFIRMAR_NOTAS = 'Não foi possível gravar a confirmação: ';

const estadoNotas = {
    atividades: [], ids: new Map(), configuracao: new Map(), notas: new Map(),
    turmas: [], alunos: [], turma: '', alunoId: '', ehProfessor: false, usuarioId: '',
    elementos: null, temporizadores: new Map(), apenasNaMedia: false,
    listarTodos: false, mediaFinalizadas: new Set(), materiaId: null,
    mediaPerguntas: new Map(), faixaPerguntas: '',
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
    const cabecalho = criarElementoNotas('div', PREFIXO_NOTAS + 'cabecalho');
    const titulo = criarElementoNotas('h2', PREFIXO_NOTAS + 'titulo', TITULO_NOTAS);
    const visibilidade = criarElementoNotas('div', PREFIXO_NOTAS + 'visibilidade');
    visibilidade.hidden = true;
    cabecalho.append(titulo, visibilidade);
    const selecao = criarElementoNotas('div', PREFIXO_NOTAS + 'selecao');
    selecao.hidden = true;
    const filtro = criarElementoNotas('div', PREFIXO_NOTAS + 'filtro');
    const tabela = criarElementoNotas('table', PREFIXO_NOTAS + 'tabela');
    const rodape = criarElementoNotas('div', PREFIXO_NOTAS + 'rodape');
    const aviso = criarElementoNotas('p', PREFIXO_NOTAS + 'aviso');
    aviso.hidden = true;
    card.append(cabecalho, selecao, filtro, tabela, rodape, aviso);
    estadoNotas.elementos = { card, selecao, filtro, tabela, rodape, aviso, visibilidade };
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
        linha.append(criarCelulaNotas(textoPerguntasNotas(atividade.pagina)),
            criarCelulaNotas(criarInterruptorNotas(atividade, linha)),
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
    return estadoNotas.atividades.filter((atividade) =>
        (!estadoNotas.apenasNaMedia || lerConfiguracaoNotas(atividade.pagina).naMedia)
        && passaFaixaPerguntasNotas(atividade.pagina));
}

/**
 * Percentual de perguntas respondidas (média da turma / total) de uma atividade.
 * @param {string} pagina - Caminho da página da atividade.
 * @returns {number|null} Percentual de 0 a 100 ou null sem dados.
 */
function percentualPerguntasNotas(pagina) {
    const dados = estadoNotas.mediaPerguntas.get(pagina);
    if (!dados || !dados.total) return null;

    return (dados.media / dados.total) * 100;
}

/**
 * Texto da coluna de perguntas: "média/total (percentual)", ex.: 15/25 (60%).
 * @param {string} pagina - Caminho da página da atividade.
 * @returns {string} Texto da célula.
 */
function textoPerguntasNotas(pagina) {
    const dados = estadoNotas.mediaPerguntas.get(pagina);
    const percentual = percentualPerguntasNotas(pagina);
    if (percentual === null) return TEXTO_SEM_NOTA_NOTAS;

    const media = dados.media.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
    return media + '/' + dados.total + ' (' + Math.round(percentual) + '%)';
}

/**
 * Diz se a atividade está na faixa de percentual escolhida (sem faixa, todas passam).
 * @param {string} pagina - Caminho da página da atividade.
 * @returns {boolean} true se deve aparecer na tabela.
 */
function passaFaixaPerguntasNotas(pagina) {
    const faixa = FAIXAS_PERGUNTAS_NOTAS.find((item) => item.valor === estadoNotas.faixaPerguntas);
    if (!faixa || faixa.valor === '' || !estadoNotas.ehProfessor) return true;

    const percentual = percentualPerguntasNotas(pagina);
    return percentual !== null && percentual > faixa.de && percentual <= faixa.ate;
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
    botao.addEventListener('click', () => executarComCarregandoNotas(() => {
        estadoNotas.apenasNaMedia = !estadoNotas.apenasNaMedia;
        salvarFiltroNotas(estadoNotas.apenasNaMedia);
        pintar();
        renderizarTabelaNotas();
    }));
    filtro.replaceChildren(rotulo, botao, montarFiltroFaixaNotas());
}

/**
 * Lê no localStorage a faixa de perguntas escolhida ("" se nenhuma ou inválida).
 * @returns {string} Valor da faixa salva.
 */
function lerFaixaSalvaNotas() {
    try {
        const valor = localStorage.getItem(CHAVE_FAIXA_PERGUNTAS_NOTAS) || '';
        return FAIXAS_PERGUNTAS_NOTAS.some((faixa) => faixa.valor === valor) ? valor : '';
    } catch (erro) {
        return '';
    }
}

/**
 * Guarda no localStorage a faixa de perguntas escolhida.
 * @param {string} valor - Valor da faixa.
 */
function salvarFaixaNotas(valor) {
    try {
        localStorage.setItem(CHAVE_FAIXA_PERGUNTAS_NOTAS, valor);
    } catch (erro) {
        console.warn('Faixa não salva no navegador:', erro.message);
    }
}

/**
 * Monta o combo da faixa de perguntas respondidas (só aparece para o professor).
 * @returns {HTMLLabelElement} Rótulo com o combo, oculto até o perfil professor.
 */
function montarFiltroFaixaNotas() {
    const etiqueta = criarElementoNotas('label', PREFIXO_NOTAS + 'combo',
        ROTULO_FAIXA_PERGUNTAS_NOTAS + ' ');
    etiqueta.hidden = true;
    const lista = document.createElement('select');
    FAIXAS_PERGUNTAS_NOTAS.forEach((faixa) =>
        lista.add(new Option(faixa.rotulo, faixa.valor)));
    estadoNotas.faixaPerguntas = lerFaixaSalvaNotas();
    lista.value = estadoNotas.faixaPerguntas;
    lista.addEventListener('change', () => {
        estadoNotas.faixaPerguntas = lista.value;
        salvarFaixaNotas(lista.value);
        renderizarTabelaNotas();
    });
    estadoNotas.elementos.faixa = etiqueta;
    etiqueta.append(lista);
    return etiqueta;
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
 * Lê a média de perguntas respondidas da turma; em falha, a coluna mostra "—".
 * @param {string} turma - Código da turma.
 */
async function carregarMediaPerguntasNotas(turma) {
    estadoNotas.mediaPerguntas = new Map();
    if (!turma) return;

    try {
        const paginas = estadoNotas.atividades.map((atividade) => atividade.pagina);
        const mapa = await buscarMediaPerguntasTurma(turma, paginas);
        if (estadoNotas.turma === turma) estadoNotas.mediaPerguntas = mapa;
    } catch (erro) {
        console.warn('Média de perguntas indisponível:', erro.message);
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
    atualizarInterruptorMediaNotas();
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
        mostrarAvisoNotas(MSG_ERRO_NOTAS + ' Detalhe: ' + erro.message, true);
    }
}

/**
 * Preenche o combo Aluno com a turma atual; com "Listar todos" desligado, omite os
 * alunos com média confirmada e, ligado, os mostra com o sufixo de confirmada.
 * @param {HTMLSelectElement} listaAluno - Combo de alunos.
 */
function preencherComboAlunosNotas(listaAluno) {
    const turma = estadoNotas.turmas.find((item) => item.codigo === estadoNotas.turma);
    const visiveis = estadoNotas.alunos.filter((aluno) =>
        estadoNotas.listarTodos || !estadoNotas.mediaFinalizadas.has(String(aluno.id)));
    const opcoes = visiveis.map((aluno) => {
        const confirmado = estadoNotas.mediaFinalizadas.has(String(aluno.id));
        const sufixo = confirmado ? SUFIXO_MEDIA_CONFIRMADA_NOTAS : '';
        return new Option(textoAlunoNotas(aluno, turma) + sufixo, aluno.id);
    });
    listaAluno.replaceChildren(new Option(OPCAO_ALUNO_NOTAS, ''), ...opcoes);
    listaAluno.value = estadoNotas.alunoId;
}

/**
 * Troca a turma: recarrega a configuração e o combo de alunos.
 * @param {HTMLSelectElement} listaAluno - Combo de alunos.
 * @param {string} codigo - Código da turma escolhida.
 */
async function trocarTurmaNotas(listaAluno, codigo) {
    estadoNotas.turma = codigo;
    atualizarVisibilidadeNotas();
    estadoNotas.temporizadores.forEach((temporizador) => clearTimeout(temporizador));
    estadoNotas.temporizadores.clear();
    const alunos = codigo ? await listarAlunosDaTurmaCard(codigo) : [];
    if (estadoNotas.turma !== codigo) return;

    estadoNotas.alunos = alunos;
    await carregarConfiguracaoNotas(codigo);
    await carregarMediaPerguntasNotas(codigo);
    if (estadoNotas.turma !== codigo) return;

    preencherComboAlunosNotas(listaAluno);
    await escolherAlunoNotas('');
    if (!estadoNotas.alunos.length) mostrarAvisoNotas(MSG_SEM_ALUNOS_NOTAS);
}

/**
 * Lê a matéria da página e as médias já confirmadas nela; em falha, segue com Set vazio.
 */
async function carregarMediasDaMateriaNotas() {
    try {
        estadoNotas.materiaId = await lerMateriaIdDaPagina();
        if (estadoNotas.materiaId === null) return;
        estadoNotas.mediaFinalizadas =
            await listarMediaFinalizadaDaMateria(estadoNotas.materiaId);
    } catch (erro) {
        estadoNotas.materiaId = null;
        estadoNotas.mediaFinalizadas = new Set();
        console.warn('Confirmações de média indisponíveis:', erro.message);
    }
}

/**
 * Pinta um botão interruptor conforme o estado ligado/desligado.
 * @param {HTMLButtonElement} botao - Botão interruptor.
 * @param {boolean} ligado - Estado a mostrar.
 */
function pintarInterruptorNotas(botao, ligado) {
    botao.setAttribute('aria-checked', String(ligado));
    botao.classList.toggle(PREFIXO_NOTAS + 'interruptor--ligado', ligado);
    botao.textContent = ligado ? 'ON' : 'OFF';
}

/**
 * Cria um rótulo com interruptor ON/OFF para a área de seleção do professor.
 * @param {string} rotulo - Texto do interruptor.
 * @returns {{etiqueta: HTMLLabelElement, botao: HTMLButtonElement}} Controle criado.
 */
function criarInterruptorSimplesNotas(rotulo) {
    const etiqueta = criarElementoNotas('label', PREFIXO_NOTAS + 'chave');
    const texto = criarElementoNotas('span', PREFIXO_NOTAS + 'filtro-rotulo', rotulo);
    const botao = criarElementoNotas('button', PREFIXO_NOTAS + 'interruptor');
    botao.type = 'button';
    botao.setAttribute('role', 'switch');
    botao.setAttribute('aria-label', rotulo);
    etiqueta.append(texto, botao);
    return { etiqueta, botao };
}

/**
 * Interruptor "Listar todos": liga/desliga as médias confirmadas no combo Aluno.
 * @param {HTMLSelectElement} listaAluno - Combo de alunos.
 * @returns {HTMLLabelElement} Controle pronto para a área de seleção.
 */
function criarInterruptorListarTodosNotas(listaAluno) {
    const controle = criarInterruptorSimplesNotas(ROTULO_LISTAR_TODOS_NOTAS);
    pintarInterruptorNotas(controle.botao, estadoNotas.listarTodos);
    controle.botao.addEventListener('click', () => executarComCarregandoNotas(() => {
        estadoNotas.listarTodos = !estadoNotas.listarTodos;
        pintarInterruptorNotas(controle.botao, estadoNotas.listarTodos);
        preencherComboAlunosNotas(listaAluno);
    }));
    return controle.etiqueta;
}

/**
 * Repinta e habilita/desabilita o interruptor "Confirmar Media Aluno" conforme a seleção.
 */
function atualizarInterruptorMediaNotas() {
    const botao = estadoNotas.elementos.interruptorMedia;
    if (!botao) return;
    const habilitado = estadoNotas.alunoId !== '' && estadoNotas.materiaId !== null;
    botao.disabled = !habilitado;
    pintarInterruptorNotas(botao,
        habilitado && estadoNotas.mediaFinalizadas.has(estadoNotas.alunoId));
}

/**
 * Grava a mudança do flag "média confirmada" do aluno; se falhar, reverte o pintado.
 * @param {HTMLSelectElement} listaAluno - Combo de alunos.
 */
async function alternarMediaFinalizadaNotas(listaAluno) {
    const botao = estadoNotas.elementos.interruptorMedia;
    const alunoId = estadoNotas.alunoId;
    const novoValor = !estadoNotas.mediaFinalizadas.has(alunoId);
    pintarInterruptorNotas(botao, novoValor);
    try {
        await gravarMediaFinalizada({ alunoId, materiaId: estadoNotas.materiaId,
            turma: estadoNotas.turma, finalizada: novoValor });
        if (novoValor) estadoNotas.mediaFinalizadas.add(alunoId);
        else estadoNotas.mediaFinalizadas.delete(alunoId);
        preencherComboAlunosNotas(listaAluno);
        if (novoValor && !estadoNotas.listarTodos) {
            await escolherAlunoNotas('');
            return;
        }
        mostrarAvisoNotas('');
    } catch (erro) {
        pintarInterruptorNotas(botao, !novoValor);
        mostrarAvisoNotas(MSG_ERRO_CONFIRMAR_NOTAS + erro.message, true);
    }
}

/**
 * Interruptor "Confirmar Media Aluno": reflete e grava o flag do aluno selecionado.
 * @param {HTMLSelectElement} listaAluno - Combo de alunos.
 * @returns {HTMLLabelElement} Controle pronto para a área de seleção.
 */
function criarInterruptorConfirmarMediaNotas(listaAluno) {
    const controle = criarInterruptorSimplesNotas(ROTULO_CONFIRMAR_MEDIA_NOTAS);
    estadoNotas.elementos.interruptorMedia = controle.botao;
    atualizarInterruptorMediaNotas();
    controle.botao.addEventListener('click', () =>
        executarComCarregandoNotas(() => alternarMediaFinalizadaNotas(listaAluno)));
    return controle.etiqueta;
}

/**
 * Lê no localStorage a turma e o aluno escolhidos da última vez.
 * @returns {{turma: string, aluno: string}} Seleção salva (textos vazios se não houver).
 */
function lerSelecaoSalvaNotas() {
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_SELECAO_NOTAS));
        return { turma: String(salvo?.turma || ''), aluno: String(salvo?.aluno || '') };
    } catch (erro) {
        return { turma: '', aluno: '' };
    }
}

/**
 * Guarda no localStorage a turma e o aluno escolhidos (sem falhar se o navegador bloquear).
 * @param {string} turma - Código da turma.
 * @param {string} aluno - Id do aluno ("" = nenhum).
 */
function salvarSelecaoNotas(turma, aluno) {
    try {
        localStorage.setItem(CHAVE_SELECAO_NOTAS, JSON.stringify({ turma, aluno }));
    } catch (erro) {
        console.warn('Seleção não salva no navegador:', erro.message);
    }
}

/**
 * Reaplica o aluno salvo, se ele ainda estiver no combo da turma atual.
 * @param {HTMLSelectElement} listaAluno - Combo de alunos.
 * @param {string} alunoSalvo - Id do aluno salvo.
 */
async function restaurarAlunoSalvoNotas(listaAluno, alunoSalvo) {
    const existe = alunoSalvo
        && [...listaAluno.options].some((opcao) => opcao.value === alunoSalvo);
    if (!existe) return;

    listaAluno.value = alunoSalvo;
    await escolherAlunoNotas(alunoSalvo);
}

/**
 * Monta os combos Turma e Aluno do professor, começando na turma salva ou na favorita.
 */
async function montarSelecaoProfessorNotas() {
    estadoNotas.elementos.faixa.hidden = false;
    await carregarMediasDaMateriaNotas();
    estadoNotas.turmas = await listarTurmasCard(estadoNotas.materiaId);
    if (!estadoNotas.turmas.length) {
        renderizarTabelaNotas();
        mostrarAvisoNotas(MSG_SEM_TURMAS_NOTAS);
        return;
    }
    const comboTurma = criarComboNotas('Turma');
    const comboAluno = criarComboNotas('Aluno');
    estadoNotas.turmas.forEach((turma) => comboTurma.lista.add(new Option(
        rotuloTurmaNotas(turma), turma.codigo)));
    comboTurma.lista.addEventListener('change', () => {
        salvarSelecaoNotas(comboTurma.lista.value, '');
        trocarTurmaNotas(comboAluno.lista, comboTurma.lista.value);
    });
    comboAluno.lista.addEventListener('change', () => {
        salvarSelecaoNotas(comboTurma.lista.value, comboAluno.lista.value);
        escolherAlunoNotas(comboAluno.lista.value);
    });
    const { selecao } = estadoNotas.elementos;
    selecao.replaceChildren(comboTurma.etiqueta, comboAluno.etiqueta,
        criarInterruptorListarTodosNotas(comboAluno.lista),
        criarInterruptorConfirmarMediaNotas(comboAluno.lista));
    selecao.hidden = false;
    const salva = lerSelecaoSalvaNotas();
    const inicial = estadoNotas.turmas.find((turma) => turma.codigo === salva.turma)
        || estadoNotas.turmas.find((turma) => turma.favorito) || estadoNotas.turmas[0];
    comboTurma.lista.value = inicial.codigo;
    await trocarTurmaNotas(comboAluno.lista, inicial.codigo);
    if (inicial.codigo === salva.turma) {
        await restaurarAlunoSalvoNotas(comboAluno.lista, salva.aluno);
    }
}

/**
 * Carrega o card do aluno logado: turma, configuração e as próprias notas.
 */
async function montarVisaoAlunoNotas() {
    const paginas = estadoNotas.atividades.map((atividade) => atividade.pagina);
    estadoNotas.turma = await lerTurmaDoAlunoLogado(estadoNotas.usuarioId);
    if (!(await cardVisivelParaAlunoNotas())) {
        estadoNotas.elementos.card.hidden = true;
        return;
    }
    await carregarConfiguracaoNotas(estadoNotas.turma);
    estadoNotas.notas = await buscarNotasDoAlunoLogado(paginas);
    renderizarTabelaNotas();
    mostrarAvisoNotas('');
}

const ESPERA_REPO_NOTAS_MS = 100;
const MAX_ESPERA_REPO_NOTAS = 50;

/**
 * Espera o repositório do card (carregado em script separado) ficar disponível.
 * Rejeita se não aparecer em ~5 s, para o aviso mostrar a causa real.
 */
function esperarRepositorioNotas() {
    return new Promise((resolve, reject) => {
        let tentativas = 0;
        const verificar = () => {
            if (typeof lerLoginCard === 'function') {
                resolve();
                return;
            }
            tentativas += 1;
            if (tentativas > MAX_ESPERA_REPO_NOTAS) {
                reject(new Error('card-notas-media-repositorio.js não carregou'));
                return;
            }
            setTimeout(verificar, ESPERA_REPO_NOTAS_MS);
        };
        verificar();
    });
}

/**
 * Preenche o card conforme o perfil, depois de conferir login e atividades.
 */
async function preencherCardNotas() {
    mostrarAvisoNotas(MSG_CARREGANDO_NOTAS);
    await esperarRepositorioNotas();
    const login = await lerLoginCard();
    if (!login.logado) {
        estadoNotas.elementos.card.hidden = true;
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
        mostrarAvisoNotas(MSG_ERRO_NOTAS + ' Detalhe: ' + erro.message, true);
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
