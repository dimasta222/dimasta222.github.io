import { useState } from "react";
import { Link } from "react-router-dom";
import { METER_PRICES, PRINT_FORMATS } from "../data/printFormats.js";
import { SILK_FORMATS, SILK_TIERS } from "../data/silkscreenPrices.js";
import {
  SUBLIMATION_LOWEST_PRINT_RATE,
  SUBLIMATION_PRINT_TIERS,
  SUBLIMATION_SHRINK_TIERS,
  SUBLIMATION_WORK_WIDTH_M,
} from "../data/sublimationPrices.js";
import { TERMO_FORMATS, TERMO_TIERS } from "../data/termoprintPrices.js";
import ServicePageLayout from "./ServicePageLayout.jsx";

const TELEGRAM_URL = "https://t.me/FUTURE_178";
const accent = "#e84393";
const accent2 = "#6c5ce7";

const rubles = (value) => `${Number(value).toLocaleString("ru-RU")} ₽`;

const minMatrixPrice = (formats) => Math.min(
  ...formats.flatMap((format) => format.rows.flatMap((row) => row.prices)),
);

const PRINT_FORMAT_LABELS = {
  A6: "10×15 см",
  A5: "15×20 см",
  A4: "20×30 см",
  A3: "30×42 см",
  "A3+": "до 35×50 см",
  "A3++": "40×50 см",
};

const METHODS = [
  {
    id: "dtf",
    number: "01",
    title: "DTF-печать",
    price: `от ${rubles(PRINT_FORMATS[0].price)}`,
    condition: "оптовая цена от 5 шт",
    text: "Полноцветные изображения и логотипы на ткани любого цвета.",
    color: accent,
  },
  {
    id: "silk",
    number: "02",
    title: "Шелкография",
    price: `от ${rubles(minMatrixPrice(SILK_FORMATS))}`,
    condition: "тиражная печать от 30 шт",
    text: "Выгодна для партий с одинаковым макетом и небольшим числом цветов.",
    color: accent2,
  },
  {
    id: "thermo",
    number: "03",
    title: "Термопечать",
    price: `от ${rubles(minMatrixPrice(TERMO_FORMATS))}`,
    condition: "цена зависит от цвета и тиража",
    text: "Номера, фамилии, надписи и простые логотипы из плёнки.",
    color: "#00d2d3",
  },
  {
    id: "sublimation",
    number: "04",
    title: "Сублимация",
    price: `от ${rubles(SUBLIMATION_LOWEST_PRINT_RATE)}/м`,
    condition: "при метраже от 60 м",
    text: "Яркая полноцветная печать на светлой синтетике и спортивной форме.",
    color: "#fdcb6e",
  },
  {
    id: "embroidery",
    number: "05",
    title: "Вышивка",
    price: "Скоро",
    condition: "готовим запуск услуги",
    text: "Машинная вышивка логотипов, надписей и шевронов на одежде и текстиле.",
    color: "#a777e3",
    disabled: true,
  },
];

function Eyebrow({ children, color = accent }) {
  return <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color, textTransform: "uppercase" }}>{children}</div>;
}

