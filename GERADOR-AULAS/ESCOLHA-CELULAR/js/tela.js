/**
 * Camada de tela: lê os campos, desenha indicadores, catálogo e distribuição.
 */

const formatoReal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatoDolar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const estado = lerEstadoSalvo();
let temporizadorSalvamento = null;

/**
 * Busca um elemento pelo id.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento encontrado.
 */
function elemento(id) {
  return document.getElementById(id);
}

/**
 * Escreve um texto num elemento, se ele existir.
 * @param {string} id - Id do elemento.
 * @param {string} texto - Texto a mostrar.
 * @returns {void}
 */
function escreverTexto(id, texto) {
  const alvo = elemento(id);
  if (!alvo) return;
  alvo.textContent = texto;
}

/**
 * Devolve os produtos do catálogo que estão na lista do usuário.
 * @returns {object[]} Produtos selecionados.
 */
function obterSelecionados() {
  return CATALOGO_PRODUTOS.filter((produto) => estado.selecionados.includes(produto.id));
}

/**
 * Copia a configuração do estado para os campos da tela.
 * @returns {void}
 */
function preencherCampos() {
  document.querySelectorAll('[data-campo]').forEach((campo) => {
    campo.value = estado.config[campo.dataset.campo];
  });
}

/**
 * Lê um campo numérico da tela para o estado (valores inválidos viram 0).
 * @param {HTMLInputElement} campo - Campo alterado.
 * @returns {void}
 */
function lerCampo(campo) {
  const valor = Number(String(campo.value).replace(',', '.'));
  const valorValido = Number.isFinite(valor) && valor >= 0;
  estado.config[campo.dataset.campo] = valorValido ? valor : 0;
}

/**
 * Atualiza uma barra de progresso e a classe de alerta.
 * @param {string} id - Id da barra.
 * @param {number} percentual - Percentual usado.
 * @returns {void}
 */
function desenharBarra(id, percentual) {
  const barra = elemento(id);
  if (!barra) return;
  const limitado = Math.min(Math.max(percentual, 0), 100);
  barra.style.width = `${limitado}%`;
  barra.classList.toggle('barra__preenchimento--alerta', percentual > 100);
}

/**
 * Desenha os cartões de indicadores e as barras.
 * @param {object} resumo - Resumo calculado da lista.
 * @returns {void}
 */
function desenharIndicadores(resumo) {
  const { orcamento } = resumo;
  const usoOrcamento = orcamento.disponivel > 0 ? (resumo.totalReal / orcamento.disponivel) * 100 : 0;
  const usoCota = (resumo.totalDolar / orcamento.cotaDolar) * 100;

  escreverTexto('kpi-guardado', formatoReal.format(estado.config.dinheiroGuardado));
  escreverTexto('kpi-disponivel', formatoReal.format(orcamento.disponivel));
  escreverTexto('kpi-total', formatoReal.format(resumo.totalReal));
  escreverTexto('kpi-total-dolar', `${formatoDolar.format(resumo.totalDolar)} · ${resumo.quantidade} itens`);
  escreverTexto('kpi-saldo', formatoReal.format(resumo.saldo));
  escreverTexto('kpi-economia', formatoReal.format(resumo.economia));
  escreverTexto('kpi-margem', `margem de segurança: ${formatoReal.format(orcamento.margem)}`);
  escreverTexto('texto-orcamento', `${usoOrcamento.toFixed(0)}% do dinheiro disponível`);
  escreverTexto('texto-cota', `${formatoDolar.format(resumo.totalDolar)} de ${formatoDolar.format(orcamento.cotaDolar)} (${usoCota.toFixed(0)}%)`);

  elemento('kpi-saldo-cartao').classList.toggle('kpi--negativo', resumo.saldo < 0);
  desenharBarra('barra-orcamento', usoOrcamento);
  desenharBarra('barra-cota', usoCota);
  desenharAlertas(resumo);
  desenharSimuladorEdbv(resumo);
}

/**
 * Mostra avisos de cota estourada ou falta de dinheiro.
 * @param {object} resumo - Resumo calculado da lista.
 * @returns {void}
 */
function desenharAlertas(resumo) {
  const avisos = [];
  if (resumo.excedenteDolar > 0) {
    const excedente = formatoDolar.format(resumo.excedenteDolar);
    const imposto = formatoReal.format(resumo.imposto);
    avisos.push(`⚠️ Passou ${excedente} da cota: imposto estimado de ${imposto} (50% do excedente), já somado ao total.`);
  }
  if (resumo.saldo < 0) {
    avisos.push(`⛔ Faltam ${formatoReal.format(-resumo.saldo)} — tire itens da lista ou aumente o valor guardado.`);
  }
  if (avisos.length === 0 && resumo.quantidade > 0) {
    avisos.push('✅ A lista cabe no seu dinheiro e dentro da cota de isenção.');
  }
  escreverTexto('alertas', avisos.join('  '));
}

