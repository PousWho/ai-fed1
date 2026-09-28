import { timingSafeEqual } from 'node:crypto';

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// token читается лениво на каждый запрос, а не один раз при старте —
// чтобы тестовое приложение могло передать токен через createApp({ newsToken }).
export function requireNewsToken(getToken) {
  return (req, res, next) => {
    const token = typeof getToken === 'function' ? getToken() : getToken;
    const header = req.get('authorization') ?? '';
    const [scheme, value] = header.split(' ');

    if (!token || scheme !== 'Bearer' || !value || !safeEqual(value, token)) {
      return res.status(401).json({ error: 'Неверный или отсутствующий токен доступа' });
    }

    return next();
  };
}
