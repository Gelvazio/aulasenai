## Etapa 476-3a7e9b14 — Portar o LightBot para a SFML 3

**Tarefa:** #347-3a7e9b14 · **Pedido em:** 2026-10-22 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "faça a edicao necessaria" (depois de o `mingw32-make` falhar: o MSYS2 só tem a SFML 3.0.2 e o código usa a API da SFML 2)
**Objetivo:** fazer o `games/LightBot` compilar no MSYS2 UCRT64 com a SFML 3 e gerar o `LightBot.exe`.

### #347.1 — Portar o código do LightBot para a SFML 3 e compilar

**Próximo passo:** trocar `-std=c++11` por `-std=c++17` no `Makefile`; migrar o laço de eventos de `Application.cpp`
(`pollEvent` retorna `std::optional`, `is<>()`/`getIf<>()`); `loadFromFile` → `openFromFile` nas fontes;
`sf::Text` e `sf::Sprite` sem construtor padrão (`Button`, `Grid`, `Interface`, `ProgramBox`, `Theme`);
compilar com `mingw32-make` e corrigir os erros restantes.

- **Nível:** PESADO — mais de 3 arquivos ligados (Makefile + 6 `.cpp`/`.h`) com mudança de API de biblioteca.
- **Modelo:** Sonnet, Opus 5.5+ ou Fable (C48, 2026-10-22)
- **Effort:** high
- **Descrição:** migração SFML 2 → 3 do clone em `games/LightBot`, sem mudar o comportamento do jogo.
- **Critérios de aceitação:** `mingw32-make` gera `games/LightBot/LightBot.exe` no MSYS2 UCRT64 sem erros; o jogo abre
  e as fases carregam. `README_INSTALACAO_APP.md` atualizado (C++17, SFML 3).
- **Entrega:** `Makefile` (C++17), `Application.cpp` (eventos `std::optional`), `Button/Grid/Interface/ProgramBox/Theme` (`openFromFile`, `setFillColor`, `Text`/`Sprite` com `Utils::emptyFont/emptyTexture`, `setOrigin`/`setPosition` com vetor, `sf::degrees`), `Utils` (`std::sin`) e `README_INSTALACAO_APP.md` · **Verificação:** `mingw32-make` no MSYS2 UCRT64 gerou `games/LightBot/LightBot.exe` sem erros e o `ldd` achou as DLLs da SFML 3; execução na tela fica para o usuário (sem abrir janela aqui).
