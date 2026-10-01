// Tela das avaliações discursivas: um campo de texto por tópico, gravação automática no banco,
// progresso e entrega. Ler é livre; escrever exige login de aluno, avaliação liberada, horário
// da turma e tentativa não entregue. Nada fica no navegador (sem localStorage).
// Dados: assets/js/respostas-discursivas-banco.js. Avisos: assets/js/popup.js.
// Vocabulário avaliação/recuperação: assets/js/termos-tentativa.js.
// Plano: docs/avaliacao-pratica-discursiva-itic.md

const ATRASO_GRAVACAO_MS = 1500;
const SELETOR_CAMPO = '.topico-resposta__campo';
const SELETOR_BLOCO_TOPICO = '.topico-resposta';
const ID_PAINEL = 'painel-discursivo';
const ID_BOTAO_FINALIZAR = 'btnFinalizarDiscursiva';
const CLASSE_BLOCO = 'topico-resposta';
const CLASSE_FALTANDO = 'topico-resposta--faltando';
const SITUACOES_TOPICO = {
    vazio: { classe: 'topico-resposta--vazia', texto: '' },
    pendente: { classe: 'topico-resposta--pendente', texto: '✏️ Alteração ainda não gravada...' },
    gravando: { classe: 'topico-resposta--gravando', texto: '💾 Gravando...' },
    gravada: { classe: 'topico-resposta--gravada', texto: '✅ Resposta gravada' },
    apagada: { classe: 'topico-resposta--vazia', texto: '🗑️ Resposta apagada do banco' },
    erro: { classe: 'topico-resposta--erro', texto: '❌ Resposta NÃO gravada' },
};
const MSG_SEM_CADASTRO = 'Esta avaliação ainda não está cadastrada no banco. Você pode ler as ' +
    'questões; as respostas só poderão ser escritas quando o professor cadastrar a avaliação.';
const MSG_LEITURA_LIVRE_DISCURSIVA = 'Você pode ler a avaliação à vontade. Para escrever as ' +
    'respostas, entre com o seu usuário.';
const MSG_ENTRAR_DISCURSIVA = 'Para responder, entre com o seu usuário e senha.\n\n' +
    'Ir para a página de login agora?';
const MSG_PROFESSOR_DISCURSIVA = 'O professor não responde a avaliação: só os alunos escrevem. ' +
    'Aqui você confere as questões; as respostas dos alunos ficam gravadas no banco.';
const MSG_BLOQUEADA_DISCURSIVA = '🔒 Avaliação bloqueada pelo professor. Aguarde a liberação ' +
    'para escrever as respostas.';
const MSG_AUTOMATICO = 'Cada resposta é gravada sozinha no banco quando você para de digitar.';
const MSG_SAIDA_PENDENTE = 'Há respostas ainda não gravadas.';

const estadoDiscursivo = {
    repositorio: null,
    dados: null,
    gravacoes: new Map(),
    temporizadores: new Map(),
};

/**
 * Cria um elemento com classe e texto opcionais.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS (pode ser vazia).
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoDiscursivo(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
}

/**
 * Cria um botão com rótulo e ação.
 * @param {string} classe - Classe CSS.
 * @param {string} rotulo - Texto do botão.
 * @param {Function} acao - Função chamada no clique.
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotaoDiscursivo(classe, rotulo, acao) {
    const botao = criarElementoDiscursivo('button', classe, rotulo);
    botao.type = 'button';
    botao.addEventListener('click', acao);
    return botao;
}

/**
 * Lista os campos de resposta da página.
 * @returns {HTMLTextAreaElement[]} Campos de texto.
 */
function obterCamposDiscursivos() {
    return Array.from(document.querySelectorAll(SELETOR_CAMPO));
}

/**
 * Lê a chave do tópico de um campo (ex.: "3-2").
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @returns {string} Chave do tópico.
 */
function chaveDoCampo(campo) {
    return estadoDiscursivo.repositorio.chaveTopico(campo.dataset.item, campo.dataset.topico);
}

/**
 * Atualiza o contador "n/máximo" de caracteres do campo.
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 */
function atualizarContador(campo) {
    const contador = campo.closest(SELETOR_BLOCO_TOPICO)
        .querySelector('.topico-resposta__contador');
    contador.textContent = campo.value.length + '/' + campo.maxLength;
}

