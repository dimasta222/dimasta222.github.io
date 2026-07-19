// Страница «Печать на футболках» — образец SEO-страницы услуги.
// Тексты черновые (вариант А: контент живёт в компоненте).
// Цены берутся из единого источника src/data/printFormats.js.

import { Link } from "react-router-dom";
import ServicePageLayout from "./ServicePageLayout.jsx";
import { PRINT_FORMATS } from "../data/printFormats.js";

const TELEGRAM_URL = "https://t.me/FUTURE_178";

// Маркетинговые подписи размеров + цена из printFormats (единый источник).
const PRICE_BY_NAME = Object.fromEntries(PRINT_FORMATS.map((f) => [f.name, f.price]));
const FORMAT_ROWS = [
  { name: "A6", size: "10×15 см" },
  { name: "A5", size: "15×20 см" },
  { name: "A4", size: "20×30 см" },
  { name: "A3", size: "30×42 см" },
  { name: "A3+", size: "до 35×50 см" },
  { name: "A3++", size: "40×50 см" },
].map((r) => ({ ...r, price: PRICE_BY_NAME[r.name] }));

const STEPS = [
  { n: 1, t: "Пришлите идею", d: "Отправьте готовый принт или опишите задумку в Telegram либо на месте в студии." },
  { n: 2, t: "Согласуем макет", d: "Подготовим превью, подскажем по размеру и расположению принта на футболке." },
  { n: 3, t: "Печатаем", d: "Заберите готовую футболку в студии у метро Комендантский или оформим доставку по СПб." },
];

const FEATURES = [
  { t: "От 1 штуки", d: "Печатаем и одну футболку, и большой тираж без наценки за количество." },
  { t: "DTF-технология", d: "Насыщенные цвета и стойкость принта к стиркам и растяжению." },
  { t: "Быстро", d: "Простые принты — от 20 минут при готовом макете." },
  { t: "Поможем с макетом", d: "Подберём размер, поправим файл или дорисуем дизайн." },
  { t: "Рейтинг 5,0", d: "Десятки отзывов на Яндекс.Картах и Авито." },
  { t: "Своя или ваша футболка", d: "Нанесём принт на наше изделие или на принесённую вещь." },
];

const accent = "#e84393";
const accent2 = "#6c5ce7";

function Eyebrow({ children }) {
  return <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: accent2, textTransform: "uppercase" }}>{children}</span>;
}

export default function FutbolkiPage(props) {
  const page = props.page;
  const faq = page?.faq || [];

  return (
    <ServicePageLayout {...props}>
      {/* HERO */}
      <section className="section-shell" style={{ padding: "56px 5% 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <nav style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 20 }} aria-label="Хлебные крошки">
            <Link to="/" style={{ color: "rgba(240,238,245,.45)", textDecoration: "none" }}>Главная</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(240,238,245,.7)" }}>Печать на футболках</span>
          </nav>

          <Eyebrow>Печать на одежде в СПб</Eyebrow>
          <h1 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 200, lineHeight: 1.1, margin: "14px 0 18px" }}>
            Печать на футболках в Приморском районе —<br /><span style={{ fontWeight: 600 }}>от 1 штуки</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 300, color: "rgba(240,238,245,.6)", maxWidth: 640, lineHeight: 1.6, margin: "0 0 28px" }}>
            Нанесём ваш принт на футболку методом DTF — ярко и стойко к стиркам. Студия Future Studio у метро Комендантский проспект. Готовность простых заказов — от 20 минут.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button type="button" onClick={props.onOpenCalculator} style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Рассчитать заказ</button>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Заказать в Telegram</a>
          </div>
        </div>
      </section>

      {/* КАК ЗАКАЗАТЬ */}
      <section className="section-shell" style={{ padding: "40px 5%" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Как заказать</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Три простых <span style={{ fontWeight: 600 }}>шага</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
            {STEPS.map((s) => (
              <div key={s.n} className="cg" style={{ padding: 24, borderRadius: 16, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${accent2},${accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, marginBottom: 14 }}>{s.n}</div>
                <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 6 }}>{s.t}</div>
                <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section className="section-shell" style={{ padding: "40px 5%" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Почему мы</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Преимущества <span style={{ fontWeight: 600 }}>печати у нас</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 16 }}>
            {FEATURES.map((f) => (
              <div key={f.t} style={{ padding: "18px 20px", borderRadius: 14, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", display: "flex", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, marginTop: 7, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{f.t}</div>
                  <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.5 }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЦЕНЫ */}
      <section className="section-shell" style={{ padding: "40px 5%" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Цены</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Стоимость печати <span style={{ fontWeight: 600 }}>по размеру принта</span></h2>
          <div style={{ maxWidth: 560, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)" }}>
            {FORMAT_ROWS.map((r, i) => (
              <div key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: i % 2 ? "rgba(255,255,255,.02)" : "transparent" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{r.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)" }}>{r.size}</span>
                </div>
                <span style={{ fontSize: 16, fontWeight: 500, color: accent }}>{r.price} ₽</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginTop: 14, lineHeight: 1.6, maxWidth: 560 }}>
            Цена за принт + прижим. Тестовый образец — 600 ₽. Минимальная стоимость заказа — 500 ₽. При тираже от 5 штук и больших объёмах цена ниже — рассчитайте точно в калькуляторе.
          </p>
          <div style={{ marginTop: 22 }}>
            <button type="button" onClick={props.onOpenCalculator} style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "13px 26px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", marginRight: 12 }}>Открыть калькулятор</button>
            <button type="button" onClick={props.onOpenConstructor} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "13px 26px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Создать дизайн в конструкторе</button>
          </div>
        </div>
      </section>

      {/* SEO-ТЕКСТ */}
      <section className="section-shell" style={{ padding: "40px 5%" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 200, marginBottom: 20 }}>О печати на футболках в <span style={{ fontWeight: 600 }}>Future Studio</span></h2>
          <div style={{ fontSize: 15, fontWeight: 300, color: "rgba(240,238,245,.6)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 16 }}>
            <p>Future Studio — студия DTF-печати на футболках в Приморском районе Санкт-Петербурга. Мы наносим принты на футболки от одной штуки: подойдёт и для личного подарка, и для корпоративного мерча, и для команды или мероприятия.</p>
            <p>Используем технологию DTF (Direct to Film) — она переносит изображение на ткань любого цвета и состава, даёт яркие цвета с чёткими деталями и сохраняет принт после многократных стирок. Печать на футболке с логотипом, фотографией или надписью получается аккуратной и долговечной.</p>
            <p>Принимаем макеты в форматах PNG и PDF от 300 dpi. Если готового файла нет — наш дизайнер поможет подготовить макет, убрать фон или нарисовать принт с нуля. Студия находится рядом с метро Комендантский проспект, забрать заказ можно самовывозом или оформить доставку по Санкт-Петербургу.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="section-shell" style={{ padding: "40px 5%" }}>
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

      {/* ПЕРЕЛИНКОВКА */}
      <section className="section-shell" style={{ padding: "40px 5% 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Смотрите также</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 14, marginTop: 18 }}>
            {[
              { to: "/pechat-na-tolstovkah/", t: "Печать на худи и толстовках" },
              { to: "/dtf-pechat/", t: "DTF печать" },
              { to: "/opt/", t: "Оптовый заказ от 5 шт" },
              { to: "/kontakty/", t: "Контакты и адрес" },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ display: "block", padding: "18px 20px", borderRadius: 14, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", color: "#f0eef5", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>
                {l.t} <span style={{ color: accent }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
