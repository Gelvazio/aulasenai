// Respostas do aluno nas páginas de atividade (genérico para todas as aulas).
// Guarda o nome do estudante e a alternativa marcada em cada item no localStorage e
// monta, no fim da página, a folha de respostas preenchida.
// Dados da página: atributos data-uc, data-uc-curta, data-docente, data-total e,
// opcionalmente, data-turma no <body>.

const PREFIXO_CHAVE_RESPOSTAS = 'senai_respostas:';
const LETRAS_ALTERNATIVAS = ['A', 'B', 'C', 'D'];
const CLASSE_MARCADA = 'alternativa--marcada';
const CLASSE_IMPRIMIR = 'imprimir-folha';
const MARCA_VAZIA = '(  )';
const MARCA_PREENCHIDA = '( X )';
const MSG_PEDIR_NOME = 'Digite o seu nome antes de responder.';
const MSG_CONFIRMAR_LIMPEZA = 'Apagar o nome e todas as respostas desta atividade?';
<<<<<<< HEAD
const MSG_FALTA_NOME = 'Digite o seu nome no início da atividade.';
const MSG_TUDO_RESPONDIDO = 'Parabéns! Todas as questões foram assinaladas. ' +
    'Confira a folha de respostas e entregue ao professor.';
const CLASSE_QUESTAO_PENDENTE = 'questao--pendente';
const CLASSE_LINHA_PENDENTE = 'folha-respostas__linha--pendente';
=======
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11

/**
 * Monta a chave do localStorage, única para cada página de atividade.
 * @returns {string} Chave usada para salvar os dados desta página.
 */
function obterChaveRespostas() {
    return PREFIXO_CHAVE_RESPOSTAS + location.pathname;
}

/**
 * Lê o nome e as respostas salvas desta atividade.
 * @returns {{nome: string, respostas: Object<string, string>}} Dados salvos ou vazios.
 */
function lerDadosSalvos() {
    try {
        const salvo = JSON.parse(localStorage.getItem(obterChaveRespostas()));
        if (!salvo) return { nome: '', respostas: {} };
        return { nome: salvo.nome || '', respostas: salvo.respostas || {} };
    } catch (erro) {
        return { nome: '', respostas: {} };
    }
}

/**
 * Salva o nome e as respostas desta atividade no localStorage.
 * @param {{nome: string, respostas: Object<string, string>}} dados - Dados a salvar.
 */
function salvarDados(dados) {
    try {
        localStorage.setItem(obterChaveRespostas(), JSON.stringify(dados));
    } catch (erro) {
        // Sem localStorage (modo privado, bloqueio): a página segue funcionando só na memória.
    }
}

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
}

/**
 * Lista os itens da página com o número e os elementos de cada alternativa.
<<<<<<< HEAD
 * @returns {{numero: string, card: HTMLElement, alternativas: HTMLElement[]}[]} Itens.
=======
 * @returns {{numero: string, alternativas: HTMLElement[]}[]} Itens na ordem da página.
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
 */
function listarItens() {
    return Array.from(document.querySelectorAll('.aula-card.questao')).map((card) => {
        const badge = card.querySelector('.aula-badge');
        const numero = (badge?.textContent.match(/\d+/) || [''])[0];
<<<<<<< HEAD
        const alternativas = Array.from(card.querySelectorAll('.alternativas li'));
        return { numero, card, alternativas };
=======
        return { numero, alternativas: Array.from(card.querySelectorAll('.alternativas li')) };
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
    });
}

/**
 * Lê a letra (A–D) de uma alternativa pelo texto do seu rótulo.
 * @param {HTMLElement} alternativa - Elemento <li> da alternativa.
 * @returns {string} Letra da alternativa.
 */
function obterLetra(alternativa) {
    return (alternativa.querySelector('.letra')?.textContent || '').replace(/\W/g, '');
}

/**
 * Destaca a alternativa marcada de um item e desmarca as demais.
 * @param {{alternativas: HTMLElement[]}} item - Item da atividade.
 * @param {string} letraMarcada - Letra escolhida ou vazio.
 */
function destacarAlternativa(item, letraMarcada) {
    item.alternativas.forEach((alternativa) => {
        const estaMarcada = obterLetra(alternativa) === letraMarcada;
        alternativa.classList.toggle(CLASSE_MARCADA, estaMarcada);
        alternativa.setAttribute('aria-checked', String(estaMarcada));
    });
}

