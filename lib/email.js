import nodemailer from 'nodemailer';

// Функция для экранирования HTML (защита от XSS)
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

// Валидация email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Настройка транспорта для отправки email
// В продакшене используйте реальные SMTP настройки
function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP настройки не заданы. Пожалуйста, настройте переменные окружения SMTP_USER и SMTP_PASSWORD.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true для 465, false для других портов
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendContactEmail(data) {
  const typeLabels = {
    partner: 'Стать партнером',
    join: 'Вступить в федерацию',
    contact: 'Обратная связь',
  };

  // Валидация обязательных полей
  if (!data.name || !data.email || !data.message || !data.type) {
    throw new Error('Не заполнены обязательные поля: name, email, message, type');
  }

  // Валидация email
  if (!isValidEmail(data.email)) {
    throw new Error('Некорректный формат email');
  }

  // Проверка типа заявки
  if (!typeLabels[data.type]) {
    throw new Error('Некорректный тип заявки. Допустимые значения: partner, join, contact');
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `Новая заявка: ${typeLabels[data.type]}`,
    html: `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Тип заявки:</strong> ${escapeHtml(typeLabels[data.type])}</p>
      <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.phone ? `<p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>` : ''}
      ${data.organization ? `<p><strong>Организация:</strong> ${escapeHtml(data.organization)}</p>` : ''}
      <p><strong>Сообщение:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    `,
    text: `
Новая заявка с сайта

Тип заявки: ${typeLabels[data.type]}
Имя: ${data.name}
Email: ${data.email}
${data.phone ? `Телефон: ${data.phone}` : ''}
${data.organization ? `Организация: ${data.organization}` : ''}

Сообщение:
${data.message}
    `,
  };

  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
