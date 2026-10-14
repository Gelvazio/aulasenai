// Tela das avaliações discursivas: um campo de texto por tópico, gravação automática no banco,
// progresso e entrega. Ler é livre; escrever exige login de aluno, avaliação liberada, horário
// da turma e tentativa não entregue. Nada fica no navegador (sem localStorage).
// Dados: assets/js/respostas-discursivas-banco.js. Avisos: assets/js/popup.js.
// Vocabulário avaliação/recuperação: assets/js/termos-tentativa.js.
// Plano: docs/avaliacao-pratica-discursiva-itic.md
// Gabarito (padrão de resposta): assets/js/liberacao-respostas-discursiva.js, carregado aqui —
// professor libera por turma (só com todos entregues); aluno vê depois da liberação.
// PDF no padrão SENAI: assets/js/exportar-pdf-discursiva.js (botão "📥 Exportar PDF"), carregado aqui.

const ATRASO_GRAVACAO_MS = 1500;
const SELETOR_CAMPO = '.topico-resposta__campo';
const SELETOR_BLOCO_TOPICO = '.topico-resposta';
const ID_PAINEL = 'painel-discursivo';
const ID_BOTAO_FINALIZAR = 'btnFinalizarDiscursiva';
const ARQUIVO_LIBERACAO_DISCURSIVA = 'liberacao-respostas-discursiva.js';
const ARQUIVO_PDF_DISCURSIVA = 'exportar-pdf-discursiva.js';
const ARQUIVO_RESPOSTAS_ALUNO = 'respostas-aluno-professor.js';
const ARQUIVO_PROGRESSO_TURMA = 'progresso-turma-global.js';
const ARQUIVO_MEU_PROGRESSO_DISCURSIVA = 'progresso-do-aluno.js';
const ARQUIVO_NOTA_IA_RESPOSTAS = 'nota-ia-respostas-discursiva.js';
const ARQUIVO_CONFIRMAR_PROFESSOR = 'confirmar-nota-professor-discursiva.js';
const ARQUIVO_FINALIZAR_PROFESSOR = 'finalizar-atividade-professor.js';
const ARQUIVO_RESULTADO_ALUNO = 'resultado-aluno-discursiva.js';
const ARQUIVO_SUSPEITA_COPIA_DISCURSIVA = 'suspeita-copia-discursiva.js';
const ARQUIVO_MEU_GABARITO_DISCURSIVA = 'minhas-respostas-discursiva.js';
const VALOR_ATIVO_MEU_GABARITO_DISCURSIVA = 'sim';
const BASE_SCRIPTS_DISCURSIVA = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const CLASSE_BLOCO = 'topico-resposta';
const CLASSE_FALTANDO = 'topico-resposta--faltando';
const EVENTO_CAMPOS_PREENCHIDOS = 'discursiva:campos-preenchidos';
const SELETOR_BOTAO_GRAVAR = '.topico-resposta__gravar';
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
    'A prova fica escondida: ela aparece, com as respostas do aluno, quando você escolhe um ' +
    'aluno em "Respostas dos alunos", ou sem respostas no botão "Mostrar questões".';
const CLASSE_RESPOSTAS_OCULTAS_PROFESSOR = 'discursiva--respostas-ocultas';
const ID_BOTAO_QUESTOES_PROFESSOR = 'btnMostrarQuestoesProfessor';
const ROTULO_MOSTRAR_QUESTOES = '👁️ Mostrar questões';
const ROTULO_ESCONDER_QUESTOES = '🙈 Esconder questões';
const MSG_BLOQUEADA_DISCURSIVA = '🔒 Avaliação bloqueada pelo professor. Aguarde a liberação ' +
    'para escrever as respostas.';
const NOTA_MAXIMA_DISCURSIVA = 10;
const MSG_RESPOSTAS_OCULTAS ='🔒 Depois da entrega, as respostas não ficam mais visíveis nesta ' +
    'página. Elas estão gravadas no banco para a correção do professor.';
