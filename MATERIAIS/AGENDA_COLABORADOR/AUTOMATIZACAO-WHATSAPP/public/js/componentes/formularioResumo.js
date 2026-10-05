/**
 * Janela para gerar um resumo sob demanda (grupo, período e modelo).
 */
import { api } from '../api.js';
import { criarElemento } from '../dom.js';
import { TEMPOS, TEXTOS } from '../constantes.js';
import { formatarDolar, paraEntradaDataHora } from '../formatadores.js';
import { botao } from './basicos.js';
import { campoSelecao, campoTexto } from './campos.js';
import { abrirModal } from './modal.js';
import { mostrarAviso, mostrarErro } from './avisos.js';

/**
 * Calcula os atalhos de período.
 * @returns {{rotulo: string, desde: Date, ate: Date}[]} Atalhos.
 */
function calcularAtalhos() {
  const agora = new Date();
  const hoje = new Date(agora);
  hoje.setHours(0, 0, 0, 0);
  const ontem = new Date(hoje.getTime() - TEMPOS.MS_POR_DIA);
  return [
    { rotulo: 'Hoje', desde: hoje, ate: agora },
    { rotulo: 'Ontem', desde: ontem, ate: hoje },
    { rotulo: 'Últimas 24h', desde: new Date(agora.getTime() - TEMPOS.MS_POR_DIA), ate: agora },
    { rotulo: '7 dias', desde: new Date(agora.getTime() - 7 * TEMPOS.MS_POR_DIA), ate: agora },
  ];
}

/**
 * Cria os botões de atalho que preenchem o período.
 * @param {HTMLFormElement|null} obterFormulario - Função que devolve o formulário.
 * @returns {HTMLElement} Linha de atalhos.
 */
function criarAtalhos(obterFormulario) {
  return criarElemento('div', {
    classe: 'linha-acoes',
    filhos: calcularAtalhos().map((atalho) =>
      botao({
        texto: atalho.rotulo,
        pequeno: true,
        aoClicar: () => {
          const formulario = obterFormulario();
          formulario.elements.desde.value = paraEntradaDataHora(atalho.desde);
          formulario.elements.ate.value = paraEntradaDataHora(atalho.ate);
        },
      })
    ),
  });
}

/**
 * Lê o formulário e pede o resumo à API.
 * @param {HTMLFormElement} formulario - Formulário enviado.
 * @returns {Promise<object>} Resumo gerado.
 */
async function enviarPedido(formulario) {
  const campos = formulario.elements;
  return api.gerarResumo({
    grupo: campos.grupo.value,
    desde: new Date(campos.desde.value).toISOString(),
    ate: new Date(campos.ate.value).toISOString(),
    modelo: campos.modelo.value,
  });
}

/**
 * Abre o formulário de resumo.
 * @param {{grupos: {jid: string, nome: string}[], grupoInicial?: string,
 *   sistema: {modelos: string[], precos: object, iaConfigurada: boolean},
 *   modeloPadrao: string, aoGerado?: (resumo: object) => void}} opcoes
 * @returns {void}
 */
export function abrirFormularioResumo(opcoes) {
  if (!opcoes.sistema.iaConfigurada) {
    mostrarAviso(TEXTOS.IA_NAO_CONFIGURADA, 'atencao');
    return;
  }
  const atalho = calcularAtalhos()[0];
  let formulario = null;
  const conteudo = [
    campoSelecao({
      rotulo: 'Grupo',
      nome: 'grupo',
      valor: opcoes.grupoInicial,
      opcoes: opcoes.grupos.map((grupo) => ({ valor: grupo.jid, rotulo: grupo.nome || grupo.jid })),
    }),
    criarAtalhos(() => formulario),
    criarElemento('div', {
      classe: 'formulario',
      filhos: [
        campoTexto({ rotulo: 'De', nome: 'desde', tipo: 'datetime-local', valor: paraEntradaDataHora(atalho.desde), atributos: { required: true } }),
        campoTexto({ rotulo: 'Até', nome: 'ate', tipo: 'datetime-local', valor: paraEntradaDataHora(atalho.ate), atributos: { required: true } }),
      ],
    }),
    campoSelecao({
      rotulo: 'Modelo de IA',
      nome: 'modelo',
      valor: opcoes.modeloPadrao,
      opcoes: opcoes.sistema.modelos.map((modelo) => ({
        valor: modelo,
        rotulo: `${modelo} (${formatarDolar(opcoes.sistema.precos[modelo].entrada)}/${formatarDolar(opcoes.sistema.precos[modelo].saida)} por milhão de tokens)`,
      })),
    }),
  ];
  abrirModal({
    titulo: 'Gerar resumo',
    formulario: true,
    conteudo,
    acoes: [
      { texto: TEXTOS.CANCELAR, aoClicar: (fechar) => fechar() },
      { texto: 'Gerar', variante: 'primario', tipo: 'submit' },
    ],
    aoEnviar: async (evento, fechar) => {
      const enviar = evento.submitter;
      enviar.disabled = true;
      enviar.textContent = 'Gerando…';
      try {
        const resumo = await enviarPedido(evento.target);
        mostrarAviso('Resumo gerado.');
        fechar();
        opcoes.aoGerado?.(resumo);
      } catch (erro) {
        mostrarErro(erro);
        enviar.disabled = false;
        enviar.textContent = 'Gerar';
      }
    },
  });
  formulario = document.querySelector('dialog.modal form');
}
