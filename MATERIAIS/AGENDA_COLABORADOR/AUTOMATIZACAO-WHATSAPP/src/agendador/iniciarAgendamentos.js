/**
 * Registra todas as tarefas periódicas e o reagendamento quando a configuração muda.
 */
import { AGENDADOR, ALERTAS, CHAVES_CONFIGURACAO, EVENTOS } from '../config/constantes.js';
import { criarTarefaResumoDiario } from './tarefas/resumoDiario.js';
import { criarTarefaLimpeza } from './tarefas/limpezaRetencao.js';

const NOMES = Object.freeze({
  RESUMO: 'resumo-diario',
  LIMPEZA: 'limpeza-retencao',
  ANALISE_IA: 'analise-ia',
  PERGUNTAS: 'perguntas-pendentes',
});

/** Configuração → tarefa a reagendar quando ela mudar. */
const REAGENDAMENTOS = Object.freeze({
  [CHAVES_CONFIGURACAO.HORARIO_RESUMO]: NOMES.RESUMO,
  [CHAVES_CONFIGURACAO.INTERVALO_ANALISE_MIN]: NOMES.ANALISE_IA,
});

/**
 * Agenda as tarefas e dispara a recuperação do resumo atrasado.
 * @param {{agendador: import('./agendador.js').Agendador, servicoResumo: object,
 *   servicoConfiguracoes: object, repositorios: object, motorAlertas: object,
 *   analisadorIa: object, barramento: import('node:events').EventEmitter,
 *   fusoHorario: string, logger: import('pino').Logger}} dependencias
 * @returns {void}
 */
export function iniciarAgendamentos(dependencias) {
  const { agendador, servicoConfiguracoes, barramento, logger } = dependencias;
  const resumoDiario = criarTarefaResumoDiario(dependencias);

  agendador.agendarDiario({
    nome: NOMES.RESUMO,
    obterHorario: () => servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.HORARIO_RESUMO),
    executar: resumoDiario,
  });
  agendador.agendarDiario({
    nome: NOMES.LIMPEZA,
    obterHorario: () => AGENDADOR.HORARIO_LIMPEZA,
    executar: criarTarefaLimpeza(dependencias),
  });
  agendador.agendarIntervalo({
    nome: NOMES.ANALISE_IA,
    obterIntervaloMs: () =>
      servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.INTERVALO_ANALISE_MIN) *
      AGENDADOR.MS_POR_MINUTO,
    executar: () => dependencias.analisadorIa.analisarPendentes(),
  });
  agendador.agendarIntervalo({
    nome: NOMES.PERGUNTAS,
    obterIntervaloMs: () => ALERTAS.INTERVALO_VERIFICACAO_PERGUNTAS_MS,
    executar: async () => dependencias.motorAlertas.verificarPeriodicas(),
  });

  barramento.on(EVENTOS.CONFIGURACAO_ALTERADA, ({ chaves }) => {
    chaves
      .filter((chave) => REAGENDAMENTOS[chave])
      .forEach((chave) => agendador.reagendar(REAGENDAMENTOS[chave]));
  });

  resumoDiario().catch((erro) =>
    logger.error({ erro: erro.message }, 'Recuperação do resumo falhou')
  );
}
