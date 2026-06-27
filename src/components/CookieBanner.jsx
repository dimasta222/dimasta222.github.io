import { useState, useEffect } from "react";

const STORAGE_KEY = "cookie_consent_accepted";

export default function CookieBanner({ onOpenCookiePolicy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)",
      zIndex: 9999, width: "calc(100% - 32px)", maxWidth: 640,
      background: "#0f0f15", border: "1px solid rgba(108,92,231,.25)",
      borderRadius: 16, padding: "16px 20px", boxShadow: "0 8px 40px rgba(0,0,0,.6)",
      fontFamily: "'Outfit',sans-serif", color: "#f0eef5",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: "rgba(240,238,245,.75)" }}>
        Мы используем cookie и Яндекс.Метрику
        {" "}для улучшения работы сайта, анализа трафика и персонализации контента. Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
        <button
          type="button"
          onClick={onOpenCookiePolicy}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "inherit", fontWeight: 500, fontFamily: "inherit", color: "#6c5ce7", textDecoration: "underline", textUnderlineOffset: 3 }}
        >политикой использования cookie</button>
        {" "}и с использованием{" "}
        <button
          type="button"
          onClick={() => window.open("https://metrika.yandex.ru", "_blank", "noopener noreferrer")}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "inherit", fontWeight: 500, fontFamily: "inherit", color: "#e84393", textDecoration: "underline", textUnderlineOffset: 3 }}
        >Яндекс.Метрики</button>
        .
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={accept}
          style={{
            background: "linear-gradient(135deg,#e84393,#6c5ce7)", border: "none",
            borderRadius: 10, padding: "9px 28px", color: "#fff",
            fontSize: 14, fontWeight: 600, fontFamily: "'Outfit',sans-serif", cursor: "pointer",
          }}
        >Принять</button>
      </div>
    </div>
  );
}
