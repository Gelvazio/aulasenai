## Etapa 580-9c2e5a74 — #433: CONCEITOS-AULA como PWA com modo apresentação (caneta de slide)

**Tarefa:** #433-9c2e5a74 · **Pedido em:** 2026-10-29 10:12 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "tem como estruturar este arquivo, pra ele funcionar em forma de PWA, pra eu usar a caneta de slide?" (arquivo = `TESTES-DE-FRONTEND/AULAS/CONCEITOS-AULA.html`, #432).
**Objetivo:** a página instalável (PWA, funciona offline) com modo apresentação em tela cheia, um card por slide, avançando e voltando com as teclas que a caneta de slide envia (PageDown/PageUp e setas).

### Escopo
- Entra: `CONCEITOS-AULA-PWA/manifest.webmanifest`, `icone.svg`, `apresentacao.js`; `AULAS/conceitos-aula-sw.js` (service worker na pasta da página, para ter escopo sobre ela); ajustes no `CONCEITOS-AULA.html` (manifest, botão Apresentar, CSS do modo apresentação).
- Entra: teclas — avançar: PageDown, →, ↓, Espaço, Enter; voltar: PageUp, ←, ↑, Backspace; Home/End; F ou F5 tela cheia; Esc sai; B ou . tela preta (botão "tela preta" de caneta). Toque: deslizar e tocar nas bordas.
- Não entra: ligar a página a qualquer menu/índice/banco (continua sem links); outras aulas; ponteiro laser desenhado na tela.

### Riscos
- `.vercelignore` tem `*.png`: ícone PNG não iria ao ar; por isso o ícone é SVG.
- PWA exige HTTPS ou localhost (a Vercel serve em HTTPS; `file://` não instala).
- A caneta varia: modelos que enviam só PageUp/PageDown funcionam; os que emulam mouse avançam pelo toque nas bordas.

### Decisões
- 2026-10-29 — Pedido direto do usuário em chat. Sem banco e sem segurança: tarefa pequena a média; vale como "sim".
- 2026-10-29 — Sem `<a>` nem navegação para fora; o manifest é metadado, não link visível.

### #433.1 — PWA (manifest, ícone SVG, service worker) e modo apresentação

**Próximo passo:** (entregue) — nada.

- **Nível:** MEDIO — classificado pela matriz (Jev: confiança 0,64 na mensagem; sinal de mais de 3 arquivos pequenos, sem banco nem segurança)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** slides = capa + cada card (com o título da seção); contador e barra de progresso; cache offline do HTML, manifest, ícone e JS.
- **Critérios de aceitação:** manifest válido (JSON); `node --check` ok no JS e no service worker; nenhum `<a>`; PageDown/PageUp navegam em modo apresentação; `prefers-reduced-motion` respeitado.
- **Entrega:** `AULAS/CONCEITOS-AULA.html` (manifest, botão Apresentar, painel, CSS do modo), `AULAS/CONCEITOS-AULA-PWA/` (`manifest.webmanifest`, `icone.svg`, `apresentacao.js`) e `AULAS/conceitos-aula-sw.js` · **Verificação:** `node --check` ok no JS e no service worker; manifest e SVG válidos; 0 `<a>`; linhas até 100 caracteres (exceto URL das fontes). Teclas, instalação e offline só o usuário confirma no navegador (HTTPS ou localhost).
