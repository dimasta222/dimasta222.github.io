export const PRINT_FORMATS = [
  { name: "A6", short: 11, long: 16, price: 250 },
  { name: "A5", short: 16, long: 21, price: 290 },
  { name: "A4", short: 21, long: 31, price: 350 },
  { name: "A3", short: 31, long: 43, price: 450 },
  { name: "A3+", short: 36, long: 49, price: 650 },
  { name: "A3++", short: 42, long: 51, price: 800 },
];

// Цена DTF-печати по погонному метру (ширина рулона 58 см).
// Единый источник для калькулятора и SEO-страницы /dtf-pechat/.
export const METER_PRICES = [
  { range: "1–2 м", price: "1 400 ₽/м" },
  { range: "3–5 м", price: "1 200 ₽/м" },
  { range: "6–20 м", price: "1 100 ₽/м" },
  { range: "20–50 м", price: "1 000 ₽/м" },
  { range: "от 50 м", price: "900 ₽/м" },
];
