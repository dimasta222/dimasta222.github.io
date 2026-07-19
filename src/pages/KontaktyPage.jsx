import { Link } from "react-router-dom";
import { BUSINESS } from "../seo/businessInfo.js";
import ServicePageLayout from "./ServicePageLayout.jsx";

const accent = "#e84393";
const accent2 = "#6c5ce7";
const cyan = "#00d2d3";
const yandexMapsUrl = "https://yandex.ru/maps/org/future_studio/220314499581/";

function ContactIcon({ type, color = accent }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" /></>,
    telegram: <><path d="m21.5 3.5-3.3 16.1c-.25 1.14-.9 1.42-1.82.88l-5.03-3.7-2.43 2.34c-.27.27-.5.5-1.02.5l.36-5.12 9.32-8.42c.4-.36-.09-.56-.63-.2L5.43 13.14.47 11.59c-1.08-.34-1.1-1.08.23-1.6L20.1 2.5c.9-.33 1.68.2 1.4 1z" fill="currentColor" stroke="none" /></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m22 6-10 7L2 6" /></>,
    map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    metro: <><circle cx="12" cy="12" r="9" /><path d="m6.8 16.5 2.6-8 2.6 5 2.6-5 2.6 8" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  };

  return <span style={{ width: 48, height: 48, borderRadius: 16, display: "grid", placeItems: "center", color, background: `${color}18`, border: `1px solid ${color}38`, flexShrink: 0 }}><svg {...common}>{paths[type]}</svg></span>;
}

function ContactMethod({ item }) {
  return (
    <a
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ minWidth: 0, minHeight: 210, padding: "24px", borderRadius: 26, border: "1px solid rgba(255,255,255,.08)", background: `linear-gradient(145deg,${item.color}12,rgba(255,255,255,.025) 52%)`, color: "#f0eef5", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24, transition: "border-color .25s,transform .25s,background .25s" }}
      onMouseEnter={(event) => { event.currentTarget.style.borderColor = `${item.color}70`; event.currentTarget.style.transform = "translateY(-3px)"; event.currentTarget.style.background = `linear-gradient(145deg,${item.color}20,rgba(255,255,255,.035) 58%)`; }}
      onMouseLeave={(event) => { event.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; event.currentTarget.style.transform = "translateY(0)"; event.currentTarget.style.background = `linear-gradient(145deg,${item.color}12,rgba(255,255,255,.025) 52%)`; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <ContactIcon type={item.icon} color={item.color} />
        <span style={{ color: item.color, fontSize: 22, lineHeight: 1 }} aria-hidden="true">↗</span>
      </div>
      <div>
        <div style={{ color: "rgba(240,238,245,.42)", fontSize: 11, fontWeight: 700, letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 8 }}>{item.label}</div>
        <div style={{ fontSize: "clamp(18px,2.3vw,23px)", fontWeight: 750, lineHeight: 1.15, overflowWrap: "anywhere" }}>{item.value}</div>
        <div style={{ marginTop: 9, color: "rgba(240,238,245,.5)", fontSize: 13, fontWeight: 300, lineHeight: 1.5 }}>{item.description}</div>
      </div>
    </a>
  );
}

function Eyebrow({ children }) {
  return <span style={{ fontSize: 12, fontWeight: 650, letterSpacing: 3.5, color: accent, textTransform: "uppercase" }}>{children}</span>;
}