function SectionHeading({ eyebrow, title, accentText, text, color = accent }) {
  return (
    <div className="prices-heading">
      <Eyebrow color={color}>{eyebrow}</Eyebrow>
      <h2>{title} <span style={{ color }}>{accentText}</span></h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function MethodCard({ method }) {
  const content = (
    <>
      <div className="prices-method-top">
        <span>{method.number}</span>
        <i />
      </div>
      <div>
        <h2>{method.title}</h2>
        <p>{method.text}</p>
      </div>
      <div>
        <strong>{method.price}</strong>
        <small>{method.condition}</small>
        <span className="prices-method-link">{method.disabled ? "Скоро появится" : "Смотреть прайс"} <b>{method.disabled ? "🔒" : "↓"}</b></span>
      </div>
    </>
  );
  const cardStyle = { "--method-color": method.color };
  return method.disabled
    ? <article className="prices-method-card prices-method-card-disabled" style={cardStyle} aria-disabled="true">{content}</article>
    : <a href={`#${method.id}`} className="prices-method-card" style={cardStyle}>{content}</a>;
}

function FormatTabs({ formats, active, onChange, color }) {
  return (
    <div className="prices-format-tabs" role="tablist" aria-label="Выбор формата">
      {formats.map((format) => (
        <button
          type="button"
          role="tab"
          aria-selected={active === format.name}
          key={format.name}
          onClick={() => onChange(format.name)}
          style={active === format.name ? { borderColor: color, color, background: `${color}14` } : undefined}
        >
          {format.name}
        </button>
      ))}
    </div>
  );
}

function MatrixTable({ format, tiers, tierLabel, color }) {
  return (
    <div className="prices-table-shell">
      <div className="prices-table-caption">
        <div>
          <span>Выбранный формат</span>
          <strong>{format.label}</strong>
        </div>
        <small>Цена за одно нанесение</small>
      </div>
      <div className="prices-table-scroll">
        <table className="prices-matrix">
          <thead>
            <tr>
              <th>Макет</th>
              {tiers.map((tier) => <th key={tier}>{tierLabel(tier)}</th>)}
            </tr>
          </thead>
          <tbody>
            {format.rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                {row.prices.map((price, index) => (
                  <td key={`${row.label}-${tiers[index]}`} style={{ color }}>{rubles(price)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PriceNote({ children, color = accent }) {
  return (
    <div className="prices-note" style={{ borderColor: `${color}3d`, background: `${color}0d` }}>
      <span style={{ background: color }} />
      <p>{children}</p>
    </div>
  );
}

function CalculatorLink({ to, color, label, darkText = false }) {
  return (
    <Link
      className="prices-calculator-cta"
      to={to}
      aria-label={`Открыть онлайн-калькулятор: ${label}`}
      style={{ "--cta-color": color, "--cta-text": darkText ? "#08080c" : "#fff" }}
    >
      <span className="prices-calculator-cta-icon" aria-hidden="true">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="3" /><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2" /></svg>
      </span>
      <span className="prices-calculator-cta-copy"><small>Онлайн-калькулятор</small><strong>Рассчитать стоимость</strong></span>
      <span className="prices-calculator-cta-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

export default function PricesPage(props) {
  const [silkFormatName, setSilkFormatName] = useState(SILK_FORMATS[0].name);
  const [thermoFormatName, setThermoFormatName] = useState(TERMO_FORMATS[0].name);
  const silkFormat = SILK_FORMATS.find((format) => format.name === silkFormatName) || SILK_FORMATS[0];
  const thermoFormat = TERMO_FORMATS.find((format) => format.name === thermoFormatName) || TERMO_FORMATS[0];

  return (
    <ServicePageLayout {...props}>
      <style>{`
        .prices-page{--pink:#e84393;--violet:#6c5ce7;--muted:rgba(240,238,245,.58)}
        .prices-wrap{width:min(1180px,90%);margin:0 auto}
        .prices-hero{padding:64px 0 46px}
        .prices-hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(340px,.92fr);gap:clamp(32px,6vw,74px);align-items:center}
        .prices-breadcrumb{font-size:13px;color:rgba(240,238,245,.42);margin-bottom:24px}.prices-breadcrumb a{color:inherit;text-decoration:none}
        .prices-hero h1{font-size:clamp(38px,6vw,68px);line-height:1.02;font-weight:200;margin:14px 0 20px;letter-spacing:-1.5px}
        .prices-hero h1 span{font-weight:700;background:linear-gradient(135deg,var(--pink),var(--violet));background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .prices-hero-copy{max-width:680px;font-size:clamp(15px,1.8vw,18px);line-height:1.68;color:var(--muted);font-weight:300;margin:0 0 28px}
        .prices-actions{display:flex;gap:12px;flex-wrap:wrap}.prices-actions a,.prices-actions button{border-radius:999px;padding:14px 24px;font:500 15px inherit;text-decoration:none;cursor:pointer}
        .prices-primary{border:0;color:#fff;background:linear-gradient(135deg,var(--pink),var(--violet));box-shadow:0 18px 42px rgba(232,67,147,.2)}
        .prices-secondary{color:#f0eef5;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)}
        .prices-hero-photo{position:relative;min-height:430px;border-radius:30px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#11111a;box-shadow:0 26px 80px rgba(0,0,0,.34)}
        .prices-hero-photo img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover}
        .prices-hero-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(8,8,12,.78))}
        .prices-photo-label{position:absolute;z-index:1;left:22px;right:22px;bottom:20px;display:flex;justify-content:space-between;align-items:end;gap:16px}.prices-photo-label span{font-size:13px;color:rgba(255,255,255,.7)}.prices-photo-label strong{font-size:18px}
        .prices-methods{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;padding:22px 0 54px}
        .prices-method-card{min-height:282px;padding:22px;border-radius:22px;border:1px solid color-mix(in srgb,var(--method-color) 34%,transparent);background:linear-gradient(145deg,color-mix(in srgb,var(--method-color) 10%,transparent),rgba(255,255,255,.018) 60%);color:#f0eef5;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between;gap:20px;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
        .prices-method-card:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--method-color) 65%,transparent);box-shadow:0 20px 48px color-mix(in srgb,var(--method-color) 12%,transparent)}
        .prices-method-card-disabled{opacity:.68;cursor:not-allowed}.prices-method-card-disabled:hover{transform:none;border-color:color-mix(in srgb,var(--method-color) 34%,transparent);box-shadow:none}
        .prices-method-top{display:flex;justify-content:space-between;align-items:center;color:var(--method-color);font-size:12px;font-weight:700;letter-spacing:2px}.prices-method-top i{width:9px;height:9px;border-radius:50%;background:var(--method-color);box-shadow:0 0 18px var(--method-color)}
        .prices-method-card h2{font-size:21px;margin:0 0 10px}.prices-method-card p{font-size:13px;line-height:1.5;color:var(--muted);margin:0}.prices-method-card strong{display:block;font-size:24px;color:var(--method-color);line-height:1.15}.prices-method-card small{display:block;min-height:32px;margin-top:6px;color:rgba(240,238,245,.4);line-height:1.35}.prices-method-link{display:flex;justify-content:space-between;align-items:center;margin-top:15px;font-size:13px;font-weight:600}.prices-method-link b{color:var(--method-color);font-size:18px}
        .prices-sticky{position:sticky;top:72px;z-index:45;background:rgba(8,8,12,.9);backdrop-filter:blur(18px);border-block:1px solid rgba(255,255,255,.06)}
        .prices-sticky-inner{display:flex;gap:8px;overflow-x:auto;padding:12px 0;scrollbar-width:none}.prices-sticky-inner::-webkit-scrollbar{display:none}.prices-sticky a,.prices-sticky-soon{flex:0 0 auto;padding:9px 14px;border-radius:999px;color:rgba(240,238,245,.58);border:1px solid rgba(255,255,255,.08);text-decoration:none;font-size:13px;transition:.2s}.prices-sticky a:hover{color:#fff;border-color:rgba(232,67,147,.45);background:rgba(232,67,147,.08)}.prices-sticky-soon{color:rgba(240,238,245,.3);cursor:not-allowed}.prices-sticky-soon b{margin-left:5px;color:#a777e3;font-size:9px;letter-spacing:1px;text-transform:uppercase}
        .prices-section{padding:76px 0;scroll-margin-top:128px}.prices-section+.prices-section{border-top:1px solid rgba(255,255,255,.055)}
        .prices-heading{max-width:760px;margin-bottom:30px}.prices-heading h2{font-size:clamp(28px,4vw,44px);font-weight:250;line-height:1.12;margin:12px 0}.prices-heading h2 span{font-weight:700}.prices-heading p{font-size:15px;line-height:1.65;color:var(--muted);margin:0;font-weight:300}
        .prices-dtf-layout{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(270px,.65fr);gap:18px;align-items:start}
        .prices-format-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.07);border-radius:22px;overflow:hidden}
        .prices-format-card{padding:20px;background:#0e0e15;min-height:150px;display:flex;flex-direction:column;justify-content:space-between}.prices-format-card span{font-size:12px;color:rgba(240,238,245,.42)}.prices-format-card strong{font-size:22px;margin:8px 0}.prices-format-card b{font-size:20px;color:var(--pink)}.prices-format-card small{font-size:11px;color:rgba(240,238,245,.4);margin-top:4px}
        .prices-meter{border:1px solid rgba(255,255,255,.08);border-radius:22px;overflow:hidden;background:rgba(255,255,255,.018)}.prices-meter-head{padding:20px;border-bottom:1px solid rgba(255,255,255,.07)}.prices-meter-head span{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:rgba(240,238,245,.4)}.prices-meter-head h3{font-size:19px;margin:7px 0 0}.prices-meter-row{display:flex;justify-content:space-between;gap:12px;padding:13px 20px;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px}.prices-meter-row:last-child{border-bottom:0}.prices-meter-row span{color:rgba(240,238,245,.55)}.prices-meter-row strong{color:var(--pink)}
        .prices-format-tabs{display:flex;gap:8px;overflow-x:auto;margin-bottom:16px;scrollbar-width:none}.prices-format-tabs::-webkit-scrollbar{display:none}.prices-format-tabs button{flex:0 0 auto;min-width:64px;padding:10px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.025);color:rgba(240,238,245,.55);font:600 13px inherit;cursor:pointer}
        .prices-table-shell{border:1px solid rgba(255,255,255,.08);border-radius:22px;overflow:hidden;background:rgba(255,255,255,.015)}.prices-table-caption{display:flex;justify-content:space-between;gap:18px;align-items:end;padding:19px 22px;border-bottom:1px solid rgba(255,255,255,.07)}.prices-table-caption span{display:block;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:rgba(240,238,245,.35);margin-bottom:5px}.prices-table-caption strong{font-size:20px}.prices-table-caption small{color:rgba(240,238,245,.4)}.prices-table-scroll{overflow-x:auto}.prices-matrix{width:100%;min-width:760px;border-collapse:collapse}.prices-matrix th,.prices-matrix td{padding:13px 14px;border-bottom:1px solid rgba(255,255,255,.05);text-align:right;white-space:nowrap;font-size:13px}.prices-matrix th{font-size:11px;letter-spacing:.6px;color:rgba(240,238,245,.4);font-weight:600;background:rgba(255,255,255,.018)}.prices-matrix th:first-child,.prices-matrix td:first-child{text-align:left;position:sticky;left:0;background:#0d0d14;z-index:1}.prices-matrix td:first-child{font-weight:600;color:#f0eef5}.prices-matrix tbody tr:last-child td{border-bottom:0}
        .prices-note{display:flex;gap:12px;align-items:flex-start;margin-top:16px;padding:14px 16px;border:1px solid;border-radius:15px}.prices-note>span{width:8px;height:8px;border-radius:50%;margin-top:6px;flex:0 0 auto}.prices-note p{font-size:13px;line-height:1.55;color:rgba(240,238,245,.58);margin:0}
        .prices-sublimation-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.prices-sublimation-layout .prices-meter-row strong{color:#fdcb6e}.prices-sublimation-meta{display:flex;justify-content:space-between;align-items:center;gap:22px;margin-top:18px;padding:20px 22px;border-radius:20px;border:1px solid rgba(253,203,110,.24);background:linear-gradient(135deg,rgba(253,203,110,.09),rgba(0,210,211,.055))}.prices-sublimation-meta>div>span{display:block;font-size:12px;color:rgba(240,238,245,.42);margin-bottom:5px}.prices-sublimation-meta>div>strong{font-size:21px}.prices-section-cta{display:flex;justify-content:flex-end;margin-top:18px}.prices-calculator-cta{flex:0 0 auto;min-width:310px;display:grid;grid-template-columns:42px minmax(0,1fr) 24px;align-items:center;gap:12px;padding:10px 13px;border-radius:17px;border:1px solid color-mix(in srgb,var(--cta-color) 72%,white);color:var(--cta-text);text-decoration:none;background:linear-gradient(135deg,var(--cta-color),color-mix(in srgb,var(--cta-color) 72%,#08080c));box-shadow:0 16px 36px color-mix(in srgb,var(--cta-color) 22%,transparent);transition:border-color .2s ease,box-shadow .2s ease}.prices-calculator-cta:hover{border-color:color-mix(in srgb,var(--cta-color) 45%,white);box-shadow:0 18px 42px color-mix(in srgb,var(--cta-color) 32%,transparent)}.prices-calculator-cta:focus-visible{outline:2px solid #fff;outline-offset:3px}.prices-calculator-cta-icon{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.14)}.prices-calculator-cta-copy{min-width:0}.prices-calculator-cta-copy small{display:block;margin-bottom:2px;color:currentColor;opacity:.68;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase}.prices-calculator-cta-copy strong{display:block;color:currentColor;font-size:15px;line-height:1.25}.prices-calculator-cta-arrow{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.15);font-size:15px}
        .prices-extra-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.prices-extra-card{padding:19px;border-radius:18px;border:1px solid rgba(255,255,255,.075);background:rgba(255,255,255,.02)}.prices-extra-card span{font-size:11px;color:rgba(240,238,245,.38);text-transform:uppercase;letter-spacing:1px}.prices-extra-card strong{display:block;font-size:18px;margin:9px 0}.prices-extra-card p{font-size:12px;color:rgba(240,238,245,.5);line-height:1.5;margin:0}
        .prices-final{margin:28px 0 78px;padding:clamp(26px,5vw,48px);border-radius:28px;border:1px solid rgba(232,67,147,.25);background:radial-gradient(circle at 85% 10%,rgba(108,92,231,.19),transparent 35%),linear-gradient(145deg,rgba(232,67,147,.1),rgba(255,255,255,.02));display:flex;justify-content:space-between;gap:30px;align-items:center}.prices-final h2{font-size:clamp(25px,4vw,38px);font-weight:250;margin:0 0 10px}.prices-final p{max-width:650px;color:var(--muted);line-height:1.6;margin:0}
        @media(max-width:980px){.prices-hero-grid{grid-template-columns:1fr}.prices-hero-photo{min-height:360px}.prices-methods{grid-template-columns:repeat(2,minmax(0,1fr))}.prices-dtf-layout{grid-template-columns:1fr}.prices-extra-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:640px){.prices-hero{padding:38px 0 30px}.prices-hero h1{letter-spacing:-.6px}.prices-hero-photo{min-height:280px;border-radius:22px}.prices-methods{display:flex;overflow-x:auto;margin-inline:-5.5%;padding:8px 5.5% 40px;scroll-snap-type:x mandatory;scrollbar-width:none}.prices-methods::-webkit-scrollbar{display:none}.prices-method-card{flex:0 0 82%;min-height:265px;scroll-snap-align:start}.prices-sticky{top:72px}.prices-section{padding:54px 0}.prices-format-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.prices-sublimation-layout,.prices-extra-grid{grid-template-columns:1fr}.prices-sublimation-meta{align-items:flex-start;flex-direction:column}.prices-section-cta,.prices-calculator-cta{width:100%}.prices-calculator-cta{min-width:0}.prices-table-caption{align-items:start;flex-direction:column}.prices-final{align-items:flex-start;flex-direction:column;margin-bottom:54px}.prices-actions{width:100%}.prices-actions a,.prices-actions button{flex:1;text-align:center;white-space:nowrap}}
      `}</style>

      <div className="prices-page">
        <section className="prices-hero">
          <div className="prices-wrap prices-hero-grid">
            <div>
              <div className="prices-breadcrumb"><Link to="/">Главная</Link> <span> / Цены</span></div>
              <Eyebrow>Прайс Future Studio</Eyebrow>
              <h1>Цены на печать <span>без догадок</span></h1>
              <p className="prices-hero-copy">Выберите технологию и посмотрите актуальные цены по формату, цветности и тиражу. Точный расчёт зависит от макета, ткани и расположения нанесения.</p>
              <div className="prices-actions">
                <button type="button" className="prices-primary" onClick={props.onOpenCalculator}>Рассчитать заказ</button>
                <a className="prices-secondary" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
              </div>
            </div>
            <div className="prices-hero-photo">
              <img src="/services/opt/b2b-tshirts-worktable.webp" alt="Готовый тираж футболок после печати" />
              <div className="prices-photo-label"><strong>Печать для одного изделия и тиража</strong><span>Санкт-Петербург</span></div>
            </div>
          </div>
        </section>

        <section className="prices-wrap prices-methods" aria-label="Технологии печати">
          {METHODS.map((method) => <MethodCard key={method.id} method={method} />)}
        </section>

        <nav className="prices-sticky" aria-label="Разделы прайса">
          <div className="prices-wrap prices-sticky-inner">
            <a href="#dtf">DTF-печать</a>
            <a href="#silk">Шелкография</a>
            <a href="#thermo">Термопечать</a>
            <a href="#sublimation">Сублимация</a>
            <span className="prices-sticky-soon">Вышивка <b>скоро</b></span>
            <a href="#extras">Дополнительные услуги</a>
          </div>
        </nav>

        <div className="prices-wrap">
          <section className="prices-section" id="dtf">
            <SectionHeading eyebrow="Полноцветная печать" title="DTF:" accentText="цена по формату" text="Оптовая цена действует от 5 одинаковых или разных изделий. Стоимость указана за один принт вместе с прижимом." />
            <div className="prices-dtf-layout">
              <div className="prices-format-grid">
                {PRINT_FORMATS.map((format) => (
                  <article className="prices-format-card" key={format.name}>
                    <span>формат принта</span>
                    <strong>{format.name} <small>{PRINT_FORMAT_LABELS[format.name]}</small></strong>
                    <b>{rubles(format.price)}</b>
                    <small>за принт · при заказе от 5 шт</small>
                  </article>
                ))}
              </div>
              <div className="prices-meter">
                <div className="prices-meter-head"><span>DTF-трансферы</span><h3>Печать по метражу</h3></div>
                {METER_PRICES.map((row) => (
                  <div className="prices-meter-row" key={row.range}><span>{row.range}</span><strong>{row.price}</strong></div>
                ))}
              </div>
            </div>
            <PriceNote>Для 1 изделия тестовый принт формата A6–A3 стоит 600 ₽. Минимальная стоимость печати — 500 ₽. Отдельный перенос готового принта — 100 ₽ за изделие.</PriceNote>
            <div className="prices-section-cta"><CalculatorLink to="/calculator/dtf/" color={accent} label="DTF-печать" /></div>
          </section>

          <section className="prices-section" id="silk">
            <SectionHeading eyebrow="Тиражная технология" title="Шелкография:" accentText="цвета и количество" text="Выберите формат, чтобы увидеть стоимость одного нанесения по числу цветов и размеру тиража." color={accent2} />
            <FormatTabs formats={SILK_FORMATS} active={silkFormatName} onChange={setSilkFormatName} color={accent2} />
            <MatrixTable format={silkFormat} tiers={SILK_TIERS} tierLabel={(tier) => `${tier} шт`} color={accent2} />
            <PriceNote color={accent2}>Текстиль, подложка для тёмной ткани, специальные краски и дополнительные эффекты считаются отдельно. Точный вариант зависит от макета и изделия.</PriceNote>
            <div className="prices-section-cta"><CalculatorLink to="/calculator/shelkografiya/" color={accent2} label="Шелкография" /></div>
          </section>

          <section className="prices-section" id="thermo">
            <SectionHeading eyebrow="Термотрансферная плёнка" title="Термопечать:" accentText="1–3 цвета" text="Подходит для номеров, фамилий, надписей и лаконичных логотипов. Выберите формат для просмотра таблицы." color="#00d2d3" />
            <FormatTabs formats={TERMO_FORMATS} active={thermoFormatName} onChange={setThermoFormatName} color="#00d2d3" />
            <MatrixTable format={thermoFormat} tiers={TERMO_TIERS} tierLabel={(tier) => tier === 1 ? "1 шт" : `${tier} шт`} color="#00d2d3" />
            <PriceNote color="#00d2d3">Цена указана за нанесение на одно изделие. Итог зависит от количества цветов, размера, ткани и сложности расположения принта.</PriceNote>
            <div className="prices-section-cta"><CalculatorLink to="/calculator/termopechat/" color="#00d2d3" label="Термопечать" darkText /></div>
          </section>

          <section className="prices-section" id="sublimation">
            <SectionHeading eyebrow="Печать на синтетике" title="Сублимация:" accentText="цена за погонный метр" text="Печать рассчитывается по метражу при рабочей ширине 1,55 м. Усадка — отдельная опция и добавляется только при выборе." color="#fdcb6e" />
            <div className="prices-sublimation-layout">
              <div className="prices-meter">
                <div className="prices-meter-head"><span>Основная услуга</span><h3>Печать</h3></div>
                {SUBLIMATION_PRINT_TIERS.map((tier) => <div className="prices-meter-row" key={tier.label}><span>{tier.label}</span><strong>{rubles(tier.rate)}/м</strong></div>)}
              </div>
              <div className="prices-meter">
                <div className="prices-meter-head"><span>Отдельная опция</span><h3>Усадка</h3></div>
                {SUBLIMATION_SHRINK_TIERS.map((tier) => <div className="prices-meter-row" key={tier.label}><span>{tier.label}</span><strong>{rubles(tier.rate)}/м</strong></div>)}
              </div>
            </div>
            <div className="prices-sublimation-meta">
              <div><span>Рабочая ширина печати</span><strong>{String(SUBLIMATION_WORK_WIDTH_M).replace(".", ",")} м</strong></div>
            </div>
            <div className="prices-section-cta"><CalculatorLink to="/calculator/sublimaciya/" color="#fdcb6e" label="Сублимация" darkText /></div>
          </section>

          <section className="prices-section" id="extras">
            <SectionHeading eyebrow="Дополнительно" title="Что ещё может" accentText="войти в заказ" text="Эти услуги считаются отдельно, когда они действительно нужны для конкретного изделия или макета." />
            <div className="prices-extra-grid">
              <article className="prices-extra-card"><span>Макет</span><strong>от 500 ₽</strong><p>Удаление фона, доработка изображения и подготовка файла к печати.</p></article>
              <article className="prices-extra-card"><span>Перенос</span><strong>100 ₽/шт</strong><p>Отдельное нанесение готового DTF-принта на изделие.</p></article>
              <article className="prices-extra-card"><span>Своя одежда</span><strong>после проверки</strong><p>Перед печатью проверяем ткань, швы и доступную область нанесения.</p></article>
              <article className="prices-extra-card"><span>Срочность</span><strong>по согласованию</strong><p>Зависит от готовности макета, тиража и загрузки производства.</p></article>
            </div>
          </section>

          <section className="prices-final">
            <div><h2>Не уверены, какую технологию выбрать?</h2><p>Пришлите макет, размер принта, изделие и количество. Мы сравним варианты и предложим подходящий способ печати.</p></div>
            <div className="prices-actions">
              <button type="button" className="prices-primary" onClick={props.onOpenCalculator}>Открыть калькулятор</button>
              <a className="prices-secondary" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Получить расчёт</a>
            </div>
          </section>
        </div>
      </div>
    </ServicePageLayout>
  );
}