/**
 * Cria a linha da tabela de um produto.
 * @param {object} produto - Produto do catálogo.
 * @returns {HTMLTableRowElement} Linha pronta.
 */
function criarLinhaProduto(produto) {
  const categoria = CATEGORIAS[produto.categoria];
  const economia = calcularEconomia(produto, estado.config);
  const estaSelecionado = estado.selecionados.includes(produto.id);
  const linha = document.createElement('tr');
  linha.className = estaSelecionado ? 'linha--selecionada' : '';
  linha.innerHTML = `
    <td><input type="checkbox" class="seletor" data-id="${produto.id}" ${estaSelecionado ? 'checked' : ''}
      aria-label="Incluir ${produto.nome}"></td>
    <td><span class="etiqueta ${categoria.classe}">${categoria.icone}</span> ${produto.nome}</td>
    <td class="numero">${formatoDolar.format(produto.precoDolar)}</td>
    <td class="numero">${formatoReal.format(economia.precoReal)}</td>
    <td class="numero">${formatoReal.format(produto.precoBrasil)}</td>
    <td class="numero ${economia.economia > 0 ? 'positivo' : 'negativo'}">${economia.percentual.toFixed(0)}%</td>`;
  return linha;
}

/**
 * Desenha o catálogo filtrado pelas categorias marcadas.
 * @returns {void}
 */
function desenharCatalogo() {
  const corpo = elemento('corpo-catalogo');
  if (!corpo) return;
  const visiveis = CATALOGO_PRODUTOS.filter((produto) => estado.categorias.includes(produto.categoria));
  const contexto = { config: estado.config, selecionados: estado.selecionados };
  const ordenados = ordenarProdutos(visiveis, estado.ordenacao, contexto);
  corpo.replaceChildren(...ordenados.map(criarLinhaProduto));
  marcarColunaOrdenada();
}

/**
 * Marca no cabeçalho a coluna ordenada (aria-sort e seta ▲/▼).
 * @returns {void}
 */
function marcarColunaOrdenada() {
  document.querySelectorAll('[data-ordenar]').forEach((botao) => {
    const celula = botao.closest('th');
    const estaOrdenada = estado.ordenacao?.coluna === botao.dataset.ordenar;
    const ehCrescente = estado.ordenacao?.direcao === DIRECAO_CRESCENTE;
    const marcacao = estaOrdenada ? MARCACAO_ORDENACAO[ehCrescente] : MARCACAO_SEM_ORDENACAO;
    celula.setAttribute('aria-sort', marcacao.aria);
    botao.dataset.seta = marcacao.seta;
  });
}

/**
 * Desenha a distribuição do gasto por categoria.
 * @param {object[]} selecionados - Produtos selecionados.
 * @returns {void}
 */
function desenharDistribuicao(selecionados) {
  const lista = elemento('distribuicao');
  if (!lista) return;
  const grupos = agruparPorCategoria(selecionados, estado.config);
  const total = Object.values(grupos).reduce((soma, valor) => soma + valor, 0);
  lista.replaceChildren();
  if (total === 0) {
    lista.innerHTML = '<li class="vazio">Marque itens no catálogo ou use “Sugerir compras”.</li>';
    return;
  }
  Object.entries(grupos).forEach(([chave, valor]) => {
    const categoria = CATEGORIAS[chave];
    const item = document.createElement('li');
    item.innerHTML = `<span>${categoria.icone} ${categoria.nome}</span>
      <span class="numero">${formatoReal.format(valor)}</span>
      <span class="barra barra--fina"><span class="barra__preenchimento ${categoria.classe}"
        style="width:${((valor / total) * 100).toFixed(1)}%"></span></span>`;
    lista.appendChild(item);
  });
}

/**
 * Desenha os filtros de categoria (chips).
 * @returns {void}
 */
function desenharFiltros() {
  const area = elemento('filtros-categoria');
  if (!area) return;
  area.replaceChildren();
  Object.entries(CATEGORIAS).forEach(([chave, categoria]) => {
    const rotulo = document.createElement('label');
    rotulo.className = `chip ${categoria.classe}`;
    const marcado = estado.categorias.includes(chave) ? 'checked' : '';
    rotulo.innerHTML = `<input type="checkbox" data-categoria="${chave}" ${marcado}> ${categoria.icone} ${categoria.nome}`;
    area.appendChild(rotulo);
  });
}

/**
 * Recalcula e redesenha tudo, e agenda o salvamento.
 * @returns {void}
 */
function atualizarTudo() {
  const selecionados = obterSelecionados();
  desenharFaixas();
  desenharIndicadores(calcularResumoLista(selecionados, estado.config));
  desenharCatalogo();
  desenharDistribuicao(selecionados);
  clearTimeout(temporizadorSalvamento);
  temporizadorSalvamento = setTimeout(() => salvarEstado(estado), ATRASO_SALVAMENTO_MS);
}