/**
 * Monta o bloco de identificação do início, onde o estudante digita o nome.
 * @returns {HTMLElement} Bloco de identificação.
 */
function montarIdentificacao() {
    const bloco = criarElemento('div', 'aula-card identificacao-estudante');
    bloco.appendChild(criarElemento('span', 'aula-badge', 'IDENTIFICAÇÃO'));
    bloco.appendChild(criarElemento('div', 'aula-title', 'Antes de começar, digite o seu nome'));

    const rotulo = criarElemento('label', 'identificacao-estudante__rotulo', 'Nome do estudante');
    const campo = criarElemento('input', 'identificacao-estudante__campo campo-nome-estudante');
    campo.type = 'text';
    campo.autocomplete = 'name';
    campo.placeholder = 'Nome completo';
    rotulo.appendChild(campo);
    bloco.appendChild(rotulo);
    bloco.appendChild(criarElemento('p', 'identificacao-estudante__aviso'));
    return bloco;
}

/**
 * Liga os campos de nome (início e folha) ao estado, mantendo os dois iguais.
 * @param {Object} estado - Estado da página.
 */
function ligarCamposNome(estado) {
    document.querySelectorAll('.campo-nome-estudante').forEach((campo) => {
        campo.value = estado.dados.nome;
        campo.addEventListener('input', () => {
            estado.dados.nome = campo.value;
            salvarDados(estado.dados);
            sincronizarNome(estado, campo);
            estado.atualizarFolha();
        });
    });
}

/**
 * Copia o nome digitado para os outros campos de nome da página.
 * @param {Object} estado - Estado da página.
 * @param {HTMLInputElement} origem - Campo em que o nome foi digitado.
 */
function sincronizarNome(estado, origem) {
    document.querySelectorAll('.campo-nome-estudante').forEach((campo) => {
        if (campo !== origem) campo.value = estado.dados.nome;
    });
    const aviso = document.querySelector('.identificacao-estudante__aviso');
    if (aviso && estado.dados.nome.trim()) aviso.textContent = '';
}

/**
 * Registra a alternativa escolhida, exigindo antes o nome do estudante.
 * @param {Object} estado - Estado da página.
 * @param {{numero: string}} item - Item respondido.
 * @param {string} letra - Letra escolhida.
 */
function registrarResposta(estado, item, letra) {
    if (!estado.dados.nome.trim()) {
        const aviso = document.querySelector('.identificacao-estudante__aviso');
        if (aviso) aviso.textContent = MSG_PEDIR_NOME;
        document.querySelector('.identificacao-estudante__campo')?.focus();
        return;
    }
    estado.dados.respostas[item.numero] = letra;
    salvarDados(estado.dados);
    destacarAlternativa(item, letra);
<<<<<<< HEAD
    item.card.classList.remove(CLASSE_QUESTAO_PENDENTE);
=======
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
    estado.atualizarFolha();
}

/**
 * Torna as alternativas clicáveis (mouse e teclado) e restaura as marcações salvas.
 * @param {Object} estado - Estado da página.
 */
function ligarAlternativas(estado) {
    estado.itens.forEach((item) => {
        item.alternativas[0]?.parentElement.setAttribute('role', 'radiogroup');
        item.alternativas.forEach((alternativa) => {
            alternativa.setAttribute('role', 'radio');
            alternativa.tabIndex = 0;
            const letra = obterLetra(alternativa);
            alternativa.addEventListener('click', () => registrarResposta(estado, item, letra));
            alternativa.addEventListener('keydown', (evento) => {
                const ehTeclaDeSelecao = evento.key === 'Enter' || evento.key === ' ';
                if (!ehTeclaDeSelecao) return;
                evento.preventDefault();
                registrarResposta(estado, item, letra);
            });
        });
        destacarAlternativa(item, estado.dados.respostas[item.numero] || '');
    });
}

/**
 * Formata a data de hoje como DD/MM/AAAA.
 * @returns {string} Data formatada.
 */
function obterDataHoje() {
    return new Date().toLocaleDateString('pt-BR');
}

