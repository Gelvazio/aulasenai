/**
 * Janelas modais com <dialog> nativo.
 */
import { criarElemento } from '../dom.js';
import { TEXTOS } from '../constantes.js';
import { botao } from './basicos.js';

/**
 * Abre uma janela modal.
 * @param {{titulo: string, conteudo: Node[], acoes: {texto: string, variante?: string,
 *   aoClicar?: (fechar: Function) => void, tipo?: string}[], formulario?: boolean,
 *   aoEnviar?: (evento: SubmitEvent, fechar: Function) => void, aoFechar?: Function}} opcoes
 * @returns {() => void} Função que fecha a janela.
 */
export function abrirModal(opcoes) {
  const dialogo = criarElemento('dialog', { classe: 'modal', atributos: { 'aria-label': opcoes.titulo } });
  const fechar = () => {
    dialogo.close();
    dialogo.remove();
  };
  const acoes = opcoes.acoes.map((acao) =>
    botao({ ...acao, aoClicar: acao.aoClicar ? () => acao.aoClicar(fechar) : undefined })
  );
  const conteudo = criarElemento(opcoes.formulario ? 'form' : 'div', {
    classe: 'modal__conteudo',
    filhos: [
      criarElemento('h2', { texto: opcoes.titulo }),
      ...opcoes.conteudo,
      criarElemento('div', { classe: 'modal__acoes', filhos: acoes }),
    ],
  });
  if (opcoes.formulario) {
    conteudo.addEventListener('submit', (evento) => {
      evento.preventDefault();
      opcoes.aoEnviar(evento, fechar);
    });
  }
  dialogo.append(conteudo);
  dialogo.addEventListener('close', () => {
    dialogo.remove();
    opcoes.aoFechar?.();
  });
  document.body.append(dialogo);
  dialogo.showModal();
  return fechar;
}

/**
 * Pede confirmação ao usuário.
 * @param {{titulo: string, mensagem: string, textoConfirmar?: string}} opcoes
 * @returns {Promise<boolean>} true se confirmou.
 */
export function confirmar(opcoes) {
  return new Promise((resolver) => {
    abrirModal({
      titulo: opcoes.titulo,
      conteudo: [criarElemento('p', { texto: opcoes.mensagem })],
      aoFechar: () => resolver(false),
      acoes: [
        { texto: TEXTOS.CANCELAR, aoClicar: (fechar) => (resolver(false), fechar()) },
        {
          texto: opcoes.textoConfirmar || TEXTOS.CONFIRMAR,
          variante: 'primario',
          aoClicar: (fechar) => (resolver(true), fechar()),
        },
      ],
    });
  });
}