const MSG_AUTOMATICO ='Cada resposta é gravada sozinha no banco quando você para de digitar.';
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
    document.dispatchEvent(new CustomEvent(EVENTO_CAMPOS_PREENCHIDOS));
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
        if (dados.respostasOcultas) mensagens.push(MSG_RESPOSTAS_OCULTAS);
        return mensagens;
    }
    if (dados.minimoQuestoes) mensagens.push(textoMinimoParaEntregar(dados.minimoQuestoes));
    if (!dados.ativa) mensagens.push(MSG_BLOQUEADA_DISCURSIVA);
    if (dados.avisoHorario) mensagens.push('🕒 ' + dados.avisoHorario);
    if (podeEscrever()) mensagens.push(MSG_AUTOMATICO);
    return mensagens;
}

/**
 * Texto do mínimo de questões para entregar (com quanto vale cada questão; nota máxima 10).
 * @param {number} minimo - Mínimo de questões do aluno.
 * @returns {string} Mensagem do painel.
 */
function textoMinimoParaEntregar(minimo) {
    const total = new Set(obterCamposDiscursivos().map((campo) => campo.dataset.item)).size;
    const efetivo = Math.min(total, minimo);
    const valor = (NOTA_MAXIMA_DISCURSIVA / efetivo).toLocaleString('pt-BR',
        { maximumFractionDigits: 2 });
    return '📌 Para entregar: no mínimo ' + efetivo + ' de ' + total + ' questões completas ' +
        '(todas as alternativas respondidas). Cada questão vale ' + valor + ' ponto(s); a nota ' +
        'máxima é 10.';
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
    const mostraBarraDoAluno = !dados.ehProfessor && !dados.respostasOcultas;
    if (mostraBarraDoAluno) painel.appendChild(montarBarraProgresso());
    painel.appendChild(criarBotaoDiscursivo('btn-export btn-export--secundario', '🚪 Sair',
        fazerLogout));
    atualizarProgresso();
    if (dados.ehProfessor) painel.appendChild(criarBotaoQuestoesProfessor());
    if (dados.ehProfessor) abrirRespostasDoAluno(painel, dados);
    if (dados.ehProfessor) abrirProgressoDaTurma(dados);
    if (!dados.ehProfessor) abrirMeuProgressoDiscursiva(dados);
    if (!dados.ehProfessor) abrirMeuGabaritoDiscursiva(painel, dados);
    abrirLiberacaoRespostas(painel, dados);
}

/**
 * Aluno: botão "Exportar Meu Gabarito" no painel quando a página pede
 * (body data-exportar-meu-gabarito="sim"; assets/js/minhas-respostas-discursiva.js).
 * Uma falha aqui não atrapalha a avaliação.
 * @param {HTMLElement} painel - Painel de identificação.
 * @param {Object} dados - Estado carregado do banco.
 */
async function abrirMeuGabaritoDiscursiva(painel, dados) {
    const estaAtivo = document.body.dataset.exportarMeuGabarito ===
        VALOR_ATIVO_MEU_GABARITO_DISCURSIVA;
    if (!estaAtivo) return;
    try {
        if (typeof window.iniciarMeuGabaritoDiscursiva !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_MEU_GABARITO_DISCURSIVA);
        }
        const { repositorio } = estadoDiscursivo;
        await window.iniciarMeuGabaritoDiscursiva({ dados, destino: painel,
            chaveTopico: (item, topico) => repositorio.chaveTopico(item, topico) });
    } catch (erro) {
        console.warn('Exportar Meu Gabarito:', erro.message);
    }
}

/**
 * Converte linhas {item, topico, texto} do banco no mapa chave do tópico → texto.
 * @param {Object[]} linhas - Linhas de resposta_discursiva.
 * @returns {Object<string, string>} Respostas no formato de preencherCampos.
 */
function converterRespostasDiscursivas(linhas) {
    const respostas = {};
    linhas.forEach((linha) => {
        respostas[estadoDiscursivo.repositorio.chaveTopico(linha.item, linha.topico)] = linha.texto;
    });
    return respostas;
}

/**
 * Professor: carrega (uma vez) o combo "Aluno" que mostra as respostas de cada aluno nos campos.
 * Uma falha aqui não atrapalha a avaliação.
 * @param {HTMLElement} painel - Painel de identificação.
 * @param {Object} dados - Estado carregado do banco.
 */
