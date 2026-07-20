import { useEffect, useRef } from "react";

// Вкладки-переключатели между калькуляторами,
// отображаются вверху каждого калькулятора.
export default function CalcTypeSwitcher({ active, onSwitch }) {
  const activeButtonRef = useRef(null);
  const tabs = [
    { key: "calc", label: "DTF-печать" },
    { key: "calc_silk", label: "Шелкография" },
    { key: "calc_termo", label: "Термопечать" },
    { key: "calc_sublimation", label: "Сублимация" },
    { key: "calc_embroidery", label: "Вышивка · скоро", disabled: true },
  ];
  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
      <div style={{ display: "inline-flex", gap: 6, padding: 6, margin: "0 auto", borderRadius: 50, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", flexShrink: 0 }}>
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              ref={isActive ? activeButtonRef : null}
              key={t.key}
              type="button"
              disabled={t.disabled}
              aria-pressed={isActive}
              onClick={() => { if (!isActive && !t.disabled) onSwitch(t.key); }}
              className={`tb ${isActive ? "ta" : "ti"}`}
              style={{ padding: "9px clamp(13px,2vw,22px)", whiteSpace: "nowrap", cursor: t.disabled ? "not-allowed" : "pointer", opacity: t.disabled ? .48 : 1 }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
