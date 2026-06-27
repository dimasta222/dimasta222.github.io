// Вкладки-переключатели между калькуляторами (DTF / Шелкография),
// отображаются вверху каждого калькулятора.
export default function CalcTypeSwitcher({ active, onSwitch }) {
  const tabs = [
    { key: "calc", label: "DTF-печать" },
    { key: "calc_silk", label: "Шелкография" },
    { key: "calc_termo", label: "Термопечать" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-flex", gap: 6, padding: 6, borderRadius: 50, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => { if (!isActive) onSwitch(t.key); }}
              className={`tb ${isActive ? "ta" : "ti"}`}
              style={{ padding: "9px 22px" }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
