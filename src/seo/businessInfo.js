// Единый источник правды о компании (NAP — Name, Address, Phone).
// На эти данные ссылаются schema.js (микроразметка) и страницы сайта,
// чтобы исключить расхождения адреса/телефона/часов в разных местах.

export const SITE_URL = "https://futurespb.ru";

export const BUSINESS = {
  name: "Future Studio",
  legalName: "Future Studio",
  description:
    "Студия DTF-печати на одежде и текстиле в Приморском районе Санкт-Петербурга. Печать на футболках, худи, шопперах, спортивной и рабочей форме от 1 штуки.",
  url: SITE_URL,
  email: "future178@yandex.ru",
  // Телефон в двух форматах: для отображения и для tel:-ссылок
  phoneDisplay: "+7 (950) 000-34-64",
  phoneHref: "+79500003464",
  telegram: "https://t.me/FUTURE_178",
  address: {
    country: "RU",
    region: "Санкт-Петербург",
    locality: "Санкт-Петербург",
    district: "Приморский район",
    street: "просп. Авиаконструкторов, 5, корп. 2",
    floor: "этаж 2",
    postalCode: "197372",
    metro: "Комендантский проспект",
    full: "Санкт-Петербург, просп. Авиаконструкторов, 5, корп. 2, этаж 2, 197372",
  },
  geo: {
    latitude: 60.010788,
    longitude: 30.246652,
  },
  // Часы работы: ежедневно 11:00–20:00
  openingHours: {
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    opens: "11:00",
    closes: "20:00",
    human: "Ежедневно с 11:00 до 20:00",
  },
  ratings: {
    yandex: { value: 5.0, count: 87 },
    avito: { value: 5.0, count: 66 },
  },
  // Внешние профили (для sameAs в микроразметке)
  sameAs: [
    "https://t.me/FUTURE_178",
    "https://yandex.ru/maps/org/future_studio/220314499581/",
    "https://www.avito.ru/brands/fbd1de8c13e6016a4bf34bac8abc7d51",
  ],
};
