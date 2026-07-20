import { useEffect, useState } from "react";
import {
    SILK_EXTRAS,
    SILK_FABRIC_OPTIONS,
    SILK_FORMATS,
    SILK_GARMENT_OPTIONS,
    SILK_THERMO_PER_UNIT,
    SILK_TIERS,
    getSilkCost
} from "../data/silkscreenPrices.js";
import STYLES from "../shared/appStyles.js";
import { sanitizeIntegerInput } from "../utils/numericInput.js";
import LogoMini from "./LogoMini.jsx";
import SilkscreenOrderModal from "./SilkscreenOrderModal.jsx";
import TG from "./TG.jsx";

const STORAGE_KEY = "silkscreen-calc-state";
const STORAGE_VERSION = 2;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    return state?.version === STORAGE_VERSION ? state : null;
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

const COLOR_OPTIONS = SILK_FORMATS[0].rows.map((r) => ({ value: String(r.colors), label: r.label }));

function makeItem(id) {
  return { id, format: "A6", colors: "1", qty: 30, fabric: "color", garment: "normal", extras: [], thermo: false };
}

// Текстовая сводка выбранных доплат (для результата и заказа).
function buildModsLabel(it) {
  const parts = [];
  const fab = SILK_FABRIC_OPTIONS.find((f) => f.value === it.fabric);
  if (fab && fab.value !== "color") parts.push(`${fab.label.toLowerCase()} ткань`);
  const gar = SILK_GARMENT_OPTIONS.find((g) => g.value === it.garment);
  if (gar && gar.value !== "normal") parts.push(gar.label.toLowerCase());
  (it.extras || []).forEach((ex) => {
    const e = SILK_EXTRAS.find((x) => x.value === ex);
    if (e) parts.push(e.label.toLowerCase());
  });
  if (it.thermo) parts.push("термопресс");
  return parts.join(", ");
}