async function abrirRespostasDoAluno(painel, dados) {
    try {
        if (typeof window.montarRespostasDoAluno !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_RESPOSTAS_ALUNO);
        }
        await window.montarRespostasDoAluno(painel, {
            atividadeId: dados.atividadeId,
            tabela: 'resposta_discursiva',
            colunas: 'item,topico,texto',
            converter: converterRespostasDiscursivas,
            preencher: preencherCampos,
            aoMostrarAluno: (aluno) => Promise.all([
                alternarRespostasDoProfessor(Boolean(aluno)),
                mostrarNotasIaDasRespostas(aluno, dados.atividadeId),
                mostrarConfirmacaoDoProfessor(aluno, dados.atividadeId),
                mostrarFinalizarDoProfessor(aluno, dados.atividadeId),
                mostrarSuspeitasDoAluno(aluno, dados.atividadeId),
            ]),
        });
    } catch (erro) {
        console.warn('Respostas dos alunos:', erro.message);
    }
}

/**
 * Professor: Progresso da turma GLOBAL (assets/js/progresso-turma-global.js, o mesmo das
 * objetivas) no topo de TODA avaliação discursiva, por aluno e por questão, atualizado a cada
 * 5 s. Uma falha aqui não atrapalha a avaliação.
 * @param {Object} dados - Estado carregado do banco.
 */
async function abrirProgressoDaTurma(dados) {
    if (!dados.atividadeId) return;

    try {
        if (typeof window.montarProgressoDaTurma !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_PROGRESSO_TURMA);
        }
        await window.montarProgressoDaTurma(dados.atividadeId, 'discursiva');
    } catch (erro) {
        console.warn('Progresso da turma:', erro.message);
    }
}

/**
 * Aluno: quadro "📊 Meu progresso" (só a linha dele, sem notas; progresso-do-aluno.js). Uma
 * falha aqui não atrapalha a avaliação.
 * @param {Object} dados - Estado carregado do banco.
 */
async function abrirMeuProgressoDiscursiva(dados) {
    if (!dados.atividadeId) return;

    try {
        if (typeof window.montarMeuProgresso !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_MEU_PROGRESSO_DISCURSIVA);
        }
        await window.montarMeuProgresso(dados.atividadeId, 'discursiva');
    } catch (erro) {
        console.warn('Meu progresso:', erro.message);
    }
}

/**
 * Aluno que entregou, com o gabarito liberado para a turma: mostra a prova corrigida (nota,
 * resultado de cada alternativa, observação da IA e padrão de resposta). Falha não quebra a página.
 * @param {Object} dados - Estado carregado do banco.
 */
async function abrirResultadoDoAluno(dados) {
    const podeVerResultado = !dados.ehProfessor && dados.entregueEm && dados.gabaritoLiberado;
    if (!podeVerResultado) return;
    try {
        if (typeof window.mostrarResultadoDoAluno !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_RESULTADO_ALUNO);
        }
        await window.mostrarResultadoDoAluno(dados.atividadeId);
    } catch (erro) {
        console.warn('Resultado do aluno:', erro.message);
    }
}

/**
 * Professor: as respostas (campos de cada alternativa) ficam escondidas por padrão e só aparecem
 * quando um aluno é escolhido em "Respostas dos alunos".
 * @param {boolean} mostrar - true mostra as respostas; false esconde.
 */
function alternarRespostasDoProfessor(mostrar) {
    document.body.classList.toggle(CLASSE_RESPOSTAS_OCULTAS_PROFESSOR, !mostrar);
    const botao = document.getElementById(ID_BOTAO_QUESTOES_PROFESSOR);
    if (botao) botao.textContent = mostrar ? ROTULO_ESCONDER_QUESTOES : ROTULO_MOSTRAR_QUESTOES;
}

/**
 * Professor: botão que mostra ou esconde a prova (instruções e questões) sem escolher aluno.
 * @returns {HTMLButtonElement} Botão "Mostrar questões" / "Esconder questões".
 */
