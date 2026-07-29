import nodemailer from 'nodemailer';

// Экранирование HTML (защита от XSS в теле письма)
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const typeLabels = {
  partner: 'Стать партнером',
  join: 'Вступить в федерацию',
  contact: 'Обратная связь',
};

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP настройки не заданы: нужны переменные окружения SMTP_USER и SMTP_PASSWORD.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

// data приходит уже провалидированной zod-схемой в server.js
export async function sendContactEmail(data) {
  const receivedAt = new Date().toISOString();
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
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
      <p><strong>Согласие на обработку ПДн:</strong> подтверждено, ${receivedAt}</p>
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

Согласие на обработку ПДн: подтверждено, ${receivedAt}
    `,
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
  return { success: true };
}
