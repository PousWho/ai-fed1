// Лёгкий хелпер аналитики. Никаких зависимостей и внешних запросов:
// если на странице подключён GA/GTM/Яндекс.Метрика — событие уходит туда,
// иначе — безопасный no-op. Позже события сведут в общую карту аналитики сайта.
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...params });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
    if (typeof window.ym === 'function' && window.__ymId) {
      window.ym(window.__ymId, 'reachGoal', event, params);
    }
  } catch {
    /* аналитика не должна ломать интерфейс */
  }
}
