// Универсальный рендер SEO-страницы услуги.
// Теперь это не только текстовая посадочная, а визуальная страница:
// hero с мокапом, слайды-примеры, карточки применения, цены, FAQ и перелинковка.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SERVICE_PHOTOS } from "../assets/servicePhotos.js";
import { METER_PRICES, PRINT_FORMATS } from "../data/printFormats.js";
import { SILK_FORMATS, SILK_TIERS } from "../data/silkscreenPrices.js";
import ServicePageLayout from "./ServicePageLayout.jsx";
import { DEFAULT_STEPS, SERVICE_CONTENT } from "./servicePagesContent.js";

const TELEGRAM_URL = "https://t.me/FUTURE_178";
const accent = "#e84393";
const accent2 = "#6c5ce7";
const cyan = "#00d2d3";
const yellow = "#fdcb6e";

const PRICE_BY_NAME = Object.fromEntries(PRINT_FORMATS.map((f) => [f.name, f.price]));
const FORMAT_ROWS = [
  { name: "A6", size: "10×15 см" },
  { name: "A5", size: "15×20 см" },
  { name: "A4", size: "20×30 см" },
  { name: "A3", size: "30×42 см" },
  { name: "A3+", size: "до 35×50 см" },
  { name: "A3++", size: "40×50 см" },
].map((r) => ({ ...r, price: PRICE_BY_NAME[r.name] }));

const PAGE_VISUALS = {
  futbolki: {
    product: "Футболка",
    badge: "TEE",
    print: "YOUR PRINT",
    tone: [accent, accent2],
    caption: "Футболки с принтом от 1 штуки и оптом",
    slides: [
      { label: "Футболка", title: "Принт на груди", text: "Логотип, надпись, фото или иллюстрация на светлой и тёмной ткани.", badge: "A4" },
      { label: "Подарок", title: "Одна футболка", text: "Быстрый персональный заказ при готовом макете.", badge: "от 1 шт" },
      { label: "Мерч", title: "Тираж для команды", text: "Одинаковый принт для компании, бренда или события.", badge: "опт" },
    ],
  },
  dtf: {
    product: "Худи",
    badge: "DTF",
    print: "FULL COLOR",
    tone: [accent, accent2],
    caption: "Полноцветный принт на тёмной ткани",
    slides: [
      { label: "Худи", title: "Большой принт на спине", text: "Яркий полноцветный рисунок без ограничения по цветам.", badge: "A3+" },
      { label: "Поло", title: "Логотип на груди", text: "Аккуратное нанесение на фактурную ткань.", badge: "лого" },
      { label: "Шоппер", title: "Мерч для бренда", text: "Принт на сумках, аксессуарах и текстиле.", badge: "мерч" },
    ],
  },
  termopechat: {
    product: "Форма",
    badge: "TERMO",
    print: "№ 17",
    tone: [cyan, accent2],
    caption: "Номера, фамилии и простые логотипы",
    slides: [
      { label: "Форма", title: "Номер и фамилия", text: "Хорошо подходит для спортивной формы и команд.", badge: "1 цвет" },
      { label: "Поло", title: "Минималистичный логотип", text: "Чистая графика, надписи и фирменные элементы.", badge: "лого" },
      { label: "Футболка", title: "Именная надпись", text: "Персонализация от одной штуки.", badge: "от 1 шт" },
    ],
  },
  shelkografiya: {
    product: "Тираж",
    badge: "SCREEN",
    print: "BRAND DROP",
    tone: [yellow, accent],
    caption: "Тиражная печать для мерча и формы",
    slides: [
      { label: "Тираж", title: "Футболки для команды", text: "Одинаковый макет на партии изделий.", badge: "50+" },
      { label: "Мерч", title: "Корпоративный дроп", text: "Стойкая печать для брендов и мероприятий.", badge: "B2B" },
      { label: "Форма", title: "Одежда персонала", text: "Логотипы для кафе, салонов и сервисов.", badge: "опт" },
    ],
  },
  sublimaciya: {
    product: "Спорт",
    badge: "SUBLI",
    print: "GRADIENT",
    tone: [cyan, yellow],
    caption: "Полноцветная печать на синтетике",
    slides: [
      { label: "Спорт", title: "Яркая игровая форма", text: "Градиенты, номера, графика и логотипы.", badge: "poly" },
      { label: "Футболка", title: "Лёгкий принт", text: "Изображение не ощущается плотной плёнкой.", badge: "light" },
      { label: "Команда", title: "Комплект экипировки", text: "Единый стиль для клуба или турнира.", badge: "team" },
    ],
  },
  polo: {
    product: "Поло",
    badge: "POLO",
    print: "FUTURE",
    tone: [accent2, cyan],
    caption: "Поло для сотрудников, промо и корпоративной формы",
    slides: [
      { label: "Поло", title: "Логотип на груди", text: "Классический вариант для формы сотрудников.", badge: "лого" },
      { label: "Команда", title: "Комплект для персонала", text: "Единый стиль для кафе, салона, магазина или офиса.", badge: "B2B" },
      { label: "Событие", title: "Промо-одежда", text: "Поло для выставок, акций и мероприятий.", badge: "event" },
    ],
  },
  tolstovki: {
    product: "Худи",
    badge: "HOODIE",
    print: "BACK PRINT",
    tone: [accent, accent2],
    caption: "Крупные принты на груди, спине и рукавах",
  },
  "svoya-odezhda": {
    product: "Своя вещь",
    badge: "YOUR ITEM",
    print: "CUSTOM",
    tone: [accent2, accent],
    caption: "Печать на одежде клиента после проверки ткани",
  },
  srochnaya: {
    product: "Сегодня",
    badge: "EXPRESS",
    print: "20 MIN",
    tone: [yellow, accent],
    caption: "Простые заказы при готовом макете от 20 минут",
  },
  opt: {
    product: "Опт",
    badge: "B2B",
    print: "MERCH KIT",
    tone: [accent2, cyan],
    caption: "Партии мерча, форма и брендирование под ключ",
  },
  specodezhda: {
    product: "Форма",
    badge: "WORK",
    print: "LOGO",
    tone: [cyan, accent2],
    caption: "Логотипы и надписи на рабочей одежде",
  },
  sportforma: {
    product: "Команда",
    badge: "SPORT",
    print: "№ 10",
    tone: [accent, cyan],
    caption: "Номера, фамилии, эмблемы и спонсорские блоки",
  },
  fartuki: {
    product: "Фартук",
    badge: "HORECA",
    print: "CAFE LOGO",
    tone: [yellow, accent2],
    caption: "Фартуки для кафе, кофеен, ресторанов и производства",
  },
  shoppery: {
    product: "Шоппер",
    badge: "BAG",
    print: "BRAND",
    tone: [accent2, accent],
    caption: "Мерч, подарки и промо-сумки с принтом",
  },
  drugoe: {
    product: "Текстиль",
    badge: "OTHER",
    print: "CUSTOM PRINT",
    tone: [cyan, accent],
    caption: "Подберём технологию под нестандартное изделие",
  },
  maket: {
    product: "Макет",
    badge: "DESIGN",
    print: "300 DPI",
    tone: [accent, yellow],
    caption: "Подготовка файлов, чистка фона и адаптация под печать",
  },
};