function criarBotaoQuestoesProfessor() {
    const estaoOcultas = () => document.body.classList.contains(CLASSE_RESPOSTAS_OCULTAS_PROFESSOR);
    const rotulo = estaoOcultas() ? ROTULO_MOSTRAR_QUESTOES : ROTULO_ESCONDER_QUESTOES;
    const botao = criarBotaoDiscursivo('btn-export btn-export--secundario', rotulo,
        () => alternarRespostasDoProfessor(estaoOcultas()));
    botao.id = ID_BOTAO_QUESTOES_PROFESSOR;
    return botao;
}

/**
 * Professor: ao carregar as respostas de um aluno, mostra o ícone da nota parcial da IA em cada
 * alternativa (certa, meia certa, errada). Uma falha aqui não atrapalha a avaliação.
 * @param {Object|null} aluno - Aluno mostrado no combo (null ao limpar).
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarNotasIaDasRespostas(aluno, atividadeId) {
    try {
        if (typeof window.mostrarNotasIaDoAluno !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_NOTA_IA_RESPOSTAS);
        }
        await window.mostrarNotasIaDoAluno(aluno, atividadeId);
    } catch (erro) {
        console.warn('Nota da IA nas respostas:', erro.message);
    }
}

/**
 * Professor: alerta vermelho piscando nas questões com suspeita de cópia do aluno escolhido, com
 * "Não é cópia" / "É cópia" (assets/js/suspeita-copia-discursiva.js). Sem aluno, limpa os
 * alertas. Uma falha aqui não atrapalha a avaliação.
 * @param {Object|null} aluno - Aluno escolhido no combo (null = nenhum).
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarSuspeitasDoAluno(aluno, atividadeId) {
    try {
        if (typeof window.mostrarSuspeitasNaProva !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_SUSPEITA_COPIA_DISCURSIVA);
        }
        await window.mostrarSuspeitasNaProva(aluno, atividadeId,
            () => mostrarConfirmacaoDoProfessor(aluno, atividadeId));
    } catch (erro) {
        console.warn('Suspeita de cópia:', erro.message);
    }
}

/**
 * Professor: ao carregar um aluno, mostra embaixo da prova o botão "Finalizar Atividade", que
 * lança a nota com base nas alternativas confirmadas. Uma falha aqui não atrapalha a avaliação.
 * @param {Object|null} aluno - Aluno mostrado no combo (null ao limpar).
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarFinalizarDoProfessor(aluno, atividadeId) {
    try {
        if (typeof window.mostrarFinalizarAtividade !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_FINALIZAR_PROFESSOR);
        }
        window.mostrarFinalizarAtividade(aluno, atividadeId);
    } catch (erro) {
        console.warn('Finalizar Atividade:', erro.message);
    }
}

/**
 * Professor: ao carregar as respostas de um aluno, põe os botões Certa / Meia certa / Errada em
 * cada alternativa (nota do professor, travada depois de confirmada). Uma falha aqui não
 * atrapalha a avaliação.
 * @param {Object|null} aluno - Aluno mostrado no combo (null ao limpar).
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarConfirmacaoDoProfessor(aluno, atividadeId) {
    try {
        if (typeof window.mostrarConfirmacaoProfessor !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_CONFIRMAR_PROFESSOR);
        }
        await window.mostrarConfirmacaoProfessor(aluno, atividadeId);
    } catch (erro) {
        console.warn('Confirmação do professor:', erro.message);
    }
}

/**
 * Carrega um script de assets/js/ (ao lado deste).
 * @param {string} arquivo - Nome do script.
 * @returns {Promise<void>} Resolve quando carregou.
 */
function carregarModuloDiscursiva(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_DISCURSIVA + arquivo;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Coloca o botão "📥 Exportar PDF" (padrão SENAI). Uma falha aqui não atrapalha a avaliação.
 */
async function abrirExportacaoPdfDiscursiva() {
    try {
        if (typeof window.montarBarraPdfDiscursiva !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_PDF_DISCURSIVA);
        }
        window.montarBarraPdfDiscursiva();
    } catch (erro) {
        console.warn('Exportar PDF:', erro.message);
    }
}

