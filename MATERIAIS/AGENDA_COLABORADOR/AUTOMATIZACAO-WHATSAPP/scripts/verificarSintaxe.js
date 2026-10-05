/**
 * Roda `node --check` em todos os arquivos .js de src/, public/ e scripts/.
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const PASTAS = ['src', 'public', 'scripts'];

/**
 * Lista recursivamente os arquivos .js de uma pasta.
 * @param {string} pasta - Pasta inicial.
 * @returns {string[]} Caminhos dos arquivos.
 */
function listarArquivosJs(pasta) {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = join(pasta, entrada.name);
    if (entrada.isDirectory()) return listarArquivosJs(caminho);

    return entrada.name.endsWith('.js') ? [caminho] : [];
  });
}

/**
 * Verifica a sintaxe de todos os arquivos e encerra com código 1 se algum falhar.
 * @returns {void}
 */
function verificar() {
  const arquivos = PASTAS.flatMap(listarArquivosJs);
  const falhas = arquivos.filter((arquivo) => {
    const resultado = spawnSync(process.execPath, ['--check', arquivo], { stdio: 'inherit' });
    return resultado.status !== 0;
  });

  console.log(`Sintaxe verificada: ${arquivos.length} arquivos, ${falhas.length} com erro.`);
  if (falhas.length > 0) process.exit(1);
}

verificar();
