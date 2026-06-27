# src/pages — SEO-страницы услуг

Страницы-лендинги под коммерческие запросы (из SEO-таблицы). Каждая страница
рендерится в общем макете и берёт мета-данные из `src/seo/pagesMeta.js`.

## Файлы

| Файл | Назначение |
|------|------------|
| `ServicePageLayout.jsx` | Общий макет: шапка (`MainNavigation`), `SeoHead`, блок контактов (`ContactSection`), футер. Тело передаётся через `children`. |
| `FutbolkiPage.jsx` | Страница «Печать на футболках» — образец с полным контентом (10 блоков). |
| `ServiceContentPage.jsx` | Универсальный рендер типовой страницы услуги: тело берётся из `servicePagesContent.js` по `page.id` (hero, шаги, преимущества, цены, SEO-текст, FAQ, перелинковка). |
| `servicePagesContent.js` | Данные тела типовых страниц услуг (`SERVICE_CONTENT[id]`): уникальные тексты, преимущества, режим цен (`format` / `dtf` / `none`), SEO-абзацы, ссылки. |
| `KontaktyPage.jsx` | Страница «Контакты»: реквизиты из `businessInfo.js`, карта Яндекса, CTA. |
| `OtzyvyPage.jsx` | Страница «Отзывы»: рейтинги Яндекс/Авито и примеры отзывов. |
| `BlogPage.jsx` | Индекс блога: темы статей (пока без ссылок — статьи готовятся). |
| `ServicePagePlaceholder.jsx` | Заглушка для страниц без своего компонента: H1, описание и CTA. Мета-теги уже работают. |
| `servicePages.js` | Реестр `SERVICE_PAGE_COMPONENTS`: id страницы → компонент. |

## Два способа сделать страницу

1. **Типовая услуга** — добавить запись в `SERVICE_CONTENT` (servicePagesContent.js)
   и зарегистрировать `id: ServiceContentPage` в `servicePages.js`. Свой JSX не нужен.
2. **Особая структура** (контакты, отзывы, блог, образец) — отдельный компонент
   `XxxPage.jsx`, обёрнутый в `ServicePageLayout`, и запись `id: XxxPage` в реестре.

## Как добавить новую страницу

1. Убедиться, что запись страницы есть в `src/seo/pagesMeta.js` (массив `PAGES`).
2. Либо описать тело в `servicePagesContent.js` (типовая страница), либо создать
   компонент `XxxPage.jsx` (особая структура).
3. Зарегистрировать компонент в `servicePages.js` (`id → компонент`).
4. Маршрутизация подхватится автоматически: `App` сопоставляет URL → `seo_<id>`
   и рендерит компонент из реестра (или `ServicePagePlaceholder`, если его нет).

## Связь с App

- `App.getPageFromPath` распознаёт URL страницы из `PAGES_BY_URL` и возвращает `seo_<id>`.
- Ветка рендеринга в `App` передаёт в компонент пропсы навигации и CTA-обработчики
  (`onOpenCalculator`, `onOpenConstructor`, `onOpenCookiePolicy`, и т. д.).
- Внутренние ссылки между страницами — через `<Link>` из react-router-dom.

## Контент

Тексты живут внутри компонентов (вариант А). Цены берутся из единого источника
`src/data/printFormats.js`, NAP-данные — из `src/seo/businessInfo.js`.