/**
 * Monta o texto de situação do dinheiro guardado diante de uma faixa.
 * @param {object} faixa - Faixa de gasto.
 * @param {number} disponivel - Dinheiro disponível para compras.
 * @returns {string} Situação.
 */
function descreverSituacaoFaixa(faixa, disponivel) {
  if (disponivel >= faixa.minimo) return '✅ Seu dinheiro cobre';
  return `⛔ Faltam ${formatoReal.format(faixa.minimo - disponivel)}`;
}

/**
 * Cria o card de uma faixa de gasto com o kit sugerido.
 * @param {object} faixa - Faixa de gasto.
 * @returns {HTMLElement} Card pronto.
 */
function criarCardFaixa(faixa) {
  const ids = montarKitPorFaixa(CATALOGO_PRODUTOS, estado.config, {
    categorias: estado.categorias,
    limiteReal: faixa.maximo,
  });
  const produtos = CATALOGO_PRODUTOS.filter((produto) => ids.includes(produto.id));
  const resumo = calcularResumoLista(produtos, estado.config);
  const destaques = produtos.slice(0, 3).map((produto) => produto.nome).join(', ');
  const estaAtiva = estado.faixaAtiva === faixa.id;
  const pessoasParaIsencao = Math.ceil(resumo.totalDolar / COTA_ISENCAO_DOLAR_POR_PESSOA);

  const card = document.createElement('button');
  card.type = 'button';
  card.className = `kpi faixa ${faixa.classe}${estaAtiva ? ' faixa--ativa' : ''}`;
  card.dataset.faixa = faixa.id;
  card.innerHTML = `
    <span class="kpi__rotulo">${faixa.icone} ${faixa.titulo}</span>
    <strong class="kpi__valor">${formatoReal.format(resumo.totalReal)}</strong>
    <span class="kpi__detalhe">${resumo.quantidade} itens · economia ${formatoReal.format(resumo.economia)}</span>
    <span class="faixa__itens">${destaques || 'Nenhum item cabe nas categorias marcadas'}</span>
    <span class="faixa__itens">🛃 Isento só com ${pessoasParaIsencao} viajante(s)</span>
    <span class="faixa__situacao">${descreverSituacaoFaixa(faixa, resumo.orcamento.disponivel)}</span>
    <span class="faixa__acao">${estaAtiva ? '✔ Kit aplicado' : 'Usar este kit →'}</span>`;
  return card;
}

/**
 * Desenha os cards de faixa de gasto no topo.
 * @returns {void}
 */
function desenharFaixas() {
  const area = elemento('faixas');
  if (!area) return;
  area.replaceChildren(...FAIXAS_GASTO.map(criarCardFaixa));
}

/**
 * Escreve o veredito da e-DBV conforme o excedente da lista.
 * @param {object} resumo - Resumo calculado da lista.
 * @returns {void}
 */
function escreverVereditoEdbv(resumo) {
  if (resumo.quantidade === 0) {
    escreverTexto('edbv-veredito', 'Monte sua lista no catálogo para simular a declaração.');
    return;
  }
  if (resumo.excedenteDolar <= 0) {
    escreverTexto('edbv-veredito',
      '✅ Dentro da cota: não precisa de e-DBV (confira os limites de quantidade).');
    return;
  }
  escreverTexto('edbv-veredito',
    '📝 Passou da cota: preencha a e-DBV e pague o DARF antes de cruzar a ponte.');
}

/**
 * Preenche os cartões de simulação da e-DBV com os números da lista.
 * @param {object} resumo - Resumo calculado da lista.
 * @returns {void}
 */
function desenharSimuladorEdbv(resumo) {
  const simulacao = simularEdbv(resumo, estado.config);
  const viajantes = Math.max(estado.config.quantidadeViajantes, 1);
  const cotaPessoa = formatoDolar.format(COTA_ISENCAO_DOLAR_POR_PESSOA);
  escreverTexto('edbv-total', formatoDolar.format(resumo.totalDolar));
  escreverTexto('edbv-cota', formatoDolar.format(resumo.orcamento.cotaDolar));
  escreverTexto('edbv-cota-detalhe', `${viajantes} viajante(s) × ${cotaPessoa}`);
  escreverTexto('edbv-excedente', formatoDolar.format(resumo.excedenteDolar));
  escreverTexto('edbv-excedente-real', `≈ ${formatoReal.format(simulacao.excedenteReal)}`);
  escreverTexto('edbv-imposto', formatoReal.format(simulacao.impostoDeclarado));
  escreverTexto('edbv-sem-declarar', formatoReal.format(simulacao.custoSemDeclarar));
  escreverVereditoEdbv(resumo);
}
