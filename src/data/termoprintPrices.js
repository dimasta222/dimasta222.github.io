// Цены термопечати (термоперенос плёнкой) для оптового калькулятора.
// Источник цифр — прайс из раздела «Термопечать» (servicePagesContent.js).
// Цена указана за 1 принт (нанесение на одно изделие) и зависит от формата,
// количества цветов и тиража.

// Пороги тиража (шт). Цена берётся по ближайшему НИЖНЕМУ порогу:
// тираж 1–19 → столбец «1 шт»; 20–34 → «20»; 35–49 → «35»; от 50 → «50».
export const TERMO_TIERS = [1, 20, 35, 50];

// prices[] идут строго в порядке TERMO_TIERS.
// Для тиража «1 шт» цена единая по формату (не зависит от цветности).
export const TERMO_FORMATS = [
  {
    name: "A6",
    label: "A6 (10×15)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [400, 159, 141, 128] },
      { colors: 2, label: "2 цвета", prices: [400, 206, 177, 148] },
      { colors: 3, label: "3 цвета", prices: [400, 238, 203, 188] },
    ],
  },
  {
    name: "A5",
    label: "A5 (15×20)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [550, 238, 203, 172] },
      { colors: 2, label: "2 цвета", prices: [550, 285, 244, 204] },
      { colors: 3, label: "3 цвета", prices: [550, 316, 270, 227] },
    ],
  },
  {
    name: "A4",
    label: "A4 (20×30)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [650, 316, 270, 227] },
      { colors: 2, label: "2 цвета", prices: [650, 405, 345, 291] },
      { colors: 3, label: "3 цвета", prices: [650, 475, 405, 341] },
    ],
  },
  {
    name: "A3",
    label: "A3 (30×42)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [800, 423, 352, 296] },
      { colors: 2, label: "2 цвета", prices: [800, 519, 443, 374] },
      { colors: 3, label: "3 цвета", prices: [800, 632, 540, 454] },
    ],
  },
];

// Индекс ценового столбца по тиражу: берём ближайший нижний порог.
function getTierIndex(qty) {
  let idx = 0;
  for (let i = 0; i < TERMO_TIERS.length; i += 1) {
    if (qty >= TERMO_TIERS[i]) idx = i;
  }
  return idx;
}

export function getTermoRow(formatName, colors) {
  const fmt = TERMO_FORMATS.find((f) => f.name === formatName);
  if (!fmt) return null;
  return fmt.rows.find((r) => String(r.colors) === String(colors)) || null;
}

// Расчёт стоимости термопечати.
export function getTermoCost(formatName, colors, qty) {
  if (!qty || qty <= 0) {
    return { unitPrice: 0, cost: 0, tier: null };
  }
  const row = getTermoRow(formatName, colors);
  if (!row) {
    return { unitPrice: 0, cost: 0, tier: null };
  }
  const idx = getTierIndex(qty);
  const unitPrice = row.prices[idx];
  return { unitPrice, cost: unitPrice * qty, tier: TERMO_TIERS[idx] };
}
