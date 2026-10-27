---
name: atividade-dinamica-3d
description: Cria uma Atividade Dinâmica feita no computador com three.js (Modo digital-3d) do projeto Aulas SENAI, do Markdown da aula até o seed bloqueado. Use quando pedirem atividade dinâmica no PC, tela 3D, raio-x visual ou redesenho de interface em uma aula.
---

# Atividade Dinâmica no PC (digital-3d)

Regra completa: `docs/regras/atividade-dinamica.md`. Esta skill só ensina a sequência. Não repita a regra aqui.

## 1. Quando usar

- Pedido de atividade dinâmica para uma aula, com o modo no computador (three.js).
- ⛔ Sem o Markdown da aula em `CONTEUDO/` (`materias-global.md`): aguardar e avisar. Nunca gerar a partir de PDF ou PPTX.
- Contexto: "Você como aluno consultor" (`atividades-banco.md`). ⛔ Sem empresa fictícia.

## 2. Ordem de entrega

1. Tarefa no quadro (`tasks/`), com nível, modelo e effort. Reservar antes de ler código.
2. Módulo de dados da aula: `assets/js/dinamica-3d-aula-NN.js`.
3. Markdown da fonte: `ATIVIDADES/CONTEUDO/ATIVIDADE-DINAMICA-AULA-NN.md`.
4. Gerar a página.
5. Seed (nasce bloqueado).
6. Conferir.

## 3. Fonte em Markdown

Arquivo `ATIVIDADES/CONTEUDO/ATIVIDADE-DINAMICA-AULA-NN.md`, com o campo `- **Modo:** digital-3d`
logo abaixo de `- **Estilo:**`. Modelo real:
`MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/CONTEUDO/ATIVIDADE-DINAMICA-AULA-02.md`.

Seções: `## OBJETIVO`, `## FORMATOS` (os 4: individual, em duplas, em grupos, turma toda),
`## ROTEIRO` (ao menos 2 momentos), `## FICHA` (ao menos 1 campo) e `## CRITÉRIOS DE NOTA`
(pontos somando 10). Sem `Modo: digital-3d`, o gerador usa o papel.

## 4. Módulo de dados da aula

Arquivo `assets/js/dinamica-3d-aula-NN.js`. Modelo: `assets/js/dinamica-3d-aula-02.js`.
Chamada única:

```js
registrarDinamica3d('NN', { tela, instrucoes, ficha, checklist });
```

- `tela`: lista de elementos. Cada um tem `{ id, forma, x, y, largura, altura, cor, preenchido, raio, rotulo }`.
  `forma` é `retangulo`, `circulo` ou `triangulo`.
- Coordenadas: tela 360 x 640, origem no centro, y para cima.
- `instrucoes`: `raiox`, `redesenho`, `ficha` (textos em português, com "você, como aluno consultor").
- `ficha`: lista de `{ id, rotulo, dica }`. `checklist`: lista de textos.
- ⛔ Sem gabarito nos dados. Os problemas de hierarquia não ficam marcados no arquivo.
- Constantes de cor no topo do arquivo; funções com JSDoc; nomes em português.

## 5. Módulos reutilizáveis (não recriar)

- `assets/js/dinamica-3d-{formas,estado,cena,ferramentas,painel,interface,controle,pagina}.js`
- `assets/js/entrega-dinamica-repositorio.js` e `assets/js/entrega-dinamica-professor.js`
- `assets/css/dinamica-3d.css`

Se uma aula precisar de forma ou ferramenta nova, a mudança vai no módulo comum, não no arquivo da aula.

## 6. Gerar a página

```
C:\Python314\python.exe assets\gerador-atividade-dinamica\gerar_atividade_dinamica.py <pasta ATIVIDADES> ATIVIDADE-DINAMICA-AULA-NN.md
```

- Com `Modo: digital-3d`, o gerador usa `template_atividade_dinamica_3d.html`.
- Saída: `ATIVIDADE-DINAMICA-AULA-NN.html` na pasta ATIVIDADES, e o seed em
  `database/<data>-<nome>-seed-atividades.sql`.
- O seed nasce com `ativo = false` (bloqueado). ⛔ Não mudar esse bloqueio: o professor libera no índice.
- Se o seed gerado for igual a um já aplicado, descartar o arquivo novo.

## 7. Banco

- Tabela `entrega_dinamica`, em `database/2026-10-27-entrega-dinamica.sql`, com RLS. A nota
  do professor vai em `nota_dinamica` (`database/2026-10-26-nota-dinamica.sql`) e entra na Média Final.
- Aplicar seed e alterar banco: só o Claude Code local, com a regra de seeds (`seeds.md`).
  Na nuvem, deixar recado em `tasks/RECADOS.md`.

## 8. Nunca

- ⛔ Abrir navegador ou iniciar servidor para ver a página (`testes-validacao.md`).
- ⛔ Escrever teste automatizado.
- ⛔ Gabarito ou resposta certa nos dados ou na página do aluno (`security-banco.md`).
- ⛔ Empresa fictícia no enunciado.
- ⛔ Mudar o bloqueio (`ativo`) da atividade.
- ⛔ Regerar `.claude/rules/index.html` (`visualizador-regras.md`).

## 9. Conferência

```
node --check assets/js/dinamica-3d-aula-NN.js
node --check assets/js/dinamica-3d-*.js
C:\Python314\python.exe -m py_compile assets\gerador-atividade-dinamica\gerar_atividade_dinamica.py
```

Depois, `grep` na página gerada: deve achar `dinamica-3d-controle.js`, `dinamica-3d-aula-NN.js` e
`dinamica-3d.css`. Confirmar também que o seed tem `ativo = false`. Sem navegador: o usuário confere a tela.