/**
 * Carrega (uma vez) o módulo do gabarito da discursiva e monta a parte dele no painel.
 * Uma falha aqui não atrapalha a avaliação.
 * @param {HTMLElement} painel - Painel de identificação.
 * @param {Object} dados - Estado carregado do banco.
 */
async function abrirLiberacaoRespostas(painel, dados) {
    try {
        if (typeof window.montarLiberacaoRespostasDiscursiva !== 'function') {
            await carregarModuloDiscursiva(ARQUIVO_LIBERACAO_DISCURSIVA);
        }
        await window.montarLiberacaoRespostasDiscursiva(painel, dados);
    } catch (erro) {
        console.warn('Gabarito da discursiva:', erro.message);
    }
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
    const { completas, total, minimo } = contarQuestoesParaEntregar(gravadas);
    if (completas >= minimo) return true;

    const lista = destacarFaltantes(faltantes);
    await mostrarPopup('Você completou ' + completas + ' de ' + total + ' questões. Para ' +
        'entregar, o mínimo é ' + minimo + ' questão(ões) completa(s) — todas as alternativas ' +
        'respondidas. Faltam ' + (minimo - completas) + '.\n\nTópicos sem resposta gravada:\n\n' +
        lista + '\n\nResponda e aguarde o ✅ Resposta gravada.',
    { tipo: 'aviso', titulo: 'Avaliação incompleta' });
    return false;
}

/**
 * Conta as questões completas (todos os tópicos gravados com texto) e o mínimo para entregar.
 * @param {Object<string, string>} gravadas - Respostas lidas do banco.
 * @returns {{completas: number, total: number, minimo: number}} Contagem e mínimo do aluno.
 */
function contarQuestoesParaEntregar(gravadas) {
    const questoes = new Map();
    obterCamposDiscursivos().forEach((campo) => {
        const temTexto = Boolean((gravadas[chaveDoCampo(campo)] || '').trim());
        const atual = questoes.get(campo.dataset.item) ?? true;
        questoes.set(campo.dataset.item, atual && temTexto);
    });
    const total = questoes.size;
    const completas = [...questoes.values()].filter(Boolean).length;
    const minimo = Math.min(total, estadoDiscursivo.dados?.minimoQuestoes || total);
    return { completas, total, minimo };
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
        esconderRespostasDepoisDaEntrega();
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
 * Botão "💾 Gravar" do tópico (campo opcional da fonte): grava na hora o campo do mesmo bloco.
 * A gravação automática continua; o botão só dá ao aluno a opção de gravar quando quiser.
 * @param {MouseEvent} evento - Clique na página.
 */
async function gravarPeloBotao(evento) {
    const botao = evento.target.closest(SELETOR_BOTAO_GRAVAR);
    if (!botao) return;
    if (!podeEscrever()) return explicarBloqueio();

    const campo = botao.closest(SELETOR_BLOCO_TOPICO).querySelector(SELETOR_CAMPO);
    botao.disabled = true;
    try {
        await gravarCampo(campo);
        atualizarProgresso();
    } finally {
        botao.disabled = false;
    }
}

/**
 * Depois da entrega, limpa as respostas da tela quando a página pede (campo "Ocultar respostas
 * após entrega" da fonte .md). Nada é apagado do banco.
 */
function esconderRespostasDepoisDaEntrega() {
    if (!ocultaRespostasEntregues()) return;

    estadoDiscursivo.dados.respostasOcultas = true;
    preencherCampos({});
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
    if (estadoDiscursivo.dados.ehProfessor) alternarRespostasDoProfessor(false);
    aplicarPermissaoDeEscrita();
    montarPainel(estadoDiscursivo.dados);
    abrirResultadoDoAluno(estadoDiscursivo.dados);
    ligarEventosDosCampos();
    document.getElementById(ID_BOTAO_FINALIZAR).addEventListener('click', finalizarDiscursiva);
    document.addEventListener('click', gravarPeloBotao);
    window.addEventListener('beforeunload', avisarSaidaComPendencia);
}

document.addEventListener('DOMContentLoaded', iniciarAvaliacaoDiscursiva);
document.addEventListener('DOMContentLoaded', abrirExportacaoPdfDiscursiva);
