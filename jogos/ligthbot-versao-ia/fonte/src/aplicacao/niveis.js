// Carrega os níveis (JSON) da pasta src/niveis em ordem numérica.

const modulosDosNiveis = import.meta.glob("../niveis/nivel-*.json", {
  eager: true,
  import: "default",
});

/**
 * Lista os níveis do jogo na ordem do nome do arquivo (nivel-01, nivel-02...).
 * @returns {object[]} Dados de cada nível.
 */
export function listarNiveis() {
  return Object.keys(modulosDosNiveis)
    .sort()
    .map((caminho) => modulosDosNiveis[caminho]);
}
