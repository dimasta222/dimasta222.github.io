// Страница «Блог» — индекс статей о печати на одежде.
// Пока статьи готовятся: показываем список тем без ссылок (чтобы не было
// битых URL). При появлении статей темы станут ссылками на /blog/<slug>/.

import { Link } from "react-router-dom";
import ServicePageLayout from "./ServicePageLayout.jsx";

const accent = "#e84393";
const accent2 = "#6c5ce7";

const TOPICS = [
  { t: "DTF или термоперенос: какую печать выбрать", d: "Сравниваем технологии по стойкости, цене и тканям." },
  { t: "Как ухаживать за принтом на одежде", d: "Стирка, глажка и сушка, чтобы принт служил дольше." },
  { t: "Как подготовить макет для печати", d: "Разрешение, форматы и прозрачный фон простыми словами." },
  { t: "Печать на тёмных тканях: в чём особенность", d: "Почему DTF подходит для чёрных и цветных изделий." },
  { t: "Сколько стоит напечатать футболку", d: "Из чего складывается цена и как сэкономить на тираже." },
  { t: "Мерч для компании: с чего начать", d: "Пошагово о брендировании одежды для бизнеса." },
];

function Eyebrow({ children }) {
  return <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: accent2, textTransform: "uppercase" }}>{children}</span>;
}

export default function BlogPage(props) {
  const page = props.page;

  return (
    <ServicePageLayout {...props}>
      {/* HERO */}
      <section className="section-shell" style={{ padding: "56px 5% 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <nav style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 20 }} aria-label="Хлебные крошки">
            <Link to="/" style={{ color: "rgba(240,238,245,.45)", textDecoration: "none" }}>Главная</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(240,238,245,.7)" }}>Блог</span>
          </nav>
          <Eyebrow>Полезное о печати</Eyebrow>
          <h1 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 200, lineHeight: 1.1, margin: "14px 0 18px" }}>{page?.h1}</h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 300, color: "rgba(240,238,245,.6)", maxWidth: 640, lineHeight: 1.6, margin: 0 }}>
            Инструкции, сравнения технологий и ответы на частые вопросы о DTF-печати на одежде. Готовим материалы, которые помогут выбрать печать и ухаживать за принтом.
          </p>
        </div>
      </section>

      {/* ТЕМЫ */}
      <section className="section-shell" style={{ padding: "16px 5% 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Скоро в блоге</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Темы <span style={{ fontWeight: 600 }}>статей</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 16 }}>
            {TOPICS.map((a) => (
              <div key={a.t} style={{ padding: "22px 24px", borderRadius: 16, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, color: accent2, textTransform: "uppercase", marginBottom: 10 }}>Готовится</div>
                <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.35, marginBottom: 8 }}>{a.t}</div>
                <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.5 }}>{a.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell" style={{ padding: "8px 5% 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(240,238,245,.55)", marginBottom: 18 }}>Не нашли ответ? Напишите нам — подскажем по вашему заказу.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button type="button" onClick={props.onOpenCalculator} style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Рассчитать заказ</button>
            <Link to="/kontakty/" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Контакты студии</Link>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
