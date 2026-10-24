# Capítulo 18 — Mock-ups digitais e processo de criação

- **Aula:** 18
- **Capacidade:** C2, S4

## Teoria

### O salto para o digital

Depois de validar o protótipo de papel e o storyboard, chega a hora de dar forma, cor e acabamento
profissional à interface. Não começamos direto no computador porque testar no papel corrige
fluxos em minutos — o digital entra quando a estrutura já foi validada.

### Níveis de fidelidade em UI

| Fidelidade | Características |
|---|---|
| **Baixa** | Estrutura e fluxo: papel ou wireframes em tons de cinza, sem cor nem foto |
| **Média** | Alinhamento e proporções exatos no software, ainda sem paleta definitiva |
| **Alta** | O mock-up final: cores, tipografia, ícones, fotos e contrastes pixel a pixel |

### O que é um mock-up digital

Um **mock-up** é um modelo estático de alta fidelidade que mostra exatamente como a interface
ficará quando lançada. Não tem código nem banco de dados: serve para inspecionar hierarquia,
harmonia de cores e legibilidade — e orienta os desenvolvedores front-end sobre espaçamentos e
estilos exatos. O mock-up responde: "como essa tela vai ficar visualmente?"

### Anatomia de um editor gráfico

Ferramentas de design compartilham uma estrutura universal (sem impor marca):

| Painel | Função |
|---|---|
| Prancheta (canvas) | Espaço de tela com as dimensões exatas do dispositivo (ex.: 375×812 px) |
| Barra de criação | Retângulo, elipse, linha, texto e caneta para construir botões e cartões |
| Painel de camadas | Árvore que lista todos os objetos, ordenados de baixo para cima |
| Painel de estilos | Preenchimento, contorno, raio de borda, opacidade, fonte e alinhamento |

### A lógica das camadas

Como folhas de acetato, os elementos ficam numa ordem de empilhamento: retângulos de fundo na
base da lista, textos e ícones no topo. Agrupar elementos relacionados e nomear camadas evita o
caos quando o arquivo cresce.

### Transposição: do papel ao software

Ao passar o esboço para o editor, aplicamos tudo o que estudamos:

- **Formas geométricas (cap. 2):** retângulos viram botões e cartões; círculos, avatares e
  selos;
- **Cores e contraste (cap. 3):** fundo e texto respeitam o mínimo de 4,5:1;
- **Padrão de leitura (cap. 7):** informações cruciais no padrão Z ou F;
- **Espaçamento (cap. 8):** múltiplos de 8 px e hierarquia tipográfica do guia visual;
- **Estados e eventos (cap. 9):** a tela mostra o estado padrão, com variações documentadas.

### O processo de criação (7.6)

O processo de criação da interface segue etapas registradas — o que permite justificar cada
escolha no relatório:

1. **Referências** — reunir telas e padrões que resolvem problemas parecidos;
2. **Estrutura** — montar o wireframe digital (média fidelidade) a partir do protótipo de papel
   validado;
3. **Aplicação do guia visual** — paleta de 5 cores, escala tipográfica, espaçamentos de 8 px e
   componentes repetidos;
4. **Revisão de acessibilidade** — contraste conferido, áreas de toque ≥ 48 px, rótulos visíveis;
5. **Registro e entrega** — documentar o que mudou do papel para o digital e por quê.

**Componentes reutilizáveis:** botões, cartões e campos criados uma vez viram componentes
repetidos em todas as telas — a repetição garante consistência e acelera alterações.

### Estudo de caso (SA 3): o mock-up do agendamento

Com o escopo fechado (capítulo 16), o mock-up digital das telas principais do agendamento é
produzido: tela inicial com padrão Z, grade de horários livres em verde, botão primário de alto
contraste com 48 px e tela de confirmação com comprovante. Cada decisão visual cita o capítulo
que a fundamenta — e o processo fica registrado para a avaliação prática.

## Resumo

- Mock-up digital é a representação estática de alta fidelidade da interface — sem código, mas
  fiel ao produto final.
- A fidelidade evolui: baixa (estrutura) → média (proporções) → alta (cores, fontes e fotos
  finais).
- O editor gráfico tem prancheta com medidas exatas, barra de criação, painel de camadas e painel
  de estilos; a ordem das camadas define o empilhamento visual.
- A transposição do papel ao digital aplica formas, contraste, padrão de leitura, espaçamento de
  8 px e o guia visual do projeto.
- O processo de criação — referências, estrutura, guia visual, revisão de acessibilidade e
  registro — deixa cada escolha documentada.
- Componentes reutilizáveis mantêm consistência e aceleram mudanças em todas as telas.

## Glossário

- **Mock-up:** imagem estática e fiel de como as telas vão ficar.
- **Alta fidelidade:** protótipo visual detalhado, com cores, tipografia e acabamento finais.
- **Camada (layer):** nível de empilhamento onde cada elemento reside e pode ser ordenado.
- **Componente:** elemento de interface reutilizável em várias telas do sistema.
- **Guia visual (style guide):** documento que registra cores, tipografia, espaços e formas do
  projeto.
- **Prancheta (canvas):** área de desenho com as dimensões exatas do dispositivo alvo.
