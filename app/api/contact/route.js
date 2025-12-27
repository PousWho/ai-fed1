import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  message: z.string().min(10),
  type: z.enum(['partner', 'join', 'contact']),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Отправляем email
    await sendContactEmail(validatedData);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные формы', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error sending contact form:', error);
    return NextResponse.json(
      { error: 'Ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.' },
      { status: 500 }
    );
  }
}

