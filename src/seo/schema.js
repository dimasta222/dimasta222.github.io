// Генераторы JSON-LD микроразметки (schema.org) для страниц сайта.
// Каждая функция возвращает обычный объект, который SeoHead сериализует
// в <script type="application/ld+json">.

import { BUSINESS, SITE_URL } from "./businessInfo.js";

// Абсолютный URL из относительного пути
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// LocalBusiness — карточка организации (адрес, телефон, часы, гео, рейтинг).
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: `+${BUSINESS.phoneHref.replace(/^\+/, "")}`,
    image: absoluteUrl("/og-image.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BUSINESS.address.street}, ${BUSINESS.address.floor}`,
      addressLocality: BUSINESS.address.locality,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.openingHours.days.map(
          (d) =>
            ({
              Mo: "Monday",
              Tu: "Tuesday",
              We: "Wednesday",
              Th: "Thursday",
              Fr: "Friday",
              Sa: "Saturday",
              Su: "Sunday",
            })[d],
        ),
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.ratings.yandex.value,
      reviewCount: BUSINESS.ratings.yandex.count,
      bestRating: 5,
    },
    sameAs: BUSINESS.sameAs,
  };
}

// Service — конкретная услуга страницы.
export function serviceSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(url),
    serviceType: name,
    areaServed: {
      "@type": "City",
      name: "Санкт-Петербург",
    },
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: BUSINESS.name,
    },
  };
}

// BreadcrumbList — хлебные крошки. items: [{ name, url }, ...]
export function breadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

// FAQPage — блок вопросов-ответов. faq: [{ q, a }, ...]
export function faqSchema(faq = []) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

// Собирает массив всех схем для страницы (отбрасывает пустые).
export function buildPageSchemas(page, { includeLocalBusiness = false } = {}) {
  const schemas = [];
  if (includeLocalBusiness) schemas.push(localBusinessSchema());

  if (page?.url && page.url !== "/") {
    schemas.push(
      serviceSchema({
        name: page.h1,
        description: page.description,
        url: page.url,
      }),
    );
    schemas.push(
      breadcrumbSchema([
        { name: "Главная", url: "/" },
        { name: page.breadcrumbLabel || page.h1, url: page.url },
      ]),
    );
  }

  const faq = faqSchema(page?.faq);
  if (faq) schemas.push(faq);

  return schemas;
}