/**
 * Mostra a situação da gravação do tópico (classe do bloco e texto).
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @param {string} nomeSituacao - Chave de SITUACOES_TOPICO.
 * @param {string} [detalhe] - Texto extra (ex.: motivo do erro).
 */
function definirSituacao(campo, nomeSituacao, detalhe) {
    const situacao = SITUACOES_TOPICO[nomeSituacao];
    const bloco = campo.closest(SELETOR_BLOCO_TOPICO);
    bloco.className = CLASSE_BLOCO + ' ' + situacao.classe;
    const texto = detalhe ? situacao.texto + ': ' + detalhe : situacao.texto;
    bloco.querySelector('.topico-resposta__situacao').textContent = texto;
}

/**
 * Indica se o usuário pode escrever agora (aluno logado, liberada, no horário, não entregue).
 * @returns {boolean} true se os campos aceitam escrita.
 */
function podeEscrever() {
    const dados = estadoDiscursivo.dados;
    const temSessaoDeAluno = dados?.disponivel && dados.logado && !dados.ehProfessor;
    return Boolean(temSessaoDeAluno && dados.ativa && !dados.avisoHorario && !dados.entregueEm);
}

/**
 * Coloca os textos gravados nos campos e marca a situação de cada tópico.
 * @param {Object<string, string>} respostas - Mapa chave do tópico → texto.
 */
function preencherCampos(respostas) {
    obterCamposDiscursivos().forEach((campo) => {
        const texto = respostas[chaveDoCampo(campo)] || '';
        campo.value = texto;
        atualizarContador(campo);
        definirSituacao(campo, texto ? 'gravada' : 'vazio');
    });
}

/**
 * Libera ou trava a escrita em todos os campos e mostra o botão de finalizar.
 */
function aplicarPermissaoDeEscrita() {
    const liberado = podeEscrever();
    obterCamposDiscursivos().forEach((campo) => { campo.readOnly = !liberado; });
    document.getElementById(ID_BOTAO_FINALIZAR).hidden = !liberado;
}

/**
 * Conta os tópicos com resposta gravada no banco (pela situação de cada bloco).
 * @returns {{gravados: number, total: number}} Progresso.
 */
function contarProgresso() {
    const campos = obterCamposDiscursivos();
    const gravados = campos.filter((campo) => campo.closest(SELETOR_BLOCO_TOPICO)
        .classList.contains(SITUACOES_TOPICO.gravada.classe)).length;
    return { gravados, total: campos.length };
}

/**
 * Atualiza a barra de progresso do painel (se existir).
 */
function atualizarProgresso() {
    const barra = document.querySelector('.painel-discursivo__barra-preenchida');
    const texto = document.querySelector('.painel-discursivo__progresso-texto');
    if (!barra || !texto) return;

    const { gravados, total } = contarProgresso();
    barra.style.width = Math.round((gravados / total) * 100) + '%';
    texto.textContent = gravados + ' de ' + total + ' tópicos com resposta gravada';
}

/**
 * Leva ao login, voltando depois para esta página.
 */
async function irParaLoginDiscursiva() {
    const querEntrar = await confirmarPopup(MSG_ENTRAR_DISCURSIVA, {
        titulo: 'Entrar para responder', textoConfirmar: 'Ir para o login',
        textoCancelar: 'Agora não',
    });
    if (!querEntrar) return;
    const retorno = location.pathname + location.search + location.hash;
    location.assign(PAGINA_LOGIN + '?' + PARAMETRO_VOLTAR + '=' + encodeURIComponent(retorno));
}

/**
 * Formata uma data ISO no padrão brasileiro com hora.
 * @param {string} dataIso - Data ISO.
 * @returns {string} Data formatada (ex.: 01/10/2026 10:30).
 */
