// Вкладки-переключатели между калькуляторами,
// отображаются вверху каждого калькулятора.
export default function CalcTypeSwitcher({ active, onSwitch }) {
  const tabs = [
    { key: "calc", label: "DTF-печать" },
    { key: "calc_silk", label: "Шелкография" },
    { key: "calc_termo", label: "Термопечать" },
    { key: "calc_sublimation", label: "Сублимация" },
    { key: "calc_embroidery", label: "Вышивка · скоро", disabled: true },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
      <div style={{ display: "inline-flex", gap: 6, padding: 6, borderRadius: 50, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", flexShrink: 0 }}>
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              disabled={t.disabled}
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