export default function KontaktyPage(props) {
  const contactMethods = [
    { label: "Telegram", value: "@FUTURE_178", description: "Быстрее всего ответим, проверим макет и сориентируем по стоимости.", href: BUSINESS.telegram, external: true, icon: "telegram", color: accent },
    { label: "Телефон", value: BUSINESS.phoneDisplay, description: "Позвоните, чтобы уточнить готовность заказа или возможность срочной печати.", href: `tel:${BUSINESS.phoneHref}`, icon: "phone", color: accent2 },
    { label: "E-mail", value: BUSINESS.email, description: "Подходит для файлов, реквизитов, технических заданий и деловой переписки.", href: `mailto:${BUSINESS.email}`, icon: "mail", color: cyan },
  ];
  const visitSteps = [
    { icon: "file", title: "Пришлите макет", text: "Укажите размер принта, количество изделий и желаемый срок." },
    { icon: "check", title: "Подтвердите детали", text: "Проверим файл, ткань и производственную очередь, затем назовём точную стоимость." },
    { icon: "map", title: "Приезжайте в студию", text: "Перед визитом лучше убедиться, что заказ готов или мастер сможет принять вас без ожидания." },
  ];

  return (
    <ServicePageLayout {...props} includeLocalBusiness hideContactSection>
      <section className="section-shell" style={{ position: "relative", overflow: "hidden", padding: "54px 5% 40px" }}>
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", left: "-12%", top: -170, background: `radial-gradient(circle,${accent}25,transparent 68%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", right: "-10%", top: -120, background: `radial-gradient(circle,${accent2}24,transparent 68%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto" }}>
          <nav style={{ fontSize: 13, fontWeight: 300, color: "rgba(240,238,245,.4)", marginBottom: 26 }} aria-label="Хлебные крошки">
            <Link to="/" style={{ color: "rgba(240,238,245,.45)", textDecoration: "none" }}>Главная</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(240,238,245,.72)" }}>Контакты</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,430px),1fr))", gap: "clamp(22px,5vw,56px)", alignItems: "stretch" }}>
            <div style={{ padding: "clamp(8px,2vw,20px) 0" }}>
              <Eyebrow>Всегда на связи</Eyebrow>
              <h1 style={{ maxWidth: 760, fontSize: "clamp(38px,6vw,68px)", fontWeight: 250, lineHeight: .98, letterSpacing: "-.045em", margin: "18px 0 22px" }}>
                Контакты <span style={{ fontWeight: 800, background: `linear-gradient(135deg,${accent},${accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future Studio</span>
              </h1>
              <p style={{ maxWidth: 650, margin: 0, color: "rgba(240,238,245,.62)", fontSize: "clamp(15px,2vw,18px)", fontWeight: 300, lineHeight: 1.65 }}>
                Находимся в Приморском районе Санкт-Петербурга рядом с метро «Комендантский проспект». Напишите нам заранее — проверим макет, рассчитаем заказ и согласуем удобное время визита.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 11, marginTop: 26 }}>
                <a href={BUSINESS.telegram} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 22px", borderRadius: 999, background: `linear-gradient(135deg,${accent},${accent2})`, color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 750, boxShadow: `0 18px 44px ${accent}25` }}><span aria-hidden="true">↗</span> Написать в Telegram</a>
                <a href={`tel:${BUSINESS.phoneHref}`} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 22px", borderRadius: 999, border: "1px solid rgba(255,255,255,.11)", background: "rgba(255,255,255,.045)", color: "#f0eef5", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Позвонить</a>
              </div>
            </div>

            <aside style={{ position: "relative", overflow: "hidden", minHeight: 360, padding: "clamp(24px,4vw,36px)", borderRadius: 32, border: "1px solid rgba(255,255,255,.09)", background: `radial-gradient(circle at 90% 5%,${accent2}2b,transparent 36%),linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.018))`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 30, boxShadow: "0 32px 90px rgba(0,0,0,.24)" }}>
              <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", right: -70, bottom: -70, border: `1px solid ${accent}33`, background: "rgba(255,255,255,.025)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,.09)", background: "rgba(255,255,255,.045)", color: "rgba(240,238,245,.7)", fontSize: 12, fontWeight: 650 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: cyan, boxShadow: `0 0 14px ${cyan}` }} />
                  Ежедневно · 11:00–20:00
                </div>
                <div style={{ marginTop: 24, color: "rgba(240,238,245,.4)", fontSize: 11, fontWeight: 700, letterSpacing: 1.8, textTransform: "uppercase" }}>Адрес студии</div>
                <div style={{ marginTop: 9, maxWidth: 430, fontSize: "clamp(23px,3.5vw,34px)", fontWeight: 750, lineHeight: 1.12 }}>{BUSINESS.address.street}</div>
                <div style={{ marginTop: 9, color: "rgba(240,238,245,.52)", fontSize: 14 }}>{BUSINESS.address.floor} · {BUSINESS.address.district}</div>
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10 }}>
                <div style={{ padding: "14px", borderRadius: 17, border: "1px solid rgba(255,255,255,.08)", background: "rgba(0,0,0,.14)" }}>
                  <div style={{ color: accent2, fontSize: 12, fontWeight: 750 }}>Метро</div>
                  <div style={{ marginTop: 5, fontSize: 13, lineHeight: 1.35 }}>{BUSINESS.address.metro}</div>
                </div>
                <div style={{ padding: "14px", borderRadius: 17, border: "1px solid rgba(255,255,255,.08)", background: "rgba(0,0,0,.14)" }}>
                  <div style={{ color: accent, fontSize: 12, fontWeight: 750 }}>Пешком</div>
                  <div style={{ marginTop: 5, fontSize: 13, lineHeight: 1.35 }}>около 890 метров</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "30px 5% 48px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Eyebrow>Выберите удобный способ</Eyebrow>
          <h2 style={{ margin: "12px 0 26px", fontSize: "clamp(28px,4vw,42px)", fontWeight: 250, lineHeight: 1.1 }}>Связаться <span style={{ fontWeight: 750 }}>с командой</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 16 }}>
            {contactMethods.map((item) => <ContactMethod key={item.label} item={item} />)}
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "18px 5% 52px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,390px),1fr))", gap: 18, alignItems: "stretch" }}>
          <div style={{ minHeight: 430, overflow: "hidden", borderRadius: 30, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.025)" }}>
            <iframe
              title="Future Studio на карте"
              src={`https://yandex.ru/map-widget/v1/?ll=${BUSINESS.geo.longitude}%2C${BUSINESS.geo.latitude}&z=16&pt=${BUSINESS.geo.longitude}%2C${BUSINESS.geo.latitude}%2Cpm2rdm`}
              style={{ width: "100%", height: "100%", minHeight: 430, border: 0, display: "block", filter: "saturate(.8) contrast(1.03)" }}
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div style={{ minWidth: 0, padding: "clamp(24px,4vw,36px)", borderRadius: 30, border: "1px solid rgba(255,255,255,.08)", background: `linear-gradient(145deg,${accent2}12,rgba(255,255,255,.025) 52%)`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 28 }}>
            <div>
              <Eyebrow>Как добраться</Eyebrow>
              <h2 style={{ margin: "13px 0 18px", fontSize: "clamp(27px,4vw,40px)", fontWeight: 700, lineHeight: 1.08 }}>Студия рядом с Комендантским</h2>
              <div style={{ display: "grid", gap: 11 }}>
                {[
                  { type: "map", color: accent, title: BUSINESS.address.street, text: `${BUSINESS.address.floor}, ${BUSINESS.address.postalCode}` },
                  { type: "metro", color: accent2, title: BUSINESS.address.metro, text: "около 890 м пешком" },
                  { type: "clock", color: cyan, title: BUSINESS.openingHours.human, text: "без выходных" },
                ].map((item) => (
                  <div key={item.title} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 13, alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.065)" }}>
                    <ContactIcon type={item.type} color={item.color} />
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{item.title}</div>
                      <div style={{ marginTop: 4, color: "rgba(240,238,245,.44)", fontSize: 12 }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a href={yandexMapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, width: "fit-content", maxWidth: "100%", padding: "14px 22px", borderRadius: 999, background: `linear-gradient(135deg,${accent2},${accent})`, color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 750 }}>Построить маршрут <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "24px 5% 64px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 18, marginBottom: 26 }}>
            <div>
              <Eyebrow>Перед визитом</Eyebrow>
              <h2 style={{ margin: "12px 0 0", fontSize: "clamp(28px,4vw,42px)", fontWeight: 250 }}>Чтобы всё прошло <span style={{ fontWeight: 750 }}>быстрее</span></h2>
            </div>
            <div style={{ maxWidth: 430, color: "rgba(240,238,245,.48)", fontSize: 13, lineHeight: 1.55 }}>Предварительное согласование поможет подготовить расчёт и избежать ожидания в студии.</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 14 }}>
            {visitSteps.map((item, index) => (
              <article key={item.title} style={{ minHeight: 190, padding: "22px", borderRadius: 24, border: "1px solid rgba(255,255,255,.075)", background: index === 0 ? `linear-gradient(145deg,${accent}15,rgba(255,255,255,.025))` : "rgba(255,255,255,.025)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <ContactIcon type={item.icon} color={index === 1 ? accent2 : index === 2 ? cyan : accent} />
                  <span style={{ color: "rgba(240,238,245,.22)", fontSize: 13, fontWeight: 750 }}>0{index + 1}</span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 750 }}>{item.title}</h3>
                  <p style={{ margin: "8px 0 0", color: "rgba(240,238,245,.5)", fontSize: 13, fontWeight: 300, lineHeight: 1.55 }}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: "clamp(22px,4vw,32px)", borderRadius: 28, border: `1px solid ${accent}38`, background: `radial-gradient(circle at 10% 10%,${accent}20,transparent 34%),linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.018))`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: "clamp(21px,3vw,28px)", fontWeight: 750 }}>Уже есть макет?</div>
              <div style={{ marginTop: 7, color: "rgba(240,238,245,.52)", fontSize: 14 }}>Пришлите его в Telegram — сразу проверим и посчитаем заказ.</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href={BUSINESS.telegram} target="_blank" rel="noopener noreferrer" style={{ padding: "13px 21px", borderRadius: 999, background: `linear-gradient(135deg,${accent},${accent2})`, color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 750 }}>Отправить макет</a>
              <button type="button" onClick={props.onOpenCalculator} style={{ padding: "13px 21px", borderRadius: 999, border: "1px solid rgba(255,255,255,.11)", background: "rgba(255,255,255,.045)", color: "#f0eef5", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700 }}>Открыть калькулятор</button>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
