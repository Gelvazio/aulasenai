// Faixa "Matérias — <CURSO>": botões SOMENTE ENSALADO e VER TODAS MATÉRIAS ao lado do título,
// e um botão ON/OFF ao lado de cada matéria (só PROFESSOR grava). Lê e grava materia.ensalado.
// Depende de js/supabase.js (sbGet, sbPatch, obterClienteSupabase) e assets/js/popup.js.
// Cada faixa informa o curso do banco em <nav class="faixa-materias" data-curso-id="N">.
// Toda faixa já abre mostrando só as matérias ensaladas (SOMENTE ENSALADO).
// Regra: CLAUDE.md, seção "FAIXA DE MATÉRIAS". Plano: docs/somente-ensalado-materias.md

const SELETOR_FAIXA_MATERIAS = '.faixa-materias';
const SELETOR_CARD_MATERIA = 'a.faixa-materias__card';
const SELETOR_LISTA_MATERIAS = '.faixa-materias__lista';
const SELETOR_CARTOES_GRADE = '.grade > article';
const SELETOR_LINK_CARTAO_GRADE = '.acoes a[href]';
const ATRIBUTO_CURSO_FAIXA = 'cursoId';
const PERFIL_PROFESSOR_ENSALADO = 'PROFESSOR';
const TABELA_MATERIA_ENSALADO = 'materia';
const PREFIXO_EMOJI_CARD = /^📘\s*/;
const TEXTO_SOMENTE_ENSALADO = 'SOMENTE ENSALADO';
const TEXTO_VER_TODAS_MATERIAS = 'VER TODAS MATÉRIAS';
const CLASSE_FILTRO_ATIVO = 'faixa-materias__filtro--ativo';
const MENSAGEM_ERRO_GRAVACAO = 'Não foi possível gravar a matéria. Tente novamente.';

/**
 * Padroniza o nome da matéria para casar o cartão com a linha do banco (sem acento, maiúsculas).
 * @param {string} texto - Nome como aparece no cartão ou no banco.
 * @returns {string} Nome normalizado.
 */
