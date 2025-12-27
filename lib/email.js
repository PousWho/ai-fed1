import nodemailer from 'nodemailer';

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

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `Новая заявка: ${typeLabels[data.type]}`,
    html: `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Тип заявки:</strong> ${typeLabels[data.type]}</p>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Телефон:</strong> ${data.phone}</p>` : ''}
      ${data.organization ? `<p><strong>Организация:</strong> ${data.organization}</p>` : ''}
      <p><strong>Сообщение:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
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

