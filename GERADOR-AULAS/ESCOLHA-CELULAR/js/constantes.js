/**
 * Constantes do dashboard de compras no Paraguai.
 * Preços são ESTIMATIVAS de referência (Ciudad del Este x varejo no Brasil, out/2026):
 * conferir sempre na loja antes de comprar.
 */

const COTA_ISENCAO_DOLAR_POR_PESSOA = 500;
const ALIQUOTA_EXCEDENTE_COTA = 0.5;
const ALIQUOTA_MULTA_SEM_DECLARAR = 0.5;
const CHAVE_ARMAZENAMENTO = 'paraguai_dashboard_v1';
const ATRASO_SALVAMENTO_MS = 300;

const CONFIG_PADRAO = Object.freeze({
  dinheiroGuardado: 5000,
  cotacaoDolar: 5.4,
  taxaCambioPercentual: 4,
  reservaViagem: 800,
  margemSegurancaPercentual: 10,
  quantidadeViajantes: 1,
});

const CATEGORIAS = Object.freeze({
  celular: { nome: 'Celulares', icone: '📱', classe: 'categoria--azul' },
  informatica: { nome: 'Informática', icone: '💻', classe: 'categoria--roxo' },
  audio: { nome: 'Áudio e relógios', icone: '🎧', classe: 'categoria--verde' },
  games: { nome: 'Games', icone: '🎮', classe: 'categoria--laranja' },
  acessorios: { nome: 'Acessórios', icone: '🔌', classe: 'categoria--amarelo' },
  perfumaria: { nome: 'Perfumes e bebidas', icone: '🧴', classe: 'categoria--rosa' },
});

const CATALOGO_PRODUTOS = Object.freeze([
  { id: 'iphone16', nome: 'iPhone 16 128 GB', categoria: 'celular', precoDolar: 760, precoBrasil: 5800 },
  { id: 'iphone15', nome: 'iPhone 15 128 GB', categoria: 'celular', precoDolar: 640, precoBrasil: 4600 },
  { id: 'galaxys25', nome: 'Samsung Galaxy S25 256 GB', categoria: 'celular', precoDolar: 720, precoBrasil: 5200 },
  { id: 'galaxya56', nome: 'Samsung Galaxy A56 256 GB', categoria: 'celular', precoDolar: 340, precoBrasil: 2300 },
  { id: 'redminote14', nome: 'Xiaomi Redmi Note 14 Pro 256 GB', categoria: 'celular', precoDolar: 260, precoBrasil: 1900 },
  { id: 'pocox7', nome: 'Xiaomi Poco X7 Pro 256 GB', categoria: 'celular', precoDolar: 300, precoBrasil: 2400 },
  { id: 'motoedge50', nome: 'Motorola Edge 50 256 GB', categoria: 'celular', precoDolar: 330, precoBrasil: 2200 },
  { id: 'macbookair', nome: 'MacBook Air M3 13"', categoria: 'informatica', precoDolar: 1050, precoBrasil: 8500 },
  { id: 'notebooki5', nome: 'Notebook Lenovo IdeaPad i5 16 GB', categoria: 'informatica', precoDolar: 520, precoBrasil: 3600 },
  { id: 'ipad10', nome: 'iPad 10ª geração 64 GB', categoria: 'informatica', precoDolar: 360, precoBrasil: 3000 },
  { id: 'ssd1tb', nome: 'SSD NVMe 1 TB', categoria: 'informatica', precoDolar: 70, precoBrasil: 480 },
  { id: 'monitor24', nome: 'Monitor 24" Full HD IPS', categoria: 'informatica', precoDolar: 120, precoBrasil: 800 },
  { id: 'kitlogitech', nome: 'Kit teclado + mouse Logitech sem fio', categoria: 'informatica', precoDolar: 45, precoBrasil: 330 },
  { id: 'airpodspro2', nome: 'AirPods Pro 2', categoria: 'audio', precoDolar: 210, precoBrasil: 1700 },
  { id: 'jblflip6', nome: 'Caixa de som JBL Flip 6', categoria: 'audio', precoDolar: 100, precoBrasil: 700 },
  { id: 'applewatchse', nome: 'Apple Watch SE 40 mm', categoria: 'audio', precoDolar: 230, precoBrasil: 2000 },
  { id: 'smartband9', nome: 'Xiaomi Smart Band 9', categoria: 'audio', precoDolar: 40, precoBrasil: 300 },
  { id: 'ps5slim', nome: 'PlayStation 5 Slim', categoria: 'games', precoDolar: 480, precoBrasil: 3800 },
  { id: 'dualsense', nome: 'Controle DualSense', categoria: 'games', precoDolar: 65, precoBrasil: 450 },
  { id: 'switcholed', nome: 'Nintendo Switch OLED', categoria: 'games', precoDolar: 330, precoBrasil: 2300 },
  { id: 'carregador65', nome: 'Carregador GaN 65 W', categoria: 'acessorios', precoDolar: 25, precoBrasil: 180 },
  { id: 'powerbank', nome: 'Power bank 20.000 mAh', categoria: 'acessorios', precoDolar: 30, precoBrasil: 200 },
  { id: 'capapelicula', nome: 'Capa + película premium', categoria: 'acessorios', precoDolar: 15, precoBrasil: 120 },
  { id: 'perfume100', nome: 'Perfume importado 100 ml', categoria: 'perfumaria', precoDolar: 70, precoBrasil: 600 },
  { id: 'whisky1l', nome: 'Whisky 12 anos 1 L', categoria: 'perfumaria', precoDolar: 35, precoBrasil: 220 },
]);

const FAIXAS_GASTO = Object.freeze([
  { id: 'faixa4a5', titulo: 'Gastar de R$ 4 a 5 mil', minimo: 4000, maximo: 5000, icone: '🟦', classe: 'kpi--azul' },
  { id: 'faixa5a7', titulo: 'Gastar de R$ 5 a 7 mil', minimo: 5000, maximo: 7000, icone: '🟩', classe: 'kpi--verde' },
  { id: 'faixa7a10', titulo: 'Gastar de R$ 7 a 10 mil', minimo: 7000, maximo: 10000, icone: '🟧', classe: 'kpi--laranja' },
  { id: 'faixa10', titulo: 'Gastar R$ 10 mil', minimo: 10000, maximo: 10000, icone: '🟪', classe: 'kpi--roxo' },
]);
