// Botão "📥 Banco Moodle (AVA SENAI)" na barra de exportação das atividades objetivas.
// Só o PROFESSOR logado vê o botão. Ao clicar: lê as questões da própria página, lê o gabarito
// no banco (tabela gabarito, RLS só do professor), confere e baixa o Moodle XML da atividade,
// montado por banco-moodle-xml.js no mesmo formato do gerador local assets/gerador-banco-ava/.
// Nada é gravado no banco nem no navegador; o gabarito nunca fica na página.
// Carregado por assets/js/atividade.js. Depende de js/supabase.js (obterClienteSupabase, sbGet),
// assets/js/respostas-atividade-banco.js (buscarAtividadeDaPagina) e assets/js/popup.js.
// Funções e constantes globais com sufixo Moodle/_MOODLE (scripts clássicos dividem o escopo).
// Plano: docs/botao-exportar-banco-moodle-atividade.md

const ORIGEM_SCRIPT_MOODLE = document.currentScript?.src || '';
const ARQUIVO_MONTADOR_MOODLE = 'banco-moodle-xml.js';
const ID_BOTAO_MOODLE = 'btnExportarBancoMoodle';
const TEXTO_BOTAO_MOODLE = '📥 Banco Moodle (AVA SENAI)';
const TEXTO_BOTAO_GERANDO_MOODLE = '⏳ Gerando banco…';
const DICA_BOTAO_MOODLE = 'Só o professor: baixa as questões desta atividade, com o ' +
    'gabarito lido do banco, em Moodle XML para importar no AVA SENAI';
const PERFIL_PROFESSOR_MOODLE = 'PROFESSOR';
const SELETOR_BARRA_MOODLE = '.export-bar';
const SELETOR_QUESTOES_MOODLE = '.aula-card.questao';
const SELETOR_ALTERNATIVAS_MOODLE = '.alternativas li';
const ROTULO_CAIXA_CAPACIDADE_MOODLE = 'CAPACIDADE';
const ROTULO_CAIXA_CONTEXTO_MOODLE = 'CONTEXTO';
const ROTULO_CAIXA_COMANDO_MOODLE = 'COMANDO';
const PADRAO_CODIGO_CAPACIDADE_MOODLE = /^([A-Z]+\d+)\s+—/;
const SEPARADOR_TITULO_MOODLE = ' — ';
const PASTA_ATIVIDADES_MOODLE = 'ATIVIDADES';
const PADRAO_EXTENSAO_PAGINA_MOODLE = /\.html?$/i;
const EXTENSAO_XML_MOODLE = '.xml';
const NOME_ARQUIVO_PADRAO_MOODLE = 'banco-moodle.xml';
const TIPO_ARQUIVO_MOODLE = 'application/xml;charset=utf-8';
const ATRASO_LIBERAR_ARQUIVO_MS_MOODLE = 1000;
const TENTATIVAS_CLIENTE_MOODLE = 20;
const INTERVALO_CLIENTE_MS_MOODLE = 250;
const TITULO_SUCESSO_MOODLE = 'Banco Moodle gerado';
const MSG_ERRO_MOODLE = 'Não foi possível gerar o banco Moodle: ';
const MSG_SO_PROFESSOR_MOODLE = 'somente o professor logado pode exportar o banco de questões.';
const MSG_SEM_BANCO_MOODLE = 'esta página não está ligada ao banco de dados.';
const MSG_NAO_CADASTRADA_MOODLE = 'a atividade desta página não está cadastrada no banco.';
const MSG_GABARITO_VAZIO_MOODLE = 'o gabarito veio vazio (confira o login de professor).';
const MSG_SEM_QUESTOES_MOODLE = 'não há questões de múltipla escolha nesta página.';
const MSG_MONTADOR_MOODLE = 'o montador do XML (banco-moodle-xml.js) não carregou.';

/**
 * Espera um intervalo sem bloquear a página.
 * @param {number} milissegundos - Tempo de espera.
 * @returns {Promise<void>} Resolve depois do intervalo.
 */
