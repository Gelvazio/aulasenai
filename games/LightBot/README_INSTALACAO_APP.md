# Instalação e geração do executável — Light Bot

O fonte é C++ (C++17) com a SFML 3 (portado da SFML 2 na tarefa #347) e já traz um `Makefile`. Os passos abaixo são para Windows,
usando o MSYS2.

## 1. Instalar o MSYS2

1. Baixe e instale o MSYS2 em <https://www.msys2.org>.
2. Abra o terminal **MSYS2 UCRT64**.

## 2. Instalar compilador, make e SFML

```bash
pacman -S --needed mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-make mingw-w64-ucrt-x86_64-sfml
```

## 3. Compilar

```bash
cd /c/fontes/aulasenai/games/LightBot
mingw32-make
```

O `Makefile` usa `-std=c++17` e liga com `-lsfml-graphics -lsfml-window -lsfml-system`.
O resultado é o `LightBot.exe` na própria pasta.

## 4. Executar

Execute a partir da pasta do jogo, para ele encontrar `resources/` e `levels/`:

```bash
./LightBot.exe
```

## 5. Rodar fora do MSYS2

Copie para a pasta do `.exe` as DLLs que ele precisa (`sfml-*.dll`, `libstdc++-6.dll`,
`libgcc_s_seh-1.dll`, `libwinpthread-1.dll`), que ficam em `C:\msys64\ucrt64\bin`.
Para ver a lista exata:

```bash
ldd LightBot.exe
```

## 6. Limpar arquivos temporários

```bash
mingw32-make clean
```

Apaga só os `.o` (o alvo `clean` usa `rm`, então funciona apenas dentro do MSYS2).

## Alternativa: Qt Creator

Abra o `Interface.pro` no Qt Creator (Qt com MinGW, com a SFML configurada no projeto) e use
**Build → Release**.

## Observação

A compilação foi conferida no MSYS2 UCRT64 (GCC + SFML 3.0.2): gera o `LightBot.exe` sem erros.
A execução do jogo na tela ainda deve ser testada por quem for jogar.