const DEFAULT_VISUAL = {
  product: "Печать",
  badge: "FUTURE",
  print: "PRINT",
  tone: [accent, accent2],
  caption: "Аккуратная печать на одежде и текстиле",
};

function Eyebrow({ children }) {
  return <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: accent2, textTransform: "uppercase" }}>{children}</span>;
}

function PriceTable({ rows, unit = "₽" }) {
  return (
    <div style={{ maxWidth: 560, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)" }}>
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: i % 2 ? "rgba(255,255,255,.02)" : "transparent" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>{r.label}</span>
            {r.sub && <span style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)" }}>{r.sub}</span>}
          </div>
          <span style={{ fontSize: 16, fontWeight: 500, color: accent }}>{r.value}{r.rawValue ? "" : ` ${unit}`}</span>
        </div>
      ))}
    </div>
  );
}

function MiniTshirtFormatPreview({ label, size, color, maxWidth, maxHeight }) {
  const formatWidth = Math.max(1, size?.w || maxWidth);
  const formatHeight = Math.max(1, size?.h || maxHeight);
  const printAreaX = 45;
  const printAreaY = 43;
  const printMaxWidth = 70;
  const printMaxHeight = 88;
  const pxPerCm = Math.min(printMaxWidth / maxWidth, printMaxHeight / maxHeight);
  const rectWidth = Math.max(12, Math.round(formatWidth * pxPerCm));
  const rectHeight = Math.max(14, Math.round(formatHeight * pxPerCm));
  const formatKey = String(label).toUpperCase();
  const upperChestTopY = 56;
  const rectX = 80 - rectWidth / 2;
  const rectY = ["A6", "A5", "A4"].includes(formatKey)
    ? upperChestTopY
    : printAreaY + (printMaxHeight - rectHeight) / 2;

  return (
    <svg viewBox="0 0 160 172" width="100%" height="100%" role="img" aria-label={`${label} на футболке`} style={{ display: "block", overflow: "visible" }}>
      <path
        d="M50 17 L27 29 L12 57 L29 68 L42 58 L42 158 L118 158 L118 58 L131 68 L148 57 L133 29 L110 17 L94 17 C91 24 86 28 80 28 C74 28 69 24 66 17 Z"
        fill="rgba(255,255,255,.018)"
        stroke="rgba(240,238,245,.36)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M66 18 C70 25 74 29 80 29 C86 29 90 25 94 18" fill="none" stroke="rgba(240,238,245,.24)" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 19 C73 23 76 25 80 25 C84 25 87 23 90 19" fill="none" stroke="rgba(240,238,245,.13)" strokeWidth="1.3" strokeLinecap="round" />
      <rect
        x={rectX}
        y={rectY}
        width={rectWidth}
        height={rectHeight}
        rx="5"
        fill={`${color}34`}
        stroke={color}
        strokeWidth="2"
        filter="url(#dtfPrintGlow)"
      />
      <text x="80" y={Math.max(62, rectY + rectHeight / 2 + 4)} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">{label}</text>
      <defs>
        <filter id="dtfPrintGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor={color} floodOpacity=".23" />
        </filter>
      </defs>
    </svg>
  );
}

