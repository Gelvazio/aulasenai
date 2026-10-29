// Faixa "Matérias — <CURSO>": botões SOMENTE ENSALADO e VER TODAS MATÉRIAS ao lado do título,
// e um botão ON/OFF ao lado de cada matéria (só PROFESSOR grava). O ensalado vale POR TURMA
// (#386): o professor escolhe a turma no combo da faixa e o ON/OFF grava/apaga a linha
// (matéria × turma) em turma_materia_ensalado; o aluno vê o filtro da turma dele.
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
const TABELA_TURMA_ENSALADO = 'turma';
const TABELA_ENSALADO_TURMA = 'turma_materia_ensalado';
const TABELA_ALUNO_ENSALADO = 'aluno';
const ROTULO_TURMA_ENSALADO = 'Turma:';
const PREFIXO_FAVORITA_ENSALADO = '⭐ ';
const EVENTO_FAVORITA_ALTERADA_ENSALADO = 'turma-favorita-alterada';
const CLASSE_BOTAO_FAVORITA_ENSALADO = 'btn faixa-materias__favorita';
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
 * Busca as turmas do curso (a favorita primeiro).
 * @param {string} cursoId - id do curso na tabela curso.
 * @returns {Promise<{codigo: string, nome: string, favorito: boolean}[]>} Turmas do curso.
 */
async function buscarTurmasEnsalado(cursoId) {
  const turmas = await sbGet(TABELA_TURMA_ENSALADO,
    `curso_id=eq.${cursoId}&select=codigo,nome,favorito&order=nome`);
  return turmas.sort((a, b) => Number(b.favorito === true) - Number(a.favorito === true));
}

/**
 * Turma do aluno logado (RLS devolve só a linha dele).
 * @returns {Promise<string>} Código da turma, ou vazio se não for aluno.
 */
async function buscarTurmaDoAlunoEnsalado() {
  const { data } = await obterClienteSupabase().auth.getSession();
  const usuarioId = data?.session?.user?.id;
  if (!usuarioId) return '';
  const [aluno] = await sbGet(TABELA_ALUNO_ENSALADO, `id=eq.${usuarioId}&select=turma_codigo`);
  return aluno?.turma_codigo ?? '';
}

/**
 * Marca em cada matéria se está ensalada na turma (linha em turma_materia_ensalado).
 * @param {Object[]} materias - Matérias do curso.
 * @param {string} turma - Código da turma ('' = nenhuma ensalada).
 */
