// Respostas do aluno nas páginas de atividade (genérico para todas as aulas).
// Marca alternativas, monta a folha de respostas no fim da página e registra a entrega.
// REGRA: as alternativas são salvas SOMENTE no banco (Supabase) — nada de localStorage.
// Quem grava é o provedor do banco (assets/js/respostas-atividade-banco.js): ler é livre e o
// login só é pedido ao marcar. Sem banco disponível, a marcação fica bloqueada com aviso.
// Dados da página: data-uc, data-uc-curta, data-docente, data-total, data-turma (opcional).

const RAIZ_SCRIPTS = document.currentScript
    ? document.currentScript.src.replace(/[^/]*$/, '') : '';
const CLASSE_MARCADA = 'alternativa--marcada';
const CLASSE_ENTREGUE = 'atividade--entregue';
const CLASSE_QUESTAO_PENDENTE = 'questao--pendente';
// REGRA: o limite de tentativas vem do banco (atividade.max_tentativas); a nova tentativa só o
// professor libera.
const DURACAO_AVISO_MS = 3000;
const NOTA_MAXIMA = 10;
const NOTA_MINIMA_APROVACAO = 7;
const CASAS_NOTA = 1;
const CLASSE_RESULTADO = 'resultado-atividade';
const CLASSE_RESULTADO_APROVADO = 'resultado-atividade--aprovado';
const CLASSE_RESULTADO_REPROVADO = 'resultado-atividade--reprovado';
const MSG_NOTA_APROVADO =
    'Você atingiu a pontuação mínima que é ' + NOTA_MINIMA_APROVACAO + '!';
const MSG_NOTA_REPROVADO =
    'Você não atingiu a pontuação mínima que é ' + NOTA_MINIMA_APROVACAO + ', solicite ao ' +
    'professor liberação da atividade para uma nova tentativa!';
const CLASSE_AVISO = 'aviso-gravacao';
const CLASSE_AVISO_ERRO = 'aviso-gravacao--erro';
const MSG_REGRA_TENTATIVAS = 'Depois de entregar, só o professor pode liberar uma nova tentativa.';
const MSG_PEDIR_NOVA_TENTATIVA = 'Se precisar refazer, peça ao professor para liberar uma nova ' +
    'tentativa.';
const MSG_JA_ENTREGUE = 'Esta tentativa já foi entregue e as respostas não podem ser ' +
    'alteradas. ' + MSG_PEDIR_NOVA_TENTATIVA;
const MSG_BANCO_INDISPONIVEL = 'As respostas desta atividade são salvas no banco de dados, ' +
    'que está indisponível agora. Avise o professor e tente novamente mais tarde.';
const MSG_ERRO_SALVAR = 'Não foi possível salvar a resposta. ' +
    'Verifique a conexão e tente de novo.';
const MSG_ERRO_CONFERIR = 'Não foi possível conferir as respostas gravadas no banco. ' +
    'Verifique a conexão e tente finalizar de novo.';

/**
 * Monta o aviso de que as tentativas acabaram.
 * @param {number} maximo - Limite de tentativas da atividade (vem do banco).
 * @returns {string} Mensagem para o aluno.
 */
function montarMsgUltimaTentativa(maximo) {
    return 'Você usou as ' + maximo + ' tentativas desta atividade.';
}

/**
 * Monta a mensagem de confirmação da entrega, com o número da tentativa e a nota.
 * @param {{tentativa: number, maximoTentativas: number}} estado - Tentativa entregue e limite.
 * @param {{acertos: number, total: number}|null} resultado - Resultado da tentativa.
 * @returns {string} Mensagem para o aluno.
 */
