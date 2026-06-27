import { useEffect, useMemo, useState } from "react";
import { reachGoal } from "../utils/metrika.js";
import { generateOrderNumber } from "../utils/orderNumber.js";

const TELEGRAM_URL = "https://t.me/FUTURE_178";
const EMAIL = "future178@yandex.ru";
const MAX_URL = "https://max.ru/u/f9LHodD0cOL0pTqxSNqIn22flD78BhADnB7BLdrGb3yZbXHeBKclVTh-b2I";

function buildMessage({ orderNumber, items, total, heading }) {
  const lines = [];
  lines.push(heading);
  if (orderNumber) lines.push(`№ ${orderNumber}`);
  lines.push("");
  items.forEach((it, i) => {
    lines.push(
      `${i + 1}. ${it.formatName} · ${it.colorsLabel} · ${it.qty} шт × ${it.unitPrice} ₽ = ${(it.unitPrice * it.qty).toLocaleString("ru-RU")} ₽`,
    );
    if (it.modsLabel) lines.push(`   доплаты: ${it.modsLabel}`);
  });
  lines.push("");
  lines.push(`Итого: ${total.toLocaleString("ru-RU")} ₽`);
  return lines.join("\n");
}

export default function SilkscreenOrderModal({ open, onClose, items, total, onResetCalc, kind = "silkscreen", heading = "Заказ шелкографии", subject = "Заказ шелкографии", note = "Точная цена шелкографии зависит от макета, изделия и площади печати. Отправьте сводку — менеджер подтвердит расчёт и подскажет по подготовке трафаретов." }) {
  const [copied, setCopied] = useState(false);

  const orderNumber = useMemo(() => (open ? generateOrderNumber(kind) : null), [open, kind]);
  const message = useMemo(
    () => (open ? buildMessage({ orderNumber, items, total, heading: `${heading} — FUTURE STUDIO` }) : ""),
    [open, orderNumber, items, total, heading],
  );

  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    const scrollY = window.scrollY;
    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      document.body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  useEffect(() => { if (!open) setCopied(false); }, [open]);

  if (!open) return null;

  const telegramHref = `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`;
  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.72)", backdropFilter: "blur(4px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "'Outfit',sans-serif",
      overscrollBehavior: "contain",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto",
        background: "#0f0f15", borderRadius: 18, border: "1px solid rgba(232,67,147,.18)",
        padding: "28px 26px 24px", color: "#f0eef5", boxShadow: "0 20px 60px rgba(0,0,0,.6)",
        overscrollBehavior: "contain", WebkitOverflowScrolling: "touch",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Оформление заказа</h2>
          <button onClick={onClose} aria-label="Закрыть" style={{
            background: "transparent", border: "none", color: "#f0eef5", fontSize: 22, cursor: "pointer", padding: 4, lineHeight: 1,
          }}>×</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <section>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,238,245,.4)", marginBottom: 8 }}>Сводка заказа</div>
            <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              {items.map((it, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ color: "rgba(240,238,245,.7)" }}>
                    {it.formatName} · {it.colorsLabel} · {it.qty} шт
                    {it.modsLabel && <span style={{ display: "block", fontSize: 11, color: "rgba(240,238,245,.4)" }}>{it.modsLabel}</span>}
                  </span>
                  <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>{(it.unitPrice * it.qty).toLocaleString("ru-RU")} ₽</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 8, marginTop: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "rgba(240,238,245,.55)" }}>Итого</span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{total.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>
          </section>

          <div style={{ padding: 14, borderRadius: 12, background: "rgba(108,92,231,.08)", border: "1px solid rgba(108,92,231,.25)", fontSize: 13, color: "rgba(240,238,245,.85)", lineHeight: 1.5 }}>
            {note}
          </div>

          <button onClick={copyMessage} style={{
            width: "100%", padding: "12px 20px", borderRadius: 12, background: "rgba(255,255,255,.06)",
            color: "#f0eef5", border: "1px solid rgba(255,255,255,.12)", fontSize: 14, fontWeight: 500,
            cursor: "pointer", fontFamily: "inherit",
          }}>{copied ? "Скопировано ✓" : "Скопировать сводку"}</button>

          <div>
            <div style={{ fontSize: 12, color: "rgba(240,238,245,.55)", marginBottom: 10, lineHeight: 1.5 }}>
              Отправьте сводку напрямую — текст уже подставится автоматически:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
              <a href={telegramHref} target="_blank" rel="noopener noreferrer" onClick={() => reachGoal("silk_send_telegram")} style={btnStyle("#0088cc")}>Telegram</a>
              <a href={emailHref} onClick={() => reachGoal("silk_send_email")} style={btnStyle("#e84393")}>Email</a>
              <a href={MAX_URL} target="_blank" rel="noopener noreferrer" onClick={() => reachGoal("silk_send_max")} style={btnStyle("#ff8a00")}>MAX</a>
            </div>
          </div>

          {onResetCalc && (
            <button onClick={() => { onResetCalc(); onClose(); }} style={{
              background: "transparent", border: "none", color: "rgba(240,238,245,.4)", fontSize: 12, cursor: "pointer", marginTop: 4, padding: 6, fontFamily: "inherit",
            }}>Очистить калькулятор</button>
          )}
        </div>
      </div>
    </div>
  );
}

function btnStyle(bg) {
  return {
    display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 8,
    padding: "12px 18px", borderRadius: 12, background: bg, color: "#fff", fontWeight: 600,
    fontSize: 14, textDecoration: "none", fontFamily: "'Outfit',sans-serif",
  };
}
