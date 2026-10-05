# Etapa 01 — Fundação do projeto

**Objetivo:** Estrutura de pastas, package.json, configs, constantes, ambiente e utilitários.
**Tech Stack:** Node.js 24 (ESM), pino, ESLint 10 (flat config), Prettier 3.
**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1.1 | `package.json` + dependências (baileys 7.0.0-rc14, qrcode 1.5.4, pino 10.4.0) | ✅ Concluído |
| 1.2 | `.gitignore`, `.env.example`, `.prettierrc`, `.prettierignore` | ✅ Concluído |
| 1.3 | Árvore de pastas `src/`, `public/`, `docs/`, `dados/`, `scripts/` | ✅ Concluído |
| 1.4 | `src/config/constantes.js` | ✅ Concluído |
| 1.5 | `src/config/ambiente.js` | ✅ Concluído |
| 1.6 | `src/utilitarios/{logger,datas,texto,erros}.js` | ✅ Concluído |
| 1.7 | `eslint.config.js` + `scripts/verificarSintaxe.js` + scripts npm | ✅ Concluído |
| 1.8 | Commit | ✅ Concluído |

## Verificação

```powershell
npm ls --depth=0          # 7 pacotes
git check-ignore .env dados/x
npm run verificar         # 0 erros de sintaxe e lint
```
