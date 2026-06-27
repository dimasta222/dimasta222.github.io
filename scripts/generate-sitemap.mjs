// Генерация public/sitemap.xml из единого реестра страниц (src/seo/pagesMeta.js).
// Запускается перед сборкой (см. npm run build). Источник правды — массив PAGES,
// поэтому при добавлении новой страницы карта сайта обновится автоматически.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { PAGES } from "../src/seo/pagesMeta.js";
import { SITE_URL } from "../src/seo/businessInfo.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../public/sitemap.xml");

// Дата последнего изменения — дата генерации (YYYY-MM-DD).
const lastmod = new Date().toISOString().slice(0, 10);

function urlEntry(page) {
  // url всегда начинается со слеша; убираем хвостовой слеш только у корня не нужно.
  const loc = `${SITE_URL}${page.url}`;
  const priority = typeof page.priority === "number" ? page.priority.toFixed(1) : "0.5";
  // Частота обновления по приоритету: важные страницы — чаще.
  const changefreq = page.priority >= 0.9 ? "weekly" : page.priority >= 0.6 ? "monthly" : "yearly";
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

const body = PAGES.map(urlEntry).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(OUT_PATH, xml, "utf8");
console.log(`[sitemap] ${PAGES.length} URL → public/sitemap.xml (lastmod ${lastmod})`);