export default function SilkscreenCalcPage({ onBack, onGoHome, onOpenCookiePolicy, switcher }) {
  const [items, setItems] = useState(() => {
    const s = loadState();
    if (Array.isArray(s?.items) && s.items.length > 0) return s.items;
    return [makeItem(1)];
  });
  const [nid, setNid] = useState(() => loadState()?.nid ?? 2);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    saveState({ version: STORAGE_VERSION, items, nid });
  }, [items, nid]);

  const add = () => {
    setItems((arr) => [...arr, makeItem(nid)]);
    setNid((n) => n + 1);
  };
  const rm = (id) => setItems((arr) => (arr.length > 1 ? arr.filter((it) => it.id !== id) : arr));
  const upd = (id, field, value) => setItems((arr) => arr.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  const toggleExtra = (id, value) => setItems((arr) => arr.map((it) => {
    if (it.id !== id) return it;
    const cur = it.extras || [];
    const next = cur.includes(value) ? [] : [value];
    return { ...it, extras: next };
  }));
  const resetCalc = () => { setItems([makeItem(1)]); setNid(2); };

  // Расчёт по каждой позиции.
  const computed = items.map((it) => {
    const qty = Math.max(0, Math.floor(Number(it.qty) || 0));
    const opts = { fabric: it.fabric, garment: it.garment, extras: it.extras, thermo: it.thermo };
    const { unitPrice, baseUnit, cost, tier, effColors, percent } = getSilkCost(it.format, it.colors, qty, opts);
    const fmt = SILK_FORMATS.find((f) => f.name === it.format);
    const row = fmt?.rows.find((r) => String(r.colors) === String(it.colors));
    return {
      ...it,
      qty,
      unitPrice,
      baseUnit,
      cost,
      tier,
      effColors,
      percent,
      formatName: it.format,
      formatLabel: fmt?.label || it.format,
      colorsLabel: row?.label || it.colors,
      modsLabel: buildModsLabel(it),
    };
  });

  const validItems = computed.filter((it) => it.qty > 0 && it.unitPrice > 0);
  const total = validItems.reduce((s, it) => s + it.cost, 0);
  const totalQty = validItems.reduce((s, it) => s + it.qty, 0);
  const hasResult = validItems.length > 0;

  const orderItems = validItems.map((it) => ({
    formatName: it.formatLabel,
    colorsLabel: it.colorsLabel,
    qty: it.qty,
    unitPrice: it.unitPrice,
    modsLabel: it.modsLabel,
  }));

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#08080c", color: "#f0eef5", minHeight: "100vh" }}>
      <style>{STYLES}</style>
      <style>{`
        @media(max-width:900px){
          .silk-price-grid{grid-template-columns:1fr!important}
          .silk-notes{grid-template-columns:1fr!important}
        }
        .silk-price-grid,.silk-price-grid>div{min-width:0}
        .silk-scroll{width:100%;max-width:100%;overflow-x:auto!important;-webkit-overflow-scrolling:touch;overscroll-behavior-inline:contain;scrollbar-width:thin;scrollbar-color:rgba(232,67,147,.55) rgba(255,255,255,.04)}
        .silk-scroll::-webkit-scrollbar{height:4px}
        @media(max-width:600px){
          .silk-head{margin:22px 0 18px!important}
          .silk-card{padding:16px 16px!important}
          .silk-scroll{margin:0!important;padding:0 0 8px!important}
          .silk-price-table{font-size:12px!important;min-width:420px!important}
          .silk-price-table th,.silk-price-table td{padding:4px 5px!important}
          .silk-effects-row{gap:6px!important}
          .silk-effects-row .tb{padding:7px 9px!important;font-size:13px!important}
          .silk-reset-row{flex-direction:column!important;align-items:stretch!important;gap:10px!important}
          .silk-reset-row .silk-reset-btn{justify-content:center!important}
        }
        @media(max-width:380px){
          .silk-colors{gap:4px!important}
          .silk-colors .tb{padding:8px 2px!important;font-size:13px!important}
          .silk-price-table{min-width:380px!important}
        }
      `}</style>

      <div className="page-shell-narrow" style={{ maxWidth: 1480, margin: "0 auto", padding: "28px 4% 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={onBack} aria-label="Назад" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", color: "inherit", padding: 0, font: "inherit" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84393" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" onClick={onGoHome} aria-label="На главную" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", background: "none", border: "none", color: "inherit", padding: 0, font: "inherit" }}>
            <LogoMini />
          </button>
        </div>

        <div className="silk-head" style={{ textAlign: "center", margin: "36px 0 24px" }}>
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 4, color: "#e84393", textTransform: "uppercase" }}>Оптовым клиентам</span>
          <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 200, marginTop: 12 }}>
            Калькулятор <span style={{ fontWeight: 600, background: "linear-gradient(135deg,#e84393,#6c5ce7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>шелкографии</span>
          </h1>
        </div>

        {switcher}

        <div className="cg2" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 28, marginBottom: 48, alignItems: "start", marginTop: 24, minWidth: 0 }}>
          {/* Левая колонка — ввод позиций */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            {computed.map((it, idx) => (
              <div key={it.id} className="cs calc-panel" style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: "linear-gradient(135deg,#e84393,#6c5ce7)", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Принт #{idx + 1}</span>
                  {items.length > 1 && (
                    <button onClick={() => rm(it.id)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(240,238,245,.3)", cursor: "pointer", fontSize: 16, fontFamily: "inherit" }} onMouseEnter={(e) => (e.target.style.color = "#e84393")} onMouseLeave={(e) => (e.target.style.color = "rgba(240,238,245,.3)")}>✕</button>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 400, color: "rgba(240,238,245,.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Формат принта</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                      {SILK_FORMATS.map((f) => (
                        <button key={f.name} onClick={() => upd(it.id, "format", f.name)} className={`tb ${it.format === f.name ? "ta" : "ti"}`} style={{ padding: "9px 6px", fontSize: 13 }}>{f.label}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 400, color: "rgba(240,238,245,.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Количество цветов</label>
                    <div className="silk-colors" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
                      {COLOR_OPTIONS.map((c) => (
                        <button key={c.value} onClick={() => upd(it.id, "colors", c.value)} className={`tb ${String(it.colors) === c.value ? "ta" : "ti"}`} style={{ padding: "8px 4px", fontSize: 13 }}>{c.value}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 400, color: "rgba(240,238,245,.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Тираж, шт</label>
                    <input
                      data-caret-end
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={it.qty || ""}
                      onChange={(event) => upd(it.id, "qty", sanitizeIntegerInput(event.target.value))}
                      className="inf"
                      aria-label="Тираж, шт"
                      style={{ padding: "12px 16px", fontSize: 16, fontWeight: 500, textAlign: "center" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 400, color: "rgba(240,238,245,.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Тип ткани</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {SILK_FABRIC_OPTIONS.map((f) => (
                        <button key={f.value} onClick={() => upd(it.id, "fabric", f.value)} title={f.hint} className={`tb ${it.fabric === f.value ? "ta" : "ti"}`} style={{ padding: "8px 4px", fontSize: 12 }}>{f.label}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 400, color: "rgba(240,238,245,.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Тип изделия</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                      {SILK_GARMENT_OPTIONS.map((g) => (
                        <button key={g.value} onClick={() => upd(it.id, "garment", g.value)} title={g.hint} className={`tb ${it.garment === g.value ? "ta" : "ti"}`} style={{ padding: "8px 4px", fontSize: 12 }}>{g.label}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 400, color: "rgba(240,238,245,.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, display: "block" }}>Доп. эффекты и обработка</label>
                    <div className="silk-effects-row" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {SILK_EXTRAS.map((e) => {
                        const on = (it.extras || []).includes(e.value);
                        return (
                          <button key={e.value} onClick={() => toggleExtra(it.id, e.value)} className={`tb ${on ? "ta" : "ti"}`} style={{ padding: "7px 11px", fontSize: 12 }}>{e.label} +{e.percent}%</button>
                        );
                      })}
                      <button onClick={() => upd(it.id, "thermo", !it.thermo)} className={`tb ${it.thermo ? "ta" : "ti"}`} style={{ padding: "7px 11px", fontSize: 12 }}>Термопресс +{SILK_THERMO_PER_UNIT} ₽/шт</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={add} style={{ background: "rgba(255,255,255,.02)", border: "1.5px dashed rgba(255,255,255,.1)", borderRadius: 20, padding: 18, cursor: "pointer", color: "rgba(240,238,245,.35)", fontSize: 14, fontFamily: "'Outfit',sans-serif", transition: "all .3s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,67,147,.4)"; e.currentTarget.style.color = "#e84393"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(240,238,245,.35)"; }}>
              + Добавить принт
            </button>

            <div className="silk-reset-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "rgba(240,238,245,.38)" }}>Добавлено {items.length} принт(ов).</div>
              <button type="button" onClick={resetCalc} className="silk-reset-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,80,80,.08)", border: "1px solid rgba(255,80,80,.2)", borderRadius: 10, cursor: "pointer", color: "#ff6b6b", fontSize: 12, fontWeight: 500, fontFamily: "'Outfit',sans-serif", padding: "7px 14px", transition: "all .3s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,80,80,.15)"; e.currentTarget.style.borderColor = "rgba(255,80,80,.4)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,80,80,.08)"; e.currentTarget.style.borderColor = "rgba(255,80,80,.2)"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 1 3 6.7" /><path d="M3 22v-6h6" /></svg>
                Сбросить
              </button>
            </div>
          </div>

          {/* Правая колонка — результат и тарифы */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div className="cs calc-panel" style={{ padding: 28, border: "1px solid rgba(232,67,147,.15)" }}>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 2, color: "#e84393", textTransform: "uppercase", marginBottom: 24 }}>Результат</div>

              {!hasResult ? (
                <div style={{ padding: "32px 0", textAlign: "center", color: "rgba(240,238,245,.3)", fontSize: 14, fontWeight: 300 }}>Укажите тираж</div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {validItems.map((it, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 400 }}>{it.formatLabel} · {it.colorsLabel}</div>
                          <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.3)" }}>{it.qty} шт × {it.unitPrice} ₽ (тираж от {it.tier})</div>
                          {it.modsLabel && <div style={{ fontSize: 11, fontWeight: 300, color: "rgba(240,238,245,.28)", marginTop: 2 }}>{it.modsLabel}</div>}
                        </div>
                        <span className="calc-result-price" style={{ fontSize: 18, fontWeight: 600 }}>{it.cost.toLocaleString("ru")} ₽</span>
                      </div>
                    ))}
                  </div>

                  <div className="calc-total-box" style={{ marginTop: 20, padding: "18px 22px", borderRadius: 14, background: "linear-gradient(135deg,rgba(232,67,147,.1),rgba(108,92,231,.1))", border: "1px solid rgba(232,67,147,.2)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 16, fontWeight: 500 }}>Итого</span>
                      <span className="calc-total-value" style={{ fontSize: 28, fontWeight: 700, background: "linear-gradient(135deg,#e84393,#6c5ce7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{total.toLocaleString("ru")} ₽</span>
                    </div>
                    {totalQty > 0 && <div className="calc-total-note" style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginTop: 4, textAlign: "right" }}>≈ {Math.round(total / totalQty)} ₽ / изделие</div>}
                  </div>

                  <button type="button" onClick={() => setOrderModalOpen(true)} className="btg" style={{ width: "100%", justifyContent: "center", marginTop: 18, display: "flex", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}><TG /> Оформить заказ</button>
                </>
              )}
            </div>

            {/* Цены — под блоком «Результат» */}
            <div className="cs calc-panel" style={{ padding: "22px 24px" }}>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 2, color: "rgba(240,238,245,.45)", textTransform: "uppercase", marginBottom: 6 }}>Цены за принт — шелкография</div>
              <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.3)", marginBottom: 18 }}>Цена за нанесение на 1 изделие, ₽. Стоимость текстиля считается отдельно.</div>
              <div className="silk-price-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
                {SILK_FORMATS.map((fmt) => {
                  const active = validItems.some((it) => it.formatName === fmt.name);
                  return (
                    <div key={fmt.name}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: active ? "#e84393" : "rgba(240,238,245,.6)", marginBottom: 10 }}>{fmt.label}</div>
                      <div className="silk-scroll" style={{ overflowX: "auto" }}>
                        <table className="silk-price-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 460 }}>
                          <thead>
                            <tr>
                              <th style={thStyle("left")}>Цвета</th>
                              {SILK_TIERS.map((t) => (
                                <th key={t} style={thStyle("right")}>{t}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {fmt.rows.map((row) => {
                              const rowActive = validItems.some((it) => it.formatName === fmt.name && String(it.effColors) === String(row.colors));
                              return (
                                <tr key={row.label} style={{ background: rowActive ? "rgba(232,67,147,.08)" : "transparent" }}>
                                  <td style={{ ...tdStyle("left"), color: rowActive ? "#e84393" : "rgba(240,238,245,.45)", fontWeight: rowActive ? 600 : 400 }}>{row.label}</td>
                                  {row.prices.map((p, i) => {
                                    const cellActive = rowActive && validItems.some((it) => it.formatName === fmt.name && String(it.effColors) === String(row.colors) && it.tier === SILK_TIERS[i]);
                                    return (
                                      <td key={i} style={{ ...tdStyle("right"), color: cellActive ? "#e84393" : "rgba(240,238,245,.4)", fontWeight: cellActive ? 700 : 400 }}>{p}</td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Примечания — под таблицей цен */}
            <div className="cs calc-panel" style={{ padding: "22px 26px", borderLeft: "3px solid #e84393", border: "1px solid rgba(232,67,147,.28)", background: "linear-gradient(135deg,rgba(232,67,147,.1),rgba(108,92,231,.08))" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 8, background: "linear-gradient(135deg,#e84393,#6c5ce7)", fontSize: 15, flexShrink: 0 }}>⚠</span>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#f0eef5", textTransform: "uppercase" }}>Важно</span>
              </div>
              <ul className="silk-notes" style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px 32px", fontSize: 13, fontWeight: 400, color: "rgba(240,238,245,.78)", lineHeight: 1.55 }}>
                {[
                  "Цены — за нанесение на 1 изделие, пластизольная краска.",
                  "Печать на белом текстиле — −7% к прайсу.",
                  "Тёмная ткань — +1 цвет на подложку.",
                  "Футер 3-нитка (худи/свитшоты) — +15%.",
                  "PUFF / металлик / флуор — +20%; водная, световозвращающая, светонакопительная — +30%.",
                  "Термопресс — +20 ₽/шт. Макс. размер печати 35×45 см.",
                  "Пробный образец — 1800 ₽ за цвет/раму. На изделиях заказчика закладывается брак 3–5% тиража.",
                ].map((note) => (
                  <li key={note} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "#e84393", marginTop: 7, flexShrink: 0 }} />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "24px 5%", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.2)", margin: 0 }}>© 2026 Future Studio • СПб • Шелкография</p>
        {onOpenCookiePolicy && <button type="button" onClick={onOpenCookiePolicy} style={{ background: "none", border: "none", color: "rgba(240,238,245,.2)", fontSize: 12, fontWeight: 300, cursor: "pointer", padding: "4px 0 0", font: "inherit", display: "block", margin: "0 auto", textDecoration: "underline" }}>Политика конфиденциальности</button>}
      </footer>

      <SilkscreenOrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        items={orderItems}
        total={total}
        onResetCalc={resetCalc}
      />
    </div>
  );
}

function thStyle(align) {
  return {
    textAlign: align, padding: "4px 6px", fontSize: 10, fontWeight: 500,
    color: "rgba(240,238,245,.3)", borderBottom: "1px solid rgba(255,255,255,.08)", whiteSpace: "nowrap",
  };
}

function tdStyle(align) {
  return {
    textAlign: align, padding: "4px 6px", whiteSpace: "nowrap",
  };
}
