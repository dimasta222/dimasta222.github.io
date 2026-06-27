// Цены шелкографии (трафаретная печать) для оптового калькулятора.
// Источник цифр — прайс-лист «Принтоголикс» (форматы A6/A5/A4/A3, печать
// пластизольной краской). Цена указана за 1 принт (нанесение на одно изделие)
// и зависит от формата, количества цветов и тиража.

// Пороги тиража (шт). Цена берётся по ближайшему НИЖНЕМУ порогу:
// тираж 70 → столбец 60; тираж 250 → столбец 200; тираж 5000 → столбец 1000.
export const SILK_TIERS = [30, 40, 50, 60, 80, 100, 200, 300, 500, 1000];

// prices[] идут строго в порядке SILK_TIERS.
export const SILK_FORMATS = [
  {
    name: "A6",
    label: "A6 (10×15)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [160, 136, 120, 110, 98, 88, 72, 64, 58, 54] },
      { colors: 2, label: "2 цвета", prices: [250, 208, 182, 164, 142, 128, 104, 94, 84, 78] },
      { colors: 3, label: "3 цвета", prices: [324, 266, 230, 206, 178, 158, 126, 112, 102, 92] },
      { colors: 4, label: "4 цвета", prices: [398, 326, 282, 250, 218, 196, 156, 142, 128, 116] },
      { colors: 5, label: "5 цветов", prices: [462, 382, 332, 298, 260, 232, 186, 166, 152, 138] },
      { colors: 6, label: "6 цветов", prices: [512, 424, 368, 330, 286, 258, 208, 190, 176, 162] },
    ],
  },
  {
    name: "A5",
    label: "A5 (15×20)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [172, 146, 130, 118, 106, 94, 78, 70, 64, 58] },
      { colors: 2, label: "2 цвета", prices: [266, 220, 192, 172, 150, 134, 110, 98, 90, 82] },
      { colors: 3, label: "3 цвета", prices: [342, 280, 242, 216, 186, 166, 132, 118, 106, 96] },
      { colors: 4, label: "4 цвета", prices: [420, 342, 296, 262, 228, 204, 162, 146, 134, 120] },
      { colors: 5, label: "5 цветов", prices: [486, 400, 348, 312, 270, 242, 192, 172, 156, 144] },
      { colors: 6, label: "6 цветов", prices: [538, 442, 384, 344, 298, 268, 216, 196, 178, 164] },
    ],
  },
  {
    name: "A4",
    label: "A4 (20×30)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [190, 160, 142, 130, 116, 102, 84, 76, 68, 62] },
      { colors: 2, label: "2 цвета", prices: [290, 240, 208, 188, 162, 144, 116, 104, 94, 86] },
      { colors: 3, label: "3 цвета", prices: [372, 304, 262, 234, 200, 176, 138, 124, 110, 98] },
      { colors: 4, label: "4 цвета", prices: [458, 372, 318, 282, 244, 216, 170, 152, 138, 124] },
      { colors: 5, label: "5 цветов", prices: [528, 434, 376, 336, 288, 256, 200, 178, 162, 148] },
      { colors: 6, label: "6 цветов", prices: [586, 480, 414, 370, 316, 284, 224, 204, 186, 170] },
    ],
  },
  {
    name: "A3",
    label: "A3 (30×40)",
    rows: [
      { colors: 1, label: "1 цвет", prices: [220, 184, 164, 148, 130, 116, 94, 84, 76, 68] },
      { colors: 2, label: "2 цвета", prices: [336, 274, 238, 212, 182, 160, 128, 114, 102, 92] },
      { colors: 3, label: "3 цвета", prices: [430, 348, 298, 264, 224, 196, 150, 132, 118, 106] },
      { colors: 4, label: "4 цвета", prices: [528, 424, 360, 316, 270, 238, 184, 164, 146, 130] },
      { colors: 5, label: "5 цветов", prices: [610, 494, 424, 378, 320, 282, 216, 190, 170, 154] },
      { colors: 6, label: "6 цветов", prices: [676, 546, 468, 414, 352, 312, 240, 216, 194, 176] },
    ],
  },
];

