const makeSlide = (src, badge, label, title, text) => ({ src, badge, label, title, text });
const serviceImage = (slug, fileName) => `/services/${slug}/${fileName}`;

export const SERVICE_PHOTOS = {
  futbolki: {
    hero: serviceImage("futbolki", "page-futbolki.png"),
    gallery: [
      makeSlide(serviceImage("futbolki", "page-futbolki.png"), "тираж", "Футболки", "Партия футболок с логотипом", "Минималистичный принт на груди для бренда, команды или корпоративного мерча."),
      makeSlide(serviceImage("futbolki", "page-dtf.png"), "DTF", "Футболки", "Футболка с детальным принтом", "Пример более сложного изображения с тонкими деталями и приглушенной палитрой."),
      makeSlide(serviceImage("futbolki", "tshirt-dtf-black.png"), "цвет", "Футболки", "Яркий полноцветный принт", "Вариант для индивидуального заказа, подарка или авторского мерча."),
    ],
  },
  tolstovki: {
    hero: serviceImage("tolstovki", "page-tolstovki.png"),
    gallery: [
      makeSlide(serviceImage("tolstovki", "page-tolstovki.png"), "мерч", "Толстовки", "Толстовки с монохромным принтом", "Спокойный дизайн для бренда одежды, команды или корпоративного мерча."),
      makeSlide(serviceImage("tolstovki", "page-opt.png"), "опт", "Толстовки", "Готовый тираж худи", "Партия сложенных изделий после печати и контроля качества."),
      makeSlide(serviceImage("tolstovki", "hoodie-backprint-black.png"), "спина", "Толстовки", "Крупный принт на худи", "Пример большого нанесения на спине и небольшого элемента спереди."),
    ],
  },
  polo: {
    hero: serviceImage("polo", "page-polo.png"),
    gallery: [
      makeSlide(serviceImage("polo", "page-polo.png"), "лого", "Поло", "Поло с аккуратным логотипом", "Чистое решение для сотрудников, кафе, салонов, магазинов и промо-команд."),
      makeSlide(serviceImage("polo", "polo-logo-white.png"), "форма", "Поло", "Корпоративное поло", "Небольшой логотип на груди без перегруза, когда нужен деловой вид."),
    ],
  },
  shoppery: {
    hero: serviceImage("shoppery", "page-shoppery.png"),
    gallery: [
      makeSlide(serviceImage("shoppery", "page-shoppery.png"), "шоппер", "Шопперы", "Натуральный шоппер с принтом", "Лаконичный вариант для магазина, маркета, бренда или подарочного набора."),
      makeSlide(serviceImage("shoppery", "shopper-natural-print.png"), "мерч", "Шопперы", "Шоппер с графикой", "Более заметный вариант для авторского мерча и промо-наборов."),
    ],
  },
  fartuki: {
    hero: serviceImage("fartuki", "page-fartuki.png"),
    gallery: [
      makeSlide(serviceImage("fartuki", "page-fartuki.png"), "horeca", "Фартуки", "Фартук для кафе или ресторана", "Минималистичный логотип на груди для персонала и формы зала."),
      makeSlide(serviceImage("fartuki", "apron-print-black.png"), "форма", "Фартуки", "Рабочий фартук с эмблемой", "Формат для мастерских, кофеен, барберов и сервисных команд."),
    ],
  },
  sportforma: {
    hero: serviceImage("sportforma", "page-sportforma.png"),
    gallery: [
      makeSlide(serviceImage("sportforma", "page-sportforma.png"), "номер", "Спортивная форма", "Форма с фамилией и номером", "Классическое нанесение для команд, секций и корпоративных турниров."),
      makeSlide(serviceImage("sportforma", "page-termopechat.png"), "термо", "Спортивная форма", "Номер на форме у пресса", "Пример термопереноса для игровых номеров и фамилий."),
      makeSlide(serviceImage("sportforma", "sports-jersey-number.png"), "команда", "Спортивная форма", "Игровая форма с номером", "Контрастный номер на белой спортивной ткани."),
    ],
  },
  specodezhda: {
    hero: serviceImage("specodezhda", "page-specodezhda.png"),
    gallery: [
      makeSlide(serviceImage("specodezhda", "page-specodezhda.png"), "форма", "Спецодежда", "Рабочая куртка с логотипом", "Спокойное брендирование спецодежды без лишнего визуального шума."),
      makeSlide(serviceImage("specodezhda", "page-fartuki.png"), "персонал", "Спецодежда", "Форма для персонала", "Фартуки и рабочая одежда в едином фирменном стиле."),
    ],
  },
  "svoya-odezhda": {
    hero: serviceImage("svoya-odezhda", "page-svoya-odezhda.png"),
    gallery: [
      makeSlide(serviceImage("svoya-odezhda", "page-svoya-odezhda.png"), "своя вещь", "Своя одежда", "Кастомная джинсовая куртка", "Пример нанесения на вещь клиента с плотной фактурой ткани."),
      makeSlide(serviceImage("svoya-odezhda", "page-drugoe.png"), "аксессуар", "Своя одежда", "Нестандартные вещи и аксессуары", "Если изделие подходит по ткани и форме, подберём способ нанесения."),
    ],
  },
  opt: {
    hero: serviceImage("opt", "page-opt.png"),
    gallery: [
      makeSlide(serviceImage("opt", "page-opt.png"), "опт", "Опт", "Тираж толстовок и футболок", "Готовая партия мерча для бренда, компании или мероприятия."),
      makeSlide(serviceImage("opt", "page-tolstovki.png"), "мерч", "Опт", "Одинаковый принт на партии", "Хороший формат для дропа, корпоративной одежды или подарочного тиража."),
      makeSlide(serviceImage("opt", "page-futbolki.png"), "тираж", "Опт", "Футболки в количестве", "Партия футболок с одинаковым логотипом и аккуратной подачей."),
    ],
  },
  drugoe: {
    hero: serviceImage("drugoe", "page-drugoe.png"),
    gallery: [
      makeSlide(serviceImage("drugoe", "page-drugoe.png"), "аксессуары", "Другие изделия", "Печать на аксессуарах", "Кепки, панамы, pouch-сумки и другие нестандартные текстильные изделия."),
      makeSlide(serviceImage("drugoe", "page-shoppery.png"), "текстиль", "Другие изделия", "Текстильные товары с логотипом", "Шопперы и похожие изделия для мерча или подарочных наборов."),
    ],
  },
  srochnaya: {
    hero: serviceImage("srochnaya", "page-srochnaya.png"),
    gallery: [
      makeSlide(serviceImage("srochnaya", "page-srochnaya.png"), "срочно", "Срочная печать", "Футболка у пресса", "Когда макет готов и нужно быстро запустить печать."),
      makeSlide(serviceImage("srochnaya", "page-dtf.png"), "готово", "Срочная печать", "Готовый принт на футболке", "Подходит для подарков, мероприятий и быстрых одиночных заказов."),
    ],
  },
  maket: {
    hero: serviceImage("maket", "page-maket.png"),
    gallery: [
      makeSlide(serviceImage("maket", "page-maket.png"), "макет", "Подготовка макета", "Подготовка принта к печати", "Проверяем размер, расположение, цвет и читаемость макета до запуска."),
      makeSlide(serviceImage("maket", "page-dtf.png"), "контроль", "Подготовка макета", "Макет и готовое изделие", "Помогаем довести файл до результата, который нормально смотрится на ткани."),
    ],
  },
  dtf: {
    hero: serviceImage("dtf", "dtf-cast-list-grey.webp"),
    seo: serviceImage("dtf", "dtf-graduation-grey.webp"),
    heroVideo: serviceImage("dtf", "page-dtf.mp4"),
    heroVideoCaption: [
      { title: "DTF-печать", sub: "Полноцветные принты на ткани любого цвета" },
      { title: "Детальная графика", sub: "Градиенты, мелкие элементы и насыщенные цвета" },
      { title: "Термоперенос", sub: "Принт переносится под прессом на изделие" },
      { title: "Стойко к стирке", sub: "Эластичный принт, не трескается и не выцветает" },
    ],
    gallery: [
      makeSlide(serviceImage("dtf", "dtf-cast-list-grey.webp"), "DTF", "DTF печать", "DTF-принт на варёной футболке", "Детальный полноцветный принт на серой варёной футболке."),
      makeSlide(serviceImage("dtf", "dtf-graduation-grey.webp"), "DTF", "DTF печать", "Принт на выпускной мерч", "Полноцветная печать с фотографиями и надписями на футболке."),
      makeSlide(serviceImage("dtf", "dtf-neymar-black.webp"), "DTF", "DTF печать", "Фотопринт на чёрной футболке", "Реалистичное изображение с мелкими деталями на тёмной ткани."),
      makeSlide(serviceImage("dtf", "dtf-anime-detail.webp"), "DTF", "DTF печать", "Аниме-принт крупным планом", "Насыщенные цвета и тонкие детали изображения."),
      makeSlide(serviceImage("dtf", "dtf-kult-gym-black.webp"), "DTF", "DTF печать", "Принт для фитнес-бренда", "Контрастная графика на чёрной футболке."),
      makeSlide(serviceImage("dtf", "dtf-sparta-rocket-white.webp"), "DTF", "DTF печать", "Спортивный принт на белой футболке", "Чёткая графика с яркими акцентами."),
      makeSlide(serviceImage("dtf", "dtf-catharsis-cat-black.webp"), "DTF", "DTF печать", "Авторский принт на чёрной футболке", "Графика с насыщенным чёрным фоном и контурами."),
      makeSlide(serviceImage("dtf", "dtf-pink-panther.webp"), "DTF", "DTF печать", "Яркий персонажный принт", "Сочные цвета и плотная заливка на ткани."),
      makeSlide(serviceImage("dtf", "dtf-gymgirl-oversize.webp"), "DTF", "DTF печать", "Принт на оверсайз-футболке", "Крупное изображение на свободном крое."),
      makeSlide(serviceImage("dtf", "dtf-zaporozhets-sand.webp"), "DTF", "DTF печать", "Принт на песочной футболке", "Аккуратная печать на цветной варёной ткани."),
      makeSlide(serviceImage("dtf", "dtf-photo-collage-black.webp"), "DTF", "DTF печать", "Фотоколлаж на чёрной футболке", "Печать коллажа из фотографий с сохранением деталей."),
      makeSlide(serviceImage("dtf", "dtf-skull-hoodie.webp"), "DTF", "DTF печать", "Принт на капюшоне худи", "Нанесение на сложную зону изделия."),
      makeSlide(serviceImage("dtf", "dtf-circus-white.webp"), "DTF", "DTF печать", "Иллюстрация на белой футболке", "Многоцветная иллюстрация с тонкими линиями."),
      makeSlide(serviceImage("dtf", "dtf-sweet-summer-pink.webp"), "DTF", "DTF печать", "Принт на розовой футболке", "Лёгкая летняя графика на цветной ткани."),
      makeSlide(serviceImage("dtf", "dtf-enotop-corporate.webp"), "DTF", "DTF печать", "Корпоративный мерч с логотипом", "Брендирование футболок для компании."),
      makeSlide(serviceImage("dtf", "dtf-enotop-stack.webp"), "DTF", "DTF печать", "Тираж корпоративных футболок", "Партия мерча с единым принтом."),
    ],
  },
  termopechat: {
    hero: serviceImage("termopechat", "page-termopechat.png"),
    heroVideo: serviceImage("termopechat", "page-termopechat.mp4"),
    heroVideoCaption: [
      { title: "Плоттерная резка плёнки", sub: "Точный контур под номера, фамилии и логотипы" },
      { title: "Плоттерная резка", sub: "Точный раскрой плёнки под форму и мерч" },
      { title: "Термопечать", sub: "Номера, фамилии и логотипы на спортивной форме" },
      { title: "Стойко к стирке", sub: "Яркие цвета, не трескается и не выцветает" },
    ],
    gallery: [
      makeSlide(serviceImage("termopechat", "page-termopechat.png"), "номер", "Термопечать", "Номер и фамилия на форме", "Простой и чёткий термоперенос для спортивной формы."),
      makeSlide(serviceImage("termopechat", "page-sportforma.png"), "форма", "Термопечать", "Спортивная форма с номером", "Нанесение фамилий, номеров и лаконичной графики."),
    ],
  },
  shelkografiya: {
    hero: serviceImage("shelkografiya", "img_2479.webp"),
    seo: serviceImage("shelkografiya", "img_2480.webp"),
    gallery: [
      makeSlide(serviceImage("shelkografiya", "img_2478.webp"), "тираж", "Шелкография", "Шелкография на изделиях", "Печать партии изделий с единым макетом на профессиональном оборудовании."),
      makeSlide(serviceImage("shelkografiya", "img_2481.webp"), "цвет", "Шелкография", "Многоцветный принт", "Насыщенная печать с чёткими границами цветов на ткани."),
      makeSlide(serviceImage("shelkografiya", "img_2482.webp"), "лого", "Шелкография", "Логотип на ткани", "Аккуратное брендирование одежды для команд и компаний."),
      makeSlide(serviceImage("shelkografiya", "img_2483.webp"), "мерч", "Шелкография", "Принт для мерча", "Стойкое нанесение, которое держит частые стирки."),
      makeSlide(serviceImage("shelkografiya", "img_2484.webp"), "форма", "Шелкография", "Печать на рабочей одежде", "Маркировка изделий в едином фирменном стиле."),
      makeSlide(serviceImage("shelkografiya", "img_2485.webp"), "деталь", "Шелкография", "Детальный принт", "Качественная проработка изображения на плотной ткани."),
    ],
  },
  sublimaciya: {
    hero: serviceImage("sublimaciya", "page-sublimaciya.png"),
    heroVideo: serviceImage("sublimaciya", "page-sublimaciya.mp4"),
    heroVideoCaption: [
      { title: "Сублимация", sub: "Полноцветный принт без ощутимого слоя на ткани" },
      { title: "Спортивная форма", sub: "Яркие джерси, номера и логотипы для команд" },
      { title: "Стойко к стирке", sub: "Цвета не трескаются и не выцветают" },
      { title: "Дышит и тянется", sub: "Принт становится частью синтетической ткани" },
    ],
    gallery: [
      makeSlide(serviceImage("sublimaciya", "page-sublimaciya.png"), "сублимация", "Сублимация", "Полноцветное спортивное джерси", "Яркий, но аккуратный принт на синтетической спортивной ткани."),
      makeSlide(serviceImage("sublimaciya", "page-sportforma.png"), "спорт", "Сублимация", "Спортивная форма", "Форма и экипировка, где важны лёгкость ткани и стойкость изображения."),
    ],
  },
};