function esperarMoodle(milissegundos) {
    return new Promise((resolver) => setTimeout(resolver, milissegundos));
}

/**
 * Obtém o cliente do Supabase, esperando o js/supabase.js ficar pronto.
 * @returns {Promise<Object|null>} Cliente ou null se não ficou disponível.
 */
async function esperarClienteSupabaseMoodle() {
    for (let i = 0; i < TENTATIVAS_CLIENTE_MOODLE; i++) {
        const cliente = typeof obterClienteSupabase === 'function' ? obterClienteSupabase() : null;
        if (cliente) return cliente;
        await esperarMoodle(INTERVALO_CLIENTE_MS_MOODLE);
    }
    return null;
}

/**
 * Confere se o usuário logado é professor (perfil do app_metadata do Supabase Auth).
 * @returns {Promise<boolean>} true se for professor.
 */
async function usuarioEhProfessorMoodle() {
    const cliente = await esperarClienteSupabaseMoodle();
    if (!cliente) return false;

    const { data } = await cliente.auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_MOODLE;
}

/**
 * Carrega o banco-moodle-xml.js (ao lado deste script), se ainda não estiver na página.
 * @returns {Promise<void>} Resolve quando o montador estiver disponível.
 */
function carregarMontadorMoodle() {
    if (typeof montarBancoDaAtividadeMoodle === 'function') return Promise.resolve();

    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = ORIGEM_SCRIPT_MOODLE.replace(/[^/]*$/, ARQUIVO_MONTADOR_MOODLE);
        script.addEventListener('load', () => resolver());
        script.addEventListener('error', () => rejeitar(new Error(MSG_MONTADOR_MOODLE)));
        document.head.append(script);
    });
}

/**
 * Texto de um elemento, sem espaços nas pontas.
 * @param {Element|null|undefined} elemento - Elemento.
 * @returns {string} Texto ('' se não houver elemento).
 */
function textoDeMoodle(elemento) {
    return (elemento?.textContent || '').trim();
}

/**
 * Caixa (.content-box) do card cujo rótulo contém o texto informado.
 * @param {Element} card - Card da questão.
 * @param {string} rotulo - Parte do rótulo (ex.: "CONTEXTO").
 * @returns {Element|null} Caixa encontrada.
 */
function caixaDoCardMoodle(card, rotulo) {
    const caixas = [...card.querySelectorAll('.content-box')];
    return caixas.find((caixa) => textoDeMoodle(caixa.querySelector('.content-label'))
        .includes(rotulo)) || null;
}

/**
 * Texto da caixa do card com o rótulo informado.
 * @param {Element} card - Card da questão.
 * @param {string} rotulo - Parte do rótulo.
 * @returns {string} Texto da caixa ('' se a questão não tiver a caixa).
 */
function textoDaCaixaMoodle(card, rotulo) {
    return textoDeMoodle(caixaDoCardMoodle(card, rotulo)?.querySelector('.content-text'));
}

/**
 * Códigos de capacidade da caixa "🎯 CAPACIDADE" (linhas "C1 — texto" separadas por <br>).
 * @param {Element} card - Card da questão.
 * @returns {string[]} Códigos (ex.: ["C1", "S2"]).
 */
function lerCapacidadesMoodle(card) {
    const caixa = caixaDoCardMoodle(card, ROTULO_CAIXA_CAPACIDADE_MOODLE);
    const texto = caixa?.querySelector('.content-text');
    if (!texto) return [];

    return [...texto.childNodes]
        .filter((no) => no.nodeType === Node.TEXT_NODE)
        .map((no) => no.textContent.trim().match(PADRAO_CODIGO_CAPACIDADE_MOODLE)?.[1])
        .filter(Boolean);
}

/**
 * Letra e texto de uma alternativa (<li><span class="letra">A)</span>texto</li>).
 * @param {Element} item - Elemento <li> da alternativa.
 * @returns {string[]} [letra, texto].
 */
