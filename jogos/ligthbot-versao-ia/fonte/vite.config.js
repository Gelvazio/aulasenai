import { defineConfig } from "vite";

const PASTA_SAIDA = "../";
const BASE_RELATIVA = "./";

/**
 * O site é estático e a Vercel não roda o build: a saída vai para a pasta do jogo
 * (um nível acima da fonte) para que ligthbot-versao-ia/index.html abra direto.
 */
export default defineConfig({
  base: BASE_RELATIVA,
  build: {
    outDir: PASTA_SAIDA,
    emptyOutDir: false,
    assetsDir: "assets",
  },
});