function normalizarNomeMateria(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

/**
 * Lê o perfil do usuário logado (app_metadata, que só a service_role altera).
 * @returns {Promise<string|null>} Perfil ou null sem sessão.
 */
async function buscarPerfilEnsalado() {
  const cliente = obterClienteSupabase();
  if (!cliente) return null;
  const { data } = await cliente.auth.getSession();
  return data?.session?.user?.app_metadata?.perfil ?? null;
}

/**
 * Busca as matérias do curso no banco.
 * @param {string} cursoId - id do curso na tabela curso.
 * @returns {Promise<Object[]>} Matérias com id, descricao e ensalado.
 */
async function buscarMateriasEnsalado(cursoId) {
  return sbGet(TABELA_MATERIA_ENSALADO, `curso_id=eq.${cursoId}&select=id,descricao,ensalado`);
}

/**
 * Cria um botão com texto e classe.
 * @param {string} texto - Texto visível.
 * @param {string} classe - Classe CSS.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoEnsalado(texto, classe) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = classe;
  botao.textContent = texto;
  return botao;
}

/**
 * Agrupa os cartões da grade de baixo (index do curso) pelo link da matéria, para que o
 * filtro de cima também os esconda. Nas páginas de matéria os links não casam e nada muda.
 * @returns {Map<string, HTMLElement[]>} Cartões da grade por href.
 */
function mapearCartoesGrade() {
  const mapa = new Map();
  document.querySelectorAll(SELETOR_CARTOES_GRADE).forEach((cartao) => {
    const link = cartao.querySelector(SELETOR_LINK_CARTAO_GRADE);
    if (!link) return;
    const href = link.getAttribute('href');
    mapa.set(href, [...(mapa.get(href) ?? []), cartao]);
  });
  return mapa;
}

/**
 * Envolve cada cartão em um item próprio, para que o ON/OFF fique ao lado dele.
 * @param {HTMLElement} faixa - Elemento nav.faixa-materias.
 * @returns {{item: HTMLElement, card: HTMLElement, nome: string, cartoesGrade: HTMLElement[]}[]}
 *   Itens da faixa, com os cartões da grade de baixo da mesma matéria.
 */
function envolverCardsEnsalado(faixa) {
  const cartoesPorHref = mapearCartoesGrade();
  return [...faixa.querySelectorAll(SELETOR_CARD_MATERIA)].map((card) => {
    const item = document.createElement('div');
    item.className = 'faixa-materias__item';
    card.before(item);
    item.append(card);
    const nome = normalizarNomeMateria(card.textContent.replace(PREFIXO_EMOJI_CARD, ''));
    const cartoesGrade = cartoesPorHref.get(card.getAttribute('href')) ?? [];
    return { item, card, nome, cartoesGrade };
  });
}

/**
 * Monta a barra com SOMENTE ENSALADO e VER TODAS MATÉRIAS, antes da lista.
 * @param {HTMLElement} faixa - Elemento nav.faixa-materias.
 * @returns {{somente: HTMLButtonElement, todas: HTMLButtonElement}} Botões da barra.
 */
function montarBarraEnsalado(faixa) {
  const barra = document.createElement('div');
  barra.className = 'faixa-materias__barra';
  const somente = criarBotaoEnsalado(TEXTO_SOMENTE_ENSALADO, 'faixa-materias__filtro');
  const todas = criarBotaoEnsalado(TEXTO_VER_TODAS_MATERIAS, 'faixa-materias__filtro');
  barra.append(somente, todas);
  faixa.querySelector(SELETOR_LISTA_MATERIAS).before(barra);
  return { somente, todas };
}

/**
 * Mostra só as matérias ensaladas (ou todas), escondendo as demais na faixa e na grade.
 * @param {Object[]} itens - Itens montados por envolverCardsEnsalado.
 * @param {Map<string, Object>} mapaMaterias - Matérias do banco por nome normalizado.
 * @param {boolean} somenteEnsalado - true para mostrar só as ensaladas.
 */
function aplicarFiltroEnsalado(itens, mapaMaterias, somenteEnsalado) {
  itens.forEach(({ item, nome, cartoesGrade }) => {
    const materia = mapaMaterias.get(nome);
    const ocultar = somenteEnsalado && !materia?.ensalado;
    item.hidden = ocultar;
    cartoesGrade.forEach((cartao) => {
      cartao.hidden = ocultar;
    });
  });
}

/**
 * Destaca (verde, piscando) o botão do filtro em uso e apaga o destaque do outro.
 * @param {{somente: HTMLButtonElement, todas: HTMLButtonElement}} botoes - Botões da barra.
 * @param {boolean} somenteEnsalado - true quando o filtro em uso é SOMENTE ENSALADO.
 */
function marcarFiltroAtivo(botoes, somenteEnsalado) {
  botoes.somente.classList.toggle(CLASSE_FILTRO_ATIVO, somenteEnsalado);
  botoes.todas.classList.toggle(CLASSE_FILTRO_ATIVO, !somenteEnsalado);
  botoes.somente.setAttribute('aria-pressed', String(somenteEnsalado));
  botoes.todas.setAttribute('aria-pressed', String(!somenteEnsalado));
}

/**
 * Aplica o filtro escolhido e destaca o botão correspondente.
 * @param {{itens: Object[], mapaMaterias: Map, botoes: Object}} faixaMontada - Dados da faixa.
 * @param {boolean} somenteEnsalado - true para mostrar só as ensaladas.
 */
function escolherFiltroEnsalado(faixaMontada, somenteEnsalado) {
  aplicarFiltroEnsalado(faixaMontada.itens, faixaMontada.mapaMaterias, somenteEnsalado);
  marcarFiltroAtivo(faixaMontada.botoes, somenteEnsalado);
}

/**
 * Atualiza o visual do botão ON/OFF conforme o valor de ensalado.
 * @param {HTMLButtonElement} botao - Botão ON/OFF.
 * @param {boolean} ligado - Valor atual de ensalado.
 */
function atualizarOnOffEnsalado(botao, ligado) {
  botao.textContent = ligado ? 'ON' : 'OFF';
  botao.setAttribute('aria-pressed', String(ligado));
  botao.classList.toggle('faixa-materias__onoff--ligado', ligado);
}

/**
 * Grava ensalado da matéria no banco e reflete o novo valor no botão.
 * @param {Object} materia - Linha da matéria (id e ensalado).
 * @param {HTMLButtonElement} botao - Botão ON/OFF da matéria.
 */
async function gravarEnsaladoMateria(materia, botao) {
  const novoValor = !materia.ensalado;
  try {
    await sbPatch(TABELA_MATERIA_ENSALADO, 'id', materia.id, { ensalado: novoValor });
    materia.ensalado = novoValor;
    atualizarOnOffEnsalado(botao, novoValor);
  } catch (erro) {
    console.error('Falha ao gravar ensalado:', erro);
    await mostrarPopup(MENSAGEM_ERRO_GRAVACAO);
  }
}

/**
 * Cria o botão ON/OFF de uma matéria (só para professor, e só se a matéria existe no banco).
 * @param {Object} materia - Linha da matéria no banco.
 * @returns {HTMLButtonElement} Botão ON/OFF.
 */
function criarOnOffEnsalado(materia) {
  const botao = criarBotaoEnsalado('', 'faixa-materias__onoff');
  atualizarOnOffEnsalado(botao, materia.ensalado);
  botao.addEventListener('click', () => gravarEnsaladoMateria(materia, botao));
  return botao;
}

/**
 * Liga a faixa de um curso: barra, filtro e ON/OFF (só para professor).
 * @param {HTMLElement} faixa - Elemento nav.faixa-materias com data-curso-id.
 * @param {string} perfil - Perfil do usuário logado (ou null).
 */
async function ligarFaixaEnsalado(faixa, perfil) {
  const cursoId = faixa.dataset[ATRIBUTO_CURSO_FAIXA];
  const itens = envolverCardsEnsalado(faixa);
  const botoes = montarBarraEnsalado(faixa);
  const materias = await buscarMateriasEnsalado(cursoId).catch(() => []);
  const mapaMaterias = new Map(materias.map((m) => [normalizarNomeMateria(m.descricao), m]));
  const ehProfessor = perfil === PERFIL_PROFESSOR_ENSALADO;

  itens.forEach(({ item, nome }) => {
    const materia = mapaMaterias.get(nome);
    if (!materia || !ehProfessor) return;
    item.append(criarOnOffEnsalado(materia));
  });

  const faixaMontada = { itens, mapaMaterias, botoes };
  botoes.somente.addEventListener('click', () => escolherFiltroEnsalado(faixaMontada, true));
  botoes.todas.addEventListener('click', () => escolherFiltroEnsalado(faixaMontada, false));
  aplicarFiltroInicialEnsalado(faixaMontada);
  faixa.hidden = !ehProfessor;
}

/**
 * Abre a faixa já em SOMENTE ENSALADO (padrão de todos os cursos).
 * Sem matéria ensalada (ou sem banco), mantém a lista completa para não esvaziar a faixa.
 * @param {{itens: Object[], mapaMaterias: Map, botoes: Object}} faixaMontada - Dados da faixa.
 */
function aplicarFiltroInicialEnsalado(faixaMontada) {
  const materias = [...faixaMontada.mapaMaterias.values()];
  const temEnsalada = materias.some((materia) => materia.ensalado);
  escolherFiltroEnsalado(faixaMontada, temEnsalada);
}

/**
 * Liga todas as faixas de matérias da página que informam o curso (data-curso-id).
 */
async function iniciarFaixasEnsalado() {
  const faixas = [...document.querySelectorAll(SELETOR_FAIXA_MATERIAS)].filter(
    (faixa) => faixa.dataset[ATRIBUTO_CURSO_FAIXA],
  );
  if (faixas.length === 0) return;

  // Escondida até saber o perfil: só o professor vê a faixa (a grade de baixo vale para todos).
  faixas.forEach((faixa) => { faixa.hidden = true; });
  const perfil = await buscarPerfilEnsalado();
  for (const faixa of faixas) {
    await ligarFaixaEnsalado(faixa, perfil);
  }
}

iniciarFaixasEnsalado();
