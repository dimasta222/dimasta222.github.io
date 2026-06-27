// Временная заглушка для SEO-страниц, чьи компоненты ещё не созданы.
// Использует общий макет и SeoHead, поэтому мета-теги и навигация уже работают.
// На шаге тиражирования заменяется полноценным компонентом страницы.

import { Link } from "react-router-dom";
import ServicePageLayout from "./ServicePageLayout.jsx";

const accent = "#e84393";
const accent2 = "#6c5ce7";

export default function ServicePagePlaceholder(props) {
  const page = props.page;

  return (
    <ServicePageLayout {...props}>
      <section className="section-shell" style={{ padding: "80px 5% 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <nav style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 20 }} aria-label="Хлебные крошки">
            <Link to="/" style={{ color: "rgba(240,238,245,.45)", textDecoration: "none" }}>Главная</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(240,238,245,.7)" }}>{page?.breadcrumbLabel || page?.h1}</span>
          </nav>

          <h1 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 200, lineHeight: 1.15, margin: "0 0 18px" }}>{page?.h1}</h1>
          <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.6, maxWidth: 620, margin: "0 0 28px" }}>
            {page?.description}
          </p>
          <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 28 }}>
            Страница наполняется содержимым. Уже сейчас можно рассчитать заказ или написать нам.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button type="button" onClick={props.onOpenCalculator} style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "13px 26px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Рассчитать заказ</button>
            <a href="https://t.me/FUTURE_178" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "13px 26px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Написать в Telegram</a>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