function DtfPriceShowcase({ formatRows = [], meterRows = [], note, onOpenCalculator }) {
  const formatAccent = accent;
  const meterAccent = accent;
  const formatSizes = formatRows.map((row) => {
    const match = String(row.sub || "").match(/(\d+)\D+(\d+)/);
    return match ? { w: Number(match[1]), h: Number(match[2]) } : { w: 1, h: 1 };
  });
  const maxWidth = Math.max(...formatSizes.map((size) => size.w), 1);
  const maxHeight = Math.max(...formatSizes.map((size) => size.h), 1);

  const getFormatSize = (index) => {
    return formatSizes[index] || { w: maxWidth, h: maxHeight };
  };

  const compactNote = note ? note.split(".").map((item) => item.trim()).filter(Boolean).slice(0, 4) : [];

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.65fr) minmax(280px,.75fr)", gap: 18, alignItems: "stretch" }} className="dtf-price-layout">
        <div style={{ minWidth: 0, borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", background: "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018))", overflow: "hidden" }}>
          <div style={{ padding: "22px clamp(18px,3vw,28px)", display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-end", flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,238,245,.42)", marginBottom: 8 }}>листовая печать</div>
              <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.15 }}>Выберите площадь принта</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", color: "rgba(240,238,245,.46)", fontSize: 13 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: accent }} />
              цена за принт + прижим
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 999, border: `1px solid ${accent}55`, background: `linear-gradient(135deg,${accent}1f,rgba(255,255,255,.035))`, color: "rgba(240,238,245,.78)", fontSize: 12, fontWeight: 700, letterSpacing: .3 }}>
              Цены указаны при заказе от 5 шт.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))", gap: 1, background: "rgba(255,255,255,.06)" }}>
            {formatRows.map((row, index) => {
              const color = formatAccent;
              return (
                <div key={row.label} style={{ minHeight: 292, padding: 18, background: "rgba(8,8,12,.94)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ height: 168, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16, background: "linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))", border: "1px solid rgba(255,255,255,.055)", overflow: "hidden", padding: 6 }}>
                    <MiniTshirtFormatPreview label={row.label} size={getFormatSize(index)} color={color} maxWidth={maxWidth} maxHeight={maxHeight} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{row.label}</div>
                      <div style={{ fontSize: 13, color: "rgba(240,238,245,.5)", whiteSpace: "nowrap" }}>{row.sub}</div>
                    </div>
                    <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 30, fontWeight: 700, color }}>{row.value}</span>
                      <span style={{ fontSize: 15, color: "rgba(240,238,245,.52)" }}>₽</span>
                    </div>
                    <div style={{ marginTop: 5, fontSize: 12, fontWeight: 600, color: "rgba(240,238,245,.42)" }}>при заказе от 5 шт.</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ minWidth: 0, borderRadius: 28, padding: 24, border: "1px solid rgba(255,255,255,.08)", background: `linear-gradient(145deg,${accent}18,rgba(255,255,255,.025) 48%,${cyan}14)`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 22 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,238,245,.45)", marginBottom: 10 }}>быстрый ориентир</div>
            <div style={{ fontSize: 42, fontWeight: 800, lineHeight: .95, color: "#fff" }}>от 250 ₽</div>
            <div style={{ marginTop: 12, fontSize: 15, lineHeight: 1.55, color: "rgba(240,238,245,.66)" }}>Небольшой логотип, надпись или пробный принт удобно считать по форматам. Для тиража выгоднее метраж.</div>
            {onOpenCalculator && (
              <button type="button" onClick={onOpenCalculator} style={{ marginTop: 14, background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "13px 22px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 16px 34px ${accent}24` }}>Открыть калькулятор</button>
            )}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {[
              ["A6", "маленький логотип"],
              ["A4", "принт на грудь"],
              ["A3+", "крупная спина"],
            ].map(([title, text]) => (
              <div key={title} style={{ display: "grid", gridTemplateColumns: "46px 1fr", gap: 12, alignItems: "center", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, display: "grid", placeItems: "center", background: "rgba(255,255,255,.06)", color: "#fff", fontWeight: 800 }}>{title}</div>
                <div style={{ fontSize: 14, color: "rgba(240,238,245,.62)" }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.025)", padding: "22px clamp(18px,3vw,28px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,238,245,.42)", marginBottom: 8 }}>погонный метр</div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>Для оптовых заказов и самостоятельного нанесения</div>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 16, border: `1px solid ${meterAccent}55`, background: `linear-gradient(135deg,${meterAccent}1f,rgba(255,255,255,.035))`, boxShadow: `0 14px 34px ${meterAccent}18`, color: "rgba(240,238,245,.72)", fontSize: 14, lineHeight: 1.4 }}>
            <div style={{ color: meterAccent, fontWeight: 800 }}>Ширина рулона 60см</div>
            <div style={{ fontWeight: 700 }}>максимальная ширина печати 58см</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,160px),1fr))", gap: 10 }}>
          {meterRows.map((row, index) => {
            const active = index === meterRows.length - 1;
            return (
              <div key={row.label} style={{ minHeight: 118, padding: 16, borderRadius: 18, border: active ? `1px solid ${meterAccent}` : "1px solid rgba(255,255,255,.07)", background: active ? `linear-gradient(145deg,${meterAccent}24,rgba(255,255,255,.035))` : "rgba(8,8,12,.5)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: 13, color: "rgba(240,238,245,.5)" }}>{row.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: active ? meterAccent : "#f0eef5", lineHeight: 1.1 }}>{row.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      {compactNote.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 10 }}>
          {compactNote.map((item, index) => (
            <div key={item} style={{ padding: "14px 16px", borderRadius: 16, border: "1px solid rgba(255,255,255,.07)", background: index === 0 ? "rgba(232,67,147,.08)" : "rgba(255,255,255,.025)", color: "rgba(240,238,245,.68)", fontSize: 13, lineHeight: 1.5 }}>
              {item}.
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DtfConstructorPromo({ onOpenConstructor }) {
  const tools = [
    { label: "Aa", text: "Текст" },
    { label: "▧", text: "Изображение" },
    { label: "●", text: "Цвета" },
    { label: "↔", text: "Размер" },
  ];

  return (
    <div style={{ marginTop: 22, borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", background: `radial-gradient(circle at 12% 15%,${accent}24,transparent 30%), radial-gradient(circle at 88% 10%,${accent2}24,transparent 26%), linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018))`, padding: "22px clamp(18px,3vw,28px)", display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(220px,.8fr)", gap: 22, alignItems: "center" }} className="dtf-price-layout">
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 10 }}>онлайн-конструктор</div>
        <div style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 600, lineHeight: 1.15, marginBottom: 10 }}>Хотите собрать дизайн самостоятельно?</div>
        <div style={{ fontSize: 15, fontWeight: 300, color: "rgba(240,238,245,.62)", lineHeight: 1.6, maxWidth: 620 }}>Загрузите картинку, добавьте текст, подберите размер и расположение принта на изделии. Конструктор поможет быстро увидеть будущий дизайн перед расчётом.</div>
        <button type="button" onClick={onOpenConstructor} style={{ marginTop: 18, background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "13px 24px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 18px 42px ${accent}26` }}>Создать дизайн в конструкторе</button>
      </div>

      <div style={{ position: "relative", minHeight: 230, borderRadius: 24, border: "1px solid rgba(255,255,255,.09)", background: "rgba(8,8,12,.54)", overflow: "hidden", padding: 14 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,.08),transparent 48%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "grid", gap: 10, height: "100%" }}>
          <div style={{ height: 34, borderRadius: 14, background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", color: "rgba(240,238,245,.66)", fontSize: 11 }}>
            <span style={{ display: "flex", gap: 5 }}>
              {[accent, accent2, "rgba(255,255,255,.28)"].map((dot) => <span key={dot} style={{ width: 6, height: 6, borderRadius: 999, background: dot }} />)}
            </span>
            <span style={{ fontWeight: 700, color: "#f0eef5" }}>Конструктор футболок</span>
            <span>Перед</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "42px minmax(0,1fr) 82px", gap: 10, minHeight: 172 }}>
            <div style={{ display: "grid", gap: 7, alignContent: "start" }}>
              {tools.map((tool, index) => (
                <div key={tool.text} title={tool.text} style={{ width: 38, height: 34, borderRadius: 12, display: "grid", placeItems: "center", background: index === 1 ? `linear-gradient(135deg,${accent},${accent2})` : "rgba(255,255,255,.06)", color: "#fff", fontWeight: 800, fontSize: 12, border: "1px solid rgba(255,255,255,.08)" }}>{tool.label}</div>
              ))}
            </div>

            <div style={{ position: "relative", minHeight: 172, borderRadius: 18, background: "radial-gradient(circle at 50% 18%,rgba(255,255,255,.08),transparent 38%), linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018))", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.07), 0 22px 54px rgba(0,0,0,.28)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 12, borderRadius: 14, border: "1px dashed rgba(240,238,245,.14)" }} />
              <svg viewBox="0 0 160 178" width="100%" height="100%" role="img" aria-label="Мини-превью интерфейса конструктора футболок" style={{ display: "block", position: "relative" }}>
                <path d="M51 18 L28 30 L15 55 L31 66 L43 57 L43 158 L117 158 L117 57 L129 66 L145 55 L132 30 L109 18 L95 18 C91 27 86 31 80 31 C74 31 69 27 65 18 Z" fill="rgba(255,255,255,.025)" stroke="rgba(240,238,245,.28)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M66 19 C70 27 74 31 80 31 C86 31 90 27 94 19" fill="none" stroke="rgba(240,238,245,.2)" strokeWidth="2" strokeLinecap="round" />
                <rect x="55" y="58" width="50" height="58" rx="8" fill={`url(#constructorPrintGradient)`} opacity=".82" filter="url(#constructorPrintGlow)" />
                <rect x="52" y="55" width="56" height="64" rx="10" fill="none" stroke="#fff" strokeWidth="1.4" strokeDasharray="5 5" opacity=".55" />
                <circle cx="52" cy="55" r="3" fill="#fff" opacity=".75" />
                <circle cx="108" cy="55" r="3" fill="#fff" opacity=".75" />
                <circle cx="52" cy="119" r="3" fill="#fff" opacity=".75" />
                <circle cx="108" cy="119" r="3" fill="#fff" opacity=".75" />
                <text x="80" y="91" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" fontFamily="Outfit, sans-serif">DTF</text>
                <defs>
                  <linearGradient id="constructorPrintGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={accent} />
                    <stop offset="100%" stopColor={accent2} />
                  </linearGradient>
                  <filter id="constructorPrintGlow" x="-45%" y="-45%" width="190%" height="190%">
                    <feDropShadow dx="0" dy="10" stdDeviation="7" floodColor={accent} floodOpacity=".22" />
                  </filter>
                </defs>
              </svg>
            </div>

            <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
              <div style={{ padding: "9px 8px", borderRadius: 13, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.075)" }}>
                <div style={{ color: "rgba(240,238,245,.48)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.1, marginBottom: 6 }}>Слои</div>
                <div style={{ height: 8, width: "78%", borderRadius: 999, background: `linear-gradient(135deg,${accent},${accent2})`, marginBottom: 6 }} />
                <div style={{ height: 7, width: "58%", borderRadius: 999, background: "rgba(255,255,255,.18)" }} />
              </div>
              <div style={{ padding: "9px 8px", borderRadius: 13, background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.065)" }}>
                <div style={{ color: "rgba(240,238,245,.48)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.1, marginBottom: 6 }}>Размер</div>
                <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,.13)", overflow: "hidden" }}>
                  <div style={{ width: "66%", height: "100%", borderRadius: 999, background: accent }} />
                </div>
              </div>
              <div style={{ padding: "9px 8px", borderRadius: 13, background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.065)", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
                {[accent, accent2, yellow].map((swatch) => <span key={swatch} style={{ height: 18, borderRadius: 8, background: swatch, opacity: .86 }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermoPriceCta({ onOpenCalculator }) {
  const stats = [
    { label: "формат", value: "A6-A3" },
    { label: "цвета", value: "1-3" },
    { label: "тираж", value: "от 1 шт." },
  ];

  return (
    <div style={{ height: "100%", minHeight: 360, borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", background: `radial-gradient(circle at 16% 12%,${accent}24,transparent 34%), radial-gradient(circle at 92% 8%,${yellow}18,transparent 28%), linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.02))`, padding: "24px clamp(18px,3vw,28px)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20, boxShadow: "0 24px 70px rgba(0,0,0,.18)" }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 10 }}>быстрый расчет</div>
        <div style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 600, lineHeight: 1.15, marginBottom: 10 }}>Посчитайте термопечать под свой тираж</div>
        <div style={{ fontSize: 15, fontWeight: 300, color: "rgba(240,238,245,.62)", lineHeight: 1.6, maxWidth: 620 }}>Выберите формат, количество цветов и тираж. Калькулятор быстро покажет ориентир по стоимости, чтобы было проще спланировать заказ без ручного пересчета по таблице.</div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {stats.map((item) => (
            <div key={item.label} style={{ padding: "9px 12px", borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.045)" }}>
              <span style={{ display: "block", fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(240,238,245,.42)", marginBottom: 3 }}>{item.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#f0eef5" }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
          {["Подходит для номеров, фамилий и простых логотипов", "Можно быстро сравнить форматы и тиражи", "После расчета проще оформить заказ"].map((item) => (
            <div key={item} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 10, alignItems: "start", color: "rgba(240,238,245,.62)", fontSize: 13, lineHeight: 1.45 }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, display: "grid", placeItems: "center", background: `${accent}22`, color: accent, fontSize: 13, fontWeight: 900 }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <button type="button" onClick={onOpenCalculator} style={{ width: "100%", background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "14px 18px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 18px 42px ${accent}26` }}>Рассчитать сумму заказа</button>
    </div>
  );
}

function MatrixPriceTable({ title, subtitle, columns = [], rows = [] }) {
  const [isMobileTable, setIsMobileTable] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileTable(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)" }}>
      <div style={{ padding: isMobileTable ? "12px 14px" : "16px 18px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ fontSize: isMobileTable ? 15 : 16, fontWeight: 600 }}>{title}</div>
        {subtitle && <div style={{ fontSize: isMobileTable ? 12 : 13, fontWeight: 300, color: "rgba(240,238,245,.55)", marginTop: 4 }}>{subtitle}</div>}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: isMobileTable ? 12 : 14 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: isMobileTable ? "10px 12px" : "12px 16px", color: "rgba(240,238,245,.55)", fontWeight: 500 }}>Цветность</th>
              {columns.map((col) => <th key={col} style={{ textAlign: "left", padding: isMobileTable ? "10px 12px" : "12px 16px", color: "rgba(240,238,245,.55)", fontWeight: 500, whiteSpace: "nowrap" }}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} style={{ background: i % 2 ? "rgba(255,255,255,.02)" : "transparent" }}>
                <td style={{ padding: isMobileTable ? "10px 12px" : "12px 16px", fontWeight: 500 }}>{row.label}</td>
                {row.values.map((value, idx) => <td key={idx} style={{ padding: isMobileTable ? "10px 12px" : "12px 16px", whiteSpace: "nowrap" }}>{value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TshirtPrintPreview({ formatName }) {
  // Наглядный масштаб: ширина корпуса футболки 180px ≈ 50 см груди → 3.6px/см.
  const PPC = 3.6;
  const printGradient = `linear-gradient(135deg, ${accent}, #ff5fa2)`;
  const sizes = {
    A6: { w: 10, h: 15, dims: "10 × 15 см", gradient: printGradient },
    A5: { w: 15, h: 20, dims: "15 × 20 см", gradient: printGradient },
    A4: { w: 20, h: 30, dims: "20 × 30 см", gradient: printGradient },
    A3: { w: 30, h: 40, dims: "30 × 40 см", gradient: printGradient },
  };
  const normalizedName = String(formatName || "").toUpperCase();
  const key = ["A6", "A5", "A4", "A3"].find((name) => normalizedName.includes(name)) || "A4";
  const size = sizes[key];
  const rectW = size.w * PPC;
  const rectH = size.h * PPC;
  const cx = 150;
  const top = 96;
  const rectX = cx - rectW / 2;

  return (
    <div style={{ position: "sticky", top: 24, borderRadius: 20, border: "1px solid rgba(255,255,255,.08)", background: "linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.015))", padding: "20px 18px" }} className="shelko-price-preview">
      <svg viewBox="0 0 300 360" width="100%" style={{ display: "block", maxWidth: 320, margin: "0 auto" }} role="img" aria-label={`Размер принта ${key} ${size.dims} на футболке`}>
        <defs>
          <linearGradient id="teeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2d3a" />
            <stop offset="100%" stopColor="#1b1d27" />
          </linearGradient>
        </defs>
        {/* Футболка */}
        <path
          d="M105 40 L70 58 L46 96 L66 112 L84 100 L84 320 L216 320 L216 100 L234 112 L254 96 L230 58 L195 40 C188 64 158 70 150 70 C142 70 112 64 105 40 Z"
          fill="url(#teeFill)"
          stroke="rgba(255,255,255,.14)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Горловина */}
        <path d="M105 40 C112 64 142 70 150 70 C158 70 188 64 195 40" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="2" />
        {/* Область печати */}
        <rect x={rectX} y={top} width={rectW} height={rectH} rx="3" fill="rgba(232,67,147,.16)" stroke={accent} strokeWidth="2" strokeDasharray="6 5" />
        <text x={cx} y={top + rectH / 2 - 6} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="600" fontFamily="inherit">{key}</text>
        <text x={cx} y={top + rectH / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="11" fontFamily="inherit">{size.dims}</text>
      </svg>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, backgroundImage: size.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", letterSpacing: 1 }}>{key}</div>
        <div style={{ marginTop: 8, fontSize: 16, fontWeight: 400, color: "rgba(240,238,245,.7)" }}>{size.dims}</div>
      </div>
    </div>
  );
}

function TierPriceTable({ formats = [], tiers = [], subtitle }) {
  const [formatIdx, setFormatIdx] = useState(0);
  const [tierIdx, setTierIdx] = useState(0);
  const format = formats[formatIdx] || formats[0];
  if (!format) return null;

  const pill = (active) => ({
    padding: "9px 16px",
    borderRadius: 999,
    border: active ? `1px solid ${accent}` : "1px solid rgba(255,255,255,.1)",
    background: active ? "linear-gradient(135deg,rgba(232,67,147,.22),rgba(108,92,231,.18))" : "rgba(255,255,255,.03)",
    color: active ? "#fff" : "rgba(240,238,245,.6)",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .15s ease",
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(220px,300px)", gap: 28, alignItems: "start" }} className="shelko-price-grid">
      <div>
        {subtitle && <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.6, marginBottom: 18 }}>{subtitle}</div>}

        {formats.length > 1 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            {formats.map((f, i) => (
              <button key={f.name} type="button" onClick={() => setFormatIdx(i)} style={pill(i === formatIdx)}>{f.name}</button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <span style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(240,238,245,.4)", marginRight: 4 }}>Тираж, шт</span>
          {tiers.map((t, i) => (
            <button key={t} type="button" onClick={() => setTierIdx(i)} style={pill(i === tierIdx)}>{t}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12 }}>
          {format.rows.map((row) => (
            <div key={row.label} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.025)", padding: "16px 18px" }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(240,238,245,.62)", marginBottom: 8 }}>{row.label}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: accent }}>{row.prices[tierIdx]} ₽</div>
              {row.sample != null && <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.4)", marginTop: 6 }}>образец — {row.sample} ₽</div>}
            </div>
          ))}
        </div>
      </div>

      <TshirtPrintPreview formatName={format.name} />
    </div>
  );
}

function NoteCard({ title, text }) {
  return (
    <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.025)", padding: "18px 20px" }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function VideoMockup({ visual, compact, photo, video, videoCaption }) {
  const captions = Array.isArray(videoCaption) ? videoCaption : videoCaption ? [videoCaption] : [];
  const [capIdx, setCapIdx] = useState(0);
  const videoRef = useRef(null);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    if (captions.length < 2) return undefined;
    const id = setInterval(() => setCapIdx((i) => (i + 1) % captions.length), 4000);
    return () => clearInterval(id);
  }, [captions.length]);

  const startPlayback = () => {
    const el = videoRef.current;
    if (el) {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  const caption = captions[capIdx];

  return (
    <div style={{ position: "relative", width: "100%", height: compact ? (typeof window !== "undefined" && window.innerWidth < 640 ? 240 : 300) : (typeof window !== "undefined" && window.innerWidth < 640 ? 280 : 460), minHeight: compact ? (typeof window !== "undefined" && window.innerWidth < 640 ? 200 : 250) : (typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 360), borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", boxShadow: "0 26px 80px rgba(0,0,0,.35)" }}>
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={visual.caption || visual.product}
        onLoadedData={() => setFrameReady(true)}
        onCanPlay={startPlayback}
        onCanPlayThrough={startPlayback}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(.82)", opacity: frameReady ? 1 : 0, transition: "opacity .4s ease" }}
      />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, rgba(8,10,16,.18), rgba(8,10,16,.16) 45%, rgba(8,10,16,.42))" }} />
      {caption && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, pointerEvents: "none", padding: "40px 20px 18px", background: "linear-gradient(180deg, rgba(8,10,16,0), rgba(8,10,16,.55) 55%, rgba(8,10,16,.78))", backdropFilter: "blur(2px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: accent, boxShadow: `0 0 0 4px ${accent}33`, flexShrink: 0, animation: "vidPulse 1.8s ease-in-out infinite" }} />
            <div key={capIdx} style={{ animation: "vidCapIn .5s ease" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{caption.title}</div>
              {caption.sub && <div style={{ fontSize: 12.5, fontWeight: 300, color: "rgba(240,238,245,.72)", marginTop: 3, lineHeight: 1.35 }}>{caption.sub}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductMockup({ visual, compact = false, photo, video, videoCaption }) {
  const [c1, c2] = visual.tone || [accent, accent2];

  if (video) {
    return <VideoMockup visual={visual} compact={compact} photo={photo} video={video} videoCaption={videoCaption} />;
  }

  if (photo) {
    return (
      <div style={{ position: "relative", minHeight: compact ? 250 : 360, borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", boxShadow: "0 26px 80px rgba(0,0,0,.35)" }}>
        <img src={photo} alt={visual.caption || visual.product} style={{ width: "100%", height: "100%", minHeight: compact ? 250 : 360, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,10,16,.06), rgba(8,10,16,.08) 45%, rgba(8,10,16,.32))" }} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", minHeight: compact ? 250 : 360, borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: `radial-gradient(circle at 20% 20%, ${c1}44, transparent 34%), radial-gradient(circle at 78% 12%, ${c2}3d, transparent 30%), linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.018))`, boxShadow: "0 26px 80px rgba(0,0,0,.35)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .22, backgroundImage: "linear-gradient(135deg, rgba(255,255,255,.18) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div style={{ position: "absolute", top: 18, left: 18, right: 18, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 3 }}>
        <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.72)" }}>{visual.product}</span>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "7px 10px", borderRadius: 999, background: "rgba(0,0,0,.32)", border: "1px solid rgba(255,255,255,.12)" }}>{visual.badge}</span>
      </div>

      <div style={{ position: "absolute", left: "50%", top: compact ? 70 : 82, transform: "translateX(-50%)", width: compact ? 132 : 188, height: compact ? 160 : 220, borderRadius: "44px 44px 34px 34px", background: "linear-gradient(180deg,#f6f3fb,#cfc9dc)", boxShadow: "0 28px 70px rgba(0,0,0,.42)", zIndex: 2 }}>
        <div style={{ position: "absolute", left: -36, top: 42, width: 54, height: compact ? 92 : 120, borderRadius: "28px 0 26px 28px", background: "linear-gradient(180deg,#e8e3f2,#bbb5cb)", transform: "rotate(12deg)", transformOrigin: "top right" }} />
        <div style={{ position: "absolute", right: -36, top: 42, width: 54, height: compact ? 92 : 120, borderRadius: "0 28px 28px 26px", background: "linear-gradient(180deg,#e8e3f2,#bbb5cb)", transform: "rotate(-12deg)", transformOrigin: "top left" }} />
        <div style={{ position: "absolute", left: "50%", top: 12, width: 54, height: 20, transform: "translateX(-50%)", borderRadius: "0 0 18px 18px", background: "rgba(10,10,16,.18)" }} />
        <div style={{ position: "absolute", left: "50%", top: compact ? 64 : 82, transform: "translateX(-50%) rotate(-3deg)", minWidth: compact ? 88 : 126, padding: compact ? "10px 12px" : "14px 16px", borderRadius: 16, textAlign: "center", color: "#fff", fontSize: compact ? 16 : 22, fontWeight: 800, letterSpacing: compact ? 1.6 : 2.4, background: `linear-gradient(135deg,${c1},${c2})`, boxShadow: "0 14px 32px rgba(0,0,0,.22)" }}>{visual.print}</div>
      </div>

      <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, zIndex: 4, display: "grid", gap: 10 }}>
        <div style={{ padding: "14px 16px", borderRadius: 18, background: "rgba(0,0,0,.28)", border: "1px solid rgba(255,255,255,.09)", backdropFilter: "blur(12px)" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>{visual.caption}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.58)", lineHeight: 1.45 }}>Фото-пример для этой услуги.</div>
        </div>
      </div>
    </div>
  );
}

function VisualSlideCard({ slide, visual, index, onOpen }) {
  const [c1, c2] = visual.tone || [accent, accent2];
  const hasImage = !!slide.src;
  return (
    <div
      onClick={hasImage ? onOpen : undefined}
      style={{ minWidth: 300, flex: "0 0 min(80vw, 380px)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.025)", boxShadow: "0 18px 50px rgba(0,0,0,.24)", cursor: hasImage ? "zoom-in" : "default", scrollSnapAlign: "start" }}
    >
      <div style={{ height: 380, position: "relative", background: hasImage ? "#151721" : `radial-gradient(circle at 30% 20%, ${c1}55, transparent 36%), radial-gradient(circle at 85% 10%, ${c2}4d, transparent 34%), linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.018))` }}>
        {hasImage ? (
          <img src={slide.src} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ position: "absolute", left: "50%", top: 54, transform: "translateX(-50%) rotate(-4deg)", width: 118, height: 96, borderRadius: "22px 22px 18px 18px", background: "linear-gradient(180deg,#faf8ff,#d5cfe2)", boxShadow: "0 18px 42px rgba(0,0,0,.3)" }}>
            <div style={{ position: "absolute", left: "50%", top: 37, transform: "translateX(-50%)", width: 72, padding: "7px 8px", borderRadius: 12, textAlign: "center", color: "#fff", fontSize: 12, fontWeight: 800, background: `linear-gradient(135deg,${c1},${c2})` }}>PRINT {index + 1}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageLightbox({ src, alt, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(6,7,12,.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "4vw", cursor: "zoom-out" }}
    >
      <button
        onClick={onClose}
        aria-label="Закрыть"
        style={{ position: "absolute", top: 20, right: 24, width: 44, height: 44, borderRadius: 999, border: "1px solid rgba(255,255,255,.2)", background: "rgba(0,0,0,.4)", color: "#fff", fontSize: 22, lineHeight: 1, cursor: "pointer" }}
      >×</button>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 16, boxShadow: "0 30px 80px rgba(0,0,0,.5)" }} />
    </div>
  );
}

function VisualSlider({ visual, examples, slides: photoSlides = [] }) {
  const slides = photoSlides || [];
  const [activeIndex, setActiveIndex] = useState(null);
  if (!slides.length) return null;
  const activeSlide = activeIndex != null ? slides[activeIndex] : null;
  return (
    <section className="section-shell" style={{ padding: "42px 5%" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 18, marginBottom: 24 }}>
          <div>
            <Eyebrow>Слайды с примерами</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 200, margin: "12px 0 0" }}>Примеры наших работ</h2>
          </div>
          <div style={{ display: "flex", gap: 8, color: "rgba(240,238,245,.42)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>листайте →</div>
        </div>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", padding: "4px 2px 18px", scrollSnapType: "x mandatory" }}>
          {slides.map((slide, i) => <VisualSlideCard key={`${slide.title}-${i}`} slide={slide} visual={visual} index={i} onOpen={() => setActiveIndex(i)} />)}
        </div>
      </div>
      {activeSlide && <ImageLightbox src={activeSlide.src} alt={activeSlide.title} onClose={() => setActiveIndex(null)} />}
    </section>
  );
}

function TechnologyFit({ pageId }) {
  const rows = [
    { t: "DTF", d: "Полноцветные принты, малые тиражи, сложные изображения", to: "/dtf-pechat/", active: pageId === "dtf" },
    { t: "Шелкография", d: "Тиражи, мерч, фирменная одежда с одинаковым макетом", to: "/shelkografiya/", active: pageId === "shelkografiya" },
    { t: "Термопечать", d: "Номера, фамилии, надписи, простая графика до 1-3 цветов", to: "/termopechat/", active: pageId === "termopechat" },
    { t: "Сублимация", d: "Синтетика, спортивная форма, яркие полноцветные изображения", to: "/sublimaciya/", active: pageId === "sublimaciya" },
  ];
  return (
    <section className="section-shell" style={{ padding: "40px 5%" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Eyebrow>Как выбрать способ</Eyebrow>
        <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 24 }}>Технологии печати <span style={{ fontWeight: 600 }}>по задачам</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 14 }}>
          {rows.map((row) => {
            const cardStyle = {
              borderRadius: 18,
              padding: 18,
              border: row.active ? `1px solid ${accent}` : "1px solid rgba(255,255,255,.08)",
              background: row.active ? "linear-gradient(135deg,rgba(232,67,147,.18),rgba(108,92,231,.14))" : "rgba(255,255,255,.025)",
              display: "block",
              textDecoration: "none",
              color: "inherit",
              transition: "border-color .2s ease, transform .2s ease",
            };
            const inner = (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{row.t}</span>
                  {row.active
                    ? <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: accent, fontWeight: 600 }}>вы здесь</span>
                    : <span style={{ fontSize: 16, color: "rgba(240,238,245,.4)" }}>→</span>}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(240,238,245,.56)", fontWeight: 300 }}>{row.d}</div>
              </>
            );
            if (row.active) {
              return <div key={row.t} style={cardStyle}>{inner}</div>;
            }
            return (
              <Link key={row.t} to={row.to} style={cardStyle}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServiceContentPage(props) {
  const page = props.page;
  const content = SERVICE_CONTENT[page?.id];
  const faq = page?.faq || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!content) return <ServicePageLayout {...props} />;

  const steps = content.steps || DEFAULT_STEPS;
  const priceMode = content.prices?.mode || "format";
  const priceNote = page?.id === "shelkografiya"
    ? "Цены указаны за нанесение одного принта методом шелкографии на одно изделие. Форматы и тиражные пороги совпадают с оптовым калькулятором: A6, A5, A4, A3 и тиражи от 30 до 1000 шт. Текстиль, дополнительные эффекты, тёмная ткань и термопресс считаются отдельно в калькуляторе."
    : content.prices?.note;
  const customPriceTables = content.prices?.tables || [];
  const priceLayout = content.prices?.layout;
  const priceFormats = page?.id === "shelkografiya" ? SILK_FORMATS : (content.prices?.formats || []);
  const priceTiers = page?.id === "shelkografiya" ? SILK_TIERS : (content.prices?.tiers || []);
  const examples = content.examples || [];
  const notes = content.notes || [];
  const visual = { ...DEFAULT_VISUAL, ...(PAGE_VISUALS[page?.id] || {}), ...(content.visual || {}) };
  const pagePhotos = SERVICE_PHOTOS[page?.id] || null;
  const heroPhoto = pagePhotos?.hero || null;
  const heroVideo = pagePhotos?.heroVideo || null;
  const heroVideoCaption = pagePhotos?.heroVideoCaption || null;
  const seoPhoto = pagePhotos?.seo || heroPhoto;
  const photoSlides = pagePhotos?.gallery || [];
  const heroTitle = content.heroTitle || page?.h1;
  const heroTitleAccent = content.heroTitleAccent;
  const heroTitleAccentFirst = Boolean(content.heroTitleAccentFirst);
  const featureEyebrow = content.featureEyebrow || "Почему выбирают нас";
  const featureTitle = content.featureTitle || "Аккуратно, быстро и";
  const featureTitleAccent = content.featureTitleAccent || "без лишней суеты";

  const formatRows = FORMAT_ROWS.map((r) => ({ label: r.name, sub: r.size, value: r.price }));
  const meterRows = METER_PRICES.map((r) => ({ label: r.range, value: r.price, rawValue: true }));
  const isTechPage = ["dtf", "shelkografiya", "termopechat", "sublimaciya"].includes(page?.id);
  const isTermoPricePage = page?.id === "termopechat";

  return (
    <ServicePageLayout {...props}>
      <section className="section-shell" style={{ padding: isMobile ? "40px 5% 36px" : "56px 5% 46px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <nav style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 20 }} aria-label="Хлебные крошки">
            <Link to="/" style={{ color: "rgba(240,238,245,.45)", textDecoration: "none" }}>Главная</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(240,238,245,.7)" }}>{content.breadcrumb || page?.breadcrumbLabel}</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))", gap: "clamp(24px,5vw,56px)", alignItems: "center" }}>
            <div>
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <h1 style={{ fontSize: "clamp(32px,5.4vw,60px)", fontWeight: 200, lineHeight: 1.04, margin: "14px 0 18px" }}>
                {heroTitleAccentFirst && heroTitleAccent && (
                  <><span style={{ fontWeight: 600, background: `linear-gradient(135deg,${accent},${accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{heroTitleAccent}</span> </>
                )}
                {heroTitle}
                {!heroTitleAccentFirst && heroTitleAccent && (
                  <> <span style={{ fontWeight: 600, background: `linear-gradient(135deg,${accent},${accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{heroTitleAccent}</span></>
                )}
              </h1>
              <p style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 300, color: "rgba(240,238,245,.64)", maxWidth: 720, lineHeight: 1.65, margin: "0 0 28px" }}>{content.lead}</p>
              <div className="service-hero-actions" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
                <button type="button" onClick={props.onOpenCalculator} style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Рассчитать заказ</button>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Заказать в Telegram</a>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["от 1 штуки", "помощь с макетом", "опт для бизнеса"].map((tag) => <span key={tag} style={{ border: "1px solid rgba(255,255,255,.09)", background: "rgba(255,255,255,.035)", borderRadius: 999, padding: "8px 12px", color: "rgba(240,238,245,.58)", fontSize: 13 }}>{tag}</span>)}
              </div>
            </div>
            <ProductMockup visual={visual} photo={heroPhoto} video={heroVideo} videoCaption={heroVideoCaption} />
          </div>
        </div>
      </section>

      <VisualSlider visual={visual} examples={examples} slides={photoSlides} />
      {isTechPage && <TechnologyFit pageId={page.id} />}

      <section className="section-shell" style={{ padding: isMobile ? "32px 5%" : "40px 5%" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Как заказать</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Три простых <span style={{ fontWeight: 600 }}>шага</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
            {steps.map((s) => (
              <div key={s.n} className="glass" style={{ padding: 22, borderRadius: 18 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg,${accent},${accent2})`, display: "grid", placeItems: "center", fontWeight: 700, marginBottom: 14 }}>{s.n}</div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: isMobile ? "32px 5%" : "40px 5%" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>{featureEyebrow}</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>{featureTitle} <span style={{ fontWeight: 600 }}>{featureTitleAccent}</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 18 }}>
            {content.features.map((f, i) => (
              <div key={i} style={{ border: "1px solid rgba(255,255,255,.07)", borderRadius: 18, padding: "20px 22px", background: `linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.014))` }}>
                <div style={{ width: 34, height: 34, borderRadius: 12, background: i % 2 ? "rgba(108,92,231,.18)" : "rgba(232,67,147,.18)", display: "grid", placeItems: "center", marginBottom: 14, color: i % 2 ? accent2 : accent }}>✦</div>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.t}</div>
                <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(240,238,245,.55)", lineHeight: 1.5 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {examples.length > 0 && (
        <section className="section-shell" style={{ padding: isMobile ? "32px 5%" : "40px 5%" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Eyebrow>Примеры</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Где это особенно <span style={{ fontWeight: 600 }}>подходит</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 18 }}>
              {examples.map((ex, i) => <NoteCard key={i} title={ex.t} text={ex.d} />)}
            </div>
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section className="section-shell" style={{ padding: isMobile ? "32px 5%" : "40px 5%" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Eyebrow>Важно знать</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>Подберём технологию <span style={{ fontWeight: 600 }}>под задачу</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 18 }}>
              {notes.map((note, i) => <NoteCard key={i} title={note.t} text={note.d} />)}
            </div>
          </div>
        </section>
      )}

      {(priceMode !== "none" || customPriceTables.length > 0 || priceNote) && (
        <section className="section-shell" style={{ padding: isMobile ? "32px 5%" : "40px 5%" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Eyebrow>Цены</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 28 }}>{content.prices?.title || (priceMode === "dtf" ? "Стоимость DTF-печати" : "Стоимость по размеру принта")}</h2>

            {priceMode === "custom" ? (
              priceLayout === "tiers" ? (
                <TierPriceTable formats={priceFormats} tiers={priceTiers} subtitle={content.prices?.subtitle} />
              ) : isTermoPricePage ? (
                <div className="termo-price-layout" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1.65fr) minmax(280px,.75fr)", gap: 18, alignItems: "stretch" }}>
                  <div className="termo-price-tables" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,minmax(min(100%,320px),1fr))", gap: 18 }}>
                    {customPriceTables.map((table) => <MatrixPriceTable key={table.title} title={table.title} subtitle={table.subtitle} columns={table.columns} rows={table.rows} />)}
                  </div>
                  <TermoPriceCta onOpenCalculator={props.onOpenCalculator} />
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 18 }}>
                  {customPriceTables.map((table) => <MatrixPriceTable key={table.title} title={table.title} subtitle={table.subtitle} columns={table.columns} rows={table.rows} />)}
                </div>
              )
            ) : priceMode === "dtf" ? (
              <DtfPriceShowcase formatRows={formatRows} meterRows={meterRows} note={priceNote} onOpenCalculator={props.onOpenCalculator} />
            ) : priceMode !== "none" ? (
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div>
                  {priceMode === "dtf" && <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: 2, color: "rgba(240,238,245,.5)", textTransform: "uppercase", marginBottom: 10 }}>По размеру листа</div>}
                  <PriceTable rows={formatRows} />
                </div>
                {priceMode === "dtf" && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: 2, color: "rgba(240,238,245,.5)", textTransform: "uppercase", marginBottom: 10 }}>По погонному метру</div>
                    <PriceTable rows={meterRows} />
                  </div>
                )}
              </div>
            ) : null}

            {priceNote && priceMode !== "dtf" && <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginTop: 14, lineHeight: 1.6, maxWidth: 760 }}>{priceNote}</p>}

            {!content.prices?.hideActions && !isTermoPricePage && (
              priceMode === "dtf" ? (
                <DtfConstructorPromo onOpenConstructor={props.onOpenConstructor} />
              ) : (
                <div style={{ marginTop: 22 }}>
                  <button type="button" onClick={props.onOpenCalculator} style={{ background: `linear-gradient(135deg,${accent},${accent2})`, border: "none", color: "#fff", padding: "13px 26px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", marginRight: 12 }}>Открыть калькулятор</button>
                  <button type="button" onClick={props.onOpenConstructor} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#f0eef5", padding: "13px 26px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Создать дизайн в конструкторе</button>
                </div>
              )
            )}
          </div>
        </section>
      )}

      <section className="section-shell" style={{ padding: "44px 5%" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 28, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 200, marginBottom: 20 }}>{content.seo.title}</h2>
            <div style={{ fontSize: 15, fontWeight: 300, color: "rgba(240,238,245,.6)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 16 }}>
              {content.seo.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <ProductMockup visual={{ ...visual, caption: "Визуальный пример этой услуги" }} photo={seoPhoto} compact />
        </div>
      </section>

      {faq.length > 0 && (
        <section className="section-shell" style={{ padding: "40px 5%" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <Eyebrow>FAQ</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 200, marginTop: 12, marginBottom: 22 }}>Частые вопросы</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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

      {content.related?.length > 0 && (
        <section className="section-shell" style={{ padding: "40px 5% 20px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Eyebrow>Смотрите также</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 14, marginTop: 18 }}>
              {content.related.map((l) => (
                <Link key={l.to} to={l.to} style={{ display: "block", padding: "18px 20px", borderRadius: 14, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", color: "#f0eef5", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>
                  {l.t} <span style={{ color: accent }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </ServicePageLayout>
  );
}
