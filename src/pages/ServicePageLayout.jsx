// Общий макет для SEO-страниц услуг: навигация, мета-теги (SeoHead),
// блок контактов и футер. Тело конкретной страницы передаётся через children.
//
// Презентационный компонент: все обработчики навигации приходят пропсами из App,
// чтобы переиспользовать единое состояние шапки/меню.

import MainNavigation from "../components/MainNavigation.jsx";
import ContactSection from "../components/ContactSection.jsx";
import SeoHead from "../seo/SeoHead.jsx";
import STYLES from "../shared/appStyles.js";

// Лёгкая замена анимированного Reveal с главной (без IntersectionObserver).
function Plain({ children, className }) {
  return <div className={className}>{children}</div>;
}

export default function ServicePageLayout({
  page,
  includeLocalBusiness = false,
  hideContactSection = false,
  children,
  navigationItems,
  textileMenuItems,
  serviceMenuGroups,
  scrollY,
  currentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  textileMenuOpen,
  setTextileMenuOpen,
  serviceMenuOpen,
  setServiceMenuOpen,
  onNavigate,
  onNavigateTextile,
  onNavigateService,
  onOpenCalculator,
  onOpenConstructor,
  onOpenCookiePolicy,
}) {
  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#08080c", color: "#f0eef5", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{STYLES}</style>
      <SeoHead page={page} includeLocalBusiness={includeLocalBusiness} />

      <MainNavigation
        scrollY={scrollY}
        currentPage={currentPage}
        activeSection=""
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        textileMenuOpen={textileMenuOpen}
        setTextileMenuOpen={setTextileMenuOpen}
        serviceMenuOpen={serviceMenuOpen}
        setServiceMenuOpen={setServiceMenuOpen}
        navigationItems={navigationItems}
        textileMenuItems={textileMenuItems}
        serviceMenuGroups={serviceMenuGroups}
        onNavigate={onNavigate}
        onNavigateTextile={onNavigateTextile}
        onNavigateService={onNavigateService}
        onOpenCalculator={onOpenCalculator}
        onOpenConstructor={onOpenConstructor}
      />

      <main style={{ paddingTop: 72 }}>{children}</main>

      {!hideContactSection && <ContactSection Reveal={Plain} />}

      <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "32px 5%", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, position: "relative" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(135deg,#6c5ce7,#3d2e7c)", position: "absolute", top: 7, left: 14 }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg,#e84393,#c0247a)", position: "absolute", top: 5, left: 6 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(135deg,#d4a0c0,#8a3a6a)", position: "absolute", top: 7, left: 0 }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: 3 }}>FUTURE STUDIO</span>
        </div>
        <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(240,238,245,.2)", margin: "0 0 4px" }}>© 2026 Future Studio • СПб, пр. Авиаконструкторов, 5к2</p>
        <p style={{ fontSize: 11, fontWeight: 300, color: "rgba(240,238,245,.15)", margin: "0 0 12px" }}>ИП Лымарь Дмитрий Викторович • ИНН 532125230006 • ОГРН 320532100002195</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button type="button" onClick={onOpenCookiePolicy} style={{ background: "none", border: "none", color: "rgba(240,238,245,.2)", fontSize: 12, fontWeight: 300, cursor: "pointer", padding: 0, font: "inherit", textDecoration: "underline" }}>Политика конфиденциальности</button>
        </div>
      </footer>
      <div className="mobile-bottom-spacer" />
    </div>
  );
}
