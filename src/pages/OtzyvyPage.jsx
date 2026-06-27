// Страница «Отзывы» — рейтинги на внешних площадках и примеры отзывов.
// Рейтинги берём из единого источника src/seo/businessInfo.js.

import { Link } from "react-router-dom";
import ServicePageLayout from "./ServicePageLayout.jsx";
import { BUSINESS } from "../seo/businessInfo.js";

const accent = "#e84393";
const accent2 = "#6c5ce7";

const yandexUrl = "https://yandex.ru/maps/org/future_studio/220314499581/reviews/";
const avitoUrl = "https://www.avito.ru/brands/fbd1de8c13e6016a4bf34bac8abc7d51";

const REVIEWS = [
  { name: "Наталья Гвоздева", date: "8 фев 2025", text: "Быстро, качественно, бюджетно. Напечатали форму на коллектив. Стирают — всё супер!" },
  { name: "Юлия", date: "18 фев 2025", text: "Работаем давно! Всегда чётко, быстро, качественно. Если есть недочёты в макете — ребята подсказывают." },
  { name: "Дарья И.", date: "9 фев 2025", text: "Лояльные и компетентные ребята. Принт сделали за 15–20 минут. Всё понравилось!" },
];

function Eyebrow({ children }) {
  return <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: accent2, textTransform: "uppercase" }}>{children}</span>;
}

function Stars() {
  return <span style={{ color: "#ffce54", fontSize: 16, letterSpacing: 2 }}>★★★★★</span>;
}

export default function OtzyvyPage(props) {
  const page = props.page;

  const platforms = [
    { name: "Яндекс.Карты", rating: BUSINESS.ratings.yandex, href: yandexUrl },
    { name: "Авито", rating: BUSINESS.ratings.avito, href: avitoUrl },
  ];

  return (
    <ServicePageLayout {...props}>
      {/* HERO */}
      <section className="section-shell" style={{ padding: "56px 5% 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <nav style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 20 }} aria-label="Хлебные крошки">
            <Link to="/" style={{ color: "rgba(240,238,245,.45)", textDecoration: "none" }}>Главная</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(240,238,245,.7)" }}>Отзывы</span>
          </nav>
          <Eyebrow>Нам доверяют</Eyebrow>
          <h1 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 200, lineHeight: 1.1, margin: "14px 0 18px" }}>{page?.h1}</h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 300, color: "rgba(240,238,245,.6)", maxWidth: 640, lineHeight: 1.6, margin: 0 }}>
            Клиенты Future Studio оценивают нас на 5,0 на Яндекс.Картах и Авито. Собрали отзывы о печати на одежде в Приморском районе Санкт-Петербурга — читайте и оставляйте свой.
          </p>
        </div>
      </section>

      {/* РЕЙТИНГИ */}
      <section className="section-shell" style={{ padding: "8px 5% 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 16 }}>
          {platforms.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" style={{ padding: "22px 24px", borderRadius: 16, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", textDecoration: "none", color: "#f0eef5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{p.name}</div>
                <Stars />
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 30, fontWeight: 600, color: accent }}>{p.rating.value.toFixed(1)}</div>
                <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.4)" }}>{p.rating.count} отзывов</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="section-shell" style={{ padding: "16px 5% 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Отзывы клиентов</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Что о нас <span style={{ fontWeight: 600 }}>говорят</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 16 }}>
            {REVIEWS.map((r) => (
              <div key={r.name} style={{ padding: "22px 24px", borderRadius: 16, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)" }}>
                <Stars />
                <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(240,238,245,.75)", lineHeight: 1.6, margin: "12px 0 16px" }}>«{r.text}»</p>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.4)" }}>{r.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell" style={{ padding: "8px 5% 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href={yandexUrl} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Оставить отзыв на Яндексе</a>
          <button type="button" onClick={props.onOpenCalculator} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Рассчитать заказ</button>
        </div>
      </section>
    </ServicePageLayout>
  );
}