function lerAlternativaMoodle(item) {
    const marcaLetra = item.querySelector('.letra');
    const letra = textoDeMoodle(marcaLetra).replace(/[^A-Za-z]/g, '').toUpperCase();
    const texto = [...item.childNodes].filter((no) => no !== marcaLetra)
        .map((no) => no.textContent).join('').trim();
    return [letra, texto];
}

/**
 * Lê uma questão do card da página (o gabarito é preenchido depois, a partir do banco).
 * @param {Element} card - Card .aula-card.questao.
 * @returns {Object} Questão no formato do banco-moodle-xml.js.
 */
function lerQuestaoDoCardMoodle(card) {
    const numero = (textoDeMoodle(card.querySelector('.aula-badge')).match(/\d+/) || [''])[0];
    return {
        numero,
        titulo: textoDeMoodle(card.querySelector('.aula-title')),
        contexto: textoDaCaixaMoodle(card, ROTULO_CAIXA_CONTEXTO_MOODLE),
        comando: textoDaCaixaMoodle(card, ROTULO_CAIXA_COMANDO_MOODLE),
        alternativas: [...card.querySelectorAll(SELETOR_ALTERNATIVAS_MOODLE)]
            .map(lerAlternativaMoodle),
        capacidades: lerCapacidadesMoodle(card),
        gabarito: '',
    };
}

/**
 * Questões de múltipla escolha da página, na ordem em que aparecem.
 * @returns {Object[]} Questões.
 */
function lerQuestoesDaPaginaMoodle() {
    return [...document.querySelectorAll(SELETOR_QUESTOES_MOODLE)]
        .filter((card) => card.querySelector(SELETOR_ALTERNATIVAS_MOODLE))
        .map(lerQuestaoDoCardMoodle);
}

/**
 * Lê o gabarito real da atividade desta página (só o professor tem leitura pelo RLS).
 * @returns {Promise<Map<number, string>>} Número do item → letra certa.
 * @throws {Error} Se a página não usa o banco, não está cadastrada ou o gabarito vier vazio.
 */
async function lerGabaritoDoBancoMoodle() {
    if (typeof buscarAtividadeDaPagina !== 'function') throw new Error(MSG_SEM_BANCO_MOODLE);

    const atividade = await buscarAtividadeDaPagina();
    if (!atividade) throw new Error(MSG_NAO_CADASTRADA_MOODLE);

    const linhas = await sbGet('gabarito',
        'select=item,letra&atividade_id=eq.' + atividade.id + '&order=item');
    if (!linhas.length) throw new Error(MSG_GABARITO_VAZIO_MOODLE);

    return new Map(linhas.map((linha) =>
        [Number(linha.item), String(linha.letra || '').trim().toUpperCase()]));
}

/**
 * Junta o gabarito às questões, conferindo quantidade e letra válida em cada item.
 * @param {Object[]} questoes - Questões lidas da página.
 * @param {Map<number, string>} gabarito - Gabarito do banco.
 * @returns {Object[]} Questões com o gabarito preenchido.
 * @throws {Error} Se a página e o gabarito não baterem.
 */
function aplicarGabaritoMoodle(questoes, gabarito) {
    if (!questoes.length) throw new Error(MSG_SEM_QUESTOES_MOODLE);
    if (questoes.length !== gabarito.size) {
        throw new Error('a página tem ' + questoes.length + ' questões e o gabarito do banco tem ' +
            gabarito.size + '.');
    }

    const itensInvalidos = [];
    const completas = questoes.map((questao) => {
        const letra = gabarito.get(Number(questao.numero)) || '';
        const letraExiste = questao.alternativas.some(([alternativa]) => alternativa === letra);
        if (!letraExiste) itensInvalidos.push(questao.numero);
        return { ...questao, gabarito: letra };
    });
    if (itensInvalidos.length) {
        throw new Error('gabarito sem alternativa válida nos itens ' +
            itensInvalidos.join(', ') + '.');
    }
    return completas;
}

/**
 * Partes do endereço da página, já decodificadas.
 * @returns {string[]} Segmentos (pastas e arquivo).
 */
