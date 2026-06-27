// Страница «Контакты» — адрес, телефон, часы работы и способы связи.
// Реквизиты берём из единого источника src/seo/businessInfo.js.

import { Link } from "react-router-dom";
import ServicePageLayout from "./ServicePageLayout.jsx";
import { BUSINESS } from "../seo/businessInfo.js";

const accent = "#e84393";
const accent2 = "#6c5ce7";

const yandexMapsUrl = "https://yandex.ru/maps/org/future_studio/220314499581/";

function Eyebrow({ children }) {
  return <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: accent2, textTransform: "uppercase" }}>{children}</span>;
}

export default function KontaktyPage(props) {
  const page = props.page;
  const faq = page?.faq || [];

  const rows = [
    { label: "Адрес", value: `${BUSINESS.address.street}, ${BUSINESS.address.floor}`, sub: `${BUSINESS.address.postalCode}, ${BUSINESS.address.district}` },
    { label: "Метро", value: BUSINESS.address.metro, sub: "около 890 м пешком" },
    { label: "Часы работы", value: BUSINESS.openingHours.human },
    { label: "Телефон", value: BUSINESS.phoneDisplay, href: `tel:${BUSINESS.phoneHref}` },
    { label: "E-mail", value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { label: "Telegram", value: "@FUTURE_178", href: BUSINESS.telegram, external: true },
  ];

  return (
    <ServicePageLayout {...props} includeLocalBusiness hideContactSection>
      {/* HERO */}
      <section className="section-shell" style={{ padding: "56px 5% 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <nav style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 20 }} aria-label="Хлебные крошки">
            <Link to="/" style={{ color: "rgba(240,238,245,.45)", textDecoration: "none" }}>Главная</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(240,238,245,.7)" }}>Контакты</span>
          </nav>
          <Eyebrow>Как нас найти</Eyebrow>
          <h1 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 200, lineHeight: 1.1, margin: "14px 0 18px" }}>{page?.h1}</h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 300, color: "rgba(240,238,245,.6)", maxWidth: 640, lineHeight: 1.6, margin: 0 }}>
            Студия DTF-печати Future Studio находится в Приморском районе Санкт-Петербурга, рядом с метро Комендантский проспект. Приходите за заказом или напишите нам — поможем с макетом и расчётом.
          </p>
        </div>
      </section>

      {/* КОНТАКТНЫЕ ДАННЫЕ */}
      <section className="section-shell" style={{ padding: "16px 5% 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 16 }}>
          {rows.map((r) => (
            <div key={r.label} style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 2, color: "rgba(240,238,245,.4)", textTransform: "uppercase", marginBottom: 8 }}>{r.label}</div>
              {r.href ? (
                <a href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ fontSize: 19, fontWeight: 500, color: "#f0eef5", textDecoration: "none" }}>{r.value}</a>
              ) : (
                <div style={{ fontSize: 19, fontWeight: 500 }}>{r.value}</div>
              )}
              {r.sub && <div style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginTop: 4 }}>{r.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA + КАРТА */}
      <section className="section-shell" style={{ padding: "8px 5% 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
            <button type="button" onClick={props.onOpenCalculator} style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Рассчитать заказ</button>
            <a href={BUSINESS.telegram} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Написать в Telegram</a>
            <a href={yandexMapsUrl} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Открыть на Яндекс.Картах</a>
          </div>
          <iframe
            title="Future Studio на карте"
            src={`https://yandex.ru/map-widget/v1/?ll=${BUSINESS.geo.longitude}%2C${BUSINESS.geo.latitude}&z=16&pt=${BUSINESS.geo.longitude}%2C${BUSINESS.geo.latitude}%2Cpm2rdm`}
            style={{ width: "100%", height: 360, border: 0, borderRadius: 16 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="section-shell" style={{ padding: "16px 5% 40px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <Eyebrow>Вопросы и ответы</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 24 }}>Частые <span style={{ fontWeight: 600 }}>вопросы</span></h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {faq.map((item, i) => (
                <details key={i} style={{ borderRadius: 14, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", padding: "16px 20px" }}>
                  <summary style={{ fontSize: 16, fontWeight: 500, cursor: "pointer", listStyle: "none" }}>{item.q}</summary>
                  <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.6, margin: "12px 0 0" }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </ServicePageLayout>
  );
}
