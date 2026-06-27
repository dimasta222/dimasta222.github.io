# src/seo — SEO-обвязка многостраничного сайта

Модуль отвечает за мета-теги, микроразметку (schema.org / JSON-LD) и единый
реестр страниц. Это «источник правды» для роутинга, меню и sitemap.

## Файлы

| Файл | Назначение |
|------|------------|
| `businessInfo.js` | Объект `BUSINESS` — данные компании (NAP): адрес, телефон, часы, гео-координаты, рейтинги, ссылки. Единый источник, чтобы исключить расхождения. |
| `pagesMeta.js` | Массив `PAGES` — реестр всех страниц: url, title, description, h1, keywords, priority, faq и т. д. Карты `PAGES_BY_URL` / `PAGES_BY_ID` и хелпер `getPageMeta(url)`. |
| `schema.js` | Генераторы JSON-LD: `localBusinessSchema`, `serviceSchema`, `breadcrumbSchema`, `faqSchema` и сборщик `buildPageSchemas(page, opts)`. |
| `SeoHead.jsx` | React-компонент: рендерит `<title>`, `<meta>`, Open Graph и JSON-LD для страницы. Опирается на React 19 (нативный hoisting метаданных в `<head>`). |

## Как добавить новую страницу

1. Добавить запись в массив `PAGES` в `pagesMeta.js` (см. описание полей в шапке файла).
2. Создать React-компонент страницы (тексты тела — в компоненте, вариант А).
3. В компоненте подключить `<SeoHead page={getPageMeta("/url/")} />`.
4. Прописать маршрут в роутере и при необходимости пункт меню (`inNav`).
5. sitemap.xml подхватит страницу из `PAGES` автоматически (когда будет скрипт генерации).

## Принципы

- Мета и FAQ — данные (в `pagesMeta.js`). Тексты блоков — в компонентах.
- Все NAP-данные берутся только из `businessInfo.js`.
- `LocalBusiness` подключается один раз (на главной): `includeLocalBusiness`.