function segmentosDoEnderecoMoodle() {
    return location.pathname.split('/').filter(Boolean).map((parte) => decodeURIComponent(parte));
}

/**
 * Pasta da matéria (antes de /ATIVIDADES/), usada no prefixo dos IDs, igual ao gerador local.
 * @param {string[]} segmentos - Segmentos do endereço.
 * @returns {string} Nome da pasta ou, sem ela, a UC curta da página.
 */
function lerPastaDaMateriaMoodle(segmentos) {
    const posicao = segmentos.lastIndexOf(PASTA_ATIVIDADES_MOODLE, segmentos.length - 2);
    if (posicao > 0) return segmentos[posicao - 1];
    return document.body.dataset.ucCurta || '';
}

/**
 * Rótulo da atividade ("Aula 01", "Avaliação Objetiva 01"): parte do <title> antes de " — ".
 * @returns {string} Rótulo.
 */
function lerRotuloDaPaginaMoodle() {
    const rotulo = document.title.split(SEPARADOR_TITULO_MOODLE)[0].trim();
    if (rotulo) return rotulo;
    return 'Aula ' + (document.body.dataset.aula || '');
}

/**
 * Nome do arquivo baixado: o nome da página com .xml (ex.: ATIVIDADES-AULA-01-50-QUESTOES.xml).
 * @param {string[]} segmentos - Segmentos do endereço.
 * @returns {string} Nome do arquivo.
 */
function nomeDoArquivoXmlMoodle(segmentos) {
    const pagina = segmentos[segmentos.length - 1] || '';
    if (!PADRAO_EXTENSAO_PAGINA_MOODLE.test(pagina)) return NOME_ARQUIVO_PADRAO_MOODLE;
    return pagina.replace(PADRAO_EXTENSAO_PAGINA_MOODLE, EXTENSAO_XML_MOODLE);
}

/**
 * Dados da atividade para o montador do XML.
 * @param {Object[]} questoes - Questões com gabarito.
 * @param {string[]} segmentos - Segmentos do endereço.
 * @returns {Object} Atividade no formato do banco-moodle-xml.js.
 */
function montarDadosDaAtividadeMoodle(questoes, segmentos) {
    const dados = document.body.dataset;
    return {
        ucCurta: dados.ucCurta || dados.uc || '',
        rotulo: lerRotuloDaPaginaMoodle(),
        tema: dados.tema || '',
        pastaMateria: lerPastaDaMateriaMoodle(segmentos),
        questoes,
    };
}

/**
 * Baixa um texto como arquivo XML (sem guardar nada no navegador).
 * @param {string} nome - Nome do arquivo.
 * @param {string} texto - Conteúdo XML.
 */
function baixarArquivoXmlMoodle(nome, texto) {
    const endereco = URL.createObjectURL(new Blob([texto], { type: TIPO_ARQUIVO_MOODLE }));
    const link = document.createElement('a');
    link.href = endereco;
    link.download = nome;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(endereco), ATRASO_LIBERAR_ARQUIVO_MS_MOODLE);
}

/**
 * Mostra um aviso em popup (popup.js); sem ele, registra no console.
 * @param {string} texto - Mensagem.
 * @param {{tipo: string, titulo?: string}} opcoes - Aparência do popup.
 */
async function avisarMoodle(texto, opcoes) {
    if (typeof window.mostrarPopup === 'function') {
        await window.mostrarPopup(texto, opcoes);
        return;
    }
    console.warn(texto);
}

/**
 * Mensagem de sucesso com o passo a passo de importação no AVA.
 * @param {string} nomeArquivo - Arquivo baixado.
 * @param {number} total - Quantidade de questões.
 * @returns {string} Mensagem.
 */
function mensagemDeSucessoMoodle(nomeArquivo, total) {
    return 'Arquivo "' + nomeArquivo + '" baixado com ' + total + ' questões.\n\n' +
        'Para importar no AVA SENAI:\n' +
        '1. Banco de questões → Importar.\n' +
        '2. Formato: Moodle XML.\n' +
        '3. Marque "Obter categoria do arquivo".\n' +
        '4. Envie o arquivo e confira a prévia.\n\n' +
        'Importe cada atividade uma vez só, para não duplicar as questões.';
}

