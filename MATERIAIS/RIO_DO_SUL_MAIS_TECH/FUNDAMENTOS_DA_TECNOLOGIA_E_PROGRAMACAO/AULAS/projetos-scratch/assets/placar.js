/**
 * Placar das equipes com cronômetro regressivo.
 * Os dados ficam só no navegador do professor (localStorage).
 */
(function () {
  "use strict";

  const CHAVE_ARMAZENAMENTO = "scratch-placar-v1";
  const LIMITE_EQUIPES = 8;
  const TOTAL_PROJETOS = 12;
  const MINUTOS_PADRAO = 30;
  const SEGUNDOS_ALERTA = 60;
  const MEDALHAS = ["🥇", "🥈", "🥉"];
  const CORES_EQUIPES = ["#00f0ff", "#ff2bd6", "#7a3cff", "#2dffa0", "#ffd23f", "#ff7a3c", "#4c97ff", "#ff5c8a"];
  const BOTOES_PONTOS = [
    { rotulo: "-1", valor: -1 },
    { rotulo: "+1", valor: 1 },
    { rotulo: "+5", valor: 5 },
    { rotulo: "+10", valor: 10 },
    { rotulo: "1º a entregar +3", valor: 3 },
    { rotulo: "Desafio +2", valor: 2 },
  ];

  const estado = { equipes: [], projeto: 1 };
  const relogio = { total: MINUTOS_PADRAO * 60, restante: MINUTOS_PADRAO * 60, intervalo: null };

  /**
   * Busca um elemento da página pelo id.
   * @param {string} id - Id do elemento.
   * @returns {HTMLElement} Elemento encontrado.
   */
  function pegar(id) {
    return document.getElementById(id);
  }

  /** Grava o estado no navegador, sem falhar se o armazenamento estiver bloqueado. */
  function salvar() {
    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(estado));
    } catch (erro) {
      /* sem armazenamento: o placar segue só na memória */
    }
  }

  /** Lê o estado salvo anteriormente, se existir. */
  function carregar() {
    try {
      const salvo = JSON.parse(window.localStorage.getItem(CHAVE_ARMAZENAMENTO));
      if (salvo && Array.isArray(salvo.equipes)) {
        estado.equipes = salvo.equipes;
        estado.projeto = Number(salvo.projeto) || 1;
      }
    } catch (erro) {
      /* dados inválidos: começa do zero */
    }
  }

  /**
   * Soma todos os pontos de uma equipe.
   * @param {{pontos: Object<string, number>}} equipe - Equipe.
   * @returns {number} Total de pontos.
   */
  function totalDaEquipe(equipe) {
    return Object.values(equipe.pontos).reduce((soma, valor) => soma + valor, 0);
  }

  /**
   * Cria o elemento visual de uma equipe com seus botões de pontos.
   * @param {Object} equipe - Equipe a desenhar.
   * @param {number} posicao - Posição no ranking (0 é o primeiro).
   * @returns {HTMLLIElement} Item da lista.
   */
  function criarCartaoEquipe(equipe, posicao) {
    const item = document.createElement("li");
    item.className = "equipe";
    item.style.setProperty("--cor-equipe", equipe.cor);
    const pontosProjeto = equipe.pontos[estado.projeto] || 0;
    item.innerHTML =
      '<div class="equipe-topo"><span class="equipe-nome"></span>' +
      '<span class="equipe-medalha">' + (MEDALHAS[posicao] || posicao + 1 + "º") + "</span></div>" +
      '<div class="equipe-total">' + totalDaEquipe(equipe) + " pts</div>" +
      '<div class="equipe-projeto">Projeto ' + String(estado.projeto).padStart(2, "0") + ": " + pontosProjeto + " pts</div>";
    item.querySelector(".equipe-nome").textContent = equipe.nome;
    item.appendChild(criarBotoesPontos(equipe));
    return item;
  }

  /**
   * Cria a linha de botões de pontos e remoção de uma equipe.
   * @param {Object} equipe - Equipe dona dos botões.
   * @returns {HTMLDivElement} Linha de botões.
   */
  function criarBotoesPontos(equipe) {
    const linha = document.createElement("div");
    linha.className = "linha-botoes";
    BOTOES_PONTOS.forEach(({ rotulo, valor }) => {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "botao";
      botao.textContent = rotulo;
      botao.addEventListener("click", () => darPontos(equipe.id, valor));
      linha.appendChild(botao);
    });
    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "botao botao-perigo";
    remover.textContent = "Remover";
    remover.addEventListener("click", () => removerEquipe(equipe.id));
    linha.appendChild(remover);
    return linha;
  }

  /** Redesenha o ranking ordenado por pontos. */
  function desenhar() {
    const lista = pegar("ranking");
    lista.replaceChildren();
    const ordenadas = [...estado.equipes].sort((a, b) => totalDaEquipe(b) - totalDaEquipe(a));
    ordenadas.forEach((equipe, posicao) => lista.appendChild(criarCartaoEquipe(equipe, posicao)));
    pegar("aviso-vazio").hidden = estado.equipes.length > 0;
  }

  /**
   * Soma (ou tira) pontos de uma equipe no projeto da vez.
   * @param {number} id - Id da equipe.
   * @param {number} valor - Pontos a somar.
   */
  function darPontos(id, valor) {
    const equipe = estado.equipes.find((item) => item.id === id);
    if (!equipe) return;
    const atual = equipe.pontos[estado.projeto] || 0;
    equipe.pontos[estado.projeto] = Math.max(0, atual + valor);
    salvar();
    desenhar();
  }

  /**
   * Remove uma equipe depois de confirmar.
   * @param {number} id - Id da equipe.
   */
  function removerEquipe(id) {
    if (!window.confirm("Remover esta equipe e os pontos dela?")) return;
    estado.equipes = estado.equipes.filter((item) => item.id !== id);
    salvar();
    desenhar();
  }

  /** Adiciona uma equipe nova com o nome digitado. */
  function adicionarEquipe() {
    const campo = pegar("nome-equipe");
    const nome = campo.value.trim();
    const cabeMais = estado.equipes.length < LIMITE_EQUIPES;
    if (!nome || !cabeMais) return;
    const cor = CORES_EQUIPES[estado.equipes.length % CORES_EQUIPES.length];
    estado.equipes.push({ id: Date.now(), nome, cor, pontos: {} });
    campo.value = "";
    salvar();
    desenhar();
  }

  /** Zera todas as equipes e pontos depois de confirmar. */
  function zerarTudo() {
    if (!window.confirm("Apagar todas as equipes e pontos?")) return;
    estado.equipes = [];
    salvar();
    desenhar();
  }

  /** Preenche a lista de projetos (01 a 12) e liga a troca de projeto. */
  function prepararProjetos() {
    const seletor = pegar("projeto-atual");
    for (let numero = 1; numero <= TOTAL_PROJETOS; numero += 1) {
      const opcao = document.createElement("option");
      opcao.value = String(numero);
      opcao.textContent = "Projeto " + String(numero).padStart(2, "0");
      seletor.appendChild(opcao);
    }
    seletor.value = String(estado.projeto);
    seletor.addEventListener("change", () => {
      estado.projeto = Number(seletor.value);
      salvar();
      desenhar();
    });
  }

  /**
   * Formata segundos como mm:ss.
   * @param {number} segundos - Segundos restantes.
   * @returns {string} Texto mm:ss.
   */
  function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    return String(minutos).padStart(2, "0") + ":" + String(segundos % 60).padStart(2, "0");
  }

  /** Atualiza visor, barra e cores do cronômetro. */
  function desenharRelogio() {
    const visor = pegar("timer-visor");
    visor.textContent = formatarTempo(relogio.restante);
    visor.classList.toggle("alerta", relogio.restante <= SEGUNDOS_ALERTA && relogio.restante > 0);
    visor.classList.toggle("acabou", relogio.restante === 0);
    pegar("timer-barra").value = relogio.total === 0 ? 0 : ((relogio.total - relogio.restante) / relogio.total) * 100;
  }

  /** Toca um aviso curto quando o tempo acaba. */
  function tocarAlerta() {
    try {
      const contexto = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.35, 0.7].forEach((atraso) => {
        const oscilador = contexto.createOscillator();
        oscilador.frequency.value = 880;
        oscilador.connect(contexto.destination);
        oscilador.start(contexto.currentTime + atraso);
        oscilador.stop(contexto.currentTime + atraso + 0.2);
      });
    } catch (erro) {
      /* sem áudio: só o visor avisa */
    }
  }

  /** Avança um segundo do cronômetro. */
  function passarSegundo() {
    relogio.restante -= 1;
    if (relogio.restante <= 0) {
      relogio.restante = 0;
      pausarRelogio();
      tocarAlerta();
    }
    desenharRelogio();
  }

  /** Inicia (ou retoma) a contagem regressiva. */
  function iniciarRelogio() {
    if (relogio.intervalo || relogio.restante === 0) return;
    relogio.intervalo = window.setInterval(passarSegundo, 1000);
  }

  /** Pausa a contagem sem perder o tempo restante. */
  function pausarRelogio() {
    window.clearInterval(relogio.intervalo);
    relogio.intervalo = null;
  }

  /**
   * Define a duração do cronômetro e volta ao início.
   * @param {number} minutos - Duração em minutos.
   */
  function definirMinutos(minutos) {
    const valido = Math.min(180, Math.max(1, Math.floor(minutos) || MINUTOS_PADRAO));
    pausarRelogio();
    relogio.total = valido * 60;
    relogio.restante = relogio.total;
    pegar("timer-minutos").value = String(valido);
    desenharRelogio();
  }

  /** Liga os botões do cronômetro. */
  function prepararRelogio() {
    pegar("timer-iniciar").addEventListener("click", iniciarRelogio);
    pegar("timer-pausar").addEventListener("click", pausarRelogio);
    pegar("timer-zerar").addEventListener("click", () => definirMinutos(Number(pegar("timer-minutos").value)));
    pegar("timer-minutos").addEventListener("change", (evento) => definirMinutos(Number(evento.target.value)));
    document.querySelectorAll("[data-minutos]").forEach((botao) => {
      botao.addEventListener("click", () => definirMinutos(Number(botao.dataset.minutos)));
    });
    desenharRelogio();
  }

  /** Inicia a página do placar. */
  function iniciar() {
    carregar();
    prepararProjetos();
    prepararRelogio();
    pegar("botao-add-equipe").addEventListener("click", adicionarEquipe);
    pegar("nome-equipe").addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") adicionarEquipe();
    });
    pegar("botao-zerar-tudo").addEventListener("click", zerarTudo);
    desenhar();
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
