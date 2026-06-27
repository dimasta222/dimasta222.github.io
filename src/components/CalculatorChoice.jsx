import STYLES from "../shared/appStyles.js";
import LogoMini from "./LogoMini.jsx";

// Экран-развилка: выбор калькулятора (DTF / Шелкография).
// Показывается при переходе в «Оптовый калькулятор» с главной.
export default function CalculatorChoice({ onBack, onChoose, onOpenCookiePolicy }) {
  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#08080c", color: "#f0eef5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{STYLES}</style>

      <div className="page-shell-narrow" style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 5% 0", width: "100%", flex: 1 }}>
        <button type="button" onClick={onBack} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, background: "none", border: "none", color: "inherit", padding: 0, font: "inherit" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84393" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <LogoMini />
        </button>

        <div style={{ textAlign: "center", margin: "48px 0 40px" }}>
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: "#e84393", textTransform: "uppercase" }}>Оптовым клиентам</span>
          <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 200, marginTop: 12 }}>
            Выберите <span style={{ fontWeight: 600, background: "linear-gradient(135deg,#e84393,#6c5ce7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>калькулятор</span>
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(240,238,245,.5)", marginTop: 14, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Технология печати влияет на расчёт. Выберите способ — мы рассчитаем стоимость тиража.
          </p>
        </div>

        <div className="calc-choice-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: 20, maxWidth: 1000, margin: "0 auto 56px" }}>
          <ChoiceCard
            emoji="✨"
            title="DTF-печать"
            desc="Полноцветные принты на ткани любого цвета. Расчёт по форматам и погонному метру."
            badge="от 1 шт и оптом"
            onClick={() => onChoose("calc")}
          />
          <ChoiceCard
            emoji="🖨️"
            title="Шелкография"
            desc="Трафаретная печать для тиражей с одинаковым макетом. Цена по формату, цветности и тиражу."
            badge="выгодно на тираже"
            onClick={() => onChoose("calc_silk")}
          />
          <ChoiceCard
            emoji="🔥"
            title="Термопечать"
            desc="Термоперенос плёнкой для логотипов, номеров и надписей. Цена по формату, цветности и тиражу."
            badge="1–3 цвета"
            onClick={() => onChoose("calc_termo")}
          />
        </div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "24px 5%", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.2)", margin: 0 }}>© 2026 Future Studio • СПб</p>
        {onOpenCookiePolicy && <button type="button" onClick={onOpenCookiePolicy} style={{ background: "none", border: "none", color: "rgba(240,238,245,.2)", fontSize: 12, fontWeight: 300, cursor: "pointer", padding: "4px 0 0", font: "inherit", display: "block", margin: "0 auto", textDecoration: "underline" }}>Политика конфиденциальности</button>}
      </footer>
    </div>
  );
}

function ChoiceCard({ emoji, title, desc, badge, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cs calc-panel calc-choice-card"
      style={{
        textAlign: "left", padding: "28px 26px", cursor: "pointer", border: "1px solid rgba(255,255,255,.08)",
        background: "rgba(255,255,255,.02)", borderRadius: 22, color: "#f0eef5", fontFamily: "'Outfit',sans-serif",
        display: "flex", flexDirection: "column", gap: 12, transition: "all .3s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,67,147,.4)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ fontSize: 36, lineHeight: 1 }}>{emoji}</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.5 }}>{desc}</div>
      <div style={{ marginTop: 4, display: "inline-flex", alignSelf: "flex-start", fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: "#e84393", background: "rgba(232,67,147,.1)", border: "1px solid rgba(232,67,147,.2)", borderRadius: 50, padding: "5px 12px" }}>{badge}</div>
      <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "#6c5ce7" }}>
        Открыть
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </div>
    </button>
  );
}