/**
 * Gera e baixa o banco Moodle desta atividade.
 * @returns {Promise<{nomeArquivo: string, total: number}>} Arquivo baixado.
 * @throws {Error} Se o usuário não for professor ou a página e o gabarito não baterem.
 */
async function gerarBancoDaPaginaMoodle() {
    if (!(await usuarioEhProfessorMoodle())) throw new Error(MSG_SO_PROFESSOR_MOODLE);
    await carregarMontadorMoodle();

    const gabarito = await lerGabaritoDoBancoMoodle();
    const questoes = aplicarGabaritoMoodle(lerQuestoesDaPaginaMoodle(), gabarito);
    const segmentos = segmentosDoEnderecoMoodle();
    const atividade = montarDadosDaAtividadeMoodle(questoes, segmentos);
    const nomeArquivo = nomeDoArquivoXmlMoodle(segmentos);
    baixarArquivoXmlMoodle(nomeArquivo, montarBancoDaAtividadeMoodle(atividade));
    return { nomeArquivo, total: questoes.length };
}

/**
 * Clique no botão: gera o arquivo e avisa o resultado em popup.
 * @param {HTMLButtonElement} botao - Botão clicado.
 */
async function exportarBancoMoodle(botao) {
    botao.disabled = true;
    botao.textContent = TEXTO_BOTAO_GERANDO_MOODLE;
    try {
        const { nomeArquivo, total } = await gerarBancoDaPaginaMoodle();
        await avisarMoodle(mensagemDeSucessoMoodle(nomeArquivo, total),
            { tipo: 'sucesso', titulo: TITULO_SUCESSO_MOODLE });
    } catch (erro) {
        await avisarMoodle(MSG_ERRO_MOODLE + erro.message, { tipo: 'erro' });
    } finally {
        botao.disabled = false;
        botao.textContent = TEXTO_BOTAO_MOODLE;
    }
}

/**
 * Cria o botão no mesmo estilo dos botões de exportar (.btn-export).
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoMoodle() {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.id = ID_BOTAO_MOODLE;
    botao.className = 'btn-export';
    botao.title = DICA_BOTAO_MOODLE;
    botao.textContent = TEXTO_BOTAO_MOODLE;
    botao.addEventListener('click', () => exportarBancoMoodle(botao));
    return botao;
}

/**
 * Coloca o botão depois dos botões de exportar (antes do texto de ajuda, se houver).
 * @param {Element} barra - Barra .export-bar.
 * @param {HTMLButtonElement} botao - Botão.
 */
function colocarNaBarraMoodle(barra, botao) {
    const ajuda = barra.querySelector('small');
    if (ajuda) {
        barra.insertBefore(botao, ajuda);
        return;
    }
    barra.append(botao);
}

/**
 * Mostra o botão só para o professor logado, em página com questões de múltipla escolha.
 */
async function iniciarBotaoMoodle() {
    const barra = document.querySelector(SELETOR_BARRA_MOODLE);
    const temQuestoesObjetivas = Boolean(
        document.querySelector(SELETOR_QUESTOES_MOODLE + ' ' + SELETOR_ALTERNATIVAS_MOODLE));
    const botaoJaExiste = Boolean(document.getElementById(ID_BOTAO_MOODLE));
    const podeTerBotao = barra && temQuestoesObjetivas && !botaoJaExiste;
    if (!podeTerBotao) return;

    try {
        if (!(await usuarioEhProfessorMoodle())) return;
        await carregarMontadorMoodle();
        colocarNaBarraMoodle(barra, criarBotaoMoodle());
    } catch (erro) {
        console.warn('Não foi possível preparar o botão do banco Moodle:', erro);
    }
}

// Carregado dinamicamente pelo atividade.js: se o "load" já passou, inicia na hora.
if (document.readyState === 'complete') {
    iniciarBotaoMoodle();
} else {
    window.addEventListener('load', iniciarBotaoMoodle);
}