function montarMensagemEntrega(estado, resultado) {
    const { tentativa, maximoTentativas } = estado;
    const orientacao = tentativa >= maximoTentativas
        ? montarMsgUltimaTentativa(maximoTentativas) : MSG_PEDIR_NOVA_TENTATIVA;
    const linhaNota = resultado
        ? ['Sua nota: ' + formatarNota(calcularNota(resultado)) + '.', ''] : [];
    return ['Atividade entregue!',
        'Suas respostas foram gravadas (tentativa ' + tentativa + ' de ' + maximoTentativas + ').',
        '', ...linhaNota, orientacao].join('\n');
}

/**
 * Monta a pergunta de confirmação antes de entregar a tentativa.
 * @param {{tentativa: number, maximoTentativas: number}} estado - Tentativa em andamento e limite.
 * @returns {string} Mensagem para o aluno.
 */
function montarMensagemConfirmarEntrega(estado) {
    const { tentativa, maximoTentativas } = estado;
    return ['Entregar a tentativa ' + tentativa + ' de ' + maximoTentativas + '?', '',
        'Depois de entregar, as respostas não poderão ser alteradas.',
        tentativa >= maximoTentativas
            ? montarMsgUltimaTentativa(maximoTentativas) : MSG_PEDIR_NOVA_TENTATIVA,
    ].join('\n');
}

/**
 * Calcula a nota (0 a 10) de acertos e total; a comparação com o mínimo usa o valor exato.
 * @param {{acertos: number, total: number}} resultado - Acertos e total de itens.
 * @returns {number} Nota exata (sem arredondar).
 */
function calcularNota(resultado) {
    return (resultado.acertos / resultado.total) * NOTA_MAXIMA;
}

/**
 * Formata a nota com uma casa decimal e vírgula (ex.: 7,5).
 * @param {number} nota - Nota exata.
 * @returns {string} Nota formatada.
 */
function formatarNota(nota) {
    return nota.toFixed(CASAS_NOTA).replace('.', ',');
}

/**
 * Mostra, no início da atividade, a nota da tentativa entregue e se atingiu o mínimo.
 * @param {Object} estado - Estado da página.
 * @param {{acertos: number, total: number}|null} resultado - Resultado ou null.
 */
function mostrarResultadoNoInicio(estado, resultado) {
    if (!resultado) return;
    const secao = document.querySelector('.content-section');
    secao.querySelector('.' + CLASSE_RESULTADO)?.remove();
    const nota = calcularNota(resultado);
    const atingiu = nota >= NOTA_MINIMA_APROVACAO;
    const bloco = criarElemento('div', 'aula-card ' + CLASSE_RESULTADO + ' ' + (atingiu
        ? CLASSE_RESULTADO_APROVADO : CLASSE_RESULTADO_REPROVADO));
    bloco.setAttribute('role', 'status');
    bloco.appendChild(criarElemento('span', 'aula-badge', 'RESULTADO'));
    bloco.appendChild(criarElemento('div', 'aula-title', 'Sua nota: ' + formatarNota(nota) +
        ' (tentativa ' + estado.tentativa + ' de ' + estado.maximoTentativas + ')'));
    bloco.appendChild(criarElemento('p', 'resultado-atividade__detalhe',
        resultado.acertos + ' acertos em ' + resultado.total + ' questões.'));
    bloco.appendChild(criarElemento('p', 'resultado-atividade__mensagem',
        atingiu ? MSG_NOTA_APROVADO : MSG_NOTA_REPROVADO));
    secao.insertBefore(bloco, secao.firstChild.nextSibling);
}

/**
 * Mostra um aviso rápido (canto da tela) confirmando a gravação da resposta.
 * @param {string} texto - Texto do aviso.
 * @param {boolean} [ehErro] - Se é um aviso de falha.
 */
