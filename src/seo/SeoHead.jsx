// SeoHead — проставляет мета-теги, Open Graph и JSON-LD для конкретной страницы.
//
// Использует нативную поддержку метаданных в React 19: теги <title>, <meta>,
// <link> и <script type="application/ld+json">, отрендеренные в теле компонента,
// автоматически «всплывают» в <head>. Сторонние библиотеки (react-helmet) не нужны.

import { BUSINESS, SITE_URL } from "./businessInfo.js";
import { DEFAULT_OG_IMAGE } from "./pagesMeta.js";
import { buildPageSchemas, absoluteUrl } from "./schema.js";

export default function SeoHead({ page, includeLocalBusiness = false }) {
  if (!page) return null;

  const canonical = absoluteUrl(page.url);
  const ogImage = absoluteUrl(page.ogImage || DEFAULT_OG_IMAGE);
  const keywords = Array.isArray(page.keywords) ? page.keywords.join(", ") : "";
  const schemas = buildPageSchemas(page, { includeLocalBusiness });

  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:locale" content="ru_RU" />

      {/* JSON-LD микроразметка */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Схемы формируются только из наших данных (businessInfo/pagesMeta),
          // внешнего пользовательского ввода здесь нет.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export { SITE_URL };