// Тип ткани. Влияет на базовую цену:
//  • белый текстиль — минус 7% от прайса;
//  • тёмная ткань — добавляется 1 цвет на подложку (цветность +1, максимум 6).
export const SILK_FABRIC_OPTIONS = [
  { value: "color", label: "Цветная", percent: 0, addLayer: false, hint: "Базовый прайс" },
  { value: "white", label: "Белая", percent: -7, addLayer: false, hint: "−7% к прайсу" },
  { value: "dark", label: "Тёмная", percent: 0, addLayer: true, hint: "+1 цвет на подложку" },
];

// Тип изделия. Футер 3-нитка (худи/свитшоты) — плюс 15%.
export const SILK_GARMENT_OPTIONS = [
  { value: "normal", label: "Обычное", percent: 0, hint: "Футболка, поло и т.п." },
  { value: "fleece", label: "Футер 3-нитка", percent: 15, hint: "Худи, свитшоты, +15%" },
];

// Доп. эффекты краски (мультивыбор). Проценты к прайсу.
export const SILK_EXTRAS = [
  { value: "puff", label: "PUFF-эффект", percent: 20 },
  { value: "metallic", label: "Металлик / флуор", percent: 20 },
  { value: "water", label: "Водная / вытравная", percent: 30 },
  { value: "reflective", label: "Световозвращающая", percent: 30 },
  { value: "glow", label: "Светонакопительная", percent: 30 },
];

// Обработка отпечатка термопрессом — фиксированная надбавка за штуку.
export const SILK_THERMO_PER_UNIT = 20;

// Индекс ценового столбца по тиражу: берём ближайший нижний порог.
function getTierIndex(qty) {
  let idx = 0;
  for (let i = 0; i < SILK_TIERS.length; i += 1) {
    if (qty >= SILK_TIERS[i]) idx = i;
  }
  return idx;
}

export function getSilkRow(formatName, colors) {
  const fmt = SILK_FORMATS.find((f) => f.name === formatName);
  if (!fmt) return null;
  return fmt.rows.find((r) => String(r.colors) === String(colors)) || null;
}

// Суммарный процент надбавок/скидок по выбранным опциям.
export function getSilkSurcharge({ fabric = "color", garment = "normal", extras = [] } = {}) {
  let percent = 0;
  const fabricOpt = SILK_FABRIC_OPTIONS.find((f) => f.value === fabric);
  if (fabricOpt) percent += fabricOpt.percent;
  const garmentOpt = SILK_GARMENT_OPTIONS.find((g) => g.value === garment);
  if (garmentOpt) percent += garmentOpt.percent;
  (extras || []).forEach((ex) => {
    const exOpt = SILK_EXTRAS.find((e) => e.value === ex);
    if (exOpt) percent += exOpt.percent;
  });
  return percent;
}

// Расчёт стоимости с учётом опций.
// opts: { fabric, garment, extras: string[], thermo: boolean }
export function getSilkCost(formatName, colors, qty, opts = {}) {
  if (!qty || qty <= 0) {
    return { unitPrice: 0, baseUnit: 0, cost: 0, tier: null, effColors: colors, percent: 0 };
  }
  const { fabric = "color", thermo = false } = opts;

  // Тёмная ткань добавляет 1 цвет на подложку.
  let effColors = colors;
  const fabricOpt = SILK_FABRIC_OPTIONS.find((f) => f.value === fabric);
  if (fabricOpt?.addLayer) {
    const n = Number(colors);
    if (Number.isFinite(n)) effColors = Math.min(6, n + 1);
  }

  const row = getSilkRow(formatName, effColors);
  if (!row) {
    return { unitPrice: 0, baseUnit: 0, cost: 0, tier: null, effColors, percent: 0 };
  }
  const idx = getTierIndex(qty);
  const baseUnit = row.prices[idx];

  const percent = getSilkSurcharge(opts);
  let unitPrice = baseUnit * (1 + percent / 100);
  if (thermo) unitPrice += SILK_THERMO_PER_UNIT;
  unitPrice = Math.round(unitPrice);

  return { unitPrice, baseUnit, cost: unitPrice * qty, tier: SILK_TIERS[idx], effColors, percent };
}