function mostrarAvisoGravacao(texto, ehErro) {
    let aviso = document.querySelector('.' + CLASSE_AVISO);
    if (!aviso) {
        aviso = criarElemento('div', CLASSE_AVISO);
        aviso.setAttribute('role', 'status');
        aviso.setAttribute('aria-live', 'polite');
        document.body.appendChild(aviso);
    }
    aviso.textContent = texto;
    aviso.classList.toggle(CLASSE_AVISO_ERRO, Boolean(ehErro));
    aviso.classList.add(CLASSE_AVISO + '--visivel');
    clearTimeout(aviso.temporizador);
    aviso.temporizador = setTimeout(() => {
        aviso.classList.remove(CLASSE_AVISO + '--visivel');
    }, DURACAO_AVISO_MS);
}

/**
 * Carrega um script da pasta assets/js e espera terminar.
 * @param {string} nome - Nome do arquivo (ex.: "popup.js").
 * @returns {Promise<void>} Resolve quando o script carregou.
 */
function carregarScript(nome) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = RAIZ_SCRIPTS + nome;
        script.onload = resolver;
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + nome));
        document.head.appendChild(script);
    });
}

/**
 * Garante que o popup (assets/js/popup.js) esteja carregado: os avisos da página usam popup,
 * nunca alert() do navegador.
 */
