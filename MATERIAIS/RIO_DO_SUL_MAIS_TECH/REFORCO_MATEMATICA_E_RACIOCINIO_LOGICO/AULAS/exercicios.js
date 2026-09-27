// Banco de exercícios — Reforço de Matemática e Raciocínio Lógico
// 20 exercícios por módulo (140 total)

const EXERCICIOS = {
  modulo1: [
    { capacidade: "Organizar informações | Autonomia", contexto: "Você está fazendo compras e precisa calcular o preço total.", comando: "Calcule: 25 + 18 - 7 × 2" },
    { capacidade: "Cálculo mental | Autonomia", contexto: "Uma loja vende camisetas por R$ 45. Você compra 3.", comando: "Qual o total gasto?" },
    { capacidade: "Resolução de problemas | Raciocínio", contexto: "Você tem R$ 100 e gasta R$ 35. Depois recebe R$ 50.", comando: "Quanto você tem agora?" },
    { capacidade: "Ordem das operações | Compreensão", contexto: "Resolva respeitando a ordem correta.", comando: "10 + 5 × 2 - 3 = ?" },
    { capacidade: "Números negativos | Autonomia", contexto: "Um termômetro marca -5°C de manhã e sobe 12°C.", comando: "Qual é a temperatura?" },
    { capacidade: "Operações básicas | Fluência", contexto: "Você emprestou R$ 200 e paga em 4 parcelas iguais.", comando: "Quanto é cada parcela?" },
    { capacidade: "Cálculo | Autonomia", contexto: "Uma fábrica produziu 1500 produtos e vendeu 890.", comando: "Quantos sobraram?" },
    { capacidade: "Multiplicação | Compreensão", contexto: "Cada livro custa R$ 35 e você precisa de 6.", comando: "Qual o custo total?" },
    { capacidade: "Divisão | Fluência", contexto: "Distribua 144 maçãs em 12 cestas igualmente.", comando: "Quantas maçãs por cesta?" },
    { capacidade: "Subtração | Autonomia", contexto: "Uma corrida tem 42 km. Você correu 18 km.", comando: "Quanto falta?" },
    { capacidade: "Adição | Raciocínio", contexto: "João tem 25 figurinhas, Maria 38, Pedro 19.", comando: "Total de figurinhas?" },
    { capacidade: "Operações | Compreensão", contexto: "Você ganha R$ 1500/mês. Gasta R$ 400 aluguel, R$ 300 comida, R$ 200 transporte.", comando: "Quanto sobra?" },
    { capacidade: "Cálculo mental | Autonomia", contexto: "Um carro custa R$ 35000, você tem R$ 12000.", comando: "Quanto falta?" },
    { capacidade: "Multiplicação | Fluência", contexto: "Uma caixa tem 24 ovos. Você compra 8 caixas.", comando: "Quantos ovos?" },
    { capacidade: "Divisão | Raciocínio", contexto: "Um rolo tem 60m de fio. Você precisa de pedaços de 5m.", comando: "Quantos pedaços?" },
    { capacidade: "Ordem das operações | Autonomia", contexto: "Calcule respeitando a ordem.", comando: "50 - 10 ÷ 2 + 3 × 4 = ?" },
    { capacidade: "Números negativos | Compreensão", contexto: "A temperatura era -8°C e caiu 5°C.", comando: "Qual é agora?" },
    { capacidade: "Operações | Fluência", contexto: "Uma fábrica produz 250 produtos/dia. Quantos em 15 dias?", comando: "Calcule." },
    { capacidade: "Subtração | Raciocínio", contexto: "Você tinha R$ 500, gastou R$ 125 + R$ 80.", comando: "Quanto sobrou?" },
    { capacidade: "Multiplicação e divisão | Autonomia", contexto: "Você tem R$ 360 e quer dividir com 9 pessoas.", comando: "Quanto cada um recebe?" }
  ],
  modulo2: [
    { capacidade: "Frações | Autonomia", contexto: "Converta frações em decimais.", comando: "Converta 3/8 em decimal." },
    { capacidade: "Frações | Compreensão", contexto: "Uma pizza é dividida em 8 fatias. Você come 3.", comando: "Qual fração comeu?" },
    { capacidade: "Porcentagem | Autonomia", contexto: "Um produto custava R$ 100 com 20% desconto.", comando: "Qual é o novo preço?" },
    { capacidade: "Decimais | Fluência", contexto: "Você tem 2,5m de tecido e usa 1,3m.", comando: "Quanto sobra?" },
    { capacidade: "Conversão | Autonomia", contexto: "Converta 25% em número decimal.", comando: "Qual é o resultado?" },
    { capacidade: "Frações | Compreensão", contexto: "Se 1/4 de um número é 15.", comando: "Qual é o número completo?" },
    { capacidade: "Porcentagem | Fluência", contexto: "Uma turma tem 40 alunos, 75% passaram.", comando: "Quantos passaram?" },
    { capacidade: "Decimais | Autonomia", contexto: "Você pesa 62,5kg e quer ganhar 2,3kg.", comando: "Qual será seu peso?" },
    { capacidade: "Conversão | Raciocínio", contexto: "Converta 3/5 em porcentagem.", comando: "Qual é?" },
    { capacidade: "Desconto | Autonomia", contexto: "Uma camisa custa R$ 80 com 15% desconto.", comando: "Qual o preço final?" },
    { capacidade: "Aumento | Compreensão", contexto: "Um salário era R$ 2000, aumento 10%.", comando: "Qual é o novo?" },
    { capacidade: "Comparação | Fluência", contexto: "Qual é maior: 2/5 ou 3/7?", comando: "Compare." },
    { capacidade: "Operação com decimais | Autonomia", contexto: "Você tem R$ 5,50 e gasta R$ 2,75.", comando: "Quanto sobra?" },
    { capacidade: "Fração de quantidade | Raciocínio", contexto: "Qual é 2/3 de 90?", comando: "Calcule." },
    { capacidade: "Porcentagem aumento | Autonomia", contexto: "O aluguel era R$ 500, aumentou 8%.", comando: "Qual é o novo?" },
    { capacidade: "Decimal para fração | Compreensão", contexto: "Converta 0,25 em fração.", comando: "Qual é?" },
    { capacidade: "Operação com frações | Fluência", contexto: "Calcule 1/2 + 1/4.", comando: "Qual é?" },
    { capacidade: "Porcentagem | Autonomia", contexto: "Você acertou 18 de 20 questões.", comando: "Qual porcentagem?" },
    { capacidade: "Desconto múltiplo | Raciocínio", contexto: "Um produto com 20% desconto, depois 10%.", comando: "Qual desconto total?" },
    { capacidade: "Aplicação prática | Compreensão", contexto: "Celular custa R$ 1200, 5% desconto à vista.", comando: "Quanto vai pagar?" }
  ],
  modulo3: [
    { capacidade: "Razão e proporção | Autonomia", contexto: "5 metros de tecido custam R$ 35.", comando: "Quanto custam 8 metros?" },
    { capacidade: "Proporção | Compreensão", contexto: "Receita para 4 pessoas usa 200g farinha, para 6?", comando: "Quanto de farinha?" },
    { capacidade: "Escala | Fluência", contexto: "No mapa, 1cm = 10km. Distância no mapa é 5cm.", comando: "Qual distância real?" },
    { capacidade: "Regra de três | Autonomia", contexto: "10 operários fazem obra em 15 dias, 6 operários?", comando: "Quantos dias?" },
    { capacidade: "Proporção | Raciocínio", contexto: "Proporção meninos:meninas é 3:2. Com 12 meninos?", comando: "Quantas meninas?" },
    { capacidade: "Velocidade e distância | Autonomia", contexto: "Carro percorre 120km em 2h. Em 5 horas?", comando: "Quantos km?" },
    { capacidade: "Mistura e proporção | Compreensão", contexto: "Suco: 1 concentrado para 4 água. Para 5L?", comando: "Quanto concentrado?" },
    { capacidade: "Escala | Fluência", contexto: "Maquete 20cm representa prédio 80m.", comando: "Qual proporção?" },
    { capacidade: "Dividir proporcionalmente | Autonomia", contexto: "Dividir R$ 1500 entre 3 pessoas em 2:3:5.", comando: "Quanto cada uma?" },
    { capacidade: "Regra de três inversa | Raciocínio", contexto: "5 máquinas fazem 100 peças em 8h, 8 máquinas?", comando: "Quantas horas?" },
    { capacidade: "Proporção | Autonomia", contexto: "Razão comprimento:largura é 4:3. Largura 15cm?", comando: "Qual comprimento?" },
    { capacidade: "Compra com proporção | Compreensão", contexto: "3 camisetas custam R$ 90. 7 camisetas?", comando: "Qual o valor?" },
    { capacidade: "Escala de mapa | Fluência", contexto: "Escala 1:500000, cidades 8cm no mapa.", comando: "Distância real?" },
    { capacidade: "Proporção ingredientes | Autonomia", contexto: "Tinta: 3 tinta para 2 diluente. 5L tinta?", comando: "Quanto diluente?" },
    { capacidade: "Razão | Raciocínio", contexto: "Razão meninos:meninas é 5:4. 20 meninos?", comando: "Quantas meninas?" },
    { capacidade: "Regra de três | Autonomia", contexto: "2kg café custam R$ 50. 5kg?", comando: "Qual preço?" },
    { capacidade: "Proporção de trabalho | Compreensão", contexto: "3 operários fazem em 12 dias, em 4 dias?", comando: "Quantos operários?" },
    { capacidade: "Escala | Fluência", contexto: "Desenho 1:25. Desenho 8cm = tamanho real?", comando: "Qual tamanho?" },
    { capacidade: "Proporção receita | Autonomia", contexto: "3 ovos para 2 xícaras farinha, 5 ovos?", comando: "Quanto de farinha?" },
    { capacidade: "Divisão proporcional | Raciocínio", contexto: "Investimento R$ 300, R$ 500, R$ 700. Lucro R$ 1200.", comando: "Quanto cada um?" }
  ],
  modulo4: [
    { capacidade: "Conversão comprimento | Autonomia", contexto: "3500 metros para quilômetros.", comando: "Quantos km?" },
    { capacidade: "Conversão | Compreensão", contexto: "Um tecido mede 250cm. Quantos metros?", comando: "Converta." },
    { capacidade: "Conversão massa | Fluência", contexto: "Uma receita pede 500g açúcar. Quantos kg?", comando: "Converta." },
    { capacidade: "Conversão capacidade | Autonomia", contexto: "Um tanque tem 3000mL. Quantos litros?", comando: "Quantos L?" },
    { capacidade: "Cálculo área | Raciocínio", contexto: "Terreno 20m × 15m de comprimento e largura.", comando: "Qual área?" },
    { capacidade: "Cálculo perímetro | Autonomia", contexto: "Um quadrado tem lado 8m.", comando: "Qual perímetro?" },
    { capacidade: "Conversão múltipla | Compreensão", contexto: "Uma pessoa mede 1,75m. Em centímetros?", comando: "Qual altura?" },
    { capacidade: "Conversão temperatura | Fluência", contexto: "37°C é temperatura normal do corpo?", comando: "Identifique." },
    { capacidade: "Cálculo volume | Autonomia", contexto: "Caixa 4m × 3m × 2m.", comando: "Qual volume?" },
    { capacidade: "Conversão unidades | Raciocínio", contexto: "Uma estrada tem 75km. Em metros?", comando: "Qual distância?" },
    { capacidade: "Área de formas | Autonomia", contexto: "Círculo raio 5m (π ≈ 3,14).", comando: "Qual área?" },
    { capacidade: "Perímetro de formas | Compreensão", contexto: "Retângulo 12cm × 8cm.", comando: "Qual perímetro?" },
    { capacidade: "Conversão peso | Fluência", contexto: "Um produto pesa 2500g. Quantos kg?", comando: "Converta." },
    { capacidade: "Cálculo área triângulo | Autonomia", contexto: "Triângulo base 10cm, altura 6cm.", comando: "Qual área?" },
    { capacidade: "Conversão distância | Raciocínio", contexto: "Maratona 42,195km. Em metros?", comando: "Qual distância?" },
    { capacidade: "Volume cilindro | Autonomia", contexto: "Cilindro raio 3m, altura 5m (π ≈ 3,14).", comando: "Qual volume?" },
    { capacidade: "Conversão capacidade | Compreensão", contexto: "Copo 250mL. Quantos completam 2L?", comando: "Quantos copos?" },
    { capacidade: "Área retângulo | Fluência", contexto: "Sala 6m × 5m.", comando: "Qual área?" },
    { capacidade: "Conversão tempo | Autonomia", contexto: "Filme 150 minutos. Quantas horas?", comando: "Converta." },
    { capacidade: "Aplicação prática | Raciocínio", contexto: "Parede 4m × 3m com azulejos 0,5m × 0,5m.", comando: "Quantos azulejos?" }
  ],
  modulo5: [
    { capacidade: "Padrões | Autonomia", contexto: "Sequência 1, 1, 2, 3, 5, 8...", comando: "Próximo número?" },
    { capacidade: "Padrões numéricos | Compreensão", contexto: "Sequência 2, 4, 8, 16, 32...", comando: "Próximo?" },
    { capacidade: "Lógica | Fluência", contexto: "Todos os pássaros têm penas, pinguim é pássaro.", comando: "Conclusão?" },
    { capacidade: "Sequências | Autonomia", contexto: "5, 10, 20, 40...", comando: "Próximo?" },
    { capacidade: "Raciocínio dedutivo | Raciocínio", contexto: "Todos quadrados têm 4 lados iguais, figura tem 4.", comando: "É quadrado?" },
    { capacidade: "Problemas lógicos | Autonomia", contexto: "João > Maria, Maria > Pedro.", comando: "Quem é mais baixo?" },
    { capacidade: "Sudoku e puzzles | Compreensão", contexto: "3×3 sudoku, primeira linha tem 1 e 2.", comando: "Que números faltam?" },
    { capacidade: "Analogias | Fluência", contexto: "Cachorro está para latido assim como gato...", comando: "Complete." },
    { capacidade: "Probabilidade | Autonomia", contexto: "Baralho, probabilidade tirar ás?", comando: "Calcule." },
    { capacidade: "Lógica | Raciocínio", contexto: "A=B e B=C, então A=C. Verdadeiro?", comando: "Responda." },
    { capacidade: "Sequências letras | Autonomia", contexto: "A, C, E, G...", comando: "Próxima letra?" },
    { capacidade: "Problemas | Compreensão", contexto: "Torneira enche em 4h, outra em 6h.", comando: "Com as duas?" },
    { capacidade: "Lógica proposicional | Fluência", contexto: "Se chover, aula cancela. Não choveu.", comando: "Aula..." },
    { capacidade: "Padrões | Autonomia", contexto: "Triângulo, quadrado, pentágono...", comando: "Próximo?" },
    { capacidade: "Raciocínio espacial | Raciocínio", contexto: "Dobra papel 3 vezes. Quantas partes?", comando: "Calcule." },
    { capacidade: "Fibonacci | Autonomia", contexto: "Na sequência Fibonacci, 10º termo?", comando: "Calcule." },
    { capacidade: "Lógica | Compreensão", contexto: "A ou B verdadeiro, A falso. B é...", comando: "Conclua." },
    { capacidade: "Desafio | Fluência", contexto: "3 filhas, produto 36, soma 13.", comando: "Idades?" },
    { capacidade: "Raciocínio | Autonomia", contexto: "Caixa: 5 pretas, 7 brancas. Para garantir par?", comando: "Quantas tirar?" },
    { capacidade: "Padrão visual | Raciocínio", contexto: "Quadrados: 1, 4, 9, 16, 25...", comando: "Padrão?" }
  ],
  modulo6: [
    { capacidade: "Equações simples | Autonomia", contexto: "2X + 8 = 20.", comando: "Resolva." },
    { capacidade: "Equações | Compreensão", contexto: "X - 5 = 12.", comando: "Qual X?" },
    { capacidade: "Expressões | Fluência", contexto: "Simplifique 2a + 3a - a.", comando: "Resultado?" },
    { capacidade: "Equações | Autonomia", contexto: "3X = 21.", comando: "X = ?" },
    { capacidade: "Variáveis | Raciocínio", contexto: "Y = 2X + 1, X = 3.", comando: "Y = ?" },
    { capacidade: "Sistemas | Autonomia", contexto: "X + Y = 10, X - Y = 4.", comando: "Encontre X e Y." },
    { capacidade: "Inequações | Compreensão", contexto: "X + 5 > 12.", comando: "Valores de X?" },
    { capacidade: "Fatoração | Fluência", contexto: "X² + 5X + 6.", comando: "Fatore." },
    { capacidade: "Equação 2º grau | Autonomia", contexto: "X² - 5X + 6 = 0.", comando: "Raízes?" },
    { capacidade: "Expressões | Raciocínio", contexto: "A = 5, B = 3. 2A + 3B.", comando: "Resultado?" },
    { capacidade: "Equações | Autonomia", contexto: "4X - 10 = 2X + 6.", comando: "X = ?" },
    { capacidade: "Variáveis | Compreensão", contexto: "3(X + 2) = 15.", comando: "X = ?" },
    { capacidade: "Simplificação | Fluência", contexto: "5X² - 3X² + 2X.", comando: "Forma simplificada?" },
    { capacidade: "Aplicação prática | Autonomia", contexto: "Caneta custa X, lápis 2 a menos. 3 canetas + 5 lápis = 29.", comando: "Preço caneta?" },
    { capacidade: "Equação | Raciocínio", contexto: "2(X - 3) = 10.", comando: "X = ?" },
    { capacidade: "Desigualdades | Autonomia", contexto: "2X - 5 < 7.", comando: "Valores?" },
    { capacidade: "Polinômios | Compreensão", contexto: "(2X² + 3X + 1) + (X² + 2X + 4).", comando: "Resultado?" },
    { capacidade: "Equação | Fluência", contexto: "X/3 + 5 = 11.", comando: "X = ?" },
    { capacidade: "Raciocínio | Autonomia", contexto: "X² = 16.", comando: "Valores de X?" },
    { capacidade: "Aplicação | Raciocínio", contexto: "Duas vezes número menos 4 = 10.", comando: "Qual número?" }
  ],
  modulo7: [
    { capacidade: "Média aritmética | Autonomia", contexto: "Notas 5, 6, 7, 8, 9.", comando: "Qual média?" },
    { capacidade: "Média | Compreensão", contexto: "Vendas 5 dias: R$ 200, 250, 300, 150, 200.", comando: "Venda média?" },
    { capacidade: "Moda | Fluência", contexto: "Notas 6, 7, 8, 8, 9, 9, 9, 10.", comando: "Qual moda?" },
    { capacidade: "Mediana | Autonomia", contexto: "Números 3, 5, 7, 9, 11.", comando: "Mediana?" },
    { capacidade: "Leitura gráficos | Raciocínio", contexto: "Temperatura: 8h=15°C, 9h=17°C, 10h=20°C.", comando: "Variação?" },
    { capacidade: "Amplitude | Autonomia", contexto: "Idades 15, 18, 20, 25, 30.", comando: "Amplitude?" },
    { capacidade: "Interpretação dados | Compreensão", contexto: "Janeiro 500 vendas, fevereiro 700.", comando: "Aumento %?" },
    { capacidade: "Variância | Fluência", contexto: "Como calcular dispersão em relação à média?", comando: "Conceito?" },
    { capacidade: "Desvio padrão | Autonomia", contexto: "Dados 2, 4, 6, 8, 10.", comando: "Desvio padrão?" },
    { capacidade: "Percentil | Raciocínio", contexto: "Nota no percentil 75 da turma.", comando: "Significa?" },
    { capacidade: "Tabela frequência | Autonomia", contexto: "Dados 1, 1, 2, 2, 2, 3, 3, 4.", comando: "Tabela?" },
    { capacidade: "Gráfico barras | Compreensão", contexto: "Representar vendas mensais.", comando: "Descreva." },
    { capacidade: "Correlação | Fluência", contexto: "Tempo estudo e notas.", comando: "Positiva ou negativa?" },
    { capacidade: "Probabilidade | Autonomia", contexto: "Sorteio com 50 números.", comando: "Probabilidade ganhar?" },
    { capacidade: "Dados agrupados | Raciocínio", contexto: "Altura: 150-160, 160-170, 170-180.", comando: "Organize." },
    { capacidade: "Interpretação | Autonomia", contexto: "60% clientes voltariam a comprar.", comando: "Significa?" },
    { capacidade: "Média ponderada | Compreensão", contexto: "Notas 7 (peso 2), 8 (peso 3), 9 (peso 5).", comando: "Média?" },
    { capacidade: "Análise tendência | Fluência", contexto: "Vendas 100, 110, 120, 130.", comando: "Tendência?" },
    { capacidade: "Distribuição normal | Autonomia", contexto: "Em ±1 desvio padrão, quantos %?", comando: "Aproximadamente?" },
    { capacidade: "Aplicação prática | Raciocínio", contexto: "50 funcionários, 20 com experiência.", comando: "Proporção %?" }
  ]
};

// Função para gerar HTML dos exercícios
function gerarExerciciosHTML(modulo, numero) {
  const listaExercicios = EXERCICIOS[modulo];
  if (!listaExercicios) return '';

  let html = '';
  listaExercicios.forEach((ex, idx) => {
    html += `
    <div class="exercicio-box">
      <div class="exercicio-header">ITEM ${idx + 1}</div>
      <div class="exercicio-content">
        <p><span class="exercicio-label">CAPACIDADE:</span> ${ex.capacidade}</p>
        <div style="border-bottom: 1px solid black; margin: 12px 0;"></div>
        <p><span class="exercicio-label">Contexto:</span> ${ex.contexto}</p>
        <p><span class="exercicio-label">Comando:</span> ${ex.comando}</p>
        <div class="resposta-campo">
          <span class="exercicio-label">Resposta:</span>
          <div class="resposta-linha"></div>
          <div class="resposta-linha"></div>
        </div>
      </div>
    </div>
    `;
  });
  return html;
}
