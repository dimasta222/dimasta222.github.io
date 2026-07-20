import { useEffect, useMemo, useState } from "react";
import {
  SUBLIMATION_PRINT_TIERS,
  SUBLIMATION_SHRINK_TIERS,
  SUBLIMATION_MIN_METERS,
  SUBLIMATION_WORK_WIDTH_M,
  getSublimationCost,
} from "../data/sublimationPrices.js";
import STYLES from "../shared/appStyles.js";
import { sanitizeDecimalInput } from "../utils/numericInput.js";
import LogoMini from "./LogoMini.jsx";
import NumericCaretInput from "./NumericCaretInput.jsx";
import SilkscreenOrderModal from "./SilkscreenOrderModal.jsx";
import TG from "./TG.jsx";

const STORAGE_KEY = "sublimation-calc-state-v2";
const pink = "#e84393";
const violet = "#6c5ce7";

const number = (value, digits = 2) => Number(value).toLocaleString("ru-RU", { maximumFractionDigits: digits });
const money = (value) => `${number(value)} ₽`;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode */
  }
}

function TariffList({ title, subtitle, tiers, color, activeTier }) {
  return (
    <div className="cs calc-panel" style={{ padding: "22px 24px" }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color, textTransform: "uppercase" }}>{title}</div>
      <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.34)", margin: "7px 0 16px", lineHeight: 1.5 }}>{subtitle}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tiers.map((tier) => {
          const isActive = tier === activeTier;
          return (
            <div
              key={tier.label}
              aria-current={isActive ? "true" : undefined}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, margin: "2px 0", padding: "10px 12px", borderRadius: 12, border: `1px solid ${isActive ? `${color}75` : "transparent"}`, borderBottomColor: isActive ? `${color}75` : "rgba(255,255,255,.055)", background: isActive ? `linear-gradient(135deg,${color}1f,${color}0c)` : "transparent", boxShadow: isActive ? `0 10px 28px ${color}12` : "none", transition: ".2s" }}
            >
              <span style={{ fontSize: 13, color: isActive ? "#f0eef5" : "rgba(240,238,245,.55)", fontWeight: isActive ? 650 : 400 }}>{tier.label}</span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                <strong style={{ fontSize: 14, color }}>{tier.rate} ₽/м</strong>
                {isActive && <small style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.1, color, textTransform: "uppercase" }}>ваш тариф</small>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SublimationCalcPage({ onBack, onGoHome, onOpenCookiePolicy, switcher }) {
  const saved = useMemo(() => loadState(), []);
  const [meters, setMeters] = useState(saved?.meters ?? "1");
  const [withShrink, setWithShrink] = useState(Boolean(saved?.withShrink));
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const result = getSublimationCost(meters, withShrink);
  const hasResult = result.meters > 0;

  useEffect(() => {
    saveState({ meters, withShrink });
  }, [meters, withShrink]);

  const resetCalc = () => {
    setMeters("1");
    setWithShrink(false);
  };

  const orderItems = hasResult ? [
    {
      formatName: "Сублимационная печать",
      colorsLabel: `рабочая ширина ${number(SUBLIMATION_WORK_WIDTH_M)} м`,
      qty: result.meters,
      unitLabel: "м",
      unitPrice: result.print.rate,
      modsLabel: result.print.tier?.label || "",
    },
    ...(withShrink ? [{
      formatName: "Усадка",
      colorsLabel: result.shrink.tier?.label || "",
      qty: result.meters,
      unitLabel: "м",
      unitPrice: result.shrink.rate,
      modsLabel: "Дополнительная опция",
    }] : []),
  ] : [];

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#08080c", color: "#f0eef5", minHeight: "100vh" }}>
      <style>{STYLES}</style>
      <style>{`
        .sublimation-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(340px,1.1fr);gap:24px;align-items:start;margin:24px 0 48px}
        .sublimation-tariffs{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .sublimation-input{width:100%;padding:16px 18px;border-radius:14px}
        .sublimation-result-row{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.06)}
        .sublimation-result-row:last-child{border-bottom:0}
        @media(max-width:900px){.sublimation-grid{grid-template-columns:1fr}.sublimation-tariffs{grid-template-columns:1fr 1fr}}
        @media(max-width:640px){.sublimation-grid{margin-top:18px}.sublimation-tariffs{grid-template-columns:1fr}.sublimation-result-row{gap:12px}}
      `}</style>

      <div className="page-shell-narrow" style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 5% 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={onBack} aria-label="Назад" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", color: "inherit", padding: 0, font: "inherit" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={pink} strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" onClick={onGoHome} aria-label="На главную" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", background: "none", border: "none", color: "inherit", padding: 0, font: "inherit" }}>
            <LogoMini />
          </button>
        </div>

        <div style={{ textAlign: "center", margin: "36px 0 24px" }}>
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: pink, textTransform: "uppercase" }}>Печать на синтетике</span>
          <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 200, margin: "12px 0 10px" }}>Калькулятор <span style={{ fontWeight: 700, background: `linear-gradient(135deg,${pink},${violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>сублимации</span></h1>
        </div>

        {switcher}

        <div className="sublimation-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <section className="cs calc-panel" style={{ padding: "24px", border: `1px solid ${pink}29` }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: pink, textTransform: "uppercase", marginBottom: 20 }}>Параметры расчёта</div>

              <label htmlFor="sublimation-meters" style={{ display: "block", fontSize: 11, fontWeight: 500, letterSpacing: 1.2, color: "rgba(240,238,245,.42)", textTransform: "uppercase", marginBottom: 8 }}>Метраж печати</label>
              <div style={{ position: "relative" }}>
                <NumericCaretInput
                  id="sublimation-meters"
                  type="text"
                  inputMode="decimal"
                  value={meters}
                  onChange={(event) => setMeters(sanitizeDecimalInput(event.target.value))}
                  className="inf sublimation-input"
                  placeholder="Например, 10,5"
                  style={{ fontSize: 16, fontWeight: 650, paddingRight: 62 }}
                />
                <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", color: "rgba(240,238,245,.38)", fontWeight: 600, pointerEvents: "none" }}>м</span>
              </div>
              <div style={{ fontSize: 12, color: "rgba(240,238,245,.34)", lineHeight: 1.5, marginTop: 8 }}>Минимальный метраж — {SUBLIMATION_MIN_METERS} м.</div>

              <button
                type="button"
                role="switch"
                aria-checked={withShrink}
                onClick={() => setWithShrink((current) => !current)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 22, padding: "16px 17px", borderRadius: 15, border: `1px solid ${withShrink ? `${violet}66` : "rgba(255,255,255,.09)"}`, background: withShrink ? `${violet}12` : "rgba(255,255,255,.025)", color: "#f0eef5", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
              >
                <span><strong style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Добавить усадку</strong><small style={{ color: "rgba(240,238,245,.42)", fontSize: 12 }}>Отдельная услуга по тому же метражу</small></span>
                <span style={{ width: 46, height: 26, borderRadius: 999, padding: 3, background: withShrink ? violet : "rgba(255,255,255,.12)", transition: ".2s", flexShrink: 0 }}><i style={{ display: "block", width: 20, height: 20, borderRadius: "50%", background: "#fff", transform: withShrink ? "translateX(20px)" : "translateX(0)", transition: ".2s" }} /></span>
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
                <div style={{ padding: 14, borderRadius: 13, background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)" }}><span style={{ fontSize: 11, color: "rgba(240,238,245,.35)" }}>Рабочая ширина</span><strong style={{ display: "block", fontSize: 18, marginTop: 5 }}>{number(SUBLIMATION_WORK_WIDTH_M)} м</strong></div>
                <div style={{ padding: 14, borderRadius: 13, background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)" }}><span style={{ fontSize: 11, color: "rgba(240,238,245,.35)" }}>Площадь печати</span><strong style={{ display: "block", fontSize: 18, marginTop: 5 }}>{hasResult ? `${number(result.area)} м²` : "—"}</strong></div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <button type="button" onClick={resetCalc} className="silk-reset-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,80,80,.08)", border: "1px solid rgba(255,80,80,.2)", borderRadius: 10, cursor: "pointer", color: "#ff6b6b", fontSize: 12, fontWeight: 500, fontFamily: "'Outfit',sans-serif", padding: "7px 14px", transition: "all .3s" }} onMouseEnter={(event) => { event.currentTarget.style.background = "rgba(255,80,80,.15)"; event.currentTarget.style.borderColor = "rgba(255,80,80,.4)"; }} onMouseLeave={(event) => { event.currentTarget.style.background = "rgba(255,80,80,.08)"; event.currentTarget.style.borderColor = "rgba(255,80,80,.2)"; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 1 3 6.7" /><path d="M3 22v-6h6" /></svg>
                  Сбросить расчёт
                </button>
              </div>
            </section>

            <div className="sublimation-tariffs">
              <TariffList title="Печать" subtitle="Стоимость рассчитывается по ставке выбранного диапазона." tiers={SUBLIMATION_PRINT_TIERS} color={pink} activeTier={result.print.tier} />
              <TariffList title="Усадка" subtitle="Добавляется отдельно по желанию клиента." tiers={SUBLIMATION_SHRINK_TIERS} color={violet} activeTier={withShrink ? result.shrink.tier : null} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <section className="cs calc-panel" style={{ padding: "clamp(22px,4vw,30px)", border: `1px solid ${pink}38`, background: `radial-gradient(circle at 100% 0,${violet}18,transparent 42%),linear-gradient(145deg,${pink}0d,rgba(255,255,255,.018))` }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: pink, textTransform: "uppercase", marginBottom: 18 }}>Результат</div>
              {!hasResult ? (
                <div style={{ padding: "38px 0", textAlign: "center", color: "rgba(240,238,245,.3)", fontSize: 14 }}>Введите метраж от {SUBLIMATION_MIN_METERS} м</div>
              ) : (
                <>
                  <div className="sublimation-result-row">
                    <div><strong style={{ fontSize: 14 }}>Сублимационная печать</strong><div style={{ fontSize: 12, color: "rgba(240,238,245,.38)", marginTop: 4 }}>{number(result.meters)} м × {money(result.print.rate)}/м</div></div>
                    <strong className="calc-result-price" style={{ fontSize: 18, color: pink, whiteSpace: "nowrap" }}>{money(result.print.cost)}</strong>
                  </div>
                  <div className="sublimation-result-row">
                    <div><strong style={{ fontSize: 14 }}>Усадка</strong><div style={{ fontSize: 12, color: "rgba(240,238,245,.38)", marginTop: 4 }}>{withShrink ? `${number(result.meters)} м × ${money(result.shrink.rate)}/м` : "не выбрана"}</div></div>
                    <strong className="calc-result-price" style={{ fontSize: 18, color: withShrink ? violet : "rgba(240,238,245,.26)", whiteSpace: "nowrap" }}>{withShrink ? money(result.shrink.cost) : "0 ₽"}</strong>
                  </div>
                  <div style={{ marginTop: 22, padding: "20px 22px", borderRadius: 16, background: `linear-gradient(135deg,${pink}16,${violet}14)`, border: `1px solid ${pink}38` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18 }}><span style={{ fontSize: 16, fontWeight: 600 }}>Итого</span><strong className="calc-total-value sublimation-total" style={{ fontSize: 28, color: pink }}>{money(result.total)}</strong></div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginTop: 14, paddingTop: 13, borderTop: "1px solid rgba(255,255,255,.09)" }}>
                      <span style={{ fontSize: 12, color: "rgba(240,238,245,.5)" }}>Цена за 1 пог. м {withShrink ? "с усадкой" : "без усадки"}</span>
                      <strong style={{ fontSize: 18, color: violet, whiteSpace: "nowrap" }}>{money(result.total / result.meters)}/м</strong>
                    </div>
                    <div style={{ textAlign: "right", fontSize: 12, color: "rgba(240,238,245,.38)", marginTop: 7 }}>{number(result.meters)} пог. м · площадь {number(result.area)} м²</div>
                  </div>
                  <button type="button" onClick={() => setOrderModalOpen(true)} className="btg" style={{ width: "100%", justifyContent: "center", marginTop: 18, display: "flex", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}><TG /> Оформить заказ</button>
                </>
              )}
            </section>

            <section className="cs calc-panel" style={{ padding: "22px 24px", borderLeft: `3px solid ${pink}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: pink, textTransform: "uppercase", marginBottom: 12 }}>Важно</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10, color: "rgba(240,238,245,.6)", fontSize: 13, lineHeight: 1.5 }}>
                <li>• Минимальный метраж для расчёта — {SUBLIMATION_MIN_METERS} м.</li>
                <li>• Для каждого диапазона ставка применяется ко всему фактическому метражу.</li>
                <li>• Усадка не включена автоматически и выбирается отдельно.</li>
                <li>• Рабочая ширина печати — {number(SUBLIMATION_WORK_WIDTH_M)} м.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "24px 5%", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.2)", margin: 0 }}>© 2026 Future Studio • СПб • Сублимационная печать</p>
        {onOpenCookiePolicy && <button type="button" onClick={onOpenCookiePolicy} style={{ background: "none", border: "none", color: "rgba(240,238,245,.2)", fontSize: 12, fontWeight: 300, cursor: "pointer", padding: "4px 0 0", font: "inherit", display: "block", margin: "0 auto", textDecoration: "underline" }}>Политика конфиденциальности</button>}
      </footer>

      <SilkscreenOrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        items={orderItems}
        total={result.total}
        onResetCalc={resetCalc}
        kind="sublimation"
        heading="Заказ сублимационной печати"
        subject="Заказ сублимационной печати"
        note="Расчёт учитывает печать и выбранную опцию усадки. Менеджер проверит материал, макет, рабочую ширину и подтвердит стоимость перед запуском."
      />
    </div>
  );
}