async function garantirPopup() {
    if (typeof window.mostrarPopup === 'function') return;
    await carregarScript('popup.js');
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
 * Cria um botão.
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
 * Lista os itens da página com o número e os elementos de cada alternativa.
 * @returns {{numero: string, card: HTMLElement, alternativas: HTMLElement[]}[]} Itens.
 */
function listarItens() {
    return Array.from(document.querySelectorAll('.aula-card.questao')).map((card) => {
        const badge = card.querySelector('.aula-badge');
        const numero = (badge?.textContent.match(/\d+/) || [''])[0];
        const alternativas = Array.from(card.querySelectorAll('.alternativas li'));
        return { numero, card, alternativas };
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
 * Nas novas tentativas, esconde as alternativas das questões já acertadas na tentativa anterior
 * e mostra um aviso. A resposta continua marcada no código e gravada no banco (herdada), então
 * vale de novo na entrega.
 * @param {Object} estado - Estado da página.
 * @param {string[]} herdadas - Números das questões herdadas da tentativa anterior.
 */
function esconderQuestoesHerdadas(estado, herdadas) {
    const numeros = new Set(herdadas);
    estado.itens.filter((item) => numeros.has(item.numero)).forEach((item) => {
        const lista = item.card.querySelector('.alternativas');
        if (lista) lista.hidden = true;
        const aviso = criarElemento('div', 'questao-acertada',
            '✅ Você já acertou esta questão na tentativa anterior — a resposta foi mantida.');
        item.card.appendChild(aviso);
    });
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
 * Registra a alternativa escolhida: marca na tela na hora e grava pelo provedor.
 * Se a gravação falhar, volta a marcação anterior e avisa o aluno.
 * @param {Object} estado - Estado da página.
 * @param {{numero: string, card: HTMLElement}} item - Item respondido.
 * @param {string} letra - Letra escolhida.
 */
async function registrarResposta(estado, item, letra) {
    if (estado.entregue) return mostrarPopup(MSG_JA_ENTREGUE, { tipo: 'aviso' });
    if (!estado.provedor.podeResponder()) return;
    const letraAnterior = estado.dados.respostas[item.numero] || '';
    estado.dados.respostas[item.numero] = letra;
    destacarAlternativa(item, letra);
    item.card.classList.remove(CLASSE_QUESTAO_PENDENTE);
    estado.atualizarFolha();
    try {
        const gravacao = estado.provedor.salvarResposta(item.numero, letra);
        estado.gravacoes.push(gravacao);
        await gravacao;
        mostrarAvisoGravacao('✅ Resposta gravada: questão ' + item.numero + ' = ' + letra);
    } catch (erro) {
        if (letraAnterior) estado.dados.respostas[item.numero] = letraAnterior;
        else delete estado.dados.respostas[item.numero];
        destacarAlternativa(item, letraAnterior);
        estado.atualizarFolha();
        mostrarAvisoGravacao('❌ Resposta NÃO gravada: questão ' + item.numero, true);
        mostrarPopup(erro.message || MSG_ERRO_SALVAR, { tipo: 'erro' });
    }
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
 * Monta o botão de finalizar da folha.
 * @param {Object} estado - Estado da página.
 * @returns {HTMLElement} Barra de ações.
 */
function montarAcoesFolha(estado) {
    const acoes = criarElemento('div', 'folha-respostas__acoes');
    acoes.appendChild(criarBotao('btn-export btn-export--finalizar botao-finalizar',
        '✅ Finalizar atividade', () => finalizarAtividade(estado)));
    return acoes;
}

/**
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
    });
}

/**
 * Monta a mensagem de alerta com as questões que faltam.
 * @param {{numero: string}[]} pendentes - Itens sem resposta.
 * @returns {string} Mensagem para o aluno.
 */
function montarMensagemPendencias(pendentes) {
    const numeros = pendentes.map((item) => item.numero).join(', ');
    return ['Atenção! A atividade ainda não está completa.', '',
        '• ' + pendentes.length + ' questão(ões) sem resposta: ' + numeros + '.', '',
        'As questões pendentes foram destacadas em vermelho.'].join('\n');
}

/**
 * Verifica se o aluno está conectado e se todas as questões foram assinaladas.
 * Se faltar algo, alerta o aluno, destaca as pendências e leva até a primeira delas.
 * @param {Object} estado - Estado da página.
 * @returns {Promise<boolean>} true se a atividade está completa.
 */
async function validarAtividade(estado) {
    if (!estado.provedor.podeResponder()) return false;
    const pendentes = listarPendentes(estado);
    destacarPendentes(estado, pendentes);
    if (pendentes.length === 0) return true;

    await mostrarPopup(montarMensagemPendencias(pendentes), { tipo: 'aviso' });
    pendentes[0].card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
}

/**
 * Desmarca todas as alternativas na tela depois da entrega. As respostas continuam
 * gravadas no banco; só a exibição é limpa, para o aluno não ver nem refazer a marcação.
 * @param {Object} estado - Estado da página.
 */
function limparMarcacoesNaTela(estado) {
    estado.dados.respostas = {};
    estado.itens.forEach((item) => destacarAlternativa(item, ''));
    estado.atualizarFolha();
}

/**
 * Trava a atividade depois da entrega (sem novas marcações) e mostra a data da entrega.
 * @param {Object} estado - Estado da página.
 * @param {string} [entregueEm] - Data/hora da entrega (ISO).
 */
function marcarEntregue(estado, entregueEm) {
    estado.entregue = true;
    document.body.classList.add(CLASSE_ENTREGUE);
    limparMarcacoesNaTela(estado);
    const botao = document.querySelector('.botao-finalizar');
    if (botao) botao.disabled = true;
    const contagem = document.querySelector('.folha-respostas__contagem');
    if (contagem && entregueEm) {
        contagem.textContent += ' · Entregue em ' + new Date(entregueEm).toLocaleString('pt-BR');
    }
}

/**
 * Monta a mensagem com as questões que NÃO estão gravadas no banco.
 * @param {{numero: string}[]} faltando - Itens sem resposta gravada.
 * @returns {string} Mensagem para o aluno.
 */
function montarMensagemNaoGravadas(faltando) {
    const numeros = faltando.map((item) => item.numero).join(', ');
    return ['Atenção! Nem todas as respostas estão gravadas no banco.', '',
        '• ' + faltando.length + ' questão(ões) sem resposta gravada: ' + numeros + '.', '',
        'Marque essas questões de novo, espere o aviso "Resposta gravada" e tente finalizar.',
    ].join('\n');
}

/**
 * Confere no banco se TODAS as alternativas estão gravadas; o banco é a fonte da verdade.
 * Espera as gravações em andamento, relê as respostas gravadas e sincroniza a tela com elas.
 * @param {Object} estado - Estado da página.
 * @returns {Promise<boolean>} true se todas as questões estão gravadas.
 */
async function conferirGravacao(estado) {
    await Promise.allSettled(estado.gravacoes);
    let gravadas;
    try {
        gravadas = await estado.provedor.lerGravadas();
    } catch (erro) {
        await mostrarPopup(MSG_ERRO_CONFERIR, { tipo: 'erro' });
        return false;
    }
    estado.dados.respostas = gravadas;
    estado.itens.forEach((item) => destacarAlternativa(item, gravadas[item.numero] || ''));
    estado.atualizarFolha();
    const faltando = listarPendentes(estado);
    destacarPendentes(estado, faltando);
    if (faltando.length === 0) return true;

    await mostrarPopup(montarMensagemNaoGravadas(faltando), { tipo: 'aviso' });
    faltando[0].card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
}

/**
 * Finaliza a atividade: valida e registra a entrega no banco (depois disso, trava).
 * @param {Object} estado - Estado da página.
 */
async function finalizarAtividade(estado) {
    if (estado.entregue) return mostrarPopup(MSG_JA_ENTREGUE, { tipo: 'aviso' });
    if (!(await validarAtividade(estado))) return;
    const botao = document.querySelector('.botao-finalizar');
    botao.disabled = true;
    try {
        const todasGravadas = await conferirGravacao(estado);
        if (!todasGravadas) return;
        const querEntregar = await confirmarPopup(
            montarMensagemConfirmarEntrega(estado),
            { titulo: 'Entregar atividade', textoConfirmar: 'Entregar', textoCancelar: 'Voltar' });
        if (!querEntregar) return;
        const resultado = await estado.provedor.entregar();
        estado.atualizarFolha();
        marcarEntregue(estado, resultado.entregueEm);
        mostrarAvisoGravacao('✅ Entrega gravada: tentativa ' + estado.tentativa);
        mostrarResultadoNoInicio(estado, resultado.resultado);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        await mostrarPopup(montarMensagemEntrega(estado, resultado.resultado),
            { tipo: 'sucesso', titulo: 'Atividade entregue' });
        window.location.reload();
    } catch (erro) {
        await mostrarPopup(erro.message || MSG_ERRO_SALVAR, { tipo: 'erro' });
    } finally {
        botao.disabled = estado.entregue;
    }
}

/**
 * Monta o bloco final da atividade: contagem de respondidas e botão de finalizar.
 * @param {Object} estado - Estado da página.
 * @returns {HTMLElement} Seção da folha de respostas.
 */
function montarFolha(estado) {
    const folha = criarElemento('section', 'folha-respostas');
    folha.setAttribute('aria-label', 'Finalização da atividade');
    folha.appendChild(criarElemento('p', 'folha-respostas__contagem'));
    folha.appendChild(montarAcoesFolha(estado));
    return folha;
}

/**
 * Atualiza a contagem de itens respondidos.
 * @param {Object} estado - Estado da página.
 */
function atualizarFolha(estado) {
    const respondidas = estado.itens.filter((item) => estado.dados.respostas[item.numero]).length;
    const contagem = document.querySelector('.folha-respostas__contagem');
    if (!contagem) return;

    contagem.textContent = 'Respondidas: ' + respondidas + ' de ' + estado.itens.length +
        ' · Tentativa ' + estado.tentativa + ' de ' + estado.maximoTentativas;
}

/**
 * Cria o provedor usado quando a página exige banco mas ele não está disponível
 * (atividade sem cadastro, projeto fora do ar, biblioteca não carregada). Regra do projeto:
 * as alternativas SEMPRE são salvas no banco — então a marcação fica bloqueada, com aviso.
 * @returns {Object} Provedor que não permite responder.
 */
function criarProvedorIndisponivel() {
    return {
        montarIdentificacao() {
            const bloco = criarElemento('div', 'aula-card identificacao-estudante');
            bloco.appendChild(criarElemento('span', 'aula-badge', 'AVISO'));
            bloco.appendChild(criarElemento('div', 'aula-title', 'Respostas indisponíveis'));
            bloco.appendChild(criarElemento('p', 'identificacao-estudante__aviso',
                MSG_BANCO_INDISPONIVEL));
            return bloco;
        },
        podeResponder() {
            mostrarPopup(MSG_BANCO_INDISPONIVEL, { tipo: 'erro' });
            return false;
        },
        async salvarResposta() { throw new Error(MSG_BANCO_INDISPONIVEL); },
        async lerGravadas() { throw new Error(MSG_BANCO_INDISPONIVEL); },
        async entregar() { throw new Error(MSG_BANCO_INDISPONIVEL); },
    };
}

/**
 * Escolhe o provedor: sempre o banco; se ele não estiver disponível, a marcação é bloqueada.
 * @returns {Promise<{provedor: Object, carregado: Object}>} Provedor e dados iniciais.
 */
async function escolherProvedor() {
    const bancoCarregado = typeof window.criarProvedorRespostasBanco === 'function';
    if (bancoCarregado) {
        const provedorBanco = window.criarProvedorRespostasBanco();
        const carregado = await provedorBanco.carregar();
        if (carregado.disponivel) return { provedor: provedorBanco, carregado };
    }
    console.warn('Banco indisponível para esta atividade: marcação bloqueada.');
    return { provedor: criarProvedorIndisponivel(), carregado: { respostas: {} } };
}

/**
 * Perfil professor: carrega e mostra a lista de alunos com tentativas, notas e liberação.
 * Uma falha aqui não pode impedir o resto da página.
 * @param {HTMLElement} secao - Seção de conteúdo da página.
 * @param {number} atividadeId - Id da atividade no banco.
 * @param {number} maximo - Limite de tentativas da atividade (vem do banco).
 */
async function abrirRelatorioProfessor(secao, atividadeId, maximo) {
    try {
        await carregarScript('turma-favorita.js');
        await carregarScript('turma-horario.js');
        await carregarScript('respostas-atividade-professor.js');
        await montarRelatorioProfessor(secao, atividadeId, maximo);
    } catch (erro) {
        console.warn('Relatório do professor indisponível:', erro.message);
    }
}

/**
 * Inicia a página: identificação no início, folha no fim e alternativas clicáveis.
 */
async function iniciarRespostasAtividade() {
    const secao = document.querySelector('.content-section');
    if (!secao) return;

    await garantirPopup();
    const { provedor, carregado } = await escolherProvedor();
    const estado = {
        provedor,
        itens: listarItens(),
        dados: { nome: carregado.nome || '', respostas: carregado.respostas || {} },
        turma: carregado.turma || '',
        tentativa: carregado.tentativa || 1,
        maximoTentativas: carregado.maximoTentativas || 1,
        gravacoes: [],
        entregue: Boolean(carregado.entregueEm),
    };
    estado.atualizarFolha = () => atualizarFolha(estado);

    secao.insertBefore(provedor.montarIdentificacao(), secao.firstChild);
    secao.appendChild(montarFolha(estado));
    ligarAlternativas(estado);
    if (!estado.entregue) esconderQuestoesHerdadas(estado, carregado.herdadas || []);
    estado.atualizarFolha();
    if (estado.entregue) marcarEntregue(estado, carregado.entregueEm);
    if (estado.entregue) mostrarResultadoNoInicio(estado, carregado.resultado);
    if (carregado.ehProfessor) {
        await abrirRelatorioProfessor(secao, carregado.atividadeId, carregado.maximoTentativas);
    }
}

iniciarRespostasAtividade();

// Voltar/avançar pode restaurar a página do cache do navegador com as marcações antigas:
// recarrega para que as alternativas venham sempre do banco de dados.
window.addEventListener('pageshow', (evento) => {
    if (evento.persisted) window.location.reload();
});
