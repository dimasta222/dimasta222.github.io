// Реестр SEO-страниц: id страницы (из pagesMeta.js) → React-компонент.
//
// App.jsx подбирает компонент так:
//   SERVICE_PAGE_COMPONENTS[page.id] || ServicePagePlaceholder
// Если id не зарегистрирован — покажется заглушка с корректными мета-тегами.
//
// Типовые страницы услуг рендерит общий ServiceContentPage (тело берётся из
// servicePagesContent.js по id). Страницы с особой структурой — отдельными
// компонентами (FutbolkiPage — образец, контакты/отзывы/блог).

import ServiceContentPage from "./ServiceContentPage.jsx";
import KontaktyPage from "./KontaktyPage.jsx";
import OtzyvyPage from "./OtzyvyPage.jsx";
import BlogPage from "./BlogPage.jsx";
import PricesPage from "./PricesPage.jsx";

export const SERVICE_PAGE_COMPONENTS = {
  // Типовые страницы услуг → общий рендер по данным
  futbolki: ServiceContentPage,
  tolstovki: ServiceContentPage,
  dtf: ServiceContentPage,
  termopechat: ServiceContentPage,
  shelkografiya: ServiceContentPage,
  sublimaciya: ServiceContentPage,
  polo: ServiceContentPage,
  "svoya-odezhda": ServiceContentPage,
  srochnaya: ServiceContentPage,
  opt: ServiceContentPage,
  specodezhda: ServiceContentPage,
  sportforma: ServiceContentPage,
  fartuki: ServiceContentPage,
  shoppery: ServiceContentPage,
  drugoe: ServiceContentPage,
  maket: ServiceContentPage,

  // Страницы с особой структурой
  kontakty: KontaktyPage,
  otzyvy: OtzyvyPage,
  blog: BlogPage,
  ceny: PricesPage,
};
