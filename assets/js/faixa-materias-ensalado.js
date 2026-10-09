// Faixa "Matérias — <CURSO>": botões SOMENTE ENSALADO e VER TODAS MATÉRIAS ao lado do título,
// e um botão ON/OFF ao lado de cada matéria (só PROFESSOR grava). Lê e grava materia.ensalado.
// Depende de js/supabase.js (sbGet, sbPatch, obterClienteSupabase) e assets/js/popup.js.
// Cada faixa informa o curso do banco em <nav class="faixa-materias" data-curso-id="N">.
// Toda faixa já abre mostrando só as matérias ensaladas (SOMENTE ENSALADO).
// Regra: CLAUDE.md, seção "FAIXA DE MATÉRIAS". Plano: docs/somente-ensalado-materias.md

const SELETOR_FAIXA_MATERIAS = '.faixa-materias';
const SELETOR_CARD_MATERIA = 'a.faixa-materias__card';
const SELETOR_LISTA_MATERIAS = '.faixa-materias__lista';
const ATRIBUTO_CURSO_FAIXA = 'cursoId';
const PERFIL_PROFESSOR_ENSALADO = 'PROFESSOR';
const TABELA_MATERIA_ENSALADO = 'materia';
const PREFIXO_EMOJI_CARD = /^📘\s*/;
const TEXTO_SOMENTE_ENSALADO = 'SOMENTE ENSALADO';
const TEXTO_VER_TODAS_MATERIAS = 'VER TODAS MATÉRIAS';
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
 * Envolve cada cartão em um item próprio, para que o ON/OFF fique ao lado dele.
 * @param {HTMLElement} faixa - Elemento nav.faixa-materias.
 * @returns {{item: HTMLElement, card: HTMLElement, nome: string}[]} Itens da faixa.
 */
function envolverCardsEnsalado(faixa) {
  return [...faixa.querySelectorAll(SELETOR_CARD_MATERIA)].map((card) => {
    const item = document.createElement('div');
    item.className = 'faixa-materias__item';
    card.before(item);
    item.append(card);
    const nome = normalizarNomeMateria(card.textContent.replace(PREFIXO_EMOJI_CARD, ''));
    return { item, card, nome };
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
 * Mostra só as matérias ensaladas (ou todas), escondendo as demais.
 * @param {Object[]} itens - Itens montados por envolverCardsEnsalado.
 * @param {Map<string, Object>} mapaMaterias - Matérias do banco por nome normalizado.
 * @param {boolean} somenteEnsalado - true para mostrar só as ensaladas.
 */
function aplicarFiltroEnsalado(itens, mapaMaterias, somenteEnsalado) {
  itens.forEach(({ item, nome }) => {
    const materia = mapaMaterias.get(nome);
    const ocultar = somenteEnsalado && !materia?.ensalado;
    item.hidden = ocultar;
  });
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
  const { somente, todas } = montarBarraEnsalado(faixa);
  const materias = await buscarMateriasEnsalado(cursoId).catch(() => []);
  const mapaMaterias = new Map(materias.map((m) => [normalizarNomeMateria(m.descricao), m]));
  const ehProfessor = perfil === PERFIL_PROFESSOR_ENSALADO;

  itens.forEach(({ item, nome }) => {
    const materia = mapaMaterias.get(nome);
    if (!materia || !ehProfessor) return;
    item.append(criarOnOffEnsalado(materia));
  });

  somente.addEventListener('click', () => aplicarFiltroEnsalado(itens, mapaMaterias, true));
  todas.addEventListener('click', () => aplicarFiltroEnsalado(itens, mapaMaterias, false));
  aplicarFiltroInicialEnsalado(itens, mapaMaterias);
}

/**
 * Abre a faixa já em SOMENTE ENSALADO (padrão de todos os cursos).
 * Sem nenhuma matéria ensalada (ou sem banco), mantém a lista completa para não esvaziar a faixa.
 * @param {Object[]} itens - Itens montados por envolverCardsEnsalado.
 * @param {Map<string, Object>} mapaMaterias - Matérias do banco por nome normalizado.
 */
function aplicarFiltroInicialEnsalado(itens, mapaMaterias) {
  const temEnsalada = [...mapaMaterias.values()].some((materia) => materia.ensalado);
  if (!temEnsalada) return;

  aplicarFiltroEnsalado(itens, mapaMaterias, true);
}

/**
 * Liga todas as faixas de matérias da página que informam o curso (data-curso-id).
 */
async function iniciarFaixasEnsalado() {
  const faixas = [...document.querySelectorAll(SELETOR_FAIXA_MATERIAS)].filter(
    (faixa) => faixa.dataset[ATRIBUTO_CURSO_FAIXA],
  );
  if (faixas.length === 0) return;

  const perfil = await buscarPerfilEnsalado();
  for (const faixa of faixas) {
    await ligarFaixaEnsalado(faixa, perfil);
  }
}

iniciarFaixasEnsalado();
