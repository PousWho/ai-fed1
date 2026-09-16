export const vicePresidents = [
  {
    name: 'Исаев Дмитрий Евгеньевич',
    photo: '/isaev-dmitry.jpg',
    role: 'Вице-президент по взаимодействию с органами государственной власти, стратегическому развитию и реализации национальных проектов',
    phone: process.env.NEXT_PUBLIC_VP_DMITRY_PHONE || '+7 916 011 1117',
    email: process.env.NEXT_PUBLIC_VP_DMITRY_EMAIL || null,
  },
  {
    name: 'Исаев Вячеслав Игоревич',
    photo: '/isaev-vyacheslav.jpg',
    role: 'Вице-президент по вопросам применения искусственного интеллекта в здравоохранении',
    phone: process.env.NEXT_PUBLIC_VP_VYACHESLAV_PHONE || '+7 900 655 7660',
    email: process.env.NEXT_PUBLIC_VP_VYACHESLAV_EMAIL || null,
  },
];
