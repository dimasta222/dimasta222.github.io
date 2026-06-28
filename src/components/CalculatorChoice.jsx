import STYLES from "../shared/appStyles.js";
import LogoMini from "./LogoMini.jsx";

// Экран-развилка: выбор калькулятора (DTF / Шелкография).
// Показывается при переходе в «Оптовый калькулятор» с главной.
export default function CalculatorChoice({ onBack, onGoHome, onChoose, onOpenCookiePolicy }) {
  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#08080c", color: "#f0eef5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{STYLES}</style>

      <div className="page-shell-narrow" style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 5% 0", width: "100%", flex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={onBack} aria-label="Назад" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", color: "inherit", padding: 0, font: "inherit" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84393" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" onClick={onGoHome} aria-label="На главную" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", background: "none", border: "none", color: "inherit", padding: 0, font: "inherit" }}>
            <LogoMini />
          </button>
        </div>

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
            icon="dtf"
            title="DTF-печать"
            desc="Полноцветные принты на ткани любого цвета. Расчёт по форматам и погонному метру."
            badge="от 1 шт и оптом"
            tone="#e84393"
            onClick={() => onChoose("calc")}
          />
          <ChoiceCard
            icon="silk"
            title="Шелкография"
            desc="Трафаретная печать для тиражей с одинаковым макетом. Цена по формату, цветности и тиражу."
            badge="выгодно на тираже"
            tone="#6c5ce7"
            onClick={() => onChoose("calc_silk")}
          />
          <ChoiceCard
            icon="termo"
            title="Термопечать"
            desc="Термоперенос плёнкой для логотипов, номеров и надписей. Цена по формату, цветности и тиражу."
            badge="1–3 цвета"
            tone="#fdcb6e"
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

function PrintMethodIcon({ type, tone }) {
  const common = {
    width: 42,
    height: 42,
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { display: "block" },
  };

  if (type === "silk") {
    return (
      <svg {...common} aria-hidden="true">
        <ellipse cx="32" cy="34" rx="8" ry="5" opacity=".18" fill={tone} stroke="none" />
        <ellipse cx="32" cy="34" rx="8" ry="5" />
        <path d="M32 39v12" />
        <path d="M23 54h18" />
        <path d="M27 51h10" />
        <path d="M32 34l-18-3" />
        <path d="M32 34l18-3" />
        <path d="M32 34L20 20" />
        <path d="M32 34l12-14" />
        <path d="M16 28l-9 4v8l17 3 9-4v-8z" opacity=".22" fill={tone} stroke="none" />
        <path d="M16 28l-9 4v8l17 3 9-4v-8z" />
        <path d="M12 33l13 2" />
        <path d="M48 28l9 4v8l-17 3-9-4v-8z" opacity=".22" fill={tone} stroke="none" />
        <path d="M48 28l9 4v8l-17 3-9-4v-8z" />
        <path d="M52 33l-13 2" />
        <path d="M20 17l-8-7-9 3v6l14 8 9-4z" />
        <path d="M44 17l8-7 9 3v6l-14 8-9-4z" />
        <path d="M19 43l-8 7" />
        <path d="M45 43l8 7" />
      </svg>
    );
  }

  if (type === "termo") {
    return (
      <svg {...common} aria-hidden="true">
        <ellipse cx="18" cy="32" rx="8" ry="14" opacity=".18" fill={tone} stroke="none" />
        <ellipse cx="18" cy="32" rx="8" ry="14" />
        <ellipse cx="18" cy="32" rx="3.2" ry="5.5" />
        <path d="M18 18h32" />
        <path d="M18 46h32" />
        <path d="M50 18v28" />
        <path d="M27 32h17" opacity=".45" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      <path d="M14 22h36c4 0 7 3 7 7v13c0 4-3 7-7 7H14c-4 0-7-3-7-7V29c0-4 3-7 7-7z" opacity=".18" fill={tone} stroke="none" />
      <path d="M14 22h36c4 0 7 3 7 7v13c0 4-3 7-7 7H14c-4 0-7-3-7-7V29c0-4 3-7 7-7z" />
      <path d="M17 22l2-8h26l2 8" />
      <path d="M14 36h36" />
      <path d="M20 30h22" opacity=".55" />
      <path d="M45 29h.2" />
      <path d="M50 29h.2" />
      <path d="M20 41h24l3 14H17z" opacity=".2" fill={tone} stroke="none" />
      <path d="M20 41h24l3 14H17z" />
      <path d="M24 47c6 0 8-4 5-9 7 3 7 10 2 13" />
      <path d="M31 44c3 5 8 4 9 0 3 5 0 9-5 10" />
      <path d="M27 52c5 0 11-1 16-5" opacity=".45" />
      <path d="M17 55h30" />
    </svg>
  );
}

function ChoiceCard({ icon, title, desc, badge, tone = "#e84393", onClick }) {
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
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${tone}66`; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ width: 58, height: 58, borderRadius: 18, display: "grid", placeItems: "center", color: tone, background: `linear-gradient(145deg,${tone}1f,rgba(255,255,255,.035))`, border: `1px solid ${tone}38`, boxShadow: `0 18px 38px ${tone}14` }}>
        <PrintMethodIcon type={icon} tone={tone} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.5 }}>{desc}</div>
      <div style={{ marginTop: 4, display: "inline-flex", alignSelf: "flex-start", fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: tone, background: `${tone}18`, border: `1px solid ${tone}33`, borderRadius: 50, padding: "5px 12px" }}>{badge}</div>
      <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: tone }}>
        Открыть
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </div>
    </button>
  );
}