/**
 * Monta uma linha de informação da folha (rótulo em negrito + valor).
 * @param {string} rotulo - Rótulo do campo.
 * @param {string} valor - Valor exibido.
 * @param {string} [classe] - Classe extra da célula.
 * @returns {HTMLElement} Célula da folha.
 */
function montarCampoFolha(rotulo, valor, classe) {
    const celula = criarElemento('div', 'folha-respostas__campo ' + (classe || ''));
    celula.appendChild(criarElemento('strong', '', rotulo + ': '));
    celula.appendChild(document.createTextNode(valor));
    return celula;
}

/**
 * Monta o cabeçalho da folha de respostas (SENAI, título, dados da UC e do estudante).
 * @param {Object} estado - Estado da página.
 * @returns {HTMLElement} Cabeçalho da folha.
 */
function montarCabecalhoFolha(estado) {
    const dadosPagina = document.body.dataset;
    const cabecalho = criarElemento('div', 'folha-respostas__cabecalho');
    const senai = criarElemento('div', 'folha-respostas__senai');
    ['SENAI', 'Serviço Nacional de Aprendizagem Industrial', 'Santa Catarina']
        .forEach((linha) => senai.appendChild(criarElemento('div', '', linha)));
    cabecalho.appendChild(senai);
    cabecalho.appendChild(criarElemento('div', 'folha-respostas__titulo',
        'ATIVIDADE AVALIATIVA FOLHA DE RESPOSTAS'));
    cabecalho.appendChild(criarElemento('div', 'folha-respostas__desempenho', 'Desempenho'));

    const tituloUc = (dadosPagina.uc || '').toUpperCase() + ' (' + estado.itens.length + ' ITENS)';
    cabecalho.appendChild(criarElemento('div', 'folha-respostas__uc', tituloUc));
    cabecalho.appendChild(montarCampoFolha('Docente', (dadosPagina.docente || '').toUpperCase(),
        'folha-respostas__campo--forte'));
    cabecalho.appendChild(montarCampoFolha('Data', obterDataHoje(),
        'folha-respostas__campo--direita'));
    cabecalho.appendChild(montarCampoFolha('Unidade Curricular', dadosPagina.uc || ''));
    cabecalho.appendChild(montarCampoFolha('Turma', dadosPagina.turma || '______________',
        'folha-respostas__campo--direita'));
    cabecalho.appendChild(montarCampoEstudante());
    return cabecalho;
}

/**
 * Monta o campo "Estudante" da folha, com o nome editável.
 * @returns {HTMLElement} Célula com o campo de nome.
 */
function montarCampoEstudante() {
    const celula = criarElemento('label', 'folha-respostas__campo folha-respostas__campo--inteiro');
    celula.appendChild(criarElemento('strong', '', 'Estudante: '));
    const campo = criarElemento('input', 'folha-respostas__nome campo-nome-estudante');
    campo.type = 'text';
    campo.placeholder = 'Digite o seu nome';
    celula.appendChild(campo);
    return celula;
}

/**
 * Monta uma tabela de respostas (Nº, A, B, C, D) para uma parte dos itens.
 * @param {{numero: string}[]} itens - Itens desta tabela.
 * @returns {HTMLTableElement} Tabela montada.
 */
function montarTabelaRespostas(itens) {
    const tabela = criarElemento('table', 'folha-respostas__tabela');
    const cabecalho = tabela.createTHead().insertRow();
    ['Nº', ...LETRAS_ALTERNATIVAS].forEach((texto) => {
        cabecalho.appendChild(criarElemento('th', '', texto));
    });
    const corpo = tabela.createTBody();
    itens.forEach((item) => {
        const linha = corpo.insertRow();
        linha.dataset.item = item.numero;
        linha.appendChild(criarElemento('td', 'folha-respostas__numero', item.numero));
        LETRAS_ALTERNATIVAS.forEach((letra) => {
            const celula = criarElemento('td', 'folha-respostas__marca', MARCA_VAZIA);
            celula.dataset.letra = letra;
            linha.appendChild(celula);
        });
    });
    return tabela;
}