function formatarDataHora(dataIso) {
    return new Date(dataIso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

/**
 * Monta as linhas de situação do aluno (etapa, bloqueio, horário, entrega).
 * @param {Object} dados - Dados carregados do banco.
 * @returns {string[]} Mensagens a exibir.
 */
function montarMensagensAluno(dados) {
    const termos = window.TERMOS_TENTATIVA;
    const etapa = maiusculaInicial(termos.rotulo(dados.tentativa, dados.maximoTentativas));
    const mensagens = [etapa + '. ' + termos.regra];
    if (dados.entregueEm) {
        mensagens.push('✅ Entregue em ' + formatarDataHora(dados.entregueEm) +
            '. As respostas não podem mais ser alteradas; a correção será feita pelo professor.');
        return mensagens;
    }
    if (!dados.ativa) mensagens.push(MSG_BLOQUEADA_DISCURSIVA);
    if (dados.avisoHorario) mensagens.push('🕒 ' + dados.avisoHorario);
    if (podeEscrever()) mensagens.push(MSG_AUTOMATICO);
    return mensagens;
}

/**
 * Monta a barra de progresso dos tópicos gravados.
 * @returns {HTMLElement} Bloco da barra.
 */
function montarBarraProgresso() {
    const bloco = criarElementoDiscursivo('div', 'painel-discursivo__progresso');
    const barra = criarElementoDiscursivo('div', 'painel-discursivo__barra');
    barra.appendChild(criarElementoDiscursivo('div', 'painel-discursivo__barra-preenchida'));
    bloco.appendChild(barra);
    bloco.appendChild(criarElementoDiscursivo('p', 'painel-discursivo__progresso-texto'));
    return bloco;
}

/**
 * Monta o conteúdo do painel para quem não está logado ou sem cadastro no banco.
 * @param {HTMLElement} painel - Painel de identificação.
 * @param {Object} dados - Dados carregados.
 */
function montarPainelVisitante(painel, dados) {
    if (!dados.disponivel) {
        painel.appendChild(criarElementoDiscursivo('p', 'painel-discursivo__texto',
            MSG_SEM_CADASTRO));
        return;
    }
    painel.appendChild(criarElementoDiscursivo('h2', 'aula-title', 'Leitura livre'));
    painel.appendChild(criarElementoDiscursivo('p', 'painel-discursivo__texto',
        MSG_LEITURA_LIVRE_DISCURSIVA));
    painel.appendChild(criarBotaoDiscursivo('btn-export', '🔑 Entrar para responder',
        irParaLoginDiscursiva));
}

/**
 * Monta o painel de identificação, situação e progresso.
 * @param {Object} dados - Dados carregados do banco.
 */
function montarPainel(dados) {
    const painel = document.getElementById(ID_PAINEL);
    painel.replaceChildren(criarElementoDiscursivo('span', 'aula-badge', 'IDENTIFICAÇÃO'));
    if (!dados.disponivel || !dados.logado) {
        montarPainelVisitante(painel, dados);
        return;
    }
    const complemento = dados.turma ? ' — Turma ' + dados.turma : '';
    painel.appendChild(criarElementoDiscursivo('h2', 'aula-title',
        'Conectado como ' + dados.nome + complemento));
    const mensagens = dados.ehProfessor ? [MSG_PROFESSOR_DISCURSIVA] : montarMensagensAluno(dados);
    mensagens.forEach((mensagem) => {
        painel.appendChild(criarElementoDiscursivo('p', 'painel-discursivo__texto', mensagem));
    });
    if (!dados.ehProfessor) painel.appendChild(montarBarraProgresso());
    painel.appendChild(criarBotaoDiscursivo('btn-export btn-export--secundario', '🚪 Sair',
        fazerLogout));
    atualizarProgresso();
}

/**
 * Explica por que o campo não aceita escrita (chamado ao tentar escrever sem permissão).
 */
async function explicarBloqueio() {
    const dados = estadoDiscursivo.dados;
    if (!dados?.disponivel) return mostrarPopup(MSG_SEM_CADASTRO, { tipo: 'info' });
    if (!dados.logado) return irParaLoginDiscursiva();
    if (dados.ehProfessor) return mostrarPopup(MSG_PROFESSOR_DISCURSIVA, { tipo: 'aviso' });
    if (dados.entregueEm) {
        return mostrarPopup('Esta etapa já foi entregue. ' + window.TERMOS_TENTATIVA.pedirNova,
            { tipo: 'info' });
    }
    if (!dados.ativa) return mostrarPopup(MSG_BLOQUEADA_DISCURSIVA, { tipo: 'aviso' });
    return mostrarPopup(dados.avisoHorario, { tipo: 'aviso', titulo: 'Fora do horário' });
}

/**
 * Grava o texto atual do campo no banco e mostra o resultado.
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @returns {Promise<boolean>} true se gravou.
 */
async function gravarCampo(campo) {
    const chave = chaveDoCampo(campo);
    clearTimeout(estadoDiscursivo.temporizadores.get(chave));
    estadoDiscursivo.temporizadores.delete(chave);
    const texto = campo.value;
    definirSituacao(campo, 'gravando');
    const gravacao = estadoDiscursivo.repositorio.gravarTopico({
        item: Number(campo.dataset.item), topico: Number(campo.dataset.topico), texto,
    });
    estadoDiscursivo.gravacoes.set(chave, gravacao);
    try {
        await gravacao;
        const mudouDepois = campo.value !== texto;
        if (mudouDepois) return agendarGravacao(campo);
        definirSituacao(campo, texto.trim() ? 'gravada' : 'apagada');
        return true;
    } catch (erro) {
        definirSituacao(campo, 'erro', erro.message);
        return false;
    } finally {
        if (estadoDiscursivo.gravacoes.get(chave) === gravacao) {
            estadoDiscursivo.gravacoes.delete(chave);
        }
        atualizarProgresso();
    }
}

/**
 * Agenda a gravação do campo para quando o aluno parar de digitar.
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @returns {boolean} false (a gravação ainda vai acontecer).
 */
function agendarGravacao(campo) {
    const chave = chaveDoCampo(campo);
    clearTimeout(estadoDiscursivo.temporizadores.get(chave));
    definirSituacao(campo, 'pendente');
    estadoDiscursivo.temporizadores.set(chave,
        setTimeout(() => gravarCampo(campo), ATRASO_GRAVACAO_MS));
    atualizarProgresso();
    return false;
}

/**
 * Grava já os campos com digitação pendente e espera todas as gravações em andamento.
 */
async function aguardarGravacoes() {
    const pendentes = obterCamposDiscursivos()
        .filter((campo) => estadoDiscursivo.temporizadores.has(chaveDoCampo(campo)));
    await Promise.all(pendentes.map((campo) => gravarCampo(campo)));
    await Promise.allSettled(Array.from(estadoDiscursivo.gravacoes.values()));
}

/**
 * Compara a tela com o banco e devolve os campos sem resposta gravada.
 * @param {Object<string, string>} gravadas - Respostas lidas do banco.
 * @returns {HTMLTextAreaElement[]} Campos faltando.
 */
function listarFaltantes(gravadas) {
    return obterCamposDiscursivos()
        .filter((campo) => !(gravadas[chaveDoCampo(campo)] || '').trim());
}

/**
 * Destaca os tópicos faltando e monta a lista "ITEM NN a)" para o aviso.
 * @param {HTMLTextAreaElement[]} faltantes - Campos sem resposta gravada.
 * @returns {string} Lista de tópicos faltando.
 */
function destacarFaltantes(faltantes) {
    obterCamposDiscursivos().forEach((campo) => {
        campo.closest(SELETOR_BLOCO_TOPICO).classList.toggle(CLASSE_FALTANDO,
            faltantes.includes(campo));
    });
    faltantes[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return faltantes.map((campo) => {
        const letra = campo.closest(SELETOR_BLOCO_TOPICO)
            .querySelector('.topico-resposta__letra').textContent;
        return 'ITEM ' + String(campo.dataset.item).padStart(2, '0') + ' ' + letra;
    }).join(', ');
}

/**
 * Confere no banco se tudo está gravado; avisa e destaca o que falta.
 * @returns {Promise<boolean>} true se todos os tópicos estão gravados.
 */
async function conferirTudoGravado() {
    await aguardarGravacoes();
    const gravadas = await estadoDiscursivo.repositorio.lerGravadas();
    preencherSituacaoPeloBanco(gravadas);
    const faltantes = listarFaltantes(gravadas);
    if (!faltantes.length) return true;

    const lista = destacarFaltantes(faltantes);
    await mostrarPopup('Ainda faltam ' + faltantes.length + ' tópico(s) sem resposta gravada ' +
        'no banco:\n\n' + lista + '\n\nResponda e aguarde o ✅ Resposta gravada.',
    { tipo: 'aviso', titulo: 'Avaliação incompleta' });
    return false;
}

/**
 * Atualiza a situação de cada campo conforme o que está de fato gravado no banco.
 * @param {Object<string, string>} gravadas - Respostas lidas do banco.
 */
function preencherSituacaoPeloBanco(gravadas) {
    obterCamposDiscursivos().forEach((campo) => {
        const noBanco = gravadas[chaveDoCampo(campo)] || '';
        if (noBanco && noBanco === campo.value) definirSituacao(campo, 'gravada');
        if (!noBanco && campo.value.trim()) definirSituacao(campo, 'erro', 'não está no banco');
    });
    atualizarProgresso();
}

/**
 * Fluxo do botão Finalizar: confere o banco, pede confirmação e registra a entrega.
 */
async function finalizarDiscursiva() {
    const botao = document.getElementById(ID_BOTAO_FINALIZAR);
    botao.disabled = true;
    try {
        if (!(await conferirTudoGravado())) return;
        const confirmou = await confirmarPopup('Entregar a ' + window.TERMOS_TENTATIVA.simples(
            estadoDiscursivo.dados.tentativa) + '? Depois da entrega as respostas não podem ' +
            'mais ser alteradas.', { titulo: 'Finalizar', textoConfirmar: 'Entregar' });
        if (!confirmou) return;

        estadoDiscursivo.dados.entregueEm = await estadoDiscursivo.repositorio.entregar();
        aplicarPermissaoDeEscrita();
        montarPainel(estadoDiscursivo.dados);
        await mostrarPopup('Avaliação entregue! As suas respostas estão gravadas e serão ' +
            'corrigidas pelo professor.', { tipo: 'sucesso', titulo: 'Entregue' });
    } catch (erro) {
        await mostrarPopup(erro.message, { tipo: 'erro', titulo: 'Entrega não registrada' });
    } finally {
        botao.disabled = false;
    }
}

/**
 * Liga os eventos dos campos (digitação, saída do campo e tentativa de escrita bloqueada).
 */
function ligarEventosDosCampos() {
    obterCamposDiscursivos().forEach((campo) => {
        campo.addEventListener('focus', () => {
            if (podeEscrever()) return;
            campo.blur();
            explicarBloqueio();
        });
        campo.addEventListener('input', () => {
            atualizarContador(campo);
            campo.closest(SELETOR_BLOCO_TOPICO).classList.remove(CLASSE_FALTANDO);
            agendarGravacao(campo);
        });
        campo.addEventListener('blur', () => {
            if (estadoDiscursivo.temporizadores.has(chaveDoCampo(campo))) gravarCampo(campo);
        });
    });
}

/**
 * Avisa ao fechar a página se ainda houver resposta sem gravar.
 * @param {BeforeUnloadEvent} evento - Evento de saída.
 */
function avisarSaidaComPendencia(evento) {
    const temPendencia = estadoDiscursivo.temporizadores.size > 0 ||
        estadoDiscursivo.gravacoes.size > 0;
    if (!temPendencia) return;
    evento.preventDefault();
    evento.returnValue = MSG_SAIDA_PENDENTE;
}

/**
 * Inicializa a página: carrega o banco, preenche os campos e liga os eventos.
 */
async function iniciarAvaliacaoDiscursiva() {
    estadoDiscursivo.repositorio = window.criarRepositorioDiscursivo();
    try {
        estadoDiscursivo.dados = await estadoDiscursivo.repositorio.carregar();
    } catch (erro) {
        console.warn('Banco indisponível:', erro.message);
        estadoDiscursivo.dados = { disponivel: false };
    }
    preencherCampos(estadoDiscursivo.dados.respostas || {});
    aplicarPermissaoDeEscrita();
    montarPainel(estadoDiscursivo.dados);
    ligarEventosDosCampos();
    document.getElementById(ID_BOTAO_FINALIZAR).addEventListener('click', finalizarDiscursiva);
    window.addEventListener('beforeunload', avisarSaidaComPendencia);
}

document.addEventListener('DOMContentLoaded', iniciarAvaliacaoDiscursiva);
