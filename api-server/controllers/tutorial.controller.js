require('dotenv').config();
const nodemailer = require('nodemailer');

const MAIL_USER = process.env.GMAIL_USER;
const MAIL_PASS = process.env.GMAIL_PASS;
const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: { user: MAIL_USER, pass: MAIL_PASS },
  });
}

exports.sendForm = async (req, res) => {
  const desc = req.body.description || '';
  const text = `Новая заявка с сайта\n\nИмя: ${req.body.name}\nТелефон: ${req.body.phone}\nОписание: ${desc}`;
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    const data = await response.json();
    console.log(data);
    res.send({ ok: true });
  } catch (err) {
    console.error('sendForm error:', err);
    res.status(500).send({ ok: false });
  }
};

exports.sendConstructor = async (req, res) => {
  try {
    let orderJson = {};
    try { orderJson = JSON.parse(req.body.order || '{}'); } catch (_) {}

    const orderNumber = orderJson.orderNumber || 'б/н';
    const contact = orderJson.contact || {};
    const product = orderJson.product || {};

    const subject = `Заказ #${orderNumber} — конструктор футболок`;

    const bodyLines = [
      `Новый заказ из конструктора футболок`,
      ``,
      `Номер заказа: ${orderNumber}`,
      `Дата: ${new Date().toLocaleString('ru-RU')}`,
      ``,
      `--- Контакт ---`,
      `Имя: ${contact.name || '—'}`,
      `Телефон: ${contact.phone || '—'}`,
      contact.email ? `Email: ${contact.email}` : null,
      ``,
      `--- Товар ---`,
      `Модель: ${product.name || '—'}`,
      product.density ? `Плотность: ${product.density}` : null,
      `Цвет: ${orderJson.color || '—'}`,
      `Размер: ${orderJson.size || '—'}`,
      `Количество: ${orderJson.qty || '—'} шт`,
      `Итого: ${orderJson.total ? Number(orderJson.total).toLocaleString('ru-RU') + ' ₽' : '—'}`,
    ].filter((v) => v !== null).join('\n');

    const attachments = (req.files || []).map((f) => ({
      filename: f.originalname,
      content: f.buffer,
      contentType: f.mimetype,
    }));

    const transporter = createTransporter();
    await transporter.sendMail({
      from: MAIL_USER,
      to: MAIL_USER,
      subject,
      text: bodyLines,
      attachments,
    });

    res.status(200).json({ ok: true, orderNumber });
  } catch (error) {
    console.error('sendConstructor error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

exports.sendTextileOrder = async (req, res) => {
  try {
    const { name, phone, order } = req.body;

    if (!name || !phone || !Array.isArray(order) || order.length === 0) {
      return res.status(400).json({ ok: false, error: 'Неполные данные заказа' });
    }

    const totalQty = order.reduce((s, l) => s + (l.qty || 0), 0);

    const lines = order.map((l, i) => [
      `${i + 1}. ${l.itemName}`,
      l.variantLabel ? `   Вариант: ${l.variantLabel}` : null,
      l.color ? `   Цвет: ${l.color}` : null,
      l.size ? `   Размер: ${l.size}` : null,
      `   Количество: ${l.qty} шт`,
      l.price ? `   Цена: ${l.price}` : null,
    ].filter(Boolean).join('\n')).join('\n\n');

    const text = [
      `Новый заказ из каталога текстиля`,
      ``,
      `Дата: ${new Date().toLocaleString('ru-RU')}`,
      ``,
      `--- Контакт ---`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      ``,
      `--- Состав заказа (${totalQty} шт) ---`,
      lines,
    ].join('\n');

    const transporter = createTransporter();
    await transporter.sendMail({
      from: MAIL_USER,
      to: MAIL_USER,
      subject: `Заказ текстиля — ${name} — ${totalQty} шт`,
      text,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('sendTextileOrder error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
};
