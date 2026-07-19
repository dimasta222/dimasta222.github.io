// Тарифы сублимационной печати по погонным метрам.
// Рабочая ширина рулона — 1,55 м. Дробный метраж считается без округления.

export const SUBLIMATION_WORK_WIDTH_M = 1.55;
export const SUBLIMATION_MIN_METERS = 1;
export const SUBLIMATION_LOWEST_PRINT_RATE = 290;

export const SUBLIMATION_PRINT_TIERS = [
  { min: 0, max: 3, label: "1–3 м", rate: 670 },
  { min: 3, max: 8, label: "4–8 м", rate: 600 },
  { min: 8, max: 20, label: "9–20 м", rate: 400 },
  { min: 20, max: 59, label: "21–59 м", rate: 350 },
  { min: 59, max: Infinity, label: "от 60 м", rate: 290 },
];

export const SUBLIMATION_SHRINK_TIERS = [
  { min: 0, max: 3, label: "1–3 м", rate: 100 },
  { min: 3, max: 8, label: "4–8 м", rate: 80 },
  { min: 8, max: 20, label: "9–20 м", rate: 50 },
  { min: 20, max: 59, label: "21–59 м", rate: 40 },
  { min: 59, max: Infinity, label: "от 60 м", rate: 35 },
];

function normalizeMeters(value) {
  const normalized = typeof value === "string" ? value.trim().replace(",", ".") : value;
  const meters = Number(normalized);
  return Number.isFinite(meters) && meters >= SUBLIMATION_MIN_METERS ? meters : 0;
}

function findTier(tiers, meters) {
  return tiers.find((tier) => meters > tier.min && meters <= tier.max) || tiers[tiers.length - 1];
}

export function getSublimationPrintCost(value) {
  const meters = normalizeMeters(value);
  if (!meters) return { meters: 0, cost: 0, rate: 0, fixed: false, tier: null };
  const tier = findTier(SUBLIMATION_PRINT_TIERS, meters);
  const cost = meters * tier.rate;
  return { meters, cost, rate: tier.rate, fixed: false, tier };
}

export function getSublimationShrinkCost(value) {
  const meters = normalizeMeters(value);
  if (!meters) return { meters: 0, cost: 0, rate: 0, tier: null };
  const tier = findTier(SUBLIMATION_SHRINK_TIERS, meters);
  return { meters, cost: meters * tier.rate, rate: tier.rate, tier };
}

export function getSublimationCost(value, withShrink = false) {
  const print = getSublimationPrintCost(value);
  const shrink = withShrink ? getSublimationShrinkCost(value) : { meters: print.meters, cost: 0, rate: 0, tier: null };
  return {
    meters: print.meters,
    area: print.meters * SUBLIMATION_WORK_WIDTH_M,
    print,
    shrink,
    withShrink: Boolean(withShrink),
    total: print.cost + shrink.cost,
  };
}