/**
<<<<<<< HEAD
 * Cria um botão de ação da folha.
 * @param {string} classe - Classes CSS do botão.
 * @param {string} texto - Texto do botão.
 * @param {Function} aoClicar - Função chamada no clique.
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotao(classe, texto, aoClicar) {
    const botao = criarElemento('button', classe, texto);
    botao.type = 'button';
    botao.addEventListener('click', aoClicar);
    return botao;
}

/**
 * Monta os botões da folha: finalizar, imprimir e limpar respostas.
=======
 * Monta os botões da folha: imprimir e limpar respostas.
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
 * @param {Object} estado - Estado da página.
 * @returns {HTMLElement} Barra de ações.
 */
function montarAcoesFolha(estado) {
    const acoes = criarElemento('div', 'folha-respostas__acoes');
<<<<<<< HEAD
    acoes.appendChild(criarBotao('btn-export btn-export--finalizar', '✅ Finalizar atividade',
        () => finalizarAtividade(estado)));
    acoes.appendChild(criarBotao('btn-export', '🖨️ Imprimir folha de respostas',
        () => imprimirFolha(estado)));
    acoes.appendChild(criarBotao('btn-export btn-export--secundario', '🗑️ Limpar respostas',
        () => limparRespostas(estado)));
=======
    const botaoImprimir = criarElemento('button', 'btn-export', '🖨️ Imprimir folha de respostas');
    const botaoLimpar = criarElemento('button', 'btn-export btn-export--secundario',
        '🗑️ Limpar respostas');
    botaoImprimir.type = 'button';
    botaoLimpar.type = 'button';
    botaoImprimir.addEventListener('click', imprimirFolha);
    botaoLimpar.addEventListener('click', () => limparRespostas(estado));
    acoes.appendChild(botaoImprimir);
    acoes.appendChild(botaoLimpar);
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
    return acoes;
}

/**
<<<<<<< HEAD
 * Lista os itens que ainda não têm alternativa assinalada.
 * @param {Object} estado - Estado da página.
 * @returns {{numero: string, card: HTMLElement}[]} Itens sem resposta.
 */
function listarPendentes(estado) {
    return estado.itens.filter((item) => !estado.dados.respostas[item.numero]);
}

/**
 * Destaca as questões e as linhas da folha que ainda estão sem resposta.
 * @param {Object} estado - Estado da página.
 * @param {{numero: string}[]} pendentes - Itens sem resposta.
 */
function destacarPendentes(estado, pendentes) {
    const numerosPendentes = pendentes.map((item) => item.numero);
    estado.itens.forEach((item) => {
        const estaPendente = numerosPendentes.includes(item.numero);
        item.card.classList.toggle(CLASSE_QUESTAO_PENDENTE, estaPendente);
        document.querySelector('.folha-respostas tr[data-item="' + item.numero + '"]')
            ?.classList.toggle(CLASSE_LINHA_PENDENTE, estaPendente);
    });
}

/**
 * Monta a mensagem de alerta com o que falta preencher.
 * @param {boolean} faltaNome - Se o nome do estudante está vazio.
 * @param {{numero: string}[]} pendentes - Itens sem resposta.
 * @returns {string} Mensagem para o aluno.
 */
function montarMensagemPendencias(faltaNome, pendentes) {
    const linhas = ['Atenção! A atividade ainda não está completa.', ''];
    if (faltaNome) linhas.push('• ' + MSG_FALTA_NOME);
    if (pendentes.length) {
        const numeros = pendentes.map((item) => item.numero).join(', ');
        linhas.push('• ' + pendentes.length + ' questão(ões) sem resposta: ' + numeros + '.');
        linhas.push('', 'As questões pendentes foram destacadas em vermelho.');
    }
    return linhas.join('\n');
}

/**
 * Verifica se o nome foi digitado e se todas as questões foram assinaladas.
 * Se faltar algo, alerta o aluno, destaca as pendências e leva até a primeira delas.
 * @param {Object} estado - Estado da página.
 * @returns {boolean} true se a atividade está completa.
 */
function validarAtividade(estado) {
    const pendentes = listarPendentes(estado);
    const faltaNome = !estado.dados.nome.trim();
    destacarPendentes(estado, pendentes);
    const estaCompleta = !faltaNome && pendentes.length === 0;
    if (estaCompleta) return true;

    window.alert(montarMensagemPendencias(faltaNome, pendentes));
    if (faltaNome) {
        document.querySelector('.identificacao-estudante__campo')?.focus();
        return false;
    }
    pendentes[0].card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
}