async function carregarEnsaladoDaTurma(materias, turma) {
  const linhas = turma
    ? await sbGet(TABELA_ENSALADO_TURMA,
      `turma_codigo=eq.${encodeURIComponent(turma)}&select=materia_id`).catch(() => [])
    : [];
  const ids = new Set(linhas.map((linha) => linha.materia_id));
  materias.forEach((materia) => { materia.ensalado = ids.has(materia.id); });
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
  // O cartão pode ter vários links (Apostila e Atividades): o da faixa é o do índice ATIVIDADES.
  document.querySelectorAll(SELETOR_CARTOES_GRADE).forEach((cartao) => {
    cartao.querySelectorAll(SELETOR_LINK_CARTAO_GRADE).forEach((link) => {
      const href = link.getAttribute('href');
      const cartoes = mapa.get(href) ?? [];
      if (!cartoes.includes(cartao)) mapa.set(href, [...cartoes, cartao]);
    });
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
 * Liga/desliga o ensalado da matéria NA TURMA escolhida e reflete o novo valor no botão.
 * @param {Object} materia - Linha da matéria (id e ensalado).
 * @param {HTMLButtonElement} botao - Botão ON/OFF da matéria.
 * @param {{turma: string}} estado - Turma escolhida na faixa.
 */
async function gravarEnsaladoMateria(materia, botao, estado) {
  const novoValor = !materia.ensalado;
  const filtro = `materia_id=eq.${materia.id}&turma_codigo=eq.${encodeURIComponent(estado.turma)}`;
  try {
    if (novoValor) {
      await sbPost(TABELA_ENSALADO_TURMA, { materia_id: materia.id, turma_codigo: estado.turma });
    } else {
      await sbDelete(TABELA_ENSALADO_TURMA, filtro);
    }
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
 * @param {{turma: string}} estado - Turma escolhida na faixa.
 * @returns {HTMLButtonElement} Botão ON/OFF.
 */
function criarOnOffEnsalado(materia, estado) {
  const botao = criarBotaoEnsalado('', 'faixa-materias__onoff');
  atualizarOnOffEnsalado(botao, materia.ensalado);
  botao.disabled = !estado.turma;
  botao.addEventListener('click', () => gravarEnsaladoMateria(materia, botao, estado));
  materia.botaoOnOff = botao;
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
  itens.forEach(({ cartoesGrade }) => cartoesGrade.forEach((cartao) => { cartao.hidden = true; }));
  const botoes = montarBarraEnsalado(faixa);
  const materias = await buscarMateriasEnsalado(cursoId).catch(() => []);
  const mapaMaterias = new Map(materias.map((m) => [normalizarNomeMateria(m.descricao), m]));
  const ehProfessor = perfil === PERFIL_PROFESSOR_ENSALADO;
  const estado = { turma: '', ehProfessor };
  const faixaMontada = { itens, mapaMaterias, botoes, estado };

  itens.forEach(({ item, nome }) => {
    const materia = mapaMaterias.get(nome);
    if (!materia || !ehProfessor) return;
    item.append(criarOnOffEnsalado(materia, estado));
  });
  botoes.somente.addEventListener('click', () => escolherFiltroEnsalado(faixaMontada, true));
  botoes.todas.addEventListener('click', () => escolherFiltroEnsalado(faixaMontada, false));
  await iniciarTurmaEnsalado(faixa, faixaMontada, cursoId, ehProfessor);
  faixa.hidden = !ehProfessor;
}

/**
 * Define a turma da faixa: o professor escolhe no combo (abre na favorita); o aluno usa a dele.
 * @param {HTMLElement} faixa - Elemento nav.faixa-materias.
 * @param {Object} faixaMontada - Dados da faixa (itens, mapaMaterias, botoes, estado).
 * @param {string} cursoId - id do curso.
 * @param {boolean} ehProfessor - true para o perfil PROFESSOR.
 */
async function iniciarTurmaEnsalado(faixa, faixaMontada, cursoId, ehProfessor) {
  if (!ehProfessor) {
    const turma = await buscarTurmaDoAlunoEnsalado().catch(() => '');
    await trocarTurmaEnsalado(faixaMontada, turma);
    return;
  }
  const turmas = await buscarTurmasEnsalado(cursoId).catch(() => []);
  const combo = montarComboTurmaEnsalado(faixa, turmas);
  combo.addEventListener('change', () => trocarTurmaEnsalado(faixaMontada, combo.value));
  await trocarTurmaEnsalado(faixaMontada, combo.value);
}

/**
 * Cria o combo Turma na barra da faixa (só professor).
 * @param {HTMLElement} faixa - Elemento nav.faixa-materias.
 * @param {{codigo: string, nome: string, favorito: boolean}[]} turmas - Turmas do curso.
 * @returns {HTMLSelectElement} Combo (abre na turma favorita, ou na primeira).
 */
function montarComboTurmaEnsalado(faixa, turmas) {
  const etiqueta = document.createElement('label');
  etiqueta.className = 'faixa-materias__turma';
  etiqueta.append(`${ROTULO_TURMA_ENSALADO} `);
  const combo = document.createElement('select');
  turmas.forEach((turma) => combo.add(new Option(
    (turma.favorito ? PREFIXO_FAVORITA_ENSALADO : '') + turma.nome, turma.codigo)));
  etiqueta.append(combo);
  faixa.querySelector('.faixa-materias__barra').append(etiqueta);
  montarBotaoFavoritaEnsalado(faixa, combo);
  return combo;
}

/**
 * Repinta o ⭐ do combo: só a turma favorita atual leva o prefixo.
 * @param {HTMLSelectElement} combo - Combo Turma da faixa.
 * @param {string} favorita - Código da turma favorita ('' = nenhuma).
 */
function marcarFavoritaNoCombo(combo, favorita) {
  [...combo.options].forEach((opcao) => {
    const nome = opcao.text.replace(PREFIXO_FAVORITA_ENSALADO, '');
    opcao.text = (opcao.value === favorita ? PREFIXO_FAVORITA_ENSALADO : '') + nome;
  });
}

/**
 * Marca (ou desmarca) a turma escolhida no combo como favorita e atualiza combo e botão.
 * @param {{combo: HTMLSelectElement, botao: HTMLButtonElement, favorita: string}} estado -
 *     Combo, botão e favorita atual (atualizada aqui).
 */
async function alternarFavoritaEnsalado(estado) {
  const jaEhFavorita = estado.combo.value === estado.favorita;
  const novaFavorita = jaEhFavorita ? '' : estado.combo.value;
  estado.botao.disabled = true;
  try {
    await definirTurmaFavorita(novaFavorita);
    estado.favorita = novaFavorita;
    marcarFavoritaNoCombo(estado.combo, novaFavorita);
    document.dispatchEvent(new CustomEvent(EVENTO_FAVORITA_ALTERADA_ENSALADO,
      { detail: novaFavorita }));
  } catch (erro) {
    await mostrarPopup(erro.message);
  }
  atualizarBotaoFavorita(estado.botao, estado.combo.value === estado.favorita);
  estado.botao.disabled = !estado.combo.value;
}

/**
 * Cria, ao lado do combo Turma, o botão "Marcar como turma favorita" (só professor). Usa
 * turma-favorita.js; sem ele a faixa segue sem o botão.
 * @param {HTMLElement} faixa - Elemento nav.faixa-materias.
 * @param {HTMLSelectElement} combo - Combo Turma da faixa.
 */
function montarBotaoFavoritaEnsalado(faixa, combo) {
  const temFavorita = typeof criarBotaoFavorita === 'function'
    && typeof definirTurmaFavorita === 'function';
  if (!temFavorita) return;

  const favoritaInicial = [...combo.options]
    .find((opcao) => opcao.text.startsWith(PREFIXO_FAVORITA_ENSALADO))?.value ?? '';
  const estado = { combo, botao: null, favorita: favoritaInicial };
  estado.botao = criarBotaoFavorita(CLASSE_BOTAO_FAVORITA_ENSALADO,
    () => alternarFavoritaEnsalado(estado));
  const atualizar = () => {
    atualizarBotaoFavorita(estado.botao, combo.value === estado.favorita);
    estado.botao.disabled = !combo.value;
  };
  combo.addEventListener('change', atualizar);
  atualizar();
  faixa.querySelector('.faixa-materias__barra').append(estado.botao);
}

/**
 * Troca a turma da faixa: recarrega o ensalado dela, repinta os ON/OFF e refaz o filtro.
 * @param {Object} faixaMontada - Dados da faixa (itens, mapaMaterias, botoes, estado).
 * @param {string} turma - Código da turma escolhida ('' = nenhuma).
 */
async function trocarTurmaEnsalado(faixaMontada, turma) {
  faixaMontada.estado.turma = turma;
  const materias = [...faixaMontada.mapaMaterias.values()];
  await carregarEnsaladoDaTurma(materias, turma);
  materias.forEach((materia) => {
    if (!materia.botaoOnOff) return;
    materia.botaoOnOff.disabled = !turma;
    atualizarOnOffEnsalado(materia.botaoOnOff, materia.ensalado);
  });
  aplicarFiltroInicialEnsalado(faixaMontada);
}

/**
 * Abre a faixa já em SOMENTE ENSALADO (padrão de todos os cursos).
 * Professor sem matéria ensalada na turma vê a lista completa; o aluno vê só as ensaladas.
 * @param {{itens: Object[], mapaMaterias: Map, botoes: Object}} faixaMontada - Dados da faixa.
 */
function aplicarFiltroInicialEnsalado(faixaMontada) {
  const materias = [...faixaMontada.mapaMaterias.values()];
  const temEnsalada = materias.some((materia) => materia.ensalado);
  // Aluno: só as ensaladas na turma dele, mesmo que nenhuma (sem plano B de "todas").
  escolherFiltroEnsalado(faixaMontada, !faixaMontada.estado.ehProfessor || temEnsalada);
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
