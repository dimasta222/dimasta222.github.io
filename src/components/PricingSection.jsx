import CalcIcon from "./CalcIcon.jsx";
import { PRINT_FORMATS } from "../data/printFormats.js";
import { SILK_FORMATS } from "../data/silkscreenPrices.js";
import { SUBLIMATION_LOWEST_PRINT_RATE } from "../data/sublimationPrices.js";
import { TERMO_FORMATS } from "../data/termoprintPrices.js";

const minPrice = (formats) => Math.min(
  ...formats.flatMap((format) => format.rows.flatMap((row) => row.prices)),
);

const METHODS = [
  { title: "DTF-печать", price: `от ${PRINT_FORMATS[0].price} ₽`, note: "по формату · от 5 шт", color: "#e84393" },
  { title: "Шелкография", price: `от ${minPrice(SILK_FORMATS)} ₽`, note: "по цветам и тиражу", color: "#6c5ce7" },
  { title: "Термопечать", price: `от ${minPrice(TERMO_FORMATS)} ₽`, note: "1–3 цвета", color: "#00d2d3" },
  { title: "Сублимация", price: `от ${SUBLIMATION_LOWEST_PRINT_RATE} ₽/м`, note: "при метраже от 60 м", color: "#fdcb6e" },
  { title: "Вышивка", price: "Скоро", note: "готовим запуск услуги", color: "#a777e3", disabled: true },
];

export default function PricingSection({ Reveal: _Reveal, onOpenPrices, onOpenCalculator }) {
  return (
    <section id="pricing" className="section-shell" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <_Reveal className="text-center mb-12">
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: "#e84393", textTransform: "uppercase" }}>Стоимость</span>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 200, margin: "12px 0 12px" }}>Цены на все <span style={{ fontWeight: 600 }}>виды печати</span></h2>
          <p style={{ maxWidth: 660, margin: "0 auto", color: "rgba(240,238,245,.52)", fontSize: 15, fontWeight: 300, lineHeight: 1.65 }}>Сравните технологии по минимальной цене, тиражу и назначению. Подробные таблицы собраны на отдельной странице.</p>
        </_Reveal>

        <_Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))", gap: 13 }}>
            {METHODS.map((method, index) => (
              <button
                type="button"
                key={method.title}
                disabled={method.disabled}
                onClick={method.disabled ? undefined : onOpenPrices}
                style={{ minHeight: 190, padding: 20, borderRadius: 20, border: `1px solid ${method.color}42`, background: `linear-gradient(145deg,${method.color}14,rgba(255,255,255,.015) 62%)`, color: "#f0eef5", textAlign: "left", cursor: method.disabled ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "border-color .25s ease,box-shadow .25s ease,background .25s ease", opacity: method.disabled ? .68 : 1 }}
                onMouseEnter={(event) => { if (!method.disabled) { event.currentTarget.style.borderColor = `${method.color}88`; event.currentTarget.style.boxShadow = `0 16px 38px ${method.color}18`; } }}
                onMouseLeave={(event) => { if (!method.disabled) { event.currentTarget.style.borderColor = `${method.color}42`; event.currentTarget.style.boxShadow = "none"; } }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", color: method.color, fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>
                  <span>0{index + 1}</span><span style={{ width: 8, height: 8, borderRadius: "50%", background: method.color, boxShadow: `0 0 15px ${method.color}` }} />
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 650, marginBottom: 9 }}>{method.title}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: method.color }}>{method.price}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,238,245,.4)", marginTop: 5 }}>{method.note}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{method.disabled ? "Скоро появится" : "Открыть прайс"} <span style={{ color: method.color }}>{method.disabled ? "🔒" : "→"}</span></div>
              </button>
            ))}
          </div>
        </_Reveal>

        <_Reveal delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <button type="button" className="bcalc" onClick={onOpenPrices}>Смотреть все цены</button>
            <button type="button" className="bo" onClick={onOpenCalculator}><CalcIcon />Рассчитать заказ</button>
          </div>
        </_Reveal>
      </div>
    </section>
  );
}