/**
 * Finaliza a atividade: valida as respostas e confirma ao aluno quando está tudo certo.
 * @param {Object} estado - Estado da página.
 */
function finalizarAtividade(estado) {
    if (!validarAtividade(estado)) return;
    window.alert(MSG_TUDO_RESPONDIDO);
}

/**
=======
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
 * Monta a folha de respostas completa, com duas colunas de itens.
 * @param {Object} estado - Estado da página.
 * @returns {HTMLElement} Seção da folha de respostas.
 */
function montarFolha(estado) {
    const folha = criarElemento('section', 'folha-respostas');
    folha.setAttribute('aria-label', 'Folha de respostas');
    folha.appendChild(montarCabecalhoFolha(estado));
    folha.appendChild(criarElemento('p', 'folha-respostas__instrucoes',
        'INSTRUÇÕES: as alternativas marcadas nas questões aparecem abaixo com um X. ' +
        'Apenas uma alternativa por questão.'));

    const metade = Math.ceil(estado.itens.length / 2);
    const colunas = criarElemento('div', 'folha-respostas__colunas');
    colunas.appendChild(montarTabelaRespostas(estado.itens.slice(0, metade)));
    colunas.appendChild(montarTabelaRespostas(estado.itens.slice(metade)));
    folha.appendChild(colunas);
    folha.appendChild(criarElemento('p', 'folha-respostas__contagem'));
    folha.appendChild(montarAcoesFolha(estado));
    return folha;
}

/**
 * Preenche a folha com as respostas salvas e a contagem de itens respondidos.
 * @param {Object} estado - Estado da página.
 */
function atualizarFolha(estado) {
    document.querySelectorAll('.folha-respostas__marca').forEach((celula) => {
        const numero = celula.parentElement.dataset.item;
        const estaMarcada = estado.dados.respostas[numero] === celula.dataset.letra;
        celula.textContent = estaMarcada ? MARCA_PREENCHIDA : MARCA_VAZIA;
        celula.classList.toggle('folha-respostas__marca--preenchida', estaMarcada);
    });
    const respondidas = estado.itens.filter((item) => estado.dados.respostas[item.numero]).length;
    const contagem = document.querySelector('.folha-respostas__contagem');
    if (contagem) {
        contagem.textContent = 'Respondidas: ' + respondidas + ' de ' + estado.itens.length;
    }
}

/**
<<<<<<< HEAD
 * Imprime só a folha de respostas, depois de validar a atividade.
 * @param {Object} estado - Estado da página.
 */
function imprimirFolha(estado) {
    if (!validarAtividade(estado)) return;
=======
 * Imprime só a folha de respostas.
 */
function imprimirFolha() {
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
    document.body.classList.add(CLASSE_IMPRIMIR);
    window.addEventListener('afterprint', () => document.body.classList.remove(CLASSE_IMPRIMIR),
        { once: true });
    window.print();
}

/**
 * Apaga o nome e as respostas salvas desta atividade, após confirmação.
 * @param {Object} estado - Estado da página.
 */
function limparRespostas(estado) {
    if (!window.confirm(MSG_CONFIRMAR_LIMPEZA)) return;
    estado.dados = { nome: '', respostas: {} };
    salvarDados(estado.dados);
    estado.itens.forEach((item) => destacarAlternativa(item, ''));
<<<<<<< HEAD
    destacarPendentes(estado, []);
=======
>>>>>>> 83f67023d29a458dc2c304e9aae0cd7b21ac7c11
    document.querySelectorAll('.campo-nome-estudante').forEach((campo) => {
        campo.value = '';
    });
    estado.atualizarFolha();
    document.querySelector('.identificacao-estudante__campo')?.focus();
}

/**
 * Inicia o registro de respostas: identificação no início e folha no fim da página.
 */
function iniciarRespostasAtividade() {
    const secao = document.querySelector('.content-section');
    if (!secao) return;

    const estado = { dados: lerDadosSalvos(), itens: listarItens() };
    estado.atualizarFolha = () => atualizarFolha(estado);

    secao.insertBefore(montarIdentificacao(), secao.firstChild);
    secao.appendChild(montarFolha(estado));
    ligarCamposNome(estado);
    ligarAlternativas(estado);
    estado.atualizarFolha();
}

iniciarRespostasAtividade();
